'use client';

import { JSX, useState } from 'react';
import { Field, ImageField, Image, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Menu, Search, X } from 'lucide-react';
import { PRIMARY_NAV } from '@/lib/people-catalog';
import Link from 'next/link';

type Fields = {
  BrandName?: Field<string>;
  Logo?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

const logoSrc = (logo?: ImageField): string => {
  const value = logo?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const brand = fields.BrandName?.value || 'Pinsent Masons';
  const hasLogo = Boolean(logoSrc(fields.Logo));
  const [open, setOpen] = useState(false);

  return (
    <header className="pm-header">
      <div className="pm-header__bar">
        <a className="pm-header__brand" href="/" aria-label={brand}>
          {hasLogo || isEditing ? (
            <Image field={fields.Logo} editable={isEditing} className="pm-header__logo" />
          ) : (
            <span className="pm-header__wordmark">
              <span className="pm-header__mark" aria-hidden="true" />
              {fields.BrandName?.value ? (
                <Text field={fields.BrandName} tag="span" />
              ) : (
                <span>{brand}</span>
              )}
            </span>
          )}
        </a>
        <nav className="pm-header__nav" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="pm-header__actions">
          <Link href="/people" className="pm-header__search" aria-label="Search people">
            <Search className="size-5" />
          </Link>
          <button
            type="button"
            className="pm-header__menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
      {open && (
        <div className="pm-header__drawer">
          <button
            type="button"
            className="pm-header__close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <X className="size-5" />
          </button>
          <nav aria-label="Mobile">
            {PRIMARY_NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Default;
