'use client';

import { JSX } from 'react';
import { ImageField, Image as ContentSdkImage, useSitecore } from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';

type Props = {
  field?: ImageField;
  fallbackSrc?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
};

/**
 * Pages-editable image: bind the Sitecore Image field in editing so authors can pick DAM/media.
 * Live uses the authored src, or a local demo fallback.
 */
export function CmsImage({
  field,
  fallbackSrc,
  alt = '',
  className,
  imgClassName,
  width,
  height,
}: Props): JSX.Element | null {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const src = typeof field?.value?.src === 'string' ? field.value.src.trim() : '';
  const imageAlt = typeof field?.value?.alt === 'string' && field.value.alt ? field.value.alt : alt;

  if (isEditing) {
    return (
      <span className={clsx('cms-image cms-image--edit', className)}>
        <ContentSdkImage field={field ?? { value: {} }} className={imgClassName} />
      </span>
    );
  }

  if (src) {
    return (
      <span className={clsx('cms-image', className)}>
        <ContentSdkImage field={field} className={imgClassName} />
      </span>
    );
  }

  if (!fallbackSrc) {
    return null;
  }

  return (
    <span className={clsx('cms-image', className)}>
      <img
        src={fallbackSrc}
        alt={imageAlt}
        className={imgClassName}
        width={width}
        height={height}
        decoding="async"
      />
    </span>
  );
}
