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

const AUTH_KEY = 'marley-demo-auth';
const LEGACY_AUTH_KEY = 'lyvera-demo-auth';

export const DEMO_EMAIL = 'david.wilson@sitecore.com';
export const DEMO_DISPLAY_NAME = 'David Wilson';

export type DemoUser = {
  email: string;
  displayName: string;
};

type DemoAuthContextValue = {
  user: DemoUser | null;
  isLoggedIn: boolean;
  siteLabel: string;
  setSiteLabel: (label: string) => void;
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

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

function readStoredUser(): DemoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw =
      window.localStorage.getItem(AUTH_KEY) ?? window.localStorage.getItem(LEGACY_AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    if (parsed?.email) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [siteLabel, setSiteLabel] = useState('Marley');
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

  const persistUser = useCallback((next: DemoUser) => {
    setUser(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(next));
      window.localStorage.removeItem(LEGACY_AUTH_KEY);
    }
    setLoginOpen(false);
    setLoginStep('account');
  }, []);

  const completeLogin = useCallback(() => {
    void (async () => {
      try {
        await identifyVisitorByEmail(DEMO_EMAIL);
      } catch (e) {
        console.debug('Identity event failed:', e);
      }
      persistUser({ email: DEMO_EMAIL, displayName: DEMO_DISPLAY_NAME });
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
      window.localStorage.removeItem(LEGACY_AUTH_KEY);
    }
  }, []);

  const value = useMemo<DemoAuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      siteLabel,
      setSiteLabel,
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
      siteLabel,
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

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

export function useDemoAuth(): DemoAuthContextValue {
  const ctx = useContext(DemoAuthContext);
  if (!ctx) {
    throw new Error('useDemoAuth must be used within DemoAuthProvider');
  }
  return ctx;
}
