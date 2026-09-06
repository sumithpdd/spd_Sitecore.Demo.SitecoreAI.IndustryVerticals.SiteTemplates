'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import {
  Field,
  ImageField,
  Text,
  TextField,
  Image,
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
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';
import { fieldText, imageSrc, listItems, type CmsListItem } from 'lib/cms-fields';
import { ProductCard, type ProductCardModel } from 'lib/ProductCard';

type Fields = {
  Title?: Field<string> | TextField;
  Category?: Field<string> | TextField;
  Intro?: Field<string> | TextField;
  Image?: ImageField;
  ProductsList?: CmsListItem[] | Field<CmsListItem[]>;
};

type Props = Partial<ComponentProps> & { fields?: Fields };

type ListingCard = ProductCardModel & { key: string };

function resolveCategory(pathname: string, field?: string): BrotherProduct['category'] | 'All' {
  if (
    field === 'Labelling' ||
    field === 'Printers' ||
    field === 'Scanners' ||
    field === 'Supplies'
  ) {
    return field;
  }
  if (pathname.includes('labelling')) return 'Labelling';
  if (pathname.includes('printer')) return 'Printers';
  if (pathname.includes('scanner')) return 'Scanners';
  if (pathname.includes('supplies')) return 'Supplies';
  return 'All';
}

function enrichFromCatalog(item: CmsListItem): ListingCard {
  const catalog =
    findProductByPath(item.url || '') ||
    findProductBySlug((item.name || item.displayName || '').toLowerCase().replace(/\s+/g, '-'));
  const title = fieldText(
    item.fields?.Title as Field<string>,
    catalog?.title || item.displayName || item.name || 'Product'
  );
  const subtitle = fieldText(item.fields?.Subtitle as Field<string>, catalog?.subtitle || '');
  const category = fieldText(item.fields?.Category as Field<string>, catalog?.category || '');
  const sku = fieldText(item.fields?.SKU as Field<string>, catalog?.sku || '');
  const imageField = (item.fields?.Image || item.fields?.Image1) as ImageField | undefined;
  const fallback = catalog ? brotherImages[catalog.imageKey] : brotherImages.labellingTile;
  const metaParts = [catalog ? formatGbp(catalog.priceGbp) : '', sku || catalog?.sku || ''].filter(
    Boolean
  );

  return {
    key: item.id || item.url || title,
    href: item.url || catalog?.href || '#',
    title,
    subtitle,
    category,
    meta: metaParts.join(' · '),
    imageField,
    imageSrc: imageSrc(imageField, fallback),
    sku: sku || catalog?.sku || '',
    priceGbp: catalog?.priceGbp,
  };
}

function catalogCards(products: BrotherProduct[]): ListingCard[] {
  return products.map((p) => ({
    key: p.slug,
    href: p.href,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    meta: `${formatGbp(p.priceGbp)} · ${p.sku}`,
    imageSrc: brotherImages[p.imageKey],
    sku: p.sku,
    priceGbp: p.priceGbp,
  }));
}

/**
 * Category / devices grid — CMS ProductsList (ProductPages) when set; catalogue fallback.
 * Jack UTM personalises printers lead-in.
 */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const [intent, setIntent] = useState<BrotherIntent>('default');
  const f = props.fields || {};
  const categoryField = fieldText(f.Category);
  const category = resolveCategory(router.asPath || '', categoryField || undefined);

  const products = useMemo(() => {
    const cmsProducts = listItems(f.ProductsList);
    if (cmsProducts.length > 0) return cmsProducts.map(enrichFromCatalog);
    const list = category === 'All' ? BROTHER_PRODUCTS : productsByCategory(category);
    return catalogCards(list);
  }, [f.ProductsList, category]);

  useEffect(() => {
    setIntent(resolveBrotherIntent(router.query as Record<string, string | string[] | undefined>));
  }, [router.query]);

  const titleFallback = category === 'All' ? 'All Brother devices' : `${category} products`;
  const jackPrinters = intent === 'home-printer' && category === 'Printers';
  const suppliesStory = intent === 'supplies' || category === 'Supplies';
  const heroField = f.Image;
  const heroSrc = imageSrc(heroField);

  return (
    <section className="brother-listing">
      <div className="brother-container">
        {heroSrc || heroField?.value?.src || isEditing ? (
          <div className="brother-listing__hero" style={{ marginBottom: '1.5rem' }}>
            {heroField?.value?.src || isEditing ? (
              <Image field={heroField} />
            ) : heroSrc ? (
              <img src={heroSrc} alt="" />
            ) : null}
          </div>
        ) : null}
        {jackPrinters ? (
          <div className="brother-listing__personalize">
            <p className="brother-eyebrow">Personalised for Jack</p>
            <p>
              Cold SERP → personalised printers. Shortlist colour and mono lasers, then continue to{' '}
              <a href="/supplies?utm_campaign=supplies-reorder&persona=jack">OrderCloud supplies</a>
              .
            </p>
          </div>
        ) : null}
        {suppliesStory ? (
          <div className="brother-listing__personalize">
            <p className="brother-eyebrow">OrderCloud commerce</p>
            <p>
              Genuine supplies matched to Brother devices.{' '}
              <a href="/checkout/supplies?utm_campaign=ordercloud-checkout&persona=rick">
                Open demo cart &amp; checkout
              </a>
              .
            </p>
          </div>
        ) : null}
        <p className="brother-eyebrow">
          {categoryField || (category === 'All' ? 'Devices' : category)}
        </p>
        {f.Title?.value || isEditing ? (
          <Text field={f.Title as TextField} tag="h1" />
        ) : (
          <h1>{titleFallback}</h1>
        )}
        {f.Intro?.value || isEditing ? (
          <Text field={f.Intro as TextField} tag="p" className="brother-listing__lead" />
        ) : (
          <p className="brother-listing__lead">
            {products.length} products — open any card or find them via <a href="/search">Search</a>
            .
          </p>
        )}
        <div className="brother-listing__grid">
          {products.map(({ key, ...card }) => (
            <ProductCard key={key} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
