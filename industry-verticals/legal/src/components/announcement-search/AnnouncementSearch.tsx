'use client';

import { JSX, useMemo, useState } from 'react';
import { RichText, RichTextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  ANNOUNCEMENTS_CATALOG,
  ANNOUNCEMENTS_INTRO,
  searchAnnouncements,
} from '@/lib/announcements-catalog';
import { Search } from 'lucide-react';

type Fields = {
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchAnnouncements(query), [query]);
  const content =
    props.fields?.Content ||
    (page?.layout?.sitecore?.route?.fields?.Content as RichTextField | undefined);
  const id = props.params?.RenderingIdentifier;

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
            <li key={item.slug}>
              <a className="pm-press__card" href={item.href}>
                <time>{item.date}</time>
                <span className="pm-press__title">{item.title}</span>
                {item.readTime && <span className="pm-press__meta">{item.readTime}</span>}
              </a>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className="pm-people__empty">No announcements match that search.</p>
        )}

        {isEditing && ANNOUNCEMENTS_CATALOG.length === 0 && <p>[ANNOUNCEMENTS]</p>}
      </div>
    </section>
  );
};

export default Default;
