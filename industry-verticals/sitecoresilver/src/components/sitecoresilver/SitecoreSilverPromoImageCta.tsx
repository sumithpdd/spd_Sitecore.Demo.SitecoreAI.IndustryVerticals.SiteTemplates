import type { JSX } from 'react';
import { ImageField, LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { imageSrc, linkHref, linkText, textValue } from '@/lib/sitecoresilver-field-utils';
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
  const id = props.params?.RenderingIdentifier;
  const bg = imageSrc(props.fields?.BackgroundImage);

  return (
    <section className="component ss-promo-cta" id={id}>
      <div className="ss-promo-cta-card">
        <div
          className="ss-promo-cta-media"
          style={bg ? { backgroundImage: `url(${bg})` } : undefined}
          aria-hidden={!bg}
        />
        <div className="ss-promo-cta-bar">
          <p className="ss-promo-cta-text">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" aria-hidden />
            <span>
              <Text field={props.fields?.Text} tag="span" />
              {!textValue(props.fields?.Text) && PROMO_CTA_DEFAULTS.text}
            </span>
          </p>
          <Link
            className="ss-btn-cta"
            href={linkHref(props.fields?.CtaLink)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar className="h-4 w-4" aria-hidden />
            {linkText(props.fields?.CtaLink, PROMO_CTA_DEFAULTS.ctaText)}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};
