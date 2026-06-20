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
import {
  hasImageFieldValue,
  normalizeImageField,
  normalizeLinkField,
  normalizeRichTextField,
  normalizeTextField,
  resolveKitFields,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';

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

const resolvePromoFields = (fields: Fields) => {
  const kit = resolveKitFields<Fields>(fields);

  return {
    PromoImageOne: normalizeImageField(kit.PromoImageOne),
    PromoTitle: normalizeTextField(kit.PromoTitle),
    PromoDescription: normalizeRichTextField(kit.PromoDescription),
    PromoSubTitle: normalizeTextField(kit.PromoSubTitle),
    PromoMoreInfo: normalizeLinkField(kit.PromoMoreInfo),
  };
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes('reversed') ? 'order-last' : '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = resolvePromoFields(props.fields);
  const promoMoreInfo = fields.PromoMoreInfo;
  const title = textFieldValue(fields.PromoTitle);
  const subtitle = textFieldValue(fields.PromoSubTitle);
  const description = richTextFieldValue(fields.PromoDescription);

  return (
    <section
      className={`${props.params.styles || ''} py-10 lg:min-h-screen lg:py-16`}
      id={id ? id : undefined}
    >
      <div className="container grid grid-cols-1 items-stretch gap-0 lg:h-screen lg:grid-cols-2 lg:gap-10">
        <div className={`${isPromoReversed} relative h-full w-full lg:h-screen`}>
          {(hasImageFieldValue(fields.PromoImageOne) || isPageEditing) && (
            <ContentSdkImage field={fields.PromoImageOne} className="h-full w-full object-cover" />
          )}
        </div>

        <div className="font-body relative flex flex-col py-10 lg:flex lg:h-screen lg:py-0">
          <div className="lg:sticky lg:top-0 lg:h-fit">
            <div className="space-y-6">
              {(subtitle || isPageEditing) && (
                <div className="text-foreground-light text-sm tracking-wide uppercase">
                  {isPageEditing ? <Text field={fields.PromoSubTitle} /> : subtitle}
                </div>
              )}

              {(title || isPageEditing) &&
                (isPageEditing ? <Text field={fields.PromoTitle} tag="h3" /> : <h3>{title}</h3>)}

              {(description || isPageEditing) && (
                <div className="text-foreground text-base lg:text-lg">
                  {isPageEditing ? (
                    <ContentSdkRichText field={fields.PromoDescription} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  )}
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
  const fields = resolvePromoFields(props.fields);
  const promoMoreInfo = fields.PromoMoreInfo;
  const title = richTextFieldValue(fields.PromoTitle);

  return (
    <section className={`${props.params.styles || ''} py-10 lg:py-30`} id={id ? id : undefined}>
      <div className="container">
        <div
          className={`flex flex-col space-y-5 ${
            isPromoReversed ? 'items-end text-right' : 'items-start text-left'
          } `}
        >
          {(title || isPageEditing) && (
            <h2 className="font-heading text-foreground max-w-4xl text-4xl tracking-tight lg:text-7xl">
              {isPageEditing ? (
                <ContentSdkRichText field={fields.PromoTitle} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: title }} />
              )}
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
