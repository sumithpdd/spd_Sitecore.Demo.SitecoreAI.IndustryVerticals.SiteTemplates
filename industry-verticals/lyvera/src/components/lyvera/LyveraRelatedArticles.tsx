'use client';

import type { JSX } from 'react';
import Link from 'next/link';
import {
  Placeholder,
  TextField,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_BLOG_ARTICLES } from '@/lib/lyvera-blog-content';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { getPublicItemPath } from '@/lib/lyvera-sites';
import { textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraRelatedArticlesFields {
  SectionTitle?: TextField;
}

export type LyveraRelatedArticlesProps = ComponentProps & {
  fields?: LyveraRelatedArticlesFields;
};

function FallbackArticles({ excludePath }: { excludePath: string }): JSX.Element {
  const articles = LYVERA_BLOG_ARTICLES.filter((item) => item.path !== excludePath).slice(0, 2);

  return (
    <>
      {articles.map((article) => (
        <article key={article.path} className="lyvera-related-article">
          <Link href={article.path} className="lyvera-related-article__link">
            <div className="lyvera-related-article__media">
              <img src={article.image} alt="" className="lyvera-related-article__image" />
            </div>
            <div className="lyvera-related-article__body">
              <p className="lyvera-related-article__category">{article.category}</p>
              <h3 className="lyvera-related-article__title">{article.title}</h3>
              <span className="lyvera-related-article__cta">Read more</span>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}

export const Default = (props: LyveraRelatedArticlesProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params ?? {};
  const fields = props.fields ?? {};
  const articlesPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-related-articles-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsArticles = placeholderHasComponents(props.rendering, articlesPh);
  const useFallback = !hasCmsArticles && !isEditing;
  const sectionTitle = textFieldValue(fields.SectionTitle) || 'Related articles';

  return (
    <section
      className={[sharedComponentModifier(page, 'component lyvera-related-articles'), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
      aria-labelledby={id ? `${id}-title` : 'lyvera-related-articles-title'}
    >
      <div className="lyvera-related-articles__inner">
        {(sectionTitle || isEditing) &&
          (isEditing ? (
            <ContentSdkText
              field={fields.SectionTitle}
              tag="h2"
              className="lyvera-related-articles__title"
              id={id ? `${id}-title` : 'lyvera-related-articles-title'}
            />
          ) : (
            <h2
              className="lyvera-related-articles__title"
              id={id ? `${id}-title` : 'lyvera-related-articles-title'}
            >
              {sectionTitle}
            </h2>
          ))}
        <div className="lyvera-related-articles__grid">
          {(hasCmsArticles || isEditing) && (
            <Placeholder name={articlesPh} rendering={props.rendering} />
          )}
          {useFallback && <FallbackArticles excludePath={getPublicItemPath(page)} />}
        </div>
      </div>
    </section>
  );
};
