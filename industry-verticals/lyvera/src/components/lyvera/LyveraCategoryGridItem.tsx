'use client';

import type { JSX } from 'react';
import {
  ImageField,
  LinkField,
  TextField,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  hasLinkValue,
  imageSrc,
  linkHref,
  normalizeLinkField,
  textFieldValue,
  unwrapField,
} from '@/lib/lyvera-field-utils';
import { normalizeSxaStyles } from '@/lib/sxa-styles';

export interface LyveraCategoryGridItemFields {
  Title?: TextField;
  Image?: ImageField;
  Link?: LinkField;
  CategoryTab?: TextField;
}

export type LyveraCategoryGridItemProps = ComponentProps & {
  fields?: LyveraCategoryGridItemFields;
};

export const Default = (props: LyveraCategoryGridItemProps): JSX.Element => {
  const styles = normalizeSxaStyles(props.params?.styles);
  const fields = props.fields ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  const titleField = unwrapField(fields.Title);
  const imageField = unwrapField(fields.Image);
  const title = textFieldValue(titleField);
  const tab = textFieldValue(unwrapField(fields.CategoryTab)).toLowerCase();
  const linkField = normalizeLinkField(fields.Link, { text: title || 'View', href: '#' });
  const href = linkHref(linkField, '#');
  const showImage = Boolean(imageSrc(imageField)) || isEditing;
  const showTitle = Boolean(title) || isEditing;

  const inner = (
    <>
      {showImage &&
        (isEditing ? (
          <ContentSdkImage field={imageField} className="lyvera-category-grid-item__image" />
        ) : (
          <img
            src={imageSrc(imageField)}
            alt={title}
            className="lyvera-category-grid-item__image"
          />
        ))}
      <span className="lyvera-category-grid-item__overlay" aria-hidden />
      {showTitle &&
        (isEditing ? (
          <ContentSdkText
            field={titleField}
            tag="span"
            className="lyvera-category-grid-item__label"
          />
        ) : (
          <span className="lyvera-category-grid-item__label">{title}</span>
        ))}
    </>
  );

  const linkClassName = 'lyvera-category-grid-item__link';

  return (
    <div
      className={['lyvera-category-grid-item', styles].filter(Boolean).join(' ')}
      data-category-tab={tab || undefined}
      data-lyvera-category-item
    >
      {isEditing && linkField ? (
        <ContentSdkLink field={linkField} className={linkClassName}>
          {inner}
        </ContentSdkLink>
      ) : hasLinkValue(linkField) ? (
        <a href={href} className={linkClassName}>
          {inner}
        </a>
      ) : (
        <div className={linkClassName}>{inner}</div>
      )}
    </div>
  );
};
