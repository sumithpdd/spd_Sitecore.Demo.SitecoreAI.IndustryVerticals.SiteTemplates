'use client';

import type { JSX, ReactNode } from 'react';
import { DemoAuthProvider } from '@/lib/demo-auth';
import { DemoLoginModal } from '@/components/lyvera/DemoLoginModal';

/** Shared demo login state for all Lyvera Group sites (lyvera, keithprowse, gulliverstravel, etc.). */
export function DemoAuthShell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <DemoAuthProvider>
      {children}
      <DemoLoginModal />
    </DemoAuthProvider>
  );
}
