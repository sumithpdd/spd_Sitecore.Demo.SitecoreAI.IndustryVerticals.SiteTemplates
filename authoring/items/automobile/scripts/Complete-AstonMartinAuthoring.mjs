import { createHash } from 'crypto';
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  existsSync,
  copyFileSync,
  unlinkSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '../../../..');
const SITE = join(REPO, 'authoring/items/automobile/serialized-content/astonmartin/astonmartin');
const DATA = join(SITE, 'Data');
const TEMPLATES = join(REPO, 'authoring/items/automobile/serialized-content/templates/automobile');
const TEMPLATES_ROOT = join(REPO, 'authoring/items/automobile/serialized-content/templates');
const PUBLIC = join(REPO, 'industry-verticals/astonmartin/public/images');

const SITE_ID = '4a57bd3f-4878-40c5-827a-5e865b2a8303';
const HOME_ID = '398f342a-e149-4fa5-9385-017e21466c12';
const DATA_ROOT = '896775b6-ee1c-468a-87ae-8277b8db9a9a';
const PAGE_TEMPLATE = '6380b90f-0df8-4b1a-b58b-58cd12e08f35';
const FOLDER_TEMPLATE = '8fe7f8dc-cb5d-42c2-99f8-76608c243f10';
const DEVICE_ID = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';

/** SXA / headless design templates */
const T_PARTIAL_DESIGN = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_PLACEHOLDER_SETTING = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const TEMPLATES_PROJECT = 'ca690ee1-350d-4035-8f0a-93f86a849d5d';
const PARTIAL_DESIGNS_FOLDER = '377b974e-70e3-4b72-998c-7bf7d35d50ed';
const PAGE_DESIGNS_FOLDER = '28e4e3b1-021b-4f62-a092-240d86bde308';
const PH_PARTIAL_FOLDER = '42723545-77af-45bc-953b-43a01d7463d9';
const PRESENTATION_ROOT = join(SITE, 'Presentation');
const TEMPLATES_AUTO = join(REPO, 'authoring/items/automobile/serialized-content/templates/automobile');

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
  PromoImageLeft: 'a8c1e2f3-4b5d-4c6e-8f90-1a2b3c4d5e60',
  PromoImageRight: 'b9d2f3a4-5c6e-4d7f-9012-2b3c4d5e6f71',
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

/** @type {{ slug: string, title: string, family: string, blurb: string, power: string, accel: string, top: string }[]} */
const MODELS = [
  { slug: 'db12', title: 'DB12', family: 'db12', blurb: 'Bolder. Purer. Sharper. The world’s first Super Tourer.', power: '680 PS', accel: '3.6 s', top: '202 mph' },
  { slug: 'db12-s', title: 'DB12 S', family: 'db12', blurb: 'A Super Tourer for those who make all roads their own.', power: '700 PS', accel: '3.5 s', top: '202 mph' },
  { slug: 'db12-volante', title: 'DB12 Volante', family: 'db12', blurb: 'Open-air Super Touring with unmistakable presence.', power: '680 PS', accel: '3.7 s', top: '202 mph' },
  { slug: 'vantage-coupe', title: 'Vantage', family: 'vantage', blurb: 'Forged in the fires of the limit. A real sports car.', power: '680 PS', accel: '3.3 s', top: '202 mph' },
  { slug: 'vantage-s', title: 'Vantage S', family: 'vantage', blurb: 'Subvert. Surpass. Sharper Vantage dynamics.', power: '700 PS', accel: '3.2 s', top: '202 mph' },
  { slug: 'vantage-roadster', title: 'Vantage Roadster', family: 'vantage', blurb: 'Open-top thrills with pure sports-car intent.', power: '680 PS', accel: '3.5 s', top: '200 mph' },
  { slug: 'vanquish', title: 'Vanquish', family: 'vanquish', blurb: 'The ultimate grand tourer. Uncompromising and unmistakable.', power: '835 PS', accel: '3.2 s', top: '214 mph' },
  { slug: 'vanquish-volante', title: 'Vanquish Volante', family: 'vanquish', blurb: 'Open-air Vanquish drama with GT authority.', power: '835 PS', accel: '3.3 s', top: '214 mph' },
  { slug: 'vanquish-25th-anniversary-edition', title: 'Vanquish 25th Anniversary Edition', family: 'vanquish', blurb: 'Celebrate 25 years of an automotive flagship.', power: '835 PS', accel: '3.2 s', top: '214 mph' },
  { slug: 'dbx707', title: 'DBX707', family: 'dbx', blurb: 'The world’s most powerful luxury SUV.', power: '707 PS', accel: '3.3 s', top: '193 mph' },
  { slug: 'dbx-s', title: 'DBX S', family: 'dbx', blurb: 'Sharper, lighter, more focused DBX performance.', power: '727 PS', accel: '3.2 s', top: '193 mph' },
  { slug: 'valhalla', title: 'Valhalla', family: 'valhalla', blurb: 'Mid-engined hybrid hypercar. A new era of intensity.', power: '1,079 PS', accel: '2.5 s', top: '217 mph' },
  { slug: 'valkyrie', title: 'Valkyrie', family: 'valkyrie', blurb: 'Hypercar absolute. Formula One thinking for the road.', power: '1,139 PS', accel: '2.5 s', top: '220 mph' },
  { slug: 'valkyrie-spider', title: 'Valkyrie Spider', family: 'valkyrie', blurb: 'Open-cockpit Valkyrie theatre without compromise.', power: '1,139 PS', accel: '2.5 s', top: '217 mph' },
  { slug: 'valkyrie-amr-pro', title: 'Valkyrie AMR Pro', family: 'valkyrie', blurb: 'Track-only Valkyrie. Extreme. Undiluted.', power: '1,000+ PS', accel: 'N/A', top: 'N/A' },
  { slug: 'valkyrie-lm', title: 'Valkyrie LM', family: 'valkyrie', blurb: 'Le Mans spirit. Road-going endurance icon.', power: '1,000+ PS', accel: 'N/A', top: 'N/A' },
  { slug: 'valour', title: 'Valour', family: 'valour', blurb: 'Manual. V12. Limited. Pure driver focus.', power: '715 PS', accel: '3.5 s', top: '214 mph' },
  { slug: 'valiant', title: 'Valiant', family: 'valiant', blurb: 'Track-honed special. Courage in every detail.', power: '735 PS', accel: '3.4 s', top: '205 mph' },
  { slug: 'amr26', title: 'AMR26', family: 'amr26', blurb: 'Racing DNA. Road-car intensity.', power: 'N/A', accel: 'N/A', top: 'N/A' },
  { slug: 'volante-60th-anniversary-editions', title: 'Volante 60th Anniversary Editions', family: 'db12', blurb: 'Sixty years of open-top Aston Martin elegance.', power: 'N/A', accel: 'N/A', top: 'N/A' },
];

/** @type {{ key: string, title: string, eyebrow: string, blurb: string, power: string, accel: string, top: string, tileSlug: string, variants: { slug: string, title: string, blurb: string }[] }[]} */
const FAMILIES = [
  {
    key: 'db12',
    title: 'DB12',
    eyebrow: 'ICON. DRIVEN.',
    blurb: 'Bolder. Purer. Sharper. The world’s first Super Tourer.',
    power: '680 PS',
    accel: '3.6 s',
    top: '202 mph',
    tileSlug: 'db12',
    variants: [
      { slug: 'db12-s', title: 'DB12 S', blurb: 'A Super Tourer for those who make all roads their own.' },
      { slug: 'db12', title: 'DB12', blurb: 'Part grand tourer. Part supercar.' },
      { slug: 'db12-volante', title: 'DB12 Volante', blurb: 'Open-air Super Touring with unmistakable presence.' },
    ],
  },
  {
    key: 'vantage',
    title: 'Vantage',
    eyebrow: 'THRILL. DRIVEN.',
    blurb: 'Forged in the fires of the limit. A real sports car.',
    power: '680 PS',
    accel: '3.3 s',
    top: '202 mph',
    tileSlug: 'vantage-coupe',
    variants: [
      { slug: 'vantage-s', title: 'Vantage S', blurb: 'Subvert. Surpass.' },
      { slug: 'vantage-coupe', title: 'Vantage', blurb: 'A real sports car.' },
      { slug: 'vantage-roadster', title: 'Vantage Roadster', blurb: 'Open-top thrills.' },
    ],
  },
  {
    key: 'vanquish',
    title: 'Vanquish',
    eyebrow: 'FLAGSHIP. DRIVEN.',
    blurb: 'The ultimate grand tourer. Uncompromising and unmistakable.',
    power: '835 PS',
    accel: '3.2 s',
    top: '214 mph',
    tileSlug: 'vanquish',
    variants: [
      { slug: 'vanquish', title: 'Vanquish', blurb: 'The ultimate grand tourer.' },
      { slug: 'vanquish-volante', title: 'Vanquish Volante', blurb: 'Open-air Vanquish drama.' },
      { slug: 'vanquish-25th-anniversary-edition', title: 'Vanquish 25', blurb: 'Twenty-five years of flagship.' },
    ],
  },
  {
    key: 'dbx',
    title: 'DBX',
    eyebrow: 'LUXURY. DRIVEN.',
    blurb: 'Performance luxury SUV. Unmistakably Aston Martin.',
    power: '707 PS',
    accel: '3.3 s',
    top: '193 mph',
    tileSlug: 'dbx707',
    variants: [
      { slug: 'dbx707', title: 'DBX707', blurb: 'The world’s most powerful luxury SUV.' },
      { slug: 'dbx-s', title: 'DBX S', blurb: 'Sharper, lighter, more focused.' },
    ],
  },
  {
    key: 'valhalla',
    title: 'Valhalla',
    eyebrow: 'HYBRID. DRIVEN.',
    blurb: 'Mid-engined hybrid hypercar. A new era of intensity.',
    power: '1,079 PS',
    accel: '2.5 s',
    top: '217 mph',
    tileSlug: 'valhalla',
    variants: [{ slug: 'valhalla', title: 'Valhalla', blurb: 'A new era of intensity.' }],
  },
  {
    key: 'valkyrie',
    title: 'Valkyrie',
    eyebrow: 'HYPERCAR. DRIVEN.',
    blurb: 'Hypercar absolute. Formula One thinking for the road.',
    power: '1,139 PS',
    accel: '2.5 s',
    top: '220 mph',
    tileSlug: 'valkyrie',
    variants: [
      { slug: 'valkyrie', title: 'Valkyrie', blurb: 'Hypercar absolute.' },
      { slug: 'valkyrie-spider', title: 'Valkyrie Spider', blurb: 'Open-cockpit theatre.' },
      { slug: 'valkyrie-amr-pro', title: 'Valkyrie AMR Pro', blurb: 'Track-only extreme.' },
    ],
  },
  {
    key: 'valour',
    title: 'Valour',
    eyebrow: 'SPECIAL. DRIVEN.',
    blurb: 'Manual. V12. Limited. Pure driver focus.',
    power: '715 PS',
    accel: '3.5 s',
    top: '214 mph',
    tileSlug: 'valour',
    variants: [{ slug: 'valour', title: 'Valour', blurb: 'Pure driver focus.' }],
  },
  {
    key: 'valiant',
    title: 'Valiant',
    eyebrow: 'COURAGE. DRIVEN.',
    blurb: 'Track-honed special. Courage in every detail.',
    power: '735 PS',
    accel: '3.4 s',
    top: '205 mph',
    tileSlug: 'valiant',
    variants: [{ slug: 'valiant', title: 'Valiant', blurb: 'Courage in every detail.' }],
  },
  {
    key: 'amr26',
    title: 'AMR26',
    eyebrow: 'RACING. DRIVEN.',
    blurb: 'Racing DNA. Road-car intensity.',
    power: 'N/A',
    accel: 'N/A',
    top: 'N/A',
    tileSlug: 'amr26',
    variants: [{ slug: 'amr26', title: 'AMR26', blurb: 'Racing DNA.' }],
  },
];

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
  const roots = [TEMPLATES];
  // Include hash-path siblings that still carry automobile ModelFamilySection field Paths
  if (existsSync(TEMPLATES_ROOT)) {
    for (const e of readdirSync(TEMPLATES_ROOT, { withFileTypes: true })) {
      if (e.isDirectory() && e.name !== 'automobile') roots.push(join(TEMPLATES_ROOT, e.name));
    }
  }
  for (const root of roots) {
    for (const f of walk(root)) {
      const t = readFileSync(f, 'utf8');
      const id = (t.match(/^ID: "([^"]+)"/m) || [])[1];
      const p = (t.match(/^Path: "([^"]+)"/m) || [])[1];
      if (!id || !p || !p.includes('/automobile/') || !p.includes('/Data/')) continue;
      const parts = p.split('/');
      const fieldName = parts[parts.length - 1];
      const compIdx = parts.findIndex((x) => x.endsWith(' Templates'));
      if (compIdx < 0) continue;
      const comp = parts[compIdx].replace(/ Templates$/, '');
      map[`${comp}/${fieldName}`] = id;
    }
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

/** Bristan-style local image field (served from Next.js `public/`). */
function image(src, alt = '', width = 1440, height = 900) {
  return `<Image src="${src}" alt="${alt.replace(/"/g, '&quot;')}" width="${width}" height="${height}" />`;
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

function pageYaml({ id, parent, pathSeg, title, renderingsXml, pageDesignId, templateId }) {
  const design = (pageDesignId || PAGE_DESIGN_DEFAULT).toUpperCase();
  const tpl = templateId || PAGE_TEMPLATE;
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${tpl}"
Path: "/sitecore/content/automobile/astonmartin/${pathSeg}"
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${design}}"
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

function templatesMapping(...pairs) {
  return pairs
    .map(
      ([templateId, designId]) =>
        `%7b${templateId.toUpperCase()}%7d%3d%257B${designId.toUpperCase()}%257D`
    )
    .join('%26');
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

function layout(entries) {
  return `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{${DEVICE_ID}}">
${entries.join('\n')}
      </d>
    </r>`;
}

function modelPageId(slug) {
  return slug === 'db12' ? stableId('page-db12') : stableId(`page-${slug}`);
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
const CONFIG_ID = stableId('page-configurator');
const DB12_ID = modelPageId('db12');
const Q_ID = stableId('page-q-by-aston-martin');
const OWNERS_ID = stableId('page-owners');
const OUR_WORLD_ID = stableId('page-our-world');
const EXPERIENCES_ID = stableId('page-experiences');
const DEALERS_ID = stableId('page-dealers');
const ENQUIRY_ID = 'a1e10001-2222-4000-8000-000000000001';
const OWNERS_HUB_RID = 'a1e10001-1111-4000-8000-000000000004';
const DEALER_FINDER_RID = 'a1e10001-1111-4000-8000-000000000002';
const CONFIG_STUDIO_RID = 'a1e10001-1111-4000-8000-000000000003';
const ENQUIRY_FORM_RID = 'a1e10001-1111-4000-8000-000000000001';
const VALHALLA_ID = modelPageId('valhalla');

const PARTIAL_HEADER = stableId('pd-header');
const PARTIAL_FOOTER = stableId('pd-footer');
const PAGE_DESIGN_DEFAULT = stableId('page-design-default');
const PAGE_DESIGN_CAR_MODEL = stableId('page-design-car-model');
const PH_SXA_HEADER = stableId('ph-sxa-header');
const PH_SXA_FOOTER = stableId('ph-sxa-footer');
const CAR_MODEL_TEMPLATE = stableId('tpl-car-model');
const CAR_MODEL_STD_VALUES = stableId('tpl-car-model-std');
const UID_PD_HEADER = stableId('uid-pd-header-r');
const UID_PD_FOOTER = stableId('uid-pd-footer-r');

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
  configHero: stableId('ds-config-hero'),
  jumpNav: stableId('ds-jump-nav'),
  qHero: stableId('ds-q-hero'),
  qFeature: stableId('ds-q-feature'),
  qExplore: stableId('ds-q-explore'),
  ownersHero: stableId('ds-owners-hero'),
  ownersDual: stableId('ds-owners-dual'),
  ownersValhalla: stableId('ds-owners-valhalla'),
  ourWorldHero: stableId('ds-our-world-hero'),
  ourWorldStories: stableId('ds-our-world-stories'),
  ourWorldPartnerships: stableId('ds-our-world-partnerships'),
  ourWorldRacing: stableId('ds-our-world-racing'),
  ourWorldMagazine: stableId('ds-our-world-magazine'),
  ourWorldTimeline: stableId('ds-our-world-timeline'),
  ourWorldExplore: stableId('ds-our-world-explore'),
  experiencesHero: stableId('ds-experiences-hero'),
  experiencesDual: stableId('ds-experiences-dual'),
  dealersHero: stableId('ds-dealers-hero'),
  dealersPromo: stableId('ds-dealers-promo'),
};

const familyIds = Object.fromEntries(FAMILIES.map((f) => [f.key, stableId(`ds-family-${f.key}`)]));

writeFileSync(
  join(DATA, 'Headers/Site Header.yml'),
  dsYaml({
    id: ids.header,
    name: 'Site Header',
    folder: 'Headers',
    folderId: folders.Headers,
    template: T.Header,
    fields: fields(
      field('Header', 'BrandName', 'Aston Martin'),
      field('Header', 'Logo', image('/images/aston-martin-logo.svg', 'Aston Martin', 280, 36)),
      field('Header', 'ModelsLink', intLink('Models', '/models', MODELS_ID)),
      field('Header', 'OurWorldLink', intLink('Our World', '/our-world', OUR_WORLD_ID)),
      field('Header', 'OwnersLink', intLink('Owners', '/owners', OWNERS_ID)),
      field('Header', 'ExperiencesLink', intLink('Experiences', '/experiences', EXPERIENCES_ID)),
      field('Header', 'ConfigureLink', intLink('Configure', '/configurator', CONFIG_ID)),
      field('Header', 'EnquireLink', intLink('Enquire', '/enquiry', ENQUIRY_ID))
    ),
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
    fields: fields(
      field('Footer', 'BrandName', 'Aston Martin'),
      field('Footer', 'ModelsLink', intLink('Models', '/models', MODELS_ID)),
      field('Footer', 'OurWorldLink', intLink('Our World', '/our-world', OUR_WORLD_ID)),
      field('Footer', 'OwnersLink', intLink('Owners', '/owners', OWNERS_ID)),
      field('Footer', 'DealersLink', intLink('Find a dealer', '/dealers', DEALERS_ID)),
      field('Footer', 'ContactLink', intLink('Contact us', '/enquiry', ENQUIRY_ID)),
      field('Footer', 'CorporateLink', intLink('Experiences', '/experiences', EXPERIENCES_ID)),
      field(
        'Footer',
        'Disclaimer',
        '<p>Demo content inspired by public Aston Martin marketing pages for SitecoreAI industry verticals. Crafted For You journey: Emma (DB12), James (Owners / Q / Valhalla), Sophia (Our World).</p>'
      ),
      field('Footer', 'Copyright', '© Aston Martin Lagonda demo'),
      field('Footer', 'TermsLink', extLink('Terms & Conditions', 'https://www.astonmartin.com/en-gb/legal/terms')),
      field('Footer', 'PrivacyLink', extLink('Privacy', 'https://www.astonmartin.com/en-gb/legal/privacy')),
      field('Footer', 'CookiesLink', extLink('Cookies', 'https://www.astonmartin.com/en-gb/legal/cookies'))
    ),
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
    fields: fields(
      field('HeroBanner', 'Title', 'Vanquish 25th Anniversary Edition'),
      field(
        'HeroBanner',
        'Description',
        '<p>Celebrate 25 years of an automotive flagship. ChatGPT / Crafted For You traffic personalises to DB12 — try ?utm_source=chatgpt&amp;utm_campaign=db12-vs-bentley</p>'
      ),
      field(
        'HeroBanner',
        'CtaLink',
        intLink('Explore', '/models/vanquish-25th-anniversary-edition', modelPageId('vanquish-25th-anniversary-edition'))
      ),
      field('HeroBanner', 'Image', image('/images/home-hero.jpg', 'Vanquish 25th Anniversary Edition'))
    ),
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
    fields: fields(
      field('HeroBanner', 'Eyebrow', 'THRILL. DRIVEN.'),
      field('HeroBanner', 'Title', 'Vantage'),
      field('HeroBanner', 'CtaLink', intLink('Explore', '/models', MODELS_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Build', '/configurator', CONFIG_ID)),
      field('HeroBanner', 'Image', image('/images/home-vantage.jpg', 'Vantage'))
    ),
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
    fields: fields(
      field('Promo', 'PromoSubTitle', 'CRAFTED FOR YOU'),
      field('Promo', 'PromoTitle', 'DB12 — the Super Tourer'),
      field('Promo', 'PromoMoreInfo', intLink('Explore DB12', '/models/db12', DB12_ID)),
      field('Promo', 'PromoImageOne', image('/images/crafted-for-you.jpg', 'Crafted For You — DB12')),
      field('Promo', 'SecondarySubTitle', 'CONFIGURE'),
      field('Promo', 'SecondaryTitle', 'Build your Aston Martin'),
      field('Promo', 'SecondaryLink', intLink('Configurator', '/configurator', CONFIG_ID)),
      field('Promo', 'PromoImageTwo', image('/images/configurator-hero.jpg', 'Configurator'))
    ),
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
    fields: fields(
      field('StoriesGrid', 'Title', 'Stories'),
      field('StoriesGrid', 'AllStoriesLink', intLink('Read all stories', '/our-world', OUR_WORLD_ID)),
      field('StoriesGrid', 'StoryOneImage', image('/images/story-1.jpg', 'Vanquish History')),
      field('StoriesGrid', 'StoryOneCategory', 'HERITAGE'),
      field('StoriesGrid', 'StoryOneTitle', 'Aston Martin Vanquish History - 25 Years of Conquering'),
      field('StoriesGrid', 'StoryOneDate', '25 March 2026'),
      field('StoriesGrid', 'StoryOneLink', extLink('Read', 'https://www.astonmartin.com/en-gb')),
      field('StoriesGrid', 'StoryTwoImage', image('/images/story-2.jpg', 'Fernando Alonso')),
      field('StoriesGrid', 'StoryTwoCategory', 'HERITAGE'),
      field('StoriesGrid', 'StoryTwoTitle', "Fernando Alonso's Mastery, At Your Fingertips"),
      field('StoriesGrid', 'StoryTwoDate', '24 March 2026'),
      field('StoriesGrid', 'StoryTwoLink', extLink('Read', 'https://www.astonmartin.com/en-gb')),
      field('StoriesGrid', 'StoryThreeImage', image('/images/story-3.jpg', 'Aston Martin x BERO')),
      field('StoriesGrid', 'StoryThreeCategory', 'BUSINESS'),
      field('StoriesGrid', 'StoryThreeTitle', 'Aston Martin x BERO'),
      field('StoriesGrid', 'StoryThreeDate', '12 November 2025'),
      field('StoriesGrid', 'StoryThreeLink', extLink('Read', 'https://www.astonmartin.com/en-gb'))
    ),
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
    fields: fields(
      field('NewsStrip', 'Title', 'News'),
      field('NewsStrip', 'AllNewsLink', intLink('See all news', '/our-world', OUR_WORLD_ID)),
      field('NewsStrip', 'ItemOneImage', image('/images/news-1.jpg', 'Vanquish 25')),
      field('NewsStrip', 'ItemOneDate', '22 Jul 2026'),
      field('NewsStrip', 'ItemOneTitle', 'Vanquish 25: a celebration of an automotive flagship'),
      field('NewsStrip', 'ItemOneLink', extLink('Explore', 'https://www.astonmartin.com/en-gb')),
      field('NewsStrip', 'ItemTwoImage', image('/images/news-2.jpg', 'Breitling')),
      field('NewsStrip', 'ItemTwoDate', '20 Jul 2026'),
      field('NewsStrip', 'ItemTwoTitle', 'Time and Speed, Reunited: Breitling and Aston Martin'),
      field('NewsStrip', 'ItemTwoLink', extLink('Explore', 'https://www.astonmartin.com/en-gb')),
      field('NewsStrip', 'ItemThreeImage', image('/images/news-3.jpg', 'Dreadnought')),
      field('NewsStrip', 'ItemThreeDate', '16 Jul 2026'),
      field('NewsStrip', 'ItemThreeTitle', 'Aston Martin Dreadnought: Built to deliver digital domination'),
      field('NewsStrip', 'ItemThreeLink', extLink('Explore', 'https://www.astonmartin.com/en-gb'))
    ),
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
    fields: fields(
      field('HeroBanner', 'Title', 'All models'),
      field(
        'HeroBanner',
        'Description',
        '<p>Eleven decades of cutting-edge innovation and exemplary engineering. Unrivalled performance. The pinnacle of luxury sports cars.</p>'
      ),
      field('HeroBanner', 'Image', image('/images/models-hero.jpg', 'All models'))
    ),
  })
);

writeFileSync(
  join(DATA, 'Hero Banners/Configurator Hero.yml'),
  dsYaml({
    id: ids.configHero,
    name: 'Configurator Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Eyebrow', 'CONFIGURE'),
      field('HeroBanner', 'Title', 'Build yours'),
      field('HeroBanner', 'Description', '<p>Explore colours, materials and options. Demo stub — full configurator lives on the manufacturer site.</p>'),
      field('HeroBanner', 'CtaLink', extLink('Open configurator', 'https://configurator.astonmartin.com/')),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Browse models', '/models', MODELS_ID)),
      field('HeroBanner', 'Image', image('/images/configurator-hero.jpg', 'Configurator'))
    ),
  })
);

{
  const uids = u('cfg1');
  writeFileSync(
    join(SITE, 'Home/Configurator.yml'),
    pageYaml({
      id: CONFIG_ID,
      parent: HOME_ID,
      pathSeg: 'Home/Configurator',
      title: 'Configurator',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntryDefault({
          uid: uids[0],
          renderingId: CONFIG_STUDIO_RID,
          dsId: '',
          ph: 'headless-main',
          before: '*',
          dyn: 1,
        }),
      ]),
    })
  );
}

writeFileSync(
  join(DATA, 'Models/Jump Nav.yml'),
  dsYaml({
    id: ids.jumpNav,
    name: 'Jump Nav',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ModelJumpNav,
    fields: fields(
      field(
        'ModelJumpNav',
        'Items',
        FAMILIES.map((f) => `${f.title}|#${f.key}`).join('|')
      )
    ),
  })
);

for (const fam of FAMILIES) {
  const primarySlug = fam.variants[0]?.slug || fam.key;
  const exploreId = modelPageId(primarySlug);
  const variantFields = [];
  const labels = ['One', 'Two', 'Three'];
  fam.variants.forEach((v, i) => {
    if (i >= labels.length) return;
    const n = labels[i];
    const pageId = modelPageId(v.slug);
    variantFields.push(
      field('ModelFamilySection', `Variant${n}Title`, v.title),
      field('ModelFamilySection', `Variant${n}Description`, `<p>${v.blurb}</p>`),
      field('ModelFamilySection', `Variant${n}Image`, image(`/images/${v.slug}-hero.jpg`, v.title)),
      field('ModelFamilySection', `Variant${n}Explore`, intLink('Explore', `/models/${v.slug}`, pageId)),
      field('ModelFamilySection', `Variant${n}Configure`, intLink('Configure', '/configurator', CONFIG_ID))
    );
  });

  writeFileSync(
    join(DATA, `Models/${fam.title} Family.yml`),
    dsYaml({
      id: familyIds[fam.key],
      name: `${fam.title} Family`,
      folder: 'Models',
      folderId: folders.Models,
      template: T.ModelFamilySection,
      fields: fields(
        field('ModelFamilySection', 'AnchorId', fam.key),
        field('ModelFamilySection', 'Eyebrow', fam.eyebrow),
        field('ModelFamilySection', 'Title', fam.title),
        field('ModelFamilySection', 'Description', `<p>${fam.blurb}</p>`),
        field('ModelFamilySection', 'ExploreLink', intLink(`Explore ${fam.title}`, `/models/${primarySlug}`, exploreId)),
        field('ModelFamilySection', 'SpecPower', fam.power),
        field('ModelFamilySection', 'SpecAccel', fam.accel),
        field('ModelFamilySection', 'SpecTopSpeed', fam.top),
        field('ModelFamilySection', 'HeroImage', image(`/images/family-${fam.key}.jpg`, fam.title)),
        field('ModelFamilySection', 'DetailImageOne', image(`/images/${fam.tileSlug}-tile-1.jpg`, fam.title)),
        field('ModelFamilySection', 'DetailImageTwo', image(`/images/${fam.tileSlug}-tile-2.jpg`, fam.title)),
        field('ModelFamilySection', 'DetailImageThree', image(`/images/${fam.tileSlug}-tile-3.jpg`, fam.title)),
        ...variantFields
      ),
    })
  );
}

mkdirSync(join(SITE, 'Home/Models'), { recursive: true });
// Windows is case-insensitive: remove legacy DB12.yml before writing db12.yml
const legacyDb12 = join(SITE, 'Home/Models/DB12.yml');
if (existsSync(legacyDb12)) {
  unlinkSync(legacyDb12);
  console.log('Removed legacy Home/Models/DB12.yml (use db12.yml with page-db12)');
}

/** Sanitize Sitecore item file names only — never rewrite folder separators. */
function safeName(name) {
  return String(name).replace(/[\\/]/g, '-').replace(/:/g, '-');
}

function removeOrphanFlatDatasources() {
  if (!existsSync(DATA)) return;
  for (const name of readdirSync(DATA)) {
    if (name.startsWith('Hero Banners-') || name.startsWith('Models-')) {
      const p = join(DATA, name);
      unlinkSync(p);
      console.log('Removed orphan flat datasource', name);
    }
  }
}

removeOrphanFlatDatasources();

for (const model of MODELS) {
  const pageId = modelPageId(model.slug);
  const heroId = stableId(`ds-${model.slug}-hero`);
  const introId = stableId(`ds-${model.slug}-intro`);
  const featureId = stableId(`ds-${model.slug}-feature`);
  const quoteId = stableId(`ds-${model.slug}-quote`);
  const exploreId = stableId(`ds-${model.slug}-explore`);
  const heroName = safeName(`${model.title} Hero`);
  const introName = safeName(`${model.title} Intro`);
  const featureName = safeName(`${model.title} Feature`);
  const quoteName = safeName(`${model.title} Quote`);
  const exploreName = safeName(`${model.title} Explore`);

  writeFileSync(
    join(DATA, 'Hero Banners', `${heroName}.yml`),
    dsYaml({
      id: heroId,
      name: heroName,
      folder: 'Hero Banners',
      folderId: folders['Hero Banners'],
      template: T.HeroBanner,
      fields: fields(
        field('HeroBanner', 'Title', model.title),
        field('HeroBanner', 'Description', `<p>${model.blurb}</p>`),
        field('HeroBanner', 'CtaLink', extLink('Discover', `https://www.astonmartin.com/en-gb/models/${model.slug}`)),
        field('HeroBanner', 'SecondaryCtaLink', intLink('Configurator', '/configurator', CONFIG_ID)),
        field('HeroBanner', 'Image', image(`/images/${model.slug}-hero.jpg`, model.title))
      ),
    })
  );

  writeFileSync(
    join(DATA, 'Models', `${introName}.yml`),
    dsYaml({
      id: introId,
      name: introName,
      folder: 'Models',
      folderId: folders.Models,
      template: T.ModelIntroSpecs,
      fields: fields(
        field('ModelIntroSpecs', 'Title', model.blurb),
        field('ModelIntroSpecs', 'Description', `<p>${model.power} · 0–62 mph ${model.accel} · Top speed ${model.top}</p>`),
        field('ModelIntroSpecs', 'TabOneLabel', 'ENGINE'),
        field('ModelIntroSpecs', 'TabTwoLabel', 'TRANSMISSION'),
        field('ModelIntroSpecs', 'TabThreeLabel', 'CHASSIS')
      ),
    })
  );

  writeFileSync(
    join(DATA, 'Models', `${featureName}.yml`),
    dsYaml({
      id: featureId,
      name: featureName,
      folder: 'Models',
      folderId: folders.Models,
      template: T.FeatureCarousel,
      fields: fields(
        field('FeatureCarousel', 'HeroImage', image(`/images/${model.slug}-feature.jpg`, model.title)),
        field('FeatureCarousel', 'TileOneTitle', 'Engine'),
        field('FeatureCarousel', 'TileOneImage', image(`/images/${model.slug}-tile-1.jpg`, 'Engine')),
        field('FeatureCarousel', 'TileOneLink', extLink('Explore', `https://www.astonmartin.com/en-gb/models/${model.slug}`)),
        field('FeatureCarousel', 'TileTwoTitle', 'Transmission'),
        field('FeatureCarousel', 'TileTwoImage', image(`/images/${model.slug}-tile-2.jpg`, 'Transmission')),
        field('FeatureCarousel', 'TileTwoLink', extLink('Explore', `https://www.astonmartin.com/en-gb/models/${model.slug}`)),
        field('FeatureCarousel', 'TileThreeTitle', 'Handling'),
        field('FeatureCarousel', 'TileThreeImage', image(`/images/${model.slug}-tile-3.jpg`, 'Handling')),
        field('FeatureCarousel', 'TileThreeLink', extLink('Explore', `https://www.astonmartin.com/en-gb/models/${model.slug}`))
      ),
    })
  );

  writeFileSync(
    join(DATA, 'Models', `${quoteName}.yml`),
    dsYaml({
      id: quoteId,
      name: quoteName,
      folder: 'Models',
      folderId: folders.Models,
      template: T.QuoteBlock,
      fields: fields(
        field(
          'QuoteBlock',
          'Quote',
          model.slug === 'db12'
            ? 'When comparing the world’s great grand tourers under £250,000, DB12 stands apart — British Super Touring beauty with supercar intent.'
            : `${model.title} delivers a shift in sporting character and dynamic capability — defining its place in the Aston Martin bloodline.`
        ),
        field(
          'QuoteBlock',
          'Attribution',
          model.slug === 'db12' ? 'CRAFTED FOR YOU / AEO COMPARISON' : 'ASTON MARTIN / VEHICLE PERFORMANCE'
        )
      ),
    })
  );

  writeFileSync(
    join(DATA, 'Models', `${exploreName}.yml`),
    dsYaml({
      id: exploreId,
      name: exploreName,
      folder: 'Models',
      folderId: folders.Models,
      template: T.ExploreCtaStrip,
      fields: fields(
        field('ExploreCtaStrip', 'Title', 'Explore Aston Martin'),
        field('ExploreCtaStrip', 'CardOneTitle', 'Configurator'),
        field('ExploreCtaStrip', 'CardOneLink', intLink(`Your unique ${model.title}`, '/configurator', CONFIG_ID)),
        field('ExploreCtaStrip', 'CardTwoTitle', 'Find a dealer'),
        field('ExploreCtaStrip', 'CardTwoLink', intLink('Book a VIP test drive', '/dealers', DEALERS_ID)),
        field('ExploreCtaStrip', 'CardThreeTitle', 'Our World'),
        field('ExploreCtaStrip', 'CardThreeLink', intLink('Owner stories', '/our-world', OUR_WORLD_ID))
      ),
    })
  );

  // Chrome comes from Page Design "CarModel" (Header + Footer partials) — main content only here.
  const uids = ['d2', 'd3', 'd4', 'd5', 'd6'].map((s) => stableId(`uid-${model.slug}-${s}`));
  const modelLayout = layout([
    rEntry({
      uid: uids[0],
      renderingId: R.HeroBanner,
      dsId: heroId,
      ph: 'headless-main',
      variantId: V.HeroModelDetail,
      before: '*',
      dyn: 1,
    }),
    rEntryDefault({ uid: uids[1], renderingId: R.ModelIntroSpecs, dsId: introId, ph: 'headless-main', after: uids[0], dyn: 2 }),
    rEntryDefault({ uid: uids[2], renderingId: R.FeatureCarousel, dsId: featureId, ph: 'headless-main', after: uids[1], dyn: 3 }),
    rEntryDefault({ uid: uids[3], renderingId: R.QuoteBlock, dsId: quoteId, ph: 'headless-main', after: uids[2], dyn: 4 }),
    rEntryDefault({ uid: uids[4], renderingId: R.ExploreCtaStrip, dsId: exploreId, ph: 'headless-main', after: uids[3], dyn: 5 }),
  ]);

  writeFileSync(
    join(SITE, `Home/Models/${model.slug}.yml`),
    pageYaml({
      id: pageId,
      parent: MODELS_ID,
      pathSeg: `Home/Models/${model.slug}`,
      title: model.title,
      renderingsXml: modelLayout,
      pageDesignId: PAGE_DESIGN_CAR_MODEL,
      templateId: CAR_MODEL_TEMPLATE,
    })
  );
}

const u = (...seeds) => seeds.map((s) => stableId(`uid-${s}`));

const homeUids = u('h2', 'h3', 'h4', 'h5', 'h6');
const homeLayout2 = layout([
  rEntry({
    uid: homeUids[0],
    renderingId: R.HeroBanner,
    dsId: ids.homeHero,
    ph: 'headless-main',
    variantId: V.HeroDefault,
    before: '*',
    dyn: 1,
  }),
  rEntry({
    uid: homeUids[1],
    renderingId: R.HeroBanner,
    dsId: ids.modelFeature,
    ph: 'headless-main',
    variantId: V.HeroModelFeature,
    after: homeUids[0],
    dyn: 2,
  }),
  rEntry({
    uid: homeUids[2],
    renderingId: R.Promo,
    dsId: ids.dualPromo,
    ph: 'headless-main',
    variantId: V.PromoDualTile,
    after: homeUids[1],
    dyn: 3,
  }),
  rEntryDefault({ uid: homeUids[3], renderingId: R.StoriesGrid, dsId: ids.stories, ph: 'headless-main', after: homeUids[2], dyn: 4 }),
  rEntryDefault({ uid: homeUids[4], renderingId: R.NewsStrip, dsId: ids.news, ph: 'headless-main', after: homeUids[3], dyn: 5 }),
]);

const homePath = join(SITE, 'Home.yml');
let homeExisting = readFileSync(homePath, 'utf8');
if (homeExisting.includes('Hint: __Renderings')) {
  homeExisting = homeExisting.replace(
    /- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"[\s\S]*?(?=\nLanguages:)/,
    `- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${homeLayout2}
`
  );
} else {
  homeExisting = homeExisting.replace(
    'SharedFields:\n',
    `SharedFields:
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${homeLayout2}
`
  );
}
if (homeExisting.includes('Hint: Page Design')) {
  homeExisting = homeExisting.replace(
    /- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"\n  Hint: Page Design\n  Value: "[^"]*"/,
    `- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${PAGE_DESIGN_DEFAULT.toUpperCase()}}"`
  );
} else {
  homeExisting = homeExisting.replace(
    'SharedFields:\n',
    `SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${PAGE_DESIGN_DEFAULT.toUpperCase()}}"
`
  );
}
writeFileSync(homePath, homeExisting);

mkdirSync(join(SITE, 'Home'), { recursive: true });

const modelsUids = [stableId('uid-m2'), stableId('uid-m3')];
const familyUids = FAMILIES.map((_, i) => stableId(`uid-mf-${i}`));
const modelsEntries = [
  rEntry({
    uid: modelsUids[0],
    renderingId: R.HeroBanner,
    dsId: ids.modelsHero,
    ph: 'headless-main',
    variantId: V.HeroModelsLanding,
    before: '*',
    dyn: 1,
  }),
  rEntryDefault({
    uid: modelsUids[1],
    renderingId: R.ModelJumpNav,
    dsId: ids.jumpNav,
    ph: 'headless-main',
    after: modelsUids[0],
    dyn: 2,
  }),
];
let prev = modelsUids[1];
let dyn = 3;
FAMILIES.forEach((fam, i) => {
  modelsEntries.push(
    rEntryDefault({
      uid: familyUids[i],
      renderingId: R.ModelFamilySection,
      dsId: familyIds[fam.key],
      ph: 'headless-main',
      after: prev,
      dyn: dyn++,
    })
  );
  prev = familyUids[i];
});

writeFileSync(
  join(SITE, 'Home/Models.yml'),
  pageYaml({
    id: MODELS_ID,
    parent: HOME_ID,
    pathSeg: 'Home/Models',
    title: 'Models',
    renderingsXml: layout(modelsEntries),
    pageDesignId: PAGE_DESIGN_DEFAULT,
  })
);

const configUids = u('c2');
writeFileSync(
  join(SITE, 'Home/Configurator.yml'),
  pageYaml({
    id: CONFIG_ID,
    parent: HOME_ID,
    pathSeg: 'Home/Configurator',
    title: 'Configurator',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: configUids[0],
        renderingId: CONFIG_STUDIO_RID,
        dsId: '',
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

/** Story pages — Q by AM, Owners, Our World, Experiences, Dealers (demo storyboard PDF). */
writeFileSync(
  join(DATA, 'Hero Banners/Q by Aston Martin Hero.yml'),
  dsYaml({
    id: ids.qHero,
    name: 'Q by Aston Martin Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Title', 'Q by Aston Martin'),
      field(
        'HeroBanner',
        'Description',
        '<p>Bespoke leather, paint, carbon, stitching, and monogram — James’s lifelong ownership journey.</p>'
      ),
      field('HeroBanner', 'CtaLink', intLink('Explore Owners', '/owners', OWNERS_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Book a factory visit', '/experiences', EXPERIENCES_ID)),
      field('HeroBanner', 'Image', image('/images/q-by-hero.jpg', 'Q by Aston Martin'))
    ),
  })
);

writeFileSync(
  join(DATA, 'Models/Q by Aston Martin Feature.yml'),
  dsYaml({
    id: ids.qFeature,
    name: 'Q by Aston Martin Feature',
    folder: 'Models',
    folderId: folders.Models,
    template: T.FeatureCarousel,
    fields: fields(
      field('FeatureCarousel', 'HeroImage', image('/images/q-by-feature.jpg', 'Q by Aston Martin')),
      field('FeatureCarousel', 'TileOneTitle', 'Paint & leather'),
      field('FeatureCarousel', 'TileOneImage', image('/images/q-by-tile-1.jpg', 'Paint & leather')),
      field('FeatureCarousel', 'TileOneLink', intLink('Explore', '/q-by-aston-martin', Q_ID)),
      field('FeatureCarousel', 'TileTwoTitle', 'Carbon & stitch'),
      field('FeatureCarousel', 'TileTwoImage', image('/images/owners-tile-vantage.jpg', 'Carbon')),
      field('FeatureCarousel', 'TileTwoLink', intLink('Owners', '/owners', OWNERS_ID)),
      field('FeatureCarousel', 'TileThreeTitle', 'Factory visit'),
      field('FeatureCarousel', 'TileThreeImage', image('/images/experiences-tile-1.jpg', 'Factory')),
      field('FeatureCarousel', 'TileThreeLink', intLink('Experiences', '/experiences', EXPERIENCES_ID))
    ),
  })
);

writeFileSync(
  join(DATA, 'Models/Q by Aston Martin Explore.yml'),
  dsYaml({
    id: ids.qExplore,
    name: 'Q by Aston Martin Explore',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ExploreCtaStrip,
    fields: fields(
      field('ExploreCtaStrip', 'Title', 'Continue the ownership journey'),
      field('ExploreCtaStrip', 'CardOneTitle', 'Owners'),
      field('ExploreCtaStrip', 'CardOneLink', intLink('Owner portal', '/owners', OWNERS_ID)),
      field('ExploreCtaStrip', 'CardTwoTitle', 'Valhalla'),
      field('ExploreCtaStrip', 'CardTwoLink', intLink('Exclusive reveal', '/models/valhalla', VALHALLA_ID)),
      field('ExploreCtaStrip', 'CardThreeTitle', 'Experiences'),
      field('ExploreCtaStrip', 'CardThreeLink', intLink('Goodwood & factory', '/experiences', EXPERIENCES_ID))
    ),
  })
);

{
  const uids = u('q2', 'q3', 'q4');
  writeFileSync(
    join(SITE, 'Home/q-by-aston-martin.yml'),
    pageYaml({
      id: Q_ID,
      parent: HOME_ID,
      pathSeg: 'Home/q-by-aston-martin',
      title: 'Q by Aston Martin',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntry({
          uid: uids[0],
          renderingId: R.HeroBanner,
          dsId: ids.qHero,
          ph: 'headless-main',
          variantId: V.HeroModelDetail,
          before: '*',
          dyn: 1,
        }),
        rEntryDefault({ uid: uids[1], renderingId: R.FeatureCarousel, dsId: ids.qFeature, ph: 'headless-main', after: uids[0], dyn: 2 }),
        rEntryDefault({ uid: uids[2], renderingId: R.ExploreCtaStrip, dsId: ids.qExplore, ph: 'headless-main', after: uids[1], dyn: 3 }),
      ]),
    })
  );
}

writeFileSync(
  join(DATA, 'Hero Banners/Owners Hero.yml'),
  dsYaml({
    id: ids.ownersHero,
    name: 'Owners Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Title', 'Owners'),
      field(
        'HeroBanner',
        'Description',
        '<p>Private Goodwood invitations, exclusive Valhalla reveals, and Q by Aston Martin — lifelong ownership, connected.</p>'
      ),
      field('HeroBanner', 'CtaLink', intLink('Q by Aston Martin', '/q-by-aston-martin', Q_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Valhalla', '/models/valhalla', VALHALLA_ID)),
      field('HeroBanner', 'Image', image('/images/owners-hero.jpg', 'Owners'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Owners Dual Promo.yml'),
  dsYaml({
    id: ids.ownersDual,
    name: 'Owners Dual Promo',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoSubTitle', 'GOODWOOD'),
      field('Promo', 'PromoTitle', 'Private Experience Day'),
      field('Promo', 'PromoMoreInfo', intLink('Book experience', '/experiences', EXPERIENCES_ID)),
      field('Promo', 'PromoImageOne', image('/images/experiences-hero.jpg', 'Goodwood')),
      field('Promo', 'SecondarySubTitle', 'Q BY ASTON MARTIN'),
      field('Promo', 'SecondaryTitle', 'Bespoke commission'),
      field('Promo', 'SecondaryLink', intLink('Explore Q', '/q-by-aston-martin', Q_ID)),
      field('Promo', 'PromoImageTwo', image('/images/q-by-hero.jpg', 'Q by Aston Martin'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Owners Valhalla Promo.yml'),
  dsYaml({
    id: ids.ownersValhalla,
    name: 'Owners Valhalla Promo',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoSubTitle', 'EXCLUSIVE'),
      field('Promo', 'PromoTitle', 'Valhalla reveal for owners'),
      field('Promo', 'PromoDescription', '<p>James owns DB11 and Vantage — next chapter: Valhalla.</p>'),
      field('Promo', 'PromoMoreInfo', intLink('Explore Valhalla', '/models/valhalla', VALHALLA_ID)),
      field('Promo', 'PromoImageOne', image('/images/owners-tile-valhalla.jpg', 'Valhalla'))
    ),
  })
);

{
  const uids = u('o2');
  writeFileSync(
    join(SITE, 'Home/owners.yml'),
    pageYaml({
      id: OWNERS_ID,
      parent: HOME_ID,
      pathSeg: 'Home/owners',
      title: 'Owners',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntryDefault({
          uid: uids[0],
          renderingId: OWNERS_HUB_RID,
          dsId: '',
          ph: 'headless-main',
          before: '*',
          dyn: 1,
        }),
      ]),
    })
  );
}

writeFileSync(
  join(DATA, 'Hero Banners/Our World Hero.yml'),
  dsYaml({
    id: ids.ourWorldHero,
    name: 'Our World Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Title', 'Our World'),
      field(
        'HeroBanner',
        'Description',
        '<p>Enter the world of Aston Martin. Where breathtaking design meets unrivalled performance. Explore the inspirations that drive us, the partnerships that shape us, and the rich heritage that defines our legacy.</p>'
      ),
      field('HeroBanner', 'Image', image('/images/our-world-hero.jpg', 'Our World'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Our World Brand Stories.yml'),
  dsYaml({
    id: ids.ourWorldStories,
    name: 'Our World Brand Stories',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoTitle', 'Aston Martin Brand Stories'),
      field(
        'Promo',
        'PromoDescription',
        '<p>Discover the values and vision of Aston Martin, and how they are captured in everything we do and create.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Explore', '/our-world', OUR_WORLD_ID)),
      field('Promo', 'PromoImageOne', image('/images/story-1.jpg', 'Brand Stories'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Our World Partnerships.yml'),
  dsYaml({
    id: ids.ourWorldPartnerships,
    name: 'Our World Partnerships',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoTitle', 'Aston Martin Partnerships'),
      field(
        'Promo',
        'PromoDescription',
        '<p>Explore Aston Martin partnerships and products created with a shared passion for perfection, beauty and craftsmanship.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Explore', '/our-world', OUR_WORLD_ID)),
      field('Promo', 'PromoImageOne', image('/images/story-3.jpg', 'Partnerships'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Our World Racing.yml'),
  dsYaml({
    id: ids.ourWorldRacing,
    name: 'Our World Racing',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoTitle', 'Aston Martin Racing'),
      field(
        'Promo',
        'PromoDescription',
        '<p>Racing is the lifeblood of Aston Martin. From a motorsport debut at the French GP in 1923 to Le Mans victory, this formidable arena has always been our passion.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Explore', '/models/amr26', modelPageId('amr26'))),
      field('Promo', 'PromoImageOne', image('/images/family-amr26.jpg', 'Racing'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Our World Magazine.yml'),
  dsYaml({
    id: ids.ourWorldMagazine,
    name: 'Our World Magazine',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoTitle', 'Aston Martin Magazine'),
      field(
        'Promo',
        'PromoDescription',
        '<p>The lens through which Aston Martin views the world — art, design, engineering, aesthetics and performance.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Explore', '/our-world', OUR_WORLD_ID)),
      field('Promo', 'PromoImageOne', image('/images/promo-magazine.jpg', 'Magazine'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Our World Timeline.yml'),
  dsYaml({
    id: ids.ourWorldTimeline,
    name: 'Our World Timeline',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoTitle', 'Timeline'),
      field(
        'Promo',
        'PromoDescription',
        '<p>112 years and counting. Discover the rich heritage of Aston Martin via our interactive timeline.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Explore', '/our-world', OUR_WORLD_ID)),
      field('Promo', 'PromoImageOne', image('/images/story-2.jpg', 'Timeline'))
    ),
  })
);

writeFileSync(
  join(DATA, 'Models/Our World Explore.yml'),
  dsYaml({
    id: ids.ourWorldExplore,
    name: 'Our World Explore',
    folder: 'Models',
    folderId: folders.Models,
    template: T.ExploreCtaStrip,
    fields: fields(
      field('ExploreCtaStrip', 'Title', 'Explore Aston Martin'),
      field('ExploreCtaStrip', 'CardOneTitle', 'Configurator'),
      field('ExploreCtaStrip', 'CardOneLink', intLink('Start configuration', '/configurator', CONFIG_ID)),
      field('ExploreCtaStrip', 'CardOneImage', image('/images/configurator-hero.jpg', 'Configurator')),
      field('ExploreCtaStrip', 'CardTwoTitle', 'Enquire'),
      field('ExploreCtaStrip', 'CardTwoLink', intLink('Contact form', '/dealers', DEALERS_ID)),
      field('ExploreCtaStrip', 'CardTwoImage', image('/images/dealers-hero.jpg', 'Enquire')),
      field('ExploreCtaStrip', 'CardThreeTitle', 'Q by Aston Martin'),
      field('ExploreCtaStrip', 'CardThreeLink', intLink('Personalise', '/q-by-aston-martin', Q_ID)),
      field('ExploreCtaStrip', 'CardThreeImage', image('/images/q-by-hero.jpg', 'Q by Aston Martin'))
    ),
  })
);

{
  const uids = u('w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8');
  writeFileSync(
    join(SITE, 'Home/our-world.yml'),
    pageYaml({
      id: OUR_WORLD_ID,
      parent: HOME_ID,
      pathSeg: 'Home/our-world',
      title: 'Our World',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntry({
          uid: uids[0],
          renderingId: R.HeroBanner,
          dsId: ids.ourWorldHero,
          ph: 'headless-main',
          variantId: V.HeroModelsLanding,
          before: '*',
          dyn: 1,
        }),
        rEntry({
          uid: uids[1],
          renderingId: R.Promo,
          dsId: ids.ourWorldStories,
          ph: 'headless-main',
          variantId: V.PromoImageLeft,
          after: uids[0],
          dyn: 2,
        }),
        rEntry({
          uid: uids[2],
          renderingId: R.Promo,
          dsId: ids.ourWorldPartnerships,
          ph: 'headless-main',
          variantId: V.PromoImageRight,
          after: uids[1],
          dyn: 3,
        }),
        rEntry({
          uid: uids[3],
          renderingId: R.Promo,
          dsId: ids.ourWorldRacing,
          ph: 'headless-main',
          variantId: V.PromoImageLeft,
          after: uids[2],
          dyn: 4,
        }),
        rEntry({
          uid: uids[4],
          renderingId: R.Promo,
          dsId: ids.ourWorldMagazine,
          ph: 'headless-main',
          variantId: V.PromoImageRight,
          after: uids[3],
          dyn: 5,
        }),
        rEntry({
          uid: uids[5],
          renderingId: R.Promo,
          dsId: ids.ourWorldTimeline,
          ph: 'headless-main',
          variantId: V.PromoImageLeft,
          after: uids[4],
          dyn: 6,
        }),
        rEntryDefault({
          uid: uids[6],
          renderingId: R.ExploreCtaStrip,
          dsId: ids.ourWorldExplore,
          ph: 'headless-main',
          after: uids[5],
          dyn: 7,
        }),
      ]),
    })
  );
}

writeFileSync(
  join(DATA, 'Hero Banners/Experiences Hero.yml'),
  dsYaml({
    id: ids.experiencesHero,
    name: 'Experiences Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Title', 'Experiences'),
      field(
        'HeroBanner',
        'Description',
        '<p>Experience Day with Brand Concierge — welcome pack, factory story, test-drive route, and lunch. Luxury is experienced, not sold.</p>'
      ),
      field('HeroBanner', 'CtaLink', intLink('Find a dealer', '/dealers', DEALERS_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Owners', '/owners', OWNERS_ID)),
      field('HeroBanner', 'Image', image('/images/experiences-hero.jpg', 'Experiences'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Experiences Dual Promo.yml'),
  dsYaml({
    id: ids.experiencesDual,
    name: 'Experiences Dual Promo',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoSubTitle', 'EMMA'),
      field('Promo', 'PromoTitle', 'VIP test drive — DB12'),
      field('Promo', 'PromoMoreInfo', intLink('Explore DB12', '/models/db12', DB12_ID)),
      field('Promo', 'PromoImageOne', image('/images/experiences-tile-1.jpg', 'DB12 test drive')),
      field('Promo', 'SecondarySubTitle', 'JAMES'),
      field('Promo', 'SecondaryTitle', 'Valhalla owner reveal'),
      field('Promo', 'SecondaryLink', intLink('Explore Valhalla', '/models/valhalla', VALHALLA_ID)),
      field('Promo', 'PromoImageTwo', image('/images/experiences-tile-2.jpg', 'Valhalla'))
    ),
  })
);

{
  const uids = u('e2', 'e3');
  writeFileSync(
    join(SITE, 'Home/experiences.yml'),
    pageYaml({
      id: EXPERIENCES_ID,
      parent: HOME_ID,
      pathSeg: 'Home/experiences',
      title: 'Experiences',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntry({
          uid: uids[0],
          renderingId: R.HeroBanner,
          dsId: ids.experiencesHero,
          ph: 'headless-main',
          variantId: V.HeroModelDetail,
          before: '*',
          dyn: 1,
        }),
        rEntry({
          uid: uids[1],
          renderingId: R.Promo,
          dsId: ids.experiencesDual,
          ph: 'headless-main',
          variantId: V.PromoDualTile,
          after: uids[0],
          dyn: 2,
        }),
      ]),
    })
  );
}

writeFileSync(
  join(DATA, 'Hero Banners/Dealers Hero.yml'),
  dsYaml({
    id: ids.dealersHero,
    name: 'Dealers Hero',
    folder: 'Hero Banners',
    folderId: folders['Hero Banners'],
    template: T.HeroBanner,
    fields: fields(
      field('HeroBanner', 'Title', 'Find a dealer'),
      field(
        'HeroBanner',
        'Description',
        '<p>Qualified intent from AI and site — Michael’s dashboard already knows Emma is ready for a VIP test drive.</p>'
      ),
      field('HeroBanner', 'CtaLink', intLink('Book Experience Day', '/experiences', EXPERIENCES_ID)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('Configure DB12', '/configurator', CONFIG_ID)),
      field('HeroBanner', 'Image', image('/images/dealers-hero.jpg', 'Find a dealer'))
    ),
  })
);

writeFileSync(
  join(DATA, 'AM Promos/Dealers Promo.yml'),
  dsYaml({
    id: ids.dealersPromo,
    name: 'Dealers Promo',
    folder: 'AM Promos',
    folderId: folders['AM Promos'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoSubTitle', 'LONDON'),
      field('Promo', 'PromoTitle', 'Aston Martin Mayfair'),
      field(
        'Promo',
        'PromoDescription',
        '<p>Emma — Luxury GT interest, DB12 configuration saved, VIP test drive requested. Context prepared for Brand Concierge.</p>'
      ),
      field('Promo', 'PromoMoreInfo', intLink('Prepare experience', '/experiences', EXPERIENCES_ID)),
      field('Promo', 'PromoImageOne', image('/images/crafted-for-you.jpg', 'Dealer experience'))
    ),
  })
);

{
  const uids = u('dls2');
  writeFileSync(
    join(SITE, 'Home/dealers.yml'),
    pageYaml({
      id: DEALERS_ID,
      parent: HOME_ID,
      pathSeg: 'Home/dealers',
      title: 'Dealers',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntryDefault({
          uid: uids[0],
          renderingId: DEALER_FINDER_RID,
          dsId: '',
          ph: 'headless-main',
          before: '*',
          dyn: 1,
        }),
      ]),
    })
  );
}

{
  const uids = u('enq1');
  writeFileSync(
    join(SITE, 'Home/enquiry.yml'),
    pageYaml({
      id: ENQUIRY_ID,
      parent: HOME_ID,
      pathSeg: 'Home/enquiry',
      title: 'Enquiry',
      pageDesignId: PAGE_DESIGN_DEFAULT,
      renderingsXml: layout([
        rEntryDefault({
          uid: uids[0],
          renderingId: ENQUIRY_FORM_RID,
          dsId: '',
          ph: 'headless-main',
          before: '*',
          dyn: 1,
        }),
      ]),
    })
  );
}

/** Partial Designs + Page Designs + CarModel template + sxa-* placeholder settings */
const headerPartialLayout = layout([
  rEntryDefault({
    uid: UID_PD_HEADER,
    renderingId: R.Header,
    dsId: ids.header,
    ph: 'headless-header',
    before: '*',
    dyn: 1,
  }),
]);
const footerPartialLayout = layout([
  rEntryDefault({
    uid: UID_PD_FOOTER,
    renderingId: R.Footer,
    dsId: ids.footer,
    ph: 'headless-footer',
    before: '*',
    dyn: 1,
  }),
]);

mkdirSync(join(PRESENTATION_ROOT, 'Partial Designs'), { recursive: true });
mkdirSync(join(PRESENTATION_ROOT, 'Page Designs'), { recursive: true });
mkdirSync(join(PRESENTATION_ROOT, 'Placeholder Settings', 'Partial Design'), { recursive: true });

writeFileSync(
  join(PRESENTATION_ROOT, 'Partial Designs/Header.yml'),
  `---
ID: "${PARTIAL_HEADER}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL_DESIGN}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Partial Designs/Header"
SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: header
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${headerPartialLayout}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

writeFileSync(
  join(PRESENTATION_ROOT, 'Partial Designs/Footer.yml'),
  `---
ID: "${PARTIAL_FOOTER}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL_DESIGN}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Partial Designs/Footer"
SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: footer
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${footerPartialLayout}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

writeFileSync(
  join(PRESENTATION_ROOT, 'Page Designs/Default.yml'),
  `---
ID: "${PAGE_DESIGN_DEFAULT}"
Parent: "${PAGE_DESIGNS_FOLDER}"
Template: "${T_PAGE_DESIGN}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Page Designs/Default"
SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${PARTIAL_HEADER}|${PARTIAL_FOOTER}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

writeFileSync(
  join(PRESENTATION_ROOT, 'Page Designs/CarModel.yml'),
  `---
ID: "${PAGE_DESIGN_CAR_MODEL}"
Parent: "${PAGE_DESIGNS_FOLDER}"
Template: "${T_PAGE_DESIGN}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Page Designs/CarModel"
SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${PARTIAL_HEADER}|${PARTIAL_FOOTER}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

writeFileSync(
  join(PRESENTATION_ROOT, 'Placeholder Settings/Partial Design/Header.yml'),
  `---
ID: "${PH_SXA_HEADER}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PLACEHOLDER_SETTING}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Placeholder Settings/Partial Design/Header"
SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: "sxa-header"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

writeFileSync(
  join(PRESENTATION_ROOT, 'Placeholder Settings/Partial Design/Footer.yml'),
  `---
ID: "${PH_SXA_FOOTER}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PLACEHOLDER_SETTING}"
Path: "/sitecore/content/automobile/astonmartin/Presentation/Placeholder Settings/Partial Design/Footer"
SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: "sxa-footer"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

const mapping = templatesMapping(
  [PAGE_TEMPLATE, PAGE_DESIGN_DEFAULT],
  [CAR_MODEL_TEMPLATE, PAGE_DESIGN_CAR_MODEL]
);

const pageDesignsFolderPath = join(PRESENTATION_ROOT, 'Page Designs.yml');
let pageDesignsFolder = readFileSync(pageDesignsFolderPath, 'utf8');
const mappingBlock = `- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: TemplatesMapping
  Value: "${mapping}"`;
if (/Hint: TemplatesMapping/.test(pageDesignsFolder)) {
  pageDesignsFolder = pageDesignsFolder.replace(
    /- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"\r?\n  Hint: TemplatesMapping\r?\n  Value: "[^"]*"/,
    mappingBlock
  );
} else {
  pageDesignsFolder = pageDesignsFolder.replace(/SharedFields:\r?\n/, `SharedFields:\n${mappingBlock}\n`);
}
writeFileSync(pageDesignsFolderPath, pageDesignsFolder);

writeFileSync(
  join(TEMPLATES_AUTO, 'CarModel.yml'),
  `---
ID: "${CAR_MODEL_TEMPLATE}"
Parent: "${TEMPLATES_PROJECT}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/automobile/CarModel"
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/car.png
- ID: "12c33f3f-86c5-43a5-aeb4-5598cec45116"
  Hint: __Base template
  Value: |
    {47151711-26CA-434E-8132-D3E0B7D26683}
    {371D5FBB-5498-4D94-AB2B-E3B70EEBE78C}
    {F39A594A-7BC9-4DB0-BAA1-88543409C1F9}
    {6650FB34-7EA1-4245-A919-5CC0F002A6D7}
    {4414A1F9-826A-4647-8DF4-ED6A95E64C43}
- ID: "f7d48a55-2158-4f02-9356-756654404f73"
  Hint: __Standard values
  Value: "{${CAR_MODEL_STD_VALUES.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

mkdirSync(join(TEMPLATES_AUTO, 'CarModel'), { recursive: true });
writeFileSync(
  join(TEMPLATES_AUTO, 'CarModel/__Standard Values.yml'),
  `---
ID: "${CAR_MODEL_STD_VALUES}"
Parent: "${CAR_MODEL_TEMPLATE}"
Template: "${CAR_MODEL_TEMPLATE}"
Path: "/sitecore/templates/Project/automobile/CarModel/__Standard Values"
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${PAGE_DESIGN_CAR_MODEL.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260802T120000Z
`
);

console.log('Authoring complete');
console.log({
  MODELS_ID,
  DB12_ID,
  CONFIG_ID,
  PAGE_DESIGN_DEFAULT,
  PAGE_DESIGN_CAR_MODEL,
  PARTIAL_HEADER,
  PARTIAL_FOOTER,
  CAR_MODEL_TEMPLATE,
  Q_ID,
  OWNERS_ID,
  OUR_WORLD_ID,
  EXPERIENCES_ID,
  DEALERS_ID,
  modelCount: MODELS.length,
  familyCount: FAMILIES.length,
  fieldCount: Object.keys(FIELDS).length,
});
