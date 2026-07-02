'use client';

import { useEffect, useState } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

/** Sitecore field chrome only after mount — prevents SSR/client hydration mismatches in EE. */
export function useEditingMode(): boolean {
  const { page } = useSitecore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted && page.mode.isEditing;
}
