'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITS, STORY, TRENDING_CHIPS } from '@/lib/asos-journey';
import { PRODUCTS, productImage } from '@/lib/product-catalog';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';

type Fields = { Title?: TextField };
type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const isEditing = Boolean(props.fields?.Title);
  const newIn = PRODUCTS.slice(0, 8);

  return (
    <section className="asos-wrap py-6" id={props.params?.RenderingIdentifier}>
      {props.fields?.Title || isEditing ? (
        <h1 className="mb-6 text-3xl font-black">
          <Text field={props.fields?.Title} />
        </h1>
      ) : (
        <h1 className="mb-6 text-3xl font-black">Women</h1>
      )}

      <p className="mb-2 text-xs font-bold tracking-wide uppercase">Top-searched faves</p>
      <div className="mb-8 flex flex-wrap gap-2">
        {TRENDING_CHIPS.map((chip) => (
          <Link key={chip.label} className="asos-chip" href={withMarket(chip.href, market.code)}>
            {chip.label}
          </Link>
        ))}
      </div>

      <div className="asos-hero mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
        <img src={productImage(PRODUCTS[1])} alt="" />
        <div className="asos-hero__copy">
          <p className="text-xs tracking-wide uppercase">New edit</p>
          <h2 className="text-4xl font-black">The denim drop</h2>
          <p className="mt-2 max-w-md text-sm">
            Petite-first denim — the campaign Session 2 produces.
          </p>
          <Link
            className="asos-btn-dark mt-4 w-fit"
            href={withMarket(STORY.newInHref, market.code)}
          >
            Shop new in
          </Link>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-bold">New in</h2>
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {newIn.map((product) => (
          <AsosProductCard key={product.id} product={product} market={market.code} />
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold">New edits</h2>
      <div className="mb-10 grid gap-4 md:grid-cols-4">
        {EDITS.map((edit) => (
          <Link
            key={edit.slug}
            href={withMarket(edit.href, market.code)}
            className="bg-[#f6f6f6] p-4"
          >
            <p className="text-xs uppercase">{edit.kicker}</p>
            <h3 className="text-lg font-bold">{edit.title}</h3>
            <p className="mt-2 text-sm">{edit.body}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[#111] p-8 text-white">
        <p className="text-xs tracking-wide uppercase">Style Feed</p>
        <h2 className="text-2xl font-bold">Outfit ideas that become a basket</h2>
        <Link
          className="asos-btn mt-4 inline-flex"
          href={withMarket(STORY.styleFeedHref, market.code)}
        >
          Be inspired
        </Link>
      </div>
    </section>
  );
};

export default Default;
