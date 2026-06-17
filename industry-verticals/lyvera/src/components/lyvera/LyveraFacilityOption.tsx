'use client';

import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  TextField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
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
import { useFacilityChooserContext } from './LyveraFacilityChooser';

export interface LyveraFacilityOptionFields {
  Title?: TextField;
  PriceLabel?: TextField;
  Status?: TextField;
  Description?: RichTextField;
  DetailImage?: ImageField;
  Tags?: TextField;
  CtaLink?: LinkField;
}

export type LyveraFacilityOptionProps = ComponentProps & {
  fields?: LyveraFacilityOptionFields;
};

const parseTags = (value: string): string[] =>
  value
    .split('|')
    .map((tag) => tag.trim())
    .filter(Boolean);

export const Default = (props: LyveraFacilityOptionProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const uid = props.rendering?.uid ?? '';
  const chooser = useFacilityChooserContext();
  const isActive = chooser?.activeUid === uid || (!chooser?.activeUid && isEditing);

  const title = textFieldValue(fields.Title);
  const priceLabel = textFieldValue(fields.PriceLabel);
  const status = textFieldValue(fields.Status).toLowerCase();
  const soldOut = status === 'sold-out' || status === 'sold out';
  const tags = parseTags(textFieldValue(fields.Tags));
  const description = richTextFieldValue(fields.Description);

  if (isEditing) {
    return (
      <div className="lyvera-facility-option lyvera-facility-option--editing">
        <p>
          <ContentSdkText field={fields.Title} tag="strong" />
        </p>
        <ContentSdkText field={fields.PriceLabel} tag="span" />
        <ContentSdkRichText field={fields.Description} tag="div" />
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        role="option"
        aria-selected={isActive}
        className={`lyvera-facility-option__list-item${isActive ? 'is-active' : ''}`}
        onClick={() => chooser?.setActiveUid(uid)}
      >
        <span className="lyvera-facility-option__list-title">{title}</span>
        <span className="lyvera-facility-option__list-meta">
          {soldOut ? 'Sold Out' : priceLabel}
        </span>
      </button>
      {isActive && (
        <article className="lyvera-facility-option__detail is-active">
          <div className="lyvera-facility-option__detail-image-wrap">
            <ContentSdkImage
              field={fields.DetailImage}
              className="lyvera-facility-option__detail-image"
            />
            {!fields.DetailImage?.value?.src && imageSrc(fields.DetailImage) && (
              <img
                src={imageSrc(fields.DetailImage)}
                alt=""
                className="lyvera-facility-option__detail-image"
              />
            )}
          </div>
          {tags.length > 0 && (
            <div className="lyvera-facility-option__tags">
              {tags.map((tag) => (
                <span key={tag} className="lyvera-facility-option__tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {priceLabel && <h3 className="lyvera-facility-option__price">{priceLabel}</h3>}
          {description && (
            <ContentSdkRichText
              field={fields.Description}
              tag="div"
              className="lyvera-facility-option__description"
            />
          )}
          {!soldOut && hasLinkValue(fields.CtaLink) && (
            <ContentSdkLink field={fields.CtaLink!} className="lyvera-facility-option__cta" />
          )}
          {!soldOut && !hasLinkValue(fields.CtaLink) && linkHref(fields.CtaLink) && (
            <a href={linkHref(fields.CtaLink)} className="lyvera-facility-option__cta">
              {linkLabel(fields.CtaLink, 'Select ticket')}
            </a>
          )}
        </article>
      )}
    </>
  );
};
