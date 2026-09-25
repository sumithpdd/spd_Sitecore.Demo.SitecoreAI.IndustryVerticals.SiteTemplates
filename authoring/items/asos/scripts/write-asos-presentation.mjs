/**
 * Header/Footer renderings, partials, Default page design, journey layouts.
 * GUID prefix a50c0001 (presentation) / a50c0002 (extra pages 037+).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', 'serialized-content');

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGEDESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_PAGE = '328222ce-19c6-4866-a39e-849665790932';
const T_AVAIL = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';
const T_PH = '5c547d4e-7111-4995-95b0-6b561751bf2e';
const F_COMP = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_REV = '8cdc337e-a112-42fb-bbb4-4143751e123f';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_TITLE = '6a4b1abd-d0db-4e90-85aa-d79227995290';
const F_SIG = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_REND = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PD = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_PARTIALS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_AV_REND = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_PHKEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_ALLOWED = 'e391b526-d0c5-439d-803e-17512eae6222';
const PARAMS = '{6585B711-C55F-4495-B752-34889F40D233}';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const LAYOUT = '{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}';
const R_FOLDER = 'e7b11b95-22e4-4696-af91-1e432316f5c1';
const PH_FOLDER = '61ed241d-1845-40d3-856a-218f7ee926cf';
const PARTIAL_FOLDER = '634b252f-51a0-4e3c-838a-21408aeb614a';
const PD_FOLDER = '48545338-cc1b-473e-b0f2-79fb05db21bd';
const AVAIL_FOLDER = 'd42ddbf6-7ed2-4f62-8519-5afa607612a7';
const HOME = '41ee7ce2-a19d-4854-883c-4b1cc8fb50fb';
const WOMEN = 'a50c0002-0000-4000-8000-000000000001';
const PDP_BELLE = 'a50c0002-0000-4000-8000-000000000024';

const RID = {
  Header: 'a50c0001-1111-4000-8000-000000000001',
  Footer: 'a50c0001-1111-4000-8000-000000000002',
  HomeLanding: 'a50c0001-1111-4000-8000-000000000003',
  GenderLanding: 'a50c0001-1111-4000-8000-000000000004',
  CategoryListing: 'a50c0001-1111-4000-8000-000000000005',
  ProductPage: 'a50c0001-1111-4000-8000-000000000006',
};
const HEADER_PD = 'a50c0001-4444-4000-8000-000000000001';
const FOOTER_PD = 'a50c0001-4444-4000-8000-000000000002';
const DEFAULT_PD = 'a50c0001-5555-4000-8000-000000000001';

function write(rel, body) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, body.replace(/\n/g, '\r\n'));
}

function jsonRendering(id, name) {
  return `---
ID: "${id}"
Parent: "${R_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/asos/${name}
SharedFields:
- ID: "${F_COMP}"
  Hint: componentName
  Value: ${name}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAMS}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${id}"
`;
}

function layoutXml(uid, renderingId, ph) {
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${LAYOUT}">
        <r
          uid="${uid}"
          p:before="*"
          s:id="{${renderingId.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="${ph}" />
      </d>
    </r>`;
}

function pageYaml(id, parent, itemPath, title, renderingId, uid) {
  const extra = renderingId
    ? `- ID: "${F_PD}"
  Hint: Page Design
  Value: "{${DEFAULT_PD.toUpperCase()}}"
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml(uid, renderingId, 'headless-main')}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_PAGE}"
Path: "${itemPath}"
SharedFields:
${extra}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${id}"
    - ID: "${F_TITLE}"
      Hint: Title
      Value: "${title}"
`;
}

for (const [name, id] of Object.entries(RID)) {
  write(`renderings/asos/${name}.yml`, jsonRendering(id, name));
}

write(
  'asos/asos/Presentation/Partial Designs/Header.yml',
  `---
ID: "${HEADER_PD}"
Parent: "${PARTIAL_FOLDER}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/asos/asos/Presentation/Partial Designs/Header
SharedFields:
- ID: "${F_SIG}"
  Hint: Signature
  Value: header
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml('{A50C2000-0001-4000-8000-000000000001}', RID.Header, 'headless-header')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${HEADER_PD}"
`
);

write(
  'asos/asos/Presentation/Partial Designs/Footer.yml',
  `---
ID: "${FOOTER_PD}"
Parent: "${PARTIAL_FOLDER}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/asos/asos/Presentation/Partial Designs/Footer
SharedFields:
- ID: "${F_SIG}"
  Hint: Signature
  Value: footer
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml('{A50C2000-0002-4000-8000-000000000001}', RID.Footer, 'headless-footer')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${FOOTER_PD}"
`
);

write(
  'asos/asos/Presentation/Page Designs/Default.yml',
  `---
ID: "${DEFAULT_PD}"
Parent: "${PD_FOLDER}"
Template: "${T_PAGEDESIGN}"
Path: /sitecore/content/asos/asos/Presentation/Page Designs/Default
SharedFields:
- ID: "${F_PARTIALS}"
  Hint: PartialDesigns
  Value: "${HEADER_PD}|${FOOTER_PD}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${DEFAULT_PD}"
`
);

const availId = 'a50c0001-8888-4000-8000-000000000001';
write(
  'asos/asos/Presentation/Available Renderings/ASOS.yml',
  `---
ID: "${availId}"
Parent: "${AVAIL_FOLDER}"
Template: "${T_AVAIL}"
Path: /sitecore/content/asos/asos/Presentation/Available Renderings/ASOS
SharedFields:
- ID: "${F_AV_REND}"
  Hint: Renderings
  Value: |
    {${RID.Header.toUpperCase()}}
    {${RID.Footer.toUpperCase()}}
    {${RID.HomeLanding.toUpperCase()}}
    {${RID.GenderLanding.toUpperCase()}}
    {${RID.CategoryListing.toUpperCase()}}
    {${RID.ProductPage.toUpperCase()}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${availId}"
`
);

const ph = [
  ['headless-header', 'a50c0001-aaaa-4000-8000-000000000002', RID.Header],
  ['headless-footer', 'a50c0001-aaaa-4000-8000-000000000003', RID.Footer],
  [
    'headless-main',
    'a50c0001-aaaa-4000-8000-000000000001',
    `${RID.HomeLanding}\n    {${RID.GenderLanding.toUpperCase()}}\n    {${RID.CategoryListing.toUpperCase()}}\n    {${RID.ProductPage.toUpperCase()}}`,
  ],
];
for (const [key, id, allowed] of ph) {
  const allowedValue = allowed.includes('\n')
    ? `{${RID.HomeLanding.toUpperCase()}}\n    {${RID.GenderLanding.toUpperCase()}}\n    {${RID.CategoryListing.toUpperCase()}}\n    {${RID.ProductPage.toUpperCase()}}`
    : `{${allowed.toUpperCase()}}`;
  write(
    `placeholder-settings/asos/${key}.yml`,
    `---
ID: "${id}"
Parent: "${PH_FOLDER}"
Template: "${T_PH}"
Path: /sitecore/layout/Placeholder Settings/Project/asos/${key}
SharedFields:
- ID: "${F_PHKEY}"
  Hint: Placeholder Key
  Value: "${key}"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    ${allowedValue}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260925T230000Z
    - ID: "${F_REV}"
      Hint: __Revision
      Value: "${id}"
`
  );
}

const pages = [
  [
    'a50c0002-0000-4000-8000-000000000037',
    WOMEN,
    '/sitecore/content/asos/asos/Home/women/new-in',
    'New in',
    '',
    '',
  ],
  [
    'a50c0002-0000-4000-8000-000000000038',
    'a50c0002-0000-4000-8000-000000000037',
    '/sitecore/content/asos/asos/Home/women/new-in/cat',
    "Women's New In",
    RID.CategoryListing,
    '{A50C2100-0038-4000-8000-000000000001}',
  ],
  [
    'a50c0002-0000-4000-8000-000000000039',
    HOME,
    '/sitecore/content/asos/asos/Home/weekday',
    'Weekday',
    '',
    '',
  ],
  [
    'a50c0002-0000-4000-8000-000000000040',
    'a50c0002-0000-4000-8000-000000000039',
    '/sitecore/content/asos/asos/Home/weekday/weekday-flannel-pyjama-bottoms-in-black-check',
    'Weekday flannel pyjama bottoms',
    '',
    '',
  ],
  [
    'a50c0002-0000-4000-8000-000000000041',
    'a50c0002-0000-4000-8000-000000000040',
    '/sitecore/content/asos/asos/Home/weekday/weekday-flannel-pyjama-bottoms-in-black-check/prd',
    'prd',
    '',
    '',
  ],
  [
    'a50c0002-0000-4000-8000-000000000042',
    'a50c0002-0000-4000-8000-000000000041',
    '/sitecore/content/asos/asos/Home/weekday/weekday-flannel-pyjama-bottoms-in-black-check/prd/211674477',
    'Weekday Flannel pyjama bottoms in black check',
    RID.ProductPage,
    '{A50C2100-0042-4000-8000-000000000001}',
  ],
];

for (const [id, parent, itemPath, title, rid, uid] of pages) {
  // SCS hashes paths that exceed the relative path limit. 211674477 must stay in that folder.
  const rel = itemPath.endsWith('/211674477')
    ? 'asos/8F63B6D47EFD2BB1/211674477.yml'
    : itemPath.replace('/sitecore/content/', '') + '.yml';
  write(rel, pageYaml(id, parent, itemPath, title, rid, uid));
}

const home = fs.readFileSync(path.join(ROOT, 'asos/asos/Home.yml'), 'utf8');
if (!home.includes('24171bf1-c0e1-480e-be76-4c0a1876f916')) {
  const patched = home.replace(
    'SharedFields:\n',
    `SharedFields:
- ID: "${F_PD}"
  Hint: Page Design
  Value: "{${DEFAULT_PD.toUpperCase()}}"
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml('{A50C2100-0000-4000-8000-000000000001}', RID.HomeLanding, 'headless-main')}
`
  );
  fs.writeFileSync(path.join(ROOT, 'asos/asos/Home.yml'), patched.replace(/\n/g, '\r\n'));
}

const women = fs.readFileSync(path.join(ROOT, 'asos/asos/Home/women.yml'), 'utf8');
if (!women.includes('24171bf1-c0e1-480e-be76-4c0a1876f916')) {
  const patched = women.replace(
    'Languages:',
    `SharedFields:
- ID: "${F_PD}"
  Hint: Page Design
  Value: "{${DEFAULT_PD.toUpperCase()}}"
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml('{A50C2100-0001-4000-8000-000000000001}', RID.GenderLanding, 'headless-main')}
Languages:`
  );
  fs.writeFileSync(path.join(ROOT, 'asos/asos/Home/women.yml'), patched.replace(/\n/g, '\r\n'));
}

const belle = fs.readFileSync(
  path.join(ROOT, 'asos/asos/Home/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553.yml'),
  'utf8'
);
if (!belle.includes('24171bf1-c0e1-480e-be76-4c0a1876f916')) {
  const patched = belle.replace(
    'Languages:',
    `SharedFields:
- ID: "${F_PD}"
  Hint: Page Design
  Value: "{${DEFAULT_PD.toUpperCase()}}"
- ID: "${F_REND}"
  Hint: __Renderings
  Value: |
    ${layoutXml('{A50C2100-0024-4000-8000-000000000001}', RID.ProductPage, 'headless-main')}
Languages:`
  );
  fs.writeFileSync(
    path.join(ROOT, 'asos/asos/Home/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553.yml'),
    patched.replace(/\n/g, '\r\n')
  );
}

console.log('wrote ASOS presentation YAML', PDP_BELLE);
