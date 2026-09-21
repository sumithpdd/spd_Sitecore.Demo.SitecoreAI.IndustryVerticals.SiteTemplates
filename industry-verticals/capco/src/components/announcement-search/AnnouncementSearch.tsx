'use client';

import { JSX, useMemo, useState } from 'react';
import { RichText, RichTextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ANNOUNCEMENTS_CATALOG, ANNOUNCEMENTS_INTRO } from '@/lib/announcements-catalog';
import { listedArticlesFromItems, resolverItems } from '@/lib/cms-listing';
import { Search } from 'lucide-react';

type Fields = {
  Content?: RichTextField;
  items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const [query, setQuery] = useState('');
  const content =
    props.fields?.Content ||
    (page?.layout?.sitecore?.route?.fields?.Content as RichTextField | undefined);
  const id = props.params?.RenderingIdentifier;
  const cmsItems = listedArticlesFromItems(resolverItems(props.fields), '/about-us/announcements');
  const articles =
    cmsItems.length > 0
      ? cmsItems
      : ANNOUNCEMENTS_CATALOG.map((item) => ({
          id: item.slug,
          url: item.href,
          title: item.title,
          kicker: '',
          date: item.date,
          readTime: item.readTime || '',
          summary: item.summary,
          tags: [],
          categories: [],
        }));

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return articles;
    }
    return articles.filter((item) =>
      [item.title, item.summary, item.date, item.tags.join(' '), item.categories.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [articles, query]);

  return (
    <section className="pm-announcements" id={id}>
      <div className="pm-wrap py-16">
        <h1 className="pm-people__title">Announcements</h1>
        {content?.value || isEditing ? (
          <div className="pm-people__intro">
            <RichText field={content} />
          </div>
        ) : (
          <p className="pm-people__intro">{ANNOUNCEMENTS_INTRO}</p>
        )}

        <form
          className="pm-people__search"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <label htmlFor="announcement-search" className="sr-only">
            Search for
          </label>
          <Search className="pm-people__search-icon" aria-hidden="true" />
          <input
            id="announcement-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search announcements"
          />
          <button type="submit" className="pm-btn">
            Search
          </button>
        </form>

        <p className="pm-people__count">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>

        <ul className="pm-press__cards">
          {results.map((item) => (
            <li key={item.id}>
              <a className="pm-press__card" href={item.url}>
                {item.date ? <time>{item.date}</time> : null}
                <span className="pm-press__title">{item.title}</span>
                {item.readTime ? <span className="pm-press__meta">{item.readTime}</span> : null}
                {item.tags.length > 0 ? (
                  <span className="pm-article__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className="pm-people__empty">No announcements match that search.</p>
        )}

        {isEditing && articles.length === 0 && <p>[ANNOUNCEMENTS]</p>}
      </div>
    </section>
  );
};

export default Default;
