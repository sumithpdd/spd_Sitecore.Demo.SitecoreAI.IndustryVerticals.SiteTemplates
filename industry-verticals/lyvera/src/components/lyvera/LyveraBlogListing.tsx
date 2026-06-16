'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_BLOG_ARTICLES } from '@/lib/lyvera-blog-content';

export type LyveraBlogListingProps = ComponentProps;

/** Hardcoded blog search results matching lyveragroup.com/news-and-blog */
export const Default = (props: LyveraBlogListingProps): JSX.Element => {
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
};
