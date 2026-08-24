import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const STATS = [
  {
    value: '12th',
    label: 'in the Guardian University Guide 2026',
  },
  {
    value: '86%',
    label: 'of graduates in employment or further study (Graduate Outcomes 2025)',
  },
  {
    value: '140+',
    label: 'nationalities on a global campus community',
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
          Essex at a glance
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
