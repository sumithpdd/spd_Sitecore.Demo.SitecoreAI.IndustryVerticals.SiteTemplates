import type { JSX } from 'react';
import { LinkField, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { linkHref, linkLabel } from '@/lib/marley-field-utils';
import { MarleyLink } from '@/lib/marley-editable-fields';

type IgqlField<T> = { jsonValue?: T };

export type MarleyLinkListProps = ComponentProps & {
  fields?: {
    data?: {
      datasource?: {
        field?: { title?: IgqlField<TextField> };
        children?: {
          results?: Array<{ field?: { link?: LinkField | IgqlField<LinkField> } }>;
        };
      };
    };
  };
};

/** Footer / nav link list — plain anchors in delivery (replaces shared LinkList). */
export const Default = ({ params, fields }: MarleyLinkListProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const datasource = fields?.data?.datasource;
  const styles = `component link-list marley-link-list ${params?.styles ?? ''}`.trim();
  const id = params?.RenderingIdentifier;
  const results = datasource?.children?.results ?? [];

  if (!datasource) {
    return (
      <div className={styles} id={id}>
        <div className="component-content">
          <h3>Link List</h3>
        </div>
      </div>
    );
  }

  const links = results
    .map((element, index) => {
      const raw = element?.field?.link;
      const field = (raw && 'jsonValue' in raw ? raw.jsonValue : raw) as LinkField | undefined;
      const href = linkHref(field);
      const text = linkLabel(field, 'Link');

      if (!href && !field) return null;

      return (
        <li key={`marley-link-${index}-${href}`} className={`item${index}`}>
          <MarleyLink
            field={field}
            isEditing={isEditing}
            className="hover:underline"
            fallback={{ href, text }}
          />
        </li>
      );
    })
    .filter(Boolean);

  return (
    <div className={styles} id={id}>
      <div className="component-content">
        <ul className="space-y-2">{links}</ul>
      </div>
    </div>
  );
};
