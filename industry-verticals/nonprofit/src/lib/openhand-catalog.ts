export type NavItem = { href: string; label: string };

export const BRAND = {
  name: 'Openhand',
  tagline: 'Help close to home. Hope further afield.',
  copyright: '© 2026 Openhand. Registered charity in England and Wales.',
};

export const PRIMARY_NAV: NavItem[] = [
  { href: '/get-help', label: 'Get help' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/fundraise', label: 'Get involved' },
  { href: '/appeals/winter', label: 'Appeals' },
  { href: '/stories', label: 'Stories' },
];

export const FOOTER_LINKS: NavItem[] = [
  { href: '/get-help', label: 'Get help' },
  { href: '/get-help/near-you', label: 'In your area' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/donate', label: 'Donate' },
  { href: '/fundraise', label: 'Fundraise' },
  { href: '/appeals/emergency', label: 'Emergency appeal' },
  { href: '/campaigns/fair-energy', label: 'Fair energy' },
  { href: '/stories', label: 'Stories' },
  { href: '/search', label: 'Search' },
];

export const IMG = {
  heroGive: '/openhand/hero-give.jpg',
  appealWinter: '/openhand/appeal-winter.jpg',
  promo1: '/openhand/promo-1.jpg',
  promo2: '/openhand/promo-2.jpg',
  promo3: '/openhand/promo-3.jpg',
  story1: '/openhand/story-1.jpg',
  story2: '/openhand/story-2.jpg',
  story3: '/openhand/story-3.jpg',
  story4: '/openhand/story-4.jpg',
  partner1: '/openhand/partner-1.jpg',
  partner2: '/openhand/partner-2.jpg',
  partner3: '/openhand/partner-3.jpg',
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
      '/get-help/emergency-help-with-food',
      '/get-help/what-to-do-if-you-cannot-pay-your-rent',
      '/get-help/help-with-energy-bills',
      '/get-help/near-you',
    ],
    body: [
      'If you are in the UK and the money has run out — rent short, empty cupboards, a bill you cannot pay this week — start with emergency help, not a loan.',
      'Local welfare / household support schemes and food aid are usually faster than a new benefit claim.',
      'National advice services can triage debt and housing. A crisis grant from a charity is often the next step if you need cash or goods this week.',
      'You should not be asked to donate before you get help.',
      'Openhand is a UK poverty and financial-crisis charity. Call the freephone line 0800 090 0000, Monday to Saturday 8am–8pm, or go to a local community partner such as Northgate, St Mark’s or Riverside.',
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
      '/get-help/emergency-help-with-food',
    ],
    body: [
      'You cannot be disconnected in winter for a debt on a domestic energy account without a court order. Contact your supplier first and ask for a breathing-space arrangement.',
      'Openhand partners can apply for the Household Support Fund on your behalf in most English local authorities, and for the Scottish Public Health Fund where you live north of the border.',
      'If a prepayment meter is leaving you without heat, that is an emergency. Call the partner nearest you — they can request a same-day credit and a safe-and-warm visit.',
      'Keep a copy of your last bill, any DWP letter, and a photo of the meter. Advisers use those three items to unlock grants without a second appointment.',
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
    related: [
      '/get-help/help-when-the-money-runs-out',
      '/get-help/help-with-energy-bills',
      '/get-help/emergency-help-with-food',
    ],
    body: [
      'Do not ignore a notice. A section 8 or section 21 letter has a clock on it. Bring it to a local partner the same day — they can check whether the notice is valid.',
      'Ask your landlord in writing for a repayment plan before the next rent date. Keep the email. Courts look for that attempt.',
      'Discretionary Housing Payments sit with your local authority, not DWP. Partners at Northgate, St Mark’s and Riverside complete the form with you.',
      'If you have a possession hearing listed, tell the adviser immediately. Duty schemes at the county court can still stop a warrant on the day.',
    ],
  },
  {
    slug: 'emergency-help-with-food',
    href: '/get-help/emergency-help-with-food',
    title: 'Emergency help with food',
    summary:
      'Same-day food parcels, supermarket vouchers, and how to find a partner pantry that does not require a referral letter.',
    updated: '2 September 2026',
    letter: 'F',
    authorSlug: 'sam-okoro',
    image: IMG.story2,
    related: ['/get-help/help-when-the-money-runs-out', '/get-help/near-you'],
    body: [
      'You do not need a professional referral to use an Openhand partner pantry. Bring photo ID if you have it; if you do not, the hub can still serve you once.',
      'Parcels are packed for three days. If you need longer, the adviser will book a follow-up rather than handing out a second parcel at the door.',
      'Vouchers for a local supermarket are limited and usually reserved for households with no cooking facilities.',
      'If a child in the household has not eaten today, say so at reception. That is treated as an emergency pathway, not a waiting-list item.',
    ],
  },
  {
    slug: 'help-with-council-tax',
    href: '/get-help/help-with-council-tax',
    title: 'Help with council tax',
    summary:
      'Council tax support sits with your local authority, not DWP. This page covers reduction schemes, recovery letters, and when a partner should call the council with you.',
    updated: '14 September 2026',
    letter: 'C',
    authorSlug: 'jordan-hale',
    image: IMG.story3,
    related: ['/get-help/help-with-energy-bills', '/get-help/applying-for-universal-credit'],
    body: [
      'A council tax reminder is not a court summons. Bring the letter to a partner the same week — recovery moves faster than rent arrears in some authorities.',
      'Ask for a reduction under the local Council Tax Support scheme before you agree a repayment plan. Northgate completes that form with you.',
      'If bailiffs are already instructed, say so at reception. Partners can still request a hold while support is assessed.',
      'Keep bank statements for the last month. Advisers use those to evidence that a lump-sum clearance is not realistic.',
    ],
  },
  {
    slug: 'applying-for-universal-credit',
    href: '/get-help/applying-for-universal-credit',
    title: 'Applying for Universal Credit',
    summary:
      'The first five weeks of Universal Credit are the hardest. This page lists what to bring, how advances work, and when a partner should sit with you on the journal.',
    updated: '10 September 2026',
    letter: 'U',
    authorSlug: 'eleri-morgan',
    image: IMG.appealWinter,
    related: [
      '/get-help/help-with-council-tax',
      '/get-help/what-to-do-if-you-cannot-pay-your-rent',
    ],
    body: [
      'You can start a Universal Credit claim online. If you cannot, a partner can book a supported claim at the jobcentre or complete it with you in the hub.',
      'An advance is a loan against your first payment. Take it if rent is due before the first UC date — then ask the adviser to set a repayment you can keep.',
      'Upload ID, a tenancy, and a bank statement on day one. Missing documents are the most common reason a claim stalls.',
      'If you have a limited capability for work, tell the adviser. That changes the work-search requirements and can unlock a different element.',
    ],
  },
];

export const AZ_INDEX: { letter: string; title: string; href: string }[] = [
  { letter: 'B', title: 'Bills — energy', href: '/get-help/help-with-energy-bills' },
  { letter: 'C', title: 'Council tax', href: '/get-help/help-with-council-tax' },
  {
    letter: 'E',
    title: 'Emergency help — money ran out',
    href: '/get-help/help-when-the-money-runs-out',
  },
  { letter: 'E', title: 'Energy bills', href: '/get-help/help-with-energy-bills' },
  { letter: 'F', title: 'Food — emergency parcels', href: '/get-help/emergency-help-with-food' },
  { letter: 'G', title: 'Grants — crisis', href: '/get-help/help-when-the-money-runs-out' },
  { letter: 'H', title: 'Heating grants', href: '/get-help/help-with-energy-bills' },
  { letter: 'M', title: 'Money runs out', href: '/get-help/help-when-the-money-runs-out' },
  { letter: 'R', title: 'Rent arrears', href: '/get-help/what-to-do-if-you-cannot-pay-your-rent' },
  { letter: 'U', title: 'Universal Credit', href: '/get-help/applying-for-universal-credit' },
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
      'A prepayment meter and a broken boiler. Northgate sat with Maria on the supplier call the same afternoon.',
    image: IMG.story1,
    body: [
      'Maria had been rationing the meter for a fortnight. When the credit ran out on a Tuesday, the house dropped below 12°C.',
      'A neighbour walked her to Northgate. Jordan Hale requested a same-day vendor credit and booked a warm-home visit.',
      'She now has a repayment plan she can actually keep, and the hub checks in once a month through March.',
    ],
  },
  {
    slug: 'jamal-first-parcel',
    href: '/stories/jamal-first-parcel',
    name: 'Jamal',
    title: 'The first parcel was harder than asking',
    excerpt:
      'St Mark’s packed three days of food without a referral letter. Jamal came back to volunteer.',
    image: IMG.story2,
    body: [
      'Jamal had not eaten a proper meal in two days. He expected a form. Reception asked one question: had a child in the house eaten today?',
      'The parcel included rice, tins, and a voucher for milk. A follow-up was booked before he left.',
      'He now helps on Saturday mornings. “I needed the door to open once. After that I could plan.”',
    ],
  },
  {
    slug: 'aisha-rent-notice',
    href: '/stories/aisha-rent-notice',
    name: 'Aisha',
    title: 'The notice was not valid. Nobody had checked.',
    excerpt: 'Riverside spotted a defective section 21 the morning Aisha brought it in.',
    image: IMG.story3,
    body: [
      'Aisha thought she had ten days to leave. Eleri Morgan read the notice and found the date and the prescribed form were wrong.',
      'They wrote to the landlord that afternoon. The possession claim was withdrawn.',
      'Aisha still had arrears. A Discretionary Housing Payment covered six weeks while Universal Credit caught up.',
    ],
  },
  {
    slug: 'elaine-warm-space',
    href: '/stories/elaine-warm-space',
    name: 'Elaine',
    title: 'The library closed. The hub stayed open.',
    excerpt: 'Elaine used Northgate as a warm space, then stayed to greet people at the door.',
    image: IMG.story4,
    body: [
      'When the branch library cut its hours, Elaine lost the only heated room she used in the afternoon.',
      'Northgate kept a chair by the radiator and a kettle that did not run out. She started saying hello to new visitors.',
      'She is now a volunteer greeter two days a week. “I know what the door feels like from the outside.”',
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
    registerHref: '/get-help/emergency-help-with-food',
  },
];

export const NEWS_COPY = {
  listingTitle: 'News',
  listingIntro:
    'Updates from partner hubs and the winter appeal. These ArticlePages reuse the same authors as advice — Jordan Hale, Eleri Morgan and Sam Okoro.',
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
      'Every gift to the winter appeal is matched until 21 December. Jordan Hale explains what the extra weeks mean for Northgate energy cases.',
    updated: '15 September 2026',
    authorSlug: 'jordan-hale',
    image: IMG.appealWinter,
    related: ['/news/northgate-keeps-a-warm-space-open', '/appeals/winter'],
    body: [
      'The corporate match on winter gifts now runs to 21 December, not the original October close. That is two more months of doubled energy-grant applications at Northgate, St Mark’s and Riverside.',
      'Jordan Hale: “We were turning people away from a second appointment in January last year. The match is what keeps a caseworker in the room.”',
      'Donate from the winter appeal page. Gifts of £15, £30, £75 or £150 all count.',
    ],
  },
  {
    slug: 'northgate-keeps-a-warm-space-open',
    href: '/news/northgate-keeps-a-warm-space-open',
    title: 'Northgate keeps a warm space open after library hours',
    summary:
      'When the precinct library cut afternoon hours, Northgate kept a chair by the radiator and a kettle that does not run out.',
    updated: '10 September 2026',
    authorSlug: 'jordan-hale',
    image: IMG.partner1,
    related: ['/stories/elaine-warm-space', '/partners/northgate-community-hub'],
    body: [
      'The branch library behind Northgate now closes at 13:00 on Wednesdays. The hub stayed open. Elaine’s story on this site started in that chair.',
      'Jordan Hale still takes the first appointment of the day. Energy and rent sit in the same room so households are not sent across the city.',
      'If you need the warm space and not an appointment, say so at reception. You do not need a referral.',
    ],
  },
  {
    slug: 'cardiff-dhp-clinic-every-wednesday',
    href: '/news/cardiff-dhp-clinic-every-wednesday',
    title: 'Cardiff DHP clinic every Wednesday',
    summary:
      'Riverside Advice Service holds the Discretionary Housing Payment clinic every Wednesday. Appointments can be in Welsh.',
    updated: '8 September 2026',
    authorSlug: 'eleri-morgan',
    image: IMG.promo2,
    related: [
      '/get-help/what-to-do-if-you-cannot-pay-your-rent',
      '/partners/riverside-advice-service',
    ],
    body: [
      'Discretionary Housing Payments sit with the local authority, not DWP. Riverside completes the form with you on Wednesday mornings in Cardiff and the Vale.',
      'Eleri Morgan: “Bring the notice, a tenancy, and a bank statement. If the section 21 is defective we write that afternoon — Aisha’s story on this site is that pathway.”',
      'Book from the Riverside partner page or drop in if a possession hearing is already listed.',
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
