'use client';

import { JSX } from 'react';
import { ImageField, TextField, Text, Image, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { BRAND, FOOTER_LINKS } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Fields = {
  CopyrightText?: TextField;
  Logo?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const FALLBACK_LOGO = '/openhand/openhand-logo.png';

const logoSrc = (logo?: ImageField): string => {
  const value = logo?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const src = logoSrc(fields.Logo);
  const logo = src && !src.includes('sitecoresandbox.cloud') ? src : FALLBACK_LOGO;

  return (
    <footer className="oh-footer" id={id}>
      <div className="oh-wrap oh-footer__grid">
        <div>
          <Link href="/" className="oh-footer__brand" aria-label={BRAND.name}>
            {isEditing && src ? (
              <Image field={fields.Logo} editable={isEditing} className="oh-footer__logo" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logo} alt={BRAND.name} className="oh-footer__logo" />
            )}
          </Link>
          <p className="mt-3 max-w-sm text-sm">{BRAND.tagline}</p>
        </div>
        <ul className="grid gap-2">
          {FOOTER_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
        <div>
          <h3 className="mb-2 font-semibold">In your area</h3>
          <p className="text-sm">
            Find a partner hub for energy, rent and emergency grants — the Age UK local-services
            pattern, for crisis support.
          </p>
          <Link className="oh-btn oh-btn--amber mt-4" href="/get-help/near-you">
            Find help near you
          </Link>
        </div>
      </div>
      <div className="oh-wrap border-t border-white/15 py-4 text-sm">
        {fields.CopyrightText?.value ? <Text field={fields.CopyrightText} /> : BRAND.copyright}
      </div>
    </footer>
  );
};

export default Default;
