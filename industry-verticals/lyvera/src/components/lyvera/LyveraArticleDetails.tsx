'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  findBlogArticleByPath,
  LYVERA_BLOG_ARTICLES,
  type LyveraBlogArticle,
} from '@/lib/lyvera-blog-content';
import { getPublicItemPath } from '@/lib/lyvera-sites';
import { richTextFieldValue, textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraArticleFields {
  Title?: TextField;
  ShortDescription?: TextField;
  Content?: RichTextField;
  Image?: ImageField;
  PublishedDate?: Field<string>;
  ReadTime?: TextField;
  Category?: TextField;
  Author?: TextField;
}

export type LyveraArticleDetailsProps = ComponentProps & {
  fields?: LyveraArticleFields;
};

function articleFromFields(fields?: LyveraArticleFields): Partial<LyveraBlogArticle> | null {
  if (!fields || !textFieldValue(fields.Title)) return null;

  return {
    title: textFieldValue(fields.Title),
    excerpt: textFieldValue(fields.ShortDescription),
    content: richTextFieldValue(fields.Content),
    image: fields.Image?.value?.src,
    publishedDate: textFieldValue(fields.PublishedDate),
    readTime: textFieldValue(fields.ReadTime),
    category: textFieldValue(fields.Category),
    author: textFieldValue(fields.Author),
  };
}

function ShareButton(): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (!url) return;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // fall through
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button type="button" className="lyvera-article__share" onClick={() => void handleShare()}>
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}

/** Article detail layout with fallbacks from lyveragroup.com blog content */
export const Default = (props: LyveraArticleDetailsProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const publicPath = getPublicItemPath(page);
  const staticArticle = findBlogArticleByPath(publicPath);
  const cmsArticle = articleFromFields(props.fields);
  const article = { ...staticArticle, ...cmsArticle } as LyveraBlogArticle;
  const related = LYVERA_BLOG_ARTICLES.filter((item) => item.path !== article.path).slice(0, 2);

  useEffect(() => {
    if (typeof document !== 'undefined' && article.title) {
      document.title = `${article.title} | Lyvera`;
    }
  }, [article.title]);

  if (!article.title && !isEditing) {
    return <></>;
  }

  const formattedDate = article.publishedDate
    ? new Date(article.publishedDate).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <article className="component lyvera-article" id={id}>
      <div className="lyvera-article__hero">
        {article.image && <img src={article.image} alt="" className="lyvera-article__hero-image" />}
        <div className="lyvera-article__hero-overlay" />
        <div className="lyvera-article__hero-content">
          <p className="lyvera-article__eyebrow">
            Blog {formattedDate && <span> {formattedDate}</span>}
          </p>
          {isEditing && props.fields?.Title ? (
            <ContentSdkText field={props.fields.Title} tag="h1" className="lyvera-article__title" />
          ) : (
            <h1 className="lyvera-article__title">{article.title}</h1>
          )}
          <div className="lyvera-article__meta">
            <span>{article.category}</span>
            <span aria-hidden> · </span>
            <span>{article.readTime}</span>
            <span aria-hidden> · </span>
            <span>{article.author}</span>
          </div>
          <ShareButton />
        </div>
      </div>

      <div className="lyvera-article__body-wrap">
        {isEditing && props.fields?.Content ? (
          <ContentSdkRichText
            field={props.fields.Content}
            className="lyvera-article__body ck-content"
          />
        ) : (
          <div
            className="lyvera-article__body ck-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        )}
      </div>

      {related.length > 0 && (
        <section className="lyvera-article__related" aria-labelledby="lyvera-related-heading">
          <h2 id="lyvera-related-heading" className="lyvera-article__related-title">
            Related articles
          </h2>
          <div className="lyvera-blog-listing__grid">
            {related.map((item) => (
              <article key={item.path} className="lyvera-blog-card">
                <Link href={item.path} className="lyvera-blog-card__link">
                  <div className="lyvera-blog-card__media">
                    <img src={item.image} alt="" className="lyvera-blog-card__image" />
                  </div>
                  <div className="lyvera-blog-card__body">
                    <p className="lyvera-blog-card__meta">
                      <span>{item.category}</span>
                    </p>
                    <h3 className="lyvera-blog-card__title">{item.title}</h3>
                    <span className="lyvera-blog-card__cta">Read more</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
