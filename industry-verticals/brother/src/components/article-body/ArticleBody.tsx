'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { findArticleByPath, BROTHER_ARTICLES } from 'lib/articles-catalog';
import {
  fieldText,
  imageSrc,
  linkHref,
  linkText,
  listItems,
  type CmsListItem,
} from 'lib/cms-fields';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Lead?: Field<string>;
  Body?: Field<string>;
  HeroImage?: ImageField;
  CtaLink?: LinkField;
  Author?: Field<string>;
  Category?: Field<string>;
  PublishedDate?: Field<string>;
  ReadTimeMinutes?: Field<string> | Field<number>;
  Tags?: Field<string>;
  RelatedArticles?: CmsListItem[] | Field<CmsListItem[]>;
};

type Props = ComponentProps & { fields?: Fields };

type RelatedPost = {
  key: string;
  href: string;
  title: string;
  lead: string;
  date: string;
  readTime: string;
  image: string;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Sitecore date fields arrive as ISO-8601 basic (20240213T000000Z); format without locale APIs to keep SSR and client identical. */
function formatArticleDate(value?: string): string {
  if (!value) return '';
  const match = /^(\d{4})-?(\d{2})-?(\d{2})/.exec(value);
  if (!match) return '';
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return '';
  return `${Number(day)} ${monthName} ${year}`;
}

/** Integer fields come back as numbers, so read the raw value rather than going through fieldText. */
function readTimeLabel(field?: { value?: string | number }): string {
  const raw = field?.value;
  if (raw === undefined || raw === null || raw === '') return '';
  const minutes = typeof raw === 'number' ? raw : Number(String(raw).trim());
  return Number.isFinite(minutes) && minutes > 0 ? `${minutes} minute read` : '';
}

function splitTags(value: string): string[] {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function relatedPostFromItem(item: CmsListItem): RelatedPost {
  const title = fieldText(
    item.fields?.Title as Field<string>,
    item.displayName || item.name || 'Article'
  );
  return {
    key: item.id || item.url || title,
    href: item.url || '#',
    title,
    lead: fieldText(item.fields?.Lead as Field<string>),
    date: formatArticleDate(fieldText(item.fields?.PublishedDate as Field<string>)),
    readTime: readTimeLabel(item.fields?.ReadTimeMinutes as Field<string>),
    image: imageSrc(item.fields?.HeroImage as ImageField, brotherImages.articleHero),
  };
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const merged: Fields = { ...routeFields, ...f };

  const article = findArticleByPath(router.asPath || '') || BROTHER_ARTICLES[0];

  const title = fieldText(merged.Title, article.heading);
  const lead = fieldText(merged.Lead, article.lead);
  const bodyHtml = fieldText(merged.Body, article.bodyHtml);
  const hero = imageSrc(merged.HeroImage, brotherImages[article.imageKey]);
  const ctaHref = linkHref(merged.CtaLink, article.ctaHref);
  const ctaLabel = linkText(merged.CtaLink, article.ctaLabel);

  const author = fieldText(merged.Author, article.author);
  const category = fieldText(merged.Category, article.category);
  const publishedDate = formatArticleDate(fieldText(merged.PublishedDate)) || article.publishedDate;
  const readTime =
    readTimeLabel(merged.ReadTimeMinutes) || `${article.readTimeMinutes} minute read`;
  const tagsValue = fieldText(merged.Tags);
  const tags = tagsValue ? splitTags(tagsValue) : article.tags;

  const cmsRelated = listItems(merged.RelatedArticles);
  const relatedPosts: RelatedPost[] =
    cmsRelated.length > 0
      ? cmsRelated.slice(0, 3).map(relatedPostFromItem)
      : article.relatedArticleSlugs
          .map((slug) => BROTHER_ARTICLES.find((a) => a.slug === slug))
          .filter((a): a is NonNullable<typeof a> => Boolean(a))
          .slice(0, 3)
          .map((a) => ({
            key: a.slug,
            href: a.href,
            title: a.heading,
            lead: a.description,
            date: a.publishedDate,
            readTime: `${a.readTimeMinutes} minute read`,
            image: brotherImages[a.imageKey],
          }));

  return (
    <article className="brother-article">
      <div className="brother-container">
        <div className="brother-article__hero">
          {merged.HeroImage?.value?.src || isEditing ? (
            <Image field={merged.HeroImage} />
          ) : (
            <img src={hero} alt="" />
          )}
        </div>
        <p className="brother-eyebrow">
          {merged.Eyebrow?.value || isEditing ? <Text field={merged.Eyebrow} /> : article.eyebrow}
        </p>
        {merged.Title?.value || isEditing ? (
          <Text field={merged.Title} tag="h1" />
        ) : (
          <h1>{title}</h1>
        )}
        <div className="brother-article__meta">
          {publishedDate ? <span>{publishedDate}</span> : null}
          {readTime ? <span>{readTime}</span> : null}
          {author ? (
            <span>
              Posted by <strong>{author}</strong>
            </span>
          ) : null}
          {category ? <span className="brother-article__category">{category}</span> : null}
        </div>
        {merged.Lead?.value || isEditing ? (
          <Text field={merged.Lead} tag="p" className="brother-article__lead" />
        ) : (
          <p className="brother-article__lead">{lead}</p>
        )}
        {merged.Body?.value || isEditing ? (
          <RichText field={merged.Body} className="brother-article__body" />
        ) : (
          <div className="brother-article__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        )}
        {tags.length > 0 ? (
          <ul className="brother-article__tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
        <div className="brother-article__cta">
          {merged.CtaLink && (merged.CtaLink.value?.href || isEditing) ? (
            <Link field={merged.CtaLink} className="brother-btn brother-btn-primary" />
          ) : (
            <a className="brother-btn brother-btn-primary" href={ctaHref}>
              {ctaLabel}
            </a>
          )}
        </div>
        {relatedPosts.length > 0 ? (
          <aside className="brother-article__related">
            <h2>Related posts</h2>
            <div className="brother-article__related-grid">
              {relatedPosts.map((post) => (
                <a className="brother-card" href={post.href} key={post.key}>
                  <img src={post.image} alt="" />
                  <div className="brother-card__body">
                    <h3>{post.title}</h3>
                    {post.date || post.readTime ? (
                      <p className="brother-card__meta">
                        {[post.date, post.readTime].filter(Boolean).join(' · ')}
                      </p>
                    ) : null}
                    {post.lead ? <p>{post.lead}</p> : null}
                  </div>
                </a>
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </article>
  );
};

export default Default;
