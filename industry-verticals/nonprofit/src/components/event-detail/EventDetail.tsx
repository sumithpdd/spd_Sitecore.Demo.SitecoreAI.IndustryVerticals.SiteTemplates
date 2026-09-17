'use client';

import { JSX, useEffect, useState } from 'react';
import { Image, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asImageField, asItems, fieldString, itemLabel } from '@/lib/sitecore-fields';
import {
  EVENTS_COPY,
  eventSpeakers,
  getEventBySlug,
  getPersonBySlug,
} from '@/lib/openhand-catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

type Fields = {
  Title?: { value?: string };
  Content?: { value?: string };
  Kicker?: { value?: string };
  DateLabel?: { value?: string };
  TimeLabel?: { value?: string };
  Location?: { value?: string };
  Price?: { value?: string };
  Audience?: { value?: string };
  Image?: unknown;
  Speakers?: unknown;
  Agenda?: { value?: string };
};

type Speaker = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
  office: string;
};

type Props = ComponentProps & { fields?: Fields };

const TABS = EVENTS_COPY.tabs;

function speakersFromField(field: unknown): Speaker[] {
  return asItems(field)
    .map((item): Speaker | null => {
      const name = itemLabel(item);
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const catalog = getPersonBySlug(slug);
      if (!name && !catalog) {
        return null;
      }
      return {
        id: item.id || slug,
        url: item.url || `/people/${slug}`,
        name: name || catalog?.name || slug,
        jobTitle: fieldString(item.fields?.JobTitle) || catalog?.jobTitle || '',
        office: fieldString(item.fields?.Office) || catalog?.office || '',
      };
    })
    .filter((item): item is Speaker => Boolean(item));
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getEventBySlug(slug);
  const hashTab = Number(String(router.asPath.split('#')[1] || '1'));
  const [tab, setTab] = useState(hashTab >= 1 && hashTab <= 3 ? hashTab - 1 : 0);

  useEffect(() => {
    const next = Number(String(router.asPath.split('#')[1] || '1'));
    if (next >= 1 && next <= 3) {
      setTab(next - 1);
    }
  }, [router.asPath]);

  const title = fieldString(fields.Title) || catalog?.title || 'Event';
  const kicker = fieldString(fields.Kicker) || catalog?.kicker || 'EVENT';
  const dateLabel = fieldString(fields.DateLabel) || catalog?.dateLabel || '';
  const timeLabel = fieldString(fields.TimeLabel) || catalog?.timeLabel || '';
  const location = fieldString(fields.Location) || catalog?.location || '';
  const price = fieldString(fields.Price) || catalog?.price || '';
  const audience = fieldString(fields.Audience) || catalog?.audience || '';
  const speakers = (() => {
    const fromCms = speakersFromField(fields.Speakers);
    if (fromCms.length > 0) {
      return fromCms;
    }
    return eventSpeakers(catalog?.speakerSlugs || []).map((person) => ({
      id: person.slug,
      url: `/people/${person.slug}`,
      name: person.name,
      jobTitle: person.jobTitle,
      office: person.office,
    }));
  })();
  const image = asImageField(fields.Image);
  const imageSrc = (image?.value as { src?: string } | undefined)?.src || catalog?.image || '';
  const registerHref = catalog?.registerHref || '/donate';

  const selectTab = (index: number) => {
    setTab(index);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}#${index + 1}`);
    }
  };

  const facts = (
    <aside className="oh-event__facts">
      <h2>When and where</h2>
      {dateLabel ? (
        <p>
          <CalendarDays className="size-4" aria-hidden="true" />
          <span>{dateLabel}</span>
        </p>
      ) : null}
      {timeLabel ? (
        <p>
          <Clock className="size-4" aria-hidden="true" />
          <span>{timeLabel}</span>
        </p>
      ) : null}
      {location ? (
        <p>
          <MapPin className="size-4" aria-hidden="true" />
          <span>{location}</span>
        </p>
      ) : null}
      {audience ? (
        <div className="oh-event__fact-block">
          <h3>Who should attend</h3>
          <p>{audience}</p>
        </div>
      ) : null}
      {price ? (
        <div className="oh-event__fact-block">
          <h3>Price</h3>
          <p>{price}</p>
        </div>
      ) : null}
      <a className="oh-btn oh-btn--amber" href={registerHref}>
        {EVENTS_COPY.register}
      </a>
    </aside>
  );

  return (
    <article className="oh-event" id={props.params?.RenderingIdentifier}>
      <div
        className="oh-event__hero"
        style={
          imageSrc
            ? {
                backgroundImage: `linear-gradient(to top, rgb(22 50 79 / 0.88), rgb(22 50 79 / 0.28)), url("${imageSrc}")`,
              }
            : undefined
        }
      >
        {(imageSrc || isEditing) && image ? (
          <Image field={image} className="oh-event__hero-img" />
        ) : imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="oh-event__hero-img" src={imageSrc} alt="" />
        ) : null}
        <div className="oh-wrap oh-event__hero-copy">
          <p className="oh-crumb">
            <Link href="/">Home</Link> / <Link href="/events">Events</Link> / {title}
          </p>
          <p className="oh-kicker">{kicker}</p>
          <h1>{fields.Title?.value ? <Text field={fields.Title} /> : title}</h1>
          <p>
            {[dateLabel, timeLabel].filter(Boolean).join(' ')}
            {location ? ` · ${location}` : ''}
          </p>
          <a className="oh-btn oh-btn--amber mt-4 inline-flex" href={registerHref}>
            {EVENTS_COPY.register}
          </a>
        </div>
      </div>

      <div className="oh-wrap oh-event__body">
        <div className="oh-event__tabs" role="tablist">
          {TABS.map((label, index) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={tab === index}
              className={tab === index ? 'is-active' : undefined}
              onClick={() => selectTab(index)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 0 ? (
          <div className="oh-event__overview" id="1">
            <div>
              {fields.Content?.value || isEditing ? (
                <RichText field={fields.Content} />
              ) : (
                <p>{catalog?.summary}</p>
              )}
            </div>
            {facts}
          </div>
        ) : null}

        {tab === 1 ? (
          <div id="2">
            <h2>Speakers</h2>
            <ul className="oh-event__speakers">
              {speakers.map((speaker) => (
                <li key={speaker.id}>
                  <Link href={speaker.url} className="oh-author">
                    <span className="oh-author__initials" aria-hidden="true">
                      {speaker.name
                        .split(' ')
                        .filter(Boolean)
                        .map((part) => part[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                    <span>
                      <h3>{speaker.name}</h3>
                      {speaker.jobTitle ? <p>{speaker.jobTitle}</p> : null}
                      {speaker.office ? <p>{speaker.office}</p> : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {isEditing && speakers.length === 0 ? <p>Select Speakers on this EventPage.</p> : null}
          </div>
        ) : null}

        {tab === 2 ? (
          <div id="3">
            <h2>Agenda</h2>
            {fields.Agenda?.value || isEditing ? (
              <RichText field={fields.Agenda} />
            ) : (
              <p>Agenda will be confirmed closer to the event.</p>
            )}
          </div>
        ) : null}

        <p className="mt-10" id="register">
          <a className="oh-btn oh-btn--amber" href={registerHref}>
            {EVENTS_COPY.register}
          </a>
        </p>
      </div>
    </article>
  );
};

export default Default;
