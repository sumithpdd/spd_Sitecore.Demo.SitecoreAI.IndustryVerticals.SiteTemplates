'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const HOME_ITEM = '/sitecore/content/capco/capco/home';

const LABELS: Record<string, string> = {
  industries: 'Expertise',
  perspectives: 'Perspectives',
  people: 'Meet our people',
  careers: 'Join Us',
  'about-us': 'Our Story',
  'expertise-in-action': 'Expertise in Action',
  ai: 'AI Infused',
  search: 'Search',
  contact: 'Contact',
  preferences: 'Preference centre',
  'capco-institute': 'Capco Institute',
  events: 'Events',
  energy: 'Energy',
  'uk-energy': 'UK Energy',
  'banking-and-payments': 'Banking and Payments',
};

const SKIP = new Set(['api', 'editing', 'render', 'feaas', 'sitecore']);

function labelFor(slug: string): string {
  return LABELS[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function pathFromItem(itemPath: string): string {
  const lower = itemPath.replace(/\\/g, '/').toLowerCase();
  if (lower.startsWith(HOME_ITEM)) {
    return lower.slice(HOME_ITEM.length) || '/';
  }
  return '';
}

function visiblePath(itemPath: string, asPath: string): string {
  const fromItem = pathFromItem(itemPath);
  if (fromItem) {
    return fromItem;
  }
  const raw = (asPath || '').split('?')[0];
  if (!raw || raw === '/' || /\/api\/editing(\/|$)/i.test(raw)) {
    return '/';
  }
  return raw;
}

export function PageTrail(): JSX.Element | null {
  const router = useRouter();
  const { page } = useSitecore();
  const route = page?.layout?.sitecore?.route as { itemPath?: string; path?: string } | undefined;
  const path = visiblePath(String(route?.itemPath || route?.path || ''), router.asPath || '');
  const parts = path.split('/').filter((part) => part && !SKIP.has(part.toLowerCase()));

  if (parts.length === 0) {
    return null;
  }

  const crumbs = parts.map((part, index) => ({
    href: `/${parts.slice(0, index + 1).join('/')}`,
    label: labelFor(part),
  }));

  return (
    <nav className="pm-trail" aria-label="Breadcrumb">
      <div className="pm-wrap">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {crumbs.map((crumb, index) => (
            <li key={crumb.href}>
              {index === crumbs.length - 1 ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link href={crumb.href}>{crumb.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
