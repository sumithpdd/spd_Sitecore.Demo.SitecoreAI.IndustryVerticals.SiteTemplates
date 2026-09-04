'use client';

import { JSX } from 'react';
import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { findProductByPath, BROTHER_PRODUCTS } from 'lib/products-catalog';

type Fields = {
  Title?: Field<string>;
  Subtitle?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
  FeatureOne?: Field<string>;
  FeatureTwo?: Field<string>;
  FeatureThree?: Field<string>;
  FeatureFour?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

function imgSrc(field?: ImageField, fallback?: string): string {
  return (field?.value as { src?: string } | undefined)?.src || fallback || '';
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const catalog = findProductByPath(router.asPath || '') || BROTHER_PRODUCTS[0];
  const f = props.fields || {};

  const title = f.Title?.value || catalog.title;
  const subtitle = f.Subtitle?.value || catalog.subtitle;
  const description = f.Description?.value || catalog.description;
  const features = [
    f.FeatureOne?.value || catalog.features[0],
    f.FeatureTwo?.value || catalog.features[1],
    f.FeatureThree?.value || catalog.features[2],
    f.FeatureFour?.value || catalog.features[3],
  ];
  const image = imgSrc(f.Image, brotherImages[catalog.imageKey]);
  const related = BROTHER_PRODUCTS.filter(
    (p) => p.category === catalog.category && p.slug !== catalog.slug
  ).slice(0, 3);

  return (
    <section className="brother-product">
      <div className="brother-container brother-product__grid">
        <div className="brother-product__media">
          <img src={image} alt={title} />
        </div>
        <div>
          <p className="brother-eyebrow">{catalog.category}</p>
          <h1>{title}</h1>
          <p className="brother-product__subtitle">{subtitle}</p>
          <p>{description}</p>
          <ul className="brother-features">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="brother-hero__ctas">
            <a className="brother-btn brother-btn-primary" href="/checkout/supplies?utm_campaign=ordercloud-checkout">
              Add toner · OrderCloud checkout
            </a>
            <a
              className="brother-btn brother-btn-outline"
              href={`/${catalog.category === 'Labelling' ? 'labelling-and-receipts' : catalog.category === 'Printers' ? 'printers' : catalog.category === 'Scanners' ? 'scanners' : catalog.category === 'Supplies' ? 'supplies' : 'devices'}`}
            >
              Browse {catalog.category}
            </a>
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
            {related.map((p) => (
              <a className="brother-card" href={p.href} key={p.slug}>
                <img src={brotherImages[p.imageKey]} alt="" />
                <div className="brother-card__body">
                  <h3>{p.title}</h3>
                  <p>{p.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Default;
