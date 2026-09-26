'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { filterSearchHits } from '@/lib/asos-search';
import { getProduct } from '@/lib/product-catalog';
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

  useEffect(() => {
    const next =
      queryFromRoute(router.asPath, router.query.q) ||
      (typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('q') || ''
        : '');
    setQuery(next);
    setDraft(next);
  }, [router.asPath, router.query.q]);
  const hits = useMemo(() => filterSearchHits(query), [query]);
  const productHits = hits.flatMap((hit) => {
    const product = hit.productId ? getProduct(hit.productId) : undefined;
    return product ? [product] : [];
  });
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
      <p className="mt-4 text-sm text-[#666]">
        {query.trim()
          ? `${hits.length} results for “${query.trim()}”`
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
