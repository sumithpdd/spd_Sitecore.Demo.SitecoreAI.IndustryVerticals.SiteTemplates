'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { filterSearchHits } from '@/lib/asos-search';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type Props = ComponentProps;

export const Default = (_props: Props): JSX.Element => {
  const router = useRouter();
  const initial = typeof router.query.q === 'string' ? router.query.q : '';
  const [draft, setDraft] = useState(initial);
  const query = typeof router.query.q === 'string' ? router.query.q : draft;
  const hits = useMemo(() => filterSearchHits(query), [query]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    if (next) recordSearchEvent(next, 'page');
    void router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  };

  return (
    <section className="asos-wrap asos-search">
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
      <ul className="asos-search__hits">
        {hits.map((hit) => (
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
