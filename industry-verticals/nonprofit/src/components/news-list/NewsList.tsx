'use client';

import { JSX } from 'react';
import { RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { NEWS, NEWS_COPY } from '@/lib/openhand-catalog';
import { asItems, fieldImageSrc, fieldString, itemLabel } from '@/lib/sitecore-fields';
import Link from 'next/link';

type ListedNews = {
  id: string;
  url: string;
  title: string;
  summary: string;
  dateLabel: string;
  kicker: string;
  image: string;
};

type Props = ComponentProps & {
  fields?: {
    items?: unknown;
    Title?: { value?: string };
    Content?: { value?: string };
  };
};

function newsFromItems(items: unknown): ListedNews[] {
  return asItems(items)
    .map((item): ListedNews | null => {
      const title = fieldString(item.fields?.Title) || itemLabel(item);
      const url = item.url || '';
      if (!title && !url) {
        return null;
      }
      return {
        id: item.id || url || title,
        url,
        title,
        summary: fieldString(item.fields?.Summary) || fieldString(item.fields?.ShortDescription),
        dateLabel: fieldString(item.fields?.PublishedDate),
        kicker: fieldString(item.fields?.Kicker) || 'News',
        image: fieldImageSrc(item.fields?.Image),
      };
    })
    .filter((item): item is ListedNews => Boolean(item));
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Props['fields'];
  const fields = { ...routeFields, ...(props.fields || {}) };
  const cmsNews = newsFromItems(props.fields?.items);
  const articles =
    cmsNews.length > 0
      ? cmsNews
      : NEWS.map((item) => ({
          id: item.slug,
          url: item.href,
          title: item.title,
          summary: item.summary,
          dateLabel: item.updated,
          kicker: 'News',
          image: item.image,
        }));

  return (
    <section className="oh-wrap oh-news" id={props.params?.RenderingIdentifier}>
      <h1>{fields?.Title?.value ? <Text field={fields.Title} /> : NEWS_COPY.listingTitle}</h1>
      {fields?.Content?.value || isEditing ? (
        <div className="oh-muted max-w-2xl">
          <RichText field={fields.Content} />
        </div>
      ) : (
        <p className="oh-muted max-w-2xl">{NEWS_COPY.listingIntro}</p>
      )}
      <ul className="oh-grid oh-grid-3 mt-8">
        {articles.map((item) => (
          <li key={item.id} className="oh-card">
            {item.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.image} alt="" />
            ) : null}
            <article className="oh-card__body">
              <p className="oh-kicker">{item.kicker}</p>
              <h2>
                <Link href={item.url || '#'}>{item.title}</Link>
              </h2>
              {item.summary ? <p className="oh-muted">{item.summary}</p> : null}
              {item.dateLabel ? <p className="mt-3 text-sm">{item.dateLabel}</p> : null}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Default;
