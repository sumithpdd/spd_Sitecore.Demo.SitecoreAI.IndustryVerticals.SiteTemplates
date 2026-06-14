import type { ImageField, LinkField, RichTextField, TextField } from '@sitecore-content-sdk/nextjs';

export const textFieldValue = (field?: TextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const richTextFieldValue = (field?: RichTextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const imageSrc = (field?: ImageField, fallback = ''): string => {
  const src = field?.value?.src;
  return typeof src === 'string' && src.trim() ? src.trim() : fallback;
};

export const linkHref = (field?: LinkField, fallback = ''): string => {
  const href = field?.value?.href;
  return typeof href === 'string' && href.trim() ? href.trim() : fallback;
};

export const linkLabel = (field?: LinkField, fallback = 'Learn more'): string => {
  const value = field?.value;
  if (!value) return fallback;
  return value.text?.trim() || value.title?.trim() || fallback;
};

export const hasLinkValue = (field?: LinkField): boolean => Boolean(linkHref(field));
