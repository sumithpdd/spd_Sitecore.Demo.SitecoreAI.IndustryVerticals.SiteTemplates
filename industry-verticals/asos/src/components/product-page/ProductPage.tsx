'use client';

import { JSX, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HERO_PRODUCT,
  productFromPath,
  productGallery,
  type Product,
} from '@/lib/product-catalog';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { fieldString } from '@/lib/sitecore-fields';
import { addToBag } from '@/lib/asos-bag';
import { STORY } from '@/lib/asos-journey';

type Fields = {
  Title?: TextField;
  Variant?: TextField;
};

type Props = ComponentProps & { fields?: Fields };

const thin = (product: Product): boolean => {
  if (typeof window === 'undefined') return !product.completePdp;
  return new URLSearchParams(window.location.search).get('pdp') === 'thin'
    ? true
    : new URLSearchParams(window.location.search).get('pdp') === 'complete'
      ? false
      : !product.completePdp;
};

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market, path } = parseMarketPath(router.asPath);
  const isEditing = Boolean(props.fields?.Title);
  const product = productFromPath(path) || HERO_PRODUCT;
  const gallery = productGallery(product);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes[2] || '8');
  const [saved, setSaved] = useState(() => isSaved(product.id));
  const [open, setOpen] = useState<'details' | 'brand' | 'delivery'>('details');
  const isThin = useMemo(() => thin(product), [product]);
  const title = fieldString(props.fields?.Title) || product.title;
  const colour = fieldString(props.fields?.Variant) || product.color;

  return (
    <section className="asos-wrap asos-pdp" id={props.params?.RenderingIdentifier}>
      <div>
        <p className="mb-3 text-xs text-[#666]">
          <Link href={withMarket('/', market.code)}>Home</Link>
          {' / '}
          <Link href={withMarket(STORY.newInHref, market.code)}>New in</Link>
          {' / '}
          {product.brand}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
        <img
          src={gallery[active]}
          alt={product.title}
          className="aspect-[3/4] w-full object-cover"
        />
        <div className="asos-pdp__thumbs">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              className={index === active ? 'is-on' : undefined}
              onClick={() => setActive(index)}
              aria-label={`Image ${index + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Link
          href={withMarket(STORY.topshopHref, market.code)}
          className="text-xs font-bold tracking-wide uppercase underline"
        >
          {product.brand}
        </Link>
        {props.fields?.Title || isEditing ? (
          <h1 className="mt-2 text-2xl font-bold">
            <Text field={props.fields?.Title} />
          </h1>
        ) : (
          <h1 className="mt-2 text-2xl font-bold">{title}</h1>
        )}
        <p className="mt-3 text-lg font-bold">{formatMoney(product.priceGbp, market.code)}</p>
        {product.merchState ? (
          <p className="asos-badge mt-3 inline-block">{product.merchState.replace('-', ' ')}</p>
        ) : null}

        <p className="mt-6 text-sm">
          <span className="font-bold">COLOUR:</span> {colour}
        </p>

        <label className="mt-6 block text-xs font-bold uppercase" htmlFor="asos-size">
          Size
        </label>
        <select
          id="asos-size"
          className="mt-2 w-full border border-[#ddd] px-3 py-3 text-sm"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        >
          {product.sizes.map((uk) => (
            <option key={uk} value={uk}>
              {sizeLabel(uk, market.code)}
            </option>
          ))}
        </select>

        <div className="mt-4 flex gap-3">
          <button
            type="button"
            className="asos-btn flex-1"
            onClick={() => addToBag(product, sizeLabel(size, market.code))}
          >
            ADD TO BAG
          </button>
          <button
            type="button"
            className={`asos-heart ${saved ? 'is-on' : ''}`}
            onClick={() => setSaved(toggleSave(product, sizeLabel(size, market.code)))}
            aria-label="Save"
          >
            <Heart className="size-5" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {!isThin ? (
          <div className="asos-acc">
            <button type="button" onClick={() => setOpen('details')}>
              Product Details
            </button>
            {open === 'details' ? (
              <div>
                <p>{product.sellingLine}</p>
                <p className="mt-2">Model wears: {product.sizeWorn}</p>
                <p>Model height: {product.modelHeight}</p>
                <p>{product.fabric}</p>
                <p>{product.care}</p>
                <p>{product.fitFeedback}</p>
              </div>
            ) : null}
            <button type="button" onClick={() => setOpen('brand')}>
              Brand
            </button>
            {open === 'brand' ? <p>{product.brand}</p> : null}
            <button type="button" onClick={() => setOpen('delivery')}>
              Delivery & Returns
            </button>
            {open === 'delivery' ? (
              <p>Free delivery on this order for new customers. Easy returns via ASOS.</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-6 text-sm text-[#666]">
            Thin PDP — size and price only. Add `?pdp=complete` for product details.
          </p>
        )}
      </div>
    </section>
  );
};

export default Default;
