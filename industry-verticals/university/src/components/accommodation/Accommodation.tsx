import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const OPTIONS = [
  {
    title: 'Ensuite halls',
    body: 'Private bathroom with shared kitchen and social spaces — popular with first-year students.',
    image: demoImages.accommodationEnsuite,
  },
  {
    title: 'Standard rooms',
    body: 'Affordable options with shared facilities and a strong sense of community.',
    image: demoImages.tileAccommodation,
  },
  {
    title: 'Clearing guarantee',
    body: 'Eligible Clearing applicants can secure single-occupancy university accommodation.',
    image: demoImages.clearingStudents,
  },
];

/**
 * Accommodation page for halls and Clearing housing.
 */
export default function Accommodation(_props: Props): JSX.Element {
  return (
    <section className="component accommodation bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[48vh] overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[58vh]">
        <img
          src={demoImages.accommodationHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 py-10 md:min-h-[58vh] md:px-8 md:py-14">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Accommodation</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Live on or near Whiteknights with halls designed for study, friendship, and campus life.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Find your place at Reading</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--reading-charcoal)]">
          Choose from a range of room types and residences. Our accommodation team can help you
          understand deposits, contracts, and what to expect when you arrive.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {OPTIONS.map((option) => (
            <article key={option.title} className="overflow-hidden bg-[var(--reading-surface)]">
              <img
                src={option.image}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold">{option.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--reading-charcoal)]">
                  {option.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <a href="/clearing" className="reading-btn reading-btn-primary">
            Clearing accommodation
          </a>
          <a href="/study-life" className="reading-btn reading-btn-secondary">
            Campus life
          </a>
        </div>
      </div>
    </section>
  );
}
