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
import { Search, ShoppingBag, User } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { KP_CONTACT_PHONE, KP_MAIN_NAV } from '@/lib/keith-prowse-defaults';
import { isKeithProwseSite } from '@/lib/lyveragroup-site';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { LYVERA_BRANDS, LYVERA_CONTACT_EMAIL, LYVERA_MAIN_NAV } from '@/lib/lyvera-defaults';

export interface LyveraHeaderFields {
  LogoImage?: ImageField;
  ContactEmail?: TextField;
  PhoneNumber?: TextField;
}

export type LyveraHeaderProps = ComponentProps & {
  fields?: LyveraHeaderFields;
};

const textValue = (field?: TextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

const hasLogoImage = (field?: ImageField): boolean => Boolean(field?.value?.src);

function KeithProwseHeader(props: LyveraHeaderProps): JSX.Element {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};
  const phone = textValue(fields.PhoneNumber) || KP_CONTACT_PHONE;
  const showLogoImage = hasLogoImage(fields.LogoImage) || isEditing;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [vatOn, setVatOn] = useState(true);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className={sharedComponentModifier(
        page,
        'component lyvera-header lyvera-header--keithprowse'
      )}
      id={id}
      data-lg-header-variant="keithprowse"
    >
      <div className="lyvera-kp-header-utility">
        <div className="lyvera-kp-header-utility__inner">
          <div className="lyvera-kp-header-utility__left">
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="lyvera-kp-header-utility__link">
              Call: {phone}
            </a>
            <Link href="/contact-us" className="lyvera-kp-header-utility__link">
              Contact us
            </Link>
          </div>
          <label className="lyvera-kp-vat-toggle">
            <span>Show prices with VAT</span>
            <button
              type="button"
              role="switch"
              aria-checked={vatOn}
              className={`lyvera-kp-vat-toggle__switch ${vatOn ? 'is-on' : ''}`}
              onClick={() => setVatOn((v) => !v)}
            />
          </label>
          <div className="lyvera-kp-header-utility__right">
            <Link href="/account" className="lyvera-kp-header-utility__link">
              My account
            </Link>
            <Link href="/basket" className="lyvera-kp-header-utility__link">
              Basket (0)
            </Link>
            <button type="button" className="lyvera-kp-header-icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="lyvera-kp-header-main">
        <div className="lyvera-kp-header-main__inner">
          <Link
            href="/"
            className="lyvera-kp-logo"
            aria-label="Keith Prowse home"
            onClick={closeMobile}
          >
            {showLogoImage ? (
              <ContentSdkImage field={fields.LogoImage} className="lyvera-kp-logo__image" />
            ) : (
              <span className="lyvera-kp-logo__text">Keith Prowse</span>
            )}
          </Link>

          <nav className="lyvera-kp-nav lyvera-kp-nav--desktop" aria-label="Main">
            {KP_MAIN_NAV.map((item) => (
              <Link key={item.href} href={item.href} className="lyvera-kp-nav__link">
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="lyvera-kp-header-actions">
            <Link
              href="/account"
              className="lyvera-kp-header-icon-btn lyvera-kp-header-icon-btn--desktop"
              aria-label="My account"
            >
              <User size={20} />
            </Link>
            <Link
              href="/basket"
              className="lyvera-kp-header-icon-btn lyvera-kp-header-icon-btn--desktop"
              aria-label="Basket"
            >
              <ShoppingBag size={20} />
            </Link>
            <button
              type="button"
              className="lyvera-nav-toggle lyvera-kp-nav-toggle"
              aria-expanded={mobileOpen}
              aria-controls="lyvera-kp-mobile-nav"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        id="lyvera-kp-mobile-nav"
        className={`lyvera-kp-mobile-nav ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="lyvera-kp-mobile-nav__links">
          {KP_MAIN_NAV.map((item) => (
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
}

function LyveraCorporateHeader(props: LyveraHeaderProps): JSX.Element {
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
    <header
      className={sharedComponentModifier(page, 'component lyvera-header lyvera-header--lyvera')}
      id={id}
      data-lg-header-variant="lyvera"
    >
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
}

/** Shared header — branches on site like PepsiCoHeader (Pepsi vs Lay's). */
export const Default = (props: LyveraHeaderProps): JSX.Element => {
  const { page } = useSitecore();
  return isKeithProwseSite(page) ? KeithProwseHeader(props) : LyveraCorporateHeader(props);
};

/** Explicit variant for Keith Prowse partial design */
export const KeithProwse = KeithProwseHeader;

/** Explicit variant for Lyvera corporate partial design */
export const LyveraCorporate = LyveraCorporateHeader;
