'use client';

import { JSX, useState } from 'react';
import { Field, ImageField, Image, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BRAND, PRIMARY_NAV } from '@/lib/openhand-catalog';
import { parseDemoParams, withDemoParams } from '@/lib/demo-params';
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
  const demo = parseDemoParams(router.asPath);
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const brand = fields.BrandName?.value || BRAND.name;
  const hasLogo = Boolean(logoSrc(fields.Logo));
  const [open, setOpen] = useState(false);
  const path = router.asPath.split('?')[0];
  const emergency = demo.appeal === 'emergency';
  const winter = demo.appeal === 'winter';

  return (
    <>
      {(winter || emergency) && (
        <div className="oh-takeover">
          <div className="oh-wrap">
            <span>
              {emergency
                ? 'Emergency appeal is live — first 72 hours of partner response.'
                : 'Winter warmth: gifts matched until 21 December.'}
            </span>
            <Link href={withDemoParams(emergency ? '/appeals/emergency' : '/appeals/winter', demo)}>
              Give now
            </Link>
          </div>
        </div>
      )}
      <header className="oh-header">
        <div className="oh-wrap oh-header__bar">
          <Link className="oh-header__brand" href={withDemoParams('/', demo)} aria-label={brand}>
            {hasLogo || isEditing ? (
              <Image field={fields.Logo} editable={isEditing} />
            ) : (
              <>
                <span className="oh-header__mark" aria-hidden="true" />
                {fields.BrandName?.value ? (
                  <Text field={fields.BrandName} tag="span" />
                ) : (
                  <span>{brand}</span>
                )}
              </>
            )}
          </Link>
          <nav className="oh-header__nav" aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const active = path === item.href || path.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={withDemoParams(item.href, demo)}
                  className={active ? 'is-active' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="oh-header__actions">
            <HeaderSearch />
            <Link className="oh-btn oh-btn--amber" href={withDemoParams('/donate', demo)}>
              Donate
            </Link>
            <button
              type="button"
              className="oh-header__menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="oh-header__drawer">
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={withDemoParams(item.href, demo)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href={withDemoParams('/search', demo)} onClick={() => setOpen(false)}>
              Search
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Default;
