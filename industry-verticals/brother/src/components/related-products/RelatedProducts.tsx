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
import { findProductByPath } from 'lib/products-catalog';
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
  ProductsList?: CmsListItem[] | Field<CmsListItem[]>;
  ProductsLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

function normalisePath(path: string): string {
  const [pathname] = path.split('?');
  return pathname.replace(/\/+$/, '').toLowerCase();
}

/**
 * The single related-products strip for the site (PDPs, articles, hubs).
 * Products come from the rendering datasource Treelist, or the page's own
 * RelatedProducts field when no datasource is set. Card images use the
 * ProductPage DAM image, falling back to the catalogue image for that route.
 */
export const Default = (props: Props): JSX.Element | null => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const f = props.fields || {};
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    RelatedProducts?: CmsListItem[] | Field<CmsListItem[]>;
  };

  const fromDatasource = listItems(f.ProductsList);
  const currentPath = normalisePath(router.asPath || '');
  const products = (
    fromDatasource.length > 0 ? fromDatasource : listItems(routeFields.RelatedProducts)
  )
    .filter((item) => !item.url || normalisePath(item.url) !== currentPath)
    .slice(0, 4);

  if (!products.length && !isEditing) {
    return null;
  }

  return (
    <section className="brother-listing" style={{ paddingTop: '1rem', paddingBottom: '2.5rem' }}>
      <div className="brother-container">
        {f.Title?.value || isEditing ? (
          <Text field={f.Title} tag="h2" />
        ) : (
          <h2 style={{ color: 'var(--brother-blue)' }}>Related products</h2>
        )}
        <div className="brother-listing__grid" style={{ marginTop: '1rem' }}>
          {products.map((item, idx) => {
            const catalog = findProductByPath(item.url || '');
            const title = fieldText(
              item.fields?.Title as Field<string>,
              catalog?.title || item.displayName || item.name || 'Product'
            );
            const subtitle = fieldText(
              item.fields?.Subtitle as Field<string>,
              catalog?.subtitle || ''
            );
            const img = imageSrc(
              (item.fields?.Image || item.fields?.Image1) as ImageField,
              catalog ? brotherImages[catalog.imageKey] : brotherImages.vc500w
            );
            return (
              <a className="brother-card" href={item.url || '#'} key={item.id || idx}>
                <img src={img} alt="" />
                <div className="brother-card__body">
                  <h3>{title}</h3>
                  {subtitle ? <p>{subtitle}</p> : null}
                </div>
              </a>
            );
          })}
        </div>
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
        ) : null}
      </div>
    </section>
  );
};

export default Default;
