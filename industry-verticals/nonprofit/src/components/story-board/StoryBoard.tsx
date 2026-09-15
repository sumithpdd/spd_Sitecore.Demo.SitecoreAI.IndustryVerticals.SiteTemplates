import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { STORY_ACTS, STORY_BEATS } from '@/lib/openhand-story';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-kicker">Presentation flow</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Storyboard
        </h1>
        <p className="oh-muted max-w-2xl">
          Three acts. Live links stay on this site. Scrunch, Mini CMS and email are talk-track
          surfaces with routes.
        </p>
        <ol className="mt-10 grid gap-10">
          {STORY_ACTS.map((act) => (
            <li key={act.act}>
              <h2 className="text-2xl">
                Act {act.act} <span className="oh-muted text-base">{act.weight}</span>
              </h2>
              <p>{act.title}</p>
              <ol className="mt-4 grid gap-4">
                {STORY_BEATS.filter((beat) => beat.act === act.act).map((beat) => (
                  <li key={beat.id} className="oh-card">
                    <div className="oh-card__body">
                      <p className="oh-kicker">Beat {beat.id}</p>
                      <h3>{beat.title}</h3>
                      <p className="text-sm font-semibold">{beat.subtitle}</p>
                      <p className="mt-2">{beat.talk}</p>
                      <p className="oh-muted mt-2 text-sm">{beat.point}</p>
                      <Link className="mt-3 inline-block text-[var(--oh-teal)]" href={beat.href}>
                        {beat.hrefLabel}
                      </Link>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Default;
