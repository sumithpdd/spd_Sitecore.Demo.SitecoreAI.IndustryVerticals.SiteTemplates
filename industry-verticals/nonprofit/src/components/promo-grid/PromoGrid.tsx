'use client';

import { JSX } from 'react';
import { Field, Image, Link, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE, IMG, PARTNERS, STORIES } from '@/lib/openhand-catalog';
import {
  asImageField,
  asItems,
  asLinkField,
  asTextField,
  fieldString,
  itemLabel,
  linkHref,
} from '@/lib/sitecore-fields';
import NextLink from 'next/link';

type Fields = {
  Heading?: Field<string>;
  Intro?: Field<string>;
  Promos?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

const FALLBACK_CARDS = [
  {
    href: ADVICE[0].href,
    title: ADVICE[0].title,
    text: ADVICE[0].summary,
    img: IMG.story2,
  },
  {
    href: PARTNERS[0].href,
    title: PARTNERS[0].name,
    text: PARTNERS[0].about,
    img: IMG.promo1,
  },
  {
    href: STORIES[0].href,
    title: STORIES[0].title,
    text: STORIES[0].excerpt,
    img: IMG.promo2,
  },
];

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const heading =
    fields.Heading?.value || 'UK crisis support and international emergency appeals, in one IA.';
  const intro = fields.Intro?.value || 'What we do';
  const selected = asItems(fields.Promos);

  return (
    <section className="oh-section" id={id}>
      <div className="oh-wrap">
        {(intro || isEditing) && (
          <p className="oh-kicker">
            {fields.Intro?.value || isEditing ? <Text field={fields.Intro} /> : intro}
          </p>
        )}
        <h2
          className="mb-8 font-serif text-3xl"
          style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}
        >
          {fields.Heading?.value || isEditing ? <Text field={fields.Heading} /> : heading}
        </h2>
        <div className="oh-grid oh-grid-3">
          {selected.length > 0
            ? selected.map((item, index) => {
                const image = asImageField(item.fields?.PromoImageOne);
                const imageSrc =
                  image && typeof image.value === 'object' && image.value
                    ? (image.value as { src?: string }).src
                    : '';
                const titleField = asTextField(item.fields?.PromoTitle);
                const title = fieldString(item.fields?.PromoTitle) || itemLabel(item);
                const link = asLinkField(item.fields?.PromoMoreInfo);
                const href = linkHref(item.fields?.PromoMoreInfo, item.url || '#');
                return (
                  <article key={item.id || title} className="oh-card">
                    {imageSrc || isEditing ? (
                      <Image field={image} className="oh-card__img" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={FALLBACK_CARDS[index % FALLBACK_CARDS.length].img} alt="" />
                    )}
                    <div className="oh-card__body">
                      <h3>{titleField ? <Text field={titleField} /> : title}</h3>
                      <div className="oh-muted text-sm">
                        <RichText field={item.fields?.PromoDescription as Field<string>} />
                      </div>
                      {link ? (
                        <Link field={link} className="oh-card__link" />
                      ) : (
                        <NextLink href={href}>{title}</NextLink>
                      )}
                    </div>
                  </article>
                );
              })
            : FALLBACK_CARDS.map((card) => (
                <NextLink key={card.href} href={card.href} className="oh-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.img} alt="" />
                  <div className="oh-card__body">
                    <h3>{card.title}</h3>
                    <p className="oh-muted text-sm">{card.text}</p>
                  </div>
                </NextLink>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
