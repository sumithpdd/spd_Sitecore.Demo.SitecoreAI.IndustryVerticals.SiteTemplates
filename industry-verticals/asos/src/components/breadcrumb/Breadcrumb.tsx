'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { withMarket, type MarketCode } from '@/lib/asos-market';

type Crumb = { label: string; href?: string };

type Props = {
  path: string;
  title: string;
  market: MarketCode;
};

function crumbsFor(path: string, title: string): Crumb[] {
  const parts = path.split('?')[0].split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];
  if (
    parts[0] === 'women' ||
    parts[0] === 'men' ||
    parts[0] === 'edits' ||
    parts[0] === 'products'
  ) {
    const section = parts[0] === 'edits' ? 'Edits' : parts[0][0].toUpperCase() + parts[0].slice(1);
    crumbs.push({ label: section, href: `/${parts[0]}` });
  }
  if (parts.length > 1) {
    crumbs.push({ label: title });
  } else if (parts.length === 1 && crumbs.length === 1) {
    crumbs.push({ label: title });
  } else if (crumbs[crumbs.length - 1]?.label !== title) {
    crumbs.push({ label: title });
  }
  return crumbs;
}

export const Breadcrumb = ({ path, title, market }: Props): JSX.Element => {
  const crumbs = crumbsFor(path, title);
  return (
    <nav className="asos-crumbs" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={`${crumb.label}-${index}`}>
          {index > 0 ? <span aria-hidden="true"> › </span> : null}
          {crumb.href && index < crumbs.length - 1 ? (
            <Link href={withMarket(crumb.href, market)}>{crumb.label}</Link>
          ) : (
            <span>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
