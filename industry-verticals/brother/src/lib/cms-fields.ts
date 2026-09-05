import type { Field, ImageField, LinkField, TextField } from '@sitecore-content-sdk/nextjs';

/** Accept Field<string> or TextField (SDK TextField.value can be string | number). */
export function fieldText(
  field?: Field<string> | TextField | { value?: string | number | undefined },
  fallback = ''
): string {
  const value = field?.value;
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function imageSrc(field?: ImageField, fallback = ''): string {
  const src = (field?.value as { src?: string } | undefined)?.src;
  return src || fallback;
}

export function linkHref(field?: LinkField, fallback = ''): string {
  const value = field?.value as { href?: string; url?: string } | undefined;
  return value?.href || value?.url || fallback;
}

export function linkText(field?: LinkField, fallback = ''): string {
  const value = field?.value as { text?: string } | undefined;
  return value?.text || fallback;
}

/** Treelist / multilist item shape from Layout Service. */
export type CmsListItem = {
  id?: string;
  url?: string;
  name?: string;
  displayName?: string;
  fields?: Record<string, Field<string> | ImageField | LinkField | undefined>;
};

export function listItems(field: unknown): CmsListItem[] {
  if (Array.isArray(field)) return field as CmsListItem[];
  if (field && typeof field === 'object' && Array.isArray((field as { value?: unknown }).value)) {
    return (field as { value: CmsListItem[] }).value;
  }
  return [];
}
