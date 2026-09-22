/**
 * Industry landings, InsightsCarousel, Subscribe, and full Perspectives.
 * Does not rewrite Home.yml Image fields. GUID prefix c4c0.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const HOME_TEMPLATE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';
const DATA_ID = '36a3495a-7fd3-4936-942b-53fb5c0efde6';
const REND_FOLDER = '781e3f75-3bb2-4c5b-95e7-39fc5425a522';
const TEMPL_FOLDER = '93543cf4-8b05-4714-ba7d-38d0094d9e74';
const T_FOLDER_TPL = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const DEVICE = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const JSS_LAYOUT = '96E5F4BA-A2CF-4A4C-A4E7-64DA88226362';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';
const PARAM_HERO = '5BD96264-0B02-4605-8FFF-0079CAEB67FC';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_DS_TPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_BASE = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_FIELD_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '96b71ea7-4d37-4a3a-9e11-2bb76ef03acd';
const F_PAGE_CONTENT = '53f49d04-a3f6-4f75-bc6e-3e7db6e80e93';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_WORKFLOW = 'a4f985d9-98b3-4b52-aaaf-4344f6e747c6';
const F_WF_STATE = '3e431de1-525e-47a3-b6b0-1ccbec3a8c98';
const F_DEFAULT_WF = 'ca9b9f52-4fb0-4f87-a79f-24dea62cda65';

const ID = {
  ArticleDetails: 'c4c00001-1111-4000-8000-000000000007',
  ArticleListing: 'c4c00001-1111-4000-8000-00000000000a',
  PageHeading: 'c4c00001-1111-4000-8000-00000000000b',
  InsightsCarousel: 'c4c00001-1111-4000-8000-000000000016',
  Subscribe: 'c4c00001-1111-4000-8000-000000000017',
  IndustryLanding: 'c4c00001-1111-4000-8000-000000000018',
  Design_Default: 'c4c00005-5555-4000-8000-000000000001',
  Tpl_Article: 'c4c00010-0000-4000-8000-000000000050',
  F_Summary: 'c4c00010-0000-4000-8000-000000000052',
  F_Kicker: 'c4c00010-0000-4000-8000-000000000053',
  F_PublishedDate: 'c4c00010-0000-4000-8000-000000000054',
  F_ReadTime: 'c4c00010-0000-4000-8000-000000000055',
  F_Image: 'c4c00010-0000-4000-8000-000000000056',
  F_Tags: 'c4c00010-0000-4000-8000-000000000057',
  F_Categories: 'c4c00010-0000-4000-8000-000000000058',
  F_Sectors: 'c4c00010-0000-4000-8000-000000000059',
  F_Services: 'c4c00010-0000-4000-8000-00000000005a',
  F_Regions: 'c4c00010-0000-4000-8000-00000000005b',
  F_Related: 'c4c00010-0000-4000-8000-00000000005c',
  F_Authors: 'c4c00010-0000-4000-8000-00000000005d',
  F_Aeo: 'c4c00010-0000-4000-8000-000000000061',
  F_Seo: 'c4c00010-0000-4000-8000-000000000062',
  F_Suggested: 'c4c00010-0000-4000-8000-000000000063',
  F_HubSpot: 'c4c00010-0000-4000-8000-000000000065',
  F_Media: 'c4c00010-0000-4000-8000-000000000066',
  P_Elisabeth: 'c4c00030-0000-4000-8000-000000000002',
  P_Charlotte: 'c4c00030-0000-4000-8000-000000000003',
  P_Perspectives: 'c4c00030-0000-4000-8000-000000000010',
  P_TPlus1: 'c4c00030-0000-4000-8000-000000000012',
  P_AI: 'c4c00030-0000-4000-8000-000000000013',
  P_Canada: 'c4c00030-0000-4000-8000-000000000014',
  P_EnergyAI: 'c4c00030-0000-4000-8000-000000000015',
  P_Onboarding: 'c4c00030-0000-4000-8000-000000000016',
  P_Industries: 'c4c00030-0000-4000-8000-000000000020',
  P_Banking: 'c4c00030-0000-4000-8000-000000000021',
  P_Capital: 'c4c00030-0000-4000-8000-000000000022',
  P_Insurance: 'c4c00030-0000-4000-8000-000000000023',
  P_Wealth: 'c4c00030-0000-4000-8000-000000000024',
  P_Energy: 'c4c00030-0000-4000-8000-000000000025',
  P_Retail: 'c4c00030-0000-4000-8000-000000000060',
  P_Commercial: 'c4c00030-0000-4000-8000-000000000061',
  P_Payments: 'c4c00030-0000-4000-8000-000000000062',
  P_Digital: 'c4c00030-0000-4000-8000-000000000063',
  P_Community: 'c4c00030-0000-4000-8000-000000000064',
  P_T1Page: 'c4c00030-0000-4000-8000-000000000065',
  P_EnergyTrade: 'c4c00030-0000-4000-8000-000000000066',
  P_DigitalBank: 'c4c00030-0000-4000-8000-000000000067',
  P_Instant: 'c4c00030-0000-4000-8000-000000000068',
  Wf_Page: 'c4c00040-0000-4000-8000-000000000001',
  Wf_Approved: 'c4c00040-0000-4000-8000-00000000000a',
  Wf_Ds: 'c4c00040-0000-4000-8000-000000000011',
  Wf_DsApproved: 'c4c00040-0000-4000-8000-000000000017',
};

const TPL = {
  InsightsFolder: 'c4c00010-0000-4000-8000-000000000090',
  Insights: 'c4c00010-0000-4000-8000-000000000091',
  InsightsData: 'c4c00010-0000-4000-8000-000000000092',
  InsightsHeading: 'c4c00010-0000-4000-8000-000000000093',
  InsightsItems: 'c4c00010-0000-4000-8000-000000000094',
  InsightsSector: 'c4c00010-0000-4000-8000-000000000095',
  InsightsSV: 'c4c00010-0000-4000-8000-000000000096',
  InsightsFolderTpl: 'c4c00010-0000-4000-8000-000000000097',
  SubFolder: 'c4c00010-0000-4000-8000-0000000000a0',
  Subscribe: 'c4c00010-0000-4000-8000-0000000000a1',
  SubData: 'c4c00010-0000-4000-8000-0000000000a2',
  SubConnectHeading: 'c4c00010-0000-4000-8000-0000000000a3',
  SubConnectIntro: 'c4c00010-0000-4000-8000-0000000000a4',
  SubTitle: 'c4c00010-0000-4000-8000-0000000000a5',
  SubContactTitle: 'c4c00010-0000-4000-8000-0000000000a6',
  SubContactIntro: 'c4c00010-0000-4000-8000-0000000000a7',
  SubContactLink: 'c4c00010-0000-4000-8000-0000000000a8',
  SubPrivacy: 'c4c00010-0000-4000-8000-0000000000a9',
  SubNewsletter: 'c4c00010-0000-4000-8000-0000000000aa',
  SubInsights: 'c4c00010-0000-4000-8000-0000000000ab',
  SubSubmit: 'c4c00010-0000-4000-8000-0000000000ac',
  SubSuccess: 'c4c00010-0000-4000-8000-0000000000ad',
  SubSV: 'c4c00010-0000-4000-8000-0000000000ae',
  SubFolderTpl: 'c4c00010-0000-4000-8000-0000000000af',
  LandFolder: 'c4c00010-0000-4000-8000-0000000000b0',
  Landing: 'c4c00010-0000-4000-8000-0000000000b1',
  LandData: 'c4c00010-0000-4000-8000-0000000000b2',
  LandTitle: 'c4c00010-0000-4000-8000-0000000000b3',
  LandIntro: 'c4c00010-0000-4000-8000-0000000000b4',
  LandImage: 'c4c00010-0000-4000-8000-0000000000b5',
  LandExpH: 'c4c00010-0000-4000-8000-0000000000b6',
  LandExpI: 'c4c00010-0000-4000-8000-0000000000b7',
  LandJumps: 'c4c00010-0000-4000-8000-0000000000b8',
  LandItems: 'c4c00010-0000-4000-8000-0000000000b9',
  LandStoriesH: 'c4c00010-0000-4000-8000-0000000000ba',
  LandStories: 'c4c00010-0000-4000-8000-0000000000bb',
  LandSV: 'c4c00010-0000-4000-8000-0000000000bc',
  LandFolderTpl: 'c4c00010-0000-4000-8000-0000000000bd',
};

const DS = {
  InsightsFolder: 'c4c00020-0000-4000-8000-000000000050',
  InsightsBanking: 'c4c00020-0000-4000-8000-000000000051',
  InsightsCapital: 'c4c00020-0000-4000-8000-000000000052',
  InsightsEnergy: 'c4c00020-0000-4000-8000-000000000053',
  InsightsHome: 'c4c00020-0000-4000-8000-000000000054',
  InsightsPerspectives: 'c4c00020-0000-4000-8000-000000000055',
  SubscribeFolder: 'c4c00020-0000-4000-8000-00000000005f',
  Subscribe: 'c4c00020-0000-4000-8000-000000000060',
  LandFolder: 'c4c00020-0000-4000-8000-000000000070',
  LandBanking: 'c4c00020-0000-4000-8000-000000000071',
  LandCapital: 'c4c00020-0000-4000-8000-000000000072',
  LandEnergy: 'c4c00020-0000-4000-8000-000000000073',
  LandInsurance: 'c4c00020-0000-4000-8000-000000000074',
  LandWealth: 'c4c00020-0000-4000-8000-000000000075',
};

const TAG = {
  banking: 'c4c00025-0000-4000-8000-000000000001',
  capital: 'c4c00025-0000-4000-8000-000000000002',
  energy: 'c4c00025-0000-4000-8000-000000000005',
  tplus1: 'c4c00025-0000-4000-8000-000000000011',
  ai: 'c4c00025-0000-4000-8000-000000000012',
  payments: 'c4c00025-0000-4000-8000-000000000013',
  trading: 'c4c00025-0000-4000-8000-000000000014',
  data: 'c4c00025-0000-4000-8000-000000000015',
  uk: 'c4c00025-0000-4000-8000-000000000021',
  europe: 'c4c00025-0000-4000-8000-000000000022',
  americas: 'c4c00025-0000-4000-8000-000000000023',
  regulation: 'c4c00025-0000-4000-8000-000000000031',
  transformation: 'c4c00025-0000-4000-8000-000000000032',
  risk: 'c4c00025-0000-4000-8000-000000000033',
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
      Value: 20260922T120000Z
`;
}
function indentHtml(html) {
  return html.trim().split('\n').join('\n        ');
}
function imageXml(file, alt) {
  return `<Image src="/capco/${file}" alt="${alt}" />`;
}

function jsonRendering(id, name, tplPath, folderName) {
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/capco/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${name}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_DS_TPL}"
  Hint: Datasource Template
  Value: ${tplPath}
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']/*[@@templatename='${folderName}']|query:$sharedSites/*[@@name='Data']/*[@@templatename='${folderName}']"
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "{${PARAM_HERO}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateFolder(id, itemPath) {
  return `---
ID: "${id}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_FOLDER_TPL}"
Path: "${itemPath}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateItem(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_BASE}"
  Hint: __Base template
  Value: |
    {1930BBEB-7805-471A-A3BE-4858AC7CF696}
    {44A022DB-56D3-419A-B43B-E27E4D8E9C41}
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 100
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function folderTpl(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 200
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

function fieldItem(id, parent, itemPath, type, sort, title, source = '') {
  const sourceField = source
    ? `- ID: "${F_SOURCE}"
  Hint: Source
  Value: "${source}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FIELD}"
Path: "${itemPath}"
SharedFields:
${sourceField}- ID: "${F_TYPE}"
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

function svItem(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${parent}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_DEFAULT_WF}"
  Hint: __Default workflow
  Value: "${u(ID.Wf_Ds)}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingXml(rows) {
  const kids = rows
    .map((row, i) => {
      const before = i === 0 ? '\n          p:before="*"' : '';
      const ds = row.ds ? `\n          s:ds="${row.ds}"` : '';
      return `        <r
          uid="${u(row.uid)}"${before}${ds}
          s:id="${u(row.id)}"
          s:par="GridParameters=%7B${GRID}%7D&amp;DynamicPlaceholderId=${i + 1}"
          s:ph="${row.ph || 'headless-main'}" />`;
    })
    .join('\n');
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${u(DEVICE)}"
        l="${u(JSS_LAYOUT)}">
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
  content,
  templateId = HOME_TEMPLATE,
  renderings = [],
  extraVersion = '',
  workflow = false,
}) {
  const layout = renderings.length
    ? `- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(renderings)}
`
    : '';
  const wf = workflow
    ? `- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "${u(ID.Wf_Page)}"
`
    : '';
  const wfState = workflow
    ? `    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "${u(ID.Wf_Approved)}"
`
    : '';
  const body = content
    ? `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${indentHtml(content)}
`
    : '';
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${templateId}"
Path: ${itemPath}
SharedFields:
${wf}- ID: "${F_PAGE_DESIGN}"
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
${body}${extraVersion}`;
}

function dataFolder(id, parent, itemPath, templateId) {
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

function dsWorkflow() {
  return `- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "${u(ID.Wf_Ds)}"
`;
}

function dsState() {
  return `    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "${u(ID.Wf_DsApproved)}"
`;
}

function treelist(ids) {
  return ids.map((id) => u(id)).join('\n        ');
}

function articleExtras({
  summary,
  kicker,
  date,
  read,
  image,
  alt,
  sectors,
  services,
  regions,
  topics,
  authors,
  related,
  suggested,
  aeo,
  seo,
}) {
  return `    - ID: "${ID.F_Summary}"
      Hint: Summary
      Value: "${summary}"
    - ID: "${ID.F_Kicker}"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "${ID.F_PublishedDate}"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "${ID.F_ReadTime}"
      Hint: ReadTime
      Value: "${read}"
    - ID: "${ID.F_Media}"
      Hint: MediaType
      Value: "Article"
    - ID: "${ID.F_Image}"
      Hint: Image
      Value: |
        ${imageXml(image, alt)}
    - ID: "${ID.F_Sectors}"
      Hint: Sectors
      Value: |
        ${treelist(sectors)}
    - ID: "${ID.F_Services}"
      Hint: Services
      Value: |
        ${treelist(services)}
    - ID: "${ID.F_Regions}"
      Hint: Regions
      Value: |
        ${treelist(regions)}
    - ID: "${ID.F_Tags}"
      Hint: Tags
      Value: |
        ${treelist(topics)}
    - ID: "${ID.F_Categories}"
      Hint: Categories
      Value: |
        ${treelist(topics)}
    - ID: "${ID.F_Authors}"
      Hint: Authors
      Value: |
        ${treelist(authors)}
    - ID: "${ID.F_Related}"
      Hint: RelatedContent
      Value: |
        ${treelist(related)}
    - ID: "${ID.F_Suggested}"
      Hint: SuggestedTags
      Value: "${suggested}"
    - ID: "${ID.F_Aeo}"
      Hint: AeoNotes
      Value: "${aeo}"
    - ID: "${ID.F_Seo}"
      Hint: SeoTitle
      Value: "${seo}"
    - ID: "${ID.F_HubSpot}"
      Hint: HubSpotFormId
      Value: capco-perspective-nurture
`;
}

function stackUid(series, n) {
  return `c4c01000-${series}-4000-8000-${String(n).padStart(12, '0')}`;
}

const industryStack = (landingDs, insightsDs, series, start) => [
  { id: ID.IndustryLanding, ds: landingDs || undefined, uid: stackUid(series, start), ph: 'headless-main' },
  { id: ID.InsightsCarousel, ds: insightsDs, uid: stackUid(series, start + 1), ph: 'headless-main' },
  { id: ID.Subscribe, ds: DS.Subscribe, uid: stackUid(series, start + 2), ph: 'headless-main' },
];

const articleStack = (insightsDs, start) => [
  { id: ID.ArticleDetails, uid: stackUid('0014', start), ph: 'headless-main' },
  { id: ID.InsightsCarousel, ds: insightsDs, uid: stackUid('0014', start + 1), ph: 'headless-main' },
  { id: ID.Subscribe, ds: DS.Subscribe, uid: stackUid('0014', start + 2), ph: 'headless-main' },
];

write('serialized-content/templates/capco/InsightsCarousel Templates.yml', templateFolder(TPL.InsightsFolder, '/sitecore/templates/Project/capco/InsightsCarousel Templates'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel.yml', templateItem(TPL.Insights, TPL.InsightsFolder, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel/Data.yml', sectionItem(TPL.InsightsData, TPL.Insights, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel/Data'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel/Data/Heading.yml', fieldItem(TPL.InsightsHeading, TPL.InsightsData, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel/Data/Heading', 'Single-Line Text', 100, 'Heading'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel/Data/Items.yml', fieldItem(TPL.InsightsItems, TPL.InsightsData, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel/Data/Items', 'Treelist', 110, 'Items', '/sitecore/content/capco/capco/Home/perspectives'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel/Data/Sector.yml', fieldItem(TPL.InsightsSector, TPL.InsightsData, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel/Data/Sector', 'Single-Line Text', 120, 'Sector'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel/__Standard Values.yml', svItem(TPL.InsightsSV, TPL.Insights, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel/__Standard Values'));
write('serialized-content/templates/capco/InsightsCarousel Templates/InsightsCarousel Folder.yml', folderTpl(TPL.InsightsFolderTpl, TPL.InsightsFolder, '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel Folder'));

write('serialized-content/templates/capco/Subscribe Templates.yml', templateFolder(TPL.SubFolder, '/sitecore/templates/Project/capco/Subscribe Templates'));
write('serialized-content/templates/capco/Subscribe Templates/Subscribe.yml', templateItem(TPL.Subscribe, TPL.SubFolder, '/sitecore/templates/Project/capco/Subscribe Templates/Subscribe'));
write('serialized-content/templates/capco/Subscribe Templates/Subscribe/Data.yml', sectionItem(TPL.SubData, TPL.Subscribe, '/sitecore/templates/Project/capco/Subscribe Templates/Subscribe/Data'));
[
  [TPL.SubConnectHeading, 'ConnectHeading', 'Single-Line Text', 100],
  [TPL.SubConnectIntro, 'ConnectIntro', 'Multi-Line Text', 110],
  [TPL.SubTitle, 'SubscribeTitle', 'Single-Line Text', 120],
  [TPL.SubContactTitle, 'ContactTitle', 'Single-Line Text', 130],
  [TPL.SubContactIntro, 'ContactIntro', 'Multi-Line Text', 140],
  [TPL.SubContactLink, 'ContactLink', 'General Link', 150],
  [TPL.SubPrivacy, 'PrivacyNotice', 'Rich Text', 160],
  [TPL.SubNewsletter, 'NewsletterLabel', 'Single-Line Text', 170],
  [TPL.SubInsights, 'InsightsLabel', 'Single-Line Text', 180],
  [TPL.SubSubmit, 'SubmitLabel', 'Single-Line Text', 190],
  [TPL.SubSuccess, 'SuccessMessage', 'Single-Line Text', 200],
].forEach(([fid, name, type, sort]) => {
  write(
    `serialized-content/templates/capco/Subscribe Templates/Subscribe/Data/${name}.yml`,
    fieldItem(fid, TPL.SubData, `/sitecore/templates/Project/capco/Subscribe Templates/Subscribe/Data/${name}`, type, sort, name)
  );
});
write('serialized-content/templates/capco/Subscribe Templates/Subscribe/__Standard Values.yml', svItem(TPL.SubSV, TPL.Subscribe, '/sitecore/templates/Project/capco/Subscribe Templates/Subscribe/__Standard Values'));
write('serialized-content/templates/capco/Subscribe Templates/Subscribe Folder.yml', folderTpl(TPL.SubFolderTpl, TPL.SubFolder, '/sitecore/templates/Project/capco/Subscribe Templates/Subscribe Folder'));

write('serialized-content/templates/capco/IndustryLanding Templates.yml', templateFolder(TPL.LandFolder, '/sitecore/templates/Project/capco/IndustryLanding Templates'));
write('serialized-content/templates/capco/IndustryLanding Templates/IndustryLanding.yml', templateItem(TPL.Landing, TPL.LandFolder, '/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding'));
write('serialized-content/templates/capco/IndustryLanding Templates/IndustryLanding/Data.yml', sectionItem(TPL.LandData, TPL.Landing, '/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding/Data'));
[
  [TPL.LandTitle, 'Title', 'Single-Line Text', 100, ''],
  [TPL.LandIntro, 'Intro', 'Rich Text', 110, ''],
  [TPL.LandImage, 'Image', 'Image', 120, ''],
  [TPL.LandExpH, 'ExpertiseHeading', 'Single-Line Text', 130, ''],
  [TPL.LandExpI, 'ExpertiseIntro', 'Multi-Line Text', 140, ''],
  [TPL.LandJumps, 'Jumps', 'Treelist', 150, '/sitecore/content/capco/capco/Home/industries'],
  [TPL.LandItems, 'ExpertiseItems', 'Treelist', 160, '/sitecore/content/capco/capco/Home/industries'],
  [TPL.LandStoriesH, 'StoriesHeading', 'Single-Line Text', 170, ''],
  [TPL.LandStories, 'Stories', 'Treelist', 180, '/sitecore/content/capco/capco/Home'],
].forEach(([fid, name, type, sort, source]) => {
  write(
    `serialized-content/templates/capco/IndustryLanding Templates/IndustryLanding/Data/${name}.yml`,
    fieldItem(fid, TPL.LandData, `/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding/Data/${name}`, type, sort, name, source)
  );
});
write('serialized-content/templates/capco/IndustryLanding Templates/IndustryLanding/__Standard Values.yml', svItem(TPL.LandSV, TPL.Landing, '/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding/__Standard Values'));
write('serialized-content/templates/capco/IndustryLanding Templates/IndustryLanding Folder.yml', folderTpl(TPL.LandFolderTpl, TPL.LandFolder, '/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding Folder'));

write('serialized-content/renderings/capco/InsightsCarousel.yml', jsonRendering(ID.InsightsCarousel, 'InsightsCarousel', '/sitecore/templates/Project/capco/InsightsCarousel Templates/InsightsCarousel', 'InsightsCarousel Folder'));
write('serialized-content/renderings/capco/Subscribe.yml', jsonRendering(ID.Subscribe, 'Subscribe', '/sitecore/templates/Project/capco/Subscribe Templates/Subscribe', 'Subscribe Folder'));
write('serialized-content/renderings/capco/IndustryLanding.yml', jsonRendering(ID.IndustryLanding, 'IndustryLanding', '/sitecore/templates/Project/capco/IndustryLanding Templates/IndustryLanding', 'IndustryLanding Folder'));

write('serialized-content/capco/capco/Data/Insights Carousels.yml', dataFolder(DS.InsightsFolder, DATA_ID, '/sitecore/content/capco/capco/Data/Insights Carousels', TPL.InsightsFolderTpl));
write('serialized-content/capco/capco/Data/Subscribe.yml', dataFolder(DS.SubscribeFolder, DATA_ID, '/sitecore/content/capco/capco/Data/Subscribe', TPL.SubFolderTpl));
write('serialized-content/capco/capco/Data/Industry Landings.yml', dataFolder(DS.LandFolder, DATA_ID, '/sitecore/content/capco/capco/Data/Industry Landings', TPL.LandFolderTpl));

function insightsDs(id, name, heading, sector, items) {
  return `---
ID: "${id}"
Parent: "${DS.InsightsFolder}"
Template: "${TPL.Insights}"
Path: /sitecore/content/capco/capco/Data/Insights Carousels/${name}
SharedFields:
${dsWorkflow()}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${dsState()}${created()}    - ID: "${TPL.InsightsHeading}"
      Hint: Heading
      Value: "${heading}"
    - ID: "${TPL.InsightsSector}"
      Hint: Sector
      Value: "${sector}"
    - ID: "${TPL.InsightsItems}"
      Hint: Items
      Value: |
        ${treelist(items)}
`;
}

write(
  'serialized-content/capco/capco/Data/Insights Carousels/Banking.yml',
  insightsDs(DS.InsightsBanking, 'Banking', 'Latest Capco insights on Banking & Payments', 'banking-and-payments', [
    ID.P_Onboarding,
    ID.P_Canada,
    ID.P_AI,
  ])
);
write(
  'serialized-content/capco/capco/Data/Insights Carousels/Capital Markets.yml',
  insightsDs(DS.InsightsCapital, 'Capital Markets', 'Latest Capco insights on Capital Markets', 'capital-markets', [
    ID.P_TPlus1,
    ID.P_AI,
  ])
);
write(
  'serialized-content/capco/capco/Data/Insights Carousels/Energy.yml',
  insightsDs(DS.InsightsEnergy, 'Energy', 'Latest Capco insights on Energy', 'energy', [ID.P_EnergyAI, ID.P_TPlus1])
);
write(
  'serialized-content/capco/capco/Data/Insights Carousels/Home.yml',
  insightsDs(DS.InsightsHome, 'Home', 'Latest Capco insights', 'financial-services', [
    ID.P_Onboarding,
    ID.P_TPlus1,
    ID.P_AI,
    ID.P_EnergyAI,
  ])
);
write(
  'serialized-content/capco/capco/Data/Insights Carousels/Perspectives.yml',
  insightsDs(DS.InsightsPerspectives, 'Perspectives', 'Latest Capco insights', 'perspectives', [
    ID.P_Onboarding,
    ID.P_Canada,
    ID.P_TPlus1,
    ID.P_EnergyAI,
  ])
);

write(
  'serialized-content/capco/capco/Data/Subscribe/Connect.yml',
  `---
ID: "${DS.Subscribe}"
Parent: "${DS.SubscribeFolder}"
Template: "${TPL.Subscribe}"
Path: /sitecore/content/capco/capco/Data/Subscribe/Connect
SharedFields:
${dsWorkflow()}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${dsState()}${created()}    - ID: "${TPL.SubConnectHeading}"
      Hint: ConnectHeading
      Value: Connect with Capco
    - ID: "${TPL.SubConnectIntro}"
      Hint: ConnectIntro
      Value: To see how Capco can support your banking, capital markets or energy business, connect with us or subscribe for updates.
    - ID: "${TPL.SubTitle}"
      Hint: SubscribeTitle
      Value: Subscribe
    - ID: "${TPL.SubContactTitle}"
      Hint: ContactTitle
      Value: Contact us
    - ID: "${TPL.SubContactIntro}"
      Hint: ContactIntro
      Value: Talk to a named expert — Elisabeth, Charlotte, Anne-Marie or Marina.
    - ID: "${TPL.SubContactLink}"
      Hint: ContactLink
      Value: |
        <link text="Meet our people" linktype="internal" url="/people" anchor="" target="" title="" class="" id="${ID.P_Elisabeth}" />
    - ID: "${TPL.SubSubmit}"
      Hint: SubmitLabel
      Value: Subscribe
    - ID: "${TPL.SubSuccess}"
      Hint: SuccessMessage
      Value: Thank you. We have recorded your subscription preferences for this demo.
`
);

function landingDs(id, name, title, intro, image, expH, expI, jumps, items, storiesH, stories) {
  return `---
ID: "${id}"
Parent: "${DS.LandFolder}"
Template: "${TPL.Landing}"
Path: /sitecore/content/capco/capco/Data/Industry Landings/${name}
SharedFields:
${dsWorkflow()}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${dsState()}${created()}    - ID: "${TPL.LandTitle}"
      Hint: Title
      Value: "${title}"
    - ID: "${TPL.LandIntro}"
      Hint: Intro
      Value: |
        <p>${intro}</p>
    - ID: "${TPL.LandImage}"
      Hint: Image
      Value: |
        ${imageXml(image, title)}
    - ID: "${TPL.LandExpH}"
      Hint: ExpertiseHeading
      Value: "${expH}"
    - ID: "${TPL.LandExpI}"
      Hint: ExpertiseIntro
      Value: "${expI}"
    - ID: "${TPL.LandJumps}"
      Hint: Jumps
      Value: |
        ${treelist(jumps)}
    - ID: "${TPL.LandItems}"
      Hint: ExpertiseItems
      Value: |
        ${treelist(items)}
    - ID: "${TPL.LandStoriesH}"
      Hint: StoriesHeading
      Value: "${storiesH}"
    - ID: "${TPL.LandStories}"
      Hint: Stories
      Value: |
        ${treelist(stories)}
`;
}

write(
  'serialized-content/capco/capco/Data/Industry Landings/Banking.yml',
  landingDs(
    DS.LandBanking,
    'Banking',
    'Banking & Payments',
    'New technologies, shifting client expectations, and evolving regulation are reshaping banking and payments. Capco helps banks manage cost, grow revenue, and keep the next conversation with a named expert.',
    'banking-hero.jpg',
    'Our expertise in Banking & Payments',
    'From retail and commercial banking to payments and digital banks — tagged once with Charlotte Byrne.',
    [ID.P_Retail, ID.P_Commercial, ID.P_Community, ID.P_Digital, ID.P_Payments],
    [ID.P_Retail, ID.P_Commercial, ID.P_Community, ID.P_Digital, ID.P_Payments],
    'Banking & Payments success stories',
    [ID.P_DigitalBank, ID.P_Instant, ID.P_Charlotte]
  )
);
write(
  'serialized-content/capco/capco/Data/Industry Landings/Capital Markets.yml',
  landingDs(
    DS.LandCapital,
    'Capital Markets',
    'Capital Markets',
    'Transform technology and data, enhance market connectivity, and accelerate revenue — including T+1 readiness.',
    'tplus1.jpg',
    'Our expertise in Capital Markets',
    'Settlement compression is a market-structure test. Named expert: Elisabeth Plakinger.',
    [ID.P_T1Page],
    [ID.P_T1Page],
    'Capital Markets credentials',
    [ID.P_Elisabeth, ID.P_TPlus1]
  )
);
write(
  'serialized-content/capco/capco/Data/Industry Landings/Energy.yml',
  landingDs(
    DS.LandEnergy,
    'Energy',
    'Energy',
    'Digitisation, decentralisation and decarbonisation — plus agentic AI in energy trading.',
    'energy-trading.jpg',
    'Our expertise in Energy',
    'Trading and risk, transition, and utilities — tagged once with the people who did the work.',
    [ID.P_EnergyTrade],
    [ID.P_EnergyTrade],
    'Energy credentials',
    [ID.P_EnergyAI, ID.P_Elisabeth]
  )
);
write(
  'serialized-content/capco/capco/Data/Industry Landings/Insurance.yml',
  landingDs(
    DS.LandInsurance,
    'Insurance',
    'Insurance',
    'M&amp;A, divestitures and new partnerships — transform capabilities, profitability and compliance.',
    'regulation-glass.jpg',
    'Our expertise in Insurance',
    'Capabilities, profitability and compliance — published once.',
    [],
    [],
    'Related insights',
    [ID.P_AI]
  )
);
write(
  'serialized-content/capco/capco/Data/Industry Landings/Wealth.yml',
  landingDs(
    DS.LandWealth,
    'Wealth',
    'Wealth and Asset Management',
    'Stronger client relationships, operational efficiency, control and scale.',
    'onboarding.jpg',
    'Our expertise in Wealth and Asset Management',
    'Client experience and control, tagged once across people and Perspectives.',
    [],
    [],
    'Related insights',
    [ID.P_Onboarding]
  )
);

const tplusBody = `<p>Europe’s move to T+1 settlement is no longer a calendar event. Markets must prove operational readiness — matching, allocation, funding and exception handling — before the go-live date, not after the first failed settlement.</p>
<p>Elisabeth Plakinger sets out where firms still under-estimate the work: cross-border inventory, agent banks, and the data that has to be right the first time. This Perspective is the AEO surface Priya finds after a ChatGPT prompt — then the named consultant.</p>
<h3>Readiness is evidence, not a programme slide</h3>
<p>Boards want a date. Operations need a control environment. Capco’s work with capital markets organisations is to connect those two — vision to value — so T+1 is a proven operating model, not a weekend cutover.</p>
<h3>Where the fails still hide</h3>
<p>Compression does not invent new fails. It shortens the window in which a firm can still fix a bad allocation, a late affirmation, or a funding gap. The firms that treat T+1 as an IT release discover those gaps on Monday. The firms that treat it as a market-structure test have already measured them.</p>
<ul>
<li>Inventory and location data that is still reconciled overnight</li>
<li>Agent-bank cut-offs that do not move with the cash cycle</li>
<li>Exception queues that assume a human will still be at the desk</li>
</ul>
<h3>What Vince takes into an FS panel</h3>
<p>A credential is only useful if it names a person. Elisabeth’s profile carries the same T+1, Capital Markets and Europe tags as this article. That is how a citation becomes a conversation — and how The Expert Advantage stays honest.</p>`;

const aiBody = `<p>AI assistants are becoming the first conversation a client has with a bank — not a chatbot overlay, but the operating model for discovery, service and advice.</p>
<p>Charlotte Byrne writes on how financial services firms turn that front door into something auditable: human handover, entitlements, and the same taxonomy that powers Perspectives and consultant profiles.</p>
<h3>The conversion asset is still a named expert</h3>
<p>When the assistant cannot close the problem, the next click should be a person — not a generic industry landing page. That is The Expert Advantage.</p>
<h3>Auditability is the product</h3>
<p>Retail and commercial clients will forgive a model that asks a clarifying question. They will not forgive a model that cannot explain why it offered a product, or who is accountable when it is wrong. The banks that win treat the assistant as a controlled channel: same entitlements, same taxonomy, same named handover.</p>
<h3>What this means for onboarding</h3>
<p>The same logic applies to business banking. If the first hour of a relationship is still a paper checklist, the assistant is decoration. Charlotte’s companion Perspective on reimagining business banking onboarding is the operating-model half of this argument.</p>`;

const canadaBody = `<p>Real-time rails do not create new fraud. They collapse the time a payments team has to stop it. Canada’s next control test is not another policy paper — it is whether a bank can evidence a decision in the same window the payment moves.</p>
<p>Charlotte Byrne sets out what boards should ask for: a control library that is tagged once, an exception path that still names a human, and a public credential that does not invent a second author.</p>
<h3>The window is the product</h3>
<p>Overnight batch assumed a second look. Instant payments assume the first look was enough. That is a data problem, a model problem, and a people problem — in that order. Capco’s work with payments organisations is to keep those three on one taxonomy so Emma can publish the Perspective without re-keying the credential onto Charlotte’s profile.</p>
<h3>What to prove, not announce</h3>
<ul>
<li>Who can stop a payment after authorisation, and in what time</li>
<li>Which signals are models, and which are rules a regulator can read</li>
<li>Where the conversation goes when the model is unsure — a named expert, not a generic form</li>
</ul>
<h3>Close to the story</h3>
<p>Priya finds T+1 in ChatGPT. A payments CRO should find this article the same way — then Charlotte, not a campaign landing page. That is how Perspectives earn the citation.</p>`;

const energyBody = `<p>Agentic systems on an energy desk are useful only if the audit trail survives the trade. Elisabeth Plakinger applies the same discipline Capco uses in T+1 — prove the operating model, then publish the named expert.</p>
<p>Capco’s dual heritage in financial services and energy is the point. Scrunch and search are configured to both. The article is the AEO surface; the consultant is the conversion.</p>
<h3>Control is not a brake</h3>
<p>Trading desks adopt agents because the book is faster than a human refresh. Control functions adopt them only when every suggested order can be explained: which signal, which limit, which person signed the exception. That is the same evidence problem as settlement compression.</p>
<h3>What to keep on one taxonomy</h3>
<p>Energy, trading, and the named consultant should not live in three SharePoint lists. This Perspective, Elisabeth’s profile, and the Energy industry page share tags so Vince can take one credential into a panel and Emma can approve one item.</p>
<h3>The next click</h3>
<p>If the reader is a trader, the next click is the desk operating model. If the reader is a buyer, the next click is Elisabeth. Do not invent a fifth colleague to fill the gap.</p>`;

const onboardBody = `<p>The onboarding of corporate and SME business-banking clients remains one of the most compliance-heavy journeys in financial services. Too often it is still manual, opaque and disconnected from the products the bank wants to sell. Fintechs have reset the clock. Banks that treat onboarding as a back-office checklist lose the relationship before the first payment.</p>
<p>Charlotte Byrne writes the Capco view: onboarding is the front door. It should be as auditable as an AI assistant and as human as a named Relationship Manager — the same Expert Advantage that turns a Perspective into a consultant.</p>
<h3>A journey that still starts too late</h3>
<p>A fast-growing business does not experience “KYC”. It experiences weeks of documents, board signatures in more than one country, and emails that never quite say which rule is blocking the account. By the time the partnership closes, the CEO has already bookmarked a neo-bank. That is not a technology gap. It is an operating-model gap.</p>
<p>From the bank’s side the same journey is expensive: siloed systems, inconsistent interpretations of beneficial ownership, and Relationship Managers who still carry the process on a laptop of PDFs. Digital onboarding that only scans a passport has not changed the work.</p>
<h3>What a future-ready journey looks like</h3>
<p>Reimagining business banking onboarding means building it around the client and the RM together. Automation, compliance, product fulfilment and human handover have to sit on one flow.</p>
<ul>
<li>Account activation measured in hours, with identity and documents verified in the same session</li>
<li>RM-led capture on a tablet — the relationship stays in the room, the system does the filing</li>
<li>Live screening for KYC, AML, beneficial ownership and sanctions as files arrive</li>
<li>Product subscription in the same journey, not a second project after go-live</li>
<li>Role-based tasks for directors and legal representatives, with a status both sides can see</li>
</ul>
<h3>iKYC is the control spine, not the product</h3>
<p>Know Your Customer is the highest-risk step. A digital, data-driven model — pulling registries, screening lists and documents in parallel — can compress weeks of correspondence into minutes for a standard case. That only holds if exception handling still names a person. The assistant or the orchestration engine can assemble the pack. Charlotte, or the RM she is coaching, still owns the call the model cannot make.</p>
<h3>Hybrid, not lights-out</h3>
<p>Relationship Managers should be digitally empowered, not digitally displaced. The client is never left in a black box. Digital channels stay open before and after the meeting so documents can be uploaded overnight. That is the same handover pattern as AI assistants on the retail side: the model starts the conversation; the named expert finishes it.</p>
<h3>From acquisition to activation</h3>
<p>A usable blueprint has three phases. Acquisition enriches the prospect in the CRM and runs early risk flags before anyone promises a timeline. Onboarding orchestrates CRM, compliance and document tools around the legal structure in front of the RM. Activation writes the account to the core, opens the portal, and feeds the same taxonomy that will later power Perspectives and consultant credentials.</p>
<h3>How Capco helps — and how this demo tells it</h3>
<p>Capco combines banking, regulatory and client-experience work so the journey survives contact with a real operations team. In this site the article is the AEO surface Priya can cite. The industry page for Commercial Banking and Charlotte’s profile carry the same tags. Emma approves one item. Vince takes a named expert into the room. No invented authors, no second SharePoint list.</p>`;

function writeArticle({ id, slug, title, nav, body, extras, insightsDs, uid }) {
  write(
    `serialized-content/capco/capco/Home/perspectives/${slug}.yml`,
    pageYaml({
      id,
      parent: ID.P_Perspectives,
      itemPath: `/sitecore/content/capco/capco/Home/perspectives/${slug}`,
      title,
      nav,
      templateId: ID.Tpl_Article,
      workflow: true,
      content: body,
      renderings: articleStack(insightsDs, uid),
      extraVersion: articleExtras(extras),
    })
  );
}

writeArticle({
  id: ID.P_TPlus1,
  slug: 'europes-t-plus-1-market-must-prove-readiness',
  title: "Europe's T+1 market must prove readiness",
  nav: "Europe's T+1 market must prove readiness",
  body: tplusBody,
  insightsDs: DS.InsightsCapital,
  uid: 10,
  extras: {
    summary: 'Europe must prove T+1 operational readiness — matching, funding and exceptions — before go-live. Named expert: Elisabeth Plakinger.',
    kicker: 'Capital Markets',
    date: '15 Sep 2026',
    read: '8 min read',
    image: 'tplus1.jpg',
    alt: 'T+1 settlement',
    sectors: [TAG.capital],
    services: [TAG.tplus1, TAG.data],
    regions: [TAG.europe, TAG.uk],
    topics: [TAG.regulation, TAG.transformation],
    authors: [ID.P_Elisabeth],
    related: [ID.P_AI, ID.P_EnergyAI],
    suggested: 'T+1, settlement, capital markets, Europe, post-trade',
    aeo: 'Cited for “Europe T+1 readiness”. Passages are short, named expert, FAQ-ready.',
    seo: 'Europe T+1 settlement readiness | Capco',
  },
});

writeArticle({
  id: ID.P_AI,
  slug: 'ai-assistants-as-the-front-door-to-fs',
  title: 'AI assistants as the front door to financial services',
  nav: 'AI assistants as the front door to financial services',
  body: aiBody,
  insightsDs: DS.InsightsBanking,
  uid: 20,
  extras: {
    summary: 'AI assistants become the first conversation with a bank. Charlotte Byrne on auditability, handover, and a named Capco expert.',
    kicker: 'Digital banking',
    date: '17 Aug 2026',
    read: '6 min read',
    image: 'banking-hero.jpg',
    alt: 'AI assistants in banking',
    sectors: [TAG.banking],
    services: [TAG.ai, TAG.payments],
    regions: [TAG.uk, TAG.americas],
    topics: [TAG.transformation],
    authors: [ID.P_Charlotte],
    related: [ID.P_Onboarding, ID.P_TPlus1],
    suggested: 'AI assistants, banking, digital, auditability',
    aeo: 'Answers “AI front door to financial services”. Named author.',
    seo: 'AI assistants in financial services | Capco',
  },
});

writeArticle({
  id: ID.P_Canada,
  slug: 'canada-payment-fraud',
  title: 'Canada payment fraud: the next control test',
  nav: 'Canada payment fraud: the next control test',
  body: canadaBody,
  insightsDs: DS.InsightsBanking,
  uid: 30,
  extras: {
    summary: 'Real-time rails collapse the time a bank has to stop fraud. Charlotte Byrne on the control test Canada’s payments teams must prove.',
    kicker: 'Payments and cards',
    date: '19 Aug 2026',
    read: '5 min read',
    image: 'fraud.jpg',
    alt: 'Payments fraud controls',
    sectors: [TAG.banking],
    services: [TAG.payments, TAG.ai],
    regions: [TAG.americas],
    topics: [TAG.risk, TAG.regulation],
    authors: [ID.P_Charlotte],
    related: [ID.P_Onboarding, ID.P_AI],
    suggested: 'Canada, payment fraud, real-time rails, controls',
    aeo: 'Answers “Canada payment fraud controls”. Named expert Charlotte Byrne.',
    seo: 'Canada payment fraud controls | Capco',
  },
});

writeArticle({
  id: ID.P_EnergyAI,
  slug: 'agentic-ai-in-energy-trading',
  title: 'Agentic AI in energy trading',
  nav: 'Agentic AI in energy trading',
  body: energyBody,
  insightsDs: DS.InsightsEnergy,
  uid: 40,
  extras: {
    summary: 'Agentic systems on an energy desk only work if the audit trail survives. Elisabeth Plakinger on control, taxonomy and a named expert.',
    kicker: 'Energy',
    date: '13 Aug 2026',
    read: '5 min read',
    image: 'energy-trading.jpg',
    alt: 'Energy trading',
    sectors: [TAG.energy],
    services: [TAG.trading, TAG.ai],
    regions: [TAG.europe, TAG.americas],
    topics: [TAG.transformation, TAG.risk],
    authors: [ID.P_Elisabeth],
    related: [ID.P_TPlus1, ID.P_AI],
    suggested: 'agentic AI, energy trading, controls, audit',
    aeo: 'Answers “agentic AI in energy trading”. Named expert Elisabeth Plakinger.',
    seo: 'Agentic AI in energy trading | Capco',
  },
});

writeArticle({
  id: ID.P_Onboarding,
  slug: 'reimagining-business-banking-onboarding',
  title: 'Reimagining business banking onboarding',
  nav: 'Reimagining business banking onboarding',
  body: onboardBody,
  insightsDs: DS.InsightsBanking,
  uid: 50,
  extras: {
    summary: 'Business banking onboarding is still the bottleneck. Charlotte Byrne on a hybrid RM + iKYC journey that still names an expert.',
    kicker: 'Banking and Payments',
    date: '04 Mar 2026',
    read: '8 min read',
    image: 'onboarding.jpg',
    alt: 'Business banking onboarding',
    sectors: [TAG.banking],
    services: [TAG.ai, TAG.payments],
    regions: [TAG.uk, TAG.europe],
    topics: [TAG.transformation, TAG.regulation],
    authors: [ID.P_Charlotte],
    related: [ID.P_AI, ID.P_Canada],
    suggested: 'business banking, onboarding, KYC, SME, commercial banking',
    aeo: 'Answers “business banking onboarding”. Named author Charlotte Byrne. Structured H3s for crawlers.',
    seo: 'Reimagining business banking onboarding | Capco',
  },
});

function writeIndustryPage({ id, parent, slug, title, intro, landingDs, insightsDs, uid }) {
  write(
    `serialized-content/capco/capco/Home/${parent === ID.P_Industries ? 'industries' : parent === ID.P_Banking ? 'industries/banking-and-payments' : parent === ID.P_Capital ? 'industries/capital-markets' : 'industries/energy'}/${slug === 'banking-and-payments' || slug === 'capital-markets' || slug === 'energy' || slug === 'insurance' || slug === 'wealth-and-asset-management' ? slug : slug}.yml`.replace(
      /industries\/banking-and-payments\/banking-and-payments/,
      'industries/banking-and-payments'
    ).replace(
      /industries\/capital-markets\/capital-markets/,
      'industries/capital-markets'
    ).replace(/industries\/energy\/energy.yml/, 'industries/energy.yml'),
    pageYaml({
      id,
      parent,
      itemPath: parent === ID.P_Industries
        ? `/sitecore/content/capco/capco/Home/industries/${slug}`
        : parent === ID.P_Banking
          ? `/sitecore/content/capco/capco/Home/industries/banking-and-payments/${slug}`
          : parent === ID.P_Capital
            ? `/sitecore/content/capco/capco/Home/industries/capital-markets/${slug}`
            : `/sitecore/content/capco/capco/Home/industries/energy/${slug}`,
      title,
      nav: title,
      content: `<p>${intro}</p>`,
      renderings: industryStack(landingDs, insightsDs, uid),
    })
  );
}

const topIndustries = [
  [ID.P_Banking, 'banking-and-payments', 'Banking and Payments', 'From standalone digital banks to core modernisation and the payments delivery cycle.', DS.LandBanking, DS.InsightsBanking, 210],
  [ID.P_Capital, 'capital-markets', 'Capital Markets', 'Transform technology and data, enhance market connectivity, and accelerate revenue — including T+1 readiness.', DS.LandCapital, DS.InsightsCapital, 220],
  [ID.P_Insurance, 'insurance', 'Insurance', 'M&amp;A, divestitures and new partnerships — transform capabilities, profitability and compliance.', DS.LandInsurance, DS.InsightsHome, 230],
  [ID.P_Wealth, 'wealth-and-asset-management', 'Wealth and Asset Management', 'Stronger client relationships, operational efficiency, control and scale.', DS.LandWealth, DS.InsightsHome, 240],
  [ID.P_Energy, 'energy', 'Energy', 'Energy transition, commodity trading and risk, utilities growth — stay ahead of the pack.', DS.LandEnergy, DS.InsightsEnergy, 250],
];
for (const [id, slug, title, intro, landing, insights, start] of topIndustries) {
  write(
    `serialized-content/capco/capco/Home/industries/${slug}.yml`,
    pageYaml({
      id,
      parent: ID.P_Industries,
      itemPath: `/sitecore/content/capco/capco/Home/industries/${slug}`,
      title,
      nav: title,
      content: `<p>${intro}</p>`,
      renderings: industryStack(landing, insights, '0016', start),
    })
  );
}

const bankingChildren = [
  [ID.P_Retail, 'retail-banking', 'Retail Banking', 'Consumers expect speed and personalisation. AI assistants are the front door — Charlotte Byrne is the conversion.'],
  [ID.P_Commercial, 'commercial-banking', 'Commercial Banking', 'Business onboarding is still the bottleneck. Charlotte’s Perspective is the AEO surface for that journey.'],
  [ID.P_Community, 'community-banking', 'Community Banking', 'Local banks need digital depth without losing the relationship.'],
  [ID.P_Digital, 'digital-banks', 'Digital banks and FinTech', 'Standalone digital banks and non-bank competitors reset the bar.'],
  [ID.P_Payments, 'payments', 'Payments', 'Real-time rails raise the control test. Canada payment fraud is the Perspective.'],
  [ID.P_DigitalBank, 'digital-business-bank', 'How Capco launched a digital business bank', 'End-to-end consulting and delivery for a new digital bank — operating model to go-live.'],
  [ID.P_Instant, 'instant-payments', 'Instant payments, proven controls', 'Solution design and compliance for a payments provider that had to prove readiness.'],
];
bankingChildren.forEach(([id, slug, title, intro], index) => {
  write(
    `serialized-content/capco/capco/Home/industries/banking-and-payments/${slug}.yml`,
    pageYaml({
      id,
      parent: ID.P_Banking,
      itemPath: `/sitecore/content/capco/capco/Home/industries/banking-and-payments/${slug}`,
      title,
      nav: title,
      content: `<p>${intro}</p>`,
      renderings: industryStack('', DS.InsightsBanking, '0017', (index + 1) * 10),
    })
  );
});

write(
  'serialized-content/capco/capco/Home/industries/capital-markets/t-plus-1.yml',
  pageYaml({
    id: ID.P_T1Page,
    parent: ID.P_Capital,
    itemPath: '/sitecore/content/capco/capco/Home/industries/capital-markets/t-plus-1',
    title: 'T+1 settlement',
    nav: 'T+1 settlement',
    content: '<p>T+1 is not a weekend IT change. Elisabeth Plakinger sets out the evidence boards need.</p>',
    renderings: industryStack('', DS.InsightsCapital, '0018', 10),
  })
);
write(
  'serialized-content/capco/capco/Home/industries/energy/energy-trading.yml',
  pageYaml({
    id: ID.P_EnergyTrade,
    parent: ID.P_Energy,
    itemPath: '/sitecore/content/capco/capco/Home/industries/energy/energy-trading',
    title: 'Energy trading',
    nav: 'Energy trading',
    content: '<p>Agentic AI on the desk is useful only if the audit trail survives the trade.</p>',
    renderings: industryStack('', DS.InsightsEnergy, '0018', 20),
  })
);

function injectHomeRenderings() {
  const homePath = path.join(ROOT, 'serialized-content/capco/capco/Home.yml');
  let yaml = fs.readFileSync(homePath, 'utf8');
  if (yaml.includes('C4C00001-1111-4000-8000-000000000016')) {
    return;
  }
  yaml = yaml.replace(
    `s:ph="headless-main" />
      </d>`,
    `s:ph="headless-main" />
        <r
          uid="{C4C01000-0001-4000-8000-000000000004}"
          s:ds="c4c00020-0000-4000-8000-000000000054"
          s:id="{C4C00001-1111-4000-8000-000000000016}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
        <r
          uid="{C4C01000-0001-4000-8000-000000000005}"
          s:ds="c4c00020-0000-4000-8000-000000000060"
          s:id="{C4C00001-1111-4000-8000-000000000017}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=5"
          s:ph="headless-main" />
      </d>`
  );
  fs.writeFileSync(homePath, yaml);
}

function injectPerspectivesRenderings() {
  const file = path.join(ROOT, 'serialized-content/capco/capco/Home/perspectives.yml');
  let yaml = fs.readFileSync(file, 'utf8');
  if (yaml.includes('C4C00001-1111-4000-8000-000000000016')) {
    return;
  }
  yaml = yaml.replace(
    `s:ph="headless-main" />
      </d>`,
    `s:ph="headless-main" />
        <r
          uid="{C4C01000-0004-4000-8000-000000000010}"
          s:ds="c4c00020-0000-4000-8000-000000000055"
          s:id="{C4C00001-1111-4000-8000-000000000016}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />
        <r
          uid="{C4C01000-0004-4000-8000-000000000011}"
          s:ds="c4c00020-0000-4000-8000-000000000060"
          s:id="{C4C00001-1111-4000-8000-000000000017}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
      </d>`
  );
  fs.writeFileSync(file, yaml);
}

injectHomeRenderings();
injectPerspectivesRenderings();

const extraRend = [
  ID.InsightsCarousel,
  ID.Subscribe,
  ID.IndustryLanding,
]
  .map((id) => `    ${u(id)}`)
  .join('\n');

const arPath = path.join(ROOT, 'serialized-content/capco/capco/Presentation/Available Renderings/Capco.yml');
let ar = fs.readFileSync(arPath, 'utf8');
if (!ar.includes(ID.InsightsCarousel.toUpperCase())) {
  ar = ar.replace(
    '{C4C00001-1111-4000-8000-000000000015}\n',
    `{C4C00001-1111-4000-8000-000000000015}\n${extraRend}\n`
  );
  if (!ar.includes(ID.InsightsCarousel.toUpperCase())) {
    ar = ar.replace(
      '{C4C00001-1111-4000-8000-000000000014}\n',
      `{C4C00001-1111-4000-8000-000000000014}\n    {C4C00001-1111-4000-8000-000000000015}\n${extraRend}\n`
    );
  }
  fs.writeFileSync(arPath, ar);
}

const headlessAllowed = `  Value: |
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
    {C4C00001-1111-4000-8000-000000000003}
    {C4C00001-1111-4000-8000-000000000004}
    {C4C00001-1111-4000-8000-000000000005}
    {C4C00001-1111-4000-8000-00000000000A}
    {C4C00001-1111-4000-8000-00000000000B}
    {C4C00001-1111-4000-8000-00000000000C}
    {C4C00001-1111-4000-8000-000000000013}
    {C4C00001-1111-4000-8000-000000000014}
    {C4C00001-1111-4000-8000-000000000015}
    {C4C00001-1111-4000-8000-000000000016}
    {C4C00001-1111-4000-8000-000000000017}
    {C4C00001-1111-4000-8000-000000000018}
`;

for (const rel of [
  'serialized-content/placeholder-settings/capco/headless-main.yml',
  'serialized-content/capco/capco/Presentation/Placeholder Settings/headless-main.yml',
]) {
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  yaml = yaml.replace(/  Value: \|\n(?:    \{[0-9A-F-]+\}\n)+/, headlessAllowed);
  fs.writeFileSync(full, yaml);
}

console.log('Capco industry / insights / subscribe YAML generated.');
