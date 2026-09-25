'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITS, STORY } from '@/lib/asos-journey';
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
  const womenImg = productImage(PRODUCTS[2]);
  const menImg = productImage(PRODUCTS[8]);

  return (
    <section id={props.params?.RenderingIdentifier}>
      {props.fields?.Title || isEditing ? (
        <h1 className="sr-only">
          <Text field={props.fields?.Title} />
        </h1>
      ) : (
        <h1 className="sr-only">ASOS | This is ASOS</h1>
      )}

      <div className="asos-split">
        <Link href={withMarket('/women', market.code)} className="asos-split__tile">
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={womenImg} alt="" />
          <span>Women</span>
        </Link>
        <Link href={withMarket('/women', market.code)} className="asos-split__tile">
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={menImg} alt="" />
          <span>Men</span>
        </Link>
      </div>

      <div className="asos-wrap py-10">
        <div className="mb-10 grid gap-4 md:grid-cols-3">
          {EDITS.slice(0, 3).map((edit, index) => (
            <Link key={edit.slug} href={withMarket(edit.href, market.code)} className="asos-tile">
              {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
              <img src={productImage(PRODUCTS[index + 4])} alt="" />
              <div>
                <p className="text-xs uppercase">{edit.kicker}</p>
                <h2 className="text-2xl font-black">{edit.title}</h2>
                <p className="mt-1 text-sm">{edit.body}</p>
                <span className="asos-btn-dark mt-4 w-fit">Shop now</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-black">New in</h2>
          <Link className="text-sm underline" href={withMarket(STORY.newInHref, market.code)}>
            Shop women&apos;s new in
          </Link>
        </div>
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {newIn.map((product) => (
            <AsosProductCard key={product.id} product={product} market={market.code} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
