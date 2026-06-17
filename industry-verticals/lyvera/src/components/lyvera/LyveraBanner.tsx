'use client';

import type { JSX } from 'react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
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
import {
  KP_ABOUT_DEFAULT,
  KP_HERO_DEFAULT,
  WIMBLEDON_EVENT_DEFAULT,
} from '@/lib/keith-prowse-defaults';
import { isKeithProwseSite } from '@/lib/lyveragroup-site';
import { findBrandPageByPath } from '@/lib/lyvera-brand-pages';
import { LYVERA_BLOG_LISTING } from '@/lib/lyvera-blog-content';
import { getPublicItemPath } from '@/lib/lyvera-sites';
import { normalizeSxaStyles } from '@/lib/sxa-styles';

export interface LyveraBannerFields {
  Title?: TextField;
  Description?: RichTextField;
  BackgroundImage?: ImageField;
  BackgroundVideo?: LinkField;
  CtaLink?: LinkField;
  Eyebrow?: TextField;
  EventDate?: TextField;
  EventVenue?: TextField;
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
  const isKp = isKeithProwseSite(page);
  const fields = props.fields ?? {};
  const ctaLink = fields.CtaLink;
  const title =
    textFieldValue(fields.Title) || (isKp ? KP_HERO_DEFAULT.title : LYVERA_HERO_DEFAULT.title);
  const subtitle = richTextFieldValue(fields.Description) || (isKp ? KP_HERO_DEFAULT.subtitle : '');
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
    <BannerShell
      {...props}
      className={isKp ? 'lyvera-banner--hero lyvera-banner--kp-hero' : 'lyvera-banner--hero'}
      isEditing={isEditing}
    >
      {isEditing ? (
        <ContentSdkText field={fields.Title} tag="h1" className="lyvera-banner__title" />
      ) : (
        <h1 className="lyvera-banner__title">{title}</h1>
      )}
      {isKp && (subtitle || isEditing) && (
        <>
          {isEditing ? (
            <ContentSdkRichText
              field={fields.Description}
              className="lyvera-banner__subtitle"
              tag="p"
            />
          ) : (
            <p className="lyvera-banner__subtitle">{subtitle.replace(/<[^>]*>/g, '')}</p>
          )}
        </>
      )}
      {!isKp &&
        (isEditing ? (
          <ContentSdkLink field={ctaLink ?? fallbackCta} className="lyvera-banner__cta" />
        ) : hasLinkValue(ctaLink) ? (
          <ContentSdkLink field={ctaLink!} className="lyvera-banner__cta" />
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
  const isKp = isKeithProwseSite(page);
  const fields = props.fields ?? {};
  const styles = [props.params?.styles, isKp ? 'lyvera-banner--kp-about' : 'lyvera-banner-tricolor']
    .filter(Boolean)
    .join(' ');
  const title =
    textFieldValue(fields.Title) ||
    (isKp ? KP_ABOUT_DEFAULT.title : LYVERA_BANNER_WHY_DEFAULT.title);
  const bodyHtml =
    richTextFieldValue(fields.Description) ||
    (isKp ? KP_ABOUT_DEFAULT.body : `<p>${LYVERA_BANNER_WHY_DEFAULT.body}</p>`);
  const ctaLink = fields.CtaLink;

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
      ) : (
        <div className="lyvera-banner__body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      )}
      {isKp &&
        (hasLinkValue(ctaLink) || isEditing ? (
          <ContentSdkLink field={ctaLink!} className="lyvera-kp-pill lyvera-banner__kp-cta" />
        ) : (
          <a href={KP_ABOUT_DEFAULT.href} className="lyvera-kp-pill lyvera-banner__kp-cta">
            {KP_ABOUT_DEFAULT.cta}
          </a>
        ))}
    </BannerShell>
  );
};

function ShareButton(): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (!url) return;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
        return;
      } catch {
        // fall through to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button type="button" className="lyvera-banner__share" onClick={() => void handleShare()}>
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
}

/** Full-bleed background image with title, share, and optional anchor nav — brand & blog pages */
export const BrandHero = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const publicPath = getPublicItemPath(page);
  const brandPage = findBrandPageByPath(publicPath);
  const isBlogListing = publicPath.replace(/\/$/, '') === '/news-and-blog';

  const title =
    textFieldValue(fields.Title) ||
    brandPage?.title ||
    (isBlogListing ? LYVERA_BLOG_LISTING.title : LYVERA_HERO_DEFAULT.title);

  const fallbackImage = brandPage?.heroImage ?? (isBlogListing ? LYVERA_BLOG_LISTING.image : '');
  const mergedFields: LyveraBannerFields = {
    ...fields,
    BackgroundImage:
      fields.BackgroundImage?.value?.src || isEditing
        ? fields.BackgroundImage
        : fallbackImage
          ? { value: { src: fallbackImage, alt: title } }
          : fields.BackgroundImage,
  };
  const usesPageSectionNav =
    brandPage?.slug === 'gullivers-sports-travel' || brandPage?.slug === 'the-experience-golf';
  const anchors = usesPageSectionNav ? [] : (brandPage?.anchors ?? []);

  return (
    <BannerShell
      {...props}
      fields={mergedFields}
      className="lyvera-banner--brand-hero"
      params={{ ...props.params, styles: normalizeSxaStyles(props.params?.styles) }}
      isEditing={isEditing}
    >
      <div className="lyvera-banner__brand-bar">
        <ShareButton />
      </div>
      {isEditing ? (
        <ContentSdkText field={fields.Title} tag="h1" className="lyvera-banner__title" />
      ) : (
        <h1 className="lyvera-banner__title">{title}</h1>
      )}
      {anchors.length > 0 && (
        <nav className="lyvera-banner__anchors" aria-label="On this page">
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="lyvera-banner__anchor"
              {...(anchor.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {anchor.label}
            </a>
          ))}
        </nav>
      )}
    </BannerShell>
  );
};

/** Brand hero with autoplay background video, share button, and optional watermark */
export const BrandHeroWithVideo = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const publicPath = getPublicItemPath(page);
  const brandPage = findBrandPageByPath(publicPath);

  const title = textFieldValue(fields.Title) || brandPage?.title || LYVERA_HERO_DEFAULT.title;
  const fallbackImage = brandPage?.heroImage ?? '';
  const fallbackVideo = brandPage?.heroVideo ?? '';
  const mergedFields: LyveraBannerFields = {
    ...fields,
    BackgroundImage:
      fields.BackgroundImage?.value?.src || isEditing
        ? fields.BackgroundImage
        : fallbackImage
          ? { value: { src: fallbackImage, alt: title } }
          : fields.BackgroundImage,
    BackgroundVideo:
      hasLinkValue(fields.BackgroundVideo) || isEditing
        ? fields.BackgroundVideo
        : fallbackVideo
          ? { value: { href: fallbackVideo, text: 'Background video' } }
          : fields.BackgroundVideo,
  };

  return (
    <BannerShell
      {...props}
      fields={mergedFields}
      className="lyvera-banner--brand-hero lyvera-banner--brand-hero-video"
      params={{ ...props.params, styles: normalizeSxaStyles(props.params?.styles) }}
      isEditing={isEditing}
    >
      <div className="lyvera-banner__brand-bar">
        <ShareButton />
      </div>
      {isEditing ? (
        <ContentSdkText field={fields.Title} tag="h1" className="lyvera-banner__title" />
      ) : (
        <h1 className="lyvera-banner__title">{title}</h1>
      )}
    </BannerShell>
  );
};

/** Full-bleed background image with centred title, body, and CTA */
export const WithCta = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const ctaLink = fields.CtaLink;
  const title = textFieldValue(fields.Title) || LYVERA_BANNER_WHY_DEFAULT.title;

  return (
    <BannerShell {...props} className="lyvera-banner--with-cta" isEditing={isEditing}>
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
      {(hasLinkValue(ctaLink) || isEditing) &&
        (hasLinkValue(ctaLink) && ctaLink ? (
          <ContentSdkLink field={ctaLink} className="lyvera-banner__cta" />
        ) : (
          <span className="lyvera-banner__cta lyvera-banner__cta--placeholder">Find out more</span>
        ))}
    </BannerShell>
  );
};

/** Two-column title + body on a solid brand background — brand page copy bands */
export const SplitBand = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const styles = normalizeSxaStyles(props.params?.styles);
  const title = textFieldValue(fields.Title);
  const bodyHtml = richTextFieldValue(fields.Description);

  return (
    <section
      className={['component lyvera-banner lyvera-banner--split-band', styles]
        .filter(Boolean)
        .join(' ')}
      id={props.params?.RenderingIdentifier}
    >
      <div className="lyvera-banner__split-inner">
        <div className="lyvera-banner__split-title">
          {(title || isEditing) && (
            <ContentSdkText field={fields.Title} tag="h2" className="lyvera-banner__title" />
          )}
        </div>
        <div className="lyvera-banner__split-body">
          {(bodyHtml || isEditing) && (
            <ContentSdkRichText
              field={fields.Description}
              className="lyvera-banner__body"
              tag="div"
            />
          )}
        </div>
      </div>
    </section>
  );
};

const isWimbledonEventPath = (path: string): boolean =>
  path.replace(/\/$/, '').endsWith('/the-all-england-lawn-tennis-club');

/** Event page hero — venue bar, hero image, title, dates and share (Wimbledon-style) */
export const EventHero = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const publicPath = getPublicItemPath(page);
  const isWimbledon = isWimbledonEventPath(publicPath);
  const defaults = isWimbledon ? WIMBLEDON_EVENT_DEFAULT : null;

  const eyebrow = textFieldValue(fields.Eyebrow) || defaults?.eyebrow || '';
  const title = textFieldValue(fields.Title) || defaults?.title || '';
  const subtitle =
    richTextFieldValue(fields.Description).replace(/<[^>]*>/g, '') || defaults?.subtitle || '';
  const eventDate = textFieldValue(fields.EventDate) || defaults?.eventDate || '';
  const eventVenue = textFieldValue(fields.EventVenue) || defaults?.eventVenue || '';
  const fallbackImage = defaults?.image ?? '';

  const mergedFields: LyveraBannerFields = {
    ...fields,
    BackgroundImage:
      fields.BackgroundImage?.value?.src || isEditing
        ? fields.BackgroundImage
        : fallbackImage
          ? { value: { src: fallbackImage, alt: title } }
          : fields.BackgroundImage,
  };

  return (
    <section
      className={['component lyvera-banner lyvera-banner--event-hero', props.params?.styles]
        .filter(Boolean)
        .join(' ')}
      id={props.params?.RenderingIdentifier}
    >
      {(eyebrow || isEditing) && (
        <div className="lyvera-event-hero__top-bar">
          {isEditing ? (
            <ContentSdkText field={fields.Eyebrow} tag="span" />
          ) : (
            <span>{eyebrow}</span>
          )}
        </div>
      )}
      <div className="lyvera-event-hero__media-wrap">
        <BannerMedia fields={mergedFields} isEditing={isEditing} />
        <div className="lyvera-banner__overlay" />
        <div className="lyvera-event-hero__content">
          {isEditing ? (
            <ContentSdkText field={fields.Title} tag="h1" className="lyvera-event-hero__title" />
          ) : (
            <h1 className="lyvera-event-hero__title">{title}</h1>
          )}
          {(subtitle || isEditing) &&
            (isEditing ? (
              <ContentSdkRichText
                field={fields.Description}
                className="lyvera-event-hero__subtitle"
                tag="p"
              />
            ) : (
              <p className="lyvera-event-hero__subtitle">{subtitle}</p>
            ))}
        </div>
      </div>
      <div className="lyvera-event-hero__meta">
        {(eventDate || isEditing) && (
          <span className="lyvera-event-hero__meta-item lyvera-event-hero__meta-date">
            {isEditing ? <ContentSdkText field={fields.EventDate} tag="span" /> : eventDate}
          </span>
        )}
        {(eventVenue || isEditing) && (
          <span className="lyvera-event-hero__meta-item lyvera-event-hero__meta-venue">
            {isEditing ? <ContentSdkText field={fields.EventVenue} tag="span" /> : eventVenue}
          </span>
        )}
        <ShareButton />
      </div>
    </section>
  );
};

const isWimbledonEventPath = (path: string): boolean =>
  path.replace(/\/$/, '').endsWith('/the-all-england-lawn-tennis-club');

/** Event page hero — venue bar, hero image, title, dates and share (Wimbledon-style) */
export const EventHero = (props: LyveraBannerProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const publicPath = getPublicItemPath(page);
  const isWimbledon = isWimbledonEventPath(publicPath);
  const defaults = isWimbledon ? WIMBLEDON_EVENT_DEFAULT : null;

  const eyebrow = textFieldValue(fields.Eyebrow) || defaults?.eyebrow || '';
  const title = textFieldValue(fields.Title) || defaults?.title || '';
  const subtitle =
    richTextFieldValue(fields.Description).replace(/<[^>]*>/g, '') || defaults?.subtitle || '';
  const eventDate = textFieldValue(fields.EventDate) || defaults?.eventDate || '';
  const eventVenue = textFieldValue(fields.EventVenue) || defaults?.eventVenue || '';
  const fallbackImage = defaults?.image ?? '';

  const mergedFields: LyveraBannerFields = {
    ...fields,
    BackgroundImage:
      fields.BackgroundImage?.value?.src || isEditing
        ? fields.BackgroundImage
        : fallbackImage
          ? { value: { src: fallbackImage, alt: title } }
          : fields.BackgroundImage,
  };

  return (
    <section
      className={['component lyvera-banner lyvera-banner--event-hero', props.params?.styles]
        .filter(Boolean)
        .join(' ')}
      id={props.params?.RenderingIdentifier}
    >
      {(eyebrow || isEditing) && (
        <div className="lyvera-event-hero__top-bar">
          {isEditing ? (
            <ContentSdkText field={fields.Eyebrow} tag="span" />
          ) : (
            <span>{eyebrow}</span>
          )}
        </div>
      )}
      <div className="lyvera-event-hero__media-wrap">
        <BannerMedia fields={mergedFields} isEditing={isEditing} />
        <div className="lyvera-banner__overlay" />
        <div className="lyvera-event-hero__content">
          {isEditing ? (
            <ContentSdkText field={fields.Title} tag="h1" className="lyvera-event-hero__title" />
          ) : (
            <h1 className="lyvera-event-hero__title">{title}</h1>
          )}
          {(subtitle || isEditing) &&
            (isEditing ? (
              <ContentSdkRichText
                field={fields.Description}
                className="lyvera-event-hero__subtitle"
                tag="p"
              />
            ) : (
              <p className="lyvera-event-hero__subtitle">{subtitle}</p>
            ))}
        </div>
      </div>
      <div className="lyvera-event-hero__meta">
        {(eventDate || isEditing) && (
          <span className="lyvera-event-hero__meta-item lyvera-event-hero__meta-date">
            {isEditing ? <ContentSdkText field={fields.EventDate} tag="span" /> : eventDate}
          </span>
        )}
        {(eventVenue || isEditing) && (
          <span className="lyvera-event-hero__meta-item lyvera-event-hero__meta-venue">
            {isEditing ? <ContentSdkText field={fields.EventVenue} tag="span" /> : eventVenue}
          </span>
        )}
        <ShareButton />
      </div>
    </section>
  );
};
