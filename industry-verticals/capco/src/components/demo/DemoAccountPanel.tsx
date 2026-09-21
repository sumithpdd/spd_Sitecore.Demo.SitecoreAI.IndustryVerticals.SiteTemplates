'use client';

import type { JSX } from 'react';
import { useDemoAuth } from '@/lib/demo-auth';

/** Optional account popover — demo login with Capco preferences. */
export function DemoAccountPanel(): JSX.Element {
  const { isLoggedIn, user, openLogin, logout, preferences } = useDemoAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-w-[14rem] space-y-3 p-1">
        <p className="text-foreground-muted text-sm">
          Sign in to save region and industry preferences, and to apply a demo role.
        </p>
        <button
          type="button"
          className="forma-account-panel__sign-in"
          onClick={() => openLogin('account')}
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-[14rem] space-y-3 p-1">
      <p className="forma-account-panel__welcome">
        Welcome back, <span className="text-foreground font-medium">{user?.displayName}</span>
      </p>
      <p className="text-foreground-muted text-sm">
        Role: {preferences.role}. Region: {preferences.region}.
      </p>
      <button type="button" className="forma-account-panel__sign-out" onClick={logout}>
        Sign out
      </button>
    </div>
  );
}
