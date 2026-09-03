import { JSX } from 'react';
import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

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
  const f = props.fields || {};
  const title = f.Title?.value || 'VC-500W full colour label printer';
  const subtitle = f.Subtitle?.value || 'Bring labels to life with ZINK Zero Ink technology';
  const description =
    f.Description?.value ||
    'Print crisp full colour labels from your computer, smartphone or tablet. Compact, quiet, and ink-free — special colour crystals are embedded in the label roll.';
  const features = [
    f.FeatureOne?.value || 'No ink cartridges — ZINK Zero Ink colour crystals in the roll',
    f.FeatureTwo?.value || 'Print from PC, Mac, smartphone or tablet (USB + Wi‑Fi)',
    f.FeatureThree?.value || 'Five continuous widths: 9, 12, 19, 25 and 50mm',
    f.FeatureFour?.value || 'Built-in cutter for clean, professional finishes up to 420mm',
  ];

  return (
    <section className="brother-product">
      <div className="brother-container brother-product__grid">
        <div className="brother-product__media">
          <img src={imgSrc(f.Image, brotherImages.vc500w)} alt={title} />
        </div>
        <div>
          <p className="brother-eyebrow">Labelling & receipts</p>
          <h1>{title}</h1>
          <p className="brother-product__subtitle">{subtitle}</p>
          <p>{description}</p>
          <ul className="brother-features">
            {features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="brother-hero__ctas">
            <a className="brother-btn brother-btn-primary" href="/devices/label-printer/vc/vc500w">
              View in store
            </a>
            <a
              className="brother-btn brother-btn-outline"
              href="/labelling-and-receipts/vc-500w/vc-500w-vertical-applications"
            >
              Vertical applications
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;
