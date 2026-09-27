'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath } from '@/lib/asos-market';
import { HERO_PRODUCT, productFromPath } from '@/lib/product-catalog';
import {
  ProductGrid,
  railText,
  RailTitle,
  useHandPlacedIds,
  type RailFields,
} from '@/lib/pdp-rails';
import { railIntent, resolveRailProducts, useShopper } from '@/lib/cdp/session-affinity';

type Props = ComponentProps & { fields?: RailFields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const product = productFromPath(path) || HERO_PRODUCT;
  const shopper = useShopper();
  const handPlaced = useHandPlacedIds();
  const products = resolveRailProducts(
    railIntent(railText(props.fields?.Intent, ''), 'similar'),
    product,
    shopper,
    handPlaced || railText(props.fields?.ProductIds, '')
  );

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section
        id="you-might-also-like"
        className="asos-wrap asos-rail"
        aria-label="You might also like"
      >
        <RailTitle field={props.fields?.Heading} fallback="YOU MIGHT ALSO LIKE" />
        <ProductGrid products={products} market={market.code} />
      </section>
    </div>
  );
};

export default Default;
