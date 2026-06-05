import type { JSX } from 'react';
import { ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, textValue } from '@/lib/sitecoresilver-field-utils';
import { INTRO_DEFAULTS, SITECORE_LOGO_URL } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverIntroBannerFields {
  Logo?: ImageField;
  Watermark?: TextField;
  Subtitle?: TextField;
  Title?: TextField;
  MetaLine1?: TextField;
  MetaLine2?: TextField;
  MetaLine3?: TextField;
}

export type SitecoreSilverIntroBannerProps = ComponentProps & {
  fields?: SitecoreSilverIntroBannerFields;
};

export const Default = (props: SitecoreSilverIntroBannerProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const logo = imageSrc(props.fields?.Logo, SITECORE_LOGO_URL);
  const watermark = textValue(props.fields?.Watermark) || INTRO_DEFAULTS.watermark;
  const meta = [
    textValue(props.fields?.MetaLine1) || INTRO_DEFAULTS.meta[0],
    textValue(props.fields?.MetaLine2) || INTRO_DEFAULTS.meta[1],
    textValue(props.fields?.MetaLine3) || INTRO_DEFAULTS.meta[2],
  ];

  return (
    <section className="component ss-intro sitecoresilver-texture" id={id}>
      <div className="ss-intro-glow" aria-hidden />
      <div className="ss-intro-watermark" aria-hidden>
        {watermark}
      </div>
      <img src={logo} alt="Sitecore" className="ss-intro-logo" width={360} height={360} />
      <span className="ss-intro-line" aria-hidden />
      <p className="ss-intro-subtitle silver-text">
        <Text field={props.fields?.Subtitle} tag="span" />
        {!textValue(props.fields?.Subtitle) && INTRO_DEFAULTS.subtitle}
      </p>
      <h1 className="ss-intro-title silver-text">
        <Text field={props.fields?.Title} tag="span" />
        {!textValue(props.fields?.Title) && INTRO_DEFAULTS.title}
      </h1>
      <p className="ss-intro-meta">
        {meta.map((line, i) => (
          <span key={line}>
            {i > 0 && <span className="ss-dot"> · </span>}
            <span>{line}</span>
          </span>
        ))}
      </p>
    </section>
  );
};
