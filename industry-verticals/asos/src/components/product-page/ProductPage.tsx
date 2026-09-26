'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  alsoBought,
  HERO_PRODUCT,
  lookFor,
  productFromPath,
  productGallery,
  type Product,
} from '@/lib/product-catalog';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { fieldString } from '@/lib/sitecore-fields';
import { addToBag } from '@/lib/asos-bag';
import { STORY } from '@/lib/asos-journey';
import { imageFieldSrc, textField, useRouteFields } from '@/lib/route-fields';
import { readProfile, sizeFromProfile } from '@/lib/asos-profile';

type Fields = {
  Title?: TextField;
  Variant?: TextField;
};

type Props = ComponentProps & { fields?: Fields; listingPath?: string };

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
  const routed = parseMarketPath(props.listingPath || router.asPath);
  const { market } = parseMarketPath(router.asPath);
  const path = props.listingPath || routed.path;
  const isEditing = Boolean(props.fields?.Title);
  const product = productFromPath(path) || HERO_PRODUCT;
  const route = useRouteFields();
  const cmsTitle = textField(route.Title);
  const cmsBrand = textField(route.Brand);
  const cmsPrice = Number(textField(route.Price));
  const cmsColour = textField(route.Colour);
  const cmsVideo = textField(route.Video);
  const cmsImage = imageFieldSrc(route.Image);
  const priceGbp = Number.isFinite(cmsPrice) && cmsPrice > 0 ? cmsPrice : product.priceGbp;
  const gallery = productGallery(product).map((src, index) =>
    index === 0 && cmsImage ? cmsImage : src
  );
  const [active, setActive] = useState(0);
  const [size, setSize] = useState(product.sizes[2] || '8');
  const [fitNote, setFitNote] = useState('');

  useEffect(() => {
    const profile = readProfile();
    const matched = sizeFromProfile(product.sizes, profile);
    if (matched) setSize(matched);
    setFitNote(profile?.signedIn ? (profile.bodyFit === 'plus' ? 'curve' : profile.bodyFit) : '');
  }, [product.id, product.sizes]);
  const [saved, setSaved] = useState(() => isSaved(product.id));
  const [open, setOpen] = useState<'details' | 'brand' | 'delivery'>('details');
  const isThin = useMemo(() => thin(product), [product]);
  const look = useMemo(() => lookFor(product), [product]);
  const bought = useMemo(() => alsoBought(product), [product]);
  const title = cmsTitle || fieldString(props.fields?.Title) || product.title;
  const colour = cmsColour || fieldString(props.fields?.Variant) || product.color;
  const brand = cmsBrand || product.brand;
  const videoSrc = cmsVideo || product.videoSrc;
  const brandHref = brand === 'Topshop' ? STORY.topshopHref : STORY.newInHref;

  return (
    <div id={props.params?.RenderingIdentifier}>
      <section className="asos-wrap asos-pdp">
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
          {videoSrc ? (
            <video className="mt-3 w-full" controls playsInline preload="metadata" src={videoSrc} />
          ) : null}
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
            href={withMarket(brandHref, market.code)}
            className="text-xs font-bold tracking-wide uppercase underline"
          >
            {brand}
          </Link>
          {props.fields?.Title || isEditing ? (
            <h1 className="mt-2 text-2xl font-bold">
              <Text field={props.fields?.Title} />
            </h1>
          ) : (
            <h1 className="mt-2 text-2xl font-bold">{title}</h1>
          )}
          <p className="mt-3 text-lg font-bold">{formatMoney(priceGbp, market.code)}</p>
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
          {fitNote ? (
            <p className="mt-2 text-sm">Your fit: {fitNote}. Size selected from your profile.</p>
          ) : null}

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
            <>
              <ul className="mt-4 space-y-1 text-sm">
                <li>Model wears: {product.sizeWorn}</li>
                <li>Model height: {product.modelHeight}</li>
                <li>{product.fabric}</li>
                <li>{product.fitFeedback}</li>
              </ul>
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
            </>
          ) : (
            <p className="mt-6 text-sm text-[#666]">
              Thin PDP — size and price only. Add `?pdp=complete` for product details.
            </p>
          )}
        </div>
      </section>
      {!isThin ? (
        <>
          <section className="asos-wrap asos-rail" aria-label="Buy the look">
            <h2 className="text-xl font-black">Buy the look</h2>
            <p className="mt-1 text-sm text-[#666]">Shop the model&apos;s full &apos;fit</p>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {look.map((item) => (
                <AsosProductCard key={item.id} product={item} market={market.code} />
              ))}
            </div>
          </section>
          <section className="asos-wrap asos-rail" aria-label="People also bought">
            <h2 className="text-xl font-black">People also bought</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {bought.map((item) => (
                <AsosProductCard key={item.id} product={item} market={market.code} />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default Default;
