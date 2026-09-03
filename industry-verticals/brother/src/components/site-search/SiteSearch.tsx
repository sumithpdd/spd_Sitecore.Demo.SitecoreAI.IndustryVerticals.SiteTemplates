'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { filterSearchHits, type SearchScope } from 'lib/search-index';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * /search results — demo index mirrors content that Sitecore Search would crawl after push/publish.
 * Set NEXT_PUBLIC_SITECORE_SEARCH_INDEX_ID later to swap to @sitecore-content-sdk/nextjs/search.
 */
export const Default = (_props: Props): JSX.Element => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('everything');

  useEffect(() => {
    if (!router.isReady) return;
    setQuery(typeof router.query.q === 'string' ? router.query.q : '');
    const s = router.query.scope;
    if (s === 'products' || s === 'articles' || s === 'everything') {
      setScope(s);
    }
  }, [router.isReady, router.query.q, router.query.scope]);

  const results = useMemo(() => filterSearchHits(query, scope), [query, scope]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    void router.push(
      q ? `/search?q=${encodeURIComponent(q)}&scope=${scope}` : `/search?scope=${scope}`
    );
  };

  return (
    <section className="brother-search">
      <div className="brother-container">
        <h1>Search Brother</h1>
        <p className="brother-search__lead">
          Demo search over products, categories and articles — the same pages Sitecore Search
          indexes after content is published.
        </p>
        <form className="brother-search__form" onSubmit={submit} role="search">
          <div className="brother-search__scopes">
            {(
              [
                ['everything', 'Everything'],
                ['products', 'Products'],
                ['articles', 'Pages & articles'],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={scope === value ? 'is-active' : undefined}
                onClick={() => setScope(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: label printer, VC-500W, scanner, laser, desk"
            aria-label="Search"
          />
          <button type="submit" className="brother-btn brother-btn-primary">
            Search
          </button>
        </form>

        <p className="brother-search__count">
          {results.length} result{results.length === 1 ? '' : 's'}
          {query.trim() ? ` for “${query.trim()}”` : ''}
        </p>

        <ul className="brother-search__results">
          {results.map((hit) => (
            <li key={`${hit.type}-${hit.href}`}>
              <a href={hit.href}>
                <span className="brother-search__type">
                  {hit.type}
                  {hit.category ? ` · ${hit.category}` : ''}
                </span>
                <strong>{hit.title}</strong>
                <span>{hit.blurb}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
