'use client';

import type { JSX } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { findBrandPageByPath } from '@/lib/lyvera-brand-pages';
import { getPublicItemPath } from '@/lib/lyvera-sites';

export type LyveraBrandPageBodyProps = ComponentProps;

/** Brand page sections (intro, gallery, copy blocks) from lyveragroup.com fallbacks */
export const Default = (props: LyveraBrandPageBodyProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const brand = findBrandPageByPath(getPublicItemPath(page));

  if (isEditing) {
    return (
      <section className="component lyvera-brand-body" id={id}>
        <div className="lyvera-brand-body__inner">
          <p>Lyvera Brand Page Body — renders brand content on the live site.</p>
        </div>
      </section>
    );
  }

  if (!brand) return <></>;

  return (
    <section className="component lyvera-brand-body" id={id}>
      <div className="lyvera-brand-body__intro component promo promo-bg-teal">
        <div className="component-content promo-versele-band">
          <div className="promo-versele-band__content">
            <img src={brand.logoSrc} alt="" className="lyvera-brand-body__logo" />
            <h2 className="promo-versele__title">{brand.introTitle}</h2>
            <p className="promo-versele__body">{brand.introBody}</p>
            <a
              href={brand.visitUrl}
              className="promo-versele__cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find out more
            </a>
          </div>
          <div className="promo-versele-band__media">
            <img src={brand.galleryImages[0]?.src} alt="" className="promo-versele__image" />
          </div>
        </div>
      </div>

      {brand.galleryImages.length > 1 && (
        <div className="lyvera-brand-body__gallery">
          <div className="lyvera-brand-body__gallery-track">
            {brand.galleryImages.map((image) => (
              <div key={image.src} className="lyvera-brand-body__gallery-item">
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="lyvera-brand-body__section">
        <div className="lyvera-brand-body__section-inner">
          <h2>{brand.sectionTwoTitle}</h2>
          <p>{brand.sectionTwoBody}</p>
        </div>
      </div>

      <div className="lyvera-brand-body__section lyvera-brand-body__section--alt">
        <div className="lyvera-brand-body__section-inner">
          <h2>{brand.sectionThreeTitle}</h2>
          <p>{brand.sectionThreeBody}</p>
        </div>
      </div>
    </section>
  );
};
