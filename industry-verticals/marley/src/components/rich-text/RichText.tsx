import React, { JSX } from 'react';
import { RichText as ContentSdkRichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  getDatasource,
  normalizeRichTextField,
  pickSdkField,
  richTextFieldValue,
} from '@/helpers/field-utils';

interface Fields {
  data?: {
    datasource?: {
      text?: { jsonValue?: unknown };
    };
  };
  Text?: unknown;
}

export type RichTextProps = ComponentProps & {
  fields: Fields;
};

const resolveRichText = (fields: Fields) => {
  const ds = getDatasource(fields);
  const gql = fields?.data?.datasource;
  const raw = gql?.text?.jsonValue ?? pickSdkField(ds, 'text', 'Text');
  return normalizeRichTextField(raw);
};

export const Default = ({ params, fields }: RichTextProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { RenderingIdentifier, styles } = params;
  const resolved = resolveRichText(fields);
  const html = richTextFieldValue(resolved);

  return (
    <div className={`component rich-text ${styles}`} id={RenderingIdentifier}>
      <div className="component-content">
        {resolved ? (
          isPageEditing ? (
            <ContentSdkRichText field={resolved} />
          ) : (
            <div className="ck-content" dangerouslySetInnerHTML={{ __html: html }} />
          )
        ) : (
          <span className="is-empty-hint">Rich text</span>
        )}
      </div>
    </div>
  );
};
