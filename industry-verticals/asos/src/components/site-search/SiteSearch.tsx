'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import {
  FACET_LINKS,
  filterSearchHits,
  parseSearchFacets,
  productsFromHits,
  suggestQueries,
} from '@/lib/asos-search';
import { readProfile } from '@/lib/asos-profile';
import { parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type Props = ComponentProps;

function queryFromRoute(asPath: string, routeQuery: string | string[] | undefined): string {
  if (typeof routeQuery === 'string' && routeQuery) return routeQuery;
  return new URLSearchParams(asPath.split('?')[1]?.split('#')[0] || '').get('q') || '';
}

export const Default = (props: Props): JSX.Element => {
  const styles = `${props.params?.styles || ''}`.trim();
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [query, setQuery] = useState(() => queryFromRoute(router.asPath, router.query.q));
  const [draft, setDraft] = useState(query);
  const [search, setSearch] = useState('');
  const [fit, setFit] = useState('');

  useEffect(() => {
    const params =
      typeof window !== 'undefined' ? window.location.search : router.asPath.split('?')[1] || '';
    const next =
      queryFromRoute(router.asPath, router.query.q) ||
      new URLSearchParams(params.replace(/^\?/, '')).get('q') ||
      '';
    setQuery(next);
    setDraft(next);
    setSearch(params.startsWith('?') ? params.slice(1) : params);
    setFit(readProfile()?.bodyFit || '');
  }, [router.asPath, router.query.q]);
  const suggestions = useMemo(() => suggestQueries(draft), [draft]);
  const facets = useMemo(() => parseSearchFacets(search), [search]);
  const hits = useMemo(() => filterSearchHits(query), [query]);
  const productHits = useMemo(
    () => productsFromHits(hits, facets).filter((product) => !fit || product.bodyFit.includes(fit)),
    [hits, facets, fit]
  );
  const otherHits = hits.filter((hit) => !hit.productId);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    if (next) recordSearchEvent(next, 'page');
    void router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  };

  return (
    <section className={`asos-wrap asos-search ${styles}`.trim()}>
      <p className="text-xs font-bold tracking-wide uppercase">Search</p>
      <h1 className="mt-2 text-3xl font-bold">Search ASOS</h1>
      <form className="asos-search__bar" onSubmit={submit} role="search">
        <label className="sr-only" htmlFor="asos-search-q">
          Search for items and brands
        </label>
        <input
          id="asos-search-q"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Search for items and brands"
        />
        <button type="submit" aria-label="Search">
          <Search className="size-5" />
        </button>
      </form>
      {suggestions.length ? (
        <ul className="asos-search__suggest">
          {suggestions.map((suggestion) => (
            <li key={suggestion}>
              <button
                type="button"
                onClick={() => void router.push(`/search?q=${encodeURIComponent(suggestion)}`)}
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="asos-facets" aria-label="Search facets">
        {FACET_LINKS.map((facet) => {
          const params = new URLSearchParams(search);
          if (query.trim()) params.set('q', query.trim());
          if ('refine' in facet && facet.refine) params.set('refine', facet.refine);
          if ('pricerange' in facet && facet.pricerange) params.set('pricerange', facet.pricerange);
          if ('iscurated' in facet && facet.iscurated) params.set('iscurated', facet.iscurated);
          const active =
            ('refine' in facet && search.includes(facet.refine)) ||
            ('pricerange' in facet && search.includes(`pricerange=${facet.pricerange}`)) ||
            ('iscurated' in facet && search.includes('iscurated=true'));
          return (
            <Link
              key={facet.label}
              className={active ? 'is-on' : undefined}
              href={`/search?${params}`}
            >
              {facet.label}
            </Link>
          );
        })}
      </div>
      {fit ? (
        <p className="mt-3 text-sm">Showing your fit: {fit === 'plus' ? 'curve' : fit}</p>
      ) : null}
      <p className="mt-4 text-sm text-[#666]">
        {query.trim()
          ? `${productHits.length + otherHits.length} results for “${query.trim()}”`
          : 'Trending in the demo catalogue'}
      </p>
      {productHits.length ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {productHits.map((product) => (
            <AsosProductCard key={product.id} product={product} market={market.code} />
          ))}
        </div>
      ) : null}
      <ul className="asos-search__hits">
        {otherHits.map((hit) => (
          <li key={`${hit.type}-${hit.href}`}>
            <Link href={hit.href}>
              <span>{hit.type}</span>
              <strong>{hit.title}</strong>
              {hit.category ? <em>{hit.category}</em> : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Default;
