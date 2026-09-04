'use client';

import { JSX, useEffect, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

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
  useCmsPrimary: boolean;
  useCmsSecondary: boolean;
};

function copyForIntent(
  intent: BrotherIntent,
  fields: Fields | undefined,
  isEditing: boolean
): HeroCopy {
  const f = fields || {};
  const cmsPrimary = Boolean(f.CtaLink?.value?.href);
  const cmsSecondary = Boolean(f.SecondaryCtaLink?.value?.href);

  if (isEditing || intent === 'default') {
    return {
      eyebrow: fieldText(f.Eyebrow, 'Brother for business & home'),
      title: fieldText(f.Title, 'At your side. At home. At work.'),
      description: fieldText(
        f.Description,
        'Printers, scanners, labelling and supplies — governed content to OrderCloud commerce.'
      ),
      image: imageSrc(f.Image, brotherImages.homeHero),
      primaryHref: linkHref(f.CtaLink, '/printers?utm_campaign=home-printer&persona=jack'),
      primaryText: linkText(f.CtaLink, 'Explore printers'),
      secondaryHref: linkHref(
        f.SecondaryCtaLink,
        '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy'
      ),
      secondaryText: linkText(f.SecondaryCtaLink, 'At your side campaign'),
      useCmsPrimary: cmsPrimary || isEditing,
      useCmsSecondary: cmsSecondary || isEditing,
    };
  }

  if (intent === 'label-printer') {
    return {
      eyebrow: 'Looking for a label printer?',
      title: fieldText(f.PromoTitle, 'VC-500W full colour label printer'),
      description: fieldText(
        f.PromoDescription,
        'Print crisp full-colour labels with ZINK Zero Ink — from PC, Mac or phone.'
      ),
      image: imageSrc(f.PromoImage, brotherImages.vc500w),
      primaryHref: linkHref(f.PromoCtaLink, '/labelling-and-receipts/vc-500w'),
      primaryText: linkText(f.PromoCtaLink, 'Explore VC-500W'),
      secondaryHref: '/devices/label-printer/vc/vc500w',
      secondaryText: 'Shop now',
      useCmsPrimary: Boolean(f.PromoCtaLink?.value?.href),
      useCmsSecondary: false,
    };
  }

  if (intent === 'home-printer') {
    return {
      eyebrow: 'Jack · home office search',
      title: 'Home laser printers ready when you are',
      description:
        'From SERP to personalised printers — shortlist colour and mono models, then reorder toner on OrderCloud.',
      image: imageSrc(f.Image, brotherImages.printerHero),
      primaryHref: '/printers?utm_campaign=home-printer&persona=jack',
      primaryText: 'Browse printers',
      secondaryHref: '/devices/printers/hl/hl-l2460dn',
      secondaryText: 'HL-L2460DN mono laser',
      useCmsPrimary: false,
      useCmsSecondary: false,
    };
  }

  if (intent === 'at-your-side') {
    return {
      eyebrow: 'Izzy · At your side pack',
      title: 'One brief. Web, email, paid social.',
      description:
        'SitecoreAI Signal → Content Hub–approved assets → multi-channel campaign without tool sprawl.',
      image: imageSrc(f.PromoImage, brotherImages.vc500wLaptop),
      primaryHref: '/campaigns/at-your-side',
      primaryText: 'Open campaign landing',
      secondaryHref: '/labelling-and-receipts',
      secondaryText: 'Labelling products',
      useCmsPrimary: false,
      useCmsSecondary: false,
    };
  }

  if (intent === 'return-visit') {
    return {
      eyebrow: 'Welcome back',
      title: 'Continue where you left off — printers & supplies',
      description:
        'Behaviour signals (printer interest + return visit) surface the right model and an ink reminder.',
      image: imageSrc(f.Image, brotherImages.homeHero),
      primaryHref: '/printers?utm_campaign=return-visit&persona=jack',
      primaryText: 'Your shortlist',
      secondaryHref: '/supplies?utm_campaign=supplies-reorder&persona=jack',
      secondaryText: 'Ink & toner reminder',
      useCmsPrimary: false,
      useCmsSecondary: false,
    };
  }

  return {
    eyebrow: 'Rick · OrderCloud supplies',
    title: 'Genuine Brother supplies — attach & reorder',
    description:
      'PCM metadata stays the source of truth. Jack reorders toner matched to his printer; Rick measures attach rate.',
    image: imageSrc(f.Image, brotherImages.suppliesHero),
    primaryHref: '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
    primaryText: 'Open supplies',
    secondaryHref: '/checkout/supplies?utm_campaign=ordercloud-checkout',
    secondaryText: 'Demo checkout',
    useCmsPrimary: false,
    useCmsSecondary: false,
  };
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const [intent, setIntent] = useState<BrotherIntent>('default');

  useEffect(() => {
    setIntent(resolveBrotherIntent());
  }, []);

  const f = props.fields || {};
  const copy = copyForIntent(intent, f, isEditing);
  const showCmsFields = isEditing || intent === 'default';

  return (
    <section className="brother-hero">
      <div className="brother-hero__media" aria-hidden>
        <img src={copy.image} alt="" />
      </div>
      <div className="brother-hero__shade" />
      <div className="brother-container brother-hero__content">
        <p className="brother-eyebrow" style={{ color: '#ffb4b8' }}>
          {showCmsFields && (f.Eyebrow?.value || isEditing) ? (
            <Text field={f.Eyebrow} />
          ) : (
            copy.eyebrow
          )}
        </p>
        {showCmsFields && (f.Title?.value || isEditing) ? (
          <Text field={f.Title} tag="h1" />
        ) : (
          <h1>{copy.title}</h1>
        )}
        {showCmsFields && (f.Description?.value || isEditing) ? (
          <RichText field={f.Description} />
        ) : (
          <p>{copy.description}</p>
        )}
        <div className="brother-hero__ctas">
          {copy.useCmsPrimary && f.CtaLink ? (
            <Link field={f.CtaLink} className="brother-btn brother-btn-primary" />
          ) : (
            <a className="brother-btn brother-btn-primary" href={copy.primaryHref}>
              {copy.primaryText}
            </a>
          )}
          {copy.useCmsSecondary && f.SecondaryCtaLink ? (
            <Link field={f.SecondaryCtaLink} className="brother-btn brother-btn-secondary" />
          ) : (
            <a className="brother-btn brother-btn-secondary" href={copy.secondaryHref}>
              {copy.secondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Default;
