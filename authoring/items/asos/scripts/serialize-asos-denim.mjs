/**
 * Serialize the downloaded denim catalogue as editable Sitecore items.
 * Product pages use ProductPage fields (brand, price, colour, image, video).
 * The denim trend category uses ProductListing + CategoryId 17014.
 * Long filesystem paths go under serialized-content/asos/live (same idea as 211674477).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, '..', 'serialized-content');
const siteRoot = path.join(contentRoot, 'asos', 'asos', 'Home');
const liveRoot = path.join(contentRoot, 'asos', 'live');
const catalogPath = path.join(
  __dirname,
  '../../../../industry-verticals/asos/src/lib/asos-live-catalog.json'
);

const HOME = '41ee7ce2-a19d-4854-883c-4b1cc8fb50fb';
const T_PAGE = '328222ce-19c6-4866-a39e-849665790932';
const T_PDP = 'a50c0003-0000-4000-8000-000000000020';
const T_LISTING = 'a50c0003-0000-4000-8000-000000000030';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_REV = '8cdc337e-a112-42fb-bbb4-4143751e123f';
const F_TITLE = '6a4b1abd-d0db-4e90-85aa-d79227995290';
const F_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_CATEGORY = 'a50c0003-0000-4000-8000-000000000033';
const F_PRODUCT_ID = 'a50c0003-0000-4000-8000-000000000023';
const F_BRAND = 'a50c0003-0000-4000-8000-000000000040';
const F_PRICE = 'a50c0003-0000-4000-8000-000000000041';
const F_COLOUR = 'a50c0003-0000-4000-8000-000000000042';
const F_VIDEO = 'a50c0003-0000-4000-8000-000000000044';
const DESIGN_DEFAULT = '{A50C0001-5555-4000-8000-000000000001}';
const DESIGN_PDP = '{A50C0001-5555-4000-8000-000000000003}';
const DESIGN_LISTING = '{A50C0001-5555-4000-8000-000000000004}';
const RENDER_PDP = '{A50C0001-1111-4000-8000-000000000006}';
const RENDER_LISTING = '{A50C0001-1111-4000-8000-000000000005}';

const byPath = new Map();
byPath.set('/sitecore/content/asos/asos/Home', HOME);

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.yml')) {
      const text = fs.readFileSync(full, 'utf8');
      const id = text.match(/^ID:\s*"([^"]+)"/m)?.[1];
      const itemPath = text.match(/^Path:\s*"?([^"\n]+)"?/m)?.[1];
      if (id && itemPath) byPath.set(itemPath.replace(/\/$/, ''), id);
    }
  }
}
walk(path.join(contentRoot, 'asos'));

let n = 1;
const guid = () => `a50c0004-0000-4000-8000-${String(n++).padStart(12, '0')}`;

function yq(value) {
  return `"${String(value ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function renderings(uid, renderingId) {
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

function diskFor(itemPath, leafName) {
  const rel = itemPath.replace('/sitecore/content/asos/asos/Home/', '');
  const mirrored = path.join(siteRoot, ...rel.split('/')) + '.yml';
  if (mirrored.length <= 240) return mirrored;
  fs.mkdirSync(liveRoot, { recursive: true });
  return path.join(liveRoot, `${leafName}.yml`);
}

function writeItem(itemPath, yaml) {
  const leaf = itemPath.split('/').pop();
  const dest = diskFor(itemPath, leaf);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, yaml);
}

function ensureFolder(rel, title, template = T_PAGE) {
  const itemPath = `/sitecore/content/asos/asos/Home/${rel}`.replace(/\/$/, '');
  if (byPath.has(itemPath)) return byPath.get(itemPath);
  const parentRel = rel.split('/').slice(0, -1).join('/');
  const parentPath = parentRel
    ? `/sitecore/content/asos/asos/Home/${parentRel}`
    : '/sitecore/content/asos/asos/Home';
  const parent = byPath.get(parentPath);
  if (!parent) throw new Error(`missing parent ${parentPath}`);
  const id = guid();
  const name = rel.split('/').pop();
  const design = template === T_PAGE ? DESIGN_DEFAULT : DESIGN_LISTING;
  const rendering = template === T_LISTING ? renderings(`{${id.toUpperCase()}}`, RENDER_LISTING) : '';
  const yaml = `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: ${yq(itemPath)}
${
  template === T_PAGE || template === T_LISTING
    ? `SharedFields:
- ID: "${F_DESIGN}"
  Hint: Page Design
  Value: "${design}"
${
  rendering
    ? `- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${rendering}
`
    : ''
}`
    : ''
}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260926T070000Z
    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: ${yq(title || name)}
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${id}"
    - ID: "${F_TITLE}"
      Hint: Title
      Value: ${yq(title || name)}
`;
  writeItem(itemPath, yaml);
  byPath.set(itemPath, id);
  return id;
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

ensureFolder('women/trends', 'Trends');
ensureFolder('women/trends/denim', 'Denim');
const catId = ensureFolder('women/trends/denim/cat', 'Denim', T_LISTING);
const catPath = '/sitecore/content/asos/asos/Home/women/trends/denim/cat';
writeItem(
  catPath,
  `---
ID: "${catId}"
Parent: "${byPath.get('/sitecore/content/asos/asos/Home/women/trends/denim')}"
Template: "${T_LISTING}"
Path: ${yq(catPath)}
SharedFields:
- ID: "${F_DESIGN}"
  Hint: Page Design
  Value: "${DESIGN_LISTING}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderings('{A50C0004-0000-4000-8000-0000000000C1}', RENDER_LISTING)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260926T070000Z
    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "Denim"
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${catId}"
    - ID: "${F_TITLE}"
      Hint: Title
      Value: "Denim"
    - ID: "${F_CATEGORY}"
      Hint: CategoryId
      Value: "17014"
`
);

let products = 0;
for (const row of catalog) {
  const href = String(row.href || '');
  const match = href.match(/^\/([^/]+)\/([^/]+)\/prd\/(\d+)/);
  if (!match) continue;
  const [, brandSeg, slug, id] = match;
  ensureFolder(brandSeg, row.brand || brandSeg);
  ensureFolder(`${brandSeg}/${slug}`, row.title);
  ensureFolder(`${brandSeg}/${slug}/prd`, 'prd');
  const itemPath = `/sitecore/content/asos/asos/Home/${brandSeg}/${slug}/prd/${id}`;
  if ([...byPath.keys()].some((key) => key.endsWith(`/prd/${id}`))) continue;
  const itemId = guid();
  const parent = byPath.get(`/sitecore/content/asos/asos/Home/${brandSeg}/${slug}/prd`);
  const price = Number(row.priceGbp) ? String(row.priceGbp) : '';
  const video = row.videoSrc || '';
  writeItem(
    itemPath,
    `---
ID: "${itemId}"
Parent: "${parent}"
Template: "${T_PDP}"
Path: ${yq(itemPath)}
SharedFields:
- ID: "${F_DESIGN}"
  Hint: Page Design
  Value: "${DESIGN_PDP}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderings(`{${itemId.toUpperCase()}}`, RENDER_PDP)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260926T070000Z
    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: ${yq(row.title)}
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${itemId}"
    - ID: "${F_TITLE}"
      Hint: Title
      Value: ${yq(row.title)}
    - ID: "${F_PRODUCT_ID}"
      Hint: ProductId
      Value: "${id}"
    - ID: "${F_BRAND}"
      Hint: Brand
      Value: ${yq(row.brand)}
    - ID: "${F_PRICE}"
      Hint: Price
      Value: ${yq(price)}
    - ID: "${F_COLOUR}"
      Hint: Colour
      Value: ${yq(row.colour)}
    - ID: "${F_VIDEO}"
      Hint: Video
      Value: ${yq(video)}
`
  );
  byPath.set(itemPath, itemId);
  products += 1;
}

console.log(`serialized products=${products} paths=${byPath.size}`);
console.log('Next: dotnet sitecore serialization validate --fix -i asos-scs');
