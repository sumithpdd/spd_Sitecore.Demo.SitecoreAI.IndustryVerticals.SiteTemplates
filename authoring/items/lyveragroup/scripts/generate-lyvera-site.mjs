/**
 * Lyvera Group — tenant, shared project assets, and all enabled brand sites.
 * Run: node authoring/items/lyveragroup/scripts/generate-lyvera-site.mjs
 */
import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RENDERING_HOST } from './lyveragroup-brands.mjs';
import { CM_IDS } from './lyveragroup-cm-ids.mjs';
import { allSiteConfigs } from './lyveragroup-site-configs.mjs';
import { generateSite } from './lyveragroup-site-factory.mjs';

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

const TEMPLATES_ROOT = CM_IDS.templatesRoot;
const RENDERINGS_ROOT = CM_IDS.renderingsRoot;
const RENDERINGS_LYVERA = 'b7010012-0001-400d-8010-000000000010';
const BRANCHES_ROOT = 'b7010013-0001-400d-8010-000000000010';
const BRANCH = 'b7010014-0001-4000-8000-000000000001';
const TENANT = CM_IDS.tenant;
const SITE = CM_IDS.lyveraSite;
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
const PARTIAL_DESIGN_SLOT_FOLDER = CM_IDS.sites.lyvera.placeholderPartialDesign;
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
const F_PLACEHOLDER_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_OTHER_PROPERTIES = 'e829c217-5e94-4306-9c48-2634b094fdc2';

const par = (variantId, styles = '') => {
  const fieldNames = variantId
    ? `FieldNames=%7B${variantId.toUpperCase()}%7D&amp;`
    : 'FieldNames&amp;';
  const stylePart = styles ? `Styles=${styles.replace(/\|/g, '%7c')}&amp;` : 'Styles&amp;';
  return `GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;${fieldNames}${stylePart}RenderingIdentifier&amp;CSSStyles&amp;DynamicPlaceholderId=1`;
};

const PAGE_PROMO_RENDERING = '2492BAC4-DA07-4C86-87F0-9873D40E2276';

const PROMO_DS_TEMPLATE = {
  renderable: '08213afb-9cb4-4c1f-a5da-865b9a095601',
  skipTemplateWrite: true,
  fields: [
    ['PromoTitle', 'Single-Line Text', 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc', 100],
    ['PromoDescription', 'Rich Text', '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6', 200],
    ['PromoImageOne', 'Image', 'b441a09f-ddb2-41a8-84cc-2533686541f4', 300],
    ['PromoMoreInfo', 'General Link', '453ed40c-5232-4e90-b023-7a3cee2bcfe8', 400],
  ],
};

const R = {
  Header: 'b7010030-0001-4000-8000-000000000001',
  Footer: 'b7010030-0001-4000-8000-000000000002',
  TextBand: 'b7010030-0001-4000-8000-000000000003',
  Banner: 'b7010030-0001-4000-8000-000000000004',
  OurBrands: 'b7010030-0001-4000-8000-000000000006',
  BrandLogo: 'b7010030-0001-4000-8000-000000000007',
  MultiPromoImageSlider: 'b7010030-0001-4000-8000-000000000008',
  MultiPromoSlide: 'b7010030-0001-4000-8000-000000000009',
  BrandPageBody: 'b7010030-0001-4000-8000-00000000000a',
  BlogListing: 'b7010030-0001-4000-8000-00000000000b',
  ArticleDetails: 'b7010030-0001-4000-8000-00000000000c',
  FAQ: 'b7010030-0001-4000-8000-00000000000d',
  FAQItem: 'b7010030-0001-4000-8000-00000000000e',
};

const DS = {
  Header: 'b7010040-0001-4000-8000-000000000001',
  Footer: 'b7010040-0001-4000-8000-000000000002',
  IntroBand: 'b7010040-0001-4000-8000-000000000003',
  HeroBanner: 'b7010040-0001-4000-8000-000000000004',
  PromoWhoWeAre: 'b7010040-0001-4000-8000-000000000005',
  PromoWhatWeDo: 'b7010040-0001-4000-8000-000000000012',
  PromoHowWeDoIt: 'b7010040-0001-4000-8000-000000000007',
  BannerWhy: 'b7010040-0001-4000-8000-000000000008',
  PromoCEO: 'b7010040-0001-4000-8000-000000000009',
  OurBrands: 'b7010040-0001-4000-8000-000000000010',
  MultiPromoPortfolio: 'b7010040-0001-4000-8000-000000000011',
};

const PH = {
  BrandLogos: 'b7010081-0001-400d-8010-000000000001',
  MultiPromoSlides: 'b7010081-0001-400d-8010-000000000002',
  FaqItems: 'b7010081-0001-400d-8010-000000000003',
};

const STYLES_ROOT = 'b7010090-0001-4000-8000-000000000001';
const STYLES_PROMO = 'b7010090-0001-4000-8000-000000000002';
const STYLES_BANNER = 'b7010090-0001-4000-8000-000000000003';

const VARIANT_FOLDERS = {
  LyveraHeader: 'b7010071-0001-4000-8000-000000000001',
  LyveraFooter: 'b7010071-0001-4000-8000-000000000002',
  LyveraTextBand: 'b7010071-0001-4000-8000-000000000003',
  LyveraBanner: 'b7010071-0001-4000-8000-000000000004',
  Promo: '29fecd53-113e-4878-a809-8e883727ce90',
  LyveraOurBrands: 'b7010071-0001-4000-8000-000000000006',
  LyveraBrandLogo: 'b7010071-0001-4000-8000-000000000007',
  LyveraMultiPromoImageSlider: 'b7010071-0001-4000-8000-000000000008',
  LyveraMultiPromoSlide: 'b7010071-0001-4000-8000-000000000009',
  LyveraBrandPageBody: 'b7010071-0001-4000-8000-00000000000a',
  LyveraBlogListing: 'b7010071-0001-4000-8000-00000000000b',
  LyveraArticleDetails: 'b7010071-0001-4000-8000-00000000000c',
  LyveraFAQ: 'b7010071-0001-4000-8000-00000000000d',
  LyveraFAQItem: 'b7010071-0001-4000-8000-00000000000e',
};

const VARIANT_ITEMS = {
  'LyveraHeader/Default': 'b7010070-0001-4000-8000-000000000001',
  'LyveraFooter/Default': 'b7010070-0001-4000-8000-000000000002',
  'LyveraTextBand/Default': 'b7010070-0001-4000-8000-000000000003',
  'LyveraBanner/Default': 'b7010070-0001-4000-8000-000000000010',
  'LyveraBanner/BackgroundText': 'b7010070-0001-4000-8000-000000000011',
  'LyveraBanner/BrandHero': 'b7010070-0001-4000-8000-000000000012',
  'LyveraBanner/SplitBand': 'b7010070-0001-4000-8000-000000000029',
  'Promo/Default': 'be469b38-dee4-4483-923f-d97a0ebfeaad',
  'Promo/WithColumns': 'b7010070-0001-4000-8000-000000000023',
  'LyveraOurBrands/Default': 'b7010070-0001-4000-8000-000000000017',
  'LyveraOurBrands/Grid': 'b7010070-0001-4000-8000-000000000018',
  'LyveraBrandLogo/Default': 'b7010070-0001-4000-8000-000000000019',
  'LyveraMultiPromoImageSlider/Default': 'b7010070-0001-4000-8000-000000000020',
  'LyveraMultiPromoImageSlider/Stacked': 'b7010070-0001-4000-8000-000000000021',
  'LyveraMultiPromoSlide/Default': 'b7010070-0001-4000-8000-000000000022',
  'LyveraBrandPageBody/Default': 'b7010070-0001-4000-8000-000000000024',
  'LyveraBlogListing/Default': 'b7010070-0001-4000-8000-000000000025',
  'LyveraArticleDetails/Default': 'b7010070-0001-4000-8000-000000000026',
  'LyveraFAQ/Default': 'b7010070-0001-4000-8000-000000000027',
  'LyveraFAQItem/Default': 'b7010070-0001-4000-8000-000000000028',
};

const COMPONENT_TEMPLATES = {
  LyveraHeader: {
    folder: 'b7010060-0001-400d-8010-000000000101',
    renderable: 'b7010060-0001-400d-8010-000000000111',
    dataSection: 'b7010060-0001-400d-8010-000000000121',
    fields: [
      ['LogoImage', 'Image', 'b7010060-0001-400d-8010-000000000202', 100],
      ['ContactEmail', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000201', 200],
    ],
  },
  LyveraFooter: {
    folder: 'b7010060-0001-400d-8010-000000000102',
    renderable: 'b7010060-0001-400d-8010-000000000112',
    dataSection: 'b7010060-0001-400d-8010-000000000122',
    fields: [
      ['LogoImage', 'Image', 'b7010060-0001-400d-8010-000000000303', 100],
      ['Tagline', 'Multi-Line Text', 'b7010060-0001-400d-8010-000000000301', 200],
      ['ContactEmail', 'Single-Line Text', 'b7010060-0001-400d-8010-000000000302', 300],
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
  Promo: PROMO_DS_TEMPLATE,
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
  LyveraBrandPageBody: {
    folder: 'b7010060-0001-400d-8010-00000000010a',
    renderable: 'b7010060-0001-400d-8010-00000000011a',
    dataSection: 'b7010060-0001-400d-8010-00000000012a',
    fields: [['SectionTitle', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001101', 100]],
  },
  LyveraBlogListing: {
    folder: 'b7010060-0001-400d-8010-00000000010b',
    renderable: 'b7010060-0001-400d-8010-00000000011b',
    dataSection: 'b7010060-0001-400d-8010-00000000012b',
    fields: [['SectionTitle', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001201', 100]],
  },
  LyveraArticleDetails: {
    folder: 'b7010060-0001-400d-8010-00000000010c',
    renderable: 'b7010060-0001-400d-8010-00000000011c',
    dataSection: 'b7010060-0001-400d-8010-00000000012c',
    fields: [
      ['Title', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001301', 100],
      ['ShortDescription', 'Multi-Line Text', 'b7010060-0001-400d-8010-000000001302', 200],
      ['Content', 'Rich Text', 'b7010060-0001-400d-8010-000000001303', 300],
      ['Image', 'Image', 'b7010060-0001-400d-8010-000000001304', 400],
      ['PublishedDate', 'Datetime', 'b7010060-0001-400d-8010-000000001305', 500],
      ['ReadTime', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001306', 600],
      ['Category', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001307', 700],
      ['Author', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001308', 800],
    ],
  },
  LyveraFAQ: {
    folder: 'b7010060-0001-400d-8010-00000000010d',
    renderable: 'b7010060-0001-400d-8010-00000000011d',
    dataSection: 'b7010060-0001-400d-8010-00000000012d',
    fields: [['Heading', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001401', 100]],
  },
  LyveraFAQItem: {
    folder: 'b7010060-0001-400d-8010-00000000010e',
    renderable: 'b7010060-0001-400d-8010-00000000011e',
    dataSection: 'b7010060-0001-400d-8010-00000000012e',
    fields: [
      ['Question', 'Single-Line Text', 'b7010060-0001-400d-8010-000000001501', 100],
      ['Answer', 'Rich Text', 'b7010060-0001-400d-8010-000000001502', 200],
    ],
  },
};

const LYVERA_TEMPLATES_FOLDER = 'b7010060-0001-400d-8010-000000000100';

/** Sitecore CLI serializes some field items under hash folders (path/name rules). */
const FIELD_FILE_OVERRIDES = {
  LyveraArticleDetails: {
    ShortDescription: 'lyveragrouptemplatesProject/64FCA6B44F4D3CEE/ShortDescription.yml',
  },
};

/** Sitecore CLI hash folders for content items — removed on regen when using logical paths. */
function cleanLyveraContentHashFolders() {
  const lyveraRoot = join(ROOT, 'lyvera');
  try {
    for (const entry of readdirSync(lyveraRoot)) {
      if (/^[0-9A-F]{16}$/i.test(entry)) {
        rmPath(`lyvera/${entry}`);
      }
    }
  } catch {
    // lyvera root may not exist on first run
  }
}

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

function writeTemplateSection(id, parent, pathSuffix, baseRel = 'lyveragrouptemplatesProject/lyveragroup') {
  const sitecorePath = `/sitecore/templates/Project/lyveragroup/${pathSuffix}`;
  w(
    `${baseRel}/${pathSuffix}.yml`,
    `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_SECTION}"
Path: ${sitecorePath}
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

function writeField(id, parent, compName, fieldHint, type, sort, fileRel) {
  const rel =
    fileRel ??
    `lyveragrouptemplatesProject/lyveragroup/Lyvera/${compName}/${compName}/Data/${fieldHint}.yml`;
  w(
    rel,
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
  writeTemplateSection(dataSection, renderable, `Lyvera/${compName}/${compName}/Data`);
  fields.forEach(([hint, type, fieldId, sort]) => {
    const fileRel = FIELD_FILE_OVERRIDES[compName]?.[hint];
    writeField(fieldId, dataSection, compName, hint, type, sort, fileRel);
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
- ID: "${F_PLACEHOLDER_KEY}"
  Hint: Placeholder Key
  Value: "${name}-{*}"
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

function rmPath(rel) {
  rmSync(join(ROOT, rel), { force: true, recursive: true });
}

function cleanLyveraGeneratedContent() {
  // CM-owned datasources under Data/ are never deleted — they include SharedFields
  // (e.g. PromoImageOne) and media references pulled from Sitecore.
  // Blog article pages with special-character slugs live under lyvera/98A996FF3808E9C2/ (hash folder).
  const paths = [
    'lyvera/lyvera/Home.yml',
    'lyvera/lyvera/Home/brands.yml',
    'lyvera/lyvera/Home/news-and-blog.yml',
    'lyvera/lyvera/Presentation/Partial Designs/header.yml',
    'lyvera/lyvera/Presentation/Partial Designs/footer.yml',
    'lyvera/lyvera/Presentation/Available Renderings/Lyvera.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraHeader.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraFooter.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraTextBand.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraBanner.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraPromo.yml',
    'lyvera/lyvera/Presentation/Headless Variants/Promo.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraOurBrands.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraBrandLogo.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraMultiPromoImageSlider.yml',
    'lyvera/lyvera/Presentation/Headless Variants/LyveraMultiPromoSlide.yml',
    'lyvera/lyvera/Presentation/Styles/Lyvera Promo.yml',
    'lyvera/lyvera/Presentation/Styles/Lyvera Banner.yml',
    'lyvera/lyvera/Presentation/Placeholder Settings/headless-header.yml',
    'lyvera/lyvera/Presentation/Placeholder Settings/headless-main.yml',
    'lyvera/lyvera/Presentation/Placeholder Settings/headless-footer.yml',
    'lyvera/lyvera/Presentation/Placeholder Settings/Partial Design/header.yml',
    'lyvera/lyvera/Presentation/Placeholder Settings/Partial Design/footer.yml',
  ];
  for (const rel of paths) {
    rmPath(rel);
  }
  rmPath('lyvera/lyvera/Home/brands');
  rmPath('lyvera/lyvera/Home/news-and-blog');
  rmPath('lyvera/lyvera/Home/news-and-blog/lyvera');
  cleanLyveraContentHashFolders();

  const variantDirs = [
    'LyveraHeader',
    'LyveraFooter',
    'LyveraTextBand',
    'LyveraBanner',
    'Promo',
    'LyveraOurBrands',
    'LyveraBrandLogo',
    'LyveraMultiPromoImageSlider',
    'LyveraMultiPromoSlide',
    'LyveraBrandPageBody',
    'LyveraBlogListing',
    'LyveraArticleDetails',
    'LyveraFAQ',
    'LyveraFAQItem',
  ];
  for (const dir of variantDirs) {
    rmPath(`lyvera/lyvera/Presentation/Headless Variants/${dir}`);
  }
  rmPath('lyvera/lyvera/Presentation/Headless Variants/LyveraPromo');
  rmPath('lyvera/lyvera/Presentation/Styles/Lyvera Promo');
  rmPath('lyvera/lyvera/Presentation/Styles/Lyvera Banner');

  const misplacedLyveraRoots = [
    'Lyvera.yml',
    'LyveraHeader.yml',
    'LyveraFooter.yml',
    'LyveraTextBand.yml',
    'LyveraBanner.yml',
    'LyveraOurBrands.yml',
    'LyveraBrandLogo.yml',
    'LyveraMultiPromoImageSlider.yml',
    'LyveraMultiPromoSlide.yml',
    'LyveraBrandPageBody.yml',
    'LyveraBlogListing.yml',
    'LyveraArticleDetails.yml',
    'LyveraFAQ.yml',
    'LyveraFAQItem.yml',
  ];
  for (const file of misplacedLyveraRoots) {
    rmPath(`lyvera/lyvera/Presentation/${file}`);
  }
  for (const dir of variantDirs) {
    rmPath(`lyvera/lyvera/Presentation/${dir}`);
  }
}

// —— Clean generated paths (preserve CM tenant, site root, and SXA defaults) ——
for (const dir of [
  'lyveragrouptemplatesProject/lyveragroup/Lyvera',
  'lyveragroupprojectRenderings/lyveragroup/Lyvera',
  'lyveragroupprojectPlaceholderSettings/lyveragroup/lyvera-brand-logos.yml',
  'lyveragroupprojectPlaceholderSettings/lyveragroup/lyvera-multi-promo-slides.yml',
]) {
  rmPath(dir);
}
cleanLyveraGeneratedContent();

// —— Templates (Lyvera components under existing CM project root) ——
writeTemplateFolder(LYVERA_TEMPLATES_FOLDER, TEMPLATES_ROOT, 'Lyvera');

for (const [compName, config] of Object.entries(COMPONENT_TEMPLATES)) {
  if (config.skipTemplateWrite) continue;
  writeComponentTemplate(compName, config);
}

// Ensure no duplicate nested path for hash-serialized fields.
rmPath(
  'lyveragrouptemplatesProject/lyveragroup/Lyvera/LyveraArticleDetails/LyveraArticleDetails/Data/ShortDescription.yml'
);

// —— Renderings (Lyvera components under existing CM project root) ——
writeTemplateFolder(RENDERINGS_LYVERA, RENDERINGS_ROOT, 'Lyvera', 'lyveragroupprojectRenderings/lyveragroup');
writeRendering(R.Header, 'LyveraHeader', 'Lyvera/LyveraHeader/LyveraHeader');
writeRendering(R.Footer, 'LyveraFooter', 'Lyvera/LyveraFooter/LyveraFooter');
writeRendering(R.TextBand, 'LyveraTextBand', 'Lyvera/LyveraTextBand/LyveraTextBand');
writeRendering(R.Banner, 'LyveraBanner', 'Lyvera/LyveraBanner/LyveraBanner');
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
writeRendering(R.BrandPageBody, 'LyveraBrandPageBody', 'Lyvera/LyveraBrandPageBody/LyveraBrandPageBody');
writeRendering(R.BlogListing, 'LyveraBlogListing', 'Lyvera/LyveraBlogListing/LyveraBlogListing');
writeRendering(R.ArticleDetails, 'LyveraArticleDetails', 'Lyvera/LyveraArticleDetails/LyveraArticleDetails');
writeRendering(R.FAQ, 'LyveraFAQ', 'Lyvera/LyveraFAQ/LyveraFAQ', {
  placeholders: PH.FaqItems,
  dynamicPlaceholders: true,
});
writeRendering(R.FAQItem, 'LyveraFAQItem', 'Lyvera/LyveraFAQItem/LyveraFAQItem');

// Sitecore serialization uses a hash folder for MultiPromoImageSlider field items (Title name collision).
for (const fieldName of ['Title', 'Description', 'CtaLink']) {
  rmPath(
    `lyveragrouptemplatesProject/lyveragroup/Lyvera/LyveraMultiPromoImageSlider/LyveraMultiPromoImageSlider/Data/${fieldName}.yml`
  );
}

// —— Brand sites (lyvera corporate; eventsinternational pulled from CM) ——
const siteCtx = {
  w, TS, OWNER, GRID, DEVICE, TENANT, R, AR, par, ownerBlock,
  T_FOLDER, T_PARTIAL, T_PAGE_DESIGN, T_VARIANT_DEF, T_VARIANT, T_STYLE,
  F_SIGNATURE, F_RENDERINGS, F_PARTIAL_DESIGNS, F_TEMPLATES_MAPPING, F_RENDERINGS_LIST,
  F_STYLE_VALUE, F_ALLOWED_RENDERINGS, PAGE_TEMPLATE, COMPONENT_TEMPLATES,
  RENDERING_HOST, PAGE_PROMO_RENDERING, T_PLACEHOLDER, F_PLACEHOLDER_KEY,
};

for (const siteConfig of allSiteConfigs()) {
  generateSite(siteCtx, siteConfig);
}
console.log('Lyvera Group serialization written under authoring/items/lyveragroup/');

// —— Placeholder settings (child items only; CM root already exists) ——
writeProjectPlaceholder(PH.BrandLogos, CM_IDS.placeholderSettingsRoot, 'lyvera-brand-logos', [R.BrandLogo]);
writeProjectPlaceholder(PH.MultiPromoSlides, CM_IDS.placeholderSettingsRoot, 'lyvera-multi-promo-slides', [R.MultiPromoSlide]);
writeProjectPlaceholder(PH.FaqItems, CM_IDS.placeholderSettingsRoot, 'lyvera-faq-items', [R.FAQItem]);
