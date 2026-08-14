/**
 * University vertical — story pages, renderings, Header/Footer partials + Default page design.
 * Design inspired by reading.ac.uk; site/system name is university.
 * Run from repo root:
 *   node authoring/items/university/scripts/Complete-UniversityAuthoring.mjs
 */
import { createHash } from 'crypto';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '../../../..');
const SITE = join(REPO, 'authoring/items/university/serialized-content/university/university');
const RENDERINGS = join(REPO, 'authoring/items/university/serialized-content/renderings/university');
const PRESENTATION = join(SITE, 'Presentation');

const HOME_ID = '703dddf9-eb5c-4ac6-a302-782bd95ae5a5';
const PAGE_TEMPLATE = '0ec53ec2-49d0-4d53-ab5f-009b4382d19e';
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
  SiteHeader: 'c1e20001-1111-4000-8000-000000000001',
  SiteFooter: 'c1e20001-1111-4000-8000-000000000002',
  HomeHero: 'c1e20001-1111-4000-8000-000000000003',
  PromoTileGrid: 'c1e20001-1111-4000-8000-000000000004',
  StatsGlance: 'c1e20001-1111-4000-8000-000000000005',
  ClearingHub: 'c1e20001-1111-4000-8000-000000000006',
  ClearingApply: 'c1e20001-1111-4000-8000-000000000007',
  CourseCsAi: 'c1e20001-1111-4000-8000-000000000008',
  StudyLife: 'c1e20001-1111-4000-8000-000000000009',
  Accommodation: 'c1e20001-1111-4000-8000-00000000000a',
  SiteSearch: 'c1e20001-1111-4000-8000-00000000000b',
};

const PAGES = {
  clearing: 'c1e20001-2222-4000-8000-000000000001',
  howToApply: 'c1e20001-2222-4000-8000-000000000002',
  course: 'c1e20001-2222-4000-8000-000000000003',
  studyLife: 'c1e20001-2222-4000-8000-000000000004',
  accommodation: 'c1e20001-2222-4000-8000-000000000005',
  search: 'c1e20001-2222-4000-8000-000000000006',
  coursesFolder: 'c1e20001-2222-4000-8000-000000000007',
};

const PARTIAL_HEADER = stableId('pd-header');
const PARTIAL_FOOTER = stableId('pd-footer');
const PAGE_DESIGN_DEFAULT = stableId('page-design-default');
const PH_SXA_HEADER = stableId('ph-sxa-header');
const PH_SXA_FOOTER = stableId('ph-sxa-footer');
const UID_PD_HEADER = stableId('uid-pd-header-r');
const UID_PD_FOOTER = stableId('uid-pd-footer-r');

function escapePar(par) {
  return par.replace(/&/g, '&amp;');
}
function encGuid(g) {
  return `%7B${g.toUpperCase()}%7D`;
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

function pageYaml({ id, parent, pathSeg, title, renderingsXml, pageDesignId }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${PAGE_TEMPLATE}"
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

for (const [key, id] of Object.entries(R)) {
  writeFileSync(join(RENDERINGS, `${key}.yml`), renderingYaml(id, key));
}

const headerPartialLayout = layout([
  rEntryDefault({
    uid: UID_PD_HEADER,
    renderingId: R.SiteHeader,
    ph: 'headless-header',
    before: '*',
    dyn: 1,
  }),
]);
const footerPartialLayout = layout([
  rEntryDefault({
    uid: UID_PD_FOOTER,
    renderingId: R.SiteFooter,
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
  join(PRESENTATION, 'Placeholder Settings/Partial Design/Header.yml'),
  `---
ID: "${PH_SXA_HEADER}"
Parent: "${PH_PARTIAL_FOLDER}"
Template: "${T_PLACEHOLDER_SETTING}"
Path: "/sitecore/content/university/university/Presentation/Placeholder Settings/Partial Design/Header"
SharedFields:
- ID: "e2012726-0280-4f4d-a76d-791e2bd0e9e3"
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
- ID: "e2012726-0280-4f4d-a76d-791e2bd0e9e3"
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
        renderingId: R.HomeHero,
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
      rEntryDefault({
        uid: homeUids[1],
        renderingId: R.PromoTileGrid,
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
        ph: 'headless-main',
        before: '*',
        dyn: 1,
      }),
    ]),
  })
);

console.log('University authoring complete.');
console.log('  Renderings:', Object.keys(R).join(', '));
console.log('  Pages: Home, clearing, how-to-apply, courses/cs-ai, study-and-life, accommodation, search');
console.log('  Partial Designs: Header, Footer | Page Design: Default');
console.log('Next: dotnet sitecore serialization push -n <env> -i university-scs');
