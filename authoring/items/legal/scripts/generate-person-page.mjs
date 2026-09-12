/**
 * Person page template fields, datasources, renderings, partial + page design.
 * GUID prefix a1e90012 (templates) / a1e90022 (data).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const TEMPL_FOLDER = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const DATA_ROOT = '79e5fd59-d991-4dc2-a0c9-b9a779f5228a';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const PARTIALS = 'e7fd47b0-09de-4296-b039-5a69ce05d920';
const PAGE_DESIGNS = 'fe579fa8-54d5-445c-a167-522bb06d67f0';
const PERSON_PAGE = 'a1e90010-0000-4000-8000-000000000030';
const PERSON_SECTION = 'a1e90010-0000-4000-8000-000000000031';
const DAWN = 'a1e90030-0000-4000-8000-000000000002';
const DESIREE = 'a1e90030-0000-4000-8000-000000000008';
const DINESH = 'a1e90030-0000-4000-8000-000000000009';
const BARKER = 'a1e90030-0000-4000-8000-00000000000a';
const DOOGAN = 'a1e90030-0000-4000-8000-00000000000b';
const PEOPLE = 'a1e90030-0000-4000-8000-000000000001';
const OUTLAW = 'a1e90030-0000-4000-8000-000000000010';
const NEWS = 'a1e90030-0000-4000-8000-000000000050';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_TPL_FOLDER = '0437fee2-44c9-46a6-abe9-28858d9fee8c';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_PARTIAL = 'fd2059fd-6043-4dfe-8c04-e2437ce87634';
const T_PAGE_DESIGN = '1105b8f8-1e00-426b-bf1f-c840742d827b';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const NEWSLETTER_DS = 'a1e90020-0000-4000-8000-000000000033';
const PROMO = 'A1E90001-1111-4000-8000-000000000004';
const NEWSLETTER_VAR = 'A1E90008-8888-4000-8000-000000000011';
const PERSON_DESIGN = '{A1E90005-5555-4000-8000-000000000002}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_BASE_TPL = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_SIGNATURE = '55faae90-3bba-4f7f-96fe-13c3f40055ff';
const F_PARTIALS = '0966b999-0d0e-4278-acc9-9da69d461fe6';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_TEMPLATES_MAP = 'ba1f60d6-3deb-40cc-bb61-eec772279ee1';
const BASE_STD = '{1930BBEB-7805-471A-A3BE-4858AC7CF696}';
const BASE_DS = '{44A022DB-56D3-419A-B43B-E27E4D8E9C41}';

const ID = {
  TplFolder: 'a1e90012-0000-4000-8000-000000000001',
  ExpItem: 'a1e90012-0000-4000-8000-000000000010',
  ExpData: 'a1e90012-0000-4000-8000-000000000011',
  ExpTitle: 'a1e90012-0000-4000-8000-000000000012',
  ExpYear: 'a1e90012-0000-4000-8000-000000000013',
  ExpRegion: 'a1e90012-0000-4000-8000-000000000014',
  ExpSector: 'a1e90012-0000-4000-8000-000000000015',
  ExpService: 'a1e90012-0000-4000-8000-000000000016',
  ExpValue: 'a1e90012-0000-4000-8000-000000000017',
  CredItem: 'a1e90012-0000-4000-8000-000000000020',
  CredData: 'a1e90012-0000-4000-8000-000000000021',
  CredYear: 'a1e90012-0000-4000-8000-000000000022',
  CredDetail: 'a1e90012-0000-4000-8000-000000000023',
  InsItem: 'a1e90012-0000-4000-8000-000000000030',
  InsData: 'a1e90012-0000-4000-8000-000000000031',
  InsKicker: 'a1e90012-0000-4000-8000-000000000032',
  InsTitle: 'a1e90012-0000-4000-8000-000000000033',
  InsDate: 'a1e90012-0000-4000-8000-000000000034',
  InsSummary: 'a1e90012-0000-4000-8000-000000000035',
  InsLink: 'a1e90012-0000-4000-8000-000000000036',
  FExperience: 'a1e90010-0000-4000-8000-00000000003b',
  FCredentials: 'a1e90010-0000-4000-8000-00000000003c',
  FInsights: 'a1e90010-0000-4000-8000-00000000003d',
  FRelated: 'a1e90010-0000-4000-8000-00000000003e',
  StdValues: 'a1e90010-0000-4000-8000-00000000003f',
  RBreadcrumb: 'a1e90001-1111-4000-8000-000000000012',
  RQuote: 'a1e90001-1111-4000-8000-000000000013',
  RExperience: 'a1e90001-1111-4000-8000-000000000014',
  RInsights: 'a1e90001-1111-4000-8000-000000000015',
  RRelated: 'a1e90001-1111-4000-8000-000000000016',
  PartialPerson: 'a1e90004-4444-4000-8000-000000000003',
  PageDesignPerson: 'a1e90005-5555-4000-8000-000000000002',
  DataPeople: 'a1e90022-0000-4000-8000-000000000001',
  DataDawn: 'a1e90022-0000-4000-8000-000000000010',
  DataExpFolder: 'a1e90022-0000-4000-8000-000000000011',
  DataCredFolder: 'a1e90022-0000-4000-8000-000000000020',
  DataInsFolder: 'a1e90022-0000-4000-8000-000000000030',
};

const EXPERIENCE = [
  {
    id: 'a1e90022-0000-4000-8000-000000000012',
    name: 'interpath-property',
    title:
      'Advised Interpath Limited following their appointment over three complex property development and construction companies with advice covering planning, health and safety the sale of numerous residential developments.',
    year: '2026',
    region: 'United Kingdom',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000013',
    name: 'aim-law-firm',
    title:
      'Advised a board of directors of a distressed AIM listed law firm on the regulatory aspects of their declining business, while also acting for the proposed administrators to explore sale or other insolvent solutions for the entire legal practice.',
    year: '2026',
    region: 'United Kingdom',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000014',
    name: 'keys-mable',
    title:
      'Acting for Keys Group in relation to their acquisition of the business and assets of Mable Therapy Limited, a provider of speech and adult language therapies. A fast-paced pre-pack administration was required to complete before further loss of the operational business.',
    year: '2025',
    region: 'United Kingdom',
    sector: 'Technology, Science & Industry',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000015',
    name: 'bank-realisations',
    title:
      "Advising a bank on the recovery of realisations from its customer's liquidators where the liquidator had sold the customers property and challenged the categorisation of the Bank's security.",
    year: '2025',
    region: 'United Kingdom',
    sector: 'Financial Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000016',
    name: 'frp-dickie',
    title:
      "Acting for FRP Advisory as administrators of R.E. Dickie Limited in relation to the pre-pack sale of the assets of the Company to three individuals in the local community, which included the company's factory premises and plant and machinery.",
    year: '2025',
    region: 'United Kingdom',
    sector: 'Financial Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000017',
    name: 'golf-club',
    title:
      'Acting for an investment fund on its acquisition of a UK golf club by way of a pre-pack administration purchase from its administrators and successfully securing the future of an established golf club and saving the jobs of all employees.',
    year: '2025',
    region: 'United Kingdom',
    sector: 'Sport & Hospitality',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000018',
    name: 'protocol-national',
    title:
      "Acting for Grant Thornton as administrators of Protocol National on its sale to AWS Education, funded by Twenty20 Capital. The sale secured the future operations of the business, retaining employment for over 60 employees.",
    year: '2025',
    region: 'United Kingdom',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
    value: '£1.2m',
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000019',
    name: 'agricultural-bank',
    title:
      'Advising a specialist agricultural bank, with its proposed refinancing of a farm under a specific agricultural funding scheme, and advising as to its wider contractual relationship with its distributors and growers.',
    year: '2025',
    region: 'United Kingdom',
    sector: 'Financial Services',
    service: 'Finance',
  },
  {
    id: 'a1e90022-0000-4000-8000-00000000001a',
    name: 'ridgewall',
    title:
      'Advising Ernst & Young as proposed administrators of the Ridgewall Group, a cyber security and IT services provider assisting with the pre-pack sale of 5 companies.',
    year: '2025',
    region: 'United Kingdom',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-00000000001b',
    name: 'thorite',
    title:
      'Advised Interpath Limited as administrators of Thomas Wright/Thorite Group Limited, a leading UK provider of pneumatics, compressed air, vacuum and fluid-handling products and systems, on a pre-pack administration sale to Fluidpower Group UK Limited, saving the jobs of all 105 employees.',
    year: '2025',
    region: 'United Kingdom',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
  },
  {
    id: 'a1e90022-0000-4000-8000-00000000001c',
    name: 'essential-supplier',
    title:
      'Essential supplier obligations — technology supplier during customer administration (confidentiality cleared).',
    year: '2024',
    region: 'United Kingdom',
    sector: 'Technology, Science & Industry',
    service: 'Restructuring',
  },
];

const CREDENTIALS = [
  { id: 'a1e90022-0000-4000-8000-000000000021', name: 'barclays', year: '2006', detail: 'Barclays Bank plc, Legal Secondee' },
  { id: 'a1e90022-0000-4000-8000-000000000022', name: 'qualified', year: '2002', detail: 'Qualified - England and Wales' },
  { id: 'a1e90022-0000-4000-8000-000000000023', name: 'lpc', year: '1999', detail: 'Leeds Metropolitan University - Legal Practice Course' },
  { id: 'a1e90022-0000-4000-8000-000000000024', name: 'joined', year: '1999', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000025', name: 'cpe', year: '1998', detail: 'Leeds Metropolitan University - CPE' },
  { id: 'a1e90022-0000-4000-8000-000000000026', name: 'bradford', year: '1997', detail: 'Bradford University - BA (Hons) Business with Law' },
];

const INSIGHTS = [
  {
    id: 'a1e90022-0000-4000-8000-000000000033',
    name: 'holiday-pay-part-year',
    kicker: 'OUT-LAW NEWS',
    title: 'UK government plans to revamp holiday pay calculation for part-year workers',
    date: '19 January 2023',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000034',
    name: 'pensions-disputes',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'Pensions disputes: managing member expectations paramount',
    date: '23 February 2021',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000035',
    name: 'subsidy-control',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'UK subsidy control post-Brexit: access to effective judicial remedies',
    date: '1 February 2021',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000036',
    name: 'steps-of-court',
    kicker: 'OUT-LAW NEWS',
    title: "'Steps of court' settlement was not negligent, court rules",
    date: '8 February 2016',
    href: '/out-law/news',
    pageId: NEWS,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000032',
    name: 'tax-avoidance',
    kicker: 'OUT-LAW NEWS',
    title: "'Vast majority' of companies not seeking to avoid tax",
    date: '27 August 2020',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000031',
    name: 'industrial-decarbonisation',
    kicker: 'OUT-LAW NEWS',
    title: "'World first' industrial decarbonisation strategy developed in the UK",
    date: '19 March 2021',
    href: '/out-law',
    pageId: OUTLAW,
  },
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T120000Z
`;
}

function fieldYaml(id, parent, itemPath, type, sort, title, source) {
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
  - ID: "${F_TITLE}"
    Hint: Title
    Value: ${title}
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function templateYaml(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_TEMPLATE}"
Path: "${itemPath}"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_star.png
- ID: "${F_BASE_TPL}"
  Hint: __Base template
  Value: |
    ${BASE_STD}
    ${BASE_DS}
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

function sectionYaml(id, parent, itemPath) {
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

function folderYaml(id, parent, itemPath) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_DATA_FOLDER}"
Path: ${itemPath}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingYaml(id, name, componentName) {
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
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function internalLink(text, url, id) {
  return `<link text="${text.replace(/"/g, '&quot;')}" linktype="internal" url="${url}" anchor="" target="" title="" class="" id="${id}" />`;
}

function pipeIds(rows) {
  return rows.map((row) => `{${row.id.toUpperCase()}}`).join('|');
}

function layoutXml(rows) {
  return rows
    .map((row, i) => {
      const before = i === 0 ? '\n          p:before="*"' : '';
      const ds = row.ds ? `\n          s:ds="${row.ds}"` : '';
      const extra = row.extra ? row.extra : '';
      return `        <r
          uid="{${row.uid}}"${before}${ds}
          s:id="{${row.id}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D${extra}&amp;DynamicPlaceholderId=${i + 1}"
          s:ph="headless-main" />`;
    })
    .join('\n');
}

const TPL = 'serialized-content/person-templates/Person Templates';

write(
  `${TPL}.yml`,
  `---
ID: "${ID.TplFolder}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TPL_FOLDER}"
Path: "/sitecore/templates/Project/legal/Person Templates"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(`${TPL}/ExperienceItem.yml`, templateYaml(ID.ExpItem, ID.TplFolder, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem'));
write(`${TPL}/ExperienceItem/Data.yml`, sectionYaml(ID.ExpData, ID.ExpItem, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data'));
write(`${TPL}/ExperienceItem/Data/Title.yml`, fieldYaml(ID.ExpTitle, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Title', 'Multi-Line Text', 100, 'Title'));
write(`${TPL}/ExperienceItem/Data/Year.yml`, fieldYaml(ID.ExpYear, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Year', 'Single-Line Text', 110, 'Year'));
write(`${TPL}/ExperienceItem/Data/Region.yml`, fieldYaml(ID.ExpRegion, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Region', 'Single-Line Text', 120, 'Region'));
write(`${TPL}/ExperienceItem/Data/Sector.yml`, fieldYaml(ID.ExpSector, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Sector', 'Single-Line Text', 130, 'Sector'));
write(`${TPL}/ExperienceItem/Data/Service.yml`, fieldYaml(ID.ExpService, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Service', 'Single-Line Text', 140, 'Service'));
write(`${TPL}/ExperienceItem/Data/Value.yml`, fieldYaml(ID.ExpValue, ID.ExpData, '/sitecore/templates/Project/legal/Person Templates/ExperienceItem/Data/Value', 'Single-Line Text', 150, 'Value'));

write(`${TPL}/CredentialItem.yml`, templateYaml(ID.CredItem, ID.TplFolder, '/sitecore/templates/Project/legal/Person Templates/CredentialItem'));
write(`${TPL}/CredentialItem/Data.yml`, sectionYaml(ID.CredData, ID.CredItem, '/sitecore/templates/Project/legal/Person Templates/CredentialItem/Data'));
write(`${TPL}/CredentialItem/Data/Year.yml`, fieldYaml(ID.CredYear, ID.CredData, '/sitecore/templates/Project/legal/Person Templates/CredentialItem/Data/Year', 'Single-Line Text', 100, 'Year'));
write(`${TPL}/CredentialItem/Data/Detail.yml`, fieldYaml(ID.CredDetail, ID.CredData, '/sitecore/templates/Project/legal/Person Templates/CredentialItem/Data/Detail', 'Single-Line Text', 110, 'Detail'));

write(`${TPL}/InsightItem.yml`, templateYaml(ID.InsItem, ID.TplFolder, '/sitecore/templates/Project/legal/Person Templates/InsightItem'));
write(`${TPL}/InsightItem/Data.yml`, sectionYaml(ID.InsData, ID.InsItem, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data'));
write(`${TPL}/InsightItem/Data/Kicker.yml`, fieldYaml(ID.InsKicker, ID.InsData, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data/Kicker', 'Single-Line Text', 100, 'Kicker'));
write(`${TPL}/InsightItem/Data/Title.yml`, fieldYaml(ID.InsTitle, ID.InsData, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data/Title', 'Single-Line Text', 110, 'Title'));
write(`${TPL}/InsightItem/Data/Date.yml`, fieldYaml(ID.InsDate, ID.InsData, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data/Date', 'Single-Line Text', 120, 'Date'));
write(`${TPL}/InsightItem/Data/Summary.yml`, fieldYaml(ID.InsSummary, ID.InsData, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data/Summary', 'Multi-Line Text', 130, 'Summary'));
write(`${TPL}/InsightItem/Data/Link.yml`, fieldYaml(ID.InsLink, ID.InsData, '/sitecore/templates/Project/legal/Person Templates/InsightItem/Data/Link', 'General Link', 140, 'Link'));

write(
  'serialized-content/person-page-template/PersonPage/Person/ExperienceItems.yml',
  fieldYaml(
    ID.FExperience,
    PERSON_SECTION,
    '/sitecore/templates/Project/legal/PersonPage/Person/ExperienceItems',
    'Treelist',
    850,
    'ExperienceItems',
    '/sitecore/content/legal/legal/Data/People'
  )
);
write(
  'serialized-content/person-page-template/PersonPage/Person/CredentialItems.yml',
  fieldYaml(
    ID.FCredentials,
    PERSON_SECTION,
    '/sitecore/templates/Project/legal/PersonPage/Person/CredentialItems',
    'Treelist',
    860,
    'CredentialItems',
    '/sitecore/content/legal/legal/Data/People'
  )
);
write(
  'serialized-content/person-page-template/PersonPage/Person/InsightItems.yml',
  fieldYaml(
    ID.FInsights,
    PERSON_SECTION,
    '/sitecore/templates/Project/legal/PersonPage/Person/InsightItems',
    'Treelist',
    870,
    'InsightItems',
    '/sitecore/content/legal/legal/Data/People'
  )
);
write(
  'serialized-content/person-page-template/PersonPage/Person/RelatedPeople.yml',
  fieldYaml(
    ID.FRelated,
    PERSON_SECTION,
    '/sitecore/templates/Project/legal/PersonPage/Person/RelatedPeople',
    'Treelist',
    880,
    'RelatedPeople',
    '/sitecore/content/legal/legal/Home/people'
  )
);

write(
  'serialized-content/person-page-template/PersonPage/__Standard Values.yml',
  `---
ID: "${ID.StdValues}"
Parent: "${PERSON_PAGE}"
Template: "${PERSON_PAGE}"
Path: "/sitecore/templates/Project/legal/PersonPage/__Standard Values"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PERSON_DESIGN}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write('serialized-content/renderings/legal/PersonBreadcrumb.yml', renderingYaml(ID.RBreadcrumb, 'PersonBreadcrumb', 'PersonBreadcrumb'));
write('serialized-content/renderings/legal/PersonQuote.yml', renderingYaml(ID.RQuote, 'PersonQuote', 'PersonQuote'));
write('serialized-content/renderings/legal/PersonExperience.yml', renderingYaml(ID.RExperience, 'PersonExperience', 'PersonExperience'));
write('serialized-content/renderings/legal/PersonInsights.yml', renderingYaml(ID.RInsights, 'PersonInsights', 'PersonInsights'));
write('serialized-content/renderings/legal/PersonRelated.yml', renderingYaml(ID.RRelated, 'PersonRelated', 'PersonRelated'));

write('serialized-content/legal/legal/Data/People.yml', folderYaml(ID.DataPeople, DATA_ROOT, '/sitecore/content/legal/legal/Data/People'));
write('serialized-content/legal/legal/Data/People/dawn-allen.yml', folderYaml(ID.DataDawn, ID.DataPeople, '/sitecore/content/legal/legal/Data/People/dawn-allen'));
write('serialized-content/legal/legal/Data/People/dawn-allen/Experience.yml', folderYaml(ID.DataExpFolder, ID.DataDawn, '/sitecore/content/legal/legal/Data/People/dawn-allen/Experience'));
write('serialized-content/legal/legal/Data/People/dawn-allen/Credentials.yml', folderYaml(ID.DataCredFolder, ID.DataDawn, '/sitecore/content/legal/legal/Data/People/dawn-allen/Credentials'));
write('serialized-content/legal/legal/Data/People/dawn-allen/Insights.yml', folderYaml(ID.DataInsFolder, ID.DataDawn, '/sitecore/content/legal/legal/Data/People/dawn-allen/Insights'));

for (const item of EXPERIENCE) {
  const valueField = item.value
    ? `    - ID: "${ID.ExpValue}"
      Hint: Value
      Value: "${item.value}"
`
    : '';
  write(
    `serialized-content/legal/legal/Data/People/dawn-allen/Experience/${item.name}.yml`,
    `---
ID: "${item.id}"
Parent: "${ID.DataExpFolder}"
Template: "${ID.ExpItem}"
Path: /sitecore/content/legal/legal/Data/People/dawn-allen/Experience/${item.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.ExpTitle}"
      Hint: Title
      Value: |
        ${item.title}
    - ID: "${ID.ExpYear}"
      Hint: Year
      Value: "${item.year}"
    - ID: "${ID.ExpRegion}"
      Hint: Region
      Value: "${item.region}"
    - ID: "${ID.ExpSector}"
      Hint: Sector
      Value: "${item.sector}"
    - ID: "${ID.ExpService}"
      Hint: Service
      Value: "${item.service}"
${valueField}`
  );
}

for (const item of CREDENTIALS) {
  write(
    `serialized-content/legal/legal/Data/People/dawn-allen/Credentials/${item.name}.yml`,
    `---
ID: "${item.id}"
Parent: "${ID.DataCredFolder}"
Template: "${ID.CredItem}"
Path: /sitecore/content/legal/legal/Data/People/dawn-allen/Credentials/${item.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.CredYear}"
      Hint: Year
      Value: "${item.year}"
    - ID: "${ID.CredDetail}"
      Hint: Detail
      Value: "${item.detail}"
`
  );
}

for (const item of INSIGHTS) {
  const summary = item.summary
    ? `    - ID: "${ID.InsSummary}"
      Hint: Summary
      Value: |
        ${item.summary}
`
    : '';
  write(
    `serialized-content/legal/legal/Data/People/dawn-allen/Insights/${item.name}.yml`,
    `---
ID: "${item.id}"
Parent: "${ID.DataInsFolder}"
Template: "${ID.InsItem}"
Path: /sitecore/content/legal/legal/Data/People/dawn-allen/Insights/${item.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${ID.InsKicker}"
      Hint: Kicker
      Value: "${item.kicker}"
    - ID: "${ID.InsTitle}"
      Hint: Title
      Value: "${item.title.replace(/"/g, '\\"')}"
    - ID: "${ID.InsDate}"
      Hint: Date
      Value: "${item.date}"
${summary}    - ID: "${ID.InsLink}"
      Hint: Link
      Value: |
        ${internalLink(item.title, item.href, item.pageId)}
`
  );
}

const personRenderings = layoutXml([
  { uid: 'A1E92000-0003-4000-8000-000000000001', id: 'A1E90001-1111-4000-8000-000000000012' },
  { uid: 'A1E92000-0003-4000-8000-000000000002', id: 'A1E90001-1111-4000-8000-000000000006' },
  { uid: 'A1E92000-0003-4000-8000-000000000003', id: 'A1E90001-1111-4000-8000-000000000013' },
  { uid: 'A1E92000-0003-4000-8000-000000000004', id: 'A1E90001-1111-4000-8000-000000000014' },
  { uid: 'A1E92000-0003-4000-8000-000000000005', id: 'A1E90001-1111-4000-8000-000000000015' },
  { uid: 'A1E92000-0003-4000-8000-000000000006', id: 'A1E90001-1111-4000-8000-000000000016' },
]);

write(
  'serialized-content/legal/legal/Presentation/Partial Designs/Person.yml',
  `---
ID: "${ID.PartialPerson}"
Parent: "${PARTIALS}"
Template: "${T_PARTIAL}"
Path: /sitecore/content/legal/legal/Presentation/Partial Designs/Person
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: person
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}">
${personRenderings}
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Presentation/Page Designs/Person.yml',
  `---
ID: "${ID.PageDesignPerson}"
Parent: "${PAGE_DESIGNS}"
Template: "${T_PAGE_DESIGN}"
Path: /sitecore/content/legal/legal/Presentation/Page Designs/Person
SharedFields:
- ID: "${F_PARTIALS}"
  Hint: PartialDesigns
  Value: "a1e90004-4444-4000-8000-000000000001|a1e90004-4444-4000-8000-000000000003|a1e90004-4444-4000-8000-000000000002"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

const emptyLayout = `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{A1E92100-0000-4000-8000-000000000001}"
          p:before="*"
          s:ds="${NEWSLETTER_DS}"
          s:id="{${PROMO}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${NEWSLETTER_VAR}%7D&amp;DynamicPlaceholderId=7"
          s:ph="headless-main" />
      </d>
    </r>`;

write(
  'serialized-content/legal/legal/Home/people/dawn-allen.yml',
  `---
ID: "${DAWN}"
Parent: "${PEOPLE}"
Template: "${PERSON_PAGE}"
Path: /sitecore/content/legal/legal/Home/people/dawn-allen
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PERSON_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${emptyLayout}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "a1e90010-0000-4000-8000-000000000038"
      Hint: Photo
      Value: |
        <Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/fc4540fa91034385b4f8b29267943322" dam-id="mAg0RiGGSfO2ePXMddiOLg" alt="dawn-allen" dam-content-type="Image" />
${created()}    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: "Dawn Allen"
    - ID: "63ba690a-5274-4537-8313-a6d43fbdadc1"
      Hint: Title
      Value: "Dawn Allen"
    - ID: "a1e90010-0000-4000-8000-000000000032"
      Hint: JobTitle
      Value: "Partner"
    - ID: "a1e90010-0000-4000-8000-000000000033"
      Hint: Phone
      Value: "+44 (0) 7771 842 600"
    - ID: "a1e90010-0000-4000-8000-000000000034"
      Hint: Email
      Value: "dawn.allen@pinsentmasons.com"
    - ID: "a1e90010-0000-4000-8000-000000000035"
      Hint: Office
      Value: "Leeds"
    - ID: "a1e90010-0000-4000-8000-000000000036"
      Hint: LinkedIn
      Value: "https://www.linkedin.com/in/dawn-allen-b8398919"
    - ID: "a1e90010-0000-4000-8000-000000000037"
      Hint: Biography
      Value: |
        <p>Dawn focuses on non-contentious restructuring and insolvency engagements and advises a range of stakeholders, predominantly financial institutions as well as accountants, corporate clients and their boards of directors.</p>
    - ID: "a1e90010-0000-4000-8000-000000000039"
      Hint: Specialisms
      Value: |
        <ul><li><a href="/expertise/restructuring">Restructuring</a></li></ul>
    - ID: "${ID.FExperience}"
      Hint: ExperienceItems
      Value: "${pipeIds(EXPERIENCE)}"
    - ID: "${ID.FCredentials}"
      Hint: CredentialItems
      Value: "${pipeIds(CREDENTIALS)}"
    - ID: "${ID.FInsights}"
      Hint: InsightItems
      Value: "${pipeIds(INSIGHTS)}"
    - ID: "${ID.FRelated}"
      Hint: RelatedPeople
      Value: "{${DESIREE.toUpperCase()}}|{${DINESH.toUpperCase()}}|{${BARKER.toUpperCase()}}|{${DOOGAN.toUpperCase()}}"
`
);

console.log('Person page YAML written.');
