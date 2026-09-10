import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { STORY_ACTS, STORY_BEATS } from '@/lib/legal-story';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-story" id={id}>
      <div className="container mx-auto max-w-5xl py-16">
        <p className="pm-story__eyebrow">Presentation flow</p>
        <h1 className="pm-story__title">Storyboard</h1>
        <p className="pm-story__intro">
          Three acts. Live links stay on this site — Dawn, the essential-supplier guide, people,
          restructuring. External tools (Scrunch, ChatGPT, Mini CMS) stay in the talk track.
        </p>
        <p className="pm-story__lede">
          <Link href="/what-we-heard">What we heard</Link> sits behind the personas beat.
        </p>

        <ol className="pm-story__acts">
          {STORY_ACTS.map((act) => (
            <li key={act.act}>
              <h2>
                Act {act.act} <span>{act.weight}</span>
              </h2>
              <p className="pm-story__act-title">{act.title}</p>
              <ol className="pm-story__beats">
                {STORY_BEATS.filter((beat) => beat.act === act.act).map((beat) => (
                  <li key={beat.id}>
                    <span className="pm-story__num">{beat.id}</span>
                    <div>
                      <h3>{beat.title}</h3>
                      <p className="pm-story__sub">{beat.subtitle}</p>
                      <p>{beat.talk}</p>
                      <p className="pm-story__point">{beat.point}</p>
                      <Link href={beat.href}>{beat.hrefLabel}</Link>
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
