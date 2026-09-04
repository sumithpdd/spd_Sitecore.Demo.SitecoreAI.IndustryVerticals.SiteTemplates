/**
 * Generate PromoGrid template + seed personalizable datasources + wire Home layout.
 */
import { access, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const BROTHER_ROOT = join(__dirname, '..');
const SERIALIZED = join(BROTHER_ROOT, 'serialized-content');
const RENDERINGS = join(SERIALIZED, 'renderings', 'brother');
const TEMPLATES = join(SERIALIZED, 'templates', 'brother');
const DATA = join(SERIALIZED, 'brother', 'brother', 'Data');
const GEN = join(
  REPO_ROOT,
  '.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs'
);

const RENDERING_ID = 'b40e0001-1111-4000-8000-00000000000c';
const PROMO_FOLDER_ID = 'b40e00a1-1111-4000-8000-00000000000a';
const DS_DEFAULT = 'b40e00b1-2222-4000-8000-000000000020';
const DS_JACK = 'b40e00b1-2222-4000-8000-000000000021';
const DS_IZZY = 'b40e00b1-2222-4000-8000-000000000022';
const DS_RICK = 'b40e00b1-2222-4000-8000-000000000023';

function runNode(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: REPO_ROOT,
      stdio: 'inherit',
      shell: false,
    });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`exit ${code}`))));
  });
}

function extractSharedHint(yaml, hint) {
  const re = new RegExp(
    `Hint: ${hint}\\r?\\n\\s+Value: (?:"([^"]*)"|([^\\r\\n]+)|\\|\\r?\\n([\\s\\S]*?)(?=\\r?\\n- ID:|\\r?\\nLanguages:))`,
    'm'
  );
  const m = yaml.match(re);
  if (!m) return null;
  if (m[1] != null) return m[1];
  if (m[2] != null) return m[2].trim();
  return (m[3] || '').trim();
}

function upsertSharedField(yaml, fieldId, hint, value) {
  const cleaned = String(value).replace(/^"|"$/g, '').trim();
  const needsQuotes = /[:|\s"]/.test(cleaned) || cleaned.includes('query:');
  const rendered = needsQuotes ? `"${cleaned.replace(/"/g, '')}"` : cleaned;
  const block = `- ID: "${fieldId}"\n  Hint: ${hint}\n  Value: ${rendered}`;
  const existing = new RegExp(`- ID: "${fieldId}"[\\s\\S]*?(?=\\n- ID:|\\nLanguages:)`, 'm');
  if (existing.test(yaml)) {
    return yaml.replace(existing, `${block}\n`);
  }
  return yaml.replace(/\nLanguages:/, `\n${block}\nLanguages:`);
}

async function fileExists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function findFieldId(endsWith) {
  const { readdir } = await import('node:fs/promises');
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        const found = await walk(p);
        if (found) return found;
      } else if (p.replace(/\\/g, '/').endsWith(endsWith)) {
        const raw = await readFile(p, 'utf8');
        return raw.match(/^ID:\s*"([^"]+)"/m)?.[1] || null;
      }
    }
    return null;
  }
  return walk(TEMPLATES);
}

async function findTemplateId(fileName) {
  const { readdir } = await import('node:fs/promises');
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const p = join(dir, e.name);
      if (e.isDirectory()) {
        const found = await walk(p);
        if (found) return found;
      } else if (e.name === fileName) {
        const raw = await readFile(p, 'utf8');
        const m = raw.match(/^ID:\s*"([^"]+)"/m);
        if (m) return m[1];
      }
    }
    return null;
  }
  return walk(TEMPLATES);
}

function linkXml(text, url) {
  return `<link text="${text}" linktype="external" url="${url}" anchor="" target="" />`;
}

function imageXml(src) {
  return `<Image src="${src}" />`;
}

function promoItemYaml({ id, name, templateId, parentId, fields }) {
  const fieldBlocks = fields
    .map(
      (f) => `    - ID: "${f.id}"
      Hint: ${f.hint}
      Value: ${f.multiline ? `|\n        ${f.value}` : JSON.stringify(f.value)}`
    )
    .join('\n');
  return `---
ID: "${id}"
Parent: "${parentId}"
Template: "${templateId}"
Path: /sitecore/content/brother/brother/Data/Promo Grids/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
${fieldBlocks}
`;
}

const name = 'PromoGrid';
const renderingPath = join(RENDERINGS, `${name}.yml`);
const fieldsPath = join(__dirname, 'fields', `${name}.json`);
const hadRendering = await fileExists(renderingPath);
const bakPath = `${renderingPath}.bak`;

if (hadRendering) await rename(renderingPath, bakPath);

try {
  await runNode([GEN, name, '--collection', 'brother', '--fields', fieldsPath]);
} catch (err) {
  if (hadRendering && (await fileExists(bakPath))) await rename(bakPath, renderingPath);
  throw err;
}

const generated = await readFile(renderingPath, 'utf8');
const dsTemplate = extractSharedHint(generated, 'Datasource Template');
const dsLocation = extractSharedHint(generated, 'Datasource Location');
const paramsTemplate = extractSharedHint(generated, 'Parameters Template');

if (hadRendering) {
  let original = await readFile(bakPath, 'utf8');
  if (dsTemplate)
    original = upsertSharedField(
      original,
      '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f',
      'Datasource Template',
      dsTemplate
    );
  if (dsLocation)
    original = upsertSharedField(
      original,
      'b5b27af1-25ef-405c-87ce-369b3a004016',
      'Datasource Location',
      dsLocation
    );
  if (paramsTemplate)
    original = upsertSharedField(
      original,
      'a77e8568-1ab3-44f1-a664-b7c37ec7810d',
      'Parameters Template',
      paramsTemplate
    );
  await writeFile(renderingPath, original, 'utf8');
  await unlink(bakPath);
} else {
  // Force stable rendering ID for new component
  let yaml = await readFile(renderingPath, 'utf8');
  yaml = yaml.replace(/^ID:\s*"[^"]+"/m, `ID: "${RENDERING_ID}"`);
  if (dsTemplate)
    yaml = upsertSharedField(
      yaml,
      '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f',
      'Datasource Template',
      dsTemplate
    );
  if (dsLocation)
    yaml = upsertSharedField(
      yaml,
      'b5b27af1-25ef-405c-87ce-369b3a004016',
      'Datasource Location',
      dsLocation
    );
  if (paramsTemplate)
    yaml = upsertSharedField(
      yaml,
      'a77e8568-1ab3-44f1-a664-b7c37ec7810d',
      'Parameters Template',
      paramsTemplate
    );
  await writeFile(renderingPath, yaml, 'utf8');
}

const dataParent = (await readFile(join(DATA + '.yml').replace(/Data\.yml$/, 'Data.yml'), 'utf8').catch(() =>
  readFile(join(SERIALIZED, 'brother', 'brother', 'Data.yml'), 'utf8')
)).match(/^ID:\s*"([^"]+)"/m)?.[1];

const folderTpl = await findTemplateId('PromoGrid Folder.yml');
const promoTpl = await findTemplateId('PromoGrid.yml');
if (!folderTpl || !promoTpl || !dataParent) {
  throw new Error(`Missing templates: folder=${folderTpl} promo=${promoTpl} data=${dataParent}`);
}

const ids = {
  Title: await findFieldId('PromoGrid Templates/PromoGrid/Data/Title.yml'),
  CardOneHeading: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardOneHeading.yml'),
  CardOneDescription: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardOneDescription.yml'),
  CardOneImage: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardOneImage.yml'),
  CardOneCta: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardOneCta.yml'),
  CardTwoHeading: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardTwoHeading.yml'),
  CardTwoDescription: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardTwoDescription.yml'),
  CardTwoImage: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardTwoImage.yml'),
  CardTwoCta: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardTwoCta.yml'),
  CardThreeHeading: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardThreeHeading.yml'),
  CardThreeDescription: await findFieldId(
    'PromoGrid Templates/PromoGrid/Data/CardThreeDescription.yml'
  ),
  CardThreeImage: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardThreeImage.yml'),
  CardThreeCta: await findFieldId('PromoGrid Templates/PromoGrid/Data/CardThreeCta.yml'),
};

for (const [k, v] of Object.entries(ids)) {
  if (!v) throw new Error(`Missing field id: ${k}`);
}

await writeFile(
  join(DATA, 'Promo Grids.yml'),
  `---
ID: "${PROMO_FOLDER_ID}"
Parent: "${dataParent}"
Template: "${folderTpl}"
Path: /sitecore/content/brother/brother/Data/Promo Grids
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`,
  'utf8'
);

await mkdir(join(DATA, 'Promo Grids'), { recursive: true });

const variants = [
  {
    id: DS_DEFAULT,
    name: 'Home Promo Grid',
    title: '',
    cards: [
      {
        h: 'Register your product',
        d: 'Join the club. Register your Brother product and reap the rewards.',
        img: '/images/supplies-hero.jpg',
        cta: linkXml('Register your product', '/support?utm_content=register-product'),
      },
      {
        h: 'Business Solutions',
        d: 'Deliver greater efficiency, productivity and mobility, as well as increased cost control and security.',
        img: '/images/vc-500w-laptop.jpg',
        cta: linkXml('Explore Business Solutions', '/business-solutions'),
      },
      {
        h: 'Sustainability at Brother',
        d: 'Learn more about our approach to sustainability and how we minimise our environmental impact.',
        img: '/images/desk-office.jpg',
        cta: linkXml('Sustainability at Brother', '/business-solutions?utm_content=sustainability'),
      },
    ],
  },
  {
    id: DS_JACK,
    name: 'Home Promo Grid - Jack',
    title: 'Picked for your home office',
    cards: [
      {
        h: 'Home laser printers',
        d: 'Colour and mono lasers sized for hybrid desks — start with Jack’s shortlist.',
        img: '/images/home-hero.jpg',
        cta: linkXml(
          'Browse printers',
          '/printers?utm_campaign=home-printer&utm_source=google&persona=jack'
        ),
      },
      {
        h: 'Organise with colour labels',
        d: 'Colour-code drawers, cables and shelves with the VC-500W — no ink cartridges.',
        img: '/images/vc-500w-colour.jpg',
        cta: linkXml('See VC-500W', '/devices/label-printer/vc/vc500w?persona=jack'),
      },
      {
        h: 'Never run out of toner',
        d: 'Genuine TN-243BK matched to your laser — OrderCloud reorder in one click.',
        img: '/images/supplies-hero.jpg',
        cta: linkXml('Open supplies', '/supplies?utm_campaign=supplies-reorder&persona=jack'),
      },
    ],
  },
  {
    id: DS_IZZY,
    name: 'Home Promo Grid - Izzy',
    title: 'At your side — multi-channel pack',
    cards: [
      {
        h: 'Campaign landing',
        d: 'One SitecoreAI brief → web, email and paid social with Content Hub approvals.',
        img: '/images/vc-500w-laptop.jpg',
        cta: linkXml(
          'Open campaign',
          '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy'
        ),
      },
      {
        h: 'Full-colour labels',
        d: 'Tell the ZINK Zero Ink story across every channel with the same DAM assets.',
        img: '/images/vc-500w-colour.jpg',
        cta: linkXml('Labelling story', '/labelling-and-receipts?persona=izzy'),
      },
      {
        h: 'Desk organisation blog',
        d: 'Inspiration content that drives VC-500W consideration from home-office audiences.',
        img: '/images/desk-office.jpg',
        cta: linkXml(
          'Read the article',
          '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office'
        ),
      },
    ],
  },
  {
    id: DS_RICK,
    name: 'Home Promo Grid - Rick',
    title: 'Commerce attach — supplies first',
    cards: [
      {
        h: 'OrderCloud checkout',
        d: 'Demo cart and checkout for toner and DK rolls — measure attach rate live.',
        img: '/images/supplies-hero.jpg',
        cta: linkXml(
          'Open checkout',
          '/checkout/supplies?utm_campaign=ordercloud-checkout&persona=rick'
        ),
      },
      {
        h: 'TN-243BK toner',
        d: 'PCM metadata keeps toner matched to Jack’s laser so reorder stays frictionless.',
        img: '/images/home-hero.jpg',
        cta: linkXml('View toner SKU', '/supplies/toner/tn-243bk?persona=rick'),
      },
      {
        h: 'DK label rolls',
        d: 'Attach continuous rolls with QL printers — warehouse and office labelling.',
        img: '/images/labelling-tile.jpg',
        cta: linkXml('Browse DK rolls', '/supplies/labels/dk-22205?persona=rick'),
      },
    ],
  },
];

for (const v of variants) {
  const [c1, c2, c3] = v.cards;
  const fields = [
    ...(v.title ? [{ id: ids.Title, hint: 'Title', value: v.title }] : []),
    { id: ids.CardOneHeading, hint: 'CardOneHeading', value: c1.h },
    { id: ids.CardOneDescription, hint: 'CardOneDescription', value: c1.d },
    { id: ids.CardOneImage, hint: 'CardOneImage', value: imageXml(c1.img), multiline: true },
    { id: ids.CardOneCta, hint: 'CardOneCta', value: c1.cta, multiline: true },
    { id: ids.CardTwoHeading, hint: 'CardTwoHeading', value: c2.h },
    { id: ids.CardTwoDescription, hint: 'CardTwoDescription', value: c2.d },
    { id: ids.CardTwoImage, hint: 'CardTwoImage', value: imageXml(c2.img), multiline: true },
    { id: ids.CardTwoCta, hint: 'CardTwoCta', value: c2.cta, multiline: true },
    { id: ids.CardThreeHeading, hint: 'CardThreeHeading', value: c3.h },
    { id: ids.CardThreeDescription, hint: 'CardThreeDescription', value: c3.d },
    { id: ids.CardThreeImage, hint: 'CardThreeImage', value: imageXml(c3.img), multiline: true },
    { id: ids.CardThreeCta, hint: 'CardThreeCta', value: c3.cta, multiline: true },
  ];
  await writeFile(
    join(DATA, 'Promo Grids', `${v.name}.yml`),
    promoItemYaml({
      id: v.id,
      name: v.name,
      templateId: promoTpl,
      parentId: PROMO_FOLDER_ID,
      fields,
    }),
    'utf8'
  );
  console.log('Seeded', v.name);
}

// Patch Home.yml layout
const homePath = join(SERIALIZED, 'brother', 'brother', 'Home.yml');
let home = await readFile(homePath, 'utf8');
if (home.includes(RENDERING_ID.toUpperCase()) || home.includes('00000000000C')) {
  console.log('Home already has PromoGrid');
} else {
  const promoBlock = `        <r
          uid="{B40E1000-0001-4000-8000-000000000004}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000001}']"
          s:ds="{${DS_DEFAULT.toUpperCase()}}"
          s:id="{${RENDERING_ID.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
        <r
          uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000004}']"`;

  // Fix PromoStrip p:after to follow PromoGrid, and insert PromoGrid after Hero
  if (
    home.includes(
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='B40E1000-0001-4000-8000-000000000001']"`
    )
  ) {
    home = home.replace(
      `        <r
          uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='B40E1000-0001-4000-8000-000000000001']"`,
      promoBlock
    );
  } else if (
    home.includes(
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000001}']"`
    )
  ) {
    home = home.replace(
      `        <r
          uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000001}']"`,
      promoBlock
    );
  } else {
    // Insert after Hero closing />
    home = home.replace(
      `s:ph="headless-main" />
        <r
          uid="{B40E1000-0001-4000-8000-000000000002}"`,
      `s:ph="headless-main" />
        <r
          uid="{B40E1000-0001-4000-8000-000000000004}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000001}']"
          s:ds="{${DS_DEFAULT.toUpperCase()}}"
          s:id="{${RENDERING_ID.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
        <r
          uid="{B40E1000-0001-4000-8000-000000000002}"`
    );
    // Update PromoStrip after pointer
    home = home.replace(
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='B40E1000-0001-4000-8000-000000000001']"`,
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000004}']"`
    );
    home = home.replace(
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000001}']"`,
      `uid="{B40E1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{B40E1000-0001-4000-8000-000000000004}']"`
    );
  }
  await writeFile(homePath, home, 'utf8');
  console.log('Home.yml patched with PromoGrid');
}

console.log('Done.', { dsTemplate, renderingId: RENDERING_ID, ids });
