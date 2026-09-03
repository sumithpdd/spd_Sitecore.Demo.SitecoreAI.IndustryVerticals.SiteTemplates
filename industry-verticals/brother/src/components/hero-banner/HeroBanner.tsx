'use client';

import { JSX, useEffect, useState } from 'react';
import { Field, ImageField, LinkField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Description?: Field<string>;
  CtaLink?: LinkField;
  SecondaryCtaLink?: LinkField;
  Image?: ImageField;
  PromoTitle?: Field<string>;
  PromoDescription?: Field<string>;
  PromoCtaLink?: LinkField;
  PromoImage?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function imgSrc(field?: ImageField, fallback?: string): string {
  const src = (field?.value as { src?: string } | undefined)?.src;
  return src || fallback || '';
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const [intent, setIntent] = useState<BrotherIntent>('default');

  useEffect(() => {
    setIntent(resolveBrotherIntent());
  }, []);

  const isLabel = !isEditing && intent === 'label-printer';

  const eyebrow = isLabel
    ? 'Looking for a label printer?'
    : props.fields?.Eyebrow?.value || 'Brother for business & home';
  const title = isLabel
    ? props.fields?.PromoTitle?.value || 'VC-500W full colour label printer'
    : props.fields?.Title?.value || 'At home. At work. Brother.';
  const description = isLabel
    ? props.fields?.PromoDescription?.value ||
      'Print crisp full-colour labels with ZINK Zero Ink technology — from your PC, Mac, smartphone or tablet.'
    : props.fields?.Description?.value ||
      'Printers, scanners, labelling and receipts — solutions that keep your work moving.';
  const image = isLabel
    ? imgSrc(props.fields?.PromoImage, brotherImages.vc500w)
    : imgSrc(props.fields?.Image, brotherImages.homeHero);
  const primaryHref = isLabel
    ? '/labelling-and-receipts/vc-500w'
    : '/labelling-and-receipts/vc-500w';
  const primaryText = isLabel ? 'Explore VC-500W' : 'Discover labelling';
  const secondaryHref = isLabel
    ? '/devices/label-printer/vc/vc500w'
    : '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office';
  const secondaryText = isLabel ? 'Shop now' : 'Desk organisation tips';

  return (
    <section className="brother-hero">
      <div className="brother-hero__media" aria-hidden>
        <img src={image} alt="" />
      </div>
      <div className="brother-hero__shade" />
      <div className="brother-container brother-hero__content">
        <p className="brother-eyebrow" style={{ color: '#ffb4b8' }}>
          {eyebrow}
        </p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="brother-hero__ctas">
          <a className="brother-btn brother-btn-primary" href={primaryHref}>
            {primaryText}
          </a>
          <a className="brother-btn brother-btn-secondary" href={secondaryHref}>
            {secondaryText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Default;
