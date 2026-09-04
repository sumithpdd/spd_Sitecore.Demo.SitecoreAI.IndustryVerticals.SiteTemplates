/**
 * Seed missing Brother story pages + stub renderings for reusable components.
 * Does not regenerate the full site — additive only.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SERIALIZED = join(__dirname, '..', 'serialized-content');
const HOME = join(SERIALIZED, 'brother', 'brother', 'Home');
const RENDERINGS = join(SERIALIZED, 'renderings', 'brother');

const PAGE_TEMPLATE = 'f352f7cd-0a08-419a-9670-e7ef478cd2a2';
const PRODUCT_PAGE = 'b40e0006-6666-4000-8000-000000000001';
const CATEGORY_PAGE = 'b40e0006-6666-4000-8000-000000000002';
const DESIGN_DEFAULT = 'b40e0005-5555-4000-8000-000000000001';
const DESIGN_PRODUCT = 'b40e0005-5555-4000-8000-000000000002';
const DESIGN_CATEGORY = 'b40e0005-5555-4000-8000-000000000003';
const HOME_ID = 'f0dfaeb3-4291-467e-a3b2-60410f4d312f';
const LABELLING_ID = 'b40e0002-2222-4000-8000-000000000001';
const BUSINESS_ID = 'b40e0002-2222-4000-8000-000000000050';
const RENDERINGS_PARENT = 'c6ba0e8a-f5a1-4577-b0cc-5a44b21c2423';

const R = {
  Breadcrumb: 'b40e0001-1111-4000-8000-00000000000d',
  PageHeader: 'b40e0001-1111-4000-8000-00000000000e',
  PageContent: 'b40e0001-1111-4000-8000-00000000000f',
  RichText: 'b40e0001-1111-4000-8000-000000000010',
  ContentBlock: 'b40e0001-1111-4000-8000-000000000011',
  Promo: 'b40e0001-1111-4000-8000-000000000012',
  CategoryListing: 'b40e0001-1111-4000-8000-000000000013',
  LinkList: 'b40e0001-1111-4000-8000-000000000014',
  SelectedProducts: 'b40e0001-1111-4000-8000-000000000015',
  HeroBanner: 'b40e0001-1111-4000-8000-000000000003',
  FeatureGrid: 'b40e0001-1111-4000-8000-000000000005',
  ProductListing: 'b40e0001-1111-4000-8000-000000000008',
};

function pageYaml({ id, parent, path, title, templateId, pageDesignId, renderingsXml }) {
  const layout = renderingsXml
    ? `- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${renderingsXml}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: "${path}"
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${pageDesignId.toUpperCase()}}"
${layout}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260904T140000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "4681bc80-40a3-415c-92b1-e2dc72f38267"
      Hint: Title
      Value: "${title}"
`;
}

function renderingStub(id, name) {
  return `---
ID: "${id}"
Parent: "${RENDERINGS_PARENT}"
Template: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"
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
      Value: 20260904T140000Z
`;
}

function mainRenderings(entries) {
  const lines = [
    '<r xmlns:p="p" xmlns:s="s"',
    '  p:p="1">',
    '  <d',
    '    id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}">',
  ];
  entries.forEach((e, i) => {
    lines.push('    <r');
    lines.push(`      uid="{${e.uid}}"`);
    if (i === 0) lines.push('      p:before="*"');
    else lines.push(`      p:after="r[@uid='{${entries[i - 1].uid}}']"`);
    if (e.ds) lines.push(`      s:ds="{${e.ds}}"`);
    lines.push(`      s:id="{${e.id}}"`);
    lines.push(
      `      s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=${i + 1}"`
    );
    lines.push(`      s:ph="headless-main" />`);
  });
  lines.push('  </d>');
  lines.push('</r>');
  return lines.join('\n    ');
}

const stubs = [
  ['Breadcrumb', R.Breadcrumb],
  ['PageHeader', R.PageHeader],
  ['PageContent', R.PageContent],
  ['RichText', R.RichText],
  ['ContentBlock', R.ContentBlock],
  ['Promo', R.Promo],
  ['CategoryListing', R.CategoryListing],
  ['LinkList', R.LinkList],
  ['SelectedProducts', R.SelectedProducts],
];

for (const [name, id] of stubs) {
  await writeFile(join(RENDERINGS, `${name}.yml`), renderingStub(id, name), 'utf8');
  console.log('Rendering', name);
}

const officeLabellingId = 'b40e0002-2222-4000-8000-000000000060';
const mpsId = 'b40e0002-2222-4000-8000-000000000061';
const mpsEssentialId = 'b40e0002-2222-4000-8000-000000000062';
const vc500wcrId = 'b40e0002-2222-4000-8000-000000000063';
const cz1003Id = 'b40e0002-2222-4000-8000-000000000064';
const vcFolder = 'b40e0002-2222-4000-8000-000000000022';
const suppliesId = 'b40e0002-2222-4000-8000-000000000051';

await mkdir(join(HOME, 'labelling-and-receipts'), { recursive: true });
await writeFile(
  join(HOME, 'labelling-and-receipts', 'office-labelling.yml'),
  pageYaml({
    id: officeLabellingId,
    parent: LABELLING_ID,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts/office-labelling',
    title: 'Office labelling',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0060-4000-8000-000000000001', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0060-4000-8000-000000000002', id: R.PageHeader.toUpperCase() },
      { uid: 'B40E1000-0060-4000-8000-000000000003', id: R.CategoryListing.toUpperCase() },
      { uid: 'B40E1000-0060-4000-8000-000000000004', id: R.SelectedProducts.toUpperCase() },
      { uid: 'B40E1000-0060-4000-8000-000000000005', id: R.PageContent.toUpperCase() },
    ]),
  }),
  'utf8'
);

await mkdir(join(HOME, 'business-solutions', 'managed-print-service'), { recursive: true });
await writeFile(
  join(HOME, 'business-solutions', 'managed-print-service.yml'),
  pageYaml({
    id: mpsId,
    parent: BUSINESS_ID,
    path: '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service',
    title: 'Managed Print Service',
    templateId: PAGE_TEMPLATE,
    pageDesignId: DESIGN_DEFAULT,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0061-4000-8000-000000000001', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000002', id: R.HeroBanner.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000003', id: R.PageHeader.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000004', id: R.PageContent.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000005', id: R.LinkList.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000006', id: R.Promo.toUpperCase() },
      { uid: 'B40E1000-0061-4000-8000-000000000007', id: R.SelectedProducts.toUpperCase() },
    ]),
  }),
  'utf8'
);

await writeFile(
  join(HOME, 'business-solutions', 'managed-print-service', 'mps-essential.yml'),
  pageYaml({
    id: mpsEssentialId,
    parent: mpsId,
    path: '/sitecore/content/brother/brother/Home/business-solutions/managed-print-service/mps-essential',
    title: 'MPS Essential',
    templateId: PAGE_TEMPLATE,
    pageDesignId: DESIGN_DEFAULT,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0062-4000-8000-000000000001', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0062-4000-8000-000000000002', id: R.PageHeader.toUpperCase() },
      { uid: 'B40E1000-0062-4000-8000-000000000003', id: R.PageContent.toUpperCase() },
      { uid: 'B40E1000-0062-4000-8000-000000000004', id: R.FeatureGrid.toUpperCase() },
      { uid: 'B40E1000-0062-4000-8000-000000000005', id: R.LinkList.toUpperCase() },
      { uid: 'B40E1000-0062-4000-8000-000000000006', id: R.SelectedProducts.toUpperCase() },
    ]),
  }),
  'utf8'
);

await mkdir(join(HOME, 'devices', 'label-printer', 'vc'), { recursive: true });
await writeFile(
  join(HOME, 'devices', 'label-printer', 'vc', 'vc500wcr.yml'),
  pageYaml({
    id: vc500wcrId,
    parent: vcFolder,
    path: '/sitecore/content/brother/brother/Home/devices/label-printer/vc/vc500wcr',
    title: 'VC-500WCR Full Colour Label Printer',
    templateId: PRODUCT_PAGE,
    pageDesignId: DESIGN_PRODUCT,
    renderingsXml: null,
  }),
  'utf8'
);

await mkdir(join(HOME, 'supplies', 'label-printers', 'labels', 'cz'), { recursive: true });
// intermediate folders as category pages
const suppliesLabelPrintersId = 'b40e0002-2222-4000-8000-000000000065';
const suppliesLabelsId = 'b40e0002-2222-4000-8000-000000000066';
const suppliesCzId = 'b40e0002-2222-4000-8000-000000000067';

await writeFile(
  join(HOME, 'supplies', 'label-printers.yml'),
  pageYaml({
    id: suppliesLabelPrintersId,
    parent: suppliesId,
    path: '/sitecore/content/brother/brother/Home/supplies/label-printers',
    title: 'Label printer supplies',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: null,
  }),
  'utf8'
);
await writeFile(
  join(HOME, 'supplies', 'label-printers', 'labels.yml'),
  pageYaml({
    id: suppliesLabelsId,
    parent: suppliesLabelPrintersId,
    path: '/sitecore/content/brother/brother/Home/supplies/label-printers/labels',
    title: 'Labels',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: null,
  }),
  'utf8'
);
await writeFile(
  join(HOME, 'supplies', 'label-printers', 'labels', 'cz.yml'),
  pageYaml({
    id: suppliesCzId,
    parent: suppliesLabelsId,
    path: '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz',
    title: 'CZ labels',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: null,
  }),
  'utf8'
);
await writeFile(
  join(HOME, 'supplies', 'label-printers', 'labels', 'cz', 'cz1003.yml'),
  pageYaml({
    id: cz1003Id,
    parent: suppliesCzId,
    path: '/sitecore/content/brother/brother/Home/supplies/label-printers/labels/cz/cz1003',
    title: 'CZ-1003 Continuous Colour Label Roll',
    templateId: PRODUCT_PAGE,
    pageDesignId: DESIGN_PRODUCT,
    renderingsXml: null,
  }),
  'utf8'
);

// Enrich labelling hub + business hub + vc-500w overview with reusable stack
await writeFile(
  join(HOME, 'labelling-and-receipts.yml'),
  pageYaml({
    id: LABELLING_ID,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts',
    title: 'Labelling and receipts',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0001-4000-8000-000000000010', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0001-4000-8000-000000000011', id: R.PageHeader.toUpperCase() },
      { uid: 'B40E1000-0001-4000-8000-000000000012', id: R.CategoryListing.toUpperCase() },
      { uid: 'B40E1000-0001-4000-8000-000000000013', id: R.SelectedProducts.toUpperCase() },
      { uid: 'B40E1000-0001-4000-8000-000000000014', id: R.ProductListing.toUpperCase() },
    ]),
  }),
  'utf8'
);

await writeFile(
  join(HOME, 'business-solutions.yml'),
  pageYaml({
    id: BUSINESS_ID,
    parent: HOME_ID,
    path: '/sitecore/content/brother/brother/Home/business-solutions',
    title: 'Business solutions',
    templateId: CATEGORY_PAGE,
    pageDesignId: DESIGN_CATEGORY,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0050-4000-8000-000000000001', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0050-4000-8000-000000000002', id: R.PageHeader.toUpperCase() },
      { uid: 'B40E1000-0050-4000-8000-000000000003', id: R.CategoryListing.toUpperCase() },
      { uid: 'B40E1000-0050-4000-8000-000000000004', id: R.LinkList.toUpperCase() },
      { uid: 'B40E1000-0050-4000-8000-000000000005', id: R.PageContent.toUpperCase() },
    ]),
  }),
  'utf8'
);

// VC-500W overview — Split-friendly stack (Hero + content + selected + promo)
const vc500wOverviewId = 'b40e0002-2222-4000-8000-000000000002';
await writeFile(
  join(HOME, 'labelling-and-receipts', 'vc-500w.yml'),
  pageYaml({
    id: vc500wOverviewId,
    parent: LABELLING_ID,
    path: '/sitecore/content/brother/brother/Home/labelling-and-receipts/vc-500w',
    title: 'VC-500W Full Colour Label Printer',
    templateId: PRODUCT_PAGE,
    pageDesignId: DESIGN_PRODUCT,
    renderingsXml: mainRenderings([
      { uid: 'B40E1000-0002-4000-8000-000000000001', id: R.Breadcrumb.toUpperCase() },
      { uid: 'B40E1000-0002-4000-8000-000000000002', id: R.PageContent.toUpperCase() },
      { uid: 'B40E1000-0002-4000-8000-000000000003', id: R.LinkList.toUpperCase() },
      { uid: 'B40E1000-0002-4000-8000-000000000004', id: R.SelectedProducts.toUpperCase() },
      { uid: 'B40E1000-0002-4000-8000-000000000005', id: R.Promo.toUpperCase() },
    ]),
  }),
  'utf8'
);

// Update ProductCategoryContent + ProductContent partials to include Breadcrumb
await writeFile(
  join(SERIALIZED, 'brother', 'brother', 'Presentation', 'Partial Designs', 'ProductCategoryContent.yml'),
  `---
ID: "b40e0004-4444-4000-8000-000000000004"
Parent: "cc8d039d-3d70-4fde-bb98-9188d6647490"
Template: "fd2059fd-6043-4dfe-8c04-e2437ce87634"
Path: /sitecore/content/brother/brother/Presentation/Partial Designs/ProductCategoryContent
SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: productcategorycontent
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}">
        <r
          uid="{B40E2000-0004-4000-8000-000000000001}"
          p:before="*"
          s:id="{${R.Breadcrumb.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{B40E2000-0004-4000-8000-000000000002}"
          p:after="r[@uid='{B40E2000-0004-4000-8000-000000000001}']"
          s:id="{${R.ProductListing.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
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
      Value: 20260904T120000Z
`,
  'utf8'
);

await writeFile(
  join(SERIALIZED, 'brother', 'brother', 'Presentation', 'Partial Designs', 'ProductContent.yml'),
  `---
ID: "b40e0004-4444-4000-8000-000000000003"
Parent: "cc8d039d-3d70-4fde-bb98-9188d6647490"
Template: "fd2059fd-6043-4dfe-8c04-e2437ce87634"
Path: /sitecore/content/brother/brother/Presentation/Partial Designs/ProductContent
SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: productcontent
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}">
        <r
          uid="{B40E2000-0003-4000-8000-000000000001}"
          p:before="*"
          s:id="{${R.Breadcrumb.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{B40E2000-0003-4000-8000-000000000002}"
          p:after="r[@uid='{B40E2000-0003-4000-8000-000000000001}']"
          s:id="{B40E0001-1111-4000-8000-000000000004}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
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
      Value: 20260904T120000Z
`,
  'utf8'
);

console.log('Seeded pages + reusable renderings.');
