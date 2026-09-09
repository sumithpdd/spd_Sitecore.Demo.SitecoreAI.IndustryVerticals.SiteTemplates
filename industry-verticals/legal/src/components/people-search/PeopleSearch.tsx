'use client';

import { JSX, useMemo, useState } from 'react';
import { RichTextField, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { PEOPLE_CATALOG, PEOPLE_INTRO, searchPeople } from '@/lib/people-catalog';
import { Search } from 'lucide-react';

type Fields = {
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchPeople(query), [query]);
  const content = props.fields?.Content;
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-people" id={id}>
      <div className="container mx-auto max-w-5xl py-16">
        <h1 className="pm-people__title">People</h1>
        {content?.value || isEditing ? (
          <div className="pm-people__intro">
            <RichText field={content} />
          </div>
        ) : (
          <p className="pm-people__intro">{PEOPLE_INTRO}</p>
        )}

        <form
          className="pm-people__search"
          onSubmit={(event) => event.preventDefault()}
          role="search"
        >
          <label htmlFor="people-search" className="sr-only">
            Search for
          </label>
          <Search className="pm-people__search-icon" aria-hidden="true" />
          <input
            id="people-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a person or specialism"
          />
          <button type="submit" className="pm-btn">
            Search
          </button>
        </form>

        <p className="pm-people__count">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>

        <ul className="pm-people__list">
          {results.map((person) => (
            <li key={person.slug}>
              <a className="pm-people__card" href={`/people/${person.slug}`}>
                <div>
                  <h2>{person.name}</h2>
                  <p className="pm-people__role">{person.jobTitle}</p>
                  <p className="pm-people__meta">
                    {person.office}
                    {person.phone ? ` · ${person.phone}` : ''}
                  </p>
                  <p className="pm-people__bio">{person.bio}</p>
                </div>
                <span className="pm-people__cta">View Profile</span>
              </a>
            </li>
          ))}
        </ul>

        {results.length === 0 && (
          <p className="pm-people__empty">Please enter a search term that matches our team.</p>
        )}

        {isEditing && PEOPLE_CATALOG.length === 0 && <p>[PEOPLE SEARCH]</p>}
      </div>
    </section>
  );
};

export default Default;
