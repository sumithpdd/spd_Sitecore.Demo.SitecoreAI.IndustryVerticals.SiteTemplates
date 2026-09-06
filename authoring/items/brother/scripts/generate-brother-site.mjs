/**
 * Brother UK — story + catalogue pages, Json renderings, Partial/Page Designs.
 * GUID prefix b40e — do not reuse other modules' IDs.
 *
 * Forma Lux / Bristan pattern:
 *   Partial Designs Header + Footer (signatures) → Page Designs → pages
 *   ProductCategoryContent / ProductContent partials for listing + PDP
 *
 * Run: node authoring/items/brother/scripts/generate-brother-site.mjs
 */
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', 'serialized-content');
const RENDERINGS = join(ROOT, 'renderings/brother');
const TEMPLATES = join(ROOT, 'templates/brother');
const SITE = join(ROOT, 'brother/brother');
const AVAIL = join(SITE, 'Presentation/Available Renderings');
const PRESENTATION = join(SITE, 'Presentation');

const RENDERINGS_PARENT = 'c6ba0e8a-f5a1-4577-b0cc-5a44b21c2423';
const TEMPLATES_PARENT = '7a01b800-5ab5-47bd-8ce9-467aaef82404';
const HOME_ID = 'f0dfaeb3-4291-467e-a3b2-60410f4d312f';
const PAGE_TEMPLATE = 'f352f7cd-0a08-419a-9670-e7ef478cd2a2';
const JSON_RENDERING = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const AVAIL_FOLDER = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';
const AVAIL_PARENT = 'eae5339b-adfa-4e5b-aba3-b148e5caf78b';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const SITE_PARENT = '77e38555-c013-45a7-86ef-eaa3febdf4d5';

const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_PARTIAL_PH = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const FIELD_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const FIELD_TEMPLATES_MAPPING = 'ba1f60d6-3deb-40cc-bb61-eec772279ee1';
const FIELD_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const FIELD_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';

const PARTIAL_DESIGNS_FOLDER = 'cc8d039d-3d70-4fde-bb98-9188d6647490';
const PAGE_DESIGNS_FOLDER = '402d717c-efac-4ab5-b817-89efa5469d1f';
const PH_PARTIAL_FOLDER = '6c48539f-29b5-4f60-a572-f382cabc203f';

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
  CampaignLanding: 'b40e0001-1111-4000-8000-00000000000a',
  OrderCloudCheckout: 'b40e0001-1111-4000-8000-00000000000b',
};

const T = {
  ProductPage: 'b40e0006-6666-4000-8000-000000000001',
  ProductCategoryPage: 'b40e0006-6666-4000-8000-000000000002',
  ProductPageSV: 'b40e0006-6666-4000-8000-000000000011',
  ProductCategoryPageSV: 'b40e0006-6666-4000-8000-000000000012',
};

const PD = {
  Header: 'b40e0004-4444-4000-8000-000000000001',
  Footer: 'b40e0004-4444-4000-8000-000000000002',
  ProductContent: 'b40e0004-4444-4000-8000-000000000003',
  ProductCategoryContent: 'b40e0004-4444-4000-8000-000000000004',
};

const DESIGN = {
  Default: 'b40e0005-5555-4000-8000-000000000001',
  ProductPage: 'b40e0005-5555-4000-8000-000000000002',
  ProductCategoryPage: 'b40e0005-5555-4000-8000-000000000003',
};

const PH = {
  Header: 'b40e0007-7777-4000-8000-000000000001',
  Footer: 'b40e0007-7777-4000-8000-000000000002',
  ProductContent: 'b40e0007-7777-4000-8000-000000000003',
  ProductCategoryContent: 'b40e0007-7777-4000-8000-000000000004',
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
  campaign: 'b40e0002-2222-4000-8000-000000000054',
  campaignsFolder: 'b40e0002-2222-4000-8000-000000000055',
  checkout: 'b40e0002-2222-4000-8000-000000000056',
  checkoutSupplies: 'b40e0002-2222-4000-8000-000000000057',
  tn243: 'b40e0002-2222-4000-8000-000000000058',
  dk22205: 'b40e0002-2222-4000-8000-000000000059',
  suppliesToner: 'b40e0002-2222-4000-8000-00000000005a',
  suppliesLabels: 'b40e0002-2222-4000-8000-00000000005b',
};

const AVAIL_BROTHER = 'b40e0003-3333-4000-8000-000000000001';

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}

function encodeMappings(pairs) {
  return pairs
    .map(
      ([templateId, designId]) =>
        `%7b${templateId.toUpperCase()}%7d%3d%257B${designId.toUpperCase()}%257D`
    )
    .join('%26');
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
  if (!entries?.length) return '';
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
    if (e.ds) {
      lines.push(`      s:ds="{${e.ds.toUpperCase()}}"`);
    }
    lines.push(`      s:id="{${e.id.toUpperCase()}}"`);
    lines.push(
      `      s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=${e.phId ?? i + 1}"`
    );
    lines.push(`      s:ph="${e.ph}" />`);
  });
  lines.push('  </d>');
  lines.push('</r>');
  return lines.join('\n    ');
}

function pageYaml({
  id,
  parent,
  path,
  title,
  nav,
  renderings = [],
  templateId = PAGE_TEMPLATE,
  pageDesignId = DESIGN.Default,
}) {
  const layout = renderings.length
    ? `- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${renderingsXml(renderings)}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: "${path}"
SharedFields:
- ID: "${FIELD_PAGE_DESIGN}"
  Hint: Page Design
  Value: "{${pageDesignId.toUpperCase()}}"
${layout}Languages:
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
  return pageYaml({
    id,
    parent,
    path,
    title,
    nav: title,
    renderings: [],
    pageDesignId: DESIGN.Default,
  });
}

/** Listing hub — ProductCategoryPage design supplies ProductListing via partial */
function listingPage(id, parent, sitecorePath, title) {
  return pageYaml({
    id,
    parent,
    path: sitecorePath,
    title,
    nav: title,
    templateId: T.ProductCategoryPage,
    pageDesignId: DESIGN.ProductCategoryPage,
    renderings: [],
  });
}

/** PDP — ProductContent partial is Breadcrumb + ProductDetail; CtaBanner + RelatedProducts are page-level (personalizable). */
function productPage(id, parent, sitecorePath, title) {
  return pageYaml({
    id,
    parent,
    path: sitecorePath,
    title,
    nav: title,
    templateId: T.ProductPage,
    pageDesignId: DESIGN.ProductPage,
    renderings: [
      {
        uid: 'B40E2000-0006-4000-8000-000000000001',
        id: 'b40e0001-1111-4000-8000-000000000016',
        ds: 'b40e00b1-2222-4000-8000-000000000050',
        ph: 'headless-main',
        phId: 4,
      },
      {
        uid: 'B40E2000-0006-4000-8000-000000000002',
        id: 'f36e05eb-5636-49bb-bbc7-5a9bf2b77210',
        ds: 'b40e00b1-2222-4000-8000-000000000040',
        ph: 'headless-main',
        phId: 5,
      },
    ],
  });
}

function partialDesignYaml({ id, name, signature, renderings }) {
  return `---
ID: "${id}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/brother/brother/Presentation/Partial Designs/${name}
SharedFields:
- ID: "${FIELD_SIGNATURE}"
  Hint: Signature
  Value: ${signature}
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
      Value: 20260904T120000Z
`;
}

function pageDesignYaml({ id, name, partialIds }) {
  return `---
ID: "${id}"
Parent: "${PAGE_DESIGNS_FOLDER}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/brother/brother/Presentation/Page Designs/${name}
SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${partialIds.join('|')}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: ${name}
`;
}

function placeholderYaml({ id, name, key }) {
  return `---
ID: "${id}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PARTIAL_PH}"
Path: "/sitecore/content/brother/brother/Presentation/Placeholder Settings/Partial Design/${name}"
SharedFields:
- ID: "${FIELD_PH_KEY}"
  Hint: Placeholder Key
  Value: "${key}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`;
}

function pageTypeTemplateYaml({ id, svId, name, icon }) {
  return `---
ID: "${id}"
Parent: "${TEMPLATES_PARENT}"
Template: "${T_TEMPLATE}"
Path: /sitecore/templates/Project/brother/${name}
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: ${icon}
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {${PAGE_TEMPLATE.toUpperCase()}}
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{${svId.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
`;
}

function pageTypeSVYaml({ id, parent, name, pageDesignId, renderings = [] }) {
  const layout = renderings.length
    ? `- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${renderingsXml(renderings)}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${parent}"
Path: /sitecore/templates/Project/brother/${name}/__Standard Values
SharedFields:
- ID: "${FIELD_PAGE_DESIGN}"
  Hint: Page Design
  Value: "{${pageDesignId.toUpperCase()}}"
${layout}- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: |
    {${PAGE_TEMPLATE.toUpperCase()}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T120000Z
    - ID: "4681bc80-40a3-415c-92b1-e2dc72f38267"
      Hint: Title
      Value: $name
`;
}

// --- Renderings ---
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
    {${R.CampaignLanding.toUpperCase()}}
    {${R.OrderCloudCheckout.toUpperCase()}}
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

// --- Product page templates (inherit Brother Page) ---
write(
  join(TEMPLATES, 'ProductPage.yml'),
  pageTypeTemplateYaml({
    id: T.ProductPage,
    svId: T.ProductPageSV,
    name: 'ProductPage',
    icon: 'Office/32x32/document_cup.png',
  })
);
write(
  join(TEMPLATES, 'ProductPage/__Standard Values.yml'),
  pageTypeSVYaml({
    id: T.ProductPageSV,
    parent: T.ProductPage,
    name: 'ProductPage',
    pageDesignId: DESIGN.ProductPage,
    renderings: [
      {
        uid: 'B40E2000-0006-4000-8000-000000000001',
        id: 'b40e0001-1111-4000-8000-000000000016',
        ds: 'b40e00b1-2222-4000-8000-000000000050',
        ph: 'headless-main',
        phId: 4,
      },
      {
        uid: 'B40E2000-0006-4000-8000-000000000002',
        id: 'f36e05eb-5636-49bb-bbc7-5a9bf2b77210',
        ds: 'b40e00b1-2222-4000-8000-000000000040',
        ph: 'headless-main',
        phId: 5,
      },
    ],
  })
);
write(
  join(TEMPLATES, 'ProductCategoryPage.yml'),
  pageTypeTemplateYaml({
    id: T.ProductCategoryPage,
    svId: T.ProductCategoryPageSV,
    name: 'ProductCategoryPage',
    icon: 'Office/32x32/elements_tree.png',
  })
);
write(
  join(TEMPLATES, 'ProductCategoryPage/__Standard Values.yml'),
  pageTypeSVYaml({
    id: T.ProductCategoryPageSV,
    parent: T.ProductCategoryPage,
    name: 'ProductCategoryPage',
    pageDesignId: DESIGN.ProductCategoryPage,
  })
);

// --- Partial Designs (Forma Lux: Header / Footer / product chrome) ---
write(
  join(PRESENTATION, 'Partial Designs/Header.yml'),
  partialDesignYaml({
    id: PD.Header,
    name: 'Header',
    signature: 'header',
    renderings: [
      { uid: 'B40E2000-0001-4000-8000-000000000001', id: R.Header, ph: 'headless-header' },
    ],
  })
);
write(
  join(PRESENTATION, 'Partial Designs/Footer.yml'),
  partialDesignYaml({
    id: PD.Footer,
    name: 'Footer',
    signature: 'footer',
    renderings: [
      { uid: 'B40E2000-0002-4000-8000-000000000001', id: R.Footer, ph: 'headless-footer' },
    ],
  })
);
write(
  join(PRESENTATION, 'Partial Designs/ProductContent.yml'),
  partialDesignYaml({
    id: PD.ProductContent,
    name: 'ProductContent',
    signature: 'productcontent',
    renderings: [
      { uid: 'B40E2000-0003-4000-8000-000000000001', id: 'b40e0001-1111-4000-8000-00000000000d', ph: 'headless-main' },
      { uid: 'B40E2000-0003-4000-8000-000000000002', id: R.ProductDetail, ph: 'headless-main' },
    ],
  })
);
write(
  join(PRESENTATION, 'Partial Designs/ProductCategoryContent.yml'),
  partialDesignYaml({
    id: PD.ProductCategoryContent,
    name: 'ProductCategoryContent',
    signature: 'productcategorycontent',
    renderings: [
      { uid: 'B40E2000-0004-4000-8000-000000000001', id: R.ProductListing, ph: 'headless-main' },
    ],
  })
);

write(
  join(PRESENTATION, 'Placeholder Settings/Partial Design/Header.yml'),
  placeholderYaml({ id: PH.Header, name: 'Header', key: 'sxa-header' })
);
write(
  join(PRESENTATION, 'Placeholder Settings/Partial Design/Footer.yml'),
  placeholderYaml({ id: PH.Footer, name: 'Footer', key: 'sxa-footer' })
);
write(
  join(PRESENTATION, 'Placeholder Settings/Partial Design/ProductContent.yml'),
  placeholderYaml({ id: PH.ProductContent, name: 'ProductContent', key: 'sxa-productcontent' })
);
// Windows MAX_PATH: SCS stores this under a hash folder (validate --fix).
write(
  join(ROOT, 'brother/46EA014593F9CCAA/ProductCategoryContent.yml'),
  placeholderYaml({
    id: PH.ProductCategoryContent,
    name: 'ProductCategoryContent',
    key: 'sxa-productcategorycontent',
  })
);

// --- Page Designs ---
write(
  join(PRESENTATION, 'Page Designs/Default.yml'),
  pageDesignYaml({
    id: DESIGN.Default,
    name: 'Default',
    partialIds: [PD.Header, PD.Footer],
  })
);
write(
  join(PRESENTATION, 'Page Designs/ProductPage.yml'),
  pageDesignYaml({
    id: DESIGN.ProductPage,
    name: 'ProductPage',
    partialIds: [PD.Header, PD.ProductContent, PD.Footer],
  })
);
write(
  join(PRESENTATION, 'Page Designs/ProductCategoryPage.yml'),
  pageDesignYaml({
    id: DESIGN.ProductCategoryPage,
    name: 'ProductCategoryPage',
    partialIds: [PD.Header, PD.ProductCategoryContent, PD.Footer],
  })
);

write(
  join(PRESENTATION, 'Page Designs.yml'),
  `---
ID: "${PAGE_DESIGNS_FOLDER}"
Parent: "30c31ac0-bbad-4434-9f35-547a572ef516"
Template: "7923c774-b54e-4176-9b6f-f7adb17f2f9f"
Path: "/sitecore/content/brother/brother/Presentation/Page Designs"
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "${FIELD_TEMPLATES_MAPPING}"
  Hint: TemplatesMapping
  Value: "${encodeMappings([
    [PAGE_TEMPLATE, DESIGN.Default],
    [T.ProductPage, DESIGN.ProductPage],
    [T.ProductCategoryPage, DESIGN.ProductCategoryPage],
  ])}"
- ID: "f6d8a61c-2f84-4401-bd24-52d2068172bc"
  Hint: __Originator
  Value: "{2EA756FA-AED6-4599-83B7-36FEFE229B31}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260612T221314Z
`
);

// --- Pages ---
write(
  join(SITE, 'Home.yml'),
  pageYaml({
    id: HOME_ID,
    parent: SITE_PARENT,
    path: '/sitecore/content/brother/brother/Home',
    title: 'Brother UK',
    nav: 'Home',
    pageDesignId: DESIGN.Default,
    renderings: [
      { uid: 'B40E1000-0001-4000-8000-000000000001', id: R.HeroBanner, ph: 'headless-main' },
      { uid: 'B40E1000-0001-4000-8000-000000000002', id: R.PromoStrip, ph: 'headless-main' },
      { uid: 'B40E1000-0001-4000-8000-000000000003', id: R.ProductListing, ph: 'headless-main' },
    ],
  })
);

write(
  join(SITE, 'Home/labelling-and-receipts.yml'),
  listingPage(
    P.labelling,
    HOME_ID,
    '/sitecore/content/brother/brother/Home/labelling-and-receipts',
    'Labelling and receipts'
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
    templateId: T.ProductPage,
    pageDesignId: DESIGN.ProductPage,
    renderings: [
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
    pageDesignId: DESIGN.Default,
    renderings: [{ uid: 'B40E1000-0003-4000-8000-000000000001', id: R.FeatureGrid, ph: 'headless-main' }],
  })
);

write(
  join(SITE, 'Home/printers.yml'),
  listingPage(P.printers, HOME_ID, '/sitecore/content/brother/brother/Home/printers', 'Printers')
);
write(
  join(SITE, 'Home/scanners.yml'),
  listingPage(P.scanners, HOME_ID, '/sitecore/content/brother/brother/Home/scanners', 'Scanners')
);
write(
  join(SITE, 'Home/business-solutions.yml'),
  listingPage(
    P.business,
    HOME_ID,
    '/sitecore/content/brother/brother/Home/business-solutions',
    'Business solutions'
  )
);
write(
  join(SITE, 'Home/supplies.yml'),
  listingPage(P.supplies, HOME_ID, '/sitecore/content/brother/brother/Home/supplies', 'Supplies')
);
write(
  join(SITE, 'Home/support.yml'),
  pageYaml({
    id: P.support,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/support',
    title: 'Support',
    nav: 'Support',
    pageDesignId: DESIGN.Default,
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
    pageDesignId: DESIGN.Default,
    renderings: [{ uid: 'B40E1000-0053-4000-8000-000000000001', id: R.SiteSearch, ph: 'headless-main' }],
  })
);

write(
  join(SITE, 'Home/campaigns.yml'),
  stubPage(P.campaignsFolder, HOME_ID, '/sitecore/content/brother/brother/Home/campaigns', 'Campaigns')
);
write(
  join(SITE, 'Home/campaigns/at-your-side.yml'),
  pageYaml({
    id: P.campaign,
    parent: P.campaignsFolder,
    path: '/sitecore/content/brother/brother/Home/campaigns/at-your-side',
    title: 'At your side campaign',
    nav: 'At your side',
    pageDesignId: DESIGN.Default,
    renderings: [
      { uid: 'B40E1000-0054-4000-8000-000000000001', id: R.CampaignLanding, ph: 'headless-main' },
    ],
  })
);

write(
  join(SITE, 'Home/checkout.yml'),
  stubPage(P.checkout, HOME_ID, '/sitecore/content/brother/brother/Home/checkout', 'Checkout')
);
write(
  join(SITE, 'Home/checkout/supplies.yml'),
  pageYaml({
    id: P.checkoutSupplies,
    parent: P.checkout,
    path: '/sitecore/content/brother/brother/Home/checkout/supplies',
    title: 'OrderCloud supplies checkout',
    nav: 'Supplies checkout',
    pageDesignId: DESIGN.Default,
    renderings: [
      { uid: 'B40E1000-0057-4000-8000-000000000001', id: R.OrderCloudCheckout, ph: 'headless-main' },
    ],
  })
);

write(
  join(SITE, 'Home/supplies/toner.yml'),
  stubPage(P.suppliesToner, P.supplies, '/sitecore/content/brother/brother/Home/supplies/toner', 'Toner')
);
write(
  join(SITE, 'Home/supplies/toner/tn-243bk.yml'),
  productPage(
    P.tn243,
    P.suppliesToner,
    '/sitecore/content/brother/brother/Home/supplies/toner/tn-243bk',
    'TN-243BK Toner Cartridge'
  )
);
write(
  join(SITE, 'Home/supplies/labels.yml'),
  stubPage(P.suppliesLabels, P.supplies, '/sitecore/content/brother/brother/Home/supplies/labels', 'Labels')
);
write(
  join(SITE, 'Home/supplies/labels/dk-22205.yml'),
  productPage(
    P.dk22205,
    P.suppliesLabels,
    '/sitecore/content/brother/brother/Home/supplies/labels/dk-22205',
    'DK-22205 Continuous Label Roll'
  )
);

write(join(SITE, 'Home/brother-for-home.yml'), stubPage(P.blogRoot, HOME_ID, '/sitecore/content/brother/brother/Home/brother-for-home', 'Brother for home'));
write(join(SITE, 'Home/brother-for-home/blog.yml'), stubPage(P.blogHome, P.blogRoot, '/sitecore/content/brother/brother/Home/brother-for-home/blog', 'Blog'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office.yml'), stubPage(P.blogOffice, P.blogHome, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office', 'Your home office'));
write(join(SITE, 'Home/brother-for-home/blog/your-home-office/2024.yml'), stubPage(P.blog2024, P.blogOffice, '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024', '2024'));
write(
  join(ROOT, 'brother/C151CD746073DBD7/5-great-ideas-for-organising-your-desk-and-home-office.yml'),
  pageYaml({
    id: P.article,
    parent: P.blog2024,
    path: '/sitecore/content/brother/brother/Home/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    title: '5 great ideas for organising your desk and home office',
    nav: 'Desk organisation',
    pageDesignId: DESIGN.Default,
    renderings: [{ uid: 'B40E1000-0004-4000-8000-000000000001', id: R.ArticleBody, ph: 'headless-main' }],
  })
);

write(
  join(SITE, 'Home/devices.yml'),
  listingPage(P.devices, HOME_ID, '/sitecore/content/brother/brother/Home/devices', 'All devices')
);
write(join(SITE, 'Home/devices/label-printer.yml'), stubPage(P.labelPrinter, P.devices, '/sitecore/content/brother/brother/Home/devices/label-printer', 'Label printer'));
write(join(SITE, 'Home/devices/label-printer/vc.yml'), stubPage(P.vcFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/vc', 'VC'));
write(
  join(SITE, 'Home/devices/label-printer/vc/vc500w.yml'),
  productPage(P.storePdp, P.vcFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500w', 'VC-500W Full Colour Label Printer | Store')
);
write(join(SITE, 'Home/devices/label-printer/ql.yml'), stubPage(P.qlFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/ql', 'QL'));
write(
  join(SITE, 'Home/devices/label-printer/ql/ql-800.yml'),
  productPage(P.ql800, P.qlFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-800', 'QL-800 Label Printer')
);
write(
  join(SITE, 'Home/devices/label-printer/ql/ql-820nwb.yml'),
  productPage(P.ql820, P.qlFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/ql/ql-820nwb', 'QL-820NWB Network Label Printer')
);
write(join(SITE, 'Home/devices/label-printer/pt.yml'), stubPage(P.ptFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/pt', 'PT'));
write(
  join(SITE, 'Home/devices/label-printer/pt/pt-p750w.yml'),
  productPage(P.ptp750w, P.ptFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/pt/pt-p750w', 'PT-P750W Handheld Labeller')
);
write(join(SITE, 'Home/devices/label-printer/td.yml'), stubPage(P.tdFolder, P.labelPrinter, '/sitecore/content/brother/brother/Home/devices/label-printer/td', 'TD'));
write(
  join(SITE, 'Home/devices/label-printer/td/td-4550dnwb.yml'),
  productPage(P.td4550, P.tdFolder, '/sitecore/content/brother/brother/Home/devices/label-printer/td/td-4550dnwb', 'TD-4550DNWB Desktop Barcode Printer')
);

write(join(SITE, 'Home/devices/printers.yml'), stubPage(P.printersDevices, P.devices, '/sitecore/content/brother/brother/Home/devices/printers', 'Printers'));
write(join(SITE, 'Home/devices/printers/dcp.yml'), stubPage(P.dcpFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/dcp', 'DCP'));
write(
  join(SITE, 'Home/devices/printers/dcp/dcp-l3520cdw.yml'),
  productPage(P.dcpL3520, P.dcpFolder, '/sitecore/content/brother/brother/Home/devices/printers/dcp/dcp-l3520cdw', 'DCP-L3520CDW Colour Laser')
);
write(join(SITE, 'Home/devices/printers/mfc.yml'), stubPage(P.mfcFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/mfc', 'MFC'));
write(
  join(SITE, 'Home/devices/printers/mfc/mfc-l8390cdw.yml'),
  productPage(P.mfcL8390, P.mfcFolder, '/sitecore/content/brother/brother/Home/devices/printers/mfc/mfc-l8390cdw', 'MFC-L8390CDW Business Colour Laser')
);
write(join(SITE, 'Home/devices/printers/hl.yml'), stubPage(P.hlFolder, P.printersDevices, '/sitecore/content/brother/brother/Home/devices/printers/hl', 'HL'));
write(
  join(SITE, 'Home/devices/printers/hl/hl-l2460dn.yml'),
  productPage(P.hlL2460, P.hlFolder, '/sitecore/content/brother/brother/Home/devices/printers/hl/hl-l2460dn', 'HL-L2460DN Mono Laser')
);

write(join(SITE, 'Home/devices/scanners.yml'), stubPage(P.scannersDevices, P.devices, '/sitecore/content/brother/brother/Home/devices/scanners', 'Scanners'));
write(join(SITE, 'Home/devices/scanners/ads.yml'), stubPage(P.adsFolder, P.scannersDevices, '/sitecore/content/brother/brother/Home/devices/scanners/ads', 'ADS'));
write(
  join(SITE, 'Home/devices/scanners/ads/ads-1800w.yml'),
  productPage(P.ads1800, P.adsFolder, '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-1800w', 'ADS-1800W Mobile Scanner')
);
write(
  join(SITE, 'Home/devices/scanners/ads/ads-4900w.yml'),
  productPage(P.ads4900, P.adsFolder, '/sitecore/content/brother/brother/Home/devices/scanners/ads/ads-4900w', 'ADS-4900W Desktop Scanner')
);

console.log('Brother Partial/Page Designs + ProductPage/ProductCategoryPage written under', ROOT);
console.log('  Partial Designs: Header, Footer, ProductContent, ProductCategoryContent');
console.log('  Page Designs: Default, ProductPage, ProductCategoryPage');
console.log('Push: dotnet sitecore serialization push -n sitecoreSilverProd -i brother-scs');
