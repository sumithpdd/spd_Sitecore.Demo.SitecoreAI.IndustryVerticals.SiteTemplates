'use client';

import {
  Field,
  ImageField,
  LinkField,
  Link,
  NextImage as ContentSdkImage,
  RichText,
  Text,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { HeroBannerStyles } from '@/types/styleFlags';
import { IGQLField } from '@/types/igql';
import { useEditingMode } from '@/hooks/useEditingMode';

/** Fallback content when datasource fields are empty or unavailable. */
const HERO_FALLBACK = {
  title: "Welcome to the UK's Number One Taps and Showers Brand",
  description:
    'Straightforward solutions for every bathroom and kitchen that you can trust time and time again.',
  ctaText: 'Find a Product',
  ctaHref: '/products/bathroom-taps',
  imageSrc: '/images/hero/banner-1.jpg',
  imageAlt: "Welcome to the UK's Number One Taps and Showers Brand",
  imageWidth: 1920,
  imageHeight: 720,
} as const;

/** Serialized bristan hero items still point at this broken external URL. */
const BROKEN_CMS_IMAGE_SRC = 'https://www.bristan.com/-/media/images/homepage/banner/banner-1.ashx';

interface Fields {
  Image?: ImageField | IGQLField<ImageField>;
  Video?: ImageField | IGQLField<ImageField>;
  Title?: Field<string> | IGQLField<Field<string>>;
  Description?: Field<string> | IGQLField<Field<string>>;
  CtaLink?: LinkField | IGQLField<LinkField>;
}

interface HeroBannerProps extends ComponentProps {
  fields?: Fields;
}

/** Unwrap IGQL `{ jsonValue }` fields from Edge (same pattern as Features.tsx). */
function pickSdkField<T extends { value?: unknown }>(field?: T | IGQLField<T>): T | undefined {
  let resolved: unknown = field;

  if (resolved != null && typeof resolved === 'object' && 'jsonValue' in resolved) {
    resolved = (resolved as IGQLField<T>).jsonValue;
  }

  if (resolved && typeof resolved === 'object' && 'value' in resolved) {
    const value = (resolved as T).value;
    if (value != null && typeof value === 'object' && 'jsonValue' in value) {
      const inner = (value as IGQLField<{ value: unknown }>).jsonValue;
      const normalized =
        inner && typeof inner === 'object' && 'value' in inner
          ? (inner as { value: unknown }).value
          : inner;
      return { ...(resolved as T), value: normalized };
    }
  }

  return resolved as T | undefined;
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function ensureImageField(image: ImageField): ImageField {
  const value = image?.value ?? {};

  return {
    ...image,
    value: {
      ...value,
      src: value.src || HERO_FALLBACK.imageSrc,
      alt: value.alt || HERO_FALLBACK.imageAlt,
      width: toNumber(value.width, HERO_FALLBACK.imageWidth),
      height: toNumber(value.height, HERO_FALLBACK.imageHeight),
    },
  };
}

function resolveHeroFields(fields?: Fields) {
  const imageField = pickSdkField(fields?.Image);
  const imageSrc = imageField?.value?.src;
  const image = ensureImageField(
    imageSrc && imageSrc !== BROKEN_CMS_IMAGE_SRC
      ? (imageField as ImageField)
      : {
          value: {
            src: HERO_FALLBACK.imageSrc,
            alt: imageField?.value?.alt || HERO_FALLBACK.imageAlt,
          },
        }
  );

  return {
    title: pickSdkField(fields?.Title) ?? { value: HERO_FALLBACK.title },
    description: pickSdkField(fields?.Description) ?? { value: HERO_FALLBACK.description },
    image,
    ctaLink: pickSdkField(fields?.CtaLink) ?? {
      value: {
        href: HERO_FALLBACK.ctaHref,
        text: HERO_FALLBACK.ctaText,
        linktype: 'internal',
      },
    },
  };
}

const styleString = (styles: unknown): string => (typeof styles === 'string' ? styles : '');

const HeroCta = ({
  withPlaceholder,
  searchBarPlaceholderKey,
  rendering,
  ctaLink,
  isEditing,
}: {
  withPlaceholder: boolean;
  searchBarPlaceholderKey: string;
  rendering: HeroBannerProps['rendering'];
  ctaLink: LinkField;
  isEditing: boolean;
}) =>
  withPlaceholder ? (
    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
  ) : (
    <Link field={ctaLink} className="hero-banner__cta" editable={isEditing} />
  );

const HeroMedia = ({ image, isEditing }: { image: ImageField; isEditing: boolean }) => {
  const src = image?.value?.src || HERO_FALLBACK.imageSrc;
  const alt = String(image?.value?.alt || HERO_FALLBACK.imageAlt);

  return (
    <div className="hero-banner__media">
      {isEditing ? (
        <ContentSdkImage
          field={image}
          className="block h-auto max-h-[420px] w-full object-cover md:max-h-[480px]"
          priority
        />
      ) : (
        <img src={src} alt={alt} />
      )}
    </div>
  );
};

const HeroTitle = ({
  field,
  isEditing,
  className,
}: {
  field: Field<string>;
  isEditing: boolean;
  className: string;
}) =>
  isEditing ? (
    <Text field={field} tag="h1" className={className} />
  ) : (
    <h1 className={className}>{field?.value}</h1>
  );

const HeroDescription = ({ field, isEditing }: { field: Field<string>; isEditing: boolean }) =>
  isEditing ? (
    <div className="hero-banner__description">
      <RichText field={field} />
    </div>
  ) : (
    <div
      className="hero-banner__description"
      dangerouslySetInnerHTML={{ __html: String(field?.value ?? '') }}
    />
  );

/** Home-style welcome band with full-width banner image below (bristan.com home). */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const isEditing = useEditingMode();
  const styles = styleString(params.styles);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { RenderingIdentifier: id } = params;
  const { title, description, image, ctaLink } = resolveHeroFields(fields);

  if (!fields && isEditing) {
    return (
      <section className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </section>
    );
  }

  return (
    <section className={`component hero-banner ${styles}`} id={id}>
      <div className="hero-banner__welcome">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <HeroTitle field={title} isEditing={isEditing} className="hero-banner__title" />
          <HeroDescription field={description} isEditing={isEditing} />
          <div className="hero-banner__actions">
            <HeroCta
              withPlaceholder={withPlaceholder}
              searchBarPlaceholderKey={searchBarPlaceholderKey}
              rendering={rendering}
              ctaLink={ctaLink}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>

      <HeroMedia image={image} isEditing={isEditing} />
    </section>
  );
};

/** Category-style hero with title over lifestyle image (bristan.com showers/taps pages). */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const isEditing = useEditingMode();
  const styles = styleString(params.styles);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const { RenderingIdentifier: id } = params;
  const { title, description, image, ctaLink } = resolveHeroFields(fields);

  if (!fields && isEditing) {
    return (
      <section className={`component hero-banner hero-banner--category ${styles}`} id={id}>
        [HERO BANNER]
      </section>
    );
  }

  const src = image?.value?.src || HERO_FALLBACK.imageSrc;
  const alt = String(image?.value?.alt || HERO_FALLBACK.imageAlt);

  return (
    <section className={`component hero-banner hero-banner--category ${styles}`} id={id}>
      <div className="hero-banner__media">
        {isEditing ? (
          <ContentSdkImage
            field={image}
            className="block h-auto max-h-[320px] w-full object-cover md:max-h-[400px]"
            priority
          />
        ) : (
          <img src={src} alt={alt} />
        )}
        <div className="hero-banner__overlay">
          <HeroTitle field={title} isEditing={isEditing} className="hero-banner__category-title" />
        </div>
      </div>

      <div className="hero-banner__intro">
        <div className="container mx-auto px-4">
          <HeroDescription field={description} isEditing={isEditing} />
          <div className="hero-banner__actions">
            <HeroCta
              withPlaceholder={withPlaceholder}
              searchBarPlaceholderKey={searchBarPlaceholderKey}
              rendering={rendering}
              ctaLink={ctaLink}
              isEditing={isEditing}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export type { Fields as HeroBannerFields };
