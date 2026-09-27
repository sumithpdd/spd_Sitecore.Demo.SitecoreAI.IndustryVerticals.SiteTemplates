/**
 * Make ASOS pages editable.
 * - Home banner, edit row, new-in row, and global banner get datasource items.
 * - Each product is Home/Products/{slug} (brand / name / prd folders retire).
 * - Each category is the listing page itself (no /cat child).
 * Run from the repo root: node authoring/items/asos/scripts/flatten-asos-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

if (!process.argv.includes('--force')) {
  console.error('Pages are already flat. Pass --force only if you mean to run this again.');
  process.exit(0);
}

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const contentRoot = path.join(repo, 'authoring/items/asos/serialized-content');
const srcRoot = path.join(repo, 'industry-verticals/asos/src');

const T_FOLDER = 'a87a00b1-e6db-45ab-8b54-636fec3b5523';
const T_PDP = 'a50c0003-0000-4000-8000-000000000020';
const T_LISTING = 'a50c0003-0000-4000-8000-000000000030';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FOLDER_ITEM = 'a87a00b1-e6db-45ab-8b54-636fec3b5523';
const PROJECT_TEMPLATES = '0a060f37-915c-41e0-a0f5-4348e8581e0a';
const DATA = '2f38f703-598e-43b8-8538-1f6a42df2768';
const WOMEN = 'a50c0002-0000-4000-8000-000000000001';
const PRODUCTS = 'a50c0005-0000-4000-8000-000000000202';
const RETIRED = 'a50c0006-0000-4000-8000-000000000001';
const HOME_COMPONENTS = 'a50c0006-0000-4000-8000-000000000002';
const F_CATEGORY = 'a50c0003-0000-4000-8000-000000000033';
const F_TITLE = '6a4b1abd-d0db-4e90-85aa-d79227995290';
const F_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const DESIGN_LISTING = '{A50C0001-5555-4000-8000-000000000004}';
const RENDER_LISTING = '{A50C0001-1111-4000-8000-000000000005}';
const HOME = '/sitecore/content/asos/asos/Home';

const CREATED = '20260927T090000Z';

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, acc);
    else if (name.endsWith('.yml')) acc.push(full);
  }
  return acc;
}

function nlOf(text) {
  return text.includes('\r\n') ? '\r\n' : '\n';
}

function fieldValue(text, hint) {
  const match = text.match(new RegExp(`Hint: ${hint}\\r?\\n\\s+Value: "?([^"\\r\\n]*)"?`));
  return match?.[1]?.trim() || '';
}

function setLine(text, key, value) {
  return text.replace(new RegExp(`^${key}:\\s*[^\\r\\n]+`, 'm'), `${key}: "${value}"`);
}

function listingXml(uid) {
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="${uid}"
          p:before="*"
          s:id="${RENDER_LISTING}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>`;
}

function upsertLanguageField(text, id, hint, value) {
  const nl = nlOf(text);
  const line = `    - ID: "${id}"${nl}      Hint: ${hint}${nl}      Value: ${JSON.stringify(value)}`;
  const existing = new RegExp(
    `    - ID: "${id}"\\r?\\n      Hint: [^\\r\\n]+\\r?\\n      Value: .*`
  );
  if (existing.test(text)) return text.replace(existing, line);
  const anchor = `${nl}    - ID: "${F_TITLE}"`;
  if (text.includes(anchor)) return text.replace(anchor, `${nl}${line}${anchor}`);
  return text.replace(
    /Hint: Title\r?\n\s+Value: .*/,
    (block) => `${block}${nl}${line}`
  );
}

function ensureListingPresentation(text, itemId) {
  const nl = nlOf(text);
  const uid = `{${itemId.toUpperCase()}}`;
  const shared = [
    `- ID: "${F_DESIGN}"`,
    '  Hint: Page Design',
    `  Value: "${DESIGN_LISTING}"`,
    `- ID: "${F_RENDERINGS}"`,
    '  Hint: __Renderings',
    '  Value: |',
    ...listingXml(uid).split('\n').map((line) => `    ${line}`),
  ].join(nl);
  if (text.includes('Hint: __Renderings')) return text;
  if (text.includes('SharedFields:')) {
    return text.replace(/SharedFields:\r?\n/, `SharedFields:${nl}${shared}${nl}`);
  }
  return text.replace(/\r?\nLanguages:\r?\n/, `${nl}SharedFields:${nl}${shared}${nl}Languages:${nl}`);
}

function promoteListing(text, itemId, cid, title) {
  let next = setLine(text, 'Template', T_LISTING);
  next = ensureListingPresentation(next, itemId);
  next = upsertLanguageField(next, F_CATEGORY, 'CategoryId', cid);
  if (title) next = upsertLanguageField(next, F_TITLE, 'Title', title);
  return next;
}

function retire(text, itemId) {
  const name = `r-${itemId.replace(/-/g, '')}`;
  let next = setLine(text, 'Parent', RETIRED);
  next = setLine(next, 'Path', `/sitecore/content/asos/asos/Data/Retired/${name}`);
  return next;
}

const PROMOTE = [
  ['/sitecore/content/asos/asos/Home/women/new-in', '27108', "Women's New In"],
  ['/sitecore/content/asos/asos/Home/petite-denim', '88016', 'Petite denim'],
  ['/sitecore/content/asos/asos/Home/edits/the-denim-drop', '88011', 'The denim drop'],
  ['/sitecore/content/asos/asos/Home/edits/festival-2-0', '88012', 'Festival 2.0'],
  ['/sitecore/content/asos/asos/Home/edits/your-new-uniform', '88013', 'Your new uniform'],
  ['/sitecore/content/asos/asos/Home/edits/chocolate', '91001', 'Chocolate'],
  ['/sitecore/content/asos/asos/Home/edits/polka-dot', '91002', 'Polka dot'],
  ['/sitecore/content/asos/asos/Home/edits/rugby-tops', '91003', 'Rugby tops'],
  ['/sitecore/content/asos/asos/Home/edits/topshop-catwalk', '88014', 'Topshop Catwalk'],
];

const MOVE_CAT = [
  ['/sitecore/content/asos/asos/Home/women/trends/denim/cat', '/sitecore/content/asos/asos/Home/women/denim', '17014', 'Denim'],
  ['/sitecore/content/asos/asos/Home/women/ctas/hub-edit-12/cat', '/sitecore/content/asos/asos/Home/women/selling-fast', '51126', 'New In: Selling Fast'],
  ['/sitecore/content/asos/asos/Home/women/ctas/social-edit-22/cat', '/sitecore/content/asos/asos/Home/women/new-season-colours', '52649', 'New season colours'],
  ['/sitecore/content/asos/asos/Home/women/ctas/curated-category-13/cat', '/sitecore/content/asos/asos/Home/women/new-season-edit', '52558', 'New-season edit'],
  ['/sitecore/content/asos/asos/Home/women/ctas/topshop-edit-9/cat', '/sitecore/content/asos/asos/Home/women/september-shift', '52393', 'September Shift'],
  ['/sitecore/content/asos/asos/Home/women/sale/ctas/price-point-2/cat', '/sitecore/content/asos/asos/Home/women/sale-under-10', '51237', 'Sale under £10'],
  ['/sitecore/content/asos/asos/Home/women/a-to-z-of-brands/topshop/cat', '/sitecore/content/asos/asos/Home/women/topshop', '29299', 'Topshop'],
];

const files = walk(contentRoot);
const sample = fs.readFileSync(files[0], 'utf8');
const nl = nlOf(sample);

const items = files.map((file) => {
  const text = fs.readFileSync(file, 'utf8');
  return {
    file,
    text,
    id: text.match(/^ID:\s*"([^"]+)"/m)?.[1] || '',
    path: text.match(/^Path:\s*"?([^"\r\n]+)"?/m)?.[1]?.trim() || '',
    template: text.match(/^Template:\s*"([^"]+)"/m)?.[1] || '',
  };
});

const byPath = new Map(items.map((item) => [item.path, item]));
const productRe = /^\/sitecore\/content\/asos\/asos\/Home\/Products\/([^/]+)\/([^/]+)\/prd\/([^/]+)$/;
const taken = new Set(items.map((item) => item.path));
let movedProducts = 0;
let skippedProducts = 0;

for (const item of items) {
  if (item.template !== T_PDP) continue;
  const match = item.path.match(productRe);
  if (!match) {
    if (item.path.startsWith(`${HOME}/Products/`)) skippedProducts += 1;
    continue;
  }
  const slug = match[2];
  const productId = match[3];
  let name = slug;
  let nextPath = `${HOME}/Products/${name}`;
  if (taken.has(nextPath) && byPath.get(nextPath) !== item) name = `${slug}-${productId}`;
  nextPath = `${HOME}/Products/${name}`;
  if (item.path === nextPath) continue;
  taken.delete(item.path);
  taken.add(nextPath);
  item.text = setLine(setLine(item.text, 'Parent', PRODUCTS), 'Path', nextPath);
  item.path = nextPath;
  item.template = T_PDP;
  movedProducts += 1;
}

const catRetire = new Set(PROMOTE.map(([occupant]) => `${occupant}/cat`));

for (const [occupantPath, cid, title] of PROMOTE) {
  const occupant = byPath.get(occupantPath);
  if (!occupant) throw new Error(`Missing listing page ${occupantPath}`);
  occupant.text = promoteListing(occupant.text, occupant.id, cid, title);
  occupant.template = T_LISTING;
}

for (const [from, to, cid, title] of MOVE_CAT) {
  const cat = byPath.get(from);
  if (!cat) throw new Error(`Missing category ${from}`);
  cat.text = setLine(setLine(cat.text, 'Parent', WOMEN), 'Path', to);
  cat.text = promoteListing(cat.text, cat.id, cid, title);
  cat.path = to;
  cat.template = T_LISTING;
}

let retired = 0;
for (const item of items) {
  if (item.path.startsWith('/sitecore/content/asos/asos/Data/Retired/')) continue;
  const underProducts = item.path.startsWith(`${HOME}/Products/`) && item.template === T_FOLDER;
  const underWomen = item.path.startsWith(`${HOME}/women/`) && item.template === T_FOLDER;
  const underEdits =
    item.path.startsWith(`${HOME}/edits/`) &&
    item.path !== `${HOME}/edits` &&
    item.template === T_FOLDER;
  const oldCat = catRetire.has(item.path);
  if (!underProducts && !underWomen && !underEdits && !oldCat) continue;
  item.text = retire(item.text, item.id);
  item.path = `/sitecore/content/asos/asos/Data/Retired/r-${item.id.replace(/-/g, '')}`;
  retired += 1;
}

for (const item of items) fs.writeFileSync(item.file, item.text);

const wide = items
  .filter((item) => item.template === T_PDP && item.path.startsWith(`${HOME}/Products/`))
  .map((item) => ({
    id: fieldValue(item.text, 'ProductId'),
    title: fieldValue(item.text, 'Title'),
    price: Number(fieldValue(item.text, 'Price')) || 999,
  }))
  .filter((row) => row.id);
const preferred = wide.filter((row) => /wide/i.test(row.title) && row.price <= 50);
const productIds = (preferred.length >= 8 ? preferred : wide).slice(0, 8).map((row) => row.id);

function itemYaml({ id, parent, template, itemPath, fields }) {
  const fieldLines = fields
    .map((field) => {
      if (field.multiline) {
        return `    - ID: "${field.id}"${nl}      Hint: ${field.hint}${nl}      Value: |${nl}        ${field.value}`;
      }
      return `    - ID: "${field.id}"${nl}      Hint: ${field.hint}${nl}      Value: ${JSON.stringify(field.value)}`;
    })
    .join(nl);
  return [
    '---',
    `ID: "${id}"`,
    `Parent: "${parent}"`,
    `Template: "${template}"`,
    `Path: "${itemPath}"`,
    'Languages:',
    '- Language: en',
    '  Versions:',
    '  - Version: 1',
    '    Fields:',
    `    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"`,
    '      Hint: __Created',
    `      Value: ${CREATED}`,
    fieldLines,
    '',
  ].join(nl);
}

function templateYaml({ id, parent, template, itemPath, shared }) {
  return [
    '---',
    `ID: "${id}"`,
    `Parent: "${parent}"`,
    `Template: "${template}"`,
    `Path: ${itemPath}`,
    'SharedFields:',
    shared,
    'Languages:',
    '- Language: en',
    '  Versions:',
    '  - Version: 1',
    '    Fields:',
    '    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"',
    '      Hint: __Created',
    `      Value: ${CREATED}`,
    '',
  ].join(nl);
}

function fieldTemplate(id, parent, itemPath, type, sort) {
  return templateYaml({
    id,
    parent,
    template: T_FIELD,
    itemPath,
    shared: [
      '- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"',
      '  Hint: Type',
      `  Value: "${type}"`,
      '- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"',
      '  Hint: __Sortorder',
      `  Value: ${sort}`,
    ].join(nl),
  });
}

function writeNew(rel, body) {
  const full = path.join(contentRoot, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  if (!fs.existsSync(full)) fs.writeFileSync(full, body);
}

writeNew(
  'asos/asos/Data/Retired.yml',
  itemYaml({
    id: RETIRED,
    parent: DATA,
    template: T_FOLDER_ITEM,
    itemPath: '/sitecore/content/asos/asos/Data/Retired',
    fields: [
      { id: F_TITLE, hint: 'Title', value: 'Retired path folders' },
    ],
  })
);

writeNew(
  'asos/asos/Data/HomeComponents.yml',
  itemYaml({
    id: HOME_COMPONENTS,
    parent: DATA,
    template: T_FOLDER_ITEM,
    itemPath: '/sitecore/content/asos/asos/Data/HomeComponents',
    fields: [{ id: F_TITLE, hint: 'Title', value: 'Home components' }],
  })
);

const image = (src, damId, alt) =>
  `<Image src="${src}" dam-id="${damId}" alt="${alt}" dam-content-type="Image" />`;

writeNew(
  'asos/asos/Data/HomeComponents/GlobalBanner.yml',
  itemYaml({
    id: 'a50c0006-0000-4000-8000-000000000010',
    parent: HOME_COMPONENTS,
    template: 'a50c0003-0000-4000-8000-000000000060',
    itemPath: '/sitecore/content/asos/asos/Data/HomeComponents/GlobalBanner',
    fields: [
      {
        id: 'a50c0003-0000-4000-8000-000000000062',
        hint: 'Message',
        value: 'Wide-leg jeans under £50<br />Shop the Berlin, October edit',
      },
      { id: 'a50c0003-0000-4000-8000-000000000064', hint: 'WomenLabel', value: 'WOMEN' },
      { id: 'a50c0003-0000-4000-8000-000000000065', hint: 'MenLabel', value: 'MEN' },
      { id: 'a50c0003-0000-4000-8000-000000000066', hint: 'WomenHref', value: '/edits/the-denim-drop' },
      { id: 'a50c0003-0000-4000-8000-000000000067', hint: 'MenHref', value: '/men' },
    ],
  })
);

const HB = 'a50c0003-0000-4000-8000-00000000008';
writeNew(
  'templates/asos/HomeBanner.yml',
  templateYaml({
    id: `${HB}0`,
    parent: PROJECT_TEMPLATES,
    template: T_TEMPLATE,
    itemPath: '/sitecore/templates/Project/asos/HomeBanner',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);
writeNew(
  'templates/asos/HomeBanner/Content.yml',
  templateYaml({
    id: `${HB}1`,
    parent: `${HB}0`,
    template: T_SECTION,
    itemPath: '/sitecore/templates/Project/asos/HomeBanner/Content',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);

const homeBannerFields = [
  ['2', 'Title', 'Single-Line Text', 100],
  ['3', 'WomenLabel', 'Single-Line Text', 200],
  ['4', 'MenLabel', 'Single-Line Text', 300],
  ['5', 'WomenHref', 'Single-Line Text', 400],
  ['6', 'MenHref', 'Single-Line Text', 500],
  ['7', 'WomenImage', 'Image', 600],
  ['8', 'MenImage', 'Image', 700],
];
for (const [suffix, name, type, sort] of homeBannerFields) {
  writeNew(
    `templates/asos/HomeBanner/Content/${name}.yml`,
    fieldTemplate(`${HB}${suffix}`, `${HB}1`, `/sitecore/templates/Project/asos/HomeBanner/Content/${name}`, type, sort)
  );
}

writeNew(
  'asos/asos/Data/HomeComponents/HomeBanner.yml',
  itemYaml({
    id: 'a50c0006-0000-4000-8000-000000000011',
    parent: HOME_COMPONENTS,
    template: `${HB}0`,
    itemPath: '/sitecore/content/asos/asos/Data/HomeComponents/HomeBanner',
    fields: [
      { id: `${HB}2`, hint: 'Title', value: 'ASOS | This is ASOS' },
      { id: `${HB}3`, hint: 'WomenLabel', value: 'Women' },
      { id: `${HB}4`, hint: 'MenLabel', value: 'Men' },
      { id: `${HB}5`, hint: 'WomenHref', value: '/women' },
      { id: `${HB}6`, hint: 'MenHref', value: '/men' },
      {
        id: `${HB}7`,
        hint: 'WomenImage',
        multiline: true,
        value: image(
          'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/dc0ee29665c54df49a3670d0d024088c',
          'pbO-Qw4IQ9qGdmCYuadi5g',
          'Women'
        ),
      },
      {
        id: `${HB}8`,
        hint: 'MenImage',
        multiline: true,
        value: image(
          'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/0538e470e79b4b8c8f220041e98551a3',
          'jj_pj6pbS2GBKd42qmk_2w',
          'Men'
        ),
      },
    ],
  })
);

const ED = 'a50c0003-0000-4000-8000-00000000009';
writeNew(
  'templates/asos/Edit.yml',
  templateYaml({
    id: `${ED}0`,
    parent: PROJECT_TEMPLATES,
    template: T_TEMPLATE,
    itemPath: '/sitecore/templates/Project/asos/Edit',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);
writeNew(
  'templates/asos/Edit/Content.yml',
  templateYaml({
    id: `${ED}1`,
    parent: `${ED}0`,
    template: T_SECTION,
    itemPath: '/sitecore/templates/Project/asos/Edit/Content',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);

const editFields = [
  ['2', 'Heading', 'Single-Line Text'],
  ['3', 'Tile1Kicker', 'Single-Line Text'],
  ['4', 'Tile1Title', 'Single-Line Text'],
  ['5', 'Tile1Body', 'Multi-Line Text'],
  ['6', 'Tile1Href', 'Single-Line Text'],
  ['7', 'Tile1Image', 'Image'],
  ['8', 'Tile2Kicker', 'Single-Line Text'],
  ['9', 'Tile2Title', 'Single-Line Text'],
];
editFields.forEach((field, index) => {
  writeNew(
    `templates/asos/Edit/Content/${field[1]}.yml`,
    fieldTemplate(`${ED}${field[0]}`, `${ED}1`, `/sitecore/templates/Project/asos/Edit/Content/${field[1]}`, field[2], (index + 1) * 100)
  );
});

const ED2 = 'a50c0003-0000-4000-8000-00000000010';
const editFields2 = [
  ['0', 'Tile2Body', 'Multi-Line Text', 1000],
  ['1', 'Tile2Href', 'Single-Line Text', 1100],
  ['2', 'Tile2Image', 'Image', 1200],
  ['3', 'Tile3Kicker', 'Single-Line Text', 1300],
  ['4', 'Tile3Title', 'Single-Line Text', 1400],
  ['5', 'Tile3Body', 'Multi-Line Text', 1500],
  ['6', 'Tile3Href', 'Single-Line Text', 1600],
  ['7', 'Tile3Image', 'Image', 1700],
];
for (const [suffix, name, type, sort] of editFields2) {
  writeNew(
    `templates/asos/Edit/Content/${name}.yml`,
    fieldTemplate(`${ED2}${suffix}`, `${ED}1`, `/sitecore/templates/Project/asos/Edit/Content/${name}`, type, sort)
  );
}

writeNew(
  'asos/asos/Data/HomeComponents/Edit.yml',
  itemYaml({
    id: 'a50c0006-0000-4000-8000-000000000012',
    parent: HOME_COMPONENTS,
    template: `${ED}0`,
    itemPath: '/sitecore/content/asos/asos/Data/HomeComponents/Edit',
    fields: [
      { id: `${ED}2`, hint: 'Heading', value: 'New edits' },
      { id: `${ED}3`, hint: 'Tile1Kicker', value: 'New edit' },
      { id: `${ED}4`, hint: 'Tile1Title', value: 'The denim drop' },
      { id: `${ED}5`, hint: 'Tile1Body', value: 'Wide-leg jeans under £50. Filter by body fit, then the mid-wash jean with model height and size worn.' },
      { id: `${ED}6`, hint: 'Tile1Href', value: '/edits/the-denim-drop' },
      {
        id: `${ED}7`,
        hint: 'Tile1Image',
        multiline: true,
        value: image(
          'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d80af48ccca44ba493378324cb0ac064',
          'LSSQvaTFRUGjza5KqQX5Nw',
          'The denim drop'
        ),
      },
      { id: `${ED}8`, hint: 'Tile2Kicker', value: 'New edit' },
      { id: `${ED}9`, hint: 'Tile2Title', value: 'Festival 2.0' },
      { id: `${ED2}0`, hint: 'Tile2Body', value: 'Layered metallics and rugby tops for the field.' },
      { id: `${ED2}1`, hint: 'Tile2Href', value: '/edits/festival-2-0' },
      {
        id: `${ED2}2`,
        hint: 'Tile2Image',
        multiline: true,
        value: image(
          'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9ab66b7643554fdfa57d091b244efaf7',
          'S8yM2wMVQwuiH8VRFlWIfg',
          'Festival 2.0'
        ),
      },
      { id: `${ED2}3`, hint: 'Tile3Kicker', value: 'New edit' },
      { id: `${ED2}4`, hint: 'Tile3Title', value: 'Your new uniform' },
      { id: `${ED2}5`, hint: 'Tile3Body', value: 'The 9–5 that still works on Friday.' },
      { id: `${ED2}6`, hint: 'Tile3Href', value: '/edits/your-new-uniform' },
      {
        id: `${ED2}7`,
        hint: 'Tile3Image',
        multiline: true,
        value: image(
          'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/bb2a4cfc4c914bcd93964f2626e77fa4',
          '0w9wbpdIS6O_xajmDlLDxw',
          'Your new uniform'
        ),
      },
    ],
  })
);

const NI = 'a50c0003-0000-4000-8000-00000000011';
writeNew(
  'templates/asos/NewIn.yml',
  templateYaml({
    id: `${NI}0`,
    parent: PROJECT_TEMPLATES,
    template: T_TEMPLATE,
    itemPath: '/sitecore/templates/Project/asos/NewIn',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);
writeNew(
  'templates/asos/NewIn/Content.yml',
  templateYaml({
    id: `${NI}1`,
    parent: `${NI}0`,
    template: T_SECTION,
    itemPath: '/sitecore/templates/Project/asos/NewIn/Content',
    shared: ['- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"', '  Hint: __Icon', '  Value: Office/32x32/window_dialog.png'].join(nl),
  })
);
for (const [suffix, name, type, sort] of [
  ['2', 'Heading', 'Single-Line Text', 100],
  ['3', 'ShopLabel', 'Single-Line Text', 200],
  ['4', 'ShopHref', 'Single-Line Text', 300],
  ['5', 'ProductIds', 'Multi-Line Text', 400],
]) {
  writeNew(
    `templates/asos/NewIn/Content/${name}.yml`,
    fieldTemplate(`${NI}${suffix}`, `${NI}1`, `/sitecore/templates/Project/asos/NewIn/Content/${name}`, type, sort)
  );
}

writeNew(
  'asos/asos/Data/HomeComponents/NewIn.yml',
  itemYaml({
    id: 'a50c0006-0000-4000-8000-000000000013',
    parent: HOME_COMPONENTS,
    template: `${NI}0`,
    itemPath: '/sitecore/content/asos/asos/Data/HomeComponents/NewIn',
    fields: [
      { id: `${NI}2`, hint: 'Heading', value: 'New in' },
      { id: `${NI}3`, hint: 'ShopLabel', value: "Shop women's new in" },
      { id: `${NI}4`, hint: 'ShopHref', value: '/women/new-in' },
      { id: `${NI}5`, hint: 'ProductIds', value: productIds.join('|') },
    ],
  })
);

function patchRendering(file, templatePath) {
  const full = path.join(contentRoot, file);
  let text = fs.readFileSync(full, 'utf8');
  if (text.includes('Datasource Template')) return;
  const block = [
    '- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"',
    '  Hint: Datasource Template',
    `  Value: ${templatePath}`,
    '- ID: "b5b27af1-25ef-405c-87ce-369b3a004016"',
    '  Hint: Datasource Location',
    `  Value: "query:$site/*[@@name='Data']/*[@@name='HomeComponents']"`,
  ].join(nlOf(text));
  text = text.replace(
    /- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"\r?\n  Hint: componentName\r?\n  Value: .+\r?\n/,
    (match) => `${match}${block}${nlOf(text)}`
  );
  fs.writeFileSync(full, text);
}

patchRendering('renderings/asos/HomeBanner.yml', '/sitecore/templates/Project/asos/HomeBanner');
patchRendering('renderings/asos/Edit.yml', '/sitecore/templates/Project/asos/Edit');
patchRendering('renderings/asos/NewIn.yml', '/sitecore/templates/Project/asos/NewIn');

const homeFile = path.join(contentRoot, 'asos/asos/Home.yml');
let home = fs.readFileSync(homeFile, 'utf8');
const homeNl = nlOf(home);
const datasources = [
  ['{A50C2100-0000-4000-8000-000000000010}', '{A50C0006-0000-4000-8000-000000000010}'],
  ['{A50C2100-0000-4000-8000-000000000011}', '{A50C0006-0000-4000-8000-000000000011}'],
  ['{A50C2100-0000-4000-8000-000000000012}', '{A50C0006-0000-4000-8000-000000000012}'],
  ['{A50C2100-0000-4000-8000-000000000013}', '{A50C0006-0000-4000-8000-000000000013}'],
];
if (!home.includes('s:ds=')) {
  for (const [uid, ds] of datasources) {
    home = home.replace(`uid="${uid}"`, `uid="${uid}"${homeNl}          s:ds="${ds}"`);
  }
  fs.writeFileSync(homeFile, home);
}

const hrefMap = [
  ['/women/new-in/cat/?cid=27108', '/women/new-in'],
  ['/women/trends/denim/cat/?cid=17014', '/women/denim'],
  ['/petite-denim/cat/?cid=88016', '/petite-denim'],
  ['/edits/the-denim-drop/cat/?cid=88011', '/edits/the-denim-drop'],
  ['/women/a-to-z-of-brands/topshop/cat/?cid=29299', '/women/topshop'],
  ['/edits/chocolate/cat/?cid=91001', '/edits/chocolate'],
  ['/edits/polka-dot/cat/?cid=91002', '/edits/polka-dot'],
  ['/edits/rugby-tops/cat/?cid=91003', '/edits/rugby-tops'],
  ['/edits/festival-2-0/cat/?cid=88012', '/edits/festival-2-0'],
  ['/edits/your-new-uniform/cat/?cid=88013', '/edits/your-new-uniform'],
  ['/edits/topshop-catwalk/cat/?cid=88014', '/edits/topshop-catwalk'],
  ['/women/ctas/hub-edit-12/cat/?cid=51126', '/women/selling-fast'],
  ['/women/ctas/social-edit-22/cat/?cid=52649', '/women/new-season-colours'],
  ['/women/ctas/curated-category-13/cat/?cid=52558', '/women/new-season-edit'],
  ['/women/ctas/topshop-edit-9/cat/?cid=52393', '/women/september-shift'],
  ['/women/sale/ctas/price-point-2/cat/?cid=51237', '/women/sale-under-10'],
];

function rewriteSrc(dir) {
  let count = 0;
  const walkSrc = (folder) => {
    for (const name of fs.readdirSync(folder)) {
      const full = path.join(folder, name);
      if (fs.statSync(full).isDirectory()) {
        walkSrc(full);
        continue;
      }
      if (!/\.(ts|tsx|json)$/.test(name)) continue;
      let text = fs.readFileSync(full, 'utf8');
      const before = text;
      for (const [from, to] of hrefMap) text = text.split(from).join(to);
      text = text.replace(/\/products\/[^/"']+\/([^/"']+)\/prd\/\d+/g, '/products/$1');
      if (text !== before) {
        fs.writeFileSync(full, text);
        count += 1;
      }
    }
  };
  walkSrc(dir);
  return count;
}

const srcFiles = rewriteSrc(srcRoot);
console.log(
  `products moved ${movedProducts}, already flat or unmatched ${skippedProducts}, folders retired ${retired}, new-in ids ${productIds.join('|')}, src files ${srcFiles}`
);
console.log('Next: dotnet sitecore serialization validate --fix -i asos-scs');
