'use client';

import { JSX } from 'react';
import { Image, ImageField } from '@sitecore-content-sdk/nextjs';
import { AddToCartButton } from 'lib/AddToCartButton';
import { findProductByPath, formatGbp } from 'lib/products-catalog';

export type ProductCardModel = {
  href: string;
  title: string;
  subtitle?: string;
  category?: string;
  meta?: string;
  imageSrc: string;
  imageField?: ImageField;
  sku?: string;
  priceGbp?: number;
};

export function ProductCard(p: ProductCardModel): JSX.Element {
  const catalog = findProductByPath(p.href);
  const sku = p.sku || catalog?.sku || '';
  const priceGbp = p.priceGbp ?? catalog?.priceGbp ?? 0;
  const meta = p.meta || [priceGbp ? formatGbp(priceGbp) : '', sku].filter(Boolean).join(' · ');

  return (
    <article className="brother-card">
      <a className="brother-card__link" href={p.href}>
        {p.imageField?.value?.src ? (
          <Image field={p.imageField} />
        ) : (
          <img src={p.imageSrc} alt="" />
        )}
        <div className="brother-card__body">
          {p.category ? <p className="brother-eyebrow">{p.category}</p> : null}
          <h3>{p.title}</h3>
          {p.subtitle ? <p>{p.subtitle}</p> : null}
          {meta ? <p className="brother-card__meta">{meta}</p> : null}
        </div>
      </a>
      {sku ? (
        <div className="brother-card__actions">
          <AddToCartButton sku={sku} title={p.title} priceGbp={priceGbp} href={p.href} compact />
        </div>
      ) : null}
    </article>
  );
}
