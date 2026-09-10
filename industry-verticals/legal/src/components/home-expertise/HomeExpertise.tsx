'use client';

import { JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { EXPERTISE_LOCATIONS, EXPERTISE_SECTORS, EXPERTISE_SERVICES } from '@/lib/home-catalog';
import Link from 'next/link';

type Tab = 'sectors' | 'services' | 'locations';
type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const [tab, setTab] = useState<Tab>('sectors');

  return (
    <section className="pm-expertise" id={id}>
      <div className="container mx-auto py-16">
        <h2 className="pm-section-kicker">Expertise</h2>
        <div className="pm-expertise__tabs" role="tablist">
          {(
            [
              ['sectors', 'Sectors'],
              ['services', 'Services'],
              ['locations', 'Locations'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={tab === key ? 'is-active' : undefined}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'sectors' && (
          <ul className="pm-expertise__sectors">
            {EXPERTISE_SECTORS.map((sector) => (
              <li key={sector.label}>
                <Link href={sector.href}>{sector.label}</Link>
              </li>
            ))}
          </ul>
        )}

        {tab === 'services' && (
          <div className="pm-expertise__services">
            {EXPERTISE_SERVICES.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <Link href="/expertise">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {tab === 'locations' && (
          <ul className="pm-expertise__locations">
            {EXPERTISE_LOCATIONS.map((row) => (
              <li key={row.region}>
                <h3>
                  <Link href="/offices">{row.region}</Link>
                </h3>
                <p>{row.offices}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Default;
