import { JSX } from 'react';
import { Field, ImageField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Lead?: Field<string>;
  Body?: Field<string>;
  HeroImage?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function imgSrc(field?: ImageField, fallback?: string): string {
  return (field?.value as { src?: string } | undefined)?.src || fallback || '';
}

export const Default = (props: Props): JSX.Element => {
  const f = props.fields || {};
  const title = f.Title?.value || '5 great ideas for organising your desk and home office';
  const lead =
    f.Lead?.value ||
    'A tidy desk starts with clear labels — colour-code cables, drawers and storage with the VC-500W.';
  const bodyHtml =
    f.Body?.value ||
    `<p>Working from home means your desk has to work harder. Clear labelling helps you find what you need, reduce clutter, and keep cables under control.</p>
<p><strong>1. Colour-code drawers</strong> — use 12–19mm labels for folders and trays.</p>
<p><strong>2. Mark cable ends</strong> — 9mm labels stop the “which charger?” hunt.</p>
<p><strong>3. Shelf signage</strong> — 25–50mm labels make storage obvious at a glance.</p>
<p><strong>4. Visitor and desk badges</strong> — print names in full colour for hybrid days.</p>
<p><strong>5. Project boxes</strong> — label archives so Clearing (and everyday life) stays calm.</p>
<p>Ready to try it? Explore the <a href="/labelling-and-receipts/vc-500w">VC-500W</a> or <a href="/devices/label-printer/vc/vc500w">buy in the Brother store</a>.</p>`;

  return (
    <article className="brother-article">
      <div className="brother-container">
        <div className="brother-article__hero">
          <img src={imgSrc(f.HeroImage, brotherImages.articleHero)} alt="" />
        </div>
        <p className="brother-eyebrow">{f.Eyebrow?.value || 'Brother for home · Blog'}</p>
        <h1>{title}</h1>
        <p className="brother-article__lead">{lead}</p>
        <div className="brother-article__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        <div style={{ marginTop: '1.75rem' }}>
          <a className="brother-btn brother-btn-primary" href="/labelling-and-receipts/vc-500w">
            See the VC-500W
          </a>
        </div>
      </div>
    </article>
  );
};

export default Default;
