export type PersonInsight = {
  title: string;
  href: string;
  kicker?: string;
  date?: string;
};

export type PersonExperience = {
  title: string;
  year: string;
  region?: string;
  sector?: string;
  service?: string;
  value?: string;
};

export type PersonCatalogEntry = {
  slug: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  office: string;
  linkedin?: string;
  photoSrc?: string;
  bio: string;
  specialisms: string[];
  credentials: { year: string; detail: string }[];
  experience?: PersonExperience[];
  insights?: PersonInsight[];
  relatedSlugs?: string[];
};

/** PersonPage item IDs used by ArticlePage Select Authors (T+1 Perspective). */
export const GUIDE_AUTHOR_SLUGS = ['elisabeth-plakinger', 'charlotte-byrne'];

export const AUTHOR_ID_TO_SLUG: Record<string, string> = {
  c4c000300000400080000000000003: 'charlotte-byrne',
  c4c000300000400080000000000002: 'elisabeth-plakinger',
};

export const PEOPLE_CATALOG: PersonCatalogEntry[] = [
  {
    slug: 'elisabeth-plakinger',
    name: 'Elisabeth Plakinger',
    jobTitle: 'Principal Consultant, Capital Markets',
    phone: '+44 (0) 20 7426 1900',
    email: 'elisabeth.plakinger@capco.com',
    office: 'London',
    photoSrc:
      'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/fee3986375f24d239e3366e7013a908e',
    bio: 'Elisabeth is a Principal Consultant in Capital Markets, focused on T+1 settlement and Europe markets. She helps post-trade and operations leaders prove readiness as settlement cycles compress.',
    specialisms: ['Capital Markets', 'T+1', 'Post-trade', 'Europe'],
    relatedSlugs: ['charlotte-byrne', 'anne-marie-rowland', 'marina-costa'],
    insights: [
      {
        kicker: 'PERSPECTIVE',
        title: 'Europe’s T+1 market must prove readiness',
        href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
        date: '15 September 2026',
      },
    ],
    experience: [
      {
        year: '2026',
        region: 'Europe',
        sector: 'Capital Markets',
        service: 'Post-trade',
        title:
          'Advised a European investment bank on T+1 settlement readiness — operating model, data quality, and fails management across cash equities.',
      },
      {
        year: '2025',
        region: 'United Kingdom',
        sector: 'Capital Markets',
        service: 'Market infrastructure',
        title:
          'Supported a market infrastructure client on settlement compression impact across CSD connectivity and client onboarding.',
      },
    ],
    credentials: [
      { year: '2026', detail: 'Europe’s T+1 market must prove readiness — Perspectives' },
      { year: '2019', detail: 'Joined Capco' },
    ],
  },
  {
    slug: 'charlotte-byrne',
    name: 'Charlotte Byrne',
    jobTitle: 'Principal Consultant, Banking & Payments',
    phone: '+44 (0) 20 7426 1900',
    email: 'charlotte.byrne@capco.com',
    office: 'London',
    photoSrc:
      'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/77e29c276cf64c0ead2440301aae1674',
    bio: 'Charlotte is a Principal Consultant in Banking and Payments. She advises banks on AI assistants as the front door to financial services — the client conversation that starts in a model, not a branch.',
    specialisms: ['Banking and Payments', 'AI assistants', 'Digital banking'],
    relatedSlugs: ['elisabeth-plakinger', 'anne-marie-rowland', 'marina-costa'],
    insights: [
      {
        kicker: 'PERSPECTIVE',
        title: 'AI assistants as the front door to financial services',
        href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
        date: '17 August 2026',
      },
    ],
    experience: [
      {
        year: '2026',
        region: 'United Kingdom',
        sector: 'Banking and Payments',
        service: 'Digital',
        title:
          'Helped a retail bank design AI-assistant journeys as the first-line client channel, with human handover and auditability.',
      },
    ],
    credentials: [
      { year: '2026', detail: 'AI assistants as the front door to FS — Perspectives' },
      { year: '2018', detail: 'Joined Capco' },
    ],
  },
  {
    slug: 'anne-marie-rowland',
    name: 'Anne-Marie Rowland',
    jobTitle: 'Chief Executive Officer',
    phone: '+44 (0) 20 7426 1900',
    email: 'anne-marie.rowland@capco.com',
    office: 'London',
    photoSrc:
      'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c4e526f71b09423a85e2e29df73a7241',
    bio: 'Anne-Marie Rowland is Chief Executive Officer of Capco, a Wipro company. She leads a global management and technology consultancy specialising in financial services and energy — The Expert Advantage.',
    specialisms: ['Leadership', 'Financial Services', 'Energy'],
    relatedSlugs: ['elisabeth-plakinger', 'charlotte-byrne', 'marina-costa'],
    credentials: [{ year: '2024', detail: 'Appointed Chief Executive Officer, Capco' }],
  },
  {
    slug: 'marina-costa',
    name: 'Marina Costa',
    jobTitle: 'Senior Consultant',
    phone: '',
    email: 'marina.costa@capco.com',
    office: 'Brazil',
    photoSrc:
      'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c2534fb7f7fb4e86b619cd21fd79196e',
    bio: 'Marina is a Senior Consultant based in Brazil. She appears on Join Us as a Meet our people story — consultants are the product, including the next generation joining Capco.',
    specialisms: ['Banking and Payments', 'Careers'],
    relatedSlugs: ['elisabeth-plakinger', 'charlotte-byrne', 'anne-marie-rowland'],
    credentials: [{ year: '2023', detail: 'Joined Capco, Brazil' }],
  },
];

export const PRIMARY_NAV = [
  { href: '/about-us', label: 'Our Story' },
  { href: '/industries', label: 'Expertise' },
  { href: '/perspectives', label: 'Perspectives' },
  { href: '/people', label: 'Meet our people' },
  { href: '/careers', label: 'Join Us' },
];

export const FOOTER_LINKS = [
  { href: '/about-us', label: 'Terms' },
  { href: '/about-us', label: 'Privacy' },
  { href: '/about-us', label: 'Cookie' },
  { href: '/about-us', label: 'Accessibility' },
  { href: '/careers', label: 'Careers' },
  { href: '/about-us', label: 'Contact' },
];

export const PEOPLE_INTRO =
  'Consultants are the product. Browse Capco people by industry, capability and location — from T+1 settlement in London to careers stories in Brazil — and find the expert who matches the problem.';

export function getPersonBySlug(slug: string): PersonCatalogEntry | undefined {
  return PEOPLE_CATALOG.find((p) => p.slug === slug);
}

export function relatedPeople(slug: string): PersonCatalogEntry[] {
  const person = getPersonBySlug(slug);
  if (person?.relatedSlugs?.length) {
    return person.relatedSlugs
      .map((relatedSlug) => getPersonBySlug(relatedSlug))
      .filter((entry): entry is PersonCatalogEntry => Boolean(entry));
  }
  const others = PEOPLE_CATALOG.filter((p) => p.slug !== slug);
  if (!person) return others.slice(0, 4);
  const scored = others
    .map((candidate) => ({
      candidate,
      score: candidate.specialisms.filter((tag) => person.specialisms.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);
  const affinity = scored.filter((row) => row.score > 0).map((row) => row.candidate);
  return (affinity.length > 0 ? affinity : scored.map((row) => row.candidate)).slice(0, 4);
}

export function searchPeople(query: string): PersonCatalogEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return PEOPLE_CATALOG;
  return PEOPLE_CATALOG.filter((p) => {
    const hay = [p.name, p.jobTitle, p.office, p.email, ...p.specialisms, p.bio]
      .join(' ')
      .toLowerCase();
    return hay.includes(q);
  });
}
