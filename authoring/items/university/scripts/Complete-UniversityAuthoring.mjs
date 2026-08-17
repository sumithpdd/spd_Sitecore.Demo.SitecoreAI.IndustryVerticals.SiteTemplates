/**
 * University vertical — story pages, renderings, Header/Footer partials + Default page design.
 * Design inspired by reading.ac.uk; site/system name is university.
 * Run from repo root:
 *   node authoring/items/university/scripts/Complete-UniversityAuthoring.mjs
 */
import { createHash } from 'crypto';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '../../../..');
const SITE = join(REPO, 'authoring/items/university/serialized-content/university/university');
const RENDERINGS = join(REPO, 'authoring/items/university/serialized-content/renderings/university');
const TEMPLATES = join(REPO, 'authoring/items/university/serialized-content/templates/university');
const PRESENTATION = join(SITE, 'Presentation');
const DATA = join(SITE, 'Data');
const DATA_ROOT = '83eec8b2-d9bd-4674-a384-d660a059246c';

const HOME_ID = '703dddf9-eb5c-4ac6-a302-782bd95ae5a5';
const PAGE_TEMPLATE = '0ec53ec2-49d0-4d53-ab5f-009b4382d19e';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const TEMPLATES_PROJECT = '8db7d884-16ea-4677-bed4-2754addafd68';
const RENDERINGS_PARENT = '36469edb-01e8-476d-bc60-d8f2e7c07bcd';
const PARTIAL_DESIGNS_FOLDER = 'b3538fd9-8f7c-4eb4-94ea-85d516f6ae3a';
const PAGE_DESIGNS_FOLDER = 'e2dae0b6-c4c8-4b6c-82d4-747c0c6400a7';
const PH_PARTIAL_FOLDER = 'e274d25f-62b1-4ba3-9254-0150cc70ce2b';

const DEVICE_ID = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';
const T_PARTIAL_DESIGN = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_PLACEHOLDER_SETTING = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const RENDERING_TEMPLATE = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';

const TITLE_FIELD = '6f30e435-6b05-4a47-be1e-60b3184b4a9e';
const NAV_TITLE_FIELD = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';

/** Stable GUID prefix unique to university site (avoid collisions with automobile a1e1…). */
function stableId(key) {
  const h = createHash('sha256').update(`university-site:${key}`).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const R = {
  Header: '7522d7a9-2710-4d28-a0d8-300832b3813d',
  Navigation: '71eb1a52-ab98-49f3-a213-3a75d2e2d7dd',
  Footer: '985a37b4-2427-4627-98ed-ae4eb5cd8e8d',
  HeroBanner: 'd54b7141-bec1-4dc1-bd32-1624ce2c0d5d',
  Promo: 'c9b9fff8-24a8-4e70-97c8-f391753b0ea1',
  PromoTileGrid: 'a76f57a1-37be-4924-9e72-36559d899d27',
  SiteSearch: '40568997-0590-4216-afca-3001e7c6f310',
  StatsGlance: 'c1e20001-1111-4000-8000-000000000005',
  ClearingHub: 'c1e20001-1111-4000-8000-000000000006',
  ClearingApply: 'c1e20001-1111-4000-8000-000000000007',
  CourseCsAi: 'c1e20001-1111-4000-8000-000000000008',
  StudyLife: 'c1e20001-1111-4000-8000-000000000009',
  Accommodation: 'c1e20001-1111-4000-8000-00000000000a',
  CourseListing: 'e6abc988-2f73-4bfa-8f69-a7e05aa407b3',
  CourseNextSteps: 'd414cf82-0c30-4485-b9dd-760cc2886ce2',
};

const T = {
  Header: 'd9840e5c-1066-4a51-8ea7-87bebf140eb1',
  HeaderFolder: '944f6bc8-a79f-4235-b9d4-3bb88a76a9fa',
  Navigation: '28b092ab-7322-43e7-b323-df9308801133',
  NavigationFolder: '2786b313-dc9e-49ce-8401-16991a63ea1a',
  Footer: '5e1c5d9a-42fb-4328-9985-0c04306edf1c',
  FooterFolder: '7e8a9ea9-6182-4653-9643-fa6ede6afd1f',
  HeroBanner: 'd1aef453-384e-4b19-b9e9-bf8b90ddcd03',
  HeroBannerFolder: '08813e4b-93bc-4a3c-b203-0b16cb740971',
  Promo: '03123338-9d7b-48d9-9c84-98226fc1e21e',
  PromoFolder: '1fbbcbae-a38d-46fc-b890-5364593c30fc',
  PromoTileGrid: '5305470e-7807-473c-a190-afd073b49651',
  PromoTileGridFolder: 'f1c60799-9108-4937-859b-6ad6297a7199',
  SiteSearch: '42172adf-d7f8-47f0-901d-8448e9926d6b',
  SiteSearchFolder: '49eec32e-072f-4b85-a6a2-2c30930ab9bb',
  CourseListing: 'f8df8f11-f7ba-49d2-9bba-115fd7efd37f',
  CourseListingFolder: '82f6bb06-895c-4f11-8a93-36dcd93dc2fb',
  CourseNextSteps: '06debcc5-af81-4474-be8c-b0d8fe0bde99',
  CourseNextStepsFolder: 'd9652c03-fe25-4266-aa5b-6f31ff2733b2',
};

const PAGES = {
  clearing: 'c1e20001-2222-4000-8000-000000000001',
  howToApply: 'c1e20001-2222-4000-8000-000000000002',
  course: 'c1e20001-2222-4000-8000-000000000003',
  studyLife: 'c1e20001-2222-4000-8000-000000000004',
  accommodation: 'c1e20001-2222-4000-8000-000000000005',
  search: 'c1e20001-2222-4000-8000-000000000006',
  coursesFolder: 'c1e20001-2222-4000-8000-000000000007',
  business: stableId('page-business-and-management'),
};

const PARTIAL_HEADER = stableId('pd-header');
const PARTIAL_FOOTER = stableId('pd-footer');
const PARTIAL_COURSE = stableId('pd-course-chrome');
const PAGE_DESIGN_DEFAULT = stableId('page-design-default');
const PAGE_DESIGN_COURSE = stableId('page-design-course');
const COURSE_TEMPLATE = stableId('course-page-template');
const COURSE_STD_VALUES = stableId('course-page-std-values');
const PH_SXA_HEADER = stableId('ph-sxa-header');
const PH_SXA_FOOTER = stableId('ph-sxa-footer');
const UID_PD_HEADER = stableId('uid-pd-header-r');
const UID_PD_FOOTER = stableId('uid-pd-footer-r');
const UID_PD_NAV = stableId('uid-pd-nav-r');
const UID_PD_COURSE_NEXT = stableId('uid-pd-course-next');

function escapePar(par) {
  return par.replace(/&/g, '&amp;');
}
function encGuid(g) {
  return `%7B${g.toUpperCase()}%7D`;
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
    if (!id || !p || !p.includes('/university/')) continue;
    const parts = p.split('/');
    const compIdx = parts.findIndex((x) => x.endsWith(' Templates'));
    if (compIdx < 0) continue;
    const afterComp = parts.slice(compIdx + 2);
    if (afterComp.length !== 2) continue;
    const fieldName = afterComp[1];
    const comp = parts[compIdx].replace(/ Templates$/, '');
    map[`${comp}/${fieldName}`] = id;
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

function fields(...list) {
  return list.filter(Boolean).join('\n');
}

function intLink(text, url, id) {
  return `<link class="" querystring="" id="${id}" anchor="" target="" title="" linktype="internal" text="${text}" url="${url}" />`;
}

function folderYaml(id, name, parent, template) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: "/sitecore/content/university/university/Data/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
`;
}

function dsYaml({ id, name, folder, folderId, template, fields: fieldList }) {
  return `---
ID: "${id}"
Parent: "${folderId}"
Template: "${template}"
Path: "/sitecore/content/university/university/Data/${folder}/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
${fieldList}
`;
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
  const ds = opts.dsId ? `\n          s:ds="{${opts.dsId.toUpperCase()}}"` : '';
  return `        <r
          uid="{${opts.uid.toUpperCase()}}"
          ${pos}${ds}
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

function renderingYaml(id, name) {
  return `---
ID: "${id}"
Parent: "${RENDERINGS_PARENT}"
Template: "${RENDERING_TEMPLATE}"
Path: /sitecore/layout/Renderings/Project/university/${name}
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${name}
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "7d8ae35f-9ed1-43b5-96a2-0a5f040d4e4e"
  Hint: Open Properties after Add
  Value: 0
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260813T120000Z
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

function pageYaml({ id, parent, pathSeg, title, renderingsXml, pageDesignId, templateId = PAGE_TEMPLATE }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: "/sitecore/content/university/university/${pathSeg}"
SharedFields:
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${pageDesignId.toUpperCase()}}"
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
      Value: 20260813T120000Z
    - ID: "${NAV_TITLE_FIELD}"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "${TITLE_FIELD}"
      Hint: Title
      Value: "${title}"
`;
}

function uid(seed) {
  return stableId(`uid-${seed}`);
}

mkdirSync(RENDERINGS, { recursive: true });
mkdirSync(join(SITE, 'Home'), { recursive: true });
mkdirSync(join(SITE, 'Home/clearing'), { recursive: true });
mkdirSync(join(SITE, 'Home/courses'), { recursive: true });
mkdirSync(join(PRESENTATION, 'Partial Designs'), { recursive: true });
mkdirSync(join(PRESENTATION, 'Page Designs'), { recursive: true });
mkdirSync(join(PRESENTATION, 'Placeholder Settings', 'Partial Design'), { recursive: true });
mkdirSync(DATA, { recursive: true });

const STUB_RENDERINGS = ['StatsGlance', 'ClearingHub', 'ClearingApply', 'CourseCsAi', 'StudyLife', 'Accommodation'];
for (const key of STUB_RENDERINGS) {
  writeFileSync(join(RENDERINGS, `${key}.yml`), renderingYaml(R[key], key));
}

const folders = {
  Headers: stableId('folder-headers'),
  Navigations: stableId('folder-navs'),
  Footers: stableId('folder-footers'),
  'Hero Banners': stableId('folder-heroes'),
  'Promo Datasources': 'b1fc6d63-375a-44db-ad52-641223f5fba7',
  'Promo Tile Grids': stableId('folder-promo-grids'),
  Searches: stableId('folder-searches'),
  'Course Listings': stableId('folder-course-listings'),
  'Course Next Steps': stableId('folder-course-next-steps'),
};

const ids = {
  header: stableId('ds-header'),
  navigation: stableId('ds-navigation'),
  footer: stableId('ds-footer'),
  homeHero: stableId('ds-home-hero'),
  promoGrid: stableId('ds-promo-grid'),
  search: stableId('ds-search'),
  promoCourses: stableId('ds-promo-courses'),
  courseListing: stableId('ds-course-listing-business'),
  courseNextSteps: stableId('ds-course-next-steps'),
};

writeFileSync(join(DATA, 'Headers.yml'), folderYaml(folders.Headers, 'Headers', DATA_ROOT, T.HeaderFolder));
writeFileSync(join(DATA, 'Navigations.yml'), folderYaml(folders.Navigations, 'Navigations', DATA_ROOT, T.NavigationFolder));
writeFileSync(join(DATA, 'Footers.yml'), folderYaml(folders.Footers, 'Footers', DATA_ROOT, T.FooterFolder));
writeFileSync(join(DATA, 'Hero Banners.yml'), folderYaml(folders['Hero Banners'], 'Hero Banners', DATA_ROOT, T.HeroBannerFolder));
writeFileSync(join(DATA, 'Promo Datasources.yml'), folderYaml(folders['Promo Datasources'], 'Promo Datasources', DATA_ROOT, T.PromoFolder));
writeFileSync(join(DATA, 'Promo Tile Grids.yml'), folderYaml(folders['Promo Tile Grids'], 'Promo Tile Grids', DATA_ROOT, T.PromoTileGridFolder));
writeFileSync(join(DATA, 'Searches.yml'), folderYaml(folders.Searches, 'Searches', DATA_ROOT, T.SiteSearchFolder));
writeFileSync(
  join(DATA, 'Course Listings.yml'),
  folderYaml(folders['Course Listings'], 'Course Listings', DATA_ROOT, T.CourseListingFolder)
);
writeFileSync(
  join(DATA, 'Course Next Steps.yml'),
  folderYaml(folders['Course Next Steps'], 'Course Next Steps', DATA_ROOT, T.CourseNextStepsFolder)
);

mkdirSync(join(DATA, 'Headers'), { recursive: true });
mkdirSync(join(DATA, 'Navigations'), { recursive: true });
mkdirSync(join(DATA, 'Footers'), { recursive: true });
mkdirSync(join(DATA, 'Hero Banners'), { recursive: true });
mkdirSync(join(DATA, 'Promo Datasources'), { recursive: true });
mkdirSync(join(DATA, 'Promo Tile Grids'), { recursive: true });
mkdirSync(join(DATA, 'Searches'), { recursive: true });
mkdirSync(join(DATA, 'Course Listings'), { recursive: true });
mkdirSync(join(DATA, 'Course Next Steps'), { recursive: true });

writeFileSync(
  join(DATA, 'Headers/Site Header.yml'),
  dsYaml({
    id: ids.header,
    name: 'Site Header',
    folder: 'Headers',
    folderId: folders.Headers,
    template: T.Header,
    fields: fields(
      field('Header', 'BrandName', 'University'),
      field('Header', 'SearchPlaceholder', 'Search'),
      field('Header', 'ApplyLink', intLink('Apply', '/clearing', PAGES.clearing)),
      field('Header', 'AudienceApplicants', intLink('Applicants', '/clearing', PAGES.clearing)),
      field('Header', 'AudienceStudents', intLink('Students', '/study-and-life', PAGES.studyLife)),
      field('Header', 'AudienceStaff', intLink('Staff', '/search', PAGES.search)),
      field('Header', 'AudienceAlumni', intLink('Alumni', '/', HOME_ID))
    ),
  })
);

writeFileSync(
  join(DATA, 'Navigations/Main Navigation.yml'),
  dsYaml({
    id: ids.navigation,
    name: 'Main Navigation',
    folder: 'Navigations',
    folderId: folders.Navigations,
    template: T.Navigation,
    fields: fields(
      field('Navigation', 'ClearingLink', intLink('Clearing', '/clearing', PAGES.clearing)),
      field('Navigation', 'StudyLifeLink', intLink('Study and life', '/study-and-life', PAGES.studyLife)),
      field('Navigation', 'ResearchLink', intLink('Research', '/search', PAGES.search)),
      field('Navigation', 'AboutLink', intLink('About us', '/search', PAGES.search)),
      field('Navigation', 'ContactLink', intLink('Contact us', '/clearing', PAGES.clearing)),
      field('Navigation', 'HotlineText', 'Call to apply through Clearing'),
      field('Navigation', 'HotlinePhone', '+44 (0) 118 402 0900'),
      field('Navigation', 'HotlineLink', intLink('Clearing', '/clearing', PAGES.clearing))
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
      field('Footer', 'Title', 'University'),
      field('Footer', 'Address', '<p>Whiteknights<br />PO Box 217<br />Reading<br />RG6 6AH<br />United Kingdom</p>'),
      field('Footer', 'Phone', '+44 (0) 118 402 0900'),
      field('Footer', 'Copyright', '© University. Demo site for SitecoreAI.'),
      field('Footer', 'ExploreTitle', 'Explore'),
      field('Footer', 'LinkOne', intLink('Clearing', '/clearing', PAGES.clearing)),
      field('Footer', 'LinkTwo', intLink('How to apply', '/clearing/how-to-apply', PAGES.howToApply)),
      field('Footer', 'LinkThree', intLink('Courses', '/courses/computer-science-and-ai', PAGES.course)),
      field('Footer', 'LinkFour', intLink('Accommodation', '/accommodation', PAGES.accommodation)),
      field('Footer', 'HotlineTitle', 'Clearing hotline'),
      field('Footer', 'HotlineDescription', '<p>Speak to our advisors about courses, accommodation, and applying through Clearing.</p>'),
      field('Footer', 'HotlineLink', intLink('Apply through Clearing', '/clearing', PAGES.clearing))
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
      field('HeroBanner', 'Eyebrow', 'Clearing 2026'),
      field('HeroBanner', 'Title', 'Apply now · Call +44 (0) 118 402 0900'),
      field('HeroBanner', 'Description', '<p>Places are still available. Explore courses, talk to our hotline, and apply online.</p>'),
      field('HeroBanner', 'CtaLink', intLink('Apply now', '/clearing', PAGES.clearing)),
      field('HeroBanner', 'SecondaryCtaLink', intLink('How to apply', '/clearing/how-to-apply', PAGES.howToApply))
    ),
  })
);

writeFileSync(
  join(DATA, 'Promo Tile Grids/Are you ready.yml'),
  dsYaml({
    id: ids.promoGrid,
    name: 'Are you ready',
    folder: 'Promo Tile Grids',
    folderId: folders['Promo Tile Grids'],
    template: T.PromoTileGrid,
    fields: fields(
      field('PromoTileGrid', 'Title', 'Are you ready?'),
      field('PromoTileGrid', 'Description', '<p>Explore what it is like to study, live, and thrive at University.</p>'),
      field('PromoTileGrid', 'TileOneTitle', 'Courses'),
      field('PromoTileGrid', 'TileOneDescription', 'Find undergraduate and postgraduate programmes that fit your ambitions.'),
      field('PromoTileGrid', 'TileOneLink', intLink('Find your subject', '/courses/business-and-management', PAGES.business)),
      field('PromoTileGrid', 'TileTwoTitle', 'Student life'),
      field('PromoTileGrid', 'TileTwoDescription', 'Campus community, societies, sport, and everything beyond the lecture theatre.'),
      field('PromoTileGrid', 'TileTwoLink', intLink('See what we offer', '/study-and-life', PAGES.studyLife)),
      field('PromoTileGrid', 'TileThreeTitle', 'Chat to students'),
      field('PromoTileGrid', 'TileThreeDescription', 'Hear from current students about studying and living here.'),
      field('PromoTileGrid', 'TileThreeLink', intLink('Ask a student', '/study-and-life', PAGES.studyLife)),
      field('PromoTileGrid', 'TileFourTitle', 'Accommodation'),
      field('PromoTileGrid', 'TileFourDescription', 'Halls options across campus — including Clearing guarantees.'),
      field('PromoTileGrid', 'TileFourLink', intLink('Find your accommodation', '/accommodation', PAGES.accommodation))
    ),
  })
);

writeFileSync(
  join(DATA, 'Promo Datasources/Great course options.yml'),
  dsYaml({
    id: ids.promoCourses,
    name: 'Great course options',
    folder: 'Promo Datasources',
    folderId: folders['Promo Datasources'],
    template: T.Promo,
    fields: fields(
      field('Promo', 'PromoSubTitle', 'Study'),
      field('Promo', 'PromoTitle', 'Great course options'),
      field('Promo', 'PromoDescription', '<p>Learn more about the subject you are passionate about from world-class experts.</p>'),
      field('Promo', 'PromoMoreInfo', intLink('Find your subject', '/courses/business-and-management', PAGES.business))
    ),
  })
);

writeFileSync(
  join(DATA, 'Searches/Site Search.yml'),
  dsYaml({
    id: ids.search,
    name: 'Site Search',
    folder: 'Searches',
    folderId: folders.Searches,
    template: T.SiteSearch,
    fields: fields(
      field('SiteSearch', 'Title', 'Search'),
      field('SiteSearch', 'Description', 'Find courses and pages across this University demo.'),
      field('SiteSearch', 'SearchPlaceholder', 'e.g. Clearing, Computer Science, accommodation')
    ),
  })
);

writeFileSync(
  join(DATA, 'Course Listings/Business and Management.yml'),
  dsYaml({
    id: ids.courseListing,
    name: 'Business and Management',
    folder: 'Course Listings',
    folderId: folders['Course Listings'],
    template: T.CourseListing,
    fields: fields(
      field('CourseListing', 'Title', 'Business and Management'),
      field('CourseListing', 'SeeOtherSubjectsLabel', 'See the other subjects we offer'),
      field('CourseListing', 'SeeOtherSubjectsLink', intLink('See the other subjects we offer', '/courses', PAGES.coursesFolder)),
      field('CourseListing', 'VideoTitle', 'Why study Business and Management at Reading?'),
      field(
        'CourseListing',
        'Intro',
        '<p>Study with Henley Business School and you will be part of a global, high-calibre learning community that will equip you for success in the business world.</p>'
      ),
      field('CourseListing', 'WorldClassTitle', 'World-class institution'),
      field(
        'CourseListing',
        'WorldClassBody',
        '<p>Henley Business School holds triple-accredited status from AMBA, EQUIS and AACSB. Academics and industry experts help you gain skills for accounting, consultancy, HR, IT, marketing, operations and general management.</p>'
      ),
      field('CourseListing', 'AwardWinningTitle', 'Award-winning location'),
      field(
        'CourseListing',
        'AwardWinningBody',
        '<p>Based at Whiteknights campus in the heart of the UK Silicon Valley, with strong employer relationships, regular industry events, and a parkland campus awarded the Green Flag Award.</p>'
      ),
      field('CourseListing', 'CoursesHeading', 'Courses'),
      field('CourseListing', 'ContextualOffersTitle', 'Contextual offers'),
      field('CourseListing', 'ContextualOffersBody', '<p>We make contextual offers for all our courses.</p>')
    ),
  })
);

writeFileSync(
  join(DATA, 'Course Next Steps/Course chrome.yml'),
  dsYaml({
    id: ids.courseNextSteps,
    name: 'Course chrome',
    folder: 'Course Next Steps',
    folderId: folders['Course Next Steps'],
    template: T.CourseNextSteps,
    fields: fields(
      field('CourseNextSteps', 'RelatedTitle', 'Related Subjects'),
      field('CourseNextSteps', 'RelatedOne', intLink('Finance', '/search', PAGES.search)),
      field('CourseNextSteps', 'RelatedTwo', intLink('Accounting', '/search', PAGES.search)),
      field('CourseNextSteps', 'RelatedThree', intLink('Consumer Behaviour and Marketing', '/search', PAGES.search)),
      field('CourseNextSteps', 'RelatedFour', intLink('Real Estate and Planning', '/search', PAGES.search)),
      field('CourseNextSteps', 'RelatedFive', intLink('Economics', '/search', PAGES.search)),
      field('CourseNextSteps', 'NextStepsTitle', 'Ready for more?'),
      field('CourseNextSteps', 'NextStepOne', intLink('Visit an Open Day', '/study-and-life', PAGES.studyLife)),
      field('CourseNextSteps', 'NextStepTwo', intLink('View courses', '/courses', PAGES.coursesFolder)),
      field('CourseNextSteps', 'NextStepThree', intLink('How to apply', '/clearing/how-to-apply', PAGES.howToApply)),
      field('CourseNextSteps', 'NextStepFour', intLink('Find us', '/accommodation', PAGES.accommodation))
    ),
  })
);

const headerPartialLayout = layout([
  rEntryDefault({
    uid: UID_PD_HEADER,
    renderingId: R.Header,
    dsId: ids.header,
    ph: 'headless-header',
    before: '*',
    dyn: 1,
  }),
  rEntryDefault({
    uid: UID_PD_NAV,
    renderingId: R.Navigation,
    dsId: ids.navigation,
    ph: 'headless-header',
    after: UID_PD_HEADER,
    dyn: 2,
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

writeFileSync(
  join(PRESENTATION, 'Partial Designs/Header.yml'),
  `---
ID: "${PARTIAL_HEADER}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL_DESIGN}"
Path: "/sitecore/content/university/university/Presentation/Partial Designs/Header"
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
      Value: 20260813T120000Z
`
);

writeFileSync(
  join(PRESENTATION, 'Partial Designs/Footer.yml'),
  `---
ID: "${PARTIAL_FOOTER}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL_DESIGN}"
Path: "/sitecore/content/university/university/Presentation/Partial Designs/Footer"
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
      Value: 20260813T120000Z
`
);

const courseChromeLayout = layout([
  rEntryDefault({
    uid: UID_PD_COURSE_NEXT,
    renderingId: R.CourseNextSteps,
    dsId: ids.courseNextSteps,
    ph: 'headless-footer',
    before: '*',
    dyn: 1,
  }),
]);

writeFileSync(
  join(PRESENTATION, 'Partial Designs/Course chrome.yml'),
  `---
ID: "${PARTIAL_COURSE}"
Parent: "${PARTIAL_DESIGNS_FOLDER}"
Template: "${T_PARTIAL_DESIGN}"
Path: "/sitecore/content/university/university/Presentation/Partial Designs/Course chrome"
SharedFields:
- ID: "55faae90-3bba-4f7f-96fe-13c3f40055ff"
  Hint: Signature
  Value: course-chrome
- ID: "f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e"
  Hint: __Renderings
  Value: |
${courseChromeLayout}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
`
);

writeFileSync(
  join(PRESENTATION, 'Page Designs/Default.yml'),
  `---
ID: "${PAGE_DESIGN_DEFAULT}"
Parent: "${PAGE_DESIGNS_FOLDER}"
Template: "${T_PAGE_DESIGN}"
Path: "/sitecore/content/university/university/Presentation/Page Designs/Default"
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
      Value: 20260813T120000Z
`
);

writeFileSync(
  join(PRESENTATION, 'Page Designs/Course.yml'),
  `---
ID: "${PAGE_DESIGN_COURSE}"
Parent: "${PAGE_DESIGNS_FOLDER}"
Template: "${T_PAGE_DESIGN}"
Path: "/sitecore/content/university/university/Presentation/Page Designs/Course"
SharedFields:
- ID: "0966b999-0d0e-4278-acc9-9da69d461fe6"
  Hint: PartialDesigns
  Value: "${PARTIAL_HEADER}|${PARTIAL_COURSE}|${PARTIAL_FOOTER}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
`
);

writeFileSync(
  join(PRESENTATION, 'Placeholder Settings/Partial Design/Header.yml'),
  `---
ID: "${PH_SXA_HEADER}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PLACEHOLDER_SETTING}"
Path: "/sitecore/content/university/university/Presentation/Placeholder Settings/Partial Design/Header"
SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: sxa-header
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260813T120000Z
`
);

writeFileSync(
  join(PRESENTATION, 'Placeholder Settings/Partial Design/Footer.yml'),
  `---
ID: "${PH_SXA_FOOTER}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PLACEHOLDER_SETTING}"
Path: "/sitecore/content/university/university/Presentation/Placeholder Settings/Partial Design/Footer"
SharedFields:
- ID: "7256bdab-1fd2-49dd-b205-cb4873d2917c"
  Hint: Placeholder Key
  Value: sxa-footer
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260813T120000Z
`
);

const homeUids = [uid('home-1'), uid('home-2'), uid('home-3')];
writeFileSync(
  join(SITE, 'Home.yml'),
  pageYaml({
    id: HOME_ID,
    parent: 'a28ad1d2-c3fa-46aa-9474-08c1d58b06b9',
    pathSeg: 'Home',
    title: 'University',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: homeUids[0],
        renderingId: R.HeroBanner,
        dsId: ids.homeHero,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
      rEntryDefault({
        uid: homeUids[1],
        renderingId: R.PromoTileGrid,
        dsId: ids.promoGrid,
        ph: 'headless-main',
        after: homeUids[0],
        dyn: 2,
      }),
      rEntryDefault({
        uid: homeUids[2],
        renderingId: R.StatsGlance,
        ph: 'headless-main',
        after: homeUids[1],
        dyn: 3,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/clearing.yml'),
  pageYaml({
    id: PAGES.clearing,
    parent: HOME_ID,
    pathSeg: 'Home/clearing',
    title: 'Clearing',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('clearing'),
        renderingId: R.ClearingHub,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/clearing/how-to-apply.yml'),
  pageYaml({
    id: PAGES.howToApply,
    parent: PAGES.clearing,
    pathSeg: 'Home/clearing/how-to-apply',
    title: 'Make your application',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('apply'),
        renderingId: R.ClearingApply,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/courses.yml'),
  pageYaml({
    id: PAGES.coursesFolder,
    parent: HOME_ID,
    pathSeg: 'Home/courses',
    title: 'Courses',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('courses-hub'),
        renderingId: R.PromoTileGrid,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/courses/computer-science-and-ai.yml'),
  pageYaml({
    id: PAGES.course,
    parent: PAGES.coursesFolder,
    pathSeg: 'Home/courses/computer-science-and-ai',
    title: 'Computer Science and AI',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('course'),
        renderingId: R.CourseCsAi,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/courses/business-and-management.yml'),
  pageYaml({
    id: PAGES.business,
    parent: PAGES.coursesFolder,
    pathSeg: 'Home/courses/business-and-management',
    title: 'Business and Management',
    templateId: COURSE_TEMPLATE,
    pageDesignId: PAGE_DESIGN_COURSE,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('course-listing-business'),
        renderingId: R.CourseListing,
        dsId: ids.courseListing,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/study-and-life.yml'),
  pageYaml({
    id: PAGES.studyLife,
    parent: HOME_ID,
    pathSeg: 'Home/study-and-life',
    title: 'Study and life',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('study'),
        renderingId: R.StudyLife,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/accommodation.yml'),
  pageYaml({
    id: PAGES.accommodation,
    parent: HOME_ID,
    pathSeg: 'Home/accommodation',
    title: 'Accommodation',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('accommodation'),
        renderingId: R.Accommodation,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

writeFileSync(
  join(SITE, 'Home/search.yml'),
  pageYaml({
    id: PAGES.search,
    parent: HOME_ID,
    pathSeg: 'Home/search',
    title: 'Search',
    pageDesignId: PAGE_DESIGN_DEFAULT,
    renderingsXml: layout([
      rEntryDefault({
        uid: uid('search'),
        renderingId: R.SiteSearch,
        dsId: ids.search,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

mkdirSync(join(TEMPLATES, 'Course'), { recursive: true });
writeFileSync(
  join(TEMPLATES, 'Course.yml'),
  `---
ID: "${COURSE_TEMPLATE}"
Parent: "${TEMPLATES_PROJECT}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/university/Course"
SharedFields:
- ID: "06d5295c-ed2f-4a54-9bf2-26228d113318"
  Hint: __Icon
  Value: Office/32x32/book_open.png
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
  Value: "{${COURSE_STD_VALUES.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
`
);

writeFileSync(
  join(TEMPLATES, 'Course/__Standard Values.yml'),
  `---
ID: "${COURSE_STD_VALUES}"
Parent: "${COURSE_TEMPLATE}"
Template: "${COURSE_TEMPLATE}"
Path: "/sitecore/templates/Project/university/Course/__Standard Values"
SharedFields:
- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: |
    {${PAGE_TEMPLATE.toUpperCase()}}
    {${COURSE_TEMPLATE.toUpperCase()}}
- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${PAGE_DESIGN_COURSE.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
    - ID: "${TITLE_FIELD}"
      Hint: Title
      Value: $name
`
);

const mapping = templatesMapping(
  [PAGE_TEMPLATE, PAGE_DESIGN_DEFAULT],
  [COURSE_TEMPLATE, PAGE_DESIGN_COURSE]
);
const pageDesignsFolderPath = join(PRESENTATION, 'Page Designs.yml');
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

const pageStdPath = join(TEMPLATES, 'Page/__Standard Values.yml');
let pageStd = readFileSync(pageStdPath, 'utf8');
const mastersBlock = `- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"
  Hint: __Masters
  Value: |
    {${PAGE_TEMPLATE.toUpperCase()}}
    {C14B6289-8AC2-439C-9E5B-40DE9F820C3F}
    {${COURSE_TEMPLATE.toUpperCase()}}`;
if (/Hint: __Masters/.test(pageStd)) {
  pageStd = pageStd.replace(
    /- ID: "1172f251-dad4-4efb-a329-0c63500e4f1e"\r?\n  Hint: __Masters\r?\n  Value: \|(\r?\n    \{[0-9A-Fa-f-]+\})+/m,
    mastersBlock
  );
  writeFileSync(pageStdPath, pageStd);
}

writeFileSync(
  join(PRESENTATION, 'Available Renderings/University.yml'),
  `---
ID: "${stableId('available-renderings-university')}"
Parent: "3ce58fba-9378-4ced-8ee6-6f96e2a97c59"
Template: "76da0a8d-fc7e-42b2-af1e-205b49e43f98"
Path: "/sitecore/content/university/university/Presentation/Available Renderings/University"
SharedFields:
- ID: "715ae6c0-71c8-4744-ab4f-65362d20ad65"
  Hint: Renderings
  Value: |
    {${R.Header.toUpperCase()}}
    {${R.Navigation.toUpperCase()}}
    {${R.Footer.toUpperCase()}}
    {${R.HeroBanner.toUpperCase()}}
    {${R.Promo.toUpperCase()}}
    {${R.PromoTileGrid.toUpperCase()}}
    {${R.CourseListing.toUpperCase()}}
    {${R.CourseNextSteps.toUpperCase()}}
    {${R.SiteSearch.toUpperCase()}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: 20260817T120000Z
`
);

console.log('University authoring complete.');
console.log('  Renderings:', Object.keys(R).join(', '));
console.log('  Pages: Home, clearing, how-to-apply, courses/cs-ai, courses/business-and-management, study-and-life, accommodation, search');
console.log('  Partial Designs: Header, Footer, Course chrome');
console.log('  Page Designs: Default (Page), Course (Course template)');
console.log('Next: dotnet sitecore serialization push -n <env> -i university-scs');
