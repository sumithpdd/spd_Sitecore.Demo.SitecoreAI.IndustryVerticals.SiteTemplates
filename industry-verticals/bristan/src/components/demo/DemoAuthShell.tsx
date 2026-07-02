'use client';

import type { JSX, ReactNode } from 'react';
import { DemoAuthProvider } from '@/lib/demo-auth';
import { DemoLoginModal } from '@/components/demo/DemoLoginModal';

/** Demo login + CDP identity for the Bristan rendering host. */
export function DemoAuthShell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <DemoAuthProvider>
      {children}
      <DemoLoginModal />
    </DemoAuthProvider>
  );
}
