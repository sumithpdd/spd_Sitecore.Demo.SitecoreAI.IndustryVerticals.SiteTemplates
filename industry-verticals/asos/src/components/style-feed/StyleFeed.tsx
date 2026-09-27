'use client';

import { JSX } from 'react';
import { Image, ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { STYLE_ARTICLES, STYLE_FEED, type StyleCard } from '@/lib/style-articles';

type Fields = {
  Heading?: TextField;
  Intro?: TextField;
  DiscoverHref?: TextField;
  ReadLabel?: TextField;
  ReadHref?: TextField;
  Card1Title?: TextField;
  Card1Href?: TextField;
  Card1Image?: ImageField;
  Card2Title?: TextField;
  Card2Href?: TextField;
  Card2Image?: ImageField;
  Card3Title?: TextField;
  Card3Href?: TextField;
  Card3Image?: ImageField;
  Card4Title?: TextField;
  Card4Href?: TextField;
  Card4Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function textOf(field?: TextField): string {
  return typeof field?.value === 'string' ? field.value.trim() : '';
}

function imageSrc(field?: ImageField): string {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
}

function cardsFrom(fields?: Fields): StyleCard[] {
  const slots = [1, 2, 3, 4] as const;
  const authored = slots.flatMap((slot) => {
    const title = textOf(fields?.[`Card${slot}Title`]);
    const href = textOf(fields?.[`Card${slot}Href`]);
    const image = imageSrc(fields?.[`Card${slot}Image`]);
    if (!title && !href && !image) return [];
    const fallback = STYLE_ARTICLES[slot - 1];
    return [
      {
        title: title || fallback?.title || '',
        href: href || fallback?.href || STYLE_FEED.discoverHref,
        image: image || fallback?.image || '',
      },
    ];
  });
  return authored.length ? authored : STYLE_ARTICLES;
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const fields = props.fields;
  const heading = textOf(fields?.Heading) || STYLE_FEED.heading;
  const intro = textOf(fields?.Intro) || STYLE_FEED.intro;
  const discoverHref = textOf(fields?.DiscoverHref) || STYLE_FEED.discoverHref;
  const readLabel = textOf(fields?.ReadLabel) || STYLE_FEED.readLabel;
  const readHref = textOf(fields?.ReadHref) || STYLE_FEED.readHref;
  const cards = cardsFrom(fields);
  const href = (path: string) => withMarket(path, market.code);

  return (
    <section className="asos-wrap asos-stylefeed" id={props.params?.RenderingIdentifier}>
      <div className="asos-stylefeed__head">
        <div>
          <h2>{fields?.Heading ? <Text field={fields.Heading} /> : heading}</h2>
          <p>
            <Link href={href(discoverHref)}>
              {fields?.Intro ? <Text field={fields.Intro} /> : intro}
            </Link>
          </p>
        </div>
        <Link className="asos-stylefeed__read" href={href(readHref)}>
          {fields?.ReadLabel ? <Text field={fields.ReadLabel} /> : readLabel}
        </Link>
      </div>
      <div className="asos-stylefeed__grid">
        {cards.map((card, index) => {
          const slot = (index + 1) as 1 | 2 | 3 | 4;
          const imageField = fields?.[`Card${slot}Image`];
          return (
            <article key={`${card.href}-${index}`}>
              <Link href={href(card.href)}>
                {imageSrc(imageField) ? (
                  <Image field={imageField} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
                  <img src={card.image} alt="" />
                )}
                <p>
                  {fields?.[`Card${slot}Title`] ? (
                    <Text field={fields[`Card${slot}Title`]} />
                  ) : (
                    card.title
                  )}
                </p>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Default;
