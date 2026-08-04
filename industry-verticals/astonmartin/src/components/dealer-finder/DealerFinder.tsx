'use client';

import { JSX, useMemo, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ComponentProps } from '@/lib/component-props';

type Dealer = {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  phone: string;
};

const DEALERS: Dealer[] = [
  {
    id: 'mayfair',
    name: 'Aston Martin Mayfair',
    city: 'London',
    country: 'United Kingdom',
    address: '49 Berkeley Square, Mayfair, London W1J 5AZ',
    phone: '+44 20 7235 8888',
  },
  {
    id: 'park-lane',
    name: 'Aston Martin Park Lane',
    city: 'London',
    country: 'United Kingdom',
    address: '113 Park Lane, London W1K 7AJ',
    phone: '+44 20 7333 0101',
  },
  {
    id: 'brooklands',
    name: 'Aston Martin Brooklands',
    city: 'Weybridge',
    country: 'United Kingdom',
    address: 'Brooklands Drive, Weybridge KT13 0SL',
    phone: '+44 1932 335500',
  },
  {
    id: 'manchester',
    name: 'Aston Martin Manchester',
    city: 'Manchester',
    country: 'United Kingdom',
    address: 'Wing Yip Business Centre, Oldham Road, Manchester M4 5HU',
    phone: '+44 161 826 1690',
  },
  {
    id: 'edinburgh',
    name: 'Aston Martin Edinburgh',
    city: 'Edinburgh',
    country: 'United Kingdom',
    address: '6 Bankhead Drive, Edinburgh EH11 4EJ',
    phone: '+44 131 442 2807',
  },
  {
    id: 'birmingham',
    name: 'Aston Martin Birmingham',
    city: 'Birmingham',
    country: 'United Kingdom',
    address: 'Birmingham Business Park, Solihull B37 7YG',
    phone: '+44 121 713 2777',
  },
];

type Props = ComponentProps & { fields?: Record<string, unknown> };

export const Default = (_props: Props): JSX.Element => {
  const [query, setQuery] = useState('');
  const [intent, setIntent] = useState<'general' | 'testdrive'>('general');
  const [visible, setVisible] = useState(4);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DEALERS;
    return DEALERS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q)
    );
  }, [query]);

  const shown = filtered.slice(0, visible);

  return (
    <section className="component dealer-finder bg-white text-[#0a0a0a]">
      <div className="relative min-h-[42vh] w-full overflow-hidden bg-black md:min-h-[52vh]">
        <Image
          src="/images/dealers-page-hero.jpg"
          alt="Find a dealer"
          fill
          priority
          className="object-cover object-center opacity-80"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-6 py-14 md:min-h-[52vh] md:px-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Find a dealer
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Aston Martin Dealers
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#6b6b6b] md:text-base">
            Our official dealerships are dedicated to offering an unrivalled quality of service and
            expertise. They are committed to supporting all your Aston Martin needs and pride
            themselves on providing an outstanding and personalised service whether you have a
            sales, aftersales or ownership requirement.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIntent('general')}
            className={clsx(
              'am-btn px-5 py-2.5 text-[0.7rem]',
              intent === 'general'
                ? 'am-btn-teal'
                : 'border border-[#0a0a0a] bg-white text-[#0a0a0a]'
            )}
          >
            General Enquiry
          </button>
          <button
            type="button"
            onClick={() => setIntent('testdrive')}
            className={clsx(
              'am-btn px-5 py-2.5 text-[0.7rem]',
              intent === 'testdrive'
                ? 'am-btn-teal'
                : 'border border-[#0a0a0a] bg-white text-[#0a0a0a]'
            )}
          >
            Arrange a test drive
          </button>
          <a
            href="/enquiry"
            className="am-btn am-btn-ghost border-[#0a0a0a] px-5 py-2.5 text-[0.7rem] text-[#0a0a0a]"
          >
            Go to enquiry form →
          </a>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,28rem)_1fr]">
          <div>
            <h3 className="text-lg font-semibold">Dealers</h3>
            <label className="mt-4 block text-sm">
              <span className="sr-only">Search by country, city or address</span>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setVisible(4);
                }}
                placeholder="Search by country, city or address"
                className="w-full border border-[#d8d8d8] bg-white px-4 py-3 outline-none focus:border-[var(--am-teal)]"
              />
            </label>

            <ul className="mt-6 divide-y divide-[#e8e8e8] border-t border-[#e8e8e8]">
              {shown.map((dealer) => (
                <li key={dealer.id} className="py-5">
                  <p className="text-base font-semibold">{dealer.name}</p>
                  <p className="mt-1 text-sm text-[#6b6b6b]">{dealer.address}</p>
                  <p className="mt-1 text-sm text-[#6b6b6b]">{dealer.phone}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href={`/enquiry?dealer=${encodeURIComponent(dealer.name)}&intent=${intent}`}
                      className="text-sm font-semibold text-[var(--am-teal)] underline-offset-2 hover:underline"
                    >
                      {intent === 'testdrive' ? 'Arrange a test drive' : 'Enquire'}
                    </a>
                    <span className="text-[#d0d0d0]">|</span>
                    <span className="text-sm text-[#6b6b6b]">
                      {dealer.city}, {dealer.country}
                    </span>
                  </div>
                </li>
              ))}
              {shown.length === 0 && (
                <li className="py-8 text-sm text-[#6b6b6b]">No dealers match your search.</li>
              )}
            </ul>

            {visible < filtered.length && (
              <button
                type="button"
                className="am-btn mt-6 border border-[#0a0a0a] bg-white px-5 py-2.5 text-[0.7rem] text-[#0a0a0a]"
                onClick={() => setVisible((v) => v + 4)}
              >
                Load more
              </button>
            )}
          </div>

          <div className="relative min-h-[22rem] overflow-hidden bg-[#ececec] lg:min-h-[36rem]">
            <Image
              src="/images/dealers-page-hero.jpg"
              alt="Dealer map placeholder"
              fill
              className="object-cover opacity-40"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <div className="max-w-sm bg-white/95 px-6 py-8 shadow-sm">
                <p className="text-sm font-semibold tracking-wide uppercase">Enable map</p>
                <p className="mt-3 text-sm text-[#6b6b6b]">
                  Demo map placeholder — accept cookies on the live site to view the interactive
                  dealer map.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
