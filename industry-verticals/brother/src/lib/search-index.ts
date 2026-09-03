import { BROTHER_PRODUCTS } from './products-catalog';

export type SearchScope = 'everything' | 'products' | 'articles';

export type SearchHit = {
  title: string;
  type: 'Product' | 'Page' | 'Article';
  category?: string;
  href: string;
  blurb: string;
  keywords: string[];
};

const PAGE_HITS: SearchHit[] = [
  {
    title: 'Brother UK home',
    type: 'Page',
    href: '/',
    blurb: 'Printers, scanners, labelling and receipts for home and business.',
    keywords: ['home', 'brother', 'printing', 'labelling'],
  },
  {
    title: 'Labelling and receipts',
    type: 'Page',
    category: 'Labelling',
    href: '/labelling-and-receipts',
    blurb: 'Browse Brother label printers including VC-500W, QL and P-touch.',
    keywords: ['labelling', 'receipts', 'labels', 'category'],
  },
  {
    title: 'Printers',
    type: 'Page',
    category: 'Printers',
    href: '/printers',
    blurb: 'Colour and mono laser printers for home office and workgroups.',
    keywords: ['printers', 'laser', 'inkjet', 'category'],
  },
  {
    title: 'Scanners',
    type: 'Page',
    category: 'Scanners',
    href: '/scanners',
    blurb: 'Mobile and desktop document scanners with Wi‑Fi options.',
    keywords: ['scanners', 'adf', 'document', 'category'],
  },
  {
    title: 'Business solutions',
    type: 'Page',
    href: '/business-solutions',
    blurb: 'Managed print, labelling workflows and workgroup devices.',
    keywords: ['business', 'mps', 'managed print', 'workgroup'],
  },
  {
    title: 'Supplies and accessories',
    type: 'Page',
    category: 'Supplies',
    href: '/supplies',
    blurb: 'Toner, DK rolls, TZe tapes and cleaning cassettes.',
    keywords: ['supplies', 'toner', 'tape', 'rolls', 'ink'],
  },
  {
    title: 'Support',
    type: 'Page',
    href: '/support',
    blurb: 'Drivers, manuals and how-to help for Brother devices.',
    keywords: ['support', 'drivers', 'manual', 'help'],
  },
  {
    title: 'VC-500W vertical applications',
    type: 'Page',
    category: 'Labelling',
    href: '/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
    blurb: 'How full-colour labels help offices, craft and organisation.',
    keywords: ['applications', 'vertical', 'vc-500w', 'use cases'],
  },
  {
    title: '5 great ideas for organising your desk and home office',
    type: 'Article',
    href: '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    blurb: 'Colour-code drawers, cables and shelves with the VC-500W.',
    keywords: ['blog', 'desk', 'home office', 'organise', 'article'],
  },
];

const PRODUCT_HITS: SearchHit[] = BROTHER_PRODUCTS.map((p) => ({
  title: p.title,
  type: 'Product' as const,
  category: p.category,
  href: p.href,
  blurb: p.subtitle,
  keywords: [...p.keywords, p.slug, p.category.toLowerCase()],
}));

export const SEARCH_INDEX: SearchHit[] = [...PRODUCT_HITS, ...PAGE_HITS];

/**
 * Filters Brother demo search hits by query and optional scope.
 * Stand-in for Sitecore Search until NEXT_PUBLIC_SITECORE_SEARCH_INDEX_ID is set.
 */
export function filterSearchHits(query: string, scope: SearchScope = 'everything'): SearchHit[] {
  const q = query.trim().toLowerCase();
  let pool = SEARCH_INDEX;
  if (scope === 'products') {
    pool = SEARCH_INDEX.filter((h) => h.type === 'Product');
  } else if (scope === 'articles') {
    pool = SEARCH_INDEX.filter((h) => h.type === 'Article' || h.type === 'Page');
  }

  if (!q) {
    return pool;
  }

  const tokens = q.split(/\s+/).filter(Boolean);
  return pool.filter((item) => {
    const haystack =
      `${item.title} ${item.blurb} ${item.type} ${item.category || ''} ${item.keywords.join(' ')}`.toLowerCase();
    return tokens.every((t) => haystack.includes(t));
  });
}
