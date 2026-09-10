import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

export type SitecoreItem = {
  id?: string;
  name?: string;
  url?: string;
  fields?: Record<string, unknown>;
};

export function asItems(field: unknown): SitecoreItem[] {
  if (Array.isArray(field)) {
    return field as SitecoreItem[];
  }
  if (field && typeof field === 'object' && Array.isArray((field as { value?: unknown }).value)) {
    return (field as { value: SitecoreItem[] }).value;
  }
  return [];
}

function rawFieldValue(field: unknown): unknown {
  if (!field || typeof field !== 'object') {
    return undefined;
  }
  const rec = field as { value?: unknown; jsonValue?: { value?: unknown } };
  return rec.value ?? rec.jsonValue?.value;
}

export function fieldString(field: unknown): string {
  if (!field) {
    return '';
  }
  if (typeof field === 'string') {
    return field;
  }
  const value = rawFieldValue(field);
  return typeof value === 'string' ? value : '';
}

export function asTextField(field: unknown): Field<string> | undefined {
  if (!field || typeof field !== 'object') {
    return undefined;
  }
  const rec = field as { value?: unknown; jsonValue?: { value?: unknown } };
  if ('value' in rec) {
    return field as Field<string>;
  }
  if (typeof rec.jsonValue?.value === 'string') {
    return { value: rec.jsonValue.value };
  }
  return undefined;
}

export function asImageField(field: unknown): ImageField | undefined {
  if (field && typeof field === 'object') {
    return field as ImageField;
  }
  return undefined;
}

export function asLinkField(field: unknown): LinkField | undefined {
  if (field && typeof field === 'object') {
    return field as LinkField;
  }
  return undefined;
}

export function linkHref(field: unknown, fallback = ''): string {
  const value = asLinkField(field)?.value as { href?: string; url?: string } | undefined;
  return value?.href || value?.url || fallback;
}

export function linkText(field: unknown, fallback = ''): string {
  const value = asLinkField(field)?.value as { text?: string } | undefined;
  const json = (asLinkField(field) as { jsonValue?: { text?: string } } | undefined)?.jsonValue;
  return value?.text || json?.text || fallback;
}

export function itemLabel(item: SitecoreItem, fallback = ''): string {
  return (
    fieldString(item.fields?.Title) ||
    linkText(item.fields?.Link) ||
    item.name ||
    fallback
  );
}
