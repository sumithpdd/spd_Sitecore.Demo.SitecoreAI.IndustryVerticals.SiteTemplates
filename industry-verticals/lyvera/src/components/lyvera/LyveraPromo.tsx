import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  TextField,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Image as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  hasLinkValue,
  imageSrc,
  richTextFieldValue,
  textFieldValue,
} from '@/lib/lyvera-field-utils';
import {
  LYVERA_PROMO_CEO,
  LYVERA_PROMO_HOW_WE_DO_IT,
  LYVERA_PROMO_WHAT_WE_DO,
  LYVERA_PROMO_WHO_WE_ARE,
} from '@/lib/lyvera-defaults';

export interface LyveraPromoFields {
  Title?: TextField;
  Description?: RichTextField;
  Image?: ImageField;
  CtaLink?: LinkField;
}

export type LyveraPromoProps = ComponentProps & {
  fields?: LyveraPromoFields;
};

type PromoFallback = { title: string; body: string; image: string };

type PromoContentProps = {
  fields: LyveraPromoFields;
  isEditing: boolean;
  fallback: PromoFallback;
  titleTag?: 'h2' | 'h3';
};

function PromoContent({
  fields,
  isEditing,
  fallback,
  titleTag = 'h2',
}: PromoContentProps): JSX.Element {
  return (
    <div className="lyvera-promo__content">
      {(textFieldValue(fields.Title) || isEditing) && (
        <ContentSdkText field={fields.Title} tag={titleTag} className="lyvera-promo__title" />
      )}
      {!textFieldValue(fields.Title) && !isEditing && (
        <h2 className="lyvera-promo__title">{fallback.title}</h2>
      )}
      {(richTextFieldValue(fields.Description) || isEditing) && (
        <ContentSdkRichText field={fields.Description} className="lyvera-promo__body" tag="div" />
      )}
      {!richTextFieldValue(fields.Description) && !isEditing && (
        <p className="lyvera-promo__body">{fallback.body}</p>
      )}
      {hasLinkValue(fields.CtaLink) && fields.CtaLink && (
        <ContentSdkLink field={fields.CtaLink} className="lyvera-promo__cta" />
      )}
    </div>
  );
}

function PromoImage({
  fields,
  fallbackSrc,
  withAccent,
}: {
  fields: LyveraPromoFields;
  fallbackSrc: string;
  withAccent?: boolean;
}): JSX.Element {
  const src = imageSrc(fields.Image, fallbackSrc);
  return (
    <div className={`lyvera-promo__media${withAccent ? 'lyvera-promo__media--accent' : ''}`}>
      {withAccent && (
        <>
          <span className="lyvera-promo__accent lyvera-promo__accent--tl" aria-hidden />
          <span className="lyvera-promo__accent lyvera-promo__accent--br" aria-hidden />
        </>
      )}
      <ContentSdkImage field={fields.Image} className="lyvera-promo__image" />
      {!fields.Image?.value?.src && (
        <img src={src} alt="" className="lyvera-promo__image lyvera-promo__image--fallback" />
      )}
    </div>
  );
}

function resolveBackgroundClass(styles: string): string {
  if (styles.includes('lyvera-bg-coral')) return 'lyvera-promo--coral';
  if (styles.includes('lyvera-bg-mint')) return 'lyvera-promo--mint';
  if (styles.includes('lyvera-bg-teal')) return 'lyvera-promo--teal';
  return 'lyvera-promo--white';
}

function PromoSection(
  props: LyveraPromoProps,
  layoutClass: string,
  fallback: PromoFallback,
  options?: { accent?: boolean; titleTag?: 'h2' | 'h3' }
): JSX.Element {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const styles = props.params?.styles ?? '';
  const id = props.params?.RenderingIdentifier;

  return (
    <section
      className={['component lyvera-promo', layoutClass, resolveBackgroundClass(styles), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div className="lyvera-promo__inner">
        <PromoContent
          fields={fields}
          isEditing={isEditing}
          fallback={fallback}
          titleTag={options?.titleTag}
        />
        <PromoImage fields={fields} fallbackSrc={fallback.image} withAccent={options?.accent} />
      </div>
    </section>
  );
}

/** Text left, image right on white background */
export const Default = (props: LyveraPromoProps): JSX.Element =>
  PromoSection(props, 'lyvera-promo--image-right', LYVERA_PROMO_HOW_WE_DO_IT);

/** Image left, text right on coloured background with accent brackets */
export const ImageLeftColor = (props: LyveraPromoProps): JSX.Element =>
  PromoSection(props, 'lyvera-promo--image-left lyvera-promo--coral', LYVERA_PROMO_WHAT_WE_DO, {
    accent: true,
  });

/** Text left, image right on teal background */
export const ImageRightColor = (props: LyveraPromoProps): JSX.Element =>
  PromoSection(props, 'lyvera-promo--image-right lyvera-promo--teal', LYVERA_PROMO_WHO_WE_ARE);

/** Stacked text above full-width image */
export const Stacked = (props: LyveraPromoProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const styles = props.params?.styles ?? '';
  const id = props.params?.RenderingIdentifier;
  const fallback = LYVERA_PROMO_HOW_WE_DO_IT;

  return (
    <section
      className={[
        'component lyvera-promo lyvera-promo--stacked',
        resolveBackgroundClass(styles),
        styles,
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div className="lyvera-promo__inner lyvera-promo__inner--stacked">
        <PromoContent fields={fields} isEditing={isEditing} fallback={fallback} />
        <PromoImage fields={fields} fallbackSrc={fallback.image} />
      </div>
    </section>
  );
};

/** Dark teal stacked quote with portrait image below */
export const StackedColor = (props: LyveraPromoProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const id = props.params?.RenderingIdentifier;
  const fallback = LYVERA_PROMO_CEO;

  return (
    <section
      className="component lyvera-promo lyvera-promo--stacked lyvera-promo--teal lyvera-promo--quote"
      id={id}
    >
      <div className="lyvera-promo__inner lyvera-promo__inner--stacked">
        <PromoContent fields={fields} isEditing={isEditing} fallback={fallback} titleTag="h2" />
        <PromoImage fields={fields} fallbackSrc={fallback.image} />
      </div>
    </section>
  );
};
