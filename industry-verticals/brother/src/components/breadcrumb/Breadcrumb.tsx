'use client';

import { JSX, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { findPageByPath } from 'lib/page-catalog';
import { findProductByPath } from 'lib/products-catalog';

type Props = ComponentProps & { fields?: Record<string, unknown> };

type Crumb = { label: string; href: string };

const SEGMENT_LABELS: Record<string, string> = {
  devices: 'Devices',
  'label-printer': 'Label printers',
  labelling: 'Labelling',
  'labelling-and-receipts': 'Labelling and receipts',
  'business-solutions': 'Business solutions',
  'managed-print-service': 'Managed Print Service',
  'office-labelling': 'Office labelling',
  printers: 'Printers',
  scanners: 'Scanners',
  supplies: 'Supplies',
  campaigns: 'Campaigns',
  blog: 'Blog',
  vc: 'VC series',
  ql: 'QL series',
  pt: 'PT series',
  td: 'TD series',
  dcp: 'DCP series',
  mfc: 'MFC series',
  hl: 'HL series',
  ads: 'ADS series',
};

function resolvePath(routerPath: string, sitecorePath?: string): string {
  const fromRouter = (routerPath || '').split('?')[0].replace(/\/$/, '') || '';
  if (fromRouter && fromRouter !== '/') return fromRouter;
  if (sitecorePath) {
    const cleaned = sitecorePath
      .replace(/^\/sitecore\/content\/[^/]+\/[^/]+\/Home/i, '')
      .replace(/\/$/, '');
    return cleaned || '/';
  }
  return '/';
}

function crumbsFromPath(pathname: string): Crumb[] {
  const path = pathname || '/';
  const product = findProductByPath(path);
  const page = findPageByPath(path);
  const parts = path === '/' ? [] : path.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  let acc = '';
  parts.forEach((part, index) => {
    acc += `/${part}`;
    const isLast = index === parts.length - 1;
    let label = SEGMENT_LABELS[part] || part.replace(/-/g, ' ');
    if (isLast && product) label = product.title;
    else if (isLast && page) label = page.title;
    else if (!SEGMENT_LABELS[part]) label = label.replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: acc });
  });

  return crumbs;
}

/** Path-based breadcrumb — works without GraphQL ComponentQuery. */
export const Default = (_props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const sitecorePath =
    (page as { layout?: { sitecore?: { route?: { itemPath?: string; path?: string } } } })?.layout
      ?.sitecore?.route?.itemPath ||
    (page as { layout?: { sitecore?: { route?: { itemPath?: string; path?: string } } } })?.layout
      ?.sitecore?.route?.path;

  const path = useMemo(() => {
    if (!router.isReady && !sitecorePath) return '';
    return resolvePath(router.asPath || '', sitecorePath);
  }, [router.isReady, router.asPath, sitecorePath]);

  const crumbs = path ? crumbsFromPath(path) : [];
  if (crumbs.length <= 1) return <></>;

  return (
    <nav className="brother-breadcrumb" aria-label="Breadcrumb">
      <div className="brother-container">
        <ol>
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.href}>
                {last ? (
                  <span aria-current="page">{c.label}</span>
                ) : (
                  <>
                    <a href={c.href}>{c.label}</a>
                    <span className="brother-breadcrumb__sep" aria-hidden="true">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Default;
