import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text,
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
  Description?: Field<string>;
  Image?: ImageField;
  PrimaryCta?: LinkField;
  SecondaryCta?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};

  return (
    <section className="brother-promo">
      <div className="brother-promo__copy">
        <div className="brother-container" style={{ width: '100%' }}>
          <p className="brother-eyebrow" style={{ color: '#ffb4b8' }}>
            {f.Eyebrow?.value || isEditing ? (
              <Text field={f.Eyebrow} />
            ) : (
              fieldText(f.Eyebrow, 'Echo labelling')
            )}
          </p>
          {f.Title?.value || isEditing ? (
            <Text field={f.Title} tag="h2" />
          ) : (
            <h2>{fieldText(f.Title, 'Organise your desk with full-colour labels')}</h2>
          )}
          <p>
            {f.Description?.value || isEditing ? (
              <Text field={f.Description} />
            ) : (
              fieldText(
                f.Description,
                'From cable tags to shelf signs — the VC-500W makes home-office organisation simple.'
              )
            )}
          </p>
          <div className="brother-hero__ctas" style={{ marginTop: '1.25rem' }}>
            {f.PrimaryCta?.value?.href || isEditing ? (
              <Link field={f.PrimaryCta} className="brother-btn brother-btn-primary" />
            ) : (
              <a
                className="brother-btn brother-btn-primary"
                href={linkHref(
                  f.PrimaryCta,
                  '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office'
                )}
              >
                {linkText(f.PrimaryCta, 'Read the article')}
              </a>
            )}
            {f.SecondaryCta?.value?.href || isEditing ? (
              <Link field={f.SecondaryCta} className="brother-btn brother-btn-secondary" />
            ) : (
              <a
                className="brother-btn brother-btn-secondary"
                href={linkHref(f.SecondaryCta, '/devices/label-printer/vc/vc500w')}
              >
                {linkText(f.SecondaryCta, 'Shop VC-500W')}
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="brother-promo__media">
        {f.Image?.value?.src || isEditing ? (
          <Image field={f.Image} />
        ) : (
          <img src={imageSrc(f.Image, brotherImages.vc500wLaptop)} alt="" />
        )}
      </div>
    </section>
  );
};

export default Default;
