'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import {
  filterSearchHits,
  parseSearchFacets,
  productColourGroup,
  productsFromHits,
  SEARCH_COLOURS,
  sortSearchProducts,
  suggestQueries,
  type SearchSort,
} from '@/lib/asos-search';
import { readProfile } from '@/lib/asos-profile';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { BODY_FITS, type BodyFit } from '@/lib/asos-journey';

type Props = ComponentProps;

const SORTS: { id: SearchSort; label: string }[] = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'new', label: "What's new" },
  { id: 'price-asc', label: 'Price low to high' },
  { id: 'price-desc', label: 'Price high to low' },
];

const PAGE_SIZE = 48;

function queryFromRoute(asPath: string, routeQuery: string | string[] | undefined): string {
  if (typeof routeQuery === 'string' && routeQuery) return routeQuery;
  return new URLSearchParams(asPath.split('?')[1]?.split('#')[0] || '').get('q') || '';
}

function isSort(value: string): value is SearchSort {
  return SORTS.some((item) => item.id === value);
}

function isFit(value: string): value is BodyFit {
  return (BODY_FITS as readonly string[]).includes(value);
}

export const Default = (props: Props): JSX.Element => {
  const styles = `${props.params?.styles || ''}`.trim();
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [query, setQuery] = useState(() => queryFromRoute(router.asPath, router.query.q));
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [profileFit, setProfileFit] = useState<BodyFit | ''>('');

  useEffect(() => {
    const params =
      typeof window !== 'undefined' ? window.location.search : router.asPath.split('?')[1] || '';
    const next =
      queryFromRoute(router.asPath, router.query.q) ||
      new URLSearchParams(params.replace(/^\?/, '')).get('q') ||
      '';
    setQuery(next);
    setSearch(params.startsWith('?') ? params.slice(1) : params);
    setVisible(PAGE_SIZE);
    setProfileFit(readProfile()?.bodyFit || '');
  }, [router.asPath, router.query.q]);

  const params = useMemo(() => new URLSearchParams(search), [search]);
  const sort = isSort(params.get('sort') || '')
    ? (params.get('sort') as SearchSort)
    : 'recommended';
  const fit = isFit(params.get('fit') || '') ? (params.get('fit') as BodyFit) : '';
  const brand = params.get('brand') || '';
  const colour = params.get('colour') || '';
  const facets = useMemo(() => parseSearchFacets(search), [search]);
  const hits = useMemo(() => filterSearchHits(query), [query]);
  const catalog = useMemo(() => productsFromHits(hits, facets), [hits, facets]);
  const brands = useMemo(() => {
    const names = new Set(catalog.map((product) => product.brand).filter(Boolean));
    return [...names].sort((a, b) => a.localeCompare(b));
  }, [catalog]);
  const colours = useMemo(() => {
    const present = new Set(catalog.map(productColourGroup).filter(Boolean));
    return SEARCH_COLOURS.filter((name) => present.has(name));
  }, [catalog]);
  const products = useMemo(() => {
    const filtered = catalog.filter((product) => {
      if (fit && !product.bodyFit.includes(fit)) return false;
      if (brand && product.brand !== brand) return false;
      if (colour && productColourGroup(product) !== colour) return false;
      return true;
    });
    return sortSearchProducts(filtered, sort);
  }, [catalog, fit, brand, colour, sort]);
  const otherHits = hits.filter((hit) => !hit.productId);
  const suggestions = useMemo(() => (query.trim() ? [] : suggestQueries('')), [query]);
  const shown = products.slice(0, visible);
  const priceRange = params.get('pricerange') || '';

  const hrefFor = (patch: Record<string, string | null>): string => {
    const next = new URLSearchParams(search);
    if (query.trim()) next.set('q', query.trim());
    for (const [key, value] of Object.entries(patch)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    const qs = next.toString();
    return withMarket(qs ? `/search?${qs}` : '/search', market.code);
  };

  const label = query.trim() || 'Search';

  return (
    <section className={`asos-wrap asos-search ${styles}`.trim()}>
      <div className="asos-search__head">
        <div>
          <h1>{label}</h1>
          <p>
            {query.trim()
              ? `${products.length} styles found`
              : `${products.length} styles in the catalogue`}
          </p>
        </div>
        <label>
          <span className="sr-only">Sort</span>
          <select
            value={sort}
            onChange={(event) => {
              const next = event.target.value;
              void router.push(hrefFor({ sort: next === 'recommended' ? null : next }));
            }}
          >
            {SORTS.map((item) => (
              <option key={item.id} value={item.id}>
                Sort: {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {suggestions.length ? (
        <ul className="asos-search__suggest">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <Link href={withMarket(`/search?q=${encodeURIComponent(suggestion)}`, market.code)}>
                {suggestion}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="asos-facets" aria-label="Filter results">
        <Link className={!fit ? 'is-on' : undefined} href={hrefFor({ fit: null })}>
          All fits
        </Link>
        {BODY_FITS.map((item) => (
          <Link
            key={item}
            className={fit === item ? 'is-on' : undefined}
            href={hrefFor({ fit: fit === item ? null : item })}
          >
            {item === 'plus' ? 'curve' : item}
          </Link>
        ))}
        <Link
          className={priceRange === '0-50' ? 'is-on' : undefined}
          href={hrefFor({ pricerange: priceRange === '0-50' ? null : '0-50' })}
        >
          Under £50
        </Link>
        <Link
          className={priceRange === '45-95' ? 'is-on' : undefined}
          href={hrefFor({ pricerange: priceRange === '45-95' ? null : '45-95' })}
        >
          £45–£95
        </Link>
        {colours.map((name) => (
          <Link
            key={name}
            className={colour === name ? 'is-on' : undefined}
            href={hrefFor({ colour: colour === name ? null : name })}
          >
            {name}
          </Link>
        ))}
      </div>

      {brands.length > 1 ? (
        <label className="asos-search__brand">
          <span className="sr-only">Brand</span>
          <select
            value={brand}
            onChange={(event) => {
              void router.push(hrefFor({ brand: event.target.value || null }));
            }}
          >
            <option value="">All brands</option>
            {brands.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      {profileFit && fit !== profileFit ? (
        <p className="mt-3 text-sm">
          <Link href={hrefFor({ fit: profileFit })}>Show your fit: {profileFit}</Link>
        </p>
      ) : null}

      {shown.length ? (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4">
          {shown.map((product) => (
            <AsosProductCard key={product.id} product={product} market={market.code} showBrand />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sm">
          No styles found{query.trim() ? ` for “${query.trim()}”` : ''}.
        </p>
      )}

      {visible < products.length ? (
        <p className="mt-8 text-center">
          <button
            type="button"
            className="asos-btn-dark"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Load more
          </button>
        </p>
      ) : null}

      {otherHits.length ? (
        <ul className="asos-search__hits">
          {otherHits.map((hit) => (
            <li key={`${hit.type}-${hit.href}`}>
              <Link href={withMarket(hit.href, market.code)}>
                <span>{hit.type}</span>
                <strong>{hit.title}</strong>
                {hit.category ? <em>{hit.category}</em> : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
};

export default Default;
