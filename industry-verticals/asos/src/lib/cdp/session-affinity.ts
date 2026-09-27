'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { readProfile } from '@/lib/asos-profile';
import { recentProducts, rememberProduct } from '@/lib/asos-recent';
import { productAffinities } from '@/lib/affinities';
import {
  affinitiesForPath,
  appendCdpEvent,
  getSessionEvents,
  getVisitCount,
} from '@/lib/cdp/cdp-session-tracker';
import {
  alsoBought,
  getProduct,
  LIVE_PRODUCTS,
  lookFor,
  mightAlsoLike,
  PRODUCTS,
  productFromPath,
  styledFor,
  type Product,
} from '@/lib/product-catalog';

export type RailIntent = 'similar' | 'outfit' | 'cobought' | 'recent' | 'style';

export type ShopperIntent = 'new' | 'returning' | 'search' | 'sale' | 'browse';

export type SessionAffinity = {
  brands: Record<string, number>;
  categories: Record<string, number>;
  fits: Record<string, number>;
  colours: Record<string, number>;
  searches: string[];
  viewedIds: string[];
  intent: ShopperIntent;
  topBrand: string;
  topCategory: string;
  topFit: string;
  topColour: string;
  visits: number;
};

const EMPTY: SessionAffinity = {
  brands: {},
  categories: {},
  fits: {},
  colours: {},
  searches: [],
  viewedIds: [],
  intent: 'new',
  topBrand: '',
  topCategory: '',
  topFit: '',
  topColour: '',
  visits: 0,
};

function bump(map: Record<string, number>, key: string, amount = 1): void {
  if (!key) return;
  map[key] = (map[key] || 0) + amount;
}

function topKey(map: Record<string, number>): string {
  return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
}

const RAIL_INTENTS: RailIntent[] = ['similar', 'outfit', 'cobought', 'recent', 'style'];

export function railIntent(value: string | undefined, fallback: RailIntent): RailIntent {
  const key = (value || '').trim().toLowerCase();
  return RAIL_INTENTS.includes(key as RailIntent) ? (key as RailIntent) : fallback;
}

export function recordProductView(product: Product): void {
  const events = getSessionEvents();
  const lastId = events[events.length - 1]?.arbitraryData?.productId;
  if (lastId !== product.id) {
    appendCdpEvent({
      type: 'VIEW',
      createdAt: new Date().toISOString(),
      arbitraryData: {
        page: product.href,
        productId: product.id,
        brand: product.brand,
        category: product.category,
        colour: product.color,
        fit: product.bodyFit[0] || '',
        affinities: productAffinities(product),
      },
    });
  }
  rememberProduct(product.id);
}

export function readSessionAffinity(): SessionAffinity {
  const brands: Record<string, number> = {};
  const categories: Record<string, number> = {};
  const fits: Record<string, number> = {};
  const colours: Record<string, number> = {};
  const searches: string[] = [];
  const viewedIds: string[] = [];

  getSessionEvents().forEach((event) => {
    const data = event.arbitraryData || {};
    if (event.type === 'SEARCH' && typeof data.query === 'string') {
      searches.push(data.query.toLowerCase());
    }
    const weight =
      event.type === 'ADD_TO_BAG' ? 3 : event.type === 'SAVE' ? 2 : event.type === 'VIEW' ? 1 : 0;
    if (!weight) return;
    const page = typeof data.page === 'string' ? data.page : '';
    const fromEvent = typeof data.productId === 'string' ? getProduct(data.productId) : undefined;
    const product = fromEvent || productFromPath(page);
    if (product) {
      if (event.type === 'VIEW' && !viewedIds.includes(product.id)) viewedIds.push(product.id);
      bump(brands, product.brand, weight);
      bump(categories, product.category, weight);
      bump(colours, product.color, weight);
      product.bodyFit.forEach((fit) => bump(fits, fit, weight));
    }
    if (typeof data.brand === 'string') bump(brands, data.brand, weight);
    if (typeof data.category === 'string') bump(categories, data.category, weight);
    if (typeof data.colour === 'string') bump(colours, data.colour, weight);
    if (typeof data.fit === 'string') bump(fits, data.fit, weight);
    const pathAffinity = affinitiesForPath(page);
    if (pathAffinity.brand) bump(brands, pathAffinity.brand, 2);
    if (page.includes('denim')) bump(categories, 'denim', 2);
    if (page.includes('petite')) bump(fits, 'petite', 2);
  });

  const profile = readProfile();
  if (profile?.bodyFit) bump(fits, profile.bodyFit, 3);

  const saleSearch = searches.some((query) => /sale|under\s*£?\s*10|under 10/.test(query));
  const visits = getVisitCount();
  let intent: ShopperIntent = 'new';
  if (visits > 1) intent = 'returning';
  else if (saleSearch) intent = 'sale';
  else if (searches.length > 0) intent = 'search';
  else if (viewedIds.length > 0) intent = 'browse';

  return {
    brands,
    categories,
    fits,
    colours,
    searches,
    viewedIds,
    intent,
    topBrand: topKey(brands),
    topCategory: topKey(categories),
    topFit: topKey(fits),
    topColour: topKey(colours),
    visits,
  };
}

function poolFor(current: Product): Product[] {
  return PRODUCTS.some((item) => item.id === current.id) ? PRODUCTS : LIVE_PRODUCTS;
}

function score(
  product: Product,
  shopper: SessionAffinity,
  intent: RailIntent,
  current: Product
): number {
  let value = (shopper.brands[product.brand] || 0) * 3;
  value += (shopper.categories[product.category] || 0) * 2;
  product.bodyFit.forEach((fit) => {
    value += (shopper.fits[fit] || 0) * 2;
  });
  value += (shopper.colours[product.color] || 0) * 2;
  const haystack = `${product.title} ${product.brand} ${product.category}`.toLowerCase();
  shopper.searches.forEach((query) => {
    query
      .split(/\s+/)
      .filter((word) => word.length > 2)
      .forEach((word) => {
        if (haystack.includes(word)) value += 2;
      });
  });
  if (intent === 'similar') {
    if (product.category === current.category) value += 5;
    if (product.brand === current.brand) value += 2;
  }
  if (intent === 'outfit' && product.category !== current.category) value += 4;
  if (intent === 'cobought') {
    if (product.brand === current.brand) value += 5;
    if (product.cids.some((cid) => current.cids.includes(cid))) value += 3;
  }
  return value;
}

function pinnedProducts(productIds: string | undefined): Product[] {
  return (productIds || '')
    .split(/[^0-9]+/)
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item))
    .slice(0, 10);
}

/** CMS product ids win. Otherwise rank by the rail's intent and the CDP affinity. */
export function resolveRailProducts(
  intent: RailIntent,
  current: Product,
  shopper: SessionAffinity,
  productIds?: string
): Product[] {
  const pinned = pinnedProducts(productIds);
  if (pinned.length > 0) return pinned;
  if (intent === 'recent') return recentProducts(current.id).slice(0, 8);

  const ranked = poolFor(current)
    .filter((item) => item.id !== current.id)
    .map((item) => ({ item, value: score(item, shopper, intent, current) }))
    .filter((row) => row.value > 0)
    .sort((a, b) => b.value - a.value || a.item.title.localeCompare(b.item.title))
    .slice(0, 10)
    .map((row) => row.item);

  if (ranked.length >= 4) return ranked;
  if (intent === 'outfit') return lookFor(current);
  if (intent === 'cobought') return alsoBought(current);
  if (intent === 'style') return styledFor(current, shopper.topFit);
  return mightAlsoLike(current);
}

export function useShopper(): SessionAffinity {
  const router = useRouter();
  const [shopper, setShopper] = useState<SessionAffinity>(EMPTY);

  useEffect(() => {
    const refresh = () => setShopper(readSessionAffinity());
    refresh();
    window.addEventListener('asos-cdp', refresh);
    window.addEventListener('asos-recent', refresh);
    return () => {
      window.removeEventListener('asos-cdp', refresh);
      window.removeEventListener('asos-recent', refresh);
    };
  }, [router.asPath]);

  return shopper;
}
