import type { JSX } from 'react';
import Link from 'next/link';
import {
  TextField,
  ImageField,
  useSitecore,
  Text as ContentSdkText,
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  LYVERA_BRANDS,
  LYVERA_CONTACT_EMAIL,
  LYVERA_FOOTER_LEGAL,
  LYVERA_FOOTER_TAGLINE,
  LYVERA_FOOTER_USEFUL_LINKS,
  LYVERA_SOCIAL,
} from '@/lib/lyvera-defaults';

export interface LyveraFooterFields {
  LogoImage?: ImageField;
  Tagline?: TextField;
  ContactEmail?: TextField;
}

export type LyveraFooterProps = ComponentProps & {
  fields?: LyveraFooterFields;
};

const textValue = (field?: TextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

const hasLogoImage = (field?: ImageField): boolean => Boolean(field?.value?.src);

const SocialIcon = ({ icon }: { icon: string }): JSX.Element => {
  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" fill="currentColor">
        <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.6c0-1.1-.02-2.5-1.52-2.5-1.52 0-1.75 1.19-1.75 2.42V19h-3v-9h2.88v1.23h.04a3.16 3.16 0 012.85-1.57c3.05 0 3.61 2.01 3.61 4.62z" />
      </svg>
    );
  }
  if (icon === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" fill="currentColor">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.08 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.23 2.68.23v2.95h-1.51c-1.49 0-1.95.92-1.95 1.87v2.24h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.08 24 12.07z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden width="18" height="18" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .4.5.7.9.9 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.4-.9.7-1.5.9-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.4-.5-.7-.9-.9-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.4.9-.7 1.5-.9.4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0 5.7.1 4.8.3 4 .6 3.1.9 2.4 1.4 1.7 2.1.9 2.9.4 3.6.1 4.5-.2 5.3-.4 6.2-.5 7.5-.6 8.9-.6 12s0 4.4.1 5.7c.1 1.3.3 2.2.6 3 .3.9.8 1.6 1.5 2.3.7.7 1.4 1.2 2.3 1.5.8.3 1.7.5 3 .6 1.3.1 1.7.1 5 .1s4.4 0 5.7-.1c1.3-.1 2.2-.3 3-.6.9-.3 1.6-.8 2.3-1.5.7-.7 1.2-1.4 1.5-2.3.3-.8.5-1.7.6-3 .1-1.3.1-1.7.1-5.7s0-4.4-.1-5.7c-.1-1.3-.3-2.2-.6-3-.3-.9-.8-1.6-1.5-2.3-.7-.7-1.4-1.2-2.3-1.5-.8-.3-1.7-.5-3-.6C15.6 0 15.2 0 12 0z" />
      <path d="M12 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zm0 10.2a4 4 0 110-8 4 4 0 010 8zm6.4-11.5a1.4 1.4 0 11-2.9 0 1.4 1.4 0 012.9 0z" />
    </svg>
  );
};

export const Default = (props: LyveraFooterProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};
  const contactEmail = textValue(fields.ContactEmail) || LYVERA_CONTACT_EMAIL;
  const showLogoImage = hasLogoImage(fields.LogoImage) || isEditing;

  return (
    <footer className="component lyvera-footer" id={id}>
      <div className="lyvera-footer-inner">
        <div className="lyvera-footer-top">
          <div className="lyvera-footer-brand">
            <div className="lyvera-footer-brand-row">
              <Link href="/" className="lyvera-logo lyvera-logo--footer" aria-label="Lyvera home">
                {showLogoImage ? (
                  <ContentSdkImage
                    field={fields.LogoImage}
                    className="lyvera-logo-image lyvera-logo-image--footer"
                  />
                ) : (
                  <span className="lyvera-logo-text">Lyvera</span>
                )}
              </Link>
              <ul className="lyvera-footer-social" aria-label="Social media">
                {LYVERA_SOCIAL.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                    >
                      <SocialIcon icon={item.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="lyvera-footer-tagline">
              <ContentSdkText field={fields.Tagline} tag="span" />
              {!textValue(fields.Tagline) && !isEditing && LYVERA_FOOTER_TAGLINE}
            </p>
          </div>

          <div className="lyvera-footer-columns">
            <div className="lyvera-footer-col">
              <h2>Our brands</h2>
              <ul>
                {LYVERA_BRANDS.map((brand) => (
                  <li key={brand.href}>
                    <a href={brand.href}>{brand.text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lyvera-footer-col">
              <h2>Useful links</h2>
              <ul>
                {LYVERA_FOOTER_USEFUL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lyvera-footer-col">
              <h2>Get in touch</h2>
              <ul>
                <li>
                  <a href={`mailto:${contactEmail}`}>
                    <ContentSdkText field={fields.ContactEmail} tag="span" />
                    {!textValue(fields.ContactEmail) && !isEditing && contactEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lyvera-footer-legal">
          <ul>
            {LYVERA_FOOTER_LEGAL.map((link, index) => (
              <li key={link.href}>
                <Link href={link.href}>{link.text}</Link>
                {index < LYVERA_FOOTER_LEGAL.length - 1 && (
                  <span className="lyvera-footer-sep" aria-hidden>
                    |
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
