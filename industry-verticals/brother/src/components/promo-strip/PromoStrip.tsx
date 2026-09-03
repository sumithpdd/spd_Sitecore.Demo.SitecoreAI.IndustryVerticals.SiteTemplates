import { JSX } from 'react';
import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

type Fields = {
  Title?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function imgSrc(field?: ImageField, fallback?: string): string {
  return (field?.value as { src?: string } | undefined)?.src || fallback || '';
}

export const Default = (props: Props): JSX.Element => {
  const f = props.fields || {};
  return (
    <section className="brother-promo">
      <div className="brother-promo__copy">
        <div className="brother-container" style={{ width: '100%' }}>
          <p className="brother-eyebrow" style={{ color: '#ffb4b8' }}>
            Echo labelling
          </p>
          <h2>{f.Title?.value || 'Organise your desk with full-colour labels'}</h2>
          <p>
            {f.Description?.value ||
              'From cable tags to shelf signs — the VC-500W makes home-office organisation simple.'}
          </p>
          <div className="brother-hero__ctas" style={{ marginTop: '1.25rem' }}>
            <a
              className="brother-btn brother-btn-primary"
              href="/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office"
            >
              Read the article
            </a>
            <a
              className="brother-btn brother-btn-secondary"
              href="/devices/label-printer/vc/vc500w"
            >
              Shop VC-500W
            </a>
          </div>
        </div>
      </div>
      <div className="brother-promo__media">
        <img src={imgSrc(f.Image, brotherImages.vc500wLaptop)} alt="" />
      </div>
    </section>
  );
};

export default Default;
