/** Aspire recruitment demo. Page copy is also serialized so Pages can edit it. */

export const BRAND = {
  name: 'Aspire',
  phones: [
    { label: 'UK', value: '+44 (0)203 807 3709' },
    { label: 'US', value: '+1 646 980 3714' },
    { label: 'Singapore', value: '+65 8286 0434' },
    { label: 'UAE', value: '+971 5 8567 7873' },
  ],
};

export const NAV = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Candidates', href: '/candidates' },
  { label: 'Employers', href: '/employers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Blog', href: '/blog' },
  { label: 'Consultants', href: '/consultants' },
];

export const SECTORS = [
  'Content',
  'Data',
  'Digital & Media',
  'Events',
  'Go-to-Market',
  'Marketing',
  'Research & Insight',
  'Sales',
  'SaaS Sales',
  'Technology',
];

export const HERO_WORDS = ['Global.', 'Human.', 'Experts.', 'Trusted.', 'Aspire.'];

export type Job = {
  slug: string;
  title: string;
  type: string;
  salary: string;
  location: string;
  sector: string;
  posted: string;
  reference: string;
  summary: string;
  body: string;
  consultant: string;
  image: string;
};

export type Consultant = {
  slug: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  image: string;
};

export type Article = {
  slug: string;
  title: string;
  kicker: string;
  author: string;
  date: string;
  summary: string;
  body: string;
  image: string;
};

export type Branch = {
  slug: string;
  city: string;
  phone: string;
  address: string;
  body: string;
  image: string;
};

export const JOBS: Job[] = [
  {
    slug: 'account-executive-edtech-6039269',
    title: 'Account Executive - EdTech',
    type: 'Permanent',
    salary: '£50,000 - £55,000 per annum + uncapped commission',
    location: 'London',
    sector: 'Sales',
    posted: '3 days ago',
    reference: 'PR/087962',
    summary:
      'B2B sales role with a growing EdTech business. £50,000–£55,000 basic, uncapped commission, and hybrid working in London.',
    body: 'You will open new business with schools, education groups, and multi-academy trusts. The brief is consultative: discovery meetings, product demonstrations, and a pipeline you own through to close. Two years of B2B sales is the baseline. EdTech experience helps, and it is not required. OTE sits around £100,000–£110,000, with room to grow as the business expands beyond the UK.',
    consultant: 'ian-payne',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'producer-singapore',
    title: 'Producer',
    type: 'Permanent',
    salary: 'Competitive, Singapore',
    location: 'Singapore',
    sector: 'Events',
    posted: '3 days ago',
    reference: 'PR/088104',
    summary:
      'Producer or assistant producer for a global engagement agency delivering live, virtual, and hybrid events.',
    body: 'You will run projects from brief to show day across international markets. The team wants someone who can hold a timeline, a budget, and a client conversation at the same time.',
    consultant: 'tommy-styles',
    image: 'job-events.jpg',
  },
  {
    slug: 'amazon-marketplace-manager',
    title: 'Amazon Marketplace Manager',
    type: 'Permanent',
    salary: '£50,000 - £65,000 per annum',
    location: 'City of London',
    sector: 'Digital & Media',
    posted: '4 days ago',
    reference: 'PR/088220',
    summary:
      'Shape how a premium beauty portfolio is sold on Amazon UK and Europe. Hybrid, four days a week near Euston.',
    body: 'This is a marketplace leadership role, not a listing tidy-up. You will protect brand presentation and grow the European account with a bonus on top of the base.',
    consultant: 'amy-kirby',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'account-director-saas',
    title: 'Account Director',
    type: 'Permanent',
    salary: '£70,000 - £90,000 per annum + bonus',
    location: 'London',
    sector: 'SaaS Sales',
    posted: '4 days ago',
    reference: 'PR/088301',
    summary:
      'Own a portfolio of enterprise clients for a hyper-growth technology company working with operations leaders.',
    body: 'You will grow existing relationships and open the next tier of accounts. The hiring manager wants a hunter who is comfortable with C-level conversations.',
    consultant: 'ian-payne',
    image: 'job-saas.jpg',
  },
];

export const CONSULTANTS: Consultant[] = [
  {
    slug: 'ian-payne',
    name: 'Ian Payne',
    role: 'Talent Consultant',
    phone: '0208 158 0757',
    email: 'ianp@weareaspire.com',
    location: 'London',
    bio: 'Ian connects ambitious graduates and early-career professionals with sales and commercial roles. He spent two decades in leadership, finance, and operational coordination, including service with HM Forces, and now uses that judgement to match people to roles they can grow in.',
    image: 'consultant-ian.jpg',
  },
  {
    slug: 'tommy-styles',
    name: 'Tommy Styles',
    role: 'Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'tommy@weareaspire.com',
    location: 'London',
    bio: 'Tommy writes for the Aspire journal and recruits across marketing and events. He helps hiring managers close candidates who are weighing a counter-offer.',
    image: 'consultant-tommy.jpg',
  },
  {
    slug: 'amy-kirby',
    name: 'Amy Kirby',
    role: 'Global Director - Research, Insight & Data',
    phone: '+44 (0)203 807 3709',
    email: 'amy@weareaspire.com',
    location: 'London',
    bio: 'Amy leads Aspire’s research, insight, and data practice. Clients come to her for senior researchers and the commercial leaders who sit beside them.',
    image: 'consultant-amy.jpg',
  },
];

export const ARTICLES: Article[] = [
  {
    slug: '2026/07/the-counter-offer-crisis-how-to-secure-your-ideal-candidate',
    title: 'The Counter-Offer Crisis: How to Secure Your Ideal Candidate',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Counter-offers are turning resignations into bidding wars. Close the conversation before the current employer does.',
    body: 'Replacing someone costs more than a pay rise, so current employers are matching offers late in the process. The way through is to talk about the counter-offer in the first interviews, not the week they resign. Culture, a clear first month, and an early introduction to the team outweigh a temporary bump in salary. Hold the original offer when the motivations were never about money. If they were, you will hear that early.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/07/beyond-seo-why-your-next-marketing-hire-needs-to-understand-geo',
    title: 'Beyond SEO: Why Your Next Marketing Hire Needs to Understand GEO',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Search is splitting between classic rankings and answers written by generative engines. The next marketing hire has to brief both.',
    body: 'A strong SEO lead still matters. The briefs that win now also explain how a brand shows up inside generated answers. Hire for someone who can write the source material, not only the meta tags.',
    image: 'article-geo.jpg',
  },
];

export const BRANCHES: Branch[] = [
  {
    slug: 'London',
    city: 'London',
    phone: '+44 (0)203 807 3709',
    address: '22 Bishopsgate, 7th Floor, XCHG Spaces, London EC2N 4AJ',
    body: 'Aspire London recruits across content, digital and media, events, marketing, sales, research and insight, and technology. Liverpool Street, Moorgate, and London Bridge are the nearest stations. Broadgate and Minories are the closest car parks.',
    image: 'london-office.jpg',
  },
  {
    slug: 'Exeter',
    city: 'Exeter',
    phone: '+44 (0)203 807 3709',
    address: 'Winslade Park, Manor Drive, Clyst St Mary, Exeter EX5 1FY',
    body: 'The Exeter office supports clients across the South West.',
    image: 'hero-office.jpg',
  },
  {
    slug: 'New-York',
    city: 'New York',
    phone: '+1 646 473 2549',
    address: '85 Broad St, WeWork 17th Floor, New York, NY 10004',
    body: 'The New York desk covers US sales, marketing, and technology searches.',
    image: 'promo-partnership.jpg',
  },
  {
    slug: 'Singapore',
    city: 'Singapore',
    phone: '+65 8286 0434',
    address: '10 Anson Road, #33-03, International Plaza, Singapore 079903',
    body: 'Singapore covers APAC briefs in events, marketing, and commercial leadership.',
    image: 'job-events.jpg',
  },
  {
    slug: 'Dubai',
    city: 'Dubai',
    phone: '+971 502 431 266',
    address: 'Level 5, One JLT Tower 1, Jumeirah Lakes Towers, Dubai',
    body: 'The Dubai office supports MENA hiring for sales and marketing teams.',
    image: 'job-saas.jpg',
  },
];

export function jobHref(job: Job): string {
  return `/job/${job.slug}`;
}

export function consultantHref(person: Consultant): string {
  return `/consultants/${person.slug}`;
}

export function articleHref(article: Article): string {
  return `/blog/${article.slug}`;
}

export function branchHref(branch: Branch): string {
  return `/branches/${branch.slug}`;
}

function cleanPath(asPath: string): string {
  return asPath.split('?')[0].replace(/\/$/, '') || '/';
}

export function jobFromPath(asPath: string): Job | undefined {
  const path = cleanPath(asPath);
  return JOBS.find((job) => path.endsWith(`/job/${job.slug}`));
}

export function consultantFromPath(asPath: string): Consultant | undefined {
  const path = cleanPath(asPath);
  return CONSULTANTS.find((person) => path.endsWith(`/consultants/${person.slug}`));
}

export function articleFromPath(asPath: string): Article | undefined {
  const path = cleanPath(asPath);
  return ARTICLES.find((article) => path.endsWith(`/blog/${article.slug}`));
}

export function branchFromPath(asPath: string): Branch | undefined {
  const path = cleanPath(asPath);
  const match = path.match(/\/branches\/([^/]+)$/i);
  if (!match) return undefined;
  const slug = decodeURIComponent(match[1]);
  return BRANCHES.find((branch) => branch.slug.toLowerCase() === slug.toLowerCase());
}

export function jobsForConsultant(slug: string): Job[] {
  return JOBS.filter((job) => job.consultant === slug);
}

export function textValue(field: { value?: unknown } | undefined, fallback: string): string {
  return typeof field?.value === 'string' && field.value.trim() ? field.value : fallback;
}
