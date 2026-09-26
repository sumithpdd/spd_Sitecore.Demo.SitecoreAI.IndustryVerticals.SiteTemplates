'use client';

import { JSX, useState } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { addToBag } from '@/lib/asos-bag';
import { HERO_PRODUCT, productFromPath, productImage } from '@/lib/product-catalog';
import { railText, RailTitle, type RailFields } from '@/lib/pdp-rails';
import { railIntent, resolveRailProducts, useShopper } from '@/lib/cdp/session-affinity';
import Link from 'next/link';

type Props = ComponentProps & { fields?: RailFields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const routed = parseMarketPath(router.asPath);
  const product = productFromPath(routed.path) || HERO_PRODUCT;
  const shopper = useShopper();
  const outfit = resolveRailProducts(
    railIntent(railText(props.fields?.Intent, ''), 'outfit'),
    product,
    shopper,
    railText(props.fields?.ProductIds, '')
  );
  const items = [product, ...outfit.filter((item) => item.id !== product.id)].slice(0, 5);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState('');
  const selected = items[active] || product;
  const intro = railText(props.fields?.Intro, "Shop the model's full 'fit");

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section id="buy-the-look" className="asos-btl" aria-label="Buy the look">
        <div className="asos-wrap">
          <div className="asos-btl__head">
            <div>
              <RailTitle field={props.fields?.Heading} fallback="BUY THE LOOK" />
              <p className="asos-rail__intro">{intro}</p>
            </div>
            <p className="text-sm text-[#767676]">{items.length} items</p>
          </div>
          <div className="asos-btl__grid">
            {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
            <img src={productImage(product)} alt={product.title} className="asos-btl__hero" />
            <div className="asos-btl__panel">
              <div className="asos-btl__thumbs">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={index === active ? 'is-on' : undefined}
                    onClick={() => {
                      setActive(index);
                      setSize('');
                    }}
                    aria-label={item.title}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
                    <img src={productImage(item)} alt="" />
                  </button>
                ))}
              </div>
              <div className="asos-btl__pick">
                {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
                <img src={productImage(selected)} alt="" />
                <div>
                  <Link href={withMarket(selected.href, routed.market.code)}>{selected.title}</Link>
                  <p className="mt-1 font-bold">
                    {formatMoney(selected.priceGbp, routed.market.code)}
                  </p>
                  <p className="mt-2 text-xs">
                    <span className="font-bold">COLOUR:</span> {selected.color}
                  </p>
                  <label
                    className="mt-3 block text-xs font-bold"
                    htmlFor={`btl-size-${selected.id}`}
                  >
                    SIZE:
                  </label>
                  <select
                    id={`btl-size-${selected.id}`}
                    className="asos-select mt-1"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                  >
                    <option value="">Please select</option>
                    {selected.sizes.map((uk) => (
                      <option key={uk} value={uk}>
                        {sizeLabel(uk, routed.market.code)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="asos-btn-line mt-3 w-full"
                    onClick={() =>
                      addToBag(selected, size ? sizeLabel(size, routed.market.code) : '')
                    }
                  >
                    ADD TO BAG
                  </button>
                  <a className="asos-btn-line mt-2 w-full" href="#you-might-also-like">
                    SEE SIMILAR
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Default;
