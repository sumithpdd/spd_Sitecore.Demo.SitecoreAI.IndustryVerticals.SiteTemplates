export type TaxonomyTerm = {
  id: string;
  slug: string;
  title: string;
  children?: TaxonomyTerm[];
};

export type PageTaxonomy = {
  sectors: string[];
  services: string[];
  regions: string[];
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
  ] as TaxonomyTerm[],
};

export const PAGE_TAXONOMY: Record<string, PageTaxonomy> = {
  'elisabeth-plakinger': {
    sectors: ['capital-markets'],
    services: ['t-plus-1', 'data'],
    regions: ['europe', 'united-kingdom'],
  },
  'charlotte-byrne': {
    sectors: ['banking-and-payments'],
    services: ['ai', 'payments'],
    regions: ['united-kingdom', 'americas'],
  },
  'anne-marie-rowland': {
    sectors: ['banking-and-payments', 'capital-markets', 'energy'],
    services: ['ai'],
    regions: ['united-kingdom', 'europe', 'americas', 'asia-pacific'],
  },
  'marina-costa': {
    sectors: ['banking-and-payments'],
    services: ['payments'],
    regions: ['americas'],
  },
  'europes-t-plus-1-market-must-prove-readiness': {
    sectors: ['capital-markets'],
    services: ['t-plus-1', 'data'],
    regions: ['europe', 'united-kingdom'],
  },
  'ai-assistants-as-the-front-door-to-fs': {
    sectors: ['banking-and-payments'],
    services: ['ai', 'payments'],
    regions: ['united-kingdom', 'americas'],
  },
  'capco-t-plus-1-europe-readiness': {
    sectors: ['capital-markets'],
    services: ['t-plus-1'],
    regions: ['europe'],
  },
  'capital-markets': {
    sectors: ['capital-markets'],
    services: ['t-plus-1', 'trading'],
    regions: ['europe', 'united-kingdom', 'americas'],
  },
  'banking-and-payments': {
    sectors: ['banking-and-payments'],
    services: ['payments', 'ai'],
    regions: ['united-kingdom', 'americas', 'asia-pacific'],
  },
};

export function flattenTaxonomy(nodes: TaxonomyTerm[]): TaxonomyTerm[] {
  return nodes.flatMap((node) => [node, ...flattenTaxonomy(node.children || [])]);
}

export function taxonomyBySlug(): Record<string, TaxonomyTerm> {
  return Object.fromEntries(
    flattenTaxonomy([...TAXONOMY.sectors, ...TAXONOMY.services, ...TAXONOMY.regions]).map(
      (term) => [term.slug, term]
    )
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
