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
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import { DEMO_IMAGES, withDemoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';
import clsx from 'clsx';

interface Fields {
  PromoImageOne?: ImageField;
  PromoImageTwo?: ImageField;
  PromoTitle?: Field<string>;
  PromoSubTitle?: Field<string>;
  PromoDescription?: Field<string>;
  PromoMoreInfo?: LinkField;
  SecondaryTitle?: Field<string>;
  SecondarySubTitle?: Field<string>;
  SecondaryLink?: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

const hasText = (field?: Field<string>) => Boolean(field?.value);
const hasLink = (field?: LinkField) => Boolean(field?.value?.href || field?.value?.text);

export const Default = (props: PromoProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;
  const imageOne = withDemoImage(fields?.PromoImageOne, DEMO_IMAGES.promoMagazine, fields?.PromoTitle?.value || '');

  if (!fields && !isEditing) {
    return <></>;
  }

  return (
    <section className={clsx('component promo relative min-h-[28rem] overflow-hidden', params?.styles)} id={id}>
      <div className="absolute inset-0 bg-neutral-900">
        <ResolvedImage field={imageOne} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      </div>
      <div className="relative z-10 flex min-h-[28rem] flex-col justify-end p-8 text-white md:p-12">
        {(hasText(fields?.PromoSubTitle) || isEditing) && (
          <p className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase text-white/80">
            <ContentSdkText field={fields?.PromoSubTitle} />
          </p>
        )}
        {(hasText(fields?.PromoTitle) || isEditing) && (
          <h2 className="max-w-md text-3xl font-semibold tracking-tight md:text-4xl">
            <ContentSdkText field={fields?.PromoTitle} />
          </h2>
        )}
        {(hasText(fields?.PromoDescription) || isEditing) && (
          <div className="mt-3 max-w-md text-sm text-white/80">
            <ContentSdkRichText field={fields?.PromoDescription} />
          </div>
        )}
        {(hasLink(fields?.PromoMoreInfo) || isEditing) && (
          <div className="mt-6">
            <ContentSdkLink field={asLink(fields?.PromoMoreInfo)} className="text-sm font-semibold tracking-wide underline-offset-4 hover:underline" />
          </div>
        )}
      </div>
    </section>
  );
};

export const DualTile = (props: PromoProps): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;
  const imageOne = withDemoImage(fields?.PromoImageOne, DEMO_IMAGES.promoPreowned, fields?.PromoTitle?.value || '');
  const imageTwo = withDemoImage(fields?.PromoImageTwo, DEMO_IMAGES.promoMagazine, fields?.SecondaryTitle?.value || '');

  if (!fields && !isEditing) {
    return <></>;
  }

  return (
    <section className={clsx('component promo-dual grid gap-0 md:grid-cols-2', params?.styles)} id={id}>
      <article className="relative min-h-[26rem] overflow-hidden bg-neutral-900">
        <ResolvedImage field={imageOne} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="relative z-10 flex min-h-[26rem] flex-col justify-end p-8 text-white md:p-10">
          {(hasText(fields?.PromoSubTitle) || isEditing) && (
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
              <ContentSdkText field={fields?.PromoSubTitle} />
            </p>
          )}
          {(hasText(fields?.PromoTitle) || isEditing) && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <ContentSdkText field={fields?.PromoTitle} />
            </h2>
          )}
          {(hasLink(fields?.PromoMoreInfo) || isEditing) && (
            <div className="mt-5">
              <ContentSdkLink field={asLink(fields?.PromoMoreInfo)} className="text-sm font-semibold tracking-wide underline-offset-4 hover:underline" />
            </div>
          )}
        </div>
      </article>

      <article className="relative min-h-[26rem] overflow-hidden bg-neutral-900">
        <ResolvedImage field={imageTwo} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="relative z-10 flex min-h-[26rem] flex-col justify-end p-8 text-white md:p-10">
          {(hasText(fields?.SecondarySubTitle) || isEditing) && (
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
              <ContentSdkText field={fields?.SecondarySubTitle} />
            </p>
          )}
          {(hasText(fields?.SecondaryTitle) || isEditing) && (
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              <ContentSdkText field={fields?.SecondaryTitle} />
            </h2>
          )}
          {(hasLink(fields?.SecondaryLink) || isEditing) && (
            <div className="mt-5">
              <ContentSdkLink field={asLink(fields?.SecondaryLink)} className="text-sm font-semibold tracking-wide underline-offset-4 hover:underline" />
            </div>
          )}
        </div>
      </article>
    </section>
  );
};
