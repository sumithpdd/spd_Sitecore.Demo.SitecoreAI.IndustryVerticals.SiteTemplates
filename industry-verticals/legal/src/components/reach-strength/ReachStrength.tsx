import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { REACH_AWARDS } from '@/lib/home-catalog';
import Link from 'next/link';
import { Award } from 'lucide-react';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-reach" id={id}>
      <div className="container mx-auto py-16">
        <h2 className="pm-section-kicker">Our reach and strength</h2>
        <p className="pm-reach__lede">Recognised expertise, wherever you are</p>
        <ul className="pm-reach__grid">
          {REACH_AWARDS.map((item) => (
            <li key={item.title}>
              <Award className="pm-reach__icon" aria-hidden="true" />
              <p className="pm-reach__kicker">{item.kicker}</p>
              <h3>{item.title}</h3>
              <p className="pm-reach__source">{item.source}</p>
            </li>
          ))}
        </ul>
        <Link className="pm-btn-outline" href="/about-us">
          Explore all
        </Link>
      </div>
    </section>
  );
};

export default Default;
