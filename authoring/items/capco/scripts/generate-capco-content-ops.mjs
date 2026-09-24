/**
 * ArticlePage / PressReleasePage and taxonomy.
 * Does not rewrite Home.yml. GUID prefix c4c0.
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

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';

const DEVICE = 'FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3';
const JSS_LAYOUT = '96E5F4BA-A2CF-4A4C-A4E7-64DA88226362';
const GRID = '7465D855-992E-4DC2-9855-A03250DFA74B';
const PARAM_HERO = '5BD96264-0B02-4605-8FFF-0079CAEB67FC';
const APP_ROUTE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';

const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
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

const ID = {
  ArticleDetails: 'c4c00001-1111-4000-8000-000000000007',
  ArticleListing: 'c4c00001-1111-4000-8000-00000000000a',
  PageHeading: 'c4c00001-1111-4000-8000-00000000000b',
  InfographicBlock: 'c4c00001-1111-4000-8000-000000000013',
  MediaEmbed: 'c4c00001-1111-4000-8000-000000000014',
  AR_Capco: 'c4c00008-8888-4000-8000-000000000001',
  Design_Default: 'c4c00005-5555-4000-8000-000000000001',
  Tpl_Article: 'c4c00010-0000-4000-8000-000000000050',
  Tpl_ArticleSec: 'c4c00010-0000-4000-8000-000000000051',
  Tpl_Press: 'c4c00010-0000-4000-8000-000000000070',
  Tpl_Tag: 'c4c00010-0000-4000-8000-000000000080',
  Tpl_TagSec: 'c4c00010-0000-4000-8000-000000000081',
  Tpl_TagLabel: 'c4c00010-0000-4000-8000-000000000082',
  DS_Taxonomy: 'c4c00020-0000-4000-8000-000000000040',
  DS_Sectors: 'c4c00020-0000-4000-8000-000000000041',
  DS_Services: 'c4c00020-0000-4000-8000-000000000042',
  DS_Regions: 'c4c00020-0000-4000-8000-000000000043',
  DS_Topics: 'c4c00020-0000-4000-8000-000000000044',
  P_About: 'c4c00030-0000-4000-8000-000000000027',
  P_TPlus1: 'c4c00030-0000-4000-8000-000000000012',
  P_AI: 'c4c00030-0000-4000-8000-000000000013',
  P_Perspectives: 'c4c00030-0000-4000-8000-000000000010',
  P_Elisabeth: 'c4c00030-0000-4000-8000-000000000002',
  P_Charlotte: 'c4c00030-0000-4000-8000-000000000003',
  P_Announce: 'c4c00030-0000-4000-8000-000000000049',
  P_Press: 'c4c00030-0000-4000-8000-000000000051',
  Wf_Page: 'c4c00040-0000-4000-8000-000000000001',
  Wf_Approved: 'c4c00040-0000-4000-8000-00000000000a',
};

const F = {
  Summary: 'c4c00010-0000-4000-8000-000000000052',
  Kicker: 'c4c00010-0000-4000-8000-000000000053',
  PublishedDate: 'c4c00010-0000-4000-8000-000000000054',
  ReadTime: 'c4c00010-0000-4000-8000-000000000055',
  Image: 'c4c00010-0000-4000-8000-000000000056',
  Tags: 'c4c00010-0000-4000-8000-000000000057',
  Categories: 'c4c00010-0000-4000-8000-000000000058',
  Sectors: 'c4c00010-0000-4000-8000-000000000059',
  Services: 'c4c00010-0000-4000-8000-00000000005a',
  Regions: 'c4c00010-0000-4000-8000-00000000005b',
  Related: 'c4c00010-0000-4000-8000-00000000005c',
  Authors: 'c4c00010-0000-4000-8000-00000000005d',
  VideoUrl: 'c4c00010-0000-4000-8000-00000000005e',
  PodcastUrl: 'c4c00010-0000-4000-8000-00000000005f',
  Infographic: 'c4c00010-0000-4000-8000-000000000060',
  AeoNotes: 'c4c00010-0000-4000-8000-000000000061',
  SeoTitle: 'c4c00010-0000-4000-8000-000000000062',
  SuggestedTags: 'c4c00010-0000-4000-8000-000000000063',
  Transcript: 'c4c00010-0000-4000-8000-000000000064',
  HubSpotFormId: 'c4c00010-0000-4000-8000-000000000065',
  MediaType: 'c4c00010-0000-4000-8000-000000000066',
};

const TAG = {
  banking: 'c4c00025-0000-4000-8000-000000000001',
  capital: 'c4c00025-0000-4000-8000-000000000002',
  insurance: 'c4c00025-0000-4000-8000-000000000003',
  wealth: 'c4c00025-0000-4000-8000-000000000004',
  energy: 'c4c00025-0000-4000-8000-000000000005',
  tplus1: 'c4c00025-0000-4000-8000-000000000011',
  ai: 'c4c00025-0000-4000-8000-000000000012',
  payments: 'c4c00025-0000-4000-8000-000000000013',
  trading: 'c4c00025-0000-4000-8000-000000000014',
  data: 'c4c00025-0000-4000-8000-000000000015',
  uk: 'c4c00025-0000-4000-8000-000000000021',
  europe: 'c4c00025-0000-4000-8000-000000000022',
  americas: 'c4c00025-0000-4000-8000-000000000023',
  apac: 'c4c00025-0000-4000-8000-000000000024',
  regulation: 'c4c00025-0000-4000-8000-000000000031',
  transformation: 'c4c00025-0000-4000-8000-000000000032',
  risk: 'c4c00025-0000-4000-8000-000000000033',
  cyber: 'c4c00025-0000-4000-8000-000000000016',
  commodity: 'c4c00025-0000-4000-8000-000000000017',
  onboarding: 'c4c00025-0000-4000-8000-000000000018',
  climateRisk: 'c4c00025-0000-4000-8000-000000000019',
  surveillance: 'c4c00025-0000-4000-8000-00000000001a',
  germany: 'c4c00025-0000-4000-8000-000000000025',
  canada: 'c4c00025-0000-4000-8000-000000000026',
  nordics: 'c4c00025-0000-4000-8000-000000000027',
  me: 'c4c00025-0000-4000-8000-000000000028',
  energyTrading: 'c4c00025-0000-4000-8000-000000000034',
  agentic: 'c4c00025-0000-4000-8000-000000000035',
  fraud: 'c4c00025-0000-4000-8000-000000000036',
  analytics: 'c4c00025-0000-4000-8000-000000000037',
  climate: 'c4c00025-0000-4000-8000-000000000038',
  settlement: 'c4c00025-0000-4000-8000-000000000039',
  cyberTopic: 'c4c00025-0000-4000-8000-00000000003a',
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
      Value: 20260921T120000Z
`;
}

function jsonRendering(id, name) {
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

function renderingXml(rows) {
  const kids = rows
    .map((row, i) => {
      const before = i === 0 ? '\n          p:before="*"' : '';
      return `        <r
          uid="${u(row.uid)}"${before}
          s:id="${u(row.id)}"
          s:par="GridParameters=%7B${GRID}%7D&amp;DynamicPlaceholderId=${i + 1}"
          s:ph="${row.ph}" />`;
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

function pageYaml({ id, parent, itemPath, title, nav, templateId = HOME_TEMPLATE, renderings = [], extraVersion = '' }) {
  const layout = renderings.length
    ? `- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    ${renderingXml(renderings)}
`
    : '';
  const onPageWorkflow = templateId === ID.Tpl_Article || templateId === ID.Tpl_Press;
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

function folderYaml(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FOLDER}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function tagYaml(id, parent, itemPath, label) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${ID.Tpl_Tag}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.Tpl_TagLabel}"
      Hint: Label
      Value: "${label}"
`;
}

write(
  'serialized-content/templates/capco/ArticlePage.yml',
  templateItem(ID.Tpl_Article, TEMPL_FOLDER, '/sitecore/templates/Project/capco/ArticlePage', {
    icon: 'Office/32x32/document_text.png',
    bases: `${u(APP_ROUTE)}`,
    sort: 500,
  })
);
write(
  'serialized-content/templates/capco/ArticlePage/Article.yml',
  sectionItem(ID.Tpl_ArticleSec, ID.Tpl_Article, '/sitecore/templates/Project/capco/ArticlePage/Article')
);

const articleFields = [
  [F.Summary, 'Summary', 'Multi-Line Text', 100, ''],
  [F.Kicker, 'Kicker', 'Single-Line Text', 110, ''],
  [F.PublishedDate, 'PublishedDate', 'Single-Line Text', 120, ''],
  [F.ReadTime, 'ReadTime', 'Single-Line Text', 130, ''],
  [F.MediaType, 'MediaType', 'Single-Line Text', 140, ''],
  [F.Image, 'Image', 'Image', 200, ''],
  [F.Infographic, 'Infographic', 'Image', 210, ''],
  [F.VideoUrl, 'VideoUrl', 'General Link', 220, ''],
  [F.PodcastUrl, 'PodcastUrl', 'General Link', 230, ''],
  [F.Transcript, 'Transcript', 'Rich Text', 240, ''],
  [F.Tags, 'Tags', 'Treelist', 300, '/sitecore/content/capco/capco/Data/Taxonomy/Topics'],
  [F.Categories, 'Categories', 'Treelist', 310, '/sitecore/content/capco/capco/Data/Taxonomy/Topics'],
  [F.Sectors, 'Sectors', 'Treelist', 320, '/sitecore/content/capco/capco/Data/Taxonomy/Sectors'],
  [F.Services, 'Services', 'Treelist', 330, '/sitecore/content/capco/capco/Data/Taxonomy/Services'],
  [F.Regions, 'Regions', 'Treelist', 340, '/sitecore/content/capco/capco/Data/Taxonomy/Regions'],
  [F.Related, 'RelatedContent', 'Treelist', 350, '/sitecore/content/capco/capco/Home/perspectives'],
  [F.Authors, 'Authors', 'Treelist', 360, '/sitecore/content/capco/capco/Home/people'],
  [F.SuggestedTags, 'SuggestedTags', 'Multi-Line Text', 400, ''],
  [F.AeoNotes, 'AeoNotes', 'Multi-Line Text', 410, ''],
  [F.SeoTitle, 'SeoTitle', 'Single-Line Text', 420, ''],
  [F.HubSpotFormId, 'HubSpotFormId', 'Single-Line Text', 430, ''],
];
for (const [fid, name, type, sort, source] of articleFields) {
  write(
    `serialized-content/templates/capco/ArticlePage/Article/${name}.yml`,
    fieldItem(
      fid,
      ID.Tpl_ArticleSec,
      `/sitecore/templates/Project/capco/ArticlePage/Article/${name}`,
      type,
      sort,
      name,
      source
    )
  );
}

write(
  'serialized-content/templates/capco/PressReleasePage.yml',
  templateItem(ID.Tpl_Press, TEMPL_FOLDER, '/sitecore/templates/Project/capco/PressReleasePage', {
    icon: 'Office/32x32/newspaper.png',
    bases: `${u(ID.Tpl_Article)}`,
    sort: 510,
  })
);
write(
  'serialized-content/templates/capco/TaxonomyTag.yml',
  templateItem(ID.Tpl_Tag, TEMPL_FOLDER, '/sitecore/templates/Project/capco/TaxonomyTag', {
    icon: 'Office/32x32/tag.png',
    sort: 600,
  })
);
write(
  'serialized-content/templates/capco/TaxonomyTag/Data.yml',
  sectionItem(ID.Tpl_TagSec, ID.Tpl_Tag, '/sitecore/templates/Project/capco/TaxonomyTag/Data')
);
write(
  'serialized-content/templates/capco/TaxonomyTag/Data/Label.yml',
  fieldItem(ID.Tpl_TagLabel, ID.Tpl_TagSec, '/sitecore/templates/Project/capco/TaxonomyTag/Data/Label', 'Single-Line Text', 100, 'Label')
);

const extraRenderings = [
  ['InfographicBlock', ID.InfographicBlock],
  ['MediaEmbed', ID.MediaEmbed],
];
for (const [name, rid] of extraRenderings) {
  write(`serialized-content/renderings/capco/${name}.yml`, jsonRendering(rid, name));
}

write('serialized-content/capco/capco/Data/Taxonomy.yml', folderYaml(ID.DS_Taxonomy, DATA_ID, '/sitecore/content/capco/capco/Data/Taxonomy'));
write('serialized-content/capco/capco/Data/Taxonomy/Sectors.yml', folderYaml(ID.DS_Sectors, ID.DS_Taxonomy, '/sitecore/content/capco/capco/Data/Taxonomy/Sectors'));
write('serialized-content/capco/capco/Data/Taxonomy/Services.yml', folderYaml(ID.DS_Services, ID.DS_Taxonomy, '/sitecore/content/capco/capco/Data/Taxonomy/Services'));
write('serialized-content/capco/capco/Data/Taxonomy/Regions.yml', folderYaml(ID.DS_Regions, ID.DS_Taxonomy, '/sitecore/content/capco/capco/Data/Taxonomy/Regions'));
write('serialized-content/capco/capco/Data/Taxonomy/Topics.yml', folderYaml(ID.DS_Topics, ID.DS_Taxonomy, '/sitecore/content/capco/capco/Data/Taxonomy/Topics'));

const tags = [
  [TAG.banking, ID.DS_Sectors, 'Sectors/banking-and-payments', 'Banking and Payments'],
  [TAG.capital, ID.DS_Sectors, 'Sectors/capital-markets', 'Capital Markets'],
  [TAG.insurance, ID.DS_Sectors, 'Sectors/insurance', 'Insurance'],
  [TAG.wealth, ID.DS_Sectors, 'Sectors/wealth-and-asset-management', 'Wealth and Asset Management'],
  [TAG.energy, ID.DS_Sectors, 'Sectors/energy', 'Energy'],
  [TAG.tplus1, ID.DS_Services, 'Services/t-plus-1', 'T+1 settlement'],
  [TAG.ai, ID.DS_Services, 'Services/ai', 'AI and data'],
  [TAG.payments, ID.DS_Services, 'Services/payments', 'Payments'],
  [TAG.trading, ID.DS_Services, 'Services/trading', 'Trading and risk'],
  [TAG.data, ID.DS_Services, 'Services/data', 'Data platforms'],
  [TAG.uk, ID.DS_Regions, 'Regions/united-kingdom', 'United Kingdom'],
  [TAG.europe, ID.DS_Regions, 'Regions/europe', 'Europe'],
  [TAG.americas, ID.DS_Regions, 'Regions/americas', 'Americas'],
  [TAG.apac, ID.DS_Regions, 'Regions/asia-pacific', 'Asia Pacific'],
  [TAG.regulation, ID.DS_Topics, 'Topics/regulation', 'Regulation'],
  [TAG.transformation, ID.DS_Topics, 'Topics/transformation', 'Transformation'],
  [TAG.risk, ID.DS_Topics, 'Topics/risk', 'Risk'],
  [TAG.cyber, ID.DS_Services, 'Services/cyber-resilience', 'Cyber resilience'],
  [TAG.commodity, ID.DS_Services, 'Services/commodity-trading', 'Commodity trading'],
  [TAG.onboarding, ID.DS_Services, 'Services/onboarding', 'Onboarding'],
  [TAG.climateRisk, ID.DS_Services, 'Services/climate-risk', 'Climate risk'],
  [TAG.surveillance, ID.DS_Services, 'Services/surveillance', 'Surveillance'],
  [TAG.germany, ID.DS_Regions, 'Regions/germany', 'Germany'],
  [TAG.canada, ID.DS_Regions, 'Regions/canada', 'Canada'],
  [TAG.nordics, ID.DS_Regions, 'Regions/nordics', 'Nordics'],
  [TAG.me, ID.DS_Regions, 'Regions/middle-east', 'Middle East'],
  [TAG.energyTrading, ID.DS_Topics, 'Topics/energy-trading', 'Energy trading'],
  [TAG.agentic, ID.DS_Topics, 'Topics/agentic-ai', 'Agentic AI'],
  [TAG.fraud, ID.DS_Topics, 'Topics/fraud', 'Fraud controls'],
  [TAG.analytics, ID.DS_Topics, 'Topics/analytics', 'Analytics'],
  [TAG.climate, ID.DS_Topics, 'Topics/climate', 'Climate'],
  [TAG.settlement, ID.DS_Topics, 'Topics/settlement', 'Settlement'],
  [TAG.cyberTopic, ID.DS_Topics, 'Topics/cyber', 'Cyber'],
];
for (const [id, parent, rel, label] of tags) {
  write(`serialized-content/capco/capco/Data/Taxonomy/${rel}.yml`, tagYaml(id, parent, `/sitecore/content/capco/capco/Data/Taxonomy/${rel}`, label));
}

function articleExtras({ summary, kicker, date, read, media, sectors, services, regions, topics, authors, related, suggested, aeo, seo, video, podcast }) {
  const treelist = (ids) => ids.map((id) => u(id)).join('\n        ');
  const videoField = video
    ? `    - ID: "${F.VideoUrl}"
      Hint: VideoUrl
      Value: |
        <link text="Watch" linktype="external" url="${video}" target="_blank" />
`
    : '';
  const podcastField = podcast
    ? `    - ID: "${F.PodcastUrl}"
      Hint: PodcastUrl
      Value: |
        <link text="Listen" linktype="external" url="${podcast}" target="_blank" />
`
    : '';
  return `    - ID: "${F.Summary}"
      Hint: Summary
      Value: "${summary}"
    - ID: "${F.Kicker}"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "${F.PublishedDate}"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "${F.ReadTime}"
      Hint: ReadTime
      Value: "${read}"
    - ID: "${F.MediaType}"
      Hint: MediaType
      Value: "${media}"
    - ID: "${F.Sectors}"
      Hint: Sectors
      Value: |
        ${treelist(sectors)}
    - ID: "${F.Services}"
      Hint: Services
      Value: |
        ${treelist(services)}
    - ID: "${F.Regions}"
      Hint: Regions
      Value: |
        ${treelist(regions)}
    - ID: "${F.Tags}"
      Hint: Tags
      Value: |
        ${treelist(topics)}
    - ID: "${F.Categories}"
      Hint: Categories
      Value: |
        ${treelist(topics)}
    - ID: "${F.Authors}"
      Hint: Authors
      Value: |
        ${treelist(authors)}
    - ID: "${F.Related}"
      Hint: RelatedContent
      Value: |
        ${treelist(related)}
    - ID: "${F.SuggestedTags}"
      Hint: SuggestedTags
      Value: "${suggested}"
    - ID: "${F.AeoNotes}"
      Hint: AeoNotes
      Value: "${aeo}"
    - ID: "${F.SeoTitle}"
      Hint: SeoTitle
      Value: "${seo}"
${videoField}${podcastField}    - ID: "${F.HubSpotFormId}"
      Hint: HubSpotFormId
      Value: capco-perspective-nurture
`;
}

const tplusBody = `<p>Europe’s move to T+1 settlement is no longer a calendar event. Markets must prove operational readiness — matching, allocation, funding and exception handling — before the go-live date, not after the first failed settlement.</p>
<p>Elisabeth Plakinger sets out where firms still under-estimate the work: cross-border inventory, agent banks, and the data that has to be right the first time. This Perspective is the AEO surface Priya finds after a ChatGPT prompt — then the named consultant.</p>
<h3>Readiness is evidence, not a programme slide</h3>
<p>Boards want a date. Operations need a control environment. Capco’s work with capital markets organisations is to connect those two — vision to value — so T+1 is a proven operating model, not a weekend cutover.</p>`;

write(
  'serialized-content/capco/capco/Home/perspectives/europes-t-plus-1-market-must-prove-readiness.yml',
  pageYaml({
    id: ID.P_TPlus1,
    parent: ID.P_Perspectives,
    itemPath: '/sitecore/content/capco/capco/Home/perspectives/europes-t-plus-1-market-must-prove-readiness',
    title: "Europe's T+1 market must prove readiness",
    nav: "Europe's T+1 market must prove readiness",
    templateId: ID.Tpl_Article,
    renderings: [
      { id: ID.ArticleDetails, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000003' },
      { id: ID.InfographicBlock, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000014' },
      { id: ID.MediaEmbed, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000013' },
    ],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${tplusBody.split('\n').join('\n        ')}
${articleExtras({
  summary: 'Europe must prove T+1 operational readiness — matching, funding and exceptions — before go-live. Named expert: Elisabeth Plakinger.',
  kicker: 'PERSPECTIVE',
  date: '15 Sep 2026',
  read: '5 min read',
  media: 'Article',
  sectors: [TAG.capital],
  services: [TAG.tplus1, TAG.data],
  regions: [TAG.europe, TAG.uk],
  topics: [TAG.regulation, TAG.transformation],
  authors: [ID.P_Elisabeth],
  related: [ID.P_AI],
  suggested: 'T+1, settlement, capital markets, Europe, post-trade',
  aeo: 'Cited for “Europe T+1 readiness”. Passages are short, named expert, FAQ-ready. Competitor gap vs generic consulting homepages.',
  seo: 'Europe T+1 settlement readiness | Capco',
  video: '',
  podcast: '',
})}`,
  })
);

const aiBody = `<p>AI assistants are becoming the first conversation a client has with a bank — not a chatbot overlay, but the operating model for discovery, service and advice.</p>
<p>Charlotte Byrne writes on how financial services firms turn that front door into something auditable: human handover, entitlements, and the same taxonomy that powers Perspectives and consultant profiles.</p>
<h3>The conversion asset is still a named expert</h3>
<p>When the assistant cannot close the problem, the next click should be a person — not a generic industry landing page. That is The Expert Advantage.</p>`;

write(
  'serialized-content/capco/capco/Home/perspectives/ai-assistants-as-the-front-door-to-fs.yml',
  pageYaml({
    id: ID.P_AI,
    parent: ID.P_Perspectives,
    itemPath: '/sitecore/content/capco/capco/Home/perspectives/ai-assistants-as-the-front-door-to-fs',
    title: 'AI assistants: the new front door to financial services',
    nav: 'AI assistants: the new front door to financial services',
    templateId: ID.Tpl_Article,
    renderings: [{ id: ID.ArticleDetails, ph: 'headless-main', uid: 'c4c01000-0004-4000-8000-000000000004' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${aiBody.split('\n').join('\n        ')}
${articleExtras({
  summary: 'AI assistants become the first conversation with a bank. Charlotte Byrne on auditability, handover, and linking that journey to a named Capco expert.',
  kicker: 'PERSPECTIVE',
  date: '17 Aug 2026',
  read: '5 min read',
  media: 'Article',
  sectors: [TAG.banking],
  services: [TAG.ai, TAG.payments],
  regions: [TAG.uk, TAG.americas],
  topics: [TAG.transformation],
  authors: [ID.P_Charlotte],
  related: [ID.P_TPlus1],
  suggested: 'AI assistants, banking, digital, auditability',
  aeo: 'Answers “AI front door to financial services”. Named author. Structured summary for crawlers.',
  seo: 'AI assistants in financial services | Capco',
  video: '',
  podcast: '',
})}`,
  })
);

write(
  'serialized-content/capco/capco/Home/about-us/announcements.yml',
  pageYaml({
    id: ID.P_Announce,
    parent: ID.P_About,
    itemPath: '/sitecore/content/capco/capco/Home/about-us/announcements',
    title: 'Newsroom',
    nav: 'Newsroom',
    renderings: [
      { id: ID.PageHeading, ph: 'headless-main', uid: 'c4c01000-0009-4000-8000-000000000001' },
      { id: ID.ArticleListing, ph: 'headless-main', uid: 'c4c01000-0009-4000-8000-000000000002' },
    ],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Newsroom and media — the same taxonomy as Perspectives, so a press item can related-link to a named consultant and an industry page.</p>
`,
  })
);

write(
  'serialized-content/capco/capco/Home/about-us/announcements/capco-t-plus-1-europe-readiness.yml',
  pageYaml({
    id: ID.P_Press,
    parent: ID.P_Announce,
    itemPath: '/sitecore/content/capco/capco/Home/about-us/announcements/capco-t-plus-1-europe-readiness',
    title: 'Capco: Europe’s T+1 market must prove readiness',
    nav: 'Capco: Europe’s T+1 market must prove readiness',
    templateId: ID.Tpl_Press,
    renderings: [{ id: ID.ArticleDetails, ph: 'headless-main', uid: 'c4c01000-0009-4000-8000-000000000003' }],
    extraVersion: `    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Capco publishes a Perspective on Europe T+1 settlement readiness, authored by Elisabeth Plakinger. Tagged once against Capital Markets, T+1 and Europe — the same terms as the consultant profile and industry page.</p>
${articleExtras({
  summary: 'Press: Capco publishes Europe T+1 readiness Perspective by Elisabeth Plakinger.',
  kicker: 'NEWSROOM',
  date: '15 Sep 2026',
  read: '1 min read',
  media: 'Press',
  sectors: [TAG.capital],
  services: [TAG.tplus1],
  regions: [TAG.europe],
  topics: [TAG.regulation],
  authors: [ID.P_Elisabeth],
  related: [ID.P_TPlus1],
  suggested: 'T+1, press, Europe',
  aeo: 'Newsroom item shares taxonomy with the long-form Perspective.',
  seo: 'Capco T+1 Europe readiness | Newsroom',
  video: '',
  podcast: '',
})}`,
  })
);

const extraRend = [ID.InfographicBlock, ID.MediaEmbed].map((id) => `    ${u(id)}`).join('\n');

const arPath = path.join(ROOT, 'serialized-content/capco/capco/Presentation/Available Renderings/Capco.yml');
let ar = fs.readFileSync(arPath, 'utf8');
if (!ar.includes(ID.InfographicBlock.toUpperCase())) {
  ar = ar.replace(
    '{C4C00001-1111-4000-8000-00000000000C}\n',
    `{C4C00001-1111-4000-8000-00000000000C}\n${extraRend}\n`
  );
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

console.log('Capco ArticlePage / taxonomy YAML generated.');
