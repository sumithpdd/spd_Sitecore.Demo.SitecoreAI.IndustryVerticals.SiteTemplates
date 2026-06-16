'use client';

import type { JSX } from 'react';
import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  TextField,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  Image as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  hasLinkValue,
  imageSrc,
  linkHref,
  linkLabel,
  richTextFieldValue,
  textFieldValue,
} from '@/lib/lyvera-field-utils';
import { LYVERA_BANNER_WHY_DEFAULT, LYVERA_HERO_DEFAULT } from '@/lib/lyvera-defaults';

export interface LyveraBannerFields {
  Title?: TextField;
  Description?: RichTextField;
  BackgroundImage?: ImageField;
  BackgroundVideo?: LinkField;
  CtaLink?: LinkField;
}

export type LyveraBannerProps = ComponentProps & {
  fields?: LyveraBannerFields;
};

type BannerShellProps = LyveraBannerProps & {
  children: ReactNode;
  className?: string;
};

function videoMimeType(url: string): string | undefined {
  const path = url.split('?')[0]?.toLowerCase() ?? '';
  if (path.endsWith('.webm')) return 'video/webm';
  if (path.endsWith('.mp4')) return 'video/mp4';
  return undefined;
}

function BannerMedia({
  fields,
  isEditing,
}: {
  fields: LyveraBannerFields;
  isEditing: boolean;
}): JSX.Element {
  const videoUrl = linkHref(fields.BackgroundVideo);
  const hasVideo = Boolean(videoUrl);
  const hasImage = Boolean(fields.BackgroundImage?.value?.src);
  const posterSrc = imageSrc(fields.BackgroundImage, LYVERA_HERO_DEFAULT.image);
  const showImageLayer = !hasVideo || isEditing;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;
    void video.play().catch(() => undefined);
  }, [videoUrl]);

  return (
    <div
      className={['lyvera-banner__media', hasVideo ? 'lyvera-banner__media--video' : '']
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {showImageLayer && (
        <>
          {(hasImage || isEditing) && (
            <ContentSdkImage field={fields.BackgroundImage} className="lyvera-banner__image" />
          )}
          {!hasImage && !isEditing && (
            <img
              src={posterSrc}
              alt=""
              className="lyvera-banner__image lyvera-banner__image--fallback"
            />
          )}
        </>
      )}
      {hasVideo && !showImageLayer && !hasImage && posterSrc && (
        <img
          src={posterSrc}
          alt=""
          className="lyvera-banner__image lyvera-banner__image--fallback"
        />
      )}
      {hasVideo ? (
        <video
          ref={videoRef}
          className="lyvera-banner__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={posterSrc}
        >
          <source
            src={videoUrl}
            {...(videoMimeType(videoUrl) ? { type: videoMimeType(videoUrl) } : {})}
          />
        </video>
      ) : null}
    </div>
  );
}

function BannerShell({
  fields,
  params,
  children,
  className,
  isEditing,
}: BannerShellProps & { isEditing: boolean }): JSX.Element {
  const styles = params?.styles ?? '';
  const id = params?.RenderingIdentifier;
  const hasVideo = Boolean(linkHref(fields?.BackgroundVideo));

  return (
    <section
      className={[
        'component lyvera-banner',
        className,
        styles,
        hasVideo ? 'lyvera-banner--has-video' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <BannerMedia fields={fields ?? {}} isEditing={isEditing} />
      <div className="lyvera-banner__overlay" />
      {styles.includes('lyvera-banner-tricolor') && (
        <div className="lyvera-banner__tricolor" aria-hidden />
      )}
      <div className="lyvera-banner__content">{children}</div>
    </section>
  );
}

/** Full-bleed video/image hero with centred title and coral CTA */
export const Default = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const ctaLink = fields.CtaLink;
  const title = textFieldValue(fields.Title) || LYVERA_HERO_DEFAULT.title;
  const fallbackCta = useMemo(
    () => ({
      value: {
        href: linkHref(ctaLink, LYVERA_HERO_DEFAULT.ctaHref),
        text: linkLabel(ctaLink, LYVERA_HERO_DEFAULT.ctaText),
      },
    }),
    [ctaLink]
  );

  return (
    <BannerShell {...props} className="lyvera-banner--hero" isEditing={isEditing}>
      {isEditing ? (
        <ContentSdkText field={fields.Title} tag="h1" className="lyvera-banner__title" />
      ) : (
        <h1 className="lyvera-banner__title">{title}</h1>
      )}
      {isEditing ? (
        <ContentSdkLink field={ctaLink ?? fallbackCta} className="lyvera-banner__cta" />
      ) : hasLinkValue(ctaLink) ? (
        <ContentSdkLink field={ctaLink!} className="lyvera-banner__cta" />
      ) : (
        <a href={LYVERA_HERO_DEFAULT.ctaHref} className="lyvera-banner__cta">
          {LYVERA_HERO_DEFAULT.ctaText}
        </a>
      )}
    </BannerShell>
  );
};

/** Full-bleed background image with centred title and body — no CTA */
export const BackgroundText = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const styles = [props.params?.styles, 'lyvera-banner-tricolor'].filter(Boolean).join(' ');
  const title = textFieldValue(fields.Title) || LYVERA_BANNER_WHY_DEFAULT.title;

  return (
    <BannerShell
      {...props}
      className="lyvera-banner--background-text"
      params={{ ...props.params, styles }}
      isEditing={isEditing}
    >
      {isEditing ? (
        <ContentSdkText
          field={fields.Title}
          tag="h2"
          className="lyvera-banner__title lyvera-banner__title--sm"
        />
      ) : (
        <h2 className="lyvera-banner__title lyvera-banner__title--sm">{title}</h2>
      )}
      {isEditing ? (
        <ContentSdkRichText field={fields.Description} className="lyvera-banner__body" tag="div" />
      ) : richTextFieldValue(fields.Description) ? (
        <ContentSdkRichText field={fields.Description} className="lyvera-banner__body" tag="div" />
      ) : (
        <p className="lyvera-banner__body">{LYVERA_BANNER_WHY_DEFAULT.body}</p>
      )}
    </BannerShell>
  );
};
