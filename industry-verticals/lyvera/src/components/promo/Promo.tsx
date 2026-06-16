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
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  PromoIcon?: ImageField;
  PromoIcon2?: ImageField;
  PromoText?: RichTextField;
  PromoText2?: RichTextField;
  PromoText3?: RichTextField;
  PromoLink?: LinkField;
  PromoImageOne?: ImageField;
  PromoImageTwo?: ImageField;
  PromoTitle?: Field<string> | RichTextField;
  PromoDescription?: RichTextField;
  PromoSubTitle?: Field<string>;
  PromoMoreInfo?: LinkField;
}

export type PromoProps = ComponentProps & {
  fields?: Fields;
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
  <div className={`component promo ${props.params?.styles || ''}`}>
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

type PromoContentProps = {
  resolved: ResolvedPromoFields;
  isPageEditing: boolean;
  layout: 'band' | 'hero' | 'overlay';
  styles?: string;
};

const PromoContent = ({
  resolved,
  isPageEditing,
  layout,
  styles = '',
}: PromoContentProps): JSX.Element => {
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
  const showCtaButton =
    styles.includes('link-button') || styles.includes('absolute-bottom-link');
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
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const styles = props.params?.styles || '';

  if (!props.fields) {
    return <PromoDefaultComponent {...props} />;
  }

  if (styles.includes('promo-overlay')) {
    return (
      <div className={promoRootClass(styles)} id={id || undefined}>
        <div className="component-content promo-versele-overlay">
          <PromoContent
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
          <PromoContent
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
        <PromoContent
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
  const id = props.params?.RenderingIdentifier;
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;

  if (!props.fields) {
    return <PromoDefaultComponent {...props} />;
  }

  const { image, columnIcon, eyebrow, title, body, link } = resolveFields(
    props.fields,
    props.params?.styles || ''
  );
  const columnIconField = columnIcon ?? image;

  return (
    <div className={promoRootClass(props.params?.styles, 'promo-columns')} id={id || undefined}>
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
