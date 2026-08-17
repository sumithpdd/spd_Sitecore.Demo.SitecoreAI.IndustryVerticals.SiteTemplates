'use client';

import { FormEvent, JSX, useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/router';
import { Field, Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { asText, hasText } from 'lib/field-helpers';
import { filterSearchHits, type SearchScope } from 'lib/search-index';

interface Fields {
  Title?: Field<string>;
  Description?: Field<string>;
  SearchPlaceholder?: Field<string>;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScope>('everything');

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const q = typeof router.query.q === 'string' ? router.query.q : '';
    const s = router.query.scope === 'courses' ? 'courses' : 'everything';
    setQuery(q);
    setScope(s);
  }, [router.isReady, router.query.q, router.query.scope]);

  const results = useMemo(() => filterSearchHits(query, scope), [query, scope]);
  const placeholder =
    fields?.SearchPlaceholder?.value || 'e.g. Clearing, Computer Science, accommodation';

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void router.push(
      query.trim() ? `/search?q=${encodeURIComponent(query.trim())}&scope=${scope}` : '/search'
    );
  };

  return (
    <section
      className={`component site-search bg-white text-[var(--reading-ink)] ${params?.styles || ''}`}
    >
      <div className="bg-[var(--reading-surface)]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
          <h1 className="text-3xl font-bold md:text-4xl">
            {isEditing || hasText(fields?.Title) ? (
              <ContentSdkText field={asText(fields?.Title)} />
            ) : (
              'Search'
            )}
          </h1>
          <p className="mt-3 text-[var(--reading-charcoal)]">
            {isEditing || hasText(fields?.Description) ? (
              <ContentSdkText field={asText(fields?.Description)} />
            ) : (
              'Find courses and pages across this University demo.'
            )}
          </p>
          <form className="mt-8" onSubmit={submit} role="search">
            <div className="mb-3 flex gap-2 text-xs font-bold tracking-wide uppercase">
              <button
                type="button"
                className={`px-3 py-2 ${scope === 'everything' ? 'bg-[var(--reading-red)] text-white' : 'bg-white'}`}
                onClick={() => setScope('everything')}
              >
                Everything
              </button>
              <button
                type="button"
                className={`px-3 py-2 ${scope === 'courses' ? 'bg-[var(--reading-red)] text-white' : 'bg-white'}`}
                onClick={() => setScope('courses')}
              >
                Courses
              </button>
            </div>
            <label className="reading-label" htmlFor="site-search-input">
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
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                autoComplete="off"
              />
            </div>
          </form>
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
};
