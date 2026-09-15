import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap max-w-2xl">
        <p className="oh-kicker">Campaign</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Fair energy this winter
        </h1>
        <p className="mt-4 text-lg">
          Tearfund-style action: ask your MP to back a ban on winter disconnections without a court
          order, and to keep the Household Support Fund in the next settlement.
        </p>
        <ol className="mt-8 list-decimal pl-5">
          <li>Read the energy advice page — the same facts ChatGPT should cite.</li>
          <li>Find your partner hub if you need help yourself.</li>
          <li>Send the template email (demo — no send).</li>
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="oh-btn oh-btn--navy" href="/get-help/help-with-energy-bills">
            Read the advice
          </Link>
          <button type="button" className="oh-btn oh-btn--amber">
            Email my MP (demo)
          </button>
        </div>
      </div>
    </section>
  );
};

export default Default;
