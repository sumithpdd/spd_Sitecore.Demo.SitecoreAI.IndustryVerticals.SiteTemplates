'use client';

import { JSX } from 'react';
import { Field, ImageField, LinkField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

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

  return (
    <header className="brother-header">
      <div className="brother-container brother-header__bar">
        <a className="brother-header__brand" href="/">
          <img src={logoSrc} alt={brand} width={116} height={28} />
          <span>{isEditing ? props.fields?.BrandName?.value || brand : brand}</span>
        </a>
        <nav className="brother-header__nav" aria-label="Primary">
          <a href="/labelling-and-receipts/vc-500w">Labelling</a>
          <a href="/devices/label-printer/vc/vc500w">Store</a>
          <a href="/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office">
            Blog
          </a>
          <a href="/labelling-and-receipts/vc-500w/vc-500w-vertical-applications">Applications</a>
        </nav>
        <div className="brother-header__actions">
          <a className="brother-btn brother-btn-outline" href="/devices/label-printer/vc/vc500w">
            Shop VC-500W
          </a>
        </div>
      </div>
    </header>
  );
};

export default Default;
