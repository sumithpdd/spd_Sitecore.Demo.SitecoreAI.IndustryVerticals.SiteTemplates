import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const TILES = [
  {
    title: 'Courses',
    body: 'Find undergraduate and postgraduate programmes that fit your ambitions.',
    href: '/courses/computer-science-and-ai',
    image: demoImages.tileCourses,
  },
  {
    title: 'Student life',
    body: 'Campus community, societies, sport, and everything beyond the lecture theatre.',
    href: '/study-life',
    image: demoImages.tileStudentLife,
  },
  {
    title: 'Chat to students',
    body: 'Hear from current students about studying and living at Reading.',
    href: '/study-life',
    image: demoImages.clearingStudents,
  },
  {
    title: 'Accommodation',
    body: 'Halls options across Whiteknights and beyond — including Clearing guarantees.',
    href: '/accommodation',
    image: demoImages.tileAccommodation,
  },
];

/**
 * Homepage "Are you ready?" promo tile grid.
 */
export default function PromoTileGrid(_props: Props): JSX.Element {
  return (
    <section className="component promo-tile-grid bg-[var(--reading-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-20">
        <h2 className="text-3xl font-bold text-[var(--reading-ink)] md:text-4xl">Are you ready?</h2>
        <p className="mt-3 max-w-2xl text-base text-[var(--reading-charcoal)]">
          Explore what it is like to study, live, and thrive at University.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile) => (
            <a
              key={tile.title}
              href={tile.href}
              className="group overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={tile.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-[var(--reading-ink)] group-hover:text-[var(--reading-red)]">
                  {tile.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--reading-charcoal)]">
                  {tile.body}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
