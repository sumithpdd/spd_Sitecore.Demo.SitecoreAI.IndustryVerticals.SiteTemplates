'use client';

import { JSX, ReactNode, useEffect, useState } from 'react';
import { frameEnabled } from '@/lib/asos-demo';

type Props = {
  children: ReactNode;
  /**
   * Pass `page.mode.isEditing` from a Sitecore-rendered layout so the frame
   * never wraps the Pages / Experience Editor canvas. Standalone journey
   * routes can omit it.
   */
  disabled?: boolean;
};

/**
 * App / phone frame wrapper (C-14). The ASOS build is app-majority, so every
 * page is shown inside a device frame during the walkthrough.
 *
 * - ON by default; suppressed with `?frame=off` or when `disabled` is true.
 * - Below `lg` the frame collapses to full-bleed so a real phone isn't
 *   double-framed.
 *
 * This is a layout wrapper, not a Sitecore rendering — it takes children and
 * is composed by JourneyLayout / Layout, not registered in the component map.
 */
export const AppFrame = ({ children, disabled = false }: Props): JSX.Element => {
  // Query params aren't known during SSR; resolve on the client to avoid
  // a hydration mismatch, defaulting to "on".
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    setEnabled(frameEnabled());
  }, []);

  if (disabled || !enabled) {
    return <>{children}</>;
  }

  return (
    <div className="asos-appframe-stage flex min-h-screen w-full justify-center bg-neutral-200 lg:py-8 dark:bg-neutral-900">
      <div className="asos-appframe relative w-full lg:h-[860px] lg:w-[400px] lg:overflow-hidden lg:rounded-[2.75rem] lg:border-[10px] lg:border-black lg:bg-white lg:shadow-2xl">
        {/* Notch — device chrome only, hidden below lg */}
        <div className="pointer-events-none absolute top-0 left-1/2 z-50 hidden h-6 w-40 -translate-x-1/2 rounded-b-2xl bg-black lg:block" />
        <div className="h-full w-full overflow-y-auto overscroll-contain lg:pt-6">{children}</div>
      </div>
    </div>
  );
};

export default AppFrame;
