'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { savedProducts } from '@/lib/asos-save';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { STORY } from '@/lib/asos-journey';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [rows, setRows] = useState(savedProducts());

  useEffect(() => {
    const refresh = () => setRows(savedProducts());
    refresh();
    window.addEventListener('asos-save', refresh);
    return () => window.removeEventListener('asos-save', refresh);
  }, []);

  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">Saved items</h1>
      <p className="mt-2 text-sm">
        Hearts from the grid. Group them in{' '}
        <Link className="underline" href={withMarket(STORY.myEditHref, market.code)}>
          My Edit
        </Link>
        .
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm">Nothing saved yet — heart the Belle Paris cami to start.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {rows.map(({ product }) => (
            <AsosProductCard key={product.id} product={product} market={market.code} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Default;
