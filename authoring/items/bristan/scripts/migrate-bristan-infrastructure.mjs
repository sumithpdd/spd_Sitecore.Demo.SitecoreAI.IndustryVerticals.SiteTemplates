/**
 * Bristan full isolation (Marley-style collection).
 * Run: node authoring/items/bristan/scripts/migrate-bristan-infrastructure.mjs
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SERIAL = join(ROOT, 'serialized-content');
const MARLEY_SERIAL = join(ROOT, '..', 'marley', 'serialized-content');
const IV_RENDERINGS = join(
  ROOT,
  '..',
  'industry-verticals',
  'common',
  'items',
  'projectRenderings',
  'industry-verticals',
);
const TS = '20260605T120000Z';

const COLLECTION = 'b8030080-0001-4000-8000-000000000001';
const SITE = 'b8030000-0001-4000-8000-000000000001';
const HOME = 'b8030000-0001-4000-8000-000000000002';
const MEDIA_LIB_ROOT = 'b80300a0-0001-4000-8000-000000000001';
const MEDIA_SHARED = 'b80300a0-0001-4000-8000-000000000002';
const MEDIA_SITE = 'b80300a0-0001-4000-8000-000000000003';

const INFRA_GUID_MAP = {
  '9369b987-8625-4d00-9dd3-74400f05e39a': COLLECTION,
  '0e77b766-8d2e-475e-8601-e46ae7953126': SITE,
  'a6db72bd-70fc-4d2d-a66c-ef3eec89b819': 'b8030081-0001-4000-8000-000000000001',
  '671d4350-3ecd-4f31-be2c-8a79d0bdd80d': 'b8030082-0001-4000-8000-000000000001',
  '77304c29-4dd5-4243-a07c-a912f18ce409': 'b8030084-0001-4000-8000-000000000001',
  '17e37fba-fae3-4d37-bee3-68a787987d57': 'b8030085-0001-4000-8000-000000000001',
  '8879f578-1dc6-4b63-bf7f-7d5ab8060c39': 'b8030083-0001-4000-8000-000000000001',
  '176cf63e-08fa-4ef7-9cf5-b08f2f6be466': MEDIA_LIB_ROOT,
  '4598020e-5c3c-42c6-98a9-f450f41a2abd': MEDIA_SHARED,
  'dd1e4827-38e0-4a32-a245-d0bab932dae1': MEDIA_SITE,
  '624e77d1-e40f-4706-8f03-36f15f7bb598': HOME,
  '2ffc521a-e206-4c25-a24d-859eb9fae35b': 'b8030000-0001-4000-8000-000000000009',
  '89dfb787-9e1a-4885-8ef2-326d354fbb63': 'b8030000-0001-4000-8000-000000000008',
};

const RENDERING_FOLDERS = {
  'Page Content': 'b8030071-0001-4000-8000-000000000001',
  Navigation: 'b8030071-0001-4000-8000-000000000002',
  'Global Elements': 'b8030071-0001-4000-8000-000000000003',
  Products: 'b8030071-0001-4000-8000-000000000004',
};

export const BRISTAN_RENDERINGS = {
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
};

const IV_TO_BRISTAN_RENDERING = {
  'b49cf2d7-7cb2-4918-8f38-2607d956d995': BRISTAN_RENDERINGS.HeroBanner,
  'ccd11802-22a3-462f-92fc-821515e2aec8': BRISTAN_RENDERINGS.Promo,
  'e3ccf1d0-7855-4898-8bde-77f83c6a487c': BRISTAN_RENDERINGS.Features,
  '6b69c658-ce00-476c-8a97-fa59f2def73b': BRISTAN_RENDERINGS.PageHeader,
  '613a3675-953d-4ad1-877a-48d24a28977d': BRISTAN_RENDERINGS.ProductListing,
  '9c6d53e3-fe57-4638-af7b-6d68304c7a94': BRISTAN_RENDERINGS.RichText,
  '32138d34-7434-4cd1-bf7f-64da1ceb8f33': BRISTAN_RENDERINGS.Header,
  '02654ba0-74ae-42a4-b384-bca9b96adf4b': BRISTAN_RENDERINGS.Footer,
  '9f65621e-1102-461c-bbee-3fadce8e0509': BRISTAN_RENDERINGS.Navigation,
  'c56efae9-39e8-45eb-8b59-d4bf2b71914e': BRISTAN_RENDERINGS.NavigationIcons,
  '4956263d-1195-4d6e-931b-800ea625ff6f': BRISTAN_RENDERINGS.LinkList,
  'ab2edba0-3960-4f12-b765-579dc231894a': BRISTAN_RENDERINGS.Image,
  'c5f905f8-fd1f-444e-a9e5-ac6b774ff0de': BRISTAN_RENDERINGS.PageContent,
  '7e5035bd-533a-4e84-a67b-9aa2bf964f21': BRISTAN_RENDERINGS.Breadcrumb,
  '7eeeb709-7aaa-4b2f-8fba-88ef74b3d2fe': BRISTAN_RENDERINGS.ProductDetails,
};

const MARLEY_INFRA_DIRS = [
  join(MARLEY_SERIAL, 'templates'),
  join(MARLEY_SERIAL, 'branches'),
  join(MARLEY_SERIAL, 'collection'),
  join(MARLEY_SERIAL, 'media-library'),
  join(MARLEY_SERIAL, 'placeholder-settings'),
  join(MARLEY_SERIAL, 'project-settings'),
];

const ID_LINE_RE = /^ID: "([^"]+)"/m;
let guidCounter = 1;

const nextInfraGuid = () => {
  const hex = guidCounter.toString(16).padStart(12, '0');
  guidCounter += 1;
  return `b80300c0-0001-4000-8000-${hex}`;
};

const walkYmlFiles = (dir, fn) => {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkYmlFiles(path, fn);
    } else if (entry.name.endsWith('.yml')) {
      fn(path, readFileSync(path, 'utf8'));
    }
  }
};

const buildMarleyGuidMap = () => {
  const map = { ...INFRA_GUID_MAP };
  for (const dir of MARLEY_INFRA_DIRS) {
    walkYmlFiles(dir, (_path, content) => {
      const match = content.match(ID_LINE_RE);
      if (match && !map[match[1].toLowerCase()]) {
        map[match[1].toLowerCase()] = nextInfraGuid();
      }
    });
  }
  return map;
};

const transformContent = (content, guidMap) => {
  let out = content
    .replaceAll('/sitecore/content/marley/marley', '/sitecore/content/bristan/bristan')
    .replaceAll('/sitecore/content/marley', '/sitecore/content/bristan')
    .replaceAll('/sitecore/templates/Project/marley', '/sitecore/templates/Project/bristan')
    .replaceAll('/sitecore/templates/Branches/Project/marley', '/sitecore/templates/Branches/Project/bristan')
    .replaceAll('/sitecore/layout/Renderings/Project/marley', '/sitecore/layout/Renderings/Project/bristan')
    .replaceAll(
      '/sitecore/layout/Placeholder Settings/Project/marley',
      '/sitecore/layout/Placeholder Settings/Project/bristan',
    )
    .replaceAll('/sitecore/media library/Project/marley', '/sitecore/media library/Project/bristan')
    .replaceAll('/sitecore/system/Settings/Project/marley', '/sitecore/system/Settings/Project/bristan')
    .replaceAll('/sitecore/content/industry-verticals/bristan', '/sitecore/content/bristan/bristan')
    .replaceAll('Value: marley', 'Value: bristan')
    .replaceAll('Value: Marley', 'Value: Bristan')
    .replaceAll('Site collection for Marley', 'Site collection for Bristan')
    .replaceAll('This is Marley site', 'This is Bristan site')
    .replaceAll('MarleyHeroBanner', 'HeroBanner')
    .replaceAll('MarleyPromoQuote', 'Promo')
    .replaceAll('MarleyFeaturesGrid', 'Features')
    .replaceAll('MarleyLinkList', 'LinkList');

  const sortedKeys = Object.keys(guidMap).sort((a, b) => b.length - a.length);
  for (const oldId of sortedKeys) {
    const newId = guidMap[oldId];
    out = out.replaceAll(oldId, newId).replaceAll(oldId.toUpperCase(), newId.toUpperCase());
  }
  for (const [oldId, newId] of Object.entries(IV_TO_BRISTAN_RENDERING)) {
    out = out.replaceAll(oldId, newId).replaceAll(oldId.toUpperCase(), newId.toUpperCase());
  }
  return out;
};

const renameGuidInFilename = (name, guidMap) => {
  let out = name;
  for (const [oldId, newId] of Object.entries(guidMap)) {
    out = out.replaceAll(oldId, newId).replaceAll(oldId.toUpperCase(), newId.toUpperCase());
  }
  return out;
};

const walkCopy = (src, dest, guidMap) => {
  if (!existsSync(src)) return;
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destName = renameGuidInFilename(entry, guidMap);
    const destPath = join(dest, destName);
    if (statSync(srcPath).isDirectory()) {
      walkCopy(srcPath, destPath, guidMap);
    } else if (entry.endsWith('.yml')) {
      writeFileSync(destPath, transformContent(readFileSync(srcPath, 'utf8'), guidMap), 'utf8');
    } else {
      cpSync(srcPath, destPath);
    }
  }
};

const write = (rel, body) => {
  const file = join(SERIAL, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body.trimStart() + '\n', 'utf8');
};

const cleanInfra = () => {
  const removeDirs = [
    'templates',
    'branches',
    'collection',
    'media-library',
    'placeholder-settings',
    'project-settings',
    'renderings',
    'industry-verticals',
    'bristan-data',
    'bristan-dictionary',
    'bristan-home',
    'bristan-media',
    'bristan-presentation',
    'bristan-site',
  ];
  for (const dir of removeDirs) {
    const path = join(SERIAL, dir);
    if (existsSync(path)) rmSync(path, { recursive: true, force: true });
  }
};

const copyMarleyInfra = (guidMap) => {
  walkCopy(join(MARLEY_SERIAL, 'templates', 'marley'), join(SERIAL, 'templates', 'bristan'), guidMap);
  write(
    'templates/bristan.yml',
    transformContent(readFileSync(join(MARLEY_SERIAL, 'templates', 'marley.yml'), 'utf8'), guidMap),
  );

  walkCopy(join(MARLEY_SERIAL, 'branches'), join(SERIAL, 'branches'), guidMap);
  if (existsSync(join(SERIAL, 'branches', 'marley.yml'))) {
    write('branches/bristan.yml', readFileSync(join(SERIAL, 'branches', 'marley.yml'), 'utf8'));
    rmSync(join(SERIAL, 'branches', 'marley.yml'), { force: true });
  }

  walkCopy(join(MARLEY_SERIAL, 'collection'), join(SERIAL, 'collection'), guidMap);
  if (existsSync(join(SERIAL, 'collection', 'marley.yml'))) {
    write('collection/bristan.yml', readFileSync(join(SERIAL, 'collection', 'marley.yml'), 'utf8'));
    rmSync(join(SERIAL, 'collection', 'marley.yml'), { force: true });
  }

  walkCopy(join(MARLEY_SERIAL, 'media-library', 'marley'), join(SERIAL, 'media-library', 'bristan'), guidMap);
  write(
    'media-library/bristan.yml',
    transformContent(readFileSync(join(MARLEY_SERIAL, 'media-library', 'marley.yml'), 'utf8'), guidMap),
  );

  walkCopy(join(MARLEY_SERIAL, 'placeholder-settings'), join(SERIAL, 'placeholder-settings'), guidMap);
  if (existsSync(join(SERIAL, 'placeholder-settings', 'marley.yml'))) {
    write(
      'placeholder-settings/bristan.yml',
      readFileSync(join(SERIAL, 'placeholder-settings', 'marley.yml'), 'utf8'),
    );
    rmSync(join(SERIAL, 'placeholder-settings', 'marley.yml'), { force: true });
  }

  walkCopy(join(MARLEY_SERIAL, 'project-settings', 'marley'), join(SERIAL, 'project-settings', 'bristan'), guidMap);
  if (existsSync(join(MARLEY_SERIAL, 'project-settings', 'marley.yml'))) {
    write(
      'project-settings/bristan.yml',
      transformContent(readFileSync(join(MARLEY_SERIAL, 'project-settings', 'marley.yml'), 'utf8'), guidMap),
    );
  }
};

const copyIvRendering = (relPath, newId, folderKey) => {
  const src = join(IV_RENDERINGS, relPath);
  if (!existsSync(src)) {
    console.warn(`Missing IV rendering: ${relPath}`);
    return;
  }
  let body = readFileSync(src, 'utf8');
  body = body.replace(/^ID: "[^"]+"/m, `ID: "${newId}"`);
  body = body.replace(/^Parent: "[^"]+"/m, `Parent: "${RENDERING_FOLDERS[folderKey]}"`);
  body = body.replace(
    /Path: "\/sitecore\/layout\/Renderings\/Project\/industry-verticals\/[^"]+"/,
    (m) => m.replace('industry-verticals', 'bristan'),
  );
  const outName = relPath.split('/').pop();
  write(`renderings/bristan/${folderKey}/${outName}`, body);
};

const writeRenderingFolders = () => {
  write(
    'renderings/bristan.yml',
    `---
ID: "b8030082-0001-4000-8000-000000000001"
Parent: "1995806f-0a84-42b5-93b0-88f0e2ff872c"
Template: "840d4a46-5503-49ec-bf9d-bd090946c63d"
Path: "/sitecore/layout/Renderings/Project/bristan"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
  );
  for (const [name, id] of Object.entries(RENDERING_FOLDERS)) {
    write(
      `renderings/bristan/${name}.yml`,
      `---
ID: "${id}"
Parent: "b8030082-0001-4000-8000-000000000001"
Template: "7ee0975b-0698-493e-b3a2-0b2ef33d0522"
Path: "/sitecore/layout/Renderings/Project/bristan/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
    );
  }
};

const writeRenderings = () => {
  writeRenderingFolders();
  copyIvRendering('Page Content/Hero Banner.yml', BRISTAN_RENDERINGS.HeroBanner, 'Page Content');
  copyIvRendering('Page Content/Promo.yml', BRISTAN_RENDERINGS.Promo, 'Page Content');
  copyIvRendering('Page Content/Features.yml', BRISTAN_RENDERINGS.Features, 'Page Content');
  copyIvRendering('Page Content/PageHeader.yml', BRISTAN_RENDERINGS.PageHeader, 'Page Content');
  copyIvRendering('Products/Product Listing.yml', BRISTAN_RENDERINGS.ProductListing, 'Products');
  copyIvRendering('Products/Product Details.yml', BRISTAN_RENDERINGS.ProductDetails, 'Products');
  copyIvRendering('Global Elements/Header.yml', BRISTAN_RENDERINGS.Header, 'Global Elements');
  copyIvRendering('Global Elements/Footer.yml', BRISTAN_RENDERINGS.Footer, 'Global Elements');
  copyIvRendering('Navigation/Navigation.yml', BRISTAN_RENDERINGS.Navigation, 'Navigation');
  copyIvRendering('Navigation/Navigation Icons.yml', BRISTAN_RENDERINGS.NavigationIcons, 'Navigation');
  copyIvRendering('Navigation/Breadcrumb.yml', BRISTAN_RENDERINGS.Breadcrumb, 'Navigation');

  const simpleRendering = (name, id, folderKey, componentName, dsTemplate = '') => {
    write(
      `renderings/bristan/${folderKey}/${name}.yml`,
      `---
ID: "${id}"
Parent: "${RENDERING_FOLDERS[folderKey]}"
Template: "04646a89-996f-4ee7-878a-ffdbf1f0ef0d"
Path: "/sitecore/layout/Renderings/Project/bristan/${folderKey}/${name}"
SharedFields:
- ID: "037fe404-dd19-4bf7-8e30-4dadf68b27b0"
  Hint: componentName
  Value: ${componentName}
- ID: "1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f"
  Hint: Datasource Template
  Value: "${dsTemplate}"
- ID: "e829c217-5e94-4306-9c48-2634b094fdc2"
  Hint: OtherProperties
  Value: IsRenderingsWithDynamicPlaceholders=true
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
    );
  };

  simpleRendering(
    'Rich Text',
    BRISTAN_RENDERINGS.RichText,
    'Page Content',
    'RichText',
    '/sitecore/templates/Project/industry-verticals/Components/Page Content/Rich Text/Rich Text',
  );
  simpleRendering(
    'Link List',
    BRISTAN_RENDERINGS.LinkList,
    'Navigation',
    'LinkList',
    '/sitecore/templates/Project/industry-verticals/Components/Navigation/Link List/Link List',
  );
  simpleRendering(
    'Image',
    BRISTAN_RENDERINGS.Image,
    'Page Content',
    'Image',
    '/sitecore/templates/Project/industry-verticals/Components/Media/Image/Image',
  );
  simpleRendering('PageContent', BRISTAN_RENDERINGS.PageContent, 'Page Content', 'PageContent');
};

const writeSiteShell = () => {
  const stubs = [
    ['bristan/bristan/Data.yml', 'b8030000-0001-4000-8000-000000000003', 'Data', 'a29d272e-9d48-453c-9e9d-b47585fa7f20'],
    ['bristan/bristan/Dictionary.yml', 'b8030000-0001-4000-8000-000000000005', 'Dictionary', 'a29d272e-9d48-453c-9e9d-b47585fa7f20'],
    ['bristan/bristan/Media.yml', 'b8030000-0001-4000-8000-000000000004', 'Media', 'a29d272e-9d48-453c-9e9d-b47585fa7f20'],
    ['bristan/bristan/Presentation.yml', 'b8030000-0001-4000-8000-000000000006', 'Presentation', 'a29d272e-9d48-453c-9e9d-b47585fa7f20'],
    ['bristan/bristan/Settings.yml', 'b8030000-0001-4000-8000-000000000007', 'Settings', 'a29d272e-9d48-453c-9e9d-b47585fa7f20'],
    ['bristan/bristan/Settings/Site Grouping.yml', 'b8030000-0001-4000-8000-000000000008', 'Site Grouping', '8357f958-9aaa-46db-8898-36448a96356f'],
  ];
  for (const [rel, id, title, template] of stubs) {
    const itemPath = `/sitecore/content/bristan/bristan/${rel.replace('bristan/bristan/', '').replace(/\.yml$/, '')}`;
    write(
      rel,
      `---
ID: "${id}"
Parent: "${rel.includes('Site Grouping.yml') ? 'b8030000-0001-4000-8000-000000000007' : SITE}"
Template: "${template}"
Path: "${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
    );
  }

  write(
    'bristan/bristan/Settings/Site Grouping/bristan.yml',
    `---
ID: "b8030000-0001-4000-8000-000000000009"
Parent: "b8030000-0001-4000-8000-000000000008"
Template: "e46f3af2-39fa-4866-a157-7017c4b2a40c"
Path: "/sitecore/content/bristan/bristan/Settings/Site Grouping/bristan"
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "1ee576af-ba8e-4312-9fbd-2ccf8395baa1"
  Hint: StartItem
  Value: "{${HOME.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: Bristan
- ID: "8e0dd914-9afb-4d45-bf8b-7ff5d6e5337e"
  Hint: HostName
  Value: *
- ID: "9eaf6dc9-b811-4cda-9edd-9697faba628a"
  Hint: POS
  Value: "en=bristan"
- ID: "cb4e9e2e-2b66-43dc-ad3f-9caf363d28d3"
  Hint: SiteName
  Value: "bristan"
- ID: "da06d09e-02b6-464a-80fc-9d8d7fc875e3"
  Hint: Environment
  Value: *
- ID: "f57099a3-526a-49f2-aebd-635453e48875"
  Hint: RenderingHost
  Value: "bristan"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
  );

  write(
    'bristan/bristan.yml',
    `---
ID: "${SITE}"
Parent: "${COLLECTION}"
Template: "fcfe3539-7c16-45a5-9457-081b8234f64d"
Path: "/sitecore/content/bristan/bristan"
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "33d9005e-1f71-415f-b107-53b965c3b037"
  Hint: SiteMediaLibrary
  Value: "{${MEDIA_SITE.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: bristan
- ID: "e2bf3c8d-a12e-45f4-98d6-a37f13bcf375"
  Hint: SiteTemplate
  Value: "{2867D289-8951-458A-AF19-CE93A67BB494}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`,
  );
};

// --- run ---
console.log('Cleaning stale infra folders...');
cleanInfra();
console.log('Building Marley → Bristan GUID map...');
const guidMap = buildMarleyGuidMap();
console.log(`Mapped ${Object.keys(guidMap).length} infrastructure GUIDs`);
console.log('Copying Marley-style infrastructure (templates, media, settings)...');
copyMarleyInfra(guidMap);
console.log('Writing Bristan renderings under Project/bristan...');
writeRenderings();
console.log('Writing site shell (Settings, Site Grouping)...');
writeSiteShell();
console.log(`Done. Serialized content at ${SERIAL}`);
