import type { JSX } from 'react';
import { Text, TextField, RichTextField } from '@sitecore-content-sdk/nextjs';
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
  const id = props.params?.RenderingIdentifier;
  const bodyHtml = richTextValue(props.fields?.Body as never);

  return (
    <section className="component ss-promo-band sitecoresilver-texture" id={id}>
      <p className="ss-promo-band-eyebrow">
        <Text field={props.fields?.Eyebrow} tag="span" />
        {!textValue(props.fields?.Eyebrow) && PROMO_BAND_DEFAULTS.eyebrow}
      </p>
      <h2 className="ss-promo-band-title">
        <Text field={props.fields?.Title} tag="span" />
        {!textValue(props.fields?.Title) && PROMO_BAND_DEFAULTS.title}
      </h2>
      {bodyHtml ? (
        <div className="ss-promo-band-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      ) : (
        <p
          className="ss-promo-band-body"
          dangerouslySetInnerHTML={{ __html: PROMO_BAND_DEFAULTS.body }}
        />
      )}
    </section>
  );
};
