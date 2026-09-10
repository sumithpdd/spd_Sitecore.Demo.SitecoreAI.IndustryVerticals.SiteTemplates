import {
  Field,
  ImageField,
  LinkField,
  NextImage as ContentSdkImage,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
  Link,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink: LinkField;
}

interface HeroBannerProps extends ComponentProps {
  fields: Fields;
}

export const Default = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = page.mode.isEditing;

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
    <div
      className={`component hero-banner pm-hero relative flex min-h-[28rem] items-center py-24 ${styles}`}
      id={id}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-1">
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
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
      </div>
      {/* Light overlay so charcoal headline stays readable on photography */}
      <div className="from-background/80 to-background/20 absolute inset-0 z-2 bg-linear-to-r"></div>

      {/* Content Container */}
      <div className="pm-wrap relative z-3 flex flex-col items-start justify-center">
        <h1 className="text-foreground max-w-3xl text-left">
          <ContentSdkText field={fields.Title} />
        </h1>

        {/* Description/Tagline - white text */}
        <div className="text-foreground-muted mt-4 max-w-2xl text-xl">
          <ContentSdkRichText field={fields.Description} />
        </div>

        {(fields?.CtaLink || fields?.SecondaryCtaLink) && (
          <div className="mt-8 flex flex-wrap justify-start gap-4">
            {fields?.CtaLink && <Link field={fields.CtaLink} className="pm-btn main-btn" />}
            {fields?.SecondaryCtaLink && (
              <Link field={fields.SecondaryCtaLink} className="secondary-btn" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
