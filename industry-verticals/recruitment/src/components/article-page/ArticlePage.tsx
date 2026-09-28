'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { ARTICLES, articleFromPath, articleHref, textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';

type Fields = {
  Title?: { value?: string };
  Kicker?: { value?: string };
  Author?: { value?: string };
  Date?: { value?: string };
  Summary?: { value?: string };
  Body?: { value?: string };
  Image?: { value?: { src?: string; alt?: string } };
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const article = articleFromPath(useRouter().asPath) || ARTICLES[0];
  const fields = props.fields;
  const photo = imageSrc(fields?.Image, article.image);
  return (
    <article className="aspire-page aspire-detail" id={props.params?.RenderingIdentifier}>
      <p className="aspire-kicker">{textValue(fields?.Kicker, article.kicker)}</p>
      <h1>{textValue(fields?.Title, article.title)}</h1>
      {photo ? <img className="aspire-photo" src={photo} alt="" /> : null}
      <p className="aspire-lead">
        {textValue(fields?.Date, article.date)} by {textValue(fields?.Author, article.author)}
      </p>
      <p>{textValue(fields?.Summary, article.summary)}</p>
      <p>{textValue(fields?.Body, article.body)}</p>
    </article>
  );
};

export const List = (props: Props): JSX.Element => (
  <section className="aspire-page" id={props.params?.RenderingIdentifier}>
    <h1>Latest blogs</h1>
    <ul className="aspire-articles">
      {ARTICLES.map((article) => (
        <li key={article.slug}>
          <p className="aspire-kicker">{article.kicker}</p>
          <h2>
            <Link href={articleHref(article)}>{article.title}</Link>
          </h2>
          {imageSrc(undefined, article.image) ? (
            <img className="aspire-photo" src={imageSrc(undefined, article.image)} alt="" />
          ) : null}
          <p>
            {article.date} by {article.author}
          </p>
          <p>{article.summary}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Default;
