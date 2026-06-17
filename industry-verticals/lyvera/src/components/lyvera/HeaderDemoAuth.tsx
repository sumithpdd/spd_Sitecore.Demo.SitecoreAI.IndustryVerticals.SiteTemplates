'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, User } from 'lucide-react';
import { useDemoAuth } from '@/lib/demo-auth';

type HeaderDemoAuthProps = {
  variant: 'corporate' | 'keithprowse';
};

export function HeaderDemoAuth({ variant }: HeaderDemoAuthProps): JSX.Element {
  const { isLoggedIn, user, openLogin, logout } = useDemoAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const signInClass =
    variant === 'keithprowse'
      ? 'lyvera-kp-header-utility__link lyvera-kp-header-utility__link--button'
      : 'lyvera-header-auth__link lyvera-header-auth__link--button';

  const signInButton = (
    <button type="button" onClick={() => openLogin('account')} className={signInClass}>
      Sign in
    </button>
  );

  if (!isLoggedIn) {
    if (variant === 'keithprowse') {
      return signInButton;
    }

    return (
      <div className="lyvera-header-auth">
        <button
          type="button"
          className="lyvera-header-auth__icon-btn"
          aria-label="Sign in"
          onClick={() => openLogin('account')}
        >
          <User className="h-4 w-4" aria-hidden />
        </button>
        {signInButton}
      </div>
    );
  }

  const menuClass =
    variant === 'keithprowse' ? 'lyvera-kp-account-menu' : 'lyvera-header-auth-menu';
  const triggerClass =
    variant === 'keithprowse'
      ? 'lyvera-kp-header-utility__link lyvera-kp-header-utility__link--button lyvera-kp-account-menu__trigger'
      : 'lyvera-header-auth__link lyvera-header-auth__link--button lyvera-header-auth-menu__trigger';
  const dropdownClass =
    variant === 'keithprowse'
      ? 'lyvera-kp-account-menu__dropdown'
      : 'lyvera-header-auth-menu__dropdown';
  const itemClass =
    variant === 'keithprowse' ? 'lyvera-kp-account-menu__item' : 'lyvera-header-auth-menu__item';
  const itemButtonClass =
    variant === 'keithprowse'
      ? 'lyvera-kp-account-menu__item lyvera-kp-account-menu__item--button'
      : 'lyvera-header-auth-menu__item lyvera-header-auth-menu__item--button';

  return (
    <div className={menuClass}>
      <button
        type="button"
        className={triggerClass}
        aria-expanded={userMenuOpen}
        onClick={() => setUserMenuOpen((open) => !open)}
      >
        Welcome, {user?.displayName ?? 'Guest'}!
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      {userMenuOpen ? (
        <div className={dropdownClass}>
          <Link href="/account" className={itemClass} onClick={() => setUserMenuOpen(false)}>
            My account
          </Link>
          <button
            type="button"
            className={itemButtonClass}
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
