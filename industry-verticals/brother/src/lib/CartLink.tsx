'use client';

import { JSX, useEffect, useState } from 'react';
import { cartItemCount, subscribeCart } from 'lib/demo-cart';

export function CartLink(): JSX.Element {
  const [count, setCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setCount(cartItemCount());
    sync();
    setReady(true);
    return subscribeCart(sync);
  }, []);

  return (
    <a
      className="brother-btn brother-btn-outline brother-header__cart"
      href="/checkout/supplies?utm_campaign=ordercloud-checkout"
    >
      Cart
      {ready && count > 0 ? (
        <span className="brother-header__cart-count" aria-label={`${count} in cart`}>
          {count}
        </span>
      ) : null}
    </a>
  );
}
