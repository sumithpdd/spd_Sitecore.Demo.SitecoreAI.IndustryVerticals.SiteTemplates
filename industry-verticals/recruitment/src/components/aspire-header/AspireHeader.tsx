'use client';

import { FormEvent, JSX, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { BRAND, NAV } from '@/lib/aspire-catalog';

type Props = ComponentProps & {
  fields?: {
    PhoneUk?: { value?: string };
    PhoneUs?: { value?: string };
  };
};

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (location) params.set('selected_locations', location);
    void router.push(`/jobs${params.toString() ? `?${params}` : ''}`);
  };

  return (
    <header className="aspire-header" id={props.params?.RenderingIdentifier}>
      <div className="aspire-phones">
        {BRAND.phones.map((phone) => (
          <a key={phone.label} href={`tel:${phone.value.replace(/\s/g, '')}`}>
            {phone.label} {phone.value}
          </a>
        ))}
      </div>
      <div className="aspire-bar">
        <Link className="aspire-logo" href="/" aria-label={BRAND.name}>
          aspire
        </Link>
        <button
          type="button"
          className="aspire-menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>
        <nav className={open ? 'is-open' : undefined} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                path === item.href || path.startsWith(`${item.href}/`) ? 'is-on' : undefined
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <form className="aspire-search" action="/jobs" method="get" onSubmit={search}>
        <label>
          <span className="sr-only">Job title or keyword</span>
          <input
            name="query"
            value={query}
            placeholder="Job title or keyword"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          <span className="sr-only">Location</span>
          <input
            name="selected_locations"
            value={location}
            placeholder="Location"
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <button type="submit">Search jobs</button>
      </form>
    </header>
  );
};

export default Default;
