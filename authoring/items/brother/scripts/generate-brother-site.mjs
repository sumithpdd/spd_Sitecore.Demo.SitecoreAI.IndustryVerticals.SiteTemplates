/**
 * Brother UK — story pages, Json renderings, Available Renderings.
 * GUID prefix b40e — do not reuse other modules' IDs.
 *
 * Run: node authoring/items/brother/scripts/generate-brother-site.mjs
 */
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'serialized-content');
const RENDERINGS = join(ROOT, 'renderings/brother');
const SITE = join(ROOT, 'brother/brother');
const AVAIL = join(SITE, 'Presentation/Available Renderings');

const RENDERINGS_PARENT = 'c6ba0e8a-f5a1-4577-b0cc-5a44b21c2423';
const HOME_ID = 'f0dfaeb3-4291-467e-a3b2-60410f4d312f';
const PAGE_TEMPLATE = 'f352f7cd-0a08-419a-9670-e7ef478cd2a2';
const JSON_RENDERING = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const AVAIL_FOLDER = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';
const AVAIL_PARENT = 'eae5339b-adfa-4e5b-aba3-b148e5caf78b';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';

/** Stable IDs — b40e prefix */
const R = {
  Header: 'b40e0001-1111-4000-8000-000000000001',
  Footer: 'b40e0001-1111-4000-8000-000000000002',
  HeroBanner: 'b40e0001-1111-4000-8000-000000000003',
  ProductDetail: 'b40e0001-1111-4000-8000-000000000004',
  FeatureGrid: 'b40e0001-1111-4000-8000-000000000005',
  ArticleBody: 'b40e0001-1111-4000-8000-000000000006',
  PromoStrip: 'b40e0001-1111-4000-8000-000000000007',
};

const PAGES = {
  labelling: 'b40e0002-2222-4000-8000-000000000001',
  vc500w: 'b40e0002-2222-4000-8000-000000000002',
  vertical: 'b40e0002-2222-4000-8000-000000000003',
  blogRoot: 'b40e0002-2222-4000-8000-000000000010',
  blogHome: 'b40e0002-2222-4000-8000-000000000011',
  blogOffice: 'b40e0002-2222-4000-8000-000000000012',
  blog2024: 'b40e0002-2222-4000-8000-000000000013',
  article: 'b40e0002-2222-4000-8000-000000000014',
  devices: 'b40e0002-2222-4000-8000-000000000020',
  labelPrinter: 'b40e0002-2222-4000-8000-000000000021',
  vcFolder: 'b40e0002-2222-4000-8000-000000000022',
  storePdp: 'b40e0002-2222-4000-8000-000000000023',
};

const AVAIL_BROTHER = 'b40e0003-3333-4000-8000-000000000001';

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function renderingYaml(id, name) {
  return `---
ID: "${id}"
Parent: "${RENDERINGS_PARENT}"
Template: "${JSON_RENDERING}"
Path: /sitecore/layout/Renderings/Project/brother/${name}
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${name}
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/element.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260903T120000Z
`;
}

function renderingsXml(entries) {
  // entries: [{ uid, id, ph, after? }]
  const lines = [
    '<r xmlns:p="p" xmlns:s="s"',
    '  p:p="1">',
    `  <d`,
    `    id="${DEVICE}">`,
  ];
  entries.forEach((e, i) => {
    const before = i === 0 ? 'p:before="*"' : `p:after="r[@uid='${entries[i - 1].uid}']"`;
    lines.push(`    <r`);
    lines.push(`      uid="{${e.uid}}"`);
    lines.push(`      ${before}`);
    lines.push(`      s:id="{${e.id.toUpperCase()}}"`);
    lines.push(
      `      s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=${i + 1}"`
    );
    lines.push(`      s:ph="${e.ph}" />`);
  });
  lines.push('  </d>');
  lines.push('</r>');
  return lines.join('\n    ');
}

function pageYaml({ id, parent, path, title, nav, renderings }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${PAGE_TEMPLATE}"
Path: "${path}"
SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${renderingsXml(renderings)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260903T120000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${nav}"
    - ID: "4681bc80-40a3-415c-92b1-e2dc72f38267"
      Hint: Title
      Value: "${title}"
`;
}

function stubPage(id, parent, path, title) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${PAGE_TEMPLATE}"
Path: "${path}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260903T120000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "4681bc80-40a3-415c-92b1-e2dc72f38267"
      Hint: Title
      Value: "${title}"
`;
}

// Renderings
for (const [name, id] of Object.entries(R)) {
  write(join(RENDERINGS, `${name}.yml`), renderingYaml(id, name));
}

// Available Renderings / Brother
write(
  join(AVAIL, 'Brother.yml'),
  `---
ID: "${AVAIL_BROTHER}"
Parent: "${AVAIL_PARENT}"
Template: "${AVAIL_FOLDER}"
Path: "/sitecore/content/brother/brother/Presentation/Available Renderings/Brother"
SharedFields:
- ID: "715ae6c0-71c8-4744-ab4f-65362d20ad65"
  Hint: Renderings
  Value: |
    {${R.Header.toUpperCase()}}
    {${R.Footer.toUpperCase()}}
    {${R.HeroBanner.toUpperCase()}}
    {${R.ProductDetail.toUpperCase()}}
    {${R.FeatureGrid.toUpperCase()}}
    {${R.ArticleBody.toUpperCase()}}
    {${R.PromoStrip.toUpperCase()}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260903T120000Z
`
);

// Home — Hero + PromoStrip
write(
  join(SITE, 'Home.yml'),
  pageYaml({
    id: HOME_ID,
    parent: '77e38555-c013-45a7-86ef-eaa3febdf4d5',
    path: '/sitecore/content/brother/brother/Home',
    title: 'Brother UK',
    nav: 'Home',
    renderings: [
      { uid: 'B40E1000-0001-4000-8000-000000000001', id: R.HeroBanner, ph: 'headless-main' },
      { uid: 'B40E1000-0001-4000-8000-000000000002', id: R.PromoStrip, ph: 'headless-main' },
    ],
  })
);

// labelling-and-receipts / vc-500w
write(join(SITE, 'Home/labelling-and-receipts.yml'), stubPage(PAGES.labelling, HOME_ID, '/sitecore/content/brother/brother/Home/labelling-and-receipts', 'Labelling and receipts'));
write(
  join(SITE, 'Home/labelling-and-receipts/vc-500w.yml'),
  pageYaml({
    id: PAGES.vc500w,
    parent: PAGES.labelling,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w',
    title: 'VC-500W Full Colour Label Printer',
    nav: 'VC-500W',
    renderings: [
      { uid: 'B40E1000-0002-4000-8000-000000000001', id: R.ProductDetail, ph: 'headless-main' },
      { uid: 'B40E1000-0002-4000-8000-000000000002', id: R.PromoStrip, ph: 'headless-main' },
    ],
  })
);
write(
  join(SITE, 'Home/labelling-and-receipts/vc-500w/vc-500w-vertical-applications.yml'),
  pageYaml({
    id: PAGES.vertical,
    parent: PAGES.vc500w,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
    title: 'VC-500W Vertical Applications',
    nav: 'Vertical applications',
    renderings: [
      { uid: 'B40E1000-0003-4000-8000-000000000001', id: R.FeatureGrid, ph: 'headless-main' },
    ],
  })
);

// Blog article path
write(join(SITE, 'Home/brother-for-home.yml'), stubPage(PAGES.blogRoot, HOME_ID, '/sitecore/content/brother/brother/Home/brother-for-home', 'Brother for home'));
write(join(SITE, 'Home/brother-for-home/blog.yml'), stubPage(PAGES.blogHome, PAGES.blogRoot, '/sitecore/content/brother/brother/Home/brother-for-home/blog', 'Blog'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office.yml'), stubPage(PAGES.blogOffice, PAGES.blogHome, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office', 'Your home office'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office/2024.yml'), stubPage(PAGES.blog2024, PAGES.blogOffice, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024', '2024'));
write(
  join(SITE, 'Home/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office.yml'),
  pageYaml({
    id: PAGES.article,
    parent: PAGES.blog2024,
    path: '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    title: '5 great ideas for organising your desk and home office',
    nav: 'Desk organisation',
    renderings: [
      { uid: 'B40E1000-0004-4000-8000-000000000001', id: R.ArticleBody, ph: 'headless-main' },
    ],
  })
);

// Store PDP path
write(join(SITE, 'Home/devices.yml'), stubPage(PAGES.devices, HOME_ID, '/sitecore/content/brother/brother/Home/devices', 'Devices'));
write(join(SITE, 'Home/devices/label-printer.yml'), stubPage(PAGES.labelPrinter, PAGES.devices, '/sitecore/content/brother/brother/Home/devices/label-printer', 'Label printer'));
write(join(SITE, 'Home/devices/label-printer/vc.yml'), stubPage(PAGES.vcFolder, PAGES.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/vc', 'VC'));
write(
  join(SITE, 'Home/devices/label-printer/vc/vc500w.yml'),
  pageYaml({
    id: PAGES.storePdp,
    parent: PAGES.vcFolder,
    path: '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w',
    title: 'VC-500W Full Colour Label Printer | Store',
    nav: 'VC-500W Store',
    renderings: [
      { uid: 'B40E1000-0005-4000-8000-000000000001', id: R.ProductDetail, ph: 'headless-main' },
      { uid: 'B40E1000-0005-4000-8000-000000000002', id: R.FeatureGrid, ph: 'headless-main' },
    ],
  })
);

console.log('Brother story pages + renderings written under', ROOT);
console.log('Next: download media, then push brother-scs');
