'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BODY_FITS, cidFromQuery, STORY, type BodyFit } from '@/lib/asos-journey';
import { categoryFromPath, PRODUCTS, productsForCid } from '@/lib/product-catalog';
import { MARKETS, parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { textField, useRouteFields } from '@/lib/route-fields';
import { readProfile } from '@/lib/asos-profile';

type Fields = { Title?: TextField };
type Props = ComponentProps & { fields?: Fields; listingPath?: string };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const path = props.listingPath || routed.path;
  const route = useRouteFields();
  const queryCid = cidFromQuery(router.asPath) || cidFromQuery(props.listingPath || '');
  const category = categoryFromPath(path, queryCid);
  const cid =
    textField(route.CategoryId) ||
    queryCid ||
    (category && 'cid' in category && category.cid ? String(category.cid) : '');
  const isEditing = Boolean(props.fields?.Title);
  const [fit, setFit] = useState<BodyFit | ''>('');
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const profile = readProfile();
    setSignedIn(Boolean(profile?.signedIn));
    if (profile?.bodyFit) setFit(profile.bodyFit);
  }, []);
  const title =
    textField(route.Title) ||
    (category && 'title' in category ? category.title : undefined) ||
    path.replace(/\//g, ' ').trim();

  const items = useMemo(() => {
    const base = cid ? productsForCid(cid) : PRODUCTS;
    return fit ? base.filter((item) => item.bodyFit.includes(fit)) : base;
  }, [cid, fit]);

  const brandCopy = cid === '29299' ? MARKETS[market.code].topshopCopy : undefined;
  const showFit = signedIn || Boolean(category && 'facetFit' in category && category.facetFit);

  return (
    <section className="asos-wrap py-6" id={props.params?.RenderingIdentifier}>
      <p className="mb-3 text-xs text-[#666]">
        <Link href={withMarket('/', market.code)}>Home</Link>
        {' / '}
        <Link href={withMarket('/women', market.code)}>Women</Link>
        {' / '}
        {title}
      </p>
      {props.fields?.Title || isEditing ? (
        <h1 className="text-3xl font-bold">
          <Text field={props.fields?.Title} />
        </h1>
      ) : (
        <h1 className="text-3xl font-bold">{title}</h1>
      )}
      {brandCopy ? <p className="mt-2 max-w-2xl text-sm">{brandCopy}</p> : null}
      {cid === STORY.denimDropCid || cid === STORY.trendsDenimCid ? (
        <p className="mt-2 max-w-2xl text-sm">
          Wide-leg jeans under £50. Filter by body fit — petite, tall, plus, maternity, standard.
        </p>
      ) : null}
      {signedIn && fit ? (
        <p className="mt-2 text-sm">Showing your fit: {fit === 'plus' ? 'curve' : fit}</p>
      ) : null}
      <p className="mt-1 text-sm text-[#666]">{items.length} styles</p>

      {showFit ? (
        <div className="asos-facets" aria-label="Body fit">
          <button type="button" className={!fit ? 'is-on' : undefined} onClick={() => setFit('')}>
            All
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
      ) : null}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>
    </section>
  );
};

export default Default;
