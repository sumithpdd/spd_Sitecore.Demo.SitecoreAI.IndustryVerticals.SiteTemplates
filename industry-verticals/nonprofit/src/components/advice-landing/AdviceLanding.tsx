'use client';

import { JSX } from 'react';
import { Field, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE, AZ_INDEX } from '@/lib/openhand-catalog';
import Link from 'next/link';

type Fields = {
  Heading?: Field<string>;
  Intro?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const heading = fields.Heading?.value || 'Get help';

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap oh-advice" style={{ maxWidth: '48rem' }}>
        <p className="oh-crumb">
          <Link href="/">Home</Link> / Get help
        </p>
        <p className="oh-kicker">Advice</p>
        <h1>{fields.Heading?.value || isEditing ? <Text field={fields.Heading} /> : heading}</h1>
        {fields.Intro?.value || isEditing ? (
          <RichText field={fields.Intro} />
        ) : (
          <p>
            Practical steps for energy, rent and food. These pages are written for people in crisis
            and for the crawlers that cite them.
          </p>
        )}
        <ul className="mt-8 grid gap-4">
          {ADVICE.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="oh-card oh-card--row block">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="oh-card__thumb" />
                ) : null}
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
