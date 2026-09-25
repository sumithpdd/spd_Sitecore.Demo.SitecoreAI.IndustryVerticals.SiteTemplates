'use client';

import { JSX, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useRouter } from 'next/router';
import { BODY_FITS, cidFromQuery, type BodyFit } from '@/lib/asos-journey';
import { categoryFromPath, PRODUCTS, productsForCid } from '@/lib/product-catalog';
import { parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { MARKETS } from '@/lib/asos-market';

type Fields = { Title?: TextField };
type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const cid = cidFromQuery(router.asPath);
  const category = categoryFromPath(path, cid);
  const isEditing = Boolean(props.fields?.Title);
  const [fit, setFit] = useState<BodyFit | ''>('');
  const title =
    (category && 'title' in category ? category.title : undefined) ||
    path.replace(/\//g, ' ').trim();

  const items = useMemo(() => {
    const base = cid ? productsForCid(cid) : PRODUCTS;
    return fit ? base.filter((item) => item.bodyFit.includes(fit)) : base;
  }, [cid, fit]);

  const brandCopy = cid === '29299' ? MARKETS[market.code].topshopCopy : undefined;

  return (
    <section className="asos-wrap py-6" id={props.params?.RenderingIdentifier}>
      {props.fields?.Title || isEditing ? (
        <h1 className="text-3xl font-bold">
          <Text field={props.fields?.Title} />
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">{title}</h1>
      )}
      {brandCopy ? <p className="mt-2 max-w-2xl text-sm">{brandCopy}</p> : null}
      <p className="mt-1 text-sm text-[#666]">{items.length} styles</p>

      <div className="asos-facets" aria-label="Body fit">
        <button type="button" className={!fit ? 'is-on' : undefined} onClick={() => setFit('')}>
          All fits
        </button>
        {BODY_FITS.map((item) => (
          <button
            key={item}
            type="button"
            className={fit === item ? 'is-on' : undefined}
            onClick={() => setFit(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
