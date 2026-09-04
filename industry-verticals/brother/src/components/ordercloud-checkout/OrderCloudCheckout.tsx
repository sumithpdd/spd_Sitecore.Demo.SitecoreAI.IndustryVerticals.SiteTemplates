'use client';

import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * OrderCloud commerce beat — supplies cart / checkout demo (Act 4).
 */
export const Default = (_props: Props): JSX.Element => {
  const lines = [
    { sku: 'TN-243BK', name: 'Toner TN-243BK (HL / DCP / MFC)', price: '£54.99', qty: 1 },
    { sku: 'DK-22205', name: 'DK continuous roll (QL series)', price: '£18.49', qty: 2 },
  ];

  return (
    <section className="brother-commerce">
      <div className="brother-container brother-commerce__grid">
        <div>
          <p className="brother-eyebrow">OrderCloud · supplies</p>
          <h1>Cart & checkout demo</h1>
          <p>
            Composable commerce for printers and supplies. Jack reorders toner matched to his
            device; Rick measures attach rate and CRO experiments — in-journey, not only after the
            campaign.
          </p>
          <ul className="brother-commerce__lines">
            {lines.map((line) => (
              <li key={line.sku}>
                <span>
                  <strong>{line.name}</strong>
                  <br />
                  <small>
                    {line.sku} · qty {line.qty}
                  </small>
                </span>
                <span>{line.price}</span>
              </li>
            ))}
          </ul>
          <div className="brother-hero__ctas">
            <a className="brother-btn brother-btn-primary" href="/supplies?utm_campaign=ordercloud-supplies&persona=rick">
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
            <strong>PCM → OrderCloud</strong> — one metadata update feeds CMS, search, and
            commerce.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Default;
