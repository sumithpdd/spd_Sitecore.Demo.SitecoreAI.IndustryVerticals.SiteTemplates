'use client';

import { FormEvent, JSX, useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { filterSearchHits, type SearchScope } from 'lib/search-index';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';

type Props = {
  placeholder?: string;
};

/**
 * Essex-style header search: Everything / Courses tabs, live preview, submit to /search.
 */
export const HeaderSearch = ({ placeholder = 'Search' }: Props): JSX.Element => {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('everything');
  const [open, setOpen] = useState(false);

  const preview = useMemo(() => filterSearchHits(query, scope).slice(0, 6), [query, scope]);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    setOpen(false);
    if (trimmed) {
      recordSearchEvent(trimmed, 'header');
    }
    void router.push(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}&scope=${scope}` : '/search'
    );
  };

  return (
    <div ref={rootRef} className="reading-header-search relative ml-auto w-full max-w-md">
      <form className="flex" onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="reading-header-search">
          Search the site
        </label>
        <input
          id="reading-header-search"
          type="search"
          className="reading-input min-w-0 flex-1 rounded-none border-r-0 py-2 text-sm"
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={open}
        />
        <button
          type="submit"
          className="reading-btn reading-btn-primary px-3 py-2"
          aria-label="Submit search"
        >
          <Search className="h-4 w-4" aria-hidden />
        </button>
      </form>

      {open && (
        <div className="reading-search-preview absolute top-full right-0 left-0 z-50 mt-1 border border-[#ddd9db] bg-white shadow-lg">
          <div className="flex border-b border-[#ddd9db] text-xs font-bold tracking-wide uppercase">
            <button
              type="button"
              className={`flex-1 px-3 py-2 ${scope === 'everything' ? 'bg-[var(--reading-red)] text-white' : 'text-[var(--reading-ink)]'}`}
              onClick={() => setScope('everything')}
            >
              Everything
            </button>
            <button
              type="button"
              className={`flex-1 px-3 py-2 ${scope === 'courses' ? 'bg-[var(--reading-red)] text-white' : 'text-[var(--reading-ink)]'}`}
              onClick={() => setScope('courses')}
            >
              Courses
            </button>
          </div>
          <ul className="max-h-80 overflow-auto py-1">
            {preview.map((hit) => (
              <li key={`${hit.href}-${hit.title}`}>
                <a
                  href={hit.href}
                  className="block px-3 py-2 hover:bg-[var(--reading-surface)]"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-[0.65rem] font-bold tracking-wide text-[var(--reading-maroon)] uppercase">
                    {hit.type}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-[var(--reading-ink)]">
                    {hit.title}
                  </span>
                </a>
              </li>
            ))}
            {preview.length === 0 && (
              <li className="px-3 py-3 text-sm text-[var(--reading-charcoal)]">
                No matches. Try “clearing”, “AI”, or “accommodation”.
              </li>
            )}
          </ul>
          <a
            href={
              query.trim()
                ? `/search?q=${encodeURIComponent(query.trim())}&scope=${scope}`
                : '/search'
            }
            className="block border-t border-[#ddd9db] px-3 py-2 text-sm font-bold text-[var(--reading-red)]"
            onClick={() => setOpen(false)}
          >
            View all results
          </a>
        </div>
      )}
    </div>
  );
};
