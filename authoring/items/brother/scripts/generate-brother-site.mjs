/**
 * Brother UK — story + catalogue pages, Json renderings, Available Renderings.
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
const SITE_PARENT = '77e38555-c013-45a7-86ef-eaa3febdf4d5';

const R = {
  Header: 'b40e0001-1111-4000-8000-000000000001',
  Footer: 'b40e0001-1111-4000-8000-000000000002',
  HeroBanner: 'b40e0001-1111-4000-8000-000000000003',
  ProductDetail: 'b40e0001-1111-4000-8000-000000000004',
  FeatureGrid: 'b40e0001-1111-4000-8000-000000000005',
  ArticleBody: 'b40e0001-1111-4000-8000-000000000006',
  PromoStrip: 'b40e0001-1111-4000-8000-000000000007',
  ProductListing: 'b40e0001-1111-4000-8000-000000000008',
  SiteSearch: 'b40e0001-1111-4000-8000-000000000009',
};

/** Stable page IDs */
const P = {
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
  qlFolder: 'b40e0002-2222-4000-8000-000000000024',
  ql800: 'b40e0002-2222-4000-8000-000000000025',
  ql820: 'b40e0002-2222-4000-8000-000000000026',
  ptFolder: 'b40e0002-2222-4000-8000-000000000027',
  ptp750w: 'b40e0002-2222-4000-8000-000000000028',
  tdFolder: 'b40e0002-2222-4000-8000-000000000029',
  td4550: 'b40e0002-2222-4000-8000-00000000002a',
  printers: 'b40e0002-2222-4000-8000-000000000030',
  printersDevices: 'b40e0002-2222-4000-8000-000000000031',
  dcpFolder: 'b40e0002-2222-4000-8000-000000000032',
  dcpL3520: 'b40e0002-2222-4000-8000-000000000033',
  mfcFolder: 'b40e0002-2222-4000-8000-000000000034',
  mfcL8390: 'b40e0002-2222-4000-8000-000000000035',
  hlFolder: 'b40e0002-2222-4000-8000-000000000036',
  hlL2460: 'b40e0002-2222-4000-8000-000000000037',
  scanners: 'b40e0002-2222-4000-8000-000000000040',
  scannersDevices: 'b40e0002-2222-4000-8000-000000000041',
  adsFolder: 'b40e0002-2222-4000-8000-000000000042',
  ads1800: 'b40e0002-2222-4000-8000-000000000043',
  ads4900: 'b40e0002-2222-4000-8000-000000000044',
  business: 'b40e0002-2222-4000-8000-000000000050',
  supplies: 'b40e0002-2222-4000-8000-000000000051',
  support: 'b40e0002-2222-4000-8000-000000000052',
  search: 'b40e0002-2222-4000-8000-000000000053',
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

function listingPage(id, parent, sitecorePath, title, uid) {
  return pageYaml({
    id,
    parent,
    path: sitecorePath,
    title,
    nav: title,
    renderings: [{ uid, id: R.ProductListing, ph: 'headless-main' }],
  });
}

function productPage(id, parent, sitecorePath, title, uid) {
  return pageYaml({
    id,
    parent,
    path: sitecorePath,
    title,
    nav: title,
    renderings: [{ uid, id: R.ProductDetail, ph: 'headless-main' }],
  });
}

for (const [name, id] of Object.entries(R)) {
  write(join(RENDERINGS, `${name}.yml`), renderingYaml(id, name));
}

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
    {${R.ProductListing.toUpperCase()}}
    {${R.SiteSearch.toUpperCase()}}
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

write(
  join(SITE, 'Home.yml'),
  pageYaml({
    id: HOME_ID,
    parent: SITE_PARENT,
    path: '/sitecore/content/brother/brother/Home',
    title: 'Brother UK',
    nav: 'Home',
    renderings: [
      { uid: 'B40E1000-0001-4000-8000-000000000001', id: R.HeroBanner, ph: 'headless-main' },
      { uid: 'B40E1000-0001-4000-8000-000000000002', id: R.PromoStrip, ph: 'headless-main' },
      { uid: 'B40E1000-0001-4000-8000-000000000003', id: R.ProductListing, ph: 'headless-main' },
    ],
  })
);

// Categories
write(
  join(SITE, 'Home/labelling-and-receipts.yml'),
  listingPage(
    P.labelling,
    HOME_ID,
    '/sitecore/content/brother/brother/Home/labelling-and-receipts',
    'Labelling and receipts',
    'B40E1000-0010-4000-8000-000000000001'
  )
);
write(
  join(SITE, 'Home/labelling-and-receipts/vc-500w.yml'),
  pageYaml({
    id: P.vc500w,
    parent: P.labelling,
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
    id: P.vertical,
    parent: P.vc500w,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
    title: 'VC-500W Vertical Applications',
    nav: 'Vertical applications',
    renderings: [{ uid: 'B40E1000-0003-4000-8000-000000000001', id: R.FeatureGrid, ph: 'headless-main' }],
  })
);

write(
  join(SITE, 'Home/printers.yml'),
  listingPage(P.printers, HOME_ID, '/sitecore/content/brother/brother/Home/printers', 'Printers', 'B40E1000-0030-4000-8000-000000000001')
);
write(
  join(SITE, 'Home/scanners.yml'),
  listingPage(P.scanners, HOME_ID, '/sitecore/content/brother/brother/Home/scanners', 'Scanners', 'B40E1000-0040-4000-8000-000000000001')
);
write(
  join(SITE, 'Home/business-solutions.yml'),
  pageYaml({
    id: P.business,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/business-solutions',
    title: 'Business solutions',
    nav: 'Business solutions',
    renderings: [
      { uid: 'B40E1000-0050-4000-8000-000000000001', id: R.ProductListing, ph: 'headless-main' },
      { uid: 'B40E1000-0050-4000-8000-000000000002', id: R.PromoStrip, ph: 'headless-main' },
    ],
  })
);
write(
  join(SITE, 'Home/supplies.yml'),
  listingPage(P.supplies, HOME_ID, '/sitecore/content/brother/brother/Home/supplies', 'Supplies', 'B40E1000-0051-4000-8000-000000000001')
);
write(
  join(SITE, 'Home/support.yml'),
  pageYaml({
    id: P.support,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/support',
    title: 'Support',
    nav: 'Support',
    renderings: [{ uid: 'B40E1000-0052-4000-8000-000000000001', id: R.PromoStrip, ph: 'headless-main' }],
  })
);
write(
  join(SITE, 'Home/search.yml'),
  pageYaml({
    id: P.search,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/search',
    title: 'Search',
    nav: 'Search',
    renderings: [{ uid: 'B40E1000-0053-4000-8000-000000000001', id: R.SiteSearch, ph: 'headless-main' }],
  })
);

// Blog
write(join(SITE, 'Home/brother-for-home.yml'), stubPage(P.blogRoot, HOME_ID, '/sitecore/content/brother/brother/Home/brother-for-home', 'Brother for home'));
write(join(SITE, 'Home/brother-for-home/blog.yml'), stubPage(P.blogHome, P.blogRoot, '/sitecore/content/brother/brother/Home/brother-for-home/blog', 'Blog'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office.yml'), stubPage(P.blogOffice, P.blogHome, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office', 'Your home office'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office/2024.yml'), stubPage(P.blog2024, P.blogOffice, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024', '2024'));
// Windows MAX_PATH: SCS stores this item under a hash folder (validate --fix moves it here).
write(
  join(ROOT, 'brother/C151CD746073DBD7/5-great-ideas-for-organising-your-desk-and-home-office.yml'),
  pageYaml({
    id: P.article,
    parent: P.blog2024,
    path: '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    title: '5 great ideas for organising your desk and home office',
    nav: 'Desk organisation',
    renderings: [{ uid: 'B40E1000-0004-4000-8000-000000000001', id: R.ArticleBody, ph: 'headless-main' }],
  })
);

// Devices tree + products
write(
  join(SITE, 'Home/devices.yml'),
  listingPage(P.devices, HOME_ID, '/sitecore/content/brother/brother/Home/devices', 'All devices', 'B40E1000-0020-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/label-printer.yml'), stubPage(P.labelPrinter, P.devices, '/sitecore/content/brother/brother/Home/devices/label-printer', 'Label printer'));
write(join(SITE, 'Home/devices/label-printer/vc.yml'), stubPage(P.vcFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/vc', 'VC'));
write(
  join(SITE, 'Home/devices/label-printer/vc/vc500w.yml'),
  productPage(P.storePdp, P.vcFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w', 'VC-500W Full Colour Label Printer | Store', 'B40E1000-0023-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/label-printer/ql.yml'), stubPage(P.qlFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/ql', 'QL'));
write(
  join(SITE, 'Home/devices/label-printer/ql/ql-800.yml'),
  productPage(P.ql800, P.qlFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800', 'QL-800 Label Printer', 'B40E1000-0025-4000-8000-000000000001')
);
write(
  join(SITE, 'Home/devices/label-printer/ql/ql-820nwb.yml'),
  productPage(P.ql820, P.qlFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-820nwb', 'QL-820NWB Network Label Printer', 'B40E1000-0026-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/label-printer/pt.yml'), stubPage(P.ptFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/pt', 'PT'));
write(
  join(SITE, 'Home/devices/label-printer/pt/pt-p750w.yml'),
  productPage(P.ptp750w, P.ptFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/pt/pt-p750w', 'PT-P750W Handheld Labeller', 'B40E1000-0028-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/label-printer/td.yml'), stubPage(P.tdFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/td', 'TD'));
write(
  join(SITE, 'Home/devices/label-printer/td/td-4550dnwb.yml'),
  productPage(P.td4550, P.tdFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/td/td-4550dnwb', 'TD-4550DNWB Desktop Barcode Printer', 'B40E1000-002A-4000-8000-000000000001')
);

write(join(SITE, 'Home/devices/printers.yml'), stubPage(P.printersDevices, P.devices, '/sitecore/content/brother/brother/Home/devices/printers', 'Printers'));
write(join(SITE, 'Home/devices/printers/dcp.yml'), stubPage(P.dcpFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/dcp', 'DCP'));
write(
  join(SITE, 'Home/devices/printers/dcp/dcp-l3520cdw.yml'),
  productPage(P.dcpL3520, P.dcpFolder, '/sitecore/content/brother/brother/Home/devices/printers/dcp/dcp-l3520cdw', 'DCP-L3520CDW Colour Laser', 'B40E1000-0033-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/printers/mfc.yml'), stubPage(P.mfcFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/mfc', 'MFC'));
write(
  join(SITE, 'Home/devices/printers/mfc/mfc-l8390cdw.yml'),
  productPage(P.mfcL8390, P.mfcFolder, '/sitecore/content/brother/brother/Home/devices/printers/mfc/mfc-l8390cdw', 'MFC-L8390CDW Business Colour Laser', 'B40E1000-0035-4000-8000-000000000001')
);
write(join(SITE, 'Home/devices/printers/hl.yml'), stubPage(P.hlFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/hl', 'HL'));
write(
  join(SITE, 'Home/devices/printers/hl/hl-l2460dn.yml'),
  productPage(P.hlL2460, P.hlFolder, '/sitecore/content/brother/brother/Home/devices/printers/hl/hl-l2460dn', 'HL-L2460DN Mono Laser', 'B40E1000-0037-4000-8000-000000000001')
);

write(join(SITE, 'Home/devices/scanners.yml'), stubPage(P.scannersDevices, P.devices, '/sitecore/content/brother/brother/Home/devices/scanners', 'Scanners'));
write(join(SITE, 'Home/devices/scanners/ads.yml'), stubPage(P.adsFolder, P.scannersDevices, '/sitecore/content/brother/brother/Home/devices/scanners/ads', 'ADS'));
write(
  join(SITE, 'Home/devices/scanners/ads/ads-1800w.yml'),
  productPage(P.ads1800, P.adsFolder, '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-1800w', 'ADS-1800W Mobile Scanner', 'B40E1000-0043-4000-8000-000000000001')
);
write(
  join(SITE, 'Home/devices/scanners/ads/ads-4900w.yml'),
  productPage(P.ads4900, P.adsFolder, '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-4900w', 'ADS-4900W Desktop Scanner', 'B40E1000-0044-4000-8000-000000000001')
);

console.log('Brother catalogue + search pages written under', ROOT);
console.log('Products: VC-500W, QL-800, QL-820NWB, PT-P750W, TD-4550DNWB, DCP-L3520CDW, MFC-L8390CDW, HL-L2460DN, ADS-1800W, ADS-4900W');
console.log('Push: dotnet sitecore serialization push -n <env> -i brother-scs');
