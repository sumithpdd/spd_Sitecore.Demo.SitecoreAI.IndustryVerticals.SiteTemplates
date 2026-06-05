import type { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/sitecoresilver-field-utils';

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
  const id = props.params?.RenderingIdentifier;
  const badge = textValue(props.fields?.BadgeNumber) || '1';

  return (
    <article className="component ss-promo-card" id={id}>
      <span className="ss-promo-badge">{badge}</span>
      <h3 className="ss-promo-card-title">
        <Text field={props.fields?.Title} tag="span" />
      </h3>
      <p className="ss-promo-card-tagline">
        <Text field={props.fields?.Tagline} tag="span" />
      </p>
      <p className="ss-promo-card-body">
        <Text field={props.fields?.Body} tag="span" />
      </p>
    </article>
  );
};
