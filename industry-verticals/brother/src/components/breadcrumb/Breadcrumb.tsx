'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { findPageByPath } from 'lib/page-catalog';
import { findProductByPath } from 'lib/products-catalog';

type Props = ComponentProps & { fields?: Record<string, unknown> };

type Crumb = { label: string; href: string };

function crumbsFromPath(pathname: string): Crumb[] {
  const path = (pathname || '').split('?')[0].replace(/\/$/, '') || '/';
  const product = findProductByPath(path);
  const page = findPageByPath(path);

  const parts = path === '/' ? [] : path.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }];

  let acc = '';
  parts.forEach((part, index) => {
    acc += `/${part}`;
    const isLast = index === parts.length - 1;
    let label = part.replace(/-/g, ' ');
    if (isLast && product) label = product.title;
    else if (isLast && page) label = page.title;
    else if (part === 'labelling-and-receipts') label = 'Labelling and receipts';
    else if (part === 'business-solutions') label = 'Business solutions';
    else if (part === 'managed-print-service') label = 'Managed Print Service';
    else if (part === 'label-printer') label = 'Label printers';
    else if (part === 'office-labelling') label = 'Office labelling';
    else label = label.replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: acc });
  });

  return crumbs;
}

/** Path-based breadcrumb — works without GraphQL ComponentQuery. */
export const Default = (_props: Props): JSX.Element => {
  const router = useRouter();
  const crumbs = crumbsFromPath(router.asPath || '/');
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
