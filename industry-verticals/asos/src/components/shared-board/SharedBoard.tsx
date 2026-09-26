'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { useRouter } from 'next/router';
import { boardFromPath, SHARED_BOARDS } from '@/lib/asos-boards';
import { getProduct } from '@/lib/product-catalog';
import { parseMarketPath } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { readProfile } from '@/lib/asos-profile';

type Props = ComponentProps & { listingPath?: string };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const board = boardFromPath(routed.path) || SHARED_BOARDS[0];
  const [fit, setFit] = useState('');

  useEffect(() => {
    setFit(readProfile()?.bodyFit || '');
  }, []);

  const products = useMemo(() => {
    const items = board.productIds.flatMap((id) => {
      const product = getProduct(id);
      return product ? [product] : [];
    });
    return fit ? items.filter((product) => product.bodyFit.includes(fit)) : items;
  }, [board, fit]);

  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <p className="text-xs font-bold tracking-wide uppercase">Shared board</p>
      <h1 className="mt-2 text-3xl font-bold">{board.title}</h1>
      <p className="mt-2 text-sm text-[#666]">
        Saved from Pasteboard. Anyone with this link can open it.
      </p>
      {fit ? (
        <p className="mt-2 text-sm">Showing your fit: {fit === 'plus' ? 'curve' : fit}</p>
      ) : null}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
