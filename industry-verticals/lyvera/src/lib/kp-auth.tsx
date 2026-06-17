'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { displayNameFromEmail, identifyVisitorByEmail } from '@/lib/cdp/cdp-identity';

const AUTH_KEY = 'kp-demo-auth';

export const KP_DEMO_EMAIL = 'james.wilson@sitecore.com';
export const KP_DEMO_DISPLAY_NAME = 'James';

export type KpUser = {
  email: string;
  displayName: string;
};

type KpAuthContextValue = {
  user: KpUser | null;
  isLoggedIn: boolean;
  loginOpen: boolean;
  loginStep: 'account' | 'code';
  openLogin: (step?: 'account' | 'code') => void;
  closeLogin: () => void;
  selectAccount: () => void;
  backToAccount: () => void;
  completeLogin: () => void;
  loginWithEmail: (email: string) => Promise<void>;
  logout: () => void;
};

const KpAuthContext = createContext<KpAuthContextValue | null>(null);

function readStoredUser(): KpUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as KpUser;
    if (parsed?.email) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function KpAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<KpUser | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'account' | 'code'>('account');

  useEffect(() => {
    setUser(readStoredUser());
  }, []);

  const openLogin = useCallback((step: 'account' | 'code' = 'account') => {
    setLoginStep(step);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const selectAccount = useCallback(() => setLoginStep('code'), []);

  const backToAccount = useCallback(() => setLoginStep('account'), []);

  const persistUser = useCallback((next: KpUser) => {
    setUser(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(next));
    }
    setLoginOpen(false);
    setLoginStep('account');
  }, []);

  const completeLogin = useCallback(() => {
    void (async () => {
      try {
        await identifyVisitorByEmail(KP_DEMO_EMAIL);
      } catch (e) {
        console.debug('Identity event failed:', e);
      }
      persistUser({ email: KP_DEMO_EMAIL, displayName: KP_DEMO_DISPLAY_NAME });
    })();
  }, [persistUser]);

  const loginWithEmail = useCallback(
    async (email: string) => {
      await identifyVisitorByEmail(email);
      persistUser({ email, displayName: displayNameFromEmail(email) });
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(AUTH_KEY);
    }
  }, []);

  const value = useMemo<KpAuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      loginOpen,
      loginStep,
      openLogin,
      closeLogin,
      selectAccount,
      backToAccount,
      completeLogin,
      loginWithEmail,
      logout,
    }),
    [
      user,
      loginOpen,
      loginStep,
      openLogin,
      closeLogin,
      selectAccount,
      backToAccount,
      completeLogin,
      loginWithEmail,
      logout,
    ]
  );

  return <KpAuthContext.Provider value={value}>{children}</KpAuthContext.Provider>;
}

export function useKpAuth(): KpAuthContextValue {
  const ctx = useContext(KpAuthContext);
  if (!ctx) {
    throw new Error('useKpAuth must be used within KpAuthProvider');
  }
  return ctx;
}
