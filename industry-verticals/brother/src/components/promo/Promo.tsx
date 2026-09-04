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
import { ComponentProps } from 'lib/component-props';
import { brotherImages } from 'lib/demo-images';
import { fieldText, imageSrc, linkHref, linkText } from 'lib/cms-fields';

type Fields = {
  PromoImageOne?: ImageField;
  PromoImage?: ImageField;
  Image?: ImageField;
  PromoTitle?: Field<string>;
  Title?: Field<string>;
  PromoSubTitle?: Field<string>;
  Eyebrow?: Field<string>;
  PromoDescription?: RichTextField | Field<string>;
  Description?: Field<string>;
  PromoMoreInfo?: LinkField;
  CtaLink?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

function resolveFields(f: Fields) {
  return {
    imageField: f.PromoImageOne || f.PromoImage || f.Image,
    titleField: f.PromoTitle || f.Title,
    eyebrowField: f.PromoSubTitle || f.Eyebrow,
    descField: f.PromoDescription || f.Description,
    ctaField: f.PromoMoreInfo || f.CtaLink,
  };
}

function isRichHtml(value: unknown): boolean {
  return typeof value === 'string' && value.includes('<');
}

function PromoInner({
  fields,
  layout,
}: {
  fields: Fields;
  layout: 'default' | 'image-left' | 'image-right';
}): JSX.Element {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const { imageField, titleField, eyebrowField, descField, ctaField } = resolveFields(fields);
  const title = fieldText(titleField as Field<string>, 'Discover Brother solutions');
  const eyebrow = fieldText(eyebrowField as Field<string>, '');
  const description = fieldText(
    descField as Field<string>,
    'Reusable promo — image, heading, copy and CTA for hubs, PDPs and campaigns.'
  );
  const image = imageSrc(imageField, brotherImages.vc500wLaptop);
  const href = linkHref(ctaField, '/labelling-and-receipts');
  const label = linkText(ctaField, 'Learn more');
  const descValue = (descField as RichTextField | undefined)?.value;

  const copy = (
    <div className="brother-promo-block__copy">
      {eyebrow || isEditing ? (
        <p className="brother-eyebrow">
          {eyebrowField?.value || isEditing ? <Text field={eyebrowField} /> : eyebrow}
        </p>
      ) : null}
      {titleField?.value || isEditing ? <Text field={titleField} tag="h2" /> : <h2>{title}</h2>}
      {isRichHtml(descValue) || isEditing ? (
        <RichText field={descField as RichTextField} />
      ) : descField?.value ? (
        <Text field={descField as Field<string>} tag="p" />
      ) : (
        <p>{description}</p>
      )}
      {ctaField && (ctaField.value?.href || isEditing) ? (
        <Link field={ctaField} className="brother-btn brother-btn-primary" />
      ) : (
        <a className="brother-btn brother-btn-primary" href={href}>
          {label}
        </a>
      )}
    </div>
  );

  const media = (
    <div className="brother-promo-block__media">
      {imageField?.value?.src || isEditing ? (
        <Image field={imageField} />
      ) : (
        <img src={image} alt="" />
      )}
    </div>
  );

  return (
    <section className={`brother-promo-block brother-promo-block--${layout}`} data-variant={layout}>
      <div className="brother-container brother-promo-block__grid">
        {layout === 'image-right' ? (
          <>
            {copy}
            {media}
          </>
        ) : (
          <>
            {media}
            {copy}
          </>
        )}
      </div>
    </section>
  );
}

/** Generic promo — image + text + CTA (personalizable datasource). */
export const Default = (props: Props): JSX.Element => (
  <PromoInner fields={props.fields || {}} layout="default" />
);

export const ImageLeft = (props: Props): JSX.Element => (
  <PromoInner fields={props.fields || {}} layout="image-left" />
);

export const ImageRight = (props: Props): JSX.Element => (
  <PromoInner fields={props.fields || {}} layout="image-right" />
);

export default Default;
