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
import { getDatasource, pickSdkField } from '@/helpers/field-utils';
import { IGQLField } from '@/types/igql';

type PromoDatasource = {
  promoImageOne?: IGQLField<ImageField>;
  promoTitle?: IGQLField<Field<string>>;
  promoDescription?: IGQLField<RichTextField>;
  promoSubTitle?: IGQLField<Field<string>>;
  promoMoreInfo?: IGQLField<LinkField>;
  PromoImageOne?: ImageField;
  PromoTitle?: Field<string>;
  PromoDescription?: RichTextField;
  PromoSubTitle?: Field<string>;
  PromoMoreInfo?: LinkField;
};

interface Fields {
  data?: {
    datasource?: PromoDatasource;
  };
  PromoImageOne?: ImageField;
  PromoTitle?: Field<string>;
  PromoDescription?: RichTextField;
  PromoSubTitle?: Field<string>;
  PromoMoreInfo?: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

type ResolvedPromoFields = {
  promoImageOne?: ImageField;
  promoTitle?: Field<string>;
  promoDescription?: RichTextField;
  promoSubTitle?: Field<string>;
  promoMoreInfo?: LinkField;
};

const resolvePromoFields = (fields: Fields): ResolvedPromoFields => {
  const ds = getDatasource(fields);

  return {
    promoImageOne: pickSdkField<ImageField>(ds, 'promoImageOne', 'PromoImageOne'),
    promoTitle: pickSdkField<Field<string>>(ds, 'promoTitle', 'PromoTitle'),
    promoDescription: pickSdkField<RichTextField>(ds, 'promoDescription', 'PromoDescription'),
    promoSubTitle: pickSdkField<Field<string>>(ds, 'promoSubTitle', 'PromoSubTitle'),
    promoMoreInfo: pickSdkField<LinkField>(ds, 'promoMoreInfo', 'PromoMoreInfo'),
  };
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes('reversed') ? 'order-last' : '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = resolvePromoFields(props.fields);

  return (
    <section
      className={`${props.params.styles || ''} py-10 lg:min-h-screen lg:py-16`}
      id={id ? id : undefined}
    >
      <div className="container grid grid-cols-1 items-stretch gap-0 lg:h-screen lg:grid-cols-2 lg:gap-10">
        <div className={`${isPromoReversed} relative h-full w-full lg:h-screen`}>
          {(fields.promoImageOne?.value?.src || isPageEditing) && (
            <ContentSdkImage field={fields.promoImageOne} className="h-full w-full object-cover" />
          )}
        </div>

        <div className="font-body relative flex flex-col py-10 lg:flex lg:h-screen lg:py-0">
          <div className="lg:sticky lg:top-0 lg:h-fit">
            <div className="space-y-6">
              {(fields.promoSubTitle?.value || isPageEditing) && (
                <div className="text-foreground-light text-sm tracking-wide uppercase">
                  <Text field={fields.promoSubTitle} />
                </div>
              )}

              <Text field={fields.promoTitle} tag="h3" />

              <div className="text-foreground text-base lg:text-lg">
                <ContentSdkRichText field={fields.promoDescription} />
              </div>

              {(fields.promoMoreInfo?.value?.href || isPageEditing) && (
                <Link
                  field={fields.promoMoreInfo ?? { value: { href: '', text: '' } }}
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
  const fields = resolvePromoFields(props.fields);

  return (
    <section className={`${props.params.styles || ''} py-10 lg:py-30`} id={id ? id : undefined}>
      <div className="container">
        <div
          className={`flex flex-col space-y-5 ${
            isPromoReversed ? 'items-end text-right' : 'items-start text-left'
          } `}
        >
          {(fields.promoTitle?.value || isPageEditing) && (
            <h2 className="font-heading text-foreground max-w-4xl text-4xl tracking-tight lg:text-7xl">
              <ContentSdkRichText field={fields.promoTitle} />
            </h2>
          )}

          {(fields.promoMoreInfo?.value?.href || isPageEditing) && (
            <Link
              field={fields.promoMoreInfo ?? { value: { href: '', text: '' } }}
              className="outline-btn !inline-flex"
            />
          )}
        </div>
      </div>
    </section>
  );
};
