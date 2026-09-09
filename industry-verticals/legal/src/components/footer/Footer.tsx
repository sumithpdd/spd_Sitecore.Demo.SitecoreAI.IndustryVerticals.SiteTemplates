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

interface Fields {
  CopyrightText?: TextField;
  Logo?: ImageField;
}

type FooterProps = ComponentProps & {
  fields?: Fields;
};

const Footer = (props: FooterProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields || {};

  return (
    <div className="pm-footer" id={id}>
      <div className="pm-footer__top">
        <div className="container mx-auto grid gap-10 py-12 md:grid-cols-3">
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
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="pm-footer__offices">
            <h3>We have 31 offices across four continents</h3>
            <Link className="pm-btn-dark" href="/offices">
              Find your nearest office
            </Link>
          </div>
        </div>
      </div>
      <div className="pm-footer__bottom">
        <div className="container mx-auto flex items-center justify-between py-4 text-sm">
          <p>
            <ContentSdkText field={fields.CopyrightText} />
            {!fields.CopyrightText?.value && '2026 Copyright Pinsent Masons LLP'}
          </p>
        </div>
      </div>
    </div>
  );
};

export const Default = Footer;
