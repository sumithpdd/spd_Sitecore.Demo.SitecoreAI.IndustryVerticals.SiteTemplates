import type { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { hasLinkValue } from '@/lib/marley-field-utils';
import { MarleyImage, MarleyLink, MarleyRichText, MarleyText } from '@/lib/marley-editable-fields';

export interface MarleyPromoBlockFields {
  PromoImageOne?: ImageField;
  PromoTitle?: Field<string>;
  PromoDescription?: RichTextField;
  PromoSubTitle?: Field<string>;
  PromoMoreInfo?: LinkField;
}

export type MarleyPromoBlockProps = ComponentProps & {
  fields?: MarleyPromoBlockFields;
};

/** Image + copy promo band (replaces shared Promo Default variant). */
export const Default = (props: MarleyPromoBlockProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const reversed = props.params?.styles?.includes('reversed') ? 'order-last' : '';

  return (
    <section className={`${props.params?.styles ?? ''} py-10 lg:min-h-screen lg:py-16`} id={id}>
      <div className="container grid grid-cols-1 items-stretch gap-0 lg:h-screen lg:grid-cols-2 lg:gap-10">
        <div className={`${reversed} relative h-full w-full lg:h-screen`}>
          <MarleyImage
            field={props.fields?.PromoImageOne}
            className="h-full w-full object-cover"
            isEditing={isEditing}
          />
        </div>
        <div className="font-body relative flex flex-col py-10 lg:flex lg:h-screen lg:py-0">
          <div className="lg:sticky lg:top-0 lg:h-fit">
            <div className="space-y-6">
              <MarleyText
                field={props.fields?.PromoSubTitle}
                isEditing={isEditing}
                className="text-foreground-light text-sm tracking-wide uppercase"
                tag="div"
              />
              <MarleyText
                field={props.fields?.PromoTitle}
                isEditing={isEditing}
                tag="h3"
                className="text-3xl font-semibold"
              />
              <MarleyRichText
                field={props.fields?.PromoDescription}
                isEditing={isEditing}
                className="text-foreground text-base lg:text-lg"
              />
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
        </div>
      </div>
    </section>
  );
};
