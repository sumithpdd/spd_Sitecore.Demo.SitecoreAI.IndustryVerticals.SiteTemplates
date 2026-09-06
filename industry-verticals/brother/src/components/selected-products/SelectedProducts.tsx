'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import {
  BROTHER_PRODUCTS,
  findProductByPath,
  findProductBySlug,
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
import { ProductCard } from 'lib/ProductCard';

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

/** Treelist entry → card, taking image/title from the ProductPage and price/SKU from the catalogue. */
function cardFromCmsItem(item: CmsListItem) {
  const catalog =
    findProductByPath(item.url || '') ||
    findProductBySlug((item.name || item.displayName || '').toLowerCase().replace(/\s+/g, '-'));
  const imageField = (item.fields?.Image || item.fields?.Image1) as ImageField | undefined;
  const sku = fieldText(item.fields?.SKU as Field<string>, catalog?.sku || '');
  const meta = [catalog ? formatGbp(catalog.priceGbp) : '', sku].filter(Boolean).join(' · ');

  return {
    href: item.url || catalog?.href || '#',
    title: fieldText(
      item.fields?.Title as Field<string>,
      catalog?.title || item.displayName || item.name || 'Product'
    ),
    subtitle: fieldText(item.fields?.Subtitle as Field<string>, catalog?.subtitle || ''),
    image: imageSrc(
      imageField,
      catalog ? brotherImages[catalog.imageKey] : brotherImages.labellingTile
    ),
    meta,
    sku: sku || catalog?.sku || '',
    priceGbp: catalog?.priceGbp,
  };
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
      ? cmsItems.slice(0, 4).map(cardFromCmsItem)
      : productsNearRoute(router.asPath || '').map((p) => ({
          href: p.href,
          title: p.title,
          subtitle: p.subtitle,
          image: brotherImages[p.imageKey],
          meta: `${formatGbp(p.priceGbp)} · ${p.sku}`,
          sku: p.sku,
          priceGbp: p.priceGbp,
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
            <ProductCard
              key={p.href + p.title}
              href={p.href}
              title={p.title}
              subtitle={p.subtitle}
              meta={p.meta}
              imageSrc={p.image}
              sku={p.sku}
              priceGbp={p.priceGbp}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
