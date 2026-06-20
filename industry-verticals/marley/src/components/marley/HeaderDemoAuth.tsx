'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, User } from 'lucide-react';
import { useDemoAuth } from '@/lib/demo-auth';

/** Marley header utility — sign in / account menu (mirrors lyvera demo auth). */
export function HeaderDemoAuth(): JSX.Element {
  const { isLoggedIn, user, openLogin, logout } = useDemoAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const signInButton = (
    <button type="button" onClick={() => openLogin('account')} className="marley-header-auth__link">
      My Account
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className="marley-header-auth">
        <button
          type="button"
          className="marley-header-auth__icon-btn lg:hidden"
          aria-label="Sign in"
          onClick={() => openLogin('account')}
        >
          <User className="h-4 w-4" aria-hidden />
        </button>
        {signInButton}
      </div>
    );
  }

  return (
    <div className="marley-header-auth-menu">
      <button
        type="button"
        className="marley-header-auth-menu__trigger"
        aria-expanded={userMenuOpen}
        onClick={() => setUserMenuOpen((open) => !open)}
      >
        Welcome, {user?.displayName ?? 'Guest'}!
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      {userMenuOpen ? (
        <div className="marley-header-auth-menu__dropdown">
          <Link href="/account" className="marley-header-auth-menu__item" onClick={() => setUserMenuOpen(false)}>
            My account
          </Link>
          <button
            type="button"
            className="marley-header-auth-menu__item marley-header-auth-menu__item--button"
            onClick={() => {
              logout();
              setUserMenuOpen(false);
            }}
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
