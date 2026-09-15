'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { APPEALS, appealByHref } from '@/lib/openhand-catalog';
import { parseDemoParams, withDemoParams } from '@/lib/demo-params';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = ComponentProps;

const formatGbp = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const demo = parseDemoParams(router.asPath);
  const path = router.asPath.split('?')[0];
  const appeal = appealByHref(path) || (demo.appeal === 'emergency' ? APPEALS[1] : APPEALS[0]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const remaining = Math.max(0, new Date(appeal.matchUntil).getTime() - now);
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const pct = Math.min(100, Math.round((appeal.raised / appeal.target) * 100));

  return (
    <article id={props.params?.RenderingIdentifier}>
      <section className="oh-hero min-h-[22rem]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="oh-hero__img" src={appeal.image} alt="" />
        <div className="oh-wrap oh-hero__copy">
          <p className="oh-kicker">{appeal.kicker}</p>
          <h1>{appeal.title}</h1>
          <p>{appeal.summary}</p>
        </div>
      </section>
      <section className="oh-section">
        <div className="oh-wrap max-w-xl">
          <p className="text-3xl font-semibold">{formatGbp(appeal.raised)}</p>
          <p className="oh-muted">
            raised of {formatGbp(appeal.target)} · {pct}%
          </p>
          <div className="oh-meter mt-3">
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-6 text-lg">
            Match ends in {days}d {hours}h
          </p>
          <Link className="oh-btn oh-btn--amber mt-6" href={withDemoParams('/donate', demo)}>
            Donate to this appeal
          </Link>
        </div>
      </section>
    </article>
  );
};

export default Default;
