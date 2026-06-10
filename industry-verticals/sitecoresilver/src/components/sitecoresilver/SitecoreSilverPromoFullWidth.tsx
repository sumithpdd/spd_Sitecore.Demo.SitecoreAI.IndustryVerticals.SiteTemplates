import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  useSitecore,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { richTextValue, textValue } from '@/lib/sitecoresilver-field-utils';
import { PROMO_BAND_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverPromoFullWidthFields {
  Eyebrow?: TextField;
  Title?: TextField;
  Body?: RichTextField;
}

export type SitecoreSilverPromoFullWidthProps = ComponentProps & {
  fields?: SitecoreSilverPromoFullWidthFields;
};

export const Default = (props: SitecoreSilverPromoFullWidthProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <section className="component ss-promo-band sitecoresilver-texture" id={id}>
      <p className="ss-promo-band-eyebrow">
        <ContentSdkText field={fields.Eyebrow} tag="span" />
        {!textValue(fields.Eyebrow) && !isEditing && PROMO_BAND_DEFAULTS.eyebrow}
      </p>
      <h2 className="ss-promo-band-title">
        <ContentSdkText field={fields.Title} tag="span" />
        {!textValue(fields.Title) && !isEditing && PROMO_BAND_DEFAULTS.title}
      </h2>
      <div className="ss-promo-band-body">
        <ContentSdkRichText field={fields.Body} />
        {!richTextValue(fields.Body) && !isEditing && (
          <div dangerouslySetInnerHTML={{ __html: PROMO_BAND_DEFAULTS.body }} />
        )}
      </div>
    </section>
  );
};
