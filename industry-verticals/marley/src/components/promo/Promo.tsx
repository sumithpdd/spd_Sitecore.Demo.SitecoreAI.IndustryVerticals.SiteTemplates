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
  getDatasource,
  hasLinkValue,
  linkHref,
  linkLabel,
  normalizeImageField,
  normalizeLinkField,
  normalizeRichTextField,
  normalizeTextField,
  pickSdkField,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';
import { IGQLField } from '@/types/igql';

type PromoDatasource = {
  promoImageOne?: IGQLField<ImageField>;
  promoTitle?: IGQLField<Field<string>>;
  promoDescription?: IGQLField<RichTextField>;
  promoSubTitle?: IGQLField<Field<string>>;
  promoMoreInfo?: IGQLField<LinkField>;
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
  const gql = fields?.data?.datasource;

  const rawTitle =
    gql?.promoTitle?.jsonValue ?? pickSdkField<Field<string>>(ds, 'promoTitle', 'PromoTitle');
  const rawDescription =
    gql?.promoDescription?.jsonValue ??
    pickSdkField<RichTextField>(ds, 'promoDescription', 'PromoDescription');
  const rawSubTitle =
    gql?.promoSubTitle?.jsonValue ??
    pickSdkField<Field<string>>(ds, 'promoSubTitle', 'PromoSubTitle');
  const rawImage =
    gql?.promoImageOne?.jsonValue ?? pickSdkField<ImageField>(ds, 'promoImageOne', 'PromoImageOne');
  const rawLink =
    gql?.promoMoreInfo?.jsonValue ?? pickSdkField<LinkField>(ds, 'promoMoreInfo', 'PromoMoreInfo');

  return {
    promoImageOne: normalizeImageField(rawImage),
    promoTitle: normalizeTextField(rawTitle),
    promoDescription: normalizeRichTextField(rawDescription),
    promoSubTitle: normalizeTextField(rawSubTitle),
    promoMoreInfo: normalizeLinkField(rawLink),
  };
};

const PromoMoreInfoLink = ({
  field,
  className,
  isPageEditing,
}: {
  field?: LinkField;
  className?: string;
  isPageEditing: boolean;
}): JSX.Element | null => {
  if (!field && !isPageEditing) return null;

  const href = linkHref(field, '#');
  const label = linkLabel(field, 'More info');
  const normalized = normalizeLinkField(field) ?? { value: { href, text: label } };

  if (isPageEditing) {
    return <Link field={normalized} className={className} />;
  }

  if (!hasLinkValue(field)) return null;

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = props?.params?.styles?.includes('reversed') ? 'order-last' : '';
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const fields = resolvePromoFields(props.fields);
  const title = textFieldValue(fields.promoTitle);
  const subtitle = textFieldValue(fields.promoSubTitle);
  const description = richTextFieldValue(fields.promoDescription);

  return (
    <section
      className={`${props.params.styles || ''} py-10 lg:min-h-screen lg:py-16`}
      id={id ? id : undefined}
    >
      <div className="container grid grid-cols-1 items-stretch gap-0 lg:h-screen lg:grid-cols-2 lg:gap-10">
        <div className={`${isPromoReversed} relative h-full w-full lg:h-screen`}>
          {(fields.promoImageOne?.value?.src || isPageEditing) &&
            (isPageEditing ? (
              <ContentSdkImage
                field={fields.promoImageOne}
                className="h-full w-full object-cover"
              />
            ) : fields.promoImageOne?.value?.src ? (
              <img
                src={fields.promoImageOne.value.src}
                alt={fields.promoImageOne.value.alt ?? ''}
                className="h-full w-full object-cover"
              />
            ) : null)}
        </div>

        <div className="font-body relative flex flex-col py-10 lg:flex lg:h-screen lg:py-0">
          <div className="lg:sticky lg:top-0 lg:h-fit">
            <div className="space-y-6">
              {(subtitle || isPageEditing) && (
                <div className="text-foreground-light text-sm tracking-wide uppercase">
                  {isPageEditing ? <Text field={fields.promoSubTitle} /> : <span>{subtitle}</span>}
                </div>
              )}

              {(title || isPageEditing) &&
                (isPageEditing ? <Text field={fields.promoTitle} tag="h3" /> : <h3>{title}</h3>)}

              {(description || isPageEditing) && (
                <div className="text-foreground text-base lg:text-lg">
                  {isPageEditing ? (
                    <ContentSdkRichText field={fields.promoDescription} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  )}
                </div>
              )}

              {(hasLinkValue(fields.promoMoreInfo) || isPageEditing) && (
                <PromoMoreInfoLink
                  field={fields.promoMoreInfo}
                  className="outline-btn !inline-flex"
                  isPageEditing={isPageEditing}
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
  const title = richTextFieldValue(fields.promoTitle);

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
                <ContentSdkRichText field={fields.promoTitle} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: title }} />
              )}
            </h2>
          )}

          {(hasLinkValue(fields.promoMoreInfo) || isPageEditing) && (
            <PromoMoreInfoLink
              field={fields.promoMoreInfo}
              className="outline-btn !inline-flex"
              isPageEditing={isPageEditing}
            />
          )}
        </div>
      </div>
    </section>
  );
};
