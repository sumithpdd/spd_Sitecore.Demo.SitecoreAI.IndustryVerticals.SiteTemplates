'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { ARTICLES, articleFromPath, articleHref, textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';
import { EditableImage, EditableText, useMergedFields } from '@/lib/aspire-fields';

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
  const fields = useMergedFields(props.fields);
  const photo = imageSrc(fields?.Image, article.image);
  const date = textValue(fields?.Date, article.date);
  const author = textValue(fields?.Author, article.author);

  return (
    <article className="aspire-page aspire-detail" id={props.params?.RenderingIdentifier}>
      <EditableText
        field={fields?.Kicker}
        fallback={article.kicker}
        tag="p"
        className="aspire-kicker"
      />
      <EditableText field={fields?.Title} fallback={article.title} tag="h1" />
      <EditableImage field={fields?.Image} fallbackSrc={photo} className="aspire-photo" />
      <p className="aspire-lead">
        <EditableText field={fields?.Date} fallback={date} /> by{' '}
        <EditableText field={fields?.Author} fallback={author} />
      </p>
      <EditableText field={fields?.Summary} fallback={article.summary} tag="p" />
      <EditableText field={fields?.Body} fallback={article.body} tag="p" />
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
