import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  ImageField,
  LinkField,
  RichTextField,
  Text as ContentSdkText,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { LayoutStyles } from '@/types/styleFlags';

interface Fields {
  PromoImageOne: ImageField;
  PromoTitle: TextField;
  PromoSubTitle: TextField;
  PromoDescription: RichTextField;
  PromoMoreInfo: LinkField;
}

export type PromoProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;
  const isPromoReversed = sxaStyles?.includes(LayoutStyles.Reversed) ? 'lg:order-last' : '';

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div className="dwf-promo-card grid lg:grid-cols-2">
          {/* Image Section */}
          <div className={`relative flex items-stretch ${isPromoReversed}`}>
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="inset-0 h-full w-full object-cover max-lg:h-64 lg:absolute"
            />
          </div>
          <div className="promo-content">
            <span className="promo-eyebrow">
              <ContentSdkText field={props.fields.PromoSubTitle} />
            </span>
            <h4 className="promo-title">
              <ContentSdkText field={props.fields.PromoTitle} />
            </h4>
            <div className="promo-body">
              <ContentSdkRichText field={props.fields.PromoDescription} />
            </div>
            <ContentSdkLink field={props.fields.PromoMoreInfo} className="promo-link" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Stacked = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div className="dwf-promo-stacked">
          <div className="promo-stacked-image-wrap">
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              className="h-48 w-full object-cover lg:h-64"
            />
            <div className="promo-stacked-banner">
              <ContentSdkText field={props.fields.PromoSubTitle} />
            </div>
          </div>
          <div className="promo-stacked-content">
            <h4 className="promo-stacked-title">
              <ContentSdkText field={props.fields.PromoTitle} />
            </h4>
            <ContentSdkLink field={props.fields.PromoMoreInfo} className="promo-stacked-cta">
              →
            </ContentSdkLink>
          </div>
        </div>
      </div>
    </div>
  );
};
