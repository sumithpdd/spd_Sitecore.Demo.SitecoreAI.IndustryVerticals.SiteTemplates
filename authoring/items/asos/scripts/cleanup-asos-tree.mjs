/**
 * Split the ASOS tree the way FormaLux does.
 * Pages stay under Home. Products sit under Home/Products.
 * Taxonomy and the old Catalogue / Sites / Shared / Signals branches sit under Data.
 * Path segments that are not real pages become folders.
 * Run from anywhere: node authoring/items/asos/scripts/cleanup-asos-tree.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const contentRoot = path.join(repo, 'authoring/items/asos/serialized-content');
const srcRoot = path.join(repo, 'industry-verticals/asos/src');

const HOME = '41ee7ce2-a19d-4854-883c-4b1cc8fb50fb';
const DATA = '2f38f703-598e-43b8-8538-1f6a42df2768';
const T_PAGE = '328222ce-19c6-4866-a39e-849665790932';
const T_FOLDER = 'a87a00b1-e6db-45ab-8b54-636fec3b5523';
const T_PDP = 'a50c0003-0000-4000-8000-000000000020';
const F_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_CATEGORIES = 'a50c0003-0000-4000-8000-000000000052';
const WOMEN_TAXON = '{A50C0005-0000-4000-8000-000000000004}';
const DENIM_TAXON = '{A50C0005-0000-4000-8000-000000000024}';
const PRODUCTS = 'a50c0005-0000-4000-8000-000000000202';
const EDITS = 'a50c0005-0000-4000-8000-000000000203';
const MEN = 'a50c0005-0000-4000-8000-000000000201';
const HOME_PATH = '/sitecore/content/asos/asos/Home';
const SITE_PATH = '/sitecore/content/asos/asos';
const DATA_PATH = `${SITE_PATH}/Data`;

const KEEP = new Set([
  'account',
  'my-edit',
  'saved-items',
  'shared-board',
  'search',
  'style-feed',
  'bag',
  'curation-insight',
  'women',
  'petite-denim',
]);

const EDIT_SLUGS = [
  'the-denim-drop',
  'festival-2-0',
  'your-new-uniform',
  'chocolate',
  'polka-dot',
  'rugby-tops',
  'topshop-catwalk',
];

const PRESENTATION = [
  ['account', '{A50C0001-1111-4000-8000-000000000018}', '{A50C2200-0000-4000-8000-000000000018}', '100'],
  ['my-edit', '{A50C0001-1111-4000-8000-000000000019}', '{A50C2200-0000-4000-8000-000000000019}', '400'],
  ['saved-items', '{A50C0001-1111-4000-8000-000000000020}', '{A50C2200-0000-4000-8000-000000000020}', '500'],
  ['shared-board', '{A50C0001-1111-4000-8000-000000000021}', '{A50C2200-0000-4000-8000-000000000021}', '600'],
  ['bag', '{A50C0001-1111-4000-8000-000000000022}', '{A50C2200-0000-4000-8000-000000000022}', '820'],
  ['curation-insight', '{A50C0001-1111-4000-8000-000000000023}', '{A50C2200-0000-4000-8000-000000000023}', '830'],
];

function walk(dir, acc = [], ext = '.yml') {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc, ext);
    else if (typeof ext === 'string' ? name.endsWith(ext) : ext.test(name)) acc.push(full);
  }
  return acc;
}

function readItem(file) {
  const text = fs.readFileSync(file, 'utf8');
  const id = text.match(/^ID:\s*"([^"]+)"/m)?.[1];
  const parent = text.match(/^Parent:\s*"([^"]+)"/m)?.[1];
  const itemPath = text.match(/^Path:\s*"?([^"\r\n]+)"?/m)?.[1]?.trim();
  const template = text.match(/^Template:\s*"([^"]+)"/m)?.[1];
  if (!id || !itemPath) return null;
  const nl = text.includes('\r\n') ? '\r\n' : '\n';
  return { file, text, id, parent, path: itemPath, template, nl };
}

function setLine(item, key, value) {
  const re = new RegExp(`^${key}:\\s*"?[^"\\r\\n]+"?`, 'm');
  if (!re.test(item.text)) throw new Error(`missing ${key} in ${item.file}`);
  item.text = item.text.replace(re, `${key}: "${value}"`);
}

function movePrefix(items, from, to, newParent) {
  let roots = 0;
  let count = 0;
  for (const item of items) {
    if (item.path !== from && !item.path.startsWith(`${from}/`)) continue;
    if (item.path === from) {
      item.parent = newParent;
      setLine(item, 'Parent', newParent);
      roots += 1;
    }
    item.path = to + item.path.slice(from.length);
    setLine(item, 'Path', item.path);
    count += 1;
  }
  console.log(roots ? `moved ${from} -> ${to} (${count})` : `skip ${from}`);
}

function ensureShared(item) {
  if (/^SharedFields:/m.test(item.text)) return;
  item.text = item.text.replace(/^Languages:/m, `SharedFields:${item.nl}Languages:`);
}

function upsertShared(item, id, hint, value) {
  if (item.text.includes(id)) return;
  ensureShared(item);
  const block = `- ID: "${id}"${item.nl}  Hint: ${hint}${item.nl}  Value: ${value}${item.nl}`;
  item.text = item.text.replace(/^Languages:/m, `${block}Languages:`);
}

function renderingXml(uid, renderingId) {
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="${uid}"
          p:before="*"
          s:id="${renderingId}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>`;
}

function indentedXml(uid, renderingId, nl) {
  return renderingXml(uid, renderingId)
    .split('\n')
    .map((line) => `    ${line}`)
    .join(nl);
}

const files = walk(contentRoot);
const items = files.map(readItem).filter(Boolean);
const productsPath = `${HOME_PATH}/Products`;
const editsPath = `${HOME_PATH}/edits`;

function writeNew(rel, text, item) {
  const file = path.join(contentRoot, 'asos/asos', rel);
  if (items.some((entry) => entry.path === item.path || entry.id === item.id)) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
  items.push({ ...item, file, text, nl: '\r\n' });
  console.log(`created ${item.path}`);
}

const productsXml = indentedXml(
  '{A50C2200-0000-4000-8000-000000000030}',
  '{A50C0001-1111-4000-8000-000000000005}',
  '\r\n'
);
writeNew(
  'Home/Products.yml',
  `---\r\nID: "${PRODUCTS}"\r\nParent: "${HOME}"\r\nTemplate: "${T_PAGE}"\r\nPath: "${productsPath}"\r\nSharedFields:\r\n- ID: "${F_SORT}"\r\n  Hint: __Sortorder\r\n  Value: "300"\r\n- ID: "${F_DESIGN}"\r\n  Hint: Page Design\r\n  Value: "{A50C0001-5555-4000-8000-000000000004}"\r\n- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\r\n  Hint: __Renderings\r\n  Value: |\r\n${productsXml}\r\nLanguages:\r\n- Language: en\r\n  Versions:\r\n  - Version: 1\r\n    Fields:\r\n    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\r\n      Hint: __Created\r\n      Value: 20260926T220000Z\r\n    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\r\n      Hint: NavigationTitle\r\n      Value: "Products"\r\n    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"\r\n      Hint: __Revision\r\n      Value: "${PRODUCTS}"\r\n    - ID: "6a4b1abd-d0db-4e90-85aa-d79227995290"\r\n      Hint: Title\r\n      Value: "Products"\r\n`,
  { id: PRODUCTS, parent: HOME, path: productsPath, template: T_PAGE }
);

writeNew(
  'Home/edits.yml',
  `---\r\nID: "${EDITS}"\r\nParent: "${HOME}"\r\nTemplate: "${T_FOLDER}"\r\nPath: "${editsPath}"\r\nSharedFields:\r\n- ID: "${F_SORT}"\r\n  Hint: __Sortorder\r\n  Value: "700"\r\nLanguages:\r\n- Language: en\r\n  Versions:\r\n  - Version: 1\r\n    Fields:\r\n    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\r\n      Hint: __Created\r\n      Value: 20260926T220000Z\r\n`,
  { id: EDITS, parent: HOME, path: editsPath, template: T_FOLDER }
);

movePrefix(items, `${SITE_PATH}/Shared/Taxonomy`, `${DATA_PATH}/Categories`, DATA);
for (const name of ['Catalogue', 'Sites', 'Shared', 'Signals']) {
  movePrefix(items, `${SITE_PATH}/${name}`, `${DATA_PATH}/${name}`, DATA);
}
for (const slug of EDIT_SLUGS) {
  movePrefix(items, `${HOME_PATH}/${slug}`, `${editsPath}/${slug}`, EDITS);
}
for (const slug of ['us', 'au', 'de']) {
  movePrefix(items, `${HOME_PATH}/${slug}`, `${DATA_PATH}/${slug}`, DATA);
}

const homeChildren = items.filter(
  (item) => item.parent === HOME && item.path.startsWith(`${HOME_PATH}/`) && !item.path.slice(HOME_PATH.length + 1).includes('/')
);
for (const child of [...homeChildren]) {
  const seg = child.path.slice(HOME_PATH.length + 1);
  if (KEEP.has(seg) || seg === 'Products' || seg === 'edits' || seg === 'men') continue;
  movePrefix(items, child.path, `${productsPath}/${seg}`, PRODUCTS);
}

let folders = 0;
for (const item of items) {
  if (item.template !== T_PAGE || item.text.includes('__Renderings')) continue;
  const rel = item.path.startsWith(`${HOME_PATH}/`) ? item.path.slice(HOME_PATH.length + 1) : '';
  if (rel && !rel.includes('/') && KEEP.has(rel)) continue;
  item.template = T_FOLDER;
  setLine(item, 'Template', T_FOLDER);
  item.text = item.text.replace(
    new RegExp(`- ID: "${F_DESIGN}"\\r?\\n  Hint: Page Design\\r?\\n  Value: "[^"]+"\\r?\\n`),
    ''
  );
  item.text = item.text.replace(/^SharedFields:\r?\n(?=Languages:)/m, '');
  folders += 1;
}
console.log(`folders (were empty pages): ${folders}`);

for (const [seg, renderingId, uid, sort] of PRESENTATION) {
  const item = items.find((entry) => entry.path === `${HOME_PATH}/${seg}`);
  if (!item) {
    console.log(`missing ${seg}`);
    continue;
  }
  if (item.template !== T_PAGE) {
    item.template = T_PAGE;
    setLine(item, 'Template', T_PAGE);
  }
  if (!item.text.includes('__Renderings')) {
    upsertShared(item, F_DESIGN, 'Page Design', '"{A50C0001-5555-4000-8000-000000000001}"');
    upsertShared(
      item,
      'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e',
      '__Renderings',
      `|${item.nl}${indentedXml(uid, renderingId, item.nl)}`
    );
  }
  upsertShared(item, F_SORT, '__Sortorder', `"${sort}"`);
}

const menPath = `${HOME_PATH}/men`;
if (!items.some((item) => item.path === menPath)) {
  const xml = indentedXml(
    '{A50C2200-0000-4000-8000-000000000024}',
    '{A50C0001-1111-4000-8000-000000000004}',
    '\r\n'
  );
  const file = path.join(contentRoot, 'asos/asos/Home/men.yml');
  fs.writeFileSync(
    file,
    `---\r\nID: "${MEN}"\r\nParent: "${HOME}"\r\nTemplate: "${T_PAGE}"\r\nPath: "${menPath}"\r\nSharedFields:\r\n- ID: "${F_SORT}"\r\n  Hint: __Sortorder\r\n  Value: "210"\r\n- ID: "${F_DESIGN}"\r\n  Hint: Page Design\r\n  Value: "{A50C0001-5555-4000-8000-000000000001}"\r\n- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"\r\n  Hint: __Renderings\r\n  Value: |\r\n${xml}\r\nLanguages:\r\n- Language: en\r\n  Versions:\r\n  - Version: 1\r\n    Fields:\r\n    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\r\n      Hint: __Created\r\n      Value: 20260926T220000Z\r\n    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\r\n      Hint: NavigationTitle\r\n      Value: "Men"\r\n    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"\r\n      Hint: __Revision\r\n      Value: "${MEN}"\r\n    - ID: "6a4b1abd-d0db-4e90-85aa-d79227995290"\r\n      Hint: Title\r\n      Value: "Men"\r\n`
  );
  console.log(`created ${menPath}`);
}

let tagged = 0;
for (const item of items) {
  if (item.template !== T_PDP || item.text.includes(F_CATEGORIES)) continue;
  upsertShared(item, F_CATEGORIES, 'Categories', `"${WOMEN_TAXON}|${DENIM_TAXON}"`);
  tagged += 1;
}
console.log(`products tagged women + denim: ${tagged}`);

for (const item of items) fs.writeFileSync(item.file, item.text);

function writeRendering(name, id, componentName) {
  const file = path.join(contentRoot, 'renderings/asos', `${name}.yml`);
  fs.writeFileSync(
    file,
    `---\r\nID: "${id}"\r\nParent: "e7b11b95-22e4-4696-af91-1e432316f5c1"\r\nTemplate: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"\r\nPath: /sitecore/layout/Renderings/Project/asos/${name}\r\nSharedFields:\r\n- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"\r\n  Hint: componentName\r\n  Value: ${componentName}\r\n- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"\r\n  Hint: __Icon\r\n  Value: Office/32x32/element.png\r\n- ID: "a77e8568-1ab3-44f1-a664-b7c37ec7810d"\r\n  Hint: Parameters Template\r\n  Value: "{6585B711-C55F-4495-B752-34889F40D233}"\r\nLanguages:\r\n- Language: en\r\n  Versions:\r\n  - Version: 1\r\n    Fields:\r\n    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\r\n      Hint: __Created\r\n      Value: 20260926T220000Z\r\n    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"\r\n      Hint: __Revision\r\n      Value: "${id}"\r\n`
  );
}

writeRendering('AccountSignIn', 'a50c0001-1111-4000-8000-000000000018', 'AccountSignIn');
writeRendering('MyEdit', 'a50c0001-1111-4000-8000-000000000019', 'MyEdit');
writeRendering('SavedItems', 'a50c0001-1111-4000-8000-000000000020', 'SavedItems');
writeRendering('SharedBoard', 'a50c0001-1111-4000-8000-000000000021', 'SharedBoard');
writeRendering('BagCheckout', 'a50c0001-1111-4000-8000-000000000022', 'BagCheckout');
writeRendering('CurationInsight', 'a50c0001-1111-4000-8000-000000000023', 'CurationInsight');

const available = path.join(contentRoot, 'asos/asos/Presentation/Available Renderings/ASOS.yml');
let availableText = fs.readFileSync(available, 'utf8');
const availableNl = availableText.includes('\r\n') ? '\r\n' : '\n';
const extra = [];
for (let n = 18; n <= 23; n += 1) {
  const id = `{A50C0001-1111-4000-8000-${String(n).padStart(12, '0')}}`;
  if (!availableText.includes(id)) extra.push(`    ${id}`);
}
if (extra.length) {
  availableText = availableText.replace(
    '{A50C0001-1111-4000-8000-000000000017}',
    `{A50C0001-1111-4000-8000-000000000017}${availableNl}${extra.join(availableNl)}`
  );
  fs.writeFileSync(available, availableText);
}

const fieldFile = path.join(contentRoot, 'templates/asos/ProductPage/Content/Categories.yml');
if (!fs.existsSync(fieldFile)) {
  fs.writeFileSync(
    fieldFile,
    `---\r\nID: "${F_CATEGORIES}"\r\nParent: "a50c0003-0000-4000-8000-000000000022"\r\nTemplate: "455a3e98-a627-4b40-8035-e683a0331ac7"\r\nPath: /sitecore/templates/Project/asos/ProductPage/Content/Categories\r\nSharedFields:\r\n- ID: "1eb8ae32-e190-44a6-968d-ed904c794ebf"\r\n  Hint: Source\r\n  Value: "${DATA_PATH}/Categories"\r\n- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"\r\n  Hint: Type\r\n  Value: "Treelist"\r\n- ID: "${F_SORT}"\r\n  Hint: __Sortorder\r\n  Value: 800\r\nLanguages:\r\n- Language: en\r\n  Fields:\r\n  - ID: "19a69332-a23e-4e70-8d16-b2640cb24cc8"\r\n    Hint: Title\r\n    Value: "Categories"\r\n  Versions:\r\n  - Version: 1\r\n    Fields:\r\n    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"\r\n      Hint: __Created\r\n      Value: 20260926T220000Z\r\n`
  );
}

function rewriteHref(text) {
  let next = text;
  for (const slug of EDIT_SLUGS) {
    next = next.replaceAll(`/${slug}/`, `/edits/${slug}/`);
  }
  next = next.replace(
    /(?<![\w/])\/(?!products\/|edits\/|women\/)([a-z0-9-]+)\/([a-z0-9-]+)\/prd\//g,
    '/products/$1/$2/prd/'
  );
  next = next.replace(
    'href: `/${seed.brand.toLowerCase().replace(/\\s+/g, \'-\')}/${slug}/prd/${id}`',
    'href: `/products/${seed.brand.toLowerCase().replace(/\\s+/g, \'-\')}/${slug}/prd/${id}`'
  );
  return next;
}

let hrefFiles = 0;
const srcFiles = walk(srcRoot, [], /\.(ts|tsx|json)$/);
console.log(`src files ${srcFiles.length} from ${srcRoot}`);
for (const file of srcFiles) {
  if (!/\.(ts|tsx|json)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const next = rewriteHref(text);
  if (next !== text) {
    fs.writeFileSync(file, next);
    hrefFiles += 1;
  }
}
console.log(`href files updated: ${hrefFiles}`);
console.log('Next: dotnet sitecore serialization validate --fix -i asos-scs');
