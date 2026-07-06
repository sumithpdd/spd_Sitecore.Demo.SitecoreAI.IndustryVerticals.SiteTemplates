/**
 * Restores blog listing + article page renderings after CM pull.
 * Partial-design ArticleDetails is not merged reliably in headless layout;
 * article pages need ArticleDetails on page-level __Renderings (same as product PDP).
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOGS_YML = join(
  __dirname,
  '../serialized-content/bristan/bristan/Home/homeowners-home/homeowners-inspiration/blogs.yml',
);
const ARTICLES_DIR = join(
  __dirname,
  '../serialized-content/bristan/9FE3A67950837EC6',
);

const RENDERINGS_FIELD = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const GRID = 'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D';

const R_ARTICLE_LISTING = 'B8030070-0001-4000-8000-000000000014';
const R_ARTICLE_DETAILS = 'B8030070-0001-4000-8000-000000000015';
const R_FEATURES = 'B8030070-0001-4000-8000-000000000003';

const PAR_LISTING = `${GRID}&amp;FieldNames=%7BB8030053-0001-4000-8000-000000000015%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
const PAR_DETAILS = `${GRID}&amp;HideShareWidget=1&amp;FieldNames=%7BB8030053-0001-4000-8000-000000000016%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
const PAR_HELP = `${GRID}&amp;FieldNames=%7BB8030053-0001-4000-8000-00000000000A%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=2`;

const DS_HELP = 'b8030040-0001-4000-8000-000000000031';

const BLOG_INTRO =
  '<div class="ck-content"><h2>Welcome to the Homeowners Blog page</h2><p>Find practical advice, expert insight and design inspiration tailored to UK homes. Whether you are planning a quick refresh or a full renovation, the Bristan Homeowners Blog provides clear, trustworthy guidance to help you choose, install and care for taps, showers and brassware with confidence.</p></div>';

const ARTICLE_FILES = [
  { file: 'best-bath-fillers-to-make-your-bathroom-brilliant.yml', detailUid: 'B8030100-0001-4000-8000-000000000521', helpUid: 'B8030100-0001-4000-8000-000000000531' },
  { file: 'create-a-glowing-new-interior-with-bristan-gold-bathroom-taps.yml', detailUid: 'B8030100-0001-4000-8000-000000000522', helpUid: 'B8030100-0001-4000-8000-000000000532' },
  { file: 'choosing-the-right-kitchen-tap-for-your-home.yml', detailUid: 'B8030100-0001-4000-8000-000000000523', helpUid: 'B8030100-0001-4000-8000-000000000533' },
];

const renderingsBlock = (rows) => `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}">
${rows.join('\n')}
      </d>
    </r>`;

const row = ({ uid, before, after, rid, ds, par }) => {
  const placement = before ? `p:before="${before}"` : `p:after="r[@uid='{${after}}']"`;
  const dsAttr = ds ? `\n          s:ds="${ds}"` : '';
  return `        <r
          uid="{${uid}}"
          ${placement}${dsAttr}
          s:id="{${rid}}"
          s:par="${par}"
          s:ph="headless-main" />`;
};

const setSharedRenderings = (yaml, block) => {
  const fieldRe = new RegExp(
    `(- ID: "${RENDERINGS_FIELD}"\\s+Hint: __Renderings\\s+Value: \\|\\s+\\n)([\\s\\S]*?)(\\nLanguages:)`,
  );
  if (!fieldRe.test(yaml)) {
    throw new Error('__Renderings field not found');
  }
  return yaml.replace(fieldRe, `$1    ${block}\n$3`);
};

const ensureBlogPageFields = (yaml) => {
  let next = yaml;
  if (!/Hint: Title/.test(next)) {
    next = next.replace(
      /(- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\s+Hint: NavigationTitle\s+Value: Blogs)/,
      `$1\n    - ID: "4ff91248-33ab-4254-b6f7-2618fd0aebae"\n      Hint: Title\n      Value: Blogs`,
    );
  }
  if (!/Hint: Content/.test(next)) {
    next = next.replace(
      /(Hint: Title\s+Value: Blogs)/,
      `$1\n    - ID: "581d7a02-ce94-4a73-9add-258867a8b60f"\n      Hint: Content\n      Value: ${BLOG_INTRO}`,
    );
  }
  return next;
};

// --- blogs listing page ---
let blogsYaml = readFileSync(BLOGS_YML, 'utf8');
const blogsRenderings = renderingsBlock([
  row({
    uid: 'B8030100-0001-4000-8000-000000000502',
    before: '*',
    rid: R_ARTICLE_LISTING,
    par: PAR_LISTING,
  }),
  row({
    uid: 'B8030100-0001-4000-8000-000000000503',
    after: 'B8030100-0001-4000-8000-000000000502',
    rid: R_FEATURES,
    ds: DS_HELP,
    par: PAR_HELP,
  }),
]);
blogsYaml = setSharedRenderings(blogsYaml, blogsRenderings);
blogsYaml = ensureBlogPageFields(blogsYaml);
writeFileSync(BLOGS_YML, blogsYaml, 'utf8');
console.log('Patched blogs.yml');

// --- article pages ---
for (const { file, detailUid, helpUid } of ARTICLE_FILES) {
  const path = join(ARTICLES_DIR, file);
  let yaml = readFileSync(path, 'utf8');
  const articleRenderings = renderingsBlock([
    row({
      uid: detailUid,
      before: '*',
      rid: R_ARTICLE_DETAILS,
      par: PAR_DETAILS,
    }),
    row({
      uid: helpUid,
      after: detailUid,
      rid: R_FEATURES,
      ds: DS_HELP,
      par: PAR_HELP,
    }),
  ]);
  yaml = setSharedRenderings(yaml, articleRenderings);
  writeFileSync(path, yaml, 'utf8');
  console.log(`Patched ${file}`);
}

console.log('Done. Run: dotnet sitecore serialization push -i bristan');
