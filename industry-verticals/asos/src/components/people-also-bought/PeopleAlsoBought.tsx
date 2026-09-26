'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath } from '@/lib/asos-market';
import { HERO_PRODUCT, productFromPath } from '@/lib/product-catalog';
import { ProductScroller, railText, RailTitle, type RailFields } from '@/lib/pdp-rails';
import { railIntent, resolveRailProducts, useShopper } from '@/lib/cdp/session-affinity';

type Props = ComponentProps & { fields?: RailFields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const product = productFromPath(path) || HERO_PRODUCT;
  const shopper = useShopper();
  const products = resolveRailProducts(
    railIntent(railText(props.fields?.Intent, ''), 'cobought'),
    product,
    shopper,
    railText(props.fields?.ProductIds, '')
  );

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section
        id="people-also-bought"
        className="asos-wrap asos-rail"
        aria-label="People also bought"
      >
        <RailTitle field={props.fields?.Heading} fallback="PEOPLE ALSO BOUGHT" />
        <ProductScroller products={products} market={market.code} />
      </section>
    </div>
  );
};

export default Default;
