'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Trash2, X } from 'lucide-react';
import { bagLines, bagTotal, removeFromBag, type BagLine } from '@/lib/asos-bag';
import { formatMoney, sizeLabel, type MarketCode } from '@/lib/asos-market';

type Props = {
  market: MarketCode;
  bagHref: string;
  onClose: () => void;
};

export function MyBag({ market, bagHref, onClose }: Props): JSX.Element {
  const [lines, setLines] = useState<BagLine[]>([]);

  useEffect(() => {
    const refresh = () => setLines(bagLines());
    refresh();
    window.addEventListener('asos-bag', refresh);
    return () => window.removeEventListener('asos-bag', refresh);
  }, []);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = bagTotal(lines);

  return (
    <div className="asos-minicart" role="dialog" aria-label="My Bag">
      <header className="asos-minicart__head">
        <h2>
          My Bag, {count} {count === 1 ? 'item' : 'items'}
        </h2>
        <button type="button" aria-label="Close bag" onClick={onClose}>
          <X className="size-5" />
        </button>
      </header>
      {lines.length > 0 ? (
        <p className="asos-minicart__hold">
          <CheckCircle2 className="size-4" aria-hidden />
          It&apos;s in the bag - We&apos;ll hold it for an hour
        </p>
      ) : (
        <p className="asos-minicart__empty">Your bag is empty.</p>
      )}
      <ul>
        {lines.map((line) => (
          <li key={`${line.id}-${line.size}`} className="asos-minicart__line">
            {line.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
              <img src={line.image} alt="" width={72} height={92} />
            ) : (
              <span className="asos-minicart__ph" />
            )}
            <div>
              <p className="asos-minicart__price">{formatMoney(line.priceGbp, market)}</p>
              <p>{line.title}</p>
              <p className="asos-minicart__meta">
                {line.colour.toUpperCase()} {sizeLabel(line.size, market)} Qty: {line.qty}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Remove ${line.title}`}
              onClick={() => removeFromBag(line.id, line.size)}
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <div className="asos-minicart__sub">
        <span>Sub-total</span>
        <span>{formatMoney(total, market)}</span>
      </div>
      <div className="asos-minicart__actions">
        <Link className="asos-minicart__view" href={bagHref} onClick={onClose}>
          VIEW BAG
        </Link>
        <Link className="asos-minicart__checkout" href={bagHref} onClick={onClose}>
          CHECKOUT
        </Link>
      </div>
      <p className="asos-minicart__delivery">
        Free Delivery Worldwide *
        <span>
          More info <Link href={bagHref}>here</Link>
        </span>
      </p>
    </div>
  );
}
