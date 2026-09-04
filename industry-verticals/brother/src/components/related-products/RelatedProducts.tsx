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
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
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

/**
 * CMS-driven related products strip (Treelist of ProductPage items).
 * Falls back to empty when no datasource is set — PDP also embeds related via ProductDetail.
 */
export const Default = (props: Props): JSX.Element | null => {
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const f = props.fields || {};
  const products = listItems(f.ProductsList);

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
            const title = fieldText(
              item.fields?.Title as Field<string>,
              item.displayName || item.name || 'Product'
            );
            const subtitle = fieldText(item.fields?.Subtitle as Field<string>);
            const img = imageSrc(
              (item.fields?.Image || item.fields?.Image1) as ImageField,
              brotherImages.vc500w
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
