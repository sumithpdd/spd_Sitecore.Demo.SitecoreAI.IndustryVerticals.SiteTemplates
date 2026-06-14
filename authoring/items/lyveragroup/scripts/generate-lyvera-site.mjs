/**
 * Lyvera Group — tenant, site, templates, renderings, Home layout.
 * Run: node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TS = '20260310T120000Z';
const OWNER = 'sitecore\\sumith.damodaran@sitecore.com';
const GRID = 'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';

const T_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_RENDERING = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const T_STD_VALUES = '39f4ccb1-1c4e-4111-891d-5306ff486461';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_PLACEHOLDER = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const T_VARIANT_DEF = '49c111d0-6867-4798-a724-1f103166e6e9';
const F_RENDERINGS_LIST = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PARTIAL_DESIGNS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_TEMPLATES_MAPPING = 'ba1f60d6-3deb-40cc-bb61-eec772279ee1';
const PAGE_TEMPLATE = 'e80a3c5b-80ea-4377-936b-a84827b2bc96';

const TEMPLATES_ROOT = 'b7010010-0001-400d-8010-000000000010';
const RENDERINGS_ROOT = 'b7010011-0001-400d-8010-000000000010';
const RENDERINGS_LYVERA = 'b7010012-0001-400d-8010-000000000010';
const BRANCHES_ROOT = 'b7010013-0001-400d-8010-000000000010';
const BRANCH = 'b7010014-0001-4000-8000-000000000001';
const TENANT = 'b7010020-0001-4000-8000-000000000001';
const SITE = 'b7010021-0001-4000-8000-000000000001';
const HOME = 'b7010022-0001-4000-8000-000000000001';
const DATA_ROOT = 'b7010023-0001-4000-8000-000000000001';
const PRESENTATION = 'b7010024-0001-4000-8000-000000000001';
const PARTIAL_DESIGNS = 'b7010025-0001-4000-8000-000000000001';
const PAGE_DESIGNS = 'b7010026-0001-4000-8000-000000000001';
const AVAILABLE = 'b7010027-0001-4000-8000-000000000001';
const HEADLESS_VARIANTS = 'b7010028-0001-4000-8000-000000000001';
const PLACEHOLDER_SETTINGS = 'b7010029-0001-4000-8000-000000000001';
const SITE_GROUPING_FOLDER = 'b701002a-0001-4000-8000-000000000001';
const SITE_GROUPING = 'b701002b-0001-4000-8000-000000000001';
const SETTINGS = 'b701002c-0001-4000-8000-000000000001';
const PARTIAL_HEADER = 'b7010050-0001-4000-8000-000000000001';
const PARTIAL_FOOTER = 'b7010050-0001-4000-8000-000000000002';
const PAGE_DESIGN_DEFAULT = 'b7010051-0001-4000-8000-000000000001';
const PARTIAL_SLOT_HEADER = 'b7010052-0001-4000-8000-000000000001';
const PARTIAL_SLOT_FOOTER = 'b7010053-0001-4000-8000-000000000001';
const MEDIA_ROOT = 'b7010054-0001-4000-8000-000000000001';

const AR = {
  PageContent: 'abf41c54-962a-458f-92e6-ce486e0572f3',
  Navigation: '34f4800b-6f10-483f-a512-3330867126a6',
  Lyvera: 'b70100a0-0001-4000-8000-000000000001',
};

const T_STYLE = '6b8aabef-d650-46e0-97d0-c0b04f7f016b';
const F_STYLE_VALUE = '09147fb2-ebfb-4949-8c8e-26a424409d5e';
const F_ALLOWED_RENDERINGS = '69bb49f3-da64-4b0e-abd6-184b832ff6ab';
const F_PLACEHOLDERS = '069a8361-b1cd-437c-8c32-a3be78941446';
const F_OTHER_PROPERTIES = 'e829c217-5e94-4306-9c48-2634b094fdc2';

const par = (variantId, styles = '') => {
  const fieldNames = variantId
    ? `FieldNames=%7B${variantId.toUpperCase()}%7D&amp;`
    : 'FieldNames&amp;';
  const stylePart = styles ? `Styles=${styles.replace(/\|/g, '%7c')}&amp;` : 'Styles&amp;';
  return `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;${fieldNames}${stylePart}RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
};

const R = {
  Header: 'b7010030-0001-4000-8000-000000000001',
  Footer: 'b7010030-0001-4000-8000-000000000002',
  TextBand: 'b7010030-0001-4000-8000-000000000003',
  Banner: 'b7010030-0001-4000-8000-000000000004',
  Promo: 'b7010030-0001-4000-8000-000000000005',
  OurBrands: 'b7010030-0001-4000-8000-000000000006',
  BrandLogo: 'b7010030-0001-4000-8000-000000000007',
  MultiPromoImageSlider: 'b7010030-0001-4000-8000-000000000008',
  MultiPromoSlide: 'b7010030-0001-4000-8000-000000000009',
};

const DS = {
  Header: 'b7010040-0001-4000-8000-000000000001',
  Footer: 'b7010040-0001-4000-8000-000000000002',
  IntroBand: 'b7010040-0001-4000-8000-000000000003',
  HeroBanner: 'b7010040-0001-4000-8000-000000000004',
  PromoWhoWeAre: 'b7010040-0001-4000-8000-000000000005',
  PromoWhatWeDo: 'b7010040-0001-4000-8000-000000000006',
  PromoHowWeDoIt: 'b7010040-0001-4000-8000-000000000007',
  BannerWhy: 'b7010040-0001-4000-8000-000000000008',
  PromoCEO: 'b7010040-0001-4000-8000-000000000009',
  OurBrands: 'b7010040-0001-4000-8000-000000000010',
  MultiPromoPortfolio: 'b7010040-0001-4000-8000-000000000011',
};

const PH = {
  BrandLogos: 'b7010081-0001-400d-8010-000000000001',
  MultiPromoSlides: 'b7010081-0001-400d-8010-000000000002',
};

const STYLES_ROOT = 'b7010090-0001-4000-8000-000000000001';
const STYLES_PROMO = 'b7010090-0001-4000-8000-000000000002';
const STYLES_BANNER = 'b7010090-0001-4000-8000-000000000003';

const VARIANT_FOLDERS = {
  LyveraHeader: 'b7010071-0001-4000-8000-000000000001',
  LyveraFooter: 'b7010071-0001-4000-8000-000000000002',
  LyveraTextBand: 'b7010071-0001-4000-8000-000000000003',
  LyveraBanner: 'b7010071-0001-4000-8000-000000000004',
  LyveraPromo: 'b7010071-0001-4000-8000-000000000005',
  LyveraOurBrands: 'b7010071-0001-4000-8000-000000000006',
  LyveraBrandLogo: 'b7010071-0001-4000-8000-000000000007',
  LyveraMultiPromoImageSlider: 'b7010071-0001-4000-8000-000000000008',
  LyveraMultiPromoSlide: 'b7010071-0001-4000-8000-000000000009',
};

const VARIANT_ITEMS = {
  'LyveraHeader/Default': 'b7010070-0001-4000-8000-000000000001',
  'LyveraFooter/Default': 'b7010070-0001-4000-8000-000000000002',
  'LyveraTextBand/Default': 'b7010070-0001-4000-8000-000000000003',
  'LyveraBanner/Default': 'b7010070-0001-4000-8000-000000000010',
  'LyveraBanner/BackgroundText': 'b7010070-0001-4000-8000-000000000011',
  'LyveraPromo/Default': 'b7010070-0001-4000-8000-000000000012',
  'LyveraPromo/ImageLeftColor': 'b7010070-0001-4000-8000-000000000013',
  'LyveraPromo/ImageRightColor': 'b7010070-0001-4000-8000-000000000014',
  'LyveraPromo/Stacked': 'b7010070-0001-4000-8000-000000000015',
  'LyveraPromo/StackedColor': 'b7010070-0001-4000-8000-000000000016',
  'LyveraOurBrands/Default': 'b7010070-0001-4000-8000-000000000017',
  'LyveraOurBrands/Grid': 'b7010070-0001-4000-8000-000000000018',
  'LyveraBrandLogo/Default': 'b7010070-0001-4000-8000-000000000019',
  'LyveraMultiPromoImageSlider/Default': 'b7010070-0001-4000-8000-000000000020',
  'LyveraMultiPromoImageSlider/Stacked': 'b7010070-0001-4000-8000-000000000021',
  'LyveraMultiPromoSlide/Default': 'b7010070-0001-4000-8000-000000000022',
};

const COMPONENT_TEMPLATES = {
  LyveraHeader: {
    folder: 'b7010060-0001-400d-8010-000000000101',
    renderable: 'b7010060-0001-400d-8010-000000000111',
    dataSection: 'b7010060-0001-400d-8010-000000000121',
    fields: [['ContactEmail', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000201', 100]],
  },
  LyveraFooter: {
    folder: 'b7010060-0001-400d-8010-000000000102',
    renderable: 'b7010060-0001-400d-8010-000000000112',
    dataSection: 'b7010060-0001-400d-8010-000000000122',
    fields: [
      ['Tagline', 'Multi-Line Text', 'b7010060-0001-400d-8010-000000000301', 100],
      ['ContactEmail', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000302', 200],
    ],
  },
  LyveraTextBand: {
    folder: 'b7010060-0001-400d-8010-000000000103',
    renderable: 'b7010060-0001-400d-8010-000000000113',
    dataSection: 'b7010060-0001-400d-8010-000000000123',
    fields: [
      ['Eyebrow', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000401', 100],
      ['Body', 'Rich Text', 'b7010060-0001-400d-8010-000000000402', 200],
    ],
  },
  LyveraBanner: {
    folder: 'b7010060-0001-400d-8010-000000000104',
    renderable: 'b7010060-0001-400d-8010-000000000114',
    dataSection: 'b7010060-0001-400d-8010-000000000124',
    fields: [
      ['Title', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000501', 100],
      ['Description', 'Rich Text', 'b7010060-0001-400d-8010-000000000502', 200],
      ['BackgroundImage', 'Image', 'b7010060-0001-400d-8010-000000000503', 300],
      ['BackgroundVideo', 'General Link', 'b7010060-0001-400d-8010-000000000504', 400],
      ['CtaLink', 'General Link', 'b7010060-0001-400d-8010-000000000505', 500],
    ],
  },
  LyveraPromo: {
    folder: 'b7010060-0001-400d-8010-000000000105',
    renderable: 'b7010060-0001-400d-8010-000000000115',
    dataSection: 'b7010060-0001-400d-8010-000000000125',
    fields: [
      ['Title', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000601', 100],
      ['Description', 'Rich Text', 'b7010060-0001-400d-8010-000000000602', 200],
      ['Image', 'Image', 'b7010060-0001-400d-8010-000000000603', 300],
      ['CtaLink', 'General Link', 'b7010060-0001-400d-8010-000000000604', 400],
    ],
  },
  LyveraOurBrands: {
    folder: 'b7010060-0001-400d-8010-000000000106',
    renderable: 'b7010060-0001-400d-8010-000000000116',
    dataSection: 'b7010060-0001-400d-8010-000000000126',
    fields: [['SectionTitle', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000701', 100]],
  },
  LyveraBrandLogo: {
    folder: 'b7010060-0001-400d-8010-000000000107',
    renderable: 'b7010060-0001-400d-8010-000000000117',
    dataSection: 'b7010060-0001-400d-8010-000000000127',
    fields: [
      ['Title', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000801', 100],
      ['LogoImage', 'Image', 'b7010060-0001-400d-8010-000000000802', 200],
      ['BrandLink', 'General Link', 'b7010060-0001-400d-8010-000000000803', 300],
    ],
  },
  LyveraMultiPromoImageSlider: {
    folder: 'b7010060-0001-400d-8010-000000000108',
    renderable: 'b7010060-0001-400d-8010-000000000118',
    dataSection: 'b7010060-0001-400d-8010-000000000128',
    fields: [
      ['Title', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000901', 100],
      ['Description', 'Rich Text', 'b7010060-0001-400d-8010-000000000902', 200],
      ['CtaLink', 'General Link', 'b7010060-0001-400d-8010-000000000903', 300],
    ],
  },
  LyveraMultiPromoSlide: {
    folder: 'b7010060-0001-400d-8010-000000000109',
    renderable: 'b7010060-0001-400d-8010-000000000119',
    dataSection: 'b7010060-0001-400d-8010-000000000129',
    fields: [
      ['Image', 'Image', 'b7010060-0001-400d-8010-000000001001', 100],
      ['AltText', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001002', 200],
    ],
  },
};

const LYVERA_TEMPLATES_FOLDER = 'b7010060-0001-400d-8010-000000000100';

const w = (rel, content) => {
  const full = join(ROOT, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
};

const ownerBlock = `    - ID: "52807595-0f8f-4b20-8d2a-cb71d28c6103"
      Hint: __Owner
      Value: |
        ${OWNER}
    - ID: "5dd74568-4d4b-44c1-b513-0af5f4cda34f"
      Hint: __Created by
      Value: |
        ${OWNER}`;

function writeTemplateFolder(id, parent, pathSuffix, baseRel = 'lyveragrouptemplatesProject/lyveragroup') {
  const pathForYaml = pathSuffix.replace(/\//g, '/');
  const sitecorePath = baseRel.includes('Renderings')
    ? `/sitecore/layout/Renderings/Project/lyveragroup/${pathSuffix}`
    : `/sitecore/templates/Project/lyveragroup/${pathSuffix}`;
  w(
    `${baseRel}/${pathSuffix}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FOLDER}"
Path: ${sitecorePath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${baseRel.includes('Renderings') ? '' : ownerBlock}
`
  );
}

function writeField(id, parent, compName, fieldHint, type, sort) {
  w(
    `lyveragrouptemplatesProject/lyveragroup/Lyvera/${compName}/${compName}/Data/${fieldHint}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FIELD}"
Path: /sitecore/templates/Project/lyveragroup/Lyvera/${compName}/${compName}/Data/${fieldHint}
SharedFields:
- ID: "ab162cc0-dc80-4abf-8871-998ee5d7ba32"
  Hint: Type
  Value: "${type}"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sort}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

function writeComponentTemplate(compName, { folder, renderable, dataSection, fields }) {
  writeTemplateFolder(folder, LYVERA_TEMPLATES_FOLDER, `Lyvera/${compName}`);
  writeTemplateFolder(renderable, folder, `Lyvera/${compName}/${compName}`);
  writeTemplateFolder(dataSection, renderable, `Lyvera/${compName}/${compName}/Data`);
  fields.forEach(([hint, type, fieldId, sort]) => {
    writeField(fieldId, dataSection, compName, hint, type, sort);
  });
  w(
    `lyveragrouptemplatesProject/lyveragroup/Lyvera/${compName}/${compName}.yml`,
    `---
ID: "${renderable}"
Parent: "${folder}"
Template: "${T_TEMPLATE}"
Path: /sitecore/templates/Project/lyveragroup/Lyvera/${compName}/${compName}
SharedFields:
- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: __Base template
  Value: |
    {${dataSection}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

function writeRendering(id, compName, dsTemplatePath, options = {}) {
  const { placeholders, dynamicPlaceholders = false } = options;
  const dsPath = dsTemplatePath.startsWith('/')
    ? dsTemplatePath
    : `/sitecore/templates/Project/lyveragroup/${dsTemplatePath}`;

  const extraFields = [];
  if (placeholders) {
    extraFields.push(`- ID: "${F_PLACEHOLDERS}"
  Hint: Placeholders
  Value: |
    {${placeholders}}`);
  }
  if (dynamicPlaceholders) {
    extraFields.push(`- ID: "${F_OTHER_PROPERTIES}"
  Hint: OtherProperties
  Value: IsRenderingsWithDynamicPlaceholders=true`);
  }

  w(
    `lyveragroupprojectRenderings/lyveragroup/Lyvera/${compName}.yml`,
    `---
ID: "${id}"
Parent: "${RENDERINGS_LYVERA}"
Template: "${T_RENDERING}"
Path: /sitecore/layout/Renderings/Project/lyveragroup/Lyvera/${compName}
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${compName}
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: ${dsPath}
- ID: "b5b27af1-25ef-405c-87ce-369b3a004016"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']"
${extraFields.join('\n')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${ownerBlock}
`
  );
}

function writeVariant(compName, variantName = 'Default') {
  const key = `${compName}/${variantName}`;
  const id = VARIANT_ITEMS[key];
  const parent = VARIANT_FOLDERS[compName];
  if (!id || !parent) {
    throw new Error(`Missing variant config for ${key}`);
  }

  w(
    `lyvera-site-root/lyvera/Presentation/Headless Variants/${compName}/${variantName}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_VARIANT_DEF}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Headless Variants/${compName}/${variantName}
SharedFields:
- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: __Base template
  Value: |
    {${T_VARIANT}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

function writeStyle(id, parent, pathSuffix, cssClass, allowedRenderingIds = []) {
  const allowed =
    allowedRenderingIds.length > 0
      ? `- ID: "${F_ALLOWED_RENDERINGS}"
  Hint: Allowed Renderings
  Value: |
    ${allowedRenderingIds.map((r) => `{${r}}`).join('\n    ')}`
      : '';

  w(
    `lyvera-site-root/lyvera/Presentation/Styles/${pathSuffix}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_STYLE}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Styles/${pathSuffix.replace(/\//g, '/')}
SharedFields:
- ID: "${F_STYLE_VALUE}"
  Hint: Value
  Value: "${cssClass}"
${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

function writeProjectPlaceholder(id, parent, name, allowedRenderingIds) {
  w(
    `lyveragroupprojectPlaceholderSettings/lyveragroup/${name}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_PLACEHOLDER}"
Path: /sitecore/layout/Placeholder Settings/Project/lyveragroup/${name}
SharedFields:
- ID: "${F_ALLOWED_RENDERINGS}"
  Hint: Allowed Renderings
  Value: |
    ${allowedRenderingIds.map((r) => `{${r}}`).join('\n    ')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

// —— Clean generated paths ——
for (const dir of [
  'lyveragrouptemplatesProject',
  'lyveragroupprojectRenderings',
  'lyveragroupprojectPlaceholderSettings',
  'lyveragroupbranchesProject',
  'lyveragroupprojectMediaFolders',
  'lyveragrouptenantRoot',
  'lyvera-site-root',
  'Lyvera',
]) {
  rmSync(join(ROOT, dir), { force: true, recursive: true });
}

// —— Templates root ——
w(
  'lyveragrouptemplatesProject/lyveragroup.yml',
  `---
ID: "${TEMPLATES_ROOT}"
Parent: "2b6668ef-7af6-4e88-a096-bffe0058d881"
Template: "${T_FOLDER}"
Path: /sitecore/templates/Project/lyveragroup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

writeTemplateFolder(LYVERA_TEMPLATES_FOLDER, TEMPLATES_ROOT, 'Lyvera');

for (const [compName, config] of Object.entries(COMPONENT_TEMPLATES)) {
  writeComponentTemplate(compName, config);
}

// —— Renderings ——
w(
  'lyveragroupprojectRenderings/lyveragroup.yml',
  `---
ID: "${RENDERINGS_ROOT}"
Parent: "b113cf8a-e1e5-4312-81be-b2c76cafc619"
Template: "${T_FOLDER}"
Path: /sitecore/layout/Renderings/Project/lyveragroup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);
writeTemplateFolder(RENDERINGS_LYVERA, RENDERINGS_ROOT, 'Lyvera', 'lyveragroupprojectRenderings/lyveragroup');
writeRendering(R.Header, 'LyveraHeader', 'Lyvera/LyveraHeader/LyveraHeader');
writeRendering(R.Footer, 'LyveraFooter', 'Lyvera/LyveraFooter/LyveraFooter');
writeRendering(R.TextBand, 'LyveraTextBand', 'Lyvera/LyveraTextBand/LyveraTextBand');
writeRendering(R.Banner, 'LyveraBanner', 'Lyvera/LyveraBanner/LyveraBanner');
writeRendering(R.Promo, 'LyveraPromo', 'Lyvera/LyveraPromo/LyveraPromo');
writeRendering(R.OurBrands, 'LyveraOurBrands', 'Lyvera/LyveraOurBrands/LyveraOurBrands', {
  placeholders: PH.BrandLogos,
  dynamicPlaceholders: true,
});
writeRendering(R.BrandLogo, 'LyveraBrandLogo', 'Lyvera/LyveraBrandLogo/LyveraBrandLogo');
writeRendering(R.MultiPromoImageSlider, 'LyveraMultiPromoImageSlider', 'Lyvera/LyveraMultiPromoImageSlider/LyveraMultiPromoImageSlider', {
  placeholders: PH.MultiPromoSlides,
  dynamicPlaceholders: true,
});
writeRendering(R.MultiPromoSlide, 'LyveraMultiPromoSlide', 'Lyvera/LyveraMultiPromoSlide/LyveraMultiPromoSlide');

// —— Branch ——
w(
  'lyveragroupbranchesProject/lyveragroup.yml',
  `---
ID: "${BRANCHES_ROOT}"
Parent: "a1f6469d-16e1-4a5f-9e49-1aad869a5d11"
Template: "2f5f8343-2a18-46a4-92a1-0f7ab0452741"
Path: /sitecore/templates/Branches/Project/lyveragroup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

// —— Tenant ——
w(
  'lyveragrouptenantRoot/lyveragroup.yml',
  `---
ID: "${TENANT}"
Parent: "0de95ae4-41ab-4d01-9eb0-67441b7c2450"
Template: "0de43198-1195-4e64-90e5-5bbe93090c5f"
Path: /sitecore/content/lyveragroup
BranchID: "${BRANCH}"
SharedFields:
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: LyveraGroup
- ID: "89cecf4f-e545-44f2-813d-272c08661d14"
  Hint: Description
  Value: Lyvera Group — umbrella brand for Levy sports and entertainment
- ID: "9c596379-f8d4-45d1-a064-cdf1ede2e7c7"
  Hint: Templates
  Value: "{${TEMPLATES_ROOT}}"
- ID: "853b245f-53e4-4ebe-bab5-299f9de314b6"
  Hint: RenderingsFolder
  Value: "{${RENDERINGS_ROOT}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${ownerBlock}
`
);

// —— Site root ——
w(
  'lyvera-site-root/lyvera.yml',
  `---
ID: "${SITE}"
Parent: "${TENANT}"
Template: "3a732591-325a-417b-98ad-0cf555cb26c0"
Path: /sitecore/content/lyveragroup/lyvera
SharedFields:
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: lyvera
- ID: "89cecf4f-e545-44f2-813d-272c08661d14"
  Hint: Description
  Value: Lyvera — Premium Sports, Entertainment & Event Experiences
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${ownerBlock}
`
);

// —— Datasources ——
const introText =
  'The creation of Lyvera unites all Levy sports and entertainment businesses under one strong, cohesive brand. This strengthens our market presence, supports greater investment in marketing and innovation, and removes previous trademark barriers that limited expansion in certain regions. It also enables us to bring our full range of services to new markets, giving clients seamless access to the breadth of Lyvera’s expertise.';

const dsItems = [
  [DS.Header, 'Default Header', 'LyveraHeader', { ContactEmail: 'enquiries@lyveragroup.com' }],
  [
    DS.Footer,
    'Default Footer',
    'LyveraFooter',
    {
      Tagline:
        'Lyvera brings together specialist brands in venue sourcing, premium hospitality and global sports travel, delivering exceptional experiences across the UK and beyond.',
      ContactEmail: 'enquiries@lyveragroup.com',
    },
  ],
  [DS.IntroBand, 'Brand Story', 'LyveraTextBand', { Eyebrow: 'Who we are', Body: introText }],
  [
    DS.HeroBanner,
    'Home Hero',
    'LyveraBanner',
    { Title: 'Step into our world', CtaLink: '<link text="Our brands" linktype="internal" url="/" />' },
  ],
  [
    DS.PromoWhoWeAre,
    'Who We Are Promo',
    'LyveraPromo',
    {
      Title: 'Who we are',
      Description: introText,
    },
  ],
  [
    DS.PromoWhatWeDo,
    'What We Do Promo',
    'LyveraPromo',
    {
      Title: 'What we do',
      Description:
        'We work across four different but connected areas, delivering tailored experiences and events for our clients.',
    },
  ],
  [
    DS.PromoHowWeDoIt,
    'How We Do It Promo',
    'LyveraPromo',
    {
      Title: 'How we do it',
      Description:
        'Our power is our people. We trust and believe in each other, so our partners and customers can put their faith in us.',
    },
  ],
  [
    DS.BannerWhy,
    'Why We Do It Banner',
    'LyveraBanner',
    {
      Title: 'Why we do it',
      Description:
        'Our world is the experience, and our success is measured in goosebumps. Nothing beats being there, live and in person.',
    },
  ],
  [
    DS.PromoCEO,
    'CEO Quote Promo',
    'LyveraPromo',
    {
      Title: "Lyvera's Chief Executive Officer, Charlie Buck",
      Description:
        'As expectations shift toward more elevated, premium experiences across sport, entertainment, and business events, Lyvera brings world-class expertise in sports travel, venue management, brand and partnerships to meet demand on a global scale.',
    },
  ],
  [DS.OurBrands, 'Our Brands Bar', 'LyveraOurBrands', { SectionTitle: 'Our brands' }],
  [
    DS.MultiPromoPortfolio,
    'Portfolio Slider',
    'LyveraMultiPromoImageSlider',
    {
      Title: 'A portfolio of specialist brands delivering exceptional experiences',
      Description:
        'Our group brings together leading brands in venue sourcing, premium hospitality, sports travel and luxury experiences.',
      CtaLink: '<link text="Explore our brands" linktype="internal" url="/" />',
    },
  ],
];

for (const [id, itemName, templateName, fieldMap] of dsItems) {
  const renderableTemplateId = COMPONENT_TEMPLATES[templateName].renderable;
  const fieldLines = Object.entries(fieldMap)
    .map(
      ([hint, value]) => `    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: ${hint}
      Value: ${value}`
    )
    .join('\n');
  w(
    `lyvera-site-root/lyvera/Data/${itemName}.yml`,
    `---
ID: "${id}"
Parent: "${DATA_ROOT}"
Template: "${renderableTemplateId}"
Path: /sitecore/content/lyveragroup/lyvera/Data/${itemName}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${fieldLines}
`
  );
}

// —— Presentation folders ——
const presentationFolders = [
  [PRESENTATION, SITE, 'Presentation'],
  [PARTIAL_DESIGNS, PRESENTATION, 'Presentation/Partial Designs'],
  [PAGE_DESIGNS, PRESENTATION, 'Presentation/Page Designs'],
  [AVAILABLE, PRESENTATION, 'Presentation/Available Renderings'],
  [HEADLESS_VARIANTS, PRESENTATION, 'Presentation/Headless Variants'],
  [PLACEHOLDER_SETTINGS, PRESENTATION, 'Presentation/Placeholder Settings'],
  [STYLES_ROOT, PRESENTATION, 'Presentation/Styles'],
  [STYLES_PROMO, STYLES_ROOT, 'Presentation/Styles/Lyvera Promo'],
  [STYLES_BANNER, STYLES_ROOT, 'Presentation/Styles/Lyvera Banner'],
  ...Object.entries(VARIANT_FOLDERS).map(([compName, id]) => [
    id,
    HEADLESS_VARIANTS,
    `Presentation/Headless Variants/${compName}`,
  ]),
  [PARTIAL_SLOT_HEADER, PLACEHOLDER_SETTINGS, 'Presentation/Placeholder Settings/Partial Design'],
  ['b7010052-0001-4000-8000-000000000002', PLACEHOLDER_SETTINGS, 'Presentation/Placeholder Settings/headless-header'],
  ['b7010052-0001-4000-8000-000000000003', PLACEHOLDER_SETTINGS, 'Presentation/Placeholder Settings/headless-main'],
  ['b7010052-0001-4000-8000-000000000004', PLACEHOLDER_SETTINGS, 'Presentation/Placeholder Settings/headless-footer'],
  [SETTINGS, SITE, 'Settings'],
  [SITE_GROUPING_FOLDER, SETTINGS, 'Settings/Site Grouping'],
];

for (const [id, parent, pathSuffix] of presentationFolders) {
  w(
    `lyvera-site-root/lyvera/${pathSuffix}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FOLDER}"
Path: /sitecore/content/lyveragroup/lyvera/${pathSuffix.replace(/\//g, '/')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
}

for (const key of Object.keys(VARIANT_ITEMS)) {
  const [compName, variantName] = key.split('/');
  writeVariant(compName, variantName);
}

writeStyle('b7010091-0001-4000-8000-000000000001', STYLES_PROMO, 'Lyvera Promo/Teal background', 'lyvera-bg-teal', [R.Promo]);
writeStyle('b7010091-0001-4000-8000-000000000002', STYLES_PROMO, 'Lyvera Promo/Coral background', 'lyvera-bg-coral', [R.Promo]);
writeStyle('b7010091-0001-4000-8000-000000000003', STYLES_PROMO, 'Lyvera Promo/Mint background', 'lyvera-bg-mint', [R.Promo]);
writeStyle('b7010091-0001-4000-8000-000000000004', STYLES_BANNER, 'Lyvera Banner/Tricolor bar', 'lyvera-banner-tricolor', [R.Banner]);

// —— Partial designs ——
w(
  'lyvera-site-root/lyvera/Presentation/Partial Designs/header.yml',
  `---
ID: "${PARTIAL_HEADER}"
Parent: "${PARTIAL_DESIGNS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Partial Designs/header
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: header
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="${DEVICE}">
        <r uid="{LYV-HDR-001}" s:id="{${R.Header}}" s:ds="${DS.Header}" s:par="${GRID}" s:ph="headless-header" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

w(
  'lyvera-site-root/lyvera/Presentation/Partial Designs/footer.yml',
  `---
ID: "${PARTIAL_FOOTER}"
Parent: "${PARTIAL_DESIGNS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Partial Designs/footer
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: footer
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="${DEVICE}">
        <r uid="{LYV-FTR-001}" s:id="{${R.Footer}}" s:ds="${DS.Footer}" s:par="${GRID}" s:ph="headless-footer" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

// —— Page design ——
w(
  'lyvera-site-root/lyvera/Presentation/Page Designs/DefaultPage.yml',
  `---
ID: "${PAGE_DESIGN_DEFAULT}"
Parent: "${PAGE_DESIGNS}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Page Designs/DefaultPage
SharedFields:
- ID: "${F_PARTIAL_DESIGNS}"
  Hint: PartialDesigns
  Value: "${PARTIAL_HEADER}|${PARTIAL_FOOTER}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

w(
  'lyvera-site-root/lyvera/Presentation/Page Designs.yml',
  `---
ID: "${PAGE_DESIGNS}"
Parent: "${PRESENTATION}"
Template: "${T_FOLDER}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Page Designs
SharedFields:
- ID: "${F_TEMPLATES_MAPPING}"
  Hint: TemplatesMapping
  Value: "%7b${PAGE_TEMPLATE}%7d%3d%257B${PAGE_DESIGN_DEFAULT}%257D"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

// —— Available renderings ——
w(
  'lyvera-site-root/lyvera/Presentation/Available Renderings/Lyvera.yml',
  `---
ID: "${AR.Lyvera}"
Parent: "${AVAILABLE}"
Template: "${T_FOLDER}"
Path: /sitecore/content/lyveragroup/lyvera/Presentation/Available Renderings/Lyvera
SharedFields:
- ID: "${F_RENDERINGS_LIST}"
  Hint: Renderings
  Value: |
    {${R.Header}}
    {${R.Footer}}
    {${R.TextBand}}
    {${R.Banner}}
    {${R.Promo}}
    {${R.OurBrands}}
    {${R.BrandLogo}}
    {${R.MultiPromoImageSlider}}
    {${R.MultiPromoSlide}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

// —— Site grouping ——
w(
  'lyvera-site-root/lyvera/Settings/Site Grouping/lyvera.yml',
  `---
ID: "${SITE_GROUPING}"
Parent: "${SITE_GROUPING_FOLDER}"
Template: "e46f3af2-39fa-4866-a157-7017c4b2a40c"
Path: /sitecore/content/lyveragroup/lyvera/Settings/Site Grouping/lyvera
SharedFields:
- ID: "1ee576af-ba8e-4312-9fbd-2ccf8395baa1"
  Hint: StartItem
  Value: "{${HOME.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: lyvera
- ID: "8e0dd914-9afb-4d45-bf8b-7ff5d6e5337e"
  Hint: HostName
  Value: *
- ID: "9eaf6dc9-b811-4cda-9edd-9697faba628a"
  Hint: POS
  Value: en=lyvera
- ID: "cb4e9e2e-2b66-43dc-ad3f-9caf363d28d3"
  Hint: SiteName
  Value: lyvera
- ID: "f57099a3-526a-49f2-aebd-635453e48875"
  Hint: RenderingHost
  Value: lyvera
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

// —— Home ——
const homeRenderings = `<r xmlns:p="p" xmlns:s="s" p:p="1">
  <d id="${DEVICE}">
    <r uid="{LYV-HOME-001}" s:id="{${R.Banner}}" s:ds="${DS.HeroBanner}" s:par="${par(VARIANT_ITEMS['LyveraBanner/Default'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-002}" s:id="{${R.Promo}}" s:ds="${DS.PromoWhoWeAre}" s:par="${par(VARIANT_ITEMS['LyveraPromo/ImageRightColor'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-003}" s:id="{${R.OurBrands}}" s:ds="${DS.OurBrands}" s:par="${par(VARIANT_ITEMS['LyveraOurBrands/Default'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-004}" s:id="{${R.MultiPromoImageSlider}}" s:ds="${DS.MultiPromoPortfolio}" s:par="${par(VARIANT_ITEMS['LyveraMultiPromoImageSlider/Default'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-005}" s:id="{${R.Promo}}" s:ds="${DS.PromoWhatWeDo}" s:par="${par(VARIANT_ITEMS['LyveraPromo/ImageLeftColor'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-006}" s:id="{${R.Promo}}" s:ds="${DS.PromoHowWeDoIt}" s:par="${par(VARIANT_ITEMS['LyveraPromo/Default'])}" s:ph="headless-main" />
    <r uid="{LYV-HOME-007}" s:id="{${R.Banner}}" s:ds="${DS.BannerWhy}" s:par="${par(VARIANT_ITEMS['LyveraBanner/BackgroundText'], 'lyvera-banner-tricolor')}" s:ph="headless-main" />
    <r uid="{LYV-HOME-008}" s:id="{${R.Promo}}" s:ds="${DS.PromoCEO}" s:par="${par(VARIANT_ITEMS['LyveraPromo/StackedColor'])}" s:ph="headless-main" />
  </d>
</r>`;

w(
  'lyvera-site-root/lyvera/Home.yml',
  `---
ID: "${HOME}"
Parent: "${SITE}"
Template: "${PAGE_TEMPLATE}"
Path: /sitecore/content/lyveragroup/lyvera/Home
SharedFields:
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${homeRenderings.split('\n').map((l) => (l ? '    ' + l : l)).join('\n')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: Title
      Value: Lyvera | Premium Sports, Entertainment & Event Experiences
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: Home
`
);

// —— Data root folder ——
w(
  'lyvera-site-root/lyvera/Data.yml',
  `---
ID: "${DATA_ROOT}"
Parent: "${SITE}"
Template: "${T_FOLDER}"
Path: /sitecore/content/lyveragroup/lyvera/Data
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

console.log('Lyvera Group serialization written under authoring/items/lyveragroup/');

// —— Optional module stubs (folder roots) ——
w(
  'lyveragroupprojectMediaFolders/lyveragroup.yml',
  `---
ID: "${MEDIA_ROOT}"
Parent: "4eb06bd7-be51-4ff6-be8d-f9004addf432"
Template: "${T_FOLDER}"
Path: /sitecore/media library/Project/lyveragroup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

w(
  'lyveragroupprojectPlaceholderSettings/lyveragroup.yml',
  `---
ID: "b7010080-0001-400d-8010-000000000010"
Parent: "7719150c-3a88-478f-92fd-38eac33e41cf"
Template: "${T_FOLDER}"
Path: /sitecore/layout/Placeholder Settings/Project/lyveragroup
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
);

writeProjectPlaceholder(PH.BrandLogos, 'b7010080-0001-400d-8010-000000000010', 'lyvera-brand-logos', [R.BrandLogo]);
writeProjectPlaceholder(PH.MultiPromoSlides, 'b7010080-0001-400d-8010-000000000010', 'lyvera-multi-promo-slides', [R.MultiPromoSlide]);
