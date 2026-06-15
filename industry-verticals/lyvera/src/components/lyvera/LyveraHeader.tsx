'use client';

import type { JSX } from 'react';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  TextField,
  ImageField,
  useSitecore,
  Text as ContentSdkText,
  Image as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_BRANDS, LYVERA_CONTACT_EMAIL, LYVERA_MAIN_NAV } from '@/lib/lyvera-defaults';

export interface LyveraHeaderFields {
  LogoImage?: ImageField;
  ContactEmail?: TextField;
}

export type LyveraHeaderProps = ComponentProps & {
  fields?: LyveraHeaderFields;
};

const textValue = (field?: TextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

const hasLogoImage = (field?: ImageField): boolean => Boolean(field?.value?.src);

export const Default = (props: LyveraHeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};
  const contactEmail = textValue(fields.ContactEmail) || LYVERA_CONTACT_EMAIL;
  const showLogoImage = hasLogoImage(fields.LogoImage) || isEditing;

  const [brandsOpen, setBrandsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="component lyvera-header" id={id}>
      <div className="lyvera-header-utility">
        <a href={`mailto:${contactEmail}`} className="lyvera-header-email">
          <ContentSdkText field={fields.ContactEmail} tag="span" />
          {!textValue(fields.ContactEmail) && !isEditing && contactEmail}
        </a>
      </div>

      <div className="lyvera-header-main">
        <div className="lyvera-header-inner">
          <Link href="/" className="lyvera-logo" aria-label="Lyvera home" onClick={closeMobile}>
            {showLogoImage ? (
              <ContentSdkImage field={fields.LogoImage} className="lyvera-logo-image" />
            ) : (
              <span className="lyvera-logo-text">Lyvera</span>
            )}
          </Link>

          <nav className="lyvera-nav lyvera-nav--desktop" aria-label="Main">
            <div
              className={`lyvera-nav-dropdown ${brandsOpen ? 'is-open' : ''}`}
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <button
                type="button"
                className="lyvera-nav-link lyvera-nav-dropdown-trigger"
                aria-expanded={brandsOpen}
                aria-haspopup="true"
                onClick={() => setBrandsOpen((open) => !open)}
              >
                Our brands
                <span className="lyvera-chevron" aria-hidden />
              </button>
              <ul className="lyvera-nav-dropdown-menu" role="menu">
                {LYVERA_BRANDS.map((brand) => (
                  <li key={brand.href} role="none">
                    <a href={brand.href} role="menuitem" className="lyvera-nav-dropdown-item">
                      {brand.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {LYVERA_MAIN_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="lyvera-nav-link">
                {item.text}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="lyvera-nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="lyvera-mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="lyvera-mobile-nav"
        className={`lyvera-mobile-nav ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <p className="lyvera-mobile-nav-heading">Our brands</p>
        <ul className="lyvera-mobile-brands">
          {LYVERA_BRANDS.map((brand) => (
            <li key={brand.href}>
              <a href={brand.href} onClick={closeMobile}>
                {brand.text}
              </a>
            </li>
          ))}
        </ul>
        <ul className="lyvera-mobile-links">
          {LYVERA_MAIN_NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={closeMobile}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
