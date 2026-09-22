import { EXPERTISE_SECTORS, OUTLAW_NEWS, PRESS_RELEASES } from '@/lib/home-catalog';
import { GUIDE_PATH } from '@/lib/capco-story';
import { PEOPLE_CATALOG, getPersonBySlug } from '@/lib/people-catalog';
import { JOBS_CATALOG } from '@/lib/jobs-catalog';
import { DEFAULT_IMG_URL } from '@/constants/search';

export type SearchContentType = 'People' | 'Perspective' | 'Industry' | 'Job' | 'News' | 'Page';

export type SearchFacet = 'all' | 'insights' | 'capabilities' | 'careers' | 'people' | 'other';

export const SEARCH_FACETS: { id: SearchFacet; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'insights', label: 'Insights, News & Events' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'careers', label: 'Careers' },
  { id: 'people', label: 'People' },
  { id: 'other', label: 'Other' },
];

export const SEARCH_SUGGESTIONS = ['finance', 'T+1', 'AI', 'careers', 'people', 'energy'];

export type SearchHit = {
  id: string;
  contentType: SearchContentType;
  kicker: string;
  title: string;
  summary?: string;
  href: string;
  dateLabel?: string;
  dateSort: string;
  author?: string;
  authorHref?: string;
  authorPhoto?: string;
  tag?: string;
  sector?: string;
  service?: string;
  region?: string;
  keywords: string;
  imageSrc?: string;
};

const SEARCH_HERO_SRC =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/615fe3f4a597485eafda2dfbd44565eb';

export const SEARCH_COPY = {
  title: 'Search results',
  prompt: 'Start a new search:',
  empty: 'Search Capco — people, perspectives, expertise and careers',
  noResults: 'No results match that search. Try another term or clear your filters.',
  heroSrc: SEARCH_HERO_SRC,
  placeholder: 'finance',
};

export const SEARCH_SECTORS = EXPERTISE_SECTORS.map((item) => item.label);

export const SEARCH_SERVICES = [
  'Capital Markets',
  'Banking and Payments',
  'Energy',
  'Insurance',
  'Wealth and Asset Management',
  'T+1',
];

export const SEARCH_REGIONS = ['United Kingdom', 'Europe', 'Americas', 'Asia Pacific'];

export const SEARCH_CONTENT_TYPES: SearchContentType[] = [
  'People',
  'Perspective',
  'Industry',
  'Job',
  'News',
];

const OFFICE_REGION: Record<string, string> = {
  london: 'United Kingdom',
  brazil: 'Americas',
  'são paulo': 'Americas',
  'new york': 'Americas',
  toronto: 'Americas',
  singapore: 'Asia Pacific',
  frankfurt: 'Europe',
};

function regionFromOffice(office: string): string {
  return OFFICE_REGION[office.trim().toLowerCase()] || 'United Kingdom';
}

function elisabeth() {
  return getPersonBySlug('elisabeth-plakinger');
}

function charlotte() {
  return getPersonBySlug('charlotte-byrne');
}

const THINKING_HITS: SearchHit[] = [
  {
    id: 'perspective-t1',
    contentType: 'Perspective',
    kicker: 'PERSPECTIVE',
    title: 'Europe’s T+1 market must prove readiness',
    summary:
      'Settlement compression is a market-structure test. Elisabeth Plakinger on what Europe must prove before T+1 goes live — the Perspective Priya Raman finds in ChatGPT.',
    href: GUIDE_PATH,
    dateLabel: '15 Sep 2026',
    dateSort: '2026-09-15',
    author: elisabeth()?.name || 'Elisabeth Plakinger',
    authorHref: '/people/elisabeth-plakinger',
    authorPhoto: elisabeth()?.photoSrc,
    tag: 'Capital Markets',
    sector: 'Capital Markets',
    service: 'Capital Markets',
    region: 'Europe',
    keywords:
      't+1 t plus 1 settlement europe elisabeth plakinger priya capital markets aeo finance',
    imageSrc: SEARCH_HERO_SRC,
  },
  {
    id: 'perspective-canada-fraud',
    contentType: 'Perspective',
    kicker: 'PERSPECTIVE',
    title: 'Canada payment fraud: the next control test',
    summary:
      'Payments fraud controls under real-time rails — what banks in Canada need to prove next.',
    href: '/perspectives/canada-payment-fraud',
    dateLabel: '19 Aug 2026',
    dateSort: '2026-08-19',
    author: charlotte()?.name || 'Charlotte Byrne',
    authorHref: '/people/charlotte-byrne',
    authorPhoto: charlotte()?.photoSrc,
    tag: 'Banking and Payments',
    sector: 'Banking and Payments',
    service: 'Banking and Payments',
    region: 'Americas',
    keywords: 'canada payment fraud banking payments finance',
    imageSrc: DEFAULT_IMG_URL,
  },
  {
    id: 'perspective-ai-assistants',
    contentType: 'Perspective',
    kicker: 'PERSPECTIVE',
    title: 'AI assistants as the front door to financial services',
    summary:
      'Charlotte Byrne on why the next client conversation starts in an assistant, not a branch or a portal.',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    dateLabel: '17 Aug 2026',
    dateSort: '2026-08-17',
    author: charlotte()?.name || 'Charlotte Byrne',
    authorHref: '/people/charlotte-byrne',
    authorPhoto: charlotte()?.photoSrc,
    tag: 'Banking and Payments',
    sector: 'Banking and Payments',
    service: 'Banking and Payments',
    region: 'United Kingdom',
    keywords: 'ai assistants banking payments charlotte byrne front door finance',
    imageSrc: charlotte()?.photoSrc,
  },
  {
    id: 'perspective-agentic-energy',
    contentType: 'Perspective',
    kicker: 'PERSPECTIVE',
    title: 'Agentic AI in energy trading',
    summary: 'How trading desks use agentic systems without losing control or auditability.',
    href: '/perspectives/agentic-ai-in-energy-trading',
    dateLabel: '13 Aug 2026',
    dateSort: '2026-08-13',
    tag: 'Energy',
    sector: 'Energy',
    service: 'Energy',
    region: 'Europe',
    keywords: 'agentic ai energy trading commodity',
    author: elisabeth()?.name || 'Elisabeth Plakinger',
    authorHref: '/people/elisabeth-plakinger',
  },
  {
    id: 'perspective-onboarding',
    contentType: 'Perspective',
    kicker: 'PERSPECTIVE',
    title: 'Reimagining business banking onboarding',
    summary:
      'Business banking onboarding is still the bottleneck. Charlotte Byrne on a hybrid RM + iKYC journey that still names an expert.',
    href: '/perspectives/reimagining-business-banking-onboarding',
    dateLabel: '04 Mar 2026',
    dateSort: '2026-03-04',
    author: charlotte()?.name || 'Charlotte Byrne',
    authorHref: '/people/charlotte-byrne',
    authorPhoto: charlotte()?.photoSrc,
    tag: 'Banking and Payments',
    sector: 'Banking and Payments',
    service: 'Banking and Payments',
    region: 'United Kingdom',
    keywords: 'business banking onboarding kyc sme commercial charlotte byrne finance',
    imageSrc: DEFAULT_IMG_URL,
  },
];

const extraThinking: SearchHit[] = OUTLAW_NEWS.filter(
  (item) => !THINKING_HITS.some((hit) => hit.href === item.href)
).map((item, index) => ({
  id: `perspective-${index}`,
  contentType: 'Perspective' as const,
  kicker: item.kicker,
  title: item.title,
  href: item.href,
  dateLabel: item.meta,
  dateSort: '2026-01-01',
  tag: 'Capital Markets',
  sector: 'Capital Markets',
  service: 'Capital Markets',
  region: 'United Kingdom',
  keywords: item.title.toLowerCase(),
}));

function peopleHits(): SearchHit[] {
  return PEOPLE_CATALOG.map((person) => ({
    id: `person-${person.slug}`,
    contentType: 'People' as const,
    kicker: 'PEOPLE',
    title: person.name,
    summary: person.bio,
    href: `/people/${person.slug}`,
    dateSort: '2026-01-01',
    author: person.jobTitle,
    authorPhoto: person.photoSrc,
    tag: person.specialisms[0],
    sector: person.specialisms.includes('Capital Markets')
      ? 'Capital Markets'
      : person.specialisms.includes('Energy')
        ? 'Energy'
        : 'Banking and Payments',
    service: person.specialisms[0] || 'Capital Markets',
    region: regionFromOffice(person.office),
    keywords: [
      person.name,
      person.jobTitle,
      person.office,
      person.bio,
      ...person.specialisms,
      'finance',
    ]
      .join(' ')
      .toLowerCase(),
    imageSrc: person.photoSrc,
  }));
}

function jobHits(): SearchHit[] {
  return JOBS_CATALOG.map((job) => ({
    id: `job-${job.slug}`,
    contentType: 'Job' as const,
    kicker: job.type.toUpperCase(),
    title: job.title,
    summary: job.summary,
    href: `/careers#${job.slug}`,
    dateSort: '2026-09-01',
    tag: job.team,
    sector: job.team,
    service: job.team,
    region:
      job.location === 'São Paulo' || job.location === 'Houston' || job.location === 'New York'
        ? 'Americas'
        : 'United Kingdom',
    keywords: `${job.keywords} jobs careers talent`,
    imageSrc: DEFAULT_IMG_URL,
  }));
}

function newsHits(): SearchHit[] {
  return PRESS_RELEASES.map((item, index) => ({
    id: `news-${index}`,
    contentType: 'News' as const,
    kicker: 'NEWSROOM',
    title: item.title,
    href: item.href,
    dateLabel: item.date,
    dateSort: '2026-09-15',
    tag: 'Newsroom',
    sector: 'Capital Markets',
    service: 'Capital Markets',
    region: 'Europe',
    keywords: `${item.title} newsroom press finance`.toLowerCase(),
    imageSrc: SEARCH_HERO_SRC,
  }));
}

function expertiseHits(): SearchHit[] {
  return [
    {
      id: 'industry-capital-markets',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'Capital Markets',
      summary:
        'Cost, risk and T+1 settlement compression — Capco’s capital markets practice, tagged once with Elisabeth’s credentials.',
      href: '/industries/capital-markets',
      dateSort: '2026-01-01',
      tag: 'Capital Markets',
      sector: 'Capital Markets',
      service: 'Capital Markets',
      region: 'Europe',
      keywords: 'capital markets t+1 settlement elisabeth expertise industry finance',
      imageSrc: SEARCH_HERO_SRC,
    },
    {
      id: 'industry-banking',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'Banking and Payments',
      summary:
        'Digital banks, core modernisation, and AI assistants as the front door to financial services.',
      href: '/industries/banking-and-payments',
      dateSort: '2026-01-01',
      tag: 'Banking and Payments',
      sector: 'Banking and Payments',
      service: 'Banking and Payments',
      region: 'United Kingdom',
      keywords: 'banking payments ai assistants charlotte industry finance',
      imageSrc: DEFAULT_IMG_URL,
    },
    {
      id: 'industry-retail-banking',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'Retail Banking',
      summary: 'AI assistants as the front door to retail — tagged once with Charlotte Byrne.',
      href: '/industries/banking-and-payments/retail-banking',
      dateSort: '2026-01-01',
      tag: 'Banking and Payments',
      sector: 'Banking and Payments',
      service: 'Banking and Payments',
      region: 'United Kingdom',
      keywords: 'retail banking ai assistants charlotte industry',
    },
    {
      id: 'industry-payments',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'Payments',
      summary: 'Real-time rails and the Canada fraud control test.',
      href: '/industries/banking-and-payments/payments',
      dateSort: '2026-01-01',
      tag: 'Banking and Payments',
      sector: 'Banking and Payments',
      service: 'Banking and Payments',
      region: 'Americas',
      keywords: 'payments fraud canada rails industry',
    },
    {
      id: 'industry-tplus1',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'T+1 settlement',
      summary: 'Europe must prove operational readiness. Named expert: Elisabeth Plakinger.',
      href: '/industries/capital-markets/t-plus-1',
      dateSort: '2026-01-01',
      tag: 'Capital Markets',
      sector: 'Capital Markets',
      service: 'Capital Markets',
      region: 'Europe',
      keywords: 't+1 settlement capital markets elisabeth industry',
    },
    {
      id: 'industry-energy',
      contentType: 'Industry',
      kicker: 'INDUSTRY',
      title: 'Energy',
      summary: 'Transition, trading and agentic AI — Capco’s energy practice.',
      href: '/industries/energy',
      dateSort: '2026-01-01',
      tag: 'Energy',
      sector: 'Energy',
      service: 'Energy',
      region: 'Europe',
      keywords: 'energy trading agentic ai industry',
    },
    ...EXPERTISE_SECTORS.filter(
      (item) =>
        item.label !== 'Capital Markets' &&
        item.label !== 'Banking and Payments' &&
        item.label !== 'Energy'
    ).map((item) => ({
      id: `industry-${item.label}`,
      contentType: 'Industry' as const,
      kicker: 'INDUSTRY',
      title: item.label,
      href: item.href,
      dateSort: '2026-01-01',
      tag: item.label,
      sector: item.label,
      service: item.label,
      region: 'United Kingdom',
      keywords: `${item.label} expertise industry`.toLowerCase(),
    })),
    {
      id: 'page-about',
      contentType: 'Page',
      kicker: 'OUR STORY',
      title: 'Our Story',
      summary: 'Capco, A Wipro Company — The Expert Advantage.',
      href: '/about-us',
      dateSort: '2026-01-01',
      tag: 'Our Story',
      sector: 'Capital Markets',
      service: 'Capital Markets',
      region: 'United Kingdom',
      keywords: 'about us our story capco wipro expert advantage',
      imageSrc: SEARCH_HERO_SRC,
    },
    {
      id: 'page-careers',
      contentType: 'Job',
      kicker: 'JOIN US',
      title: 'Join Us',
      summary: 'We are always searching for the best talent.',
      href: '/careers',
      dateSort: '2026-01-01',
      tag: 'Careers',
      sector: 'Banking and Payments',
      service: 'Banking and Payments',
      region: 'Americas',
      keywords: 'careers join us marina costa meet our people talent jobs finance',
      imageSrc: DEFAULT_IMG_URL,
    },
    {
      id: 'page-perspectives',
      contentType: 'Perspective',
      kicker: 'PERSPECTIVES',
      title: 'Perspectives',
      summary: 'AEO content across financial services and energy.',
      href: '/perspectives',
      dateSort: '2026-01-01',
      tag: 'Perspectives',
      sector: 'Capital Markets',
      service: 'Capital Markets',
      region: 'United Kingdom',
      keywords: 'perspectives aeo thought leadership',
    },
  ];
}

export const SEARCH_INDEX: SearchHit[] = [
  ...THINKING_HITS,
  ...extraThinking,
  ...newsHits(),
  ...peopleHits(),
  ...jobHits(),
  ...expertiseHits(),
];

export function facetForHit(hit: SearchHit): SearchFacet {
  if (hit.contentType === 'Perspective' || hit.contentType === 'News') return 'insights';
  if (hit.contentType === 'Industry') return 'capabilities';
  if (hit.contentType === 'Job') return 'careers';
  if (hit.contentType === 'People') return 'people';
  return 'other';
}

export type SearchFilters = {
  sector: string;
  service: string;
  region: string;
  contentType: string;
  facet?: SearchFacet;
};

export type SearchSort = 'relevant' | 'newest' | 'oldest';

function haystack(hit: SearchHit): string {
  return [hit.title, hit.summary, hit.kicker, hit.tag, hit.author, hit.keywords]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

function scoreHit(hit: SearchHit, query: string): number {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const title = hit.title.toLowerCase();
  let score = 0;
  if (title === q) score += 200;
  if (title.includes(q)) score += 80;
  const tokens = q.split(/\s+/).filter((token) => token.length > 2);
  tokens.forEach((token) => {
    if (title.includes(token)) score += 12;
    if (haystack(hit).includes(token)) score += 4;
  });
  if (haystack(hit).includes(q)) score += 20;
  return score;
}

export function searchCatalog(
  query: string,
  filters: SearchFilters,
  sort: SearchSort
): SearchHit[] {
  const q = query.trim();
  let results = SEARCH_INDEX.filter((hit) => {
    if (filters.sector && hit.sector !== filters.sector) return false;
    if (filters.service && hit.service !== filters.service) return false;
    if (filters.region && hit.region !== filters.region) return false;
    if (filters.contentType && hit.contentType !== filters.contentType) return false;
    if (filters.facet && filters.facet !== 'all' && facetForHit(hit) !== filters.facet)
      return false;
    if (!q) return true;
    return scoreHit(hit, q) > 0;
  });

  if (sort === 'newest') {
    results = [...results].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
  } else if (sort === 'oldest') {
    results = [...results].sort((a, b) => a.dateSort.localeCompare(b.dateSort));
  } else {
    results = [...results].sort((a, b) => scoreHit(b, q) - scoreHit(a, q));
  }

  return results;
}
