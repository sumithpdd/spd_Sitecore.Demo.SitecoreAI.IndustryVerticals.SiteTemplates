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
  {
    slug: 'business-development-manager-education',
    title: 'Business Development Manager - International Education',
    type: 'Permanent',
    salary: '£50,000 - £70,000 + 10-20% bonus',
    location: 'London',
    sector: 'Sales',
    posted: '1 hour ago',
    reference: 'PR/088401',
    summary:
      'Remote UK new-business role selling international education to large organisations. Occasional travel.',
    body: 'Open doors with senior buyers and run a short two-stage process. Lauren James is the consultant.',
    consultant: 'lauren-james',
    image: 'job-saas.jpg',
  },
  {
    slug: 'account-manager-singapore',
    title: 'Account Manager',
    type: 'Permanent',
    salary: 'Competitive, Singapore',
    location: 'Singapore',
    sector: 'Events',
    posted: '3 days ago',
    reference: 'PR/088402',
    summary: 'Regional account role for a global events agency covering Singapore and wider APAC.',
    body: 'Build the annual plan for key accounts and grow the work across live and hybrid programmes. Tommy Styles is the consultant.',
    consultant: 'tommy-styles',
    image: 'job-events.jpg',
  },
  {
    slug: 'business-development-manager-ai',
    title: 'Business Development Manager - AI Scale-Up',
    type: 'Permanent',
    salary: '£70,000 - £75,000 + commission',
    location: 'City of London',
    sector: 'SaaS Sales',
    posted: '4 days ago',
    reference: 'PR/088403',
    summary:
      'Field-based commercial role for a technology consultancy building its London presence.',
    body: 'Spend the week with enterprise buyers and turn introductions into a pipeline. Rachel Trevillion is the consultant.',
    consultant: 'rachel-trevillion',
    image: 'job-saas.jpg',
  },
  {
    slug: 'commercial-manager-field-sales',
    title: 'Commercial Manager (field sales)',
    type: 'Permanent',
    salary: '£50,000 - £60,000 + uncapped commission',
    location: 'London',
    sector: 'Sales',
    posted: '5 days ago',
    reference: 'PR/088404',
    summary: 'Customer-facing sales across several London sites, five days a week.',
    body: 'Own the patch, report to a senior commercial manager, and earn monthly commission on top of the base. Lauren James is the consultant.',
    consultant: 'lauren-james',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'central-sales-manager-london',
    title: 'Central Sales Manager',
    type: 'Permanent',
    salary: '£50,000 - £55,000, OTE £60,000 - £65,000',
    location: 'London',
    sector: 'Sales',
    posted: '5 days ago',
    reference: 'PR/088405',
    summary: 'Office-based sales lead near Aldgate, with two sales administrators.',
    body: 'Run the central team for a premium brand and report to the commercial director. Ian Payne is the consultant.',
    consultant: 'ian-payne',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'account-executive-newbury',
    title: 'Account Executive',
    type: 'Permanent',
    salary: 'Up to £35,000 + 8% bonus',
    location: 'Newbury',
    sector: 'Marketing',
    posted: '6 days ago',
    reference: 'PR/088406',
    summary: 'Support the sales desk of an independent marketing agency. Two days from home.',
    body: 'Coordinate the team around live opportunities rather than carrying a full new-business number. Becca Kitchen is the consultant.',
    consultant: 'becca-kitchen',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-insight-lead',
    title: 'Research and Insight Lead',
    type: 'Permanent',
    salary: '£65,000 - £70,000',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: '6 days ago',
    reference: 'PR/088407',
    summary: 'Client-side research lead. Mixed methods, three days in the City.',
    body: 'Set the insight agenda and sit with the commercial team, not only the research desk. Amy Kirby is the consultant.',
    consultant: 'amy-kirby',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'senior-research-manager-healthcare',
    title: 'Senior Research Manager (Healthcare)',
    type: 'Permanent',
    salary: '£41,000 - £51,000',
    location: 'London',
    sector: 'Research & Insight',
    posted: '6 days ago',
    reference: 'PR/088408',
    summary: 'Mid-level healthcare research on strategic studies. Two or three days in the office.',
    body: 'Run projects for a life-sciences consultancy and brief stakeholders in plain language. Mat Law is the consultant.',
    consultant: 'mat-law',
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
    role: 'Global Marketing Director',
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
    location: 'New York',
    bio: 'Amy leads Aspire’s research, insight, and data practice. Clients come to her for senior researchers and the commercial leaders who sit beside them.',
    image: 'consultant-amy.jpg',
  },
  {
    slug: 'becca-kitchen',
    name: 'Becca Kitchen',
    role: 'Senior Executive Recruitment Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'becca@weareaspire.com',
    location: 'London',
    bio: 'Becca recruits across content, digital, events, marketing, and interim. She works with hiring managers who need a shortlist, not a pile of CVs.',
    image: 'consultant-ian.jpg',
  },
  {
    slug: 'destiny-owoloko',
    name: 'Destiny Owoloko',
    role: 'Senior Recruitment Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'destiny@weareaspire.com',
    location: 'London',
    bio: 'Destiny covers content, marketing, and digital media from the London desk.',
    image: 'consultant-amy.jpg',
  },
  {
    slug: 'lauren-james',
    name: 'Lauren James',
    role: 'Senior Talent Specialist - Sales',
    phone: '+44 (0)203 807 3709',
    email: 'lauren@weareaspire.com',
    location: 'London',
    bio: 'Lauren recruits sales, SaaS, events, and go-to-market roles.',
    image: 'consultant-tommy.jpg',
  },
  {
    slug: 'mat-law',
    name: 'Mat Law',
    role: 'Associate Director',
    phone: '+44 (0)203 807 3709',
    email: 'mat@weareaspire.com',
    location: 'London',
    bio: 'Mat leads research, insight, and data searches from London.',
    image: 'consultant-ian.jpg',
  },
  {
    slug: 'rachel-trevillion',
    name: 'Rachel Trevillion',
    role: 'Divisional Manager - Technology Sales',
    phone: '+44 (0)203 807 3709',
    email: 'rachel@weareaspire.com',
    location: 'London',
    bio: 'Rachel runs technology sales recruitment: go-to-market, SaaS, and enterprise sales.',
    image: 'consultant-amy.jpg',
  },
  {
    slug: 'meg-rayner',
    name: 'Meg Rayner',
    role: 'Senior Executive Director',
    phone: '+1 646 980 3714',
    email: 'meg@weareaspire.com',
    location: 'New York',
    bio: 'Meg covers go-to-market, SaaS, sales, events, and graduate hiring from New York.',
    image: 'consultant-tommy.jpg',
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
    slug: '2026/07/beyond-seo-and-geo',
    title: 'Beyond SEO: Why Your Next Marketing Hire Needs to Understand GEO',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Search is splitting between classic rankings and answers written by generative engines. The next marketing hire has to brief both.',
    body: 'A strong SEO lead still matters. The briefs that win now also explain how a brand shows up inside generated answers. Hire for someone who can write the source material, not only the meta tags.',
    image: 'article-geo.jpg',
  },
  {
    slug: '2026/07/stop-hiring-for-pedigree',
    title: 'Stop Hiring for Pedigree, Start Hiring for Potential',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Scarce skills are being missed because CVs are still screened for a degree from the right place.',
    body: 'Test the work. Self-taught people and career-changers often solve the problem the pedigree CV only describes. Skills-based interviews also keep salary inflation in check.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/07/internal-ta-and-agencies',
    title: 'Why Internal TA and External Agencies Work Better Together',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'In-house talent teams and specialist agencies cover different parts of the same search.',
    body: 'Internal TA knows the culture. An agency can map people who are not applying. Share salary signals and split the hardest roles so the in-house team can stay with the candidate experience.',
    image: 'article-geo.jpg',
  },
  {
    slug: '2026/06/employer-branding-on-a-budget',
    title: 'Employer Branding on a Budget',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'June 2026',
    summary:
      'Smaller firms can win candidates who want impact more than a corporate signing bonus.',
    body: 'Tell the truth about autonomy, pace, and how quickly someone can take on more. That story competes with a larger salary when the work itself is the offer.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/06/hiring-for-agility',
    title: 'Hiring for Agility',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'June 2026',
    summary:
      'Software skills date quickly. The hire who can unlearn is the one still useful next year.',
    body: 'Interview for curiosity and for people who stay useful when the tools change. A trainable operator often beats a certificate that will be out of date.',
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
