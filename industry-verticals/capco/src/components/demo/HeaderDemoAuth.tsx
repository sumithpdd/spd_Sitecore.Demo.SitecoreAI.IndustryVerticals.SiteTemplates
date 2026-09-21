'use client';

import type { JSX } from 'react';
import { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import { INDUSTRY_OPTIONS, ROLE_OPTIONS, useDemoAuth, type DemoRole } from '@/lib/demo-auth';

/** Header utility — demo sign in, roles, and content preferences. */
export function HeaderDemoAuth(): JSX.Element {
  const { isLoggedIn, user, openLogin, logout, preferences, setPreferences } = useDemoAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const signInButton = (
    <button type="button" onClick={() => openLogin('account')} className="forma-header-auth__link">
      Sign in
    </button>
  );

  if (!isLoggedIn) {
    return (
      <div className="forma-header-auth">
        <button
          type="button"
          className="forma-header-auth__icon-btn lg:hidden"
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
    <div className="forma-header-auth-menu">
      <button
        type="button"
        className="forma-header-auth-menu__trigger"
        aria-expanded={userMenuOpen}
        onClick={() => setUserMenuOpen((open) => !open)}
      >
        Welcome, {user?.displayName ?? 'Guest'}!
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      {userMenuOpen ? (
        <div className="forma-header-auth-menu__dropdown pm-prefs">
          <p className="pm-prefs__label">Role</p>
          <select
            className="pm-prefs__select"
            value={preferences.role}
            aria-label="Account role"
            onChange={(event) => setPreferences({ role: event.target.value as DemoRole })}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="pm-prefs__label">Industries</p>
          <ul className="pm-prefs__list">
            {INDUSTRY_OPTIONS.map((option) => {
              const checked = preferences.industries.includes(option.slug);
              return (
                <li key={option.slug}>
                  <label className="pm-prefs__check">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        setPreferences({
                          industries: checked
                            ? preferences.industries.filter((item) => item !== option.slug)
                            : [...preferences.industries, option.slug],
                        })
                      }
                    />
                    {option.label}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="forma-header-auth-menu__item forma-header-auth-menu__item--button"
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
