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

export function linkHref(field?: LinkField): string {
  const href = field?.value?.href;
  return typeof href === 'string' && href.trim() ? href.trim() : '#';
}

export function linkText(field?: LinkField, fallback = ''): string {
  const text = field?.value?.text;
  return typeof text === 'string' && text.trim() ? text.trim() : fallback;
}
