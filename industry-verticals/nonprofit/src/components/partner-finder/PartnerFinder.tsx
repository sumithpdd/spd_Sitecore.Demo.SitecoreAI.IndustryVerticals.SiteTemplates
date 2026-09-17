'use client';

import { JSX, useMemo, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { PARTNERS } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PARTNERS;
    return PARTNERS.filter(
      (item) =>
        item.city.toLowerCase().includes(q) ||
        item.postcode.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.services.join(' ').toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-kicker">Local partners</p>
        <h1 className="mb-4 text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Help near you
        </h1>
        <p className="oh-muted max-w-xl">
          Age UK-style finder: city or postcode against partner hubs. Each hub has a photograph on
          the card and on the partner page.
        </p>
        <label className="mt-6 block max-w-md">
          <span className="sr-only">Search by city or postcode</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-md border border-[var(--oh-line)] px-3 py-2"
            placeholder="Leeds, LS7, Cardiff…"
          />
        </label>
        <ul className="oh-grid oh-grid-3 mt-8">
          {results.map((item) => (
            <li key={item.slug}>
              <Link href={item.href} className="oh-card block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" />
                <div className="oh-card__body">
                  <p className="oh-kicker">{item.city}</p>
                  <h2>{item.name}</h2>
                  <p className="oh-muted text-sm">{item.services.join(' · ')}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
