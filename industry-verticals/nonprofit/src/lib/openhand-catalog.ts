export type NavItem = { href: string; label: string };

export const BRAND = {
  name: 'Openhand',
  tagline: 'Help close to home. Hope further afield.',
  copyright: '© 2026 Openhand. Registered charity in England and Wales.',
};

export const PRIMARY_NAV: NavItem[] = [
  { href: '/get-help', label: 'Get help' },
  { href: '/events', label: 'Events' },
  { href: '/stories', label: 'Stories' },
  { href: '/appeals/winter', label: 'Appeals' },
];

export const FOOTER_LINKS: NavItem[] = [
  { href: '/get-help', label: 'Get help' },
  { href: '/get-help/near-you', label: 'In your area' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/stories', label: 'Stories' },
  { href: '/donate', label: 'Donate' },
  { href: '/appeals/emergency', label: 'Emergency appeal' },
  { href: '/search', label: 'Search' },
];

const CH = 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content';

export const IMG = {
  logo: `${CH}/d503fda7b0c44aa1b3e31432127dc267`,
  heroGive: `${CH}/7465ca7258d3428ba793d33445f136dc`,
  appealWinter: `${CH}/a6f19fb440e64625a1113f8d2a982da2`,
  promo1: `${CH}/c367c1a57a514ef9ba5cd5f784f5a836`,
  promo2: `${CH}/0180308f69864eb38256c1b697375689`,
  promo3: `${CH}/1785434714a04dc4a9b7adcdf783a21a`,
  story1: `${CH}/66d87711ab2741309a48aa23b216e5e3`,
  story2: `${CH}/1752358100c0448c85521e353586e69d`,
  story3: `${CH}/af1a88f2cb7249b498b2a636b4d37ad0`,
  story4: `${CH}/ba0bf9dcae62457abde155d6d9703038`,
  partner1: `${CH}/9a02d2a70aa5454fa2a84497fe02d189`,
  partner2: `${CH}/bb5736bd41af4e1fb0d44b1109b3a587`,
  partner3: `${CH}/cf0a3b907a20448aa479f5aae40d773a`,
};

export type AdviceArticle = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  updated: string;
  letter: string;
  authorSlug: string;
  image?: string;
  body: string[];
  related: string[];
};

export const ADVICE: AdviceArticle[] = [
  {
    slug: 'help-when-the-money-runs-out',
    href: '/get-help/help-when-the-money-runs-out',
    title: 'Help when the money runs out',
    summary:
      'If you are in the UK and the money has run out — rent short, empty cupboards, a bill you cannot pay this week — start with emergency help, not a loan.',
    updated: '17 September 2026',
    letter: 'M',
    authorSlug: 'jordan-hale',
    image: IMG.heroGive,
    related: [
      '/get-help/help-with-energy-bills',
      '/get-help/what-to-do-if-you-cannot-pay-your-rent',
      '/get-help/near-you',
    ],
    body: [
      'If you are in the UK and the money has run out — rent short, empty cupboards, a bill you cannot pay this week — start with emergency help, not a loan.',
      'Local welfare and Household Support Fund schemes, plus a partner pantry, are usually faster than a new benefit claim. You do not need a professional referral for an Openhand pantry. Parcels cover three days; if a child has not eaten today, say so at reception.',
      'National advice can triage debt and housing. A crisis grant from a charity is often the next step if you need cash or goods this week. An advance on Universal Credit is a loan against your first payment — take it only if rent is due before that date, then ask the adviser to set a repayment you can keep.',
      'You should not be asked to donate before you get help. Openhand freephone 0800 090 0000, Monday to Saturday 8am–8pm, or walk into Northgate, St Mark’s or Riverside.',
      'Bring photo ID if you have it, a tenancy or last bill, and a bank statement. Missing documents stall grants more often than eligibility does.',
      'This is general information, not a personal assessment of your situation.',
    ],
  },
  {
    slug: 'help-with-energy-bills',
    href: '/get-help/help-with-energy-bills',
    title: 'Help with energy bills',
    summary:
      'If you cannot pay your gas or electricity bill, you still have rights. This page lists grants, supplier duties, and local partners who can sit with you on the call.',
    updated: '12 September 2026',
    letter: 'E',
    authorSlug: 'jordan-hale',
    image: IMG.promo1,
    related: [
      '/get-help/help-when-the-money-runs-out',
      '/get-help/what-to-do-if-you-cannot-pay-your-rent',
    ],
    body: [
      'You cannot be disconnected in winter for a debt on a domestic energy account without a court order. Contact your supplier first and ask for a breathing-space arrangement.',
      'Openhand partners can apply for the Household Support Fund on your behalf in most English local authorities, and for the Scottish Public Health Fund where you live north of the border.',
      'If a prepayment meter is leaving you without heat, that is an emergency. Call the partner nearest you — they can request a same-day credit and a safe-and-warm visit. Northgate kept a warm space open when the precinct library cut afternoon hours; say at reception if you need the chair, not an appointment.',
      'Keep a copy of your last bill, any DWP letter, and a photo of the meter. Advisers use those three items to unlock grants without a second appointment.',
      'Winter gifts to the Openhand appeal are matched until 21 December. That match is what keeps a caseworker in the room — it is not a condition of getting help.',
    ],
  },
  {
    slug: 'what-to-do-if-you-cannot-pay-your-rent',
    href: '/get-help/what-to-do-if-you-cannot-pay-your-rent',
    title: 'What to do if you cannot pay your rent',
    summary:
      'Rent arrears move quickly. This page covers the first 48 hours: talking to your landlord, Discretionary Housing Payments, and when to get a solicitor involved.',
    updated: '8 September 2026',
    letter: 'R',
    authorSlug: 'eleri-morgan',
    image: IMG.promo2,
    related: ['/get-help/help-when-the-money-runs-out', '/get-help/help-with-energy-bills'],
    body: [
      'Do not ignore a notice. A section 8 or section 21 letter has a clock on it. Bring it to a local partner the same day — they can check whether the notice is valid. Aisha’s possession claim was withdrawn after Riverside spotted a defective form.',
      'Ask your landlord in writing for a repayment plan before the next rent date. Keep the email. Courts look for that attempt.',
      'Discretionary Housing Payments and Council Tax Support sit with your local authority, not DWP. Riverside holds a DHP clinic every Wednesday in Cardiff; Northgate and St Mark’s complete the form with you in Leeds and Birmingham.',
      'If you have a possession hearing listed, or bailiffs are already instructed, say so at reception. Duty schemes at the county court can still stop a warrant on the day. A council tax reminder is not a court summons — bring it the same week.',
    ],
  },
];

export const AZ_INDEX: { letter: string; title: string; href: string }[] = [
  { letter: 'B', title: 'Bills — energy', href: '/get-help/help-with-energy-bills' },
  {
    letter: 'E',
    title: 'Emergency help — money ran out',
    href: '/get-help/help-when-the-money-runs-out',
  },
  { letter: 'E', title: 'Energy bills', href: '/get-help/help-with-energy-bills' },
  { letter: 'G', title: 'Grants — crisis', href: '/get-help/help-when-the-money-runs-out' },
  { letter: 'H', title: 'Heating grants', href: '/get-help/help-with-energy-bills' },
  { letter: 'M', title: 'Money runs out', href: '/get-help/help-when-the-money-runs-out' },
  { letter: 'R', title: 'Rent arrears', href: '/get-help/what-to-do-if-you-cannot-pay-your-rent' },
];

export type Partner = {
  slug: string;
  href: string;
  name: string;
  city: string;
  postcode: string;
  phone: string;
  hours: string;
  services: string[];
  lead: string;
  role: string;
  about: string;
  image: string;
};

export const PARTNERS: Partner[] = [
  {
    slug: 'northgate-community-hub',
    href: '/partners/northgate-community-hub',
    name: 'Northgate Community Hub',
    city: 'Leeds',
    postcode: 'LS7',
    phone: '0113 496 0100',
    hours: 'Mon–Fri 9:00–17:00; drop-in Tue and Thu mornings',
    services: ['Energy bills', 'Rent', 'Food parcels', 'Warm space'],
    lead: 'Jordan Hale',
    role: 'Hub manager',
    about:
      'Northgate sits behind the precinct library. Advisers take energy and rent cases in the same room so households are not sent across the city. Jordan Hale has run the hub since 2019 and still takes the first appointment of the day.',
    image: IMG.partner1,
  },
  {
    slug: 'st-marks-crisis-centre',
    href: '/partners/st-marks-crisis-centre',
    name: "St Mark's Crisis Centre",
    city: 'Birmingham',
    postcode: 'B19',
    phone: '0121 496 0200',
    hours: 'Open 8:00–20:00 including weekends',
    services: ['Food parcels', 'Emergency shelter liaison', 'Benefits'],
    lead: 'Sam Okoro',
    role: 'Duty lead',
    about:
      'St Mark’s is the overnight pathway for the West Midlands. Food, a shower, and a same-day call to housing options sit on one desk.',
    image: IMG.partner2,
  },
  {
    slug: 'riverside-advice-service',
    href: '/partners/riverside-advice-service',
    name: 'Riverside Advice Service',
    city: 'Cardiff',
    postcode: 'CF11',
    phone: '029 2010 0300',
    hours: 'Mon–Fri 10:00–16:00; Welsh and English',
    services: ['Rent', 'Energy bills', 'Debt'],
    lead: 'Eleri Morgan',
    role: 'Principal adviser',
    about:
      'Riverside covers Cardiff and the Vale. Appointments can be in Welsh. They hold the local Discretionary Housing Payment clinic every Wednesday.',
    image: IMG.partner3,
  },
];

export type LivedStory = {
  slug: string;
  href: string;
  name: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

export const STORIES: LivedStory[] = [
  {
    slug: 'maria-winter-bills',
    href: '/stories/maria-winter-bills',
    name: 'Maria',
    title: 'The meter went dark in January',
    excerpt:
      'A prepayment meter and a broken boiler. Northgate sat with Maria on the supplier call the same afternoon — then kept a chair by the radiator when the library cut hours.',
    image: IMG.story1,
    body: [
      'Maria had been rationing the meter for a fortnight. When the credit ran out on a Tuesday, the house dropped below 12°C and the boiler would not restart.',
      'A neighbour walked her to Northgate. Jordan Hale requested a same-day vendor credit, booked a warm-home visit, and sat on the supplier call so Maria did not have to explain the meter twice.',
      'The precinct library behind the hub now closes at 13:00 on Wednesdays. Northgate kept a chair by the radiator and a kettle that does not run out. If you need the warm space and not an appointment, say so at reception — you do not need a referral.',
      'Maria now has a repayment plan she can actually keep. The hub checks in once a month through March. Winter gifts to the Openhand appeal are matched until 21 December; that match is what kept a caseworker in the room for her second appointment.',
    ],
  },
  {
    slug: 'jamal-first-parcel',
    href: '/stories/jamal-first-parcel',
    name: 'Jamal',
    title: 'The first parcel was harder than asking',
    excerpt:
      'St Mark’s packed three days of food without a referral letter. Jamal came back to volunteer — and still collects on the Saturday open day if he needs to.',
    image: IMG.story2,
    body: [
      'Jamal had not eaten a proper meal in two days. He expected a form. Reception asked one question: had a child in the house eaten today?',
      'The parcel included rice, tins, and a voucher for milk. A follow-up was booked before he left. You do not need a professional referral for an Openhand pantry; parcels cover three days.',
      'St Mark’s now opens the pantry on a Saturday so people who work weekdays can still collect. Jamal helps on those mornings. “I needed the door to open once. After that I could plan.”',
      'If a child in the household has not eaten today, say so at reception. That is treated as an emergency pathway, not a waiting-list item.',
    ],
  },
];

export type Appeal = {
  slug: string;
  href: string;
  title: string;
  kicker: string;
  summary: string;
  raised: number;
  target: number;
  matchUntil: string;
  image: string;
};

export const APPEALS: Appeal[] = [
  {
    slug: 'winter',
    href: '/appeals/winter',
    title: 'Winter warmth',
    kicker: 'Seasonal appeal',
    summary:
      'Keep the heating on for households already in crisis. Every gift this month is matched by a corporate partner until the campaign closes.',
    raised: 1842500,
    target: 2500000,
    matchUntil: '2026-12-21T23:59:59Z',
    image: IMG.appealWinter,
  },
  {
    slug: 'emergency',
    href: '/appeals/emergency',
    title: 'Emergency response',
    kicker: 'Live appeal',
    summary:
      'When a flood, fire or sudden displacement hits, this appeal funds partner centres in the first 72 hours — beds, food, and a caseworker on the ground.',
    raised: 640000,
    target: 1000000,
    matchUntil: '2026-10-01T23:59:59Z',
    image: IMG.heroGive,
  },
];

export type FundraiseEvent = {
  id: string;
  title: string;
  date: string;
  place: string;
  href: string;
};

export const FUNDRAISE_EVENTS: FundraiseEvent[] = [
  {
    id: '1',
    title: 'Leeds winter walk',
    date: '18 October 2026',
    place: 'Roundhay Park',
    href: '/events/leeds-winter-walk',
  },
  {
    id: '2',
    title: 'Adviser training day',
    date: '4 November 2026',
    place: 'Northgate Community Hub',
    href: '/events/adviser-training-day',
  },
  {
    id: '3',
    title: 'St Mark’s pantry open Saturday',
    date: '24 October 2026',
    place: "St Mark's Crisis Centre",
    href: '/events/pantry-open-saturday',
  },
  {
    id: '4',
    title: 'Coffee morning kit',
    date: 'Any Saturday',
    place: 'Your kitchen',
    href: '/events',
  },
];

export const EVENTS_COPY = {
  listingTitle: 'Events and training',
  listingIntro:
    'Walks, adviser training and pantry open days. Register from the event page — speakers are the same partner leads the rest of the demo already names.',
  register: 'Register',
  tabs: ['Overview', 'Speakers', 'Agenda'] as const,
};

export type CatalogEvent = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  href: string;
  image: string;
  price: string;
  audience: string;
  speakerSlugs: string[];
  registerHref: string;
};

export const EVENTS_CATALOG: CatalogEvent[] = [
  {
    slug: 'leeds-winter-walk',
    kicker: 'FUNDRAISE',
    title: 'Leeds winter walk',
    summary:
      'A five-mile loop around Roundhay Park. Jordan Hale opens the route. Gifts raised go to the winter match.',
    dateLabel: '18 October 2026',
    timeLabel: '09:30 - 13:00 BST',
    location: 'Roundhay Park, Leeds',
    href: '/events/leeds-winter-walk',
    image: IMG.appealWinter,
    price: 'Pay what you raise',
    audience: 'Supporters, families and Northgate volunteers',
    speakerSlugs: ['jordan-hale'],
    registerHref: '/donate',
  },
  {
    slug: 'adviser-training-day',
    kicker: 'TRAINING',
    title: 'Adviser training day — energy and rent in one room',
    summary:
      'Eleri Morgan walks Discretionary Housing Payments; Jordan Hale covers supplier calls and winter disconnection rights.',
    dateLabel: '4 November 2026',
    timeLabel: '10:00 - 16:00 GMT',
    location: 'Northgate Community Hub, Leeds LS7',
    href: '/events/adviser-training-day',
    image: IMG.promo1,
    price: 'Free for partner staff',
    audience: 'Partner advisers and volunteer caseworkers',
    speakerSlugs: ['eleri-morgan', 'jordan-hale'],
    registerHref: 'mailto:jordan.hale@openhand.org.uk',
  },
  {
    slug: 'pantry-open-saturday',
    kicker: 'DROP-IN',
    title: 'St Mark’s pantry open Saturday',
    summary:
      'St Mark’s opens the pantry on a Saturday so people who work weekdays can still collect a three-day parcel. No referral letter.',
    dateLabel: '24 October 2026',
    timeLabel: '09:00 - 13:00 BST',
    location: "St Mark's Crisis Centre, Birmingham B19",
    href: '/events/pantry-open-saturday',
    image: IMG.story2,
    price: 'Free',
    audience: 'Anyone who needs a parcel — no referral letter',
    speakerSlugs: ['sam-okoro'],
    registerHref: '/get-help/help-when-the-money-runs-out',
  },
];

export const NEWS_COPY = {
  listingTitle: 'News',
  listingIntro:
    'The winter match and what it funds at partner hubs. ArticlePages reuse the same authors as advice — Jordan Hale, Eleri Morgan and Sam Okoro.',
};

export type NewsArticle = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  updated: string;
  authorSlug: string;
  image: string;
  body: string[];
  related: string[];
};

export const NEWS: NewsArticle[] = [
  {
    slug: 'winter-match-extended',
    href: '/news/winter-match-extended',
    title: 'Winter match extended to 21 December',
    summary:
      'Every gift to the winter appeal is matched until 21 December. That funds energy grants at Northgate, the Saturday pantry at St Mark’s, and Riverside’s Wednesday DHP clinic.',
    updated: '15 September 2026',
    authorSlug: 'jordan-hale',
    image: IMG.appealWinter,
    related: ['/appeals/winter', '/get-help/help-with-energy-bills', '/stories/maria-winter-bills'],
    body: [
      'The corporate match on winter gifts now runs to 21 December, not the original October close. That is two more months of doubled energy-grant applications at Northgate, St Mark’s and Riverside.',
      'Jordan Hale: “We were turning people away from a second appointment in January last year. The match is what keeps a caseworker in the room.” The precinct library behind Northgate now closes at 13:00 on Wednesdays; the hub stayed open as a warm space. If you need the chair and not an appointment, say so at reception.',
      'Riverside Advice Service still holds the Discretionary Housing Payment clinic every Wednesday in Cardiff. Appointments can be in Welsh. Bring the notice, a tenancy, and a bank statement. If a section 21 is defective they write that afternoon.',
      'Donate from the winter appeal page. Gifts of £15, £30, £75 or £150 all count. The match is not a condition of getting help.',
    ],
  },
];

export function getEventBySlug(slug: string): CatalogEvent | undefined {
  return EVENTS_CATALOG.find((item) => item.slug === slug);
}

export const GIFT_VALUES = [
  { amount: 15, label: 'A warm space for one afternoon' },
  { amount: 30, label: 'An energy grant application with an adviser' },
  { amount: 75, label: 'A three-day food parcel for a household' },
  { amount: 150, label: 'A matched winter gift' },
];

export type PersonCatalogEntry = {
  slug: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  office: string;
  bio: string;
};

export const PEOPLE: PersonCatalogEntry[] = [
  {
    slug: 'jordan-hale',
    name: 'Jordan Hale',
    jobTitle: 'Hub manager',
    phone: '0113 496 0100',
    email: 'jordan.hale@openhand.org.uk',
    office: 'Leeds',
    bio: 'Jordan Hale has run Northgate Community Hub since 2019 and still takes the first appointment of the day. Energy and rent cases sit in the same room so households are not sent across the city.',
  },
  {
    slug: 'eleri-morgan',
    name: 'Eleri Morgan',
    jobTitle: 'Principal adviser',
    phone: '029 2010 0300',
    email: 'eleri.morgan@openhand.org.uk',
    office: 'Cardiff',
    bio: 'Eleri Morgan is principal adviser at Riverside Advice Service, covering Cardiff and the Vale. Appointments can be in Welsh. Riverside holds the local Discretionary Housing Payment clinic every Wednesday.',
  },
  {
    slug: 'sam-okoro',
    name: 'Sam Okoro',
    jobTitle: 'Duty lead',
    phone: '0121 496 0200',
    email: 'sam.okoro@openhand.org.uk',
    office: 'Birmingham',
    bio: "Sam Okoro is duty lead at St Mark's Crisis Centre, the overnight pathway for the West Midlands. Food, a shower, and a same-day call to housing options sit on one desk.",
  },
];

/** PersonPage item IDs used by ArticlePage Select Authors. */
export const AUTHOR_ID_TO_SLUG: Record<string, string> = {
  '0e0a0030000040008000000000000071': 'jordan-hale',
  '0e0a0030000040008000000000000072': 'eleri-morgan',
  '0e0a0030000040008000000000000073': 'sam-okoro',
};

export const getPersonBySlug = (slug: string) => PEOPLE.find((person) => person.slug === slug);

export function eventSpeakers(slugs: string[]) {
  return slugs
    .map((slug) => getPersonBySlug(slug))
    .filter((person): person is PersonCatalogEntry => Boolean(person));
}

export type SearchHit = {
  title: string;
  href: string;
  type: string;
  summary: string;
};

export const SEARCH_INDEX: SearchHit[] = [
  ...ADVICE.map((item) => ({
    title: item.title,
    href: item.href,
    type: 'Advice',
    summary: item.summary,
  })),
  ...PARTNERS.map((item) => ({
    title: item.name,
    href: item.href,
    type: 'Partner',
    summary: `${item.city} · ${item.services.join(', ')}`,
  })),
  ...STORIES.map((item) => ({
    title: item.title,
    href: item.href,
    type: 'Story',
    summary: item.excerpt,
  })),
  ...APPEALS.map((item) => ({
    title: item.title,
    href: item.href,
    type: 'Appeal',
    summary: item.summary,
  })),
  ...PEOPLE.map((item) => ({
    title: item.name,
    href: `/people/${item.slug}`,
    type: 'People',
    summary: `${item.jobTitle} · ${item.office}`,
  })),
  ...EVENTS_CATALOG.map((item) => ({
    title: item.title,
    href: item.href,
    type: 'Event',
    summary: item.summary,
  })),
  ...NEWS.map((item) => ({
    title: item.title,
    href: item.href,
    type: 'News',
    summary: item.summary,
  })),
  {
    title: 'Donate',
    href: '/donate',
    type: 'Donate',
    summary: 'Choose a gift value. Winter gifts are matched.',
  },
  {
    title: 'Fair energy campaign',
    href: '/campaigns/fair-energy',
    type: 'Campaign',
    summary: 'Write to your MP. Stop winter disconnections without a court order.',
  },
];

export const searchCatalog = (query: string): SearchHit[] => {
  const q = query.trim().toLowerCase();
  if (!q) {
    return SEARCH_INDEX;
  }
  return SEARCH_INDEX.filter(
    (hit) =>
      hit.title.toLowerCase().includes(q) ||
      hit.summary.toLowerCase().includes(q) ||
      hit.type.toLowerCase().includes(q)
  );
};

export const adviceByHref = (href: string) => ADVICE.find((item) => item.href === href);
export const newsByHref = (href: string) => NEWS.find((item) => item.href === href);
export const partnerByHref = (href: string) => PARTNERS.find((item) => item.href === href);
export const storyByHref = (href: string) => STORIES.find((item) => item.href === href);
export const appealByHref = (href: string) => APPEALS.find((item) => item.href === href);
