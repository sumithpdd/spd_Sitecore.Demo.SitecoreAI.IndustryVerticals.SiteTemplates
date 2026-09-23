'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

function labelFor(slug: string): string {
  return LABELS[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

export function PageTrail(): JSX.Element | null {
  const router = useRouter();
  const parts = (router.asPath || '').split('?')[0].split('/').filter(Boolean);
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
