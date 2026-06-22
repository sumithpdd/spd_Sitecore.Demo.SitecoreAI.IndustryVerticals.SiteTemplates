import type { JSX } from 'react';
import { Field, LinkField, RichTextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { hasLinkValue } from '@/lib/marley-field-utils';
import { MarleyLink, MarleyRichText } from '@/lib/marley-editable-fields';

export interface MarleyPromoQuoteFields {
  PromoTitle?: Field<string> | RichTextField;
  PromoMoreInfo?: LinkField;
}

export type MarleyPromoQuoteProps = ComponentProps & {
  fields?: MarleyPromoQuoteFields;
};

/** Large quote-style promo headline (replaces shared Promo WithQuote variant). */
export const Default = (props: MarleyPromoQuoteProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const reversed = props.params?.styles?.includes('reversed');

  return (
    <section className={`${props.params?.styles ?? ''} py-10 lg:py-30`} id={id}>
      <div className="container">
        <div
          className={`flex flex-col space-y-5 ${
            reversed ? 'items-end text-right' : 'items-start text-left'
          }`}
        >
          <h2 className="font-heading text-foreground max-w-4xl text-4xl tracking-tight lg:text-7xl">
            <MarleyRichText field={props.fields?.PromoTitle} isEditing={isEditing} tag="span" />
          </h2>
          {(hasLinkValue(props.fields?.PromoMoreInfo) || isEditing) && (
            <MarleyLink
              field={props.fields?.PromoMoreInfo}
              isEditing={isEditing}
              className="outline-btn !inline-flex"
              fallback={{ href: '/products', text: 'More info' }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
