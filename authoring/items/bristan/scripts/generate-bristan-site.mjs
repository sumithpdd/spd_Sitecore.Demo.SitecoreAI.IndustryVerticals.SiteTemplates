/**
 * Bristan — UK taps & showers demo site (standalone Bristan collection, full isolation).
 * Run: node authoring/items/bristan/scripts/generate-bristan-site.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const SERIAL_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content', 'bristan');
const ROOT = join(SERIAL_ROOT, 'bristan');
// Sitecore CLI hashes this placeholder path (path length); keep in sync with `serialization validate -f`
const PH_PRODUCT_CATEGORY_HASH_DIR = '46EA014593F9CCAA';
const SITE = '/sitecore/content/bristan/bristan';
const TS = '20260605T120000Z';
const OWNER = 'sitecore\\johan.becue@sitecore.com';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const GRID =
  'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles';

const HOME = 'b8030000-0001-4000-8000-000000000002';
const DATA = 'b8030000-0001-4000-8000-000000000003';
const PROMOS_FOLDER = 'b8030020-0001-4000-8000-000000000001';
const TEXTS_FOLDER = 'b8030020-0001-4000-8000-000000000002';
const LINK_LISTS = 'b8030020-0001-4000-8000-000000000003';
const IMAGES_FOLDER = 'b8030020-0001-4000-8000-000000000004';
const PARTIAL_DESIGNS = 'b8030010-0001-4000-8000-000000000020';
const PARTIAL_DESIGN_PH = 'b8030010-0001-4000-8000-000000000021';
const PAGE_DESIGNS = 'b8030010-0001-4000-8000-000000000022';
const HEADLESS_VARIANTS = 'b8030010-0001-4000-8000-000000000023';
const PRESENTATION = 'b8030000-0001-4000-8000-000000000006';
const PLACEHOLDER_SETTINGS = 'b8030010-0001-4000-8000-000000000030';
const AVAILABLE_RENDERINGS = 'b8030010-0001-4000-8000-000000000040';

const T_PAGE = 'b80300c0-0001-4000-8000-00000000000f';
const T_PRODUCT = 'f6e44a9e-074a-4865-987e-0c2dc00b7af5';
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

const SITE_ROOT = 'b8030000-0001-4000-8000-000000000001';
const DICTIONARY = 'b8030000-0001-4000-8000-000000000005';
const MEDIA = 'b8030000-0001-4000-8000-000000000004';
const SETTINGS = 'b8030000-0001-4000-8000-000000000007';
const MEDIA_SHARED = 'b80300a0-0001-4000-8000-000000000002';
const MEDIA_SITE = 'b80300a0-0001-4000-8000-000000000003';
const TEMPLATES_PATH = 'b8030081-0001-4000-8000-000000000001';
const RENDERINGS_PATH = 'b8030082-0001-4000-8000-000000000001';
const PLACEHOLDERS_PATH = 'b8030085-0001-4000-8000-000000000001';
const HEADLESS_SITE_TEMPLATE = 'fcfe3539-7c16-45a5-9457-081b8234f64d';

const templateDesignMapping = (templateId, designId) =>
  `%7b${templateId.toUpperCase()}%7d%3d%257B${designId.toUpperCase()}%257D`;
const templateDesignMappings = (...entries) =>
  entries.map(([templateId, designId]) => templateDesignMapping(templateId, designId)).join('%26');
const T_AVAILABLE_RENDERINGS = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';

const BRISTAN_LOGO = 'https://www.bristan.com/images/bristan-logo.svg';
const HERO_IMAGE = 'https://www.bristan.com/-/media/images/homepage/banner/banner-1.ashx';

const F_HERO_IMAGE = '00b71f70-411d-4ea1-a423-74ed20b60157';
const F_PROMO_IMAGE_ONE = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
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
};

const VARIANT = {
  heroDefault: 'b8030053-0001-4000-8000-000000000001',
  featuresDefault: 'b8030053-0001-4000-8000-000000000002',
  promoDefault: 'b8030053-0001-4000-8000-000000000003',
  navDefault: 'b8030053-0001-4000-8000-000000000004',
  imageDefault: 'b8030053-0001-4000-8000-000000000005',
  linkListDefault: 'b8030053-0001-4000-8000-000000000006',
  footerDefault: 'b8030053-0001-4000-8000-000000000007',
};

const NAV = {
  filter: 'd063e9d1-c7b5-4b1e-b31e-69886c9c59f5',
  levelFrom: '1bb88840-5fb3-4353-ad8d-81136f6ff75a',
  levelTo: 'a59325bb-5a27-46f9-8110-9d499715f3be',
};

const fieldNames = (variantId, dpid = 1) =>
  `${GRID}&amp;FieldNames=%7B${variantId.toUpperCase()}%7D&amp;DynamicPlaceholderId=${dpid}`;

const heroPar = (dpid = 1) => fieldNames(VARIANT.heroDefault, dpid);
const promoPar = (dpid = 1) => fieldNames(VARIANT.promoDefault, dpid);
const featuresPar = (dpid = 1) => fieldNames(VARIANT.featuresDefault, dpid);
const richTextPar = (dpid = 1) => `${GRID}&amp;DynamicPlaceholderId=${dpid}`;

const navigationPar = () =>
  `${GRID}&amp;FieldNames=%7B${VARIANT.navDefault.toUpperCase()}%7D&amp;NavigationRoot&amp;LevelFrom=%7B${NAV.levelFrom.toUpperCase()}%7D&amp;LevelTo=%7B${NAV.levelTo.toUpperCase()}%7D&amp;Filter=%7B${NAV.filter.toUpperCase()}%7D&amp;Flattened&amp;AddRoot=1&amp;SerializerFieldNames&amp;SimpleLayout&amp;DynamicPlaceholderId=1`;

const imageLogoPar = (dpid = 3) =>
  `${GRID}&amp;FieldNames=%7B${VARIANT.imageDefault.toUpperCase()}%7D&amp;DynamicPlaceholderId=${dpid}`;

const IDS = {
  heroFolder: 'b8030040-0001-4000-8000-000000000001',
  featuresFolder: 'b8030040-0001-4000-8000-000000000002',
  footersFolder: 'b8030040-0001-4000-8000-000000000003',
  partialHeader: 'b8030050-0001-4000-8000-000000000001',
  partialFooter: 'b8030050-0001-4000-8000-000000000002',
  partialProductContent: 'b8030050-0001-4000-8000-000000000003',
  partialProductCategoryContent: 'b8030050-0001-4000-8000-000000000004',
  phPartialHeader: 'b8030052-0001-4000-8000-000000000001',
  phPartialFooter: 'b8030052-0001-4000-8000-000000000002',
  phPartialProductContent: 'b8030052-0001-4000-8000-000000000003',
  phPartialProductCategoryContent: 'b8030052-0001-4000-8000-000000000004',
  pageDesignDefault: 'b8030051-0001-4000-8000-000000000001',
  pageDesignProductPage: 'b8030051-0001-4000-8000-000000000002',
  pageDesignProductCategoryPage: 'b8030051-0001-4000-8000-000000000003',
  dsHero: 'b8030040-0001-4000-8000-000000000010',
  dsHeroHomeowners: 'b8030040-0001-4000-8000-000000000011',
  dsHeroShowers: 'b8030040-0001-4000-8000-000000000012',
  dsHeroBathroomTaps: 'b8030040-0001-4000-8000-000000000013',
  dsPromoLifetime: 'b8030040-0001-4000-8000-000000000020',
  dsPromoContact: 'b8030040-0001-4000-8000-000000000021',
  dsPromoFaq: 'b8030040-0001-4000-8000-000000000022',
  dsPromoWhy: 'b8030040-0001-4000-8000-000000000023',
  dsFeaturesHelp: 'b8030040-0001-4000-8000-000000000030',
  dsTextShowers: 'b8030040-0001-4000-8000-000000000040',
  dsTextBathroomTaps: 'b8030040-0001-4000-8000-000000000041',
  dsTextInstallers: 'b8030040-0001-4000-8000-000000000042',
  dsTextMerchants: 'b8030040-0001-4000-8000-000000000043',
  dsTextSpecifiers: 'b8030040-0001-4000-8000-000000000044',
  dsTextBrochure: 'b8030040-0001-4000-8000-000000000045',
  dsTextProducts: 'b8030040-0001-4000-8000-000000000046',
  dsTextEssentials: 'b8030040-0001-4000-8000-000000000047',
  dsTextFindRetailer: 'b8030040-0001-4000-8000-000000000048',
  dsTextInspirationGallery: 'b8030040-0001-4000-8000-000000000049',
  dsTextAffordableHousing: 'b8030040-0001-4000-8000-00000000004a',
  dsTextSectors: 'b8030040-0001-4000-8000-00000000004b',
  dsHeroEssentials: 'b8030040-0001-4000-8000-000000000014',
  dsHeroFindRetailer: 'b8030040-0001-4000-8000-000000000015',
  dsHeroInspirationGallery: 'b8030040-0001-4000-8000-000000000016',
  dsFooter: 'b8030040-0001-4000-8000-000000000050',
  dsLinkListProducts: 'b8030040-0001-4000-8000-000000000051',
  dsLinkListHelp: 'b8030040-0001-4000-8000-000000000052',
  dsLinkListCompany: 'b8030040-0001-4000-8000-000000000053',
  dsLogoImage: 'b8030040-0001-4000-8000-000000000060',
  pageHomeowners: 'b8030001-0001-4000-8000-000000000001',
  pageShowers: 'b8030001-0001-4000-8000-000000000002',
  pageBathroomTaps: 'b8030001-0001-4000-8000-000000000003',
  pageInstallers: 'b8030001-0001-4000-8000-000000000004',
  pageProductsFolder: 'b8030001-0001-4000-8000-000000000005',
  pageProductsBathroomTaps: 'b8030001-0001-4000-8000-000000000006',
  pageMerchants: 'b8030001-0001-4000-8000-000000000007',
  pageSpecifiers: 'b8030001-0001-4000-8000-000000000008',
  pageBrochure: 'b8030001-0001-4000-8000-000000000009',
  pageEssentials: 'b8030001-0001-4000-8000-000000000010',
  pageFindRetailer: 'b8030001-0001-4000-8000-000000000011',
  pageSearch: 'b8030001-0001-4000-8000-000000000012',
  pageInspirationGallery: 'b8030001-0001-4000-8000-000000000013',
  pageSpecifiersSectors: 'b8030001-0001-4000-8000-000000000014',
  pageAffordableHousing: 'b8030001-0001-4000-8000-000000000015',
  productHourglass: 'b8030002-0001-4000-8000-000000000001',
  productCruzar: 'b8030002-0001-4000-8000-000000000002',
  productMolida: 'b8030002-0001-4000-8000-000000000003',
  product1901BasinMixer: 'b8030002-0001-4000-8000-000000000004',
  arPageContent: 'b8030010-0001-4000-8000-000000000041',
  arNavigation: 'b8030010-0001-4000-8000-000000000042',
  arMedia: 'b8030010-0001-4000-8000-000000000043',
  arPageStructure: 'b8030010-0001-4000-8000-000000000044',
  phHeadlessMain: 'b8030010-0001-4000-8000-000000000032',
  phHeadlessHeader: 'b8030010-0001-4000-8000-000000000033',
  phHeadlessFooter: 'b8030010-0001-4000-8000-000000000034',
  uidHomeownersHero: 'b8030100-0001-4000-8000-000000000301',
  uidHomeownersPromo: 'b8030100-0001-4000-8000-000000000302',
  uidShowersHero: 'b8030100-0001-4000-8000-000000000311',
  uidShowersText: 'b8030100-0001-4000-8000-000000000312',
  uidShowersPromo: 'b8030100-0001-4000-8000-000000000313',
  uidBathroomHero: 'b8030100-0001-4000-8000-000000000321',
  uidBathroomText: 'b8030100-0001-4000-8000-000000000322',
  uidBathroomPromo: 'b8030100-0001-4000-8000-000000000323',
  uidInstallersHero: 'b8030100-0001-4000-8000-000000000331',
  uidInstallersText: 'b8030100-0001-4000-8000-000000000332',
  uidInstallersPromo: 'b8030100-0001-4000-8000-000000000333',
  uidMerchantsHero: 'b8030100-0001-4000-8000-000000000341',
  uidMerchantsText: 'b8030100-0001-4000-8000-000000000342',
  uidMerchantsPromo: 'b8030100-0001-4000-8000-000000000343',
  uidSpecifiersHero: 'b8030100-0001-4000-8000-000000000351',
  uidSpecifiersText: 'b8030100-0001-4000-8000-000000000352',
  uidSpecifiersPromo: 'b8030100-0001-4000-8000-000000000353',
  uidBrochureHero: 'b8030100-0001-4000-8000-000000000361',
  uidBrochureText: 'b8030100-0001-4000-8000-000000000362',
  uidBrochurePromo: 'b8030100-0001-4000-8000-000000000363',
  uidEssentialsHero: 'b8030100-0001-4000-8000-000000000371',
  uidEssentialsText: 'b8030100-0001-4000-8000-000000000372',
  uidEssentialsPromo: 'b8030100-0001-4000-8000-000000000373',
  uidFindRetailerHero: 'b8030100-0001-4000-8000-000000000381',
  uidFindRetailerText: 'b8030100-0001-4000-8000-000000000382',
  uidFindRetailerPromo: 'b8030100-0001-4000-8000-000000000383',
  uidInspirationText: 'b8030100-0001-4000-8000-000000000391',
  uidInspirationPromo: 'b8030100-0001-4000-8000-000000000392',
  uidAffordableText: 'b8030100-0001-4000-8000-000000000401',
  uidAffordablePromo: 'b8030100-0001-4000-8000-000000000402',
  uidSearchResults: 'b8030100-0001-4000-8000-000000000411',
};

const RUID = {
  homeHero: 'b8030100-0001-4000-8000-000000000001',
  homePromo1: 'b8030100-0001-4000-8000-000000000002',
  homePromo2: 'b8030100-0001-4000-8000-000000000003',
  homePromo3: 'b8030100-0001-4000-8000-000000000004',
  homeFeatures: 'b8030100-0001-4000-8000-000000000005',
  headerLogo: 'b8030100-0001-4000-8000-000000000010',
  headerContainer: 'b8030100-0001-4000-8000-000000000008',
  headerNav: 'b8030100-0001-4000-8000-000000000011',
  headerIcons: 'b8030100-0001-4000-8000-000000000012',
  footerMain: 'b8030100-0001-4000-8000-000000000020',
  footerList1: 'b8030100-0001-4000-8000-000000000021',
  footerList2: 'b8030100-0001-4000-8000-000000000022',
  footerList3: 'b8030100-0001-4000-8000-000000000023',
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

variantFolder('b8030054-0001-4000-8000-000000000001', 'Hero Banner');
variantItem('b8030054-0001-4000-8000-000000000001', 'Default', VARIANT.heroDefault, 'Hero Banner');
variantFolder('b8030054-0001-4000-8000-000000000002', 'Features');
variantItem('b8030054-0001-4000-8000-000000000002', 'Default', VARIANT.featuresDefault, 'Features');
variantFolder('b8030054-0001-4000-8000-000000000003', 'Promo');
variantItem('b8030054-0001-4000-8000-000000000003', 'Default', VARIANT.promoDefault, 'Promo');
variantFolder('b8030054-0001-4000-8000-000000000004', 'Navigation');
variantItem('b8030054-0001-4000-8000-000000000004', 'Default', VARIANT.navDefault, 'Navigation');
variantFolder('b8030054-0001-4000-8000-000000000005', 'Image');
variantItem('b8030054-0001-4000-8000-000000000005', 'Default', VARIANT.imageDefault, 'Image');
variantFolder('b8030054-0001-4000-8000-000000000006', 'LinkList');
variantItem('b8030054-0001-4000-8000-000000000006', 'Default', VARIANT.linkListDefault, 'LinkList');
variantFolder('b8030054-0001-4000-8000-000000000007', 'Footer');
variantItem('b8030054-0001-4000-8000-000000000007', 'Default', VARIANT.footerDefault, 'Footer');

// --- Site shell (Forma Lux headless branch templates) ---
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
  Value: "bristan"
- ID: "5764d2d4-724d-4313-a81b-9246c911faff"
  Hint: AppDatasourcesPath
  Value: "{${DATA.toUpperCase()}}"
- ID: "5ca117eb-8782-4a4f-9f2f-30de31fc2e34"
  Hint: PlaceholdersPath
  Value: "{${PLACEHOLDERS_PATH.toUpperCase()}}"
- ID: "72e83c8d-3578-4e50-b4c0-93a78a1729f2"
  Hint: FilesystemPath
  Value: "/dist/bristan"
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

// --- Data subfolders ---
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
  item({ id: PARTIAL_DESIGNS, parent: 'b8030000-0001-4000-8000-000000000006', template: T_PARTIAL_DESIGNS_FOLDER, path: `${SITE}/Presentation/Partial Designs`, languages: meta() }),
);
write(
  'Presentation/Page Designs.yml',
  item({
    id: PAGE_DESIGNS,
    parent: 'b8030000-0001-4000-8000-000000000006',
    template: T_PAGE_DESIGNS_FOLDER,
    path: `${SITE}/Presentation/Page Designs`,
    shared: `SharedFields:
- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: TemplatesMapping
  Value: "${templateDesignMappings(
    [T_PAGE, IDS.pageDesignDefault],
    [T_PRODUCT, IDS.pageDesignProductPage],
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

const hero = (id, name, title, desc, ctaText, ctaUrl, image = HERO_IMAGE) =>
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
          ? [`- ID: "e3c72e5d-cbf1-4af8-8a73-dc4d3c8590f3"\n      Hint: CtaLink\n      Value: |\n        <link linktype="internal" text="${ctaText}" url="${ctaUrl}" />`]
          : []),
      ]),
    }),
  );

hero(
  IDS.dsHero,
  'Home Hero',
  "Welcome to the UK's Number One Taps and Showers Brand",
  'Straightforward solutions for every bathroom and kitchen that you can trust time and time again.',
  'Find a Product',
  '/products/bathroom-taps',
);
hero(
  IDS.dsHeroHomeowners,
  'Homeowners Hero',
  'Bristan for Homeowners',
  'Find your perfect taps, showers or accessories with our lifetime guarantee peace of mind.',
  'Browse our ranges',
  '/bathroom-taps',
);
hero(
  IDS.dsHeroShowers,
  'Showers Hero',
  'Stylish Bristan Shower Options for Every Home',
  'From exposed mini valve showers to trend-led concealed designs — crafted for a refreshing experience.',
  'View our range of showers',
  '/showers',
);
hero(
  IDS.dsHeroBathroomTaps,
  'Bathroom Taps Hero',
  'Find Your Perfect Bathroom Taps',
  '35 styles in 4 finishes — from Hourglass to Cruzar, built for quality and fast installation.',
  'Browse our Bathroom Taps',
  '/products/bathroom-taps',
);
hero(
  IDS.dsHeroEssentials,
  'Essentials Hero',
  'Essentials',
  'Great value taps and showers, made brilliant. The basics, done brilliantly.',
  'View the Naxos range',
  '/products/bathroom-taps',
);
hero(
  IDS.dsHeroFindRetailer,
  'Find a Stockist Hero',
  'Find A Stockist | Taps & Showers | Bristan',
  'Find us in thousands of stockists nationwide, including merchants, trade counters and bathroom showrooms.',
  'Search by postcode',
  '/find-a-retailer',
);
hero(
  IDS.dsHeroInspirationGallery,
  'Inspiration Gallery Hero',
  'Find Your Perfect Showers, Kitchen Taps & Bathroom Taps Here',
  'Traditional or contemporary? Browse our gallery for ideas and click through to products.',
  'Find a Product',
  '/products',
);

const promo = (id, name, title, desc, linkText, linkUrl) =>
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
        `- ID: "453ed40c-5232-4e90-b023-7a3cee2bcfe8"\n      Hint: PromoMoreInfo\n      Value: |\n        <link linktype="internal" text="${linkText}" url="${linkUrl}" />`,
      ]),
    }),
  );

promo(
  IDS.dsPromoLifetime,
  'Lifetime Guarantee',
  'Lifetime Guarantee',
  'Repair, replacement or refund on all parts and finishes. Genuine peace of mind from a name you can trust.',
  'Find out more',
  '/homeowners-home',
);
promo(
  IDS.dsPromoContact,
  'Contact Us',
  'Award-winning customer services',
  'Product advice, spare parts or service engineer visits — get in touch with our team today.',
  'Contact Us',
  '/homeowners-home',
);
promo(
  IDS.dsPromoFaq,
  'FAQs',
  'Frequently asked questions',
  'Answers to some of our most commonly asked questions.',
  "FAQ's",
  '/homeowners-home',
);
promo(
  IDS.dsPromoWhy,
  'Why Bristan',
  'Why choose Bristan',
  "The UK's number one for taps and showers, with straightforward solutions you can trust.",
  'Why Bristan',
  '/',
);

write(
  'Data/Features/Here to Help.yml',
  item({
    id: IDS.dsFeaturesHelp,
    parent: IDS.featuresFolder,
    template: T_FEATURES,
    path: `${SITE}/Data/Features/Here to Help`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: Here to Help`,
      `- ID: "4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6"\n      Hint: Description\n      Value: |\n        <div class="ck-content"><p>Whether you are a homeowner, installer, merchant or specifier — Bristan has the support you need.</p></div>`,
    ]),
  }),
);

[
  ['Feature 1', 'Homeowners', 'Inspiration, guarantees and product registration for your home.'],
  ['Feature 2', 'Installers', 'On Tap community, spares finder and installation support.'],
  ['Feature 3', 'Merchants', 'Brochures, portal access and nationwide stockist network.'],
  ['Feature 4', 'Specifiers', 'Sector solutions for healthcare, new build and affordable housing.'],
].forEach(([name, title, description], index) =>
  write(
    `Data/Features/Here to Help/${name}.yml`,
    item({
      id: `b8030041-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
      parent: IDS.dsFeaturesHelp,
      template: T_FEATURE,
      path: `${SITE}/Data/Features/Here to Help/${name}`,
      languages: meta([
        `- ID: "5f507c84-84f9-4033-81a2-90bca3d12606"\n      Hint: FeatureTitle\n      Value: ${title}`,
        `- ID: "35b07fa2-ce95-4459-8dd6-074203dda9a7"\n      Hint: FeatureDescription\n      Value: ${description}`,
      ]),
    }),
  ),
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

text(
  IDS.dsTextShowers,
  'Showers Intro',
  '<h2>Mixer showers for every bathroom</h2><p>Whether you need a little help waking up or want to feel reinvigorated after a long day, our range of mixer showers are guaranteed to leave you feeling refreshed. From exposed mini valve showers and stylish bar showers to trend-led concealed showers, we have styles and finishes to suit any bathroom.</p>',
);
text(
  IDS.dsTextBathroomTaps,
  'Bathroom Taps Intro',
  '<h2>Explore our range of bathroom taps</h2><p>Bristan bathroom taps are built for quality, trusted for reliability and designed for fast, straightforward installation. With 35 different styles in chrome, black, brushed brass and gun metal grey — we have something to deliver the perfect look with lasting performance.</p>',
);
text(
  IDS.dsTextInstallers,
  'Installers Intro',
  '<h2>Why choose Bristan?</h2><p>Our NEW Lifetime Guarantee covers parts, finishes and working components. Join On Tap — our installer community with exclusive competitions, product launches and a 500+ strong Facebook group.</p>',
);
text(
  IDS.dsTextMerchants,
  'Merchants Intro',
  '<h2>Bristan for Merchants</h2><p>Backed by low fault rates, UK-testing and industry-leading customer service. Download brochures, order products and access our merchant portal.</p>',
);
text(
  IDS.dsTextSpecifiers,
  'Specifiers Intro',
  '<h2>Specifying Bristan is the Easy Choice</h2><p>Sector solutions for healthcare, new build, affordable housing and care homes. Access specification tools, literature and our dedicated specification team.</p>',
);
text(
  IDS.dsTextBrochure,
  'Brochure Intro',
  '<h2>Our Brochures</h2><p>View our brochures online or request a hard copy in the post. Download the latest product and price guides for domestic and commercial ranges.</p>',
);
text(
  IDS.dsTextProducts,
  'Products Intro',
  '<h2>Bathroom Taps</h2><p>The right taps can make a real difference to any bathroom. Available in chrome, black, and brushed brass.</p><p><a href="/products/bathroom-taps">View Bathroom Taps</a></p><h2>Kitchen Taps</h2><p>From traditional to modern and bold — kitchen taps in chrome, black, white, brushed nickel, brushed brass and stainless steel.</p><h2>Showers</h2><p>Our showers are available in black, chrome, and brushed brass. <a href="/showers">View Showers</a></p><h2>Accessories</h2><p>Robe hooks, shelves, towel rails and more — coordinate your bathroom with Bristan accessories.</p>',
);
text(
  IDS.dsTextEssentials,
  'Essentials Intro',
  '<h2>Naxos — New Essentials Range</h2><p>Introducing Naxos with a contemporary crosshead design. Long-life ceramic cartridge, flexible tails and fixing kit included — backed by our lifetime guarantee.</p><h2>Brilliant Value Taps and Showers</h2><p>Bristan Essentials offers great value taps and showers, made brilliant. WRAS approved with plenty of parts and spares available.</p><h2>Essentials Shower Range</h2><p>Zing bar shower — compact, versatile and easy to maintain.</p>',
);
text(
  IDS.dsTextFindRetailer,
  'Find a Stockist Intro',
  '<h2>Find A Stockist</h2><p>Bristan is Great Britain\'s largest supplier of taps and showers with 1 in 5 homes owning a Bristan product. Enter your postcode to find showrooms and stockists near you.</p><h3>Showrooms</h3><p>Showrooms are a great place to view the Bristan collection and order products directly.</p><h3>Stockists</h3><p>Visit a stockist near you to order or pick up a product.</p>',
);
text(
  IDS.dsTextInspirationGallery,
  'Inspiration Gallery Intro',
  '<h2>Inspiration Gallery</h2><p>Can\'t decide between traditional or contemporary? Browse Cruzar in brushed brass, Altum bath shower mixers, Hourglass concealed showers, Jule kitchen taps and more.</p><p><a href="/products">Find a Product</a> · <a href="/order-a-brochure">Download a Brochure</a> · <a href="/find-a-retailer">Find a Retailer</a></p>',
);
text(
  IDS.dsTextSectors,
  'Specifiers Sectors Intro',
  '<h2>Find Your Sector</h2><p>Sector solutions for healthcare, new build, affordable housing and care homes.</p><ul><li><a href="/specifiers-home/sectors/affordable-housing">Affordable Housing</a></li></ul>',
);
text(
  IDS.dsTextAffordableHousing,
  'Affordable Housing Intro',
  '<h2>Specifying for Affordable Housing</h2><p>Understanding the challenges faced by affordable housing specifiers, Bristan\'s products deliver on functionality, safety and style, while providing value for money without compromising on quality.</p><h3 id="bsm">Bath Shower Mixer — Thermostatic and Part G Compliant</h3><p>Guarding against scalding is hugely important. Our products are thermostatically controlled to ensure water temperatures never exceed 44°C — satisfying Part G of the building regulations.</p><h3>Taps — Robust and Good Value for Money</h3><p>Club and Design Utility taps combine practical design, affordability and quality with comprehensive product warranty.</p><h3>Mixer Showers — Thermostatic and Multi-Function</h3><p>Compliant with Part G and BREEAM requirements with safe-to-touch cool chrome technology.</p>',
);

write(
  'Data/Images/Bristan Logo.yml',
  item({
    id: IDS.dsLogoImage,
    parent: IMAGES_FOLDER,
    template: T_IMAGE_DS,
    path: `${SITE}/Data/Images/Bristan Logo`,
    languages: meta([
      `- ID: "57caf172-ce57-4e48-b3a1-46f8aea71c08"\n      Hint: Image\n      Value: |\n        <image src="${BRISTAN_LOGO}" alt="Bristan" />`,
      `- ID: "75fbf1b1-e7c5-494b-9633-693909f79425"\n      Hint: TargetUrl\n      Value: |\n        <link linktype="internal" text="" url="/" />`,
    ]),
  }),
);

write(
  'Data/Footers/Bristan Footer.yml',
  item({
    id: IDS.dsFooter,
    parent: IDS.footersFolder,
    template: T_FOOTER,
    path: `${SITE}/Data/Footers/Bristan Footer`,
    shared: `SharedFields:
- ID: "2895a16e-c1b8-4e79-959a-802d5bc81a5a"
  Hint: Logo
  Value: |
    <image src="${BRISTAN_LOGO}" alt="Bristan" />
`,
    languages: meta([
      `- ID: "775b58bb-13a1-426d-86e5-765ad797e407"\n      Hint: TitleOne\n      Value: Products`,
      `- ID: "d12db112-ac8e-4701-9186-1c25d7c2c148"\n      Hint: TitleTwo\n      Value: Help & Advice`,
      `- ID: "40096e29-7ffe-4148-902f-2e64d17f3f2b"\n      Hint: TitleThree\n      Value: Company`,
      `- ID: "79d2d2a7-b0d5-421c-89fb-b7d040f56d26"\n      Hint: CopyrightText\n      Value: © The Bristan Group Limited`,
      `- ID: "ff56e380-2171-49bf-a693-84ee1bc9413b"\n      Hint: TermsText\n      Value: |\n        <link linktype="external" url="https://www.bristan.com/terms-and-conditions" text="Terms &amp; Conditions" />`,
      `- ID: "9f2b5ebe-6b3a-4128-b6e9-6b7adf4e86da"\n      Hint: PolicyText\n      Value: |\n        <link linktype="external" url="https://www.bristan.com/privacy-promise" text="Privacy Promise" />`,
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
  links.forEach(([linkId, linkName, text, url], i) =>
    write(
      `Data/Link Lists/${folderName}/${linkName}.yml`,
      item({
        id: linkId,
        parent: listId,
        template: T_LINK,
        path: `${SITE}/Data/Link Lists/${folderName}/${linkName}`,
        languages: meta([
          `- ID: "68c2a603-f98e-42a3-be2d-dd70598c2a63"\n      Hint: Link\n      Value: |\n        <link linktype="internal" url="${url}" text="${text}" />`,
        ]),
      }),
    ),
  );
};

writeLinkList(IDS.dsLinkListProducts, 'Footer Products', [
  ['b8030045-0001-4000-8000-000000000001', 'Bathroom Taps', 'Bathroom Taps', '/bathroom-taps'],
  ['b8030045-0001-4000-8000-000000000002', 'Kitchen Taps', 'Kitchen Taps', '/bathroom-taps'],
  ['b8030045-0001-4000-8000-000000000003', 'Showers', 'Showers', '/showers'],
  ['b8030045-0001-4000-8000-000000000004', 'Accessories', 'Bathroom Accessories', '/bathroom-taps'],
]);
writeLinkList(IDS.dsLinkListHelp, 'Footer Help', [
  ['b8030046-0001-4000-8000-000000000001', 'Contact', 'Contact Us', '/homeowners-home'],
  ['b8030046-0001-4000-8000-000000000002', 'Guarantee', 'Our Guarantees', '/homeowners-home'],
  ['b8030046-0001-4000-8000-000000000003', 'Brochure', 'Order a Brochure', '/order-a-brochure'],
  ['b8030046-0001-4000-8000-000000000004', 'Stockist', 'Find a Stockist', '/homeowners-home'],
]);
writeLinkList(IDS.dsLinkListCompany, 'Footer Company', [
  ['b8030047-0001-4000-8000-000000000001', 'Installers', 'Installers', '/installers-home'],
  ['b8030047-0001-4000-8000-000000000002', 'Merchants', 'Merchants', '/merchants-home'],
  ['b8030047-0001-4000-8000-000000000003', 'Specifiers', 'Specifiers', '/specifiers-home'],
  ['b8030047-0001-4000-8000-000000000004', 'About', 'About Bristan', '/'],
]);

// --- Presentation ---
const headerRenderings = rendering([
  {
    uid: RUID.headerContainer,
    rid: R.Header,
    ph: 'headless-header',
    par: `${GRID}&amp;FieldNames&amp;DynamicPlaceholderId=1`,
  },
  { uid: RUID.headerLogo, rid: R.Image, ph: '/headless-header/header-left-1', ds: IDS.dsLogoImage, par: imageLogoPar() },
  { uid: RUID.headerNav, rid: R.Navigation, ph: '/headless-header/header-nav-1', ds: HOME, par: navigationPar() },
  {
    uid: RUID.headerIcons,
    rid: R.NavigationIcons,
    ph: '/headless-header/header-right-1',
    par: `${GRID}&amp;HideWishlistIcon=1&amp;HideCartIcon=1&amp;DynamicPlaceholderId=2`,
  },
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
  Value: "${IDS.partialHeader}|${IDS.partialFooter}"
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
  Value: "${IDS.partialHeader}|${IDS.partialProductContent}|${IDS.partialFooter}"
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
  Value: "${IDS.partialHeader}|${IDS.partialProductCategoryContent}|${IDS.partialFooter}"
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ProductCategoryPage`]),
  }),
);

// --- Placeholder settings ---
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
phSetting(IDS.phHeadlessHeader, PLACEHOLDER_SETTINGS, 'headless-header', 'headless-header');
phSetting(IDS.phHeadlessFooter, PLACEHOLDER_SETTINGS, 'headless-footer', 'headless-footer');
phSetting(IDS.phPartialHeader, PARTIAL_DESIGN_PH, 'Partial Design/Header', 'sxa-header');
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

// --- Available renderings ---
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

const helpSection = () => [
  { uid: 'b8030100-0001-4000-8000-000000000101', rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoContact, par: promoPar(1) },
  { uid: 'b8030100-0001-4000-8000-000000000102', rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoFaq, par: promoPar(1) },
  { uid: 'b8030100-0001-4000-8000-000000000103', rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoWhy, par: promoPar(1) },
];

const homeRenderings = rendering([
  { uid: RUID.homeHero, rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHero, par: heroPar(1) },
  { uid: RUID.homePromo1, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoPar(1) },
  { uid: RUID.homeFeatures, rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesHelp, par: featuresPar(1) },
  ...helpSection(),
]);

write(
  'Home.yml',
  item({
    id: HOME,
    parent: 'b8030000-0001-4000-8000-000000000001',
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
      `- ID: "${F_TITLE}"\n      Hint: Title\n      Value: Bristan | UK's Number One Taps & Showers Brand`,
      `- ID: "32c603c2-c858-4138-8fcb-8e18a5ad8240"\n      Hint: metadataTitle\n      Value: Bristan | UK's Number One Taps & Showers Brand`,
    ]),
  }),
);

const page = (cfg) => {
  const pageTemplate = cfg.template || T_PAGE;
  const pageDesignId = (cfg.pageDesignId || IDS.pageDesignDefault).toUpperCase();
  write(
    `Home/${cfg.file}.yml`,
    item({
      id: cfg.id,
      parent: cfg.parent || HOME,
      template: pageTemplate,
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

const landingPage = (id, file, nav, title, heroDs, textDs, uids) =>
  page({
    id,
    file,
    nav,
    title,
    renderings: rendering([
      { uid: uids.hero, rid: R.HeroBanner, ph: 'headless-main', ds: heroDs, par: heroPar(1) },
      ...(textDs
        ? [{ uid: uids.text, rid: R.RichText, ph: 'headless-main', ds: textDs, par: richTextPar(1) }]
        : []),
      { uid: uids.promo, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoPar(1) },
      ...helpSection(),
    ]),
  });

landingPage(IDS.pageHomeowners, 'homeowners-home', 'Homeowners', 'Bristan for Homeowners', IDS.dsHeroHomeowners, null, {
  hero: IDS.uidHomeownersHero,
  promo: IDS.uidHomeownersPromo,
});
landingPage(IDS.pageShowers, 'showers', 'Showers', 'Stylish Bristan Shower Options for Every Home', IDS.dsHeroShowers, IDS.dsTextShowers, {
  hero: IDS.uidShowersHero,
  text: IDS.uidShowersText,
  promo: IDS.uidShowersPromo,
});
landingPage(IDS.pageBathroomTaps, 'bathroom-taps', 'Bathroom Taps', 'Find Your Perfect Bathroom Taps', IDS.dsHeroBathroomTaps, IDS.dsTextBathroomTaps, {
  hero: IDS.uidBathroomHero,
  text: IDS.uidBathroomText,
  promo: IDS.uidBathroomPromo,
});
landingPage(IDS.pageInstallers, 'installers-home', 'Installers', 'Why Choose Bristan? A Guide for Installers', IDS.dsHero, IDS.dsTextInstallers, {
  hero: IDS.uidInstallersHero,
  text: IDS.uidInstallersText,
  promo: IDS.uidInstallersPromo,
});
landingPage(IDS.pageMerchants, 'merchants-home', 'Merchants', 'Bristan for Merchants', IDS.dsHero, IDS.dsTextMerchants, {
  hero: IDS.uidMerchantsHero,
  text: IDS.uidMerchantsText,
  promo: IDS.uidMerchantsPromo,
});
landingPage(IDS.pageSpecifiers, 'specifiers-home', 'Specifiers', 'Specifying Bristan is the Easy Choice', IDS.dsHero, IDS.dsTextSpecifiers, {
  hero: IDS.uidSpecifiersHero,
  text: IDS.uidSpecifiersText,
  promo: IDS.uidSpecifiersPromo,
});
landingPage(IDS.pageBrochure, 'order-a-brochure', 'Order a Brochure', 'Our Brochures', IDS.dsHero, IDS.dsTextBrochure, {
  hero: IDS.uidBrochureHero,
  text: IDS.uidBrochureText,
  promo: IDS.uidBrochurePromo,
});

landingPage(IDS.pageEssentials, 'essentials', 'Essentials', 'Essentials', IDS.dsHeroEssentials, IDS.dsTextEssentials, {
  hero: IDS.uidEssentialsHero,
  text: IDS.uidEssentialsText,
  promo: IDS.uidEssentialsPromo,
});

landingPage(
  IDS.pageFindRetailer,
  'find-a-retailer',
  'Find a Stockist',
  'Find A Stockist | Taps & Showers | Bristan',
  IDS.dsHeroFindRetailer,
  IDS.dsTextFindRetailer,
  {
    hero: IDS.uidFindRetailerHero,
    text: IDS.uidFindRetailerText,
    promo: IDS.uidFindRetailerPromo,
  },
);

page({
  id: IDS.pageSearch,
  file: 'search',
  nav: 'Search',
  title: 'Search for Products and Spares',
  renderings: rendering([
    { uid: IDS.uidSearchResults, rid: R.SearchResults, ph: 'headless-main', par: `${GRID}&amp;DynamicPlaceholderId=1` },
    ...helpSection(),
  ]),
});

page({
  id: IDS.pageInspirationGallery,
  parent: IDS.pageHomeowners,
  file: 'homeowners-home/inspiration-gallery',
  nav: 'Inspiration Gallery',
  title: 'Find Your Perfect Showers, Kitchen Taps & Bathroom Taps Here',
  renderings: rendering([
    { uid: 'b8030100-0001-4000-8000-000000000390', rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHeroInspirationGallery, par: heroPar(1) },
    { uid: IDS.uidInspirationText, rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextInspirationGallery, par: richTextPar(1) },
    { uid: IDS.uidInspirationPromo, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoPar(1) },
    ...helpSection(),
  ]),
});

page({
  id: IDS.pageSpecifiersSectors,
  parent: IDS.pageSpecifiers,
  file: 'specifiers-home/sectors',
  nav: 'Sectors',
  title: 'Specifiers — Sectors',
  renderings: rendering([
    { uid: 'b8030100-0001-4000-8000-000000000400', rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextSectors, par: richTextPar(1) },
    ...helpSection(),
  ]),
});

page({
  id: IDS.pageAffordableHousing,
  parent: IDS.pageSpecifiersSectors,
  file: 'specifiers-home/sectors/affordable-housing',
  nav: 'Affordable Housing',
  title: 'Specifying for Affordable Housing',
  renderings: rendering([
    { uid: 'b8030100-0001-4000-8000-000000000403', rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHero, par: heroPar(1) },
    { uid: IDS.uidAffordableText, rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextAffordableHousing, par: richTextPar(1) },
    { uid: IDS.uidAffordablePromo, rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoLifetime, par: promoPar(1) },
    ...helpSection(),
  ]),
});

page({
  id: IDS.pageProductsFolder,
  file: 'products',
  nav: 'Products',
  title: 'Products',
  renderings: rendering([
    { uid: 'b8030100-0001-4000-8000-000000000201', rid: R.PageHeader, ph: 'headless-main' },
    { uid: 'b8030100-0001-4000-8000-000000000205', rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextProducts, par: richTextPar(1) },
    ...helpSection(),
  ]),
});

page({
  id: IDS.pageProductsBathroomTaps,
  parent: IDS.pageProductsFolder,
  file: 'products/bathroom-taps',
  nav: 'Bathroom Taps',
  title: 'Bathroom Taps — Product Filters',
  template: T_PRODUCT_CATEGORY,
  pageDesignId: IDS.pageDesignProductCategoryPage,
  renderings: rendering([
    { uid: 'b8030100-0001-4000-8000-000000000202', rid: R.PageHeader, ph: 'headless-main' },
    { uid: 'b8030100-0001-4000-8000-000000000203', rid: R.ProductListing, ph: 'headless-main' },
    { uid: 'b8030100-0001-4000-8000-000000000204', rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextBathroomTaps, par: richTextPar(1) },
    ...helpSection(),
  ]),
});

const product = (id, name, title, sku) =>
  write(
    `Home/products/bathroom-taps/${name}.yml`,
    item({
      id,
      parent: IDS.pageProductsBathroomTaps,
      template: T_PRODUCT,
      path: `${SITE}/Home/products/bathroom-taps/${name}`,
      shared: `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${IDS.pageDesignProductPage.toUpperCase()}}"
`,
      languages: meta([
        `- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ${title}`,
        `- ID: "${F_TITLE}"\n      Hint: Title\n      Value: ${title}`,
        `- ID: "32c603c2-c858-4138-8fcb-8e18a5ad8240"\n      Hint: metadataTitle\n      Value: ${title}`,
        `- ID: "58d111ab-b286-42ab-bb35-8daadd6ab480"\n      Hint: SKU\n      Value: ${sku}`,
      ]),
    }),
  );

product(IDS.productHourglass, 'Hourglass Basin Mixer Chrome', 'Hourglass Basin Mixer — Chrome', 'HG 1/2 C');
product(IDS.productCruzar, 'Cruzar Basin Mixer Brushed Brass', 'Cruzar Basin Mixer — Brushed Brass', 'CR 1/2 BB');
product(IDS.productMolida, 'Molida Basin Mixer Black', 'Molida Basin Mixer — Black', 'MO 1/2 B');
product(
  IDS.product1901BasinMixer,
  '1901 3 Hole Basin Mixer Gold',
  '1901 3 Hole Basin Mixer with Pop-up Waste',
  'N 3HBAS C CD',
);

console.log(`Bristan site generated at ${ROOT}`);
