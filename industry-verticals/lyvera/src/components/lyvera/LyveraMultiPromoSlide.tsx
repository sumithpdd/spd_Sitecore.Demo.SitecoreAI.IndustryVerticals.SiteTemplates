import type { JSX } from 'react';
import { ImageField, TextField, Image as ContentSdkImage } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraMultiPromoSlideFields {
  Image?: ImageField;
  AltText?: TextField;
  TabLabel?: TextField;
}

export type LyveraMultiPromoSlideProps = ComponentProps & {
  fields?: LyveraMultiPromoSlideFields;
};

export const Default = (props: LyveraMultiPromoSlideProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields ?? {};
  const alt =
    textFieldValue(fields.AltText) ||
    (typeof fields.Image?.value?.alt === 'string' ? fields.Image.value.alt : '') ||
    '';

  return (
    <div
      data-lyvera-multi-promo-slide
      data-tab-label={textFieldValue(fields.TabLabel) || textFieldValue(fields.AltText) || alt}
      className={['component lyvera-multi-promo-slide', styles].filter(Boolean).join(' ')}
      id={id}
    >
      <div className="lyvera-multi-promo-slide__frame">
        <ContentSdkImage field={fields.Image} className="lyvera-multi-promo-slide__image" />
        {!fields.Image?.value?.src && (
          <img
            src={imageSrc(fields.Image)}
            alt={alt}
            className="lyvera-multi-promo-slide__image lyvera-multi-promo-slide__image--fallback"
          />
        )}
      </div>
    </div>
  );
};
