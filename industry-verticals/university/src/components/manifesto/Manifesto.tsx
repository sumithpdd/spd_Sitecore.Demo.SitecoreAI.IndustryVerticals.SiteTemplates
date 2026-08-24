import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * We Are Essex manifesto — brand story for alumni / organic journeys.
 */
export const Default = function Manifesto(_props: Props): JSX.Element {
  return (
    <section className="component manifesto bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[48vh] overflow-hidden bg-[var(--reading-maroon)] md:min-h-[58vh]">
        <img
          src={demoImages.heroCentenary}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--reading-maroon)]/90 to-[var(--reading-red)]/40" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 py-10 md:min-h-[58vh] md:px-8 md:py-14">
          <p className="reading-eyebrow">We Are Essex</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold text-white md:text-6xl">
            Where change happens
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            University your way. Rebels with a cause. 12th in the Guardian University Guide 2026.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        <h2 className="text-2xl font-bold md:text-3xl">Our manifesto</h2>
        <p className="mt-4 text-base leading-relaxed text-[var(--reading-charcoal)]">
          Every idea starts with a question. Every change starts with courage. At Essex we nurture
          thinkers and doers who make change happen. We are on the side of people with guts — rebels
          with a cause. We encourage people to learn how but challenge why.
        </p>
        <p className="mt-4 text-base leading-relaxed text-[var(--reading-charcoal)]">
          To us it does not matter where you have come from. We are interested in how you want to
          grow and what you want to change. You will join a global community that lives, works and
          plays together. WE ARE ESSEX — WHERE CHANGE HAPPENS.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/clearing" className="reading-btn reading-btn-primary">
            Clearing Fast Track
          </a>
          <a href="/study-and-life" className="reading-btn reading-btn-secondary">
            Life at Essex
          </a>
        </div>
      </div>
    </section>
  );
};

export default Default;
