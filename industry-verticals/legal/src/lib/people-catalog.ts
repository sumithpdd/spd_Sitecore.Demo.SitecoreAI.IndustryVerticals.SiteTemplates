export type PersonInsight = {
  title: string;
  href: string;
};

export type PersonCatalogEntry = {
  slug: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  office: string;
  linkedin?: string;
  bio: string;
  specialisms: string[];
  credentials: { year: string; detail: string }[];
  insights?: PersonInsight[];
};

export const PEOPLE_CATALOG: PersonCatalogEntry[] = [
  {
    slug: 'dawn-allen',
    name: 'Dawn Allen',
    jobTitle: 'Partner',
    phone: '+44 (0) 7771 842 600',
    email: 'dawn.allen@pinsentmasons.com',
    office: 'Leeds',
    linkedin: 'https://www.linkedin.com/in/dawn-allen-b8398919',
    bio: 'Dawn focuses on non-contentious restructuring and insolvency engagements and advises a range of stakeholders, predominantly financial institutions as well as accountants, corporate clients and their boards of directors.',
    specialisms: ['Restructuring', 'Insolvency', 'Financial Services'],
    insights: [
      {
        title: 'When UK suppliers must continue to supply insolvent companies',
        href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
      },
    ],
    credentials: [
      {
        year: '2024',
        detail:
          'Essential supplier obligations — technology supplier during customer administration (confidentiality cleared)',
      },
      { year: '2006', detail: 'Barclays Bank plc, Legal Secondee' },
      { year: '2002', detail: 'Qualified - England and Wales' },
      { year: '1999', detail: 'Leeds Metropolitan University - Legal Practice Course' },
      { year: '1999', detail: 'Joined Pinsent Masons' },
      { year: '1998', detail: 'Leeds Metropolitan University - CPE' },
      { year: '1997', detail: 'Bradford University - BA (Hons) Business with Law' },
    ],
  },
  {
    slug: 'bill-ryan',
    name: 'Bill Ryan',
    jobTitle: 'Partner',
    phone: '+61 407 831 221',
    email: 'bill.ryan@pinsentmasons.com',
    office: 'Australia',
    bio: 'Bill specialises in advising the construction, engineering and energy industry sectors primarily in relation to contentious matters. His recent experience includes co-managing large teams in arbitration proceedings arising from LNG and processing plant projects in Queensland and Western Australia.',
    specialisms: ['Construction', 'Energy'],
    credentials: [],
  },
  {
    slug: 'barry-mccaig',
    name: 'Barry McCaig',
    jobTitle: 'Partner, Head of Office, Glasgow',
    phone: '+44 (0) 7796 274 548',
    email: 'barry.mccaig@pinsentmasons.com',
    office: 'Glasgow',
    bio: 'Barry is Head of the Glasgow office and of the Corporate practice group in Scotland.',
    specialisms: ['Corporate'],
    credentials: [],
  },
  {
    slug: 'bryn-reynolds',
    name: 'Bryn Reynolds',
    jobTitle: 'Partner',
    phone: '+44 7340 152 045',
    email: 'bryn.reynolds@pinsentmasons.com',
    office: 'London',
    bio: 'Bryn is a chartered accountant and chartered tax advisor who advises large businesses on all indirect tax issues including VAT, IPT and customs duties. He primarily advises large financial institutions and TMT clients including FinTech.',
    specialisms: ['Tax', 'Financial Services'],
    credentials: [],
  },
  {
    slug: 'ben-mckinley',
    name: 'Ben McKinley',
    jobTitle: 'Partner',
    phone: '+61 417 160 359',
    email: 'ben.mckinley@pinsentmasons.com',
    office: 'Australia',
    bio: 'Ben’s expertise is advising and representing employers in all aspects of employment, industrial relations, and safety law. He is highly regarded for his pragmatic and strategic advice, and works closely with clients to build trust and an in-depth understanding of their business.',
    specialisms: ['Employment'],
    credentials: [],
  },
];

export const PRIMARY_NAV = [
  { href: '/expertise', label: 'Expertise' },
  { href: '/people', label: 'People' },
  { href: '/thinking', label: 'Thinking' },
  { href: '/offices', label: 'Offices' },
  { href: '/careers', label: 'Careers' },
  { href: '/about-us', label: 'About us' },
];

export const FOOTER_LINKS = [
  { href: '/about-us', label: 'Legal Notices' },
  { href: '/about-us', label: 'Privacy Policy' },
  { href: '/about-us', label: 'Cookie Policy' },
  { href: '/about-us', label: 'Accessibility' },
  { href: '/careers', label: 'Careers' },
  { href: '/about-us', label: 'Modern Slavery' },
];

export const PEOPLE_INTRO =
  "Whatever your requirements, we'll bring together the right team for you. Over 490 partners and 3000 people around the world are ready to help. Browse the team or search for the person or specialism you're looking for.";

export function getPersonBySlug(slug: string): PersonCatalogEntry | undefined {
  return PEOPLE_CATALOG.find((p) => p.slug === slug);
}

export function relatedPeople(slug: string): PersonCatalogEntry[] {
  const person = getPersonBySlug(slug);
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
