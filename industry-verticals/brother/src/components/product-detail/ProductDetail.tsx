'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
  RichText,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { findProductByPath, BROTHER_PRODUCTS } from 'lib/products-catalog';
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
  Subtitle?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  Image2?: ImageField;
  Image3?: ImageField;
  Category?: Field<string>;
  SKU?: Field<string>;
  FeatureOne?: Field<string>;
  FeatureTwo?: Field<string>;
  FeatureThree?: Field<string>;
  FeatureFour?: Field<string>;
  PrimaryCta?: LinkField;
  SecondaryCta?: LinkField;
  RelatedProducts?: CmsListItem[] | Field<CmsListItem[]>;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = page?.mode?.isEditing;
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const f: Fields = { ...routeFields, ...(props.fields || {}) };

  const catalog = findProductByPath(router.asPath || '') || BROTHER_PRODUCTS[0];

  const title = fieldText(f.Title, catalog.title);
  const subtitle = fieldText(f.Subtitle, catalog.subtitle);
  const description = fieldText(f.Description, catalog.description);
  const category = fieldText(f.Category, catalog.category);
  const features = [
    fieldText(f.FeatureOne, catalog.features[0]),
    fieldText(f.FeatureTwo, catalog.features[1]),
    fieldText(f.FeatureThree, catalog.features[2]),
    fieldText(f.FeatureFour, catalog.features[3]),
  ].filter(Boolean);

  const primaryImage = imageSrc(f.Image, brotherImages[catalog.imageKey]);
  const gallery = [f.Image, f.Image2, f.Image3]
    .map((img, i) => ({
      field: img,
      src: imageSrc(img, i === 0 ? primaryImage : ''),
    }))
    .filter((g) => g.src || (isEditing && g.field));

  const cmsRelated = listItems(f.RelatedProducts);
  const related =
    cmsRelated.length > 0
      ? cmsRelated.slice(0, 3)
      : BROTHER_PRODUCTS.filter((p) => p.category === catalog.category && p.slug !== catalog.slug)
          .slice(0, 3)
          .map(
            (p) =>
              ({
                url: p.href,
                displayName: p.title,
                fields: {
                  Title: { value: p.title },
                  Subtitle: { value: p.subtitle },
                  Image: { value: { src: brotherImages[p.imageKey] } },
                },
              }) as CmsListItem
          );

  const browseHref =
    category === 'Labelling'
      ? '/labelling-and-receipts'
      : category === 'Printers'
        ? '/printers'
        : category === 'Scanners'
          ? '/scanners'
          : category === 'Supplies'
            ? '/supplies'
            : '/devices';

  const primaryHref = linkHref(f.PrimaryCta, '/checkout/supplies?utm_campaign=ordercloud-checkout');
  const primaryLabel = linkText(f.PrimaryCta, 'Add toner · OrderCloud checkout');
  const secondaryHref = linkHref(f.SecondaryCta, browseHref);
  const secondaryLabel = linkText(f.SecondaryCta, `Browse ${category}`);

  return (
    <section className="brother-product">
      <div className="brother-container brother-product__grid">
        <div className="brother-product__media">
          {gallery.length > 0 ? (
            gallery.map((g, idx) =>
              g.field?.value ? (
                <Image key={idx} field={g.field} editable={isEditing} />
              ) : (
                <img key={idx} src={g.src} alt={title} />
              )
            )
          ) : (
            <img src={primaryImage} alt={title} />
          )}
        </div>
        <div>
          <p className="brother-eyebrow">{category}</p>
          {f.Title?.value || isEditing ? <Text field={f.Title} tag="h1" /> : <h1>{title}</h1>}
          {f.Subtitle?.value || isEditing ? (
            <Text field={f.Subtitle} tag="p" className="brother-product__subtitle" />
          ) : (
            <p className="brother-product__subtitle">{subtitle}</p>
          )}
          {f.Description?.value || isEditing ? (
            <RichText field={f.Description} />
          ) : (
            <p>{description}</p>
          )}
          <ul className="brother-features">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="brother-hero__ctas">
            {f.PrimaryCta?.value?.href || isEditing ? (
              <Link field={f.PrimaryCta} className="brother-btn brother-btn-primary" />
            ) : (
              <a className="brother-btn brother-btn-primary" href={primaryHref}>
                {primaryLabel}
              </a>
            )}
            {f.SecondaryCta?.value?.href || isEditing ? (
              <Link field={f.SecondaryCta} className="brother-btn brother-btn-outline" />
            ) : (
              <a className="brother-btn brother-btn-outline" href={secondaryHref}>
                {secondaryLabel}
              </a>
            )}
            <a className="brother-btn brother-btn-outline" href="/search?scope=products&q=label">
              Search similar
            </a>
          </div>
        </div>
      </div>
      {related.length > 0 ? (
        <div className="brother-container" style={{ marginTop: '2.5rem' }}>
          <h2 style={{ color: 'var(--brother-blue)', marginBottom: '1rem' }}>Related products</h2>
          <div className="brother-listing__grid">
            {related.map((item, idx) => {
              const itemTitle = fieldText(
                item.fields?.Title as Field<string>,
                item.displayName || item.name || ''
              );
              const itemSub = fieldText(item.fields?.Subtitle as Field<string>);
              const itemImg = imageSrc(item.fields?.Image as ImageField);
              const href = item.url || '#';
              return (
                <a className="brother-card" href={href} key={item.id || href || idx}>
                  {itemImg ? <img src={itemImg} alt="" /> : null}
                  <div className="brother-card__body">
                    <h3>{itemTitle}</h3>
                    {itemSub ? <p>{itemSub}</p> : null}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Default;
