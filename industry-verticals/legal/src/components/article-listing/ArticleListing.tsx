'use client';

import { JSX, useMemo, useState } from 'react';
import { Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { listedArticlesFromItems, resolverItems, taxonomyLabels } from '@/lib/cms-listing';
import { asTextField, fieldString } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Props = ComponentProps & {
  fields?: {
    items?: unknown;
    Title?: TextField;
    Heading?: unknown;
  };
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: TextField;
    Tags?: unknown;
    Categories?: unknown;
  };
  const id = props.params?.RenderingIdentifier;
  const articles = listedArticlesFromItems(resolverItems(props.fields), '/out-law/news');
  const heading = asTextField(props.fields?.Heading) || routeFields.Title;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(articles.flatMap((item) => item.categories))).sort(),
    [articles]
  );
  const tags = useMemo(
    () => Array.from(new Set(articles.flatMap((item) => item.tags))).sort(),
    [articles]
  );

  const filtered = articles.filter((item) => {
    if (activeCategory && !item.categories.includes(activeCategory)) {
      return false;
    }
    if (activeTag && !item.tags.includes(activeTag)) {
      return false;
    }
    return true;
  });

  if (articles.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-article-listing" id={id}>
      <div className="pm-wrap py-16">
        <h1 className="pm-people__title">
          {heading ? <Text field={heading} /> : 'Latest articles'}
        </h1>
        {!fieldString(heading) && isEditing ? <p>[ARTICLE LISTING]</p> : null}

        {categories.length > 0 && (
          <div className="pm-article-listing__filters">
            <p className="pm-section-kicker">Categories</p>
            <ul>
              <li>
                <button
                  type="button"
                  className={!activeCategory ? 'is-active' : undefined}
                  onClick={() => setActiveCategory(null)}
                >
                  All
                </button>
              </li>
              {categories.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    className={activeCategory === name ? 'is-active' : undefined}
                    onClick={() => setActiveCategory(name)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tags.length > 0 && (
          <div className="pm-article-listing__filters">
            <p className="pm-section-kicker">Tags</p>
            <ul>
              <li>
                <button
                  type="button"
                  className={!activeTag ? 'is-active' : undefined}
                  onClick={() => setActiveTag(null)}
                >
                  All
                </button>
              </li>
              {tags.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    className={activeTag === name ? 'is-active' : undefined}
                    onClick={() => setActiveTag(name)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="pm-people__count">
          {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
        </p>

        <ul className="pm-press__cards">
          {filtered.map((item) => (
            <li key={item.id}>
              <Link className="pm-press__card" href={item.url}>
                {item.kicker ? <span className="pm-outlaw__kicker">{item.kicker}</span> : null}
                {item.date ? <time>{item.date}</time> : null}
                <span className="pm-press__title">{item.title}</span>
                {item.summary ? <span className="pm-press__meta">{item.summary}</span> : null}
                {item.tags.length > 0 ? (
                  <span className="pm-article__tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="pm-people__empty">No articles match those filters.</p>
        )}
        {isEditing && taxonomyLabels(routeFields.Tags).length === 0 && articles.length === 0 ? (
          <p>
            Add ArticlePage items under this folder. Authors can multi-select tags and categories on
            each article.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
