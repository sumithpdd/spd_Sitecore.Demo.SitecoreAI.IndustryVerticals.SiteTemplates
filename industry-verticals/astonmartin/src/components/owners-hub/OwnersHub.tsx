'use client';

import { JSX } from 'react';
import Image from 'next/image';
import { ComponentProps } from '@/lib/component-props';

const PROMOS = [
  {
    title: 'Customer Support',
    body: 'From general enquiries to roadside assistance. We are dedicated to providing the support you need, when you need it.',
    cta: 'Contact Us',
    href: '/enquiry',
    image: '/images/owners-promo-support.jpg',
  },
  {
    title: "Owner's Guides",
    body: 'Access your full downloadable Aston Martin Owner’s Guide. Guides may differ from the printed version.',
    cta: 'Explore',
    href: '/q-by-aston-martin',
    image: '/images/owners-promo-guides.jpg',
  },
  {
    title: 'Aftercare Intensified',
    body: 'The exclusive ownership programme by Aston Martin watches over you and your vehicle.',
    cta: 'Explore',
    href: '/experiences',
    image: '/images/owners-promo-aftercare.jpg',
  },
  {
    title: 'Safety Campaigns',
    body: 'Enter the VIN of your Aston Martin to check if there are any outstanding campaigns for your vehicle.',
    cta: 'Explore',
    href: '/dealers',
    image: '/images/owners-promo-safety.jpg',
  },
  {
    title: 'Battery Recycling Policy',
    body: 'Access the complete Aston Martin Battery Recycling Policy for details on delivering a battery for proper disposal.',
    cta: 'Find out more',
    href: '/our-world',
    image: '/images/owners-promo-battery.jpg',
  },
  {
    title: 'End of Life Vehicles',
    body: 'Access the End of Life Vehicles Policy for more information on having your vehicle collected and recycled.',
    cta: 'Find out more',
    href: '/our-world',
    image: '/images/owners-promo-eol.jpg',
  },
  {
    title: 'Aston Martin Connectivity',
    body: 'Next-generation infotainment with wireless Apple CarPlay Ultra®, Android Auto™, and seamless app access.',
    cta: 'Explore',
    href: '/models',
    image: '/images/owners-promo-connectivity.jpg',
  },
];

const EXPLORE = [
  {
    title: 'Configurator',
    subtitle: 'Start configuration',
    href: '/configurator',
    image: '/images/configurator-studio-hero.jpg',
  },
  {
    title: 'Enquire',
    subtitle: 'Contact form',
    href: '/enquiry',
    image: '/images/enquiry-selected-car.jpg',
  },
  {
    title: 'Q By Aston Martin',
    subtitle: 'Personalise',
    href: '/q-by-aston-martin',
    image: '/images/q-by-hero.jpg',
  },
];

type Props = ComponentProps & { fields?: Record<string, unknown> };

export const Default = (_props: Props): JSX.Element => {
  return (
    <section className="component owners-hub bg-white text-[#0a0a0a]">
      <div className="relative min-h-[48vh] w-full overflow-hidden bg-black md:min-h-[62vh]">
        <Image
          src="/images/owners-page-hero.jpg"
          alt="Owners"
          fill
          priority
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-6 py-14 md:min-h-[62vh] md:px-10">
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">Owners</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Owning an Aston Martin
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#6b6b6b] md:text-base">
            Owning an Aston Martin is a truly special experience and one we hope you will savour for
            a lifetime. Taking care of our owners by ensuring the very best range of services,
            expert guidance and customer relations is at the very heart of our business. Our team,
            or the trusted associates working in our official dealer network are always at your
            disposal.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PROMOS.map((promo) => (
            <article
              key={promo.title}
              className="group grid gap-0 overflow-hidden bg-[#f5f5f5] sm:grid-cols-2"
            >
              <div className="relative min-h-[12rem] sm:min-h-[16rem]">
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex flex-col justify-center px-6 py-8">
                <h3 className="text-xl font-semibold tracking-tight">{promo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#6b6b6b]">{promo.body}</p>
                <a
                  href={promo.href}
                  className="mt-6 inline-flex text-sm font-semibold text-[var(--am-teal)] underline-offset-4 hover:underline"
                >
                  {promo.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Explore Aston Martin</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {EXPLORE.map((tile) => (
              <a
                key={tile.title}
                href={tile.href}
                className="group relative min-h-[16rem] overflow-hidden bg-black"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  sizes="400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase opacity-80">
                    {tile.title}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{tile.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
