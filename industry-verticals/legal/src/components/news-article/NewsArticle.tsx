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
import { ANNOUNCEMENTS_CATALOG } from '@/lib/announcements-catalog';
import { getPersonBySlug, GUIDE_AUTHOR_SLUGS, AUTHOR_ID_TO_SLUG } from '@/lib/people-catalog';
import { taxonomyLabels } from '@/lib/cms-listing';
import { asImageField, asItems, asTextField, fieldString, itemLabel } from '@/lib/sitecore-fields';
import SocialShare from '../non-sitecore/SocialShare';
import Link from 'next/link';

type RouteFields = {
  Title?: TextField;
  Content?: RichTextField;
  ShortDescription?: TextField;
  Kicker?: TextField;
  PublishedDate?: TextField;
  ReadTime?: TextField;
  Image?: ImageField;
  Tags?: unknown;
  Categories?: unknown;
  Authors?: unknown;
};

type Advisor = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  photo?: ImageField;
};

type Props = ComponentProps & { fields?: RouteFields };

function normalizeId(value: string): string {
  return value.replace(/[{}-]/g, '').toLowerCase();
}

function photoFromSrc(src: string | undefined, alt: string): ImageField | undefined {
  if (!src) {
    return undefined;
  }
  return { value: { src, alt } };
}

function catalogAdvisors(slugs: string[]): Advisor[] {
  return slugs
    .map((slug) => getPersonBySlug(slug))
    .filter((person): person is NonNullable<ReturnType<typeof getPersonBySlug>> => Boolean(person))
    .map((person) => ({
      id: person.slug,
      url: `/people/${person.slug}`,
      name: person.name,
      jobTitle: person.jobTitle,
      phone: person.phone,
      email: person.email,
      photo: photoFromSrc(person.photoSrc, person.name),
    }));
}

function slugsFromAuthorField(field: unknown): string[] {
  const raw =
    fieldString(field) ||
    (typeof field === 'string' ? field : '') ||
    (typeof (field as { value?: unknown })?.value === 'string'
      ? String((field as { value: string }).value)
      : '');
  const ids = raw.match(/\{?[0-9a-fA-F]{8}-?(?:[0-9a-fA-F]{4}-?){3}[0-9a-fA-F]{12}\}?/g) || [];
  return ids
    .map((id) => AUTHOR_ID_TO_SLUG[normalizeId(id)])
    .filter((slug): slug is string => Boolean(slug));
}

function advisorsFromField(field: unknown): Advisor[] {
  const fromItems = asItems(field)
    .map((item) => {
      const name = itemLabel(item);
      const idSlug = item.id ? AUTHOR_ID_TO_SLUG[normalizeId(item.id)] : undefined;
      const slug = idSlug || name.toLowerCase().replace(/\s+/g, '-');
      const catalog = getPersonBySlug(slug);
      if (!name && !catalog) {
        return null;
      }
      const photo = asImageField(item.fields?.Photo);
      const hasPhoto = Boolean((photo?.value as { src?: string } | undefined)?.src);
      return {
        id: item.id || slug,
        url: item.url || `/people/${slug}`,
        name: name || catalog?.name || slug,
        jobTitle: fieldString(item.fields?.JobTitle) || catalog?.jobTitle || '',
        phone: fieldString(item.fields?.Phone) || catalog?.phone || '',
        email: fieldString(item.fields?.Email) || catalog?.email || '',
        photo: hasPhoto ? photo : photoFromSrc(catalog?.photoSrc, name || catalog?.name || ''),
      };
    })
    .filter((item): item is Advisor => Boolean(item));
  if (fromItems.length > 0) {
    return fromItems;
  }
  return catalogAdvisors(slugsFromAuthorField(field));
}

function parentTrail(routeName: string, itemPath: string): { href: string; label: string } {
  const path = `${itemPath}/${routeName}`.toLowerCase();
  if (
    ANNOUNCEMENTS_CATALOG.some((item) => item.slug === routeName.toLowerCase()) ||
    path.includes('/announcements')
  ) {
    return { href: '/about-us/announcements', label: 'Announcements' };
  }
  if (path.includes('/guides')) {
    return { href: '/out-law/guides', label: 'Guides' };
  }
  return { href: '/out-law/news', label: 'Out-Law' };
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as RouteFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const itemPath = String(
    page?.layout?.sitecore?.route?.itemPath || page?.layout?.sitecore?.route?.path || ''
  );
  const parent = parentTrail(slug, itemPath);
  const tags = taxonomyLabels(fields.Tags);
  const categories = taxonomyLabels(fields.Categories);
  const image = asImageField(fields.Image);
  const cmsAuthors = advisorsFromField(fields.Authors);
  const authors =
    cmsAuthors.length > 0
      ? cmsAuthors
      : slug.includes('when-uk-suppliers')
        ? catalogAdvisors(GUIDE_AUTHOR_SLUGS)
        : [];
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  if (!fields.Title && !fields.Content && !isEditing) {
    return <></>;
  }

  return (
    <article className="pm-article" id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-profile__eyebrow">
          <Link href="/out-law">Out-Law</Link>
          <span aria-hidden="true"> / </span>
          <Link href={parent.href}>{parent.label}</Link>
        </p>
        {(fieldString(fields.Kicker) || isEditing) && (
          <p className="pm-outlaw__kicker">
            <Text field={asTextField(fields.Kicker)} />
          </p>
        )}
        <h1 className="pm-article__title">
          <Text field={fields.Title} />
        </h1>
        <p className="pm-article__meta">
          {(fieldString(fields.PublishedDate) || isEditing) && (
            <time>
              <Text field={asTextField(fields.PublishedDate)} />
            </time>
          )}
          {(fieldString(fields.ReadTime) || isEditing) && (
            <span>
              <Text field={asTextField(fields.ReadTime)} />
            </span>
          )}
        </p>
        {shareUrl ? (
          <div className="pm-article__share">
            <SocialShare
              url={shareUrl}
              title={fieldString(fields.Title)}
              description={fieldString(fields.ShortDescription)}
              mediaUrl={(image?.value as { src?: string } | undefined)?.src || ''}
              platforms={['email', 'linkedin', 'twitter', 'facebook']}
            />
          </div>
        ) : null}
        {(categories.length > 0 || tags.length > 0 || isEditing) && (
          <div className="pm-article__tags">
            {categories.map((name) => (
              <span key={`cat-${name}`} className="is-category">
                {name}
              </span>
            ))}
            {tags.map((name) => (
              <span key={`tag-${name}`}>{name}</span>
            ))}
            {isEditing && tags.length === 0 ? <span>Select Tags</span> : null}
          </div>
        )}
        {(image?.value?.src || isEditing) && (
          <div className="pm-article__media">
            <ContentSdkImage field={image} className="pm-article__image" />
          </div>
        )}
        <div className="pm-article__body">
          <RichText field={fields.Content} />
        </div>

        {(authors.length > 0 || isEditing) && (
          <section className="pm-advisers">
            <h2>Contact an adviser</h2>
            <ul className="pm-advisers__list">
              {authors.map((author) => (
                <li key={author.id}>
                  <article className="pm-advisers__card">
                    {(author.photo?.value as { src?: string } | undefined)?.src ? (
                      <img
                        src={(author.photo?.value as { src: string }).src}
                        alt={author.name}
                        className="pm-advisers__photo"
                      />
                    ) : (
                      <div
                        className="pm-advisers__photo pm-advisers__photo--empty"
                        aria-hidden="true"
                      />
                    )}
                    <div>
                      <h3>
                        <Link href={author.url}>{author.name}</Link>
                      </h3>
                      {author.jobTitle ? (
                        <p className="pm-advisers__job">{author.jobTitle}</p>
                      ) : null}
                      {author.phone ? (
                        <p>
                          <a href={`tel:${author.phone.replace(/\s/g, '')}`}>{author.phone}</a>
                        </p>
                      ) : null}
                      {author.email ? (
                        <p>
                          <a href={`mailto:${author.email}`}>Email</a>
                        </p>
                      ) : null}
                      <Link className="pm-advisers__cta" href={author.url}>
                        View Profile
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            {isEditing && authors.length === 0 ? (
              <p>
                Select Authors on this ArticlePage (Sally Williamson and Dawn Allen for this guide).
              </p>
            ) : null}
          </section>
        )}
      </div>
    </article>
  );
};

export default Default;
