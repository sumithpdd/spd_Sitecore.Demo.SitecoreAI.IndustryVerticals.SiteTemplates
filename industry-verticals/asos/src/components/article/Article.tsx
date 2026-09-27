'use client';

import { JSX } from 'react';
import {
  Image,
  ImageField,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { articleFromPath, STYLE_FEED } from '@/lib/style-articles';

type Fields = {
  Kicker?: TextField;
  Title?: TextField;
  Image?: ImageField;
  Body?: RichTextField;
  ShopLabel?: TextField;
  ShopHref?: TextField;
};

type Props = ComponentProps & { fields?: Fields; listingPath?: string };

function textOf(field?: TextField): string {
  return typeof field?.value === 'string' ? field.value.trim() : '';
}

function imageSrc(field?: ImageField): string {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const article = articleFromPath(routed.path);
  const fields = props.fields;
  const kicker = textOf(fields?.Kicker) || article?.kicker || 'The Style Feed';
  const title = textOf(fields?.Title) || article?.title || 'Style Feed';
  const shopLabel = textOf(fields?.ShopLabel) || article?.shopLabel || 'Shop the edit';
  const shopHref = textOf(fields?.ShopHref) || article?.shopHref || STYLE_FEED.discoverHref;
  const src = imageSrc(fields?.Image) || article?.image || '';
  const href = (path: string) => withMarket(path, market.code);

  return (
    <article className="asos-wrap asos-article" id={props.params?.RenderingIdentifier}>
      <p className="asos-article__crumbs">
        <Link href={href('/')}>Home</Link>
        {' / '}
        <Link href={href(STYLE_FEED.discoverHref)}>Style Feed</Link>
        {' / '}
        {title}
      </p>
      <p className="asos-article__kicker">
        {fields?.Kicker ? <Text field={fields.Kicker} /> : kicker}
      </p>
      <h1>{fields?.Title ? <Text field={fields.Title} /> : title}</h1>
      {article?.dropDate ? <p className="asos-article__date">{article.dropDate}</p> : null}
      {src ? (
        imageSrc(fields?.Image) ? (
          <Image field={fields?.Image} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
          <img src={src} alt="" />
        )
      ) : null}
      <div className="asos-article__body">
        <RichText field={fields?.Body?.value ? fields.Body : { value: article?.body || '' }} />
      </div>
      <Link className="asos-btn-dark" href={href(shopHref)}>
        {fields?.ShopLabel ? <Text field={fields.ShopLabel} /> : shopLabel}
      </Link>
    </article>
  );
};

export default Default;
