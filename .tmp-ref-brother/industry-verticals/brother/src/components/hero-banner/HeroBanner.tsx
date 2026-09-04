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
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';
import clsx from 'clsx';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  // Additional fields for Brother variant
  Tagline?: Field<string>;
  SecondaryCtaLink?: LinkField;
  SecondaryCtaText?: Field<string>;
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
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;
  const hideGradientOverlay = styles?.includes(HeroBannerStyles.HideGradientOverlay);

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
        {!isPageEditing && fields?.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video?.value?.src} type="video/webm" />
          </video>
        ) : (
          <>
            <ContentSdkImage
              field={fields.Image}
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
  const styles = params.styles || '';
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
                  <ContentSdkText field={fields.Title} />
                  {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch] lg:mx-0" />}
                </h1>

                {/* Description */}
                <div className="mt-7 text-xl md:text-2xl">
                  <ContentSdkRichText
                    field={fields.Description}
                    className="text-center lg:text-left"
                  />
                </div>

                {/* CTA Link or Placeholder */}
                <div className="mt-6 flex w-full justify-center lg:justify-start">
                  {withPlaceholder ? (
                    <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                  ) : (
                    <Link field={fields.CtaLink} className="arrow-btn" />
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
  const styles = params.styles || '';
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
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="mx-auto !h-5 w-[9ch]" />}
              </h1>

              {/* Description */}
              <div className="mt-7 text-xl md:text-2xl">
                <ContentSdkRichText field={fields.Description} className="text-center" />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex w-full justify-center">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <Link field={fields.CtaLink} className="arrow-btn" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

// Brother Hero variant - "More time for life" style with dark overlay
export const Brother = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isEditing = page.mode.isEditing;

  if (!fields) {
    return isEditing ? (
      <div className={`component hero-banner hero-brother ${styles}`} id={id}>
        [BROTHER HERO - Add content in Experience Editor]
      </div>
    ) : null;
  }

  return (
    <section
      className={`component hero-banner hero-brother relative flex min-h-[500px] items-center overflow-hidden ${styles}`}
      id={id}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {!isEditing && fields.Video?.value?.src ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={fields.Image?.value?.src}
          >
            <source src={fields.Video.value.src} type="video/mp4" />
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-xl text-white">
          {/* Tagline */}
          {fields.Tagline?.value && (
            <p className="mb-2 text-lg font-medium text-[#ff6600]">
              <ContentSdkText field={fields.Tagline} />
            </p>
          )}

          {/* Title */}
          <h1 className="mb-4 text-5xl leading-tight font-bold md:text-6xl">
            <ContentSdkText field={fields.Title} />
          </h1>

          {/* Description */}
          {fields.Description?.value && (
            <div className="mb-6 text-lg text-white/90">
              <ContentSdkRichText field={fields.Description} />
            </div>
          )}

          {/* CTAs */}
          <div className="mt-8 flex gap-4">
            {fields.CtaLink?.value?.href && (
              <Link
                field={fields.CtaLink}
                className="bg-accent hover:bg-accent-dark group inline-flex items-center gap-2 rounded px-8 py-4 font-medium text-white transition-colors"
              >
                <span>View more</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            )}

            {fields.SecondaryCtaLink?.value?.href && (
              <Link
                field={fields.SecondaryCtaLink}
                className="hover:text-foreground inline-flex items-center gap-2 rounded border border-white bg-white/10 px-8 py-4 font-medium text-white transition-colors hover:bg-white"
              >
                <ContentSdkText field={fields.SecondaryCtaText} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Compact Hero variant - smaller hero for category pages
export const Compact = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;

  if (!fields) {
    return page.mode.isEditing ? (
      <div className={`component hero-banner hero-compact ${styles}`} id={id}>
        [COMPACT HERO - Add content in Experience Editor]
      </div>
    ) : null;
  }

  return (
    <section
      className={`component hero-banner hero-compact relative flex min-h-[300px] items-center ${styles}`}
      id={id}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        <div className="from-accent/90 to-accent/70 absolute inset-0 bg-gradient-to-r" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <ContentSdkText field={fields.Title} />
        </h1>
        {fields.Description?.value && (
          <div className="max-w-2xl text-lg text-white/90">
            <ContentSdkRichText field={fields.Description} />
          </div>
        )}
      </div>
    </section>
  );
};

// Split Hero variant - image on one side, content on other
export const Split = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const reverseLayout = styles?.includes(LayoutStyles.Reversed);

  if (!fields) {
    return page.mode.isEditing ? (
      <div className={`component hero-banner hero-split ${styles}`} id={id}>
        [SPLIT HERO - Add content in Experience Editor]
      </div>
    ) : null;
  }

  return (
    <section className={`component hero-banner hero-split ${styles}`} id={id}>
      <div
        className={clsx('grid min-h-[500px] lg:grid-cols-2', reverseLayout && 'lg:direction-rtl')}
      >
        {/* Content Side */}
        <div className="bg-background-muted lg:direction-ltr flex items-center p-8 lg:p-16">
          <div className="max-w-lg">
            {fields.Tagline?.value && (
              <p className="text-accent mb-2 text-lg font-medium">
                <ContentSdkText field={fields.Tagline} />
              </p>
            )}

            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              <ContentSdkText field={fields.Title} />
            </h1>

            {fields.Description?.value && (
              <div className="text-foreground-light mb-6 text-lg">
                <ContentSdkRichText field={fields.Description} />
              </div>
            )}

            {fields.CtaLink?.value?.href && (
              <Link
                field={fields.CtaLink}
                className="bg-accent hover:bg-accent-dark inline-flex items-center gap-2 rounded px-6 py-3 font-medium text-white transition-colors"
              >
                View more →
              </Link>
            )}
          </div>
        </div>

        {/* Image Side */}
        <div className="lg:direction-ltr relative">
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
};
