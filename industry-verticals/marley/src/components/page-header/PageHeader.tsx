import React, { JSX } from 'react';
import {
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  getDatasource,
  normalizeRichTextField,
  normalizeTextField,
  pickSdkField,
  richTextFieldValue,
  textFieldValue,
} from '@/helpers/field-utils';

interface Fields {
  data?: {
    datasource?: {
      title?: { jsonValue?: TextField };
      content?: { jsonValue?: RichTextField };
    };
  };
  Title?: TextField;
  Content?: RichTextField;
}

type PageContentProps = ComponentProps & {
  fields: Fields;
};

const resolvePageHeaderFields = (
  fields: Fields,
  routeTitle?: TextField,
  routeContent?: RichTextField
) => {
  const ds = getDatasource(fields);
  const gql = fields?.data?.datasource;

  const rawTitle =
    gql?.title?.jsonValue ?? pickSdkField<TextField>(ds, 'title', 'Title') ?? routeTitle;
  const rawContent =
    gql?.content?.jsonValue ??
    pickSdkField<RichTextField>(ds, 'content', 'Content') ??
    routeContent;

  return {
    title: normalizeTextField(rawTitle),
    content: normalizeRichTextField(rawContent),
  };
};

export const Default = ({ params, fields, rendering }: PageContentProps): JSX.Element => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const { styles, RenderingIdentifier: id } = params;

  const routeTitle = page.layout.sitecore.route?.fields?.Title as TextField | undefined;
  const routeContent = page.layout.sitecore.route?.fields?.Content as RichTextField | undefined;
  const resolved = resolvePageHeaderFields(fields, routeTitle, routeContent);
  const title = textFieldValue(resolved.title);
  const content = richTextFieldValue(resolved.content);
  const searchbarPlaceholderKey = `page-header-searchbar-${params.DynamicPlaceholderId}`;

  return (
    <section className={`component page-header py-18 ${styles}`} id={id}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-8 lg:col-span-3">
            <h2>{isPageEditing ? <Text field={resolved.title} /> : title}</h2>
            <div className="text-lg">
              {isPageEditing ? (
                <RichText field={resolved.content} />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              )}
            </div>
          </div>
          <div className="max-lg:order-last">
            <Placeholder name={searchbarPlaceholderKey} rendering={rendering} />
          </div>
        </div>
      </div>
    </section>
  );
};
