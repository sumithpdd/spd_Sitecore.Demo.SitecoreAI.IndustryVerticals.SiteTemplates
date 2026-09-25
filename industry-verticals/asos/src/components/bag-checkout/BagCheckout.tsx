'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { bagLines, type BagLine } from '@/lib/asos-bag';
import { formatMoney, parseMarketPath } from '@/lib/asos-market';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [lines, setLines] = useState<BagLine[]>([]);

  useEffect(() => {
    setLines(bagLines());
  }, []);

  const total = lines.reduce((sum, line) => sum + line.priceGbp * line.qty, 0);

  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">Bag</h1>
      <p className="mt-2 text-sm">Light checkout — enough to show add and the size decision.</p>
      {lines.length === 0 ? (
        <p className="mt-8 text-sm">Bag is empty.</p>
      ) : (
        <ul className="mt-6 divide-y">
          {lines.map((line) => (
            <li key={`${line.id}-${line.size}`} className="flex justify-between py-4 text-sm">
              <span>
                {line.title}
                <br />
                <span className="text-[#666]">
                  Size {line.size} · Qty {line.qty}
                </span>
              </span>
              <span className="font-bold">
                {formatMoney(line.priceGbp * line.qty, market.code)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6 text-lg font-bold">Total {formatMoney(total, market.code)}</p>
      <button type="button" className="asos-btn mt-4">
        Checkout
      </button>
    </section>
  );
};

export default Default;
