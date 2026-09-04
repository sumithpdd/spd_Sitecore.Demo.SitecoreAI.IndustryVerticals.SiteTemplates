'use client';

import { JSX } from 'react';
import { Field, LinkField, Text, Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import {
  BROTHER_PRODUCTS,
  findProductByPath,
  productsByCategory,
  formatGbp,
  type BrotherProduct,
} from 'lib/products-catalog';
import { categoriesForPath } from 'lib/categories-catalog';
import {
  fieldText,
  imageSrc,
  linkHref,
  linkText,
  listItems,
  type CmsListItem,
} from 'lib/cms-fields';

type Fields = {
  Title?: Field<string>;
  ProductsLink?: LinkField;
  ProductsList?: CmsListItem[] | Field<CmsListItem[]>;
};

type Props = ComponentProps & { fields?: Fields };

function productsNearRoute(pathname: string): BrotherProduct[] {
  const product = findProductByPath(pathname);
  if (product) {
    return BROTHER_PRODUCTS.filter(
      (p) => p.category === product.category && p.slug !== product.slug
    ).slice(0, 4);
  }
  if (pathname.includes('office-labelling') || pathname.includes('labelling')) {
    return productsByCategory('Labelling').slice(0, 4);
  }
  if (pathname.includes('supplies')) return productsByCategory('Supplies').slice(0, 4);
  if (pathname.includes('printer') || pathname.includes('mps')) {
    return productsByCategory('Printers').slice(0, 4);
  }
  // Featured from category cards → product slugs when possible
  const cats = categoriesForPath(pathname);
  const fromCats = cats
    .map((c) => BROTHER_PRODUCTS.find((p) => c.href.includes(p.slug) || p.href.includes(c.id)))
    .filter((p): p is BrotherProduct => Boolean(p));
  return (fromCats.length ? fromCats : BROTHER_PRODUCTS).slice(0, 4);
}

/** Curated product strip — Treelist when set, else route-aware catalogue. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const cmsItems = listItems(f.ProductsList);
  const title = fieldText(f.Title, 'Selected products');
  const viewAllHref = linkHref(f.ProductsLink, '/devices');
  const viewAllLabel = linkText(f.ProductsLink, 'View all devices');

  const products =
    cmsItems.length > 0
      ? cmsItems.slice(0, 4).map((item) => ({
          href: item.url || '#',
          title: fieldText(item.fields?.Title as Field<string>, item.displayName || ''),
          subtitle: fieldText(item.fields?.Subtitle as Field<string>),
          image: imageSrc(item.fields?.Image as never, brotherImages.labellingTile),
          meta: '',
        }))
      : productsNearRoute(router.asPath || '').map((p) => ({
          href: p.href,
          title: p.title,
          subtitle: p.subtitle,
          image: brotherImages[p.imageKey],
          meta: `${formatGbp(p.priceGbp)} · ${p.sku}`,
        }));

  if (!products.length && !isEditing) return <></>;

  return (
    <section className="brother-selected-products">
      <div className="brother-container">
        <div className="brother-selected-products__head">
          {f.Title?.value || isEditing ? <Text field={f.Title} tag="h2" /> : <h2>{title}</h2>}
          {f.ProductsLink && (f.ProductsLink.value?.href || isEditing) ? (
            <Link field={f.ProductsLink} className="brother-btn brother-btn-outline" />
          ) : (
            <a className="brother-btn brother-btn-outline" href={viewAllHref}>
              {viewAllLabel}
            </a>
          )}
        </div>
        <div className="brother-listing__grid">
          {products.map((p) => (
            <a className="brother-card" href={p.href} key={p.href + p.title}>
              <img src={p.image} alt="" />
              <div className="brother-card__body">
                <h3>{p.title}</h3>
                {p.subtitle ? <p>{p.subtitle}</p> : null}
                {p.meta ? <p className="brother-card__meta">{p.meta}</p> : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
