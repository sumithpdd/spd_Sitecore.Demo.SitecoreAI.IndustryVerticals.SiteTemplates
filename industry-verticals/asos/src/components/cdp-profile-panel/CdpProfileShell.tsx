'use client';

import { JSX } from 'react';
import { CdpPageViewTracker } from '@/components/cdp-profile-panel/CdpPageViewTracker';
import { CdpProfilePanel } from '@/components/cdp-profile-panel/CdpProfilePanel';

export const Default = (): JSX.Element => (
  <>
    <CdpPageViewTracker />
    <CdpProfilePanel />
  </>
);

export default Default;
