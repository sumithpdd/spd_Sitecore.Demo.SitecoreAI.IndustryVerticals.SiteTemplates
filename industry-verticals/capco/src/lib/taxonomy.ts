export type TaxonomyTerm = {
  id: string;
  slug: string;
  title: string;
  children?: TaxonomyTerm[];
};

export type TaxonomyKind = 'current' | 'sector' | 'service' | 'region' | 'topic' | 'related';

export type PageTaxonomy = {
  sectors: string[];
  services: string[];
  regions: string[];
  topics?: string[];
  related?: { slug: string; title: string; href: string }[];
};

export type TaxonomyGraphNode = {
  id: string;
  label: string;
  kind: TaxonomyKind;
  href?: string;
};

export type TaxonomyGraph = {
  nodes: TaxonomyGraphNode[];
  links: { from: string; to: string }[];
};

export const TAXONOMY_FIELDS = {
  Sectors: 'c4c00010-0000-4000-8000-000000000059',
  Services: 'c4c00010-0000-4000-8000-00000000005a',
  Regions: 'c4c00010-0000-4000-8000-00000000005b',
};

export const TAXONOMY = {
  sectors: [
    {
      id: 'c4c00025-0000-4000-8000-000000000001',
      slug: 'banking-and-payments',
      title: 'Banking and Payments',
    },
    {
      id: 'c4c00025-0000-4000-8000-000000000002',
      slug: 'capital-markets',
      title: 'Capital Markets',
    },
    { id: 'c4c00025-0000-4000-8000-000000000003', slug: 'insurance', title: 'Insurance' },
    {
      id: 'c4c00025-0000-4000-8000-000000000004',
      slug: 'wealth-and-asset-management',
      title: 'Wealth and Asset Management',
    },
    { id: 'c4c00025-0000-4000-8000-000000000005', slug: 'energy', title: 'Energy' },
  ] as TaxonomyTerm[],
  services: [
    { id: 'c4c00025-0000-4000-8000-000000000011', slug: 't-plus-1', title: 'T+1 settlement' },
    { id: 'c4c00025-0000-4000-8000-000000000012', slug: 'ai', title: 'AI and data' },
    { id: 'c4c00025-0000-4000-8000-000000000013', slug: 'payments', title: 'Payments' },
    { id: 'c4c00025-0000-4000-8000-000000000014', slug: 'trading', title: 'Trading and risk' },
    { id: 'c4c00025-0000-4000-8000-000000000015', slug: 'data', title: 'Data platforms' },
    {
      id: 'c4c00025-0000-4000-8000-000000000016',
      slug: 'cyber-resilience',
      title: 'Cyber resilience',
    },
    {
      id: 'c4c00025-0000-4000-8000-000000000017',
      slug: 'commodity-trading',
      title: 'Commodity trading',
    },
    { id: 'c4c00025-0000-4000-8000-000000000018', slug: 'onboarding', title: 'Onboarding' },
    { id: 'c4c00025-0000-4000-8000-000000000019', slug: 'climate-risk', title: 'Climate risk' },
    { id: 'c4c00025-0000-4000-8000-00000000001a', slug: 'surveillance', title: 'Surveillance' },
  ] as TaxonomyTerm[],
  regions: [
    {
      id: 'c4c00025-0000-4000-8000-000000000021',
      slug: 'united-kingdom',
      title: 'United Kingdom',
    },
    { id: 'c4c00025-0000-4000-8000-000000000022', slug: 'europe', title: 'Europe' },
    { id: 'c4c00025-0000-4000-8000-000000000023', slug: 'americas', title: 'Americas' },
    { id: 'c4c00025-0000-4000-8000-000000000024', slug: 'asia-pacific', title: 'Asia Pacific' },
    { id: 'c4c00025-0000-4000-8000-000000000025', slug: 'germany', title: 'Germany' },
    { id: 'c4c00025-0000-4000-8000-000000000026', slug: 'canada', title: 'Canada' },
    { id: 'c4c00025-0000-4000-8000-000000000027', slug: 'nordics', title: 'Nordics' },
    { id: 'c4c00025-0000-4000-8000-000000000028', slug: 'middle-east', title: 'Middle East' },
  ] as TaxonomyTerm[],
  topics: [
    { id: 'c4c00025-0000-4000-8000-000000000031', slug: 'regulation', title: 'Regulation' },
    {
      id: 'c4c00025-0000-4000-8000-000000000032',
      slug: 'transformation',
      title: 'Transformation',
    },
    { id: 'c4c00025-0000-4000-8000-000000000033', slug: 'risk', title: 'Risk' },
    {
      id: 'c4c00025-0000-4000-8000-000000000034',
      slug: 'energy-trading',
      title: 'Energy trading',
    },
    { id: 'c4c00025-0000-4000-8000-000000000035', slug: 'agentic-ai', title: 'Agentic AI' },
    { id: 'c4c00025-0000-4000-8000-000000000036', slug: 'fraud', title: 'Fraud controls' },
    { id: 'c4c00025-0000-4000-8000-000000000037', slug: 'analytics', title: 'Analytics' },
    { id: 'c4c00025-0000-4000-8000-000000000038', slug: 'climate', title: 'Climate' },
    { id: 'c4c00025-0000-4000-8000-000000000039', slug: 'settlement', title: 'Settlement' },
    { id: 'c4c00025-0000-4000-8000-00000000003a', slug: 'cyber', title: 'Cyber' },
  ] as TaxonomyTerm[],
};

function slugs(...values: string[]): string[] {
  return values.filter(Boolean);
}

export const PAGE_TAXONOMY: Record<string, PageTaxonomy> = {
  'elisabeth-plakinger': {
    sectors: ['capital-markets', 'energy'],
    services: ['t-plus-1', 'data', 'trading', 'commodity-trading'],
    regions: ['europe', 'united-kingdom', 'germany'],
    topics: ['regulation', 'settlement', 'energy-trading', 'agentic-ai'],
    related: [
      {
        slug: 'europes-t-plus-1-market-must-prove-readiness',
        title: 'T+1 readiness',
        href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
      },
      {
        slug: 'agentic-ai-in-energy-trading',
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
      },
    ],
  },
  'charlotte-byrne': {
    sectors: ['banking-and-payments'],
    services: ['ai', 'payments', 'onboarding'],
    regions: ['united-kingdom', 'americas', 'canada'],
    topics: ['fraud', 'analytics', 'transformation'],
    related: [
      {
        slug: 'canada-payment-fraud',
        title: 'Canada payment fraud',
        href: '/perspectives/canada-payment-fraud',
      },
      {
        slug: 'ai-assistants-as-the-front-door-to-fs',
        title: 'AI assistants',
        href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
      },
    ],
  },
  'anne-marie-rowland': {
    sectors: ['banking-and-payments', 'capital-markets', 'energy'],
    services: ['ai'],
    regions: ['united-kingdom', 'europe', 'americas', 'asia-pacific'],
    topics: ['transformation'],
  },
  'marina-costa': {
    sectors: ['banking-and-payments'],
    services: ['payments'],
    regions: ['americas', 'canada'],
    topics: ['fraud'],
  },
  'agentic-ai-in-energy-trading': {
    sectors: ['energy', 'capital-markets'],
    services: ['ai', 'trading', 'data', 'commodity-trading'],
    regions: ['europe', 'united-kingdom', 'americas', 'germany'],
    topics: ['energy-trading', 'agentic-ai', 'risk', 'transformation'],
    related: [
      {
        slug: 'energy-sovereignty-cyber-resilience',
        title: 'Energy sovereignty',
        href: '/perspectives/energy-sovereignty-cyber-resilience',
      },
      {
        slug: 'from-predictable-to-weather-driven',
        title: 'Weather-driven markets',
        href: '/perspectives/from-predictable-to-weather-driven',
      },
      {
        slug: 'europes-t-plus-1-market-must-prove-readiness',
        title: 'T+1 readiness',
        href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
      },
    ],
  },
  'europes-t-plus-1-market-must-prove-readiness': {
    sectors: ['capital-markets'],
    services: ['t-plus-1', 'data', 'trading'],
    regions: ['europe', 'united-kingdom', 'germany', 'nordics'],
    topics: ['regulation', 'settlement', 'transformation', 'risk'],
    related: [
      {
        slug: 'agentic-ai-in-energy-trading',
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
      },
      {
        slug: 'regulatory-horizon',
        title: 'Regulatory Horizon',
        href: '/perspectives/regulatory-horizon',
      },
    ],
  },
  'ai-assistants-as-the-front-door-to-fs': {
    sectors: ['banking-and-payments'],
    services: ['ai', 'payments', 'onboarding'],
    regions: ['united-kingdom', 'americas'],
    topics: ['analytics', 'transformation', 'agentic-ai'],
    related: [
      {
        slug: 'canada-payment-fraud',
        title: 'Canada payment fraud',
        href: '/perspectives/canada-payment-fraud',
      },
      {
        slug: 'reimagining-business-banking-onboarding',
        title: 'Business banking onboarding',
        href: '/perspectives/reimagining-business-banking-onboarding',
      },
    ],
  },
  'canada-payment-fraud': {
    sectors: ['banking-and-payments'],
    services: ['payments', 'ai', 'surveillance'],
    regions: ['americas', 'canada'],
    topics: ['fraud', 'risk', 'regulation'],
    related: [
      {
        slug: 'ai-assistants-as-the-front-door-to-fs',
        title: 'AI assistants',
        href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
      },
    ],
  },
  'energy-sovereignty-cyber-resilience': {
    sectors: ['energy'],
    services: ['cyber-resilience', 'trading', 'ai'],
    regions: ['europe', 'united-kingdom', 'germany'],
    topics: ['cyber', 'risk', 'energy-trading'],
    related: [
      {
        slug: 'agentic-ai-in-energy-trading',
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
      },
    ],
  },
  'from-predictable-to-weather-driven': {
    sectors: ['energy'],
    services: ['commodity-trading', 'climate-risk', 'data'],
    regions: ['europe', 'united-kingdom', 'nordics'],
    topics: ['climate', 'energy-trading', 'analytics'],
    related: [
      {
        slug: 'agentic-ai-in-energy-trading',
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
      },
    ],
  },
  'reimagining-business-banking-onboarding': {
    sectors: ['banking-and-payments'],
    services: ['onboarding', 'payments', 'ai'],
    regions: ['united-kingdom', 'europe'],
    topics: ['transformation', 'analytics'],
  },
  'future-of-analytics': {
    sectors: ['banking-and-payments', 'energy'],
    services: ['ai', 'data', 'surveillance'],
    regions: ['united-kingdom', 'americas', 'europe'],
    topics: ['analytics', 'agentic-ai', 'transformation'],
  },
  'regulatory-heatmap': {
    sectors: ['energy', 'capital-markets'],
    services: ['t-plus-1', 'climate-risk'],
    regions: ['europe', 'germany'],
    topics: ['regulation', 'risk'],
  },
  'regulatory-horizon': {
    sectors: ['banking-and-payments', 'capital-markets'],
    services: ['t-plus-1', 'surveillance'],
    regions: ['europe', 'united-kingdom'],
    topics: ['regulation', 'settlement'],
  },
  'capco-t-plus-1-europe-readiness': {
    sectors: ['capital-markets'],
    services: ['t-plus-1'],
    regions: ['europe'],
    topics: ['settlement', 'regulation'],
  },
  'capital-markets': {
    sectors: ['capital-markets'],
    services: ['t-plus-1', 'trading'],
    regions: ['europe', 'united-kingdom', 'americas'],
    topics: ['settlement'],
  },
  'banking-and-payments': {
    sectors: ['banking-and-payments'],
    services: ['payments', 'ai'],
    regions: ['united-kingdom', 'americas', 'asia-pacific'],
    topics: ['fraud'],
  },
  energy: {
    sectors: ['energy'],
    services: ['commodity-trading', 'ai', 'cyber-resilience'],
    regions: ['europe', 'united-kingdom', 'americas'],
    topics: ['energy-trading', 'climate'],
  },
};

export function flattenTaxonomy(nodes: TaxonomyTerm[]): TaxonomyTerm[] {
  return nodes.flatMap((node) => [node, ...flattenTaxonomy(node.children || [])]);
}

export function taxonomyBySlug(): Record<string, TaxonomyTerm> {
  return Object.fromEntries(
    flattenTaxonomy([
      ...TAXONOMY.sectors,
      ...TAXONOMY.services,
      ...TAXONOMY.regions,
      ...TAXONOMY.topics,
    ]).map((term) => [term.slug, term])
  );
}

export function expandSelected(selected: string[], tree: TaxonomyTerm[]): Set<string> {
  const wanted = new Set(selected.filter(Boolean));
  const expanded = new Set<string>();
  const visit = (node: TaxonomyTerm, inherit: boolean) => {
    const active = inherit || wanted.has(node.slug);
    if (active) {
      expanded.add(node.slug);
    }
    (node.children || []).forEach((child) => visit(child, active));
  };
  tree.forEach((node) => visit(node, false));
  return expanded;
}

export function matchesTaxonomy(
  selected: string[],
  values: string[] | undefined,
  tree: TaxonomyTerm[]
): boolean {
  if (!selected.length) {
    return true;
  }
  const expanded = expandSelected(selected, tree);
  return (values || []).some((value) => expanded.has(value));
}

export function toTaxonomyKey(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function uniqueKeys(values: string[]): string[] {
  return Array.from(new Set(values.map(toTaxonomyKey).filter(Boolean)));
}

function labelFor(slug: string, fallback: string): string {
  return taxonomyBySlug()[slug]?.title || fallback;
}

export function mergePageTaxonomy(slug: string, cms?: Partial<PageTaxonomy>): PageTaxonomy {
  const catalog = PAGE_TAXONOMY[slug] || {
    sectors: [],
    services: [],
    regions: [],
    topics: [],
    related: [],
  };
  return {
    sectors: uniqueKeys(slugs(...(cms?.sectors || []), ...catalog.sectors)),
    services: uniqueKeys(slugs(...(cms?.services || []), ...catalog.services)),
    regions: uniqueKeys(slugs(...(cms?.regions || []), ...catalog.regions)),
    topics: uniqueKeys(slugs(...(cms?.topics || []), ...(catalog.topics || []))),
    related: [...(cms?.related || []), ...(catalog.related || [])].filter(
      (item, index, list) => list.findIndex((row) => row.slug === item.slug) === index
    ),
  };
}

export function taxonomyGraph(opts: {
  slug: string;
  title: string;
  href?: string;
  cms?: Partial<PageTaxonomy>;
}): TaxonomyGraph {
  const merged = mergePageTaxonomy(opts.slug, opts.cms);
  const currentId = `current:${opts.slug || 'item'}`;
  const nodes: TaxonomyGraphNode[] = [
    {
      id: currentId,
      label: opts.title || opts.slug || 'Current item',
      kind: 'current',
      href: opts.href,
    },
  ];
  const links: TaxonomyGraph['links'] = [];

  const add = (kind: TaxonomyKind, slug: string, href?: string) => {
    const id = `${kind}:${slug}`;
    if (nodes.some((node) => node.id === id)) {
      return;
    }
    nodes.push({ id, label: labelFor(slug, slug), kind, href });
    links.push({ from: currentId, to: id });
  };

  merged.sectors.forEach((slug) => add('sector', slug, `/industries/${slug}`));
  merged.services.forEach((slug) => add('service', slug));
  merged.regions.forEach((slug) => add('region', slug));
  (merged.topics || []).forEach((slug) => add('topic', slug, `/perspectives?topic=${slug}`));
  (merged.related || []).forEach((item) => {
    const id = `related:${item.slug}`;
    if (nodes.some((node) => node.id === id)) {
      return;
    }
    nodes.push({ id, label: item.title, kind: 'related', href: item.href });
    links.push({ from: currentId, to: id });
  });

  return { nodes, links };
}
