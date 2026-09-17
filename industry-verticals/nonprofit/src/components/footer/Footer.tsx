'use client';

import { JSX } from 'react';
import { ImageField, TextField, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { BRAND, FOOTER_LINKS, IMG } from '@/lib/openhand-catalog';
import Link from 'next/link';
import { OhMedia } from '@/lib/OhMedia';

type Fields = {
  CopyrightText?: TextField;
  Logo?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const FALLBACK_LOGO = IMG.logo;

export const Default = (props: Props): JSX.Element => {
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;

  return (
    <footer className="oh-footer" id={id}>
      <div className="oh-wrap oh-footer__grid">
        <div>
          <Link href="/" className="oh-footer__brand" aria-label={BRAND.name}>
            <OhMedia
              field={fields.Logo}
              fallback={FALLBACK_LOGO}
              className="oh-footer__logo"
              alt={BRAND.name}
            />
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
