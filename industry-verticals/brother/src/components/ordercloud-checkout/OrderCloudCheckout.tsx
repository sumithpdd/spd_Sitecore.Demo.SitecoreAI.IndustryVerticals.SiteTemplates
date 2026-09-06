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

const DEFAULT_LINES: DemoCartLine[] = [
  {
    sku: 'TN-243BK',
    title: 'Toner TN-243BK (HL / DCP / MFC)',
    priceGbp: 54.99,
    qty: 1,
    href: '/supplies/toner/tn-243bk',
  },
  {
    sku: 'DK-22205',
    title: 'DK continuous roll (QL series)',
    priceGbp: 18.49,
    qty: 2,
    href: '/supplies/labels/dk-22205',
  },
];

/**
 * OrderCloud commerce beat — supplies cart / checkout demo (Act 4).
 */
export const Default = (_props: Props): JSX.Element => {
  const [lines, setLines] = useState<DemoCartLine[]>(DEFAULT_LINES);
  const [fromCart, setFromCart] = useState(false);

  useEffect(() => {
    const sync = () => {
      const cart = getCart();
      if (cart.length > 0) {
        setLines(cart);
        setFromCart(true);
      } else {
        setLines(DEFAULT_LINES);
        setFromCart(false);
      }
    };
    sync();
    return subscribeCart(sync);
  }, []);

  const count = cartItemCount(lines);
  const total = cartTotalGbp(lines);

  return (
    <section className="brother-commerce">
      <div className="brother-container brother-commerce__grid">
        <div>
          <p className="brother-eyebrow">OrderCloud · supplies</p>
          <h1>Cart & checkout demo</h1>
          <p>
            {fromCart
              ? 'Items you added from product pages. Completing checkout here is the OrderCloud commerce beat.'
              : 'Composable commerce for printers and supplies. Jack reorders toner matched to his device; Rick measures attach rate and CRO experiments — in-journey, not only after the campaign.'}
          </p>
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
