/**
 * Heritage Bathrooms — second site under bristan collection (shares Project/bristan templates & renderings).
 * Run: node authoring/items/bristan/scripts/generate-heritage-site.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const MODULE_SERIAL = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content');
const SERIAL_ROOT = join(MODULE_SERIAL, 'heritage');
const ROOT = join(SERIAL_ROOT, 'heritage');
const PH_PRODUCT_CATEGORY_HASH_DIR = '46EA014593F9CCAA';
const SITE = '/sitecore/content/bristan/heritage';
const TS = '20260705T120000Z';
const OWNER = 'sitecore\\johan.becue@sitecore.com';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const GRID =
  'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles';

const TENANT_ID = 'b8030080-0001-4000-8000-000000000001';
const MEDIA_SHARED = 'b80300a0-0001-4000-8000-000000000002';
const MEDIA_SITE = 'b80302a0-0001-4000-8000-000000000003';
const TEMPLATES_PATH = 'b8030081-0001-4000-8000-000000000001';
const RENDERINGS_PATH = 'b8030082-0001-4000-8000-000000000001';
const PLACEHOLDERS_PATH = 'b8030085-0001-4000-8000-000000000001';
const HEADLESS_SITE_TEMPLATE = 'fcfe3539-7c16-45a5-9457-081b8234f64d';

const SITE_ROOT = 'b8030200-0001-4000-8000-000000000001';
const HOME = 'b8030200-0001-4000-8000-000000000002';
const DATA = 'b8030200-0001-4000-8000-000000000003';
const MEDIA = 'b8030200-0001-4000-8000-000000000004';
const DICTIONARY = 'b8030200-0001-4000-8000-000000000005';
const PRESENTATION = 'b8030200-0001-4000-8000-000000000006';
const SETTINGS = 'b8030200-0001-4000-8000-000000000007';
const SITE_GROUPING = 'b8030200-0001-4000-8000-000000000008';
const SITE_GROUPING_HERITAGE = 'b8030200-0001-4000-8000-000000000009';

const PROMOS_FOLDER = 'b8030240-0001-4000-8000-000000000001';
const TEXTS_FOLDER = 'b8030240-0001-4000-8000-000000000002';
const LINK_LISTS = 'b8030240-0001-4000-8000-000000000003';
const IMAGES_FOLDER = 'b8030240-0001-4000-8000-000000000004';

const PARTIAL_DESIGNS = 'b8030210-0001-4000-8000-000000000020';
const PARTIAL_DESIGN_PH = 'b8030210-0001-4000-8000-000000000021';
const PAGE_DESIGNS = 'b8030210-0001-4000-8000-000000000022';
const HEADLESS_VARIANTS = 'b8030210-0001-4000-8000-000000000023';
const PLACEHOLDER_SETTINGS = 'b8030210-0001-4000-8000-000000000030';
const AVAILABLE_RENDERINGS = 'b8030210-0001-4000-8000-000000000040';

const T_PAGE = 'b80300c0-0001-4000-8000-00000000000f';
const T_PRODUCT_CATEGORY = '4d2b49e6-1130-444a-b22c-5c7e25d01b56';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_HERO_FOLDER = '38001de0-6d0b-4bc5-bf95-f616cfe0e281';
const T_HERO = 'ac18eef2-f134-4985-8b74-6ad16cca6577';
const T_FEATURES_FOLDER = 'f055ed82-a30e-4ec9-9ca7-2e4ea50f4e82';
const T_FEATURES = 'ad148487-7aae-4095-b602-7f9aeeb3f8b6';
const T_FEATURE = '0a39f168-834c-46c5-8866-65a60764c0a4';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const T_TEXT = '0a7aa373-5ed1-4e9b-9678-22d3c5faf6df';
const T_IMAGE_DS = 'd885df8c-b2d6-4007-b34b-2bbafb527304';
const T_FOOTERS_FOLDER = '78264062-4078-48ba-beb8-3bf32a08f91a';
const T_FOOTER = '7e3a2360-40fa-456d-8061-307338dd39e0';
const T_LINK_LIST = '60c9ac62-4227-443e-8980-92c97e483832';
const T_LINK = '6f108e3c-5d57-42f8-a910-c22920269b0a';
const T_VARIANT_FOLDER = '49c111d0-6867-4798-a724-1f103166e6e9';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const T_PARTIAL_PH = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_DICTIONARY = '0a2847e6-9885-450b-b61e-f9e6528480ef';
const T_MEDIA_FOLDER = 'e8e8c94f-4248-43c3-a79f-99fbb49d78e6';
const T_PRESENTATION = '0a70fa73-8923-4a6e-abf3-4134f25f3221';
const T_SETTINGS = '0de7a4ac-f98c-4e55-912a-7fa90da860aa';
const T_HEADLESS_VARIANTS_FOLDER = 'da26c636-96e1-45e4-88d6-3fcec70d5699';
const T_PLACEHOLDER_SETTINGS_FOLDER = '52288e39-7830-4694-b62d-32a54c6ef7ba';
const T_AVAILABLE_RENDERINGS_FOLDER = '26ec1d18-11b2-4dd9-8326-f6115f4fd7eb';
const T_PROMOS_FOLDER_TEMPLATE = '31135a36-23c2-469c-ba62-d742af0540f3';
const T_TEXTS_FOLDER_TEMPLATE = 'b762d567-87f5-493c-bb48-0c455d834457';
const T_LINK_LISTS_FOLDER = 'c237d144-647a-4afe-aa7b-1570f3e3f139';
const T_IMAGES_FOLDER = 'f7a45276-87f1-4ea5-bf25-e3c7cb7aa993';
const T_PARTIAL_DESIGNS_FOLDER = 'b80300c0-0001-4000-8000-000000000013';
const T_PAGE_DESIGNS_FOLDER = 'b80300c0-0001-4000-8000-00000000000e';
const T_SITE_GROUPING_FOLDER = '8357f958-9aaa-46db-8898-36448a96356f';
const T_SITE_GROUPING = 'e46f3af2-39fa-4866-a157-7017c4b2a40c';
const T_MEDIA_PROJECT_FOLDER = 'fe5dd826-48c6-436d-b87a-7c4210c7413b';
const T_AVAILABLE_RENDERINGS = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';

const templateDesignMapping = (templateId, designId) =>
  `%7b${templateId.toUpperCase()}%7d%3d%257B${designId.toUpperCase()}%257D`;
const templateDesignMappings = (...entries) =>
  entries.map(([templateId, designId]) => templateDesignMapping(templateId, designId)).join('%26');

const HERITAGE_LOGO = 'HERITAGE_LOGO';
const HERO_IMAGE = '/images/hero/banner-1.jpg';

const ctaLinkXml = (text, url, targetId) =>
  `<link class="" querystring="" id="${targetId}" anchor="" target="" title="" linktype="internal" text="${text}" url="${url}" />`;

const F_HERO_IMAGE = '00b71f70-411d-4ea1-a423-74ed20b60157';
const F_FEATURE_IMAGE = '83bc80ee-e97a-474b-8c05-a2559394eebe';
const F_PROMO_SUBTITLE = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';
const F_TITLE = '4ff91248-33ab-4254-b6f7-2618fd0aebae';

const R = {
  HeroBanner: 'b8030070-0001-4000-8000-000000000001',
  Promo: 'b8030070-0001-4000-8000-000000000002',
  Features: 'b8030070-0001-4000-8000-000000000003',
  PageHeader: 'b8030070-0001-4000-8000-000000000004',
  ProductListing: 'b8030070-0001-4000-8000-000000000005',
  RichText: 'b8030070-0001-4000-8000-000000000006',
  Header: 'b8030070-0001-4000-8000-000000000007',
  Footer: 'b8030070-0001-4000-8000-000000000008',
  Navigation: 'b8030070-0001-4000-8000-000000000009',
  NavigationIcons: 'b8030070-0001-4000-8000-00000000000a',
  LinkList: 'b8030070-0001-4000-8000-00000000000b',
  Image: 'b8030070-0001-4000-8000-00000000000c',
  PageContent: 'b8030070-0001-4000-8000-00000000000d',
  Breadcrumb: 'b8030070-0001-4000-8000-00000000000e',
  ProductDetails: 'b8030070-0001-4000-8000-00000000000f',
  SearchResults: 'b8030070-0001-4000-8000-000000000010',
  InspirationCarousel: 'b8030070-0001-4000-8000-000000000011',
};

const VARIANT = {
  heroDefault: 'b8030253-0001-4000-8000-000000000001',
  featuresDefault: 'b8030253-0001-4000-8000-000000000002',
  promoDefault: 'b8030253-0001-4000-8000-000000000003',
  navDefault: 'b8030253-0001-4000-8000-000000000004',
  imageDefault: 'b8030253-0001-4000-8000-000000000005',
  linkListDefault: 'b8030253-0001-4000-8000-000000000006',
  footerDefault: 'b8030253-0001-4000-8000-000000000007',
  promoLifetime: 'b8030253-0001-4000-8000-000000000008',
  featuresHelpCards: 'b8030253-0001-4000-8000-00000000000a',
  promoTopBanner: 'b8030253-0001-4000-8000-00000000000b',
  navBristanMegaMenu: 'b8030253-0001-4000-8000-00000000000c',
  navIconsBristanUtility: 'b8030253-0001-4000-8000-00000000000d',
  inspirationCarouselDefault: 'b8030253-0001-4000-8000-00000000000e',
  promoCategoryTile: 'b8030253-0001-4000-8000-00000000000f',
  featuresBrowseRanges: 'b8030253-0001-4000-8000-000000000010',
  promoCenteredCta: 'b8030253-0001-4000-8000-000000000011',
};

const NAV = {
  filter: 'd063e9d1-c7b5-4b1e-b31e-69886c9c59f5',
  levelFrom: '1bb88840-5fb3-4353-ad8d-81136f6ff75a',
  levelTo: 'a59325bb-5a27-46f9-8110-9d499715f3be',
};

const fieldNames = (variantId, dpid = 1) =>
  `${GRID}&amp;FieldNames=%7B${variantId.toUpperCase()}%7D&amp;DynamicPlaceholderId=${dpid}`;

const heroPar = (dpid = 1) => fieldNames(VARIANT.heroDefault, dpid);
const promoLifetimePar = (dpid = 1) => fieldNames(VARIANT.promoLifetime, dpid);
const promoTopBannerPar = (dpid = 1) => fieldNames(VARIANT.promoTopBanner, dpid);
const featuresHelpPar = (dpid = 1) => fieldNames(VARIANT.featuresHelpCards, dpid);
const inspirationCarouselPar = (dpid = 1) => fieldNames(VARIANT.inspirationCarouselDefault, dpid);
const featuresBrowseRangesPar = (dpid = 1) => fieldNames(VARIANT.featuresBrowseRanges, dpid);
const promoCenteredCtaPar = (dpid = 1) => fieldNames(VARIANT.promoCenteredCta, dpid);
const richTextPar = (dpid = 1) => `${GRID}&amp;DynamicPlaceholderId=${dpid}`;

const navigationPar = () =>
  `${GRID}&amp;FieldNames=%7B${VARIANT.navBristanMegaMenu.toUpperCase()}%7D&amp;NavigationRoot&amp;LevelFrom=%7B${NAV.levelFrom.toUpperCase()}%7D&amp;LevelTo=%7B${NAV.levelTo.toUpperCase()}%7D&amp;Filter=%7B${NAV.filter.toUpperCase()}%7D&amp;Flattened&amp;AddRoot=1&amp;SerializerFieldNames&amp;SimpleLayout&amp;DynamicPlaceholderId=1`;

const navigationIconsPar = () =>
  `${GRID}&amp;FieldNames=%7B${VARIANT.navIconsBristanUtility.toUpperCase()}%7D&amp;DynamicPlaceholderId=2`;

const imageLogoPar = (dpid = 3) =>
  `${GRID}&amp;FieldNames=%7B${VARIANT.imageDefault.toUpperCase()}%7D&amp;DynamicPlaceholderId=${dpid}`;

const IDS = {
  heroFolder: 'b8030240-0001-4000-8000-000000000010',
  featuresFolder: 'b8030240-0001-4000-8000-000000000011',
  footersFolder: 'b8030240-0001-4000-8000-000000000012',
  partialHeader: 'b8030210-0001-4000-8000-000000000001',
  partialHeaderPromo: 'b8030210-0001-4000-8000-000000000005',
  partialFooter: 'b8030210-0001-4000-8000-000000000002',
  partialProductContent: 'b8030210-0001-4000-8000-000000000003',
  partialProductCategoryContent: 'b8030210-0001-4000-8000-000000000004',
  phPartialHeader: 'b8030210-0001-4000-8000-000000000051',
  phPartialFooter: 'b8030210-0001-4000-8000-000000000052',
  phPartialProductContent: 'b8030210-0001-4000-8000-000000000053',
  phPartialProductCategoryContent: 'b8030210-0001-4000-8000-000000000054',
  phPartialHeaderPromo: 'b8030210-0001-4000-8000-000000000055',
  pageDesignDefault: 'b8030210-0001-4000-8000-000000000010',
  pageDesignProductPage: 'b8030210-0001-4000-8000-000000000011',
  pageDesignProductCategoryPage: 'b8030210-0001-4000-8000-000000000012',
  dsHeroHome: 'b8030240-0001-4000-8000-000000000020',
  dsHeroCollections: 'b8030240-0001-4000-8000-000000000021',
  dsHeroCaversham: 'b8030240-0001-4000-8000-000000000022',
  dsHeroWilton: 'b8030240-0001-4000-8000-000000000023',
  dsHeroDorchester: 'b8030240-0001-4000-8000-000000000024',
  dsHeroInspiration: 'b8030240-0001-4000-8000-000000000025',
  dsHeroProducts: 'b8030240-0001-4000-8000-000000000026',
  dsHeroFurniture: 'b8030240-0001-4000-8000-000000000027',
  dsHeroSuites: 'b8030240-0001-4000-8000-000000000028',
  dsHeroTapsAndWastes: 'b8030240-0001-4000-8000-000000000029',
  dsHeroBaths: 'b8030240-0001-4000-8000-00000000002a',
  dsHeroBasins: 'b8030240-0001-4000-8000-00000000002b',
  dsHeroShowers: 'b8030240-0001-4000-8000-00000000002c',
  dsHeroShowrooms: 'b8030240-0001-4000-8000-00000000002d',
  dsHeroBrochure: 'b8030240-0001-4000-8000-00000000002e',
  dsHeroAboutUs: 'b8030240-0001-4000-8000-00000000002f',
  dsHeroCustomerCare: 'b8030240-0001-4000-8000-000000000030',
  dsHeroContactUs: 'b8030240-0001-4000-8000-000000000031',
  dsPromoLifetime: 'b8030240-0001-4000-8000-000000000040',
  dsPromoTopBanner: 'b8030240-0001-4000-8000-000000000041',
  dsPromoShowroom: 'b8030240-0001-4000-8000-000000000042',
  dsFeaturesCustomerHelp: 'b8030240-0001-4000-8000-000000000050',
  dsInspirationCarousel: 'b8030240-0001-4000-8000-000000000051',
  dsBrowseCollections: 'b8030240-0001-4000-8000-000000000052',
  dsFooter: 'b8030240-0001-4000-8000-000000000060',
  dsLinkListProducts: 'b8030240-0001-4000-8000-000000000061',
  dsLinkListHelp: 'b8030240-0001-4000-8000-000000000062',
  dsLinkListCompany: 'b8030240-0001-4000-8000-000000000063',
  dsLogoImage: 'b8030240-0001-4000-8000-000000000070',
  dsTextCollections: 'b8030240-0001-4000-8000-000000000080',
  dsTextProducts: 'b8030240-0001-4000-8000-000000000081',
  dsTextInspiration: 'b8030240-0001-4000-8000-000000000082',
  dsTextShowrooms: 'b8030240-0001-4000-8000-000000000083',
  dsTextBrochure: 'b8030240-0001-4000-8000-000000000084',
  dsTextAboutUs: 'b8030240-0001-4000-8000-000000000085',
  dsTextCustomerCare: 'b8030240-0001-4000-8000-000000000086',
  dsTextContactUs: 'b8030240-0001-4000-8000-000000000087',
  dsTextCaversham: 'b8030240-0001-4000-8000-000000000088',
  dsTextWilton: 'b8030240-0001-4000-8000-000000000089',
  dsTextDorchester: 'b8030240-0001-4000-8000-00000000008a',
  dsTextFurniture: 'b8030240-0001-4000-8000-00000000008b',
  dsTextSuites: 'b8030240-0001-4000-8000-00000000008c',
  dsTextTapsAndWastes: 'b8030240-0001-4000-8000-00000000008d',
  dsTextBaths: 'b8030240-0001-4000-8000-00000000008e',
  dsTextBasins: 'b8030240-0001-4000-8000-00000000008f',
  dsTextShowers: 'b8030240-0001-4000-8000-000000000090',
  pageCollections: 'b8030201-0001-4000-8000-000000000001',
  pageCaversham: 'b8030201-0001-4000-8000-000000000002',
  pageWilton: 'b8030201-0001-4000-8000-000000000003',
  pageDorchester: 'b8030201-0001-4000-8000-000000000004',
  pageInspiration: 'b8030201-0001-4000-8000-000000000005',
  pageProducts: 'b8030201-0001-4000-8000-000000000006',
  pageFurniture: 'b8030201-0001-4000-8000-000000000007',
  pageSuites: 'b8030201-0001-4000-8000-000000000008',
  pageTapsAndWastes: 'b8030201-0001-4000-8000-000000000009',
  pageBaths: 'b8030201-0001-4000-8000-00000000000a',
  pageBasins: 'b8030201-0001-4000-8000-00000000000b',
  pageShowers: 'b8030201-0001-4000-8000-00000000000c',
  pageShowrooms: 'b8030201-0001-4000-8000-00000000000d',
  pageBrochure: 'b8030201-0001-4000-8000-00000000000e',
  pageAboutUs: 'b8030201-0001-4000-8000-00000000000f',
  pageCustomerCare: 'b8030201-0001-4000-8000-000000000010',
  pageContactUs: 'b8030201-0001-4000-8000-000000000011',
  arPageContent: 'b8030210-0001-4000-8000-000000000041',
  arNavigation: 'b8030210-0001-4000-8000-000000000042',
  arMedia: 'b8030210-0001-4000-8000-000000000043',
  arPageStructure: 'b8030210-0001-4000-8000-000000000044',
  phHeadlessMain: 'b8030210-0001-4000-8000-000000000032',
  phHeadlessHeader: 'b8030210-0001-4000-8000-000000000033',
  phHeadlessFooter: 'b8030210-0001-4000-8000-000000000034',
  phHeadlessHeaderPromo: 'b8030210-0001-4000-8000-000000000035',
};

const RUID = {
  homeHero: 'b80302c0-0001-4000-8000-000000000001',
  homePromoLifetime: 'b80302c0-0001-4000-8000-000000000002',
  homeInspiration: 'b80302c0-0001-4000-8000-000000000003',
  homeBrowseCollections: 'b80302c0-0001-4000-8000-000000000004',
  homeShowroomCta: 'b80302c0-0001-4000-8000-000000000005',
  homeHelpFeatures: 'b80302c0-0001-4000-8000-000000000006',
  headerPromoBanner: 'b80302c0-0001-4000-8000-000000000007',
  headerContainer: 'b80302c0-0001-4000-8000-000000000008',
  headerLogo: 'b80302c0-0001-4000-8000-000000000010',
  headerNav: 'b80302c0-0001-4000-8000-000000000011',
  headerIcons: 'b80302c0-0001-4000-8000-000000000012',
  footerMain: 'b80302c0-0001-4000-8000-000000000020',
  footerList1: 'b80302c0-0001-4000-8000-000000000021',
  footerList2: 'b80302c0-0001-4000-8000-000000000022',
  footerList3: 'b80302c0-0001-4000-8000-000000000023',
};

const write = (rel, body) => {
  const file = join(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body.trimStart() + '\n', 'utf8');
};

const writeAtSerialRoot = (rel, body) => {
  const file = join(SERIAL_ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body.trimStart() + '\n', 'utf8');
};

const writeModuleSerial = (rel, body) => {
  const file = join(MODULE_SERIAL, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body.trimStart() + '\n', 'utf8');
};

const meta = (fields = []) => {
  const base = [
    `- ID: "25bed78c-4957-4165-998a-ca1b52f67497"\n      Hint: __Created\n      Value: ${TS}`,
    `- ID: "52807595-0f8f-4b20-8d2a-cb71d28c6103"\n      Hint: __Owner\n      Value: |\n        ${OWNER}`,
    `- ID: "5dd74568-4d4b-44c1-b513-0af5f4cda34f"\n      Hint: __Created by\n      Value: |\n        ${OWNER}`,
    `- ID: "8cdc337e-a112-42fb-bbb4-4143751e123f"\n      Hint: __Revision\n      Value: "${randomUUID()}"`,
    `- ID: "badd9cf9-53e0-4d0c-bcc0-2d784c282f6a"\n      Hint: __Updated by\n      Value: |\n        ${OWNER}`,
    `- ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"\n      Hint: __Updated\n      Value: ${TS}`,
    ...fields,
  ];
  return base.map((l) => `    ${l}`).join('\n');
};

const item = ({ id, parent, template, path, shared = '', languages }) => `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: "${path}"
${shared}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${languages}
`;

const rendering = (entries) => {
  const rows = entries
    .map((e, i) => {
      const before =
        i === entries.length - 1
          ? i === 0
            ? 'p:before="*"'
            : 'p:after="*[1=2]"'
          : i === 0
            ? 'p:before="*"'
            : `p:after="r[@uid='{${entries[i - 1].uid.toUpperCase()}}']"`;
      const ds = e.ds ? `\n          s:ds="${e.ds}"` : '';
      const par = e.par || `${GRID}&amp;DynamicPlaceholderId=${e.dpid || 1}`;
      return `        <r
          uid="{${e.uid.toUpperCase()}}"
          ${before}${ds}
          s:id="{${e.rid.toUpperCase()}}"
          s:par="${par}"
          s:ph="${e.ph}" />`;
    })
    .join('\n');
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}">
${rows}
      </d>
    </r>`;
};

// --- Site root & media library ---
writeAtSerialRoot(
  'heritage.yml',
  item({
    id: SITE_ROOT,
    parent: TENANT_ID,
    template: HEADLESS_SITE_TEMPLATE,
    path: SITE,
    shared: `SharedFields:
- ID: "33d9005e-1f71-415f-b107-53b965c3b037"
  Hint: SiteMediaLibrary
  Value: "{${MEDIA_SITE.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: heritage
- ID: "e2bf3c8d-a12e-45f4-98d6-a37f13bcf375"
  Hint: SiteTemplate
  Value: "{2867D289-8951-458A-AF19-CE93A67BB494}"
`,
    languages: meta(),
  }),
);

writeModuleSerial(
  'media-library/bristan/heritage.yml',
  item({
    id: MEDIA_SITE,
    parent: 'b80300a0-0001-4000-8000-000000000001',
    template: T_MEDIA_PROJECT_FOLDER,
    path: '/sitecore/media library/Project/bristan/heritage',
    languages: meta(),
  }),
);

// --- Headless variants ---
const variantItem = (parent, name, id, componentName) => {
  write(
    `Presentation/Headless Variants/${componentName}/${name}.yml`,
    item({
      id,
      parent,
      template: T_VARIANT,
      path: `${SITE}/Presentation/Headless Variants/${componentName}/${name}`,
      languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ${name}`]),
    }),
  );
};

const variantFolder = (id, componentName) => {
  write(
    `Presentation/Headless Variants/${componentName}.yml`,
    item({
      id,
      parent: HEADLESS_VARIANTS,
      template: T_VARIANT_FOLDER,
      path: `${SITE}/Presentation/Headless Variants/${componentName}`,
      languages: meta(),
    }),
  );
};

variantFolder('b8030254-0001-4000-8000-000000000001', 'Hero Banner');
variantItem('b8030254-0001-4000-8000-000000000001', 'Default', VARIANT.heroDefault, 'Hero Banner');
variantFolder('b8030254-0001-4000-8000-000000000002', 'Features');
variantItem('b8030254-0001-4000-8000-000000000002', 'Default', VARIANT.featuresDefault, 'Features');
variantItem('b8030254-0001-4000-8000-000000000002', 'BrowseRanges', VARIANT.featuresBrowseRanges, 'Features');
variantItem('b8030254-0001-4000-8000-000000000002', 'HelpCards', VARIANT.featuresHelpCards, 'Features');
variantFolder('b8030254-0001-4000-8000-000000000003', 'Promo');
variantItem('b8030254-0001-4000-8000-000000000003', 'Default', VARIANT.promoDefault, 'Promo');
variantItem('b8030254-0001-4000-8000-000000000003', 'Lifetime', VARIANT.promoLifetime, 'Promo');
variantItem('b8030254-0001-4000-8000-000000000003', 'TopBanner', VARIANT.promoTopBanner, 'Promo');
variantItem('b8030254-0001-4000-8000-000000000003', 'CategoryTile', VARIANT.promoCategoryTile, 'Promo');
variantItem('b8030254-0001-4000-8000-000000000003', 'CenteredCta', VARIANT.promoCenteredCta, 'Promo');
variantFolder('b8030254-0001-4000-8000-000000000004', 'Navigation');
variantItem('b8030254-0001-4000-8000-000000000004', 'Default', VARIANT.navDefault, 'Navigation');
variantItem('b8030254-0001-4000-8000-000000000004', 'BristanMegaMenu', VARIANT.navBristanMegaMenu, 'Navigation');
variantFolder('b8030254-0001-4000-8000-000000000005', 'Image');
variantItem('b8030254-0001-4000-8000-000000000005', 'Default', VARIANT.imageDefault, 'Image');
variantFolder('b8030254-0001-4000-8000-000000000006', 'LinkList');
variantItem('b8030254-0001-4000-8000-000000000006', 'Default', VARIANT.linkListDefault, 'LinkList');
variantFolder('b8030254-0001-4000-8000-000000000007', 'Footer');
variantItem('b8030254-0001-4000-8000-000000000007', 'Default', VARIANT.footerDefault, 'Footer');
variantFolder('b8030254-0001-4000-8000-000000000008', 'Navigation Icons');
variantItem('b8030254-0001-4000-8000-000000000008', 'BristanUtility', VARIANT.navIconsBristanUtility, 'Navigation Icons');
variantFolder('b8030254-0001-4000-8000-000000000009', 'Inspiration Carousel');
variantItem('b8030254-0001-4000-8000-000000000009', 'Default', VARIANT.inspirationCarouselDefault, 'Inspiration Carousel');

// --- Site shell ---
write(
  'Dictionary.yml',
  item({
    id: DICTIONARY,
    parent: SITE_ROOT,
    template: T_DICTIONARY,
    path: `${SITE}/Dictionary`,
    shared: `SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/book2.png
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 1500
`,
    languages: meta(),
  }),
);
write(
  'Media.yml',
  item({
    id: MEDIA,
    parent: SITE_ROOT,
    template: T_MEDIA_FOLDER,
    path: `${SITE}/Media`,
    shared: `SharedFields:
- ID: "de8257d9-43aa-4eff-a2f4-2e9fbbd20e79"
  Hint: AdditionalChildren
  Value: |
    {${MEDIA_SHARED.toUpperCase()}}
    {${MEDIA_SITE.toUpperCase()}}
`,
    languages: meta(),
  }),
);
write(
  'Data.yml',
  item({
    id: DATA,
    parent: SITE_ROOT,
    template: T_DATA_FOLDER,
    path: `${SITE}/Data`,
    shared: `SharedFields:
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 1400
`,
    languages: meta(),
  }),
);
write(
  'Presentation.yml',
  item({
    id: PRESENTATION,
    parent: SITE_ROOT,
    template: T_PRESENTATION,
    path: `${SITE}/Presentation`,
    shared: `SharedFields:
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 1600
`,
    languages: meta(),
  }),
);
write(
  'Settings.yml',
  item({
    id: SETTINGS,
    parent: SITE_ROOT,
    template: T_SETTINGS,
    path: `${SITE}/Settings`,
    shared: `SharedFields:
- ID: "0129da3f-8c86-4591-ae32-6ec923413923"
  Hint: DictionaryDomain
  Value: "{${DICTIONARY.toUpperCase()}}"
- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: "{C2DC4690-AF44-48C7-BB21-90D1AD246732}"
- ID: "300fb7a0-b27f-44dd-9af0-b37a19723e0e"
  Hint: RouteTemplateName
  Value: Settings Route
- ID: "32ce6bbe-4217-46e5-9335-42793884cbe3"
  Hint: AppTemplate
  Value: "{${HEADLESS_SITE_TEMPLATE.toUpperCase()}}"
- ID: "3e4f559f-8e59-4405-b50d-619811371f6c"
  Hint: Name
  Value: "heritage"
- ID: "5764d2d4-724d-4313-a81b-9246c911faff"
  Hint: AppDatasourcesPath
  Value: "{${DATA.toUpperCase()}}"
- ID: "5ca117eb-8782-4a4f-9f2f-30de31fc2e34"
  Hint: PlaceholdersPath
  Value: "{${PLACEHOLDERS_PATH.toUpperCase()}}"
- ID: "72e83c8d-3578-4e50-b4c0-93a78a1729f2"
  Hint: FilesystemPath
  Value: "/dist/heritage"
- ID: "9016141c-ff51-40f2-9135-40f5161b9784"
  Hint: ServerSideRenderingEngine
  Value: http
- ID: "a7bbad73-b933-49ff-95c8-1c269cb35e7c"
  Hint: DictionaryPath
  Value: "{${DICTIONARY.toUpperCase()}}"
- ID: "af332c24-fe17-41e7-8caf-8e64c588fe72"
  Hint: EditingTheme
  Value: "{3BCAB9EF-1E4F-4C23-B452-783BB82AA686}"
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: 2000
- ID: "c8d002f9-9518-4c5e-9baa-6617e13f0797"
  Hint: LayoutPath
  Value: "{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}"
- ID: "d0ce707c-342f-4c02-ac0a-edb21346dde4"
  Hint: SupportedLanguages
  Value: "{AF584191-45C9-4201-8740-5409F4CF8BDD}"
- ID: "e8881464-38af-4655-be4a-ee10586578a2"
  Hint: Templates
  Value: "{${TEMPLATES_PATH.toUpperCase()}}"
- ID: "f29428d5-1285-48b8-a884-44057965829a"
  Hint: RenderingsPath
  Value: "{${RENDERINGS_PATH.toUpperCase()}}"
`,
    languages: meta(),
  }),
);
write(
  'Settings/Site Grouping.yml',
  item({
    id: SITE_GROUPING,
    parent: SETTINGS,
    template: T_SITE_GROUPING_FOLDER,
    path: `${SITE}/Settings/Site Grouping`,
    languages: meta(),
  }),
);
write(
  'Settings/Site Grouping/heritage.yml',
  item({
    id: SITE_GROUPING_HERITAGE,
    parent: SITE_GROUPING,
    template: T_SITE_GROUPING,
    path: `${SITE}/Settings/Site Grouping/heritage`,
    shared: `SharedFields:
- ID: "1ee576af-ba8e-4312-9fbd-2ccf8395baa1"
  Hint: StartItem
  Value: "{${HOME.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: Heritage Bathrooms
- ID: "8e0dd914-9afb-4d45-bf8b-7ff5d6e5337e"
  Hint: HostName
  Value: *
- ID: "9eaf6dc9-b811-4cda-9edd-9697faba628a"
  Hint: POS
  Value: "en=heritage"
- ID: "cb4e9e2e-2b66-43dc-ad3f-9caf363d28d3"
  Hint: SiteName
  Value: "heritage"
- ID: "da06d09e-02b6-464a-80fc-9d8d7fc875e3"
  Hint: Environment
  Value: *
- ID: "f57099a3-526a-49f2-aebd-635453e48875"
  Hint: RenderingHost
  Value: "bristan"
`,
    languages: meta(),
  }),
);

// --- Data subfolders & presentation folders ---
[
  ['Promos', PROMOS_FOLDER, T_PROMOS_FOLDER_TEMPLATE],
  ['Texts', TEXTS_FOLDER, T_TEXTS_FOLDER_TEMPLATE],
  ['Link Lists', LINK_LISTS, T_LINK_LISTS_FOLDER],
  ['Images', IMAGES_FOLDER, T_IMAGES_FOLDER],
].forEach(([name, id, template]) => {
  write(`Data/${name}.yml`, item({ id, parent: DATA, template, path: `${SITE}/Data/${name}`, languages: meta() }));
});

write(
  'Presentation/Partial Designs.yml',
  item({ id: PARTIAL_DESIGNS, parent: PRESENTATION, template: T_PARTIAL_DESIGNS_FOLDER, path: `${SITE}/Presentation/Partial Designs`, languages: meta() }),
);
write(
  'Presentation/Page Designs.yml',
  item({
    id: PAGE_DESIGNS,
    parent: PRESENTATION,
    template: T_PAGE_DESIGNS_FOLDER,
    path: `${SITE}/Presentation/Page Designs`,
    shared: `SharedFields:
- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: TemplatesMapping
  Value: "${templateDesignMappings(
    [T_PAGE, IDS.pageDesignDefault],
    [T_PRODUCT_CATEGORY, IDS.pageDesignProductCategoryPage],
  )}"
`,
    languages: meta(),
  }),
);
write(
  'Presentation/Headless Variants.yml',
  item({
    id: HEADLESS_VARIANTS,
    parent: PRESENTATION,
    template: T_HEADLESS_VARIANTS_FOLDER,
    path: `${SITE}/Presentation/Headless Variants`,
    languages: meta(),
  }),
);
write(
  'Data/Hero Banners.yml',
  item({ id: IDS.heroFolder, parent: DATA, template: T_HERO_FOLDER, path: `${SITE}/Data/Hero Banners`, languages: meta() }),
);
write(
  'Data/Features.yml',
  item({ id: IDS.featuresFolder, parent: DATA, template: T_FEATURES_FOLDER, path: `${SITE}/Data/Features`, languages: meta() }),
);
write(
  'Data/Footers.yml',
  item({ id: IDS.footersFolder, parent: DATA, template: T_FOOTERS_FOLDER, path: `${SITE}/Data/Footers`, languages: meta() }),
);

const hero = (id, name, title, desc, ctaText, ctaUrl, ctaLinkId, image = HERO_IMAGE) =>
  write(
    `Data/Hero Banners/${name}.yml`,
    item({
      id,
      parent: IDS.heroFolder,
      template: T_HERO,
      path: `${SITE}/Data/Hero Banners/${name}`,
      shared: `SharedFields:
- ID: "${F_HERO_IMAGE}"
  Hint: Image
  Value: |
    <Image src="${image}" alt="${title}" width="1920" height="720" />
`,
      languages: meta([
        `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: ${title}`,
        `- ID: "1dec177a-1a9b-41cf-a60c-d89f28fa41e8"\n      Hint: Description\n      Value: |\n        <div class="ck-content"><p>${desc}</p></div>`,
        ...(ctaText
          ? [
              `- ID: "e3c72e5d-cbf1-4af8-8a73-dc4d3c8590f3"\n      Hint: CtaLink\n      Value: |\n        ${ctaLinkXml(ctaText, ctaUrl, ctaLinkId)}`,
            ]
          : []),
      ]),
    }),
  );

hero(
  IDS.dsHeroHome,
  'Home Hero',
  'Be inspired — Design with Heritage',
  'Classic British bathroom design with timeless collections, quality craftsmanship and a lifetime guarantee on taps and showers.',
  'Browse Collections',
  '/collections',
  IDS.pageCollections,
);
hero(
  IDS.dsHeroCollections,
  'Collections Hero',
  'Heritage Collections',
  'Discover Caversham, Wilton, Dorchester and Stamford — beautifully coordinated bathroom collections inspired by classic British design.',
  'View Caversham',
  '/collections/caversham',
  IDS.pageCaversham,
);
hero(IDS.dsHeroCaversham, 'Caversham Hero', 'Caversham Collection', 'Traditional elegance with crosshead details, chrome finishes and coordinated furniture for a timeless bathroom.', 'Explore Caversham', '/collections/caversham', IDS.pageCaversham);
hero(IDS.dsHeroWilton, 'Wilton Hero', 'Wilton Collection', 'Refined contemporary styling with soft curves and premium finishes — designed for modern living with Heritage quality.', 'Explore Wilton', '/collections/wilton', IDS.pageWilton);
hero(IDS.dsHeroDorchester, 'Dorchester Hero', 'Dorchester Collection', 'Bold Art Deco influences with striking lines and statement pieces for a luxurious bathroom retreat.', 'Explore Dorchester', '/collections/dorchester', IDS.pageDorchester);
hero(IDS.dsHeroInspiration, 'Inspiration Hero', 'Bathroom Inspiration', 'Browse real bathrooms, styling ideas and coordinated looks to help you design your perfect Heritage bathroom.', 'View Inspiration', '/inspiration', IDS.pageInspiration);
hero(IDS.dsHeroProducts, 'Products Hero', 'Heritage Products', 'From furniture and suites to taps, baths, basins and showers — everything you need for a complete Heritage bathroom.', 'Shop Products', '/products', IDS.pageProducts);
hero(IDS.dsHeroFurniture, 'Furniture Hero', 'Bathroom Furniture', 'Vanity units, storage and mirrored cabinets designed to complement Heritage collections.', 'View Furniture', '/products/furniture', IDS.pageFurniture);
hero(IDS.dsHeroSuites, 'Suites Hero', 'Bathroom Suites', 'Complete bathroom suites combining Heritage basins, WCs and furniture for a coordinated look.', 'View Suites', '/products/suites', IDS.pageSuites);
hero(IDS.dsHeroTapsAndWastes, 'Taps and Wastes Hero', 'Taps & Wastes', 'Quality brassware with ceramic disc technology and a lifetime guarantee on all taps and showers.', 'View Taps', '/products/taps-and-wastes', IDS.pageTapsAndWastes);
hero(IDS.dsHeroBaths, 'Baths Hero', 'Baths', 'Freestanding roll-top baths and shower baths crafted for comfort and classic style.', 'View Baths', '/products/baths', IDS.pageBaths);
hero(IDS.dsHeroBasins, 'Basins Hero', 'Basins', 'Pedestal, semi-pedestal and countertop basins to suit every Heritage bathroom design.', 'View Basins', '/products/basins', IDS.pageBasins);
hero(IDS.dsHeroShowers, 'Showers Hero', 'Showers', 'Exposed and concealed shower valves, riser kits and shower heads with Heritage reliability.', 'View Showers', '/products/showers', IDS.pageShowers);
hero(IDS.dsHeroShowrooms, 'Showrooms Hero', 'Find a Showroom', 'Visit a Heritage showroom to see our collections in person and speak with our experts.', 'Find a Showroom', '/showrooms', IDS.pageShowrooms);
hero(IDS.dsHeroBrochure, 'Brochure Hero', 'Request a Brochure', 'Download or request a Heritage Bathrooms brochure — explore collections, products and inspiration.', 'Request Brochure', '/brochure', IDS.pageBrochure);
hero(IDS.dsHeroAboutUs, 'About Us Hero', 'About Heritage Bathrooms', 'Part of the Bristan Group, Heritage Bathrooms brings classic British design and trusted quality to every home.', 'Our Story', '/about-us', IDS.pageAboutUs);
hero(IDS.dsHeroCustomerCare, 'Customer Care Hero', 'Customer Care', 'Guarantees, spare parts, installation advice and aftercare — we are here to help throughout your bathroom journey.', 'Contact Us', '/contact-us', IDS.pageContactUs);
hero(IDS.dsHeroContactUs, 'Contact Us Hero', 'Contact Heritage Bathrooms', 'Get in touch with our customer care team for product advice, orders, guarantees and technical support.', 'Email Us', '/contact-us', IDS.pageContactUs);

const promo = (id, name, title, desc, linkText, linkUrl, linkId) =>
  write(
    `Data/Promos/${name}.yml`,
    item({
      id,
      parent: PROMOS_FOLDER,
      template: T_PROMO,
      path: `${SITE}/Data/Promos/${name}`,
      languages: meta([
        `- ID: "f7e3056b-5e6e-4080-b2b7-84f76b2052fc"\n      Hint: PromoTitle\n      Value: ${title}`,
        `- ID: "4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6"\n      Hint: PromoDescription\n      Value: |\n        <div class="ck-content"><p>${desc}</p></div>`,
        `- ID: "453ed40c-5232-4e90-b023-7a3cee2bcfe8"\n      Hint: PromoMoreInfo\n      Value: |\n        ${ctaLinkXml(linkText, linkUrl, linkId)}`,
      ]),
    }),
  );

const topBannerPromo = (id, name, highlight, message, linkText, linkUrl, linkId) =>
  write(
    `Data/Promos/${name}.yml`,
    item({
      id,
      parent: PROMOS_FOLDER,
      template: T_PROMO,
      path: `${SITE}/Data/Promos/${name}`,
      languages: meta([
        `- ID: "${F_PROMO_SUBTITLE}"\n      Hint: PromoSubTitle\n      Value: ${highlight}`,
        `- ID: "f7e3056b-5e6e-4080-b2b7-84f76b2052fc"\n      Hint: PromoTitle\n      Value: ${message}`,
        `- ID: "453ed40c-5232-4e90-b023-7a3cee2bcfe8"\n      Hint: PromoMoreInfo\n      Value: |\n        ${ctaLinkXml(linkText, linkUrl, linkId)}`,
      ]),
    }),
  );

promo(
  IDS.dsPromoLifetime,
  'Lifetime Guarantee',
  'Lifetime Guarantee on Taps & Showers',
  'Repair, replacement or refund on all parts and finishes. Genuine peace of mind from Heritage Bathrooms.',
  'Find out more',
  '/customer-care',
  IDS.pageCustomerCare,
);
topBannerPromo(
  IDS.dsPromoTopBanner,
  'Lifetime Top Banner',
  'Lifetime Guarantee',
  'Repair, replacement or refund on all Heritage taps and showers.',
  'Find out more >>>',
  '/customer-care',
  IDS.pageCustomerCare,
);
promo(
  IDS.dsPromoShowroom,
  'Find a Showroom',
  'Find a Heritage Showroom',
  'See our collections in person at showrooms across the UK. Expert advice, product displays and inspiration for your next bathroom project.',
  'FIND A SHOWROOM',
  '/showrooms',
  IDS.pageShowrooms,
);

write(
  'Data/Features/Customer Help.yml',
  item({
    id: IDS.dsFeaturesCustomerHelp,
    parent: IDS.featuresFolder,
    template: T_FEATURES,
    path: `${SITE}/Data/Features/Customer Help`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: Customer Care`,
    ]),
  }),
);

const customerHelpFeatures = [
  ['Feature 1', 'Guarantees & Warranties', 'Lifetime guarantee on taps and showers plus comprehensive product warranties.', 'Customer Care', '/customer-care', IDS.pageCustomerCare],
  ['Feature 2', 'Spare Parts', 'Order replacement parts and cartridges to keep your Heritage products performing beautifully.', 'Find Spares', '/customer-care', IDS.pageCustomerCare],
  ['Feature 3', 'Contact Us', 'Speak to our friendly customer care team for product advice and technical support.', 'Contact Us', '/contact-us', IDS.pageContactUs],
];

customerHelpFeatures.forEach(([name, title, description, linkText, url, pageId], index) =>
  write(
    `Data/Features/Customer Help/${name}.yml`,
    item({
      id: `b8030241-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
      parent: IDS.dsFeaturesCustomerHelp,
      template: T_FEATURE,
      path: `${SITE}/Data/Features/Customer Help/${name}`,
      languages: meta([
        `- ID: "5f507c84-84f9-4033-81a2-90bca3d12606"\n      Hint: FeatureTitle\n      Value: ${title}`,
        `- ID: "35b07fa2-ce95-4459-8dd6-074203dda9a7"\n      Hint: FeatureDescription\n      Value: ${description}`,
        `- ID: "69536d16-4033-4ebf-9416-436f0f5a3cb6"\n      Hint: FeatureLink\n      Value: |\n        ${ctaLinkXml(linkText, url, pageId)}`,
      ]),
    }),
  ),
);

write(
  'Data/Features/Inspiration Carousel.yml',
  item({
    id: IDS.dsInspirationCarousel,
    parent: IDS.featuresFolder,
    template: T_FEATURES,
    path: `${SITE}/Data/Features/Inspiration Carousel`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: Get Inspired`,
    ]),
  }),
);

const inspirationSlide = (id, name, title, ctaText, url, pageId, sortOrder) =>
  write(
    `Data/Features/Inspiration Carousel/${name}.yml`,
    item({
      id,
      parent: IDS.dsInspirationCarousel,
      template: T_FEATURE,
      path: `${SITE}/Data/Features/Inspiration Carousel/${name}`,
      shared: `SharedFields:
- ID: "${F_FEATURE_IMAGE}"
  Hint: FeatureImage
  Value: |
    <image src="${HERO_IMAGE}" alt="${title}" />
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sortOrder}
`,
      languages: meta([
        `- ID: "5f507c84-84f9-4033-81a2-90bca3d12606"\n      Hint: FeatureTitle\n      Value: ${title}`,
        `- ID: "35b07fa2-ce95-4459-8dd6-074203dda9a7"\n      Hint: FeatureDescription\n      Value: Browse our latest brochure and styling ideas for your next bathroom project.`,
        `- ID: "69536d16-4033-4ebf-9416-436f0f5a3cb6"\n      Hint: FeatureLink\n      Value: |\n        ${ctaLinkXml(ctaText, url, pageId)}`,
      ]),
    }),
  );

inspirationSlide('b8030241-0001-4000-8000-000000000010', 'Slide 01', 'Request a Brochure', 'Download Brochure >>', '/brochure', IDS.pageBrochure, 50);
inspirationSlide('b8030241-0001-4000-8000-000000000011', 'Slide 02', 'Inspiration Looks', 'View Inspiration >>', '/inspiration', IDS.pageInspiration, 100);

write(
  'Data/Features/Browse Collections.yml',
  item({
    id: IDS.dsBrowseCollections,
    parent: IDS.featuresFolder,
    template: T_FEATURES,
    path: `${SITE}/Data/Features/Browse Collections`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: Browse Our Collections`,
    ]),
  }),
);

const collectionTile = (id, name, linkText, url, pageId, sortOrder) =>
  write(
    `Data/Features/Browse Collections/${name}.yml`,
    item({
      id,
      parent: IDS.dsBrowseCollections,
      template: T_FEATURE,
      path: `${SITE}/Data/Features/Browse Collections/${name}`,
      shared: `SharedFields:
- ID: "${F_FEATURE_IMAGE}"
  Hint: FeatureImage
  Value: |
    <image src="${HERO_IMAGE}" alt="${linkText}" />
- ID: "ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e"
  Hint: __Sortorder
  Value: ${sortOrder}
`,
      languages: meta([
        `- ID: "5f507c84-84f9-4033-81a2-90bca3d12606"\n      Hint: FeatureTitle\n      Value: ${linkText}`,
        `- ID: "35b07fa2-ce95-4459-8dd6-074203dda9a7"\n      Hint: FeatureDescription\n      Value: `,
        `- ID: "69536d16-4033-4ebf-9416-436f0f5a3cb6"\n      Hint: FeatureLink\n      Value: |\n        ${ctaLinkXml(linkText, url, pageId)}`,
      ]),
    }),
  );

[
  ['Caversham', 'CAVERSHAM', '/collections/caversham', IDS.pageCaversham],
  ['Wilton', 'WILTON', '/collections/wilton', IDS.pageWilton],
  ['Dorchester', 'DORCHESTER', '/collections/dorchester', IDS.pageDorchester],
  ['Stamford', 'STAMFORD', '/collections', IDS.pageCollections],
].forEach(([name, linkText, url, pageId], index) =>
  collectionTile(`b8030241-0001-4000-8000-${String(index + 20).padStart(12, '0')}`, name, linkText, url, pageId, (index + 1) * 50),
);

const text = (id, name, content) =>
  write(
    `Data/Texts/${name}.yml`,
    item({
      id,
      parent: TEXTS_FOLDER,
      template: T_TEXT,
      path: `${SITE}/Data/Texts/${name}`,
      languages: meta([
        `- ID: "729034fc-24f3-40b7-8fa4-fb49d7de20dd"\n      Hint: Text\n      Value: |\n        <div class="ck-content">${content}</div>`,
      ]),
    }),
  );

text(IDS.dsTextCollections, 'Collections Intro', '<h2>Heritage Collections</h2><p>Explore our coordinated bathroom collections — Caversham, Wilton, Dorchester and Stamford — each designed with classic British styling and modern quality.</p>');
text(IDS.dsTextProducts, 'Products Intro', '<h2>Heritage Products</h2><p>Complete your bathroom with Heritage furniture, suites, taps, baths, basins and showers. Every product is designed to work beautifully together.</p>');
text(IDS.dsTextInspiration, 'Inspiration Intro', '<h2>Bathroom Inspiration</h2><p>Discover styling ideas, real bathrooms and coordinated looks to help you create your perfect Heritage bathroom.</p>');
text(IDS.dsTextShowrooms, 'Showrooms Intro', '<h2>Heritage Showrooms</h2><p>Visit a showroom near you to see our collections in person and get expert advice from our team.</p>');
text(IDS.dsTextBrochure, 'Brochure Intro', '<h2>Heritage Brochures</h2><p>Download our latest brochure or request a printed copy delivered to your door.</p>');
text(IDS.dsTextAboutUs, 'About Us Intro', '<h2>About Heritage Bathrooms</h2><p>Heritage Bathrooms is part of the Bristan Group, bringing timeless British bathroom design and trusted engineering to homes across the UK.</p>');
text(IDS.dsTextCustomerCare, 'Customer Care Intro', '<h2>Customer Care</h2><p>Guarantees, spare parts, installation advice and aftercare support — we are here to help at every stage.</p>');
text(IDS.dsTextContactUs, 'Contact Us Intro', '<h2>Contact Us</h2><p>Reach our customer care team for product enquiries, orders, guarantee registration and technical support.</p>');
text(IDS.dsTextCaversham, 'Caversham Intro', '<h2>Caversham Collection</h2><p>Traditional crosshead styling with coordinated furniture, brassware and accessories for a timeless bathroom.</p>');
text(IDS.dsTextWilton, 'Wilton Intro', '<h2>Wilton Collection</h2><p>Soft contemporary curves and premium finishes for a refined, modern bathroom look.</p>');
text(IDS.dsTextDorchester, 'Dorchester Intro', '<h2>Dorchester Collection</h2><p>Art Deco influences with bold lines and statement pieces for a luxurious bathroom retreat.</p>');
text(IDS.dsTextFurniture, 'Furniture Intro', '<h2>Bathroom Furniture</h2><p>Vanity units, storage solutions and mirrored cabinets designed to complement Heritage collections.</p>');
text(IDS.dsTextSuites, 'Suites Intro', '<h2>Bathroom Suites</h2><p>Complete suites combining basins, WCs and furniture for a coordinated Heritage bathroom.</p>');
text(IDS.dsTextTapsAndWastes, 'Taps and Wastes Intro', '<h2>Taps & Wastes</h2><p>Quality brassware with ceramic disc technology and a lifetime guarantee on all taps and showers.</p>');
text(IDS.dsTextBaths, 'Baths Intro', '<h2>Baths</h2><p>Freestanding roll-top baths and shower baths crafted for comfort and classic British style.</p>');
text(IDS.dsTextBasins, 'Basins Intro', '<h2>Basins</h2><p>Pedestal, semi-pedestal and countertop basins to suit every Heritage bathroom design.</p>');
text(IDS.dsTextShowers, 'Showers Intro', '<h2>Showers</h2><p>Exposed and concealed shower valves, riser kits and shower heads with Heritage reliability.</p>');

write(
  'Data/Images/Heritage Logo.yml',
  item({
    id: IDS.dsLogoImage,
    parent: IMAGES_FOLDER,
    template: T_IMAGE_DS,
    path: `${SITE}/Data/Images/Heritage Logo`,
    languages: meta([
      `- ID: "57caf172-ce57-4e48-b3a1-46f8aea71c08"\n      Hint: Image\n      Value: |\n        <image src="${HERITAGE_LOGO}" alt="Heritage Bathrooms" />`,
      `- ID: "75fbf1b1-e7c5-494b-9633-693909f79425"\n      Hint: TargetUrl\n      Value: |\n        <link linktype="internal" text="" url="/" />`,
    ]),
  }),
);

write(
  'Data/Footers/Heritage Footer.yml',
  item({
    id: IDS.dsFooter,
    parent: IDS.footersFolder,
    template: T_FOOTER,
    path: `${SITE}/Data/Footers/Heritage Footer`,
    shared: `SharedFields:
- ID: "2895a16e-c1b8-4e79-959a-802d5bc81a5a"
  Hint: Logo
  Value: |
    <image src="${HERITAGE_LOGO}" alt="Heritage Bathrooms" />
`,
    languages: meta([
      `- ID: "775b58bb-13a1-426d-86e5-765ad797e407"\n      Hint: TitleOne\n      Value: Products`,
      `- ID: "d12db112-ac8e-4701-9186-1c25d7c2c148"\n      Hint: TitleTwo\n      Value: Customer Care`,
      `- ID: "40096e29-7ffe-4148-902f-2e64d17f3f2b"\n      Hint: TitleThree\n      Value: Company`,
      `- ID: "79d2d2a7-b0d5-421c-89fb-b7d040f56d26"\n      Hint: CopyrightText\n      Value: © Heritage Bathrooms`,
      `- ID: "ff56e380-2171-49bf-a693-84ee1bc9413b"\n      Hint: TermsText\n      Value: |\n        <link linktype="external" url="https://www.heritagebathrooms.com/terms-and-conditions" text="Terms &amp; Conditions" />`,
      `- ID: "9f2b5ebe-6b3a-4128-b6e9-6b7adf4e86da"\n      Hint: PolicyText\n      Value: |\n        <link linktype="external" url="https://www.heritagebathrooms.com/privacy-policy" text="Privacy Policy" />`,
    ]),
  }),
);

const writeLinkList = (listId, folderName, links) => {
  write(
    `Data/Link Lists/${folderName}.yml`,
    item({
      id: listId,
      parent: LINK_LISTS,
      template: T_LINK_LIST,
      path: `${SITE}/Data/Link Lists/${folderName}`,
      languages: meta(),
    }),
  );
  links.forEach(([linkId, linkName, linkText, url]) =>
    write(
      `Data/Link Lists/${folderName}/${linkName}.yml`,
      item({
        id: linkId,
        parent: listId,
        template: T_LINK,
        path: `${SITE}/Data/Link Lists/${folderName}/${linkName}`,
        languages: meta([
          `- ID: "68c2a603-f98e-42a3-be2d-dd70598c2a63"\n      Hint: Link\n      Value: |\n        <link linktype="internal" url="${url}" text="${linkText}" />`,
        ]),
      }),
    ),
  );
};

writeLinkList(IDS.dsLinkListProducts, 'Footer Products', [
  ['b8030245-0001-4000-8000-000000000001', 'Collections', 'Collections', '/collections'],
  ['b8030245-0001-4000-8000-000000000002', 'Furniture', 'Furniture', '/products/furniture'],
  ['b8030245-0001-4000-8000-000000000003', 'Taps', 'Taps & Wastes', '/products/taps-and-wastes'],
  ['b8030245-0001-4000-8000-000000000004', 'Showers', 'Showers', '/products/showers'],
]);
writeLinkList(IDS.dsLinkListHelp, 'Footer Customer Care', [
  ['b8030246-0001-4000-8000-000000000001', 'Guarantee', 'Guarantees', '/customer-care'],
  ['b8030246-0001-4000-8000-000000000002', 'Brochure', 'Request a Brochure', '/brochure'],
  ['b8030246-0001-4000-8000-000000000003', 'Showrooms', 'Find a Showroom', '/showrooms'],
  ['b8030246-0001-4000-8000-000000000004', 'Contact', 'Contact Us', '/contact-us'],
]);
writeLinkList(IDS.dsLinkListCompany, 'Footer Company', [
  ['b8030247-0001-4000-8000-000000000001', 'About', 'About Us', '/about-us'],
  ['b8030247-0001-4000-8000-000000000002', 'Inspiration', 'Inspiration', '/inspiration'],
  ['b8030247-0001-4000-8000-000000000003', 'Products', 'All Products', '/products'],
  ['b8030247-0001-4000-8000-000000000004', 'Home', 'Home', '/'],
]);

const headerPromoRenderings = rendering([
  {
    uid: RUID.headerPromoBanner,
    rid: R.Promo,
    ph: 'headless-header-promo',
    ds: IDS.dsPromoTopBanner,
    par: promoTopBannerPar(1),
  },
]);

write(
  'Presentation/Partial Designs/Header Promo.yml',
  item({
    id: IDS.partialHeaderPromo,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: `${SITE}/Presentation/Partial Designs/Header Promo`,
    shared: `SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: header-promo
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${headerPromoRenderings}
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Header Promo`]),
  }),
);

const headerRenderings = rendering([
  {
    uid: RUID.headerContainer,
    rid: R.Header,
    ph: 'headless-header',
    par: `${GRID}&amp;FieldNames&amp;DynamicPlaceholderId=1`,
  },
  { uid: RUID.headerLogo, rid: R.Image, ph: '/headless-header/header-left-1', ds: IDS.dsLogoImage, par: imageLogoPar() },
  { uid: RUID.headerNav, rid: R.Navigation, ph: '/headless-header/header-nav-1', ds: HOME, par: navigationPar() },
  { uid: RUID.headerIcons, rid: R.NavigationIcons, ph: '/headless-header/header-right-1', par: navigationIconsPar() },
]);

write(
  'Presentation/Partial Designs/Header.yml',
  item({
    id: IDS.partialHeader,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: `${SITE}/Presentation/Partial Designs/Header`,
    shared: `SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: header
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${headerRenderings}
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Header`]),
  }),
);

const footerRenderings = rendering([
  {
    uid: RUID.footerMain,
    rid: R.Footer,
    ph: 'headless-footer',
    ds: IDS.dsFooter,
    par: fieldNames(VARIANT.footerDefault, 1),
  },
  {
    uid: RUID.footerList1,
    rid: R.LinkList,
    ph: '/headless-footer/footer-list-first-1',
    ds: IDS.dsLinkListProducts,
    par: fieldNames(VARIANT.linkListDefault, 1),
  },
  {
    uid: RUID.footerList2,
    rid: R.LinkList,
    ph: '/headless-footer/footer-list-second-1',
    ds: IDS.dsLinkListHelp,
    par: fieldNames(VARIANT.linkListDefault, 1),
  },
  {
    uid: RUID.footerList3,
    rid: R.LinkList,
    ph: '/headless-footer/footer-list-third-1',
    ds: IDS.dsLinkListCompany,
    par: fieldNames(VARIANT.linkListDefault, 1),
  },
]);

write(
  'Presentation/Partial Designs/Footer.yml',
  item({
    id: IDS.partialFooter,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: `${SITE}/Presentation/Partial Designs/Footer`,
    shared: `SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: footer
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${footerRenderings}
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Footer`]),
  }),
);

const productContentRenderings = rendering([
  {
    uid: randomUUID(),
    rid: R.ProductDetails,
    ph: 'headless-main',
    par: `${GRID}&amp;ShowAddtoCartButton=1&amp;DynamicPlaceholderId=1`,
  },
]);

write(
  'Presentation/Partial Designs/ProductContent.yml',
  item({
    id: IDS.partialProductContent,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: `${SITE}/Presentation/Partial Designs/ProductContent`,
    shared: `SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: productcontent
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${productContentRenderings}
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ProductContent`]),
  }),
);

const productCategoryContentRenderings = rendering([
  {
    uid: randomUUID(),
    rid: R.ProductListing,
    ph: 'headless-main',
    par: `${GRID}&amp;DynamicPlaceholderId=1`,
  },
]);

write(
  'Presentation/Partial Designs/ProductCategoryContent.yml',
  item({
    id: IDS.partialProductCategoryContent,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: `${SITE}/Presentation/Partial Designs/ProductCategoryContent`,
    shared: `SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: productcategorycontent
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${productCategoryContentRenderings}
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ProductCategoryContent`]),
  }),
);

write(
  'Presentation/Page Designs/Default.yml',
  item({
    id: IDS.pageDesignDefault,
    parent: PAGE_DESIGNS,
    template: T_PAGE_DESIGN,
    path: `${SITE}/Presentation/Page Designs/Default`,
    shared: `SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${IDS.partialHeaderPromo}|${IDS.partialHeader}|${IDS.partialFooter}"
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Default`]),
  }),
);

write(
  'Presentation/Page Designs/ProductPage.yml',
  item({
    id: IDS.pageDesignProductPage,
    parent: PAGE_DESIGNS,
    template: T_PAGE_DESIGN,
    path: `${SITE}/Presentation/Page Designs/ProductPage`,
    shared: `SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${IDS.partialHeaderPromo}|${IDS.partialHeader}|${IDS.partialProductContent}|${IDS.partialFooter}"
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ProductPage`]),
  }),
);

write(
  'Presentation/Page Designs/ProductCategoryPage.yml',
  item({
    id: IDS.pageDesignProductCategoryPage,
    parent: PAGE_DESIGNS,
    template: T_PAGE_DESIGN,
    path: `${SITE}/Presentation/Page Designs/ProductCategoryPage`,
    shared: `SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${IDS.partialHeaderPromo}|${IDS.partialHeader}|${IDS.partialProductCategoryContent}|${IDS.partialFooter}"
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ProductCategoryPage`]),
  }),
);

write(
  'Presentation/Placeholder Settings.yml',
  item({
    id: PLACEHOLDER_SETTINGS,
    parent: PRESENTATION,
    template: T_PLACEHOLDER_SETTINGS_FOLDER,
    path: `${SITE}/Presentation/Placeholder Settings`,
    languages: meta(),
  }),
);
write(
  'Presentation/Placeholder Settings/Partial Design.yml',
  item({
    id: PARTIAL_DESIGN_PH,
    parent: PLACEHOLDER_SETTINGS,
    template: T_PLACEHOLDER_SETTINGS_FOLDER,
    path: `${SITE}/Presentation/Placeholder Settings/Partial Design`,
    languages: meta(),
  }),
);

const phSetting = (id, parent, file, key) =>
  write(
    `Presentation/Placeholder Settings/${file}.yml`,
    item({
      id,
      parent,
      template: T_PARTIAL_PH,
      path: `${SITE}/Presentation/Placeholder Settings/${file}`,
      shared: `SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: "${key}"
`,
      languages: meta(),
    }),
  );

phSetting(IDS.phHeadlessMain, PLACEHOLDER_SETTINGS, 'headless-main', 'headless-main');
phSetting(IDS.phHeadlessHeaderPromo, PLACEHOLDER_SETTINGS, 'headless-header-promo', 'headless-header-promo');
phSetting(IDS.phHeadlessHeader, PLACEHOLDER_SETTINGS, 'headless-header', 'headless-header');
phSetting(IDS.phHeadlessFooter, PLACEHOLDER_SETTINGS, 'headless-footer', 'headless-footer');
phSetting(IDS.phPartialHeader, PARTIAL_DESIGN_PH, 'Partial Design/Header', 'sxa-header');
phSetting(IDS.phPartialHeaderPromo, PARTIAL_DESIGN_PH, 'Partial Design/Header Promo', 'sxa-header-promo');
phSetting(IDS.phPartialFooter, PARTIAL_DESIGN_PH, 'Partial Design/Footer', 'sxa-footer');
phSetting(IDS.phPartialProductContent, PARTIAL_DESIGN_PH, 'Partial Design/ProductContent', 'sxa-productcontent');
writeAtSerialRoot(
  `${PH_PRODUCT_CATEGORY_HASH_DIR}/ProductCategoryContent.yml`,
  item({
    id: IDS.phPartialProductCategoryContent,
    parent: PARTIAL_DESIGN_PH,
    template: T_PARTIAL_PH,
    path: `${SITE}/Presentation/Placeholder Settings/Partial Design/ProductCategoryContent`,
    shared: `SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: "sxa-productcategorycontent"
`,
    languages: meta(),
  }),
);

write(
  'Presentation/Available Renderings.yml',
  item({
    id: AVAILABLE_RENDERINGS,
    parent: PRESENTATION,
    template: T_AVAILABLE_RENDERINGS_FOLDER,
    path: `${SITE}/Presentation/Available Renderings`,
    languages: meta(),
  }),
);

const arFolder = (id, name, renderingIds) =>
  write(
    `Presentation/Available Renderings/${name}.yml`,
    item({
      id,
      parent: AVAILABLE_RENDERINGS,
      template: T_AVAILABLE_RENDERINGS,
      path: `${SITE}/Presentation/Available Renderings/${name}`,
      shared: `SharedFields:
- ID: "715ae6c0-71c8-4744-ab4f-65362d20ad65"
  Hint: Renderings
  Value: |
    ${renderingIds.map((r) => `{${r.toUpperCase()}}`).join('\n    ')}
`,
      languages: meta(),
    }),
  );

arFolder(IDS.arPageContent, 'Page Content', [
  R.HeroBanner,
  R.Promo,
  R.Features,
  R.InspirationCarousel,
  R.RichText,
  R.PageHeader,
  R.ProductListing,
  R.ProductDetails,
  R.PageContent,
  R.SearchResults,
]);
arFolder(IDS.arNavigation, 'Navigation', [R.Navigation, R.NavigationIcons, R.LinkList, R.Breadcrumb]);
arFolder(IDS.arMedia, 'Media', [R.Image]);
arFolder(IDS.arPageStructure, 'Page Structure', [R.Header, R.Footer]);

const helpFeaturesSection = () => [
  {
    uid: RUID.homeHelpFeatures,
    rid: R.Features,
    ph: 'headless-main',
    ds: IDS.dsFeaturesCustomerHelp,
    par: featuresHelpPar(1),
  },
];

const homeRenderings = rendering([
  { uid: RUID.homeHero, rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHeroHome, par: heroPar(1) },
  { uid: RUID.homePromoLifetime, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoLifetimePar(1) },
  {
    uid: RUID.homeInspiration,
    rid: R.InspirationCarousel,
    ph: 'headless-main',
    ds: IDS.dsInspirationCarousel,
    par: inspirationCarouselPar(1),
  },
  {
    uid: RUID.homeBrowseCollections,
    rid: R.Features,
    ph: 'headless-main',
    ds: IDS.dsBrowseCollections,
    par: featuresBrowseRangesPar(1),
  },
  {
    uid: RUID.homeShowroomCta,
    rid: R.Promo,
    ph: 'headless-main',
    ds: IDS.dsPromoShowroom,
    par: promoCenteredCtaPar(1),
  },
  ...helpFeaturesSection(),
]);

write(
  'Home.yml',
  item({
    id: HOME,
    parent: SITE_ROOT,
    template: T_PAGE,
    path: `${SITE}/Home`,
    shared: `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${IDS.pageDesignDefault.toUpperCase()}}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${homeRenderings}
`,
    languages: meta([
      `- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Home`,
      `- ID: "${F_TITLE}"\n      Hint: Title\n      Value: Heritage Bathrooms | Be Inspired — Design with Heritage`,
      `- ID: "32c603c2-c858-4138-8fcb-8e18a5ad8240"\n      Hint: metadataTitle\n      Value: Heritage Bathrooms | Be Inspired — Design with Heritage`,
    ]),
  }),
);

const page = (cfg) => {
  const pageDesignId = (cfg.pageDesignId || IDS.pageDesignDefault).toUpperCase();
  write(
    `Home/${cfg.file}.yml`,
    item({
      id: cfg.id,
      parent: cfg.parent || HOME,
      template: cfg.template || T_PAGE,
      path: `${SITE}/Home/${cfg.file}`,
      shared: `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${pageDesignId}}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${cfg.renderings}
`,
      languages: meta([
        `- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ${cfg.nav}`,
        `- ID: "${F_TITLE}"\n      Hint: Title\n      Value: ${cfg.title}`,
        `- ID: "32c603c2-c858-4138-8fcb-8e18a5ad8240"\n      Hint: metadataTitle\n      Value: ${cfg.title}`,
      ]),
    }),
  );
};

const landingPage = (id, file, nav, title, heroDs, textDs, uids, parent = HOME) =>
  page({
    id,
    file,
    nav,
    title,
    parent,
    renderings: rendering([
      { uid: uids.hero, rid: R.HeroBanner, ph: 'headless-main', ds: heroDs, par: heroPar(1) },
      ...(textDs
        ? [{ uid: uids.text, rid: R.RichText, ph: 'headless-main', ds: textDs, par: richTextPar(1) }]
        : []),
      { uid: uids.promo, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoLifetimePar(1) },
      ...helpFeaturesSection(),
    ]),
  });

const folderPage = (id, file, nav, title, textDs, uidHeader, uidText) =>
  page({
    id,
    file,
    nav,
    title,
    renderings: rendering([
      { uid: uidHeader, rid: R.PageHeader, ph: 'headless-main' },
      { uid: uidText, rid: R.RichText, ph: 'headless-main', ds: textDs, par: richTextPar(1) },
      ...helpFeaturesSection(),
    ]),
  });

folderPage(
  IDS.pageCollections,
  'collections',
  'Collections',
  'Heritage Collections',
  IDS.dsTextCollections,
  'b80302c0-0001-4000-8000-000000000101',
  'b80302c0-0001-4000-8000-000000000102',
);
landingPage(IDS.pageCaversham, 'collections/caversham', 'Caversham', 'Caversham Collection | Heritage Bathrooms', IDS.dsHeroCaversham, IDS.dsTextCaversham, {
  hero: 'b80302c0-0001-4000-8000-000000000111',
  text: 'b80302c0-0001-4000-8000-000000000112',
  promo: 'b80302c0-0001-4000-8000-000000000113',
}, IDS.pageCollections);
landingPage(IDS.pageWilton, 'collections/wilton', 'Wilton', 'Wilton Collection | Heritage Bathrooms', IDS.dsHeroWilton, IDS.dsTextWilton, {
  hero: 'b80302c0-0001-4000-8000-000000000121',
  text: 'b80302c0-0001-4000-8000-000000000122',
  promo: 'b80302c0-0001-4000-8000-000000000123',
}, IDS.pageCollections);
landingPage(IDS.pageDorchester, 'collections/dorchester', 'Dorchester', 'Dorchester Collection | Heritage Bathrooms', IDS.dsHeroDorchester, IDS.dsTextDorchester, {
  hero: 'b80302c0-0001-4000-8000-000000000131',
  text: 'b80302c0-0001-4000-8000-000000000132',
  promo: 'b80302c0-0001-4000-8000-000000000133',
}, IDS.pageCollections);
landingPage(IDS.pageInspiration, 'inspiration', 'Inspiration', 'Bathroom Inspiration | Heritage Bathrooms', IDS.dsHeroInspiration, IDS.dsTextInspiration, {
  hero: 'b80302c0-0001-4000-8000-000000000141',
  text: 'b80302c0-0001-4000-8000-000000000142',
  promo: 'b80302c0-0001-4000-8000-000000000143',
});
folderPage(
  IDS.pageProducts,
  'products',
  'Products',
  'Heritage Products',
  IDS.dsTextProducts,
  'b80302c0-0001-4000-8000-000000000201',
  'b80302c0-0001-4000-8000-000000000202',
);
landingPage(IDS.pageFurniture, 'products/furniture', 'Furniture', 'Bathroom Furniture | Heritage Bathrooms', IDS.dsHeroFurniture, IDS.dsTextFurniture, {
  hero: 'b80302c0-0001-4000-8000-000000000211',
  text: 'b80302c0-0001-4000-8000-000000000212',
  promo: 'b80302c0-0001-4000-8000-000000000213',
}, IDS.pageProducts);
landingPage(IDS.pageSuites, 'products/suites', 'Suites', 'Bathroom Suites | Heritage Bathrooms', IDS.dsHeroSuites, IDS.dsTextSuites, {
  hero: 'b80302c0-0001-4000-8000-000000000221',
  text: 'b80302c0-0001-4000-8000-000000000222',
  promo: 'b80302c0-0001-4000-8000-000000000223',
}, IDS.pageProducts);
landingPage(IDS.pageTapsAndWastes, 'products/taps-and-wastes', 'Taps & Wastes', 'Taps & Wastes | Heritage Bathrooms', IDS.dsHeroTapsAndWastes, IDS.dsTextTapsAndWastes, {
  hero: 'b80302c0-0001-4000-8000-000000000231',
  text: 'b80302c0-0001-4000-8000-000000000232',
  promo: 'b80302c0-0001-4000-8000-000000000233',
}, IDS.pageProducts);
landingPage(IDS.pageBaths, 'products/baths', 'Baths', 'Baths | Heritage Bathrooms', IDS.dsHeroBaths, IDS.dsTextBaths, {
  hero: 'b80302c0-0001-4000-8000-000000000241',
  text: 'b80302c0-0001-4000-8000-000000000242',
  promo: 'b80302c0-0001-4000-8000-000000000243',
}, IDS.pageProducts);
landingPage(IDS.pageBasins, 'products/basins', 'Basins', 'Basins | Heritage Bathrooms', IDS.dsHeroBasins, IDS.dsTextBasins, {
  hero: 'b80302c0-0001-4000-8000-000000000251',
  text: 'b80302c0-0001-4000-8000-000000000252',
  promo: 'b80302c0-0001-4000-8000-000000000253',
}, IDS.pageProducts);
landingPage(IDS.pageShowers, 'products/showers', 'Showers', 'Showers | Heritage Bathrooms', IDS.dsHeroShowers, IDS.dsTextShowers, {
  hero: 'b80302c0-0001-4000-8000-000000000261',
  text: 'b80302c0-0001-4000-8000-000000000262',
  promo: 'b80302c0-0001-4000-8000-000000000263',
}, IDS.pageProducts);
landingPage(IDS.pageShowrooms, 'showrooms', 'Showrooms', 'Find a Showroom | Heritage Bathrooms', IDS.dsHeroShowrooms, IDS.dsTextShowrooms, {
  hero: 'b80302c0-0001-4000-8000-000000000301',
  text: 'b80302c0-0001-4000-8000-000000000302',
  promo: 'b80302c0-0001-4000-8000-000000000303',
});
landingPage(IDS.pageBrochure, 'brochure', 'Brochure', 'Request a Brochure | Heritage Bathrooms', IDS.dsHeroBrochure, IDS.dsTextBrochure, {
  hero: 'b80302c0-0001-4000-8000-000000000311',
  text: 'b80302c0-0001-4000-8000-000000000312',
  promo: 'b80302c0-0001-4000-8000-000000000313',
});
landingPage(IDS.pageAboutUs, 'about-us', 'About Us', 'About Heritage Bathrooms', IDS.dsHeroAboutUs, IDS.dsTextAboutUs, {
  hero: 'b80302c0-0001-4000-8000-000000000321',
  text: 'b80302c0-0001-4000-8000-000000000322',
  promo: 'b80302c0-0001-4000-8000-000000000323',
});
landingPage(IDS.pageCustomerCare, 'customer-care', 'Customer Care', 'Customer Care | Heritage Bathrooms', IDS.dsHeroCustomerCare, IDS.dsTextCustomerCare, {
  hero: 'b80302c0-0001-4000-8000-000000000331',
  text: 'b80302c0-0001-4000-8000-000000000332',
  promo: 'b80302c0-0001-4000-8000-000000000333',
});
landingPage(IDS.pageContactUs, 'contact-us', 'Contact Us', 'Contact Heritage Bathrooms', IDS.dsHeroContactUs, IDS.dsTextContactUs, {
  hero: 'b80302c0-0001-4000-8000-000000000341',
  text: 'b80302c0-0001-4000-8000-000000000342',
  promo: 'b80302c0-0001-4000-8000-000000000343',
});

console.log(`Heritage site generated at ${ROOT}`);
console.log('Next: dotnet sitecore serialization validate -i bristan -f');

