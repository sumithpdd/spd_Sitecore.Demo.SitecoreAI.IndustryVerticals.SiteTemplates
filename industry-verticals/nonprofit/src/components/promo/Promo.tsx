'use client';

import React, { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { IMG } from '@/lib/openhand-catalog';
import { OhMedia } from '@/lib/OhMedia';

interface Fields {
  PromoImageOne: ImageField;
  PromoImageTwo: ImageField;
  PromoImageThree: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields?: Fields;
};

const promoMedia = (field: ImageField, fallback: string): JSX.Element => (
  <OhMedia field={field} fallback={fallback} className="oh-promo__image" alt="" />
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const isPromoReversed = !isParamEnabled(props.params?.Reversed) ? '' : 'order-last';
  const sxaStyles = `${props.params?.styles || ''}`;

  if (!props.fields) {
    return (
      <section className={`oh-promo ${sxaStyles} py-20`} id={id ? id : undefined}>
        [PROMO]
      </section>
    );
  }

  const fields = props.fields;

  return (
    <section className={`oh-promo ${sxaStyles} py-20`} id={id ? id : undefined}>
      <div className="oh-wrap grid grid-cols-1 place-items-center gap-10 lg:grid-cols-2">
        <div className={`${isPromoReversed} relative w-full`}>
          <div className="relative z-10 aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl">
            {promoMedia(fields.PromoImageOne, IMG.promo1)}
          </div>
        </div>
        <div className="space-y-5">
          <div className="oh-kicker">
            <Text field={fields.PromoSubTitle} />
          </div>
          <h2 className="inline-block max-w-md font-serif text-3xl">
            <Text field={fields.PromoTitle} />
          </h2>
          <div className="max-w-lg text-lg">
            <ContentSdkRichText field={fields.PromoDescription} />
          </div>
          <Link field={fields.PromoMoreInfo} className="oh-btn oh-btn--amber" />
        </div>
      </div>
    </section>
  );
};

export const ImageLeft = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  if (!props.fields) {
    return (
      <section className={`oh-promo oh-promo--split ${sxaStyles}`} id={id ? id : undefined}>
        [PROMO]
      </section>
    );
  }

  const fields = props.fields;

  return (
    <section className={`oh-promo oh-promo--split ${sxaStyles}`} id={id ? id : undefined}>
      <div className="oh-wrap grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="oh-promo__media">{promoMedia(fields.PromoImageOne, IMG.promo1)}</div>
        <div className="oh-promo__copy">
          <p className="oh-kicker">
            <Text field={fields.PromoSubTitle} />
          </p>
          <h2>
            <Text field={fields.PromoTitle} />
          </h2>
          <div className="oh-promo__body">
            <ContentSdkRichText field={fields.PromoDescription} />
          </div>
          <Link field={fields.PromoMoreInfo} className="oh-btn oh-btn--outline" />
        </div>
      </div>
    </section>
  );
};

export const ImageRight = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  if (!props.fields) {
    return (
      <section className={`oh-promo oh-promo--split ${sxaStyles}`} id={id ? id : undefined}>
        [PROMO]
      </section>
    );
  }

  const fields = props.fields;

  return (
    <section className={`oh-promo oh-promo--split ${sxaStyles}`} id={id ? id : undefined}>
      <div className="oh-wrap grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="oh-promo__copy">
          <p className="oh-kicker">
            <Text field={fields.PromoSubTitle} />
          </p>
          <h2>
            <Text field={fields.PromoTitle} />
          </h2>
          <div className="oh-promo__body">
            <ContentSdkRichText field={fields.PromoDescription} />
          </div>
          <Link field={fields.PromoMoreInfo} className="oh-btn oh-btn--outline" />
        </div>
        <div className="oh-promo__media">{promoMedia(fields.PromoImageOne, IMG.promo2)}</div>
      </div>
    </section>
  );
};

export const Newsletter = (props: PromoProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  if (!props.fields) {
    return (
      <section className={`oh-newsletter ${sxaStyles}`} id={id ? id : undefined}>
        [NEWSLETTER]
      </section>
    );
  }

  const fields = props.fields;

  return (
    <section className={`oh-newsletter ${sxaStyles}`} id={id ? id : undefined}>
      <div
        id="newsletter"
        className="oh-wrap grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="oh-kicker oh-kicker--light">
            <Text field={fields.PromoSubTitle} />
          </p>
          <h2 className="oh-newsletter__title">
            <Text field={fields.PromoTitle} />
          </h2>
          <div className="oh-newsletter__body">
            <ContentSdkRichText field={fields.PromoDescription} />
          </div>
          <Link field={fields.PromoMoreInfo} className="oh-btn oh-btn--amber" />
        </div>
        <div className="oh-newsletter__media">{promoMedia(fields.PromoImageOne, IMG.promo3)}</div>
      </div>
    </section>
  );
};

export default Default;
