import { NavigationProps, NavItemFields } from '@/components/navigation/Navigation';
import React, { JSX } from 'react';
import { LinkField, Text, TextField } from '@sitecore-content-sdk/nextjs';

type JsonValueField<T> = { jsonValue?: T };

function unwrapField<T>(field?: T | JsonValueField<T>): T | undefined {
  let current: unknown = field;

  for (let depth = 0; depth < 4; depth += 1) {
    if (current == null || typeof current !== 'object') return current as T | undefined;
    if ('jsonValue' in current && (current as JsonValueField<T>).jsonValue != null) {
      current = (current as JsonValueField<T>).jsonValue;
      continue;
    }
    break;
  }

  return current as T | undefined;
}

const navTextValue = (field?: unknown): string => {
  const unwrapped = unwrapField(field);
  if (typeof unwrapped === 'string') return unwrapped.trim();
  if (unwrapped && typeof unwrapped === 'object' && 'value' in unwrapped) {
    const value = (unwrapped as TextField).value;
    return typeof value === 'string' ? value.trim() : '';
  }
  return '';
};

const normalizeNavTextField = (field?: unknown): TextField | undefined => {
  const value = navTextValue(field);
  if (!value && field == null) return undefined;
  return { value };
};

export const isNavLevel = (fields: NavItemFields, level: number): boolean => {
  return Array.isArray(fields.Styles) && fields.Styles.includes(`level${level}`);
};

export const isNavRootItem = (fields: NavItemFields): boolean => {
  const isFlatLevel =
    Array.isArray(fields.Styles) && fields.Styles.some((style) => style.startsWith('flat-level'));

  return isNavLevel(fields, 0) && !isFlatLevel;
};

export const getLinkContent = (
  fields: NavItemFields,
  logoSrc?: string,
  isPageEditing = false
): JSX.Element | string => {
  const isRootItem = isNavRootItem(fields);
  const label =
    navTextValue(fields.NavigationTitle) || navTextValue(fields.Title) || fields.DisplayName || '';

  if (isRootItem && logoSrc) {
    return <img src={logoSrc} alt={label} className="h-auto w-36" />;
  }

  const textField =
    normalizeNavTextField(fields.NavigationTitle) ?? normalizeNavTextField(fields.Title);

  if (isPageEditing && textField) {
    return <Text field={textField} />;
  }

  return label;
};

export const getLinkField = (fields: NavItemFields): LinkField => {
  const title =
    navTextValue(fields.NavigationTitle) || navTextValue(fields.Title) || fields.DisplayName || '';

  return {
    value: {
      href: fields.Href,
      title,
      querystring: fields.Querystring,
    },
  };
};

export const prepareFields = (
  fields: NavigationProps['fields'],
  center: boolean = true
): NavigationProps['fields'] => {
  const result: NavigationProps['fields'] = {};
  const entries = Object.entries(fields).filter(Boolean);

  if (entries.length === 1 && isNavRootItem(entries[0][1])) {
    const rootItem = entries[0][1];
    const children = rootItem.Children || [];

    const flattenedChildren = [...children];
    if (center) {
      const middleIndex = Math.floor(children.length / 2);
      flattenedChildren.splice(middleIndex, 0, { ...rootItem, Children: undefined });
    } else {
      flattenedChildren.unshift({ ...rootItem, Children: undefined });
    }

    flattenedChildren.forEach((item, idx) => {
      result[String(idx)] = item;
    });
  } else {
    entries.forEach(([key, item]) => {
      result[key] = item;
    });
  }

  return result;
};
