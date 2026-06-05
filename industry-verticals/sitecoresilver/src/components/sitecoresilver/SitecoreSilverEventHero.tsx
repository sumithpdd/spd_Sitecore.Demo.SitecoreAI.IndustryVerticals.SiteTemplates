import type { JSX } from 'react';
import { LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { linkHref, linkText, textValue } from '@/lib/sitecoresilver-field-utils';
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

export const Default = (props: SitecoreSilverEventHeroProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const pills = [
    textValue(props.fields?.Pill1) || HERO_DEFAULTS.pills[0].label,
    textValue(props.fields?.Pill2) || HERO_DEFAULTS.pills[1].label,
    textValue(props.fields?.Pill3) || HERO_DEFAULTS.pills[2].label,
  ];

  return (
    <section className="component ss-hero sitecoresilver-texture" id={id}>
      <div className="ss-hero-pills">
        {pills.map((label) => (
          <span key={label} className="ss-pill">
            {label}
          </span>
        ))}
      </div>
      <h2 className="ss-hero-title silver-text">
        <Text field={props.fields?.Title} tag="span" />
        {!textValue(props.fields?.Title) && HERO_DEFAULTS.title}
      </h2>
      <p className="ss-hero-subtitle">
        <Text field={props.fields?.Subtitle} tag="span" />
        {!textValue(props.fields?.Subtitle) && HERO_DEFAULTS.subtitle}
      </p>
      <p className="ss-hero-meta">
        <Text field={props.fields?.Meta} tag="span" />
        {!textValue(props.fields?.Meta) && HERO_DEFAULTS.meta}
      </p>
      <p className="ss-hero-description">
        <Text field={props.fields?.Description} tag="span" />
        {!textValue(props.fields?.Description) && HERO_DEFAULTS.description}
      </p>
      <div className="ss-hero-actions">
        <Link className="ss-btn-primary" href={linkHref(props.fields?.PrimaryCta)}>
          {linkText(props.fields?.PrimaryCta, HERO_DEFAULTS.primaryCta.text)}
        </Link>
        <Link className="ss-btn-secondary" href={linkHref(props.fields?.SecondaryCta)}>
          {linkText(props.fields?.SecondaryCta, HERO_DEFAULTS.secondaryCta.text)}
        </Link>
      </div>
    </section>
  );
};
