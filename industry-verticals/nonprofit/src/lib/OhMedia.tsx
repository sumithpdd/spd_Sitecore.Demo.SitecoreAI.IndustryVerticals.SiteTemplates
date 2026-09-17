'use client';

import { JSX, useEffect, useState } from 'react';
import { ImageField } from '@sitecore-content-sdk/nextjs';
import { fieldImageSrc } from '@/lib/sitecore-fields';

type Props = {
  field?: ImageField | unknown;
  fallback?: string;
  className?: string;
  alt?: string;
};

/** Native img for Content Hub public URLs. Avoids NextImage width errors on DAM fields. */
export const OhMedia = ({
  field,
  fallback = '',
  className,
  alt = '',
}: Props): JSX.Element | null => {
  const src = fieldImageSrc(field, fallback);
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  if (!current) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback && current !== fallback) {
          setCurrent(fallback);
        }
      }}
    />
  );
};
