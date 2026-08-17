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
import { demoImages, withDemoImage } from 'lib/demo-images';
import { ResolvedImage } from 'lib/ResolvedImage';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';
import { getReadingIntent, type ReadingIntent } from 'lib/reading-intent';

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
    setIntent(getReadingIntent());
  }, []);

  const isCentenary = !isEditing && intent === 'centenary';
  const image = withDemoImage(
    fields?.Image,
    isCentenary ? demoImages.heroCentenary : demoImages.heroClearing,
    fields?.Title?.value || 'University'
  );

  const eyebrow = isCentenary ? 'Centenary 2026' : fields?.Eyebrow?.value || 'Clearing 2026';
  const title = isCentenary
    ? 'Celebrating 100 years of the University'
    : fields?.Title?.value || 'Apply now · Call +44 (0) 118 402 0900';

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
      <ResolvedImage
        field={image}
        className="absolute inset-0 h-full w-full object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 py-12 md:min-h-[78vh] md:px-8 md:py-16">
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
          <div className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
            <ContentSdkRichText field={fields?.Description} />
          </div>
        )}
        {!isEditing && !hasText(fields?.Description) && (
          <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
            {isCentenary
              ? 'Join us as we mark a century of teaching, research, and campus life.'
              : 'Places are still available. Explore courses, talk to our hotline, and apply online.'}
          </p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <ContentSdkLink field={primary} className="reading-btn reading-btn-primary" />
          <ContentSdkLink field={secondary} className="reading-btn reading-btn-secondary" />
        </div>
      </div>
    </section>
  );
};
