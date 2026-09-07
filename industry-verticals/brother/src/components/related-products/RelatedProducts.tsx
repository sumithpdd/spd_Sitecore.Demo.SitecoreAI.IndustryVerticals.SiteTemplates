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
  findProductByPath,
  findProductBySlug,
  relatedProductsFor,
  type BrotherProduct,
} from 'lib/products-catalog';
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
  ProductsList?: CmsListItem[] | Field<CmsListItem[]>;
  ProductsLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

function normalisePath(path: string): string {
  const [pathname] = path.split('?');
  return pathname.replace(/\/+$/, '').toLowerCase();
}

function catalogItem(product: BrotherProduct): CmsListItem {
  return {
    id: product.slug,
    url: product.href,
    name: product.slug,
    displayName: product.title,
    fields: {
      Title: { value: product.title },
      Subtitle: { value: product.subtitle },
      Category: { value: product.category },
    },
  };
}

function resolveCatalog(item: CmsListItem): BrotherProduct | undefined {
  return (
    findProductByPath(item.url || '') ||
    findProductBySlug((item.name || '').toLowerCase()) ||
    findProductBySlug((item.displayName || '').toLowerCase().replace(/\s+/g, '-'))
  );
}

function isSupply(item: CmsListItem): boolean {
  const catalog = resolveCatalog(item);
  const category = fieldText(item.fields?.Category as Field<string>, catalog?.category || '');
  return category === 'Supplies' || (item.url || '').toLowerCase().includes('/supplies/');
}

function catalogFallback(pathname: string): CmsListItem[] {
  const product = findProductByPath(pathname);
  if (!product) return [];
  return relatedProductsFor(product, 4).map(catalogItem);
}

/**
 * The single related-products strip for the site (PDPs, articles, hubs).
 * Products come from the rendering datasource Treelist, the page's own
 * RelatedProducts field, or the catalogue relatedSlugs for this route.
 * Supplies are shown in their own "Compatible supplies" row.
 */
export const Default = (props: Props): JSX.Element | null => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const f = props.fields || {};
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    RelatedProducts?: CmsListItem[] | Field<CmsListItem[]>;
  };

  const currentPath = normalisePath(router.asPath || '');
  const notCurrent = (item: CmsListItem) => !item.url || normalisePath(item.url) !== currentPath;
  const fromPage = listItems(routeFields.RelatedProducts).filter(notCurrent);
  const fromDatasource = listItems(f.ProductsList).filter(notCurrent);
  const products = (
    fromPage.length > 0
      ? fromPage
      : fromDatasource.length > 0
        ? fromDatasource
        : catalogFallback(currentPath)
  ).slice(0, 6);

  if (!products.length && !isEditing) {
    return null;
  }

  const supplies = products.filter(isSupply);
  const related = products.filter((item) => !isSupply(item));

  const renderCards = (items: CmsListItem[]) => (
    <div className="brother-listing__grid" style={{ marginTop: '1rem' }}>
      {items.map((item, idx) => {
        const catalog = resolveCatalog(item);
        const title = fieldText(
          item.fields?.Title as Field<string>,
          catalog?.title || item.displayName || item.name || 'Product'
        );
        const subtitle = fieldText(item.fields?.Subtitle as Field<string>, catalog?.subtitle || '');
        const category = fieldText(item.fields?.Category as Field<string>, catalog?.category || '');
        const img = imageSrc(
          (item.fields?.Image || item.fields?.Image1) as ImageField,
          catalog ? brotherImages[catalog.imageKey] : brotherImages.vc500w
        );
        return (
          <ProductCard
            key={item.id || idx}
            href={item.url || catalog?.href || '#'}
            title={title}
            subtitle={subtitle}
            category={category}
            imageSrc={img}
            imageField={(item.fields?.Image || item.fields?.Image1) as ImageField}
            sku={catalog?.sku}
            priceGbp={catalog?.priceGbp}
          />
        );
      })}
    </div>
  );

  return (
    <section className="brother-listing" style={{ paddingTop: '1rem', paddingBottom: '2.5rem' }}>
      <div className="brother-container">
        {supplies.length > 0 ? (
          <>
            <h2 style={{ color: 'var(--brother-blue)' }}>Compatible supplies</h2>
            {renderCards(supplies)}
            <div style={{ marginTop: '1.25rem' }}>
              <a className="brother-btn brother-btn-outline" href="/supplies">
                View all supplies
              </a>
            </div>
          </>
        ) : null}

        {related.length > 0 || isEditing ? (
          <div style={supplies.length ? { marginTop: '2.5rem' } : undefined}>
            {f.Title?.value || isEditing ? (
              <Text field={f.Title} tag="h2" />
            ) : (
              <h2 style={{ color: 'var(--brother-blue)' }}>Related products</h2>
            )}
            {renderCards(related)}
            {f.ProductsLink && (f.ProductsLink.value?.href || isEditing) ? (
              <div style={{ marginTop: '1.25rem' }}>
                <Link field={f.ProductsLink} className="brother-btn brother-btn-outline" />
              </div>
            ) : linkHref(f.ProductsLink) ? (
              <div style={{ marginTop: '1.25rem' }}>
                <a className="brother-btn brother-btn-outline" href={linkHref(f.ProductsLink)}>
                  {linkText(f.ProductsLink, 'View all')}
                </a>
              </div>
            ) : (
              <div style={{ marginTop: '1.25rem' }}>
                <a className="brother-btn brother-btn-outline" href="/devices">
                  View all devices
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
