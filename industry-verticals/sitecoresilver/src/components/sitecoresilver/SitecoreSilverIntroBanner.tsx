import type { JSX } from 'react';
import {
  ImageField,
  TextField,
  useSitecore,
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { hasImageValue, textValue } from '@/lib/sitecoresilver-field-utils';
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
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <section className="component ss-intro sitecoresilver-texture" id={id}>
      <div className="ss-intro-glow" aria-hidden />
      <div className="ss-intro-watermark" aria-hidden>
        <ContentSdkText field={fields.Watermark} tag="span" />
        {!textValue(fields.Watermark) && !isEditing && INTRO_DEFAULTS.watermark}
      </div>
      {hasImageValue(fields.Logo) || isEditing ? (
        <ContentSdkImage field={fields.Logo} className="ss-intro-logo" width={360} height={360} />
      ) : (
        <img
          src={SITECORE_LOGO_URL}
          alt="Sitecore"
          className="ss-intro-logo"
          width={360}
          height={360}
        />
      )}
      <span className="ss-intro-line" aria-hidden />
      <p className="ss-intro-subtitle silver-text">
        <ContentSdkText field={fields.Subtitle} tag="span" />
        {!textValue(fields.Subtitle) && !isEditing && INTRO_DEFAULTS.subtitle}
      </p>
      <h1 className="ss-intro-title silver-text">
        <ContentSdkText field={fields.Title} tag="span" />
        {!textValue(fields.Title) && !isEditing && INTRO_DEFAULTS.title}
      </h1>
      <p className="ss-intro-meta">
        <span>
          <ContentSdkText field={fields.MetaLine1} tag="span" />
          {!textValue(fields.MetaLine1) && !isEditing && INTRO_DEFAULTS.meta[0]}
        </span>
        <span className="ss-dot"> · </span>
        <span>
          <ContentSdkText field={fields.MetaLine2} tag="span" />
          {!textValue(fields.MetaLine2) && !isEditing && INTRO_DEFAULTS.meta[1]}
        </span>
        <span className="ss-dot"> · </span>
        <span>
          <ContentSdkText field={fields.MetaLine3} tag="span" />
          {!textValue(fields.MetaLine3) && !isEditing && INTRO_DEFAULTS.meta[2]}
        </span>
      </p>
    </section>
  );
};
