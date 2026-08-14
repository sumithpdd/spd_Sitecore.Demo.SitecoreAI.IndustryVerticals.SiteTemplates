'use client';

import { JSX, useState } from 'react';
import clsx from 'clsx';
import { Menu, Search, X } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const NAV = [
  { label: 'Clearing', href: '/clearing' },
  { label: 'Study and life', href: '/study-and-life' },
  { label: 'Courses', href: '/courses/computer-science-and-ai' },
  { label: 'Accommodation', href: '/accommodation' },
  { label: 'Search', href: '/search' },
];

/**
 * White/light University site header with logo, nav, and Apply CTA.
 */
export default function SiteHeader(_props: Props): JSX.Element {
  const [open, setOpen] = useState(false);

  return (
    <header className="component site-header sticky top-0 z-50 border-b border-[#ddd9db] bg-white text-[var(--reading-ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="/" className="flex shrink-0 items-center" aria-label="University home">
          <img
            src={demoImages.logo}
            alt="University"
            className="h-10 w-auto max-w-[11rem] object-contain object-left md:h-12 md:max-w-[14rem]"
            width={220}
            height={48}
            decoding="async"
          />
        </a>

        <nav
          className="hidden items-center gap-6 text-sm font-semibold lg:flex"
          aria-label="Primary"
        >
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-[var(--reading-red)]">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/search"
            className="reading-btn reading-btn-ghost hidden px-2 py-2 sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-5 w-5" aria-hidden />
          </a>
          <a href="/clearing" className="reading-btn reading-btn-primary">
            Apply
          </a>
          <button
            type="button"
            className="reading-btn reading-btn-ghost px-2 py-2 lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={clsx(
          'border-t border-[#ddd9db] bg-white px-4 py-4 lg:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <nav className="flex flex-col gap-3 text-base font-semibold" aria-label="Mobile">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 hover:text-[var(--reading-red)]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
