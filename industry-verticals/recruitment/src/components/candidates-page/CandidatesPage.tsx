import { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { SECTORS, textValue } from '@/lib/aspire-catalog';
import { LatestJobs } from '@/components/home-banner/HomeBanner';

type Props = ComponentProps & {
  fields?: { Heading?: { value?: string }; Intro?: { value?: string } };
};

export const Default = (props: Props): JSX.Element => (
  <section className="aspire-page" id={props.params?.RenderingIdentifier}>
    <h1>{textValue(props.fields?.Heading, 'Elevate your ambition.')}</h1>
    <p className="aspire-lead">
      {textValue(
        props.fields?.Intro,
        'Stop searching, start partnering. We introduce high-calibre people to brands that are actually hiring, including roles that never reach a job board.'
      )}
    </p>
    <LatestJobs />
    <h2>Sectors we support</h2>
    <div className="aspire-sectors">
      {SECTORS.map((sector) => (
        <Link key={sector} href={`/jobs?query=${encodeURIComponent(sector)}`}>
          {sector}
        </Link>
      ))}
    </div>
    <div className="aspire-split">
      <article>
        <h2>Join the talent network</h2>
        <p>
          Send a CV. A consultant reads it and comes back with roles that fit how you want to work,
          not only the keywords.
        </p>
        <Link href="/jobs">Browse live jobs</Link>
      </article>
      <article>
        <h2>The Aspire advantage</h2>
        <p>
          Retained searches open doors that are not advertised. Consultants coach the interview.
          Offices in the UK, US, APAC, and MENA mean a move can cross a border.
        </p>
      </article>
    </div>
  </section>
);

export default Default;
