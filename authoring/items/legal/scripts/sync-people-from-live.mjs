/**
 * Sync PersonPage + Data/People items from live Pinsent Masons profile captures.
 * Does not regenerate templates, renderings, or page designs.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const PERSON_PAGE = 'a1e90010-0000-4000-8000-000000000030';
const CRED_ITEM = 'a1e90012-0000-4000-8000-000000000020';
const INS_ITEM = 'a1e90012-0000-4000-8000-000000000030';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const PERSON_DESIGN = '{A1E90005-5555-4000-8000-000000000002}';
const PEOPLE = 'a1e90030-0000-4000-8000-000000000001';
const DATA_PEOPLE = 'a1e90022-0000-4000-8000-000000000001';
const OUTLAW = 'a1e90030-0000-4000-8000-000000000010';
const NEWS = 'a1e90030-0000-4000-8000-000000000050';

const ID = {
  Dawn: 'a1e90030-0000-4000-8000-000000000002',
  Bill: 'a1e90030-0000-4000-8000-000000000003',
  Barry: 'a1e90030-0000-4000-8000-000000000004',
  Bryn: 'a1e90030-0000-4000-8000-000000000005',
  Ben: 'a1e90030-0000-4000-8000-000000000006',
  Hammad: 'a1e90030-0000-4000-8000-000000000007',
  Desiree: 'a1e90030-0000-4000-8000-000000000008',
  Dinesh: 'a1e90030-0000-4000-8000-000000000009',
  Barker: 'a1e90030-0000-4000-8000-00000000000a',
  Doogan: 'a1e90030-0000-4000-8000-00000000000b',
  FExperience: 'a1e90010-0000-4000-8000-00000000003b',
  FCredentials: 'a1e90010-0000-4000-8000-00000000003c',
  FInsights: 'a1e90010-0000-4000-8000-00000000003d',
  FRelated: 'a1e90010-0000-4000-8000-00000000003e',
  CredYear: 'a1e90012-0000-4000-8000-000000000022',
  CredDetail: 'a1e90012-0000-4000-8000-000000000023',
  InsKicker: 'a1e90012-0000-4000-8000-000000000032',
  InsTitle: 'a1e90012-0000-4000-8000-000000000033',
  InsDate: 'a1e90012-0000-4000-8000-000000000034',
  InsSummary: 'a1e90012-0000-4000-8000-000000000035',
  InsLink: 'a1e90012-0000-4000-8000-000000000036',
};

const PHOTOS = {
  'dawn-allen':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/fc4540fa91034385b4f8b29267943322" dam-id="mAg0RiGGSfO2ePXMddiOLg" alt="dawn-allen" dam-content-type="Image" />',
  'bill-ryan':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9e82f560583e4332af039f6d4a08cf42" dam-id="B-jK26X7RruYEdXyWbJtBA" alt="bill-ryan" dam-content-type="Image" />',
  'barry-mccaig':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2b5b1d830fcc46be8f8f44ded1677f4b" dam-id="_9WcMeFbSzGAuMHwg914VQ" alt="barry-mccaig" dam-content-type="Image" />',
  'bryn-reynolds':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d6cbefd639a7455ebe6fa012f47e883a" dam-id="R4BXI91GTjmAXcWH0Ppxpw" alt="bryn-reynolds" dam-content-type="Image" />',
  'hammad-akhtar':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/6357bbf7f34246e4b7aad215a603362a" dam-id="S6DYtVtSSPyorvX1c3WezA" alt="hammad-akhtar" dam-content-type="Image" />',
  'desiree-fields':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e9feed2e48664d5682bb7de5040eb744" dam-id="SAr7LXiBQe2v1pP8tIshYw" alt="desiree-fields" dam-content-type="Image" />',
  'dinesh-banani':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/4a2f5cc3cabd467eb75c03c5ac7e0b48" dam-id="xnmMYbtSQhGqeTbLVYgCzg" alt="dinesh-banani" dam-content-type="Image" />',
  'david-barker':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/872630383a624f9d94f17245454de16f" dam-id="e3UpEq4qSViY3WzcLfy8lQ" alt="david-barker" dam-content-type="Image" />',
  'david-doogan':
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d9910e93814441a283e68606abb6c7f5" dam-id="QoaVOsYdRWq0W_oY5rvjeQ" alt="david-doogan" dam-content-type="Image" />',
};

const EMPTY_LAYOUT = `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
      </d>
    </r>`;

const DAWN_INSIGHTS = [
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
  fs.writeFileSync(full, content, 'utf8');
}

function remove(rel) {
  const full = path.join(ROOT, rel);
  if (fs.existsSync(full)) fs.unlinkSync(full);
}

function pipeIds(rows) {
  return rows.map((row) => `{${row.id.toUpperCase()}}`).join('|');
}

function pipeGuids(...ids) {
  return ids.map((id) => `{${id.toUpperCase()}}`).join('|');
}

function yamlQuote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function specialismsHtml(list) {
  return `<ul>${list.map((item) => `<li>${item}</li>`).join('')}</ul>`;
}

function internalLink(text, url, id) {
  const safe = text.replace(/"/g, '&quot;');
  return `<link text="${safe}" linktype="internal" url="${url}" anchor="" target="" title="" class="" id="${id}" />`;
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
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T120000Z
`;
}

function credentialYaml(item, parent, slug) {
  return `---
ID: "${item.id}"
Parent: "${parent}"
Template: "${CRED_ITEM}"
Path: /sitecore/content/legal/legal/Data/People/${slug}/Credentials/${item.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T120000Z
    - ID: "${ID.CredYear}"
      Hint: Year
      Value: ${yamlQuote(item.year)}
    - ID: "${ID.CredDetail}"
      Hint: Detail
      Value: ${yamlQuote(item.detail)}
`;
}

function insightYaml(item, parent, slug) {
  const summary = item.summary
    ? `    - ID: "${ID.InsSummary}"
      Hint: Summary
      Value: |
        ${item.summary}
`
    : '';
  return `---
ID: "${item.id}"
Parent: "${parent}"
Template: "${INS_ITEM}"
Path: /sitecore/content/legal/legal/Data/People/${slug}/Insights/${item.name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T120000Z
    - ID: "${ID.InsKicker}"
      Hint: Kicker
      Value: ${yamlQuote(item.kicker)}
    - ID: "${ID.InsTitle}"
      Hint: Title
      Value: ${yamlQuote(item.title)}
    - ID: "${ID.InsDate}"
      Hint: Date
      Value: ${yamlQuote(item.date)}
${summary}    - ID: "${ID.InsLink}"
      Hint: Link
      Value: |
        ${internalLink(item.title, item.href, item.pageId)}
`;
}

function personYaml(p) {
  const photo = PHOTOS[p.slug]
    ? `    - ID: "a1e90010-0000-4000-8000-000000000038"
      Hint: Photo
      Value: |
        ${PHOTOS[p.slug]}
`
    : '';
  const experience = p.experienceItems
    ? `    - ID: "${ID.FExperience}"
      Hint: ExperienceItems
      Value: "${p.experienceItems}"
`
    : '';
  const credentials = p.credentialItems
    ? `    - ID: "${ID.FCredentials}"
      Hint: CredentialItems
      Value: "${p.credentialItems}"
`
    : '';
  const insights = p.insightItems
    ? `    - ID: "${ID.FInsights}"
      Hint: InsightItems
      Value: "${p.insightItems}"
`
    : '';
  const related = p.relatedPeople
    ? `    - ID: "${ID.FRelated}"
      Hint: RelatedPeople
      Value: "${p.relatedPeople}"
`
    : '';
  const linkedin = p.linkedin
    ? `    - ID: "a1e90010-0000-4000-8000-000000000036"
      Hint: LinkedIn
      Value: ${yamlQuote(p.linkedin)}
`
    : `    - ID: "a1e90010-0000-4000-8000-000000000036"
      Hint: LinkedIn
      Value: ""
`;
  return `---
ID: "${p.id}"
Parent: "${PEOPLE}"
Template: "${PERSON_PAGE}"
Path: /sitecore/content/legal/legal/Home/people/${p.slug}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PERSON_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${EMPTY_LAYOUT}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${photo}    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T120000Z
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: ${yamlQuote(p.name)}
    - ID: "63ba690a-5274-4537-8313-a6d43fbdadc1"
      Hint: Title
      Value: ${yamlQuote(p.name)}
    - ID: "a1e90010-0000-4000-8000-000000000032"
      Hint: JobTitle
      Value: ${yamlQuote(p.jobTitle)}
    - ID: "a1e90010-0000-4000-8000-000000000033"
      Hint: Phone
      Value: ${yamlQuote(p.phone)}
    - ID: "a1e90010-0000-4000-8000-000000000034"
      Hint: Email
      Value: ${yamlQuote(p.email)}
    - ID: "a1e90010-0000-4000-8000-000000000035"
      Hint: Office
      Value: ${yamlQuote(p.office)}
${linkedin}    - ID: "a1e90010-0000-4000-8000-000000000037"
      Hint: Biography
      Value: |
        <p>${p.bio}</p>
    - ID: "a1e90010-0000-4000-8000-000000000039"
      Hint: Specialisms
      Value: |
        ${specialismsHtml(p.specialisms)}
${experience}${credentials}${insights}${related}`;
}

function writePersonData(slug, dataId, credFolderId, credentials, insFolderId, insights) {
  write(
    `serialized-content/legal/legal/Data/People/${slug}.yml`,
    folderYaml(dataId, DATA_PEOPLE, `/sitecore/content/legal/legal/Data/People/${slug}`)
  );
  write(
    `serialized-content/legal/legal/Data/People/${slug}/Credentials.yml`,
    folderYaml(credFolderId, dataId, `/sitecore/content/legal/legal/Data/People/${slug}/Credentials`)
  );
  for (const item of credentials) {
    write(
      `serialized-content/legal/legal/Data/People/${slug}/Credentials/${item.name}.yml`,
      credentialYaml(item, credFolderId, slug)
    );
  }
  if (insFolderId && insights?.length) {
    write(
      `serialized-content/legal/legal/Data/People/${slug}/Insights.yml`,
      folderYaml(insFolderId, dataId, `/sitecore/content/legal/legal/Data/People/${slug}/Insights`)
    );
    for (const item of insights) {
      write(
        `serialized-content/legal/legal/Data/People/${slug}/Insights/${item.name}.yml`,
        insightYaml(item, insFolderId, slug)
      );
    }
  }
}

const ALSO_VIEWED = [ID.Desiree, ID.Dinesh, ID.Barker, ID.Doogan];
const DAWN_EXPERIENCE =
  '{A1E90022-0000-4000-8000-000000000012}|{A1E90022-0000-4000-8000-000000000013}|{A1E90022-0000-4000-8000-000000000014}|{A1E90022-0000-4000-8000-000000000015}|{A1E90022-0000-4000-8000-000000000016}|{A1E90022-0000-4000-8000-000000000017}|{A1E90022-0000-4000-8000-000000000018}|{A1E90022-0000-4000-8000-000000000019}|{A1E90022-0000-4000-8000-00000000001A}|{A1E90022-0000-4000-8000-00000000001B}|{A1E90022-0000-4000-8000-00000000001C}';
const DAWN_CREDENTIALS =
  '{A1E90022-0000-4000-8000-000000000021}|{A1E90022-0000-4000-8000-000000000022}|{A1E90022-0000-4000-8000-000000000023}|{A1E90022-0000-4000-8000-000000000024}|{A1E90022-0000-4000-8000-000000000025}|{A1E90022-0000-4000-8000-000000000026}';

remove('serialized-content/legal/legal/Data/People/dawn-allen/Insights/supplier-guide.yml');
remove('serialized-content/legal/legal/Data/People/dawn-allen/Insights/holiday-pay-restructuring.yml');

for (const item of DAWN_INSIGHTS) {
  write(
    `serialized-content/legal/legal/Data/People/dawn-allen/Insights/${item.name}.yml`,
    insightYaml(item, 'a1e90022-0000-4000-8000-000000000030', 'dawn-allen')
  );
}

const billCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000042', name: 'joined', year: '2017', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000043', name: 'qualified-wa', year: '2001', detail: 'Qualified - Western Australia' },
  { id: 'a1e90022-0000-4000-8000-000000000044', name: 'qualified-vic', year: '1992', detail: 'Qualified - Victoria, Australia' },
  { id: 'a1e90022-0000-4000-8000-000000000045', name: 'bcom', year: '1991', detail: 'University of Melbourne - BCom' },
  { id: 'a1e90022-0000-4000-8000-000000000046', name: 'llb', year: '1991', detail: 'University of Melbourne - LLB' },
];
const billInsights = [
  {
    id: 'a1e90022-0000-4000-8000-000000000048',
    name: 'arbitration-agreement',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'A global view of the law applicable to an arbitration agreement',
    date: '11 February 2021',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-000000000049',
    name: 'eu-trade-talks',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'As EU Council decides fate of trade talks, what exactly has been agreed so far?',
    date: '14 December 2017',
    href: '/out-law',
    pageId: OUTLAW,
  },
  {
    id: 'a1e90022-0000-4000-8000-00000000004a',
    name: 'low-emissions',
    kicker: 'OUT-LAW NEWS',
    title: 'Australia and UK agree to collaborate on low emissions technologies',
    date: '4 August 2021',
    href: '/out-law',
    pageId: OUTLAW,
  },
];
writePersonData(
  'bill-ryan',
  'a1e90022-0000-4000-8000-000000000040',
  'a1e90022-0000-4000-8000-000000000041',
  billCredentials,
  'a1e90022-0000-4000-8000-000000000047',
  billInsights
);

const hammadCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000052', name: 'joined', year: '2017', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000053', name: 'ashurst', year: '2013', detail: 'Ashurst LLP, Partner' },
  { id: 'a1e90022-0000-4000-8000-000000000054', name: 'herbert-smith', year: '2002', detail: 'Herbert Smith LLP, Partner' },
  { id: 'a1e90022-0000-4000-8000-000000000055', name: 'qualified', year: '2002', detail: 'Qualified - England and Wales' },
  { id: 'a1e90022-0000-4000-8000-000000000056', name: 'lpc', year: '1998', detail: 'College of Law – LPC' },
  { id: 'a1e90022-0000-4000-8000-000000000057', name: 'cpe', year: '1997', detail: 'College of Law – CPE (Law)' },
  {
    id: 'a1e90022-0000-4000-8000-000000000058',
    name: 'glasgow',
    year: '1996',
    detail: 'University of Glasgow – MA (Hons) Economic and Social History/Management Studies',
  },
];
writePersonData(
  'hammad-akhtar',
  'a1e90022-0000-4000-8000-000000000050',
  'a1e90022-0000-4000-8000-000000000051',
  hammadCredentials
);

const desireeCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000062', name: 'joined', year: '2021', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000063', name: 'ireland', year: '2018', detail: 'Qualified - Ireland' },
  { id: 'a1e90022-0000-4000-8000-000000000064', name: 'dla', year: '2015', detail: 'DLA Piper UK LLP - Legal Director' },
  { id: 'a1e90022-0000-4000-8000-000000000065', name: 'stobbs', year: '2015', detail: 'Stobbs - Senior Solicitor' },
  { id: 'a1e90022-0000-4000-8000-000000000066', name: 'mcdermott', year: '2008', detail: 'McDermott, Will & Emery UK LLP - Associate' },
  { id: 'a1e90022-0000-4000-8000-000000000067', name: 'bristol', year: '2007', detail: 'University of Bristol - Diploma, Intellectual Property Law and Practice' },
  { id: 'a1e90022-0000-4000-8000-000000000068', name: 'lovells-associate', year: '2006', detail: 'Lovells LLP - Associate' },
  { id: 'a1e90022-0000-4000-8000-000000000069', name: 'lovells-trainee', year: '2006', detail: 'Lovells LLP - Trainee Solicitor' },
  { id: 'a1e90022-0000-4000-8000-00000000006a', name: 'qualified-ew', year: '2006', detail: 'Qualified - England & Wales' },
  { id: 'a1e90022-0000-4000-8000-00000000006b', name: 'bpp', year: '2004', detail: 'BPP Law School - Post Graduate Diploma in Legal Practice' },
  { id: 'a1e90022-0000-4000-8000-00000000006c', name: 'new-york', year: '2004', detail: 'Qualified - New York' },
  { id: 'a1e90022-0000-4000-8000-00000000006d', name: 'toronto', year: '2002', detail: 'University of Toronto - LLM' },
  { id: 'a1e90022-0000-4000-8000-00000000006e', name: 'qmul', year: '2001', detail: 'Queen Mary University of London - LLB' },
];
writePersonData(
  'desiree-fields',
  'a1e90022-0000-4000-8000-000000000060',
  'a1e90022-0000-4000-8000-000000000061',
  desireeCredentials
);

const dineshCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000072', name: 'joined', year: '2025', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000073', name: 'hsf-partner', year: '2015', detail: 'Herbert Smith Freehills Kramer LLP - Partner' },
  { id: 'a1e90022-0000-4000-8000-000000000074', name: 'hsf-senior', year: '2010', detail: 'Herbert Smith Freehills Kramer LLP - Senior Associate' },
  { id: 'a1e90022-0000-4000-8000-000000000075', name: 'boston', year: '2004', detail: 'Boston College Law School - (J.D.)' },
  { id: 'a1e90022-0000-4000-8000-000000000076', name: 'fletcher', year: '2004', detail: 'Fletcher School of Law & Diplomacy - (M.A.L.D.)' },
  { id: 'a1e90022-0000-4000-8000-000000000077', name: 'sullivan', year: '2004', detail: 'Sullivan & Cromwell LLP - Associate' },
  { id: 'a1e90022-0000-4000-8000-000000000078', name: 'georgetown', year: '1998', detail: 'Georgetown University School of Foreign Service - (B.S.F.S.)' },
];
writePersonData(
  'dinesh-banani',
  'a1e90022-0000-4000-8000-000000000070',
  'a1e90022-0000-4000-8000-000000000071',
  dineshCredentials
);

const barkerCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000082', name: 'qmul', year: '2003', detail: 'Queen Mary University, London - IT Law (Diploma)' },
  { id: 'a1e90022-0000-4000-8000-000000000083', name: 'joined', year: '2000', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000084', name: 'qualified', year: '1997', detail: 'Qualified - England and Wales' },
  { id: 'a1e90022-0000-4000-8000-000000000085', name: 'lpc', year: '1995', detail: 'College of Law - Legal Practice Course' },
  { id: 'a1e90022-0000-4000-8000-000000000086', name: 'salans', year: '1995', detail: 'Salans - Solicitor' },
  { id: 'a1e90022-0000-4000-8000-000000000087', name: 'cpe', year: '1994', detail: 'College of Law - Common Professional Examination' },
  { id: 'a1e90022-0000-4000-8000-000000000088', name: 'manchester', year: '1992', detail: 'University of Manchester - BA (Hons)' },
];
writePersonData(
  'david-barker',
  'a1e90022-0000-4000-8000-000000000080',
  'a1e90022-0000-4000-8000-000000000081',
  barkerCredentials
);

const dooganCredentials = [
  { id: 'a1e90022-0000-4000-8000-000000000092', name: 'joined', year: '2013', detail: 'Joined Pinsent Masons' },
  { id: 'a1e90022-0000-4000-8000-000000000093', name: 'martineau', year: '2007', detail: 'Martineau Johnson, Partner' },
  { id: 'a1e90022-0000-4000-8000-000000000094', name: 'qualified', year: '2002', detail: 'Qualified - England and Wales' },
  { id: 'a1e90022-0000-4000-8000-000000000095', name: 'lpc', year: '2000', detail: 'College of Law, York – LPC' },
  { id: 'a1e90022-0000-4000-8000-000000000096', name: 'gateley', year: '2000', detail: 'Gateley, Associate' },
  { id: 'a1e90022-0000-4000-8000-000000000097', name: 'diploma', year: '1999', detail: 'College of Law, York - Diploma in Law' },
  { id: 'a1e90022-0000-4000-8000-000000000098', name: 'leeds', year: '1998', detail: 'University of Leeds – BA History' },
];
writePersonData(
  'david-doogan',
  'a1e90022-0000-4000-8000-000000000090',
  'a1e90022-0000-4000-8000-000000000091',
  dooganCredentials
);

const people = [
  {
    id: ID.Dawn,
    slug: 'dawn-allen',
    name: 'Dawn Allen',
    jobTitle: 'Partner',
    phone: '+44 (0) 7771 842 600',
    email: 'dawn.allen@pinsentmasons.com',
    office: 'Leeds',
    linkedin: 'https://www.linkedin.com/in/dawn-allen-b8398919',
    bio: 'Dawn focuses on non-contentious restructuring and insolvency engagements and advises a range of stakeholders, predominantly financial institutions as well as accountants, corporate clients and their boards of directors.',
    specialisms: ['Restructuring'],
    experienceItems: DAWN_EXPERIENCE,
    credentialItems: DAWN_CREDENTIALS,
    insightItems: pipeIds(DAWN_INSIGHTS),
    relatedPeople: pipeGuids(...ALSO_VIEWED),
  },
  {
    id: ID.Bill,
    slug: 'bill-ryan',
    name: 'Bill Ryan',
    jobTitle: 'Partner',
    phone: '+61 407 831 221',
    email: 'bill.ryan@pinsentmasons.com',
    office: 'Melbourne',
    bio: 'Bill specialises in advising the construction, engineering and energy industry sectors primarily in relation to contentious matters. His recent experience includes co-managing large teams in arbitration proceedings arising from LNG and processing plant projects in Queensland and Western Australia.',
    specialisms: [
      'Construction Advisory & Disputes',
      'Adjudication',
      'Arbitration',
      'Construction Claims',
      'Construction Contracts',
      'Construction Disputes',
      'Construction Procurement',
      'Construction Standard Form Contracts',
      'Engineering Procurement',
      'Infrastructure',
      'Risk Management & Contract Advice',
    ],
    credentialItems: pipeIds(billCredentials),
    insightItems: pipeIds(billInsights),
    relatedPeople: pipeGuids(...ALSO_VIEWED),
  },
  {
    id: ID.Hammad,
    slug: 'hammad-akhtar',
    name: 'Hammad Akhtar',
    jobTitle: 'Partner',
    phone: '+44 (0) 7901 517 365',
    email: 'hammad.akhtar@pinsentmasons.com',
    office: 'London',
    bio: 'Hammad specialises in advising insurers, reinsurers and other financial institutions on corporate transactions such as M&A and reorganisations that, on occasion, involve Part VII transfers and schemes of arrangements.',
    specialisms: [
      'Corporate',
      'Life Insurance',
      'Mergers & Acquisitions',
      'Part VII Transfers',
      'Reinsurance',
      'Schemes of arrangement',
    ],
    credentialItems: pipeIds(hammadCredentials),
    insightItems: pipeIds(DAWN_INSIGHTS),
    relatedPeople: pipeGuids(ID.Dawn, ID.Dinesh, ID.Doogan, ID.Barry),
  },
  {
    id: ID.Desiree,
    slug: 'desiree-fields',
    name: 'Désirée Fields',
    jobTitle: 'Legal Director',
    phone: '+44 20 7054 2524',
    email: 'desiree.fields@pinsentmasons.com',
    office: 'London',
    bio: 'Désirée advises on worldwide trade mark and design portfolio management, international prosecution and clearance, enforcement, exploitation and commercialisation of trade marks and designs.',
    specialisms: ['Trade Marks', 'Designs', 'Intellectual Property'],
    credentialItems: pipeIds(desireeCredentials),
    relatedPeople: pipeGuids(ID.Dawn, ID.Dinesh, ID.Barker, ID.Doogan),
  },
  {
    id: ID.Dinesh,
    slug: 'dinesh-banani',
    name: 'Dinesh Banani',
    jobTitle: 'Partner',
    phone: '+44 (0) 7345 181 819',
    email: 'dinesh.banani@pinsentmasons.com',
    office: 'London',
    bio: 'Dinesh is our Head of US Securities and has been guiding corporates and investment banks through equity and debt capital markets transactions in the UK, Europe, Middle East, Africa and Asia for the last 20 years.',
    specialisms: ['US Securities', 'Capital Markets', 'Corporate'],
    credentialItems: pipeIds(dineshCredentials),
    relatedPeople: pipeGuids(ID.Dawn, ID.Desiree, ID.Barker, ID.Doogan),
  },
  {
    id: ID.Barker,
    slug: 'david-barker',
    name: 'David Barker',
    jobTitle: 'Global Sector Head for Technology, Science and Industry',
    phone: '+44 (0) 20 7490 6969',
    email: 'david.barker@pinsentmasons.com',
    office: 'London',
    bio: 'David is our Sector Head for Technology, Science and Industry and leads our global offering to clients in these sectors. He is recognised as a market leader in technology and privacy litigation, having acted in some of the most complex and groundbreaking litigation in the tech space.',
    specialisms: ['Technology', 'Privacy Litigation', 'Media'],
    credentialItems: pipeIds(barkerCredentials),
    relatedPeople: pipeGuids(ID.Dawn, ID.Desiree, ID.Dinesh, ID.Doogan),
  },
  {
    id: ID.Doogan,
    slug: 'david-doogan',
    name: 'David Doogan',
    jobTitle: 'Partner',
    phone: '+44 (0) 7766 070 676',
    email: 'david.doogan@pinsentmasons.com',
    office: 'United Kingdom',
    bio: 'David acts for Lenders and Borrowers and specialises in the finance aspects of a wide variety of corporate transactions including corporate lending (secured and unsecured), property finance transactions (both investment and development), acquisition finance and leveraged transactions, corporate reorganisations and receivables financing transactions.',
    specialisms: ['Finance', 'Corporate Lending', 'Property Finance'],
    credentialItems: pipeIds(dooganCredentials),
    relatedPeople: pipeGuids(ID.Dawn, ID.Desiree, ID.Dinesh, ID.Barker),
  },
];

for (const person of people) {
  write(`serialized-content/legal/legal/Home/people/${person.slug}.yml`, personYaml(person));
}

console.log(`Synced ${people.length} person pages and related data folders.`);
