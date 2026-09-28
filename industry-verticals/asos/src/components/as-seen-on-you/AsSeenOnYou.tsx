'use client';

import { JSX, useEffect, useState } from 'react';
import { Field, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { STORY } from '@/lib/asos-journey';
import { getProduct, type Product } from '@/lib/product-catalog';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { productMissesSize, readProfile, shopperUkSize } from '@/lib/asos-profile';

type Fields = {
  Heading?: TextField;
  ShopLabel?: TextField;
  ShopHref?: Field<string>;
  ProductIds?: Field<string>;
};
type Props = ComponentProps & { fields?: Fields };

const FALLBACK_IDS = ['8805001', '210645207', '210943513', '210425806', '208718129', '8805014'];

function productsFromFields(field?: Field<string>): Product[] {
  const raw = typeof field?.value === 'string' ? field.value : '';
  const ids = raw.split(/[^0-9]+/).filter((id) => id.length >= 5);
  const picked = (ids.length ? ids : FALLBACK_IDS)
    .map((id) => getProduct(id))
    .filter((product): product is Product => Boolean(product));
  return picked;
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const heading = props.fields?.Heading?.value;
  const shopLabel = props.fields?.ShopLabel?.value || 'Shop denim';
  const shopHref =
    (typeof props.fields?.ShopHref?.value === 'string' && props.fields.ShopHref.value) ||
    STORY.trendsDenimHref;
  const products = productsFromFields(props.fields?.ProductIds);
  const [yourSize, setYourSize] = useState('');
  const [fit, setFit] = useState('denim');

  useEffect(() => {
    setYourSize(shopperUkSize(router.asPath));
    setFit(readProfile()?.bodyFit || 'denim');
  }, [router.asPath]);

  const ordered = yourSize
    ? [...products].sort(
        (a, b) =>
          Number(productMissesSize(a.sizes, yourSize)) -
          Number(productMissesSize(b.sizes, yourSize))
      )
    : products;

  return (
    <section className="asos-wrap pb-12" id={props.params?.RenderingIdentifier}>
      <div className="mb-2 flex items-end justify-between">
        <h2 className="text-2xl font-black">
          {heading ? <Text field={props.fields?.Heading} /> : 'As seen on you'}
        </h2>
        <Link className="text-sm underline" href={withMarket(shopHref, market.code)}>
          {shopLabel}
        </Link>
      </div>
      <p className="mb-6 text-sm text-[#666]">
        {yourSize
          ? `Based on your ${fit} fit — denim in your size UK ${yourSize}.`
          : 'Based on your fit — denim in your size.'}
      </p>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {ordered.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
