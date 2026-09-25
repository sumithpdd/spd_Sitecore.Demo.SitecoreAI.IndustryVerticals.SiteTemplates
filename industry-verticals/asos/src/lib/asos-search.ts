import { STORY } from '@/lib/asos-journey';
import { CATEGORIES, PRODUCTS } from '@/lib/product-catalog';

export type SearchHit = {
  title: string;
  href: string;
  type: 'Product' | 'Category' | 'Page';
  category?: string;
};

const PAGES: SearchHit[] = [
  { title: 'Women', href: STORY.womenHref, type: 'Page' },
  { title: "Women's New In", href: STORY.newInHref, type: 'Page', category: 'New in' },
  { title: 'Petite denim', href: STORY.petiteHref, type: 'Page', category: 'Denim' },
  { title: 'Topshop', href: STORY.topshopHref, type: 'Page', category: 'Brands' },
  { title: 'Style Feed', href: STORY.styleFeedHref, type: 'Page' },
  { title: 'My Edit', href: STORY.myEditHref, type: 'Page' },
];

export function filterSearchHits(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  const products: SearchHit[] = PRODUCTS.map((product) => ({
    title: `${product.brand} ${product.title}`,
    href: product.href,
    type: 'Product',
    category: product.category,
  }));
  const categories: SearchHit[] = CATEGORIES.map((category) => ({
    title: category.title,
    href: category.href,
    type: 'Category',
    category: category.slug,
  }));
  const all = [...products, ...categories, ...PAGES];
  if (!q) return all.slice(0, 12);
  return all
    .filter((hit) => `${hit.title} ${hit.category || ''} ${hit.type}`.toLowerCase().includes(q))
    .slice(0, 24);
}
