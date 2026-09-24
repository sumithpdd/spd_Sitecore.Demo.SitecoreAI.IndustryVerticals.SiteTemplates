'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import {
  SEARCH_COPY,
  SEARCH_SUGGESTIONS,
  STORY_SEARCH_QUERY,
  resolveSearchQuery,
  searchCatalog,
} from '@/lib/search-catalog';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PREVIEW_COUNT = 6;

export const HeaderSearch = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(STORY_SEARCH_QUERY);

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const results = useMemo(() => {
    return searchCatalog(
      resolveSearchQuery(draft),
      { sector: '', service: '', region: '', contentType: '' },
      'relevant'
    ).slice(0, PREVIEW_COUNT);
  }, [draft]);

  const openSearch = () => {
    setDraft(STORY_SEARCH_QUERY);
    setOpen(true);
  };

  const goToSearch = (query: string) => {
    const next = resolveSearchQuery(query);
    recordSearchEvent(next, 'header');
    setOpen(false);
    void router.push(`/search?q=${encodeURIComponent(next)}&sort=relevance`);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    goToSearch(draft.trim());
  };

  return (
    <>
      <button
        type="button"
        className="pm-header__search"
        aria-label={open ? 'Close search' : 'Search'}
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openSearch())}
      >
        {open ? <X className="size-5" /> : <Search className="size-5" />}
      </button>
      {open ? (
        <div className="pm-header-search" role="dialog" aria-label={SEARCH_COPY.title}>
          <button
            type="button"
            className="pm-header-search__backdrop"
            aria-label="Close search"
            onClick={() => setOpen(false)}
          />
          <div className="pm-header-search__sheet">
            <div className="pm-wrap">
              <div className="pm-header-search__toolbar">
                <h2>Search results</h2>
                <button
                  type="button"
                  className="pm-header-search__close"
                  aria-label="Close search"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </div>
              <p className="pm-header-search__prompt">{SEARCH_COPY.prompt}</p>
              <form className="pm-header-search__form" onSubmit={submitSearch} role="search">
                <label htmlFor="header-search-q" className="sr-only">
                  {SEARCH_COPY.prompt}
                </label>
                <input
                  id="header-search-q"
                  type="search"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={SEARCH_COPY.placeholder}
                  autoFocus
                />
                <button className="pm-btn" type="submit">
                  Search
                </button>
              </form>
              <p className="pm-header-search__suggest-label">Suggested keywords</p>
              <ul className="pm-header-search__suggest">
                {SEARCH_SUGGESTIONS.map((term) => (
                  <li key={term}>
                    <button type="button" onClick={() => goToSearch(term)}>
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              {results.length === 0 ? (
                <p className="pm-site-search__empty">{SEARCH_COPY.noResults}</p>
              ) : (
                <ul className="pm-header-search__mini">
                  {results.map((hit) => (
                    <li key={hit.id}>
                      <Link href={hit.href} onClick={() => setOpen(false)}>
                        <span className="pm-header-search__mini-kicker">{hit.kicker}</span>
                        <span className="pm-header-search__mini-title">{hit.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <p className="pm-header-search__all">
                <Link
                  href={`/search?q=${encodeURIComponent(resolveSearchQuery(draft))}&sort=relevance`}
                  onClick={() => setOpen(false)}
                >
                  See all results
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeaderSearch;
