/**
 * Content tree under the ASOS site: Shared, Catalogue, Sites, Signals,
 * plus the public edit and sale listing URLs.
 * Run: node authoring/items/asos/scripts/serialize-asos-ia.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('authoring/items/asos/serialized-content/asos/asos');
const siteId = 'a1a98acc-74d6-4311-9bab-69d3802b6d7d';
const homeId = '41ee7ce2-a19d-4854-883c-4b1cc8fb50fb';
const womenId = 'a50c0002-0000-4000-8000-000000000001';
const folderTemplate = 'a87a00b1-e6db-45ab-8b54-636fec3b5523';
const listingTemplate = 'a50c0003-0000-4000-8000-000000000030';
let n = 0;

function nextId() {
  n += 1;
  return `a50c0005-0000-4000-8000-${String(n).padStart(12, '0')}`;
}

function write(rel, yaml) {
  const file = path.join(root, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, yaml.replace(/\n/g, '\r\n'));
}

function folder(rel, parent, itemPath) {
  const id = nextId();
  write(
    `${rel}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${folderTemplate}"
Path: "${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260926T080000Z
`
  );
  return id;
}

function listing(rel, parent, itemPath, title, cid) {
  const id = nextId();
  const uid = `{A50C0005-0000-4000-8000-${String(n).padStart(12, '0')}}`;
  write(
    `${rel}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${listingTemplate}"
Path: "${itemPath}"
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{A50C0001-5555-4000-8000-000000000004}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="${uid}"
          p:before="*"
          s:id="{A50C0001-1111-4000-8000-000000000005}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260926T080000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"
      Hint: __Revision
      Value: "${id}"
    - ID: "6a4b1abd-d0db-4e90-85aa-d79227995290"
      Hint: Title
      Value: "${title}"
    - ID: "a50c0003-0000-4000-8000-000000000033"
      Hint: CategoryId
      Value: "${cid}"
`
  );
  return id;
}

const tree = {
  Shared: {
    Taxonomy: {
      Gender: ['women', 'men'],
      ProductType: ['dresses', 'jeans', 'trainers'],
      FitSegment: ['petite', 'tall', 'curve', 'maternity', 'fuller-bust', 'adaptive'],
      Occasion: ['party', 'wedding-guest', 'workwear', 'holiday', 'festival'],
      Trend: ['denim', 'leather-suede', 'power-suiting', 'check-stripe'],
      Market: ['uk', 'de', 'us', 'au', 'fr', 'it', 'es', 'pl', 'se'],
      Brand: ['asos-design', 'topshop', 'topman', 'collusion', 'adidas'],
      Material: ['cotton', 'linen', 'satin', 'leather'],
      Attribute: ['colour', 'neckline', 'sleeve-length', 'rise', 'leg-shape'],
    },
    BrandKits: ['ASOS', 'Topshop'],
    Media: {
      Product: [],
      Editorial: [],
      Crops: ['16x9', '4x5', '1x1', 'app-hero'],
    },
  },
  Catalogue: {
    Categories: {
      Women: { Dresses: ['Midi'] },
    },
    Products: {
      '8805001': ['Variants', 'FitData'],
    },
  },
  Sites: {
    ASOS: {
      Home: [],
      Women: [],
      Men: [],
      Listings: [],
      Edits: ['New In Selling Fast', 'New season colours', 'New-season edit', 'September Shift'],
      Campaigns: [],
      StyleFeed: [],
      Boards: ['e5ebfcdb-7e61-473f-afc8-b0c973561d04', '2cef0973-eb40-4f9e-a4fe-76e8b69764ba'],
      Account: ['Saved lists', 'Preferences', 'Fit profile'],
    },
    Topshop: {
      Home: [],
      Women: [],
      Men: [],
      Listings: [],
      Edits: [],
      Campaigns: [],
      StyleFeed: [],
      Boards: [],
      Account: ['Saved lists', 'Preferences', 'Fit profile'],
    },
  },
  Signals: {
    SaveEvents: ['8805001-uk-8'],
    BoardCompositions: ['berlin-october'],
    ReturnReasons: ['size-delta'],
    ContentScores: ['8805001'],
  },
};

function walk(node, parent, itemPath, rel) {
  if (Array.isArray(node)) {
    node.forEach((name) => folder(`${rel}/${name}`, parent, `${itemPath}/${name}`));
    return;
  }
  Object.entries(node).forEach(([name, child]) => {
    const id = folder(`${rel}/${name}`, parent, `${itemPath}/${name}`);
    walk(child, id, `${itemPath}/${name}`, `${rel}/${name}`);
  });
}

Object.entries(tree).forEach(([name, child]) => {
  const id = folder(name, siteId, `/sitecore/content/asos/asos/${name}`);
  walk(child, id, `/sitecore/content/asos/asos/${name}`, name);
});

const ctas = folder('Home/women/ctas', womenId, '/sitecore/content/asos/asos/Home/women/ctas');
const edits = [
  ['hub-edit-12', '51126', 'New In: Selling Fast'],
  ['social-edit-22', '52649', 'New season colours'],
  ['curated-category-13', '52558', 'New-season edit'],
  ['topshop-edit-9', '52393', 'September Shift'],
];
edits.forEach(([slug, cid, title]) => {
  const parent = folder(
    `Home/women/ctas/${slug}`,
    ctas,
    `/sitecore/content/asos/asos/Home/women/ctas/${slug}`
  );
  listing(
    `Home/women/ctas/${slug}/cat`,
    parent,
    `/sitecore/content/asos/asos/Home/women/ctas/${slug}/cat`,
    title,
    cid
  );
});

const sale = folder('Home/women/sale', womenId, '/sitecore/content/asos/asos/Home/women/sale');
const saleCtas = folder(
  'Home/women/sale/ctas',
  sale,
  '/sitecore/content/asos/asos/Home/women/sale/ctas'
);
const price = folder(
  'Home/women/sale/ctas/price-point-2',
  saleCtas,
  '/sitecore/content/asos/asos/Home/women/sale/ctas/price-point-2'
);
listing(
  'Home/women/sale/ctas/price-point-2/cat',
  price,
  '/sitecore/content/asos/asos/Home/women/sale/ctas/price-point-2/cat',
  'Sale under £10',
  '51237'
);

const boards = folder('Home/shared-board', homeId, '/sitecore/content/asos/asos/Home/shared-board');
['e5ebfcdb-7e61-473f-afc8-b0c973561d04', '2cef0973-eb40-4f9e-a4fe-76e8b69764ba'].forEach((uuid) => {
  folder(`Home/shared-board/${uuid}`, boards, `/sitecore/content/asos/asos/Home/shared-board/${uuid}`);
});

console.log(`serialized ia items=${n}`);
console.log('Next: dotnet sitecore serialization validate --fix -i asos-scs');
