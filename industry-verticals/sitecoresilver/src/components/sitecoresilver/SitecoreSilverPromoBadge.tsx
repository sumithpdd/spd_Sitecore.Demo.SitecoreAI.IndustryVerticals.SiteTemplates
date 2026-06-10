import type { JSX } from 'react';
import { TextField, useSitecore, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/sitecoresilver-field-utils';
import { PROMO_BADGES_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverPromoBadgeFields {
  BadgeNumber?: TextField;
  Title?: TextField;
  Tagline?: TextField;
  Body?: TextField;
}

export type SitecoreSilverPromoBadgeProps = ComponentProps & {
  fields?: SitecoreSilverPromoBadgeFields;
};

export const Default = (props: SitecoreSilverPromoBadgeProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <article className="component ss-promo-card" id={id}>
      <span className="ss-promo-badge">
        <ContentSdkText field={fields.BadgeNumber} tag="span" />
        {!textValue(fields.BadgeNumber) && !isEditing && PROMO_BADGES_DEFAULTS[0].badge}
      </span>
      <h3 className="ss-promo-card-title">
        <ContentSdkText field={fields.Title} tag="span" />
        {!textValue(fields.Title) && !isEditing && PROMO_BADGES_DEFAULTS[0].title}
      </h3>
      <p className="ss-promo-card-tagline">
        <ContentSdkText field={fields.Tagline} tag="span" />
        {!textValue(fields.Tagline) && !isEditing && PROMO_BADGES_DEFAULTS[0].tagline}
      </p>
      <p className="ss-promo-card-body">
        <ContentSdkText field={fields.Body} tag="span" />
        {!textValue(fields.Body) && !isEditing && PROMO_BADGES_DEFAULTS[0].body}
      </p>
    </article>
  );
};
