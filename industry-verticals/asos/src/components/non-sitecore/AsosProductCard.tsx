'use client';

import { JSX, useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { productImage, type Product } from '@/lib/product-catalog';
import { formatMoney, type MarketCode, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { isBroken } from '@/lib/asos-demo';
import {
  productMissesSize,
  shopperIsLoggedIn,
  shopperUkSize,
  sizeOutOfStock,
  SOLD_OUT_BADGE,
} from '@/lib/asos-profile';

type Props = {
  product: Product;
  market: MarketCode;
  /** Price above the title, heart on the lower corner — the PDP rails. */
  rail?: boolean;
  /** Brand, then title, then price — the search and listing tile. */
  showBrand?: boolean;
};

export const AsosProductCard = ({ product, market, rail, showBrand }: Props): JSX.Element => {
  const [on, setOn] = useState(false);
  const [notInSize, setNotInSize] = useState(false);
  const [soldOut, setSoldOut] = useState(false);
  // Audit state B-02: empty alt text. Resolved on the client so SSR still
  // renders the real alt (no hydration mismatch).
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(isBroken()), []);
  useEffect(() => {
    const refresh = () => setOn(isSaved(product.id));
    refresh();
    window.addEventListener('asos-save', refresh);
    return () => window.removeEventListener('asos-save', refresh);
  }, [product.id]);
  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    const uk = shopperUkSize(path);
    setSoldOut(shopperIsLoggedIn(path) && sizeOutOfStock(product.outOfStockSizes, uk));
    setNotInSize(productMissesSize(product.sizes, uk));
  }, [product.id, product.sizes, product.outOfStockSizes]);

  return (
    <article className="asos-card">
      <div className="relative">
        <Link href={withMarket(product.href, market)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={productImage(product)} alt={broken ? '' : product.title} />
        </Link>
        <button
          type="button"
          className={`asos-heart absolute right-2 ${rail ? 'bottom-2' : 'top-2'} ${on ? 'is-on' : ''}`}
          aria-label={on ? 'Remove from saved' : 'Save'}
          onClick={() => setOn(toggleSave(product))}
        >
          <Heart className="size-4" fill={on ? 'currentColor' : 'none'} />
        </button>
        {soldOut ? (
          <p className="asos-badge absolute bottom-2 left-2">{SOLD_OUT_BADGE}</p>
        ) : notInSize ? (
          <p className="asos-badge absolute bottom-2 left-2">Not in your size</p>
        ) : product.merchState ? (
          <p className="asos-badge absolute bottom-2 left-2">
            {product.merchState.replace('-', ' ')}
          </p>
        ) : null}
      </div>
      <div className="asos-card__meta">
        <Link href={withMarket(product.href, market)}>
          {rail ? (
            <>
              <p className="font-bold">{formatMoney(product.priceGbp, market)}</p>
              <p className="text-[#767676]">{product.title}</p>
            </>
          ) : showBrand ? (
            <>
              <p className="font-bold">{product.brand}</p>
              <p className="text-[#666]">{product.title}</p>
              <p className="mt-1 font-bold">{formatMoney(product.priceGbp, market)}</p>
            </>
          ) : (
            <>
              <p>{product.title}</p>
              <p className="font-bold">{formatMoney(product.priceGbp, market)}</p>
            </>
          )}
        </Link>
      </div>
    </article>
  );
};
