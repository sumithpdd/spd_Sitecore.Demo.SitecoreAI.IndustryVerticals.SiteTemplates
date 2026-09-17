'use client';

import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { FUNDRAISE_EVENTS, IMG } from '@/lib/openhand-catalog';
import { parseDemoParams } from '@/lib/demo-params';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const demo = parseDemoParams(router.asPath);
  const right = demo.promo === 'right';
  const promoImg = right ? IMG.promo3 : IMG.promo1;
  const promoCopy = right
    ? 'Right variant: one-to-one advice nights. Same events, different creative.'
    : 'Left variant: community-centre energy. Same events, different creative.';

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap">
        <p className="oh-crumb">
          <Link href="/">Home</Link> / Fundraise
        </p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Fundraise with us
        </h1>
        <p className="oh-muted max-w-xl">
          A/B surface: add ?promo=left or ?promo=right. Event grid stays the same.
        </p>
        <div className={`oh-grid oh-grid-2 mt-8 ${right ? 'md:[&>*:first-child]:order-2' : ''}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={promoImg} alt="" className="rounded-2xl object-cover" />
          <div className="oh-card">
            <div className="oh-card__body">
              <p className="oh-kicker">Promo {right ? 'right' : 'left'}</p>
              <h2>{promoCopy}</h2>
            </div>
          </div>
        </div>
        <ul className="oh-grid oh-grid-3 mt-10">
          {FUNDRAISE_EVENTS.map((event) => (
            <li key={event.id} className="oh-card">
              <Link href={event.href} className="oh-card__body block">
                <h3>{event.title}</h3>
                <p className="oh-muted text-sm">
                  {event.date} · {event.place}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
