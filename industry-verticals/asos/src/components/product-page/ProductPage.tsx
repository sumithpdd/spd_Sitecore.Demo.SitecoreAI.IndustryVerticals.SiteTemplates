'use client';

import { JSX, useMemo, useState } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/router';
import { HERO_PRODUCT, productFromPath, productImage, type Product } from '@/lib/product-catalog';
import { formatMoney, parseMarketPath, sizeLabel } from '@/lib/asos-market';
import { isSaved, toggleSave } from '@/lib/asos-save';
import { fieldString } from '@/lib/sitecore-fields';
import { addToBag } from '@/lib/asos-bag';

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
  const [size, setSize] = useState(product.sizes[2] || '8');
  const [saved, setSaved] = useState(() => isSaved(product.id));
  const isThin = useMemo(() => thin(product), [product]);
  const title = fieldString(props.fields?.Title) || product.title;

  return (
    <section className="asos-wrap asos-pdp" id={props.params?.RenderingIdentifier}>
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
        <img src={productImage(product)} alt={product.title} className="w-full object-cover" />
      </div>
      <div>
        <p className="text-xs tracking-wide uppercase">{product.brand}</p>
        {props.fields?.Title || isEditing ? (
          <h1 className="text-3xl font-bold">
            <Text field={props.fields?.Title} />
          </h1>
        ) : (
          <h1 className="text-3xl font-bold">{title}</h1>
        )}
        <p className="mt-2 text-lg font-bold">{formatMoney(product.priceGbp, market.code)}</p>
        {product.merchState ? (
          <p className="asos-badge mt-3 inline-block">{product.merchState.replace('-', ' ')}</p>
        ) : null}

        <p className="mt-6 text-xs font-bold uppercase">Size — {market.sizeSystem}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((uk) => (
            <button
              key={uk}
              type="button"
              className={`border px-3 py-2 text-sm ${size === uk ? 'border-black bg-black text-white' : 'border-[#ddd]'}`}
              onClick={() => setSize(uk)}
            >
              {sizeLabel(uk, market.code)}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="asos-btn"
            onClick={() => addToBag(product, sizeLabel(size, market.code))}
          >
            Add to bag
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
          <dl className="asos-pdp__facts">
            <div>
              <dt>Model height</dt>
              <dd>{product.modelHeight}</dd>
            </div>
            <div>
              <dt>Size worn</dt>
              <dd>{product.sizeWorn}</dd>
            </div>
            <div>
              <dt>Fabric behaviour</dt>
              <dd>{product.fabric}</dd>
            </div>
            <div>
              <dt>Care</dt>
              <dd>{product.care}</dd>
            </div>
            <div>
              <dt>Fit feedback</dt>
              <dd>{product.fitFeedback}</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-6 text-sm text-[#666]">
            Thin PDP — size and price only. Add `?pdp=complete` for the returns block.
          </p>
        )}
        {product.sellingLine ? <p className="mt-4 text-sm">{product.sellingLine}</p> : null}
      </div>
    </section>
  );
};

export default Default;
