'use client';

import type { JSX } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import {
  LinkField,
  Placeholder,
  RichTextField,
  TextField,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_MULTI_PROMO_DEFAULT, LYVERA_MULTI_PROMO_SLIDES } from '@/lib/lyvera-defaults';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { hasLinkValue, richTextFieldValue, textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraMultiPromoImageSliderFields {
  Title?: TextField;
  Description?: RichTextField;
  CtaLink?: LinkField;
}

export type LyveraMultiPromoImageSliderProps = ComponentProps & {
  fields?: LyveraMultiPromoImageSliderFields;
};

function SlideFallbackGallery(): JSX.Element {
  return (
    <>
      {LYVERA_MULTI_PROMO_SLIDES.map((slide) => (
        <div key={slide.src} data-lyvera-multi-promo-slide className="lyvera-multi-promo-slide">
          <div className="lyvera-multi-promo-slide__frame">
            <img src={slide.src} alt={slide.alt} className="lyvera-multi-promo-slide__image" />
          </div>
        </div>
      ))}
    </>
  );
}

function MultiPromoLayout(props: LyveraMultiPromoImageSliderProps): JSX.Element {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields ?? {};
  const slidesPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-multi-promo-slides-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsSlides = placeholderHasComponents(props.rendering, slidesPh);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const refreshSlides = useCallback(() => {
    const root = trackRef.current;
    if (!root) return;
    setSlideCount(root.querySelectorAll('[data-lyvera-multi-promo-slide]').length);
  }, []);

  useEffect(() => {
    refreshSlides();
    const root = trackRef.current;
    if (!root || typeof MutationObserver === 'undefined') return;
    const mo = new MutationObserver(() => refreshSlides());
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [refreshSlides, props.rendering?.uid, hasCmsSlides]);

  useEffect(() => {
    if (slideCount < 2) {
      setActiveIndex(0);
      return;
    }
    setActiveIndex((prev) => (prev >= slideCount ? 0 : prev));
  }, [slideCount]);

  const goTo = useCallback(
    (index: number) => {
      if (slideCount < 1) return;
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  const showControls = slideCount > 1;

  return (
    <section
      className={['component lyvera-multi-promo', styles].filter(Boolean).join(' ')}
      id={id}
      aria-roledescription="carousel"
    >
      <div className="lyvera-multi-promo__inner">
        <div className="lyvera-multi-promo__gallery">
          <div className="lyvera-multi-promo__viewport">
            <div
              ref={trackRef}
              className="lyvera-multi-promo__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {hasCmsSlides || isEditing ? (
                <Placeholder name={slidesPh} rendering={props.rendering} />
              ) : (
                <SlideFallbackGallery />
              )}
            </div>
            {showControls && (
              <>
                <button
                  type="button"
                  className="lyvera-multi-promo__expand"
                  aria-label="View full size"
                  onClick={() => setLightboxOpen(true)}
                >
                  <Maximize2 size={16} aria-hidden />
                </button>
                <span className="lyvera-multi-promo__counter" aria-live="polite">
                  {activeIndex + 1}/{slideCount}
                </span>
              </>
            )}
          </div>

          {showControls && (
            <div className="lyvera-multi-promo__thumbs-row">
              <button
                type="button"
                className="lyvera-multi-promo__nav"
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous slide"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <div className="lyvera-multi-promo__thumbs">
                {Array.from({ length: Math.min(slideCount, 5) }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`lyvera-multi-promo__thumb${index === activeIndex % 5 ? 'is-active' : ''}`}
                    onClick={() => goTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className="lyvera-multi-promo__nav"
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next slide"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </div>
          )}
        </div>

        <div className="lyvera-multi-promo__content">
          {(textFieldValue(fields.Title) || isEditing) && (
            <ContentSdkText field={fields.Title} tag="h2" className="lyvera-multi-promo__title" />
          )}
          {!textFieldValue(fields.Title) && !isEditing && (
            <h2 className="lyvera-multi-promo__title">{LYVERA_MULTI_PROMO_DEFAULT.title}</h2>
          )}
          {(richTextFieldValue(fields.Description) || isEditing) && (
            <ContentSdkRichText
              field={fields.Description}
              className="lyvera-multi-promo__body"
              tag="div"
            />
          )}
          {!richTextFieldValue(fields.Description) && !isEditing && (
            <p className="lyvera-multi-promo__body">{LYVERA_MULTI_PROMO_DEFAULT.body}</p>
          )}
          {(hasLinkValue(fields.CtaLink) || isEditing) &&
            (hasLinkValue(fields.CtaLink) && fields.CtaLink ? (
              <ContentSdkLink field={fields.CtaLink} className="lyvera-multi-promo__cta" />
            ) : (
              <a href={LYVERA_MULTI_PROMO_DEFAULT.ctaHref} className="lyvera-multi-promo__cta">
                {LYVERA_MULTI_PROMO_DEFAULT.ctaText}
              </a>
            ))}
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="lyvera-multi-promo__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setLightboxOpen(false)}
        >
          <button type="button" className="lyvera-multi-promo__lightbox-close" aria-label="Close">
            ×
          </button>
        </div>
      )}
    </section>
  );
}

/** Side-by-side on desktop, stacked on mobile — portfolio image slider with promo copy */
export const Default = MultiPromoLayout;

/** Same layout with content above gallery (mobile-first emphasis) */
export const Stacked = (props: LyveraMultiPromoImageSliderProps): JSX.Element => (
  <MultiPromoLayout
    {...props}
    params={{
      ...props.params,
      styles: `${props.params?.styles ?? ''} lyvera-multi-promo--stacked`.trim(),
    }}
  />
);
