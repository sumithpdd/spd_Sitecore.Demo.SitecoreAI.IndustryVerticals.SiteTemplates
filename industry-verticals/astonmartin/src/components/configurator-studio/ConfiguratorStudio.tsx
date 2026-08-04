'use client';

import { JSX, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ComponentProps } from '@/lib/component-props';

type Swatch = { id: string; label: string; hex: string };

const EXTERIORS: Swatch[] = [
  { id: 'amr-green', label: 'AMR Green', hex: '#1c3c34' },
  { id: 'onyx-black', label: 'Onyx Black', hex: '#0a0a0a' },
  { id: 'quantum-silver', label: 'Quantum Silver', hex: '#9aa0a6' },
  { id: 'china-grey', label: 'China Grey', hex: '#5c6166' },
  { id: 'hyper-red', label: 'Hyper Red', hex: '#8b1e2d' },
  { id: 'elwood-blue', label: 'Elwood Blue', hex: '#1a2f4a' },
];

const WHEELS = [
  { id: 'y-spoke', label: '21" Y-Spoke', image: '/images/db12-tile-1.jpg' },
  { id: 'multi-spoke', label: '21" Multi-Spoke', image: '/images/db12-tile-2.jpg' },
  { id: 'directional', label: '21" Directional', image: '/images/db12-tile-3.jpg' },
];

const INTERIORS = [
  { id: 'armada-tan', label: 'Armada Tan', image: '/images/enquiry-selected-car.jpg' },
  { id: 'obsidian-black', label: 'Obsidian Black', image: '/images/db12-feature.jpg' },
  { id: 'aurora-blue', label: 'Aurora Blue', image: '/images/db12-volante-feature.jpg' },
];

type Props = ComponentProps & { fields?: Record<string, unknown> };

export const Default = (_props: Props): JSX.Element => {
  const [exterior, setExterior] = useState(EXTERIORS[0]);
  const [wheel, setWheel] = useState(WHEELS[0]);
  const [interior, setInterior] = useState(INTERIORS[0]);
  const [saved, setSaved] = useState(false);

  return (
    <section className="component configurator-studio bg-[#0a0a0a] text-white">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[90rem] lg:grid-cols-[1fr_24rem]">
        <div className="relative min-h-[50vh] overflow-hidden bg-[#111] lg:min-h-full">
          <Image
            src="/images/configurator-studio-hero.jpg"
            alt="DB12 configuration"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-35"
            style={{ backgroundColor: exterior.hex }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10">
            <p className="text-xs font-semibold tracking-[0.2em] text-white/70 uppercase">
              Configurator
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">DB12</h1>
            <p className="mt-2 max-w-xl text-sm text-white/75">
              Demo configuration studio — colours, wheels and interior inspired by{' '}
              <a
                className="underline"
                href="https://configurator.astonmartin.com/"
                target="_blank"
                rel="noreferrer"
              >
                configurator.astonmartin.com
              </a>
              . Full 3D experience remains on the manufacturer site.
            </p>
          </div>
        </div>

        <aside className="border-t border-white/10 bg-[#121212] lg:border-t-0 lg:border-l">
          <div className="sticky top-0 max-h-[100vh] space-y-8 overflow-y-auto p-6 md:p-8">
            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase">Exterior</h2>
              <div className="mt-4 grid grid-cols-6 gap-2">
                {EXTERIORS.map((swatch) => (
                  <button
                    key={swatch.id}
                    type="button"
                    title={swatch.label}
                    aria-label={swatch.label}
                    onClick={() => setExterior(swatch)}
                    className={clsx(
                      'aspect-square rounded-full border-2',
                      exterior.id === swatch.id ? 'border-white' : 'border-transparent'
                    )}
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>
              <p className="mt-3 text-sm text-white/70">{exterior.label}</p>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase">Wheels</h2>
              <div className="mt-4 space-y-2">
                {WHEELS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setWheel(item)}
                    className={clsx(
                      'flex w-full items-center gap-3 border px-3 py-2 text-left text-sm',
                      wheel.id === item.id
                        ? 'border-[var(--am-teal)] bg-white/5'
                        : 'border-white/15'
                    )}
                  >
                    <span className="relative h-12 w-16 shrink-0 overflow-hidden bg-black">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-wide uppercase">Interior</h2>
              <div className="mt-4 space-y-2">
                {INTERIORS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInterior(item)}
                    className={clsx(
                      'flex w-full items-center gap-3 border px-3 py-2 text-left text-sm',
                      interior.id === item.id
                        ? 'border-[var(--am-teal)] bg-white/5'
                        : 'border-white/15'
                    )}
                  >
                    <span className="relative h-12 w-16 shrink-0 overflow-hidden bg-black">
                      <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                    </span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-white/50 uppercase tracking-wide">Your build</p>
              <ul className="mt-3 space-y-1 text-sm text-white/80">
                <li>{exterior.label}</li>
                <li>{wheel.label}</li>
                <li>{interior.label}</li>
              </ul>
              <button
                type="button"
                className="am-btn am-btn-teal mt-6 w-full"
                onClick={() => setSaved(true)}
              >
                {saved ? 'Configuration saved' : 'Save configuration'}
              </button>
              <a
                href="/enquiry"
                className="am-btn mt-3 w-full border border-white/40 bg-transparent text-white"
              >
                Enquire about this build
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
