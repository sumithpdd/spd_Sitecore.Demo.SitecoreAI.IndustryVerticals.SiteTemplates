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

/**
 * Visit London Hero Banner
 * Matches visitlondon.com design structure with responsive images and USPs
 */
export const Default = ({ params, fields, rendering }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = params;
  const isPageEditing = page.mode.isEditing;
  const searchBarPlaceholderKey = `hero-banner-search-${DynamicPlaceholderId}`;

  if (!fields) {
    return isPageEditing ? (
      <div className={`component hero-banner hero-banner-visitlondon ${styles}`} id={id}>
        [HERO BANNER]
      </div>
    ) : (
      <></>
    );
  }

  // Use image from field
  const imageSrc = fields.Image?.value?.src || '';
  const imageAlt = String(fields.Image?.value?.alt || 'London skyline at dusk');

  return (
    <div className={`component hero-banner hero-banner-visitlondon ${styles}`} id={id}>
      <div className="hero-section-homepage cf has-mobile">
        {/* Responsive Picture Element */}
        <picture>
          <source srcSet={imageSrc} media="(min-width:1020px)" />
          <source srcSet={imageSrc} media="(min-width:660px)" />
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-full w-full object-cover"
            width={1920}
            height={582}
            fetchPriority="high"
          />
        </picture>

        {/* Overlay with Content */}
        <div className="overlay">
          <div className="gw">
            <div className="heading">
              <h1>
                <ContentSdkText field={fields.Title} />
              </h1>
            </div>
            <div className="insert">
              {/* Search/Dropdown Placeholder */}
              <div className="herodropdown">
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              </div>
            </div>
          </div>
        </div>

        {/* Hardcoded USPs Section */}
        <div>
          <div className="below-hero-usps">
            <div className="gw cw1600">
              <div className="box">
                <h2>
                  <span>London's Official Visitor Guide</span>
                </h2>

                <div className="usp">
                  <div className="icon">
                    <img
                      src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9b698b438fc14b8382f70280a34c9801?v=dacf6822"
                      alt=""
                    />
                  </div>
                  <p>
                    Inspiring <strong>22 million</strong> people each year
                  </p>
                </div>

                <div className="usp">
                  <div className="icon">
                    <img
                      src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9b698b438fc14b8382f70280a34c9801?v=dacf6822"
                      alt=""
                    />
                  </div>
                  <p>
                    <strong>Book easily</strong> via our trusted partners
                  </p>
                </div>

                <div className="usp">
                  <div className="icon">
                    <img
                      src="https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9b698b438fc14b8382f70280a34c9801?v=dacf6822"
                      alt=""
                    />
                  </div>
                  <p>
                    Your purchases&nbsp;<strong>support jobs in London</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

