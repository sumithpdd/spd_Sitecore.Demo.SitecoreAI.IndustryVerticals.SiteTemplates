/**
 * Storyboard P0/P1 pages + editable datasource templates.
 * Does not rewrite Home.yml or DAM stamps. Do not run generate-capco-site.mjs.
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
const HOME_ID = '0a0eb8d0-95d9-4e82-8183-7ca05ecc558a';
const ABOUT_ID = 'c4c00030-0000-4000-8000-000000000027';
const PERSPECTIVES_ID = 'c4c00030-0000-4000-8000-000000000010';
const DESIGN = 'c4c00005-5555-4000-8000-000000000001';
const WF_PAGE = 'c4c00040-0000-4000-8000-000000000001';
const WF_APPROVED = 'c4c00040-0000-4000-8000-00000000000a';
const WF_DS = 'c4c00040-0000-4000-8000-000000000011';
const WF_DS_OK = 'c4c00040-0000-4000-8000-000000000017';
const TPL_ARTICLE = 'c4c00010-0000-4000-8000-000000000050';
const ARTICLE_SECTION = 'c4c00010-0000-4000-8000-000000000051';
const HERO_DATA = 'c4c00010-0000-4000-8000-000000000012';

const R = {
  PageHeading: 'c4c00001-1111-4000-8000-00000000000b',
  ArticleDetails: 'c4c00001-1111-4000-8000-000000000007',
  Insights: 'c4c00001-1111-4000-8000-000000000016',
  Subscribe: 'c4c00001-1111-4000-8000-000000000017',
  Industry: 'c4c00001-1111-4000-8000-000000000018',
  Stat: 'c4c00001-1111-4000-8000-000000000019',
  Case: 'c4c00001-1111-4000-8000-00000000001a',
  Compare: 'c4c00001-1111-4000-8000-00000000001b',
  Publication: 'c4c00001-1111-4000-8000-00000000001c',
  Enquiry: 'c4c00001-1111-4000-8000-00000000001d',
  Preference: 'c4c00001-1111-4000-8000-00000000001e',
  Campaign: 'c4c00001-1111-4000-8000-00000000001f',
};

const TAG = {
  energy: 'c4c00025-0000-4000-8000-000000000005',
  banking: 'c4c00025-0000-4000-8000-000000000001',
  data: 'c4c00025-0000-4000-8000-000000000015',
  europe: 'c4c00025-0000-4000-8000-000000000022',
  uk: 'c4c00025-0000-4000-8000-000000000021',
  americas: 'c4c00025-0000-4000-8000-000000000023',
  regulation: 'c4c00025-0000-4000-8000-000000000031',
  ai: 'c4c00025-0000-4000-8000-000000000012',
  payments: 'c4c00025-0000-4000-8000-000000000013',
};

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
      Value: 20260924T000000Z
`;
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

function section(id, parent, itemPath) {
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

function fieldYml(id, parent, itemPath, title, type, sort, source = '') {
  const src = source
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
${src}- ID: "${F_TYPE}"
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

function sv(id, parent, tpl, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${tpl}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "{${WF_DS.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "{${WF_DS_OK.toUpperCase()}}"
${created()}`;
}

function dataFolder(id, name, folderTpl) {
  return `---
ID: "${id}"
Parent: "${DATA_ID}"
Template: "${folderTpl}"
Path: /sitecore/content/capco/capco/Data/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function dsItem(id, parent, tpl, itemPath, fields) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${tpl}"
Path: ${itemPath}
SharedFields:
- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "{${WF_DS.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "{${WF_DS_OK.toUpperCase()}}"
${created()}${fields}`;
}

function pageXml(uids) {
  const rows = uids
    .map((row, i) => {
      const before = i === 0 ? '\n          p:before="*"' : '';
      const ds = row.ds ? `\n          s:ds="${row.ds}"` : '';
      const extra = row.par || '';
      return `        <r
          uid="{${row.uid}}"${before}${ds}
          s:id="{${row.id.toUpperCase()}}"
          s:par="GridParameters=%7B${GRID}%7D${extra}&amp;DynamicPlaceholderId=${i + 1}"
          s:ph="headless-main" />`;
    })
    .join('\n');
  return `<r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{${DEVICE}}"
        l="{${JSS_LAYOUT}}">
${rows}
      </d>
    </r>`;
}

function appPage({ id, parent, itemPath, nav, title, html, renderings, extra = '' }) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${HOME_TEMPLATE}"
Path: ${itemPath}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "{${DESIGN.toUpperCase()}}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderings}
Languages:
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
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${html}
${extra}`;
}

function family(prefix, folderName, typeName, fields) {
  const ids = {
    folder: `${prefix}0`,
    tpl: `${prefix}1`,
    data: `${prefix}2`,
    sv: `${prefix}8`,
    folderTpl: `${prefix}9`,
  };
  const root = `serialized-content/templates/capco/${folderName}`;
  write(`${root}.yml`, templateFolder(ids.folder, `/sitecore/templates/Project/capco/${folderName}`));
  write(
    `${root}/${typeName}.yml`,
    templateItem(ids.tpl, ids.folder, `/sitecore/templates/Project/capco/${folderName}/${typeName}`)
  );
  write(
    `${root}/${typeName}/Data.yml`,
    section(ids.data, ids.tpl, `/sitecore/templates/Project/capco/${folderName}/${typeName}/Data`)
  );
  write(
    `${root}/${typeName}/__Standard Values.yml`,
    sv(ids.sv, ids.tpl, ids.tpl, `/sitecore/templates/Project/capco/${folderName}/${typeName}/__Standard Values`)
  );
  write(
    `${root}/${typeName} Folder.yml`,
    folderTpl(ids.folderTpl, ids.folder, `/sitecore/templates/Project/capco/${folderName}/${typeName} Folder`)
  );
  fields.forEach((f, i) => {
    write(
      `${root}/${typeName}/Data/${f.name}.yml`,
      fieldYml(
        f.id,
        ids.data,
        `/sitecore/templates/Project/capco/${folderName}/${typeName}/Data/${f.name}`,
        f.name,
        f.type,
        100 + i * 10,
        f.source || ''
      )
    );
  });
  return ids;
}

const statFields = [
  { id: 'c4c00010-0000-4000-8000-0000000000c3', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000c4', name: 'Intro', type: 'Multi-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000c5', name: 'StatOneValue', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000c6', name: 'StatOneLabel', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000c7', name: 'StatTwoValue', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000cb', name: 'StatTwoLabel', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000cc', name: 'StatThreeValue', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000cd', name: 'StatThreeLabel', type: 'Single-Line Text' },
];
const caseFields = [
  { id: 'c4c00010-0000-4000-8000-0000000000d3', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000d4', name: 'Intro', type: 'Multi-Line Text' },
  {
    id: 'c4c00010-0000-4000-8000-0000000000d5',
    name: 'Items',
    type: 'Treelist',
    source: '/sitecore/content/capco/capco/Home/about-us/expertise-in-action',
  },
];
const compareFields = [
  { id: 'c4c00010-0000-4000-8000-0000000000e3', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000e4', name: 'LeftTitle', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000e5', name: 'LeftBody', type: 'Rich Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000e6', name: 'RightTitle', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000e7', name: 'RightBody', type: 'Rich Text' },
];
const pubFields = [
  { id: 'c4c00010-0000-4000-8000-0000000000f3', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000f4', name: 'IssueTitle', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000f5', name: 'IssueNumber', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000f6', name: 'Format', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-0000000000f7', name: 'PdfUrl', type: 'General Link' },
  { id: 'c4c00010-0000-4000-8000-0000000000fa', name: 'HtmlHref', type: 'Single-Line Text' },
];
const enquiryFields = [
  { id: 'c4c00010-0000-4000-8000-000000000113', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000114', name: 'Intro', type: 'Multi-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000115', name: 'HubSpotFormId', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000116', name: 'SubmitLabel', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000117', name: 'SuccessMessage', type: 'Single-Line Text' },
];
const prefFields = [
  { id: 'c4c00010-0000-4000-8000-000000000123', name: 'Heading', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000124', name: 'Intro', type: 'Multi-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000125', name: 'SubmitLabel', type: 'Single-Line Text' },
];
const campaignFields = [
  { id: 'c4c00010-0000-4000-8000-000000000133', name: 'Eyebrow', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000134', name: 'Title', type: 'Single-Line Text' },
  { id: 'c4c00010-0000-4000-8000-000000000135', name: 'Intro', type: 'Rich Text' },
  { id: 'c4c00010-0000-4000-8000-000000000136', name: 'PrimaryCta', type: 'General Link' },
  { id: 'c4c00010-0000-4000-8000-000000000137', name: 'SecondaryCta', type: 'General Link' },
];

const stat = family('c4c00010-0000-4000-8000-0000000000c', 'StatBlock Templates', 'StatBlock', statFields);
// family uses prefix0 = folder. I passed 0c which becomes 0c0. Good.
// Wait family(`${prefix}0`) - I passed 'c4c00010-0000-4000-8000-0000000000c' + '0' = 0c0. Yes.

const cases = family('c4c00010-0000-4000-8000-0000000000d', 'CaseStudy Templates', 'CaseStudyGrid', caseFields);
const compare = family(
  'c4c00010-0000-4000-8000-0000000000e',
  'ComparisonBlock Templates',
  'ComparisonBlock',
  compareFields
);
const pub = family(
  'c4c00010-0000-4000-8000-0000000000f',
  'PublicationCard Templates',
  'PublicationCard',
  pubFields
);
const enquiry = family('c4c00010-0000-4000-8000-00000000011', 'EnquiryForm Templates', 'EnquiryForm', enquiryFields);
const pref = family(
  'c4c00010-0000-4000-8000-00000000012',
  'PreferenceCentre Templates',
  'PreferenceCentre',
  prefFields
);
const campaign = family(
  'c4c00010-0000-4000-8000-00000000013',
  'CampaignLanding Templates',
  'CampaignLanding',
  campaignFields
);

write(
  'serialized-content/templates/capco/ArticlePage/Article/Byline.yml',
  fieldYml(
    'c4c00010-0000-4000-8000-000000000069',
    ARTICLE_SECTION,
    '/sitecore/templates/Project/capco/ArticlePage/Article/Byline',
    'Byline',
    'Single-Line Text',
    165
  )
);
write(
  'serialized-content/templates/capco/ArticlePage/Article/Persona.yml',
  fieldYml(
    'c4c00010-0000-4000-8000-00000000006a',
    ARTICLE_SECTION,
    '/sitecore/templates/Project/capco/ArticlePage/Article/Persona',
    'Persona',
    'Single-Line Text',
    175
  )
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/Width.yml',
  fieldYml(
    'c4c00010-0000-4000-8000-00000000001e',
    HERO_DATA,
    '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/Width',
    'Width',
    'Single-Line Text',
    300
  )
);
write(
  'serialized-content/templates/capco/HeroBanner Templates/HeroBanner/Data/Height.yml',
  fieldYml(
    'c4c00010-0000-4000-8000-00000000001f',
    HERO_DATA,
    '/sitecore/templates/Project/capco/HeroBanner Templates/HeroBanner/Data/Height',
    'Height',
    'Single-Line Text',
    310
  )
);

write(
  'serialized-content/renderings/capco/StatBlock.yml',
  jsonRendering(R.Stat, 'StatBlock', '/sitecore/templates/Project/capco/StatBlock Templates/StatBlock', 'StatBlock Folder')
);
write(
  'serialized-content/renderings/capco/CaseStudyGrid.yml',
  jsonRendering(
    R.Case,
    'CaseStudyGrid',
    '/sitecore/templates/Project/capco/CaseStudy Templates/CaseStudyGrid',
    'CaseStudyGrid Folder'
  )
);
write(
  'serialized-content/renderings/capco/ComparisonBlock.yml',
  jsonRendering(
    R.Compare,
    'ComparisonBlock',
    '/sitecore/templates/Project/capco/ComparisonBlock Templates/ComparisonBlock',
    'ComparisonBlock Folder'
  )
);
write(
  'serialized-content/renderings/capco/PublicationCard.yml',
  jsonRendering(
    R.Publication,
    'PublicationCard',
    '/sitecore/templates/Project/capco/PublicationCard Templates/PublicationCard',
    'PublicationCard Folder'
  )
);
write(
  'serialized-content/renderings/capco/EnquiryForm.yml',
  jsonRendering(
    R.Enquiry,
    'EnquiryForm',
    '/sitecore/templates/Project/capco/EnquiryForm Templates/EnquiryForm',
    'EnquiryForm Folder'
  )
);
write(
  'serialized-content/renderings/capco/PreferenceCentre.yml',
  jsonRendering(
    R.Preference,
    'PreferenceCentre',
    '/sitecore/templates/Project/capco/PreferenceCentre Templates/PreferenceCentre',
    'PreferenceCentre Folder'
  )
);
write(
  'serialized-content/renderings/capco/CampaignLanding.yml',
  jsonRendering(
    R.Campaign,
    'CampaignLanding',
    '/sitecore/templates/Project/capco/CampaignLanding Templates/CampaignLanding',
    'CampaignLanding Folder'
  )
);

const DS = {
  StatFolder: 'c4c00020-0000-4000-8000-000000000076',
  StatAi: 'c4c00020-0000-4000-8000-000000000077',
  CaseFolder: 'c4c00020-0000-4000-8000-000000000078',
  CaseProof: 'c4c00020-0000-4000-8000-000000000079',
  CompareFolder: 'c4c00020-0000-4000-8000-00000000007a',
  CompareAi: 'c4c00020-0000-4000-8000-00000000007b',
  PubFolder: 'c4c00020-0000-4000-8000-00000000007c',
  Pub62: 'c4c00020-0000-4000-8000-00000000007d',
  EnquiryFolder: 'c4c00020-0000-4000-8000-00000000007e',
  Enquiry: 'c4c00020-0000-4000-8000-00000000007f',
  PrefFolder: 'c4c00020-0000-4000-8000-000000000080',
  Pref: 'c4c00020-0000-4000-8000-000000000081',
  CampFolder: 'c4c00020-0000-4000-8000-000000000082',
  CampAi: 'c4c00020-0000-4000-8000-000000000083',
  CampPay: 'c4c00020-0000-4000-8000-000000000084',
  CampEnergy: 'c4c00020-0000-4000-8000-000000000085',
};

write('serialized-content/capco/capco/Data/Stat Blocks.yml', dataFolder(DS.StatFolder, 'Stat Blocks', stat.folderTpl));
write(
  'serialized-content/capco/capco/Data/Stat Blocks/AI Infused.yml',
  dsItem(
    DS.StatAi,
    DS.StatFolder,
    stat.tpl,
    '/sitecore/content/capco/capco/Data/Stat Blocks/AI Infused',
    `    - ID: "c4c00010-0000-4000-8000-0000000000c3"
      Hint: Heading
      Value: "AI Infused, in numbers"
    - ID: "c4c00010-0000-4000-8000-0000000000c4"
      Hint: Intro
      Value: "Editor-configurable impact metrics — no developer ticket."
    - ID: "c4c00010-0000-4000-8000-0000000000c5"
      Hint: StatOneValue
      Value: "25+"
    - ID: "c4c00010-0000-4000-8000-0000000000c6"
      Hint: StatOneLabel
      Value: "Years in FS and Energy"
    - ID: "c4c00010-0000-4000-8000-0000000000c7"
      Hint: StatTwoValue
      Value: "2,000+"
    - ID: "c4c00010-0000-4000-8000-0000000000cb"
      Hint: StatTwoLabel
      Value: "Energy consultants"
    - ID: "c4c00010-0000-4000-8000-0000000000cc"
      Hint: StatThreeValue
      Value: "1"
    - ID: "c4c00010-0000-4000-8000-0000000000cd"
      Hint: StatThreeLabel
      Value: "Named expert per credential"
`
  )
);

write('serialized-content/capco/capco/Data/Case Studies.yml', dataFolder(DS.CaseFolder, 'Case Studies', cases.folderTpl));
write(
  'serialized-content/capco/capco/Data/Case Studies/Expertise in Action.yml',
  dsItem(
    DS.CaseProof,
    DS.CaseFolder,
    cases.tpl,
    '/sitecore/content/capco/capco/Data/Case Studies/Expertise in Action',
    `    - ID: "c4c00010-0000-4000-8000-0000000000d3"
      Hint: Heading
      Value: "Expertise in Action"
    - ID: "c4c00010-0000-4000-8000-0000000000d4"
      Hint: Intro
      Value: "Proof from Emma's market — industry, region and an outcome metric."
    - ID: "c4c00010-0000-4000-8000-0000000000d5"
      Hint: Items
      Value: |
        {C4C00030-0000-4000-8000-000000000088}
        {C4C00030-0000-4000-8000-000000000089}
        {C4C00030-0000-4000-8000-00000000008A}
        {C4C00030-0000-4000-8000-00000000008B}
`
  )
);

write(
  'serialized-content/capco/capco/Data/Comparisons.yml',
  dataFolder(DS.CompareFolder, 'Comparisons', compare.folderTpl)
);
write(
  'serialized-content/capco/capco/Data/Comparisons/AI Infused.yml',
  dsItem(
    DS.CompareAi,
    DS.CompareFolder,
    compare.tpl,
    '/sitecore/content/capco/capco/Data/Comparisons/AI Infused',
    `    - ID: "c4c00010-0000-4000-8000-0000000000e3"
      Hint: Heading
      Value: "Before and after the operating model"
    - ID: "c4c00010-0000-4000-8000-0000000000e4"
      Hint: LeftTitle
      Value: "Fragmented signals"
    - ID: "c4c00010-0000-4000-8000-0000000000e5"
      Hint: LeftBody
      Value: |
        <p>Separate tools for price, inventory, logistics and news. Informal reasoning. Hard to audit.</p>
    - ID: "c4c00010-0000-4000-8000-0000000000e6"
      Hint: RightTitle
      Value: "Explainable agents"
    - ID: "c4c00010-0000-4000-8000-0000000000e7"
      Hint: RightBody
      Value: |
        <p>One governed workflow. Market view separated from trade timing. Named expert on the credential.</p>
`
  )
);

write(
  'serialized-content/capco/capco/Data/Publications.yml',
  dataFolder(DS.PubFolder, 'Publications', pub.folderTpl)
);
write(
  'serialized-content/capco/capco/Data/Publications/Journal 62.yml',
  dsItem(
    DS.Pub62,
    DS.PubFolder,
    pub.tpl,
    '/sitecore/content/capco/capco/Data/Publications/Journal 62',
    `    - ID: "c4c00010-0000-4000-8000-0000000000f3"
      Hint: Heading
      Value: "Capco Institute"
    - ID: "c4c00010-0000-4000-8000-0000000000f4"
      Hint: IssueTitle
      Value: "A new world order"
    - ID: "c4c00010-0000-4000-8000-0000000000f5"
      Hint: IssueNumber
      Value: "#62"
    - ID: "c4c00010-0000-4000-8000-0000000000f6"
      Hint: Format
      Value: "HTML"
    - ID: "c4c00010-0000-4000-8000-0000000000fa"
      Hint: HtmlHref
      Value: "/capco-institute/journal-62"
`
  )
);

write(
  'serialized-content/capco/capco/Data/Enquiry Forms.yml',
  dataFolder(DS.EnquiryFolder, 'Enquiry Forms', enquiry.folderTpl)
);
write(
  'serialized-content/capco/capco/Data/Enquiry Forms/Contact.yml',
  dsItem(
    DS.Enquiry,
    DS.EnquiryFolder,
    enquiry.tpl,
    '/sitecore/content/capco/capco/Data/Enquiry Forms/Contact',
    `    - ID: "c4c00010-0000-4000-8000-000000000113"
      Hint: Heading
      Value: "Contact us"
    - ID: "c4c00010-0000-4000-8000-000000000114"
      Hint: Intro
      Value: "Talk to a named expert. Journey context travels with the enquiry."
    - ID: "c4c00010-0000-4000-8000-000000000115"
      Hint: HubSpotFormId
      Value: capco-contact-enquiry
    - ID: "c4c00010-0000-4000-8000-000000000116"
      Hint: SubmitLabel
      Value: "Send enquiry"
    - ID: "c4c00010-0000-4000-8000-000000000117"
      Hint: SuccessMessage
      Value: "Thank you. We have recorded this enquiry for the demo."
`
  )
);

write(
  'serialized-content/capco/capco/Data/Preference Centres.yml',
  dataFolder(DS.PrefFolder, 'Preference Centres', pref.folderTpl)
);
write(
  'serialized-content/capco/capco/Data/Preference Centres/Register.yml',
  dsItem(
    DS.Pref,
    DS.PrefFolder,
    pref.tpl,
    '/sitecore/content/capco/capco/Data/Preference Centres/Register',
    `    - ID: "c4c00010-0000-4000-8000-000000000123"
      Hint: Heading
      Value: "Preference centre"
    - ID: "c4c00010-0000-4000-8000-000000000124"
      Hint: Intro
      Value: "Industry, topic and region — greenfield. Nothing to mirror on capco.com."
    - ID: "c4c00010-0000-4000-8000-000000000125"
      Hint: SubmitLabel
      Value: "Save preferences"
`
  )
);

write(
  'serialized-content/capco/capco/Data/Campaign Landings.yml',
  dataFolder(DS.CampFolder, 'Campaign Landings', campaign.folderTpl)
);
write(
  'serialized-content/capco/capco/Data/Campaign Landings/AI Infused.yml',
  dsItem(
    DS.CampAi,
    DS.CampFolder,
    campaign.tpl,
    '/sitecore/content/capco/capco/Data/Campaign Landings/AI Infused',
    `    - ID: "c4c00010-0000-4000-8000-000000000133"
      Hint: Eyebrow
      Value: "AI Infused"
    - ID: "c4c00010-0000-4000-8000-000000000134"
      Hint: Title
      Value: "Process, data and AI in how we deliver"
    - ID: "c4c00010-0000-4000-8000-000000000135"
      Hint: Intro
      Value: |
        <p>The go-to-market structure to copy for payments. Named experts stay on the credential.</p>
    - ID: "c4c00010-0000-4000-8000-000000000136"
      Hint: PrimaryCta
      Value: |
        <link text="Talk to Charlotte" linktype="internal" url="/people/charlotte-byrne" id="c4c00030-0000-4000-8000-000000000003" />
    - ID: "c4c00010-0000-4000-8000-000000000137"
      Hint: SecondaryCta
      Value: |
        <link text="Payments campaign" linktype="internal" url="/ai/payments" />
`
  )
);
write(
  'serialized-content/capco/capco/Data/Campaign Landings/Payments.yml',
  dsItem(
    DS.CampPay,
    DS.CampFolder,
    campaign.tpl,
    '/sitecore/content/capco/capco/Data/Campaign Landings/Payments',
    `    - ID: "c4c00010-0000-4000-8000-000000000133"
      Hint: Eyebrow
      Value: "AI Infused / Payments"
    - ID: "c4c00010-0000-4000-8000-000000000134"
      Hint: Title
      Value: "AI assistants as the front door"
    - ID: "c4c00010-0000-4000-8000-000000000135"
      Hint: Intro
      Value: |
        <p>Michael's campaign target. Same campaign template, payments industry.</p>
    - ID: "c4c00010-0000-4000-8000-000000000136"
      Hint: PrimaryCta
      Value: |
        <link text="Read the Perspective" linktype="internal" url="/perspectives/ai-assistants-as-the-front-door-to-fs" />
`
  )
);
write(
  'serialized-content/capco/capco/Data/Campaign Landings/Energy.yml',
  dsItem(
    DS.CampEnergy,
    DS.CampFolder,
    campaign.tpl,
    '/sitecore/content/capco/capco/Data/Campaign Landings/Energy',
    `    - ID: "c4c00010-0000-4000-8000-000000000133"
      Hint: Eyebrow
      Value: "AI Infused / Energy"
    - ID: "c4c00010-0000-4000-8000-000000000134"
      Hint: Title
      Value: "Agentic AI on the energy desk"
    - ID: "c4c00010-0000-4000-8000-000000000135"
      Hint: Intro
      Value: |
        <p>Emma's destination. The article she arrives at from the assistant.</p>
    - ID: "c4c00010-0000-4000-8000-000000000136"
      Hint: PrimaryCta
      Value: |
        <link text="Read the whitepaper" linktype="internal" url="/perspectives/agentic-ai-in-energy-trading" />
`
  )
);

const P = {
  Ai: 'c4c00030-0000-4000-8000-00000000006a',
  AiPay: 'c4c00030-0000-4000-8000-00000000006b',
  AiEnergy: 'c4c00030-0000-4000-8000-00000000006c',
  Proof: 'c4c00030-0000-4000-8000-00000000006d',
  Contact: 'c4c00030-0000-4000-8000-00000000006e',
  Prefs: 'c4c00030-0000-4000-8000-00000000006f',
  Institute: 'c4c00030-0000-4000-8000-000000000086',
  Journal: 'c4c00030-0000-4000-8000-000000000087',
  Case1: 'c4c00030-0000-4000-8000-000000000088',
  Case2: 'c4c00030-0000-4000-8000-000000000089',
  Case3: 'c4c00030-0000-4000-8000-00000000008a',
  Case4: 'c4c00030-0000-4000-8000-00000000008b',
  Heatmap: 'c4c00030-0000-4000-8000-00000000008c',
  Horizon: 'c4c00030-0000-4000-8000-00000000008d',
  Analytics: 'c4c00030-0000-4000-8000-00000000008e',
  Events: 'c4c00030-0000-4000-8000-00000000008f',
  Access: 'c4c00030-0000-4000-8000-000000000090',
  Imprint: 'c4c00030-0000-4000-8000-000000000091',
};

function ph(uid, id, ds, extra = '') {
  return { uid, id, ds, par: extra };
}

write(
  'serialized-content/capco/capco/Home/ai.yml',
  appPage({
    id: P.Ai,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/ai',
    nav: 'AI Infused',
    title: 'AI Infused',
    html: '<p>Process, data and AI in how we deliver. Campaign landing pattern — copy this for payments.</p>',
    renderings: pageXml([
      ph('C4C01000-0020-4000-8000-000000000001', R.Campaign, DS.CampAi),
      ph('C4C01000-0020-4000-8000-000000000002', R.Stat, DS.StatAi),
      ph('C4C01000-0020-4000-8000-000000000003', R.Compare, DS.CompareAi),
      ph('C4C01000-0020-4000-8000-000000000004', R.Subscribe, 'c4c00020-0000-4000-8000-000000000060'),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/ai/payments.yml',
  appPage({
    id: P.AiPay,
    parent: P.Ai,
    itemPath: '/sitecore/content/capco/capco/Home/ai/payments',
    nav: 'Payments campaign',
    title: 'AI Infused — Payments',
    html: '<p>Same campaign template. Michael’s target industry.</p>',
    renderings: pageXml([
      ph('C4C01000-0020-4000-8000-000000000011', R.Campaign, DS.CampPay),
      ph('C4C01000-0020-4000-8000-000000000012', R.Insights, 'c4c00020-0000-4000-8000-000000000051'),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/ai/energy.yml',
  appPage({
    id: P.AiEnergy,
    parent: P.Ai,
    itemPath: '/sitecore/content/capco/capco/Home/ai/energy',
    nav: 'Energy campaign',
    title: 'AI Infused — Energy',
    html: '<p>Emma’s campaign path into the energy trading whitepaper.</p>',
    renderings: pageXml([
      ph('C4C01000-0020-4000-8000-000000000021', R.Campaign, DS.CampEnergy),
      ph('C4C01000-0020-4000-8000-000000000022', R.Insights, 'c4c00020-0000-4000-8000-000000000053'),
    ]),
  })
);

write(
  'serialized-content/capco/capco/Home/about-us/expertise-in-action.yml',
  appPage({
    id: P.Proof,
    parent: ABOUT_ID,
    itemPath: '/sitecore/content/capco/capco/Home/about-us/expertise-in-action',
    nav: 'Expertise in Action',
    title: 'Expertise in Action',
    html: '<p>Case studies with industry, region and an outcome metric. Two tagged to continental Europe.</p>',
    renderings: pageXml([
      ph('C4C01000-0021-4000-8000-000000000001', R.PageHeading, null),
      ph('C4C01000-0021-4000-8000-000000000002', R.Case, DS.CaseProof),
    ]),
  })
);

const casePages = [
  {
    id: P.Case1,
    slug: 'european-tso-flexibility',
    title: 'European TSO flexibility programme',
    html: '<p>Outcome: imbalance-cost reduction on a continental TSO. Region: Europe. Expert: Elisabeth Plakinger.</p>',
  },
  {
    id: P.Case2,
    slug: 'nordic-payments-controls',
    title: 'Nordic payments control test',
    html: '<p>Outcome: real-time fraud controls live. Region: Europe. Expert: Charlotte Byrne.</p>',
  },
  {
    id: P.Case3,
    slug: 'uk-energy-trading-desk',
    title: 'UK energy trading desk',
    html: '<p>Outcome: explainable agentic workflow on the desk. Region: United Kingdom. Expert: Elisabeth Plakinger.</p>',
  },
  {
    id: P.Case4,
    slug: 'continental-grid-cyber',
    title: 'Continental grid cyber resilience',
    html: '<p>Outcome: OT monitoring before NIS2. Region: Europe. Expert: Elisabeth Plakinger.</p>',
  },
];
casePages.forEach((item, i) => {
  write(
    `serialized-content/capco/capco/Home/about-us/expertise-in-action/${item.slug}.yml`,
    appPage({
      id: item.id,
      parent: P.Proof,
      itemPath: `/sitecore/content/capco/capco/Home/about-us/expertise-in-action/${item.slug}`,
      nav: item.title,
      title: item.title,
      html: item.html,
      renderings: pageXml([
        ph(`C4C01000-0021-4000-8000-00000000001${i}`, R.PageHeading, null),
        ph(`C4C01000-0021-4000-8000-00000000002${i}`, R.Subscribe, 'c4c00020-0000-4000-8000-000000000060'),
      ]),
    })
  );
});

write(
  'serialized-content/capco/capco/Home/contact.yml',
  appPage({
    id: P.Contact,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/contact',
    nav: 'Contact',
    title: 'Contact us',
    html: '<p>Enquiry form with HubSpot form id and journey context.</p>',
    renderings: pageXml([
      ph('C4C01000-0022-4000-8000-000000000001', R.PageHeading, null),
      ph('C4C01000-0022-4000-8000-000000000002', R.Enquiry, DS.Enquiry),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/preferences.yml',
  appPage({
    id: P.Prefs,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/preferences',
    nav: 'Preferences',
    title: 'Preference centre',
    html: '<p>Register industry, topic and region preferences. Greenfield — capco.com has no front-end login.</p>',
    renderings: pageXml([
      ph('C4C01000-0022-4000-8000-000000000011', R.PageHeading, null),
      ph('C4C01000-0022-4000-8000-000000000012', R.Preference, DS.Pref),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/capco-institute.yml',
  appPage({
    id: P.Institute,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/capco-institute',
    nav: 'Capco Institute',
    title: 'Capco Institute',
    html: '<p>Journals as HTML pages — the fix if the live issue is PDF-only.</p>',
    renderings: pageXml([
      ph('C4C01000-0023-4000-8000-000000000001', R.PageHeading, null),
      ph('C4C01000-0023-4000-8000-000000000002', R.Publication, DS.Pub62),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/capco-institute/journal-62.yml',
  appPage({
    id: P.Journal,
    parent: P.Institute,
    itemPath: '/sitecore/content/capco/capco/Home/capco-institute/journal-62',
    nav: 'Journal 62',
    title: 'Journal #62 — A new world order',
    html: '<p>HTML article page for the Capco Institute journal. Format is HTML, not a PDF black box.</p><h2>A new world order</h2><p>Settlement compression, energy sovereignty and AI at the front door — the same taxonomy as Perspectives.</p>',
    renderings: pageXml([
      ph('C4C01000-0023-4000-8000-000000000011', R.PageHeading, null),
      ph('C4C01000-0023-4000-8000-000000000012', R.Publication, DS.Pub62),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/events.yml',
  appPage({
    id: P.Events,
    parent: HOME_ID,
    itemPath: '/sitecore/content/capco/capco/Home/events',
    nav: 'Events',
    title: 'Events',
    html: '<p>Related content and events sit with the UK Energy practice and Perspectives hub.</p>',
    renderings: pageXml([
      ph('C4C01000-0024-4000-8000-000000000001', R.PageHeading, null),
      ph('C4C01000-0024-4000-8000-000000000002', R.Insights, 'c4c00020-0000-4000-8000-000000000056'),
    ]),
  })
);
write(
  'serialized-content/capco/capco/Home/about-us/accessibility-statement.yml',
  appPage({
    id: P.Access,
    parent: ABOUT_ID,
    itemPath: '/sitecore/content/capco/capco/Home/about-us/accessibility-statement',
    nav: 'Accessibility Statement',
    title: 'Accessibility Statement',
    html: '<p>Last reviewed 21 September 2026. This demo site aims for keyboard access, skip links, and text alternatives on Content Hub images.</p>',
    renderings: pageXml([ph('C4C01000-0025-4000-8000-000000000001', R.PageHeading, null)]),
  })
);
write(
  'serialized-content/capco/capco/Home/about-us/imprint.yml',
  appPage({
    id: P.Imprint,
    parent: ABOUT_ID,
    itemPath: '/sitecore/content/capco/capco/Home/about-us/imprint',
    nav: 'Imprint',
    title: 'Imprint',
    html: '<p>Impressum for the German-market obligation. Capco, A Wipro Company. Named expert on this demo: Elisabeth Plakinger, London.</p>',
    renderings: pageXml([ph('C4C01000-0025-4000-8000-000000000011', R.PageHeading, null)]),
  })
);

function articlePage(id, slug, title, summary, date, kicker, extraFields, uid) {
  return `---
ID: "${id}"
Parent: "${PERSPECTIVES_ID}"
Template: "${TPL_ARTICLE}"
Path: /sitecore/content/capco/capco/Home/perspectives/${slug}
SharedFields:
- ID: "${F_WORKFLOW}"
  Hint: __Workflow
  Value: "{${WF_PAGE.toUpperCase()}}"
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "{${DESIGN.toUpperCase()}}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${pageXml([
      ph(`${uid}-000000000040`, R.ArticleDetails, null),
      ph(`${uid}-000000000041`, R.Insights, 'c4c00020-0000-4000-8000-000000000055'),
    ])}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "{${WF_APPROVED.toUpperCase()}}"
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>${summary}</p>
    - ID: "c4c00010-0000-4000-8000-000000000052"
      Hint: Summary
      Value: "${summary}"
    - ID: "c4c00010-0000-4000-8000-000000000053"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "c4c00010-0000-4000-8000-000000000054"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "c4c00010-0000-4000-8000-000000000055"
      Hint: ReadTime
      Value: "3 min read"
    - ID: "c4c00010-0000-4000-8000-000000000066"
      Hint: MediaType
      Value: "Article"
    - ID: "c4c00010-0000-4000-8000-000000000069"
      Hint: Byline
      Value: "Elisabeth Plakinger"
    - ID: "c4c00010-0000-4000-8000-00000000006a"
      Hint: Persona
      Value: "Emma"
    - ID: "c4c00010-0000-4000-8000-000000000056"
      Hint: Image
      Value: |
        <Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2bc0ec476201435f9c3c0e891b454c76" dam-id="m7iKeQThTByYrbGY8zM7tQ" alt="${title}" dam-content-type="Image" width="1600" height="1067" />
    - ID: "c4c00010-0000-4000-8000-00000000005d"
      Hint: Authors
      Value: |
        {C4C00030-0000-4000-8000-000000000002}
${extraFields}`;
}

write(
  'serialized-content/capco/capco/Home/perspectives/regulatory-heatmap.yml',
  articlePage(
    P.Heatmap,
    'regulatory-heatmap',
    'Regulatory Heatmap 2026-2028',
    'German-market translation target. Same item, de-DE version for step 11.',
    '01 Sep 2026',
    'Regulation',
    `    - ID: "c4c00010-0000-4000-8000-000000000059"
      Hint: Sectors
      Value: |
        {${TAG.energy.toUpperCase()}}
    - ID: "c4c00010-0000-4000-8000-00000000005b"
      Hint: Regions
      Value: |
        {${TAG.europe.toUpperCase()}}
    - ID: "c4c00010-0000-4000-8000-000000000057"
      Hint: Tags
      Value: |
        {${TAG.regulation.toUpperCase()}}
`,
    'C4C01000-0026-4000-8000'
  ) +
    `
- Language: de-DE
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_WF_STATE}"
      Hint: __Workflow state
      Value: "{${WF_APPROVED.toUpperCase()}}"
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "Regulatorische Heatmap 2026-2028"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "Regulatorische Heatmap 2026-2028"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Deutsche Fassung der Heatmap. Übersetzungsziel für Schritt 11. Benannte Expertin: Elisabeth Plakinger.</p>
    - ID: "c4c00010-0000-4000-8000-000000000052"
      Hint: Summary
      Value: "Deutsche Fassung — Übersetzungsziel."
    - ID: "c4c00010-0000-4000-8000-000000000053"
      Hint: Kicker
      Value: "Regulierung"
`
);

write(
  'serialized-content/capco/capco/Home/perspectives/regulatory-horizon.yml',
  articlePage(
    P.Horizon,
    'regulatory-horizon',
    'Regulatory Horizon',
    'What is coming across FS and Energy regulation — tagged once with the named expert.',
    '20 Aug 2026',
    'Regulation',
    `    - ID: "c4c00010-0000-4000-8000-000000000059"
      Hint: Sectors
      Value: |
        {${TAG.banking.toUpperCase()}}
    - ID: "c4c00010-0000-4000-8000-00000000005b"
      Hint: Regions
      Value: |
        {${TAG.europe.toUpperCase()}}
`,
    'C4C01000-0027-4000-8000'
  )
);

write(
  'serialized-content/capco/capco/Home/perspectives/future-of-analytics.yml',
  articlePage(
    P.Analytics,
    'future-of-analytics',
    'The future of analytics in the era of AI',
    'Decision infrastructure when the front door is an assistant. Data dimension for the Perspectives hub.',
    '17 Aug 2026',
    'Data',
    `    - ID: "c4c00010-0000-4000-8000-000000000059"
      Hint: Sectors
      Value: |
        {${TAG.data.toUpperCase()}}
    - ID: "c4c00010-0000-4000-8000-00000000005b"
      Hint: Regions
      Value: |
        {${TAG.uk.toUpperCase()}}
    - ID: "c4c00010-0000-4000-8000-000000000057"
      Hint: Tags
      Value: |
        {${TAG.ai.toUpperCase()}}
`,
    'C4C01000-0028-4000-8000'
  )
);

const energyPath = path.join(ROOT, 'serialized-content/capco/capco/Home/industries/energy.yml');
let energy = fs.readFileSync(energyPath, 'utf8');
if (!energy.includes('Language: de-DE')) {
  energy += `
- Language: de-DE
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "Energie"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "Energie"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Energiewende, Rohstoffhandel und Risiko — deutsche Fassung der Energy-Industry-Seite.</p>
`;
  fs.writeFileSync(energyPath, energy);
}

function patchAllowed(rel) {
  const full = path.join(ROOT, rel);
  let text = fs.readFileSync(full, 'utf8');
  const extras = [
    '{C4C00001-1111-4000-8000-000000000019}',
    '{C4C00001-1111-4000-8000-00000000001A}',
    '{C4C00001-1111-4000-8000-00000000001B}',
    '{C4C00001-1111-4000-8000-00000000001C}',
    '{C4C00001-1111-4000-8000-00000000001D}',
    '{C4C00001-1111-4000-8000-00000000001E}',
    '{C4C00001-1111-4000-8000-00000000001F}',
  ];
  extras.forEach((id) => {
    if (!text.includes(id)) {
      text = text.replace(
        '{C4C00001-1111-4000-8000-000000000018}',
        `{C4C00001-1111-4000-8000-000000000018}\n    ${id}`
      );
    }
  });
  fs.writeFileSync(full, text);
}

patchAllowed('serialized-content/placeholder-settings/capco/headless-main.yml');
patchAllowed('serialized-content/capco/capco/Presentation/Placeholder Settings/headless-main.yml');

const ar = path.join(ROOT, 'serialized-content/capco/capco/Presentation/Available Renderings/Capco.yml');
let arText = fs.readFileSync(ar, 'utf8');
['019', '01A', '01B', '01C', '01D', '01E', '01F'].forEach((n) => {
  const id = `{C4C00001-1111-4000-8000-000000000${n}}`;
  if (!arText.includes(id)) {
    arText = arText.replace(
      '{C4C00001-1111-4000-8000-000000000018}',
      `{C4C00001-1111-4000-8000-000000000018}\n    ${id}`
    );
  }
});
fs.writeFileSync(ar, arText);

console.log('story surfaces written');
