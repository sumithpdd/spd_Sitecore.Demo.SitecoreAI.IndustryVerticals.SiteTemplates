'use client';

import { JSX, useMemo, useState } from 'react';
import { Image as ContentSdkImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { listedArticlesFromItems, resolverItems } from '@/lib/cms-listing';
import { InsightCard, insightsForSector } from '@/lib/industry-catalog';

function catalogTitle(sector: string): string {
  const cleaned = sector.replace(/-/g, ' ').trim();
  if (!cleaned || cleaned === 'perspectives' || cleaned === 'search') {
    return 'Financial Services and Energy';
  }
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}
import { asImageField, asTextField, fieldString } from '@/lib/sitecore-fields';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Fields = {
  Heading?: unknown;
  Sector?: unknown;
  items?: unknown;
  Items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

const PAGE_SIZE = 2;

function cardsFromCms(fields?: Fields): InsightCard[] {
  return listedArticlesFromItems(resolverItems(fields), '/perspectives').map((item) => ({
    href: item.url,
    title: item.title,
    kicker: item.kicker || item.sectors[0] || 'Perspective',
    date: item.date,
    authors: item.authors.join(', '),
    imageSrc: item.imageSrc,
    imageAlt: item.title,
    sector: item.sectors[0] || '',
  }));
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const heading = asTextField(fields.Heading);
  const routeSlug = (router.asPath || '').split('?')[0].split('/').filter(Boolean).pop() || '';
  const sector = fieldString(fields.Sector) || routeSlug;
  const cmsCards = cardsFromCms(fields);
  const cards = cmsCards.length > 0 ? cmsCards : insightsForSector(sector);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, cards.length - PAGE_SIZE);
  const visible = useMemo(() => cards.slice(index, index + PAGE_SIZE), [cards, index]);

  if (cards.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section className={`pm-insights w-full ${styles}`.trim()} id={id}>
      <div className="pm-wrap">
        <div className="pm-insights__grid">
          <div className="pm-insights__copy">
            <h2>
              {heading ? (
                <Text field={heading} />
              ) : (
                `Latest Capco insights on ${catalogTitle(sector)}`
              )}
            </h2>
            {isEditing && cmsCards.length === 0 ? (
              <p className="pm-insights__hint">
                Select Items (ArticlePages) to author this carousel.
              </p>
            ) : null}
          </div>
          <div className="pm-insights__cards">
            {visible.map((card) => {
              const image = asImageField({ value: { src: card.imageSrc, alt: card.imageAlt } });
              return (
                <article className="pm-insights__card" key={card.href + card.title}>
                  <Link className="pm-insights__card-link" href={card.href}>
                    <div className="pm-insights__media">
                      {card.imageSrc ? (
                        <ContentSdkImage field={image} className="pm-insights__image" />
                      ) : (
                        <div className="pm-insights__image pm-insights__image--empty" />
                      )}
                    </div>
                    <div className="pm-insights__body">
                      <p className="pm-insights__meta">
                        <span>{card.kicker}</span>
                        {card.date ? <time>{card.date}</time> : null}
                      </p>
                      <h3>{card.title}</h3>
                      {card.authors ? (
                        <p className="pm-insights__author">Author: {card.authors}</p>
                      ) : null}
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        {cards.length > PAGE_SIZE ? (
          <div className="pm-insights__nav">
            <button
              type="button"
              aria-label="Previous insights"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - PAGE_SIZE))}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next insights"
              disabled={index >= maxIndex}
              onClick={() => setIndex((value) => Math.min(maxIndex, value + PAGE_SIZE))}
            >
              →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
