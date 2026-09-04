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
import { findProductBySlug, formatGbp } from 'lib/products-catalog';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Lead?: Field<string>;
  Body?: Field<string>;
  HeroImage?: ImageField;
  CtaLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

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

  const relatedProducts = article.relatedProductSlugs
    .map((slug) => findProductBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const relatedArticles = article.relatedArticleSlugs
    .map((slug) => BROTHER_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, 3);

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
        <p className="brother-article__description">{article.description}</p>
        <div className="brother-article__meta">
          <span>
            <strong>{article.author}</strong>
            {article.authorRole ? ` · ${article.authorRole}` : ''}
          </span>
          <span>{article.publishedDate}</span>
          <span>{article.readTimeMinutes} min read</span>
          <span className="brother-article__category">{article.category}</span>
        </div>
        {article.tags.length > 0 ? (
          <ul className="brother-article__tags">
            {article.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
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
        <div className="brother-article__cta">
          {merged.CtaLink && (merged.CtaLink.value?.href || isEditing) ? (
            <Link field={merged.CtaLink} className="brother-btn brother-btn-primary" />
          ) : (
            <a className="brother-btn brother-btn-primary" href={ctaHref}>
              {ctaLabel}
            </a>
          )}
        </div>
        {relatedProducts.length > 0 ? (
          <aside className="brother-article__related">
            <h2>Related products</h2>
            <div className="brother-listing__grid">
              {relatedProducts.map((p) => (
                <a className="brother-card" href={p.href} key={p.slug}>
                  <img src={brotherImages[p.imageKey]} alt="" />
                  <div className="brother-card__body">
                    <h3>{p.title}</h3>
                    <p>
                      {p.subtitle} · {formatGbp(p.priceGbp)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </aside>
        ) : null}
        {relatedArticles.length > 0 ? (
          <aside className="brother-article__related">
            <h2>More articles</h2>
            <ul className="brother-article__related-list">
              {relatedArticles.map((a) => (
                <li key={a.slug}>
                  <a href={a.href}>
                    <strong>{a.heading}</strong>
                    <span>{a.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </div>
    </article>
  );
};

export default Default;
