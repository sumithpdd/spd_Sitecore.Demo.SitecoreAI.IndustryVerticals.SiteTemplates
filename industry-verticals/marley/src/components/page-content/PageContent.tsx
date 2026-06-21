import React, { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  useSitecore,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
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
      content?: { jsonValue?: RichTextField };
    };
  };
  Content?: RichTextField;
}

type PageContentProps = ComponentProps & {
  fields: Fields;
};

const resolvePageContent = (
  fields: Fields,
  routeContent?: RichTextField
): RichTextField | undefined => {
  const ds = getDatasource(fields);
  const gql = fields?.data?.datasource;
  const raw =
    gql?.content?.jsonValue ??
    pickSdkField<RichTextField>(ds, 'content', 'Content') ??
    routeContent;
  return normalizeRichTextField(raw);
};

export const Default = ({ params, fields }: PageContentProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { styles, RenderingIdentifier: id } = params;

  const routeContent = page.layout.sitecore.route?.fields?.Content as RichTextField | undefined;
  const resolved = resolvePageContent(fields, routeContent);
  const html = richTextFieldValue(resolved);

  return (
    <div className={`component content ${styles}`} id={id}>
      <div className="component-content">
        <div className="field-content ck-content">
          {resolved ? (
            isPageEditing ? (
              <ContentSdkRichText field={resolved} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: html }} />
            )
          ) : (
            '[Content]'
          )}
        </div>
      </div>
    </div>
  );
};
