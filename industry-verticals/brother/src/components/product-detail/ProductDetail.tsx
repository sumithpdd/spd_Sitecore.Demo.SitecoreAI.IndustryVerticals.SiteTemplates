'use client';

import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  RichText,
  Image,
  Link,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import {
  findProductByPath,
  BROTHER_PRODUCTS,
  formatGbp,
  type BrotherProductSpecGroup,
} from 'lib/products-catalog';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';
import { AddToCartButton } from 'lib/AddToCartButton';

type Fields = {
  Title?: Field<string>;
  Subtitle?: Field<string>;
  Description?: RichTextField | Field<string>;
  Image?: ImageField;
  Image2?: ImageField;
  Image3?: ImageField;
  Category?: Field<string>;
  SKU?: Field<string>;
  FeatureOne?: Field<string>;
  FeatureTwo?: Field<string>;
  FeatureThree?: Field<string>;
  FeatureFour?: Field<string>;
  Specifications?: RichTextField | Field<string>;
  PrimaryCta?: LinkField;
  SecondaryCta?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

function SpecFallback({ groups }: { groups: BrotherProductSpecGroup[] }): JSX.Element {
  return (
    <div className="brother-specs__fallback">
      {groups.map((g) => (
        <div key={g.group} className="brother-specs__group">
          <h3>{g.group}</h3>
          <table className="brother-specs__table">
            <tbody>
              {g.rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const f: Fields = { ...routeFields, ...(props.fields || {}) };

  const catalog = findProductByPath(router.asPath || '') || BROTHER_PRODUCTS[0];

  const title = fieldText(f.Title, catalog.title);
  const subtitle = fieldText(f.Subtitle, catalog.subtitle);
  const description = fieldText(f.Description as Field<string>, catalog.description);
  const category = fieldText(f.Category, catalog.category);
  const sku = fieldText(f.SKU, catalog.sku);
  const priceLabel = formatGbp(catalog.priceGbp);
  const featureFields = [f.FeatureOne, f.FeatureTwo, f.FeatureThree, f.FeatureFour];
  const features = featureFields
    .map((field, i) => ({ field, text: fieldText(field, catalog.features[i] || '') }))
    .filter((x) => x.text || (isEditing && x.field));

  const primaryImage = imageSrc(f.Image, brotherImages[catalog.imageKey]);
  const gallery = [f.Image, f.Image2, f.Image3]
    .map((img, i) => ({
      field: img,
      src: imageSrc(img, i === 0 ? primaryImage : ''),
    }))
    .filter((g) => g.src || (isEditing && g.field));

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

  const primaryHref = linkHref(f.PrimaryCta, '/supplies');
  const primaryLabel = linkText(f.PrimaryCta, 'Order supplies');
  const secondaryHref = linkHref(f.SecondaryCta, '/labelling-and-receipts/vc-500w');
  const secondaryLabel = linkText(f.SecondaryCta, 'Explore VC-500W story');
  const hasCmsSpecs = Boolean(f.Specifications?.value) || isEditing;
  const specGroups = catalog.specifications || [];

  return (
    <section className="brother-product">
      <div className="brother-container brother-product__grid">
        <div className="brother-product__media">
          {gallery.length > 0 ? (
            gallery.map((g, idx) =>
              g.field?.value?.src || (isEditing && g.field) ? (
                <Image key={idx} field={g.field} />
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
          <p className="brother-product__commerce">
            <span className="brother-product__price">{priceLabel}</span>
            {f.SKU?.value || isEditing ? (
              <span className="brother-product__sku">
                SKU <Text field={f.SKU} />
              </span>
            ) : (
              <span className="brother-product__sku">SKU {sku}</span>
            )}
            {catalog.badge ? <span className="brother-product__badge">{catalog.badge}</span> : null}
          </p>
          {f.Description?.value || isEditing ? (
            <RichText field={f.Description as RichTextField} />
          ) : (
            <p>{description}</p>
          )}
          {(features.length > 0 || isEditing) && (
            <div className="brother-product__details">
              <h2>Product details</h2>
              <ul className="brother-features">
                {features.map((item, idx) => (
                  <li key={idx}>
                    {item.field?.value || isEditing ? <Text field={item.field} /> : item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="brother-hero__ctas">
            <AddToCartButton
              sku={sku}
              title={title}
              priceGbp={catalog.priceGbp}
              href={catalog.href}
            />
            {f.PrimaryCta && (f.PrimaryCta.value?.href || isEditing) ? (
              <Link field={f.PrimaryCta} className="brother-btn brother-btn-outline" />
            ) : (
              <a className="brother-btn brother-btn-outline" href={primaryHref}>
                {primaryLabel}
              </a>
            )}
            {f.SecondaryCta && (f.SecondaryCta.value?.href || isEditing) ? (
              <Link field={f.SecondaryCta} className="brother-btn brother-btn-outline" />
            ) : (
              <a className="brother-btn brother-btn-outline" href={secondaryHref}>
                {secondaryLabel}
              </a>
            )}
            <a className="brother-btn brother-btn-outline" href={browseHref}>
              Browse {category}
            </a>
          </div>
        </div>
      </div>

      {(hasCmsSpecs || specGroups.length > 0) && (
        <div className="brother-container brother-specs">
          <h2>Specifications</h2>
          {hasCmsSpecs ? (
            <RichText field={f.Specifications as RichTextField} />
          ) : (
            <SpecFallback groups={specGroups} />
          )}
        </div>
      )}
    </section>
  );
};

export default Default;
