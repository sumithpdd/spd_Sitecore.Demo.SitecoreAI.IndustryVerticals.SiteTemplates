import { randomUUID, createHash } from 'crypto';
import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '../../../..');
const SITE = join(REPO, 'authoring/items/automobile/serialized-content/astonmartin/astonmartin');
const DATA = join(SITE, 'Data');
const TEMPLATES = join(REPO, 'authoring/items/automobile/serialized-content/templates/automobile');
const PUBLIC = join(REPO, 'industry-verticals/astonmartin/public/images');

const SITE_ID = '4a57bd3f-4878-40c5-827a-5e865b2a8303';
const HOME_ID = '398f342a-e149-4fa5-9385-017e21466c12';
const DATA_ROOT = '896775b6-ee1c-468a-87ae-8277b8db9a9a';
const PAGE_TEMPLATE = '6380b90f-0df8-4b1a-b58b-58cd12e08f35';
const FOLDER_TEMPLATE = '8fe7f8dc-cb5d-42c2-99f8-76608c243f10';
const DEVICE_ID = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';

const R = {
  Header: '19d38f40-87d8-469a-a719-4960a9cd250b',
  Footer: 'c466edb2-86c2-421f-a18a-7d68b20d5b87',
  HeroBanner: '9e5da087-f1c1-4df8-9caf-a49e7bec3982',
  Promo: 'f8359455-08b3-4b80-84a0-2fc1f4c55044',
  StoriesGrid: '686841fa-3c1d-4a66-b632-288f1abd2413',
  NewsStrip: '93f4a146-c504-4ad0-896a-fc85bb7eb128',
  ModelJumpNav: '03bb199e-e4f7-4eb2-b1e5-d59dc680ffd7',
  ModelFamilySection: '1a05be1d-4698-4d79-ae9d-b97d14b55266',
  ModelIntroSpecs: '2a9b9011-caca-469e-8e6b-57eb07ccfca1',
  FeatureCarousel: '3ecaad47-4c28-4be3-b597-6b9db5f8a312',
  QuoteBlock: '121e58df-0f60-49ba-b7f0-7f846cb692c6',
  ExploreCtaStrip: 'ad38edfd-ede7-4a9f-b34b-12b16119c883',
};

const V = {
  HeroDefault: '98223182-abc5-40a0-b1e8-5970470e6a29',
  HeroModelFeature: '39639330-7cf1-4cdd-9e0f-46c7a2a9b085',
  HeroModelsLanding: '35da7d27-a70f-48e6-83db-cc768c87586a',
  HeroModelDetail: '50ef8f54-f832-429e-8fd1-bf1a5621ae57',
  PromoDefault: 'f80d4021-4d85-47d6-b733-93ee3286294d',
  PromoDualTile: 'a350a40c-b4bc-4043-8b63-eb2b87f611bc',
};

const T = {
  Header: '897de819-182d-4d42-aa1e-a83b6ef233d1',
  Footer: 'ca57ba97-2a7b-4e69-b611-41adf985e43a',
  HeroBanner: '12ed2909-89d0-4800-8338-be1a3c8897ef',
  Promo: '0f3cb57c-c9ab-4234-8262-13d7e0a306d6',
  StoriesGrid: '4810992a-cc38-4afb-aa14-9736fec5b3fd',
  NewsStrip: 'a42056cf-4e5b-4799-ba36-212f38754a1b',
  ModelJumpNav: '49fadf81-eecb-4414-b00c-f5f83b38839f',
  ModelFamilySection: '9846eb5e-4352-4846-be10-6440a5551d83',
  ModelIntroSpecs: 'e4989123-0678-4b41-9c06-76c02e6c5307',
  FeatureCarousel: 'c66e2278-a359-4fce-885c-8843930eece3',
  QuoteBlock: 'c7933ed3-6695-4e09-b7d8-35da5b18d2d9',
  ExploreCtaStrip: 'ee78a9a8-b6f4-4ea4-87d7-e616c5789a9c',
};

function stableId(seed) {
  const h = createHash('sha1').update(`automobile-astonmartin:${seed}`).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name.endsWith('.yml')) acc.push(p);
  }
  return acc;
}

function loadFieldIds() {
  const map = {};
  for (const f of walk(TEMPLATES)) {
    const t = readFileSync(f, 'utf8');
    const id = (t.match(/^ID: "([^"]+)"/m) || [])[1];
    const p = (t.match(/^Path: "([^"]+)"/m) || [])[1];
    if (!id || !p || !p.includes('/Data/')) continue;
    const parts = p.split('/');
    const field = parts[parts.length - 1];
    const compIdx = parts.findIndex((x) => x.endsWith(' Templates'));
    if (compIdx < 0) continue;
    const comp = parts[compIdx].replace(/ Templates$/, '');
    map[`${comp}/${field}`] = id;
  }
  return map;
}

const FIELDS = loadFieldIds();

function field(comp, name, value) {
  const id = FIELDS[`${comp}/${name}`];
  if (!id) {
    console.warn(`Skipping missing field ${comp}/${name}`);
    return null;
  }
  const indented = String(value).includes('\n')
    ? `|\n${String(value)
        .split('\n')
        .map((l) => `        ${l}`)
        .join('\n')}`
    : `"${String(value).replace(/"/g, '\\"')}"`;
  return `    - ID: "${id}"
      Hint: ${name}
      Value: ${indented}`;
}

function fields(...items) {
  return items.filter(Boolean);
}

function extLink(text, url) {
  return `<link text="${text}" linktype="external" url="${url}" anchor="" target="" />`;
}

function intLink(text, url, id) {
  return `<link class="" querystring="" id="${id}" anchor="" target="" title="" linktype="internal" text="${text}" url="${url}" />`;
}

function folderYaml(id, name, parent) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${FOLDER_TEMPLATE}"
Path: "/sitecore/content/automobile/astonmartin/Data/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260731T140000Z
`;
}

function dsYaml({ id, name, folder, folderId, template, fields: fieldList }) {
  return `---
ID: "${id}"
Parent: "${folderId}"
Template: "${template}"
Path: "/sitecore/content/automobile/astonmartin/Data/${folder}/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260731T140000Z
${fieldList.filter(Boolean).join('\n')}
`;
}

function pageYaml({ id, name, parent, pathSeg, title, renderingsXml }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${PAGE_TEMPLATE}"
Path: "/sitecore/content/automobile/astonmartin/${pathSeg}"
SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${renderingsXml}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260731T140000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "e5eb0bd5-3bd6-49d2-8edb-0dec926ed7f0"
      Hint: Title
      Value: "${title}"
`;
}

function escapePar(par) {
  return par.replace(/&/g, '&amp;');
}

function encGuid(g) {
  return `%7B${g.toUpperCase()}%7D`;
}

function rEntry({ uid, renderingId, dsId, ph, variantId, after, before, dyn = 1 }) {
  const pos = before
    ? `p:before="${before}"`
    : after
      ? `p:after="r[@uid='{${after.toUpperCase()}}']"`
      : `p:after="*[1=2]"`;
  const par = escapePar(
    `GridParameters=${encGuid(GRID)}&Styles&RenderingIdentifier&CSSStyles&FieldNames=${encGuid(variantId)}&DynamicPlaceholderId=${dyn}`
  );
  return `        <r
          uid="{${uid.toUpperCase()}}"
          ${pos}
          s:ds="${dsId}"
          s:id="{${renderingId.toUpperCase()}}"
          s:par="${par}"
          s:ph="${ph}" />`;
}

function layout(entries) {
  return `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{${DEVICE_ID}}">
${entries.join('\n')}
      </d>
    </r>`;
}

mkdirSync(PUBLIC, { recursive: true });
const shots = join(REPO, 'design-screenshots/astonmartin-com');
const copies = [
  ['astonmartin-com--en-gb/desktop-clean.png', 'home-hero.png'],
  ['astonmartin-com--en-gb-models/desktop-clean.png', 'models-hero.png'],
  ['astonmartin-com--en-gb-models-db12/desktop-clean.png', 'db12-hero.png'],
];
for (const [src, dest] of copies) {
  const from = join(shots, src);
  if (existsSync(from)) copyFileSync(from, join(PUBLIC, dest));
}

const MODELS_ID = stableId('page-models');
const DB12_ID = stableId('page-db12');
const CONFIG_ID = stableId('page-configurator');

const folders = {
  Headers: stableId('folder-headers'),
  Footers: stableId('folder-footers'),
  'Hero Banners': stableId('folder-heroes'),
  'AM Promos': stableId('folder-am-promos'),
  Stories: stableId('folder-stories'),
  News: stableId('folder-news'),
  Models: stableId('folder-models'),
};

for (const [name, id] of Object.entries(folders)) {
  mkdirSync(join(DATA, name), { recursive: true });
  writeFileSync(join(DATA, `${name}.yml`), folderYaml(id, name, DATA_ROOT));
}

const ids = {
  header: stableId('ds-header'),
  footer: stableId('ds-footer'),
  homeHero: stableId('ds-home-hero'),
  modelFeature: stableId('ds-model-feature'),
  dualPromo: stableId('ds-dual-promo'),
  stories: stableId('ds-stories'),
  news: stableId('ds-news'),
  modelsHero: stableId('ds-models-hero'),
  jumpNav: stableId('ds-jump-nav'),
  familyDb12: stableId('ds-family-db12'),
  familyVantage: stableId('ds-family-vantage'),
  db12Hero: stableId('ds-db12-hero'),
  db12Intro: stableId('ds-db12-intro'),
  db12Feature: stableId('ds-db12-feature'),
  db12Quote: stableId('ds-db12-quote'),
  db12Explore: stableId('ds-db12-explore'),
};

writeFileSync(
  join(DATA, 'Headers/Site Header.yml'),
  dsYaml({
    id: ids.header,
    name: 'Site Header',
    folder: 'Headers',
    folderId: folders.Headers,
    template: T.Header,
    fields: [
      field('Header', 'BrandName', 'Aston Martin'),
      field('Header', 'ModelsLink', intLink('Models', '/models', MODELS_ID)),
      field('Header', 'OurWorldLink', extLink('Our World', 'https://www.astonmartin.com/en-gb/our-world')),
      field('Header', 'OwnersLink', extLink('Owners', 'https://www.astonmartin.com/en-gb/owners')),
      field('Header', 'ExperiencesLink', extLink('Experiences', 'https://www.astonmartin.com/en-gb/experiences')),
      field('Header', 'ConfigureLink', intLink('Configure', '/configurator', CONFIG_ID)),
      field('Header', 'EnquireLink', extLink('Enquire', 'https://www.astonmartin.com/en-gb')),
    ],
  })
);

writeFileSync(
  join(DATA, 'Footers/Site Footer.yml'),
  dsYaml({
    id: ids.footer,
    name: 'Site Footer',
    folder: 'Footers',
    folderId: folders.Footers,
    template: T.Footer,
    fields: [
      field('Footer', 'BrandName', 'Aston Martin'),
      field('Footer', 'ModelsLink', intLink('Models', '/models', MODELS_ID)),
      field('Footer', 'OurWorldLink', extLink('Our World', 'https://www.astonmartin.com/en-gb/our-world')),
      field('Footer', 'OwnersLink', extLink('Owners', 'https://www.astonmartin.com/en-gb/owners')),
      field('Footer', 'DealersLink', extLink('Find a dealer', 'https://www.astonmartin.com/en-gb/dealers')),
      field('Footer', 'ContactLink', extLink('Contact us', 'https://www.astonmartin.com/en-gb/contact-us')),
      field('Footer', 'CorporateLink', extLink('Corporate', 'https://www.astonmartin.com/en-gb/corporate')),
      field('Footer', 'Disclaimer', '<p>Demo content inspired by public Aston Martin marketing pages for SitecoreAI industry verticals.</p>'),
      field('Footer', 'Copyright', '© Aston Martin Lagonda demo'),
      field('Footer', 'TermsLink', extLink('Terms & Conditions', 'https://www.astonmartin.com/en-gb/legal/terms')),
      field('Footer', 'PrivacyLink', extLink('Privacy', 'https://www.astonmartin.com/en-gb/legal/privacy')),
      field('Footer', 'CookiesLink', extLink('Cookies', 'https://www.astonmartin.com/en-gb/legal/cookies')),
    ],
  })
);

writeFileSync(
  join(DATA, 'Hero Banners/Home Hero.yml'),
  dsYaml({
    id: ids.homeHero,
    name: 'Home Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: [
      field('HeroBanner', 'Title', 'Vanquish 25th Anniversary Edition'),
      field('HeroBanner', 'Description', '<p>Celebrate 25 years of an automotive flagship.</p>'),
      field('HeroBanner', 'CtaLink', intLink('Explore', '/models/db12', DB12_ID)),
    ],
  })
);

writeFileSync(
  join(DATA, 'Hero Banners/Home Model Feature.yml'),
  dsYaml({
    id: ids.modelFeature,
    name: 'Home Model Feature',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: [
      field('HeroBanner', 'Eyebrow', 'THRILL. DRIVEN.'),
      field('HeroBanner', 'Title', 'Vantage'),
      field('HeroBanner', 'CtaLink', intLink('Explore', '/models', MODELS_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Build', '/configurator', CONFIG_ID)),
    ],
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Home Dual Promo.yml'),
  dsYaml({
    id: ids.dualPromo,
    name: 'Home Dual Promo',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: [
      field('Promo', 'PromoSubTitle', 'TIMELESS'),
      field('Promo', 'PromoTitle', 'Certified Pre-Owned'),
      field('Promo', 'PromoMoreInfo', extLink('Explore', 'https://www.astonmartin.com/en-gb/models/pre-owned')),
      field('Promo', 'SecondarySubTitle', 'ASTON MARTIN'),
      field('Promo', 'SecondaryTitle', 'Magazine'),
      field('Promo', 'SecondaryLink', extLink('Explore', 'https://www.astonmartin.com/en-gb/magazine')),
    ],
  })
);

writeFileSync(
  join(DATA, 'Stories/Home Stories.yml'),
  dsYaml({
    id: ids.stories,
    name: 'Home Stories',
    folder: 'Stories',
    folderId: folders.Stories,
    template: T.StoriesGrid,
    fields: [
      field('StoriesGrid', 'Title', 'Stories'),
      field('StoriesGrid', 'AllStoriesLink', extLink('Read all stories', 'https://www.astonmartin.com/en-gb/our-world')),
      field('StoriesGrid', 'StoryOneCategory', 'HERITAGE'),
      field('StoriesGrid', 'StoryOneTitle', 'Aston Martin Vanquish History - 25 Years of Conquering'),
      field('StoriesGrid', 'StoryOneDate', '25 March 2026'),
      field('StoriesGrid', 'StoryOneLink', extLink('Read', 'https://www.astonmartin.com/en-gb')),
      field('StoriesGrid', 'StoryTwoCategory', 'HERITAGE'),
      field('StoriesGrid', 'StoryTwoTitle', "Fernando Alonso's Mastery, At Your Fingertips"),
      field('StoriesGrid', 'StoryTwoDate', '24 March 2026'),
      field('StoriesGrid', 'StoryTwoLink', extLink('Read', 'https://www.astonmartin.com/en-gb')),
      field('StoriesGrid', 'StoryThreeCategory', 'BUSINESS'),
      field('StoriesGrid', 'StoryThreeTitle', 'Aston Martin x BERO'),
      field('StoriesGrid', 'StoryThreeDate', '12 November 2025'),
      field('StoriesGrid', 'StoryThreeLink', extLink('Read', 'https://www.astonmartin.com/en-gb')),
    ],
  })
);

writeFileSync(
  join(DATA, 'News/Home News.yml'),
  dsYaml({
    id: ids.news,
    name: 'Home News',
    folder: 'News',
    folderId: folders.News,
    template: T.NewsStrip,
    fields: [
      field('NewsStrip', 'Title', 'News'),
      field('NewsStrip', 'AllNewsLink', extLink('See all news', 'https://www.astonmartin.com/en-gb/our-world/news')),
      field('NewsStrip', 'ItemOneDate', '22 Jul 2026'),
      field('NewsStrip', 'ItemOneTitle', 'Vanquish 25: a celebration of an automotive flagship'),
      field('NewsStrip', 'ItemOneLink', extLink('Explore', 'https://www.astonmartin.com/en-gb')),
      field('NewsStrip', 'ItemTwoDate', '20 Jul 2026'),
      field('NewsStrip', 'ItemTwoTitle', 'Time and Speed, Reunited: Breitling and Aston Martin'),
      field('NewsStrip', 'ItemTwoLink', extLink('Explore', 'https://www.astonmartin.com/en-gb')),
      field('NewsStrip', 'ItemThreeDate', '16 Jul 2026'),
      field('NewsStrip', 'ItemThreeTitle', 'Aston Martin Dreadnought: Built to deliver digital domination'),
      field('NewsStrip', 'ItemThreeLink', extLink('Explore', 'https://www.astonmartin.com/en-gb')),
    ],
  })
);

writeFileSync(
  join(DATA, 'Hero Banners/Models Hero.yml'),
  dsYaml({
    id: ids.modelsHero,
    name: 'Models Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: [
      field('HeroBanner', 'Title', 'All models'),
      field(
        'HeroBanner',
        'Description',
        '<p>Eleven decades of cutting-edge innovation and exemplary engineering. Unrivalled performance. The pinnacle of luxury sports cars.</p>'
      ),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/Jump Nav.yml'),
  dsYaml({
    id: ids.jumpNav,
    name: 'Jump Nav',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ModelJumpNav,
    fields: [field('ModelJumpNav', 'Items', 'DB12|#db12|Vantage|#vantage|Vanquish|#vanquish|DBX|#dbx|Valhalla|#valhalla')],
  })
);

writeFileSync(
  join(DATA, 'Models/DB12 Family.yml'),
  dsYaml({
    id: ids.familyDb12,
    name: 'DB12 Family',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ModelFamilySection,
    fields: [
      field('ModelFamilySection', 'AnchorId', 'db12'),
      field('ModelFamilySection', 'Eyebrow', 'ICON. DRIVEN.'),
      field('ModelFamilySection', 'Title', 'DB12'),
      field('ModelFamilySection', 'Description', '<p>Bolder. Purer. Sharper. The world’s first Super Tourer.</p>'),
      field('ModelFamilySection', 'ExploreLink', intLink('Explore DB12', '/models/db12', DB12_ID)),
      field('ModelFamilySection', 'SpecPower', '680 PS'),
      field('ModelFamilySection', 'SpecAccel', '3.6 s'),
      field('ModelFamilySection', 'SpecTopSpeed', '202 mph'),
      field('ModelFamilySection', 'VariantOneTitle', 'DB12 S'),
      field('ModelFamilySection', 'VariantOneDescription', '<p>A Super Tourer for those who make all roads their own.</p>'),
      field('ModelFamilySection', 'VariantOneExplore', intLink('Explore', '/models/db12', DB12_ID)),
      field('ModelFamilySection', 'VariantOneConfigure', intLink('Configure', '/configurator', CONFIG_ID)),
      field('ModelFamilySection', 'VariantTwoTitle', 'DB12'),
      field('ModelFamilySection', 'VariantTwoDescription', '<p>Part grand tourer. Part supercar.</p>'),
      field('ModelFamilySection', 'VariantTwoExplore', intLink('Explore', '/models/db12', DB12_ID)),
      field('ModelFamilySection', 'VariantTwoConfigure', intLink('Configure', '/configurator', CONFIG_ID)),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/Vantage Family.yml'),
  dsYaml({
    id: ids.familyVantage,
    name: 'Vantage Family',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ModelFamilySection,
    fields: [
      field('ModelFamilySection', 'AnchorId', 'vantage'),
      field('ModelFamilySection', 'Eyebrow', 'THRILL. DRIVEN.'),
      field('ModelFamilySection', 'Title', 'Vantage'),
      field('ModelFamilySection', 'Description', '<p>Forged in the fires of the limit. A real sports car.</p>'),
      field('ModelFamilySection', 'ExploreLink', extLink('Explore Vantage', 'https://www.astonmartin.com/en-gb/models/vantage-coupe')),
      field('ModelFamilySection', 'SpecPower', '680 PS'),
      field('ModelFamilySection', 'SpecAccel', '3.3 s'),
      field('ModelFamilySection', 'SpecTopSpeed', '202 mph'),
      field('ModelFamilySection', 'VariantOneTitle', 'Vantage S'),
      field('ModelFamilySection', 'VariantOneDescription', '<p>Subvert. Surpass.</p>'),
      field('ModelFamilySection', 'VariantOneExplore', extLink('Explore', 'https://www.astonmartin.com/en-gb/models/vantage-s')),
      field('ModelFamilySection', 'VariantOneConfigure', intLink('Configure', '/configurator', CONFIG_ID)),
    ],
  })
);

writeFileSync(
  join(DATA, 'Hero Banners/DB12 Hero.yml'),
  dsYaml({
    id: ids.db12Hero,
    name: 'DB12 Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: [
      field('HeroBanner', 'Title', 'DB12'),
      field('HeroBanner', 'CtaLink', extLink('Discover', 'https://www.astonmartin.com/en-gb/models/db12')),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Configurator', '/configurator', CONFIG_ID)),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/DB12 Intro.yml'),
  dsYaml({
    id: ids.db12Intro,
    name: 'DB12 Intro',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ModelIntroSpecs,
    fields: [
      field('ModelIntroSpecs', 'Title', "The world's first Super Tourer"),
      field('ModelIntroSpecs', 'Description', '<p>Redefining and reinventing what it means to be a tourer.</p>'),
      field('ModelIntroSpecs', 'TabOneLabel', 'ENGINE'),
      field('ModelIntroSpecs', 'TabTwoLabel', 'TRANSMISSION'),
      field('ModelIntroSpecs', 'TabThreeLabel', 'CHASSIS'),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/DB12 Feature.yml'),
  dsYaml({
    id: ids.db12Feature,
    name: 'DB12 Feature',
    folder: 'Models',
    folderId: folders.Models,
    template: T.FeatureCarousel,
    fields: [
      field('FeatureCarousel', 'TileOneTitle', 'Engine'),
      field('FeatureCarousel', 'TileOneLink', extLink('Explore', 'https://www.astonmartin.com/en-gb/models/db12')),
      field('FeatureCarousel', 'TileTwoTitle', 'Transmission'),
      field('FeatureCarousel', 'TileTwoLink', extLink('Explore', 'https://www.astonmartin.com/en-gb/models/db12')),
      field('FeatureCarousel', 'TileThreeTitle', 'Handling'),
      field('FeatureCarousel', 'TileThreeLink', extLink('Explore', 'https://www.astonmartin.com/en-gb/models/db12')),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/DB12 Quote.yml'),
  dsYaml({
    id: ids.db12Quote,
    name: 'DB12 Quote',
    folder: 'Models',
    folderId: folders.Models,
    template: T.QuoteBlock,
    fields: [
      field(
        'QuoteBlock',
        'Quote',
        'Delivering a shift in sporting character and dynamic capability, this new generation of the legendary DB bloodline defines its own new category.'
      ),
      field('QuoteBlock', 'Attribution', 'SIMON NEWTON / DIRECTOR OF VEHICLE PERFORMANCE'),
    ],
  })
);

writeFileSync(
  join(DATA, 'Models/DB12 Explore.yml'),
  dsYaml({
    id: ids.db12Explore,
    name: 'DB12 Explore',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ExploreCtaStrip,
    fields: [
      field('ExploreCtaStrip', 'Title', 'Explore Aston Martin'),
      field('ExploreCtaStrip', 'CardOneTitle', 'Configurator'),
      field('ExploreCtaStrip', 'CardOneLink', intLink('Your unique DB12', '/configurator', CONFIG_ID)),
      field('ExploreCtaStrip', 'CardTwoTitle', 'Enquire'),
      field('ExploreCtaStrip', 'CardTwoLink', extLink('Contact us', 'https://www.astonmartin.com/en-gb')),
      field('ExploreCtaStrip', 'CardThreeTitle', 'Why Aston Martin'),
      field('ExploreCtaStrip', 'CardThreeLink', extLink('Find out more', 'https://www.astonmartin.com/en-gb/our-world')),
    ],
  })
);

const u = (...seeds) => seeds.map((s) => stableId(`uid-${s}`));

const homeUids = u('h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9');
const homeLayout = layout([
  rEntry({ uid: homeUids[0], renderingId: R.Header, dsId: ids.header, ph: 'headless-header', variantId: V.PromoDefault, before: '*', dyn: 1 }),
  rEntry({ uid: homeUids[1], renderingId: R.HeroBanner, dsId: ids.homeHero, ph: 'headless-main', variantId: V.HeroDefault, after: homeUids[0], dyn: 2 }),
  rEntry({ uid: homeUids[2], renderingId: R.HeroBanner, dsId: ids.modelFeature, ph: 'headless-main', variantId: V.HeroModelFeature, after: homeUids[1], dyn: 3 }),
  rEntry({ uid: homeUids[3], renderingId: R.Promo, dsId: ids.dualPromo, ph: 'headless-main', variantId: V.PromoDualTile, after: homeUids[2], dyn: 4 }),
  rEntry({ uid: homeUids[4], renderingId: R.StoriesGrid, dsId: ids.stories, ph: 'headless-main', variantId: V.PromoDefault, after: homeUids[3], dyn: 5 }),
  rEntry({ uid: homeUids[5], renderingId: R.NewsStrip, dsId: ids.news, ph: 'headless-main', variantId: V.PromoDefault, after: homeUids[4], dyn: 6 }),
  rEntry({ uid: homeUids[6], renderingId: R.Footer, dsId: ids.footer, ph: 'headless-footer', variantId: V.PromoDefault, after: homeUids[5], dyn: 7 }),
]);

// Header uses Default variant - need a Default variant for components without named variants.
// For StoriesGrid etc FieldNames can be empty or use a dummy - Sitecore often uses empty FieldNames for Default.
// Using PromoDefault for non-variant components is WRONG. Better omit FieldNames or use empty.
function rEntryDefault(opts) {
  const pos = opts.before
    ? `p:before="${opts.before}"`
    : opts.after
      ? `p:after="r[@uid='{${opts.after.toUpperCase()}}']"`
      : `p:after="*[1=2]"`;
  const par = escapePar(
    `GridParameters=${encGuid(GRID)}&Styles&RenderingIdentifier&CSSStyles&DynamicPlaceholderId=${opts.dyn || 1}`
  );
  return `        <r
          uid="{${opts.uid.toUpperCase()}}"
          ${pos}
          s:ds="${opts.dsId}"
          s:id="{${opts.renderingId.toUpperCase()}}"
          s:par="${par}"
          s:ph="${opts.ph}" />`;
}

const homeLayout2 = layout([
  rEntryDefault({ uid: homeUids[0], renderingId: R.Header, dsId: ids.header, ph: 'headless-header', before: '*', dyn: 1 }),
  rEntry({ uid: homeUids[1], renderingId: R.HeroBanner, dsId: ids.homeHero, ph: 'headless-main', variantId: V.HeroDefault, after: homeUids[0], dyn: 2 }),
  rEntry({ uid: homeUids[2], renderingId: R.HeroBanner, dsId: ids.modelFeature, ph: 'headless-main', variantId: V.HeroModelFeature, after: homeUids[1], dyn: 3 }),
  rEntry({ uid: homeUids[3], renderingId: R.Promo, dsId: ids.dualPromo, ph: 'headless-main', variantId: V.PromoDualTile, after: homeUids[2], dyn: 4 }),
  rEntryDefault({ uid: homeUids[4], renderingId: R.StoriesGrid, dsId: ids.stories, ph: 'headless-main', after: homeUids[3], dyn: 5 }),
  rEntryDefault({ uid: homeUids[5], renderingId: R.NewsStrip, dsId: ids.news, ph: 'headless-main', after: homeUids[4], dyn: 6 }),
  rEntryDefault({ uid: homeUids[6], renderingId: R.Footer, dsId: ids.footer, ph: 'headless-footer', after: homeUids[5], dyn: 7 }),
]);

// Patch Home.yml — preserve ID/Parent, replace/add __Renderings
const homePath = join(SITE, 'Home.yml');
const homeExisting = readFileSync(homePath, 'utf8');
const homeShared = homeExisting.includes('Hint: __Renderings')
  ? homeExisting.replace(
      /- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"[\s\S]*?(?=\nLanguages:)/,
      `- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${homeLayout2}
`
    )
  : homeExisting.replace(
      'SharedFields:\n',
      `SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${homeLayout2}
`
    );
writeFileSync(homePath, homeShared);

mkdirSync(join(SITE, 'Home'), { recursive: true });

const modelsUids = u('m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7');
const modelsLayout = layout([
  rEntryDefault({ uid: modelsUids[0], renderingId: R.Header, dsId: ids.header, ph: 'headless-header', before: '*', dyn: 1 }),
  rEntry({ uid: modelsUids[1], renderingId: R.HeroBanner, dsId: ids.modelsHero, ph: 'headless-main', variantId: V.HeroModelsLanding, after: modelsUids[0], dyn: 2 }),
  rEntryDefault({ uid: modelsUids[2], renderingId: R.ModelJumpNav, dsId: ids.jumpNav, ph: 'headless-main', after: modelsUids[1], dyn: 3 }),
  rEntryDefault({ uid: modelsUids[3], renderingId: R.ModelFamilySection, dsId: ids.familyDb12, ph: 'headless-main', after: modelsUids[2], dyn: 4 }),
  rEntryDefault({ uid: modelsUids[4], renderingId: R.ModelFamilySection, dsId: ids.familyVantage, ph: 'headless-main', after: modelsUids[3], dyn: 5 }),
  rEntryDefault({ uid: modelsUids[5], renderingId: R.Footer, dsId: ids.footer, ph: 'headless-footer', after: modelsUids[4], dyn: 6 }),
]);

writeFileSync(
  join(SITE, 'Home/Models.yml'),
  pageYaml({ id: MODELS_ID, name: 'Models', parent: HOME_ID, pathSeg: 'Home/Models', title: 'Models', renderingsXml: modelsLayout })
);

mkdirSync(join(SITE, 'Home/Models'), { recursive: true });
const db12Uids = u('d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7');
const db12Layout = layout([
  rEntryDefault({ uid: db12Uids[0], renderingId: R.Header, dsId: ids.header, ph: 'headless-header', before: '*', dyn: 1 }),
  rEntry({ uid: db12Uids[1], renderingId: R.HeroBanner, dsId: ids.db12Hero, ph: 'headless-main', variantId: V.HeroModelDetail, after: db12Uids[0], dyn: 2 }),
  rEntryDefault({ uid: db12Uids[2], renderingId: R.ModelIntroSpecs, dsId: ids.db12Intro, ph: 'headless-main', after: db12Uids[1], dyn: 3 }),
  rEntryDefault({ uid: db12Uids[3], renderingId: R.FeatureCarousel, dsId: ids.db12Feature, ph: 'headless-main', after: db12Uids[2], dyn: 4 }),
  rEntryDefault({ uid: db12Uids[4], renderingId: R.QuoteBlock, dsId: ids.db12Quote, ph: 'headless-main', after: db12Uids[3], dyn: 5 }),
  rEntryDefault({ uid: db12Uids[5], renderingId: R.ExploreCtaStrip, dsId: ids.db12Explore, ph: 'headless-main', after: db12Uids[4], dyn: 6 }),
  rEntryDefault({ uid: db12Uids[6], renderingId: R.Footer, dsId: ids.footer, ph: 'headless-footer', after: db12Uids[5], dyn: 7 }),
]);

writeFileSync(
  join(SITE, 'Home/Models/DB12.yml'),
  pageYaml({ id: DB12_ID, name: 'DB12', parent: MODELS_ID, pathSeg: 'Home/Models/DB12', title: 'DB12', renderingsXml: db12Layout })
);

const configUids = u('c1', 'c2', 'c3');
const configLayout = layout([
  rEntryDefault({ uid: configUids[0], renderingId: R.Header, dsId: ids.header, ph: 'headless-header', before: '*', dyn: 1 }),
  rEntry({
    uid: configUids[1],
    renderingId: R.HeroBanner,
    dsId: ids.modelFeature,
    ph: 'headless-main',
    variantId: V.HeroModelFeature,
    after: configUids[0],
    dyn: 2,
  }),
  rEntryDefault({ uid: configUids[2], renderingId: R.Footer, dsId: ids.footer, ph: 'headless-footer', after: configUids[1], dyn: 3 }),
]);

writeFileSync(
  join(SITE, 'Home/Configurator.yml'),
  pageYaml({
    id: CONFIG_ID,
    name: 'Configurator',
    parent: HOME_ID,
    pathSeg: 'Home/Configurator',
    title: 'Configurator',
    renderingsXml: configLayout,
  })
);

// Update Available Renderings Page Content to include our components if possible — skip for now

console.log('Authoring complete');
console.log({ MODELS_ID, DB12_ID, CONFIG_ID, fieldCount: Object.keys(FIELDS).length });
