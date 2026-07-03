import {
  Field,
  ImageField,
  LinkField,
  Link,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { HeroBannerStyles } from '@/types/styleFlags';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

type MaybeWrappedField<T> = T | { jsonValue?: T | null };

/** Unwrap EE / IGQL `{ jsonValue }` fields to flat SDK field shape. */
function pickField<T>(field?: MaybeWrappedField<T>): T | undefined {
  if (!field || typeof field !== 'object') {
    return undefined;
  }

  if ('jsonValue' in field) {
    return (field as { jsonValue?: T | null }).jsonValue ?? undefined;
  }

  return field as T;
}


function getValidCtaLink(field?: LinkField): LinkField | undefined {
  const link = pickField(field);
  return link?.value?.href ? link : undefined;
}

/** Serialized bristan hero items still point at this broken external URL. */
const BROKEN_CMS_IMAGE_SRC = 'https://www.bristan.com/-/media/images/homepage/banner/banner-1.ashx';

const FALLBACK_IMAGE: ImageField = {
  value: {
    src: '/images/hero/banner-1.jpg',
    alt: "Welcome to the UK's Number One Taps and Showers Brand",
    width: 1920,
    height: 720,
  },
};

function resolveHeroImage(image?: ImageField): ImageField {
  const src = image?.value?.src;
  const fallbackAlt = FALLBACK_IMAGE.value?.alt ?? '';

  if (!src || src === BROKEN_CMS_IMAGE_SRC) {
    return {
      value: {
        src: FALLBACK_IMAGE.value?.src ?? '/images/hero/banner-1.jpg',
        alt: image?.value?.alt || fallbackAlt,
        width: FALLBACK_IMAGE.value?.width ?? 1920,
        height: FALLBACK_IMAGE.value?.height ?? 720,
      },
    };
  }

  return image;
}

const HeroBannerCommon = ({
  params,
  fields,
  children,
  topContent,
}: HeroBannerProps & { children: React.ReactNode; topContent?: boolean }) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner min-h-screen ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <section
      className={`component hero-banner ${styles}${topContent ? 'hero-banner--category' : ''}`}
      id={id}
    >
      {children}
    </section>
  );
};

/* ------------------- Default (welcome band + banner) ------------------- */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const title = pickField(fields.Title);
  const description = pickField(fields.Description);
  const ctaLink = getValidCtaLink(fields.CtaLink);
  const image = resolveHeroImage(pickField(fields.Image));

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      <div className="hero-banner__welcome">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <h1 className="hero-banner__title">
            <ContentSdkText field={title} />
          </h1>

          <div className="hero-banner__description">
            <ContentSdkRichText field={description} />
          </div>

          <div className="hero-banner__actions">
            {withPlaceholder ? (
              <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
            ) : (
              ctaLink && <Link field={ctaLink} className="hero-banner__cta" />
            )}
          </div>
        </div>
      </div>

      <div className="hero-banner__media">
        <ContentSdkImage field={image} priority />
      </div>
    </HeroBannerCommon>
  );
};

/* ------------------- TopContent (category overlay) ------------------- */
export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = params.styles || '';
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;
  const title = pickField(fields.Title);
  const description = pickField(fields.Description);
  const ctaLink = getValidCtaLink(fields.CtaLink);
  const image = resolveHeroImage(pickField(fields.Image));

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering} topContent>
      <div className="hero-banner__media">
        <ContentSdkImage field={image} priority />
        <div className="hero-banner__overlay">
          <h1 className="hero-banner__category-title">
            <ContentSdkText field={title} />
          </h1>
        </div>
      </div>

      <div className="hero-banner__intro">
        <div className="container mx-auto px-4">
          <div className="hero-banner__description">
            <ContentSdkRichText field={description} />
          </div>

          <div className="hero-banner__actions">
            {withPlaceholder ? (
              <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
            ) : (
              ctaLink && <Link field={ctaLink} className="hero-banner__cta" />
            )}
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
