'use client';

import { JSX } from 'react';
import { ImageField, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  ADVICE,
  adviceByHref,
  AUTHOR_ID_TO_SLUG,
  getPersonBySlug,
  newsByHref,
} from '@/lib/openhand-catalog';
import { asItems, asTextField, fieldImageSrc, fieldString, itemLabel } from '@/lib/sitecore-fields';
import { OhMedia } from '@/lib/OhMedia';
import Link from 'next/link';
import { useRouter } from 'next/router';

type RouteFields = {
  Title?: { value?: string };
  Content?: { value?: string };
  Summary?: { value?: string };
  ShortDescription?: { value?: string };
  Kicker?: { value?: string };
  PublishedDate?: { value?: string };
  ReadTime?: { value?: string };
  Authors?: unknown;
  Image?: ImageField;
};

type Author = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
};

type Props = ComponentProps;

function normalizeId(value: string): string {
  return value.replace(/[{}-]/g, '').toLowerCase();
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function catalogAuthors(slugs: string[]): Author[] {
  return slugs
    .map((slug) => getPersonBySlug(slug))
    .filter((person): person is NonNullable<ReturnType<typeof getPersonBySlug>> => Boolean(person))
    .map((person) => ({
      id: person.slug,
      url: `/people/${person.slug}`,
      name: person.name,
      jobTitle: person.jobTitle,
    }));
}

function slugsFromAuthorField(field: unknown): string[] {
  const raw = fieldString(field);
  const ids = raw.match(/\{?[0-9a-fA-F]{8}-?(?:[0-9a-fA-F]{4}-?){3}[0-9a-fA-F]{12}\}?/g) || [];
  return ids
    .map((id) => AUTHOR_ID_TO_SLUG[normalizeId(id)])
    .filter((slug): slug is string => Boolean(slug));
}

function authorsFromField(field: unknown, fallbackSlug?: string): Author[] {
  const fromItems = asItems(field)
    .map((item): Author | null => {
      const name = itemLabel(item);
      const idSlug = item.id ? AUTHOR_ID_TO_SLUG[normalizeId(item.id)] : undefined;
      const slug = idSlug || name.toLowerCase().replace(/\s+/g, '-');
      const catalog = getPersonBySlug(slug);
      if (!name && !catalog) {
        return null;
      }
      return {
        id: item.id || slug,
        url: item.url || `/people/${slug}`,
        name: name || catalog?.name || slug,
        jobTitle: fieldString(item.fields?.JobTitle) || catalog?.jobTitle || '',
      };
    })
    .filter((item): item is Author => item !== null);
  if (fromItems.length > 0) {
    return fromItems;
  }
  const fromIds = catalogAuthors(slugsFromAuthorField(field));
  if (fromIds.length > 0) {
    return fromIds;
  }
  return fallbackSlug ? catalogAuthors([fallbackSlug]) : [];
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const path = router.asPath.split('?')[0];
  const isNews = path.startsWith('/news');
  const news = newsByHref(path);
  const article = news || adviceByHref(path) || (isNews ? undefined : ADVICE[0]);
  const fields = (page?.layout?.sitecore?.route?.fields || {}) as RouteFields;
  const title = fieldString(fields.Title) || article?.title || 'Article';
  const summary =
    fieldString(fields.Summary) || fieldString(fields.ShortDescription) || article?.summary || '';
  const kicker = fieldString(fields.Kicker) || (isNews ? 'News' : 'Advice');
  const published = fieldString(fields.PublishedDate) || article?.updated || '';
  const readTime = fieldString(fields.ReadTime);
  const authors = authorsFromField(fields.Authors, article?.authorSlug);
  const related = article?.related || [];
  const imageSrc = fieldImageSrc(fields.Image, article?.image || '');

  return (
    <article className="oh-wrap oh-advice" id={props.params?.RenderingIdentifier}>
      <p className="oh-kicker">
        {fields.Kicker?.value || isEditing ? <Text field={asTextField(fields.Kicker)} /> : kicker}
        {(published || isEditing) && (
          <>
            {' · '}
            {fields.PublishedDate?.value || isEditing ? (
              <Text field={asTextField(fields.PublishedDate)} />
            ) : (
              published
            )}
          </>
        )}
        {(readTime || isEditing) && (
          <>
            {' · '}
            <Text field={asTextField(fields.ReadTime)} />
          </>
        )}
      </p>
      <h1>{fields.Title?.value ? <Text field={fields.Title} /> : title}</h1>
      {(imageSrc || isEditing) && (
        <div className="oh-advice__media">
          <OhMedia
            field={fields.Image}
            fallback={article?.image || ''}
            className="oh-advice__image"
            alt={title}
          />
        </div>
      )}
      {(summary || isEditing) && (
        <p className="oh-muted">
          {fields.Summary?.value ? <Text field={fields.Summary} /> : summary}
        </p>
      )}
      {fields.Content?.value ? (
        <RichText field={fields.Content} />
      ) : (
        (article?.body || []).map((para) => <p key={para}>{para}</p>)
      )}
      {(authors.length > 0 || isEditing) && (
        <section className="oh-authors" aria-label="Authors">
          {authors.map((author) => (
            <Link key={author.id} href={author.url} className="oh-author">
              <span className="oh-author__initials" aria-hidden="true">
                {initials(author.name)}
              </span>
              <span>
                <h3>{author.name}</h3>
                {author.jobTitle ? <p>{author.jobTitle}</p> : null}
              </span>
            </Link>
          ))}
          {isEditing && authors.length === 0 ? <p>Select Authors on this ArticlePage.</p> : null}
        </section>
      )}
      {related.length > 0 ? (
        <>
          <h2 className="mt-10 text-xl font-semibold">Related</h2>
          <ul>
            {related.map((href) => {
              const relatedItem = newsByHref(href) || adviceByHref(href);
              return (
                <li key={href}>
                  <Link href={href}>{relatedItem?.title || href}</Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </article>
  );
};

export default Default;
