import { EXPERTISE_SECTORS, OUTLAW_NEWS } from '@/lib/home-catalog';
import { GUIDE_PATH } from '@/lib/legal-story';
import { PEOPLE_CATALOG, getPersonBySlug } from '@/lib/people-catalog';

export type SearchContentType =
  | 'People'
  | 'Out-Law Guide'
  | 'Out-Law News'
  | 'Out-Law Analysis'
  | 'Out-Law Legal Update'
  | 'Expertise';

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
};

const SEARCH_HERO_SRC =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/615fe3f4a597485eafda2dfbd44565eb';

export const SEARCH_COPY = {
  title: 'Search',
  prompt: 'Please enter a new search term',
  empty: 'Please enter a search term',
  noResults: 'No results match that search. Try another term or clear your filters.',
  heroSrc: SEARCH_HERO_SRC,
};

export const SEARCH_SECTORS = EXPERTISE_SECTORS.map((item) => item.label);

export const SEARCH_SERVICES = [
  'Restructuring',
  'Insolvency',
  'Employment',
  'Finance',
  'Corporate',
  'Construction advisory',
];

export const SEARCH_REGIONS = [
  'United Kingdom',
  'Europe',
  'Asia Pacific',
  'Middle East',
  'Africa',
  'Americas',
];

export const SEARCH_CONTENT_TYPES: SearchContentType[] = [
  'People',
  'Out-Law Guide',
  'Out-Law News',
  'Out-Law Analysis',
  'Out-Law Legal Update',
  'Expertise',
];

const OFFICE_REGION: Record<string, string> = {
  leeds: 'United Kingdom',
  london: 'United Kingdom',
  glasgow: 'United Kingdom',
  manchester: 'United Kingdom',
  birmingham: 'United Kingdom',
  edinburgh: 'United Kingdom',
  aberdeen: 'United Kingdom',
  belfast: 'United Kingdom',
  'united kingdom': 'United Kingdom',
  melbourne: 'Asia Pacific',
  sydney: 'Asia Pacific',
  singapore: 'Asia Pacific',
  dubai: 'Middle East',
  dublin: 'Europe',
};

function regionFromOffice(office: string): string {
  return OFFICE_REGION[office.trim().toLowerCase()] || 'United Kingdom';
}

function dawn() {
  return getPersonBySlug('dawn-allen');
}

function sally() {
  return getPersonBySlug('sally-williamson');
}

const THINKING_HITS: SearchHit[] = [
  {
    id: 'guide-ciga',
    contentType: 'Out-Law Guide',
    kicker: 'OUT-LAW GUIDE',
    title: 'When UK suppliers must continue to supply insolvent companies',
    summary:
      'In a challenging economic environment, it is common to see an increase in company insolvencies. In the UK, there are rules in place that require suppliers to insolvent companies to continue to supply those businesses.',
    href: GUIDE_PATH,
    dateLabel: '08 Mar 2024',
    dateSort: '2024-03-08',
    author: sally()?.name || 'Sally Williamson',
    authorHref: '/people/sally-williamson',
    authorPhoto: sally()?.photoSrc,
    tag: 'Restructuring',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
    region: 'United Kingdom',
    keywords: 'insolvent insolvency ciga essential supplier administration liquidation',
  },
  {
    id: 'news-holiday-pay',
    contentType: 'Out-Law News',
    kicker: 'OUT-LAW NEWS',
    title: 'UK government plans to revamp holiday pay calculation for part-year workers',
    summary:
      'Proposed changes to holiday pay for part-year workers matter in a restructuring, where payroll liabilities can shift the value of a distressed business.',
    href: '/out-law/news/uk-government-plans-to-revamp-holiday-pay-calculation-for-part-year-workers',
    dateLabel: '19 Jan 2023',
    dateSort: '2023-01-19',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Employment',
    sector: 'Professional & Public Services',
    service: 'Employment',
    region: 'United Kingdom',
    keywords: 'holiday pay employment insolvent restructuring',
  },
  {
    id: 'news-pensions',
    contentType: 'Out-Law Analysis',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'Pensions disputes: managing member expectations paramount',
    summary:
      'Pension liabilities and member communications sit at the centre of many UK restructurings and insolvency processes.',
    href: '/out-law/news/pensions-disputes-managing-member-expectations-paramount',
    dateLabel: '23 Feb 2021',
    dateSort: '2021-02-23',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Restructuring',
    sector: 'Financial Services',
    service: 'Restructuring',
    region: 'United Kingdom',
    keywords: 'pensions insolvent restructuring',
  },
  {
    id: 'news-subsidy',
    contentType: 'Out-Law Analysis',
    kicker: 'OUT-LAW ANALYSIS',
    title: 'UK subsidy control post-Brexit: access to effective judicial remedies',
    href: '/out-law/news/uk-subsidy-control-post-brexit-access-to-effective-judicial-remedies',
    dateLabel: '01 Feb 2021',
    dateSort: '2021-02-01',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Restructuring',
    sector: 'Professional & Public Services',
    service: 'Corporate',
    region: 'United Kingdom',
    keywords: 'subsidy judicial remedies',
  },
  {
    id: 'news-steps-of-court',
    contentType: 'Out-Law News',
    kicker: 'OUT-LAW NEWS',
    title: "'Steps of court' settlement was not negligent, court rules",
    href: '/out-law/news/steps-of-court-settlement-was-not-negligent-court-rules',
    dateLabel: '08 Feb 2016',
    dateSort: '2016-02-08',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Restructuring',
    sector: 'Professional & Public Services',
    service: 'Restructuring',
    region: 'United Kingdom',
    keywords: 'settlement court negligence',
  },
  {
    id: 'news-tax-avoidance',
    contentType: 'Out-Law News',
    kicker: 'OUT-LAW NEWS',
    title: "'Vast majority' of companies not seeking to avoid tax",
    href: '/out-law/news/vast-majority-of-companies-not-seeking-to-avoid-tax',
    dateLabel: '27 Aug 2020',
    dateSort: '2020-08-27',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Corporate',
    sector: 'Professional & Public Services',
    service: 'Corporate',
    region: 'United Kingdom',
    keywords: 'tax companies',
  },
  {
    id: 'news-decarb',
    contentType: 'Out-Law News',
    kicker: 'OUT-LAW NEWS',
    title: "'World first' industrial decarbonisation strategy developed in the UK",
    href: '/out-law/news/world-first-industrial-decarbonisation-strategy-developed-in-the-uk',
    dateLabel: '19 Mar 2021',
    dateSort: '2021-03-19',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Energy & Natural Resources',
    sector: 'Energy & Natural Resources',
    service: 'Corporate',
    region: 'United Kingdom',
    keywords: 'decarbonisation industrial energy',
  },
  {
    id: 'news-3d',
    contentType: 'Out-Law Analysis',
    kicker: 'OUT-LAW ANALYSIS',
    title: '3D printing: UK product safety issues',
    href: '/out-law/news/3d-printing-uk-product-safety-issues',
    dateLabel: '21 Sep 2020',
    dateSort: '2020-09-21',
    author: dawn()?.name || 'Dawn Allen',
    authorHref: '/people/dawn-allen',
    authorPhoto: dawn()?.photoSrc,
    tag: 'Technology, Science & Industry',
    sector: 'Technology, Science & Industry',
    service: 'Corporate',
    region: 'United Kingdom',
    keywords: '3d printing product safety',
  },
  {
    id: 'news-5g',
    contentType: 'Out-Law News',
    kicker: 'OUT-LAW NEWS',
    title: '5G potential for business highlighted in UK funding programme',
    href: '/out-law/news/5g-potential-for-business-highlighted-in-uk-funding-programme',
    dateLabel: '18 Jan 2021',
    dateSort: '2021-01-18',
    author: getPersonBySlug('hammad-akhtar')?.name || 'Hammad Akhtar',
    authorHref: '/people/hammad-akhtar',
    authorPhoto: getPersonBySlug('hammad-akhtar')?.photoSrc,
    tag: 'Technology, Science & Industry',
    sector: 'Technology, Science & Industry',
    service: 'Finance',
    region: 'United Kingdom',
    keywords: '5g funding business',
  },
];

const extraThinking: SearchHit[] = OUTLAW_NEWS.filter(
  (item) => !THINKING_HITS.some((hit) => hit.href === item.href)
).map((item, index) => ({
  id: `outlaw-${index}`,
  contentType: item.kicker.includes('ANALYSIS')
    ? 'Out-Law Analysis'
    : item.kicker.includes('GUIDE')
      ? 'Out-Law Guide'
      : 'Out-Law News',
  kicker: item.kicker,
  title: item.title,
  href: item.href,
  dateLabel: item.meta,
  dateSort: '2026-01-01',
  tag: 'Restructuring',
  sector: 'Professional & Public Services',
  service: 'Restructuring',
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
    sector: person.specialisms.includes('Restructuring')
      ? 'Professional & Public Services'
      : 'Technology, Science & Industry',
    service: person.specialisms[0] || 'Corporate',
    region: regionFromOffice(person.office),
    keywords: [person.name, person.jobTitle, person.office, person.bio, ...person.specialisms]
      .join(' ')
      .toLowerCase(),
  }));
}

function expertiseHits(): SearchHit[] {
  return [
    {
      id: 'expertise-restructuring',
      contentType: 'Expertise',
      kicker: 'EXPERTISE',
      title: 'Restructuring',
      summary:
        'Non-contentious restructuring and insolvency for financial institutions, boards, and suppliers who have to keep trading when a customer fails.',
      href: '/expertise/restructuring',
      dateSort: '2026-01-01',
      tag: 'Restructuring',
      sector: 'Professional & Public Services',
      service: 'Restructuring',
      region: 'United Kingdom',
      keywords: 'restructuring insolvency insolvent expertise service',
    },
    {
      id: 'expertise-pps',
      contentType: 'Expertise',
      kicker: 'SECTOR',
      title: 'Professional & Public Services',
      summary:
        'Connecting Professional and Public Services to firmwide expertise, including restructuring, corporate and commercial contracts.',
      href: '/sectors/professional-public-services',
      dateSort: '2026-01-01',
      tag: 'Professional & Public Services',
      sector: 'Professional & Public Services',
      service: 'Corporate',
      region: 'United Kingdom',
      keywords: 'professional public services sector expertise insolvent',
    },
    ...EXPERTISE_SECTORS.filter((item) => item.label !== 'Professional & Public Services').map(
      (item) => ({
        id: `sector-${item.label}`,
        contentType: 'Expertise' as const,
        kicker: 'SECTOR',
        title: item.label,
        href: item.href,
        dateSort: '2026-01-01',
        tag: item.label,
        sector: item.label,
        service: 'Corporate',
        region: 'United Kingdom',
        keywords: `${item.label} expertise sector`.toLowerCase(),
      })
    ),
  ];
}

export const SEARCH_INDEX: SearchHit[] = [
  ...THINKING_HITS,
  ...extraThinking,
  ...peopleHits(),
  ...expertiseHits(),
];

export type SearchFilters = {
  sector: string;
  service: string;
  region: string;
  contentType: string;
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
    if (!q) return false;
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
