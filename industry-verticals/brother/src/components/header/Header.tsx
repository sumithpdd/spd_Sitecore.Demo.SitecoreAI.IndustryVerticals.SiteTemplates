'use client';

import { JSX } from 'react';
import { Field, ImageField, LinkField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { HeaderSearch } from 'lib/HeaderSearch';

type Fields = {
  BrandName?: Field<string>;
  Logo?: ImageField;
  SearchPlaceholder?: Field<string>;
  ShopLink?: LinkField;
  SupportLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const brand = props.fields?.BrandName?.value || 'Brother';
  const logoSrc =
    (props.fields?.Logo?.value as { src?: string } | undefined)?.src || brotherImages.logo;
  const placeholder = props.fields?.SearchPlaceholder?.value || 'Search Brother';

  return (
    <header className="brother-header">
      <div className="brother-container brother-header__bar">
        <a className="brother-header__brand" href="/">
          <img src={logoSrc} alt={brand} width={116} height={28} />
          <span>{isEditing ? props.fields?.BrandName?.value || brand : brand}</span>
        </a>
        <nav className="brother-header__nav" aria-label="Primary">
          <a href="/labelling-and-receipts">Labelling</a>
          <a href="/printers">Printers</a>
          <a href="/scanners">Scanners</a>
          <a href="/devices">All devices</a>
          <a href="/business-solutions">Business</a>
          <a href="/supplies">Supplies</a>
          <a href="/support">Support</a>
          <a href="/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office">
            Blog
          </a>
        </nav>
        <div className="brother-header__actions">
          <HeaderSearch placeholder={placeholder} />
          <a className="brother-btn brother-btn-outline" href="/search">
            Search
          </a>
        </div>
      </div>
    </header>
  );
};

export default Default;
