'use client';

import { useEffect, useRef } from 'react';
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

function mediaSrc(field?: ImageField): string {
  const value = field?.value as { src?: string } | undefined;
  const json = (field as { jsonValue?: { value?: { src?: string } } } | undefined)?.jsonValue
    ?.value;
  return value?.src || json?.src || '';
}

export const Default = ({ params, fields }: HeroBannerProps) => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = params;
  const isPageEditing = Boolean(page?.mode?.isEditing);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = mediaSrc(fields?.Video) || HOME_HERO.video;
  const posterSrc = mediaSrc(fields?.Image);
  const hasVideo = Boolean(videoSrc);

  useEffect(() => {
    if (!hasVideo || !videoRef.current) {
      return;
    }
    const player = videoRef.current;
    player.muted = true;
    const play = () => {
      void player.play().catch(() => undefined);
    };
    play();
    player.addEventListener('canplay', play);
    return () => player.removeEventListener('canplay', play);
  }, [hasVideo, videoSrc]);

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

  return (
    <div
      className={`component hero-banner pm-hero relative flex w-full items-center py-24 ${hasVideo ? 'pm-hero--video' : ''} ${styles}`}
      id={id}
      style={{ width, minHeight: height }}
    >
      <div className="absolute inset-0 z-1 overflow-hidden">
        {hasVideo ? (
          <video
            ref={videoRef}
            className="pm-hero__video"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        {!hasVideo ? (
          <ContentSdkImage field={fields.Image} className="h-full w-full object-cover" priority />
        ) : isPageEditing ? (
          <div className="absolute bottom-4 left-4 z-4 w-36 overflow-hidden rounded border border-white/40">
            <ContentSdkImage field={fields.Image} className="h-20 w-full object-cover" />
          </div>
        ) : null}
      </div>
      <div
        className={`pm-hero__overlay absolute inset-0 z-2 bg-linear-to-r ${
          hasVideo ? 'from-black/70 to-black/20' : 'from-background/80 to-background/20'
        }`}
      ></div>

      <div className="pm-wrap relative z-3 flex flex-col items-start justify-center">
        <h1 className="text-foreground max-w-3xl text-left">
          <ContentSdkText field={fields.Title} />
          {!fields.Title?.value && HOME_HERO.title}
        </h1>

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
