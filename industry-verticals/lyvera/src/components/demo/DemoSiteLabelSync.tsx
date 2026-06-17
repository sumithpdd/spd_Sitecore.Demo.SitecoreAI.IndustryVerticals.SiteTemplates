'use client';

import { useEffect } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { useDemoAuth } from '@/lib/demo-auth';
import { demoSiteDisplayName } from '@/lib/lyveragroup-site';

/** Keeps demo login modal branding in sync with the active Sitecore site. */
export function DemoSiteLabelSync(): null {
  const { page } = useSitecore();
  const { setSiteLabel } = useDemoAuth();

  useEffect(() => {
    setSiteLabel(demoSiteDisplayName(page));
  }, [page, setSiteLabel]);

  return null;
}
