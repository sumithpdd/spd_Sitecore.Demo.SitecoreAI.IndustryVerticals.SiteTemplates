'use client';

import type { JSX } from 'react';
import {
  ImageField,
  Placeholder,
  useSitecore,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { hasImageValue } from '@/lib/sitecoresilver-field-utils';
import { NAV_DEFAULTS, SITECORE_LOGO_URL } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverEventHeaderFields {
  Logo?: ImageField;
}

export type SitecoreSilverEventHeaderProps = ComponentProps & {
  fields?: SitecoreSilverEventHeaderFields;
};

export const Default = (props: SitecoreSilverEventHeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const phKey = `sitecoresilver-header-nav-${props.params?.DynamicPlaceholderId ?? '1'}`;
  const fields = props.fields ?? {};

  return (
    <header className="component ss-header" id={id}>
      <div className="ss-header-inner">
        <Link href="/" className="ss-header-logo">
          {hasImageValue(fields.Logo) || isEditing ? (
            <ContentSdkImage field={fields.Logo} width={120} height={40} />
          ) : (
            <img src={SITECORE_LOGO_URL} alt="Sitecore" width={120} height={40} />
          )}
        </Link>
        <nav className="ss-header-nav" aria-label="Main">
          <ul className="ss-header-nav-list">
            {NAV_DEFAULTS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
          <Placeholder name={phKey} rendering={props.rendering} />
        </nav>
      </div>
    </header>
  );
};
