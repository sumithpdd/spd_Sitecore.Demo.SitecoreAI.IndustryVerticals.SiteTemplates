/**
 * Capco isolated site: JSON renderings, PersonPage, Header/Footer partials, pages.
 * GUID prefix c4c0. Paths match capco.module.json. Collection IDs from generated site.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SITE_ID = '60cc3f57-e6d7-48e5-8e50-761f64fe2c65';
const HOME_ID = '0a0eb8d0-95d9-4e82-8183-7ca05ecc558a';
const HOME_TEMPLATE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';
const DATA_ID = '36a3495a-7fd3-4936-942b-53fb5c0efde6';
const PARTIALS = 'f9c66ee9-45de-46c2-88b2-4e617a89cc83';
const PAGE_DESIGNS = '58254b03-d1cf-46f4-a483-6e6316cf4314';
const AVAIL_REND = 'c9be51cf-ca98-436d-8ce7-edbd5227f348';
const PH_PARTIAL = 'c3c983ef-e49f-470e-bc17-f822822cfb35';
const PH_SITE = '94b2eb67-3a64-40f7-89a7-280bbf119460';
const PH_PROJECT = '875125e9-16c8-43bf-87f2-366b26c731e4';
const REND_FOLDER = '781e3f75-3bb2-4c5b-95e7-39fc5425a522';
const TEMPL_FOLDER = '93543cf4-8b05-4714-ba7d-38d0094d9e74';
const PROMOS_FOLDER = '60f469c5-5776-427c-909d-a04896b908b5';

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
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';

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
const F_WORKFLOW = 'a4f985d9-98b3-4b52-aaaf-4344f6e747c6';
const F_WF_STATE = '3e431de1-525e-47a3-b6b0-1ccbec3a8c98';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PARTIALS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_AR_REND = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_ALLOWED = 'e391b526-d0c5-439d-803e-17512eae6222';
const F_PROMO_IMG = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
const F_PROMO_MORE = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const F_PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const F_PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const F_PROMO_SUB = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';

const ID = {
  Header: 'c4c00001-1111-4000-8000-000000000001',
  Footer: 'c4c00001-1111-4000-8000-000000000002',
  HeroBanner: 'c4c00001-1111-4000-8000-000000000003',
  Promo: 'c4c00001-1111-4000-8000-000000000004',
  PeopleSearch: 'c4c00001-1111-4000-8000-000000000005',
  PersonProfile: 'c4c00001-1111-4000-8000-000000000006',
  ArticleDetails: 'c4c00001-1111-4000-8000-000000000007',
  StoryHeard: 'c4c00001-1111-4000-8000-000000000008',
  StoryBoard: 'c4c00001-1111-4000-8000-000000000009',
  ArticleListing: 'c4c00001-1111-4000-8000-00000000000a',
  PageHeading: 'c4c00001-1111-4000-8000-00000000000b',
  SiteSearch: 'c4c00001-1111-4000-8000-00000000000c',
  InfographicBlock: 'c4c00001-1111-4000-8000-000000000013',
  MediaEmbed: 'c4c00001-1111-4000-8000-000000000014',
  PD_Header: 'c4c00004-4444-4000-8000-000000000001',
  PD_Footer: 'c4c00004-4444-4000-8000-000000000002',
  Design_Default: 'c4c00005-5555-4000-8000-000000000001',
  PH_Header: 'c4c00007-7777-4000-8000-000000000001',
  PH_Footer: 'c4c00007-7777-4000-8000-000000000002',
  AR_Capco: 'c4c00008-8888-4000-8000-000000000001',
  Tpl_HeaderFolder: 'c4c00010-0000-4000-8000-000000000001',
  Tpl_Header: 'c4c00010-0000-4000-8000-000000000002',
  Tpl_HeaderData: 'c4c00010-0000-4000-8000-000000000003',
  Tpl_BrandName: 'c4c00010-0000-4000-8000-000000000004',
  Tpl_Logo: 'c4c00010-0000-4000-8000-000000000005',
  Tpl_HeroFolder: 'c4c00010-0000-4000-8000-000000000010',
  Tpl_Hero: 'c4c00010-0000-4000-8000-000000000011',
  Tpl_HeroData: 'c4c00010-0000-4000-8000-000000000012',
  Tpl_HeroTitle: 'c4c00010-0000-4000-8000-000000000013',
  Tpl_HeroDesc: 'c4c00010-0000-4000-8000-000000000014',
  Tpl_HeroImage: 'c4c00010-0000-4000-8000-000000000015',
  Tpl_HeroCta: 'c4c00010-0000-4000-8000-000000000016',
  Tpl_FooterFolder: 'c4c00010-0000-4000-8000-000000000020',
  Tpl_Footer: 'c4c00010-0000-4000-8000-000000000021',
  Tpl_FooterData: 'c4c00010-0000-4000-8000-000000000022',
  Tpl_Copyright: 'c4c00010-0000-4000-8000-000000000023',
  Tpl_FooterLogo: 'c4c00010-0000-4000-8000-000000000024',
  Tpl_PersonPage: 'c4c00010-0000-4000-8000-000000000030',
  Tpl_PersonSec: 'c4c00010-0000-4000-8000-000000000031',
  Tpl_JobTitle: 'c4c00010-0000-4000-8000-000000000032',
  Tpl_Phone: 'c4c00010-0000-4000-8000-000000000033',
  Tpl_Email: 'c4c00010-0000-4000-8000-000000000034',
  Tpl_Office: 'c4c00010-0000-4000-8000-000000000035',
  Tpl_LinkedIn: 'c4c00010-0000-4000-8000-000000000036',
  Tpl_Bio: 'c4c00010-0000-4000-8000-000000000037',
  Tpl_Photo: 'c4c00010-0000-4000-8000-000000000038',
  Tpl_Specialisms: 'c4c00010-0000-4000-8000-000000000039',
  Tpl_Credentials: 'c4c00010-0000-4000-8000-00000000003a',
  Wf_Page: 'c4c00040-0000-4000-8000-000000000001',
  Wf_Approved: 'c4c00040-0000-4000-8000-00000000000a',
  DS_Headers: 'c4c00020-0000-4000-8000-000000000001',
  DS_Header: 'c4c00020-0000-4000-8000-000000000002',
  DS_Heroes: 'c4c00020-0000-4000-8000-000000000010',
  DS_HeroHome: 'c4c00020-0000-4000-8000-000000000011',
  DS_Footers: 'c4c00020-0000-4000-8000-000000000020',
  DS_Footer: 'c4c00020-0000-4000-8000-000000000021',
  DS_PromoExpertise: 'c4c00020-0000-4000-8000-000000000030',
  DS_PromoThinking: 'c4c00020-0000-4000-8000-000000000031',
  P_People: 'c4c00030-0000-4000-8000-000000000001',
  P_Elisabeth: 'c4c00030-0000-4000-8000-000000000002',
  P_Charlotte: 'c4c00030-0000-4000-8000-000000000003',
  P_AnneMarie: 'c4c00030-0000-4000-8000-000000000004',
  P_Marina: 'c4c00030-0000-4000-8000-000000000005',
  P_Perspectives: 'c4c00030-0000-4000-8000-000000000010',
  P_TPlus1: 'c4c00030-0000-4000-8000-000000000012',
  P_Industries: 'c4c00030-0000-4000-8000-000000000020',
  P_Banking: 'c4c00030-0000-4000-8000-000000000021',
  P_Capital: 'c4c00030-0000-4000-8000-000000000022',
  P_Insurance: 'c4c00030-0000-4000-8000-000000000023',
  P_Wealth: 'c4c00030-0000-4000-8000-000000000024',
  P_Energy: 'c4c00030-0000-4000-8000-000000000025',
  P_Careers: 'c4c00030-0000-4000-8000-000000000026',
  P_About: 'c4c00030-0000-4000-8000-000000000027',
  P_Story: 'c4c00030-0000-4000-8000-000000000040',
  P_Heard: 'c4c00030-0000-4000-8000-000000000041',
  P_Search: 'c4c00030-0000-4000-8000-000000000042',
};

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
      Value: 20260909T120000Z
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
Path: /sitecore/layout/Renderings/Project/capco/${name}
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
Path: "/sitecore/templates/Project/capco/${name}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateItem(id, parent, itemPath, { icon = 'Office/32x32/window_star.png', bases = '', sort = 100 } = {}) {
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
  Value: ${icon}
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

function pageYaml({
  id,
  parent,
  itemPath,
  title,
  nav,
  templateId = HOME_TEMPLATE,
  renderings = [],
  extraVersion = '',
}) {
  const layout = renderings.length
    ? `- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(renderings, { assignLayout: true })}
`
    : '';
  const onPageWorkflow = templateId === ID.Tpl_PersonPage;
  const workflow = onPageWorkflow
    ? `- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "${u(ID.Wf_Page)}"
`
    : '';
  const wfState = onPageWorkflow
    ? `    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "${u(ID.Wf_Approved)}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: ${itemPath}
SharedFields:
${workflow}- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(ID.Design_Default)}"
${layout}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${wfState}${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
${extraVersion}`;
}

const dsLoc = (folderTmpl) =>
  `query:$site/*[@@name='Data']/*[@@templatename='${folderTmpl}']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${folderTmpl}']`;

// --- Json renderings ---
write(
  'serialized-content/renderings/capco/Header.yml',
  jsonRendering({
    id: ID.Header,
    name: 'Header',
    componentName: 'Header',
    dsTemplate: '/sitecore/templates/Project/capco/Header Templates/Header',
    dsLocation: dsLoc('Header Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/capco/Footer.yml',
  jsonRendering({
    id: ID.Footer,
    name: 'Footer',
    componentName: 'Footer',
    dsTemplate: '/sitecore/templates/Project/capco/Footer Templates/Footer',
    dsLocation: dsLoc('Footer Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/capco/HeroBanner.yml',
  jsonRendering({
    id: ID.HeroBanner,
    name: 'HeroBanner',
    componentName: 'HeroBanner',
    dsTemplate: '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner',
    dsLocation: dsLoc('HeroBanner Folder'),
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/Promo.yml',
  jsonRendering({
    id: ID.Promo,
    name: 'Promo',
    componentName: 'Promo',
    dsTemplate: '/sitecore/templates/Feature/JSS Experience Accelerator/Page Content/Promo',
    dsLocation: `query:$site/*[@@name='Data']/*[@@templatename='Promo Folder']|query:$sharedSites/*[@@name='Data']/*[@@templatename='Promo Folder']`,
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/PeopleSearch.yml',
  jsonRendering({
    id: ID.PeopleSearch,
    name: 'PeopleSearch',
    componentName: 'PeopleSearch',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/PersonProfile.yml',
  jsonRendering({
    id: ID.PersonProfile,
    name: 'PersonProfile',
    componentName: 'PersonProfile',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/ArticleDetails.yml',
  jsonRendering({
    id: ID.ArticleDetails,
    name: 'ArticleDetails',
    componentName: 'ArticleDetails',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/StoryHeard.yml',
  jsonRendering({
    id: ID.StoryHeard,
    name: 'StoryHeard',
    componentName: 'StoryHeard',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/StoryBoard.yml',
  jsonRendering({
    id: ID.StoryBoard,
    name: 'StoryBoard',
    componentName: 'StoryBoard',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/ArticleListing.yml',
  jsonRendering({
    id: ID.ArticleListing,
    name: 'ArticleListing',
    componentName: 'ArticleListing',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/PageHeading.yml',
  jsonRendering({
    id: ID.PageHeading,
    name: 'PageHeading',
    componentName: 'PageHeading',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/SiteSearch.yml',
  jsonRendering({
    id: ID.SiteSearch,
    name: 'SiteSearch',
    componentName: 'SiteSearch',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/InfographicBlock.yml',
  jsonRendering({
    id: ID.InfographicBlock,
    name: 'InfographicBlock',
    componentName: 'InfographicBlock',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/capco/MediaEmbed.yml',
  jsonRendering({
    id: ID.MediaEmbed,
    name: 'MediaEmbed',
    componentName: 'MediaEmbed',
    paramId: PARAM_HERO,
  })
);

// --- Templates ---
write('serialized-content/templates/capco/Header Templates.yml', templateFolder(ID.Tpl_HeaderFolder, 'Header Templates'));
const HEADER_FOLDER_TPL = 'c4c00010-0000-4000-8000-00000000000a';
write(
  'serialized-content/templates/capco/Header Templates/Header Folder.yml',
  templateItem(HEADER_FOLDER_TPL, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/capco/Header Templates/Header Folder')
);
write(
  'serialized-content/templates/capco/Header Templates/Header.yml',
  templateItem(ID.Tpl_Header, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/capco/Header Templates/Header', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/capco/Header Templates/Header/Data.yml',
  sectionItem(ID.Tpl_HeaderData, ID.Tpl_Header, '/sitecore/templates/Project/capco/Header Templates/Header/Data')
);
write(
  'serialized-content/templates/capco/Header Templates/Header/Data/BrandName.yml',
  fieldItem(ID.Tpl_BrandName, ID.Tpl_HeaderData, '/sitecore/templates/Project/capco/Header Templates/Header/Data/BrandName', 'Single-Line Text', 100, 'BrandName')
);
write(
  'serialized-content/templates/capco/Header Templates/Header/Data/Logo.yml',
  fieldItem(ID.Tpl_Logo, ID.Tpl_HeaderData, '/sitecore/templates/Project/capco/Header Templates/Header/Data/Logo', 'Image', 200, 'Logo')
);

write('serialized-content/templates/capco/HeroBanner Templates.yml', templateFolder(ID.Tpl_HeroFolder, 'HeroBanner Templates'));
const HERO_FOLDER_TPL = 'c4c00010-0000-4000-8000-00000000001a';
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner Folder.yml',
  templateItem(HERO_FOLDER_TPL, ID.Tpl_HeroFolder, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner Folder')
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner.yml',
  templateItem(ID.Tpl_Hero, ID.Tpl_HeroFolder, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data.yml',
  sectionItem(ID.Tpl_HeroData, ID.Tpl_Hero, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data')
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/Title.yml',
  fieldItem(ID.Tpl_HeroTitle, ID.Tpl_HeroData, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/Title', 'Single-Line Text', 100, 'Title')
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/Description.yml',
  fieldItem(ID.Tpl_HeroDesc, ID.Tpl_HeroData, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/Description', 'Rich Text', 200, 'Description')
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/Image.yml',
  fieldItem(ID.Tpl_HeroImage, ID.Tpl_HeroData, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/Image', 'Image', 300, 'Image')
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/CtaLink.yml',
  fieldItem(ID.Tpl_HeroCta, ID.Tpl_HeroData, '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/CtaLink', 'General Link', 400, 'Primary CTA')
);

write('serialized-content/templates/capco/Footer Templates.yml', templateFolder(ID.Tpl_FooterFolder, 'Footer Templates'));
const FOOTER_FOLDER_TPL = 'c4c00010-0000-4000-8000-00000000002a';
write(
  'serialized-content/templates/capco/Footer Templates/Footer Folder.yml',
  templateItem(FOOTER_FOLDER_TPL, ID.Tpl_FooterFolder, '/sitecore/templates/Project/capco/Footer Templates/Footer Folder')
);
write(
  'serialized-content/templates/capco/Footer Templates/Footer.yml',
  templateItem(ID.Tpl_Footer, ID.Tpl_FooterFolder, '/sitecore/templates/Project/capco/Footer Templates/Footer', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/capco/Footer Templates/Footer/Data.yml',
  sectionItem(ID.Tpl_FooterData, ID.Tpl_Footer, '/sitecore/templates/Project/capco/Footer Templates/Footer/Data')
);
write(
  'serialized-content/templates/capco/Footer Templates/Footer/Data/CopyrightText.yml',
  fieldItem(ID.Tpl_Copyright, ID.Tpl_FooterData, '/sitecore/templates/Project/capco/Footer Templates/Footer/Data/CopyrightText', 'Single-Line Text', 100, 'CopyrightText')
);
write(
  'serialized-content/templates/capco/Footer Templates/Footer/Data/Logo.yml',
  fieldItem(ID.Tpl_FooterLogo, ID.Tpl_FooterData, '/sitecore/templates/Project/capco/Footer Templates/Footer/Data/Logo', 'Image', 200, 'Logo')
);

write(
  'serialized-content/templates/capco/PersonPage.yml',
  templateItem(ID.Tpl_PersonPage, TEMPL_FOLDER, '/sitecore/templates/Project/capco/PersonPage', {
    icon: 'Office/32x32/user1.png',
    bases: `${u(HOME_TEMPLATE)}`,
    sort: 400,
  })
);
write(
  'serialized-content/templates/capco/PersonPage/Person.yml',
  sectionItem(ID.Tpl_PersonSec, ID.Tpl_PersonPage, '/sitecore/templates/Project/capco/PersonPage/Person')
);
const personFields = [
  [ID.Tpl_JobTitle, 'JobTitle', 'Single-Line Text', 100],
  [ID.Tpl_Phone, 'Phone', 'Single-Line Text', 200],
  [ID.Tpl_Email, 'Email', 'Single-Line Text', 300],
  [ID.Tpl_Office, 'Office', 'Single-Line Text', 400],
  [ID.Tpl_LinkedIn, 'LinkedIn', 'Single-Line Text', 500],
  [ID.Tpl_Bio, 'Biography', 'Rich Text', 600],
  [ID.Tpl_Photo, 'Photo', 'Image', 700],
  [ID.Tpl_Specialisms, 'Specialisms', 'Treelist', 800],
  [ID.Tpl_Credentials, 'Credentials', 'Rich Text', 900],
];
for (const [fid, name, type, sort] of personFields) {
  write(
    `serialized-content/templates/capco/PersonPage/Person/${name}.yml`,
    fieldItem(fid, ID.Tpl_PersonSec, `/sitecore/templates/Project/capco/PersonPage/Person/${name}`, type, sort, name)
  );
}

// --- Presentation ---
write(
  'serialized-content/capco/capco/Presentation/Partial Designs/Header.yml',
  `---
ID: "${ID.PD_Header}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/capco/capco/Presentation/Partial Designs/Header
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: header
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Header, ph: 'headless-header', uid: 'c4c02000-0001-4000-8000-000000000001', ds: ID.DS_Header }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/capco/capco/Presentation/Partial Designs/Footer.yml',
  `---
ID: "${ID.PD_Footer}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/capco/capco/Presentation/Partial Designs/Footer
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: footer
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Footer, ph: 'headless-footer', uid: 'c4c02000-0002-4000-8000-000000000001', ds: ID.DS_Footer }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/capco/capco/Presentation/Page Designs/Default.yml',
  `---
ID: "${ID.Design_Default}"
Parent: "${PAGE_DESIGNS}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/capco/capco/Presentation/Page Designs/Default
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
const arList = [
  ID.Header,
  ID.Footer,
  ID.HeroBanner,
  ID.Promo,
  ID.PeopleSearch,
  ID.PersonProfile,
  ID.ArticleDetails,
  ID.StoryHeard,
  ID.StoryBoard,
  ID.ArticleListing,
  ID.PageHeading,
  ID.SiteSearch,
  ID.InfographicBlock,
  ID.MediaEmbed,
]
  .map((id) => `    ${u(id)}`)
  .join('\n');

write(
  'serialized-content/capco/capco/Presentation/Available Renderings/Capco.yml',
  `---
ID: "${ID.AR_Capco}"
Parent: "${AVAIL_REND}"
Template: "${T_AVAIL}"
Path: "/sitecore/content/capco/capco/Presentation/Available Renderings/Capco"
SharedFields:
- ID: "${F_AR_REND}"
  Hint: Renderings
  Value: |
${arList}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/capco/capco/Presentation/Placeholder Settings/Partial Design/Header.yml',
  `---
ID: "${ID.PH_Header}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: "/sitecore/content/capco/capco/Presentation/Placeholder Settings/Partial Design/Header"
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
  'serialized-content/capco/capco/Presentation/Placeholder Settings/Partial Design/Footer.yml',
  `---
ID: "${ID.PH_Footer}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: "/sitecore/content/capco/capco/Presentation/Placeholder Settings/Partial Design/Footer"
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
write(
  'serialized-content/capco/capco/Presentation/Placeholder Settings/headless-main.yml',
  `---
ID: "c4c00009-9999-4000-8000-000000000009"
Parent: "${PH_SITE}"
Template: "${T_PH}"
Path: "/sitecore/content/capco/capco/Presentation/Placeholder Settings/headless-main"
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "headless-main"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    {DEED663C-7220-4467-9C9B-27EB012E5241}
    {BA530801-C2E8-444F-973A-849D99A146DA}
    {92E819E1-6DA2-4F1E-A2DF-C41516370FF9}
    {5C99DF40-1695-44B0-A432-B83FCE1B75D2}
    {4D84E0C8-4C2C-4082-95DE-3CF8A180927B}
    {9AAFA00C-B32D-49BE-AF94-B3D91A662C40}
    {C5F905F8-FD1F-444E-A9E5-AC6B774FF0DE}
    {2492BAC4-DA07-4C86-87F0-9873D40E2276}
    {9C6D53E3-FE57-4638-AF7B-6D68304C7A94}
    {3836D951-BB14-43AC-9231-649B7F245DC5}
    {7A1D9A21-B8D7-42F9-9B0B-92ABF8D1974F}
    {15CABDFF-FFD9-48F4-826D-A4C3D7868D3A}
    {5F6BF7C9-C80C-4BBD-AD78-8DA749B35206}
    {AB2EDBA0-3960-4F12-B765-579DC231894A}
    {1DEB067F-0BB1-405E-94F5-2ABB537A6160}
    {4956263D-1195-4D6E-931B-800EA625FF6F}
    {62DD1639-9F28-4040-8738-C886480B2127}
    {CAA0C742-F052-49FB-825B-A03494798DB7}
    {DDC43BE7-D77A-4CE3-9282-03DD036EEC6D}
    ${u(ID.HeroBanner)}
    ${u(ID.Promo)}
    ${u(ID.PeopleSearch)}
    ${u(ID.ArticleListing)}
    ${u(ID.PageHeading)}
    ${u(ID.SiteSearch)}
    ${u(ID.InfographicBlock)}
    ${u(ID.MediaEmbed)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/placeholder-settings/capco/headless-main.yml',
  `---
ID: "c4c00009-aaaa-4000-8000-000000000001"
Parent: "${PH_PROJECT}"
Template: "${T_PH_PROJECT}"
Path: "/sitecore/layout/Placeholder Settings/Project/capco/headless-main"
SharedFields:
- ID: "${F_PH_KEY}"
  Hint: Placeholder Key
  Value: "headless-main"
- ID: "${F_ALLOWED}"
  Hint: Allowed Controls
  Value: |
    {DEED663C-7220-4467-9C9B-27EB012E5241}
    {BA530801-C2E8-444F-973A-849D99A146DA}
    {92E819E1-6DA2-4F1E-A2DF-C41516370FF9}
    {5C99DF40-1695-44B0-A432-B83FCE1B75D2}
    {4D84E0C8-4C2C-4082-95DE-3CF8A180927B}
    {9AAFA00C-B32D-49BE-AF94-B3D91A662C40}
    {C5F905F8-FD1F-444E-A9E5-AC6B774FF0DE}
    {2492BAC4-DA07-4C86-87F0-9873D40E2276}
    {9C6D53E3-FE57-4638-AF7B-6D68304C7A94}
    {3836D951-BB14-43AC-9231-649B7F245DC5}
    {7A1D9A21-B8D7-42F9-9B0B-92ABF8D1974F}
    {15CABDFF-FFD9-48F4-826D-A4C3D7868D3A}
    {5F6BF7C9-C80C-4BBD-AD78-8DA749B35206}
    {AB2EDBA0-3960-4F12-B765-579DC231894A}
    {1DEB067F-0BB1-405E-94F5-2ABB537A6160}
    {4956263D-1195-4D6E-931B-800EA625FF6F}
    {62DD1639-9F28-4040-8738-C886480B2127}
    {CAA0C742-F052-49FB-825B-A03494798DB7}
    {DDC43BE7-D77A-4CE3-9282-03DD036EEC6D}
    ${u(ID.HeroBanner)}
    ${u(ID.Promo)}
    ${u(ID.PeopleSearch)}
    ${u(ID.ArticleListing)}
    ${u(ID.PageHeading)}
    ${u(ID.SiteSearch)}
    ${u(ID.InfographicBlock)}
    ${u(ID.MediaEmbed)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

// --- Data ---
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

write(
  'serialized-content/capco/capco/Data/Headers.yml',
  folderDs(ID.DS_Headers, DATA_ID, '/sitecore/content/capco/capco/Data/Headers', HEADER_FOLDER_TPL)
);
write(
  'serialized-content/capco/capco/Data/Headers/Main Header.yml',
  `---
ID: "${ID.DS_Header}"
Parent: "${ID.DS_Headers}"
Template: "${ID.Tpl_Header}"
Path: /sitecore/content/capco/capco/Data/Headers/Main Header
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_BrandName}"
      Hint: BrandName
      Value: Capco
    - ID: "${ID.Tpl_Logo}"
      Hint: Logo
      Value: |
        <image src="/capco/capco-logo.png" alt="Capco" width="320" height="64" />
`
);
write(
  'serialized-content/capco/capco/Data/Hero Banners.yml',
  folderDs(ID.DS_Heroes, DATA_ID, '/sitecore/content/capco/capco/Data/Hero Banners', HERO_FOLDER_TPL)
);
write(
  'serialized-content/capco/capco/Data/Hero Banners/Home Hero.yml',
  `---
ID: "${ID.DS_HeroHome}"
Parent: "${ID.DS_Heroes}"
Template: "${ID.Tpl_Hero}"
Path: /sitecore/content/capco/capco/Data/Hero Banners/Home Hero
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_HeroTitle}"
      Hint: Title
      Value: The Expert Advantage
    - ID: "${ID.Tpl_HeroDesc}"
      Hint: Description
      Value: <p>We connect vision to value through bold insights, global perspectives and an entrepreneurial approach across Financial Services and Energy.</p>
    - ID: "${ID.Tpl_HeroCta}"
      Hint: CtaLink
      Value: |
        <link text="View all insights" linktype="internal" url="/perspectives" anchor="" target="" title="" class="" id="${ID.P_Perspectives}" />
    - ID: "${ID.Tpl_HeroImage}"
      Hint: Image
      Value: |
        <image src="/capco/capco-hero.jpg" alt="The Expert Advantage" width="1920" height="1080" />
`
);
write(
  'serialized-content/capco/capco/Data/Footers.yml',
  folderDs(ID.DS_Footers, DATA_ID, '/sitecore/content/capco/capco/Data/Footers', FOOTER_FOLDER_TPL)
);
write(
  'serialized-content/capco/capco/Data/Footers/Main Footer.yml',
  `---
ID: "${ID.DS_Footer}"
Parent: "${ID.DS_Footers}"
Template: "${ID.Tpl_Footer}"
Path: /sitecore/content/capco/capco/Data/Footers/Main Footer
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_Copyright}"
      Hint: CopyrightText
      Value: © Capco 2026, A Wipro Company
    - ID: "${ID.Tpl_FooterLogo}"
      Hint: Logo
      Value: |
        <image src="/capco/capco-logo.png" alt="Capco" width="320" height="64" />
`
);

function promoYaml(id, name, title, sub, desc, linkText, linkUrl, linkId) {
  return `---
ID: "${id}"
Parent: "${PROMOS_FOLDER}"
Template: "${T_PROMO}"
Path: /sitecore/content/capco/capco/Data/Promos/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_PROMO_SUB}"
      Hint: PromoSubTitle
      Value: ${sub}
    - ID: "${F_PROMO_TITLE}"
      Hint: PromoTitle
      Value: ${title}
    - ID: "${F_PROMO_DESC}"
      Hint: PromoDescription
      Value: |
        <p>${desc}</p>
    - ID: "${F_PROMO_MORE}"
      Hint: PromoMoreInfo
      Value: |
        <link text="${linkText}" linktype="internal" url="${linkUrl}" anchor="" target="" title="" class="" id="${linkId}" />
    - ID: "${F_PROMO_IMG}"
      Hint: PromoIcon
      Value: |
        <image src="/capco/${name.toLowerCase()}.jpg" alt="${title}" width="1600" height="900" />
`;
}

write(
  'serialized-content/capco/capco/Data/Promos/Expertise.yml',
  promoYaml(
    ID.DS_PromoExpertise,
    'Expertise',
    'Deep industry expertise',
    'Financial Services and Energy',
    'For nearly three decades Capco has helped clients navigate complexity, lead change, and unlock value across Banking and Payments, Capital Markets, Insurance, Wealth, and Energy.',
    'Explore industries',
    '/industries',
    ID.P_Industries
  )
);
write(
  'serialized-content/capco/capco/Data/Promos/Thinking.yml',
  promoYaml(
    ID.DS_PromoThinking,
    'Thinking',
    'We connect vision to value',
    'Perspectives',
    'Bold insights, global perspectives and an entrepreneurial approach — from T+1 settlement readiness to agentic AI in energy trading.',
    'View all insights',
    '/perspectives',
    ID.P_Perspectives
  )
);

// --- Home (preserve originator / branch) ---
write(
  'serialized-content/capco/capco/Home.yml',
  `---
ID: "${HOME_ID}"
Parent: "${SITE_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/capco/capco/Home
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(ID.Design_Default)}"
- ID: "c7c26117-dbb1-42b2-ab5e-f7223845cca3"
  Hint: __Thumbnail
  Value: |
    <image mediaid="{553D9DB1-80FA-43B2-BE56-007F0AA8EB59}" />
- ID: "f6d8a61c-2f84-4401-bd24-52d2068172bc"
  Hint: __Originator
  Value: "{F558BEC9-C602-4D7A-B9A1-D0411C946EA4}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(
      [
        { id: ID.HeroBanner, ph: 'headless-main', uid: 'c4c01000-0001-4000-8000-000000000001', ds: ID.DS_HeroHome },
        { id: ID.Promo, ph: 'headless-main', uid: 'c4c01000-0001-4000-8000-000000000002', ds: ID.DS_PromoExpertise },
        { id: ID.Promo, ph: 'headless-main', uid: 'c4c01000-0001-4000-8000-000000000003', ds: ID.DS_PromoThinking },
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
      Value: Capco
`
);

const peopleIntro =
  'Consultants are the product. Browse Capco people by industry, capability and location — from T+1 settlement in London to careers stories in Brazil — and find the expert who matches the problem.';

write(
  'serialized-content/capco/capco/Home/people.yml',
  pageYaml({
    id: ID.P_People,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/people',
    title: 'People',
    nav: 'People',
    renderings: [{ id: ID.PeopleSearch, ph: 'headless-main', uid: 'c4c01000-0002-4000-8000-000000000001' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>${peopleIntro}</p>
`,
  })
);

function personYaml(p) {
  return pageYaml({
    id: p.id,
    parent: ID.P_People,
    itemPath: `/sitecore/content/capco/capco/Home/people/${p.slug}`,
    title: p.name,
    nav: p.name,
    templateId: ID.Tpl_PersonPage,
    renderings: [{ id: ID.PersonProfile, ph: 'headless-main', uid: p.uid }],
    extraVersion: `    - ID: "${ID.Tpl_JobTitle}"
      Hint: JobTitle
      Value: "${p.job}"
    - ID: "${ID.Tpl_Phone}"
      Hint: Phone
      Value: "${p.phone}"
    - ID: "${ID.Tpl_Email}"
      Hint: Email
      Value: "${p.email}"
    - ID: "${ID.Tpl_Office}"
      Hint: Office
      Value: "${p.office}"
    - ID: "${ID.Tpl_LinkedIn}"
      Hint: LinkedIn
      Value: "${p.linkedin}"
    - ID: "${ID.Tpl_Bio}"
      Hint: Biography
      Value: |
        <p>${p.bio}</p>
    - ID: "${ID.Tpl_Photo}"
      Hint: Photo
      Value: |
        <image src="/capco/${p.slug}.jpg" alt="${p.name}" width="800" height="800" />
    - ID: "${ID.Tpl_Specialisms}"
      Hint: Specialisms
      Value: |
        ${p.specialisms}
    - ID: "${ID.Tpl_Credentials}"
      Hint: Credentials
      Value: |
        ${p.credentials}
`,
  });
}

const people = [
  {
    id: ID.P_Elisabeth,
    slug: 'elisabeth-plakinger',
    name: 'Elisabeth Plakinger',
    job: 'Principal Consultant, Capital Markets',
    phone: '+44 (0) 20 7426 1900',
    email: 'elisabeth.plakinger@capco.com',
    office: 'London',
    linkedin: '',
    uid: 'c4c01000-0003-4000-8000-000000000002',
    bio: 'Elisabeth advises capital markets firms on T+1 settlement readiness across Europe. Her Perspectives writing is the conversion asset Priya finds after a ChatGPT prompt — named consultant, cited insight, same taxonomy.',
    specialisms: '<ul><li>Capital Markets</li><li>T+1 Settlement</li><li>Market Infrastructure</li></ul>',
    credentials:
      '<ul><li>2026 — Europe’s T+1 market must prove readiness</li><li>2014 — Joined Capco</li></ul>',
  },
  {
    id: ID.P_Charlotte,
    slug: 'charlotte-byrne',
    name: 'Charlotte Byrne',
    job: 'Principal Consultant, Banking and Payments',
    phone: '+44 (0) 20 7426 1900',
    email: 'charlotte.byrne@capco.com',
    office: 'London',
    linkedin: '',
    uid: 'c4c01000-0003-4000-8000-000000000003',
    bio: 'Charlotte writes on AI assistants as the new front door to financial services — how banks turn conversational interfaces into the operating model, not a chatbot overlay.',
    specialisms: '<ul><li>Banking and Payments</li><li>AI</li></ul>',
    credentials: '<ul><li>2026 — AI assistants: the new front door to financial services</li><li>Joined Capco</li></ul>',
  },
  {
    id: ID.P_AnneMarie,
    slug: 'anne-marie-rowland',
    name: 'Anne-Marie Rowland',
    job: 'Chief Executive Officer',
    phone: '+44 (0) 20 7426 1900',
    email: 'anne-marie.rowland@capco.com',
    office: 'London',
    linkedin: '',
    uid: 'c4c01000-0003-4000-8000-000000000004',
    bio: 'Anne-Marie leads Capco globally. Our Story is expert-led, AI-infused and impact-focused — The Expert Advantage.',
    specialisms: '<ul><li>Our Story</li><li>Leadership</li></ul>',
    credentials: '<ul><li>Chief Executive Officer, Capco, A Wipro Company</li></ul>',
  },
  {
    id: ID.P_Marina,
    slug: 'marina-costa',
    name: 'Marina Costa',
    job: 'Senior Consultant',
    phone: '+55 11 0000 0000',
    email: 'marina.costa@capco.com',
    office: 'Brazil',
    linkedin: '',
    uid: 'c4c01000-0003-4000-8000-000000000005',
    bio: 'Marina is a Senior Consultant based in Brazil. She appears on Join Us as a Meet our people story — consultants are the product, including the next generation joining Capco.',
    specialisms: '<ul><li>Banking and Payments</li><li>Careers</li></ul>',
    credentials: '<ul><li>2023 — Joined Capco, Brazil</li></ul>',
  },
];

for (const p of people) {
  write(`serialized-content/capco/capco/Home/people/${p.slug}.yml`, personYaml(p));
}

const articleBody = `<p>Europe’s move to T+1 settlement is no longer a calendar event. Markets must prove operational readiness — matching, allocation, funding and exception handling — before the go-live date, not after the first failed settlement.</p>
<p>Elisabeth Plakinger sets out where firms still under-estimate the work: cross-border inventory, agent banks, and the data that has to be right the first time. This Perspective is the AEO surface Priya finds after a ChatGPT prompt — then the named consultant.</p>
<h3>Readiness is evidence, not a programme slide</h3>
<p>Boards want a date. Operations need a control environment. Capco’s work with capital markets organisations is to connect those two — vision to value — so T+1 is a proven operating model, not a weekend cutover.</p>`;

write(
  'serialized-content/capco/capco/Home/perspectives.yml',
  pageYaml({
    id: ID.P_Perspectives,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/perspectives',
    title: 'Perspectives',
    nav: 'Perspectives',
    renderings: [
      { id: ID.PageHeading, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000001' },
      { id: ID.ArticleListing, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000002' },
    ],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>We connect vision to value through bold insights, global perspectives and an entrepreneurial approach.</p>
`,
  })
);
write(
  'serialized-content/capco/capco/Home/perspectives/europes-t-plus-1-market-must-prove-readiness.yml',
  pageYaml({
    id: ID.P_TPlus1,
    parent: ID.P_Perspectives,
    itemPath: '/sitecore/content/capco/capco/Home/perspectives/europes-t-plus-1-market-must-prove-readiness',
    title: "Europe's T+1 market must prove readiness",
    nav: "Europe's T+1 market must prove readiness",
    renderings: [{ id: ID.ArticleDetails, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000003' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${articleBody.split('\n').join('\n        ')}
`,
  })
);

write(
  'serialized-content/capco/capco/Home/industries.yml',
  pageYaml({
    id: ID.P_Industries,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/industries',
    title: 'Expertise',
    nav: 'Expertise',
    renderings: [
      { id: ID.PageHeading, ph: 'headless-main', uid: 'c4c01000-0005-4000-8000-000000000001' },
      { id: ID.Promo, ph: 'headless-main', uid: 'c4c01000-0005-4000-8000-000000000002', ds: ID.DS_PromoExpertise },
    ],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Deep industry expertise across Financial Services and Energy. This is The Expert Advantage.</p>
`,
  })
);

const industries = [
  [ID.P_Banking, 'banking-and-payments', 'Banking and Payments', 'From standalone digital banks to core modernisation and the payments delivery cycle.'],
  [ID.P_Capital, 'capital-markets', 'Capital Markets', 'Transform technology and data, enhance market connectivity, and accelerate revenue — including T+1 readiness.'],
  [ID.P_Insurance, 'insurance', 'Insurance', 'M&amp;A, divestitures and new partnerships — transform capabilities, profitability and compliance.'],
  [ID.P_Wealth, 'wealth-and-asset-management', 'Wealth and Asset Management', 'Stronger client relationships, operational efficiency, control and scale.'],
  [ID.P_Energy, 'energy', 'Energy', 'Energy transition, commodity trading and risk, utilities growth — stay ahead of the pack.'],
];
industries.forEach(([id, slug, title, intro], i) => {
  write(
    `serialized-content/capco/capco/Home/industries/${slug}.yml`,
    pageYaml({
      id,
      parent: ID.P_Industries,
      itemPath: `/sitecore/content/capco/capco/Home/industries/${slug}`,
      title,
      nav: title,
      renderings: [{ id: ID.PageHeading, ph: 'headless-main', uid: `c4c01000-0006-4000-8000-${String(i + 1).padStart(12, '0')}` }],
      extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>${intro}</p>
`,
    })
  );
});

write(
  'serialized-content/capco/capco/Home/careers.yml',
  pageYaml({
    id: ID.P_Careers,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/careers',
    title: 'Join Us',
    nav: 'Join Us',
    renderings: [
      { id: ID.PageHeading, ph: 'headless-main', uid: 'c4c01000-0007-4000-8000-000000000001' },
      { id: ID.Promo, ph: 'headless-main', uid: 'c4c01000-0007-4000-8000-000000000002', ds: ID.DS_PromoExpertise },
    ],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Find your place — ATP, experienced hires, Be Yourself At Work, and Meet our people.</p>
`,
  })
);
write(
  'serialized-content/capco/capco/Home/about-us.yml',
  pageYaml({
    id: ID.P_About,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/about-us',
    title: 'Our Story',
    nav: 'Our Story',
    renderings: [{ id: ID.PageHeading, ph: 'headless-main', uid: 'c4c01000-0007-4000-8000-000000000003' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Expert-led, AI-infused, impact-focused. For nearly three decades Capco has helped clients navigate complexity across Financial Services and Energy. This is The Expert Advantage.</p>
`,
  })
);
write(
  'serialized-content/capco/capco/Home/story.yml',
  pageYaml({
    id: ID.P_Story,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/story',
    title: 'Storyboard',
    nav: 'Storyboard',
    renderings: [{ id: ID.StoryBoard, ph: 'headless-main', uid: 'c4c01000-0008-4000-8000-000000000041' }],
  })
);
write(
  'serialized-content/capco/capco/Home/what-we-heard.yml',
  pageYaml({
    id: ID.P_Heard,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/what-we-heard',
    title: 'What we heard',
    nav: 'What we heard',
    renderings: [{ id: ID.StoryHeard, ph: 'headless-main', uid: 'c4c01000-0008-4000-8000-000000000040' }],
  })
);
write(
  'serialized-content/capco/capco/Home/search.yml',
  pageYaml({
    id: ID.P_Search,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/search',
    title: 'Search',
    nav: 'Search',
    renderings: [{ id: ID.SiteSearch, ph: 'headless-main', uid: 'c4c01000-0008-4000-8000-000000000042' }],
  })
);

console.log('Capco site YAML generated.');
