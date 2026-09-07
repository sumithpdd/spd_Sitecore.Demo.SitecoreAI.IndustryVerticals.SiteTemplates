'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import {
  cartItemCount,
  cartTotalGbp,
  getCart,
  subscribeCart,
  type DemoCartLine,
} from 'lib/demo-cart';
import { formatGbp } from 'lib/products-catalog';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * OrderCloud commerce beat — supplies cart / checkout demo (Act 4).
 * Starts empty; lines only appear after Add to cart.
 */
export const Default = (_props: Props): JSX.Element => {
  const [lines, setLines] = useState<DemoCartLine[]>([]);

  useEffect(() => {
    const sync = () => setLines(getCart());
    sync();
    return subscribeCart(sync);
  }, []);

  const count = cartItemCount(lines);
  const total = cartTotalGbp(lines);
  const isEmpty = lines.length === 0;

  return (
    <section className="brother-commerce">
      <div className="brother-container brother-commerce__grid">
        <div>
          <p className="brother-eyebrow">OrderCloud · supplies</p>
          <h1>Cart & checkout demo</h1>
          <p>
            {isEmpty
              ? 'Your cart is empty. Add supplies or a device from a product page, then return here to complete the OrderCloud commerce beat.'
              : 'Items you added from product pages. Completing checkout here is the OrderCloud commerce beat.'}
          </p>
          {isEmpty ? (
            <p className="brother-commerce__empty">No items in the cart yet.</p>
          ) : (
            <ul className="brother-commerce__lines">
              {lines.map((line) => (
                <li key={line.sku}>
                  <span>
                    <strong>{line.title}</strong>
                    <br />
                    <small>
                      {line.sku} · qty {line.qty}
                    </small>
                  </span>
                  <span>{formatGbp(line.priceGbp * line.qty)}</span>
                </li>
              ))}
              <li className="brother-commerce__total">
                <span>
                  <strong>Total</strong>
                  <br />
                  <small>
                    {count} item{count === 1 ? '' : 's'}
                  </small>
                </span>
                <span>{formatGbp(total)}</span>
              </li>
            </ul>
          )}
          <div className="brother-hero__ctas">
            <a
              className="brother-btn brother-btn-primary"
              href="/supplies?utm_campaign=ordercloud-supplies&persona=rick"
            >
              Back to supplies catalog
            </a>
            <a className="brother-btn brother-btn-outline" href="/business-solutions?persona=rick">
              Business / CRO view
            </a>
          </div>
        </div>
        <div className="brother-commerce__aside">
          <img src={brotherImages.suppliesHero} alt="" />
          <p>
            <strong>PCM → OrderCloud</strong> — one metadata update feeds CMS, search, and commerce.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Default;
