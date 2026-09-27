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
    railIntent(railText(props.fields?.Intent, ''), 'style'),
    product,
    shopper,
    handPlaced || railText(props.fields?.ProductIds, '')
  );
  const reason = shopper.topFit || shopper.topBrand || shopper.topCategory;

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section id="your-style" className="asos-wrap asos-rail" aria-label="Your style">
        <RailTitle field={props.fields?.Heading} fallback="YOUR STYLE" />
        <p className="asos-rail__intro text-center">
          {railText(
            props.fields?.Intro,
            reason ? `Based on your ${reason} affinity` : 'Pieces that match how you shop'
          )}
        </p>
        <ProductGrid products={products} market={market.code} />
      </section>
    </div>
  );
};

export default Default;
