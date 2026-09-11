/**
 * Pinsent Masons legal site: Json renderings, PersonPage, Header/Footer partials, pages.
 * GUID prefix a1e9. Paths match legal.module.json (Layout/Renderings + templates/Project/legal).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SITE_ID = '98e943d8-120e-4c10-90d7-c9b99ac5b0a0';
const HOME_ID = '90993d0f-265b-4984-a2bc-1b9d7c76e2f1';
const HOME_TEMPLATE = 'd6dd45be-0d04-43e2-bfd9-9e91cb44bfe0';
const DATA_ID = 'b6f18162-1796-4c29-ad22-8098d83c4517';
const PARTIALS = 'be39284e-743a-4ddc-ab7c-9bc6c512fd08';
const PAGE_DESIGNS = 'dec0e97b-efa0-48e8-840f-cf71b6b025dc';
const AVAIL_REND = '0a5c6dc1-e92b-427e-9c01-ab656fa7982c';
const PH_PARTIAL = '4524e60e-8a41-475c-a1af-84ac19c45a9c';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const TEMPL_FOLDER = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const PROMOS_FOLDER = '6bbafa26-54dc-427f-a31f-274d2ebff7ad';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const T_AVAIL = '76da0a8d-fc7e-42b2-af1e-205b49e43f98';
const T_PH = 'd2a6884c-04d5-4089-a64e-d27ca9d68d4c';
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
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PARTIALS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_PH_KEY = '7256bdab-1fd2-49dd-b205-cb4873d2917c';
const F_AR_REND = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_PROMO_IMG = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
const F_PROMO_MORE = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const F_PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const F_PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const F_PROMO_SUB = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';

const ID = {
  Header: 'a1e90001-1111-4000-8000-000000000001',
  Footer: 'a1e90001-1111-4000-8000-000000000002',
  HeroBanner: 'a1e90001-1111-4000-8000-000000000003',
  Promo: 'a1e90001-1111-4000-8000-000000000004',
  PeopleSearch: 'a1e90001-1111-4000-8000-000000000005',
  PersonProfile: 'a1e90001-1111-4000-8000-000000000006',
  ArticleDetails: 'a1e90001-1111-4000-8000-000000000007',
  PD_Header: 'a1e90004-4444-4000-8000-000000000001',
  PD_Footer: 'a1e90004-4444-4000-8000-000000000002',
  Design_Default: 'a1e90005-5555-4000-8000-000000000001',
  PH_Header: 'a1e90007-7777-4000-8000-000000000001',
  PH_Footer: 'a1e90007-7777-4000-8000-000000000002',
  AR_Pinsent: 'a1e90008-8888-4000-8000-000000000001',
  Tpl_HeaderFolder: 'a1e90010-0000-4000-8000-000000000001',
  Tpl_Header: 'a1e90010-0000-4000-8000-000000000002',
  Tpl_HeaderData: 'a1e90010-0000-4000-8000-000000000003',
  Tpl_BrandName: 'a1e90010-0000-4000-8000-000000000004',
  Tpl_Logo: 'a1e90010-0000-4000-8000-000000000005',
  Tpl_HeroFolder: 'a1e90010-0000-4000-8000-000000000010',
  Tpl_Hero: 'a1e90010-0000-4000-8000-000000000011',
  Tpl_HeroData: 'a1e90010-0000-4000-8000-000000000012',
  Tpl_HeroTitle: 'a1e90010-0000-4000-8000-000000000013',
  Tpl_HeroDesc: 'a1e90010-0000-4000-8000-000000000014',
  Tpl_HeroImage: 'a1e90010-0000-4000-8000-000000000015',
  Tpl_HeroCta: 'a1e90010-0000-4000-8000-000000000016',
  Tpl_FooterFolder: 'a1e90010-0000-4000-8000-000000000020',
  Tpl_Footer: 'a1e90010-0000-4000-8000-000000000021',
  Tpl_FooterData: 'a1e90010-0000-4000-8000-000000000022',
  Tpl_Copyright: 'a1e90010-0000-4000-8000-000000000023',
  Tpl_FooterLogo: 'a1e90010-0000-4000-8000-000000000024',
  Tpl_PersonPage: 'a1e90010-0000-4000-8000-000000000030',
  Tpl_PersonSec: 'a1e90010-0000-4000-8000-000000000031',
  Tpl_JobTitle: 'a1e90010-0000-4000-8000-000000000032',
  Tpl_Phone: 'a1e90010-0000-4000-8000-000000000033',
  Tpl_Email: 'a1e90010-0000-4000-8000-000000000034',
  Tpl_Office: 'a1e90010-0000-4000-8000-000000000035',
  Tpl_LinkedIn: 'a1e90010-0000-4000-8000-000000000036',
  Tpl_Bio: 'a1e90010-0000-4000-8000-000000000037',
  Tpl_Photo: 'a1e90010-0000-4000-8000-000000000038',
  Tpl_Specialisms: 'a1e90010-0000-4000-8000-000000000039',
  Tpl_Credentials: 'a1e90010-0000-4000-8000-00000000003a',
  DS_Headers: 'a1e90020-0000-4000-8000-000000000001',
  DS_Header: 'a1e90020-0000-4000-8000-000000000002',
  DS_Heroes: 'a1e90020-0000-4000-8000-000000000010',
  DS_HeroHome: 'a1e90020-0000-4000-8000-000000000011',
  DS_Footers: 'a1e90020-0000-4000-8000-000000000020',
  DS_Footer: 'a1e90020-0000-4000-8000-000000000021',
  DS_PromoExpertise: 'a1e90020-0000-4000-8000-000000000030',
  DS_PromoThinking: 'a1e90020-0000-4000-8000-000000000031',
  P_People: 'a1e90030-0000-4000-8000-000000000001',
  P_Dawn: 'a1e90030-0000-4000-8000-000000000002',
  P_Bill: 'a1e90030-0000-4000-8000-000000000003',
  P_Barry: 'a1e90030-0000-4000-8000-000000000004',
  P_Bryn: 'a1e90030-0000-4000-8000-000000000005',
  P_Ben: 'a1e90030-0000-4000-8000-000000000006',
  P_OutLaw: 'a1e90030-0000-4000-8000-000000000010',
  P_Guides: 'a1e90030-0000-4000-8000-000000000011',
  P_Article: 'a1e90030-0000-4000-8000-000000000012',
  P_Expertise: 'a1e90030-0000-4000-8000-000000000020',
  P_Thinking: 'a1e90030-0000-4000-8000-000000000021',
  P_Offices: 'a1e90030-0000-4000-8000-000000000022',
  P_Careers: 'a1e90030-0000-4000-8000-000000000023',
  P_About: 'a1e90030-0000-4000-8000-000000000024',
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
Path: /sitecore/layout/Renderings/Project/legal/${name}
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
Path: "/sitecore/templates/Project/legal/${name}"
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
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
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

const dsLoc = (folderTmpl) =>
  `query:$site/*[@@name='Data']/*[@@templatename='${folderTmpl}']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${folderTmpl}']`;

// --- Json renderings ---
write(
  'serialized-content/renderings/legal/Header.yml',
  jsonRendering({
    id: ID.Header,
    name: 'Header',
    componentName: 'Header',
    dsTemplate: '/sitecore/templates/Project/legal/Header Templates/Header',
    dsLocation: dsLoc('Header Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/legal/Footer.yml',
  jsonRendering({
    id: ID.Footer,
    name: 'Footer',
    componentName: 'Footer',
    dsTemplate: '/sitecore/templates/Project/legal/Footer Templates/Footer',
    dsLocation: dsLoc('Footer Folder'),
    paramId: PARAM_HEADER,
  })
);
write(
  'serialized-content/renderings/legal/HeroBanner.yml',
  jsonRendering({
    id: ID.HeroBanner,
    name: 'HeroBanner',
    componentName: 'HeroBanner',
    dsTemplate: '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner',
    dsLocation: dsLoc('HeroBanner Folder'),
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/legal/Promo.yml',
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
  'serialized-content/renderings/legal/PeopleSearch.yml',
  jsonRendering({
    id: ID.PeopleSearch,
    name: 'PeopleSearch',
    componentName: 'PeopleSearch',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/legal/PersonProfile.yml',
  jsonRendering({
    id: ID.PersonProfile,
    name: 'PersonProfile',
    componentName: 'PersonProfile',
    paramId: PARAM_HERO,
  })
);
write(
  'serialized-content/renderings/legal/ArticleDetails.yml',
  jsonRendering({
    id: ID.ArticleDetails,
    name: 'ArticleDetails',
    componentName: 'ArticleDetails',
    paramId: PARAM_HERO,
  })
);

// --- Templates ---
write('serialized-content/templates/legal/Header Templates.yml', templateFolder(ID.Tpl_HeaderFolder, 'Header Templates'));
const HEADER_FOLDER_TPL = 'a1e90010-0000-4000-8000-00000000000a';
write(
  'serialized-content/templates/legal/Header Templates/Header Folder.yml',
  templateItem(HEADER_FOLDER_TPL, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/legal/Header Templates/Header Folder')
);
write(
  'serialized-content/templates/legal/Header Templates/Header.yml',
  templateItem(ID.Tpl_Header, ID.Tpl_HeaderFolder, '/sitecore/templates/Project/legal/Header Templates/Header', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/legal/Header Templates/Header/Data.yml',
  sectionItem(ID.Tpl_HeaderData, ID.Tpl_Header, '/sitecore/templates/Project/legal/Header Templates/Header/Data')
);
write(
  'serialized-content/templates/legal/Header Templates/Header/Data/BrandName.yml',
  fieldItem(ID.Tpl_BrandName, ID.Tpl_HeaderData, '/sitecore/templates/Project/legal/Header Templates/Header/Data/BrandName', 'Single-Line Text', 100, 'BrandName')
);
write(
  'serialized-content/templates/legal/Header Templates/Header/Data/Logo.yml',
  fieldItem(ID.Tpl_Logo, ID.Tpl_HeaderData, '/sitecore/templates/Project/legal/Header Templates/Header/Data/Logo', 'Image', 200, 'Logo')
);

write('serialized-content/templates/legal/HeroBanner Templates.yml', templateFolder(ID.Tpl_HeroFolder, 'HeroBanner Templates'));
const HERO_FOLDER_TPL = 'a1e90010-0000-4000-8000-00000000001a';
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner Folder.yml',
  templateItem(HERO_FOLDER_TPL, ID.Tpl_HeroFolder, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner Folder')
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner.yml',
  templateItem(ID.Tpl_Hero, ID.Tpl_HeroFolder, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner/Data.yml',
  sectionItem(ID.Tpl_HeroData, ID.Tpl_Hero, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner/Data')
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner/Data/Title.yml',
  fieldItem(ID.Tpl_HeroTitle, ID.Tpl_HeroData, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner/Data/Title', 'Single-Line Text', 100, 'Title')
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner/Data/Description.yml',
  fieldItem(ID.Tpl_HeroDesc, ID.Tpl_HeroData, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner/Data/Description', 'Rich Text', 200, 'Description')
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner/Data/Image.yml',
  fieldItem(ID.Tpl_HeroImage, ID.Tpl_HeroData, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner/Data/Image', 'Image', 300, 'Image')
);
write(
  'serialized-content/templates/legal/HeroBanner Templates/HeroBanner/Data/CtaLink.yml',
  fieldItem(ID.Tpl_HeroCta, ID.Tpl_HeroData, '/sitecore/templates/Project/legal/HeroBanner Templates/HeroBanner/Data/CtaLink', 'General Link', 400, 'Primary CTA')
);

write('serialized-content/templates/legal/Footer Templates.yml', templateFolder(ID.Tpl_FooterFolder, 'Footer Templates'));
const FOOTER_FOLDER_TPL = 'a1e90010-0000-4000-8000-00000000002a';
write(
  'serialized-content/templates/legal/Footer Templates/Footer Folder.yml',
  templateItem(FOOTER_FOLDER_TPL, ID.Tpl_FooterFolder, '/sitecore/templates/Project/legal/Footer Templates/Footer Folder')
);
write(
  'serialized-content/templates/legal/Footer Templates/Footer.yml',
  templateItem(ID.Tpl_Footer, ID.Tpl_FooterFolder, '/sitecore/templates/Project/legal/Footer Templates/Footer', {
    bases: `${u(BASE_STD)}\n    ${u(BASE_DS)}`,
  })
);
write(
  'serialized-content/templates/legal/Footer Templates/Footer/Data.yml',
  sectionItem(ID.Tpl_FooterData, ID.Tpl_Footer, '/sitecore/templates/Project/legal/Footer Templates/Footer/Data')
);
write(
  'serialized-content/templates/legal/Footer Templates/Footer/Data/CopyrightText.yml',
  fieldItem(ID.Tpl_Copyright, ID.Tpl_FooterData, '/sitecore/templates/Project/legal/Footer Templates/Footer/Data/CopyrightText', 'Single-Line Text', 100, 'CopyrightText')
);
write(
  'serialized-content/templates/legal/Footer Templates/Footer/Data/Logo.yml',
  fieldItem(ID.Tpl_FooterLogo, ID.Tpl_FooterData, '/sitecore/templates/Project/legal/Footer Templates/Footer/Data/Logo', 'Image', 200, 'Logo')
);

write(
  'serialized-content/templates/legal/PersonPage.yml',
  templateItem(ID.Tpl_PersonPage, TEMPL_FOLDER, '/sitecore/templates/Project/legal/PersonPage', {
    icon: 'Office/32x32/user1.png',
    bases: `${u(HOME_TEMPLATE)}`,
    sort: 400,
  })
);
write(
  'serialized-content/templates/legal/PersonPage/Person.yml',
  sectionItem(ID.Tpl_PersonSec, ID.Tpl_PersonPage, '/sitecore/templates/Project/legal/PersonPage/Person')
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
    `serialized-content/templates/legal/PersonPage/Person/${name}.yml`,
    fieldItem(fid, ID.Tpl_PersonSec, `/sitecore/templates/Project/legal/PersonPage/Person/${name}`, type, sort, name)
  );
}

// --- Presentation ---
write(
  'serialized-content/legal/legal/Presentation/Partial Designs/Header.yml',
  `---
ID: "${ID.PD_Header}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/legal/legal/Presentation/Partial Designs/Header
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: header
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Header, ph: 'headless-header', uid: 'a1e92000-0001-4000-8000-000000000001', ds: ID.DS_Header }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/legal/legal/Presentation/Partial Designs/Footer.yml',
  `---
ID: "${ID.PD_Footer}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/legal/legal/Presentation/Partial Designs/Footer
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: footer
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml([{ id: ID.Footer, ph: 'headless-footer', uid: 'a1e92000-0002-4000-8000-000000000001', ds: ID.DS_Footer }])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/legal/legal/Presentation/Page Designs/Default.yml',
  `---
ID: "${ID.Design_Default}"
Parent: "${PAGE_DESIGNS}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/legal/legal/Presentation/Page Designs/Default
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
  'serialized-content/legal/legal/Presentation/Available Renderings/Pinsent.yml',
  `---
ID: "${ID.AR_Pinsent}"
Parent: "${AVAIL_REND}"
Template: "${T_AVAIL}"
Path: "/sitecore/content/legal/legal/Presentation/Available Renderings/Pinsent"
SharedFields:
- ID: "${F_AR_REND}"
  Hint: Renderings
  Value: |
    ${u(ID.Header)}
    ${u(ID.Footer)}
    ${u(ID.HeroBanner)}
    ${u(ID.Promo)}
    ${u(ID.PeopleSearch)}
    ${u(ID.PersonProfile)}
    ${u(ID.ArticleDetails)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/legal/legal/Presentation/Placeholder Settings/Partial Design/Header.yml',
  `---
ID: "${ID.PH_Header}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: "/sitecore/content/legal/legal/Presentation/Placeholder Settings/Partial Design/Header"
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
  'serialized-content/legal/legal/Presentation/Placeholder Settings/Partial Design/Footer.yml',
  `---
ID: "${ID.PH_Footer}"
Parent: "${PH_PARTIAL}"
Template: "${T_PH}"
Path: "/sitecore/content/legal/legal/Presentation/Placeholder Settings/Partial Design/Footer"
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
  'serialized-content/legal/legal/Data/Headers.yml',
  folderDs(ID.DS_Headers, DATA_ID, '/sitecore/content/legal/legal/Data/Headers', HEADER_FOLDER_TPL)
);
write(
  'serialized-content/legal/legal/Data/Headers/Main Header.yml',
  `---
ID: "${ID.DS_Header}"
Parent: "${ID.DS_Headers}"
Template: "${ID.Tpl_Header}"
Path: /sitecore/content/legal/legal/Data/Headers/Main Header
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_BrandName}"
      Hint: BrandName
      Value: Pinsent Masons
`
);
write(
  'serialized-content/legal/legal/Data/Hero Banners.yml',
  folderDs(ID.DS_Heroes, DATA_ID, '/sitecore/content/legal/legal/Data/Hero Banners', HERO_FOLDER_TPL)
);
write(
  'serialized-content/legal/legal/Data/Hero Banners/Home Hero.yml',
  `---
ID: "${ID.DS_HeroHome}"
Parent: "${ID.DS_Heroes}"
Template: "${ID.Tpl_Hero}"
Path: /sitecore/content/legal/legal/Data/Hero Banners/Home Hero
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_HeroTitle}"
      Hint: Title
      Value: Trusted for expertise, chosen for outcomes
    - ID: "${ID.Tpl_HeroDesc}"
      Hint: Description
      Value: <p></p>
    - ID: "${ID.Tpl_HeroCta}"
      Hint: CtaLink
      Value: |
        <link text="Read the case study" linktype="internal" url="/thinking" anchor="" target="" title="" class="" id="${ID.P_Thinking}" />
`
);
write(
  'serialized-content/legal/legal/Data/Footers.yml',
  folderDs(ID.DS_Footers, DATA_ID, '/sitecore/content/legal/legal/Data/Footers', FOOTER_FOLDER_TPL)
);
write(
  'serialized-content/legal/legal/Data/Footers/Main Footer.yml',
  `---
ID: "${ID.DS_Footer}"
Parent: "${ID.DS_Footers}"
Template: "${ID.Tpl_Footer}"
Path: /sitecore/content/legal/legal/Data/Footers/Main Footer
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_Copyright}"
      Hint: CopyrightText
      Value: 2026 Copyright Pinsent Masons LLP
`
);

function promoYaml(id, name, title, sub, desc, linkText, linkUrl, linkId) {
  return `---
ID: "${id}"
Parent: "${PROMOS_FOLDER}"
Template: "${T_PROMO}"
Path: /sitecore/content/legal/legal/Data/Promos/${name}
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
`;
}

write(
  'serialized-content/legal/legal/Data/Promos/Expertise.yml',
  promoYaml(
    ID.DS_PromoExpertise,
    'Expertise',
    'Expertise that delivers outcomes',
    'Sectors and services',
    'Explore the sectors and services our lawyers work across — from energy and infrastructure to restructuring and technology.',
    'Explore all',
    '/expertise',
    ID.P_Expertise
  )
);
write(
  'serialized-content/legal/legal/Data/Promos/Thinking.yml',
  promoYaml(
    ID.DS_PromoThinking,
    'Thinking',
    'Know what’s coming, make better decisions',
    'Out-Law',
    'Stay ahead of events with our weekly digest of news and expert analysis, tailored for you.',
    'Sign-up',
    '/thinking',
    ID.P_Thinking
  )
);

// --- Home (preserve originator / branch) ---
write(
  'serialized-content/legal/legal/Home.yml',
  `---
ID: "${HOME_ID}"
Parent: "${SITE_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/legal/legal/Home
BranchID: "45cf9f42-b3ac-4412-aab9-f8441c7e448e"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${u(ID.Design_Default)}"
- ID: "c7c26117-dbb1-42b2-ab5e-f7223845cca3"
  Hint: __Thumbnail
  Value: |
    <image mediaid="{15A678D1-9B02-4BE7-AA04-A5DC247D7DA2}" />
- ID: "f6d8a61c-2f84-4401-bd24-52d2068172bc"
  Hint: __Originator
  Value: "{F558BEC9-C602-4D7A-B9A1-D0411C946EA4}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(
      [
        { id: ID.HeroBanner, ph: 'headless-main', uid: 'a1e91000-0001-4000-8000-000000000001', ds: ID.DS_HeroHome },
        { id: ID.Promo, ph: 'headless-main', uid: 'a1e91000-0001-4000-8000-000000000002', ds: ID.DS_PromoExpertise },
        { id: ID.Promo, ph: 'headless-main', uid: 'a1e91000-0001-4000-8000-000000000003', ds: ID.DS_PromoThinking },
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
      Value: Pinsent Masons
`
);

const peopleIntro =
  "Whatever your requirements, we'll bring together the right team for you. Over 490 partners and 3000 people around the world are ready to help. Browse the team or search for the person or specialism you're looking for.";

write(
  'serialized-content/legal/legal/Home/people.yml',
  pageYaml({
    id: ID.P_People,
    parent: HOME_ID,
    itemPath: '/sitecore/content/legal/legal/Home/people',
    title: 'People',
    nav: 'People',
    renderings: [{ id: ID.PeopleSearch, ph: 'headless-main', uid: 'a1e91000-0002-4000-8000-000000000001' }],
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
    itemPath: `/sitecore/content/legal/legal/Home/people/${p.slug}`,
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
    id: ID.P_Dawn,
    slug: 'dawn-allen',
    name: 'Dawn Allen',
    job: 'Partner',
    phone: '+44 (0) 7771 842 600',
    email: 'dawn.allen@pinsentmasons.com',
    office: 'Leeds',
    linkedin: 'https://www.linkedin.com/in/dawn-allen-b8398919',
    uid: 'a1e91000-0003-4000-8000-000000000002',
    bio: 'Dawn focuses on non-contentious restructuring and insolvency engagements and advises a range of stakeholders, predominantly financial institutions as well as accountants, corporate clients and their boards of directors.',
    specialisms: '<ul><li>Restructuring</li></ul>',
    credentials:
      '<ul><li>2006 — Barclays Bank plc, Legal Secondee</li><li>2002 — Qualified - England and Wales</li><li>1999 — Leeds Metropolitan University - Legal Practice Course</li><li>1999 — Joined Pinsent Masons</li><li>1998 — Leeds Metropolitan University - CPE</li><li>1997 — Bradford University - BA (Hons) Business with Law</li></ul>',
  },
  {
    id: ID.P_Bill,
    slug: 'bill-ryan',
    name: 'Bill Ryan',
    job: 'Partner',
    phone: '+61 407 831 221',
    email: 'bill.ryan@pinsentmasons.com',
    office: 'Melbourne',
    linkedin: '',
    uid: 'a1e91000-0003-4000-8000-000000000003',
    bio: 'Bill specialises in advising the construction, engineering and energy industry sectors primarily in relation to contentious matters. His recent experience includes co-managing large teams in arbitration proceedings arising from LNG and processing plant projects in Queensland and Western Australia.',
    specialisms:
      '<ul><li>Construction Advisory &amp; Disputes</li><li>Adjudication</li><li>Arbitration</li><li>Construction Claims</li><li>Construction Contracts</li><li>Construction Disputes</li><li>Construction Procurement</li><li>Construction Standard Form Contracts</li><li>Engineering Procurement</li><li>Infrastructure</li><li>Risk Management &amp; Contract Advice</li></ul>',
    credentials:
      '<ul><li>2017 — Joined Pinsent Masons</li><li>2001 — Qualified - Western Australia</li><li>1992 — Qualified - Victoria, Australia</li><li>1991 — University of Melbourne - BCom</li><li>1991 — University of Melbourne - LLB</li></ul>',
  },
  {
    id: ID.P_Barry,
    slug: 'barry-mccaig',
    name: 'Barry McCaig',
    job: 'Partner, Head of Office, Glasgow',
    phone: '+44 (0) 7796 274 548',
    email: 'barry.mccaig@pinsentmasons.com',
    office: 'Glasgow',
    linkedin: '',
    uid: 'a1e91000-0003-4000-8000-000000000004',
    bio: 'Barry is Head of the Glasgow office and of the Corporate practice group in Scotland.',
    specialisms: '<ul><li>Corporate</li></ul>',
    credentials: '<p>Partner, Pinsent Masons.</p>',
  },
  {
    id: ID.P_Bryn,
    slug: 'bryn-reynolds',
    name: 'Bryn Reynolds',
    job: 'Partner',
    phone: '+44 7340 152 045',
    email: 'bryn.reynolds@pinsentmasons.com',
    office: 'London',
    linkedin: '',
    uid: 'a1e91000-0003-4000-8000-000000000005',
    bio: 'Bryn is a chartered accountant and chartered tax advisor who advises large businesses on all indirect tax issues including VAT, IPT and customs duties. He primarily advises large financial institutions and TMT clients including FinTech.',
    specialisms: '<ul><li>Tax</li><li>Financial Services</li></ul>',
    credentials: '<p>Partner, Pinsent Masons.</p>',
  },
  {
    id: ID.P_Ben,
    slug: 'ben-mckinley',
    name: 'Ben McKinley',
    job: 'Partner',
    phone: '+61 417 160 359',
    email: 'ben.mckinley@pinsentmasons.com',
    office: 'Australia',
    linkedin: '',
    uid: 'a1e91000-0003-4000-8000-000000000006',
    bio: 'Ben’s expertise is advising and representing employers in all aspects of employment, industrial relations, and safety law. He is highly regarded for his pragmatic and strategic advice, and works closely with clients to build trust and an in-depth understanding of their business.',
    specialisms: '<ul><li>Employment</li></ul>',
    credentials: '<p>Partner, Pinsent Masons.</p>',
  },
];

for (const p of people) {
  write(`serialized-content/legal/legal/Home/people/${p.slug}.yml`, personYaml(p));
}

const articleBody = `<p>In a challenging economic environment, it is common to see an increase in company insolvencies. In the UK, there are rules in place that require suppliers to insolvent companies to continue to supply those businesses.</p>
<p>Suppliers need to understand when they must continue supply, on what terms, and what they can they do to protect themselves.</p>
<h3>The origins of today’s essential supplier regime in insolvency</h3>
<p>The essential supplier regime in insolvency, which sets out when and on what terms a supplier must continue to supply a customer in an insolvency process, can be found in sections 233, 233A and 233B of the Insolvency Act 1986.</p>
<p>The rules were originally enacted to prevent utility suppliers, who held monopoly positions at that time, from holding insolvent companies to ransom. In 2015, the regime was extended to ensure that IT services also continued to be provided in insolvency. The regime was further expanded in 2020 with the Corporate Insolvency and Governance Act (CIGA) and now encompasses most supply contracts, other than those relating to the provision of financial services.</p>
<h3>What should suppliers do if their customer enters an insolvency process?</h3>
<p>When suppliers find out their customer is insolvent, they should find out where in the insolvency process the customer is, work out which regime they fall into, engage with the office holder, and look for new termination events.</p>`;

write(
  'serialized-content/legal/legal/Home/out-law.yml',
  pageYaml({
    id: ID.P_OutLaw,
    parent: HOME_ID,
    itemPath: '/sitecore/content/legal/legal/Home/out-law',
    title: 'Out-Law',
    nav: 'Out-Law',
    renderings: [{ id: ID.Promo, ph: 'headless-main', uid: 'a1e91000-0004-4000-8000-000000000001', ds: ID.DS_PromoThinking }],
  })
);
write(
  'serialized-content/legal/legal/Home/out-law/guides.yml',
  pageYaml({
    id: ID.P_Guides,
    parent: ID.P_OutLaw,
    itemPath: '/sitecore/content/legal/legal/Home/out-law/guides',
    title: 'Guides',
    nav: 'Guides',
    renderings: [],
  })
);
write(
  'serialized-content/legal/legal/Home/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies.yml',
  pageYaml({
    id: ID.P_Article,
    parent: ID.P_Guides,
    itemPath:
      '/sitecore/content/legal/legal/Home/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    title: 'When UK suppliers must continue to supply insolvent companies',
    nav: 'When UK suppliers must continue to supply insolvent companies',
    renderings: [{ id: ID.ArticleDetails, ph: 'headless-main', uid: 'a1e91000-0004-4000-8000-000000000002' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${articleBody.split('\n').join('\n        ')}
`,
  })
);

for (const [id, slug, title] of [
  [ID.P_Expertise, 'expertise', 'Expertise'],
  [ID.P_Thinking, 'thinking', 'Thinking'],
  [ID.P_Offices, 'offices', 'Offices'],
  [ID.P_Careers, 'careers', 'Careers'],
  [ID.P_About, 'about-us', 'About us'],
]) {
  write(
    `serialized-content/legal/legal/Home/${slug}.yml`,
    pageYaml({
      id,
      parent: HOME_ID,
      itemPath: `/sitecore/content/legal/legal/Home/${slug}`,
      title,
      nav: title,
      renderings: [{ id: ID.Promo, ph: 'headless-main', uid: `a1e91000-0005-4000-8000-${id.slice(-12)}`, ds: ID.DS_PromoExpertise }],
    })
  );
}

console.log('Legal Pinsent Masons site YAML generated.');
