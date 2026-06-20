/**
 * Marley — wire Home + child pages, partial designs, datasources.
 * Run: node authoring/items/marley/scripts/generate-marley-site.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'serialized-content', 'marley', 'marley');
const TS = '20260620T120000Z';
const OWNER = 'sitecore\\johan.becue@sitecore.com';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const GRID =
  'GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;Styles&amp;RenderingIdentifier&amp;CSSStyles';

const HOME = '624e77d1-e40f-4706-8f03-36f15f7bb598';
const DATA = '38a0fea1-9834-405b-9108-170ad16bd538';
const PROMOS_FOLDER = 'fa1a9847-c61e-4475-9b42-2d3cf23c451b';
const TEXTS_FOLDER = 'cdea2f39-28f0-43ac-829e-dcbfcb7b9573';
const LINK_LISTS = 'c60f2255-81ff-4211-8282-d451655b5370';
const IMAGES_FOLDER = '653759f7-fd30-4718-9ff3-6b51e2c0a6f8';
const PARTIAL_DESIGNS = 'f56a49c6-cc7d-4ffc-9162-8aa6a9f77dd4';
const PAGE_DESIGNS = '2b91aa81-e247-44a7-8dff-82552dcb4c97';
const HEADLESS_VARIANTS = 'f3302075-73ba-4eda-8c8c-042be5007cd9';

const T_PAGE = '98e60957-0783-4a9a-85cc-77dad30e9711';
const T_PRODUCT = 'f6e44a9e-074a-4865-987e-0c2dc00b7af5';
const T_ARTICLE = '412bf445-b1a6-4aff-8054-0b21a1febc47';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_HERO_FOLDER = '38001de0-6d0b-4bc5-bf95-f616cfe0e281';
const T_HERO = 'ac18eef2-f134-4985-8b74-6ad16cca6577';
const T_FEATURES_FOLDER = 'f055ed82-a30e-4ec9-9ca7-2e4ea50f4e82';
const T_FEATURES = 'ad148487-7aae-4095-b602-7f9aeeb3f8b6';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const T_TEXT = '0a7aa373-5ed1-4e9b-9678-22d3c5faf6df';
const T_IMAGE_DS = 'd885df8c-b2d6-4007-b34b-2bbafb527304';
const T_FOOTERS_FOLDER = '78264062-4078-48ba-beb8-3bf32a08f91a';
const T_FOOTER = '7e3a2360-40fa-456d-8061-307338dd39e0';
const T_LINK_LIST = '60c9ac62-4227-443e-8980-92c97e483832';
const T_LINK = '6f108e3c-5d57-42f8-a910-c22920269b0a';
const T_VARIANT_FOLDER = '49c111d0-6867-4798-a724-1f103166e6e9';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';

const MARLEY_LOGO = 'https://www.marley.co.uk/-/media/images/logos/marley_logo.ashx';
const HERO_IMAGE =
  'https://www.marley.co.uk/-/media/images/campaigns/morethanaroof/main-landing-page/microsoftteams-image-png.ashx';
const PROMO_IMAGES = {
  roofTiles:
    'https://www.marley.co.uk/-/media/images/case-studies/edgemere/ajc-homes-smooth-grey/ajc-homes-1-resized.ashx',
  accessories:
    'https://www.marley.co.uk/-/media/images/products/solofix/solofix-by-marley-ltd.ashx',
  solar:
    'https://www.marley.co.uk/-/media/images/navigation/tech-services-2021/solar-config-logo.ashx',
  edgemere:
    'https://www.marley.co.uk/-/media/images/case-studies/edgemere/ajc-homes-smooth-grey/ajc-homes-1-resized.ashx',
};
const F_HERO_IMAGE = '00b71f70-411d-4ea1-a423-74ed20b60157';
const F_PROMO_IMAGE_ONE = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
const LOGO_PARAM = encodeURIComponent(`<image src="${MARLEY_LOGO}" alt="Marley" />`);

const R = {
  HeroBanner: 'b49cf2d7-7cb2-4918-8f38-2607d956d995',
  Promo: 'ccd11802-22a3-462f-92fc-821515e2aec8',
  Features: 'e3ccf1d0-7855-4898-8bde-77f83c6a487c',
  PageHeader: '6b69c658-ce00-476c-8a97-fa59f2def73b',
  ProductListing: '613a3675-953d-4ad1-877a-48d24a28977d',
  ProductDetails: '7eeeb709-7aaa-4b2f-8fba-88ef74b3d2fe',
  RichText: '9c6d53e3-fe57-4638-af7b-6d68304c7a94',
  PageContent: 'c5f905f8-fd1f-444e-a9e5-ac6b774ff0de',
  ArticleListing: '66b804d4-b6b6-4342-987f-ac4987d6f900',
  Header: '32138d34-7434-4cd1-bf7f-64da1ceb8f33',
  Footer: '02654ba0-74ae-42a4-b384-bca9b96adf4b',
  Navigation: '9f65621e-1102-461c-bbee-3fadce8e0509',
  NavigationIcons: 'c56efae9-39e8-45eb-8b59-d4bf2b71914e',
  LinkList: '4956263d-1195-4d6e-931b-800ea625ff6f',
  Breadcrumb: '7e5035bd-533a-4e84-a67b-9aa2bf964f21',
  Image: 'ab2edba0-3960-4f12-b765-579dc231894a',
};

const VARIANT = {
  navIconsFolder: 'b7030060-0001-4000-8000-000000000001',
  navIconsMarley: 'b7030060-0001-4000-8000-000000000002',
  footerFolder: 'b7030061-0001-4000-8000-000000000001',
  footerMarley: 'b7030061-0001-4000-8000-000000000002',
};

const fieldNames = (variantId, dpid = 1) =>
  `${GRID}&amp;FieldNames=%7B${variantId.toUpperCase()}%7D&amp;DynamicPlaceholderId=${dpid}`;

const IDS = {
  heroFolder: 'b7030010-0001-4000-8000-000000000001',
  featuresFolder: 'b7030010-0001-4000-8000-000000000002',
  footersFolder: 'b7030040-0001-4000-8000-000000000014',
  partialHeader: 'b7030050-0001-4000-8000-000000000001',
  partialFooter: 'b7030050-0001-4000-8000-000000000002',
  pageDesignDefault: 'b7030051-0001-4000-8000-000000000001',
  dsHero: 'b7030040-0001-4000-8000-000000000001',
  dsPromoRoofTiles: 'b7030040-0001-4000-8000-000000000002',
  dsPromoSolar: 'b7030040-0001-4000-8000-000000000003',
  dsPromoAccessories: 'b7030040-0001-4000-8000-000000000004',
  dsPromoEdgemere: 'b7030040-0001-4000-8000-000000000005',
  dsFeaturesHome: 'b7030040-0001-4000-8000-000000000006',
  dsFeaturesPeace: 'b7030040-0001-4000-8000-000000000007',
  dsTextProducts: 'b7030040-0001-4000-8000-000000000008',
  dsTextRoofTiles: 'b7030040-0001-4000-8000-000000000009',
  dsTextEavesVent: 'b7030040-0001-4000-8000-00000000000a',
  dsTextJbRed: 'b7030040-0001-4000-8000-00000000000b',
  dsTextSamples: 'b7030040-0001-4000-8000-00000000000c',
  dsHeroArticle: 'b7030040-0001-4000-8000-00000000000d',
  dsTextMtar: 'b7030040-0001-4000-8000-00000000000e',
  dsFooter: 'b7030040-0001-4000-8000-00000000000f',
  dsLinkListResources: 'b7030040-0001-4000-8000-000000000010',
  dsLinkListPolicies: 'b7030040-0001-4000-8000-000000000011',
  dsLinkListUseful: 'b7030040-0001-4000-8000-000000000012',
  dsLinkListCategories: 'b7030040-0001-4000-8000-000000000013',
  dsLogoImage: 'b7030040-0001-4000-8000-000000000015',
  pageProducts: 'b7030001-0001-4000-8000-000000000001',
  pageRoofTiles: 'b7030001-0001-4000-8000-000000000002',
  pageClayFolder: 'b7030001-0001-4000-8000-000000000003',
  pageAcmeTile: 'b7030001-0001-4000-8000-000000000004',
  pageBlog: 'b7030001-0001-4000-8000-000000000005',
  pageBlogArticle: 'b7030001-0001-4000-8000-000000000006',
  pageAccessoriesFolder: 'b7030001-0001-4000-8000-000000000007',
  pageEavesVent: 'b7030001-0001-4000-8000-000000000008',
  pageRoofingBattenFolder: 'b7030001-0001-4000-8000-000000000009',
  pageJbRedBatten: 'b7030001-0001-4000-8000-00000000000a',
  pageSamples: 'b7030001-0001-4000-8000-00000000000b',
  pageSolarFolder: 'b7030001-0001-4000-8000-00000000000c',
  pageSolarTile: 'b7030001-0001-4000-8000-00000000000d',
  pageMtar: 'b7030001-0001-4000-8000-00000000000e',
};

const write = (rel, body) => {
  const file = join(ROOT, rel);
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

// --- Data folders ---
write(
  'Data/Hero Banners.yml',
  item({
    id: IDS.heroFolder,
    parent: DATA,
    template: T_HERO_FOLDER,
    path: '/sitecore/content/marley/marley/Data/Hero Banners',
    languages: meta(),
  }),
);

write(
  'Data/Features.yml',
  item({
    id: IDS.featuresFolder,
    parent: DATA,
    template: T_FEATURES_FOLDER,
    path: '/sitecore/content/marley/marley/Data/Features',
    languages: meta(),
  }),
);

// --- Hero Banner datasource ---
write(
  'Data/Hero Banners/Home Hero.yml',
  item({
    id: IDS.dsHero,
    parent: IDS.heroFolder,
    template: T_HERO,
    path: '/sitecore/content/marley/marley/Data/Hero Banners/Home Hero',
    shared: `SharedFields:
- ID: "${F_HERO_IMAGE}"
  Hint: Image
  Value: |
    <Image src="${HERO_IMAGE}" alt="Marley complete roofing systems" width="1920" height="1080" />
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "${randomUUID()}"
`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: How can we help?`,
      `- ID: "1dec177a-1a9b-41cf-a60c-d89f28fa41e8"\n      Hint: Description\n      Value: |\n        <div class="ck-content"><p>It's more than a roof. Explore Marley's complete roofing systems — roof tiles, solar, battens, underlays and accessories.</p></div>`,
      `- ID: "e3c72e5d-cbf1-4af8-8a73-dc4d3c8590f3"\n      Hint: CtaLink\n      Value: |\n        <link linktype="internal" text="View products" url="/products" />`,
    ]),
  }),
);

// --- Promos ---
const promo = (id, name, title, desc, imageUrl, imageAlt) =>
  write(
    `Data/Promos/${name}.yml`,
    item({
      id,
      parent: PROMOS_FOLDER,
      template: T_PROMO,
      path: `/sitecore/content/marley/marley/Data/Promos/${name}`,
      shared: `SharedFields:
- ID: "${F_PROMO_IMAGE_ONE}"
  Hint: PromoImageOne
  Value: |
    <Image src="${imageUrl}" alt="${imageAlt}" width="1100" height="740" />
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "${randomUUID()}"
`,
      languages: meta([
        `- ID: "f7e3056b-5e6e-4080-b2b7-84f76b2052fc"\n      Hint: PromoTitle\n      Value: ${title}`,
        `- ID: "4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6"\n      Hint: PromoDescription\n      Value: |\n        <div class="ck-content"><p>${desc}</p></div>`,
        `- ID: "453ed40c-5232-4e90-b023-7a3cee2bcfe8"\n      Hint: PromoMoreInfo\n      Value: |\n        <link linktype="internal" text="More info" url="/products" />`,
      ]),
    }),
  );

promo(
  IDS.dsPromoRoofTiles,
  'Roof Tiles',
  'Roof tiles',
  'Clay and concrete roof tiles in a wide range of colours and profiles.',
  PROMO_IMAGES.roofTiles,
  'Marley roof tiles',
);
promo(
  IDS.dsPromoAccessories,
  'Accessories',
  'Accessories',
  'Dry fix, ventilation, fire protection and roof fittings.',
  PROMO_IMAGES.accessories,
  'Marley roof accessories',
);
promo(
  IDS.dsPromoSolar,
  'SolarTile',
  'Marley SolarTile®',
  'Roof-integrated solar panels for new-build and refurbishment projects.',
  PROMO_IMAGES.solar,
  'Marley SolarTile',
);
promo(
  IDS.dsPromoEdgemere,
  'Edgemere',
  'Edgemere',
  'Interlocking concrete roof tiles with a slate appearance.',
  PROMO_IMAGES.edgemere,
  'Edgemere roof tiles',
);

// --- Features ---
const features = (id, name, title) =>
  write(
    `Data/Features/${name}.yml`,
    item({
      id,
      parent: IDS.featuresFolder,
      template: T_FEATURES,
      path: `/sitecore/content/marley/marley/Data/Features/${name}`,
      languages: meta([
        `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: ${title}`,
        `- ID: "4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6"\n      Hint: Description\n      Value: |\n        <div class="ck-content"><p>Marley complete roof systems are underwritten by a 15-year warranty for peace of mind.</p></div>`,
      ]),
    }),
  );

features(IDS.dsFeaturesHome, 'Peace of Mind', "We've got you covered");
features(IDS.dsFeaturesPeace, 'Complete Roof System', 'A complete roofing system');

// --- Rich text bands ---
const text = (id, name, content) =>
  write(
    `Data/Texts/${name}.yml`,
    item({
      id,
      parent: TEXTS_FOLDER,
      template: T_TEXT,
      path: `/sitecore/content/marley/marley/Data/Texts/${name}`,
      languages: meta([
        `- ID: "729034fc-24f3-40b7-8fa4-fb49d7de20dd"\n      Hint: Text\n      Value: |\n        <div class="ck-content">${content}</div>`,
      ]),
    }),
  );

text(
  IDS.dsTextProducts,
  'Products SEO',
  '<h2>Marley pitched roofing products</h2><p>We offer more roofing products than any other manufacturer. Our complete roofing systems combine compatible, high-quality elements resulting in a system that is quick and easy to install with minimum maintenance and maximum longevity — underwritten by a 15-year warranty.</p>',
);
text(
  IDS.dsTextRoofTiles,
  'Roof Tiles SEO',
  '<h2>Roof tiles</h2><p>The Marley range of roof tiles have been designed for performance, aesthetics and easy installation. Choose from clay tiles and concrete tiles, Marley SolarTile®, and cedar shingles and shakes.</p>',
);
text(
  IDS.dsTextEavesVent,
  'Eaves Vent Description',
  '<h2>Description</h2><p>Marley Universal 10mm Roof Eaves Ventilation System provides continuous 10mm free vent areas to roof voids for lower pitch roofs with deeper insulation. The system allows clip fixing of tiles at the eaves and meets BS 5534 requirements.</p>',
);
text(
  IDS.dsTextJbRed,
  'JB Red Batten Description',
  '<h2>Description</h2><p>Our JB Red battens are the only UK factory graded roof batten with BBA certification. Produced from high-grade, slow-grown and kiln-dried sideboards for maximum strength and stability — easily identifiable on site due to red pigment.</p>',
);
text(
  IDS.dsTextSamples,
  'Samples Intro',
  '<h2>Samples</h2><p>Order a maximum of 4 samples free of charge. Estimated delivery within 1–2 working days.</p>',
);
text(
  IDS.dsTextMtar,
  'MTAR Intro',
  '<h2>It\'s more than a roof</h2><p>The Marley Solar Roof System supports homeowners looking to reduce the cost of running their homes. Marley SolarTile® combined with inverters and battery storage works seamlessly as a complete renewable energy solution.</p>',
);

// --- Logo image datasource ---
write(
  'Data/Images/Marley Logo.yml',
  item({
    id: IDS.dsLogoImage,
    parent: IMAGES_FOLDER,
    template: T_IMAGE_DS,
    path: '/sitecore/content/marley/marley/Data/Images/Marley Logo',
    languages: meta([
      `- ID: "57caf172-ce57-4e48-b3a1-46f8aea71c08"\n      Hint: Image\n      Value: |\n        <image src="${MARLEY_LOGO}" alt="Marley" />`,
      `- ID: "75fbf1b1-e7c5-494b-9633-693909f79425"\n      Hint: TargetUrl\n      Value: |\n        <link linktype="internal" text="" url="/" />`,
    ]),
  }),
);

// --- Footer datasource ---
write(
  'Data/Footers.yml',
  item({
    id: IDS.footersFolder,
    parent: DATA,
    template: T_FOOTERS_FOLDER,
    path: '/sitecore/content/marley/marley/Data/Footers',
    languages: meta(),
  }),
);

write(
  'Data/Footers/Marley Footer.yml',
  item({
    id: IDS.dsFooter,
    parent: IDS.footersFolder,
    template: T_FOOTER,
    path: '/sitecore/content/marley/marley/Data/Footers/Marley Footer',
    shared: `SharedFields:
- ID: "2895a16e-c1b8-4e79-959a-802d5bc81a5a"
  Hint: Logo
  Value: |
    <image src="${MARLEY_LOGO}" alt="Marley" />
`,
    languages: meta([
      `- ID: "775b58bb-13a1-426d-86e5-765ad797e407"\n      Hint: TitleOne\n      Value: Resources`,
      `- ID: "d12db112-ac8e-4701-9186-1c25d7c2c148"\n      Hint: TitleTwo\n      Value: Policies`,
      `- ID: "40096e29-7ffe-4148-902f-2e64d17f3f2b"\n      Hint: TitleThree\n      Value: Useful Links`,
      `- ID: "79d2d2a7-b0d5-421c-89fb-b7d040f56d26"\n      Hint: CopyrightText\n      Value: © 2026 Marley`,
      `- ID: "ff56e380-2171-49bf-a693-84ee1bc9413b"\n      Hint: TermsText\n      Value: |\n        <link linktype="external" url="https://www.marley.co.uk/terms-and-conditions-of-sale" text="Terms &amp; Conditions of Sale" />`,
      `- ID: "9f2b5ebe-6b3a-4128-b6e9-6b7adf4e86da"\n      Hint: PolicyText\n      Value: |\n        <link linktype="external" url="https://www.marley.co.uk/privacy-policy" text="Privacy Policy" />`,
    ]),
  }),
);

// --- Hero article banner ---
write(
  'Data/Hero Banners/Blog Hero Social Housing.yml',
  item({
    id: IDS.dsHeroArticle,
    parent: IDS.heroFolder,
    template: T_HERO,
    path: '/sitecore/content/marley/marley/Data/Hero Banners/Blog Hero Social Housing',
    shared: `SharedFields:
- ID: "${F_HERO_IMAGE}"
  Hint: Image
  Value: |
    <Image src="${HERO_IMAGE}" alt="Marley social housing roofing" width="1920" height="1080" />
- ID: "dbbbeca1-21c7-4906-9dd2-493c1efa59a2"
  Hint: __Shared revision
  Value: "${randomUUID()}"
`,
    languages: meta([
      `- ID: "985b877b-bfee-473e-aada-0a9f156dfecc"\n      Hint: Title\n      Value: What the Warm Homes Plan means for social housing providers`,
      `- ID: "1dec177a-1a9b-41cf-a60c-d89f28fa41e8"\n      Hint: Description\n      Value: |\n        <div class="ck-content"><p>Funding for solar PV, batteries and heat pumps to upgrade social housing and cut energy bills.</p></div>`,
    ]),
  }),
);

const writeLink = (id, parent, sitecorePath, filePath, text, url, external = true) =>
  write(
    filePath,
    item({
      id,
      parent,
      template: T_LINK,
      path: sitecorePath,
      languages: meta([
        `- ID: "68c2a603-f98e-42a3-be2d-dd70598c2a63"\n      Hint: Link\n      Value: |\n        <link linktype="${external ? 'external' : 'internal'}" url="${url}" text="${text}" />`,
      ]),
    }),
  );

const writeLinkList = (listId, folderName, title, links) => {
  write(
    `Data/Link Lists/${folderName}.yml`,
    item({
      id: listId,
      parent: LINK_LISTS,
      template: T_LINK_LIST,
      path: `/sitecore/content/marley/marley/Data/Link Lists/${folderName}`,
      languages: meta([`- ID: "dc9aaee9-fc44-458d-a9fb-bac61d8b0234"\n      Hint: Title\n      Value: ${title}`]),
    }),
  );
  links.forEach((link, i) => {
    const linkId = randomUUID();
    writeLink(
      linkId,
      listId,
      `/sitecore/content/marley/marley/Data/Link Lists/${folderName}/Link ${i + 1}`,
      `Data/Link Lists/${folderName}/Link ${i + 1}.yml`,
      link.text,
      link.url,
      link.external !== false,
    );
  });
};

writeLinkList(IDS.dsLinkListResources, 'Footer Resources', 'Resources', [
  { text: 'Blogs', url: '/blog' },
  { text: 'Brochures', url: 'https://www.marley.co.uk/brochures' },
  { text: 'Case Studies', url: 'https://www.marley.co.uk/case-studies' },
  { text: 'CPDs', url: 'https://www.marley.co.uk/training-and-cpd' },
  { text: 'Samples', url: '/samples' },
]);

writeLinkList(IDS.dsLinkListPolicies, 'Footer Policies', 'Policies', [
  { text: 'Accessibility Statement', url: 'https://www.marley.co.uk/accessibility-statement' },
  { text: 'Conditions of Order', url: 'https://www.marley.co.uk/conditions-of-order' },
  { text: 'Environmental Policy', url: 'https://www.marley.co.uk/environmental-policy' },
  { text: 'Quality Policy', url: 'https://www.marley.co.uk/quality-policy' },
  { text: 'Responsible Sourcing', url: 'https://www.marley.co.uk/responsible-sourcing' },
  { text: 'Gender Pay Gap Report', url: 'https://www.marley.co.uk/gender-pay-gap-report' },
  { text: 'Health and Safety', url: 'https://www.marley.co.uk/health-and-safety' },
  { text: 'Modern Slavery Act', url: 'https://www.marley.co.uk/modern-slavery-act' },
]);

writeLinkList(IDS.dsLinkListUseful, 'Footer Useful Links', 'Useful Links', [
  { text: 'WPA', url: 'https://www.wood-protection.org/' },
  { text: 'TD UK', url: 'https://www.td.uk.com/' },
  { text: 'NFRC', url: 'https://www.nfrc.co.uk/' },
]);

writeLinkList(IDS.dsLinkListCategories, 'Blog Categories', 'Categories', [
  { text: 'Solar PV', url: '/blog' },
  { text: 'Solar Roof Tiles', url: '/solar-roof-tiles/solartile' },
  { text: 'Standards', url: '/blog' },
]);

// --- Headless variants (Marley) ---
write(
  'Presentation/Headless Variants/NavigationIcons.yml',
  item({
    id: VARIANT.navIconsFolder,
    parent: HEADLESS_VARIANTS,
    template: T_VARIANT_FOLDER,
    path: '/sitecore/content/marley/marley/Presentation/Headless Variants/NavigationIcons',
    languages: meta(),
  }),
);

write(
  'Presentation/Headless Variants/NavigationIcons/Marley.yml',
  item({
    id: VARIANT.navIconsMarley,
    parent: VARIANT.navIconsFolder,
    template: T_VARIANT,
    path: '/sitecore/content/marley/marley/Presentation/Headless Variants/NavigationIcons/Marley',
    languages: meta(),
  }),
);

write(
  'Presentation/Headless Variants/Footer.yml',
  item({
    id: VARIANT.footerFolder,
    parent: HEADLESS_VARIANTS,
    template: T_VARIANT_FOLDER,
    path: '/sitecore/content/marley/marley/Presentation/Headless Variants/Footer',
    languages: meta(),
  }),
);

write(
  'Presentation/Headless Variants/Footer/Marley.yml',
  item({
    id: VARIANT.footerMarley,
    parent: VARIANT.footerFolder,
    template: T_VARIANT,
    path: '/sitecore/content/marley/marley/Presentation/Headless Variants/Footer/Marley',
    languages: meta(),
  }),
);

// --- Partial designs ---
const headerRenderings = rendering([
  { uid: randomUUID(), rid: R.Header, ph: 'headless-header', dpid: 1 },
  {
    uid: randomUUID(),
    rid: R.Image,
    ph: '/headless-header/header-left-1',
    ds: IDS.dsLogoImage,
    dpid: 3,
  },
  {
    uid: randomUUID(),
    rid: R.Navigation,
    ph: '/headless-header/header-nav-1',
    par: `${GRID}&amp;DynamicPlaceholderId=1&amp;Logo=${LOGO_PARAM}`,
  },
  {
    uid: randomUUID(),
    rid: R.NavigationIcons,
    ph: '/headless-header/header-right-1',
    par: `${fieldNames(VARIANT.navIconsMarley, 2)}&amp;HideWishlistIcon=1&amp;HideCartIcon=1`,
  },
]);

write(
  'Presentation/Partial Designs/Header.yml',
  item({
    id: IDS.partialHeader,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: '/sitecore/content/marley/marley/Presentation/Partial Designs/Header',
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
    uid: randomUUID(),
    rid: R.Footer,
    ph: 'headless-footer',
    ds: IDS.dsFooter,
    par: fieldNames(VARIANT.footerMarley, 1),
  },
  { uid: randomUUID(), rid: R.LinkList, ph: '/headless-footer/footer-list-first-1', ds: IDS.dsLinkListResources },
  { uid: randomUUID(), rid: R.LinkList, ph: '/headless-footer/footer-list-second-1', ds: IDS.dsLinkListPolicies },
  { uid: randomUUID(), rid: R.LinkList, ph: '/headless-footer/footer-list-third-1', ds: IDS.dsLinkListUseful },
]);

write(
  'Presentation/Partial Designs/Footer.yml',
  item({
    id: IDS.partialFooter,
    parent: PARTIAL_DESIGNS,
    template: T_PARTIAL,
    path: '/sitecore/content/marley/marley/Presentation/Partial Designs/Footer',
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

write(
  'Presentation/Page Designs/Default.yml',
  item({
    id: IDS.pageDesignDefault,
    parent: PAGE_DESIGNS,
    template: T_PAGE_DESIGN,
    path: '/sitecore/content/marley/marley/Presentation/Page Designs/Default',
    shared: `SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${IDS.partialHeader}|${IDS.partialFooter}"
`,
    languages: meta([`- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: Default`]),
  }),
);

// --- Home page ---
const homeRenderings = rendering([
  { uid: randomUUID(), rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHero },
  { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoRoofTiles },
  { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoAccessories },
  { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoSolar },
  { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoEdgemere },
  { uid: randomUUID(), rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesHome },
  { uid: randomUUID(), rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesPeace },
]);

write(
  'Home.yml',
  item({
    id: HOME,
    parent: '0e77b766-8d2e-475e-8601-e46ae7953126',
    template: T_PAGE,
    path: '/sitecore/content/marley/marley/Home',
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
      `- ID: "d87b59c1-a9c7-4f3f-90b0-57b594c8a239"\n      Hint: Title\n      Value: Marley — It's more than a roof`,
      `- ID: "32c603c2-c858-4138-8fcb-8e18a5ad8240"\n      Hint: metadataTitle\n      Value: Marley | Roofing Products & Systems`,
    ]),
  }),
);

const page = (cfg) => {
  write(
    `Home/${cfg.file}.yml`,
    item({
      id: cfg.id,
      parent: cfg.parent || HOME,
      template: cfg.template || T_PAGE,
      path: `/sitecore/content/marley/marley/Home/${cfg.file}`,
      shared: cfg.renderings
        ? `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${IDS.pageDesignDefault.toUpperCase()}}"
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
    ${cfg.renderings}
`
        : `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${IDS.pageDesignDefault.toUpperCase()}}"
`,
      languages: meta([
        `- ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"\n      Hint: NavigationTitle\n      Value: ${cfg.nav}`,
        `- ID: "4ff91248-33ab-4254-b6f7-2618fd0aebae"\n      Hint: Title\n      Value: ${cfg.title}`,
        ...(cfg.extraFields || []),
      ]),
    }),
  );
};

page({
  id: IDS.pageProducts,
  file: 'Products',
  nav: 'Products',
  title: 'Roofing Products from Marley',
  renderings: rendering([
    { uid: randomUUID(), rid: R.PageHeader, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.ProductListing, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextProducts },
  ]),
});

page({
  id: IDS.pageRoofTiles,
  file: 'Roof-Tiles',
  nav: 'Roof tiles',
  title: 'Roof tiles',
  renderings: rendering([
    { uid: randomUUID(), rid: R.PageHeader, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.ProductListing, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextRoofTiles },
  ]),
});

page({
  id: IDS.pageClayFolder,
  file: 'Roof-Tiles/Clay-Roof-Tiles',
  parent: IDS.pageRoofTiles,
  nav: 'Clay roof tiles',
  title: 'Clay roof tiles',
});

page({
  id: IDS.pageAcmeTile,
  parent: IDS.pageClayFolder,
  file: 'Roof-Tiles/Clay-Roof-Tiles/Acme-Single-Camber-Plain-Tile',
  nav: 'Acme Single Camber Plain Tile',
  title: 'Acme Single Camber Clay Plain Tiles',
  template: T_PRODUCT,
  renderings: rendering([
    { uid: randomUUID(), rid: R.ProductDetails, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesPeace },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoRoofTiles },
  ]),
  extraFields: [
    `- ID: "58d111ab-b286-42ab-bb35-8daadd6ab480"\n      Hint: SKU\n      Value: ACME-SCP`,
    `- ID: "6b43d550-6d5f-46ce-ac84-3d9493c45bc6"\n      Hint: metadataDescription\n      Value: Acme Single Camber clay plain tiles from Marley — traditional cambered profile for heritage and new-build projects.`,
  ],
});

page({
  id: IDS.pageBlog,
  file: 'Blog',
  nav: 'Blog',
  title: 'The Marley Blog',
  renderings: rendering([
    { uid: randomUUID(), rid: R.PageHeader, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.ArticleListing, ph: 'headless-main' },
  ]),
});

page({
  id: IDS.pageBlogArticle,
  parent: IDS.pageBlog,
  file: 'Blog/Warm-Homes-Plan-Government-Funding-For-Social-Housing',
  nav: 'Warm Homes Plan',
  title: 'What the Warm Homes Plan means for social housing providers',
  template: T_ARTICLE,
  renderings: rendering([
    { uid: randomUUID(), rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHeroArticle },
    { uid: randomUUID(), rid: R.PageContent, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.LinkList, ph: 'headless-main', ds: IDS.dsLinkListCategories },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoSolar },
  ]),
  extraFields: [
    `- ID: "6b43d550-6d5f-46ce-ac84-3d9493c45bc6"\n      Hint: metadataDescription\n      Value: The UK Warm Homes Plan provides funding for solar PV, batteries and heat pumps for social housing — learn how Marley SolarTile® fits your project.`,
  ],
});

page({
  id: IDS.pageAccessoriesFolder,
  file: 'Accessories',
  nav: 'Accessories',
  title: 'Accessories',
});

page({
  id: IDS.pageEavesVent,
  parent: IDS.pageAccessoriesFolder,
  file: 'Accessories/10mm-Eaves-Vent-System',
  nav: '10mm Eaves Vent System',
  title: '10mm Roof Eaves Vent System',
  template: T_PRODUCT,
  renderings: rendering([
    { uid: randomUUID(), rid: R.ProductDetails, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextEavesVent },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoAccessories },
  ]),
  extraFields: [
    `- ID: "58d111ab-b286-42ab-bb35-8daadd6ab480"\n      Hint: SKU\n      Value: EAVES-10MM`,
  ],
});

page({
  id: IDS.pageRoofingBattenFolder,
  file: 'Roofing-Batten',
  nav: 'Roofing Batten',
  title: 'Roofing Batten',
});

page({
  id: IDS.pageJbRedBatten,
  parent: IDS.pageRoofingBattenFolder,
  file: 'Roofing-Batten/JB-Red-Batten',
  nav: 'JB Red Batten',
  title: 'JB Red Batten',
  template: T_PRODUCT,
  renderings: rendering([
    { uid: randomUUID(), rid: R.ProductDetails, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextJbRed },
    { uid: randomUUID(), rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesPeace },
  ]),
  extraFields: [
    `- ID: "58d111ab-b286-42ab-bb35-8daadd6ab480"\n      Hint: SKU\n      Value: JB-RED-BATTEN`,
  ],
});

page({
  id: IDS.pageSamples,
  file: 'Samples',
  nav: 'Samples',
  title: 'Samples',
  renderings: rendering([
    { uid: randomUUID(), rid: R.PageHeader, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.ProductListing, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextSamples },
  ]),
});

page({
  id: IDS.pageSolarFolder,
  file: 'Solar-Roof-Tiles',
  nav: 'Solar Roof Tiles',
  title: 'Solar Roof Tiles',
});

page({
  id: IDS.pageSolarTile,
  parent: IDS.pageSolarFolder,
  file: 'Solar-Roof-Tiles/SolarTile',
  nav: 'Marley SolarTile',
  title: 'Marley SolarTile: roof-integrated solar panel roof tiles',
  template: T_PRODUCT,
  renderings: rendering([
    { uid: randomUUID(), rid: R.ProductDetails, ph: 'headless-main' },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoSolar },
    { uid: randomUUID(), rid: R.Features, ph: 'headless-main', ds: IDS.dsFeaturesHome },
  ]),
  extraFields: [
    `- ID: "58d111ab-b286-42ab-bb35-8daadd6ab480"\n      Hint: SKU\n      Value: SOLARTILE`,
  ],
});

page({
  id: IDS.pageMtar,
  file: 'Mtar',
  nav: "It's more than a roof",
  title: "It's more than a roof",
  renderings: rendering([
    { uid: randomUUID(), rid: R.HeroBanner, ph: 'headless-main', ds: IDS.dsHero },
    { uid: randomUUID(), rid: R.RichText, ph: 'headless-main', ds: IDS.dsTextMtar },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoSolar },
    { uid: randomUUID(), rid: R.Promo, ph: 'headless-main', ds: IDS.dsPromoRoofTiles },
  ]),
});

console.log('Marley site content generated under', ROOT);
