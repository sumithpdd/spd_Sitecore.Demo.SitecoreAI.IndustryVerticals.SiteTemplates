import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { STORIES } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-kicker">Lived experience</p>
        <h1 className="mb-8 text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Stories
        </h1>
        <div className="oh-grid oh-grid-3">
          {STORIES.map((story) => (
            <Link key={story.slug} href={story.href} className="oh-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={story.image} alt="" />
              <div className="oh-card__body">
                <p className="oh-kicker">{story.name}</p>
                <h2>{story.title}</h2>
                <p className="oh-muted text-sm">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
