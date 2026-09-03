'use client';

import { JSX, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { BROTHER_PRODUCTS, productsByCategory, type BrotherProduct } from 'lib/products-catalog';

type Props = Partial<ComponentProps> & {
  fields?: { Title?: { value?: string }; Category?: { value?: string } };
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
 * Category / devices grid of Brother products for browsing and search deep-links.
 */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const category = resolveCategory(router.asPath || '', props.fields?.Category?.value);
  const products = useMemo(
    () => (category === 'All' ? BROTHER_PRODUCTS : productsByCategory(category)),
    [category]
  );
  const title =
    props.fields?.Title?.value ||
    (category === 'All' ? 'All Brother devices' : `${category} products`);

  return (
    <section className="brother-listing">
      <div className="brother-container">
        <p className="brother-eyebrow">{category === 'All' ? 'Devices' : category}</p>
        <h1>{title}</h1>
        <p className="brother-listing__lead">
          {products.length} products — open any card or find them via <a href="/search">Search</a>.
        </p>
        <div className="brother-listing__grid">
          {products.map((p) => (
            <a className="brother-card" href={p.href} key={p.slug}>
              <img src={brotherImages[p.imageKey]} alt="" />
              <div className="brother-card__body">
                <p className="brother-eyebrow">{p.category}</p>
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Default;
