'use client';

import { JSX, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { productImage, type Product } from '@/lib/product-catalog';
import { formatMoney, type MarketCode, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';

type Props = {
  product: Product;
  market: MarketCode;
};

export const AsosProductCard = ({ product, market }: Props): JSX.Element => {
  const [on, setOn] = useState(() => isSaved(product.id));

  return (
    <article className="asos-card">
      <div className="relative">
        <Link href={withMarket(product.href, market)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={productImage(product)} alt={product.title} />
        </Link>
        <button
          type="button"
          className={`asos-heart absolute top-2 right-2 ${on ? 'is-on' : ''}`}
          aria-label={on ? 'Remove from saved' : 'Save'}
          onClick={() => setOn(toggleSave(product))}
        >
          <Heart className="size-4" fill={on ? 'currentColor' : 'none'} />
        </button>
        {product.merchState ? (
          <p className="asos-badge absolute bottom-2 left-2">
            {product.merchState.replace('-', ' ')}
          </p>
        ) : null}
      </div>
      <div className="asos-card__meta">
        <Link href={withMarket(product.href, market)}>
          <p>{product.title}</p>
          <p className="font-bold">{formatMoney(product.priceGbp, market)}</p>
        </Link>
      </div>
    </article>
  );
};
