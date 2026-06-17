import type { ImageField, LinkField, RichTextField, TextField } from '@sitecore-content-sdk/nextjs';

type JsonValueField<T> = { jsonValue?: T };

export const unwrapField = <T>(field?: T | JsonValueField<T>): T | undefined => {
  if (!field || typeof field !== 'object') return field;
  if ('jsonValue' in field && field.jsonValue) return field.jsonValue;
  return field as T;
};

export const textFieldValue = (field?: TextField | JsonValueField<TextField>): string => {
  const v = unwrapField(field)?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const richTextFieldValue = (
  field?: RichTextField | JsonValueField<RichTextField>
): string => {
  const v = unwrapField(field)?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const imageSrc = (
  field?: ImageField | JsonValueField<ImageField>,
  fallback = ''
): string => {
  const src = unwrapField(field)?.value?.src;
  return typeof src === 'string' && src.trim() ? src.trim() : fallback;
};

/** Pull href/text from Sitecore link fields (handles nested jsonValue shells). */
const resolveLinkValue = (
  field?: LinkField | JsonValueField<LinkField>
): { href?: string; url?: string; text?: string; title?: string } | string | undefined => {
  let current: unknown = unwrapField(field)?.value;

  for (let depth = 0; depth < 3; depth += 1) {
    if (current == null || typeof current === 'string') return current as string | undefined;
    if (typeof current !== 'object') return undefined;

    if ('jsonValue' in current && (current as JsonValueField<unknown>).jsonValue) {
      current = (current as JsonValueField<unknown>).jsonValue;
      continue;
    }

    const nested = (current as { value?: unknown }).value;
    if (
      nested &&
      typeof nested === 'object' &&
      ('href' in nested || 'url' in nested || 'text' in nested || 'title' in nested)
    ) {
      current = nested;
      continue;
    }

    break;
  }

  return typeof current === 'object' && current !== null
    ? (current as { href?: string; url?: string; text?: string; title?: string })
    : undefined;
};

export const linkHref = (field?: LinkField | JsonValueField<LinkField>, fallback = ''): string => {
  const value = resolveLinkValue(field);
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.startsWith('<link') ? fallback : trimmed || fallback;
  }
  const href = value?.href ?? value?.url;
  return typeof href === 'string' && href.trim() ? href.trim() : fallback;
};

export const linkLabel = (
  field?: LinkField | JsonValueField<LinkField>,
  fallback = 'Learn more'
): string => {
  const value = resolveLinkValue(field);
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
  const resolved = resolveLinkValue(field);
  const href = linkHref(field, fallback?.href ?? '');
  const text = linkLabel(field, fallback?.text ?? 'Learn more');

  if (!raw && !fallback) return undefined;

  const value =
    typeof resolved === 'object' && resolved !== null
      ? { ...resolved, href: href || fallback?.href || resolved.href || resolved.url, text }
      : { href: href || fallback?.href || '#', text };

  return { ...(raw ?? {}), value };
};
