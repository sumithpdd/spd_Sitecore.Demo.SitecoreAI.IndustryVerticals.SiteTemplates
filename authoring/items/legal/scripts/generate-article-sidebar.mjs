/**
 * Article sidebar: LatestNews + Promo SidebarSignup in NewsArticle nested placeholder.
 * GUID prefix a1e9. Run: node authoring/items/legal/scripts/generate-article-sidebar.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_INSIGHT = 'a1e90012-0000-4000-8000-000000000030';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const T_PH = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const TPL_FOLDER = 'a1e90013-0000-4000-8000-000000000001';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const PROMOS = 'd9b78273-0930-4a7b-94be-b59ca5471cf2';
const VARIANT_PARENT = '0a49ad87-ed6c-43cc-9b28-754e560f5d1d';
const PH_PARENT = '396bb7c6-cb9b-4349-918a-6688cf6ecb21';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_PLACEHOLDERS = '069a8361-b1cd-437c-8c32-a3be78941446';
const F_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_ALLOWED = 'e391b526-d0c5-439d-803e-17512eae6222';
const F_BASE_TPL = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_PROMO_MORE = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const F_PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const F_PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const INS_TITLE = 'a1e90012-0000-4000-8000-000000000033';
const INS_DATE = 'a1e90012-0000-4000-8000-000000000034';
const INS_LINK = 'a1e90012-0000-4000-8000-000000000036';

const ID = {
  LatestNews: 'a1e90001-1111-4000-8000-000000000018',
  Promo: 'a1e90001-1111-4000-8000-000000000004',
  NewsArticle: 'a1e90001-1111-4000-8000-000000000011',
  Panel: 'a1e90013-0000-4000-8000-000000000050',
  PanelData: 'a1e90013-0000-4000-8000-000000000051',
  Heading: 'a1e90013-0000-4000-8000-000000000052',
  Items: 'a1e90013-0000-4000-8000-000000000053',
  Folder: 'a1e90024-0000-4000-8000-00000000007e',
  ItemsFolder: 'a1e90024-0000-4000-8000-00000000007f',
  PanelItem: 'a1e90024-0000-4000-8000-000000000080',
  Signup: 'a1e90020-0000-4000-8000-000000000034',
  Variant: 'a1e90008-8888-4000-8000-000000000013',
  Placeholder: 'a1e90009-9999-4000-8000-000000000008',
};

const NEWS = [
  [
    'a1e90024-0000-4000-8000-000000000082',
    'corporate-reporting',
    '1 hour ago',
    'UK moves to overhaul corporate reporting framework',
  ],
  [
    'a1e90024-0000-4000-8000-000000000083',
    'ireland-offshore-wind',
    '2 hours ago',
    'Ireland launches consultation on offshore wind auction revamp',
  ],
  [
    'a1e90024-0000-4000-8000-000000000084',
    'ai-energy-system',
    '3 hours ago',
    "AI agents operating Britain's energy system explored in UK vision",
  ],
  [
    'a1e90024-0000-4000-8000-000000000085',
    'uae-gaming',
    '4 hours ago',
    'UAE regulators strengthen cooperation as the commercial gaming sector develops',
  ],
  [
    'a1e90024-0000-4000-8000-000000000086',
    'australia-ai-drift',
    '8 hours ago',
    'Australian firms face increasing pressure to monitor AI performance drift over time',
  ],
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260911T140000Z
`;
}

const SIDEBAR = `        <r
          uid="{A1E91000-0007-4000-8000-000000000018}"
          s:ds="${ID.PanelItem}"
          s:id="{${ID.LatestNews.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=8"
          s:ph="article-sidebar-1" />
        <r
          uid="{A1E91000-0007-4000-8000-000000000019}"
          s:ds="${ID.Signup}"
          s:id="{${ID.Promo.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${ID.Variant.toUpperCase()}%7D&amp;DynamicPlaceholderId=9"
          s:ph="article-sidebar-1" />`;

write(
  'serialized-content/article-templates/Article Templates/LatestNewsPanel.yml',
  `---
ID: "${ID.Panel}"
Parent: "${TPL_FOLDER}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/legal/Article Templates/LatestNewsPanel"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_BASE_TPL}"
  Hint: __Base template
  Value: |
    ${BASE_STD}
    ${BASE_DS}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/article-templates/Article Templates/LatestNewsPanel/Data.yml',
  `---
ID: "${ID.PanelData}"
Parent: "${ID.Panel}"
Template: "${T_SECTION}"
Path: "/sitecore/templates/Project/legal/Article Templates/LatestNewsPanel/Data"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/article-templates/Article Templates/LatestNewsPanel/Data/Heading.yml',
  `---
ID: "${ID.Heading}"
Parent: "${ID.PanelData}"
Template: "${T_FIELD}"
Path: "/sitecore/templates/Project/legal/Article Templates/LatestNewsPanel/Data/Heading"
SharedFields:
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Single-Line Text"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 100
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: Heading
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/article-templates/Article Templates/LatestNewsPanel/Data/Items.yml',
  `---
ID: "${ID.Items}"
Parent: "${ID.PanelData}"
Template: "${T_FIELD}"
Path: "/sitecore/templates/Project/legal/Article Templates/LatestNewsPanel/Data/Items"
SharedFields:
- ID: "${F_SOURCE}"
  Hint: Source
  Value: "/sitecore/content/legal/legal/Data/ArticleSidebar/LatestNewsItems"
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Treelist"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 200
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: Select Latest News
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/renderings/legal/LatestNews.yml',
  `---
ID: "${ID.LatestNews}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/legal/LatestNews
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: LatestNews
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: /sitecore/templates/Project/legal/Article Templates/LatestNewsPanel
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']/*[@@name='ArticleSidebar']"
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Presentation/Headless Variants/Promo/SidebarSignup.yml',
  `---
ID: "${ID.Variant}"
Parent: "${VARIANT_PARENT}"
Template: "${T_VARIANT}"
Path: /sitecore/content/legal/legal/Presentation/Headless Variants/Promo/SidebarSignup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Presentation/Placeholder Settings/article-sidebar-{#}.yml',
  `---
ID: "${ID.Placeholder}"
Parent: "${PH_PARENT}"
Template: "${T_PH}"
Path: "/sitecore/content/legal/legal/Presentation/Placeholder Settings/article-sidebar-{*}"
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "article-sidebar-{*}"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    {${ID.LatestNews.toUpperCase()}}
    {${ID.Promo.toUpperCase()}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Data/ArticleSidebar.yml',
  `---
ID: "${ID.Folder}"
Parent: "${DATA_ROOT}"
Template: "${T_DATA_FOLDER}"
Path: /sitecore/content/legal/legal/Data/ArticleSidebar
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Data/ArticleSidebar/LatestNewsItems.yml',
  `---
ID: "${ID.ItemsFolder}"
Parent: "${ID.Folder}"
Template: "${T_DATA_FOLDER}"
Path: /sitecore/content/legal/legal/Data/ArticleSidebar/LatestNewsItems
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

for (const [id, slug, time, title] of NEWS) {
  write(
    `serialized-content/legal/legal/Data/ArticleSidebar/LatestNewsItems/${slug}.yml`,
    `---
ID: "${id}"
Parent: "${ID.ItemsFolder}"
Template: "${T_INSIGHT}"
Path: /sitecore/content/legal/legal/Data/ArticleSidebar/LatestNewsItems/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${INS_DATE}"
      Hint: Date
      Value: "${time}"
    - ID: "${INS_TITLE}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "${INS_LINK}"
      Hint: Link
      Value: |
        <link text="${title.replace(/"/g, '')}" linktype="internal" url="/out-law/news" anchor="" target="" title="" class="" />
`
  );
}

write(
  'serialized-content/legal/legal/Data/ArticleSidebar/Latest News.yml',
  `---
ID: "${ID.PanelItem}"
Parent: "${ID.Folder}"
Template: "${ID.Panel}"
Path: /sitecore/content/legal/legal/Data/ArticleSidebar/Latest News
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Heading}"
      Hint: Heading
      Value: Latest News
    - ID: "${ID.Items}"
      Hint: Items
      Value: "${NEWS.map(([id]) => `{${id.toUpperCase()}}`).join('|')}"
`
);

write(
  'serialized-content/legal/legal/Data/Promos/Article Signup.yml',
  `---
ID: "${ID.Signup}"
Parent: "${PROMOS}"
Template: "${T_PROMO}"
Path: /sitecore/content/legal/legal/Data/Promos/Article Signup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_PROMO_MORE}"
      Hint: PromoMoreInfo
      Value: |
        <link text="Sign up" linktype="external" url="https://insight.pinsentmasons.com/6/10/landing-pages/newsletter-sign-up---website.asp" anchor="" target="_blank" title="" class="" />
    - ID: "${F_PROMO_DESC}"
      Hint: PromoDescription
      Value: <p>Stay ahead by signing up to our weekly email of news and expert analysis, tailored for you</p>
    - ID: "${F_PROMO_TITLE}"
      Hint: PromoTitle
      Value: Know what's coming, make better decisions
`
);

const newsArticlePath = path.join(ROOT, 'serialized-content/renderings/legal/NewsArticle.yml');
let newsArticle = fs.readFileSync(newsArticlePath, 'utf8');
if (!newsArticle.includes(F_PLACEHOLDERS)) {
  newsArticle = newsArticle.replace(
    `- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"`,
    `- ID: "${F_PLACEHOLDERS}"
  Hint: Placeholders
  Value: |
    {${ID.Placeholder.toUpperCase()}}
- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"`
  );
  fs.writeFileSync(newsArticlePath, newsArticle, 'utf8');
}

const availablePath = path.join(
  ROOT,
  'serialized-content/legal/legal/Presentation/Available Renderings/Pinsent.yml'
);
let available = fs.readFileSync(availablePath, 'utf8');
if (!available.includes(ID.LatestNews.toUpperCase())) {
  available = available.replace(
    `{A1E90001-1111-4000-8000-000000000017}`,
    `{A1E90001-1111-4000-8000-000000000017}\n    {${ID.LatestNews.toUpperCase()}}`
  );
  fs.writeFileSync(availablePath, available, 'utf8');
}

function injectSidebar(fileRel) {
  const full = path.join(ROOT, fileRel);
  if (!fs.existsSync(full)) {
    return;
  }
  let yaml = fs.readFileSync(full, 'utf8');
  if (yaml.includes('article-sidebar-1')) {
    return;
  }
  if (!yaml.includes('s:ph="headless-main"')) {
    return;
  }
  yaml = yaml.replace(
    /(\s+s:ph="headless-main" \/>)(\s+<\/d>)/,
    `$1\n${SIDEBAR}$2`
  );
  fs.writeFileSync(full, yaml, 'utf8');
}

const guidePath =
  'serialized-content/legal/57FCA1DFB479E432/when-uk-suppliers-must-continue-to-supply-insolvent-companies.yml';
let guide = fs.readFileSync(path.join(ROOT, guidePath), 'utf8');
guide = guide.replace(
  /        <r\n          uid="\{A1E91000-0004-4000-8000-000000000003\}"[\s\S]*?s:ph="headless-main" \/>\n/,
  ''
);
if (!guide.includes('article-sidebar-1')) {
  guide = guide.replace(
    /(\s+s:ph="headless-main" \/>)(\s+<\/d>)/,
    `$1\n${SIDEBAR}$2`
  );
}
fs.writeFileSync(path.join(ROOT, guidePath), guide, 'utf8');

const newsDirs = [
  'serialized-content/legal/legal/Home/out-law/news',
  'serialized-content/legal/02D10460AEA52D7A',
];
for (const dir of newsDirs) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) {
    continue;
  }
  for (const name of fs.readdirSync(abs)) {
    if (!name.endsWith('.yml') || name === 'news.yml') {
      continue;
    }
    injectSidebar(`${dir}/${name}`);
  }
}

console.log('Wrote LatestNews, SidebarSignup, article-sidebar placeholder, guide + news layouts.');
