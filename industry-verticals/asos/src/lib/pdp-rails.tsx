'use client';

import { JSX, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import type { Product } from '@/lib/product-catalog';
import type { MarketCode } from '@/lib/asos-market';

export type RailFields = {
  Heading?: TextField;
  Intro?: TextField;
  /** similar, outfit, cobought, recent, or style. Empty keeps the component default. */
  Intent?: TextField;
  /** Comma-separated product ids. When set, these products replace affinity ranking. */
  ProductIds?: TextField;
};

export function railText(field: TextField | undefined, fallback: string): string {
  const value = field?.value;
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

export const RailTitle = ({
  field,
  fallback,
}: {
  field?: TextField;
  fallback: string;
}): JSX.Element => {
  if (field?.value) return <Text field={field} tag="h2" className="asos-rail__title" />;
  return <h2 className="asos-rail__title">{fallback}</h2>;
};

export const ProductGrid = ({
  products,
  market,
}: {
  products: Product[];
  market: MarketCode;
}): JSX.Element => (
  <div className="asos-ymal">
    {products.map((item) => (
      <AsosProductCard key={item.id} product={item} market={market} rail />
    ))}
  </div>
);

const PAGE = 4;

export const ProductScroller = ({
  products,
  market,
}: {
  products: Product[];
  market: MarketCode;
}): JSX.Element => {
  const [page, setPage] = useState(0);
  const pages = Math.max(1, Math.ceil(products.length / PAGE));
  const safe = Math.min(page, pages - 1);
  const slice = products.slice(safe * PAGE, safe * PAGE + PAGE);

  return (
    <div className="asos-scroller">
      <button
        type="button"
        className="asos-scroller__arrow asos-scroller__arrow--prev"
        aria-label="Previous"
        disabled={safe === 0}
        onClick={() => setPage(safe - 1)}
      >
        <ChevronLeft className="size-5" />
      </button>
      <div className="asos-scroller__row">
        {slice.map((item) => (
          <AsosProductCard key={item.id} product={item} market={market} rail />
        ))}
      </div>
      <button
        type="button"
        className="asos-scroller__arrow asos-scroller__arrow--next"
        aria-label="Next"
        disabled={safe >= pages - 1}
        onClick={() => setPage(safe + 1)}
      >
        <ChevronRight className="size-5" />
      </button>
      {pages > 1 ? (
        <div className="asos-scroller__dots" role="tablist" aria-label="Pages">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Page ${index + 1}`}
              className={index === safe ? 'is-on' : undefined}
              onClick={() => setPage(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
