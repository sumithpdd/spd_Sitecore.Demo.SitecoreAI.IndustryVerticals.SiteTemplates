'use client';

import { useRouter } from 'next/router';
import { useEffect, type JSX } from 'react';
import { recordPageView } from 'lib/cdp/cdp-session-tracker';

/** Records page views for the CDP engagement panel (local session tracker). */
export function CdpPageViewTracker(): JSX.Element | null {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const path = router.asPath.split('?')[0] || '/';
    recordPageView(path);
  }, [router.isReady, router.asPath]);

  return null;
}
