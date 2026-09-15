import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE, AZ_INDEX } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap oh-advice" style={{ maxWidth: '48rem' }}>
        <p className="oh-crumb">
          <Link href="/">Home</Link> / Get help
        </p>
        <p className="oh-kicker">Advice</p>
        <h1>Get help</h1>
        <p>
          Practical steps for energy, rent and food. These pages are written for people in crisis
          and for the crawlers that cite them — no photography, no campaign chrome.
        </p>
        <ul className="mt-8 grid gap-4">
          {ADVICE.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="oh-card block">
                <div className="oh-card__body">
                  <h2>{item.title}</h2>
                  <p className="oh-muted text-sm">{item.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/get-help/a-z">A–Z index</Link>
          {' · '}
          <Link href="/get-help/near-you">Help near you</Link>
        </p>
        <p className="oh-muted mt-6 text-sm">{AZ_INDEX.length} topics in the index.</p>
      </div>
    </section>
  );
};

export default Default;
