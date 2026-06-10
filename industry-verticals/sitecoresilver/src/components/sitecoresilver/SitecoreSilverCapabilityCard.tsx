import type { JSX } from 'react';
import { TextField, useSitecore, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/sitecoresilver-field-utils';

export interface SitecoreSilverCapabilityCardFields {
  CategoryLabel?: TextField;
  ActionLabel?: TextField;
  Title?: TextField;
  Tagline?: TextField;
  Body?: TextField;
  Feature1?: TextField;
  Feature2?: TextField;
  Feature3?: TextField;
  AiHighlight?: TextField;
}

export type SitecoreSilverCapabilityCardProps = ComponentProps & {
  fields?: SitecoreSilverCapabilityCardFields;
};

const actionTone = (label: string): string => {
  const key = label.toLowerCase();
  if (key.includes('create')) return 'ss-cap-card--create';
  if (key.includes('organize')) return 'ss-cap-card--organize';
  if (key.includes('orchestrate')) return 'ss-cap-card--orchestrate';
  if (key.includes('understand')) return 'ss-cap-card--understand';
  if (key.includes('optimize')) return 'ss-cap-card--optimize';
  return 'ss-cap-card--create';
};

const featureFields = (fields: Partial<SitecoreSilverCapabilityCardFields>) =>
  [fields.Feature1, fields.Feature2, fields.Feature3] as const;

export const Default = (props: SitecoreSilverCapabilityCardProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};
  const action = textValue(fields.ActionLabel) || 'Create';
  const features = featureFields(fields);
  const showFeatures = isEditing || features.some((feature) => textValue(feature).length > 0);

  return (
    <article className={`component ss-cap-card ${actionTone(action)}`} id={id}>
      <div className="ss-cap-card-top">
        <span className="ss-cap-card-category">
          <ContentSdkText field={fields.CategoryLabel} tag="span" />
        </span>
        <span className="ss-cap-card-action">
          <ContentSdkText field={fields.ActionLabel} tag="span" />
          {!textValue(fields.ActionLabel) && !isEditing && 'Create'}
        </span>
      </div>
      <h3 className="ss-cap-card-title">
        <ContentSdkText field={fields.Title} tag="span" />
      </h3>
      <p className="ss-cap-card-tagline">
        <ContentSdkText field={fields.Tagline} tag="span" />
      </p>
      <p className="ss-cap-card-body">
        <ContentSdkText field={fields.Body} tag="span" />
      </p>
      {showFeatures && (
        <ul className="ss-cap-card-features">
          {features.map((feature, index) => (
            <li key={`feature-${index}`}>
              <ContentSdkText field={feature} tag="span" />
            </li>
          ))}
        </ul>
      )}
      {(textValue(fields.AiHighlight) || isEditing) && (
        <div className="ss-cap-card-ai">
          <span className="ss-cap-card-ai-label">AI stands for Already Included</span>
          <p>
            <ContentSdkText field={fields.AiHighlight} tag="span" />
          </p>
        </div>
      )}
    </article>
  );
};
