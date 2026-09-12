'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import { TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { SEARCH_COPY, SEARCH_INDEX, searchCatalog } from '@/lib/search-catalog';
import { fieldString } from '@/lib/sitecore-fields';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PREVIEW_COUNT = 8;

type RouteFields = {
  Title?: TextField;
};

export const HeaderSearch = (): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const routeTitle = fieldString(
    (page?.layout?.sitecore?.route?.fields as RouteFields | undefined)?.Title
  );
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

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
    const query = draft.trim();
    if (!query) {
      return SEARCH_INDEX.slice(0, PREVIEW_COUNT);
    }
    return searchCatalog(
      query,
      { sector: '', service: '', region: '', contentType: '' },
      'relevant'
    ).slice(0, PREVIEW_COUNT);
  }, [draft]);

  const openSearch = () => {
    setDraft(routeTitle);
    setOpen(true);
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    recordSearchEvent(next, 'header');
    setOpen(false);
    void router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
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
                <h2>Search for our people, thinking and expertise</h2>
                <button
                  type="button"
                  className="pm-header-search__close"
                  aria-label="Close search"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </button>
              </div>
              <form className="pm-header-search__form" onSubmit={submitSearch} role="search">
                <label htmlFor="header-search-q" className="sr-only">
                  Search for our people, thinking and expertise
                </label>
                <input
                  id="header-search-q"
                  type="search"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder="Search for our people, thinking and expertise"
                  autoFocus
                />
                <button className="pm-btn" type="submit">
                  Search
                </button>
              </form>
              {results.length === 0 ? (
                <p className="pm-site-search__empty">{SEARCH_COPY.noResults}</p>
              ) : (
                <ul className="pm-site-search__grid">
                  {results.map((hit) => (
                    <li key={hit.id}>
                      <article className="pm-site-search__card">
                        <p className="pm-site-search__kicker">{hit.kicker}</p>
                        <h3>
                          <Link href={hit.href} onClick={() => setOpen(false)}>
                            {hit.title}
                          </Link>
                        </h3>
                        {hit.summary ? (
                          <p className="pm-site-search__summary">{hit.summary}</p>
                        ) : null}
                        <div className="pm-site-search__meta">
                          <div>
                            {hit.author && hit.contentType !== 'People' ? (
                              <Link
                                href={hit.authorHref || hit.href}
                                onClick={() => setOpen(false)}
                              >
                                {hit.author}
                              </Link>
                            ) : null}
                            {hit.dateLabel ? <time>{hit.dateLabel}</time> : null}
                            {hit.tag ? (
                              <span className="pm-site-search__tag">{hit.tag}</span>
                            ) : null}
                          </div>
                          {hit.authorPhoto ? (
                            // eslint-disable-next-line @next/next/no-img-element -- DAM public URL
                            <img src={hit.authorPhoto} alt="" />
                          ) : null}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
              {draft.trim() ? (
                <p className="pm-header-search__all">
                  <Link
                    href={`/search?q=${encodeURIComponent(draft.trim())}`}
                    onClick={() => setOpen(false)}
                  >
                    View all results
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default HeaderSearch;
