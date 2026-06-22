import type { JSX } from 'react';
import React from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  NextImage as ContentSdkImage,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import {
  imageSrc,
  linkHref,
  linkLabel,
  normalizeLinkField,
  normalizeTextField,
  richTextFieldValue,
  textFieldValue,
} from '@/lib/marley-field-utils';

type MarleyTextProps = {
  field?: unknown;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  isEditing: boolean;
};

export const MarleyText = ({
  field,
  tag: Tag = 'span',
  className,
  isEditing,
}: MarleyTextProps): JSX.Element | null => {
  const value = textFieldValue(field);
  if (isEditing) {
    return (
      <ContentSdkText
        field={normalizeTextField(field) ?? { value: '' }}
        tag={Tag}
        className={className}
      />
    );
  }
  if (!value) return null;
  return React.createElement(Tag, { className }, value);
};

type MarleyRichTextProps = {
  field?: unknown;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  isEditing: boolean;
};

export const MarleyRichText = ({
  field,
  className,
  tag: Tag = 'div',
  isEditing,
}: MarleyRichTextProps): JSX.Element | null => {
  const html = richTextFieldValue(field);
  if (isEditing) {
    return (
      <ContentSdkRichText
        field={(field as RichTextField) ?? { value: '' }}
        className={className}
        tag={Tag}
      />
    );
  }
  if (!html) return null;
  return React.createElement(Tag, { className, dangerouslySetInnerHTML: { __html: html } });
};

type MarleyLinkProps = {
  field?: LinkField;
  className?: string;
  isEditing: boolean;
  fallback?: { href: string; text: string };
};

export const MarleyLink = ({
  field,
  className,
  isEditing,
  fallback,
}: MarleyLinkProps): JSX.Element | null => {
  const href = linkHref(field, fallback?.href ?? '');
  const text = linkLabel(field, fallback?.text ?? 'Learn more');

  if (isEditing) {
    const normalized = normalizeLinkField(field, fallback);
    if (!normalized) return null;
    return <ContentSdkLink field={normalized} className={className} />;
  }

  if (!href || href === '#') return null;
  return (
    <a href={href} className={className}>
      {text}
    </a>
  );
};

type MarleyImageProps = {
  field?: ImageField;
  className?: string;
  isEditing: boolean;
  priority?: boolean;
};

export const MarleyImage = ({
  field,
  className,
  isEditing,
  priority,
}: MarleyImageProps): JSX.Element | null => {
  const src = imageSrc(field);
  if (isEditing && field) {
    return <ContentSdkImage field={field} className={className} priority={priority} />;
  }
  if (!src) return null;
  const alt = typeof field?.value?.alt === 'string' ? field.value.alt : '';
  return <img src={src} alt={alt} className={className} />;
};
