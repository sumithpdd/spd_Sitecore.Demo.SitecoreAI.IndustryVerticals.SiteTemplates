'use client';

import type { JSX } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  ImageField,
  Placeholder,
  TextField,
  Image as ContentSdkImage,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { WIMBLEDON_FACILITIES } from '@/lib/keith-prowse-defaults';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { textFieldValue } from '@/lib/lyvera-field-utils';
import {
  getPlaceholderSlots,
  placeholderHasComponents,
  resolveChildPlaceholderKey,
} from '@/lib/placeholder-utils';

export interface LyveraFacilityChooserFields {
  SectionTitle?: TextField;
  MapImage?: ImageField;
}

export type LyveraFacilityChooserProps = ComponentProps & {
  fields?: LyveraFacilityChooserFields;
};

type FacilityChooserContextValue = {
  activeUid: string | null;
  setActiveUid: (uid: string) => void;
};

const FacilityChooserContext = createContext<FacilityChooserContextValue | null>(null);

export function useFacilityChooserContext(): FacilityChooserContextValue | null {
  return useContext(FacilityChooserContext);
}

export const Default = (props: LyveraFacilityChooserProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params ?? {};
  const fields = props.fields ?? {};
  const optionsPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-facility-options-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsOptions = placeholderHasComponents(props.rendering, optionsPh);
  const useFallback = !hasCmsOptions && !isEditing;
  const [activeUid, setActiveUid] = useState<string | null>(useFallback ? 'fallback-0' : null);

  useEffect(() => {
    if (activeUid || useFallback) return;
    const slots = getPlaceholderSlots(props.rendering, optionsPh);
    const first = slots[0] as { uid?: string } | undefined;
    if (first?.uid) {
      setActiveUid(first.uid);
    }
  }, [activeUid, optionsPh, props.rendering, useFallback]);

  const contextValue = useMemo(() => ({ activeUid, setActiveUid }), [activeUid]);

  const sectionTitle = textFieldValue(fields.SectionTitle) || 'Start By Choosing Your Facility';

  const fallbackIndex = Number((activeUid ?? 'fallback-0').replace('fallback-', '')) || 0;
  const fallbackOption =
    WIMBLEDON_FACILITIES.options[fallbackIndex] ?? WIMBLEDON_FACILITIES.options[0];

  return (
    <FacilityChooserContext.Provider value={contextValue}>
      <section
        className={[sharedComponentModifier(page, 'component lyvera-facility-chooser'), styles]
          .filter(Boolean)
          .join(' ')}
        id={id}
      >
        {(sectionTitle || isEditing) && (
          <h2 className="lyvera-facility-chooser__title">
            {isEditing ? <ContentSdkText field={fields.SectionTitle} tag="span" /> : sectionTitle}
          </h2>
        )}
        <div className="lyvera-facility-chooser__layout">
          <div className="lyvera-facility-chooser__map-col">
            <div className="lyvera-facility-chooser__map">
              {(fields.MapImage?.value?.src || isEditing) && (
                <ContentSdkImage field={fields.MapImage} />
              )}
              {!fields.MapImage?.value?.src && !isEditing && (
                <img
                  src={WIMBLEDON_FACILITIES.mapImage}
                  alt=""
                  className="lyvera-facility-chooser__map-fallback"
                />
              )}
            </div>
          </div>

          {useFallback ? (
            <>
              <div className="lyvera-facility-chooser__list" role="listbox" aria-label="Facilities">
                {WIMBLEDON_FACILITIES.options.map((option, index) => (
                  <button
                    key={option.title}
                    type="button"
                    role="option"
                    aria-selected={activeUid === `fallback-${index}`}
                    className={`lyvera-facility-option__list-item${
                      activeUid === `fallback-${index}` ? 'is-active' : ''
                    }`}
                    onClick={() => setActiveUid(`fallback-${index}`)}
                  >
                    <span className="lyvera-facility-option__index">{index + 1}.</span>
                    <span className="lyvera-facility-option__list-title">{option.title}</span>
                    <span className="lyvera-facility-option__list-meta">
                      {option.soldOut ? 'Sold Out' : option.priceLabel}
                    </span>
                  </button>
                ))}
              </div>
              <article className="lyvera-facility-option__detail is-active">
                <div className="lyvera-facility-option__detail-image-wrap">
                  <img
                    src={fallbackOption.detailImage}
                    alt=""
                    className="lyvera-facility-option__detail-image"
                  />
                </div>
                <div className="lyvera-facility-option__tags">
                  {fallbackOption.tags.map((tag) => (
                    <span key={tag} className="lyvera-facility-option__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="lyvera-facility-option__price">{fallbackOption.priceLabel}</h3>
                <p className="lyvera-facility-option__description">{fallbackOption.description}</p>
                {!fallbackOption.soldOut && (
                  <a href={fallbackOption.ctaHref} className="lyvera-facility-option__cta">
                    {fallbackOption.ctaText}
                  </a>
                )}
              </article>
            </>
          ) : (
            <div
              className="lyvera-facility-chooser__options-grid"
              role="listbox"
              aria-label="Facilities"
            >
              <Placeholder name={optionsPh} rendering={props.rendering} />
            </div>
          )}
        </div>
      </section>
    </FacilityChooserContext.Provider>
  );
};
