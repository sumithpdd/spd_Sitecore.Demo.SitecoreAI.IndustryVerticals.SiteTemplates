import { STORY } from '@/lib/asos-journey';
import {
  CATEGORIES,
  getProduct,
  LIVE_PRODUCTS,
  PRODUCTS,
  type Product,
} from '@/lib/product-catalog';

export type SearchHit = {
  title: string;
  href: string;
  type: 'Product' | 'Category' | 'Page';
  category?: string;
  productId?: string;
};

const PAGES: SearchHit[] = [
  { title: 'Women', href: STORY.womenHref, type: 'Page' },
  { title: "Women's New In", href: STORY.newInHref, type: 'Page', category: 'New in' },
  { title: 'Denim', href: STORY.trendsDenimHref, type: 'Page', category: 'Denim' },
  { title: 'Petite denim', href: STORY.petiteHref, type: 'Page', category: 'Denim' },
  { title: 'Topshop', href: STORY.topshopHref, type: 'Page', category: 'Brands' },
  { title: 'Style Feed', href: STORY.styleFeedHref, type: 'Page' },
  { title: 'My Edit', href: STORY.myEditHref, type: 'Page' },
];

export const QUERY_SUGGESTIONS = [
  'wide-leg jeans',
  'wide-leg jeans under £50',
  'denim',
  'petite denim',
  'Topshop',
  'sale under £10',
];

export function suggestQueries(query: string): string[] {
  const q = norm(query);
  if (!q) return ['wide-leg jeans'];
  return QUERY_SUGGESTIONS.filter((item) => {
    const suggestion = norm(item);
    return suggestion.includes(q) || q.split(' ').every((part) => suggestion.includes(part));
  }).slice(0, 5);
}

function norm(value: string): string {
  return value.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
}

function toHit(product: Product): SearchHit {
  return {
    title: product.title,
    href: product.href,
    type: 'Product',
    category: product.category,
    productId: product.id,
  };
}

export function filterSearchHits(query: string): SearchHit[] {
  const q = norm(query);
  const includeLive = !q || q.includes('denim') || q.includes('wide') || q.includes('jean');
  const seen = new Set<string>();
  const products = [...PRODUCTS, ...(includeLive ? LIVE_PRODUCTS : [])].flatMap((product) => {
    if (seen.has(product.id)) return [];
    seen.add(product.id);
    return [toHit(product)];
  });
  const categories: SearchHit[] = CATEGORIES.map((category) => ({
    title: category.title,
    href: category.href,
    type: 'Category',
    category: category.slug,
  }));
  const all = [...categories, ...PAGES, ...products];
  if (!q) return all.slice(0, 12);
  const matched = all.filter((hit) => {
    const hay = norm(`${hit.title} ${hit.category || ''} ${hit.type}`);
    return hay.includes(q) || q.split(' ').every((part) => hay.includes(part));
  });
  return q.includes('denim') ? matched : matched.slice(0, 48);
}

export type SearchFacets = {
  groups: { key: string; values: string[] }[];
  priceMin?: number;
  priceMax?: number;
  curated: boolean;
};

const REFINE: Record<string, (product: Product) => boolean> = {
  'attribute_10992:61379': (product) => product.category === 'dresses',
  'attribute_1047:8387': (product) =>
    product.category === 'knitwear' && /jumper|knit|sweater/i.test(product.title),
  'attribute_1047:8404': (product) => /cardigan/i.test(product.title),
  'attribute_10159:63025': (product) => /samba/i.test(product.title),
  'base_colour:4': (product) => /black/i.test(product.color),
  'attribute_12017:63014': (product) =>
    /stainless steel/i.test(`${product.title} ${product.fabric || ''}`),
};

export const FACET_LINKS = [
  { label: 'Dresses', refine: 'attribute_10992:61379' },
  { label: 'Jumpers & cardigans', refine: 'attribute_1047:8387,8404' },
  { label: 'adidas Samba', refine: 'attribute_10159:63025' },
  { label: 'Black', refine: 'base_colour:4' },
  { label: 'Stainless steel', refine: 'attribute_12017:63014' },
  { label: '£45–£95', pricerange: '45-95' },
  { label: 'Curated', iscurated: 'true' },
] as const;

export function parseSearchFacets(search: string): SearchFacets {
  const params = new URLSearchParams(search.replace(/^\?/, ''));
  const range = params.get('pricerange') || '';
  const [min, max] = range.split('-').map(Number);
  return {
    groups: params.getAll('refine').map((token) => {
      const [key, raw = ''] = token.split(':');
      return { key, values: raw.split(',').filter(Boolean) };
    }),
    priceMin: Number.isFinite(min) ? min : undefined,
    priceMax: Number.isFinite(max) ? max : undefined,
    curated: params.get('iscurated') === 'true',
  };
}

export function productMatchesFacets(product: Product, facets: SearchFacets): boolean {
  if (facets.priceMin != null && product.priceGbp < facets.priceMin) return false;
  if (facets.priceMax != null && product.priceGbp > facets.priceMax) return false;
  if (facets.curated && !product.completePdp && !product.videoSrc) return false;
  return facets.groups.every((group) =>
    group.values.some((value) => REFINE[`${group.key}:${value}`]?.(product) ?? false)
  );
}

export function productsFromHits(hits: SearchHit[], facets: SearchFacets): Product[] {
  return hits.flatMap((hit) => {
    const product = hit.productId ? getProduct(hit.productId) : undefined;
    return product && productMatchesFacets(product, facets) ? [product] : [];
  });
}
