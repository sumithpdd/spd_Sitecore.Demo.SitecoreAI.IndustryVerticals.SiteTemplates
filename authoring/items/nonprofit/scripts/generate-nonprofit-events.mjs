/**
 * Openhand EventPage + /events + /news ArticlePages.
 * GUID prefix 0e0a. Run: node scripts/generate-nonprofit-events.mjs
 * Do not run generate-nonprofit-site.mjs (wipes Home.yml).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function damImageXml(srcOrFile, alt) {
  const file = String(srcOrFile).replace(/^\/openhand\//, '');
  const jsonPath = path.join(__dirname, 'media-maps', 'nonprofit-image-xml.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const map = JSON.parse(fs.readFileSync(jsonPath, 'utf8').replace(/^\uFEFF/, ''));
      const raw = map[file];
      if (raw) {
        return raw.replace(/alt="[^"]*"/, `alt="${alt}"`);
      }
    } catch {
      /* fall through */
    }
  }
  return `<image src="${srcOrFile.startsWith('/') ? srcOrFile : `/openhand/${file}`}" alt="${alt}" width="1600" height="1067" />`;
}

const TEMPL_FOLDER = '109141ff-0e31-43af-9b20-a32032ca4ced';
const REND_FOLDER = '80cc7671-ba23-46a5-b4a0-65e76cb7a102';
const HOME_ID = '33365cdd-ec5b-4db5-a858-c353d1d1940d';
const HOME_TEMPLATE = 'a4c1a619-0ca9-4679-bb2d-5db64ce69721';
const PAGE_DESIGN = '{0E0A0005-5555-4000-8000-000000000001}';

const T_JSON = '04646a89-996f-4ee7-878a-ffdbf1f0ef0d';
const T_TEMPLATE = 'ab86861a-6030-46c5-b394-e8f99e8b87db';
const T_SECTION = 'e269fbb5-3750-427a-9149-7aa950b49301';
const T_FIELD = '455a3e98-a627-4b40-8035-e683a0331ac7';
const PARAM_HERO = '{5BD96264-0B02-4605-8FFF-0079CAEB67FC}';
const JSS_LAYOUT = '{96E5F4BA-A2CF-4A4C-A4E7-64DA88226362}';
const DEVICE = '{FE5D7FDF-89C0-4D99-9AA3-B5FBD009C9F3}';
const CHILDREN_RESOLVER = '{207769CC-38C0-4DE1-B893-A6B037B3AEC4}';

const F_SOURCE = '1eb8ae32-e190-44a6-968d-ed904c794ebf';
const F_TYPE = 'ab162cc0-dc80-4abf-8871-998ee5d7ba32';
const F_SORT = 'ba3f86a2-4a1c-4d78-b63d-91c2779c1b5e';
const F_TITLE = '19a69332-a23e-4e70-8d16-b2640cb24cc8';
const F_CREATED = '25bed78c-4957-4165-998a-ca1b52f67497';
const F_ICON = '06d5295c-ed2f-4a54-9bf2-26228d113318';
const F_BASE = '12c33f3f-86c5-43a5-aeb4-5598cec45116';
const F_SV = 'f7d48a55-2158-4f02-9356-756654404f73';
const F_COMPONENT = '037fe404-dd19-4bf7-8e30-4dadf68b27b0';
const F_PARAM = 'a77e8568-1ab3-44f1-a664-b7c37ec7810d';
const F_RESOLVER = 'b0b15510-b138-470e-8f33-8da2e228aafe';
const F_NAV = '4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8';
const F_PAGE_TITLE = '96b71ea7-4d37-4a3a-9e11-2bb76ef03acd';
const F_PAGE_CONTENT = '53f49d04-a3f6-4f75-bc6e-3e7db6e80e93';
const F_PAGE_DESIGN = '24171bf1-c0e1-480e-be76-4c0a1876f916';
const F_RENDERINGS = 'f1a1fe9e-a60c-4ddb-a3a0-bb5b29fe732e';
const F_MASTERS = '1172f643-ae13-4102-937a-a89d32bdf9c1';

const ID = {
  EventPage: '0e0a0014-0000-4000-8000-000000000050',
  EventSection: '0e0a0014-0000-4000-8000-000000000051',
  Kicker: '0e0a0014-0000-4000-8000-000000000052',
  DateLabel: '0e0a0014-0000-4000-8000-000000000053',
  TimeLabel: '0e0a0014-0000-4000-8000-000000000054',
  Location: '0e0a0014-0000-4000-8000-000000000055',
  Price: '0e0a0014-0000-4000-8000-000000000056',
  Audience: '0e0a0014-0000-4000-8000-000000000057',
  Image: '0e0a0014-0000-4000-8000-000000000058',
  Speakers: '0e0a0014-0000-4000-8000-000000000059',
  Agenda: '0e0a0014-0000-4000-8000-00000000005a',
  EventSv: '0e0a0014-0000-4000-8000-00000000005f',
  RListing: '0e0a0001-1111-4000-8000-000000000017',
  RDetail: '0e0a0001-1111-4000-8000-000000000018',
  RNews: '0e0a0001-1111-4000-8000-000000000019',
  RAdviceArticle: '0e0a0001-1111-4000-8000-000000000006',
  ArticlePage: '0e0a0014-0000-4000-8000-000000000040',
  ArticleSv: '0e0a0014-0000-4000-8000-000000000049',
  ArtKicker: '0e0a0014-0000-4000-8000-000000000046',
  ArtDate: '0e0a0014-0000-4000-8000-000000000044',
  ArtRead: '0e0a0014-0000-4000-8000-000000000045',
  ArtShort: '0e0a0014-0000-4000-8000-000000000042',
  ArtSummary: '0e0a0014-0000-4000-8000-00000000004b',
  ArtAuthors: '0e0a0014-0000-4000-8000-00000000004a',
  ArtImage: '0e0a0014-0000-4000-8000-000000000043',
  Jordan: '0e0a0030-0000-4000-8000-000000000071',
  Eleri: '0e0a0030-0000-4000-8000-000000000072',
  Sam: '0e0a0030-0000-4000-8000-000000000073',
  Events: '0e0a0030-0000-4000-8000-000000000090',
  Walk: '0e0a0030-0000-4000-8000-000000000091',
  Training: '0e0a0030-0000-4000-8000-000000000092',
  Pantry: '0e0a0030-0000-4000-8000-000000000093',
  News: '0e0a0030-0000-4000-8000-0000000000a0',
  Match: '0e0a0030-0000-4000-8000-0000000000a1',
  Warm: '0e0a0030-0000-4000-8000-0000000000a2',
  Dhp: '0e0a0030-0000-4000-8000-0000000000a3',
};

function write(rel, content) {
  const full = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

function created() {
  return `    - ID: "${F_CREATED}"
      Hint: __Created
      Value: 20260917T090000Z
`;
}

function u(id) {
  return `{${String(id).toUpperCase()}}`;
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
    Value: "${title}"
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

function layout(uid, renderingId) {
  return `    <r xmlns:p="p" xmlns:s="s"
      p:p="1">
      <d
        id="${DEVICE}"
        l="${JSS_LAYOUT}">
        <r
          uid="{${uid.toUpperCase()}}"
          p:before="*"
          s:id="{${renderingId.toUpperCase()}}"
          s:par="GridParameters=%7B7465D855-992E-4DC2-9855-A03250DFA74B%7D&amp;DynamicPlaceholderId=1"
          s:ph="headless-main" />
      </d>
    </r>`;
}

function jsonRendering(id, name, componentName, extra = '') {
  return `---
ID: "${id}"
Parent: "${REND_FOLDER}"
Template: "${T_JSON}"
Path: /sitecore/layout/Renderings/Project/nonprofit/${name}
SharedFields:
- ID: "${F_COMPONENT}"
  Hint: componentName
  Value: ${componentName}
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/element.png
- ID: "${F_PARAM}"
  Hint: Parameters Template
  Value: "${PARAM_HERO}"
${extra}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`;
}

write(
  'serialized-content/templates/nonprofit/EventPage.yml',
  `---
ID: "${ID.EventPage}"
Parent: "${TEMPL_FOLDER}"
Template: "${T_TEMPLATE}"
Path: "/sitecore/templates/Project/nonprofit/EventPage"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/calendar.png
- ID: "${F_BASE}"
  Hint: __Base template
  Value: |
    ${u(HOME_TEMPLATE)}
- ID: "${F_SORT}"
  Hint: __Sortorder
  Value: 350
- ID: "${F_SV}"
  Hint: __Standard values
  Value: "${u(ID.EventSv)}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/templates/nonprofit/EventPage/Event.yml',
  `---
ID: "${ID.EventSection}"
Parent: "${ID.EventPage}"
Template: "${T_SECTION}"
Path: "/sitecore/templates/Project/nonprofit/EventPage/Event"
SharedFields:
- ID: "${F_ICON}"
  Hint: __Icon
  Value: Office/32x32/window_dialog.png
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

const eventFields = [
  [ID.Kicker, 'Kicker', 'Single-Line Text', 100, 'Kicker'],
  [ID.DateLabel, 'DateLabel', 'Single-Line Text', 200, 'Date'],
  [ID.TimeLabel, 'TimeLabel', 'Single-Line Text', 300, 'Time'],
  [ID.Location, 'Location', 'Single-Line Text', 400, 'Location'],
  [ID.Price, 'Price', 'Single-Line Text', 500, 'Price'],
  [ID.Audience, 'Audience', 'Single-Line Text', 600, 'Audience'],
  [ID.Image, 'Image', 'Image', 700, 'Image'],
];

for (const [id, name, type, sort, title] of eventFields) {
  write(
    `serialized-content/templates/nonprofit/EventPage/Event/${name}.yml`,
    fieldYaml(
      id,
      ID.EventSection,
      `/sitecore/templates/Project/nonprofit/EventPage/Event/${name}`,
      type,
      sort,
      title
    )
  );
}

write(
  'serialized-content/templates/nonprofit/EventPage/Event/Speakers.yml',
  fieldYaml(
    ID.Speakers,
    ID.EventSection,
    '/sitecore/templates/Project/nonprofit/EventPage/Event/Speakers',
    'Treelist',
    800,
    'Select Speakers',
    '/sitecore/content/nonprofit/nonprofit/Home/people'
  )
);
write(
  'serialized-content/templates/nonprofit/EventPage/Event/Agenda.yml',
  fieldYaml(
    ID.Agenda,
    ID.EventSection,
    '/sitecore/templates/Project/nonprofit/EventPage/Event/Agenda',
    'Rich Text',
    900,
    'Agenda'
  )
);

write(
  'serialized-content/templates/nonprofit/EventPage/__Standard Values.yml',
  `---
ID: "${ID.EventSv}"
Parent: "${ID.EventPage}"
Template: "${ID.EventPage}"
Path: "/sitecore/templates/Project/nonprofit/EventPage/__Standard Values"
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout('0e0a1000-000e-4000-8000-000000000018', ID.RDetail)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}`
);

write(
  'serialized-content/renderings/nonprofit/EventListing.yml',
  jsonRendering(
    ID.RListing,
    'EventListing',
    'EventListing',
    `- ID: "${F_RESOLVER}"
  Hint: Rendering Contents Resolver
  Value: "${CHILDREN_RESOLVER}"
`
  )
);
write(
  'serialized-content/renderings/nonprofit/EventDetail.yml',
  jsonRendering(ID.RDetail, 'EventDetail', 'EventDetail')
);
write(
  'serialized-content/renderings/nonprofit/NewsList.yml',
  jsonRendering(
    ID.RNews,
    'NewsList',
    'NewsList',
    `- ID: "${F_RESOLVER}"
  Hint: Rendering Contents Resolver
  Value: "${CHILDREN_RESOLVER}"
`
  )
);

write(
  'serialized-content/nonprofit/nonprofit/Home/events.yml',
  `---
ID: "${ID.Events}"
Parent: "${HOME_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/nonprofit/nonprofit/Home/events
SharedFields:
- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "${u(ID.EventPage)}"
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout('0e0a1000-000a-4000-8000-000000000001', ID.RListing)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: Events
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: Events and training
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Walks, adviser training and pantry open days. Register from the event page — speakers are the same partner leads the rest of the demo already names.</p>
`
);

const events = [
  {
    id: ID.Walk,
    slug: 'leeds-winter-walk',
    uid: '0e0a1000-000a-4000-8000-000000000011',
    nav: 'Leeds winter walk',
    title: 'Leeds winter walk',
    kicker: 'FUNDRAISE',
    date: '18 October 2026',
    time: '09:30 - 13:00 BST',
    location: 'Roundhay Park, Leeds',
    price: 'Pay what you raise',
    audience: 'Supporters, families and Northgate volunteers',
    speakers: [ID.Jordan],
    image: '/openhand/appeal-winter.jpg',
    alt: 'Leeds winter walk',
    body: `<p>A five-mile loop around Roundhay Park. Jordan Hale from Northgate Community Hub opens the route and walks the first mile with anyone who wants a slower start.</p>
<p>Gifts raised on the day go to the winter match. Bring a flask. The hub van will be at the lakeside car park with a warm space if you need to sit down.</p>
<p>This is the named fundraising event in the Openhand demo story — the same walk the fundraise grid points to.</p>`,
    agenda: `<table><tbody>
<tr><td>09:30</td><td><strong>Registration</strong> — lakeside car park</td></tr>
<tr><td>10:00</td><td><strong>Set off</strong> — Jordan Hale</td></tr>
<tr><td>12:30</td><td><strong>Hot drinks</strong> — Northgate van</td></tr>
<tr><td>13:00</td><td><strong>Close</strong></td></tr>
</tbody></table>`,
  },
  {
    id: ID.Training,
    slug: 'adviser-training-day',
    uid: '0e0a1000-000a-4000-8000-000000000012',
    nav: 'Adviser training day',
    title: 'Adviser training day — energy and rent in one room',
    kicker: 'TRAINING',
    date: '4 November 2026',
    time: '10:00 - 16:00 GMT',
    location: 'Northgate Community Hub, Leeds LS7',
    price: 'Free for partner staff',
    audience: 'Partner advisers and volunteer caseworkers',
    speakers: [ID.Eleri, ID.Jordan],
    image: '/openhand/promo-1.jpg',
    alt: 'Adviser training day',
    body: `<p>A one-day session on taking energy and rent cases at the same desk. Eleri Morgan walks Discretionary Housing Payments; Jordan Hale covers supplier calls and winter disconnection rights.</p>
<p>Places are for Openhand partner staff only. Bring a redacted case you are stuck on — the afternoon is clinic, not slides.</p>`,
    agenda: `<table><tbody>
<tr><td>10:00</td><td><strong>Energy grants in 90 minutes</strong> — Jordan Hale</td></tr>
<tr><td>12:00</td><td><strong>Lunch</strong></td></tr>
<tr><td>13:00</td><td><strong>Rent notices and DHP</strong> — Eleri Morgan</td></tr>
<tr><td>15:00</td><td><strong>Case clinic</strong></td></tr>
</tbody></table>`,
  },
  {
    id: ID.Pantry,
    slug: 'pantry-open-saturday',
    uid: '0e0a1000-000a-4000-8000-000000000013',
    nav: 'Pantry open Saturday',
    title: 'St Mark’s pantry open Saturday',
    kicker: 'DROP-IN',
    date: '24 October 2026',
    time: '09:00 - 13:00 BST',
    location: "St Mark's Crisis Centre, Birmingham B19",
    price: 'Free',
    audience: 'Anyone who needs a parcel — no referral letter',
    speakers: [ID.Sam],
    image: '/openhand/story-2.jpg',
    alt: 'Pantry open Saturday',
    body: `<p>St Mark’s opens the pantry on a Saturday so people who work weekdays can still collect a three-day parcel. Sam Okoro is on the door. You do not need a professional referral.</p>
<p>If a child in the household has not eaten today, say so at reception — that is treated as an emergency pathway, same as a weekday drop-in.</p>`,
    agenda: `<table><tbody>
<tr><td>09:00</td><td><strong>Doors open</strong> — Sam Okoro</td></tr>
<tr><td>09:15</td><td><strong>Parcels and follow-up booking</strong></td></tr>
<tr><td>13:00</td><td><strong>Close</strong></td></tr>
</tbody></table>`,
  },
];

for (const event of events) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/events/${event.slug}.yml`,
    `---
ID: "${event.id}"
Parent: "${ID.Events}"
Template: "${ID.EventPage}"
Path: /sitecore/content/nonprofit/nonprofit/Home/events/${event.slug}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout(event.uid, ID.RDetail)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${event.nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${event.title}"
    - ID: "${ID.Kicker}"
      Hint: Kicker
      Value: "${event.kicker}"
    - ID: "${ID.DateLabel}"
      Hint: DateLabel
      Value: "${event.date}"
    - ID: "${ID.TimeLabel}"
      Hint: TimeLabel
      Value: "${event.time}"
    - ID: "${ID.Location}"
      Hint: Location
      Value: "${event.location}"
    - ID: "${ID.Price}"
      Hint: Price
      Value: "${event.price}"
    - ID: "${ID.Audience}"
      Hint: Audience
      Value: "${event.audience}"
    - ID: "${ID.Image}"
      Hint: Image
      Value: |
        ${damImageXml(event.image, event.alt)}
    - ID: "${ID.Speakers}"
      Hint: Speakers
      Value: |
        ${event.speakers.map((id) => u(id)).join('\n        ')}
    - ID: "${ID.Agenda}"
      Hint: Agenda
      Value: |
        ${event.agenda.replace(/\n/g, '\n        ')}
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${event.body.replace(/\n/g, '\n        ')}
`
  );
}

write(
  'serialized-content/nonprofit/nonprofit/Home/news.yml',
  `---
ID: "${ID.News}"
Parent: "${HOME_ID}"
Template: "${HOME_TEMPLATE}"
Path: /sitecore/content/nonprofit/nonprofit/Home/news
SharedFields:
- ID: "${F_MASTERS}"
  Hint: __Masters
  Value: "${u(ID.ArticlePage)}"
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout('0e0a1000-000b-4000-8000-000000000001', ID.RNews)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: News
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: News
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        <p>Updates from partner hubs and the winter appeal. These ArticlePages reuse the same authors as advice — Jordan Hale, Eleri Morgan and Sam Okoro.</p>
`
);

const news = [
  {
    id: ID.Match,
    slug: 'winter-match-extended',
    uid: '0e0a1000-000b-4000-8000-000000000011',
    nav: 'Winter match extended',
    title: 'Winter match extended to 21 December',
    date: '15 September 2026',
    author: ID.Jordan,
    image: '/openhand/appeal-winter.jpg',
    summary:
      'Every gift to the winter appeal is matched until 21 December. That funds energy grants at Northgate, the Saturday pantry at St Mark’s, and Riverside’s Wednesday DHP clinic.',
    body: `<p>The corporate match on winter gifts now runs to 21 December, not the original October close. That is two more months of doubled energy-grant applications at Northgate, St Mark’s and Riverside.</p>
<p>Jordan Hale: “We were turning people away from a second appointment in January last year. The match is what keeps a caseworker in the room.” The precinct library behind Northgate now closes at 13:00 on Wednesdays; the hub stayed open as a warm space. If you need the chair and not an appointment, say so at reception.</p>
<p>Riverside Advice Service still holds the Discretionary Housing Payment clinic every Wednesday in Cardiff. Appointments can be in Welsh. Bring the notice, a tenancy, and a bank statement. If a section 21 is defective they write that afternoon.</p>
<p>Donate from the winter appeal page. Gifts of £15, £30, £75 or £150 all count. The match is not a condition of getting help.</p>`,
  },
];

for (const article of news) {
  write(
    `serialized-content/nonprofit/nonprofit/Home/news/${article.slug}.yml`,
    `---
ID: "${article.id}"
Parent: "${ID.News}"
Template: "${ID.ArticlePage}"
Path: /sitecore/content/nonprofit/nonprofit/Home/news/${article.slug}
SharedFields:
- ID: "${F_PAGE_DESIGN}"
  Hint: Page Design
  Value: "${PAGE_DESIGN}"
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${layout(article.uid, ID.RAdviceArticle)}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
${created()}    - ID: "${F_NAV}"
      Hint: NavigationTitle
      Value: "${article.nav}"
    - ID: "${F_PAGE_TITLE}"
      Hint: Title
      Value: "${article.title}"
    - ID: "${ID.ArtKicker}"
      Hint: Kicker
      Value: "News"
    - ID: "${ID.ArtDate}"
      Hint: PublishedDate
      Value: "${article.date}"
    - ID: "${ID.ArtRead}"
      Hint: ReadTime
      Value: "3 min. read"
    - ID: "${ID.ArtShort}"
      Hint: ShortDescription
      Value: "${article.summary}"
    - ID: "${ID.ArtSummary}"
      Hint: Summary
      Value: "${article.summary}"
    - ID: "${ID.ArtAuthors}"
      Hint: Authors
      Value: "${u(article.author)}"
    - ID: "${ID.ArtImage}"
      Hint: Image
      Value: |
        ${damImageXml(article.image, article.title)}
    - ID: "${F_PAGE_CONTENT}"
      Hint: Content
      Value: |
        ${article.body.replace(/\n/g, '\n        ')}
`
  );
}

function patchFile(rel, mutate) {
  const full = path.join(ROOT, rel);
  let yaml = fs.readFileSync(full, 'utf8');
  const next = mutate(yaml);
  if (next !== yaml) fs.writeFileSync(full, next, 'utf8');
}

patchFile('serialized-content/nonprofit/nonprofit/Home/get-help.yml', (yaml) => {
  if (yaml.includes(F_MASTERS)) {
    return yaml;
  }
  return yaml.replace(
    'SharedFields:\n',
    `SharedFields:\n- ID: "${F_MASTERS}"\n  Hint: __Masters\n  Value: "${u(ID.ArticlePage)}"\n`
  );
});

const extraRenderings = [ID.RListing, ID.RDetail, ID.RNews]
  .map((id) => `    {${id.toUpperCase()}}`)
  .join('\n');

for (const rel of [
  'serialized-content/nonprofit/nonprofit/Presentation/Available Renderings/Openhand.yml',
  'serialized-content/nonprofit/nonprofit/Presentation/Placeholder Settings/headless-main.yml',
  'serialized-content/placeholder-settings/nonprofit/headless-main.yml',
]) {
  patchFile(rel, (yaml) => {
    if (yaml.includes(ID.RListing.toUpperCase())) {
      return yaml;
    }
    return yaml.replace(
      '{0E0A0001-1111-4000-8000-000000000016}',
      `{0E0A0001-1111-4000-8000-000000000016}\n${extraRenderings}`
    );
  });
}

console.log('Wrote EventPage, /events, /news ArticlePages, and Allowed Controls.');
