import React, { JSX } from 'react';
import {
  NextImage as ContentSdkImage,
  RichText as ContentSdkRichText,
  Field,
  ImageField,
  Link,
  LinkField,
  RichTextField,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { Quote } from '@/assets/icons/quote/Quote';
import { CommonStyles, LayoutStyles, PromoFlags } from '@/types/styleFlags';

interface Fields {
  PromoIcon?: ImageField;
  PromoIcon2?: ImageField;
  PromoText?: RichTextField;
  PromoText2?: RichTextField;
  PromoText3?: RichTextField;
  PromoLink?: LinkField;
  PromoImageOne?: ImageField;
  PromoImageTwo?: ImageField;
  PromoImageThree?: ImageField;
  PromoTitle?: Field<string> | RichTextField;
  PromoDescription?: RichTextField;
  PromoSubTitle?: Field<string>;
  PromoMoreInfo?: LinkField;
}

export type PromoProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

type ResolvedPromoFields = {
  image?: ImageField;
  columnIcon?: ImageField;
  eyebrow?: Field<string> | RichTextField;
  title?: Field<string> | RichTextField;
  body?: RichTextField;
  link?: LinkField;
};

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props.params.styles || ''}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

const stripHtml = (value: string): string =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const isHtmlContent = (value: unknown): boolean =>
  typeof value === 'string' && /<[a-z][\s\S]*>/i.test(value.trim());

const getPlainText = (field: Field<string> | RichTextField | undefined): string => {
  if (!field?.value) return '';
  if (typeof field.value === 'string') return stripHtml(field.value);
  return '';
};

const hasFieldValue = (field: { value?: unknown } | undefined): boolean => {
  if (!field) return false;
  const value = field.value;
  if (value == null) return false;
  if (typeof value === 'string') return stripHtml(value).length > 0;
  if (typeof value === 'object' && 'href' in value) {
    return Boolean((value as { href?: string }).href);
  }
  return true;
};

const hasLinkValue = (field: LinkField | undefined): boolean => {
  if (!field?.value) return false;
  const { href, text, title } = field.value as { href?: string; text?: string; title?: string };
  return Boolean(href || text || title);
};

/** PlaySummit template uses PromoText* for rich HTML; kit datasource uses PromoTitle / PromoSubTitle. */
const resolveFields = (fields: Fields, styles = ''): ResolvedPromoFields => {
  const usesPlaySummitFields =
    Boolean(fields.PromoIcon || fields.PromoText || fields.PromoText2 || fields.PromoText3) &&
    !fields.PromoImageOne &&
    !fields.PromoTitle;

  const link = fields.PromoLink ?? fields.PromoMoreInfo;

  if (usesPlaySummitFields) {
    const cardLayout = styles.includes('promo-hero') || styles.includes('promo-overlay');

    if (cardLayout) {
      return {
        image: fields.PromoIcon,
        columnIcon: fields.PromoIcon2 ?? fields.PromoIcon,
        eyebrow: fields.PromoText3,
        title: fields.PromoText,
        body: fields.PromoText2,
        link,
      };
    }

    return {
      image: fields.PromoIcon,
      columnIcon: fields.PromoIcon2 ?? fields.PromoIcon,
      title: fields.PromoText3,
      body: fields.PromoText,
      link,
    };
  }

  return {
    image: fields.PromoImageOne ?? fields.PromoIcon,
    columnIcon: fields.PromoImageTwo ?? fields.PromoIcon2,
    eyebrow: fields.PromoSubTitle ?? fields.PromoText3,
    title: fields.PromoTitle ?? fields.PromoText,
    body: fields.PromoDescription ?? fields.PromoText2,
    link,
  };
};

const PromoField = ({
  field,
  tag = 'div',
  className,
}: {
  field?: Field<string> | RichTextField;
  tag?: string;
  className?: string;
}): JSX.Element | null => {
  if (!field) return null;

  if (isHtmlContent(field.value)) {
    return <ContentSdkRichText field={field as RichTextField} tag={tag} className={className} />;
  }

  return <Text field={field as Field<string>} tag={tag} className={className} />;
};

const PromoEyebrow = ({
  field,
  className,
}: {
  field?: Field<string> | RichTextField;
  className?: string;
}): JSX.Element | null => {
  if (!field) return null;
  if (isHtmlContent(field.value)) {
    return <ContentSdkRichText field={field as RichTextField} className={className} />;
  }
  return <Text field={field as Field<string>} className={className} />;
};

const PromoCta = ({ field, className }: { field: LinkField; className?: string }): JSX.Element => {
  const label =
    field.value?.text ||
    field.value?.title ||
    field.value?.href?.replace(/^\//, '') ||
    'Learn more';

  return (
    <Link
      field={{
        ...field,
        value: {
          ...field.value,
          text: label,
        },
      }}
      className={className}
    />
  );
};

type BandPromoContentProps = {
  resolved: ResolvedPromoFields;
  isPageEditing: boolean;
  layout: 'band' | 'hero' | 'overlay';
  styles?: string;
};

const BandPromoContent = ({
  resolved,
  isPageEditing,
  layout,
  styles = '',
}: BandPromoContentProps): JSX.Element => {
  const { image, eyebrow, title, body, link } = resolved;
  const eyebrowText = getPlainText(eyebrow);
  const bodyText = getPlainText(body);
  const titleText = getPlainText(title);
  const showEyebrow = layout === 'band' && (eyebrowText.length > 0 || isPageEditing);
  const showHeroEyebrow =
    (layout === 'hero' || layout === 'overlay') && (eyebrowText.length > 0 || isPageEditing);
  const showBody =
    layout === 'band' &&
    (bodyText.length > 0 || isPageEditing) &&
    bodyText !== eyebrowText &&
    bodyText !== titleText;
  const showLink = Boolean(link && hasLinkValue(link));
  const showCtaButton = styles.includes('link-button');
  const isCardLayout = layout === 'hero' || layout === 'overlay';
  const titleAsLink = showLink && !showCtaButton && isCardLayout && !isPageEditing && Boolean(link);
  const titleTag = isCardLayout ? 'h3' : 'h2';

  const media = (
    <div
      className={
        layout === 'hero'
          ? 'promo-versele-hero__media'
          : layout === 'overlay'
            ? 'promo-versele-overlay__media'
            : 'promo-versele-band__media'
      }
    >
      <ContentSdkImage field={image} className="promo-versele__image" />
    </div>
  );

  const content = (
    <div
      className={
        layout === 'hero'
          ? 'promo-versele-hero__content'
          : layout === 'overlay'
            ? 'promo-versele-overlay__content'
            : 'promo-versele-band__content'
      }
    >
      {showHeroEyebrow && <PromoEyebrow field={eyebrow} className="promo-versele__eyebrow" />}
      {showEyebrow && <PromoEyebrow field={eyebrow} className="promo-versele__eyebrow" />}
      {(hasFieldValue(title) || isPageEditing) &&
        (titleAsLink && link ? (
          <Link field={link} className="promo-versele__title-link">
            <PromoField field={title} tag={titleTag} className="promo-versele__title" />
          </Link>
        ) : (
          <PromoField field={title} tag={titleTag} className="promo-versele__title" />
        ))}
      {showBody && <PromoField field={body} className="promo-versele__body ck-content" />}
      {showLink && link && showCtaButton && (
        <PromoCta field={link} className="promo-versele__cta" />
      )}
    </div>
  );

  if (layout === 'hero' || layout === 'overlay') {
    return (
      <>
        {media}
        {content}
      </>
    );
  }

  return (
    <>
      {content}
      {media}
    </>
  );
};

const promoRootClass = (styles: string | undefined, extra?: string): string =>
  ['component', 'promo', styles, extra].filter(Boolean).join(' ');

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const styles = props.params.styles || '';

  if (!props.fields) {
    return <PromoDefaultComponent {...props} />;
  }

  if (styles.includes('promo-overlay')) {
    return (
      <div className={promoRootClass(styles)} id={id || undefined}>
        <div className="component-content promo-versele-overlay">
          <BandPromoContent
            resolved={resolveFields(props.fields, styles)}
            isPageEditing={isPageEditing}
            layout="overlay"
            styles={styles}
          />
        </div>
      </div>
    );
  }

  if (styles.includes('promo-hero')) {
    return (
      <div className={promoRootClass(styles)} id={id || undefined}>
        <div className="component-content promo-versele-hero">
          <BandPromoContent
            resolved={resolveFields(props.fields, styles)}
            isPageEditing={isPageEditing}
            layout="hero"
            styles={styles}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={promoRootClass(styles)} id={id || undefined}>
      <div className="component-content promo-versele-band">
        <BandPromoContent
          resolved={resolveFields(props.fields, styles)}
          isPageEditing={isPageEditing}
          layout="band"
          styles={styles}
        />
      </div>
    </div>
  );
};

export const WithText = Default;

export const WithColumns = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  if (!props.fields) {
    return <PromoDefaultComponent {...props} />;
  }

  const { image, columnIcon, eyebrow, title, body, link } = resolveFields(
    props.fields,
    props.params.styles || ''
  );
  const columnIconField = columnIcon ?? image;

  return (
    <div className={promoRootClass(props.params.styles, 'promo-columns')} id={id || undefined}>
      <div className="component-content promo-versele-columns">
        <div className="promo-versele-columns__media">
          <ContentSdkImage field={image} className="promo-versele__image" />
        </div>
        <div className="promo-versele-columns__body">
          <div className="promo-versele-columns__grid">
            {(hasFieldValue(eyebrow) || isPageEditing) && (
              <div className="promo-versele-columns__card">
                <ContentSdkImage field={columnIconField} className="promo-versele-columns__icon" />
                <PromoField field={eyebrow} className="promo-versele__body ck-content" />
              </div>
            )}
            {(hasFieldValue(title) || isPageEditing) && (
              <div className="promo-versele-columns__card">
                <ContentSdkImage field={columnIconField} className="promo-versele-columns__icon" />
                <PromoField field={title} className="promo-versele__body ck-content" />
              </div>
            )}
            {(hasFieldValue(body) || isPageEditing) && (
              <div className="promo-versele-columns__card">
                <ContentSdkImage field={columnIconField} className="promo-versele-columns__icon" />
                <PromoField field={body} className="promo-versele__body ck-content" />
              </div>
            )}
          </div>
          {hasLinkValue(link) && link && <PromoCta field={link} className="promo-versele__cta" />}
        </div>
      </div>
    </div>
  );
};

/* —— Legacy industry-verticals variants (Storybook / older pages) —— */

const isShadowClassActive = (val: boolean) => (val ? 'shadow-2xl' : '');

export const PromoContent = ({ ...props }: PromoProps) => {
  const isAccentLineVisible = !props?.params?.styles?.includes(CommonStyles.HideAccentLine);

  return (
    <div className="space-y-5">
      <div className="eyebrow">
        <Text field={props.fields.PromoSubTitle} />
      </div>

      <h2 className="inline-block max-w-md">
        <Text field={props.fields.PromoTitle} />
        {isAccentLineVisible && <AccentLine className="w-full max-w-xs" />}
      </h2>

      <div className="max-w-lg text-lg">
        <ContentSdkRichText field={props.fields.PromoDescription} />
      </div>

      {hasLinkValue(props.fields.PromoMoreInfo) && props.fields.PromoMoreInfo && (
        <Link field={props.fields.PromoMoreInfo} className="arrow-btn" />
      )}
    </div>
  );
};

export const SingleImageContainer = ({
  PromoImageOne,
  withShapes,
  withShadows,
}: Partial<Pick<Fields, 'PromoImageOne'>> & {
  withShapes?: boolean;
  withShadows?: boolean;
}): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  return (
    <>
      {withShapes && (
        <div className="bg-background-muted absolute top-0 left-0 z-0 aspect-6/5 w-2/3 rounded-2xl"></div>
      )}
      <div>
        <div className={clsx({ 'm-4 md:m-9 md:mb-6 xl:m-15 xl:mb-8': withShapes })}>
          {withShapes && (
            <div className="bg-background-muted absolute top-1/2 right-0 z-0 aspect-5/3 w-3/4 -translate-y-1/2 transform rounded-2xl"></div>
          )}
          <div
            className={`relative z-10 aspect-4/3 w-full max-w-4xl overflow-hidden rounded-2xl ${shadowClass}`}
          >
            <ContentSdkImage field={PromoImageOne} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </>
  );
};

export const MultipleImageContainer = ({
  PromoImageOne,
  PromoImageTwo,
  PromoImageThree,
  withShapes,
  withShadows,
}: Partial<Pick<Fields, 'PromoImageOne' | 'PromoImageTwo' | 'PromoImageThree'>> & {
  withShapes?: boolean;
  withShadows?: boolean;
}): JSX.Element => {
  const shadowClass = isShadowClassActive(withShadows ?? false);
  const marginClass = withShapes ? 'mr-4' : '';

  return (
    <>
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex flex-col gap-10 md:w-1/3">
          <div className="relative aspect-square overflow-visible rounded-2xl">
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage field={PromoImageTwo} className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="relative aspect-2/3 overflow-visible rounded-2xl">
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage field={PromoImageThree} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-2/3">
          {withShapes && (
            <div className="bg-background-muted absolute right-0 z-0 aspect-[495/422] w-3/4 rounded-2xl md:-top-10 xl:-top-15"></div>
          )}
          <div className={`relative aspect-3/2 overflow-visible rounded-2xl ${marginClass} z-10`}>
            <div
              className={`relative z-10 h-full w-full overflow-hidden rounded-2xl ${shadowClass}`}
            >
              <ContentSdkImage
                field={PromoImageOne}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const WithFullImage = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const isPromoReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed)
    ? ' flex-col'
    : 'flex-col-reverse';

  return (
    <section className={`${props.params.styles} py-20`} id={id ? id : undefined}>
      <div className={`container flex ${isPromoReversed}`}>
        <div className="relative my-10 aspect-[1232/608] overflow-hidden rounded-2xl">
          <ContentSdkImage
            field={props.fields.PromoImageTwo}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5">
          <div className="text-foreground-light font-semibold uppercase">
            <Text field={props.fields.PromoSubTitle} />
          </div>

          <div className="grid-col-1 grid gap-5 md:grid-cols-2">
            <div className="font-bold">
              <h2 className="max-w-md">
                <Text field={props.fields.PromoTitle} />
              </h2>
            </div>

            <div className="flex max-w-md items-center">
              <ContentSdkRichText className="promo-text" field={props.fields.PromoDescription} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WithQuote = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const withQuote = !props?.params?.styles?.includes(PromoFlags.HidePromoQuotes);
  const isReversed = !props?.params?.styles?.includes(LayoutStyles.Reversed);

  const classesWhenReversed = {
    container: isReversed ? 'container-align-left' : 'container-align-right',
    contentOrder: isReversed ? 'order-1 lg:order-2' : 'order-2 lg:order-1',
    imageTransform: isReversed
      ? '-translate-x-[10%] xl:-translate-x-[20%]'
      : 'translate-x-[10%] xl:translate-x-[15%]',
    quoteFlip: isReversed ? '' : 'lg:-scale-x-100',
  };

  return (
    <section
      className={`relative ${props.params.styles} z-10 overflow-hidden pb-15 xl:pb-[4%]`}
      id={id ? id : undefined}
    >
      {withQuote && (
        <div
          className={`absolute left-5 md:top-[10%] lg:top-[25%] lg:left-1/2 lg:-translate-x-1/2 ${classesWhenReversed.quoteFlip} } text-background-accent! z-20`}
        >
          <Quote className="h-10 md:h-20 lg:h-25 xl:h-30" />
        </div>
      )}
      <div className="bg-background">
        <div className={`${classesWhenReversed.container} `}>
          <div className={`grid grid-cols-1 lg:grid-cols-3 lg:gap-0`}>
            <div
              className={`relative mt-10 flex items-center justify-center lg:col-span-1 ${classesWhenReversed.contentOrder}`}
            >
              <div className="text-foreground! mb-5 max-w-sm">
                <PromoContent {...props} />
              </div>
            </div>

            <div
              className={`relative z-30 order-2 mb-2 aspect-2/1 w-full translate-y-[25%] scale-100 place-self-end lg:order-1 lg:col-span-2 lg:h-3/4 xl:scale-90 ${classesWhenReversed.imageTransform}`}
            >
              <ContentSdkImage
                field={props.fields.PromoImageOne}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
