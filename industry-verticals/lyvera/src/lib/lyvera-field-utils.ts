import type { ImageField, LinkField, RichTextField, TextField } from '@sitecore-content-sdk/nextjs';

type JsonValueField<T> = { jsonValue?: T };

export const unwrapField = <T,>(field?: T | JsonValueField<T>): T | undefined => {
  if (!field || typeof field !== 'object') return field;
  if ('jsonValue' in field && field.jsonValue) return field.jsonValue;
  return field as T;
};

export const textFieldValue = (field?: TextField | JsonValueField<TextField>): string => {
  const v = unwrapField(field)?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const richTextFieldValue = (field?: RichTextField | JsonValueField<RichTextField>): string => {
  const v = unwrapField(field)?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const imageSrc = (field?: ImageField | JsonValueField<ImageField>, fallback = ''): string => {
  const src = unwrapField(field)?.value?.src;
  return typeof src === 'string' && src.trim() ? src.trim() : fallback;
};

export const linkHref = (field?: LinkField | JsonValueField<LinkField>, fallback = ''): string => {
  const value = unwrapField(field)?.value as { href?: string; url?: string } | string | undefined;
  if (typeof value === 'string') return value.trim() || fallback;
  const href = value?.href ?? value?.url;
  return typeof href === 'string' && href.trim() ? href.trim() : fallback;
};

export const linkLabel = (field?: LinkField | JsonValueField<LinkField>, fallback = 'Learn more'): string => {
  const value = unwrapField(field)?.value;
  if (!value || typeof value === 'string') return fallback;
  return value.text?.trim() || value.title?.trim() || fallback;
};

export const hasLinkValue = (field?: LinkField | JsonValueField<LinkField>): boolean =>
  Boolean(linkHref(field));

/** Ensure Content SDK Link receives href + text (avoids [object Object] when text is missing). */
export const normalizeLinkField = (
  field?: LinkField | JsonValueField<LinkField>,
  fallback?: { text: string; href: string }
): LinkField | undefined => {
  const raw = unwrapField(field);
  const href = linkHref(raw, fallback?.href ?? '');
  const text = linkLabel(raw, fallback?.text ?? 'Learn more');

  if (!raw && !fallback) return undefined;

  const rawValue = raw?.value;
  const value =
    typeof rawValue === 'object' && rawValue !== null
      ? { ...rawValue, href: href || fallback?.href || rawValue.href, text }
      : { href: href || fallback?.href || '#', text };

  return { ...(raw ?? {}), value };
};
