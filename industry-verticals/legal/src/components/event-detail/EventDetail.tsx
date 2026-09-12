'use client';

import { JSX, useEffect, useState } from 'react';
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
import { asImageField, asItems, fieldString, itemLabel } from '@/lib/sitecore-fields';
import { EVENTS_COPY, eventSpeakers, getEventBySlug } from '@/lib/events-catalog';
import { getPersonBySlug } from '@/lib/people-catalog';
import SocialShare from '../non-sitecore/SocialShare';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CalendarDays, Clock, MapPin } from 'lucide-react';

type Fields = {
  Title?: TextField;
  Content?: RichTextField;
  Kicker?: TextField;
  DateLabel?: TextField;
  TimeLabel?: TextField;
  Location?: TextField;
  Price?: TextField;
  Audience?: TextField;
  Image?: ImageField;
  Speakers?: unknown;
  Agenda?: RichTextField;
};

type Speaker = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
  office: string;
  photoSrc?: string;
};

type Props = ComponentProps & { fields?: Fields };

const TABS = EVENTS_COPY.tabs;

function speakersFromField(field: unknown): Speaker[] {
  return asItems(field)
    .map((item): Speaker | null => {
      const name = itemLabel(item);
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      const catalog = getPersonBySlug(slug);
      const photo = asImageField(item.fields?.Photo);
      const src = photo && typeof photo.value === 'object' ? photo.value?.src : catalog?.photoSrc;
      if (!name && !catalog) {
        return null;
      }
      return {
        id: item.id || slug,
        url: item.url || `/people/${slug}`,
        name: name || catalog?.name || slug,
        jobTitle: fieldString(item.fields?.JobTitle) || catalog?.jobTitle || '',
        office: fieldString(item.fields?.Office) || catalog?.office || '',
        photoSrc: src,
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
  const id = props.params?.RenderingIdentifier;
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getEventBySlug(slug);
  const hashTab = Number(String(router.asPath.split('#')[1] || '1'));
  const [tab, setTab] = useState(hashTab >= 1 && hashTab <= 3 ? hashTab - 1 : 0);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    const next = Number(String(router.asPath.split('#')[1] || '1'));
    if (next >= 1 && next <= 3) {
      setTab(next - 1);
    }
  }, [router.asPath]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href.split('#')[0]);
    }
  }, []);

  const title = fieldString(fields.Title) || catalog?.title || 'Event';
  const kicker = fieldString(fields.Kicker) || catalog?.kicker || 'EVENT';
  const dateLabel = fieldString(fields.DateLabel) || catalog?.dateLabel || '';
  const timeLabel = fieldString(fields.TimeLabel) || catalog?.timeLabel || '';
  const location = fieldString(fields.Location) || catalog?.location || '';
  const price = fieldString(fields.Price);
  const audience = fieldString(fields.Audience);
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
      photoSrc: person.photoSrc,
    }));
  })();
  const image = asImageField(fields.Image);
  const hasImage = Boolean((image?.value as { src?: string } | undefined)?.src);
  const imageSrc = (image?.value as { src?: string } | undefined)?.src || '';

  const selectTab = (index: number) => {
    setTab(index);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `${window.location.pathname}#${index + 1}`);
    }
  };

  const facts = (
    <aside className="pm-event__facts">
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
        <div className="pm-event__fact-block">
          <h3>Who should attend</h3>
          <p>{audience}</p>
        </div>
      ) : null}
      {price ? (
        <div className="pm-event__fact-block">
          <h3>Price</h3>
          <p>{price}</p>
        </div>
      ) : null}
      <a className="pm-btn" href="#register">
        {EVENTS_COPY.register}
      </a>
    </aside>
  );

  return (
    <article className="pm-event" id={id}>
      <div className="pm-event__hero">
        {hasImage || isEditing ? (
          <ContentSdkImage field={image} className="pm-event__hero-img" />
        ) : null}
        <div className="pm-event__hero-shade" aria-hidden="true" />
        <div className="pm-wrap pm-event__hero-copy">
          <div className="pm-breadcrumb">
            <ol>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/events-training">Events and Training</Link>
              </li>
              <li>{title}</li>
            </ol>
          </div>
          <p className="pm-event__kicker">{kicker}</p>
          <h1>{fields.Title ? <Text field={fields.Title} /> : title}</h1>
          <p className="pm-event__when">
            {dateLabel}
            {timeLabel ? ` ${timeLabel}` : ''}
          </p>
          {location ? <p className="pm-event__where">{location}</p> : null}
          <div className="pm-event__hero-actions">
            <a className="pm-btn" href="#register">
              {EVENTS_COPY.register}
            </a>
            {shareUrl ? (
              <SocialShare
                url={shareUrl}
                title={title}
                description={fieldString(fields.Content)?.replace(/<[^>]+>/g, '') || catalog?.summary}
                mediaUrl={imageSrc}
                platforms={['email', 'linkedin', 'twitter', 'facebook']}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="pm-wrap pm-event__body">
        <div className="pm-event__tabs" role="tablist">
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
          <div className="pm-event__overview" id="1">
            <div className="pm-event__panel">
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
          <div className="pm-event__panel pm-event__panel--wide" id="2">
            <h2>Our specialists</h2>
            <ul className="pm-event__speakers">
              {speakers.map((speaker) => (
                <li key={speaker.id}>
                  <Link href={speaker.url} className="pm-event__speaker">
                    {speaker.photoSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element -- DAM public URL
                      <img src={speaker.photoSrc} alt="" />
                    ) : (
                      <span className="pm-event__speaker-empty" aria-hidden="true" />
                    )}
                    <span>
                      <strong>{speaker.name}</strong>
                      <em>{speaker.jobTitle || 'Pinsent Masons'}</em>
                      {speaker.office ? <em>{speaker.office}</em> : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {isEditing && speakers.length === 0 ? <p>Select Speakers</p> : null}
          </div>
        ) : null}

        {tab === 2 ? (
          <div className="pm-event__panel pm-event__panel--wide" id="3">
            <h2>Agenda</h2>
            {fields.Agenda?.value || isEditing ? (
              <div className="pm-event__agenda">
                <RichText field={fields.Agenda} />
              </div>
            ) : (
              <p>Agenda will be confirmed closer to the event.</p>
            )}
          </div>
        ) : null}

        <p className="pm-event__register" id="register">
          <a className="pm-btn" href="mailto:dawn.allen@pinsentmasons.com">
            {EVENTS_COPY.register}
          </a>
        </p>
      </div>
    </article>
  );
};

export default Default;
