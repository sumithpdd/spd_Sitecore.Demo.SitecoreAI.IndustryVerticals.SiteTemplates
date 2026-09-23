'use client';

import { JSX, useMemo, useState } from 'react';
import { Image as ContentSdkImage, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { listedArticlesFromItems, resolverItems } from '@/lib/cms-listing';
import { InsightCard, insightsForSector } from '@/lib/industry-catalog';
import { OUTLAW_NEWS } from '@/lib/home-catalog';
import { matchesPreferredRegion, useDemoAuth } from '@/lib/demo-auth';
import { asImageField, asTextField, fieldString } from '@/lib/sitecore-fields';
import { useRouter } from 'next/router';
import Link from 'next/link';

function catalogTitle(sector: string): string {
  const cleaned = sector.replace(/-/g, ' ').trim();
  if (!cleaned || cleaned === 'perspectives' || cleaned === 'search') {
    return 'Financial Services and Energy';
  }
  return cleaned.replace(/\b\w/g, (char) => char.toUpperCase());
}

type Fields = {
  Heading?: unknown;
  Intro?: unknown;
  CtaText?: unknown;
  CtaHref?: unknown;
  Sector?: unknown;
  items?: unknown;
  Items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

type Variant = 'default' | 'home';

const PAGE_SIZE: Record<Variant, number> = {
  default: 2,
  home: 3,
};

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
    readTime: item.readTime,
  }));
}

function InsightsBand(props: Props & { variant: Variant }): JSX.Element {
  const { page } = useSitecore();
  const router = useRouter();
  const { preferences } = useDemoAuth();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const heading = asTextField(fields.Heading);
  const intro = asTextField(fields.Intro);
  const routeSlug = (router.asPath || '').split('?')[0].split('/').filter(Boolean).pop() || '';
  const sector = fieldString(fields.Sector) || routeSlug;
  const cmsCards = cardsFromCms(fields);
  const cards = (cmsCards.length > 0 ? cmsCards : insightsForSector(sector)).filter((card) => {
    const meta = OUTLAW_NEWS.find((item) => item.href === card.href);
    return matchesPreferredRegion(meta?.regions, preferences.region);
  });
  const pageSize = PAGE_SIZE[props.variant];
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, cards.length - pageSize);
  const visible = useMemo(() => cards.slice(index, index + pageSize), [cards, index, pageSize]);
  const isHome = props.variant === 'home';
  const ctaText = fieldString(fields.CtaText) || (isHome ? 'View all insights' : '');
  const ctaHref = fieldString(fields.CtaHref) || '/perspectives';
  const introFallback =
    'We connect vision to value through our bold insights, global perspectives and entrepreneurial approach.';

  if (cards.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section
      className={`pm-insights w-full ${isHome ? 'pm-insights--home' : ''} ${styles}`.trim()}
      id={id}
    >
      <div className="pm-wrap">
        <div className={isHome ? 'pm-insights__home-head' : 'pm-insights__grid'}>
          <div className="pm-insights__copy">
            <h2>
              {heading ? (
                <Text field={heading} />
              ) : isHome ? (
                'Perspectives'
              ) : (
                `Latest Capco insights on ${catalogTitle(sector)}`
              )}
            </h2>
            {isHome || fieldString(fields.Intro) ? (
              <p className="pm-insights__lede">{intro ? <Text field={intro} /> : introFallback}</p>
            ) : null}
            {ctaText ? (
              <p className="pm-insights__all">
                <Link href={ctaHref}>{ctaText}</Link>
              </p>
            ) : null}
            {isEditing && cmsCards.length === 0 ? (
              <p className="pm-insights__hint">
                Select Items (ArticlePages) to author this carousel.
              </p>
            ) : null}
          </div>
          <div className="pm-insights__cards">
            {visible.map((card) => {
              const broken = String(router.query.broken || '') === '1';
              const image = asImageField({
                value: { src: card.imageSrc, alt: broken ? '' : card.imageAlt || card.title },
              });
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
                      <p className="pm-insights__more">
                        <span>Read more</span>
                        {card.readTime ? <span>{card.readTime}</span> : null}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        {cards.length > pageSize ? (
          <div className="pm-insights__nav">
            <button
              type="button"
              aria-label="Previous insights"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - pageSize))}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next insights"
              disabled={index >= maxIndex}
              onClick={() => setIndex((value) => Math.min(maxIndex, value + pageSize))}
            >
              →
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export const Default = (props: Props): JSX.Element => <InsightsBand {...props} variant="default" />;

export const Home = (props: Props): JSX.Element => <InsightsBand {...props} variant="home" />;

export default Default;
