import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import AccentLine from '@/assets/icons/accent-line/AccentLine';
import { ExploreLink } from '../non-sitecore/ExploreLink';

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
  const hideGradientOverlay = isParamEnabled(params.HideGradientOverlay);

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
            className="w-full h-full object-cover"
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
              className="w-full h-full object-cover md:object-bottom"
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
  const hideAccentLine = isParamEnabled(params.HideAccentLine);
  const withPlaceholder = isParamEnabled(params.WithPlaceholder);
  const reverseLayout = isParamEnabled(params.ReverseLayout);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4">
          <div
            className={`min-h-238 w-full py-10 lg:w-1/2 flex lg:items-center ${reverseLayout ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          >
            <div className="max-w-182">
              {/* Title */}
              <h1 className="text-5xl md:text-7xl xl:text-[80px] font-bold capitalize leading-[110%] md:leading-[130%] text-center lg:text-left">
                <ContentSdkText field={fields.Title} />
                {!hideAccentLine && <AccentLine className="w-[9ch] !h-5 mx-auto lg:mx-0" />}
              </h1>

              {/* Description */}
              <div className="mt-7 text-xl md:text-2xl">
                <ContentSdkRichText
                  field={fields.Description}
                  className="text-center lg:text-left"
                />
              </div>

              {/* CTA Link or Placeholder */}
              <div className="mt-6 flex justify-center lg:justify-start w-full">
                {withPlaceholder ? (
                  <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
                ) : (
                  <ExploreLink linkText={fields.CtaLink} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};

export const TopContent = ({ params, fields, rendering }: HeroBannerProps) => {
  const hideAccentLine = isParamEnabled(params.HideAccentLine);
  const withPlaceholder = isParamEnabled(params.WithPlaceholder);
  const reverseLayout = isParamEnabled(params.ReverseLayout);
  const searchBarPlaceholderKey = `hero-banner-search-bar-${params.DynamicPlaceholderId}`;

  return (
    <HeroBannerCommon params={params} fields={fields} rendering={rendering}>
      {/* Content Container */}
      <div className="relative w-full">
        <div className="container mx-auto px-4 flex justify-center min-h-238 ">
          <div
            className={`flex flex-col items-center py-10 lg:py-44  ${reverseLayout ? 'justify-end' : 'justify-start'}`}
          >
            {/* Title */}
            <h1 className="text-5xl md:text-7xl xl:text-[80px] font-bold capitalize leading-[110%] md:leading-[130%] text-center">
              <ContentSdkText field={fields.Title} />
              {!hideAccentLine && (
                <AccentLine className="w-[9ch] !h-5 mx-auto lg:mx-0 lg:ml-auto" />
              )}
            </h1>

            {/* Description */}
            <div className="mt-7 text-xl md:text-2xl">
              <ContentSdkRichText field={fields.Description} className="text-center" />
            </div>

            {/* CTA Link or Placeholder */}
            <div className="mt-6 flex justify-center w-full">
              {withPlaceholder ? (
                <Placeholder name={searchBarPlaceholderKey} rendering={rendering} />
              ) : (
                <ExploreLink linkText={fields.CtaLink} />
              )}
            </div>
          </div>
        </div>
      </div>
    </HeroBannerCommon>
  );
};
