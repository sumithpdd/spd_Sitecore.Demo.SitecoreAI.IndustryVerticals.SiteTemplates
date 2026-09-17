'use client';

import { JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { GIFT_VALUES } from '@/lib/openhand-catalog';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const [amount, setAmount] = useState(GIFT_VALUES[2].amount);

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap max-w-lg">
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Choose a gift
        </h1>
        <p className="oh-muted mt-2">
          Winter gifts are matched. This is a demo selector — no payment is taken.
        </p>
        <ul className="mt-8 grid gap-3">
          {GIFT_VALUES.map((gift) => (
            <li key={gift.amount}>
              <button
                type="button"
                className={`w-full rounded-xl border px-4 py-3 text-left ${
                  amount === gift.amount
                    ? 'border-[var(--oh-amber)] bg-[var(--oh-cream)]'
                    : 'border-[var(--oh-line)]'
                }`}
                onClick={() => setAmount(gift.amount)}
              >
                <strong>£{gift.amount}</strong>
                <span className="oh-muted ml-2 text-sm">{gift.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-semibold">
          £{amount} — thank you. Match applies on the winter appeal.
        </p>
      </div>
    </section>
  );
};

export default Default;
