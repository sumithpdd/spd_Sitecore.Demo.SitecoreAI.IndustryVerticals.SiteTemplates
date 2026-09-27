'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { bagLines, type BagLine } from '@/lib/asos-bag';
import { formatMoney, parseMarketPath, sizeLabel } from '@/lib/asos-market';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [lines, setLines] = useState<BagLine[]>([]);

  useEffect(() => {
    const refresh = () => setLines(bagLines());
    refresh();
    window.addEventListener('asos-bag', refresh);
    return () => window.removeEventListener('asos-bag', refresh);
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
            <li key={`${line.id}-${line.size}`} className="flex items-center gap-4 py-4 text-sm">
              {line.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
                <img
                  src={line.image}
                  alt=""
                  width={64}
                  height={80}
                  className="h-20 w-16 object-cover"
                />
              ) : null}
              <span className="flex-1">
                {line.title}
                <br />
                <span className="text-[#666]">
                  {line.colour} · {sizeLabel(line.size, market.code)} · Qty {line.qty}
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
