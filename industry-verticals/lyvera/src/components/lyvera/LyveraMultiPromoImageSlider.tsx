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
import { WIMBLEDON_VIDEO_TABS } from '@/lib/keith-prowse-defaults';
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
  const useFallbackSlides = !hasCmsSlides && !isEditing;

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(
    useFallbackSlides ? LYVERA_MULTI_PROMO_SLIDES.length : 0
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const refreshSlides = useCallback(() => {
    if (useFallbackSlides) {
      setSlideCount(LYVERA_MULTI_PROMO_SLIDES.length);
      return;
    }
    const root = trackRef.current;
    if (!root) return;
    setSlideCount(root.querySelectorAll('[data-lyvera-multi-promo-slide]').length);
  }, [useFallbackSlides]);

  useEffect(() => {
    refreshSlides();
    const root = trackRef.current;
    if (!root || typeof MutationObserver === 'undefined') return;
    const mo = new MutationObserver(() => refreshSlides());
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [refreshSlides, props.rendering?.uid, hasCmsSlides, useFallbackSlides]);

  const slideSources = useFallbackSlides
    ? LYVERA_MULTI_PROMO_SLIDES
    : Array.from({ length: slideCount }, (_, index) => ({
        src: '',
        alt: `Slide ${index + 1}`,
      }));

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
              {(hasCmsSlides || isEditing) && (
                <Placeholder name={slidesPh} rendering={props.rendering} />
              )}
              {!hasCmsSlides && <SlideFallbackGallery />}
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
                {slideSources.slice(0, 7).map((slide, index) =>
                  useFallbackSlides && slide.src ? (
                    <button
                      key={slide.src}
                      type="button"
                      className={`lyvera-multi-promo__thumb lyvera-multi-promo__thumb--image${index === activeIndex ? 'is-active' : ''}`}
                      onClick={() => goTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                      <img src={slide.src} alt="" />
                    </button>
                  ) : (
                    <button
                      key={index}
                      type="button"
                      className={`lyvera-multi-promo__thumb${index === activeIndex ? 'is-active' : ''}`}
                      onClick={() => goTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  )
                )}
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

      {lightboxOpen && useFallbackSlides && LYVERA_MULTI_PROMO_SLIDES[activeIndex] && (
        <div
          className="lyvera-multi-promo__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="lyvera-multi-promo__lightbox-close"
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>
          <img
            src={LYVERA_MULTI_PROMO_SLIDES[activeIndex].src}
            alt={LYVERA_MULTI_PROMO_SLIDES[activeIndex].alt}
            className="lyvera-multi-promo__lightbox-image"
          />
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

/** Vertical tabs with corresponding image panel — Wimbledon experience videos */
export const Tabbed = (props: LyveraMultiPromoImageSliderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { DynamicPlaceholderId } = props.params ?? {};
  const slidesPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-multi-promo-slides-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsSlides = placeholderHasComponents(props.rendering, slidesPh);
  const useFallbackSlides = !hasCmsSlides && !isEditing;
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [tabLabels, setTabLabels] = useState<string[]>(
    useFallbackSlides ? WIMBLEDON_VIDEO_TABS.map((tab) => tab.tabLabel) : []
  );

  const refreshTabs = useCallback(() => {
    if (useFallbackSlides) {
      setTabLabels(WIMBLEDON_VIDEO_TABS.map((tab) => tab.tabLabel));
      return;
    }
    const root = trackRef.current;
    if (!root) return;
    const labels = Array.from(root.querySelectorAll('[data-lyvera-multi-promo-slide]')).map(
      (el) => el.getAttribute('data-tab-label') || 'Experience'
    );
    setTabLabels(labels.length > 0 ? labels : ['Experience']);
  }, [useFallbackSlides]);

  useEffect(() => {
    refreshTabs();
    const root = trackRef.current;
    if (!root || typeof MutationObserver === 'undefined') return;
    const mo = new MutationObserver(() => refreshTabs());
    mo.observe(root, { childList: true, subtree: true, attributes: true });
    return () => mo.disconnect();
  }, [refreshTabs, hasCmsSlides, useFallbackSlides]);

  useEffect(() => {
    if (activeIndex > tabLabels.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, tabLabels.length]);

  const tabs = useFallbackSlides ? WIMBLEDON_VIDEO_TABS.map((t) => t.tabLabel) : tabLabels;

  return (
    <section
      className="component lyvera-multi-promo lyvera-multi-promo--tabbed"
      id={id}
      aria-roledescription="carousel"
    >
      <div className="lyvera-multi-promo__tabbed-inner">
        <div className="lyvera-multi-promo__tabbed-tabs" role="tablist">
          {tabs.map((label, index) => (
            <button
              key={`${label}-${index}`}
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              className={`lyvera-multi-promo__tabbed-tab${activeIndex === index ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="lyvera-multi-promo__tabbed-panel">
          {useFallbackSlides ? (
            <img
              src={WIMBLEDON_VIDEO_TABS[activeIndex]?.image}
              alt={WIMBLEDON_VIDEO_TABS[activeIndex]?.alt ?? ''}
              className="lyvera-multi-promo-slide__image"
            />
          ) : (
            <div className="lyvera-multi-promo__viewport">
              <div
                ref={trackRef}
                className="lyvera-multi-promo__track"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {(hasCmsSlides || isEditing) && (
                  <Placeholder name={slidesPh} rendering={props.rendering} />
                )}
              </div>
            </div>
          )}
          <button type="button" className="lyvera-multi-promo__tabbed-play" aria-label="Play video">
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};
