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

function AspireMark(): JSX.Element {
  return (
    <svg viewBox="0 0 654.7 595.3" aria-hidden="true">
      <path
        fill="#293277"
        d="M584 226.7C552.3 97.8 436 2.4 297.4 2.4 134.3 2.4 2.2 134.5 2.2 297.6s132.1 295.3 295.2 295.3c138.6 0 254.9-95.6 286.6-224.6 0 0 13.6-55 68.5-70.7-54.9-15.8-68.5-70.8-68.5-70.9z"
      />
      <path
        fill="#fff"
        d="M160 261.4l-15.8 37.2H176l-16-37.2zm48.6 73.9h-17.2l-9.3-22.5h-43.9l-9.6 22.5H112l40.7-93.4H168l40.6 93.4zM300.8 277.7c-10.9 0-20.5 8.9-20.5 22.7 0 13.6 9.6 22.5 20.5 22.5s20-8.5 20-22.5c.2-13.8-9.2-22.7-20-22.7zm3.6 59.1c-11.5 0-18.8-5.9-23.7-12.3v32.1h-16v-91.2h16v11.5c5.1-7.3 12.4-12.9 23.7-12.9 16.6 0 32.6 12.9 32.6 36.4.1 23.2-15.9 36.4-32.6 36.4zM346.4 265.4h16v69.9h-16v-69.9zm-.5-26.1H363v15.3h-17.2v-15.3h.1zM391.2 335.3H375v-69.9h16.2v15.7c4.3-10.5 12.4-17.6 24.7-17.2v17h-1c-14 0-23.7 9.1-23.7 27.7v26.7zM467.8 295.6c-1-10.5-7.1-18.4-17.6-18.4-10 0-16.8 7.5-18.3 18.4h35.9zm-15.6 28.2c7.9 0 13.4-2.8 19-8.3l9.3 8.3c-6.6 7.9-15.8 13.2-28.6 13.2-20.2 0-35.8-14.7-35.8-36.4 0-20.2 14.2-36.6 34.1-36.6 22.3 0 33.6 17.4 33.6 37.6 0 1.7-.2 2.8-.4 4.5h-51.3c1.8 11.3 9.8 17.7 20.1 17.7zM235 293.9c-8.1-2.6-15.6-4.7-15.6-9.7v-.2c0-4.2 3.4-7 9.8-7 5.9 0 13 2.4 19.6 6.6l6.4-11.5c-7.5-4.9-17-7.9-25.7-7.9-14 0-24.9 8.1-24.9 21.2v.4c0 13.4 11.5 17.6 21.9 20.4 8.3 2.6 15.6 4.5 15.6 9.9v.2c0 4.7-4 7.7-10.7 7.7-.8 0-11.9-.2-22.1-3.8l6.1 13.8c5.1 1.9 10.5 2.6 15.4 2.6 14.6 0 26.2-7.3 26.2-21.9v-.4c-.1-12.5-11.6-17.1-22-20.4zM468.2 245.2H465v-1.8h8.7v1.8h-3.5v9.1h-2v-9.1zM474.9 243.4h3l3 7.7 2.8-7.7h3.2v10.9H485v-9.1h-.2l-3.2 9.1h-1.5l-3.2-9.1v9.1h-2v-10.9z"
      />
    </svg>
  );
}

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
          <AspireMark />
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
