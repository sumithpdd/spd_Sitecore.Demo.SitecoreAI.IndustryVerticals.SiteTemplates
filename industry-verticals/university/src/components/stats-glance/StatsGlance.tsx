import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const STATS = [
  {
    value: '95%',
    label: 'of graduates are in work or further study within 15 months of graduation',
  },
  {
    value: '150+',
    label: 'postgraduate courses across a wide range of subjects',
  },
  {
    value: '£500m',
    label: 'campus investment transforming facilities for teaching and research',
  },
];

/**
 * Homepage stats at a glance strip.
 */
export default function StatsGlance(_props: Props): JSX.Element {
  return (
    <section className="component stats-glance bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold text-[var(--reading-ink)] md:text-4xl">
          Reading at a glance
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.value} className="border-t-4 border-[var(--reading-red)] pt-6">
              <p className="text-4xl font-bold text-[var(--reading-red)] md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--reading-charcoal)] md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
