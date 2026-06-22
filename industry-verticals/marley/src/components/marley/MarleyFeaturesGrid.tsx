import type { JSX } from 'react';
import { LinkField, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { linkHref, textFieldValue } from '@/lib/marley-field-utils';
import { MarleyText } from '@/lib/marley-editable-fields';

type IgqlField<T> = { jsonValue?: T };

type FeatureRow = {
  featureTitle?: IgqlField<TextField>;
  featureDescription?: IgqlField<TextField>;
  featureLink?: IgqlField<LinkField>;
};

export type MarleyFeaturesGridProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: {
        title?: IgqlField<TextField>;
        description?: IgqlField<TextField>;
        children?: { results?: FeatureRow[] };
      };
    };
  };
};

const featureText = (field?: IgqlField<TextField> | TextField): string => {
  if (field && typeof field === 'object' && 'jsonValue' in field) {
    return textFieldValue(field.jsonValue);
  }
  return textFieldValue(field);
};

/** Four-column features grid — IGQL-safe (replaces shared Features FourColGrid). */
export const Default = (props: MarleyFeaturesGridProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const datasource = props.fields?.data?.datasource;
  const results = datasource?.children?.results ?? [];

  return (
    <section className={`${props.params?.styles ?? ''}`} id={id}>
      <div className="container grid grid-cols-1 gap-15 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        {results.map((item, index) => {
          const title = featureText(item.featureTitle);
          const description = featureText(item.featureDescription);
          const href = linkHref(item.featureLink?.jsonValue ?? item.featureLink);

          if (!title && !description && !isEditing) {
            return null;
          }

          const body = (
            <>
              <h3 className="text-xl font-bold">
                {isEditing ? (
                  <MarleyText
                    field={item.featureTitle?.jsonValue ?? item.featureTitle}
                    isEditing={isEditing}
                    tag="span"
                  />
                ) : (
                  title
                )}
              </h3>
              <p className="mt-2 text-base">
                {isEditing ? (
                  <MarleyText
                    field={item.featureDescription?.jsonValue ?? item.featureDescription}
                    isEditing={isEditing}
                    tag="span"
                  />
                ) : (
                  description
                )}
              </p>
            </>
          );

          return (
            <div key={`feature-${index}-${title || href}`} className="flex flex-col justify-center">
              {href && !isEditing ? <a href={href}>{body}</a> : body}
            </div>
          );
        })}
      </div>
    </section>
  );
};
