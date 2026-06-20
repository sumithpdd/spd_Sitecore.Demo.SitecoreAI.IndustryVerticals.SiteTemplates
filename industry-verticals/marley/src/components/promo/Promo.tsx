import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { resolveKitFields, unwrapField } from '@/helpers/field-utils';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: Field<string>;
  PromoDescription: RichTextField;
  PromoSubTitle: Field<string>;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

const normalizeLinkField = (field?: LinkField): LinkField | undefined => {
  const unwrapped = unwrapField(field);
  if (!unwrapped?.value) return unwrapped;

  const value = unwrapped.value as { href?: string; text?: string; title?: string };
  return {
    ...unwrapped,
    value: {
      ...value,
      href: value.href ?? '#',
      text: value.text ?? value.title ?? 'Learn more',
    },
  };
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes('reversed') ? 'order-last' : '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = resolveKitFields<Fields>(props.fields);
  const promoMoreInfo = normalizeLinkField(fields.PromoMoreInfo);

  return (
    <section
      className={`${props.params.styles || ''} py-10 lg:min-h-screen lg:py-16`}
      id={id ? id : undefined}
    >
      <div className="container grid grid-cols-1 items-stretch gap-0 lg:h-screen lg:grid-cols-2 lg:gap-10">
        {/* Image Section */}
        <div className={`${isPromoReversed} relative h-full w-full lg:h-screen`}>
          {(fields.PromoImageOne?.value?.src || isPageEditing) && (
            <ContentSdkImage field={fields.PromoImageOne} className="h-full w-full object-cover" />
          )}
        </div>

        {/* Text Section */}
        <div className="font-body relative flex flex-col py-10 lg:flex lg:h-screen lg:py-0">
          <div className="lg:sticky lg:top-0 lg:h-fit">
            <div className="space-y-6">
              {(fields.PromoSubTitle?.value || isPageEditing) && (
                <div className="text-foreground-light text-sm tracking-wide uppercase">
                  <Text field={fields.PromoSubTitle} />
                </div>
              )}

              {(fields.PromoTitle?.value || isPageEditing) && (
                <Text field={fields.PromoTitle} tag="h3" />
              )}

              {(fields.PromoDescription?.value || isPageEditing) && (
                <div className="text-foreground text-base lg:text-lg">
                  <ContentSdkRichText field={fields.PromoDescription} />
                </div>
              )}

              {(promoMoreInfo?.value?.href || isPageEditing) && (
                <Link
                  field={promoMoreInfo ?? { value: { href: '', text: '' } }}
                  className="outline-btn !inline-flex"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithQuote = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes('reversed');
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = resolveKitFields<Fields>(props.fields);
  const promoMoreInfo = normalizeLinkField(fields.PromoMoreInfo);

  return (
    <section className={`${props.params.styles || ''} py-10 lg:py-30`} id={id ? id : undefined}>
      <div className="container">
        <div
          className={`flex flex-col space-y-5 ${
            isPromoReversed ? 'items-end text-right' : 'items-start text-left'
          } `}
        >
          {(fields.PromoTitle?.value || isPageEditing) && (
            <h2 className="font-heading text-foreground max-w-4xl text-4xl tracking-tight lg:text-7xl">
              <ContentSdkRichText field={fields.PromoTitle} />
            </h2>
          )}

          {(promoMoreInfo?.value?.href || isPageEditing) && (
            <Link
              field={promoMoreInfo ?? { value: { href: '', text: '' } }}
              className="outline-btn !inline-flex"
            />
          )}
        </div>
      </div>
    </section>
  );
};
