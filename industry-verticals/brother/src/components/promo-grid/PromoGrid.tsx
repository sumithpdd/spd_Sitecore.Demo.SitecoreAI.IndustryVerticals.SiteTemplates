'use client';

import { JSX, useEffect, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';
import { promoGridForIntent, type BrotherPromoCard } from 'lib/promo-catalog';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  Title?: Field<string>;
  CardOneHeading?: Field<string>;
  CardOneDescription?: Field<string>;
  CardOneImage?: ImageField;
  CardOneCta?: LinkField;
  CardTwoHeading?: Field<string>;
  CardTwoDescription?: Field<string>;
  CardTwoImage?: ImageField;
  CardTwoCta?: LinkField;
  CardThreeHeading?: Field<string>;
  CardThreeDescription?: Field<string>;
  CardThreeImage?: ImageField;
  CardThreeCta?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

type CardView = {
  headingField?: Field<string>;
  descriptionField?: Field<string>;
  imageField?: ImageField;
  ctaField?: LinkField;
  heading: string;
  description: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

function buildCard(
  fallback: BrotherPromoCard,
  heading?: Field<string>,
  description?: Field<string>,
  image?: ImageField,
  cta?: LinkField
): CardView {
  return {
    headingField: heading,
    descriptionField: description,
    imageField: image,
    ctaField: cta,
    heading: fieldText(heading, fallback.heading),
    description: fieldText(description, fallback.description),
    image: imageSrc(image, brotherImages[fallback.imageKey]),
    ctaLabel: linkText(cta, fallback.ctaLabel),
    ctaHref: linkHref(cta, fallback.ctaHref),
  };
}

/**
 * Promo grid — CMS datasource is personalizable; local fallbacks follow Jack/Izzy/Rick intent.
 * `columns` trims the card set (3 = default grid, 2 = paired resource promos).
 */
const PromoGridInner = (props: Props & { columns: 2 | 3 }): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const [intent, setIntent] = useState<BrotherIntent>('default');

  useEffect(() => {
    setIntent(resolveBrotherIntent(router.query as Record<string, string | string[] | undefined>));
  }, [router.query]);

  const grid = promoGridForIntent(intent);
  const intentDriven = !isEditing && intent !== 'default';
  const [cardOne, cardTwo, cardThree] = grid.cards;

  // UTM/persona drives local demo variants; default + Experience Editor use CMS datasource fields.
  const allCards: CardView[] = intentDriven
    ? [buildCard(cardOne), buildCard(cardTwo), buildCard(cardThree)]
    : [
        buildCard(cardOne, f.CardOneHeading, f.CardOneDescription, f.CardOneImage, f.CardOneCta),
        buildCard(cardTwo, f.CardTwoHeading, f.CardTwoDescription, f.CardTwoImage, f.CardTwoCta),
        buildCard(
          cardThree,
          f.CardThreeHeading,
          f.CardThreeDescription,
          f.CardThreeImage,
          f.CardThreeCta
        ),
      ];
  const cards = allCards.slice(0, props.columns);

  const sectionTitle = intentDriven ? grid.title || '' : fieldText(f.Title, grid.title || '');

  return (
    <section
      className="brother-promo-grid"
      data-promo-variant={grid.id}
      data-promo-columns={props.columns}
    >
      <div className="brother-container">
        {sectionTitle || isEditing ? (
          f.Title?.value || isEditing ? (
            <Text field={f.Title} tag="h2" className="brother-promo-grid__title" />
          ) : (
            <h2 className="brother-promo-grid__title">{sectionTitle}</h2>
          )
        ) : null}
        <div className="brother-promo-grid__cards">
          {cards.map((card) => (
            <article className="brother-promo-grid__card" key={card.heading}>
              <div className="brother-promo-grid__media">
                {card.imageField?.value?.src || isEditing ? (
                  <Image field={card.imageField} />
                ) : (
                  <img src={card.image} alt="" />
                )}
              </div>
              <div className="brother-promo-grid__body">
                {card.headingField?.value || isEditing ? (
                  <Text field={card.headingField} tag="h3" />
                ) : (
                  <h3>{card.heading}</h3>
                )}
                {card.descriptionField?.value || isEditing ? (
                  <Text field={card.descriptionField} tag="p" />
                ) : (
                  <p>{card.description}</p>
                )}
                {card.ctaField && (card.ctaField.value?.href || isEditing) ? (
                  <Link field={card.ctaField} className="brother-btn brother-btn-primary" />
                ) : (
                  <a className="brother-btn brother-btn-primary" href={card.ctaHref}>
                    {card.ctaLabel}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

/** Three-up promo grid (home, hubs). */
export const Default = (props: Props): JSX.Element => <PromoGridInner {...props} columns={3} />;

/** Paired promo cards — used for MPS resource/calculator signposts. */
export const TwoColumn = (props: Props): JSX.Element => <PromoGridInner {...props} columns={2} />;

export default Default;
