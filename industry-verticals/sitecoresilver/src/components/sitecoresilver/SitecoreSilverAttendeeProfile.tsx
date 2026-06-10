import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  useSitecore,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { hasImageValue, hasLinkValue, imageSrc, linkHref, richTextValue, textValue } from '@/lib/sitecoresilver-field-utils';
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
  PhotoCode?: TextField;
}

export type SitecoreSilverAttendeeProfileProps = ComponentProps & {
  fields?: SitecoreSilverAttendeeProfileFields;
};

export const Default = (props: SitecoreSilverAttendeeProfileProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const d = ATTENDEE_SUMITH_DEFAULTS;

  /** Profile pages use the attendee template on the route item; legacy pages may still use a Data datasource. */
  const routeFields = (page.layout.sitecore.route?.fields ?? {}) as Partial<
    SitecoreSilverAttendeeProfileFields & { Title?: TextField }
  >;
  const fields: Partial<SitecoreSilverAttendeeProfileFields> = {
    ...props.fields,
    ...routeFields,
  };
  const nameField = fields.Name ?? routeFields.Title;
  const originalPhotoSrc =
    imageSrc(fields.OriginalPhoto) || textValue(fields.OriginalPhoto as TextField);
  const enhancedPhotoSrc =
    imageSrc(fields.EnhancedPhoto) || textValue(fields.EnhancedPhoto as TextField);
  const linkedInHref =
    linkHref(fields.LinkedIn) || textValue(fields.LinkedIn as TextField) || d.linkedInUrl;

  return (
    <section className="component ss-attendee sitecoresilver-texture" id={id}>
      <div className="ss-attendee-glow" aria-hidden />
      <div className="ss-attendee-inner">
        <header className="ss-attendee-header">
          <p className="ss-attendee-eyebrow">Silver Attendees · Copenhagen 2026</p>
          <h1 className="ss-attendee-name">
            <ContentSdkText field={nameField} tag="span" />
            {!textValue(nameField) && !isEditing && d.name}
            {(textValue(fields.Pronouns) || isEditing) && (
              <span className="ss-attendee-pronouns">
                <ContentSdkText field={fields.Pronouns} tag="span" />
                {!textValue(fields.Pronouns) && !isEditing && d.pronouns}
              </span>
            )}
          </h1>
          <p className="ss-attendee-headline">
            <ContentSdkText field={fields.Headline} tag="span" />
            {!textValue(fields.Headline) && !isEditing && d.headline}
          </p>
        </header>

        <div className="ss-attendee-portraits">
          <figure className="ss-attendee-portrait ss-attendee-portrait--original">
            <span className="ss-attendee-portrait-label">Original</span>
            {hasImageValue(fields.OriginalPhoto) || isEditing ? (
              <ContentSdkImage
                field={fields.OriginalPhoto}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            ) : originalPhotoSrc ? (
              <img
                src={originalPhotoSrc}
                alt={`${textValue(nameField) || d.name} — original photo`}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            ) : (
              <img
                src={d.originalPhoto}
                alt={`${d.name} — original photo`}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            )}
          </figure>
          <div className="ss-attendee-portrait-divider" aria-hidden>
            <span>AI</span>
          </div>
          <figure className="ss-attendee-portrait ss-attendee-portrait--enhanced">
            <span className="ss-attendee-portrait-label">AI Enhanced</span>
            {hasImageValue(fields.EnhancedPhoto) || isEditing ? (
              <ContentSdkImage
                field={fields.EnhancedPhoto}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            ) : enhancedPhotoSrc ? (
              <img
                src={enhancedPhotoSrc}
                alt={`${textValue(nameField) || d.name} — AI enhanced portrait`}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            ) : (
              <img
                src={d.enhancedPhoto}
                alt={`${d.name} — AI enhanced portrait`}
                className="ss-attendee-portrait-img"
                width={480}
                height={360}
              />
            )}
          </figure>
        </div>

        {(textValue(fields.PhotoCode) || isEditing) && (
          <p className="ss-attendee-photo-code">
            Your Photo:{' '}
            <ContentSdkText
              field={fields.PhotoCode}
              tag="span"
              className="ss-attendee-photo-code-value"
            />
          </p>
        )}

        <blockquote className="ss-attendee-quote">
          <span className="ss-attendee-quote-badge">AI-generated insight</span>
          <p>
            &ldquo;
            <ContentSdkText field={fields.AiQuote} tag="span" />
            {!textValue(fields.AiQuote) && !richTextValue(fields.AiQuote) && !isEditing && d.aiQuote}
            &rdquo;
          </p>
        </blockquote>

        <div className="ss-attendee-details">
          <div className="ss-attendee-card">
            <h2>At the celebration</h2>
            <p className="ss-attendee-role">
              <ContentSdkText field={fields.Role} tag="span" />
              {!textValue(fields.Role) && !isEditing && d.role}
            </p>
            <p className="ss-attendee-location">
              <ContentSdkText field={fields.Location} tag="span" />
              {!textValue(fields.Location) && !isEditing && d.location}
            </p>
          </div>
          <div className="ss-attendee-card ss-attendee-card--company">
            <h2>
              <ContentSdkText field={fields.Company} tag="span" />
              {!textValue(fields.Company) && !isEditing && d.company}
            </h2>
            <p>
              <ContentSdkText field={fields.CompanyDescription} tag="span" />
              {!textValue(fields.CompanyDescription) && !isEditing && d.companyDescription}
            </p>
            {fields.LinkedIn && (hasLinkValue(fields.LinkedIn) || isEditing) ? (
              <ContentSdkLink
                field={fields.LinkedIn}
                className="ss-btn-primary ss-attendee-linkedin"
              />
            ) : linkedInHref && linkedInHref !== '#' ? (
              <a
                href={linkedInHref}
                className="ss-btn-primary ss-attendee-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn profile
              </a>
            ) : (
              <a
                href={d.linkedInUrl}
                className="ss-btn-primary ss-attendee-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                View LinkedIn profile
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
