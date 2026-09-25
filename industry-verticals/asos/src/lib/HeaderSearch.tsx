'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search } from 'lucide-react';
import { filterSearchHits } from '@/lib/asos-search';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';
import { STORY } from '@/lib/asos-journey';

type Props = { placeholder?: string };

/** Header typeahead. Submits to the SiteSearch page. */
export function HeaderSearch({ placeholder = 'Search for items and brands' }: Props): JSX.Element {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const preview = useMemo(() => (query.trim() ? filterSearchHits(query).slice(0, 6) : []), [query]);

  const go = (q: string) => {
    const next = q.trim();
    setOpen(false);
    if (next) recordSearchEvent(next, 'header');
    void router.push(next ? `${STORY.searchHref}?q=${encodeURIComponent(next)}` : STORY.searchHref);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    go(query);
  };

  return (
    <div className="asos-header-search">
      <form id="asos-q" onSubmit={submit} role="search">
        <label className="sr-only" htmlFor="asos-q-input">
          {placeholder}
        </label>
        <input
          id="asos-q-input"
          type="search"
          value={query}
          placeholder={placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
        />
        <button type="submit" className="md:hidden" aria-label="Search">
          <Search className="size-5" />
        </button>
      </form>
      {open && preview.length > 0 ? (
        <ul className="asos-header-search__preview">
          {preview.map((hit) => (
            <li key={`${hit.type}-${hit.href}`}>
              <Link href={hit.href} onMouseDown={(event) => event.preventDefault()}>
                <strong>{hit.title}</strong>
                <span>
                  {hit.type}
                  {hit.category ? ` · ${hit.category}` : ''}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={`${STORY.searchHref}?q=${encodeURIComponent(query.trim())}`}
              onMouseDown={(event) => event.preventDefault()}
            >
              View all results
            </Link>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
