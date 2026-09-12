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

const LIVE_OUTLAW_INSIGHTS: PersonInsight[] = [
  {
    kicker: 'OUT-LAW NEWS',
    title: 'UK government plans to revamp holiday pay calculation for part-year workers',
    href: '/out-law/news/uk-government-plans-to-revamp-holiday-pay-calculation-for-part-year-workers',
    date: '19 January 2023',
  },
  {
    kicker: 'OUT-LAW ANALYSIS',
    title: 'Pensions disputes: managing member expectations paramount',
    href: '/out-law/news/pensions-disputes-managing-member-expectations-paramount',
    date: '23 February 2021',
  },
  {
    kicker: 'OUT-LAW ANALYSIS',
    title: 'UK subsidy control post-Brexit: access to effective judicial remedies',
    href: '/out-law/news/uk-subsidy-control-post-brexit-access-to-effective-judicial-remedies',
    date: '1 February 2021',
  },
  {
    kicker: 'OUT-LAW NEWS',
    title: "'Steps of court' settlement was not negligent, court rules",
    href: '/out-law/news/steps-of-court-settlement-was-not-negligent-court-rules',
    date: '8 February 2016',
  },
  {
    kicker: 'OUT-LAW NEWS',
    title: "'Vast majority' of companies not seeking to avoid tax",
    href: '/out-law/news/vast-majority-of-companies-not-seeking-to-avoid-tax',
    date: '27 August 2020',
  },
  {
    kicker: 'OUT-LAW NEWS',
    title: "'World first' industrial decarbonisation strategy developed in the UK",
    href: '/out-law/news/world-first-industrial-decarbonisation-strategy-developed-in-the-uk',
    date: '19 March 2021',
  },
  {
    kicker: 'OUT-LAW ANALYSIS',
    title: '3D printing: UK product safety issues',
    href: '/out-law/news/3d-printing-uk-product-safety-issues',
    date: '21 September 2020',
  },
  {
    kicker: 'OUT-LAW NEWS',
    title: '5G potential for business highlighted in UK funding programme',
    href: '/out-law/news/5g-potential-for-business-highlighted-in-uk-funding-programme',
    date: '18 January 2021',
  },
];

const ALSO_VIEWED = ['desiree-fields', 'dinesh-banani', 'david-barker', 'david-doogan'];

export const GUIDE_AUTHOR_SLUGS = ['sally-williamson', 'dawn-allen'];

/** PersonPage item IDs used by ArticlePage Select Authors (CIGA guide). */
export const AUTHOR_ID_TO_SLUG: Record<string, string> = {
  a1e90030000040008000000000000c: 'sally-williamson',
  a1e900300000400080000000000002: 'dawn-allen',
};

const SALLY_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/11166c8ef6d245c7bef0d4356193c9d7';
const DAWN_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/fc4540fa91034385b4f8b29267943322';
const BILL_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9e82f560583e4332af039f6d4a08cf42';
const HAMMAD_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/6357bbf7f34246e4b7aad215a603362a';
const DESIREE_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e9feed2e48664d5682bb7de5040eb744';
const DINESH_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/4a2f5cc3cabd467eb75c03c5ac7e0b48';
const BARKER_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/872630383a624f9d94f17245454de16f';
const DOOGAN_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d9910e93814441a283e68606abb6c7f5';
const BARRY_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2b5b1d830fcc46be8f8f44ded1677f4b';
const BRYN_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d6cbefd639a7455ebe6fa012f47e883a';
const BEN_PHOTO =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/cf022e4a49494f40a0eea03d94f56c74';

export const PEOPLE_CATALOG: PersonCatalogEntry[] = [
  {
    slug: 'sally-williamson',
    name: 'Sally Williamson',
    jobTitle: 'Managing Senior Practice Development Lawyer',
    phone: '+44 (0) 7393 761 964',
    email: 'sally.williamson@pinsentmasons.com',
    office: 'United Kingdom',
    photoSrc: SALLY_PHOTO,
    bio: 'Sally is a Managing Senior Practice Development Lawyer specialising in restructuring and insolvency. She delivers training, monitors market developments, and develops best practices for the national restructuring team.',
    specialisms: ['Restructuring', 'Insolvency'],
    credentials: [],
    relatedSlugs: ['david-doogan', 'dawn-allen', 'hammad-akhtar', 'bill-ryan'],
    insights: [
      {
        kicker: 'OUT-LAW GUIDE',
        title: 'When UK suppliers must continue to supply insolvent companies',
        href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
        date: '6 March 2024',
      },
      ...LIVE_OUTLAW_INSIGHTS,
    ],
  },
  {
    slug: 'dawn-allen',
    name: 'Dawn Allen',
    jobTitle: 'Partner',
    phone: '+44 (0) 7771 842 600',
    email: 'dawn.allen@pinsentmasons.com',
    office: 'Leeds',
    photoSrc: DAWN_PHOTO,
    linkedin: 'https://www.linkedin.com/in/dawn-allen-b8398919',
    bio: 'Dawn focuses on non-contentious restructuring and insolvency engagements and advises a range of stakeholders, predominantly financial institutions as well as accountants, corporate clients and their boards of directors.',
    specialisms: ['Restructuring'],
    relatedSlugs: ALSO_VIEWED,
    insights: LIVE_OUTLAW_INSIGHTS,
    experience: [
      {
        year: '2026',
        region: 'United Kingdom',
        sector: 'Professional & Public Services',
        service: 'Restructuring',
        title:
          'Advised Interpath Limited following their appointment over three complex property development and construction companies with advice covering planning, health and safety the sale of numerous residential developments.',
      },
      {
        year: '2026',
        region: 'United Kingdom',
        sector: 'Professional & Public Services',
        service: 'Restructuring',
        title:
          'Advised a board of directors of a distressed AIM listed law firm on the regulatory aspects of their declining business, while also acting for the proposed administrators to explore sale or other insolvent solutions for the entire legal practice.',
      },
      {
        year: '2025',
        region: 'United Kingdom',
        sector: 'Technology, Science & Industry',
        service: 'Restructuring',
        title:
          'Acting for Keys Group in relation to their acquisition of the business and assets of Mable Therapy Limited, a provider of speech and adult language therapies.',
      },
      {
        year: '2025',
        region: 'United Kingdom',
        sector: 'Financial Services',
        service: 'Restructuring',
        title:
          "Advising a bank on the recovery of realisations from its customer's liquidators where the liquidator had sold the customers property and challenged the categorisation of the Bank's security.",
      },
      {
        year: '2025',
        region: 'United Kingdom',
        sector: 'Sport & Hospitality',
        service: 'Restructuring',
        title:
          'Acting for an investment fund on its acquisition of a UK golf club by way of a pre-pack administration purchase from its administrators.',
      },
      {
        year: '2024',
        region: 'United Kingdom',
        sector: 'Technology, Science & Industry',
        service: 'Restructuring',
        title:
          'Essential supplier obligations — technology supplier during customer administration (confidentiality cleared).',
      },
    ],
    credentials: [
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
    office: 'Melbourne',
    photoSrc: BILL_PHOTO,
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
    relatedSlugs: ALSO_VIEWED,
    insights: [
      {
        kicker: 'OUT-LAW ANALYSIS',
        title: 'A global view of the law applicable to an arbitration agreement',
        href: '/out-law',
        date: '11 February 2021',
      },
      {
        kicker: 'OUT-LAW ANALYSIS',
        title: 'As EU Council decides fate of trade talks, what exactly has been agreed so far?',
        href: '/out-law',
        date: '14 December 2017',
      },
      {
        kicker: 'OUT-LAW NEWS',
        title: 'Australia and UK agree to collaborate on low emissions technologies',
        href: '/out-law',
        date: '4 August 2021',
      },
    ],
    credentials: [
      { year: '2017', detail: 'Joined Pinsent Masons' },
      { year: '2001', detail: 'Qualified - Western Australia' },
      { year: '1992', detail: 'Qualified - Victoria, Australia' },
      { year: '1991', detail: 'University of Melbourne - BCom' },
      { year: '1991', detail: 'University of Melbourne - LLB' },
    ],
  },
  {
    slug: 'hammad-akhtar',
    name: 'Hammad Akhtar',
    jobTitle: 'Partner',
    phone: '+44 (0) 7901 517 365',
    email: 'hammad.akhtar@pinsentmasons.com',
    office: 'London',
    photoSrc: HAMMAD_PHOTO,
    bio: 'Hammad specialises in advising insurers, reinsurers and other financial institutions on corporate transactions such as M&A and reorganisations that, on occasion, involve Part VII transfers and schemes of arrangements.',
    specialisms: [
      'Corporate',
      'Life Insurance',
      'Mergers & Acquisitions',
      'Part VII Transfers',
      'Reinsurance',
      'Schemes of arrangement',
    ],
    relatedSlugs: ['bill-ryan', 'barry-mccaig', 'bryn-reynolds', 'ben-mckinley'],
    insights: LIVE_OUTLAW_INSIGHTS,
    credentials: [
      { year: '2017', detail: 'Joined Pinsent Masons' },
      { year: '2013', detail: 'Ashurst LLP, Partner' },
      { year: '2002', detail: 'Herbert Smith LLP, Partner' },
      { year: '2002', detail: 'Qualified - England and Wales' },
      { year: '1998', detail: 'College of Law – LPC' },
      { year: '1997', detail: 'College of Law – CPE (Law)' },
      {
        year: '1996',
        detail: 'University of Glasgow – MA (Hons) Economic and Social History/Management Studies',
      },
    ],
  },
  {
    slug: 'desiree-fields',
    name: 'Désirée Fields',
    jobTitle: 'Legal Director',
    phone: '+44 20 7054 2524',
    email: 'desiree.fields@pinsentmasons.com',
    office: 'London',
    photoSrc: DESIREE_PHOTO,
    bio: 'Désirée advises on worldwide trade mark and design portfolio management, international prosecution and clearance, enforcement, exploitation and commercialisation of trade marks and designs.',
    specialisms: ['Trade Marks', 'Designs', 'Intellectual Property'],
    relatedSlugs: ['dawn-allen', 'dinesh-banani', 'david-barker', 'david-doogan'],
    credentials: [
      { year: '2021', detail: 'Joined Pinsent Masons' },
      { year: '2018', detail: 'Qualified - Ireland' },
      { year: '2015', detail: 'DLA Piper UK LLP - Legal Director' },
      { year: '2015', detail: 'Stobbs - Senior Solicitor' },
      { year: '2008', detail: 'McDermott, Will & Emery UK LLP - Associate' },
      {
        year: '2007',
        detail: 'University of Bristol - Diploma, Intellectual Property Law and Practice',
      },
      { year: '2006', detail: 'Lovells LLP - Associate' },
      { year: '2006', detail: 'Lovells LLP - Trainee Solicitor' },
      { year: '2006', detail: 'Qualified - England & Wales' },
      { year: '2004', detail: 'BPP Law School - Post Graduate Diploma in Legal Practice' },
      { year: '2004', detail: 'Qualified - New York' },
      { year: '2002', detail: 'University of Toronto - LLM' },
      { year: '2001', detail: 'Queen Mary University of London - LLB' },
    ],
  },
  {
    slug: 'dinesh-banani',
    name: 'Dinesh Banani',
    jobTitle: 'Partner',
    phone: '+44 (0) 7345 181 819',
    email: 'dinesh.banani@pinsentmasons.com',
    office: 'London',
    photoSrc: DINESH_PHOTO,
    bio: 'Dinesh is our Head of US Securities and has been guiding corporates and investment banks through equity and debt capital markets transactions in the UK, Europe, Middle East, Africa and Asia for the last 20 years.',
    specialisms: ['US Securities', 'Capital Markets', 'Corporate'],
    relatedSlugs: ['dawn-allen', 'desiree-fields', 'david-barker', 'david-doogan'],
    credentials: [
      { year: '2025', detail: 'Joined Pinsent Masons' },
      { year: '2015', detail: 'Herbert Smith Freehills Kramer LLP - Partner' },
      { year: '2010', detail: 'Herbert Smith Freehills Kramer LLP - Senior Associate' },
      { year: '2004', detail: 'Boston College Law School - (J.D.)' },
      { year: '2004', detail: 'Fletcher School of Law & Diplomacy - (M.A.L.D.)' },
      { year: '2004', detail: 'Sullivan & Cromwell LLP - Associate' },
      { year: '1998', detail: 'Georgetown University School of Foreign Service - (B.S.F.S.)' },
    ],
  },
  {
    slug: 'david-barker',
    name: 'David Barker',
    jobTitle: 'Global Sector Head for Technology, Science and Industry',
    phone: '+44 (0) 20 7490 6969',
    email: 'david.barker@pinsentmasons.com',
    office: 'London',
    photoSrc: BARKER_PHOTO,
    bio: 'David is our Sector Head for Technology, Science and Industry and leads our global offering to clients in these sectors. He is recognised as a market leader in technology and privacy litigation, having acted in some of the most complex and groundbreaking litigation in the tech space.',
    specialisms: ['Technology', 'Privacy Litigation', 'Media'],
    relatedSlugs: ['dawn-allen', 'desiree-fields', 'dinesh-banani', 'david-doogan'],
    credentials: [
      { year: '2003', detail: 'Queen Mary University, London - IT Law (Diploma)' },
      { year: '2000', detail: 'Joined Pinsent Masons' },
      { year: '1997', detail: 'Qualified - England and Wales' },
      { year: '1995', detail: 'College of Law - Legal Practice Course' },
      { year: '1995', detail: 'Salans - Solicitor' },
      { year: '1994', detail: 'College of Law - Common Professional Examination' },
      { year: '1992', detail: 'University of Manchester - BA (Hons)' },
    ],
  },
  {
    slug: 'david-doogan',
    name: 'David Doogan',
    jobTitle: 'Partner',
    phone: '+44 (0) 7766 070 676',
    email: 'david.doogan@pinsentmasons.com',
    office: 'United Kingdom',
    photoSrc: DOOGAN_PHOTO,
    bio: 'David acts for Lenders and Borrowers and specialises in the finance aspects of a wide variety of corporate transactions including corporate lending (secured and unsecured), property finance transactions (both investment and development), acquisition finance and leveraged transactions, corporate reorganisations and receivables financing transactions.',
    specialisms: ['Finance', 'Corporate Lending', 'Property Finance'],
    relatedSlugs: ['dawn-allen', 'desiree-fields', 'dinesh-banani', 'david-barker'],
    credentials: [
      { year: '2013', detail: 'Joined Pinsent Masons' },
      { year: '2007', detail: 'Martineau Johnson, Partner' },
      { year: '2002', detail: 'Qualified - England and Wales' },
      { year: '2000', detail: 'College of Law, York – LPC' },
      { year: '2000', detail: 'Gateley, Associate' },
      { year: '1999', detail: 'College of Law, York - Diploma in Law' },
      { year: '1998', detail: 'University of Leeds – BA History' },
    ],
  },
  {
    slug: 'barry-mccaig',
    name: 'Barry McCaig',
    jobTitle: 'Partner, Head of Office, Glasgow',
    phone: '+44 (0) 7796 274 548',
    email: 'barry.mccaig@pinsentmasons.com',
    office: 'Glasgow',
    photoSrc: BARRY_PHOTO,
    bio: 'Barry is Head of the Glasgow office and of the Corporate practice group in Scotland.',
    specialisms: ['Corporate'],
    relatedSlugs: ['hammad-akhtar', 'dinesh-banani', 'dawn-allen', 'david-doogan'],
    credentials: [],
  },
  {
    slug: 'bryn-reynolds',
    name: 'Bryn Reynolds',
    jobTitle: 'Partner',
    phone: '+44 7340 152 045',
    email: 'bryn.reynolds@pinsentmasons.com',
    office: 'London',
    photoSrc: BRYN_PHOTO,
    bio: 'Bryn is a chartered accountant and chartered tax advisor who advises large businesses on all indirect tax issues including VAT, IPT and customs duties. He primarily advises large financial institutions and TMT clients including FinTech.',
    specialisms: ['Tax', 'Financial Services'],
    relatedSlugs: ['hammad-akhtar', 'dinesh-banani', 'dawn-allen', 'david-barker'],
    credentials: [],
  },
  {
    slug: 'ben-mckinley',
    name: 'Ben McKinley',
    jobTitle: 'Partner',
    phone: '+61 417 160 359',
    email: 'ben.mckinley@pinsentmasons.com',
    office: 'Australia',
    photoSrc: BEN_PHOTO,
    bio: 'Ben’s expertise is advising and representing employers in all aspects of employment, industrial relations, and safety law. He is highly regarded for his pragmatic and strategic advice, and works closely with clients to build trust and an in-depth understanding of their business.',
    specialisms: ['Employment'],
    relatedSlugs: ['bill-ryan', 'dawn-allen', 'barry-mccaig', 'bryn-reynolds'],
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
  { href: '/events-training', label: 'Events and Training' },
  { href: '/about-us', label: 'Modern Slavery' },
];

export const PEOPLE_INTRO =
  "Whatever your requirements, we'll bring together the right team for you. Over 490 partners and 3000 people around the world are ready to help. Browse the team or search for the person or specialism you're looking for.";

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
