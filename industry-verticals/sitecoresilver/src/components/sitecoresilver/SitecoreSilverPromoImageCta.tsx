import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  useSitecore,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { hasImageValue, hasLinkValue, textValue } from '@/lib/sitecoresilver-field-utils';
import { PROMO_CTA_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverPromoImageCtaFields {
  BackgroundImage?: ImageField;
  Text?: TextField;
  CtaLink?: LinkField;
}

export type SitecoreSilverPromoImageCtaProps = ComponentProps & {
  fields?: SitecoreSilverPromoImageCtaFields;
};

export const Default = (props: SitecoreSilverPromoImageCtaProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <section className="component ss-promo-cta" id={id}>
      <div className="ss-promo-cta-card">
        <div
          className="ss-promo-cta-media"
          aria-hidden={!hasImageValue(fields.BackgroundImage) && !isEditing}
        >
          {(hasImageValue(fields.BackgroundImage) || isEditing) && (
            <ContentSdkImage field={fields.BackgroundImage} className="ss-promo-cta-media-img" />
          )}
        </div>
        <div className="ss-promo-cta-bar">
          <p className="ss-promo-cta-text">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" aria-hidden />
            <span>
              <ContentSdkText field={fields.Text} tag="span" />
              {!textValue(fields.Text) && !isEditing && PROMO_CTA_DEFAULTS.text}
            </span>
          </p>
          {fields.CtaLink && (hasLinkValue(fields.CtaLink) || isEditing) ? (
            <ContentSdkLink field={fields.CtaLink} className="ss-btn-cta" />
          ) : (
            <Link
              className="ss-btn-cta"
              href={PROMO_CTA_DEFAULTS.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Calendar className="h-4 w-4" aria-hidden />
              {PROMO_CTA_DEFAULTS.ctaText}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
