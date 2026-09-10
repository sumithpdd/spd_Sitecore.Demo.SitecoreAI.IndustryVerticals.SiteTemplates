import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { PRESS_RELEASES } from '@/lib/home-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-press" id={id}>
      <div className="container mx-auto py-16">
        <h2 className="pm-section-kicker">Press releases</h2>
        <p className="pm-press__lede">Latest press releases</p>
        <ul className="pm-press__list">
          {PRESS_RELEASES.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <time>{item.date}</time>
                <span className="pm-press__title">{item.title}</span>
                {item.meta && <span className="pm-press__meta">{item.meta}</span>}
              </Link>
            </li>
          ))}
        </ul>
        <Link className="pm-link" href="/thinking">
          Explore all
        </Link>
      </div>
    </section>
  );
};

export default Default;
