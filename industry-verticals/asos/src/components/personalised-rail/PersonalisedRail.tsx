'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { HERO_PRODUCT, productFromPath } from '@/lib/product-catalog';
import { parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { resolveRailProducts, useShopper } from '@/lib/cdp/session-affinity';

type Fields = { Heading?: TextField };

export const Default = (props: ComponentProps & { fields?: Fields }): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const shopper = useShopper();
  const product = productFromPath(path) || HERO_PRODUCT;
  const rail = resolveRailProducts('style', product, shopper).slice(0, 4);
  const label = shopper.topFit || shopper.topBrand || shopper.topCategory || 'your style';
  const heading = props.fields?.Heading?.value;

  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h2 className="mb-4 text-xl font-bold">
        {heading ? <Text field={props.fields?.Heading} /> : `Because you shop ${label}`}
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {rail.map((item) => (
          <AsosProductCard key={item.id} product={item} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
