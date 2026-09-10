import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { OUTLAW_NEWS } from '@/lib/home-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-outlaw" id={id}>
      <div className="container mx-auto grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="pm-section-kicker pm-section-kicker--light">Out-Law</p>
          <h2>Legal news and analysis</h2>
          <p className="pm-outlaw__lede">
            Hour by hour news and analysis of the events and trends shaping your decision-making,
            produced by our dedicated team of reporters.
          </p>
          <ul className="pm-outlaw__news">
            {OUTLAW_NEWS.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>
                  <span className="pm-outlaw__kicker">{item.kicker}</span>
                  <span className="pm-outlaw__title">{item.title}</span>
                  <span className="pm-outlaw__meta">{item.meta}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link className="pm-link-light" href="/out-law">
            Read more
          </Link>
        </div>
        <aside className="pm-outlaw__newsletter">
          <h3>Newsletter</h3>
          <p className="pm-outlaw__nl-head">Know what’s coming, make better decisions</p>
          <p>
            Stay ahead of events with our weekly digest of news and expert analysis, tailored for
            you.
          </p>
          <Link className="pm-btn" href="/thinking">
            Sign-up
          </Link>
        </aside>
      </div>
    </section>
  );
};

export default Default;
