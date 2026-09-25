'use client';

import { JSX } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { PRODUCTS } from '@/lib/product-catalog';
import { parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';

export const Default = (props: ComponentProps): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const rail = PRODUCTS.filter((item) => item.bodyFit.includes('petite')).slice(0, 4);
  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h2 className="mb-4 text-xl font-bold">Because you shop petite</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {rail.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
