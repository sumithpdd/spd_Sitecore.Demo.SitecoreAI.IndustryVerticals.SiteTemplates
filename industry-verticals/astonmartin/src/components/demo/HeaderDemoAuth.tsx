'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, User } from 'lucide-react';
import { useDemoAuth } from '@/lib/demo-auth';

/** Header utility — mock Owners Club sign-in. */
export function HeaderDemoAuth(): JSX.Element {
  const { isLoggedIn, user, openLogin, logout } = useDemoAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="am-header-auth">
        <button
          type="button"
          className="am-header-auth__icon-btn md:hidden"
          aria-label="Owner login"
          onClick={() => openLogin('account')}
        >
          <User className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => openLogin('account')}
          className="am-header-auth__link hidden md:inline-flex"
        >
          Owner login
        </button>
      </div>
    );
  }

  return (
    <div className="am-header-auth-menu">
      <button
        type="button"
        className="am-header-auth-menu__trigger"
        aria-expanded={userMenuOpen}
        onClick={() => setUserMenuOpen((open) => !open)}
      >
        Welcome, {user?.displayName ?? 'Owner'}
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      {userMenuOpen ? (
        <div className="am-header-auth-menu__dropdown">
          <Link
            href="/owners"
            className="am-header-auth-menu__item"
            onClick={() => setUserMenuOpen(false)}
          >
            Owners Club
          </Link>
          <button
            type="button"
            className="am-header-auth-menu__item am-header-auth-menu__item--button"
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
