/**
 * Openhand home Promos, PromoGrid treelist, Article Image, extra articles, OOTB on headless-main.
 * GUID prefix 0e0a. Do not re-run generate-nonprofit-site.mjs.
 * Run: node scripts/generate-nonprofit-home-promos.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_DS_TMPL = '1a7c85e5-dc0b-490d-9187-bb1dbcb4c72f';
const F_DS_LOC = 'b5b27af1-25ef-405c-87ce-369b3a004016';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '96b71ea7-4d37-4a3a-9e11-2bb76ef03acd';
const F_PAGE_CONTENT = '53f49d04-a3f6-4f75-bc6e-3e7db6e80e93';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const PARAM_HERO = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const PAGE_DESIGN = '{0E0A0005-5555-4000-8000-000000000001}';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const JSS_LAYOUT = '{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}';
const REND_FOLDER = '80cc7671-ba23-46a5-b4a0-65e76cb7a102';
const GET_HELP = '0e0a0030-0000-4000-8000-000000000001';
const ARTICLE_PAGE = '0e0a0014-0000-4000-8000-000000000040';
const ARTICLE_SECTION = '0e0a0014-0000-4000-8000-000000000041';
const ARTICLE_IMAGE = '0e0a0014-0000-4000-8000-000000000043';
const SHORT = '0e0a0014-0000-4000-8000-000000000042';
const SUMMARY = '0e0a0014-0000-4000-8000-00000000004b';
const PUBLISHED = '0e0a0014-0000-4000-8000-000000000044';
const READTIME = '0e0a0014-0000-4000-8000-000000000045';
const KICKER = '0e0a0014-0000-4000-8000-000000000046';
const AUTHORS = '0e0a0014-0000-4000-8000-00000000004a';
const JORDAN = '0e0a0030-0000-4000-8000-000000000071';
const ELERI = '0e0a0030-0000-4000-8000-000000000072';
const SAM = '0e0a0030-0000-4000-8000-000000000073';
const R_ADVICE = '0e0a0001-1111-4000-8000-000000000006';
const R_PROMO = '0e0a0001-1111-4000-8000-000000000016';
const R_PROMOGRID = '0e0a0001-1111-4000-8000-000000000004';
const R_HERO = '0e0a0001-1111-4000-8000-000000000003';
const V_LEFT = '0e0a0008-8888-4000-8000-000000000010';
const V_RIGHT = '0e0a0008-8888-4000-8000-000000000011';
const V_NEWS = '0e0a0008-8888-4000-8000-000000000012';
const HV_PROMO = '47f196cb-70ce-42ae-a4e6-1d07c9713b24';
const PROMOS_FOLDER = 'd0f375f6-0fe4-4592-9ab4-8dc34705fbb7';
const DS_HERO = '0e0a0020-0000-4000-8000-000000000011';
const DS_GRID = '0e0a0020-0000-4000-8000-000000000031';
const HERO_IMAGE = '0e0a0010-0000-4000-8000-000000000015';
const GRID_PROMOS = '0e0a0011-0000-4000-8000-000000000006';
const GRID_HEADING = '0e0a0011-0000-4000-8000-000000000004';
const GRID_INTRO = '0e0a0011-0000-4000-8000-000000000005';
const GRID_DATA = '0e0a0011-0000-4000-8000-000000000003';
const PROMO_IMG = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
const PROMO_LINK = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const PROMO_SUB = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';
const PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const PAGE_DONATE = '0e0a0030-0000-4000-8000-000000000030';
const PAGE_HELP = '0e0a0030-0000-4000-8000-000000000001';
const PAGE_PARTNER = '0e0a0030-0000-4000-8000-000000000011';
const PAGE_STORIES = '0e0a0030-0000-4000-8000-000000000050';
const P_ENERGY = '0e0a0030-0000-4000-8000-000000000002';
const P_RENT = '0e0a0030-0000-4000-8000-000000000003';
const P_FOOD = '0e0a0030-0000-4000-8000-000000000004';
const P_TAX = '0e0a0030-0000-4000-8000-000000000080';
const P_UC = '0e0a0030-0000-4000-8000-000000000081';
const DS_GIVE = '0e0a0020-0000-4000-8000-000000000050';
const DS_HELP = '0e0a0020-0000-4000-8000-000000000051';
const DS_NEWS = '0e0a0020-0000-4000-8000-000000000052';
const DS_CARD_ADVICE = '0e0a0020-0000-4000-8000-000000000053';
const DS_CARD_PARTNER = '0e0a0020-0000-4000-8000-000000000054';
const DS_CARD_STORY = '0e0a0020-0000-4000-8000-000000000055';

const OOTB = [
  '{8D0D2946-15A4-41A5-9693-4AA5AA618A5D}',
  '{54736952-4B58-41FD-8554-12AC738B0AF2}',
  '{118563A1-16D5-49CA-9CA4-1423DEEB6AFF}',
  '{53A5281D-CB88-40E8-9E25-86CFFC5809E4}',
  '{57BF3952-CACB-452C-88B3-5637A2CDFCA2}',
  '{C5F905F8-FD1F-444E-A9E5-AC6B774FF0DE}',
  '{2492BAC4-DA07-4C86-87F0-9873D40E2276}',
  '{9C6D53E3-FE57-4638-AF7B-6D68304C7A94}',
  '{3836D951-BB14-43AC-9231-649B7F245DC5}',
  '{7A1D9A21-B8D7-42F9-9B0B-92ABF8D1974F}',
  '{15CABDFF-FFD9-48F4-826D-A4C3D7868D3A}',
  '{5F6BF7C9-C80C-4BBD-AD78-8DA749B35206}',
  '{AB2EDBA0-3960-4F12-B765-579DC231894A}',
  '{1DEB067F-0BB1-405E-94F5-2ABB537A6160}',
  '{0E0A0001-1111-4000-8000-000000000016}',
];

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260916T080000Z
`;
}

function u(id) {
  return `{${String(id).toUpperCase()}}`;
}

function loadImageMap() {
  const jsonPath = path.join(__dirname, 'media-maps', 'nonprofit-image-xml.json');
  if (fs.existsSync(jsonPath)) {
    try {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch {
      /* fall through */
    }
  }
  const csv = path.join(__dirname, 'media-maps', 'nonprofit-sitecore-image-field-map.csv');
  const map = {};
  if (!fs.existsSync(csv)) return map;
  const lines = fs.readFileSync(csv, 'utf8').split(/\r?\n/).slice(1);
  for (const line of lines) {
    if (!line.trim()) continue;
    const xmlMatch = line.match(/"(<Image [^"]+>)"\s*$/) || line.match(/"(<Image [\s\S]+>)"$/);
    const fileMatch = line.match(/^"([^"]+)"/);
    if (fileMatch && line.includes('<Image')) {
      const start = line.indexOf('<Image');
      const end = line.lastIndexOf('/>');
      if (start >= 0 && end > start) {
        map[fileMatch[1]] = line.slice(start, end + 2).replace(/""/g, '"');
      }
    } else if (xmlMatch && fileMatch) {
      map[fileMatch[1]] = xmlMatch[1].replace(/""/g, '"');
    }
  }
  return map;
}

const images = loadImageMap();

function imageXml(file, alt) {
  const raw = images[file];
  if (raw) {
    return raw.replace(/alt="[^"]*"/, `alt="${alt}"`);
  }
  return '';
}

function imageFieldYaml(fieldId, hint, file, alt) {
  const xml = imageXml(file, alt);
  if (!xml) return '';
  return `    - ID: "${fieldId}"
      Hint: ${hint}
      Value: |
        ${xml}
`;
}

function sharedImageYaml(fieldId, hint, file, alt) {
  const xml = imageXml(file, alt);
  if (!xml) return '';
  return `- ID: "${fieldId}"
  Hint: ${hint}
  Value: |
    ${xml}
`;
}

write(
  'serialized-content/renderings/nonprofit/Promo.yml',
  `---
ID: "${R_PROMO}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/nonprofit/Promo
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: Promo
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_DS_TMPL}"
  Hint: Datasource Template
  Value: /sitecore/templates/Feature/JSS Experience Accelerator/Page Content/Promo
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM_HERO}"
- ID: "${F_DS_LOC}"
  Hint: Datasource Location
  Value: "query:$site/*[@@name='Data']/*[@@templatename='Promo Folder']|query:$sharedSites/*[@@name='Data']/*[@@templatename='Promo Folder']"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

function variantYaml(id, name) {
  return `---
ID: "${id}"
Parent: "${HV_PROMO}"
Template: "${T_VARIANT}"
Path: /sitecore/content/nonprofit/nonprofit/Presentation/Headless Variants/Promo/${name}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

write('serialized-content/nonprofit/nonprofit/Presentation/Headless Variants/Promo/ImageLeft.yml', variantYaml(V_LEFT, 'ImageLeft'));
write('serialized-content/nonprofit/nonprofit/Presentation/Headless Variants/Promo/ImageRight.yml', variantYaml(V_RIGHT, 'ImageRight'));
write('serialized-content/nonprofit/nonprofit/Presentation/Headless Variants/Promo/Newsletter.yml', variantYaml(V_NEWS, 'Newsletter'));

function promoItem(id, name, file, alt, subtitle, title, desc, linkText, linkId, linkUrl) {
  const img = sharedImageYaml(PROMO_IMG, 'PromoImageOne', file, alt);
  return `---
ID: "${id}"
Parent: "${PROMOS_FOLDER}"
Template: "${T_PROMO}"
Path: /sitecore/content/nonprofit/nonprofit/Data/Promos/${name}
${img ? `SharedFields:\n${img}` : ''}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${PROMO_LINK}"
      Hint: PromoMoreInfo
      Value: |
        <link text="${linkText}" linktype="internal" url="${linkUrl}" anchor="" target="" title="" class="" id="${linkId}" />
    - ID: "${PROMO_DESC}"
      Hint: PromoDescription
      Value: ${desc}
    - ID: "${PROMO_SUB}"
      Hint: PromoSubTitle
      Value: ${subtitle}
    - ID: "${PROMO_TITLE}"
      Hint: PromoTitle
      Value: ${title}
`;
}

write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Give.yml',
  promoItem(
    DS_GIVE,
    'Give',
    'promo-1.jpg',
    'oh-give',
    'Give',
    'Keep the heating on this winter',
    '<p>Match your gift this month. Partners in Leeds, Birmingham and Cardiff are already taking energy and rent cases today.</p>',
    'Donate now',
    PAGE_DONATE,
    '/donate'
  )
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Get Help.yml',
  promoItem(
    DS_HELP,
    'Get Help',
    'promo-2.jpg',
    'oh-get-help',
    'Get help',
    'Advice for energy, rent and food',
    '<p>Practical steps written for people in crisis — and for the crawlers that cite them. Find a partner hub near you.</p>',
    'Find help',
    PAGE_HELP,
    '/get-help'
  )
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Newsletter.yml',
  promoItem(
    DS_NEWS,
    'Newsletter',
    'promo-3.jpg',
    'oh-newsletter',
    'Stay in touch',
    'Crisis updates in one email',
    '<p>Winter appeal totals, new partner hubs, and the next fair-energy action — once a month, no fundraising barrage.</p>',
    'Sign up',
    PAGE_DONATE,
    '/donate'
  )
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Advice.yml',
  promoItem(
    DS_CARD_ADVICE,
    'Advice',
    'story-2.jpg',
    'oh-advice',
    'Advice',
    'Get help with bills, rent and food',
    '<p>Energy, rent and food pages written for people in crisis.</p>',
    'Read advice',
    PAGE_HELP,
    '/get-help'
  )
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Partner.yml',
  promoItem(
    DS_CARD_PARTNER,
    'Partner',
    'partner-1.jpg',
    'oh-partner',
    'In your area',
    'Northgate Community Hub',
    '<p>Leeds energy and rent cases in the same room — Jordan Hale still takes the first appointment of the day.</p>',
    'Visit Northgate',
    PAGE_PARTNER,
    '/partners/northgate-community-hub'
  )
);
write(
  'serialized-content/nonprofit/nonprofit/Data/Promos/Story.yml',
  promoItem(
    DS_CARD_STORY,
    'Story',
    'story-1.jpg',
    'oh-story',
    'Stories',
    'The meter went dark in January',
    '<p>A prepayment meter and a broken boiler. Northgate sat with Maria on the supplier call the same afternoon.</p>',
    'Read Maria’s story',
    PAGE_STORIES,
    '/stories'
  )
);

write(
  'serialized-content/templates/nonprofit/PromoGrid Templates/PromoGrid/Data/Promos.yml',
  `---
ID: "${GRID_PROMOS}"
Parent: "${GRID_DATA}"
Template: "${F_FIELD}"
Path: "/sitecore/templates/Project/nonprofit/PromoGrid Templates/PromoGrid/Data/Promos"
SharedFields:
- ID: "${F_SOURCE}"
  Hint: Source
  Value: "/sitecore/content/nonprofit/nonprofit/Data/Promos"
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Treelist"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 300
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: "Select Promos"
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/templates/nonprofit/ArticlePage/Article/Image.yml',
  `---
ID: "${ARTICLE_IMAGE}"
Parent: "${ARTICLE_SECTION}"
Template: "${F_FIELD}"
Path: "/sitecore/templates/Project/nonprofit/ArticlePage/Article/Image"
SharedFields:
- ID: "${F_TYPE}"
  Hint: Type
  Value: "Image"
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 150
Languages:
- Language: en
  Fields:
  - ID: "${F_TITLE}"
    Hint: Title
    Value: Image
  Versions:
  - Version: 1
    Fields:
${created()}`
);

function articleYaml(id, file, uid, title, nav, date, author, summary, body, imageFile) {
  const img = imageFieldYaml(ARTICLE_IMAGE, 'Image', imageFile, title);
  return `---
ID: "${id}"
Parent: "${GET_HELP}"
Template: "${ARTICLE_PAGE}"
Path: /sitecore/content/nonprofit/nonprofit/Home/get-help/${file}
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
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{${uid.toUpperCase()}}"
          p:before="*"
          s:id="{${R_ADVICE.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
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
      Value: "${nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${KICKER}"
      Hint: Kicker
      Value: "Advice"
    - ID: "${PUBLISHED}"
      Hint: PublishedDate
      Value: "${date}"
    - ID: "${READTIME}"
      Hint: ReadTime
      Value: "4 min. read"
    - ID: "${SHORT}"
      Hint: ShortDescription
      Value: "${summary}"
    - ID: "${SUMMARY}"
      Hint: Summary
      Value: "${summary}"
    - ID: "${AUTHORS}"
      Hint: Authors
      Value: "${u(author)}"
${img}    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${body.replace(/\n/g, '\n        ')}
`;
}

const extraArticles = [
  {
    id: P_TAX,
    file: 'help-with-council-tax',
    uid: '0e0a1000-0002-4000-8000-000000000014',
    title: 'Help with council tax',
    nav: 'Council tax',
    date: '14 September 2026',
    author: JORDAN,
    image: 'story-3.jpg',
    summary:
      'Council tax support sits with your local authority, not DWP. This page covers reduction schemes, recovery letters, and when a partner should call the council with you.',
    body: `<p>A council tax reminder is not a court summons. Bring the letter to a partner the same week — recovery moves faster than rent arrears in some authorities.</p>
<p>Ask for a reduction under the local Council Tax Support scheme before you agree a repayment plan. Northgate completes that form with you.</p>
<p>If bailiffs are already instructed, say so at reception. Partners can still request a hold while support is assessed.</p>
<p>Keep bank statements for the last month. Advisers use those to evidence that a lump-sum clearance is not realistic.</p>`,
  },
  {
    id: P_UC,
    file: 'applying-for-universal-credit',
    uid: '0e0a1000-0002-4000-8000-000000000015',
    title: 'Applying for Universal Credit',
    nav: 'Universal Credit',
    date: '10 September 2026',
    author: ELERI,
    image: 'appeal-winter.jpg',
    summary:
      'The first five weeks of Universal Credit are the hardest. This page lists what to bring, how advances work, and when a partner should sit with you on the journal.',
    body: `<p>You can start a Universal Credit claim online. If you cannot, a partner can book a supported claim at the jobcentre or complete it with you in the hub.</p>
<p>An advance is a loan against your first payment. Take it if rent is due before the first UC date — then ask the adviser to set a repayment you can keep.</p>
<p>Upload ID, a tenancy, and a bank statement on day one. Missing documents are the most common reason a claim stalls.</p>
<p>If you have a limited capability for work, tell the adviser. That changes the work-search requirements and can unlock a different element.</p>`,
  },
];

for (const article of extraArticles) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/get-help/${article.file}.yml`,
    articleYaml(
      article.id,
      article.file,
      article.uid,
      article.title,
      article.nav,
      article.date,
      article.author,
      article.summary,
      article.body,
      article.image
    )
  );
}

function patch(rel, mutate) {
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  const next = mutate(yaml);
  if (next !== yaml) fs.writeFileSync(full, next, 'utf8');
}

function injectVersionImage(yaml, file, alt) {
  const xml = imageXml(file, alt);
  if (!xml || yaml.includes(`Hint: Image\n`)) return yaml;
  return yaml.replace(
    `    - ID: "${F_PAGE_CONTENT}"`,
    `    - ID: "${ARTICLE_IMAGE}"
      Hint: Image
      Value: |
        ${xml}
    - ID: "${F_PAGE_CONTENT}"`
  );
}

patch('serialized-content/nonprofit/nonprofit/Home/get-help/help-with-energy-bills.yml', (yaml) =>
  injectVersionImage(yaml, 'promo-1.jpg', 'Help with energy bills')
);
patch(
  'serialized-content/nonprofit/nonprofit/Home/get-help/what-to-do-if-you-cannot-pay-your-rent.yml',
  (yaml) => injectVersionImage(yaml, 'promo-2.jpg', 'What to do if you cannot pay your rent')
);
patch('serialized-content/nonprofit/nonprofit/Home/get-help/emergency-help-with-food.yml', (yaml) =>
  injectVersionImage(yaml, 'story-2.jpg', 'Emergency help with food')
);

patch('serialized-content/nonprofit/nonprofit/Data/PromoGrids/Home.yml', (yaml) => {
  if (yaml.includes(GRID_PROMOS)) return yaml;
  return yaml.replace(
    `    - ID: "${GRID_INTRO}"
      Hint: Intro
      Value: What we do
`,
    `    - ID: "${GRID_INTRO}"
      Hint: Intro
      Value: What we do
    - ID: "${GRID_PROMOS}"
      Hint: Promos
      Value: |
        ${u(DS_CARD_ADVICE)}
        ${u(DS_CARD_PARTNER)}
        ${u(DS_CARD_STORY)}
`
  );
});

patch('serialized-content/nonprofit/nonprofit/Data/HomeHeros/Home.yml', (yaml) => {
  const xml = imageXml('hero-give.jpg', 'Openhand home hero');
  if (!xml || yaml.includes(HERO_IMAGE)) return yaml;
  return yaml.replace(
    `    - ID: "0e0a0010-0000-4000-8000-000000000014"
      Hint: Description`,
    `    - ID: "${HERO_IMAGE}"
      Hint: Image
      Value: |
        ${xml}
    - ID: "0e0a0010-0000-4000-8000-000000000014"
      Hint: Description`
  );
});

patch('serialized-content/nonprofit/nonprofit/Data/AdviceLandings/Get Help.yml', (yaml) =>
  yaml.replace(
    'no photography, no campaign chrome.',
    'dummy photography is allowed on these demo pages.'
  )
);

const homeRenderings = `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{0E0A1000-0001-4000-8000-000000000001}"
          p:before="*"
          s:ds="${DS_HERO}"
          s:id="{${R_HERO.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
        <r
          uid="{0E0A1000-0001-4000-8000-000000000002}"
          p:after="r[@uid='{0E0A1000-0001-4000-8000-000000000001}']"
          s:ds="${DS_GRID}"
          s:id="{${R_PROMOGRID.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=2"
          s:ph="headless-main" />
        <r
          uid="{0E0A1000-0001-4000-8000-000000000003}"
          p:after="r[@uid='{0E0A1000-0001-4000-8000-000000000002}']"
          s:ds="${DS_GIVE}"
          s:id="{${R_PROMO.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${V_LEFT.toUpperCase()}%7D&amp;DynamicPlaceholderId=3"
          s:ph="headless-main" />
        <r
          uid="{0E0A1000-0001-4000-8000-000000000004}"
          p:after="r[@uid='{0E0A1000-0001-4000-8000-000000000003}']"
          s:ds="${DS_HELP}"
          s:id="{${R_PROMO.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${V_RIGHT.toUpperCase()}%7D&amp;DynamicPlaceholderId=4"
          s:ph="headless-main" />
        <r
          uid="{0E0A1000-0001-4000-8000-000000000005}"
          p:after="r[@uid='{0E0A1000-0001-4000-8000-000000000004}']"
          s:ds="${DS_NEWS}"
          s:id="{${R_PROMO.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;FieldNames=%7B${V_NEWS.toUpperCase()}%7D&amp;DynamicPlaceholderId=5"
          s:ph="headless-main" />
      </d>
    </r>`;

patch('serialized-content/nonprofit/nonprofit/Home.yml', (yaml) =>
  yaml.replace(/Value: \|\n    <r xmlns:p="p"[\s\S]*?<\/r>/, `Value: |\n${homeRenderings}`)
);

const openhandAr = path.join(
  ROOT,
  'serialized-content/nonprofit/nonprofit/Presentation/Available Renderings/Openhand.yml'
);
let ar = fs.readFileSync(openhandAr, 'utf8');
if (!ar.includes(R_PROMO.toUpperCase())) {
  ar = ar.replace(
    '{0E0A0001-1111-4000-8000-000000000015}',
    `{0E0A0001-1111-4000-8000-000000000015}\n    {${R_PROMO.toUpperCase()}}`
  );
  fs.writeFileSync(openhandAr, ar, 'utf8');
}

for (const rel of [
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/headless-main.yml',
  'serialized-content/placeholder-settings/nonprofit/headless-main.yml',
]) {
  const full = path.join(ROOT, rel);
  let text = fs.readFileSync(full, 'utf8');
  for (const id of OOTB) {
    if (!text.includes(id)) {
      text = text.replace(
        '{0E0A0001-1111-4000-8000-000000000015}',
        `{0E0A0001-1111-4000-8000-000000000015}\n    ${id}`
      );
    }
  }
  fs.writeFileSync(full, text, 'utf8');
}

console.log('Wrote Promo variants, PromoGrid treelist, extra articles, OOTB on headless-main.');
console.log('Image map keys:', Object.keys(images).join(', ') || '(none — upload photos first)');
