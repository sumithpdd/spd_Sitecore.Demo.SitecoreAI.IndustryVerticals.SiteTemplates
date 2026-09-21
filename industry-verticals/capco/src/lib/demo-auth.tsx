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

const AUTH_KEY = 'capco-demo-auth';
const PREF_KEY = 'capco-demo-prefs';

export const DEMO_EMAIL = 'spd@sitecore.net';
export const DEMO_DISPLAY_NAME = 'Spd';

export type DemoRole = 'visitor' | 'client' | 'editor' | 'admin';

export type ContentPreferences = {
  region: string;
  industries: string[];
  role: DemoRole;
};

export const DEFAULT_PREFERENCES: ContentPreferences = {
  region: 'all',
  industries: [],
  role: 'visitor',
};

export const REGION_OPTIONS = [
  { slug: 'all', label: 'All regions' },
  { slug: 'united-kingdom', label: 'United Kingdom' },
  { slug: 'europe', label: 'Europe' },
  { slug: 'americas', label: 'Americas' },
  { slug: 'asia-pacific', label: 'Asia Pacific' },
] as const;

export const INDUSTRY_OPTIONS = [
  { slug: 'banking-and-payments', label: 'Banking and Payments' },
  { slug: 'capital-markets', label: 'Capital Markets' },
  { slug: 'insurance', label: 'Insurance' },
  { slug: 'wealth-and-asset-management', label: 'Wealth and Asset Management' },
  { slug: 'energy', label: 'Energy' },
] as const;

export const ROLE_OPTIONS: { slug: DemoRole; label: string }[] = [
  { slug: 'visitor', label: 'Visitor' },
  { slug: 'client', label: 'Client' },
  { slug: 'editor', label: 'Editor' },
  { slug: 'admin', label: 'Admin' },
];

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
  preferences: ContentPreferences;
  setPreferences: (patch: Partial<ContentPreferences>) => void;
};

const DemoAuthContext = createContext<DemoAuthContextValue | null>(null);

function readStoredUser(): DemoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DemoUser;
    if (parsed?.email) return parsed;
  } catch {
    /* ignore */
  }
  return null;
}

function readStoredPreferences(): ContentPreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  try {
    const raw = window.localStorage.getItem(PREF_KEY);
    if (!raw) return DEFAULT_PREFERENCES;
    const parsed = JSON.parse(raw) as Partial<ContentPreferences>;
    return {
      region: parsed.region || DEFAULT_PREFERENCES.region,
      industries: Array.isArray(parsed.industries) ? parsed.industries : [],
      role: parsed.role || DEFAULT_PREFERENCES.role,
    };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function matchesPreferredRegion(
  itemRegions: string[] | undefined,
  selected: string
): boolean {
  if (!selected || selected === 'all') {
    return true;
  }
  const regions = itemRegions || [];
  if (regions.length === 0) {
    return true;
  }
  if (selected === 'europe') {
    return regions.some((region) => region === 'europe' || region === 'united-kingdom');
  }
  if (selected === 'united-kingdom') {
    return regions.some((region) => region === 'united-kingdom' || region === 'europe');
  }
  return regions.includes(selected);
}

export function matchesPreferredIndustries(
  itemSectors: string[] | undefined,
  selected: string[]
): boolean {
  if (!selected.length) {
    return true;
  }
  const sectors = itemSectors || [];
  if (sectors.length === 0) {
    return true;
  }
  return sectors.some((sector) => selected.includes(sector));
}

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [siteLabel, setSiteLabel] = useState('Capco');
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<'account' | 'code'>('account');
  const [preferences, setPreferencesState] = useState<ContentPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setUser(readStoredUser());
    setPreferencesState(readStoredPreferences());
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
    }
    setLoginOpen(false);
    setLoginStep('account');
  }, []);

  const setPreferences = useCallback((patch: Partial<ContentPreferences>) => {
    setPreferencesState((current) => {
      const next = { ...current, ...patch };
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(PREF_KEY, JSON.stringify(next));
      }
      return next;
    });
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
      preferences,
      setPreferences,
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
      preferences,
      setPreferences,
    ]
  );

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>;
}

const fallbackAuth: DemoAuthContextValue = {
  user: null,
  isLoggedIn: false,
  siteLabel: 'Capco',
  setSiteLabel: () => undefined,
  loginOpen: false,
  loginStep: 'account',
  openLogin: () => undefined,
  closeLogin: () => undefined,
  selectAccount: () => undefined,
  backToAccount: () => undefined,
  completeLogin: () => undefined,
  loginWithEmail: async () => undefined,
  logout: () => undefined,
  preferences: DEFAULT_PREFERENCES,
  setPreferences: () => undefined,
};

export function useDemoAuth(): DemoAuthContextValue {
  const ctx = useContext(DemoAuthContext);
  return ctx || fallbackAuth;
}
