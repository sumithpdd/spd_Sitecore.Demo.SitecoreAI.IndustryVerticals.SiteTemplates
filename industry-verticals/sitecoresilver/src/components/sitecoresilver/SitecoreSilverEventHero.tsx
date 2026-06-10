import type { JSX } from 'react';
import {
  LinkField,
  TextField,
  useSitecore,
  Text as ContentSdkText,
  Link as ContentSdkLink,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { hasLinkValue, textValue } from '@/lib/sitecoresilver-field-utils';
import { HERO_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverEventHeroFields {
  Pill1?: TextField;
  Pill2?: TextField;
  Pill3?: TextField;
  Title?: TextField;
  Subtitle?: TextField;
  Meta?: TextField;
  Description?: TextField;
  PrimaryCta?: LinkField;
  SecondaryCta?: LinkField;
}

export type SitecoreSilverEventHeroProps = ComponentProps & {
  fields?: SitecoreSilverEventHeroFields;
};

const pillDefaults = HERO_DEFAULTS.pills.map((p) => p.label);

export const Default = (props: SitecoreSilverEventHeroProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};
  const pillFields = [fields.Pill1, fields.Pill2, fields.Pill3];

  return (
    <section className="component ss-hero sitecoresilver-texture" id={id}>
      <div className="ss-hero-pills">
        {pillFields.map((pillField, index) => (
          <span key={`pill-${index}`} className="ss-pill">
            <ContentSdkText field={pillField} tag="span" />
            {!textValue(pillField) && !isEditing && pillDefaults[index]}
          </span>
        ))}
      </div>
      <h2 className="ss-hero-title silver-text">
        <ContentSdkText field={fields.Title} tag="span" />
        {!textValue(fields.Title) && !isEditing && HERO_DEFAULTS.title}
      </h2>
      <p className="ss-hero-subtitle">
        <ContentSdkText field={fields.Subtitle} tag="span" />
        {!textValue(fields.Subtitle) && !isEditing && HERO_DEFAULTS.subtitle}
      </p>
      <p className="ss-hero-meta">
        <ContentSdkText field={fields.Meta} tag="span" />
        {!textValue(fields.Meta) && !isEditing && HERO_DEFAULTS.meta}
      </p>
      <p className="ss-hero-description">
        <ContentSdkText field={fields.Description} tag="span" />
        {!textValue(fields.Description) && !isEditing && HERO_DEFAULTS.description}
      </p>
      <div className="ss-hero-actions">
        {fields.PrimaryCta && (hasLinkValue(fields.PrimaryCta) || isEditing) ? (
          <ContentSdkLink field={fields.PrimaryCta} className="ss-btn-primary" />
        ) : (
          <Link className="ss-btn-primary" href={HERO_DEFAULTS.primaryCta.href}>
            {HERO_DEFAULTS.primaryCta.text}
          </Link>
        )}
        {fields.SecondaryCta && (hasLinkValue(fields.SecondaryCta) || isEditing) ? (
          <ContentSdkLink field={fields.SecondaryCta} className="ss-btn-secondary" />
        ) : (
          <Link className="ss-btn-secondary" href={HERO_DEFAULTS.secondaryCta.href}>
            {HERO_DEFAULTS.secondaryCta.text}
          </Link>
        )}
      </div>
    </section>
  );
};
