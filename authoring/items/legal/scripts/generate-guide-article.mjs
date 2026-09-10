/**
 * CIGA Out-Law guide: ArticlePage + Select Authors (Sally Williamson, Dawn Allen),
 * tags, related work, newsletter. GUID prefix a1e900.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
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
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';
const PERSON_PAGE = 'a1e90010-0000-4000-8000-000000000030';
const PERSON_DESIGN = '{A1E90005-5555-4000-8000-000000000002}';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const ARTICLE_PAGE = 'a1e90010-0000-4000-8000-000000000040';
const ARTICLE_SECTION = 'a1e90010-0000-4000-8000-000000000041';
const PEOPLE = 'a1e90030-0000-4000-8000-000000000001';
const GUIDES = 'a1e90030-0000-4000-8000-000000000011';
const GUIDE = 'a1e90030-0000-4000-8000-000000000012';
const DAWN = 'a1e90030-0000-4000-8000-000000000002';
const SALLY = 'a1e90030-0000-4000-8000-00000000000c';
const TAGS_FOLDER = 'a8c4b183-b1df-4056-b8a2-663dded349de';
const TAG_TITLE = 'a1e90013-0000-4000-8000-000000000012';
const TAG_TPL = 'a1e90013-0000-4000-8000-000000000010';
const AUTHORS_FIELD = 'a1e90010-0000-4000-8000-00000000004a';
const NEWS_ARTICLE = 'A1E90001-1111-4000-8000-000000000011';
const RELATED_WORK = 'A1E90001-1111-4000-8000-00000000000A';
const OUTLAW_HOME = 'A1E90001-1111-4000-8000-00000000000D';
const PROMO = 'A1E90001-1111-4000-8000-000000000004';
const NEWSLETTER_DS = 'a1e90020-0000-4000-8000-000000000033';
const NEWSLETTER_VAR = 'A1E90008-8888-4000-8000-000000000011';
const WORK_PANEL = 'a1e90024-0000-4000-8000-000000000051';
const OUTLAW_DS = 'a1e90021-0000-4000-8000-000000000020';
const ARTICLE_LISTING = 'A1E90001-1111-4000-8000-000000000017';

const F = {
  ShortDescription: 'a1e90010-0000-4000-8000-000000000042',
  PublishedDate: 'a1e90010-0000-4000-8000-000000000044',
  ReadTime: 'a1e90010-0000-4000-8000-000000000045',
  Kicker: 'a1e90010-0000-4000-8000-000000000046',
  Tags: 'a1e90010-0000-4000-8000-000000000047',
  Categories: 'a1e90010-0000-4000-8000-000000000048',
  Photo: 'a1e90010-0000-4000-8000-000000000038',
  JobTitle: 'a1e90010-0000-4000-8000-000000000032',
  Phone: 'a1e90010-0000-4000-8000-000000000033',
  Email: 'a1e90010-0000-4000-8000-000000000034',
  Office: 'a1e90010-0000-4000-8000-000000000035',
  LinkedIn: 'a1e90010-0000-4000-8000-000000000036',
  Biography: 'a1e90010-0000-4000-8000-000000000037',
  Specialisms: 'a1e90010-0000-4000-8000-000000000039',
};

const EXTRA_TAGS = [
  ['a1e90024-0000-4000-8000-000000000028', 'corporate', 'Corporate'],
  ['a1e90024-0000-4000-8000-000000000029', 'financial-services', 'Financial Services'],
  ['a1e90024-0000-4000-8000-00000000002a', 'real-estate', 'Real Estate'],
  ['a1e90024-0000-4000-8000-00000000002b', 'risk-management', 'Risk Management & Contract Advice'],
  ['a1e90024-0000-4000-8000-00000000002c', 'supply-goods-services', 'Supply of goods & services'],
  ['a1e90024-0000-4000-8000-00000000002d', 'technology', 'Technology, Science & Industry'],
  ['a1e90024-0000-4000-8000-00000000002e', 'united-kingdom', 'United Kingdom'],
];

const GUIDE_TAGS = [
  'a1e90024-0000-4000-8000-000000000028',
  'a1e90024-0000-4000-8000-000000000029',
  'a1e90024-0000-4000-8000-000000000024',
  'a1e90024-0000-4000-8000-00000000002a',
  'a1e90024-0000-4000-8000-000000000022',
  'a1e90024-0000-4000-8000-00000000002b',
  'a1e90024-0000-4000-8000-00000000002c',
  'a1e90024-0000-4000-8000-00000000002d',
  'a1e90024-0000-4000-8000-00000000002e',
];

const GUIDE_CAT = 'a1e90024-0000-4000-8000-000000000014';

const BODY = `<p>In a challenging economic environment, it is common to see an increase in company insolvencies. In the UK, there are rules in place that require suppliers to insolvent companies to continue to supply those businesses.</p>
<p>Suppliers need to understand when they must continue supply, on what terms, and what they can they do to protect themselves.</p>
<h2>The origins of today’s essential supplier regime in insolvency</h2>
<p>The essential supplier regime in insolvency, which sets out when and on what terms a supplier must continue to supply a customer in an insolvency process, can be found in sections 233, 233A and 233B of the Insolvency Act 1986.</p>
<p>The rules were originally enacted to prevent utility suppliers, who held monopoly positions at that time, from holding insolvent companies to ransom. Before 1986, utility suppliers were able to demand that pre-insolvency arrears were repaid as a condition of ongoing supply, as the insolvent company could not source the supply from anywhere else, leaving the utility companies in better positions than other creditors in the insolvency. The 1986 Act ended that practice.</p>
<p>In 2015, the regime was extended to ensure that IT services also continued to be provided in insolvency. The regime was further expanded in 2020 with the Corporate Insolvency and Governance Act (CIGA) and now encompasses most supply contracts, other than those relating to the provision of financial services.</p>
<p>Despite the regime being in place for almost 40 years, and the recent expansions, disputes which lead to court proceedings in this area are rare. Suppliers in this area can, therefore, take comfort in the fact that commercially sensible deals can be struck with office holders.</p>
<h2>When does a supplier need to continue to supply and on what terms?</h2>
<p>There are three strands to the essential supplier regime in insolvency in the UK. Which one applies will depend on the nature of the supply and the insolvency process the customer has entered into.</p>
<h3>The section 233 regime</h3>
<p>Section 233 covers the supply of utilities, communications and supplies by a person who carries on business for the purpose of enabling or facilitating anything done by “electronic means” – together, ‘essential supplies’ – to a customer who is in administration, has an administrative receiver, liquidator or provisional liquidator appointed or is subject to a company voluntary arrangement (CVA).</p>
<p>Things done by “electronic means” has a wide definition, drafted with a view to future proofing the legislation to capture technological advances. The definition includes computer hardware and software, technical IT assistance, data storage and processing and website hosting.</p>
<p>Under s233, the supplier cannot make it a condition of post-insolvency supply that pre-insolvency arrears are paid, but may make it a condition of continued supply that the office holder personally guarantees the post-insolvency charges.</p>
<h3>Section 233A</h3>
<p>Section 233A only applies where the customer is in administration or subject to a CVA – the rationale being that these are rescue procedures so the companies will benefit from short term enhanced supplier obligations to aid that rescue.</p>
<p>Under s233A, insolvency related terms and “any other thing” that would happen because the customer has entered an insolvency process in contracts for the supply of essential supplies cease to have effect. The contract may be terminated with the consent of the office holder or the court, which will apply a test of whether the supplier is suffering from “hardship”, or if post-insolvency charges are not paid within 28 days of falling due. The supply may be terminated if a personal guarantee for post-appointment supplies is not given within 14 days of being requested. The ban on “any other thing” occurring because of insolvency would include, for example, a prohibition on price increases or altered payment terms once the customer enters an insolvency process.</p>
<h3>Section 233B</h3>
<p>Section 233B is a “mop up” provision which applies in all corporate insolvency proceedings – administration, administrative receivership, liquidation and where the customer is subject to a part A1 moratorium, part 26A restructuring plan or CVA – and to all contracts for the “supply of goods or services”, unless excluded. The exclusions mainly cover financial services contracts.</p>
<p>Under s233B, the right to exercise termination clauses – also called “ipso facto” clauses – or do “any other thing” because the contractual counterparty is subject to an insolvency process, is unenforceable and pre-insolvency termination rights cannot be exercised. The contract may be ended with the permission of the office holder or the court, or the company in a moratorium, CVA or restructuring plan, or if new rights of termination arise post-insolvency. There is no right to ask the office holder for a personal guarantee, however the cost of post-insolvency supplies will ordinarily rank as an expense of the insolvency process, meaning that they will get paid in priority to ordinary creditors.</p>
<h2>What should suppliers do if their customer enters an insolvency process?</h2>
<p>The prospect of continuing to supply an insolvent customer may be initially unappealing, especially if that customer already owes significant amounts of money for pre-insolvency supplies. However, the regime was not intended to leave suppliers out of pocket to protect insolvent companies. Examples of suppliers having to supply for extended periods against their will are unusual, and it is rare for suppliers not to get paid for post-insolvency supply; they are usually protected by a personal guarantee or paid as an insolvency expense.</p>
<p>When suppliers find out their customer is insolvent, they should:</p>
<ul>
<li>Find out where in the insolvency process the customer is. If the customer has not yet entered formal insolvency, suppliers should act quickly to terminate the supply contract if the terms allow. Signs of impending financial difficulties can include late or non-payment of invoices, redundancies and informal restructuring programmes, high turnover of staff, especially at a senior level, press reports and market gossip.</li>
<li>Work out which regime the supplier will fall into. As set out above, the definition of IT suppliers is extremely wide and it can be difficult to work out whether the contract is in scope of the essential supplier insolvency regime. Equally, it is unclear whether the wide definition of “contracts for the supply of goods and services” encompasses agreements such as licences or leases, or contracts where only part of the obligation is a supply of goods and services. Although the ability to terminate may be limited for suppliers of essential supplies, the supplier will be entitled to a personal guarantee from the office holder, which puts them in a strong position.</li>
<li>Engage with the office holder and any potential buyer of the business. Office holders are ordinarily looking for a short-term supply until a sale or rescue of the business can be achieved or until there is an orderly wind-down. Where the post-insolvency supply is not covered by a personal guarantee from the office holder, the supplier should investigate how the insolvent company intends to pay for the supply: it may be that the funds are expected from a sale of the business or via funding agreements from secured creditors. In a pre-pack situation, where the business and assets of the customer have been sold immediately upon the customer entering an insolvency process, it is debatable whether the Insolvency Act protections extend to supplying the business during the transition.</li>
<li>Look for new termination events. If the contract falls within the “mop up” provisions of s233B, as set out above, the contract can be terminated for new defaults which arise post-insolvency if the contract permits.</li>
</ul>`;

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function treelist(ids) {
  return ids.map((id) => `{${id.toUpperCase()}}`).join('|');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260910T151500Z
`;
}

const sallyPhotoPath = path.join(__dirname, 'media-maps', 'sally-williamson-dam.json');
let sallyPhotoXml = '';
if (fs.existsSync(sallyPhotoPath)) {
  const dam = JSON.parse(fs.readFileSync(sallyPhotoPath, 'utf8'));
  if (dam.src && dam.damId) {
    sallyPhotoXml = `<Image src="${dam.src}" dam-id="${dam.damId}" alt="sally-williamson" dam-content-type="Image" />`;
  }
}

write(
  'serialized-content/article-page-template/ArticlePage/Article/Authors.yml',
  `---
ID: "${AUTHORS_FIELD}"
Parent: "${ARTICLE_SECTION}"
Template: "${T_FIELD}"
Path: "/sitecore/templates/Project/legal/ArticlePage/Article/Authors"
SharedFields:
- ID: "${F_SOURCE}"
  Hint: Source
  Value: "/sitecore/content/legal/legal/Home/people"
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Treelist"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 220
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: "Select Authors"
  Versions:
  - Version: 1
    Fields:
${created()}`
);

for (const [id, slug, title] of EXTRA_TAGS) {
  write(
    `serialized-content/legal/legal/Data/Tags/${slug}.yml`,
    `---
ID: "${id}"
Parent: "${TAGS_FOLDER}"
Template: "${TAG_TPL}"
Path: /sitecore/content/legal/legal/Data/Tags/${slug}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${TAG_TITLE}"
      Hint: Title
      Value: "${title}"
`
  );
}

const sallyPhotoField = sallyPhotoXml
  ? `    - ID: "${F.Photo}"
      Hint: Photo
      Value: |
        ${sallyPhotoXml}
`
  : '';

write(
  'serialized-content/legal/legal/Home/people/sally-williamson.yml',
  `---
ID: "${SALLY}"
Parent: "${PEOPLE}"
Template: "${PERSON_PAGE}"
Path: /sitecore/content/legal/legal/Home/people/sally-williamson
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PERSON_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${sallyPhotoField}${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "Sally Williamson"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "Sally Williamson"
    - ID: "${F.JobTitle}"
      Hint: JobTitle
      Value: "Managing Senior Practice Development Lawyer"
    - ID: "${F.Phone}"
      Hint: Phone
      Value: "+44 (0) 7393 761 964"
    - ID: "${F.Email}"
      Hint: Email
      Value: "sally.williamson@pinsentmasons.com"
    - ID: "${F.Office}"
      Hint: Office
      Value: "United Kingdom"
    - ID: "${F.LinkedIn}"
      Hint: LinkedIn
      Value: ""
    - ID: "${F.Biography}"
      Hint: Biography
      Value: |
        <p>Sally is a Managing Senior Practice Development Lawyer specialising in restructuring and insolvency.</p>
        <p>Sally is responsible for delivering training, monitoring market developments, sharing knowledge and developing best practices and resources for both external clients and lawyers in the national team and supporting business development and growth. Sally previously practiced as a solicitor at an international law firm advising financial institutions and insolvency practitioners in a wide variety of non-contentious and contentious restructuring, recoveries and insolvency work.</p>
    - ID: "${F.Specialisms}"
      Hint: Specialisms
      Value: |
        <ul><li>Restructuring</li><li>Insolvency</li></ul>
`
);

write(
  'serialized-content/legal/57FCA1DFB479E432/when-uk-suppliers-must-continue-to-supply-insolvent-companies.yml',
  `---
ID: "${GUIDE}"
Parent: "${GUIDES}"
Template: "${ARTICLE_PAGE}"
Path: "/sitecore/content/legal/legal/Home/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies"
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
          uid="{A1E91000-0004-4000-8000-000000000002}"
          p:before="*"
          s:id="{${NEWS_ARTICLE}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-0004-4000-8000-000000000004}"
          s:ds="${OUTLAW_DS}"
          s:id="{${OUTLAW_HOME}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-0004-4000-8000-000000000003}"
          s:ds="${NEWSLETTER_DS}"
          s:id="{${PROMO}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${NEWSLETTER_VAR}%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />
        <r
          uid="{A1E91000-000A-4000-8000-000000000012}"
          s:ds="${WORK_PANEL}"
          s:id="{${RELATED_WORK}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: When UK suppliers must continue to supply insolvent companies
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: When UK suppliers must continue to supply insolvent companies
    - ID: "${F.Kicker}"
      Hint: Kicker
      Value: "OUT-LAW GUIDE"
    - ID: "${F.PublishedDate}"
      Hint: PublishedDate
      Value: "06 Mar 2024"
    - ID: "${F.ReadTime}"
      Hint: ReadTime
      Value: "5 min. read"
    - ID: "${F.ShortDescription}"
      Hint: ShortDescription
      Value: "In the UK, suppliers to insolvent companies can be required to continue supply. This guide explains sections 233, 233A and 233B of the Insolvency Act 1986 and CIGA."
    - ID: "${F.Tags}"
      Hint: Tags
      Value: "${treelist(GUIDE_TAGS)}"
    - ID: "${F.Categories}"
      Hint: Categories
      Value: "${treelist([GUIDE_CAT])}"
    - ID: "${AUTHORS_FIELD}"
      Hint: Authors
      Value: "${treelist([SALLY, DAWN])}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${BODY.replace(/\n/g, '\n        ')}
`
);

const guidesPath = path.join(ROOT, 'serialized-content/legal/legal/Home/out-law/guides.yml');
let guides = fs.readFileSync(guidesPath, 'utf8');
if (!guides.includes(F_MASTERS)) {
  guides = guides.replace(
    'SharedFields:\n',
    `SharedFields:\n- ID: "${F_MASTERS}"\n  Hint: __Masters\n  Value: "{${ARTICLE_PAGE.toUpperCase()}}"\n`
  );
  fs.writeFileSync(guidesPath, guides, 'utf8');
}

const pinsentPath = path.join(
  ROOT,
  'serialized-content/legal/legal/Presentation/Available Renderings/Pinsent.yml'
);
let pinsent = fs.readFileSync(pinsentPath, 'utf8');
if (!pinsent.includes(ARTICLE_LISTING)) {
  pinsent = pinsent.replace(
    '{A1E90001-1111-4000-8000-000000000016}',
    `{A1E90001-1111-4000-8000-000000000016}\n    {${ARTICLE_LISTING}}`
  );
  fs.writeFileSync(pinsentPath, pinsent, 'utf8');
}

function fixTreelistBlocks(dir) {
  const walk = (folder) => {
    for (const name of fs.readdirSync(folder)) {
      const full = path.join(folder, name);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
        continue;
      }
      if (!name.endsWith('.yml')) continue;
      let text = fs.readFileSync(full, 'utf8');
      const next = text
        .replace(
          /Hint: (Tags|Categories|Items)\r?\n      Value: \|\r?\n((?:    \{[A-F0-9-]+\}\r?\n?)+)/g,
          (_m, hint, block) => {
            const ids = [...block.matchAll(/\{[A-F0-9-]+\}/g)].map((row) => row[0]);
            return `Hint: ${hint}\n      Value: "${ids.join('|')}"\n`;
          }
        )
        .replace(/\r?\n- ID: "1172f643-ae13-4102-937a-a89d32bdf9c1"\r?\n  Hint: __Masters\r?\n  Value: \r?\n/g, '\n');
      if (next !== text) {
        fs.writeFileSync(full, next, 'utf8');
      }
    }
  };
  walk(dir);
}

fixTreelistBlocks(path.join(ROOT, 'serialized-content'));

const relatedWork = path.join(
  ROOT,
  'serialized-content/legal/legal/Data/RelatedWork/Related Work.yml'
);
if (fs.existsSync(relatedWork)) {
  let yaml = fs.readFileSync(relatedWork, 'utf8');
  yaml = yaml.replace(
    /Hint: Items\n      Value: \|\n(?:    \{[A-F0-9-]+\}\n?)+/,
    `Hint: Items\n      Value: "${treelist(['a1e90024-0000-4000-8000-000000000041', 'a1e90024-0000-4000-8000-000000000042', 'a1e90024-0000-4000-8000-000000000043', 'a1e90024-0000-4000-8000-000000000044'])}"\n`
  );
  fs.writeFileSync(relatedWork, yaml, 'utf8');
}

console.log(
  sallyPhotoXml
    ? 'Wrote CIGA guide, Sally Williamson, extra tags, Select Authors (photo attached).'
    : 'Wrote CIGA guide, Sally Williamson, extra tags, Select Authors. Upload sally-williamson.png to DAM next.'
);