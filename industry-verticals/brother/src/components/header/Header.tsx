'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Image,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { imageSrc } from 'lib/cms-fields';
import { HeaderSearch } from 'lib/HeaderSearch';
import { CartLink } from 'lib/CartLink';

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
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const brand = fields.BrandName?.value || 'Brother';
  const placeholder = fields.SearchPlaceholder?.value || 'Search Brother';
  const logoFallback = brotherImages.logo;
  const hasLogoMedia = Boolean(imageSrc(fields.Logo));

  return (
    <header className="brother-header">
      <div className="brother-container brother-header__bar">
        <a className="brother-header__brand" href="/">
          {hasLogoMedia || isEditing ? (
            <Image field={fields.Logo} editable={isEditing} className="brother-header__logo" />
          ) : (
            <img
              className="brother-header__logo"
              src={logoFallback}
              alt={brand}
              width={116}
              height={28}
            />
          )}
          {hasLogoMedia && !isEditing ? null : fields.BrandName?.value || isEditing ? (
            <Text field={fields.BrandName} tag="span" />
          ) : (
            <span>{brand}</span>
          )}
        </a>
        <nav className="brother-header__nav" aria-label="Primary">
          <a href="/labelling-and-receipts">Labelling</a>
          <a href="/printers">Printers</a>
          <a href="/scanners">Scanners</a>
          <a href="/devices">All devices</a>
          <a href="/campaigns/at-your-side">Campaign</a>
          <a href="/business-solutions">Business</a>
          <a href="/supplies">Supplies</a>
          <a href="/search">Search</a>
        </nav>
        <div className="brother-header__actions">
          <HeaderSearch placeholder={placeholder} />
          <CartLink />
        </div>
      </div>
    </header>
  );
};

export default Default;
