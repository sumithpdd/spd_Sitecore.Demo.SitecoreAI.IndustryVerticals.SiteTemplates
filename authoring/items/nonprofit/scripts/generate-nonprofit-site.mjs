/**
 * Openhand nonprofit site: JSON renderings, Header/Footer partials, demo pages.
 * GUID prefix 0e0a. Paths match nonprofit.module.json.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SITE_ID = 'b5707c14-aaa3-46e4-9472-cecd9b9914aa';
const HOME_ID = '33365cdd-ec5b-4db5-a858-c353d1d1940d';
const HOME_TEMPLATE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';
const DATA_ID = '6ebbce5a-7be2-4652-b9e2-19f38cca33a4';
const PARTIALS = '46cd3eb7-dc76-4a5e-9a8c-8a683d769455';
const PAGE_DESIGNS = 'ec060a87-89ca-4eb8-8e3b-56ba294e88d6';
const AVAIL_REND = '7306d746-a77f-49f2-a44a-c3811af866b4';
const PH_PARTIAL = '7fe49ba9-f892-4afc-970f-478569b8da1f';
const PH_SITE = 'e2c90d66-4c9a-4dd7-a846-89cb8bcc7ead';
const PH_PROJECT = '31c13e7e-1461-48f3-8b19-15b1d0eef875';
const REND_FOLDER = '80cc7671-ba23-46a5-b4a0-65e76cb7a102';
const TEMPL_FOLDER = '109141ff-0e31-43af-9b20-a32032ca4ced';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_AVAIL = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';
const T_PH = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
const T_PH_PROJECT = '5c547d4e-7111-4995-95b0-6b561751bf2e';

const DEVICE = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const JSS_LAYOUT = '96E5F4BA-A2CF-4A4C-A4E7-64DA88226362';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';
const BASE_STD = '1930BBEB-7805-471A-A3BE-4858AC7CF696';
const BASE_DS = '44A022DB-56D3-419A-B43B-E27E4D8E9C41';
const PARAM_HEADER = '6585B711-C55F-4495-B752-34889F40D233';
const PARAM_HERO = '5BD96264-0B02-4605-8FFF-0079CAEB67FC';

const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_BASE = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_FIELD_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '96b71ea7-4d37-4a3a-9e11-2bb76ef03acd';
const F_PAGE_CONTENT = '53f49d04-a3f6-4f75-bc6e-3e7db6e80e93';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PARTIALS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_AR_REND = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_ALLOWED = 'e391b526-d0c5-439d-803e-17512eae6222';

const ID = {
  Header: '0e0a0001-1111-4000-8000-000000000001',
  Footer: '0e0a0001-1111-4000-8000-000000000002',
  HomeHero: '0e0a0001-1111-4000-8000-000000000003',
  PromoGrid: '0e0a0001-1111-4000-8000-000000000004',
  AdviceLanding: '0e0a0001-1111-4000-8000-000000000005',
  AdviceArticle: '0e0a0001-1111-4000-8000-000000000006',
  AdviceIndex: '0e0a0001-1111-4000-8000-000000000007',
  PartnerFinder: '0e0a0001-1111-4000-8000-000000000008',
  PartnerPage: '0e0a0001-1111-4000-8000-000000000009',
  AppealPage: '0e0a0001-1111-4000-8000-00000000000a',
  DonateSelector: '0e0a0001-1111-4000-8000-00000000000b',
  FundraiseGrid: '0e0a0001-1111-4000-8000-00000000000c',
  CampaignAction: '0e0a0001-1111-4000-8000-00000000000d',
  StoryList: '0e0a0001-1111-4000-8000-00000000000e',
  StoryDetail: '0e0a0001-1111-4000-8000-00000000000f',
  SiteSearch: '0e0a0001-1111-4000-8000-000000000010',
  MiniCms: '0e0a0001-1111-4000-8000-000000000011',
  ScrunchMonitor: '0e0a0001-1111-4000-8000-000000000012',
  EmailPreview: '0e0a0001-1111-4000-8000-000000000013',
  StoryBoard: '0e0a0001-1111-4000-8000-000000000014',
  PD_Header: '0e0a0004-4444-4000-8000-000000000001',
  PD_Footer: '0e0a0004-4444-4000-8000-000000000002',
  Design_Default: '0e0a0005-5555-4000-8000-000000000001',
  PH_Header: '0e0a0007-7777-4000-8000-000000000001',
  PH_Footer: '0e0a0007-7777-4000-8000-000000000002',
  PH_MainSite: '0e0a0009-9999-4000-8000-000000000009',
  PH_MainProject: '0e0a0009-aaaa-4000-8000-000000000001',
  AR_Openhand: '0e0a0008-8888-4000-8000-000000000001',
  Tpl_HeaderFolder: '0e0a0010-0000-4000-8000-000000000001',
  Tpl_Header: '0e0a0010-0000-4000-8000-000000000002',
  Tpl_HeaderData: '0e0a0010-0000-4000-8000-000000000003',
  Tpl_BrandName: '0e0a0010-0000-4000-8000-000000000004',
  Tpl_Logo: '0e0a0010-0000-4000-8000-000000000005',
  HEADER_FOLDER_TPL: '0e0a0010-0000-4000-8000-00000000000a',
  Tpl_HeroFolder: '0e0a0010-0000-4000-8000-000000000010',
  Tpl_Hero: '0e0a0010-0000-4000-8000-000000000011',
  Tpl_HeroData: '0e0a0010-0000-4000-8000-000000000012',
  Tpl_HeroTitle: '0e0a0010-0000-4000-8000-000000000013',
  Tpl_HeroDesc: '0e0a0010-0000-4000-8000-000000000014',
  Tpl_HeroImage: '0e0a0010-0000-4000-8000-000000000015',
  HERO_FOLDER_TPL: '0e0a0010-0000-4000-8000-00000000001a',
  Tpl_FooterFolder: '0e0a0010-0000-4000-8000-000000000020',
  Tpl_Footer: '0e0a0010-0000-4000-8000-000000000021',
  Tpl_FooterData: '0e0a0010-0000-4000-8000-000000000022',
  Tpl_Copyright: '0e0a0010-0000-4000-8000-000000000023',
  FOOTER_FOLDER_TPL: '0e0a0010-0000-4000-8000-00000000002a',
  DS_Headers: '0e0a0020-0000-4000-8000-000000000001',
  DS_Header: '0e0a0020-0000-4000-8000-000000000002',
  DS_Heroes: '0e0a0020-0000-4000-8000-000000000010',
  DS_HeroHome: '0e0a0020-0000-4000-8000-000000000011',
  DS_Footers: '0e0a0020-0000-4000-8000-000000000020',
  DS_Footer: '0e0a0020-0000-4000-8000-000000000021',
  P_GetHelp: '0e0a0030-0000-4000-8000-000000000001',
  P_Energy: '0e0a0030-0000-4000-8000-000000000002',
  P_Rent: '0e0a0030-0000-4000-8000-000000000003',
  P_Food: '0e0a0030-0000-4000-8000-000000000004',
  P_AZ: '0e0a0030-0000-4000-8000-000000000005',
  P_NearYou: '0e0a0030-0000-4000-8000-000000000006',
  P_Partners: '0e0a0030-0000-4000-8000-000000000010',
  P_Northgate: '0e0a0030-0000-4000-8000-000000000011',
  P_StMarks: '0e0a0030-0000-4000-8000-000000000012',
  P_Riverside: '0e0a0030-0000-4000-8000-000000000013',
  P_Appeals: '0e0a0030-0000-4000-8000-000000000020',
  P_Winter: '0e0a0030-0000-4000-8000-000000000021',
  P_Emergency: '0e0a0030-0000-4000-8000-000000000022',
  P_Donate: '0e0a0030-0000-4000-8000-000000000030',
  P_Fundraise: '0e0a0030-0000-4000-8000-000000000031',
  P_Campaigns: '0e0a0030-0000-4000-8000-000000000040',
  P_FairEnergy: '0e0a0030-0000-4000-8000-000000000041',
  P_Stories: '0e0a0030-0000-4000-8000-000000000050',
  P_Maria: '0e0a0030-0000-4000-8000-000000000051',
  P_Jamal: '0e0a0030-0000-4000-8000-000000000052',
  P_Aisha: '0e0a0030-0000-4000-8000-000000000053',
  P_Elaine: '0e0a0030-0000-4000-8000-000000000054',
  P_Search: '0e0a0030-0000-4000-8000-000000000060',
  P_Cms: '0e0a0030-0000-4000-8000-000000000061',
  P_Scrunch: '0e0a0030-0000-4000-8000-000000000062',
  P_Email: '0e0a0030-0000-4000-8000-000000000063',
  P_Storyboard: '0e0a0030-0000-4000-8000-000000000064',
};

const RENDERING_IDS = [
  ID.Header,
  ID.Footer,
  ID.HomeHero,
  ID.PromoGrid,
  ID.AdviceLanding,
  ID.AdviceArticle,
  ID.AdviceIndex,
  ID.PartnerFinder,
  ID.PartnerPage,
  ID.AppealPage,
  ID.DonateSelector,
  ID.FundraiseGrid,
  ID.CampaignAction,
  ID.StoryList,
  ID.StoryDetail,
  ID.SiteSearch,
  ID.MiniCms,
  ID.ScrunchMonitor,
  ID.EmailPreview,
  ID.StoryBoard,
];

function u(id) {
  return `{${String(id).toUpperCase()}}`;
}

function mkdirp(p) {
  fs.mkdirSync(p, { recursive: true });
}

function write(rel, content) {
  const full = path.join(ROOT, rel);
  mkdirp(path.dirname(full));
  fs.writeFileSync(full, content, 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260915T120000Z
`;
}

function jsonRendering({ id, name, componentName, dsTemplate, dsLocation, paramId }) {
  const dsT =
    dsTemplate &&
    `- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: ${dsTemplate}
`;
  const dsL =
    dsLocation &&
    `- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "${dsLocation}"
`;
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/nonprofit/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${componentName}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
${dsT || ''}${dsL || ''}- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "{${paramId}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateFolder(id, name) {
  return `---
ID: "${id}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TPL_FOLDER}"
Path: "/sitecore/templates/Project/nonprofit/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateItem(id, parent, itemPath, { bases = '', sort = 100 } = {}) {
  const base = bases
    ? `- ID: "${F_BASE}"
  Hint: __Base template
  Value: |
    ${bases}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
${base}- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: ${sort}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function sectionItem(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_SECTION}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function fieldItem(id, parent, itemPath, type, sort, title) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FIELD}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_TYPE}"
  Hint: Type
  Value: "${type}"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: ${sort}
Languages:
- Language: en
  Fields:
  - ID: "${F_FIELD_TITLE}"
    Hint: Title
    Value: ${title}
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingXml(rows, { assignLayout = false } = {}) {
  const kids = rows
    .map((row, i) => {
      const before = i === 0 ? '\n          p:before="*"' : '';
      const ds = row.ds ? `\n          s:ds="${row.ds}"` : '';
      return `        <r
          uid="${u(row.uid)}"${before}${ds}
          s:id="${u(row.id)}"
          s:par="GridParameters=%7B${GRID}%7D&amp;DynamicPlaceholderId=${i + 1}"
          s:ph="${row.ph}" />`;
    })
    .join('\n');
  const layout = assignLayout ? `\n        l="${u(JSS_LAYOUT)}"` : '';
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${u(DEVICE)}"${layout}>
${kids}
      </d>
    </r>`;
}

function pageYaml({ id, parent, itemPath, title, nav, renderings = [], extraVersion = '' }) {
  const layout = renderings.length
    ? `- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(renderings, { assignLayout: true })}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${HOME_TEMPLATE}"
Path: ${itemPath}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(ID.Design_Default)}"
${layout}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
${extraVersion}`;
}

function folderDs(id, parent, itemPath, templateId) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

const dsLoc = (folderTmpl) =>
  `query:$site/*[@@name='Data']/*[@@templatename='${folderTmpl}']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${folderTmpl}']`;

const simpleRenderings = [
  ['PromoGrid', 'PromoGrid'],
  ['AdviceLanding', 'AdviceLanding'],
  ['AdviceArticle', 'AdviceArticle'],
  ['AdviceIndex', 'AdviceIndex'],
  ['PartnerFinder', 'PartnerFinder'],
  ['PartnerPage', 'PartnerPage'],
  ['AppealPage', 'AppealPage'],
  ['DonateSelector', 'DonateSelector'],
  ['FundraiseGrid', 'FundraiseGrid'],
  ['CampaignAction', 'CampaignAction'],
  ['StoryList', 'StoryList'],
  ['StoryDetail', 'StoryDetail'],
  ['SiteSearch', 'SiteSearch'],
  ['MiniCms', 'MiniCms'],
  ['ScrunchMonitor', 'ScrunchMonitor'],
  ['EmailPreview', 'EmailPreview'],
  ['StoryBoard', 'StoryBoard'],
];

write(
  'serialized-content/renderings/nonprofit/Header.yml',
  jsonRendering({
    id: ID.Header,
    name: 'Header',
    componentName: 'Header',
    dsTemplate: '/sitecore/templates/Project/nonprofit/Header Templates/Header',
    dsLocation: dsLoc('Header Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/nonprofit/Footer.yml',
  jsonRendering({
    id: ID.Footer,
    name: 'Footer',
    componentName: 'Footer',
    dsTemplate: '/sitecore/templates/Project/nonprofit/Footer Templates/Footer',
    dsLocation: dsLoc('Footer Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/nonprofit/HomeHero.yml',
  jsonRendering({
    id: ID.HomeHero,
    name: 'HomeHero',
    componentName: 'HomeHero',
    dsTemplate: '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero',
    dsLocation: dsLoc('HomeHero Folder'),
    paramId: PARAM_HERO,
  })
);

for (const [name, componentName] of simpleRenderings) {
  write(
    `serialized-content/renderings/nonprofit/${name}.yml`,
    jsonRendering({
      id: ID[name],
      name,
      componentName,
      paramId: PARAM_HERO,
    })
  );
}

write('serialized-content/templates/nonprofit/Header Templates.yml', templateFolder(ID.Tpl_HeaderFolder, 'Header Templates'));
write(
  'serialized-content/templates/nonprofit/Header Templates/Header Folder.yml',
  templateItem(ID.HEADER_FOLDER_TPL, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/nonprofit/Header Templates/Header Folder')
);
write(
  'serialized-content/templates/nonprofit/Header Templates/Header.yml',
  templateItem(ID.Tpl_Header, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/nonprofit/Header Templates/Header', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/nonprofit/Header Templates/Header/Data.yml',
  sectionItem(ID.Tpl_HeaderData, ID.Tpl_Header, '/sitecore/templates/Project/nonprofit/Header Templates/Header/Data')
);
write(
  'serialized-content/templates/nonprofit/Header Templates/Header/Data/BrandName.yml',
  fieldItem(ID.Tpl_BrandName, ID.Tpl_HeaderData, '/sitecore/templates/Project/nonprofit/Header Templates/Header/Data/BrandName', 'Single-Line Text', 100, 'BrandName')
);
write(
  'serialized-content/templates/nonprofit/Header Templates/Header/Data/Logo.yml',
  fieldItem(ID.Tpl_Logo, ID.Tpl_HeaderData, '/sitecore/templates/Project/nonprofit/Header Templates/Header/Data/Logo', 'Image', 200, 'Logo')
);

write('serialized-content/templates/nonprofit/HomeHero Templates.yml', templateFolder(ID.Tpl_HeroFolder, 'HomeHero Templates'));
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero Folder.yml',
  templateItem(ID.HERO_FOLDER_TPL, ID.Tpl_HeroFolder, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero Folder')
);
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero.yml',
  templateItem(ID.Tpl_Hero, ID.Tpl_HeroFolder, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero/Data.yml',
  sectionItem(ID.Tpl_HeroData, ID.Tpl_Hero, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero/Data')
);
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero/Data/Title.yml',
  fieldItem(ID.Tpl_HeroTitle, ID.Tpl_HeroData, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero/Data/Title', 'Single-Line Text', 100, 'Title')
);
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero/Data/Description.yml',
  fieldItem(ID.Tpl_HeroDesc, ID.Tpl_HeroData, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero/Data/Description', 'Rich Text', 200, 'Description')
);
write(
  'serialized-content/templates/nonprofit/HomeHero Templates/HomeHero/Data/Image.yml',
  fieldItem(ID.Tpl_HeroImage, ID.Tpl_HeroData, '/sitecore/templates/Project/nonprofit/HomeHero Templates/HomeHero/Data/Image', 'Image', 300, 'Image')
);

write('serialized-content/templates/nonprofit/Footer Templates.yml', templateFolder(ID.Tpl_FooterFolder, 'Footer Templates'));
write(
  'serialized-content/templates/nonprofit/Footer Templates/Footer Folder.yml',
  templateItem(ID.FOOTER_FOLDER_TPL, ID.Tpl_FooterFolder, '/sitecore/templates/Project/nonprofit/Footer Templates/Footer Folder')
);
write(
  'serialized-content/templates/nonprofit/Footer Templates/Footer.yml',
  templateItem(ID.Tpl_Footer, ID.Tpl_FooterFolder, '/sitecore/templates/Project/nonprofit/Footer Templates/Footer', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/nonprofit/Footer Templates/Footer/Data.yml',
  sectionItem(ID.Tpl_FooterData, ID.Tpl_Footer, '/sitecore/templates/Project/nonprofit/Footer Templates/Footer/Data')
);
write(
  'serialized-content/templates/nonprofit/Footer Templates/Footer/Data/CopyrightText.yml',
  fieldItem(ID.Tpl_Copyright, ID.Tpl_FooterData, '/sitecore/templates/Project/nonprofit/Footer Templates/Footer/Data/CopyrightText', 'Single-Line Text', 100, 'CopyrightText')
);

write(
  'serialized-content/nonprofit/nonprofit/Data/Headers.yml',
  folderDs(ID.DS_Headers, DATA_ID, '/sitecore/content/nonprofit/nonprofit/Data/Headers', ID.HEADER_FOLDER_TPL)
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Headers/Main Header.yml',
  `---
ID: "${ID.DS_Header}"
Parent: "${ID.DS_Headers}"
Template: "${ID.Tpl_Header}"
Path: /sitecore/content/nonprofit/nonprofit/Data/Headers/Main Header
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_BrandName}"
      Hint: BrandName
      Value: Openhand
`
);
write(
  'serialized-content/nonprofit/nonprofit/Data/HomeHeros.yml',
  folderDs(ID.DS_Heroes, DATA_ID, '/sitecore/content/nonprofit/nonprofit/Data/HomeHeros', ID.HERO_FOLDER_TPL)
);
write(
  'serialized-content/nonprofit/nonprofit/Data/HomeHeros/Home.yml',
  `---
ID: "${ID.DS_HeroHome}"
Parent: "${ID.DS_Heroes}"
Template: "${ID.Tpl_Hero}"
Path: /sitecore/content/nonprofit/nonprofit/Data/HomeHeros/Home
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_HeroTitle}"
      Hint: Title
      Value: Crisis support here. Emergency appeals worldwide.
    - ID: "${ID.Tpl_HeroDesc}"
      Hint: Description
      Value: |
        <p>Get help with bills, rent and emergency grants near you — or give so the next person through the door is not turned away.</p>
`
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Footers.yml',
  folderDs(ID.DS_Footers, DATA_ID, '/sitecore/content/nonprofit/nonprofit/Data/Footers', ID.FOOTER_FOLDER_TPL)
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Footers/Main Footer.yml',
  `---
ID: "${ID.DS_Footer}"
Parent: "${ID.DS_Footers}"
Template: "${ID.Tpl_Footer}"
Path: /sitecore/content/nonprofit/nonprofit/Data/Footers/Main Footer
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_Copyright}"
      Hint: CopyrightText
      Value: © 2026 Openhand. Registered charity in England and Wales.
`
);

write(
  'serialized-content/nonprofit/nonprofit/Presentation/Partial Designs/Header.yml',
  `---
ID: "${ID.PD_Header}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Partial Designs/Header
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: header
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Header, ph: 'headless-header', uid: '0e0a2000-0001-4000-8000-000000000001', ds: ID.DS_Header }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Presentation/Partial Designs/Footer.yml',
  `---
ID: "${ID.PD_Footer}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Partial Designs/Footer
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: footer
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Footer, ph: 'headless-footer', uid: '0e0a2000-0001-4000-8000-000000000002', ds: ID.DS_Footer }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Presentation/Page Designs/Default.yml',
  `---
ID: "${ID.Design_Default}"
Parent: "${PAGE_DESIGNS}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Page Designs/Default
SharedFields:
- ID: "${F_PARTIALS}"
  Hint: PartialDesigns
  Value: "${ID.PD_Header}|${ID.PD_Footer}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/Partial Design/Header.yml',
  `---
ID: "${ID.PH_Header}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Placeholder Settings/Partial Design/Header
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "sxa-header"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/Partial Design/Footer.yml',
  `---
ID: "${ID.PH_Footer}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Placeholder Settings/Partial Design/Footer
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "sxa-footer"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

const allowed = RENDERING_IDS.map((id) => u(id)).join('\n    ');

write(
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/headless-main.yml',
  `---
ID: "${ID.PH_MainSite}"
Parent: "${PH_SITE}"
Template: "${T_PH}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Placeholder Settings/headless-main
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "headless-main"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    ${u(ID.AR_Openhand)}
    ${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/placeholder-settings/nonprofit/headless-main.yml',
  `---
ID: "${ID.PH_MainProject}"
Parent: "${PH_PROJECT}"
Template: "${T_PH_PROJECT}"
Path: /sitecore/layout/Placeholder Settings/Project/nonprofit/headless-main
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "headless-main"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    ${u(ID.AR_Openhand)}
    ${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/nonprofit/nonprofit/Presentation/Available Renderings/Openhand.yml',
  `---
ID: "${ID.AR_Openhand}"
Parent: "${AVAIL_REND}"
Template: "${T_AVAIL}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Available Renderings/Openhand
SharedFields:
- ID: "${F_AR_REND}"
  Hint: Renderings
  Value: |
    ${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/nonprofit/nonprofit/Home.yml',
  `---
ID: "${HOME_ID}"
Parent: "${SITE_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/nonprofit/nonprofit/Home
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(ID.Design_Default)}"
- ID: "c7c26117-dbb1-42b2-ab5e-f7223845cca3"
  Hint: __Thumbnail
  Value: |
    <image mediaid="{A8DB4BE5-E32D-4345-B40C-85CA3DA23337}" />
- ID: "f6d8a61c-2f84-4401-bd24-52d2068172bc"
  Hint: __Originator
  Value: "{F558BEC9-C602-4D7A-B9A1-D0411C946EA4}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(
      [
        { id: ID.HomeHero, ph: 'headless-main', uid: '0e0a1000-0001-4000-8000-000000000001', ds: ID.DS_HeroHome },
        { id: ID.PromoGrid, ph: 'headless-main', uid: '0e0a1000-0001-4000-8000-000000000002' },
      ],
      { assignLayout: true }
    )}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: Home
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: Openhand
`
);

const pages = [
  { id: ID.P_GetHelp, parent: HOME_ID, path: 'get-help', title: 'Get help', nav: 'Get help', r: ID.AdviceLanding },
  { id: ID.P_Energy, parent: ID.P_GetHelp, path: 'get-help/help-with-energy-bills', title: 'Help with energy bills', nav: 'Help with energy bills', r: ID.AdviceArticle },
  { id: ID.P_Rent, parent: ID.P_GetHelp, path: 'get-help/what-to-do-if-you-cannot-pay-your-rent', title: 'What to do if you cannot pay your rent', nav: 'Rent', r: ID.AdviceArticle },
  { id: ID.P_AZ, parent: ID.P_GetHelp, path: 'get-help/a-z', title: 'A–Z of help', nav: 'A–Z', r: ID.AdviceIndex },
  { id: ID.P_NearYou, parent: ID.P_GetHelp, path: 'get-help/near-you', title: 'Help near you', nav: 'Near you', r: ID.PartnerFinder },
  { id: ID.P_Partners, parent: HOME_ID, path: 'partners', title: 'Partners', nav: 'Partners', r: ID.PartnerFinder },
  { id: ID.P_Northgate, parent: ID.P_Partners, path: 'partners/northgate-community-hub', title: 'Northgate Community Hub', nav: 'Northgate', r: ID.PartnerPage },
  { id: ID.P_StMarks, parent: ID.P_Partners, path: 'partners/st-marks-crisis-centre', title: "St Mark's Crisis Centre", nav: "St Mark's", r: ID.PartnerPage },
  { id: ID.P_Riverside, parent: ID.P_Partners, path: 'partners/riverside-advice-service', title: 'Riverside Advice Service', nav: 'Riverside', r: ID.PartnerPage },
  { id: ID.P_Appeals, parent: HOME_ID, path: 'appeals', title: 'Appeals', nav: 'Appeals', r: ID.AppealPage },
  { id: ID.P_Winter, parent: ID.P_Appeals, path: 'appeals/winter', title: 'Winter warmth', nav: 'Winter', r: ID.AppealPage },
  { id: ID.P_Emergency, parent: ID.P_Appeals, path: 'appeals/emergency', title: 'Emergency response', nav: 'Emergency', r: ID.AppealPage },
  { id: ID.P_Donate, parent: HOME_ID, path: 'donate', title: 'Donate', nav: 'Donate', r: ID.DonateSelector },
  { id: ID.P_Fundraise, parent: HOME_ID, path: 'fundraise', title: 'Fundraise', nav: 'Fundraise', r: ID.FundraiseGrid },
  { id: ID.P_Campaigns, parent: HOME_ID, path: 'campaigns', title: 'Campaigns', nav: 'Campaigns', r: ID.CampaignAction },
  { id: ID.P_FairEnergy, parent: ID.P_Campaigns, path: 'campaigns/fair-energy', title: 'Fair energy', nav: 'Fair energy', r: ID.CampaignAction },
  { id: ID.P_Stories, parent: HOME_ID, path: 'stories', title: 'Stories', nav: 'Stories', r: ID.StoryList },
  { id: ID.P_Maria, parent: ID.P_Stories, path: 'stories/maria-winter-bills', title: 'The meter went dark in January', nav: 'Maria', r: ID.StoryDetail },
  { id: ID.P_Jamal, parent: ID.P_Stories, path: 'stories/jamal-first-parcel', title: 'The first parcel was harder than asking', nav: 'Jamal', r: ID.StoryDetail },
  { id: ID.P_Search, parent: HOME_ID, path: 'search', title: 'Search', nav: 'Search', r: ID.SiteSearch },
  { id: ID.P_Cms, parent: HOME_ID, path: 'cms', title: 'Mini CMS', nav: 'CMS', r: ID.MiniCms },
  { id: ID.P_Scrunch, parent: HOME_ID, path: 'scrunch', title: 'Scrunch Monitor', nav: 'Scrunch', r: ID.ScrunchMonitor },
  { id: ID.P_Email, parent: HOME_ID, path: 'email', title: 'Supporter email', nav: 'Email', r: ID.EmailPreview },
  { id: ID.P_Storyboard, parent: HOME_ID, path: 'storyboard', title: 'Storyboard', nav: 'Storyboard', r: ID.StoryBoard },
];

let n = 10;
for (const page of pages) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/${page.path}.yml`,
    pageYaml({
      id: page.id,
      parent: page.parent,
      itemPath: `/sitecore/content/nonprofit/nonprofit/Home/${page.path}`,
      title: page.title.replace(/"/g, '\\"'),
      nav: page.nav.replace(/"/g, '\\"'),
      renderings: [{ id: page.r, ph: 'headless-main', uid: `0e0a1000-0002-4000-8000-${String(n).padStart(12, '0')}` }],
    })
  );
  n += 1;
}

console.log('Openhand nonprofit site YAML generated.');
