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

function BannerMedia({ fields }: { fields: LyveraBannerFields }): JSX.Element {
  const videoUrl = linkHref(fields.BackgroundVideo);
  const desktopImage = imageSrc(fields.BackgroundImage, LYVERA_HERO_DEFAULT.image);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;
    void video.play().catch(() => undefined);
  }, [videoUrl]);

  return (
    <div className="lyvera-banner__media" aria-hidden>
      <ContentSdkImage field={fields.BackgroundImage} className="lyvera-banner__image" />
      {!fields.BackgroundImage?.value?.src && (
        <img
          src={desktopImage}
          alt=""
          className="lyvera-banner__image lyvera-banner__image--fallback"
        />
      )}
      {videoUrl ? (
        <video
          ref={videoRef}
          className="lyvera-banner__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={desktopImage}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

function BannerShell({ fields, params, children, className }: BannerShellProps): JSX.Element {
  const styles = params?.styles ?? '';
  const id = params?.RenderingIdentifier;

  return (
    <section
      className={['component lyvera-banner', className, styles].filter(Boolean).join(' ')}
      id={id}
    >
      <BannerMedia fields={fields ?? {}} />
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
  const showCta = hasLinkValue(ctaLink) || isEditing;
  const fallbackCta = useMemo(
    () => ({
      value: { href: LYVERA_HERO_DEFAULT.ctaHref, text: LYVERA_HERO_DEFAULT.ctaText },
    }),
    []
  );

  return (
    <BannerShell {...props} className="lyvera-banner--hero">
      {(textFieldValue(fields.Title) || isEditing) && (
        <ContentSdkText field={fields.Title} tag="h1" className="lyvera-banner__title" />
      )}
      {!textFieldValue(fields.Title) && !isEditing && (
        <h1 className="lyvera-banner__title">{LYVERA_HERO_DEFAULT.title}</h1>
      )}
      {showCta &&
        (hasLinkValue(ctaLink) ? (
          <ContentSdkLink field={ctaLink!} className="lyvera-banner__cta" />
        ) : isEditing ? (
          <ContentSdkLink field={fallbackCta} className="lyvera-banner__cta" />
        ) : (
          <a href={LYVERA_HERO_DEFAULT.ctaHref} className="lyvera-banner__cta">
            {LYVERA_HERO_DEFAULT.ctaText}
          </a>
        ))}
    </BannerShell>
  );
};

/** Full-bleed background image with centred title and body — no CTA */
export const BackgroundText = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const styles = [props.params?.styles, 'lyvera-banner-tricolor'].filter(Boolean).join(' ');

  return (
    <BannerShell
      {...props}
      className="lyvera-banner--background-text"
      params={{ ...props.params, styles }}
    >
      {(textFieldValue(fields.Title) || isEditing) && (
        <ContentSdkText
          field={fields.Title}
          tag="h2"
          className="lyvera-banner__title lyvera-banner__title--sm"
        />
      )}
      {!textFieldValue(fields.Title) && !isEditing && (
        <h2 className="lyvera-banner__title lyvera-banner__title--sm">
          {LYVERA_BANNER_WHY_DEFAULT.title}
        </h2>
      )}
      {(richTextFieldValue(fields.Description) || isEditing) && (
        <ContentSdkRichText field={fields.Description} className="lyvera-banner__body" tag="div" />
      )}
      {!richTextFieldValue(fields.Description) && !isEditing && (
        <p className="lyvera-banner__body">{LYVERA_BANNER_WHY_DEFAULT.body}</p>
      )}
    </BannerShell>
  );
};
