'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';
import { getReadingIntent, type ReadingIntent } from 'lib/reading-intent';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * Full-bleed homepage hero. Centenary intent swaps image and copy; otherwise Clearing 2026.
 */
export default function HomeHero(_props: Props): JSX.Element {
  const [intent, setIntent] = useState<ReadingIntent>('default');

  useEffect(() => {
    setIntent(getReadingIntent());
  }, []);

  const isCentenary = intent === 'centenary';
  const image = isCentenary ? demoImages.heroCentenary : demoImages.heroClearing;
  const title = isCentenary ? 'Centenary 2026' : 'Clearing 2026';
  const strapline = isCentenary
    ? 'Celebrating 100 years of the University'
    : 'Apply now · Call +44 (0) 118 402 0900';

  return (
    <section className="component home-hero relative min-h-[70vh] w-full overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[78vh]">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl flex-col justify-end px-4 py-12 md:min-h-[78vh] md:px-8 md:py-16">
        <h1 className="max-w-3xl text-4xl leading-tight font-bold text-white md:text-6xl">
          <span className="reading-eyebrow text-2xl md:text-4xl">{title}</span>
          <span className="mt-3 block">
            <span className="reading-strapline text-xl md:text-3xl">{strapline}</span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/90 md:text-lg">
          {isCentenary
            ? 'Join us as we mark a century of teaching, research, and campus life at Reading.'
            : 'Places are still available. Explore courses, talk to our hotline, and apply online.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/clearing" className="reading-btn reading-btn-primary">
            Apply now
          </a>
          <a href="/clearing/how-to-apply" className="reading-btn reading-btn-secondary">
            How to apply
          </a>
        </div>
      </div>
    </section>
  );
}
