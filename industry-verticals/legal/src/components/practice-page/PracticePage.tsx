import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { RESTRUCTURING } from '@/lib/legal-story';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-story pm-practice" id={id}>
      <div className="container mx-auto max-w-5xl py-16">
        <p className="pm-story__eyebrow">{RESTRUCTURING.eyebrow}</p>
        <h1 className="pm-story__title">{RESTRUCTURING.title}</h1>
        <p className="pm-story__intro">{RESTRUCTURING.intro}</p>
        <ul className="pm-practice__tags">
          {RESTRUCTURING.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <h2>Credentials</h2>
        <p className="pm-story__lede">
          Tagged once. Same items on Dawn, this practice, and the guide.
        </p>
        <ul className="pm-practice__credentials">
          {RESTRUCTURING.credentials.map((item) => (
            <li key={`${item.year}-${item.title}`}>
              <Link href={item.href}>
                <strong>{item.year}</strong> {item.title}
                <span>{item.lawyer}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
