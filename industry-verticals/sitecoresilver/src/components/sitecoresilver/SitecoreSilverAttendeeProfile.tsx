import type { JSX } from 'react';
import { ImageField, LinkField, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, linkHref, textValue } from '@/lib/sitecoresilver-field-utils';
import { ATTENDEE_SUMITH_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverAttendeeProfileFields {
  Name?: TextField;
  Pronouns?: TextField;
  Headline?: TextField;
  Role?: TextField;
  Company?: TextField;
  CompanyDescription?: TextField;
  Location?: TextField;
  AiQuote?: TextField;
  OriginalPhoto?: ImageField;
  EnhancedPhoto?: ImageField;
  LinkedIn?: LinkField;
}

export type SitecoreSilverAttendeeProfileProps = ComponentProps & {
  fields?: SitecoreSilverAttendeeProfileFields;
};

export const Default = (props: SitecoreSilverAttendeeProfileProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const d = ATTENDEE_SUMITH_DEFAULTS;
  const name = textValue(props.fields?.Name) || d.name;
  const pronouns = textValue(props.fields?.Pronouns) || d.pronouns;
  const headline = textValue(props.fields?.Headline) || d.headline;
  const role = textValue(props.fields?.Role) || d.role;
  const company = textValue(props.fields?.Company) || d.company;
  const companyDescription = textValue(props.fields?.CompanyDescription) || d.companyDescription;
  const location = textValue(props.fields?.Location) || d.location;
  const aiQuote = textValue(props.fields?.AiQuote) || d.aiQuote;
  const linkedIn = linkHref(props.fields?.LinkedIn) || d.linkedInUrl;
  const originalPhoto = imageSrc(props.fields?.OriginalPhoto, d.originalPhoto);
  const enhancedPhoto = imageSrc(props.fields?.EnhancedPhoto, d.enhancedPhoto);

  return (
    <section className="component ss-attendee sitecoresilver-texture" id={id}>
      <div className="ss-attendee-glow" aria-hidden />
      <div className="ss-attendee-inner">
        <header className="ss-attendee-header">
          <p className="ss-attendee-eyebrow">Silver Attendees · Copenhagen 2026</p>
          <h1 className="ss-attendee-name">
            {name}
            {pronouns && <span className="ss-attendee-pronouns">{pronouns}</span>}
          </h1>
          <p className="ss-attendee-headline">{headline}</p>
        </header>

        <div className="ss-attendee-portraits">
          <figure className="ss-attendee-portrait ss-attendee-portrait--original">
            <span className="ss-attendee-portrait-label">Original</span>
            <img src={originalPhoto} alt={`${name} — original photo`} width={480} height={360} />
          </figure>
          <div className="ss-attendee-portrait-divider" aria-hidden>
            <span>AI</span>
          </div>
          <figure className="ss-attendee-portrait ss-attendee-portrait--enhanced">
            <span className="ss-attendee-portrait-label">AI Enhanced</span>
            <img
              src={enhancedPhoto}
              alt={`${name} — AI enhanced portrait`}
              width={480}
              height={360}
            />
          </figure>
        </div>

        <blockquote className="ss-attendee-quote">
          <span className="ss-attendee-quote-badge">AI-generated insight</span>
          <p>&ldquo;{aiQuote}&rdquo;</p>
        </blockquote>

        <div className="ss-attendee-details">
          <div className="ss-attendee-card">
            <h2>At the celebration</h2>
            <p className="ss-attendee-role">{role}</p>
            <p className="ss-attendee-location">{location}</p>
          </div>
          <div className="ss-attendee-card ss-attendee-card--company">
            <h2>{company}</h2>
            <p>{companyDescription}</p>
            <Link
              href={linkedIn}
              className="ss-btn-primary ss-attendee-linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              View LinkedIn profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
