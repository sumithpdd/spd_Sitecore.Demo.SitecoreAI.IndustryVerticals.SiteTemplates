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
import { isParamEnabled } from '@/helpers/isParamEnabled';

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
  const isPromoReversed = !isParamEnabled(props.params.Reversed) ? '' : 'order-last';

  return (
    <div className={`${sxaStyles}`} id={id}>
      <div className="container">
        <div
          className={`my-12 flex flex-col overflow-hidden rounded-xl border shadow transition-shadow hover:shadow-lg md:flex-row`}
        >
          {/* Image Section */}
          <div className="flex max-h-120 flex-1 items-stretch">
            <ContentSdkImage
              field={props.fields.PromoImageOne}
              alt={props.fields.PromoImageOne.value?.src}
              width={600}
              height={400}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="flex flex-1 flex-col justify-center gap-10 p-6">
            {/* Eyebrow */}
            <ContentSdkText
              field={props.fields.PromoSubTitle}
              className="text-foreground-muted p-0 text-sm font-medium"
            />
            {/* Title */}
            <ContentSdkText
              field={props.fields.PromoTitle}
              className="text-foreground mb-2 p-0 text-2xl font-bold"
            />
            {/* Description */}
            <ContentSdkRichText
              field={props.fields.PromoDescription}
              className="text-foreground-light mb-4 p-0"
            />
            {/* Link */}
            <ContentSdkLink
              field={props.fields.PromoMoreInfo}
              className="focus-visible:ring-ring bg-accent text-background hover:bg-primary/90 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
