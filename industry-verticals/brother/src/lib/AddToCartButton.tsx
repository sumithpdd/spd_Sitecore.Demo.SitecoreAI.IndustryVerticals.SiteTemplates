'use client';

import { JSX, MouseEvent, useRef, useState } from 'react';
import { addToCart } from 'lib/demo-cart';

type Props = {
  sku: string;
  title: string;
  priceGbp: number;
  href: string;
  compact?: boolean;
};

export function AddToCartButton({
  sku,
  title,
  priceGbp,
  href,
  compact,
}: Props): JSX.Element | null {
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  if (!sku) return null;

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart({ sku, title, priceGbp, href });
    setAdded(true);
    if (addedTimer.current) window.clearTimeout(addedTimer.current);
    addedTimer.current = window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      className={`brother-btn ${compact ? 'brother-btn-outline' : 'brother-btn-primary'} brother-add-to-cart`}
      onClick={onClick}
    >
      {added ? 'Added' : 'Add to cart'}
    </button>
  );
}
