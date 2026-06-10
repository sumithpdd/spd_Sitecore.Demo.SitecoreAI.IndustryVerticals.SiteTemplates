import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';

export function textValue(field?: Field<string> | TextField): string {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
}

export function richTextValue(field?: RichTextField): string {
  const v = field?.value;
  return typeof v === 'string' ? v : '';
}

export function imageSrc(field?: ImageField, fallback = ''): string {
  const src = field?.value?.src;
  return typeof src === 'string' && src.trim() ? src.trim() : fallback;
}

/** Image field value or legacy plain-text URL on the same CM field. */
export function imageSrcOrTextUrl(field?: ImageField | TextField): string {
  const value = field?.value;
  if (value != null && typeof value === 'object' && 'src' in value) {
    const src = (value as { src?: string }).src;
    if (typeof src === 'string' && src.trim()) return src.trim();
  }
  if (typeof value === 'string' && value.trim()) return value.trim();
  return '';
}

export function linkHref(field?: LinkField): string {
  const href = field?.value?.href;
  return typeof href === 'string' && href.trim() ? href.trim() : '#';
}

export function linkText(field?: LinkField, fallback = ''): string {
  const text = field?.value?.text;
  return typeof text === 'string' && text.trim() ? text.trim() : fallback;
}

export function hasLinkValue(field?: LinkField): boolean {
  if (!field?.value) return false;
  const { href, text, title } = field.value as { href?: string; text?: string; title?: string };
  return Boolean(href || text || title);
}

export function hasImageValue(field?: ImageField): boolean {
  const src = field?.value?.src;
  return typeof src === 'string' && src.trim().length > 0;
}
