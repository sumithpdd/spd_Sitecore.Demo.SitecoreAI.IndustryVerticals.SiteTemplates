'use client';

import { JSX, useEffect, useState } from 'react';
import {
  ImageField,
  NextImage as ContentSdkImage,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ANNOUNCEMENTS_CATALOG } from '@/lib/announcements-catalog';
import { ARTICLE_SIGNUP, LATEST_NEWS, relatedPerspectives } from '@/lib/home-catalog';
import { useDemoAuth } from '@/lib/demo-auth';
import { getPersonBySlug, GUIDE_AUTHOR_SLUGS, AUTHOR_ID_TO_SLUG } from '@/lib/people-catalog';
import { taxonomyLabels } from '@/lib/cms-listing';
import {
  asImageField,
  asItems,
  asTextField,
  fieldString,
  itemLabel,
  linkHref,
  linkText,
} from '@/lib/sitecore-fields';
import SocialShare from '../non-sitecore/SocialShare';
import Link from 'next/link';
import { useRouter } from 'next/router';

type RouteFields = {
  Title?: TextField;
  Content?: RichTextField;
  ShortDescription?: TextField;
  Summary?: TextField;
  Kicker?: TextField;
  PublishedDate?: TextField;
  ReadTime?: TextField;
  Image?: ImageField;
  Infographic?: ImageField;
  Tags?: unknown;
  Categories?: unknown;
  Sectors?: unknown;
  Services?: unknown;
  Regions?: unknown;
  RelatedContent?: unknown;
  Authors?: unknown;
  SuggestedTags?: TextField;
  AeoNotes?: TextField;
  HubSpotFormId?: TextField;
  WhitepaperUrl?: unknown;
  Byline?: TextField;
  Persona?: TextField;
};

type Advisor = {
  id: string;
  url: string;
  name: string;
  jobTitle: string;
  phone: string;
  email: string;
  photo: ImageField | undefined;
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
    .map((item): Advisor | null => {
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
    .filter((item): item is Advisor => item !== null);
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
  if (path.includes('/perspectives')) {
    return { href: '/perspectives', label: 'Perspectives' };
  }
  return { href: '/perspectives', label: 'Perspectives' };
}

type RouteMeta = {
  name?: string;
  itemPath?: string;
  path?: string;
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const { preferences } = useDemoAuth();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as RouteFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const route = page?.layout?.sitecore?.route as RouteMeta | undefined;
  const slug = String(route?.name || '').toLowerCase();
  const itemPath = String(route?.itemPath || route?.path || router.asPath?.split('?')[0] || '');
  const parent = parentTrail(slug, itemPath);
  const tags = taxonomyLabels(fields.Tags);
  const categories = taxonomyLabels(fields.Categories);
  const sectors = taxonomyLabels(fields.Sectors);
  const services = taxonomyLabels(fields.Services);
  const regions = taxonomyLabels(fields.Regions);
  const related = relatedPerspectives({
    currentHref: (router.asPath || '').split('?')[0],
    sectors,
    region: preferences.region,
  });
  const fallbackWhitepaper =
    slug.includes('agentic-ai') ||
    slug.includes('energy-sovereignty') ||
    slug.includes('weather-driven')
      ? 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c4d6213c0c1f4bd8ae21e235b34c159c'
      : '';
  const whitepaperHref = linkHref(fields.WhitepaperUrl) || fallbackWhitepaper;
  const whitepaperLabel = linkText(fields.WhitepaperUrl, 'Download whitepaper');
  const byline = fieldString(fields.Byline);
  const image = asImageField(fields.Image);
  const infographic = asImageField(fields.Infographic);
  const cmsAuthors = advisorsFromField(fields.Authors);
  const authors =
    cmsAuthors.length > 0
      ? cmsAuthors
      : slug.includes('t-plus-1') || slug.includes('europes-t-plus-1')
        ? catalogAdvisors(GUIDE_AUTHOR_SLUGS)
        : [];
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const phId = props.params?.DynamicPlaceholderId || '1';
  const sidebarName = `article-sidebar-${phId}`;
  const sidebarSlots = props.rendering?.placeholders?.[sidebarName];
  const hasSidebar = Array.isArray(sidebarSlots) && sidebarSlots.length > 0;

  if (!fields.Title && !fields.Content && !isEditing) {
    return <></>;
  }

  return (
    <article className="pm-article" id={id}>
      <div className="pm-wrap py-12">
        <p className="pm-article__band">Perspectives / The Expert Advantage</p>
        <div className="pm-article__layout">
          <div className="pm-article__main">
            <p className="pm-profile__eyebrow">
              <Link href="/perspectives">Perspectives</Link>
              <span aria-hidden="true"> / </span>
              <Link href={parent.href}>{parent.label}</Link>
            </p>
            <div className="pm-article__head">
              <div className="pm-article__title-block">
                {(fieldString(fields.Kicker) || isEditing) && (
                  <p className="pm-outlaw__kicker">
                    <Text field={asTextField(fields.Kicker)} />
                    {(fieldString(fields.ReadTime) || isEditing) && (
                      <>
                        {' '}
                        <Text field={asTextField(fields.ReadTime)} />
                      </>
                    )}
                  </p>
                )}
                <h1 className="pm-article__title">
                  <Text field={fields.Title} />
                </h1>
                {whitepaperHref ? (
                  <p className="pm-article__download-top">
                    <a href={whitepaperHref} target="_blank" rel="noreferrer">
                      {whitepaperLabel}
                    </a>
                  </p>
                ) : isEditing ? (
                  <p className="pm-article__download-top">Add WhitepaperUrl</p>
                ) : null}
                <ul className="pm-article__byline">
                  {byline ? <li>{byline}</li> : null}
                  {authors.map((author) => (
                    <li key={author.id}>
                      <Link href={author.url}>{author.name}</Link>
                    </li>
                  ))}
                  {(fieldString(fields.PublishedDate) || isEditing) && (
                    <li>
                      <time>
                        <Text field={asTextField(fields.PublishedDate)} />
                      </time>
                    </li>
                  )}
                </ul>
                {(fieldString(fields.Summary) || isEditing) && (
                  <p className="pm-article__summary">
                    <Text field={asTextField(fields.Summary)} />
                  </p>
                )}
              </div>
            </div>
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
            {(image?.value?.src || isEditing) && (
              <div className="pm-article__media">
                <ContentSdkImage field={image} className="pm-article__image" />
              </div>
            )}
            {(infographic?.value?.src || isEditing) && (
              <figure className="pm-infographic">
                <ContentSdkImage field={infographic} className="pm-article__image" />
                {isEditing ? <figcaption>Infographic</figcaption> : null}
              </figure>
            )}
            <div className="pm-article__body">
              <RichText field={fields.Content} />
            </div>
            {(categories.length > 0 ||
              tags.length > 0 ||
              sectors.length > 0 ||
              services.length > 0 ||
              regions.length > 0 ||
              isEditing) && (
              <div className="pm-article__tags">
                {sectors.map((name) => (
                  <span key={`sector-${name}`} className="pm-chip pm-chip--industry">
                    {name}
                  </span>
                ))}
                {services.map((name) => (
                  <span key={`service-${name}`} className="pm-chip pm-chip--service">
                    {name}
                  </span>
                ))}
                {regions.map((name) => (
                  <span key={`region-${name}`} className="pm-chip pm-chip--region">
                    {name}
                  </span>
                ))}
                {categories.map((name) => (
                  <span key={`cat-${name}`} className="pm-chip pm-chip--topic">
                    {name}
                  </span>
                ))}
                {tags.map((name) => (
                  <span key={`tag-${name}`} className="pm-chip pm-chip--topic">
                    {name}
                  </span>
                ))}
                {fieldString(fields.Persona) ? (
                  <span className="pm-chip pm-chip--persona">
                    <Text field={asTextField(fields.Persona)} />
                  </span>
                ) : null}
                {isEditing && tags.length === 0 ? <span>Select Tags</span> : null}
              </div>
            )}
            {(whitepaperHref || isEditing) && (
              <section
                className="pm-article__whitepaper"
                id="article-intro-22072026"
                aria-label="Download whitepaper"
              >
                <h2>Download whitepaper</h2>
                <p>Your download will start from Content Hub.</p>
                {whitepaperHref ? (
                  <a
                    className="pm-btn-light"
                    href={whitepaperHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {whitepaperLabel}
                  </a>
                ) : (
                  <p>Add WhitepaperUrl on this ArticlePage.</p>
                )}
              </section>
            )}
            {(related.length > 0 || isEditing) && (
              <section className="pm-article__related" aria-label="Related content">
                <h2>Related content</h2>
                <p className="pm-insights__hint">Resolved by tag and region — not hand-placed.</p>
                <ul className="pm-article__related-cards">
                  {related.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>
                        <span className="pm-outlaw__kicker">{item.kicker}</span>
                        <span className="pm-article__related-title">{item.title}</span>
                        {item.meta ? <time>{item.meta}</time> : null}
                      </Link>
                    </li>
                  ))}
                  {isEditing && related.length === 0 ? (
                    <li>Related cards resolve from industry, topic and the header region.</li>
                  ) : null}
                </ul>
              </section>
            )}
            {isEditing && (
              <aside className="pm-article__ai" aria-label="AI authoring notes">
                <p>
                  Suggested tags: <Text field={asTextField(fields.SuggestedTags)} />
                </p>
                <p>
                  AEO notes: <Text field={asTextField(fields.AeoNotes)} />
                </p>
                <p>
                  HubSpot form: <Text field={asTextField(fields.HubSpotFormId)} />
                </p>
              </aside>
            )}
          </div>
          <aside className="pm-article__sidebar">
            {(authors.length > 0 || isEditing) && (
              <section className="pm-article__authors" aria-label="Authors">
                <h2 className="pm-article__authors-heading">Authors</h2>
                <ul className="pm-article__authors-list">
                  {authors.map((author) => (
                    <li key={author.id}>
                      <article className="pm-advisers__card pm-advisers__card--compact">
                        {(author.photo?.value as { src?: string } | undefined)?.src ? (
                          // eslint-disable-next-line @next/next/no-img-element -- DAM public URL
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
                    Select Authors on this ArticlePage (Elisabeth Plakinger for this Perspective).
                  </p>
                ) : null}
              </section>
            )}
            {hasSidebar || isEditing ? (
              <Placeholder name={sidebarName} rendering={props.rendering} />
            ) : (
              <>
                <section className="pm-latest-news">
                  <h2>Latest News</h2>
                  <ol>
                    {LATEST_NEWS.map((item) => (
                      <li key={item.href + item.title}>
                        <p className="pm-latest-news__time">{item.time}</p>
                        <Link href={item.href} className="pm-latest-news__title">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </section>
                <aside className="pm-article-signup">
                  <h2>{ARTICLE_SIGNUP.title}</h2>
                  <p className="pm-article-signup__body">{ARTICLE_SIGNUP.body}</p>
                  <a className="pm-btn-light" href={ARTICLE_SIGNUP.href} rel="noreferrer">
                    {ARTICLE_SIGNUP.cta}
                  </a>
                </aside>
              </>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
};

export default Default;
