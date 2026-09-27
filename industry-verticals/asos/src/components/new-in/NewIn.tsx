'use client';

import { JSX } from 'react';
import { Field, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { STORY } from '@/lib/asos-journey';
import { getProduct, PRODUCTS, type Product } from '@/lib/product-catalog';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';

type Fields = {
  Heading?: TextField;
  ShopLabel?: TextField;
  ShopHref?: Field<string>;
  ProductIds?: Field<string>;
};
type Props = ComponentProps & { fields?: Fields };

function productsFromFields(field?: Field<string>): Product[] {
  const raw = typeof field?.value === 'string' ? field.value : '';
  const picked = raw
    .split(/[^0-9]+/)
    .filter((id) => id.length >= 5)
    .map((id) => getProduct(id))
    .filter((product): product is Product => Boolean(product));
  return picked.length ? picked : PRODUCTS.slice(0, 8);
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const heading = props.fields?.Heading?.value;
  const shopLabel = props.fields?.ShopLabel?.value || "Shop women's new in";
  const shopHref =
    (typeof props.fields?.ShopHref?.value === 'string' && props.fields.ShopHref.value) ||
    STORY.newInHref;
  const products = productsFromFields(props.fields?.ProductIds);

  return (
    <section className="asos-wrap pb-12" id={props.params?.RenderingIdentifier}>
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-black">
          {heading ? <Text field={props.fields?.Heading} /> : 'New in'}
        </h2>
        <Link className="text-sm underline" href={withMarket(shopHref, market.code)}>
          {shopLabel}
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
