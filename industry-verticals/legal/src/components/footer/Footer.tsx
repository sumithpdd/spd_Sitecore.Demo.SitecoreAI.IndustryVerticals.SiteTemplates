import React, { JSX } from 'react';
import {
  ImageField,
  TextField,
  Text as ContentSdkText,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { FOOTER_LINKS } from '@/lib/people-catalog';
import Link from 'next/link';
import { Linkedin, Facebook, Youtube } from 'lucide-react';

interface Fields {
  CopyrightText?: TextField;
  Logo?: ImageField;
  OfficeMap?: ImageField;
}

type FooterProps = ComponentProps & {
  fields?: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields || {};

  return (
    <div className="pm-footer w-full" id={id}>
      <div className="pm-footer__top">
        <div className="pm-wrap grid gap-10 py-14 md:grid-cols-3">
          <div>
            {fields.Logo?.value?.src ? (
              <ContentSdkImage field={fields.Logo} className="pm-footer__logo" width={180} />
            ) : (
              <div className="pm-header__wordmark">
                <span className="pm-header__mark" aria-hidden="true" />
                <span>Pinsent Masons</span>
              </div>
            )}
          </div>
          <ul className="pm-footer__links">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="pm-footer__offices">
            <h3>We have 31 offices across four continents</h3>
            <div className="pm-footer__map">
              {fields.OfficeMap?.value?.src ? (
                <ContentSdkImage field={fields.OfficeMap} className="pm-footer__map-img" />
              ) : (
                <svg viewBox="0 0 280 120" className="pm-footer__map-svg" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M38 48c8-18 22-22 38-18 10 2 18 10 28 8 6-1 10-8 18-8 14 1 18 14 30 16 12 2 20-8 32-6 16 3 22 16 36 18 10 1 22-6 32-2 8 4 10 14 6 22-12 22-40 18-58 12-16-6-22 4-38 4-18 0-24-12-40-12-12 0-16 10-30 10-18 1-32-10-42-22-6-8-8-18-12-22z"
                  />
                </svg>
              )}
            </div>
            <Link className="pm-btn-outline" href="/offices">
              Find your nearest office
            </Link>
          </div>
        </div>
      </div>
      <div className="pm-footer__bottom">
        <div className="pm-wrap flex items-center justify-between gap-4 py-4 text-sm">
          <p>
            <ContentSdkText field={fields.CopyrightText} />
            {!fields.CopyrightText?.value && '2026 Copyright Pinsent Masons LLP'}
          </p>
          <div className="pm-footer__social">
            <a href="https://www.linkedin.com/company/pinsent-masons" aria-label="LinkedIn">
              <Linkedin className="size-4" />
            </a>
            <a href="https://www.facebook.com/PinsentMasons" aria-label="Facebook">
              <Facebook className="size-4" />
            </a>
            <a href="https://www.youtube.com/user/PinsentMasonsLLP" aria-label="YouTube">
              <Youtube className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Default = Footer;
