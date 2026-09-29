'use client';

import React, { JSX } from 'react';
import {
  Image,
  ImageField,
  SitecoreProviderReactContext,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';

type LooseField = { value?: unknown };
type LooseImage = { value?: { src?: string; alt?: string } };

export function useSitecorePage() {
  return React.useContext(SitecoreProviderReactContext)?.page;
}

export function useMergedFields<T extends Record<string, unknown>>(componentFields?: T): T {
  const page = useSitecorePage();
  const route = (page?.layout?.sitecore?.route?.fields || {}) as T;
  if (!componentFields || Object.keys(componentFields).length === 0) return route;
  return { ...route, ...componentFields };
}

export function EditableText({
  field,
  fallback = '',
  tag,
  className,
}: {
  field?: LooseField;
  fallback?: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}): JSX.Element | null {
  const isEditing = Boolean(useSitecorePage()?.mode?.isEditing);
  const value = typeof field?.value === 'string' ? field.value.trim() : '';
  if (field && (isEditing || value)) {
    return <Text field={field as TextField} tag={tag} className={className} />;
  }
  if (!fallback) return null;
  if (!tag) return <>{fallback}</>;
  return React.createElement(tag, { className }, fallback);
}

export function EditableImage({
  field,
  fallbackSrc,
  className,
}: {
  field?: LooseImage;
  fallbackSrc?: string;
  className?: string;
}): JSX.Element | null {
  const isEditing = Boolean(useSitecorePage()?.mode?.isEditing);
  if (field && (isEditing || field.value?.src)) {
    return <Image field={field as ImageField} className={className} />;
  }
  if (!fallbackSrc) return null;
  return <img className={className} src={fallbackSrc} alt="" />;
}
