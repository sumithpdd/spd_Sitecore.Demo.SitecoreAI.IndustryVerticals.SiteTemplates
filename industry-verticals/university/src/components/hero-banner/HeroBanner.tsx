'use client';

import { JSX, useEffect, useState } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';
import { CmsImage } from 'lib/CmsImage';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';
import { resolveReadingIntent, type ReadingIntent } from 'lib/reading-intent';

interface Fields {
  Image?: ImageField;
  Title?: Field<string>;
  Eyebrow?: Field<string>;
  Description?: Field<string>;
  CtaLink?: LinkField;
  SecondaryCtaLink?: LinkField;
}

type HeroBannerProps = ComponentProps & { fields: Fields };

export const Default = (props: HeroBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [intent, setIntent] = useState<ReadingIntent>('default');
  const id = params?.RenderingIdentifier;

  useEffect(() => {
    setIntent(resolveReadingIntent());
  }, []);

  const isManifesto = !isEditing && intent === 'we-are-essex';
  const fallbackHero = isManifesto ? demoImages.heroCentenary : demoImages.heroClearing;

  const eyebrow = isManifesto ? 'We Are Essex' : fields?.Eyebrow?.value || 'Clearing Fast Track';
  const title = isManifesto
    ? 'Where change happens'
    : fields?.Title?.value || 'Don’t wait for results day · Call 01206 873666';

  const primary = linkOrFallback(fields?.CtaLink, 'Apply now', '/clearing', isEditing);
  const secondary = linkOrFallback(
    fields?.SecondaryCtaLink,
    'How to apply',
    '/clearing/how-to-apply',
    isEditing
  );

  return (
    <section
      className={clsx(
        'component hero-banner relative min-h-[70vh] w-full overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[78vh]',
        params?.styles
      )}
      id={id}
    >
      <CmsImage
        field={fields?.Image}
        fallbackSrc={fallbackHero}
        alt={fields?.Title?.value || 'University of Essex'}
        className="promo-media__image"
        imgClassName="absolute inset-0 h-full w-full object-cover object-center"
        width={1440}
        height={900}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/35 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col items-end justify-end px-4 py-12 text-right md:min-h-[78vh] md:px-8 md:py-16">
        <h1 className="max-w-3xl text-4xl leading-tight font-bold text-white md:text-6xl">
          {isEditing ? (
            <>
              <span className="reading-eyebrow text-2xl md:text-4xl">
                <ContentSdkText field={asText(fields?.Eyebrow)} />
              </span>
              <span className="mt-3 block">
                <span className="reading-strapline text-xl md:text-3xl">
                  <ContentSdkText field={asText(fields?.Title)} />
                </span>
              </span>
            </>
          ) : (
            <>
              <span className="reading-eyebrow text-2xl md:text-4xl">{eyebrow}</span>
              <span className="mt-3 block">
                <span className="reading-strapline text-xl md:text-3xl">{title}</span>
              </span>
            </>
          )}
        </h1>
        {(hasText(fields?.Description) || isEditing) && (
          <div className="mt-6 ml-auto max-w-xl text-base text-white/90 md:text-lg">
            <ContentSdkRichText field={fields?.Description} />
          </div>
        )}
        {!isEditing && !hasText(fields?.Description) && (
          <p className="mt-6 ml-auto max-w-xl text-base text-white/90 md:text-lg">
            {isManifesto
              ? 'University your way. Rebels with a cause. Join a top-12 UK university (Guardian University Guide 2026).'
              : 'Apply now, with or without your results. Essex reviews as soon as grades land — hotline 8am–8pm, Clearing Open Day 15 August.'}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <ContentSdkLink field={primary} className="reading-btn reading-btn-primary" />
          <ContentSdkLink field={secondary} className="reading-btn reading-btn-secondary" />
        </div>
      </div>
    </section>
  );
};
