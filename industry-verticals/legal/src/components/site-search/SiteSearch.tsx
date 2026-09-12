'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import {
  ImageField,
  NextImage as ContentSdkImage,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { recordSearchEvent } from '@/lib/cdp/cdp-session-tracker';
import { fieldString } from '@/lib/sitecore-fields';
import {
  SEARCH_CONTENT_TYPES,
  SEARCH_COPY,
  SEARCH_REGIONS,
  SEARCH_SECTORS,
  SEARCH_SERVICES,
  SearchFilters,
  SearchSort,
  searchCatalog,
} from '@/lib/search-catalog';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Fields = {
  Title?: TextField;
  Content?: RichTextField;
  Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const PAGE_SIZE = 20;

const queryFromRouter = (asPath: string): string => {
  const query = asPath.split('?')[1] || '';
  const params = new URLSearchParams(query);
  return params.get('q') || params.get('searchText') || '';
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const urlQuery = queryFromRouter(router.asPath);
  const [draft, setDraft] = useState(urlQuery);
  const [filters, setFilters] = useState<SearchFilters>({
    sector: '',
    service: '',
    region: '',
    contentType: '',
  });
  const [applied, setApplied] = useState<SearchFilters>(filters);
  const [sort, setSort] = useState<SearchSort>('relevant');
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setDraft(urlQuery);
    setVisible(PAGE_SIZE);
  }, [urlQuery]);

  const title = fieldString(fields.Title) || SEARCH_COPY.title;
  const prompt = fieldString(fields.Content)?.replace(/<[^>]+>/g, '') || SEARCH_COPY.prompt;
  const hasImage = Boolean(fields.Image?.value && (fields.Image.value as { src?: string }).src);

  const results = useMemo(() => searchCatalog(urlQuery, applied, sort), [applied, sort, urlQuery]);
  const shown = results.slice(0, visible);

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    recordSearchEvent(next, 'page');
    setVisible(PAGE_SIZE);
    void router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  };

  return (
    <section className="pm-site-search" id={id}>
      <div className="pm-breadcrumb">
        <div className="pm-wrap">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Search</li>
          </ol>
        </div>
      </div>

      <div className="pm-site-search__hero">
        {hasImage || isEditing ? (
          <ContentSdkImage field={fields.Image} className="pm-site-search__hero-img" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- DAM public URL fallback
          <img className="pm-site-search__hero-img" src={SEARCH_COPY.heroSrc} alt="" />
        )}
        <div className="pm-site-search__hero-copy">
          <p className="pm-site-search__hero-kicker">Search</p>
          <h1 className="sr-only">{fields.Title ? <Text field={fields.Title} /> : title}</h1>
          {fields.Content?.value || isEditing ? (
            <div className="pm-site-search__prompt">
              <RichText field={fields.Content} />
            </div>
          ) : (
            <p className="pm-site-search__prompt">{prompt}</p>
          )}
        </div>
      </div>

      <form className="pm-site-search__bar" onSubmit={submitSearch} role="search">
        <div className="pm-wrap pm-site-search__bar-inner">
          <label htmlFor="site-search-q" className="sr-only">
            Search for our people, thinking and expertise
          </label>
          <input
            id="site-search-q"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search for our people, thinking and expertise"
          />
          <button className="pm-site-search__go" type="submit" aria-label="Search">
            <Search className="size-5" />
          </button>
          {urlQuery ? (
            <Link className="pm-site-search__clear" href="/search" onClick={() => setDraft('')}>
              Clear Search
            </Link>
          ) : null}
        </div>
      </form>

      <div className="pm-wrap pm-site-search__body">
        <form
          className="pm-site-search__filters"
          onSubmit={(event) => {
            event.preventDefault();
            setApplied(filters);
            setVisible(PAGE_SIZE);
          }}
        >
          <label>
            <span className="sr-only">Sectors</span>
            <select
              value={filters.sector}
              onChange={(event) =>
                setFilters((current) => ({ ...current, sector: event.target.value }))
              }
            >
              <option value="">Sectors</option>
              {SEARCH_SECTORS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Services</span>
            <select
              value={filters.service}
              onChange={(event) =>
                setFilters((current) => ({ ...current, service: event.target.value }))
              }
            >
              <option value="">Services</option>
              {SEARCH_SERVICES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Region</span>
            <select
              value={filters.region}
              onChange={(event) =>
                setFilters((current) => ({ ...current, region: event.target.value }))
              }
            >
              <option value="">Region</option>
              {SEARCH_REGIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Content Type</span>
            <select
              value={filters.contentType}
              onChange={(event) =>
                setFilters((current) => ({ ...current, contentType: event.target.value }))
              }
            >
              <option value="">Content Type</option>
              {SEARCH_CONTENT_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button className="pm-btn" type="submit">
            Apply
          </button>
          <label className="pm-site-search__sort">
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value as SearchSort);
                setVisible(PAGE_SIZE);
              }}
            >
              <option value="relevant">Most Relevant</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </form>

        {!urlQuery ? (
          <p className="pm-site-search__empty">{SEARCH_COPY.empty}</p>
        ) : shown.length === 0 ? (
          <p className="pm-site-search__empty">{SEARCH_COPY.noResults}</p>
        ) : (
          <ul className="pm-site-search__grid">
            {shown.map((hit) => (
              <li key={hit.id}>
                <article className="pm-site-search__card">
                  <p className="pm-site-search__kicker">{hit.kicker}</p>
                  <h2>
                    <Link href={hit.href}>{hit.title}</Link>
                  </h2>
                  {hit.summary ? <p className="pm-site-search__summary">{hit.summary}</p> : null}
                  <div className="pm-site-search__meta">
                    <div>
                      {hit.author && hit.contentType !== 'People' ? (
                        <Link href={hit.authorHref || hit.href}>{hit.author}</Link>
                      ) : null}
                      {hit.dateLabel ? <time>{hit.dateLabel}</time> : null}
                      {hit.tag ? <span className="pm-site-search__tag">{hit.tag}</span> : null}
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

        {results.length > visible ? (
          <button
            className="pm-btn-outline pm-site-search__more"
            type="button"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
          >
            Load More
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
