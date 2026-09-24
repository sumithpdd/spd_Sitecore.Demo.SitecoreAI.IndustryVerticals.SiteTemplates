export type JobPosting = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: 'Experienced hire' | 'Entry level / ATP';
  summary: string;
  keywords: string;
  href: string;
};

/** Open roles — titles and locations only. Do not invent consultant names. */
export const JOBS_CATALOG: JobPosting[] = [
  {
    slug: 'principal-consultant-capital-markets',
    title: 'Principal Consultant, Capital Markets — T+1',
    team: 'Capital Markets',
    location: 'London',
    type: 'Experienced hire',
    summary:
      'Lead settlement-compression programmes for investment banks and market infrastructure. Work sits next to Elisabeth Plakinger’s T+1 Perspective.',
    keywords: 'finance capital markets t+1 settlement london experienced',
    href: '/people/elisabeth-plakinger',
  },
  {
    slug: 'principal-consultant-banking-ai',
    title: 'Principal Consultant, Banking & Payments — AI',
    team: 'Banking and Payments',
    location: 'London',
    type: 'Experienced hire',
    summary:
      'Design the operating model behind AI assistants as the front door to financial services.',
    keywords: 'finance banking payments ai assistants london',
    href: '/people/charlotte-byrne',
  },
  {
    slug: 'senior-consultant-fs-americas',
    title: 'Senior Consultant, Financial Services',
    team: 'Financial Services',
    location: 'São Paulo',
    type: 'Experienced hire',
    summary: 'Delivery across banking and capital markets in the Americas — Meet our people.',
    keywords: 'finance americas brazil sao paulo consulting',
    href: '/people/marina-costa',
  },
  {
    slug: 'consultant-energy-trading',
    title: 'Consultant, Energy Trading',
    team: 'Energy',
    location: 'Houston',
    type: 'Experienced hire',
    summary: 'Commodity trading, risk and agentic AI on the energy desk.',
    keywords: 'energy trading finance houston consultant consultancy agentic ai',
    href: '/industries/energy',
  },
  {
    slug: 'analyst-payments-new-york',
    title: 'Analyst, Payments',
    team: 'Banking and Payments',
    location: 'New York',
    type: 'Entry level / ATP',
    summary:
      'Associate Talent Programme — payments delivery, fraud controls, and core modernisation.',
    keywords: 'finance payments atp entry new york analyst',
    href: '/industries/banking-and-payments',
  },
  {
    slug: 'consultant-wealth',
    title: 'Consultant, Wealth and Asset Management',
    team: 'Wealth and Asset Management',
    location: 'London',
    type: 'Experienced hire',
    summary: 'Operating model, data and client experience for wealth platforms.',
    keywords: 'finance wealth asset management london',
    href: '/industries/wealth-and-asset-management',
  },
];

export const CAREERS_COPY = {
  kicker: 'Join Us',
  title: 'We are always searching for the best talent.',
  intro:
    'ATP, experienced hires, Be Yourself At Work, and Meet our people — the same consultants who show up on Perspectives.',
};
