'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import {
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { listedEventsFromItems, resolverItems } from '@/lib/cms-listing';
import { EVENTS_CATALOG, EVENTS_COPY } from '@/lib/events-catalog';
import { Search } from 'lucide-react';
import Link from 'next/link';

type Props = ComponentProps & {
  fields?: {
    items?: unknown;
    Title?: TextField;
    Content?: RichTextField;
  };
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: TextField;
    Content?: RichTextField;
  };
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const cmsEvents = listedEventsFromItems(resolverItems(props.fields));
  const events =
    cmsEvents.length > 0
      ? cmsEvents
      : EVENTS_CATALOG.map((item) => ({
          id: item.slug,
          url: item.href,
          title: item.title,
          kicker: item.kicker,
          summary: item.summary,
          dateLabel: item.dateLabel,
          timeLabel: item.timeLabel,
          location: item.location,
        }));
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return events;
    }
    return events.filter((item) =>
      [item.title, item.summary, item.location, item.kicker, item.dateLabel]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [events, query]);

  const shown = filtered.slice(0, visible);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
    setVisible(6);
  };

  return (
    <section className="pm-events" id={id}>
      <div className="pm-wrap">
        <div className="pm-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>Events and Training</li>
          </ol>
        </div>
        <h1>{fields.Title ? <Text field={fields.Title} /> : EVENTS_COPY.listingTitle}</h1>
        {fields.Content?.value || isEditing ? (
          <div className="pm-events__intro">
            <RichText field={fields.Content} />
          </div>
        ) : (
          <p className="pm-events__intro">{EVENTS_COPY.listingIntro}</p>
        )}

        <form className="pm-events__search" onSubmit={onSearch} role="search">
          <label htmlFor="events-q" className="sr-only">
            Search events
          </label>
          <input
            id="events-q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for:"
          />
          <button type="submit" aria-label="Search">
            <Search className="size-5" />
          </button>
        </form>

        {shown.length === 0 ? (
          <p className="pm-events__empty">No events match that search.</p>
        ) : (
          <ul className="pm-events__grid">
            {shown.map((item) => (
              <li key={item.id}>
                <article className="pm-events__card">
                  <p className="pm-events__kicker">{item.kicker}</p>
                  <h2>
                    <Link href={item.url}>{item.title}</Link>
                  </h2>
                  {item.summary ? <p>{item.summary}</p> : null}
                  <p className="pm-events__meta">
                    {item.dateLabel}
                    {item.timeLabel ? ` · ${item.timeLabel}` : ''}
                  </p>
                  {item.location ? <p className="pm-events__meta">{item.location}</p> : null}
                </article>
              </li>
            ))}
          </ul>
        )}

        {filtered.length > visible ? (
          <button
            className="pm-btn-outline pm-events__more"
            type="button"
            onClick={() => setVisible((count) => count + 6)}
          >
            Load More
          </button>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
