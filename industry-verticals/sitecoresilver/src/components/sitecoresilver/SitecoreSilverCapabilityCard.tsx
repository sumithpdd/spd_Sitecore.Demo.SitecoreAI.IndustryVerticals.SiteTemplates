import type { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
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

export const Default = (props: SitecoreSilverCapabilityCardProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const action = textValue(props.fields?.ActionLabel) || 'Create';
  const features = [
    textValue(props.fields?.Feature1),
    textValue(props.fields?.Feature2),
    textValue(props.fields?.Feature3),
  ].filter(Boolean);

  return (
    <article className={`component ss-cap-card ${actionTone(action)}`} id={id}>
      <div className="ss-cap-card-top">
        <span className="ss-cap-card-category">
          <Text field={props.fields?.CategoryLabel} tag="span" />
        </span>
        <span className="ss-cap-card-action">{action}</span>
      </div>
      <h3 className="ss-cap-card-title">
        <Text field={props.fields?.Title} tag="span" />
      </h3>
      <p className="ss-cap-card-tagline">
        <Text field={props.fields?.Tagline} tag="span" />
      </p>
      <p className="ss-cap-card-body">
        <Text field={props.fields?.Body} tag="span" />
      </p>
      {features.length > 0 && (
        <ul className="ss-cap-card-features">
          {features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
      {textValue(props.fields?.AiHighlight) && (
        <div className="ss-cap-card-ai">
          <span className="ss-cap-card-ai-label">AI stands for Already Included</span>
          <p>
            <Text field={props.fields?.AiHighlight} tag="span" />
          </p>
        </div>
      )}
    </article>
  );
};
