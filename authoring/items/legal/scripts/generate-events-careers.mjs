/**
 * Events listing + event pages, careers heading + Promo bands.
 * Run: node authoring/items/legal/scripts/generate-events-careers.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const HOME = '7f779a70-0faa-4105-aac5-0c56f0ee44b4';
const REND_FOLDER = '55837669-1c90-4234-b408-87b8a519ddfd';
const TEMPL_FOLDER = '5dd02c0b-a6d5-4a11-9c1d-399948fe4ec5';
const PROMOS_FOLDER = 'd9b78273-0930-4a7b-94be-b59ca5471cf2';
const VARIANTS_PROMO = '0a49ad87-ed6c-43cc-9b28-754e560f5d1d';
const PAGE_ROUTE = 'e5a82c5d-05dd-476c-bec7-efecffd2cf43';
const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const T_PROMO = '08213afb-9cb4-4c1f-a5da-865b9a095601';
const T_VARIANT = '4d50cdae-c2d9-4de8-b080-8f992bfb1b55';
const BASE_PAGE = '{D6DD45BE-0D04-43E2-BFD9-9E91CB44BFE0}';
const PAGE_DESIGN = '{A1E90005-5555-4000-8000-000000000001}';
const PARAM = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const RCR_CHILDREN = '{207769CC-38C0-4DE1-B893-A6B037B3AEC4}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b24cc8';
const F_FIELD_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_BASE = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_RCR = 'b0b15510-b138-470e-8f33-8da2e228aafe';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '63ba690a-5274-4537-8313-a6d43fbdadc1';
const F_PAGE_CONTENT = '62d161c2-fb5d-4773-8d46-63c21c95a441';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_STD = 'f7d48a55-2158-4f02-9356-756654404f73';
const F_AR = '715ae6c0-71c8-4744-ab4f-65362d20ad65';
const F_PROMO_IMG = 'b441a09f-ddb2-41a8-84cc-2533686541f4';
const F_PROMO_MORE = '453ed40c-5232-4e90-b023-7a3cee2bcfe8';
const F_PROMO_DESC = '4fc0c7b3-bcfb-4a9d-834d-59f6836e5fd6';
const F_PROMO_TITLE = 'f7e3056b-5e6e-4080-b2b7-84f76b2052fc';
const F_PROMO_SUB = '79332b7d-ea7f-47d7-a9c2-bfaae4806296';

const DAWN = 'a1e90030-0000-4000-8000-000000000002';
const SALLY = 'a1e90030-0000-4000-8000-00000000000c';
const HAMMAD = 'a1e90030-0000-4000-8000-000000000007';
const CAREERS_PAGE = 'a1e90030-0000-4000-8000-000000000023';

const ID = {
  EventListing: 'a1e90001-1111-4000-8000-00000000001a',
  EventDetail: 'a1e90001-1111-4000-8000-00000000001b',
  PageHeading: 'a1e90001-1111-4000-8000-00000000001c',
  EventPage: 'a1e90010-0000-4000-8000-000000000070',
  EventSection: 'a1e90010-0000-4000-8000-000000000071',
  Kicker: 'a1e90010-0000-4000-8000-000000000072',
  DateLabel: 'a1e90010-0000-4000-8000-000000000073',
  TimeLabel: 'a1e90010-0000-4000-8000-000000000074',
  Location: 'a1e90010-0000-4000-8000-000000000075',
  Price: 'a1e90010-0000-4000-8000-000000000076',
  Audience: 'a1e90010-0000-4000-8000-000000000077',
  Image: 'a1e90010-0000-4000-8000-000000000078',
  Speakers: 'a1e90010-0000-4000-8000-000000000079',
  Agenda: 'a1e90010-0000-4000-8000-00000000007a',
  EventStd: 'a1e90010-0000-4000-8000-00000000007b',
  EventsFolder: 'a1e90030-0000-4000-8000-0000000000a0',
  Conference: 'a1e90030-0000-4000-8000-0000000000a1',
  CigaBriefing: 'a1e90030-0000-4000-8000-0000000000a2',
  LenderRoundtable: 'a1e90030-0000-4000-8000-0000000000a3',
  PromoEarly: 'a1e90020-0000-4000-8000-000000000040',
  PromoLegal: 'a1e90020-0000-4000-8000-000000000041',
  PromoVario: 'a1e90020-0000-4000-8000-000000000042',
  PromoBusiness: 'a1e90020-0000-4000-8000-000000000043',
  PromoCulture: 'a1e90020-0000-4000-8000-000000000044',
  ImageLeft: 'a1e90008-8888-4000-8000-000000000014',
};

const VAR_IMAGE_LEFT = '{A1E90008-8888-4000-8000-000000000014}';
const VAR_IMAGE_RIGHT = '{A1E90008-8888-4000-8000-000000000010}';
const PROMO = '{A1E90001-1111-4000-8000-000000000004}';
const HEADING = '{A1E90001-1111-4000-8000-00000000001C}';
const LISTING = '{A1E90001-1111-4000-8000-00000000001A}';
const DETAIL = '{A1E90001-1111-4000-8000-00000000001B}';

const DAM = {
  conference:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2339d4b52bb34613b6ec96ea793bcbfc" dam-id="zUIdgBZoQ2KLPQoNu0yDKg" alt="pm-event-conference" dam-content-type="Image" />',
  eventCard:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/74b64a05ca164dfe816c5d88ad3e701b" dam-id="E0bAVUjsSy-5cqdzd2pKkg" alt="pm-event-card" dam-content-type="Image" />',
  earlyTalent:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/91e9aec6d11a429d833fc9a0fcb1d1c2" dam-id="0b09i9XMRUePUV9hkG8ByQ" alt="pm-careers-early-talent" dam-content-type="Image" />',
  legal:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/234643133d544662b88065f2fc24d3e7" dam-id="H3h7u8kbTVq8P2q3ZcBU3g" alt="pm-careers-legal" dam-content-type="Image" />',
  vario:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/ede3d81ad3314084880625c73370e2a9" dam-id="z1i_dmCiSXelHa7nYiPbQw" alt="pm-careers-vario" dam-content-type="Image" />',
  business:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/3435dfccfc46463388228a6ea6eae620" dam-id="ZsnhFQRSTxG38DcM7XgWvQ" alt="pm-careers-business" dam-content-type="Image" />',
  culture:
    '<Image src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e9c5f363ba4d4603b33eddd239efdc13" dam-id="iXOqGmRlQjOmgVjI3hIR5A" alt="pm-careers-culture" dam-content-type="Image" />',
};

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.replace(/\r\n/g, '\n'), 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260911T223000Z
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
  - ID: "${F_FIELD_TITLE}"
    Hint: Title
    Value: "${title}"
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function renderingYaml(id, name, resolver) {
  const rcr = resolver
    ? `- ID: "${F_RCR}"
  Hint: Rendering Contents Resolver
  Value: "${resolver}"
`
    : '';
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/legal/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${name}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM}"
${rcr}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function promoXml(ds, variant, phId) {
  const field = variant ? `&amp;FieldNames=%7B${variant.replace(/[{}]/g, '')}%7D` : '';
  return `        <r
          uid="{A1E91000-0009-4000-8000-${String(phId).padStart(12, '0')}}"
          s:ds="${ds}"
          s:id="${PROMO}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D${field}&amp;DynamicPlaceholderId=${phId}"
          s:ph="headless-main" />`;
}

function linkXml(text, url, id) {
  return `<link class="" querystring="" id="${id}" anchor="" target="" title="" linktype="internal" text="${text}" url="${url}" />`;
}

write('serialized-content/renderings/legal/EventListing.yml', renderingYaml(ID.EventListing, 'EventListing', RCR_CHILDREN));
write('serialized-content/renderings/legal/EventDetail.yml', renderingYaml(ID.EventDetail, 'EventDetail'));
write('serialized-content/renderings/legal/PageHeading.yml', renderingYaml(ID.PageHeading, 'PageHeading'));

write(
  'serialized-content/event-page-template/EventPage.yml',
  `---
ID: "${ID.EventPage}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/legal/EventPage"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/calendar.png
- ID: "${F_BASE}"
  Hint: __Base template
  Value: |
    ${BASE_PAGE}
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 350
- ID: "${F_STD}"
  Hint: __Standard values
  Value: "{${ID.EventStd.toUpperCase()}}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/event-page-template/EventPage/Event.yml',
  `---
ID: "${ID.EventSection}"
Parent: "${ID.EventPage}"
Template: "${T_SECTION}"
Path: "/sitecore/templates/Project/legal/EventPage/Event"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

const fields = [
  [ID.Kicker, 'Kicker', 'Single-Line Text', 100],
  [ID.DateLabel, 'DateLabel', 'Single-Line Text', 200],
  [ID.TimeLabel, 'TimeLabel', 'Single-Line Text', 300],
  [ID.Location, 'Location', 'Single-Line Text', 400],
  [ID.Price, 'Price', 'Single-Line Text', 500],
  [ID.Audience, 'Audience', 'Single-Line Text', 600],
  [ID.Image, 'Image', 'Image', 700],
  [ID.Agenda, 'Agenda', 'Rich Text', 900],
];
for (const [id, name, type, sort] of fields) {
  write(
    `serialized-content/event-page-template/EventPage/Event/${name}.yml`,
    fieldYaml(id, ID.EventSection, `/sitecore/templates/Project/legal/EventPage/Event/${name}`, type, sort, name)
  );
}
write(
  'serialized-content/event-page-template/EventPage/Event/Speakers.yml',
  fieldYaml(
    ID.Speakers,
    ID.EventSection,
    '/sitecore/templates/Project/legal/EventPage/Event/Speakers',
    'Treelist',
    800,
    'Select Speakers',
    '/sitecore/content/legal/legal/Home/people'
  )
);
write(
  'serialized-content/event-page-template/EventPage/__Standard Values.yml',
  `---
ID: "${ID.EventStd}"
Parent: "${ID.EventPage}"
Template: "${ID.EventPage}"
Path: "/sitecore/templates/Project/legal/EventPage/__Standard Values"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/legal/legal/Presentation/Headless Variants/Promo/ImageLeft.yml',
  `---
ID: "${ID.ImageLeft}"
Parent: "${VARIANTS_PROMO}"
Template: "${T_VARIANT}"
Path: /sitecore/content/legal/legal/Presentation/Headless Variants/Promo/ImageLeft
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

function promoItem(id, slug, title, sub, desc, image, moreText, moreUrl, moreId) {
  return `---
ID: "${id}"
Parent: "${PROMOS_FOLDER}"
Template: "${T_PROMO}"
Path: /sitecore/content/legal/legal/Data/Promos/${slug}
SharedFields:
- ID: "${F_PROMO_IMG}"
  Hint: PromoImageOne
  Value: |
    ${image}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_PROMO_MORE}"
      Hint: PromoMoreInfo
      Value: |
        ${linkXml(moreText, moreUrl, moreId)}
    - ID: "${F_PROMO_DESC}"
      Hint: PromoDescription
      Value: ${JSON.stringify(desc)}
    - ID: "${F_PROMO_SUB}"
      Hint: PromoSubTitle
      Value: "${sub}"
    - ID: "${F_PROMO_TITLE}"
      Hint: PromoTitle
      Value: "${title}"
`;
}

write(
  'serialized-content/legal/legal/Data/Promos/Early Talent.yml',
  promoItem(
    ID.PromoEarly,
    'Early Talent',
    'Early talent',
    'Early talent',
    '<p>Want to find out more about our work experience, apprenticeships, vacation placements or training contracts? You will find everything you need here.</p>',
    DAM.earlyTalent,
    'Show me',
    '/careers',
    CAREERS_PAGE
  )
);
write(
  'serialized-content/legal/legal/Data/Promos/Legal Professionals.yml',
  promoItem(
    ID.PromoLegal,
    'Legal Professionals',
    'Legal professionals',
    'Legal professionals',
    '<p>We look for lawyers who think laterally about the sectors our clients operate in. In return we invest in you — including the restructuring and insolvency work Dawn, Sally and the team take to market.</p>',
    DAM.legal,
    'Show me',
    '/careers',
    CAREERS_PAGE
  )
);
write(
  'serialized-content/legal/legal/Data/Promos/Vario.yml',
  promoItem(
    ID.PromoVario,
    'Vario',
    'Vario – freelance legal professionals',
    'Vario',
    '<p>Vario provides freelance opportunities internationally for talented legal professionals at all levels — including specialists who can step into a CIGA supplier briefing or a lender roundtable at short notice.</p>',
    DAM.vario,
    'Show me',
    '/careers',
    CAREERS_PAGE
  )
);
write(
  'serialized-content/legal/legal/Data/Promos/Business Professionals.yml',
  promoItem(
    ID.PromoBusiness,
    'Business Professionals',
    'Business professionals',
    'Business professionals',
    '<p>Value in a law firm is no longer found only in legal teams. We bring together specialists across Business Development, Risk, Finance, HR and Technology — the operators who help Thomas and Vince get a usable site, not another brochure.</p>',
    DAM.business,
    'Show me',
    '/careers',
    CAREERS_PAGE
  )
);
write(
  'serialized-content/legal/legal/Data/Promos/Work Culture.yml',
  promoItem(
    ID.PromoCulture,
    'Work Culture',
    "What's it like to work for Pinsent Masons?",
    'Our people',
    '<p>Hear from people such as Dawn Allen in Leeds and Sally Williamson on the CIGA guide: the culture, the client work, and what sets the firm apart.</p>',
    DAM.culture,
    'Show me',
    '/people/dawn-allen',
    DAWN
  )
);

const careersLayout = `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{A1E91000-0009-4000-8000-000000000001}"
          p:before="*"
          s:id="${HEADING}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
${promoXml(ID.PromoEarly, VAR_IMAGE_LEFT, 2)}
${promoXml(ID.PromoLegal, VAR_IMAGE_RIGHT, 3)}
${promoXml(ID.PromoVario, VAR_IMAGE_LEFT, 4)}
${promoXml(ID.PromoBusiness, VAR_IMAGE_RIGHT, 5)}
${promoXml(ID.PromoCulture, VAR_IMAGE_LEFT, 6)}
      </d>
    </r>`;

write(
  'serialized-content/legal/legal/Home/careers.yml',
  `---
ID: "${CAREERS_PAGE}"
Parent: "${HOME}"
Template: "${PAGE_ROUTE}"
Path: /sitecore/content/legal/legal/Home/careers
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${careersLayout}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: Careers
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: Careers and vacancies
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>We believe true innovation can only happen when we nurture a diverse team in which everyone is empowered to contribute to success. If our values resonate with you, we want to hear from you.</p>
`
);

function eventLayout(uid) {
  return `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{${uid}}"
          s:id="${DETAIL}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>`;
}

write(
  'serialized-content/legal/legal/Home/events-training.yml',
  `---
ID: "${ID.EventsFolder}"
Parent: "${HOME}"
Template: "${PAGE_ROUTE}"
Path: /sitecore/content/legal/legal/Home/events-training
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "{${ID.EventPage.toUpperCase()}}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}"
        l="{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}">
        <r
          uid="{A1E91000-000A-4000-8000-000000000001}"
          s:id="${LISTING}"
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
      Value: Events and Training
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: Events and Training
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Stay up to date with the developments that impact your business through our conferences, briefings and webinars — including the restructuring story Vince and Thomas follow from Dawn Allen and the CIGA guide.</p>
`
);

const conferenceAgenda = `<table><tbody>
        <tr><td>08:30</td><td><strong>Registration and breakfast</strong></td></tr>
        <tr><td>09:15</td><td><strong>Welcome from the chair</strong> — Dawn Allen, Partner, Restructuring</td></tr>
        <tr><td>09:45</td><td><strong>When suppliers must keep supplying</strong> — Sally Williamson on the CIGA essential-supplier rules in practice</td></tr>
        <tr><td>11:00</td><td><strong>Lender priorities when a customer fails</strong> — Hammad Akhtar and Dawn Allen</td></tr>
        <tr><td>12:30</td><td><strong>Lunch and networking</strong></td></tr>
        <tr><td>14:00</td><td><strong>Roundtable: keeping supply lines open</strong> — Dawn Allen with in-house counsel</td></tr>
        <tr><td>16:00</td><td><strong>Drinks reception</strong></td></tr>
        </tbody></table>`;

const briefingAgenda = `<table><tbody>
        <tr><td>08:00</td><td><strong>Coffee</strong></td></tr>
        <tr><td>08:15</td><td><strong>The CIGA duty in one hour</strong> — Sally Williamson</td></tr>
        <tr><td>09:00</td><td><strong>What boards and lenders ask next</strong> — Dawn Allen</td></tr>
        <tr><td>09:45</td><td><strong>Close</strong></td></tr>
        </tbody></table>`;

const roundtableAgenda = `<table><tbody>
        <tr><td>16:00</td><td><strong>Arrival</strong></td></tr>
        <tr><td>16:15</td><td><strong>Supply continuity after insolvency</strong> — Dawn Allen</td></tr>
        <tr><td>16:50</td><td><strong>Insurance and Part VII angles</strong> — Hammad Akhtar</td></tr>
        <tr><td>17:20</td><td><strong>Discussion</strong></td></tr>
        </tbody></table>`;

function eventYaml({ id, slug, title, kicker, date, time, location, price, audience, overview, speakers, agenda, image, uid }) {
  return `---
ID: "${id}"
Parent: "${ID.EventsFolder}"
Template: "${ID.EventPage}"
Path: /sitecore/content/legal/legal/Home/events-training/${slug}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${eventLayout(uid)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${title}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${title}"
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${overview}
    - ID: "${ID.Kicker}"
      Hint: Kicker
      Value: "${kicker}"
    - ID: "${ID.DateLabel}"
      Hint: DateLabel
      Value: "${date}"
    - ID: "${ID.TimeLabel}"
      Hint: TimeLabel
      Value: "${time}"
    - ID: "${ID.Location}"
      Hint: Location
      Value: "${location}"
    - ID: "${ID.Price}"
      Hint: Price
      Value: "${price}"
    - ID: "${ID.Audience}"
      Hint: Audience
      Value: "${audience}"
    - ID: "${ID.Image}"
      Hint: Image
      Value: |
        ${image}
    - ID: "${ID.Speakers}"
      Hint: Speakers
      Value: "${speakers}"
    - ID: "${ID.Agenda}"
      Hint: Agenda
      Value: |
        ${agenda}
`;
}

write(
  'serialized-content/legal/legal/Home/events-training/restructuring-and-insolvency-conference-2026.yml',
  eventYaml({
    id: ID.Conference,
    slug: 'restructuring-and-insolvency-conference-2026',
    title: 'Restructuring and Insolvency Conference 2026',
    kicker: 'CONFERENCE',
    date: '29 September 2026',
    time: '08:30 - 17:30 BST',
    location: 'The Brewery, London',
    price: 'Invitation only for demo clients',
    audience: 'Restructuring professionals, lenders, IPs and turnaround advisers',
    overview:
      '<p>Our annual London conference is the day Vince can put Dawn Allen in a room with the lender community — not another PDF. Dawn chairs. Sally Williamson walks the CIGA essential-supplier rules that sit behind the Out-Law guide. Hammad Akhtar covers the insurance and lending questions that follow a customer failure.</p><p>Hospitality and a full-day programme, written for this demo. Original copy — not the live Pinsent brochure.</p><h3>Who should attend</h3><p>Bankers, insolvency practitioners, funds and in-house counsel who need a usable briefing they can take into a Barclays-style meeting.</p>',
    speakers: `{${DAWN.toUpperCase()}}|{${SALLY.toUpperCase()}}|{${HAMMAD.toUpperCase()}}`,
    agenda: conferenceAgenda,
    image: DAM.conference,
    uid: 'A1E91000-000A-4000-8000-000000000011',
  })
);

write(
  'serialized-content/legal/legal/Home/events-training/ciga-essential-suppliers-briefing.yml',
  eventYaml({
    id: ID.CigaBriefing,
    slug: 'ciga-essential-suppliers-briefing',
    title: 'Essential suppliers after CIGA — Leeds briefing',
    kicker: 'BRIEFING',
    date: '14 October 2026',
    time: '08:00 - 09:45 BST',
    location: 'Leeds, 1 Park Row',
    price: 'Complimentary',
    audience: 'Supplier GCs, boards and restructuring leads',
    overview:
      '<p>A short Leeds breakfast on the duty to keep supplying an insolvent customer. Sally Williamson authored the Out-Law guide; Dawn Allen hosts from the restructuring desk Thomas already knows. The session is built for the story: one hour, one page of takeaways, no invented lawyers.</p>',
    speakers: `{${SALLY.toUpperCase()}}|{${DAWN.toUpperCase()}}`,
    agenda: briefingAgenda,
    image: DAM.eventCard,
    uid: 'A1E91000-000A-4000-8000-000000000012',
  })
);

write(
  'serialized-content/legal/legal/Home/events-training/lender-roundtable-supply-lines.yml',
  eventYaml({
    id: ID.LenderRoundtable,
    slug: 'lender-roundtable-supply-lines',
    title: 'Lender roundtable: keeping supply lines open',
    kicker: 'ROUNDTABLE',
    date: '18 November 2026',
    time: '16:00 - 18:00 GMT',
    location: 'London, 30 Crown Place',
    price: 'By invitation',
    audience: 'Financial institutions and credit teams',
    overview:
      '<p>A closed lender table for the Barclays-shaped conversation in the demo story. Dawn Allen draws on her financial-institution work. Hammad Akhtar covers insurance M&amp;A and Part VII when a supplier relationship sits inside a larger book. Small room, no extra names.</p>',
    speakers: `{${DAWN.toUpperCase()}}|{${HAMMAD.toUpperCase()}}`,
    agenda: roundtableAgenda,
    image: DAM.eventCard,
    uid: 'A1E91000-000A-4000-8000-000000000013',
  })
);

const pinsent = path.join(ROOT, 'serialized-content/legal/legal/Presentation/Available Renderings/Pinsent.yml');
let pinsentText = fs.readFileSync(pinsent, 'utf8');
for (const rid of [ID.EventListing, ID.EventDetail, ID.PageHeading]) {
  const token = `{${rid.toUpperCase()}}`;
  if (!pinsentText.includes(token)) {
    pinsentText = pinsentText.replace(
      /({A1E90001-1111-4000-8000-000000000019})/,
      `$1\n    ${token}`
    );
  }
}
fs.writeFileSync(pinsent, pinsentText, 'utf8');

const modulePath = path.join(ROOT, 'legal.module.json');
const moduleJson = JSON.parse(fs.readFileSync(modulePath, 'utf8'));
if (!moduleJson.items.includes.some((item) => item.name === 'event-page-template')) {
  moduleJson.items.includes.splice(
    moduleJson.items.includes.findIndex((item) => item.name === 'person-page-template') + 1,
    0,
    {
      name: 'event-page-template',
      path: '/sitecore/templates/Project/legal/EventPage',
      allowedPushOperations: 'CreateAndUpdate',
      scope: 'ItemAndDescendants',
    }
  );
  fs.writeFileSync(modulePath, `${JSON.stringify(moduleJson, null, 2)}\n`, 'utf8');
}

console.log('Events + careers YAML written');
