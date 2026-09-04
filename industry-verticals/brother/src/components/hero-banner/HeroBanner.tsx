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

type HeroCopy = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  primaryHref: string;
  primaryText: string;
  secondaryHref: string;
  secondaryText: string;
};

function imgSrc(field?: ImageField, fallback?: string): string {
  const src = (field?.value as { src?: string } | undefined)?.src;
  return src || fallback || '';
}

function copyForIntent(
  intent: BrotherIntent,
  fields: Fields | undefined,
  isEditing: boolean
): HeroCopy {
  const f = fields || {};
  if (isEditing || intent === 'default') {
    return {
      eyebrow: f.Eyebrow?.value || 'Brother for business & home',
      title: f.Title?.value || 'At your side. At home. At work.',
      description:
        f.Description?.value ||
        'Printers, scanners, labelling and supplies — governed content to OrderCloud commerce.',
      image: imgSrc(f.Image, brotherImages.homeHero),
      primaryHref: '/printers?utm_campaign=home-printer&persona=jack',
      primaryText: 'Explore printers',
      secondaryHref: '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy',
      secondaryText: 'At your side campaign',
    };
  }

  if (intent === 'label-printer') {
    return {
      eyebrow: 'Looking for a label printer?',
      title: f.PromoTitle?.value || 'VC-500W full colour label printer',
      description:
        f.PromoDescription?.value ||
        'Print crisp full-colour labels with ZINK Zero Ink — from PC, Mac or phone.',
      image: imgSrc(f.PromoImage, brotherImages.vc500w),
      primaryHref: '/labelling-and-receipts/vc-500w',
      primaryText: 'Explore VC-500W',
      secondaryHref: '/devices/label-printer/vc/vc500w',
      secondaryText: 'Shop now',
    };
  }

  if (intent === 'home-printer') {
    return {
      eyebrow: 'Jack · home office search',
      title: 'Home laser printers ready when you are',
      description:
        'From SERP to personalised printers — shortlist colour and mono models, then reorder toner on OrderCloud.',
      image: imgSrc(f.Image, brotherImages.printerHero),
      primaryHref: '/printers?utm_campaign=home-printer&persona=jack',
      primaryText: 'Browse printers',
      secondaryHref: '/devices/printers/hl/hl-l2460dn',
      secondaryText: 'HL-L2460DN mono laser',
    };
  }

  if (intent === 'at-your-side') {
    return {
      eyebrow: 'Izzy · At your side pack',
      title: 'One brief. Web, email, paid social.',
      description:
        'SitecoreAI Signal → Content Hub–approved assets → multi-channel campaign without tool sprawl.',
      image: imgSrc(f.PromoImage, brotherImages.vc500wLaptop),
      primaryHref: '/campaigns/at-your-side',
      primaryText: 'Open campaign landing',
      secondaryHref: '/labelling-and-receipts',
      secondaryText: 'Labelling products',
    };
  }

  if (intent === 'return-visit') {
    return {
      eyebrow: 'Welcome back',
      title: 'Continue where you left off — printers & supplies',
      description:
        'Behaviour signals (printer interest + return visit) surface the right model and an ink reminder.',
      image: imgSrc(f.Image, brotherImages.homeHero),
      primaryHref: '/printers?utm_campaign=return-visit&persona=jack',
      primaryText: 'Your shortlist',
      secondaryHref: '/supplies?utm_campaign=supplies-reorder&persona=jack',
      secondaryText: 'Ink & toner reminder',
    };
  }

  // supplies
  return {
    eyebrow: 'Rick · OrderCloud supplies',
    title: 'Genuine Brother supplies — attach & reorder',
    description:
      'PCM metadata stays the source of truth. Jack reorders toner matched to his printer; Rick measures attach rate.',
    image: imgSrc(f.Image, brotherImages.suppliesHero),
    primaryHref: '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
    primaryText: 'Open supplies',
    secondaryHref: '/checkout/supplies?utm_campaign=ordercloud-checkout',
    secondaryText: 'Demo checkout',
  };
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const [intent, setIntent] = useState<BrotherIntent>('default');

  useEffect(() => {
    setIntent(resolveBrotherIntent());
  }, []);

  const copy = copyForIntent(intent, props.fields, Boolean(isEditing));

  return (
    <section className="brother-hero">
      <div className="brother-hero__media" aria-hidden>
        <img src={copy.image} alt="" />
      </div>
      <div className="brother-hero__shade" />
      <div className="brother-container brother-hero__content">
        <p className="brother-eyebrow" style={{ color: '#ffb4b8' }}>
          {copy.eyebrow}
        </p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <div className="brother-hero__ctas">
          <a className="brother-btn brother-btn-primary" href={copy.primaryHref}>
            {copy.primaryText}
          </a>
          <a className="brother-btn brother-btn-secondary" href={copy.secondaryHref}>
            {copy.secondaryText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Default;
