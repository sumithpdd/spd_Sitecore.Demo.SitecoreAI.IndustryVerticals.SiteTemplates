/**
 * Generate Brother component template branches via the official rendering YAML generator,
 * then restore existing rendering IDs and wire Datasource Template / Location / Parameters.
 *
 * Usage (from repo root):
 *   node authoring/items/brother/scripts/generate-brother-component-templates.mjs
 */
import { access, mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const BROTHER_ROOT = join(__dirname, '..');
const SERIALIZED = join(BROTHER_ROOT, 'serialized-content');
const RENDERINGS = join(SERIALIZED, 'renderings', 'brother');
const TEMPLATES = join(SERIALIZED, 'templates', 'brother');
const GEN = join(
  REPO_ROOT,
  '.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/scripts/Generate-SitecoreRendering.mjs'
);

const COMPONENTS = [
  'Header',
  'HeroBanner',
  'FeatureGrid',
  'ProductListing',
  'ArticleBody',
  'PromoStrip',
  'ProductDetail',
  'CampaignLanding',
  'RelatedProducts',
];

const FIELD_TYPE = '455a3e98-a627-4b40-8035-e683a0331ac7';
const DATA_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const TEMPLATE_FOLDER = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const PAGE_TEMPLATE_ID = 'f352f7cd-0a08-419a-9670-e7ef478cd2a2';
const BROTHER_TEMPLATES_ROOT = '7a01b800-5ab5-47bd-8ce9-467aaef82404';

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

async function generateOne(name) {
  const renderingPath = join(RENDERINGS, `${name}.yml`);
  const bakPath = `${renderingPath}.bak`;
  const fieldsPath = join(__dirname, 'fields', `${name}.json`);
  const hadRendering = await fileExists(renderingPath);

  if (hadRendering) {
    await rename(renderingPath, bakPath);
  }

  try {
    const args = [GEN, name, '--collection', 'brother'];
    if (await fileExists(fieldsPath)) {
      args.push('--fields', fieldsPath);
    }
    console.log(`\n=== Generating ${name} ===`);
    await runNode(args);
  } catch (err) {
    if (hadRendering && (await fileExists(bakPath))) {
      await rename(bakPath, renderingPath);
    }
    throw err;
  }

  const generatedRendering = await readFile(renderingPath, 'utf8');
  const dsTemplate = extractSharedHint(generatedRendering, 'Datasource Template');
  const dsLocation = extractSharedHint(generatedRendering, 'Datasource Location');
  const paramsTemplate = extractSharedHint(generatedRendering, 'Parameters Template');

  if (hadRendering) {
    let original = await readFile(bakPath, 'utf8');
    if (dsTemplate) {
      original = upsertSharedField(
        original,
        '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f',
        'Datasource Template',
        dsTemplate
      );
    }
    if (dsLocation) {
      original = upsertSharedField(
        original,
        'b5b27af1-25ef-405c-87ce-369b3a004016',
        'Datasource Location',
        dsLocation
      );
    }
    if (paramsTemplate) {
      original = upsertSharedField(
        original,
        'a77e8568-1ab3-44f1-a664-b7c37ec7810d',
        'Parameters Template',
        paramsTemplate
      );
    }
    await writeFile(renderingPath, original, 'utf8');
    await unlink(bakPath);
    console.log(`Restored rendering ${name} with datasource wiring.`);
  } else {
    console.log(`Kept new rendering ${name}.`);
  }
}

function fieldYaml({ id, parentId, path, name, title, type, sort, source }) {
  const sourceBlock = source
    ? `\n- ID: "1eb8ae32-e190-44a6-968d-ed904c794ebf"\n  Hint: Source\n  Value: "${source}"`
    : '';
  return `---
ID: "${id}"
Parent: "${parentId}"
Template: "${FIELD_TYPE}"
Path: "${path}"
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "${type}"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sort}${sourceBlock}
Languages:
- Language: en
  Fields:
  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"
    Hint: Title
    Value: ${title}
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "5dd74568-4d4b-44c1-b513-0af5f4cda34f"
      Hint: __Created by
      Value: |
        sitecore\\Admin
`;
}

async function ensureProductPageFields() {
  const productPageId = 'b40e0006-6666-4000-8000-000000000001';
  const contentSectionId = 'b40e0006-6666-4000-8000-000000000021';
  const contentDir = join(TEMPLATES, 'ProductPage', 'Content');
  await mkdir(contentDir, { recursive: true });

  const sectionYaml = `---
ID: "${contentSectionId}"
Parent: "${productPageId}"
Template: "${DATA_SECTION}"
Path: /sitecore/templates/Project/brother/ProductPage/Content
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`;
  await writeFile(join(TEMPLATES, 'ProductPage', 'Content.yml'), sectionYaml, 'utf8');

  const fields = [
    { name: 'Title', title: 'Title', type: 'Single-Line Text', sort: 100 },
    { name: 'Subtitle', title: 'Subtitle', type: 'Single-Line Text', sort: 150 },
    { name: 'Description', title: 'Description', type: 'Rich Text', sort: 200 },
    { name: 'Image', title: 'Image', type: 'Image', sort: 300 },
    { name: 'Image2', title: 'Image 2', type: 'Image', sort: 310 },
    { name: 'Image3', title: 'Image 3', type: 'Image', sort: 320 },
    { name: 'Category', title: 'Category', type: 'Single-Line Text', sort: 400 },
    { name: 'SKU', title: 'SKU', type: 'Single-Line Text', sort: 450 },
    { name: 'FeatureOne', title: 'Feature 1', type: 'Single-Line Text', sort: 500 },
    { name: 'FeatureTwo', title: 'Feature 2', type: 'Single-Line Text', sort: 510 },
    { name: 'FeatureThree', title: 'Feature 3', type: 'Single-Line Text', sort: 520 },
    { name: 'FeatureFour', title: 'Feature 4', type: 'Single-Line Text', sort: 530 },
    { name: 'PrimaryCta', title: 'Primary CTA', type: 'General Link', sort: 600 },
    { name: 'SecondaryCta', title: 'Secondary CTA', type: 'General Link', sort: 610 },
    {
      name: 'RelatedProducts',
      title: 'Related Products',
      type: 'Treelist',
      sort: 700,
      source: "query:./ancestor-or-self::*[@@templatename='Headless Site']//*[@@templatename='ProductPage']",
    },
  ];

  // Stable field GUIDs in brother b40e range for ProductPage content fields
  let n = 0x31;
  for (const f of fields) {
    const id = `b40e0006-6666-4000-8000-0000000000${n.toString(16).padStart(2, '0')}`;
    n += 1;
    const path = `/sitecore/templates/Project/brother/ProductPage/Content/${f.name}`;
    await writeFile(
      join(contentDir, `${f.name}.yml`),
      fieldYaml({
        id,
        parentId: contentSectionId,
        path,
        name: f.name,
        title: f.title,
        type: f.type,
        sort: f.sort,
        source: f.source,
      }),
      'utf8'
    );
  }
  console.log('ProductPage Content fields written.');
}

async function ensureArticlePage() {
  const articlePageId = 'b40e0007-7777-4000-8000-000000000001';
  const stdValuesId = 'b40e0007-7777-4000-8000-000000000011';
  const contentSectionId = 'b40e0007-7777-4000-8000-000000000021';

  const rootYaml = `---
ID: "${articlePageId}"
Parent: "${BROTHER_TEMPLATES_ROOT}"
Template: "${TEMPLATE_FOLDER}"
Path: /sitecore/templates/Project/brother/ArticlePage
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/document_text.png
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {${PAGE_TEMPLATE_ID.toUpperCase()}}
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{${stdValuesId.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`;
  await writeFile(join(TEMPLATES, 'ArticlePage.yml'), rootYaml, 'utf8');
  await mkdir(join(TEMPLATES, 'ArticlePage'), { recursive: true });
  await writeFile(
    join(TEMPLATES, 'ArticlePage', '__Standard Values.yml'),
    `---
ID: "${stdValuesId}"
Parent: "${articlePageId}"
Template: "${articlePageId}"
Path: /sitecore/templates/Project/brother/ArticlePage/__Standard Values
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

  await writeFile(
    join(TEMPLATES, 'ArticlePage', 'Content.yml'),
    `---
ID: "${contentSectionId}"
Parent: "${articlePageId}"
Template: "${DATA_SECTION}"
Path: /sitecore/templates/Project/brother/ArticlePage/Content
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
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

  await mkdir(join(TEMPLATES, 'ArticlePage', 'Content'), { recursive: true });
  const fields = [
    { name: 'Eyebrow', title: 'Eyebrow', type: 'Single-Line Text', sort: 100 },
    { name: 'Title', title: 'Title', type: 'Single-Line Text', sort: 200 },
    { name: 'Lead', title: 'Lead', type: 'Multi-Line Text', sort: 300 },
    { name: 'Body', title: 'Body', type: 'Rich Text', sort: 400 },
    { name: 'HeroImage', title: 'Hero Image', type: 'Image', sort: 500 },
    { name: 'CtaLink', title: 'CTA Link', type: 'General Link', sort: 600 },
    { name: 'Author', title: 'Author', type: 'Single-Line Text', sort: 700 },
    { name: 'PublishedDate', title: 'Published Date', type: 'Date', sort: 800 },
  ];
  let n = 0x31;
  for (const f of fields) {
    const id = `b40e0007-7777-4000-8000-0000000000${n.toString(16).padStart(2, '0')}`;
    n += 1;
    await writeFile(
      join(TEMPLATES, 'ArticlePage', 'Content', `${f.name}.yml`),
      fieldYaml({
        id,
        parentId: contentSectionId,
        path: `/sitecore/templates/Project/brother/ArticlePage/Content/${f.name}`,
        name: f.name,
        title: f.title,
        type: f.type,
        sort: f.sort,
      }),
      'utf8'
    );
  }
  console.log('ArticlePage template written.');
}

async function ensureDataFolders() {
  const dataRoot = join(SERIALIZED, 'brother', 'brother', 'Data');
  const dataRootId = await readItemId(join(dataRoot + '.yml').replace(/\.yml$/, '')).catch(() => null);
  // Data folder item lives at brother/brother/Data.yml
  const dataYml = join(SERIALIZED, 'brother', 'brother', 'Data.yml');
  let parentId = 'unknown';
  if (await fileExists(dataYml)) {
    const raw = await readFile(dataYml, 'utf8');
    const m = raw.match(/^ID:\s*"([^"]+)"/m);
    if (m) parentId = m[1];
  }

  const folders = [
    { name: 'Headers', templateHint: 'Header Folder', id: 'b40e00a1-1111-4000-8000-000000000009' },
    { name: 'Hero Banners', templateHint: 'HeroBanner Folder', id: 'b40e00a1-1111-4000-8000-000000000001' },
    { name: 'Feature Grids', templateHint: 'FeatureGrid Folder', id: 'b40e00a1-1111-4000-8000-000000000002' },
    { name: 'Product Listings', templateHint: 'ProductListing Folder', id: 'b40e00a1-1111-4000-8000-000000000003' },
    { name: 'Articles', templateHint: 'ArticleBody Folder', id: 'b40e00a1-1111-4000-8000-000000000004' },
    { name: 'Promo Strips', templateHint: 'PromoStrip Folder', id: 'b40e00a1-1111-4000-8000-000000000005' },
    { name: 'Product Details', templateHint: 'ProductDetail Folder', id: 'b40e00a1-1111-4000-8000-000000000006' },
    { name: 'Related Products', templateHint: 'RelatedProducts Folder', id: 'b40e00a1-1111-4000-8000-000000000007' },
    { name: 'Campaign Landings', templateHint: 'CampaignLanding Folder', id: 'b40e00a1-1111-4000-8000-000000000008' },
  ];

  // Resolve folder template IDs from generated template YAML
  for (const folder of folders) {
    const folderTpl = await findTemplateId(`${folder.templateHint}.yml`);
    if (!folderTpl) {
      console.warn(`Skip Data/${folder.name} — template ${folder.templateHint} not found yet`);
      continue;
    }
    const outDir = join(dataRoot, folder.name);
    // Data child folders are single YAML files typically
    const outFile = join(dataRoot, `${folder.name}.yml`);
    const yaml = `---
ID: "${folder.id}"
Parent: "${parentId}"
Template: "${folderTpl}"
Path: /sitecore/content/brother/brother/Data/${folder.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`;
    await writeFile(outFile, yaml, 'utf8');
    console.log(`Data folder: ${folder.name}`);
  }
}

async function readItemId(pathWithoutExt) {
  void pathWithoutExt;
  return null;
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
  return walk(join(TEMPLATES));
}

async function main() {
  for (const name of COMPONENTS) {
    await generateOne(name);
  }
  await ensureProductPageFields();
  await ensureArticlePage();
  await ensureDataFolders();
  console.log('\nDone. Run: dotnet sitecore serialization validate --fix -i brother-scs');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
