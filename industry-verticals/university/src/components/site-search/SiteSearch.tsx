'use client';

import { JSX, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const SEARCH_ITEMS = [
  {
    title: 'Clearing 2026',
    type: 'Page',
    href: '/clearing',
    blurb: 'Courses, hotline, and how to apply through Clearing.',
  },
  {
    title: 'Make your Clearing application',
    type: 'Page',
    href: '/clearing/how-to-apply',
    blurb: 'Enquire online and register your interest.',
  },
  {
    title: 'Computer Science and Artificial Intelligence',
    type: 'Course',
    href: '/courses/computer-science-and-ai',
    blurb: 'BSc undergraduate course — available in Clearing.',
  },
  {
    title: 'Study and life',
    type: 'Page',
    href: '/study-life',
    blurb: 'Campus community, Students’ Union, and student experience.',
  },
  {
    title: 'Accommodation',
    type: 'Page',
    href: '/accommodation',
    blurb: 'Halls options and Clearing accommodation guarantee.',
  },
  {
    title: 'Business and Management',
    type: 'Course',
    href: '/clearing',
    blurb: 'Undergraduate business pathway listed in Clearing demo.',
  },
  {
    title: 'Psychology',
    type: 'Course',
    href: '/clearing',
    blurb: 'Undergraduate psychology pathway listed in Clearing demo.',
  },
];

/**
 * Simple client-side search stub over hardcoded courses and pages.
 */
export default function SiteSearch(_props: Props): JSX.Element {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return SEARCH_ITEMS;
    }
    return SEARCH_ITEMS.filter((item) => {
      const haystack = `${item.title} ${item.blurb} ${item.type}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  return (
    <section className="component site-search bg-white text-[var(--reading-ink)]">
      <div className="bg-[var(--reading-surface)]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-3xl font-bold md:text-4xl">Search</h1>
          <p className="mt-3 text-[var(--reading-charcoal)]">
            Find courses and pages across this University demo.
          </p>
          <label className="reading-label mt-8" htmlFor="site-search-input">
            Search term
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-[var(--reading-charcoal)]"
              aria-hidden
            />
            <input
              id="site-search-input"
              className="reading-input pl-11"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Clearing, Computer Science, accommodation"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
        <p className="text-sm text-[var(--reading-charcoal)]">
          {results.length} result{results.length === 1 ? '' : 's'}
        </p>
        <ul className="mt-6 space-y-4">
          {results.map((item) => (
            <li key={`${item.href}-${item.title}`} className="border-b border-[#ddd9db] pb-4">
              <p className="text-xs font-bold tracking-wide text-[var(--reading-maroon)] uppercase">
                {item.type}
              </p>
              <a
                href={item.href}
                className="mt-1 block text-lg font-bold hover:text-[var(--reading-red)]"
              >
                {item.title}
              </a>
              <p className="mt-1 text-sm text-[var(--reading-charcoal)]">{item.blurb}</p>
            </li>
          ))}
        </ul>
        {results.length === 0 && (
          <p className="mt-6 text-[var(--reading-charcoal)]">
            No matches. Try “clearing”, “AI”, or “accommodation”.
          </p>
        )}
      </div>
    </section>
  );
}
