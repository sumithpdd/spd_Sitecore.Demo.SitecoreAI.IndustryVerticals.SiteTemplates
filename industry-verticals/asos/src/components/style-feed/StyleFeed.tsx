'use client';

import { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PRODUCTS, productImage } from '@/lib/product-catalog';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { STORY } from '@/lib/asos-journey';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const look = STORY.berlinIds
    .map((id) => PRODUCTS.find((item) => item.id === id))
    .filter((item): item is (typeof PRODUCTS)[number] => Boolean(item));

  return (
    <section className="asos-wrap asos-feed py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">Style Feed</h1>
      <p className="mt-2 max-w-2xl text-sm">
        Inspiration-led outfits. Shop the look, then save it to {STORY.editName}.
      </p>
      <article>
        {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
        <img src={productImage(look[0] || PRODUCTS[0])} alt="" />
        <div>
          <p className="text-xs tracking-wide uppercase">Shop the look</p>
          <h2 className="text-2xl font-bold">{STORY.editName}</h2>
          <p className="mt-3 text-sm">
            Wide-leg jean, chocolate knit, Chelsea boot. One size on the jean — UK 8 — not three.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {look.map((item) => (
              <li key={item.id}>
                <Link href={withMarket(item.href, market.code)}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <Link
            className="asos-btn mt-6 inline-flex"
            href={withMarket(STORY.heroHref, market.code)}
          >
            Shop the jean
          </Link>
        </div>
      </article>
    </section>
  );
};

export default Default;
