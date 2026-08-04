'use client';

import type { JSX } from 'react';
import { useDemoAuth } from '@/lib/demo-auth';

/** Account popover content — demo Owners Club login. */
export function DemoAccountPanel(): JSX.Element {
  const { isLoggedIn, user, openLogin, logout } = useDemoAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-w-[14rem] space-y-3 p-1">
        <p className="text-foreground-muted text-sm">
          Sign in to view orders, wishlists, and personalized recommendations.
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
      <button type="button" className="forma-account-panel__sign-out" onClick={logout}>
        Sign out
      </button>
    </div>
  );
}
