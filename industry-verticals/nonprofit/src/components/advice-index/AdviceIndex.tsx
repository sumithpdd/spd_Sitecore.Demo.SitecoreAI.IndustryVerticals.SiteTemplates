import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { AZ_INDEX } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-wrap oh-advice" id={props.params?.RenderingIdentifier}>
      <h1>A–Z of help</h1>
      <p>Macmillan-style index. Advice topics only — no campaign photography.</p>
      <div className="oh-az mt-8">
        {AZ_INDEX.map((item) => (
          <Link key={`${item.letter}-${item.href}`} href={item.href}>
            <strong className="mr-3">{item.letter}</strong>
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Default;
