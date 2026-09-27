import type { BodyFit } from '@/lib/asos-journey';

const KEY = 'asos-fit-profile';

/** Signed-in shoppers are sized in UK 10. */
export const LOGGED_IN_UK_SIZE = '10';

export function shopperIsLoggedIn(asPath = ''): boolean {
  if (asPath.includes('known=1')) return true;
  if (readProfile()?.signedIn) return true;
  if (typeof window === 'undefined') return false;
  const email = window.localStorage.getItem('asos-cdp-email');
  const name = window.localStorage.getItem('asos-cdp-guest');
  return Boolean(email) || Boolean(name && name !== 'Guest');
}

export function loggedInUkSize(asPath = ''): string | null {
  return shopperIsLoggedIn(asPath) ? LOGGED_IN_UK_SIZE : null;
}

/** Catalogue size token that matches a UK size, or an empty string. */
export function matchCatalogSize(sizes: string[], uk: string | null): string {
  if (!uk) return '';
  const wanted = uk.replace(/\D/g, '');
  if (!wanted) return '';
  return sizes.find((size) => size.replace(/\D/g, '') === wanted) || '';
}

export type FitProfile = {
  name: string;
  signedIn: boolean;
  bodyFit: BodyFit;
  size: string;
};

export function readProfile(): FitProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const profile = JSON.parse(raw) as FitProfile;
    return profile.signedIn ? profile : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: FitProfile): void {
  sessionStorage.setItem(KEY, JSON.stringify(profile));
}

export function sizeFromProfile(sizes: string[], profile: FitProfile | null): string | undefined {
  if (!profile?.signedIn) return undefined;
  const wanted = profile.size.replace(/^uk\s*/i, '');
  return sizes.find((size) => size.replace(/^uk\s*/i, '').replace(/\D/g, '') === wanted.replace(/\D/g, ''));
}
