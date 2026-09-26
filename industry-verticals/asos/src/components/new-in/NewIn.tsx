'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { STORY } from '@/lib/asos-journey';
import { PRODUCTS } from '@/lib/product-catalog';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';

type Fields = { Heading?: TextField; ShopLabel?: TextField };
type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const heading = props.fields?.Heading?.value;
  const shopLabel = props.fields?.ShopLabel?.value || "Shop women's new in";

  return (
    <section className="asos-wrap pb-12" id={props.params?.RenderingIdentifier}>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-black">
          {heading ? <Text field={props.fields?.Heading} /> : 'New in'}
        </h2>
        <Link className="text-sm underline" href={withMarket(STORY.newInHref, market.code)}>
          {shopLabel}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {PRODUCTS.slice(0, 8).map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
