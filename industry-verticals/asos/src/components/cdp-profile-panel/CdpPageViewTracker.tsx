'use client';

import { JSX, useEffect } from 'react';
import { useRouter } from 'next/router';
import { recordPageView, recordVisitOnce } from '@/lib/cdp/cdp-session-tracker';

export function CdpPageViewTracker(): JSX.Element | null {
  const router = useRouter();

  useEffect(() => {
    recordVisitOnce();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    recordPageView(router.asPath.split('?')[0] || '/');
  }, [router.isReady, router.asPath]);

  return null;
}
