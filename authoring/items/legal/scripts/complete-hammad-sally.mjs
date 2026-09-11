/**
 * Specialisms as multi-select Tag treelist, complete Hammad + Sally pages,
 * Out-Law article pages for the live insight carousel.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_DATA_FOLDER = 'a29d272e-9d48-453c-9e9d-b47585fa7f20';
const T_PAGE = 'e5a82c5d-05dd-476c-bec7-efecffd2cf43';
const T_TAG = 'a1e90013-0000-4000-8000-000000000010';
const T_INSIGHT = 'a1e90012-0000-4000-8000-000000000030';
const TAGS_FOLDER = 'a8c4b183-b1df-4056-b8a2-663dded349de';
const NEWS_FOLDER = 'a1e90030-0000-4000-8000-000000000013';
const DATA_PEOPLE = 'a1e90022-0000-4000-8000-000000000001';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_SPECIALISMS = 'a1e90010-0000-4000-8000-000000000039';
const F_INSIGHTS = 'a1e90010-0000-4000-8000-00000000003d';
const F_RELATED = 'a1e90010-0000-4000-8000-00000000003e';
const ARTICLE = 'a1e90010-0000-4000-8000-000000000040';
const F_KICKER = 'a1e90010-0000-4000-8000-000000000046';
const F_DATE = 'a1e90010-0000-4000-8000-000000000044';
const F_READ = 'a1e90010-0000-4000-8000-000000000045';
const F_SHORT = 'a1e90010-0000-4000-8000-000000000042';
const F_TAGS = 'a1e90010-0000-4000-8000-000000000047';
const F_CATS = 'a1e90010-0000-4000-8000-000000000048';
const TAG_TITLE = 'a1e90013-0000-4000-8000-000000000012';
const INS_KICKER = 'a1e90012-0000-4000-8000-000000000032';
const INS_TITLE = 'a1e90012-0000-4000-8000-000000000033';
const INS_DATE = 'a1e90012-0000-4000-8000-000000000034';
const INS_LINK = 'a1e90012-0000-4000-8000-000000000036';
const NEWS_RENDERING = 'a1e90001-1111-4000-8000-000000000011';

const TAG = {
  restructuring: 'a1e90024-0000-4000-8000-000000000022',
  insolvency: 'a1e90024-0000-4000-8000-000000000023',
  infrastructure: 'a1e90024-0000-4000-8000-000000000024',
  arbitration: 'a1e90024-0000-4000-8000-000000000025',
  tax: 'a1e90024-0000-4000-8000-000000000026',
  construction: 'a1e90024-0000-4000-8000-000000000027',
  corporate: 'a1e90024-0000-4000-8000-000000000028',
  financialServices: 'a1e90024-0000-4000-8000-000000000029',
  realEstate: 'a1e90024-0000-4000-8000-00000000002a',
  risk: 'a1e90024-0000-4000-8000-00000000002b',
  technology: 'a1e90024-0000-4000-8000-00000000002d',
  lifeInsurance: 'a1e90024-0000-4000-8000-00000000002f',
  ma: 'a1e90024-0000-4000-8000-000000000061',
  partVii: 'a1e90024-0000-4000-8000-000000000062',
  reinsurance: 'a1e90024-0000-4000-8000-000000000063',
  schemes: 'a1e90024-0000-4000-8000-000000000064',
  employment: 'a1e90024-0000-4000-8000-000000000065',
  finance: 'a1e90024-0000-4000-8000-000000000066',
  lending: 'a1e90024-0000-4000-8000-000000000067',
  propertyFinance: 'a1e90024-0000-4000-8000-000000000068',
  tradeMarks: 'a1e90024-0000-4000-8000-000000000069',
  designs: 'a1e90024-0000-4000-8000-00000000006a',
  ip: 'a1e90024-0000-4000-8000-00000000006b',
  usSecurities: 'a1e90024-0000-4000-8000-00000000006c',
  capitalMarkets: 'a1e90024-0000-4000-8000-00000000006d',
  privacy: 'a1e90024-0000-4000-8000-00000000006e',
  media: 'a1e90024-0000-4000-8000-00000000006f',
  constructionAdvisory: 'a1e90024-0000-4000-8000-000000000070',
};

const CAT = {
  news: 'a1e90024-0000-4000-8000-000000000011',
  analysis: 'a1e90024-0000-4000-8000-000000000012',
};

const PEOPLE = {
  dawn: 'a1e90030-0000-4000-8000-000000000002',
  bill: 'a1e90030-0000-4000-8000-000000000003',
  barry: 'a1e90030-0000-4000-8000-000000000004',
  bryn: 'a1e90030-0000-4000-8000-000000000005',
  ben: 'a1e90030-0000-4000-8000-000000000006',
  hammad: 'a1e90030-0000-4000-8000-000000000007',
  desiree: 'a1e90030-0000-4000-8000-000000000008',
  dinesh: 'a1e90030-0000-4000-8000-000000000009',
  barker: 'a1e90030-0000-4000-8000-00000000000a',
  doogan: 'a1e90030-0000-4000-8000-00000000000b',
  sally: 'a1e90030-0000-4000-8000-00000000000c',
};

const GUIDE = 'a1e90030-0000-4000-8000-000000000012';
const DAWN_INSIGHTS = [
  'a1e90022-0000-4000-8000-000000000033',
  'a1e90022-0000-4000-8000-000000000034',
  'a1e90022-0000-4000-8000-000000000035',
  'a1e90022-0000-4000-8000-000000000036',
  'a1e90022-0000-4000-8000-000000000032',
  'a1e90022-0000-4000-8000-000000000031',
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

const NEWS_LOGICAL_DIR = 'serialized-content/legal/legal/Home/out-law/news';
const NEWS_HASHED_DIR = 'serialized-content/legal/02D10460AEA52D7A';

/** SCS hashes the parent folder when the include-relative path is too long for Windows. */
function newsYamlRel(slug) {
  const includeRel = `legal/Home/out-law/news/${slug}.yml`;
  if (includeRel.length > 79) {
    return `${NEWS_HASHED_DIR}/${slug}.yml`;
  }
  return `${NEWS_LOGICAL_DIR}/${slug}.yml`;
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260911T130000Z
`;
}

function treelist(ids) {
  return ids.map((id) => `{${id.toUpperCase()}}`).join('|');
}

function tagYaml(id, slug, title) {
  return `---
ID: "${id}"
Parent: "${TAGS_FOLDER}"
Template: "${T_TAG}"
Path: /sitecore/content/legal/legal/Data/Tags/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${TAG_TITLE}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
`;
}

const NEW_TAGS = [
  [TAG.lifeInsurance, 'life-insurance', 'Life Insurance'],
  [TAG.ma, 'mergers-acquisitions', 'Mergers & Acquisitions'],
  [TAG.partVii, 'part-vii-transfers', 'Part VII Transfers'],
  [TAG.reinsurance, 'reinsurance', 'Reinsurance'],
  [TAG.schemes, 'schemes-of-arrangement', 'Schemes of arrangement'],
  [TAG.employment, 'employment', 'Employment'],
  [TAG.finance, 'finance', 'Finance'],
  [TAG.lending, 'corporate-lending', 'Corporate Lending'],
  [TAG.propertyFinance, 'property-finance', 'Property Finance'],
  [TAG.tradeMarks, 'trade-marks', 'Trade Marks'],
  [TAG.designs, 'designs', 'Designs'],
  [TAG.ip, 'intellectual-property', 'Intellectual Property'],
  [TAG.usSecurities, 'us-securities', 'US Securities'],
  [TAG.capitalMarkets, 'capital-markets', 'Capital Markets'],
  [TAG.privacy, 'privacy-litigation', 'Privacy Litigation'],
  [TAG.media, 'media', 'Media'],
  [TAG.constructionAdvisory, 'construction-advisory', 'Construction Advisory & Disputes'],
];

for (const [id, slug, title] of NEW_TAGS) {
  write(`serialized-content/legal/legal/Data/Tags/${slug}.yml`, tagYaml(id, slug, title));
}

write(
  'serialized-content/person-page-template/PersonPage/Person/Specialisms.yml',
  `---
ID: "${F_SPECIALISMS}"
Parent: "a1e90010-0000-4000-8000-000000000031"
Template: "${T_FIELD}"
Path: "/sitecore/templates/Project/legal/PersonPage/Person/Specialisms"
SharedFields:
- ID: "${F_SOURCE}"
  Hint: Source
  Value: "/sitecore/content/legal/legal/Data/Tags"
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Treelist"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 800
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: Specialisms
  Versions:
  - Version: 1
    Fields:
${created()}`
);

const PERSON_TAGS = {
  'dawn-allen': [TAG.restructuring],
  'sally-williamson': [TAG.restructuring, TAG.insolvency],
  'hammad-akhtar': [
    TAG.corporate,
    TAG.lifeInsurance,
    TAG.ma,
    TAG.partVii,
    TAG.reinsurance,
    TAG.schemes,
  ],
  'bill-ryan': [
    TAG.constructionAdvisory,
    TAG.arbitration,
    TAG.construction,
    TAG.infrastructure,
    TAG.risk,
  ],
  'barry-mccaig': [TAG.corporate],
  'bryn-reynolds': [TAG.tax, TAG.financialServices],
  'ben-mckinley': [TAG.employment],
  'desiree-fields': [TAG.tradeMarks, TAG.designs, TAG.ip],
  'dinesh-banani': [TAG.usSecurities, TAG.capitalMarkets, TAG.corporate],
  'david-barker': [TAG.technology, TAG.privacy, TAG.media],
  'david-doogan': [TAG.finance, TAG.lending, TAG.propertyFinance],
};

function patchSpecialisms(slug, ids) {
  const rel = `serialized-content/legal/legal/Home/people/${slug}.yml`;
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  yaml = yaml.replace(
    /    - ID: "a1e90010-0000-4000-8000-000000000039"\r?\n      Hint: Specialisms\r?\n      Value: \|\r?\n(?:        .*\r?\n)+/,
    `    - ID: "${F_SPECIALISMS}"\n      Hint: Specialisms\n      Value: "${treelist(ids)}"\n`
  );
  fs.writeFileSync(full, yaml, 'utf8');
}

for (const [slug, ids] of Object.entries(PERSON_TAGS)) {
  patchSpecialisms(slug, ids);
}

function patchField(slug, fieldId, hint, value) {
  const rel = `serialized-content/legal/legal/Home/people/${slug}.yml`;
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  const block = `    - ID: "${fieldId}"
      Hint: ${hint}
      Value: "${value}"
`;
  const re = new RegExp(
    `    - ID: "${fieldId}"\\r?\\n      Hint: ${hint}\\r?\\n      Value: ".*"\\r?\\n`
  );
  if (re.test(yaml)) {
    yaml = yaml.replace(re, block);
  } else {
    yaml = yaml.replace(
      /(    - ID: "d9cf14b1-fa16-4ba6-9288-e8a174d4d522"[\s\S]*)/,
      `${block}$1`
    );
    if (!yaml.includes(fieldId) || yaml.indexOf(fieldId) === yaml.lastIndexOf(fieldId)) {
      // append before end
      yaml = yaml.replace(/\s*$/, `\n${block}`);
    }
  }
  fs.writeFileSync(full, yaml, 'utf8');
}

patchField(
  'hammad-akhtar',
  F_RELATED,
  'RelatedPeople',
  treelist([PEOPLE.bill, PEOPLE.barry, PEOPLE.bryn, PEOPLE.ben])
);

const ARTICLES = [
  {
    id: 'a1e90030-0000-4000-8000-000000000057',
    slug: 'uk-government-plans-to-revamp-holiday-pay-calculation-for-part-year-workers',
    nav: 'Holiday pay part-year workers',
    title: 'UK government plans to revamp holiday pay calculation for part-year workers',
    kicker: 'OUT-LAW NEWS',
    date: '19 January 2023',
    cat: CAT.news,
    tags: [TAG.employment],
    uid: 'a1e91000-0006-4000-8000-000000000057',
    body: `<p>UK ministers have signalled a change to how holiday pay is calculated for part-year workers, following litigation that left employers and workers with conflicting methods.</p>
<p>This Out-Law briefing summarises the policy direction for GCs and HR teams. It is not a substitute for advice on a live workforce or holiday-pay dispute.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-000000000058',
    slug: 'pensions-disputes-managing-member-expectations-paramount',
    nav: 'Pensions disputes',
    title: 'Pensions disputes: managing member expectations paramount',
    kicker: 'OUT-LAW ANALYSIS',
    date: '23 February 2021',
    cat: CAT.analysis,
    tags: [TAG.financialServices],
    uid: 'a1e91000-0006-4000-8000-000000000058',
    body: `<p>Pensions disputes often turn on what members were told, not only on the scheme rules. Managing expectations early reduces the risk of complaints escalating to the Ombudsman or the courts.</p>
<p>This analysis is for trustees and sponsoring employers. It is original briefing copy for the Pinsent demo, not a reprint of the live article.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-000000000059',
    slug: 'uk-subsidy-control-post-brexit-access-to-effective-judicial-remedies',
    nav: 'UK subsidy control',
    title: 'UK subsidy control post-Brexit: access to effective judicial remedies',
    kicker: 'OUT-LAW ANALYSIS',
    date: '1 February 2021',
    cat: CAT.analysis,
    tags: [TAG.corporate],
    uid: 'a1e91000-0006-4000-8000-000000000059',
    body: `<p>After Brexit, UK subsidy control created a new route to challenge public support. Access to an effective judicial remedy matters for both public authorities and competitors.</p>
<p>This briefing is demo copy for the Pinsent vertical, written for the insight carousel on people pages.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-00000000005a',
    slug: 'steps-of-court-settlement-was-not-negligent-court-rules',
    nav: 'Steps of court settlement',
    title: "'Steps of court' settlement was not negligent, court rules",
    kicker: 'OUT-LAW NEWS',
    date: '8 February 2016',
    cat: CAT.news,
    tags: [TAG.arbitration],
    uid: 'a1e91000-0006-4000-8000-00000000005a',
    body: `<p>The court held that a “steps of court” settlement was not, without more, negligent advice. Context and the client’s instructions still decide professional-negligence claims.</p>
<p>Demo briefing for the Out-Law insight rail — not a verbatim reprint of the 2016 live story.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-00000000005b',
    slug: 'vast-majority-of-companies-not-seeking-to-avoid-tax',
    nav: 'Tax avoidance',
    title: "'Vast majority' of companies not seeking to avoid tax",
    kicker: 'OUT-LAW NEWS',
    date: '27 August 2020',
    cat: CAT.news,
    tags: [TAG.tax],
    uid: 'a1e91000-0006-4000-8000-00000000005b',
    body: `<p>Survey evidence used in the tax debate suggested most companies were not pursuing avoidance schemes. HMRC still expects boards to document tax governance.</p>
<p>Short demo news note for the people-page insight carousel.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-00000000005c',
    slug: 'world-first-industrial-decarbonisation-strategy-developed-in-the-uk',
    nav: 'Industrial decarbonisation',
    title: "'World first' industrial decarbonisation strategy developed in the UK",
    kicker: 'OUT-LAW NEWS',
    date: '19 March 2021',
    cat: CAT.news,
    tags: [TAG.infrastructure],
    uid: 'a1e91000-0006-4000-8000-00000000005c',
    body: `<p>The UK’s industrial decarbonisation strategy set a path for heavy industry clusters. Funding, planning and subsidy-control issues sit alongside the engineering.</p>
<p>Demo Out-Law note used on Hammad Akhtar and Sally Williamson insight rails.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-00000000005d',
    slug: '3d-printing-uk-product-safety-issues',
    nav: '3D printing product safety',
    title: '3D printing: UK product safety issues',
    kicker: 'OUT-LAW ANALYSIS',
    date: '21 September 2020',
    cat: CAT.analysis,
    tags: [TAG.technology],
    uid: 'a1e91000-0006-4000-8000-00000000005d',
    body: `<p>Additive manufacturing raises product-safety questions: who is the producer when a digital file is printed by a third party, and which regime applies?</p>
<p>Original demo analysis for the Pinsent people insight carousel.</p>`,
  },
  {
    id: 'a1e90030-0000-4000-8000-00000000005e',
    slug: '5g-potential-for-business-highlighted-in-uk-funding-programme',
    nav: '5G funding programme',
    title: '5G potential for business highlighted in UK funding programme',
    kicker: 'OUT-LAW NEWS',
    date: '18 January 2021',
    cat: CAT.news,
    tags: [TAG.technology],
    uid: 'a1e91000-0006-4000-8000-00000000005e',
    body: `<p>A UK funding programme highlighted 5G use-cases for business, from logistics to industrial sites. Public money brings subsidy-control and procurement conditions.</p>
<p>Demo Out-Law news item for Hammad and Sally insight carousels.</p>`,
  },
];

function articleYaml(item) {
  const url = `/out-law/news/${item.slug}`;
  return `---
ID: "${item.id}"
Parent: "${NEWS_FOLDER}"
Template: "${ARTICLE}"
Path: "/sitecore/content/legal/legal/Home/out-law/news/${item.slug}"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{${item.uid.toUpperCase()}}"
          p:before="*"
          s:id="{${NEWS_RENDERING.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-0007-4000-8000-000000000018}"
          s:ds="a1e90024-0000-4000-8000-000000000080"
          s:id="{A1E90001-1111-4000-8000-000000000018}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=8"
          s:ph="article-sidebar-1" />
        <r
          uid="{A1E91000-0007-4000-8000-000000000019}"
          s:ds="a1e90020-0000-4000-8000-000000000034"
          s:id="{A1E90001-1111-4000-8000-000000000004}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7BA1E90008-8888-4000-8000-000000000013%7D&amp;DynamicPlaceholderId=9"
          s:ph="article-sidebar-1" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${item.nav.replace(/"/g, '\\"')}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${item.title.replace(/"/g, '\\"')}"
    - ID: "${F_KICKER}"
      Hint: Kicker
      Value: "${item.kicker}"
    - ID: "${F_DATE}"
      Hint: PublishedDate
      Value: "${item.date}"
    - ID: "${F_READ}"
      Hint: ReadTime
      Value: "3 min read"
    - ID: "${F_SHORT}"
      Hint: ShortDescription
      Value: "${item.body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180)}"
    - ID: "${F_TAGS}"
      Hint: Tags
      Value: "${treelist(item.tags)}"
    - ID: "${F_CATS}"
      Hint: Categories
      Value: "${treelist([item.cat])}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${item.body.replace(/\n/g, '\n        ')}
`;
}

for (const item of ARTICLES) {
  write(newsYamlRel(item.slug), articleYaml(item));
}

function insightLink(title, href, pageId) {
  return `<link text="${title.replace(/"/g, '')}" linktype="internal" url="${href}" anchor="" target="" title="" class="" id="${pageId}" />`;
}

function insightYaml(id, parent, slug, name, kicker, title, date, href, pageId) {
  return `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_INSIGHT}"
Path: /sitecore/content/legal/legal/Data/People/${slug}/Insights/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${INS_KICKER}"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "${INS_TITLE}"
      Hint: Title
      Value: "${title.replace(/"/g, '\\"')}"
    - ID: "${INS_DATE}"
      Hint: Date
      Value: "${date}"
    - ID: "${INS_LINK}"
      Hint: Link
      Value: |
        ${insightLink(title, href, pageId)}
`;
}

const SALLY_FOLDER = 'a1e90022-0000-4000-8000-0000000000c0';
const SALLY_INS_FOLDER = 'a1e90022-0000-4000-8000-0000000000c1';
const SALLY_CIGA = 'a1e90022-0000-4000-8000-0000000000c2';
const INS_3D = 'a1e90022-0000-4000-8000-000000000037';
const INS_5G = 'a1e90022-0000-4000-8000-000000000038';
const DAWN_INS_FOLDER = 'a1e90022-0000-4000-8000-000000000030';

write(
  'serialized-content/legal/legal/Data/People/sally-williamson.yml',
  `---
ID: "${SALLY_FOLDER}"
Parent: "${DATA_PEOPLE}"
Template: "${T_DATA_FOLDER}"
Path: /sitecore/content/legal/legal/Data/People/sally-williamson
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);
write(
  'serialized-content/legal/legal/Data/People/sally-williamson/Insights.yml',
  `---
ID: "${SALLY_INS_FOLDER}"
Parent: "${SALLY_FOLDER}"
Template: "${T_DATA_FOLDER}"
Path: /sitecore/content/legal/legal/Data/People/sally-williamson/Insights
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Data/People/sally-williamson/Insights/ciga-guide.yml',
  insightYaml(
    SALLY_CIGA,
    SALLY_INS_FOLDER,
    'sally-williamson',
    'ciga-guide',
    'OUT-LAW GUIDE',
    'When UK suppliers must continue to supply insolvent companies',
    '6 March 2024',
    '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    GUIDE
  )
);

write(
  'serialized-content/legal/legal/Data/People/dawn-allen/Insights/3d-printing.yml',
  insightYaml(
    INS_3D,
    DAWN_INS_FOLDER,
    'dawn-allen',
    '3d-printing',
    'OUT-LAW ANALYSIS',
    '3D printing: UK product safety issues',
    '21 September 2020',
    '/out-law/news/3d-printing-uk-product-safety-issues',
    ARTICLES[6].id
  )
);
write(
  'serialized-content/legal/legal/Data/People/dawn-allen/Insights/5g-funding.yml',
  insightYaml(
    INS_5G,
    DAWN_INS_FOLDER,
    'dawn-allen',
    '5g-funding',
    'OUT-LAW NEWS',
    '5G potential for business highlighted in UK funding programme',
    '18 January 2021',
    '/out-law/news/5g-potential-for-business-highlighted-in-uk-funding-programme',
    ARTICLES[7].id
  )
);

const insightArticleByFile = [
  [
    'holiday-pay-part-year.yml',
    ARTICLES[0],
  ],
  ['pensions-disputes.yml', ARTICLES[1]],
  ['subsidy-control.yml', ARTICLES[2]],
  ['steps-of-court.yml', ARTICLES[3]],
  ['tax-avoidance.yml', ARTICLES[4]],
  ['industrial-decarbonisation.yml', ARTICLES[5]],
];

for (const [file, article] of insightArticleByFile) {
  const full = path.join(
    ROOT,
    `serialized-content/legal/legal/Data/People/dawn-allen/Insights/${file}`
  );
  let yaml = fs.readFileSync(full, 'utf8');
  yaml = yaml.replace(
    /url="\/out-law"/,
    `url="/out-law/news/${article.slug}"`
  );
  yaml = yaml.replace(
    /id="a1e90030-0000-4000-8000-000000000010"/,
    `id="${article.id}"`
  );
  fs.writeFileSync(full, yaml, 'utf8');
}

const hammadInsights = treelist([...DAWN_INSIGHTS, INS_3D, INS_5G]);
const sallyInsights = treelist([SALLY_CIGA, ...DAWN_INSIGHTS, INS_3D, INS_5G]);
const sallyRelated = treelist([PEOPLE.doogan, PEOPLE.dawn, PEOPLE.hammad, PEOPLE.bill]);

function upsertTrailingFields(slug, extras) {
  const full = path.join(ROOT, `serialized-content/legal/legal/Home/people/${slug}.yml`);
  let yaml = fs.readFileSync(full, 'utf8');
  for (const [id, hint, value] of extras) {
    const block = `    - ID: "${id}"\n      Hint: ${hint}\n      Value: "${value}"\n`;
    const re = new RegExp(
      `    - ID: "${id}"\\r?\\n      Hint: ${hint}\\r?\\n      Value: "[^"]*"\\r?\\n`
    );
    if (re.test(yaml)) {
      yaml = yaml.replace(re, block);
    } else {
      yaml = yaml.replace(/\s*$/, `\n${block}`);
    }
  }
  fs.writeFileSync(full, yaml, 'utf8');
}

upsertTrailingFields('hammad-akhtar', [[F_INSIGHTS, 'InsightItems', hammadInsights]]);
upsertTrailingFields('sally-williamson', [
  [F_INSIGHTS, 'InsightItems', sallyInsights],
  [F_RELATED, 'RelatedPeople', sallyRelated],
]);

console.log('Wrote specialism tags, articles, Hammad/Sally insights and related people.');
