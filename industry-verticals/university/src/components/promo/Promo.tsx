'use client';

import { JSX } from 'react';
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
import { hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
  PromoImageOne?: ImageField;
  PromoTitle?: Field<string>;
  PromoSubTitle?: Field<string>;
  PromoDescription?: Field<string>;
  PromoMoreInfo?: LinkField;
}

export type PromoProps = ComponentProps & { fields: Fields };

export const Default = (props: PromoProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;
  const link = linkOrFallback(fields?.PromoMoreInfo, 'Find out more', '/clearing', isEditing);

  if (!fields && !isEditing) {
    return <></>;
  }

  const media = (
    <div className="promo-media relative aspect-[4/3] overflow-hidden bg-[var(--reading-surface)]">
      <CmsImage
        field={fields?.PromoImageOne}
        fallbackSrc={demoImages.tileCourses}
        alt={fields?.PromoTitle?.value || 'Promo'}
        className="promo-media__image"
        imgClassName="h-full w-full object-cover"
        width={600}
        height={400}
      />
    </div>
  );

  const copy = (
    <div className="p-5">
      {(hasText(fields?.PromoSubTitle) || isEditing) && (
        <p className="text-xs font-bold tracking-wide text-[var(--reading-maroon)] uppercase">
          <ContentSdkText field={fields?.PromoSubTitle} />
        </p>
      )}
      {(hasText(fields?.PromoTitle) || isEditing) && (
        <h3 className="mt-1 text-xl font-bold text-[var(--reading-ink)]">
          <ContentSdkText field={fields?.PromoTitle} />
        </h3>
      )}
      {(hasText(fields?.PromoDescription) || isEditing) && (
        <div className="mt-2 text-sm leading-relaxed text-[var(--reading-charcoal)]">
          <ContentSdkRichText field={fields?.PromoDescription} />
        </div>
      )}
      <div className="mt-4">
        <ContentSdkLink
          field={link}
          className="text-sm font-bold text-[var(--reading-red)] hover:underline"
        />
      </div>
    </div>
  );

  return (
    <article className={clsx('component promo overflow-hidden bg-white', params?.styles)} id={id}>
      {media}
      {copy}
    </article>
  );
};
