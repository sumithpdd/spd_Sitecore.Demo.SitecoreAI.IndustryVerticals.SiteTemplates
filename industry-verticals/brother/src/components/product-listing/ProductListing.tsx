'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { ImageField, Image } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import {
  BROTHER_PRODUCTS,
  productsByCategory,
  formatGbp,
  type BrotherProduct,
} from 'lib/products-catalog';
import { resolveBrotherIntent, type BrotherIntent } from 'lib/brother-intent';
import { imageSrc } from 'lib/cms-fields';

type Props = Partial<ComponentProps> & {
  fields?: {
    Title?: { value?: string };
    Category?: { value?: string };
    Intro?: { value?: string };
    Image?: ImageField;
  };
};

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

/**
 * Category / devices grid — Jack UTM personalises printers lead-in.
 */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const [intent, setIntent] = useState<BrotherIntent>('default');
  const category = resolveCategory(router.asPath || '', props.fields?.Category?.value);
  const products = useMemo(
    () => (category === 'All' ? BROTHER_PRODUCTS : productsByCategory(category)),
    [category]
  );

  useEffect(() => {
    setIntent(resolveBrotherIntent(router.query as Record<string, string | string[] | undefined>));
  }, [router.query]);

  const title =
    props.fields?.Title?.value ||
    (category === 'All' ? 'All Brother devices' : `${category} products`);

  const jackPrinters = intent === 'home-printer' && category === 'Printers';
  const suppliesStory = intent === 'supplies' || category === 'Supplies';
  const heroField = props.fields?.Image;
  const heroSrc = imageSrc(heroField);

  return (
    <section className="brother-listing">
      <div className="brother-container">
        {heroSrc || heroField?.value?.src ? (
          <div className="brother-listing__hero" style={{ marginBottom: '1.5rem' }}>
            {heroField?.value?.src ? <Image field={heroField} /> : <img src={heroSrc} alt="" />}
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
        <p className="brother-eyebrow">{category === 'All' ? 'Devices' : category}</p>
        <h1>{title}</h1>
        {props.fields?.Intro?.value ? (
          <p className="brother-listing__lead">{props.fields.Intro.value}</p>
        ) : (
          <p className="brother-listing__lead">
            {products.length} products — open any card or find them via <a href="/search">Search</a>
            .
          </p>
        )}
        <div className="brother-listing__grid">
          {products.map((p) => (
            <a className="brother-card" href={p.href} key={p.slug}>
              <img src={brotherImages[p.imageKey]} alt="" />
              <div className="brother-card__body">
                <p className="brother-eyebrow">{p.category}</p>
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <p className="brother-card__meta">
                  {formatGbp(p.priceGbp)} · {p.sku}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
