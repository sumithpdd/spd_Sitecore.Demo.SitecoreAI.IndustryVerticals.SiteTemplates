'use client';

import type { JSX } from 'react';
import {
  Placeholder,
  TextField,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { KP_FEATURED_EVENTS } from '@/lib/keith-prowse-defaults';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraPromoCardGridFields {
  SectionTitle?: TextField;
}

export type LyveraPromoCardGridProps = ComponentProps & {
  fields?: LyveraPromoCardGridFields;
};

function FallbackCards(): JSX.Element {
  return (
    <>
      {KP_FEATURED_EVENTS.map((event) => (
        <article key={event.title} className="lyvera-promo-card-grid__fallback-card">
          <img src={event.image} alt="" className="lyvera-promo-card-grid__fallback-image" />
          <div className="lyvera-promo-card-grid__fallback-body">
            <h3 className="lyvera-promo-card-grid__fallback-title">{event.title}</h3>
            <p
              className="lyvera-promo-card-grid__fallback-desc"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
            <a href={event.href} className="lyvera-kp-pill">
              {event.cta}
            </a>
          </div>
        </article>
      ))}
    </>
  );
}

export const Default = (props: LyveraPromoCardGridProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params ?? {};
  const fields = props.fields ?? {};
  const cardsPh = resolveChildPlaceholderKey(
    props.rendering,
    `lyvera-promo-cards-${DynamicPlaceholderId ?? '1'}`
  );
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const hasCmsCards = placeholderHasComponents(props.rendering, cardsPh);
  const useFallback = !hasCmsCards && !isEditing;

  return (
    <section
      className={[sharedComponentModifier(page, 'component lyvera-promo-card-grid'), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div className="lyvera-promo-card-grid__inner">
        {(textFieldValue(fields.SectionTitle) || isEditing) && (
          <ContentSdkText
            field={fields.SectionTitle}
            tag="h2"
            className="lyvera-promo-card-grid__title"
          />
        )}
        {!textFieldValue(fields.SectionTitle) && !isEditing && (
          <h2 className="lyvera-promo-card-grid__title">FEATURED EVENTS</h2>
        )}
        <div className="lyvera-promo-card-grid__grid">
          {(hasCmsCards || isEditing) && <Placeholder name={cardsPh} rendering={props.rendering} />}
          {useFallback && <FallbackCards />}
        </div>
      </div>
    </section>
  );
};
