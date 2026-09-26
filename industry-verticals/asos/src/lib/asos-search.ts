import { STORY } from '@/lib/asos-journey';
import { CATEGORIES, PRODUCTS } from '@/lib/product-catalog';

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

export function filterSearchHits(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  const products: SearchHit[] = PRODUCTS.map((product) => ({
    title: product.title,
    href: product.href,
    type: 'Product',
    category: product.category,
    productId: product.id,
  }));
  const categories: SearchHit[] = CATEGORIES.map((category) => ({
    title: category.title,
    href: category.href,
    type: 'Category',
    category: category.slug,
  }));
  const all = [...products, ...categories, ...PAGES];
  if (!q) return all.slice(0, 12);
  const matched = all.filter((hit) =>
    `${hit.title} ${hit.category || ''} ${hit.type}`.toLowerCase().includes(q)
  );
  if (q === 'denim' || q.includes('denim')) {
    const denimFirst = (hit: SearchHit) =>
      hit.href.includes('cid=17014') || hit.category?.toLowerCase() === 'denim' ? 0 : 1;
    matched.sort((a, b) => denimFirst(a) - denimFirst(b));
  }
  return matched.slice(0, 48);
}
