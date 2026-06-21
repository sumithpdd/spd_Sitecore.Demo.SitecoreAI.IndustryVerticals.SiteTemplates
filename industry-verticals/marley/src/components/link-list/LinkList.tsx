import React from 'react';
import {
  Link as ContentSdkLink,
  Text,
  LinkField,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import {
  hasLinkValue,
  linkHref,
  linkLabel,
  normalizeLinkField,
  normalizeTextField,
  textFieldValue,
  unwrapField,
} from '@/helpers/field-utils';

interface LinkListProps extends ComponentProps {
  fields: {
    data?: {
      datasource?: {
        children?: {
          results?: Array<{
            field?: {
              link?: LinkField | { jsonValue?: LinkField };
            };
          }>;
        };
        field?: {
          title?: TextField | { jsonValue?: TextField };
        };
      };
    };
  };
}

const LinkListItem = ({
  index,
  total,
  field,
  className,
  isPageEditing,
}: {
  index: number;
  total: number;
  field?: LinkField;
  className?: string;
  isPageEditing: boolean;
}) => {
  const classNames = [
    `item${index}`,
    index % 2 === 0 ? 'odd' : 'even',
    index === 0 ? 'first' : '',
    index === total - 1 ? 'last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (!field && !isPageEditing) return null;

  const href = linkHref(field, '#');
  const label = linkLabel(field, 'Link');
  const normalized = normalizeLinkField(field) ?? { value: { href, text: label } };

  return (
    <li className={classNames}>
      <div className="field-link">
        {isPageEditing ? (
          <ContentSdkLink field={normalized} className={className} />
        ) : hasLinkValue(field) ? (
          <a href={href} className={className}>
            {label}
          </a>
        ) : null}
      </div>
    </li>
  );
};

const resolveLinkListFields = (fields: LinkListProps['fields']) => {
  const datasource = fields?.data?.datasource;
  if (!datasource) return undefined;

  const title = normalizeTextField(unwrapField(datasource.field?.title));
  const links =
    datasource.children?.results?.map((element) =>
      normalizeLinkField(unwrapField(element?.field?.link))
    ) ?? [];

  return { title, links };
};

export const Default = ({ params, fields }: LinkListProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const resolved = resolveLinkListFields(fields);
  const styles = `component link-list ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!resolved) {
      return <h3>Link List</h3>;
    }

    const { title, links } = resolved;
    const heading = textFieldValue(title);

    return (
      <>
        {(heading || isPageEditing) &&
          (isPageEditing ? <Text tag="h3" field={title} /> : <h3>{heading}</h3>)}
        <ul>
          {links.map((link, index) => (
            <LinkListItem
              key={`${index}-${linkHref(link)}`}
              index={index}
              total={links.length}
              field={link}
              isPageEditing={isPageEditing}
            />
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};

export const SecondaryNavigation = ({ params, fields }: LinkListProps) => {
  const { page } = useSitecore();
  const isPageEditing = page.mode.isEditing;
  const resolved = resolveLinkListFields(fields);
  const styles = `component link-list ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!resolved) {
      return <h3>Link List</h3>;
    }

    const { links } = resolved;

    return (
      <ul className="flex gap-x-6 gap-y-4 text-xs [.drawer-content_&]:!flex-col">
        {links.map((link, index) => (
          <LinkListItem
            key={`${index}-${linkHref(link)}`}
            index={index}
            total={links.length}
            field={link}
            className="navigation-item"
            isPageEditing={isPageEditing}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};
