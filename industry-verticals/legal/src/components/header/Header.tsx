'use client';

import { JSX, useState } from 'react';
import { Field, ImageField, Image, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Menu, X } from 'lucide-react';
import { PRIMARY_NAV } from '@/lib/people-catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HeaderDemoAuth } from '@/components/demo/HeaderDemoAuth';
import { HeaderSearch } from '@/lib/HeaderSearch';

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
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const brand = fields.BrandName?.value || 'Pinsent Masons';
  const hasLogo = Boolean(logoSrc(fields.Logo));
  const [open, setOpen] = useState(false);
  const path = router.asPath.split('?')[0];
  const styles = `${props.params?.styles || ''}`.trim();

  return (
    <header className={`pm-header w-full ${styles}`.trim()}>
      <div className="pm-wrap pm-header__bar">
        <Link className="pm-header__brand" href="/" aria-label={brand}>
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
        </Link>
        <nav className="pm-header__nav" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            const active = path === item.href || path.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="pm-header__actions">
          <HeaderDemoAuth />
          <HeaderSearch />
          <button
            type="button"
            className="pm-header__menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="pm-header__drawer">
          <nav aria-label="Mobile">
            {PRIMARY_NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/search" onClick={() => setOpen(false)}>
              Search
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Default;
