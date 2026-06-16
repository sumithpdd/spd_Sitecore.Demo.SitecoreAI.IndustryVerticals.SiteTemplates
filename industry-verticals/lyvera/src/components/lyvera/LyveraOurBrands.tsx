'use client';

import type { JSX } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Placeholder,
  TextField,
  useSitecore,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_BRAND_LOGO_FALLBACKS } from '@/lib/lyvera-defaults';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraOurBrandsFields {
  SectionTitle?: TextField;
}

export type LyveraOurBrandsProps = ComponentProps & {
  fields?: LyveraOurBrandsFields;
};

function BrandFallbackStrip(): JSX.Element {
  return (
    <>
      {LYVERA_BRAND_LOGO_FALLBACKS.map((brand) => (
        <a
          key={brand.href}
          href={brand.href}
          className="lyvera-brand-logo__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="lyvera-brand-logo" data-lyvera-brand-slide>
            {brand.logoSrc ? (
              <img
                src={brand.logoSrc}
                alt={brand.title}
                className="lyvera-brand-logo__image"
                loading="lazy"
              />
            ) : (
              <span className="lyvera-brand-logo__text">{brand.title}</span>
            )}
          </div>
        </a>
      ))}
    </>
  );
}

function CarouselLayout(props: LyveraOurBrandsProps): JSX.Element {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields ?? {};
  const cardsPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-brand-logos-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsLogos = placeholderHasComponents(props.rendering, cardsPh);

  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  const refreshSlides = useCallback(() => {
    const root = trackRef.current;
    if (!root) return;
    setSlideCount(root.querySelectorAll('[data-lyvera-brand-slide]').length);
  }, []);

  useEffect(() => {
    refreshSlides();
    const root = trackRef.current;
    if (!root || typeof MutationObserver === 'undefined') return;
    const mo = new MutationObserver(() => refreshSlides());
    mo.observe(root, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [refreshSlides, props.rendering?.uid, hasCmsLogos]);

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

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const slides = root.querySelectorAll<HTMLElement>('[data-lyvera-brand-slide]');
    slides[activeIndex]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex]);

  const showControls = slideCount > 4;

  return (
    <section
      className={['component lyvera-our-brands lyvera-our-brands--carousel', styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {(textFieldValue(fields.SectionTitle) || isEditing) && (
        <ContentSdkText
          field={fields.SectionTitle}
          tag="h2"
          className="lyvera-our-brands__title sr-only"
        />
      )}
      <div className="lyvera-our-brands__bar">
        {showControls && (
          <button
            type="button"
            className="lyvera-our-brands__nav lyvera-our-brands__nav--prev"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous brands"
          >
            <ChevronLeft aria-hidden size={18} />
          </button>
        )}
        <div ref={trackRef} className="lyvera-our-brands__track">
          {(hasCmsLogos || isEditing) && <Placeholder name={cardsPh} rendering={props.rendering} />}
          {!hasCmsLogos && <BrandFallbackStrip />}
        </div>
        {showControls && (
          <button
            type="button"
            className="lyvera-our-brands__nav lyvera-our-brands__nav--next"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next brands"
          >
            <ChevronRight aria-hidden size={18} />
          </button>
        )}
      </div>
    </section>
  );
}

function GridLayout(props: LyveraOurBrandsProps): JSX.Element {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields ?? {};
  const cardsPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-brand-logos-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsLogos = placeholderHasComponents(props.rendering, cardsPh);

  return (
    <section
      className={['component lyvera-our-brands lyvera-our-brands--grid', styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      {(textFieldValue(fields.SectionTitle) || isEditing) && (
        <ContentSdkText field={fields.SectionTitle} tag="h2" className="lyvera-our-brands__title" />
      )}
      <div className="lyvera-our-brands__grid">
        {(hasCmsLogos || isEditing) && <Placeholder name={cardsPh} rendering={props.rendering} />}
        {!hasCmsLogos && <BrandFallbackStrip />}
      </div>
    </section>
  );
}

/** Horizontal logo strip on dark teal — homepage brand bar */
export const Default = CarouselLayout;

/** Static grid of brand logos */
export const Grid = GridLayout;
