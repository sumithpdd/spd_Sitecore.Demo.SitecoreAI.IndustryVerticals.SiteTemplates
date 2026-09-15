'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { searchCatalog } from '@/lib/openhand-catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = ComponentProps;
type Engine = 'chatgpt' | 'google';

const queryFromPath = (asPath: string) =>
  new URLSearchParams(asPath.split('?')[1] || '').get('q') || '';

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const urlQuery = queryFromPath(router.asPath);
  const [draft, setDraft] = useState(urlQuery);
  const [engine, setEngine] = useState<Engine>('chatgpt');
  const results = useMemo(() => searchCatalog(urlQuery), [urlQuery]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = draft.trim();
    void router.push(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  };

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-kicker">Search</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          {engine === 'chatgpt' ? 'How ChatGPT would cite us' : 'How Google would list us'}
        </h1>
        <div className="oh-search-toggle">
          <button
            type="button"
            className={engine === 'chatgpt' ? 'is-on' : ''}
            onClick={() => setEngine('chatgpt')}
          >
            ChatGPT
          </button>
          <button
            type="button"
            className={engine === 'google' ? 'is-on' : ''}
            onClick={() => setEngine('google')}
          >
            Google
          </button>
        </div>
        <form onSubmit={submit} className="flex max-w-xl gap-2" role="search">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="w-full rounded-md border border-[var(--oh-line)] px-3 py-2"
            placeholder="energy, rent, Northgate…"
          />
          <button className="oh-btn oh-btn--navy" type="submit">
            Search
          </button>
        </form>
        <ul className="mt-8 grid gap-4">
          {results.map((hit) => (
            <li
              key={hit.href}
              className={
                engine === 'chatgpt'
                  ? 'rounded-xl bg-[var(--oh-cream)] p-4'
                  : 'border-b border-[var(--oh-line)] pb-4'
              }
            >
              <p className="oh-kicker">{hit.type}</p>
              <Link href={hit.href} className="text-xl font-semibold text-[var(--oh-navy)]">
                {hit.title}
              </Link>
              <p className="oh-muted mt-1 text-sm">
                {engine === 'chatgpt' ? `Citation: ${hit.summary}` : hit.summary}
              </p>
              {engine === 'google' && (
                <p className="text-xs text-[var(--oh-teal)]">openhand.org.uk{hit.href}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
