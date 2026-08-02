import { JSX } from 'react';
import { ImageField, NextImage as ContentSdkImage } from '@sitecore-content-sdk/nextjs';

type Props = {
  field?: ImageField;
  className?: string;
  priority?: boolean;
};

/**
 * Local `/images/*` demo assets use plain `<img>` (avoids next/image loading hydration mismatch).
 * Remote/CMS media uses Content SDK NextImage for editing support.
 */
export const ResolvedImage = ({
  field,
  className,
  priority = false,
}: Props): JSX.Element | null => {
  const src = typeof field?.value?.src === 'string' ? field.value.src.trim() : '';
  if (!src) return null;

  if (src.startsWith('/')) {
    const alt = typeof field?.value?.alt === 'string' ? field.value.alt : '';
    const width = Number(field?.value?.width);
    const height = Number(field?.value?.height);

    return (
      <img
        src={src}
        alt={alt}
        width={Number.isFinite(width) && width > 0 ? width : undefined}
        height={Number.isFinite(height) && height > 0 ? height : undefined}
        className={className}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      />
    );
  }

  return <ContentSdkImage field={field} className={className} priority={priority} />;
};
