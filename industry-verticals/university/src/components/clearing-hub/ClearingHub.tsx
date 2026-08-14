'use client';

import { JSX, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Phone } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';
import { getReadingIntent, type ReadingIntent } from 'lib/reading-intent';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const COURSES = [
  {
    id: 'csai',
    title: 'Computer Science and Artificial Intelligence',
    ucas: 'G400',
    href: '/courses/computer-science-and-ai',
    blurb: 'Build intelligent systems with a strong foundation in software engineering and AI.',
  },
  {
    id: 'business',
    title: 'Business and Management',
    ucas: 'N200',
    href: '/clearing',
    blurb: 'Develop commercial insight with opportunities for placements and global study.',
  },
  {
    id: 'psychology',
    title: 'Psychology',
    ucas: 'C800',
    href: '/clearing',
    blurb: 'Explore behaviour, cognition, and research methods in a BPS-accredited pathway.',
  },
];

/**
 * Clearing hub page: banner, hotline, apply CTA, and course cards (CS&AI highlight by intent).
 */
export default function ClearingHub(_props: Props): JSX.Element {
  const [intent, setIntent] = useState<ReadingIntent>('default');

  useEffect(() => {
    setIntent(getReadingIntent());
  }, []);

  const highlightCsAi = intent === 'clearing-csai';

  return (
    <section className="component clearing-hub bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[42vh] w-full overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[52vh]">
        <img
          src={demoImages.clearingBanner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-4 py-10 md:min-h-[52vh] md:px-8 md:py-14">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            <span className="reading-eyebrow">Clearing 2026</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Places are still available. Call our hotline or apply online — we are here to help you
            find the right course.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">We are ready when you are</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--reading-charcoal)]">
              Whether you are reconsidering your options or applying with results in hand, Clearing
              at Reading gives you a clear path to apply online or speak to an advisor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/clearing/how-to-apply" className="reading-btn reading-btn-primary">
                Apply through Clearing
              </a>
              <a href="/accommodation" className="reading-btn reading-btn-secondary">
                Accommodation
              </a>
            </div>
          </div>

          <aside className="bg-[var(--reading-surface)] p-6 md:p-8">
            <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-[var(--reading-maroon)] uppercase">
              <Phone className="h-4 w-4" aria-hidden />
              Clearing hotline
            </p>
            <a
              href="tel:+441184020900"
              className="mt-3 block text-2xl font-bold text-[var(--reading-ink)] hover:text-[var(--reading-red)] md:text-3xl"
            >
              +44 (0) 118 402 0900
            </a>
            <p className="mt-3 text-sm leading-relaxed text-[var(--reading-charcoal)]">
              Open on results day and throughout Clearing. Our team can talk through courses, entry
              requirements, and next steps.
            </p>
          </aside>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold md:text-3xl">Courses in Clearing</h2>
          <p className="mt-3 text-[var(--reading-charcoal)]">
            A selection of undergraduate options available through Clearing.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {COURSES.map((course) => {
              const highlight = highlightCsAi && course.id === 'csai';
              return (
                <a
                  key={course.id}
                  href={course.href}
                  className={clsx(
                    'block border p-6 transition-shadow duration-300 hover:shadow-md',
                    highlight
                      ? 'border-[var(--reading-red)] bg-[#fff5f5] ring-2 ring-[var(--reading-red)]'
                      : 'border-[#ddd9db] bg-white'
                  )}
                >
                  {highlight && (
                    <p className="mb-3 text-xs font-bold tracking-wide text-[var(--reading-red)] uppercase">
                      Recommended for you
                    </p>
                  )}
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="mt-1 text-sm text-[var(--reading-charcoal)]">
                    UCAS code {course.ucas}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--reading-charcoal)]">
                    {course.blurb}
                  </p>
                  <span className="mt-4 inline-block text-sm font-bold text-[var(--reading-red)]">
                    View course →
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <img
            src={demoImages.clearingPrefooter}
            alt=""
            className="h-56 w-full object-cover md:h-72"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6 md:p-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Make your Clearing application</h2>
              <a href="/clearing/how-to-apply" className="reading-btn reading-btn-primary mt-4">
                Start your application
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
