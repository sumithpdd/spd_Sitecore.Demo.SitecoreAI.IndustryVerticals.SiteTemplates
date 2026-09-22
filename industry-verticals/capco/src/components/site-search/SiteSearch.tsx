'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import {
  ImageField,
  NextImage as ContentSdkImage,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';
import { fieldString } from '@/lib/sitecore-fields';
import {
  SEARCH_COPY,
  SEARCH_FACETS,
  SearchFacet,
  SearchSort,
  facetForHit,
  searchCatalog,
} from '@/lib/search-catalog';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Fields = {
  Title?: TextField;
  Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const PAGE_SIZE = 12;

const emptyFilters = {
  sector: '',
  service: '',
  region: '',
  contentType: '',
};

const queryFromRouter = (asPath: string): { q: string; sort: SearchSort } => {
  const query = asPath.split('?')[1] || '';
  const params = new URLSearchParams(query);
  const sortParam = params.get('sort');
  const sort: SearchSort =
    sortParam === 'newest' || sortParam === 'oldest' ? sortParam : 'relevant';
  return { q: params.get('q') || params.get('searchText') || '', sort };
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const { q: urlQuery, sort: urlSort } = queryFromRouter(router.asPath);
  const [draft, setDraft] = useState(urlQuery);
  const [facet, setFacet] = useState<SearchFacet>('all');
  const [sort, setSort] = useState<SearchSort>(urlSort);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setDraft(urlQuery);
    setSort(urlSort);
    setVisible(PAGE_SIZE);
  }, [urlQuery, urlSort]);

  const title = fieldString(fields.Title) || SEARCH_COPY.title;
  const hasImage = Boolean(fields.Image?.value && (fields.Image.value as { src?: string }).src);
  const allResults = useMemo(
    () => searchCatalog(urlQuery, { ...emptyFilters, facet: 'all' }, sort),
    [sort, urlQuery]
  );
  const results = useMemo(
    () => searchCatalog(urlQuery, { ...emptyFilters, facet }, sort),
    [facet, sort, urlQuery]
  );
  const shown = results.slice(0, visible);
  const facetCounts = useMemo(() => {
    const counts: Record<SearchFacet, number> = {
      all: allResults.length,
      insights: 0,
      capabilities: 0,
      careers: 0,
      people: 0,
      other: 0,
    };
    allResults.forEach((hit) => {
      counts[facetForHit(hit)] += 1;
    });
    return counts;
  }, [allResults]);

  const pushSearch = (nextQuery: string, nextSort: SearchSort) => {
    const params = new URLSearchParams();
    if (nextQuery) params.set('q', nextQuery);
    params.set('sort', nextSort === 'relevant' ? 'relevance' : nextSort);
    void router.push(params.toString() ? `/search?${params.toString()}` : '/search');
  };

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    recordSearchEvent(next, 'page');
    setVisible(PAGE_SIZE);
    pushSearch(next, sort);
  };

  return (
    <section className="pm-site-search" id={id}>
      <div className="pm-site-search__hero">
        {hasImage || isEditing ? (
          <ContentSdkImage field={fields.Image} className="pm-site-search__hero-img" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- DAM public URL fallback
          <img className="pm-site-search__hero-img" src={SEARCH_COPY.heroSrc} alt="" />
        )}
        <div className="pm-site-search__hero-copy">
          <h1>{fields.Title ? <Text field={fields.Title} /> : title}</h1>
          <p className="pm-site-search__prompt">{SEARCH_COPY.prompt}</p>
          <form className="pm-site-search__hero-form" onSubmit={submitSearch} role="search">
            <label htmlFor="site-search-q" className="sr-only">
              {SEARCH_COPY.prompt}
            </label>
            <input
              id="site-search-q"
              type="search"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={SEARCH_COPY.placeholder}
            />
            <button className="pm-site-search__go" type="submit" aria-label="Search">
              <Search className="size-5" />
            </button>
          </form>
        </div>
      </div>

      <div className="pm-wrap pm-site-search__body">
        <aside className="pm-site-search__nav" aria-label="Result types">
          {SEARCH_FACETS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={facet === item.id ? 'is-active' : undefined}
              onClick={() => {
                setFacet(item.id);
                setVisible(PAGE_SIZE);
              }}
            >
              {item.label}
              <span>{facetCounts[item.id]}</span>
            </button>
          ))}
        </aside>

        <div className="pm-site-search__main">
          <div className="pm-site-search__toolbar">
            <h2>{SEARCH_FACETS.find((item) => item.id === facet)?.label || 'All'}</h2>
            <p>
              {results.length} result{results.length === 1 ? '' : 's'}
            </p>
            <label className="pm-site-search__sort">
              <span className="sr-only">Sort</span>
              <select
                value={sort}
                onChange={(event) => {
                  const next = event.target.value as SearchSort;
                  setSort(next);
                  pushSearch(urlQuery, next);
                }}
              >
                <option value="relevant">Relevance</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>

          {shown.length === 0 ? (
            <p className="pm-site-search__empty">{SEARCH_COPY.noResults}</p>
          ) : (
            <ul className="pm-site-search__grid">
              {shown.map((hit) => (
                <li key={hit.id}>
                  <article className="pm-site-search__card">
                    <Link href={hit.href} className="pm-site-search__card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element -- DAM public URL */}
                      <img src={hit.imageSrc || hit.authorPhoto || SEARCH_COPY.heroSrc} alt="" />
                    </Link>
                    <div className="pm-site-search__card-copy">
                      <p className="pm-site-search__kicker">
                        {hit.kicker}
                        {hit.dateLabel ? <time>{hit.dateLabel}</time> : null}
                      </p>
                      <h3>
                        <Link href={hit.href}>{hit.title}</Link>
                      </h3>
                      {hit.author && hit.contentType !== 'People' ? (
                        <p className="pm-site-search__author">Author: {hit.author}</p>
                      ) : null}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          {results.length > visible ? (
            <button
              className="pm-btn-outline pm-site-search__more"
              type="button"
              onClick={() => setVisible((count) => count + PAGE_SIZE)}
            >
              Load more
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Default;
