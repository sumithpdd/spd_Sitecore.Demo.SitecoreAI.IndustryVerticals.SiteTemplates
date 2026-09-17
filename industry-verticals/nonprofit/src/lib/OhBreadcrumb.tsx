'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ADVICE,
  APPEALS,
  EVENTS_CATALOG,
  NEWS,
  PARTNERS,
  PEOPLE,
  STORIES,
} from '@/lib/openhand-catalog';

const SEGMENT_LABELS: Record<string, string> = {
  'get-help': 'Get help',
  'near-you': 'In your area',
  'a-z': 'A–Z',
  news: 'News',
  stories: 'Stories',
  events: 'Events',
  appeals: 'Appeals',
  winter: 'Winter warmth',
  emergency: 'Emergency response',
  partners: 'Partners',
  people: 'People',
  donate: 'Donate',
  fundraise: 'Fundraise',
  campaigns: 'Campaigns',
  'fair-energy': 'Fair energy',
  search: 'Search',
  cms: 'Mini CMS',
  scrunch: 'Scrunch',
  email: 'Email',
  storyboard: 'Storyboard',
};

function titleForHref(href: string, fallback: string): string {
  return (
    ADVICE.find((item) => item.href === href)?.title ||
    NEWS.find((item) => item.href === href)?.title ||
    STORIES.find((item) => item.href === href)?.title ||
    APPEALS.find((item) => item.href === href)?.title ||
    EVENTS_CATALOG.find((item) => item.href === href)?.title ||
    PARTNERS.find((item) => item.href === href)?.name ||
    PEOPLE.find((item) => `/people/${item.slug}` === href)?.name ||
    SEGMENT_LABELS[fallback] ||
    fallback.replace(/-/g, ' ')
  );
}

export const OhBreadcrumb = (): JSX.Element | null => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  if (!path || path === '/') {
    return null;
  }

  const parts = path.split('/').filter(Boolean);
  const crumbs = [{ href: '/', label: 'Home' }];
  let acc = '';
  for (const part of parts) {
    acc += `/${part}`;
    crumbs.push({ href: acc, label: titleForHref(acc, part) });
  }

  return (
    <nav className="oh-wrap oh-crumb" aria-label="Breadcrumb">
      {crumbs.map((crumb, index) => (
        <span key={crumb.href}>
          {index > 0 ? ' / ' : null}
          {index < crumbs.length - 1 ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
        </span>
      ))}
    </nav>
  );
};
