'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { HERO_WORDS, SECTORS, textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';
import { JobGrid } from '@/lib/aspire-ui';

type Props = ComponentProps & {
  fields?: {
    Eyebrow?: { value?: string };
    Heading?: { value?: string };
    Intro?: { value?: string };
    Image?: { value?: { src?: string; alt?: string } };
  };
};

export const Default = (props: Props): JSX.Element => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((value) => (value + 1) % HERO_WORDS.length),
      1800
    );
    return () => window.clearInterval(timer);
  }, []);

  const hero = imageSrc(props.fields?.Image, 'hero-office.jpg');

  return (
    <>
      <section className="aspire-hero" id={props.params?.RenderingIdentifier}>
        <div>
          <p className="aspire-kicker">{textValue(props.fields?.Eyebrow, 'We Are')}</p>
          <h1>
            {textValue(props.fields?.Heading, 'Achieving more together.')}
            <span>{HERO_WORDS[index]}</span>
          </h1>
          <p>
            {textValue(
              props.fields?.Intro,
              'Search, contingent, and contract hiring across sales, SaaS, marketing, events, research, and data. Thirty years of clients and candidates, with a human consultant on every brief.'
            )}
          </p>
          <div className="aspire-sectors" aria-label="Sectors">
            {SECTORS.map((sector) => (
              <Link key={sector} href={`/jobs?query=${encodeURIComponent(sector)}`}>
                {sector}
              </Link>
            ))}
          </div>
        </div>
        {hero ? <img className="aspire-photo" src={hero} alt="" /> : null}
      </section>
      <LatestJobs />
    </>
  );
};

export const LatestJobs = (): JSX.Element => (
  <section className="aspire-band">
    <div className="aspire-band__head">
      <h2>Latest jobs</h2>
      <Link href="/jobs">View all jobs</Link>
    </div>
    <JobGrid />
  </section>
);

export default Default;
