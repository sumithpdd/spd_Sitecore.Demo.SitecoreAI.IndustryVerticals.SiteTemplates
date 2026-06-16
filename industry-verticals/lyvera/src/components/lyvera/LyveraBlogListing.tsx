'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { KP_BLOG_ARTICLES, KP_BLOG_LISTING } from '@/lib/keith-prowse-blog-content';
import { isKeithProwseSite } from '@/lib/lyveragroup-site';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { LYVERA_BLOG_ARTICLES } from '@/lib/lyvera-blog-content';

export type LyveraBlogListingProps = ComponentProps;

function formatKpDate(iso: string): string {
  const date = new Date(iso);
  return date
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    .toUpperCase();
}

function KeithProwseBlogListing(props: LyveraBlogListingProps): JSX.Element {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();

  return (
    <section
      className={sharedComponentModifier(
        page,
        'component lyvera-blog-listing lyvera-blog-listing--kp'
      )}
      id={id}
    >
      <div className="lyvera-blog-listing__inner">
        <h2 className="lyvera-blog-listing__title">{KP_BLOG_LISTING.title}</h2>
        <div className="lyvera-blog-listing__grid">
          {KP_BLOG_ARTICLES.map((article) => (
            <article key={article.path} className="lyvera-blog-card lyvera-blog-card--kp">
              <Link href={article.path} className="lyvera-blog-card__link">
                <div className="lyvera-blog-card__media">
                  <img src={article.image} alt="" className="lyvera-blog-card__image" />
                </div>
                <div className="lyvera-blog-card__body">
                  <p className="lyvera-blog-card__meta">
                    <span className="lyvera-blog-card__category">{article.category}</span>
                  </p>
                  <h3 className="lyvera-blog-card__title">{article.title}</h3>
                  <time className="lyvera-blog-card__date" dateTime={article.publishedDate}>
                    {formatKpDate(article.publishedDate)}
                  </time>
                  <p className="lyvera-blog-card__excerpt">{article.excerpt}</p>
                  <span className="lyvera-blog-card__cta lyvera-kp-pill">
                    {KP_BLOG_LISTING.readArticleLabel}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <div className="lyvera-blog-listing__footer">
          <Link href={KP_BLOG_LISTING.viewAllHref} className="lyvera-kp-pill">
            {KP_BLOG_LISTING.viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

function LyveraCorporateBlogListing(props: LyveraBlogListingProps): JSX.Element {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  if (isEditing) {
    return (
      <section className="component lyvera-blog-listing" id={id}>
        <div className="lyvera-blog-listing__inner">
          <p>Lyvera Blog Listing — displays hardcoded articles on the live site.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="component lyvera-blog-listing" id={id}>
      <div className="lyvera-blog-listing__inner">
        <div className="lyvera-blog-listing__grid">
          {LYVERA_BLOG_ARTICLES.map((article) => (
            <article key={article.path} className="lyvera-blog-card">
              <Link href={article.path} className="lyvera-blog-card__link">
                <div className="lyvera-blog-card__media">
                  <img src={article.image} alt="" className="lyvera-blog-card__image" />
                </div>
                <div className="lyvera-blog-card__body">
                  <p className="lyvera-blog-card__meta">
                    <span>{article.category}</span>
                    <span aria-hidden> · </span>
                    <time dateTime={article.publishedDate}>
                      {new Date(article.publishedDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                  </p>
                  <h2 className="lyvera-blog-card__title">{article.title}</h2>
                  <p className="lyvera-blog-card__excerpt">{article.excerpt}</p>
                  <span className="lyvera-blog-card__cta">Read more · {article.readTime}</span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Default = (props: LyveraBlogListingProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  if (isEditing) {
    return (
      <section className="component lyvera-blog-listing" id={props.params?.RenderingIdentifier}>
        <div className="lyvera-blog-listing__inner">
          <p>Lyvera Blog Listing — Keith Prowse or corporate articles on the live site.</p>
        </div>
      </section>
    );
  }

  return isKeithProwseSite(page) ? (
    <KeithProwseBlogListing {...props} />
  ) : (
    <LyveraCorporateBlogListing {...props} />
  );
};
