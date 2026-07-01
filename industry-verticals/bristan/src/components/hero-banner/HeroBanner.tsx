import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { IGQLField } from '@/types/igql';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

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

const styleString = (styles: unknown): string => (typeof styles === 'string' ? styles : '');

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

const HeroBannerCommon = ({
  params,
  fields,
  children,
}: HeroBannerProps & {
  children: React.ReactNode;
}) => {
  const { page } = useSitecore();
  const { RenderingIdentifier: id } = params;
  const styles = styleString(params.styles);
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles.includes(HeroBannerStyles.HideGradientOverlay);
  const imageField = pickSdkField(fields.Image);
  const videoField = pickSdkField(fields.Video);

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component hero-banner ${styles} relative flex items-center`} id={id}>
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {!isPageEditing && videoField?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={imageField?.value?.src}
          >
            <source src={videoField.value.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={imageField}
              className="h-full w-full object-cover md:object-bottom"
              priority
            />
          </>
        )}
        {/* Gradient overlay to fade image/video at bottom */}
        {!hideGradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-85% to-white"></div>
        )}
      </div>

      {children}
    </div>
  );
};

export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = styleString(params.styles);
  const title = pickSdkField(fields.Title);
  const description = pickSdkField(fields.Description);
  const ctaLink = pickSdkField(fields.CtaLink);
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`flex min-h-238 w-full py-10 lg:w-1/2 lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-182">
              <div className={clsx({ shim: screenLayer })}>
                {/* Title */}
                <h1 className="text-center text-5xl leading-[110%] font-bold capitalize md:text-7xl md:leading-[130%] lg:text-left xl:text-[80px]">
                  <ContentSdkText field={title} />
                  {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch] lg:mx-0" />}
                </h1>

                {/* Description */}
                <div className="mt-7 text-xl md:text-2xl">
                  <ContentSdkRichText field={description} className="text-center lg:text-left" />
                </div>

                {/* CTA Link or Placeholder */}
                <div className="mt-6 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={ctaLink ?? fields.CtaLink} className="arrow-btn" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const styles = styleString(params.styles);
  const title = pickSdkField(fields.Title);
  const description = pickSdkField(fields.Description);
  const ctaLink = pickSdkField(fields.CtaLink);
  const hideAccentLine = styles.includes(CommonStyles.HideAccentLine);
  const withPlaceholder = styles.includes(HeroBannerStyles.WithPlaceholder);
  const reverseLayout = styles.includes(LayoutStyles.Reversed);
  const screenLayer = styles.includes(HeroBannerStyles.ScreenLayer);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto flex min-h-238 justify-center px-4">
          <div
            className={`flex flex-col items-center py-10 lg:py-44 ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            <div className={clsx({ shim: screenLayer })}>
              {/* Title */}
              <h1 className="text-center text-5xl leading-[110%] font-bold capitalize md:text-7xl md:leading-[130%] xl:text-[80px]">
                <ContentSdkText field={title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch]" />}
              </h1>

              {/* Description */}
              <div className="mt-7 text-xl md:text-2xl">
                <ContentSdkRichText field={description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={ctaLink ?? fields.CtaLink} className="arrow-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
