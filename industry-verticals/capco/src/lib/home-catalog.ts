import { DAM } from '@/lib/industry-catalog';

/** Homepage hero fallback — Sitecore fields win when present. */
export const HOME_HERO = {
  eyebrow: 'Capco, A Wipro Company',
  title: 'The Expert Advantage',
  lede: 'For nearly three decades, Capco has helped clients navigate complexity, lead change, and unlock value across Financial Services and Energy. Expert-led. AI-infused. Impact-focused.',
  video:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/25b3b15a98234fcd97ad3bf74950a2ad',
};

export const EXPERTISE_SECTORS = [
  {
    label: 'Banking and Payments',
    href: '/industries/banking-and-payments',
    slug: 'banking-and-payments',
    regions: ['united-kingdom', 'americas', 'asia-pacific', 'europe'],
  },
  {
    label: 'Capital Markets',
    href: '/industries/capital-markets',
    slug: 'capital-markets',
    regions: ['europe', 'united-kingdom', 'americas'],
  },
  {
    label: 'Energy',
    href: '/industries/energy',
    slug: 'energy',
    regions: ['americas', 'europe', 'united-kingdom'],
  },
];

export const EXPERTISE_SERVICES = [
  {
    title: 'Digital and AI',
    items: ['AI assistants', 'Agentic AI', 'Data platforms'],
  },
  {
    title: 'Payments and banking',
    items: ['Core modernisation', 'Digital banks', 'Payments delivery'],
  },
  {
    title: 'Capital markets',
    items: ['T+1 settlement', 'Post-trade', 'Market infrastructure'],
  },
  {
    title: 'Energy',
    items: ['Trading and risk', 'Transition', 'Utilities'],
  },
];

export const EXPERTISE_LOCATIONS = [
  {
    region: 'United Kingdom',
    slug: 'united-kingdom',
    offices: 'London',
  },
  {
    region: 'Europe',
    slug: 'europe',
    offices: 'Frankfurt, Geneva, Vienna, Warsaw',
  },
  {
    region: 'Americas',
    slug: 'americas',
    offices: 'New York, Toronto, São Paulo, Houston',
  },
  {
    region: 'Asia Pacific',
    slug: 'asia-pacific',
    offices: 'Singapore, Hong Kong, Bangalore',
  },
];

/** Sidebar latest items on Perspective article pages. */
export const LATEST_NEWS = [
  {
    time: '15 Sep 2026',
    title: 'Europe’s T+1 market must prove readiness',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
  },
  {
    time: '19 Aug 2026',
    title: 'Canada payment fraud: the next control test',
    href: '/perspectives/canada-payment-fraud',
  },
  {
    time: '17 Aug 2026',
    title: 'AI assistants as the front door to financial services',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
  },
  {
    time: '04 Mar 2026',
    title: 'Reimagining business banking onboarding',
    href: '/perspectives/reimagining-business-banking-onboarding',
  },
];

export const ARTICLE_SIGNUP = {
  title: 'The Expert Advantage, in your inbox',
  body: 'Perspectives on financial services and energy — T+1, payments, AI, and the energy transition.',
  href: '/perspectives',
  cta: 'Explore Perspectives',
};

export type CatalogInsight = {
  kicker: string;
  title: string;
  meta: string;
  href: string;
  imageSrc?: string;
  regions?: string[];
  sectors?: string[];
  authors?: string[];
};

/** Live related-card thumb (JN_7741) — links to the existing AI campaign, not a new person. */
export const RELATED_AI_SDLC: CatalogInsight = {
  kicker: 'PERSPECTIVE',
  title: 'AI in the software development lifecycle',
  meta: 'Capco Intelligence',
  href: '/ai',
  imageSrc: DAM.aiSdlc,
  sectors: ['banking-and-payments', 'energy'],
};

/** Homepage Perspectives cards (kept as OUTLAW_NEWS for the cloned component). */
export const OUTLAW_NEWS: CatalogInsight[] = [
  {
    kicker: 'PERSPECTIVE',
    title: 'Europe’s T+1 market must prove readiness',
    meta: '15 Sep 2026 · Elisabeth Plakinger',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
    imageSrc: DAM.costTakeout,
    regions: ['europe', 'united-kingdom'],
    sectors: ['capital-markets'],
    authors: ['elisabeth-plakinger'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Canada payment fraud: the next control test',
    meta: '19 Aug 2026 · Charlotte Byrne',
    href: '/perspectives/canada-payment-fraud',
    imageSrc: DAM.fraud,
    regions: ['americas'],
    sectors: ['banking-and-payments'],
    authors: ['charlotte-byrne'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'AI assistants as the front door to financial services',
    meta: '17 Aug 2026 · Charlotte Byrne',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    imageSrc: DAM.beyondExperiment,
    regions: ['united-kingdom', 'americas'],
    sectors: ['banking-and-payments'],
    authors: ['charlotte-byrne'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Agentic AI in energy trading',
    meta: '13 Aug 2026 · Elisabeth Plakinger',
    href: '/perspectives/agentic-ai-in-energy-trading',
    imageSrc: DAM.energyLanding,
    regions: ['americas', 'europe'],
    sectors: ['energy'],
    authors: ['elisabeth-plakinger'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: "The role of cyber resilience in preserving Europe's energy sovereignty",
    meta: '17 Jul 2026 · Elisabeth Plakinger',
    href: '/perspectives/energy-sovereignty-cyber-resilience',
    imageSrc: DAM.sovereignty,
    regions: ['europe', 'united-kingdom'],
    sectors: ['energy'],
    authors: ['elisabeth-plakinger'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'From predictable to weather-driven',
    meta: '27 Mar 2026 · Elisabeth Plakinger',
    href: '/perspectives/from-predictable-to-weather-driven',
    imageSrc: DAM.weather,
    regions: ['europe', 'united-kingdom'],
    sectors: ['energy'],
    authors: ['elisabeth-plakinger'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Reimagining business banking onboarding',
    meta: '04 Mar 2026 · Charlotte Byrne',
    href: '/perspectives/reimagining-business-banking-onboarding',
    imageSrc: DAM.onboarding,
    regions: ['united-kingdom', 'europe'],
    sectors: ['banking-and-payments'],
    authors: ['charlotte-byrne'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'The future of analytics in the era of AI',
    meta: '21 Sep 2026',
    href: '/perspectives/future-of-analytics',
    imageSrc: DAM.iso42001,
    regions: ['united-kingdom', 'americas', 'europe'],
    sectors: ['banking-and-payments'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Regulatory heatmap 2026–2028',
    meta: '12 Sep 2026 · Elisabeth Plakinger',
    href: '/perspectives/regulatory-heatmap',
    imageSrc: DAM.cdoApac,
    regions: ['europe'],
    sectors: ['energy'],
    authors: ['elisabeth-plakinger'],
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Regulatory Horizon',
    meta: '08 Sep 2026 · Elisabeth Plakinger',
    href: '/perspectives/regulatory-horizon',
    imageSrc: DAM.beyondVibe,
    regions: ['europe', 'united-kingdom'],
    sectors: ['capital-markets'],
    authors: ['elisabeth-plakinger'],
  },
];

export function articlesForAuthor(slug: string): CatalogInsight[] {
  const key = slug.toLowerCase();
  return OUTLAW_NEWS.filter((item) => (item.authors || []).includes(key));
}

export function relatedPerspectives(opts: {
  currentHref: string;
  sectors?: string[];
  region?: string;
  limit?: number;
}): (typeof OUTLAW_NEWS)[number][] {
  const current = opts.currentHref.split('?')[0].replace(/\/$/, '') || '/';
  const sectors = (opts.sectors || []).map((value) =>
    value
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );

  const related = OUTLAW_NEWS.filter((item) => item.href !== current)
    .map((item) => {
      const sectorOk =
        sectors.length === 0 || (item.sectors || []).some((sector) => sectors.includes(sector));
      const regionOk =
        !opts.region ||
        opts.region === 'all' ||
        !item.regions?.length ||
        item.regions.includes(opts.region) ||
        (opts.region === 'europe' && item.regions.includes('united-kingdom')) ||
        (opts.region === 'united-kingdom' && item.regions.includes('europe'));
      return { item, sectorOk, regionOk };
    })
    .filter((row) => row.regionOk)
    .sort((a, b) => Number(b.sectorOk) - Number(a.sectorOk))
    .slice(0, opts.limit || 3)
    .map((row) => row.item);

  if (
    current.includes('agentic-ai-in-energy-trading') ||
    current.includes('from-predictable-to-weather-driven')
  ) {
    return [RELATED_AI_SDLC, ...related.filter((item) => item.href !== RELATED_AI_SDLC.href)].slice(
      0,
      opts.limit || 3
    );
  }

  return related;
}

export const REACH_AWARDS = [
  {
    kicker: 'EXPERT-LED',
    title: 'Financial services and energy, one firm',
    source: 'The Expert Advantage',
  },
  {
    kicker: 'AI-INFUSED',
    title: 'Process, data and AI in how we deliver',
    source: 'Capco',
  },
  {
    kicker: 'IMPACT-FOCUSED',
    title: 'Measurable outcomes when the stakes are highest',
    source: 'Capco, A Wipro Company',
  },
];

export const PRESS_RELEASES: {
  date: string;
  title: string;
  href: string;
  meta?: string;
  regions?: string[];
  sectors?: string[];
}[] = [
  {
    date: '15 Sep 2026',
    title: 'Capco Perspective: Europe’s T+1 market must prove readiness',
    meta: '5 min read',
    href: '/about-us/announcements/capco-t-plus-1-europe-readiness',
    regions: ['europe', 'united-kingdom'],
    sectors: ['capital-markets'],
  },
  {
    date: '17 Aug 2026',
    title: 'AI assistants as the front door to financial services',
    meta: '5 min read',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    regions: ['united-kingdom', 'americas'],
    sectors: ['banking-and-payments'],
  },
  {
    date: '13 Aug 2026',
    title: 'Agentic AI in energy trading',
    meta: '3 min read',
    href: '/perspectives/agentic-ai-in-energy-trading',
    regions: ['americas', 'europe'],
    sectors: ['energy'],
  },
];
