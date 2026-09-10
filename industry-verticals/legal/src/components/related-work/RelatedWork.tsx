import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { RELATED_WORK } from '@/lib/legal-story';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-related" id={id}>
      <div className="pm-wrap py-12">
        <h2>Related — service, sector, region</h2>
        <p className="pm-related__lede">
          Same nine-dimension taxonomy. Not employee share plans. CIGA, pre-pack, and the credential
          that matches the problem.
        </p>
        <ul className="pm-related__list">
          {RELATED_WORK.map((item) => (
            <li key={item.title}>
              <Link href={item.href}>
                <span className="pm-related__tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
