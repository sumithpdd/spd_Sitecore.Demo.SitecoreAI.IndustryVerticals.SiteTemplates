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
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Lead?: Field<string>;
  Body?: Field<string>;
  HeroImage?: ImageField;
  CtaLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

const DEFAULT_BODY = `<p>Working from home means your desk has to work harder. Clear labelling helps you find what you need, reduce clutter, and keep cables under control.</p>
<p><strong>1. Colour-code drawers</strong> — use 12–19mm labels for folders and trays.</p>
<p><strong>2. Mark cable ends</strong> — 9mm labels stop the “which charger?” hunt.</p>
<p><strong>3. Shelf signage</strong> — 25–50mm labels make storage obvious at a glance.</p>
<p><strong>4. Visitor and desk badges</strong> — print names in full colour for hybrid days.</p>
<p><strong>5. Project boxes</strong> — label archives so everyday life stays calm.</p>
<p>Ready to try it? Explore the <a href="/labelling-and-receipts/vc-500w">VC-500W</a>.</p>`;

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const merged: Fields = { ...routeFields, ...f };

  const title = fieldText(merged.Title, '5 great ideas for organising your desk and home office');
  const lead = fieldText(
    merged.Lead,
    'A tidy desk starts with clear labels — colour-code cables, drawers and storage with the VC-500W.'
  );
  const bodyHtml = fieldText(merged.Body, DEFAULT_BODY);
  const hero = imageSrc(merged.HeroImage, brotherImages.articleHero);

  return (
    <article className="brother-article">
      <div className="brother-container">
        <div className="brother-article__hero">
          {merged.HeroImage?.value?.src || isEditing ? (
            <Image field={merged.HeroImage} />
          ) : (
            <img src={hero} alt="" />
          )}
        </div>
        <p className="brother-eyebrow">
          {merged.Eyebrow?.value || isEditing ? (
            <Text field={merged.Eyebrow} />
          ) : (
            fieldText(merged.Eyebrow, 'Brother for home · Blog')
          )}
        </p>
        {merged.Title?.value || isEditing ? (
          <Text field={merged.Title} tag="h1" />
        ) : (
          <h1>{title}</h1>
        )}
        {merged.Lead?.value || isEditing ? (
          <Text field={merged.Lead} tag="p" className="brother-article__lead" />
        ) : (
          <p className="brother-article__lead">{lead}</p>
        )}
        {merged.Body?.value || isEditing ? (
          <RichText field={merged.Body} className="brother-article__body" />
        ) : (
          <div className="brother-article__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
        )}
        <div style={{ marginTop: '1.75rem' }}>
          {merged.CtaLink && (merged.CtaLink.value?.href || isEditing) ? (
            <Link field={merged.CtaLink} className="brother-btn brother-btn-primary" />
          ) : (
            <a
              className="brother-btn brother-btn-primary"
              href={linkHref(merged.CtaLink, '/labelling-and-receipts/vc-500w')}
            >
              {linkText(merged.CtaLink, 'See the VC-500W')}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default Default;
