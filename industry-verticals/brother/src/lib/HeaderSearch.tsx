'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { filterSearchHits } from 'lib/search-index';

type Props = {
  placeholder?: string;
};

/**
 * Header preview search — submits to /search for the Sitecore Search demo page.
 */
export function HeaderSearch({ placeholder = 'Search Brother' }: Props): JSX.Element {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const preview = useMemo(() => filterSearchHits(query).slice(0, 6), [query]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    setOpen(false);
    void router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <div className="brother-header-search">
      <form onSubmit={submit} role="search">
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 150);
          }}
        />
      </form>
      {open && query.trim() && preview.length > 0 ? (
        <ul className="brother-header-search__preview">
          {preview.map((hit) => (
            <li key={hit.href}>
              <a
                href={hit.href}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setOpen(false)}
              >
                <strong>{hit.title}</strong>
                <span>
                  {hit.type}
                  {hit.category ? ` · ${hit.category}` : ''}
                </span>
              </a>
            </li>
          ))}
          <li>
            <a
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onMouseDown={(e) => e.preventDefault()}
            >
              View all results
            </a>
          </li>
        </ul>
      ) : null}
    </div>
  );
}
