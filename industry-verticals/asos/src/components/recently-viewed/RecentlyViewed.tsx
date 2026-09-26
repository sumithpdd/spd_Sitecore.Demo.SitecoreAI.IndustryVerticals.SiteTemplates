'use client';

import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath } from '@/lib/asos-market';
import { clearRecent, readRecentIds, recentProducts } from '@/lib/asos-recent';
import { HERO_PRODUCT, productFromPath, type Product } from '@/lib/product-catalog';
import { recordProductView } from '@/lib/cdp/session-affinity';
import { ProductScroller, RailTitle, type RailFields } from '@/lib/pdp-rails';

type Props = ComponentProps & { fields?: RailFields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const product = productFromPath(path) || HERO_PRODUCT;
  const [items, setItems] = useState<Product[]>([]);
  const [canClear, setCanClear] = useState(false);

  useEffect(() => {
    recordProductView(product);
    const refresh = () => {
      const ids = readRecentIds();
      setCanClear(ids.filter((id) => id !== product.id).length > 0);
      setItems(recentProducts(product.id).slice(0, 8));
    };
    refresh();
    window.addEventListener('asos-recent', refresh);
    return () => window.removeEventListener('asos-recent', refresh);
  }, [product]);

  const clear = () => {
    clearRecent();
  };

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section id="recently-viewed" className="asos-wrap asos-rail" aria-label="Recently viewed">
        <div className="asos-rail__bar">
          <RailTitle field={props.fields?.Heading} fallback="RECENTLY VIEWED" />
          {canClear ? (
            <button type="button" className="asos-clear" onClick={clear}>
              CLEAR ALL
            </button>
          ) : null}
        </div>
        {items.length > 0 ? (
          <ProductScroller products={items} market={market.code} />
        ) : (
          <p className="text-sm text-[#767676]">Pieces you open will show up here.</p>
        )}
      </section>
    </div>
  );
};

export default Default;
