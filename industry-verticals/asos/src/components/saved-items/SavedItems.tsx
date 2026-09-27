'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Star, Trash2 } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { addToBag } from '@/lib/asos-bag';
import { savedProducts, toggleSave } from '@/lib/asos-save';
import { formatMoney, parseMarketPath, sizeLabel, withMarket } from '@/lib/asos-market';
import { productImage, type Product } from '@/lib/product-catalog';

type Props = ComponentProps;
type SortKey = 'recent' | 'price';

const AppCard = (): JSX.Element => {
  const cells = Array.from({ length: 121 }, (_, index) => (index * 17 + (index % 5) * 3) % 7 > 2);
  return (
    <article className="asos-saved__app">
      <h2>Download the app</h2>
      <svg viewBox="0 0 21 21" role="img" aria-label="Saved items code">
        {cells.map((on, index) =>
          on ? (
            <rect key={index} x={index % 21} y={Math.floor(index / 21)} width="1" height="1" />
          ) : null
        )}
      </svg>
      <p>Scroll through your Saved Items – fast</p>
      <p className="asos-saved__stars" aria-label="5 stars, 1.6m downloads">
        <Star className="size-3" fill="currentColor" />
        <Star className="size-3" fill="currentColor" />
        <Star className="size-3" fill="currentColor" />
        <Star className="size-3" fill="currentColor" />
        <Star className="size-3" fill="currentColor" />
        <span>1.6m Downloads</span>
      </p>
    </article>
  );
};

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [rows, setRows] = useState<ReturnType<typeof savedProducts>>([]);
  const [sort, setSort] = useState<SortKey>('recent');
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [moved, setMoved] = useState('');

  useEffect(() => {
    const refresh = () => setRows(savedProducts());
    refresh();
    window.addEventListener('asos-save', refresh);
    return () => window.removeEventListener('asos-save', refresh);
  }, []);

  const ordered = useMemo(() => {
    const copy = [...rows];
    if (sort === 'price') copy.sort((a, b) => b.product.priceGbp - a.product.priceGbp);
    else copy.sort((a, b) => b.saved.savedAt.localeCompare(a.saved.savedAt));
    return copy;
  }, [rows, sort]);

  const move = (product: Product, size: string) => {
    addToBag(product, size);
    setMoved(product.id);
  };

  return (
    <section className="asos-saved" id={props.params?.RenderingIdentifier}>
      <h1>Saved Items</h1>
      <div className="asos-saved__bar">
        <label>
          <span className="sr-only">Sort saved items</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="recent">Recently added</option>
            <option value="price">Price: high to low</option>
          </select>
        </label>
        <p>
          {ordered.length} {ordered.length === 1 ? 'item' : 'items'}
        </p>
      </div>
      {ordered.length === 0 ? (
        <p className="asos-saved__empty">Nothing saved yet. Heart a piece to keep it here.</p>
      ) : null}
      <div className="asos-saved__grid">
        {ordered.map(({ product, saved }) => {
          const size = sizes[product.id] ?? saved.size;
          const options = product.sizes.length ? product.sizes : ['8'];
          const low = product.merchState === 'selling-fast' || product.merchState === 'last-chance';
          return (
            <article key={product.id} className="asos-saved__card">
              <div className="asos-saved__photo">
                <Link href={withMarket(product.href, market.code)}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- Content Hub public link */}
                  <img src={productImage(product)} alt={product.title} />
                </Link>
                <button
                  type="button"
                  aria-label={`Remove ${product.title} from saved`}
                  onClick={() => toggleSave(product, size)}
                >
                  <Trash2 className="size-4" />
                </button>
                {low ? <p className="asos-saved__low">LOW IN STOCK</p> : null}
              </div>
              <h2>
                <Link href={withMarket(product.href, market.code)}>{product.title}</Link>
              </h2>
              <p className="asos-saved__price">{formatMoney(product.priceGbp, market.code)}</p>
              {product.brand && product.brand !== 'ASOS DESIGN' ? (
                <p className="asos-saved__ship">Sold and shipped by {product.brand}</p>
              ) : null}
              <p className="asos-saved__colour">{product.color}</p>
              <label>
                <span className="sr-only">Size for {product.title}</span>
                <select
                  value={size}
                  onChange={(event) =>
                    setSizes((current) => ({ ...current, [product.id]: event.target.value }))
                  }
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {sizeLabel(option, market.code)}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="asos-saved__move"
                disabled={!size}
                onClick={() => move(product, size)}
              >
                {moved === product.id ? 'IN THE BAG' : 'MOVE TO BAG'}
              </button>
            </article>
          );
        })}
        <AppCard />
      </div>
    </section>
  );
};

export default Default;
