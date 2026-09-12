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
  Sectors: 'a1e90014-0000-4000-8000-000000000010',
  Services: 'a1e90014-0000-4000-8000-000000000011',
  Regions: 'a1e90014-0000-4000-8000-000000000012',
};

export const TAXONOMY = {
  sectors: [
    {
      id: 'a1e90025-0000-4000-8000-000000000017',
      slug: 'defence-security',
      title: 'Defence & Security',
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000018',
      slug: 'energy-natural-resources',
      title: 'Energy & Natural Resources',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000019',
          slug: 'cleantech',
          title: 'CleanTech',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000020',
          slug: 'hydrogen-bioenergy-ccus',
          title: 'Hydrogen, Bioenergy & CCUS',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000021',
          slug: 'nuclear',
          title: 'Nuclear',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000022',
          slug: 'oil-gas',
          title: 'Oil & Gas',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000023',
          slug: 'renewables',
          title: 'Renewables',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000024',
      slug: 'financial-services',
      title: 'Financial Services',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000025',
          slug: 'digital-assets',
          title: 'Digital assets',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000026',
          slug: 'finance',
          title: 'Finance',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000027',
          slug: 'fintech',
          title: 'Fintech',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000028',
          slug: 'insurance',
          title: 'Insurance',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000029',
      slug: 'infrastructure',
      title: 'Infrastructure',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000030',
          slug: 'community-infrastructure',
          title: 'Community Infrastructure',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000031',
          slug: 'construction',
          title: 'Construction',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000032',
          slug: 'construction-services',
          title: 'Construction Services',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000033',
          slug: 'economic-infrastructure',
          title: 'Economic Infrastructure',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000034',
          slug: 'major-infrastructure-owners-operators',
          title: 'Major Infrastructure Owners & Operators',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000035',
          slug: 'social-infrastructure',
          title: 'Social Infrastructure',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000036',
          slug: 'transport',
          title: 'Transport',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000037',
          slug: 'waste',
          title: 'Waste',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000038',
          slug: 'waste-management',
          title: 'Waste management',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000039',
          slug: 'water-wastewater',
          title: 'Water & wastewater',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000040',
      slug: 'life-sciences-healthcare',
      title: 'Life Sciences & Healthcare',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000041',
          slug: 'dental',
          title: 'Dental',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000042',
          slug: 'health',
          title: 'Health',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000043',
      slug: 'professional-public-services',
      title: 'Professional & Public Services',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000044',
          slug: 'government-and-public-sector',
          title: 'Government and public sector',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000045',
          slug: 'professional-services',
          title: 'Professional Services',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000046',
      slug: 'real-estate',
      title: 'Real Estate',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000047',
          slug: 'garden-communities',
          title: 'Garden communities',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000048',
          slug: 'logistics',
          title: 'Logistics',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000049',
          slug: 'residential',
          title: 'Residential',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000050',
      slug: 'retail-consumer',
      title: 'Retail & Consumer',
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000051',
      slug: 'sport-hospitality',
      title: 'Sport & Hospitality',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000052',
          slug: 'gambling',
          title: 'Gambling',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000053',
          slug: 'hotels',
          title: 'Hotels',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000054',
          slug: 'sport-entertainment',
          title: 'Sport & Entertainment',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000055',
      slug: 'technology-science-industry',
      title: 'Technology, Science & Industry',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000056',
          slug: 'automotive',
          title: 'Automotive',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000057',
          slug: 'autonomous-vehicles',
          title: 'Autonomous vehicles',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000058',
          slug: 'diversified-industrial',
          title: 'Diversified Industrial',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000059',
          slug: 'technology-digital-markets',
          title: 'Technology & Digital Markets',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000060',
          slug: 'universities-education',
          title: 'Universities & Education',
        },
      ],
    },
  ] as TaxonomyTerm[],
  services: [
    {
      id: 'a1e90025-0000-4000-8000-000000000513',
      slug: 'construction-projects',
      title: 'Construction & projects',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000514',
          slug: 'construction-advisory-disputes',
          title: 'Construction Advisory & Disputes',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000515',
          slug: 'planning-environment',
          title: 'Planning & environment',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000516',
          slug: 'projects',
          title: 'Projects',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000517',
      slug: 'corporate',
      title: 'Corporate',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000518',
          slug: 'antitrust-competition-trade',
          title: 'Antitrust, competition & trade',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000519',
          slug: 'commercial',
          title: 'Commercial',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000520',
          slug: 'corporate-corporate',
          title: 'Corporate',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000521',
          slug: 'tax',
          title: 'Tax',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000522',
      slug: 'dispute-resolution',
      title: 'Dispute resolution',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000523',
          slug: 'arbitration',
          title: 'Arbitration',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000524',
          slug: 'bribery-corruption',
          title: 'Bribery & corruption',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000525',
          slug: 'commercial-litigation',
          title: 'Commercial litigation',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000526',
          slug: 'competition-litigation',
          title: 'Competition litigation',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000527',
          slug: 'export-controls-sanctions',
          title: 'Export Controls & Sanctions',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000528',
          slug: 'litigation-and-arbitration',
          title: 'Litigation and arbitration',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000529',
          slug: 'product-liability',
          title: 'Product liability',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000530',
          slug: 'tax-disputes-investigations',
          title: 'Tax disputes & investigations',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000531',
      slug: 'employment-incentives',
      title: 'Employment & incentives',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000532',
          slug: 'employment',
          title: 'Employment',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000533',
          slug: 'incentives',
          title: 'Incentives',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000534',
      slug: 'finance',
      title: 'Finance',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000535',
          slug: 'debt-finance',
          title: 'Debt finance',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000536',
          slug: 'energy-infrastructure-finance',
          title: 'Energy & infrastructure finance',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000537',
          slug: 'financial-regulation-products',
          title: 'Financial regulation & products',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000538',
          slug: 'insurance-advisory-disputes',
          title: 'Insurance - advisory & disputes',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000539',
          slug: 'investment-funds',
          title: 'Investment Funds',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000540',
          slug: 'private-equity',
          title: 'Private equity',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000541',
          slug: 'project-finance',
          title: 'Project finance',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000542',
          slug: 'real-estate-finance',
          title: 'Real estate finance',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000543',
          slug: 'restructuring',
          title: 'Restructuring',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000544',
      slug: 'intellectual-property',
      title: 'Intellectual Property',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000545',
          slug: 'brand-protection-creative-rights',
          title: 'Brand protection & creative rights',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000546',
          slug: 'patents',
          title: 'Patents',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000547',
      slug: 'pensions-long-term-savings',
      title: 'Pensions & long-term savings',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000548',
          slug: 'pensions-advisory',
          title: 'Pensions advisory',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000549',
          slug: 'pensions-disputes',
          title: 'Pensions disputes',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000550',
          slug: 'pensions-investments',
          title: 'Pensions investments',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000551',
      slug: 'property',
      title: 'Property',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000552',
          slug: 'corporate-real-estate',
          title: 'Corporate Real Estate',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000553',
          slug: 'environmental',
          title: 'Environmental',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000554',
          slug: 'planning',
          title: 'Planning',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000555',
          slug: 'property-development',
          title: 'Property development',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000556',
          slug: 'property-dispute-resolution',
          title: 'Property dispute resolution',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000557',
          slug: 'property-investment',
          title: 'Property investment',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000558',
      slug: 'regulation-global-investigations',
      title: 'Regulation & global investigations',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000559',
          slug: 'climate-sustainability',
          title: 'Climate & sustainability',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000560',
          slug: 'financial-services-regulation',
          title: 'Financial services regulation',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000561',
          slug: 'global-investigations',
          title: 'Global investigations',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000562',
          slug: 'health-safety',
          title: 'Health & safety',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000563',
          slug: 'public-policy',
          title: 'Public policy',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000000564',
      slug: 'technology-media-telecommunications',
      title: 'Technology, Media & Telecommunications',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000000565',
          slug: 'artificial-intelligence',
          title: 'Artificial intelligence',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000566',
          slug: 'data-privacy-cyber',
          title: 'Data, privacy & cyber',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000567',
          slug: 'tmt-disputes-renegotiations',
          title: 'TMT disputes & renegotiations',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000000568',
          slug: 'tmt-sourcing-advisory',
          title: 'TMT sourcing & advisory',
        },
      ],
    },
  ] as TaxonomyTerm[],
  regions: [
    {
      id: 'a1e90025-0000-4000-8000-000000001025',
      slug: 'africa',
      title: 'Africa',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000001026',
          slug: 'south-africa',
          title: 'South Africa',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000001027',
      slug: 'asia-pacific',
      title: 'Asia Pacific',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000001028',
          slug: 'australia',
          title: 'Australia',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001029',
          slug: 'china',
          title: 'China',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001030',
          slug: 'singapore',
          title: 'Singapore',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000001031',
      slug: 'europe',
      title: 'Europe',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000001032',
          slug: 'france',
          title: 'France',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001033',
          slug: 'germany',
          title: 'Germany',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001034',
          slug: 'ireland',
          title: 'Ireland',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001035',
          slug: 'luxembourg',
          title: 'Luxembourg',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001036',
          slug: 'poland',
          title: 'Poland',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001037',
          slug: 'spain',
          title: 'Spain',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001038',
          slug: 'the-netherlands',
          title: 'The Netherlands',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001039',
          slug: 'united-kingdom',
          title: 'United Kingdom',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000001040',
      slug: 'middle-east',
      title: 'Middle East',
      children: [
        {
          id: 'a1e90025-0000-4000-8000-000000001041',
          slug: 'qatar',
          title: 'Qatar',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001042',
          slug: 'saudi-arabia',
          title: 'Saudi Arabia',
        },
        {
          id: 'a1e90025-0000-4000-8000-000000001043',
          slug: 'united-arab-emirates',
          title: 'United Arab Emirates',
        },
      ],
    },
    {
      id: 'a1e90025-0000-4000-8000-000000001044',
      slug: 'multinational-network',
      title: 'Multinational Network',
    },
  ] as TaxonomyTerm[],
};

export const PAGE_TAXONOMY: Record<string, PageTaxonomy> = {
  'dawn-allen': {
    sectors: ['financial-services'],
    services: ['restructuring'],
    regions: ['united-kingdom', 'europe'],
  },
  'sally-williamson': {
    sectors: ['professional-public-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'bill-ryan': {
    sectors: ['infrastructure', 'construction'],
    services: ['construction-advisory-disputes', 'arbitration'],
    regions: ['australia', 'asia-pacific'],
  },
  'hammad-akhtar': {
    sectors: ['financial-services', 'insurance'],
    services: ['insurance-advisory-disputes', 'corporate'],
    regions: ['united-kingdom'],
  },
  'desiree-fields': {
    sectors: ['technology-science-industry'],
    services: ['intellectual-property', 'brand-protection-creative-rights'],
    regions: ['united-kingdom'],
  },
  'dinesh-banani': {
    sectors: ['financial-services'],
    services: ['finance', 'financial-regulation-products'],
    regions: ['united-kingdom'],
  },
  'david-barker': {
    sectors: ['technology-science-industry'],
    services: ['technology-media-telecommunications', 'data-privacy-cyber'],
    regions: ['united-kingdom'],
  },
  'david-doogan': {
    sectors: ['financial-services'],
    services: ['finance', 'debt-finance'],
    regions: ['united-kingdom'],
  },
  'barry-mccaig': {
    sectors: ['professional-public-services'],
    services: ['corporate'],
    regions: ['united-kingdom'],
  },
  'bryn-reynolds': {
    sectors: ['financial-services'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'ben-mckinley': {
    sectors: ['professional-public-services'],
    services: ['employment'],
    regions: ['australia', 'asia-pacific'],
  },
  'when-uk-suppliers-must-continue-to-supply-insolvent-companies': {
    sectors: ['professional-public-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'uk-government-plans-to-revamp-holiday-pay-calculation-for-part-year-workers': {
    sectors: ['professional-public-services'],
    services: ['employment'],
    regions: ['united-kingdom'],
  },
  'pensions-disputes-managing-member-expectations-paramount': {
    sectors: ['financial-services'],
    services: ['pensions-disputes'],
    regions: ['united-kingdom'],
  },
  'uk-subsidy-control-post-brexit-access-to-effective-judicial-remedies': {
    sectors: ['professional-public-services', 'government-and-public-sector'],
    services: ['regulation-global-investigations'],
    regions: ['united-kingdom', 'europe'],
  },
  'steps-of-court-settlement-was-not-negligent-court-rules': {
    sectors: ['professional-public-services'],
    services: ['dispute-resolution', 'litigation-and-arbitration'],
    regions: ['united-kingdom'],
  },
  'vast-majority-of-companies-not-seeking-to-avoid-tax': {
    sectors: ['financial-services'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'world-first-industrial-decarbonisation-strategy-developed-in-the-uk': {
    sectors: ['energy-natural-resources'],
    services: ['climate-sustainability'],
    regions: ['united-kingdom'],
  },
  '3d-printing-uk-product-safety-issues': {
    sectors: ['technology-science-industry'],
    services: ['product-liability'],
    regions: ['united-kingdom'],
  },
  '5g-potential-for-business-highlighted-in-uk-funding-programme': {
    sectors: ['technology-science-industry'],
    services: ['technology-media-telecommunications'],
    regions: ['united-kingdom'],
  },
  'lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects': {
    sectors: ['technology-science-industry'],
    services: ['artificial-intelligence'],
    regions: ['united-kingdom'],
  },
  'english-court-confirms-high-bar-for-resisting-performance-bond-calls': {
    sectors: ['infrastructure', 'construction'],
    services: ['construction-projects'],
    regions: ['united-kingdom'],
  },
  'uk-plastic-packaging-tax-data-increases-scrutiny-on-supply-chains': {
    sectors: ['retail-consumer'],
    services: ['tax'],
    regions: ['united-kingdom'],
  },
  'pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson': {
    sectors: ['financial-services'],
    services: ['restructuring'],
    regions: ['united-kingdom'],
  },
  'pinsent-masons-bolsters-middle-east-international-arbitration-practice-with-partner-hire': {
    sectors: ['professional-public-services'],
    services: ['arbitration'],
    regions: ['middle-east', 'united-arab-emirates'],
  },
  'pinsent-masons-appoints-infrastructure-ma-specialist-candice-lambeth': {
    sectors: ['infrastructure'],
    services: ['corporate'],
    regions: ['united-kingdom'],
  },
  restructuring: {
    sectors: ['professional-public-services', 'financial-services'],
    services: ['restructuring', 'finance'],
    regions: ['united-kingdom', 'europe'],
  },
  'professional-public-services': {
    sectors: ['professional-public-services'],
    services: ['corporate'],
    regions: ['united-kingdom'],
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
