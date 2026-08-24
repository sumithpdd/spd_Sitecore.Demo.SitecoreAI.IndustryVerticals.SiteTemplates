import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

const HIGHLIGHTS = [
  {
    title: 'Award-winning campus',
    body: 'Colchester’s parkland lake campus is the heart of student life, with Loughton for East 15 Acting School.',
  },
  {
    title: 'Students’ Union',
    body: 'Societies, events, volunteering, and support — run by students, for students.',
  },
  {
    title: 'Sport and wellbeing',
    body: 'Facilities and clubs for every level, from casual fitness to competitive teams.',
  },
];

/**
 * Study and life / campus life page.
 */
export default function StudyLife(_props: Props): JSX.Element {
  return (
    <section className="component study-life bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[48vh] overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[58vh]">
        <img
          src={demoImages.studyLifeHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 py-10 md:min-h-[58vh] md:px-8 md:py-14">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Study and life</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Life at Essex goes far beyond lectures — Colchester squares, Essex SU, sport, and a
            global community of 140+ nationalities.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">A campus built for belonging</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--reading-charcoal)]">
              From lakeside walks to late-night study sessions, Essex’s Colchester campus brings
              together teaching spaces, halls, cafés, and green open space in one place.
            </p>
            <a href="/accommodation" className="reading-btn reading-btn-primary mt-8">
              Explore accommodation
            </a>
          </div>
          <img
            src={demoImages.studyLifeSu}
            alt="Students’ Union and campus life"
            className="w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="border-t-4 border-[var(--reading-teal)] pt-5">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--reading-charcoal)]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
