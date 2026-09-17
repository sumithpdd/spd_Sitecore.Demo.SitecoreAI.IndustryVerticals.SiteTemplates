'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import { RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { EVENTS_CATALOG, EVENTS_COPY } from '@/lib/openhand-catalog';
import { asItems, fieldImageSrc, fieldString, itemLabel } from '@/lib/sitecore-fields';
import { Search } from 'lucide-react';
import Link from 'next/link';

type ListedEvent = {
  id: string;
  url: string;
  title: string;
  kicker: string;
  summary: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  image: string;
};

type Props = ComponentProps & {
  fields?: {
    items?: unknown;
    Title?: { value?: string };
    Content?: { value?: string };
  };
};

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function eventsFromItems(items: unknown): ListedEvent[] {
  return asItems(items)
    .map((item): ListedEvent | null => {
      const title = fieldString(item.fields?.Title) || itemLabel(item);
      const url = item.url || '';
      if (!title && !url) {
        return null;
      }
      return {
        id: item.id || url || title,
        url,
        title,
        kicker: fieldString(item.fields?.Kicker),
        summary: stripHtml(fieldString(item.fields?.Content)).slice(0, 220),
        dateLabel: fieldString(item.fields?.DateLabel),
        timeLabel: fieldString(item.fields?.TimeLabel),
        location: fieldString(item.fields?.Location),
        image:
          fieldImageSrc(item.fields?.Image) ||
          EVENTS_CATALOG.find((event) => url.includes(event.slug))?.image ||
          '',
      };
    })
    .filter((item): item is ListedEvent => Boolean(item));
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Props['fields'];
  const fields = { ...routeFields, ...(props.fields || {}) };
  const cmsEvents = eventsFromItems(props.fields?.items);
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
          image: item.image,
        }));
  const [query, setQuery] = useState('');

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

  const onSearch = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="oh-wrap oh-events" id={props.params?.RenderingIdentifier}>
      <h1>{fields?.Title?.value ? <Text field={fields.Title} /> : EVENTS_COPY.listingTitle}</h1>
      {fields?.Content?.value || isEditing ? (
        <div className="oh-muted max-w-2xl">
          <RichText field={fields.Content} />
        </div>
      ) : (
        <p className="oh-muted max-w-2xl">{EVENTS_COPY.listingIntro}</p>
      )}

      <form className="oh-events__search" onSubmit={onSearch} role="search">
        <label htmlFor="events-q" className="sr-only">
          Search events
        </label>
        <input
          id="events-q"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search events"
        />
        <button type="submit" aria-label="Search">
          <Search className="size-5" />
        </button>
      </form>

      {filtered.length === 0 ? (
        <p className="oh-muted">No events match that search.</p>
      ) : (
        <ul className="oh-grid oh-grid-3 mt-8">
          {filtered.map((item) => (
            <li key={item.id} className="oh-card">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt="" />
              ) : null}
              <article className="oh-card__body">
                {item.kicker ? <p className="oh-kicker">{item.kicker}</p> : null}
                <h2>
                  <Link href={item.url || '#'}>{item.title}</Link>
                </h2>
                {item.summary ? <p className="oh-muted">{item.summary}</p> : null}
                <p className="mt-3 text-sm">
                  {[item.dateLabel, item.timeLabel, item.location].filter(Boolean).join(' · ')}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Default;
