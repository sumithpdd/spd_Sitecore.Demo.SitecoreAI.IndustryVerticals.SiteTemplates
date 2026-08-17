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
import { demoImages, withDemoImage } from 'lib/demo-images';
import { ResolvedImage } from 'lib/ResolvedImage';
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
  const image = withDemoImage(
    fields?.PromoImageOne,
    demoImages.tileCourses,
    fields?.PromoTitle?.value || 'Promo'
  );
  const link = linkOrFallback(fields?.PromoMoreInfo, 'Find out more', '/clearing', isEditing);

  if (!fields && !isEditing) {
    return <></>;
  }

  return (
    <article className={clsx('component promo overflow-hidden bg-white', params?.styles)} id={id}>
      <ContentSdkLink field={link} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ResolvedImage
            field={image}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          {(hasText(fields?.PromoSubTitle) || isEditing) && (
            <p className="text-xs font-bold tracking-wide text-[var(--reading-maroon)] uppercase">
              <ContentSdkText field={fields?.PromoSubTitle} />
            </p>
          )}
          {(hasText(fields?.PromoTitle) || isEditing) && (
            <h3 className="mt-1 text-xl font-bold text-[var(--reading-ink)] group-hover:text-[var(--reading-red)]">
              <ContentSdkText field={fields?.PromoTitle} />
            </h3>
          )}
          {(hasText(fields?.PromoDescription) || isEditing) && (
            <div className="mt-2 text-sm leading-relaxed text-[var(--reading-charcoal)]">
              <ContentSdkRichText field={fields?.PromoDescription} />
            </div>
          )}
        </div>
      </ContentSdkLink>
    </article>
  );
};
