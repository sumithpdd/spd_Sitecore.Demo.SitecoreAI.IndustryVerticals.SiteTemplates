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
import { HOME_HERO } from '@/lib/home-catalog';

interface Fields {
  Image: ImageField;
  Video: ImageField;
  Title: Field<string>;
  Description: Field<string>;
  CtaLink: LinkField;
  SecondaryCtaLink: LinkField;
  Width?: Field<string>;
  Height?: Field<string>;
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

  const width = fields.Width?.value || '100%';
  const height = fields.Height?.value || '28rem';
  const videoSrc = fields.Video?.value?.src || HOME_HERO.video;
  const hasVideo = Boolean(videoSrc);
  const videoType = videoSrc.match(/\.webm(\?|$)/i) ? 'video/webm' : 'video/mp4';

  return (
    <div
      className={`component hero-banner pm-hero relative flex w-full items-center py-24 ${hasVideo && !isPageEditing ? 'pm-hero--video' : ''} ${styles}`}
      id={id}
      style={{ width, minHeight: height }}
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-1">
        {!isPageEditing && hasVideo ? (
          <video
            className="pm-hero__video h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            role="presentation"
            poster={fields.Image?.value?.src}
          >
            <source src={videoSrc} type={videoType} />
            Your browser does not support the video tag.
          </video>
        ) : (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        )}
      </div>
      <div
        className={`pm-hero__overlay absolute inset-0 z-2 bg-linear-to-r ${
          hasVideo && !isPageEditing
            ? 'from-black/70 to-black/20'
            : 'from-background/80 to-background/20'
        }`}
      ></div>

      {/* Content Container */}
      <div className="pm-wrap relative z-3 flex flex-col items-start justify-center">
        <h1 className="text-foreground max-w-3xl text-left">
          <ContentSdkText field={fields.Title} />
          {!fields.Title?.value && HOME_HERO.title}
        </h1>

        {/* Description/Tagline */}
        <div className="pm-hero__lede text-foreground-muted mt-4 max-w-2xl text-xl">
          <ContentSdkRichText field={fields.Description} />
          {!fields.Description?.value && HOME_HERO.lede}
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

export const Campaign = (props: HeroBannerProps) => <Default {...props} />;
export const Article = (props: HeroBannerProps) => <Default {...props} />;
export const Industry = (props: HeroBannerProps) => <Default {...props} />;
