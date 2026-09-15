'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { parseDemoParams } from '@/lib/demo-params';

export const OhPageShell = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const demo = parseDemoParams(router.asPath);
  const emergency = demo.appeal === 'emergency';
  return (
    <div className={`oh-page ${emergency ? 'oh-page--emergency' : ''}`.trim()}>{children}</div>
  );
};
