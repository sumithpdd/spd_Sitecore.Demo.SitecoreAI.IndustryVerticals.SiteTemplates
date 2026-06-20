'use client';

import type { JSX, ReactNode } from 'react';
import { DemoAuthProvider } from '@/lib/demo-auth';
import { DemoLoginModal } from '@/components/marley/DemoLoginModal';

/** Demo login + CDP identity for the Marley rendering host. */
export function DemoAuthShell({ children }: { children: ReactNode }): JSX.Element {
  return (
    <DemoAuthProvider>
      {children}
      <DemoLoginModal />
    </DemoAuthProvider>
  );
}
