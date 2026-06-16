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
import { hasLinkValue, textFieldValue } from '@/lib/lyvera-field-utils';

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
  const { styles } = props.params ?? {};
  const fields = props.fields ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const tab = textFieldValue(fields.CategoryTab).toLowerCase();
  const href = fields.Link?.value?.href || '#';

  const inner = (
    <>
      {(fields.Image?.value?.src || isEditing) && (
        <ContentSdkImage field={fields.Image} className="lyvera-category-grid-item__image" />
      )}
      <span className="lyvera-category-grid-item__overlay" aria-hidden />
      {(textFieldValue(fields.Title) || isEditing) && (
        <ContentSdkText
          field={fields.Title}
          tag="span"
          className="lyvera-category-grid-item__label"
        />
      )}
    </>
  );

  return (
    <div
      className={['lyvera-category-grid-item', styles].filter(Boolean).join(' ')}
      data-category-tab={tab || undefined}
      data-lyvera-category-item
    >
      {hasLinkValue(fields.Link) || isEditing ? (
        <ContentSdkLink field={fields.Link} className="lyvera-category-grid-item__link">
          {inner}
        </ContentSdkLink>
      ) : (
        <a href={href} className="lyvera-category-grid-item__link">
          {inner}
        </a>
      )}
    </div>
  );
};
