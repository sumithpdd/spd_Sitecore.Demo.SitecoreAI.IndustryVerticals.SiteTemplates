import type { BodyFit } from '@/lib/asos-journey';
import { STORY } from '@/lib/asos-journey';

const KEY = 'asos-fit-profile';

/** Signed-in shoppers are sized in UK 8 — the size they kept. */
export const LOGGED_IN_UK_SIZE = '8';

/** Pink card and PDP badge when that kept size is on the product but gone. */
export const SOLD_OUT_BADGE = 'Not available in your size';

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

/** UK size for badges. Signed-in shoppers are UK 8. Guests stay on the story size. */
export function shopperUkSize(asPath = ''): string {
  const logged = loggedInUkSize(asPath);
  if (logged) return logged;
  const profile = readProfile();
  const fromProfile = profile?.size?.replace(/\D/g, '');
  if (fromProfile) return fromProfile;
  return STORY.keepSize.replace(/\D/g, '');
}

/** True when the product has numbered sizes and none of them is this UK size. */
export function productMissesSize(sizes: string[], uk: string | null): boolean {
  if (!uk) return false;
  const wanted = uk.replace(/\D/g, '');
  if (!wanted) return false;
  const numbered = sizes.map((size) => size.replace(/\D/g, '')).filter(Boolean);
  if (!numbered.length) return false;
  return !numbered.includes(wanted);
}

/** True when this UK size is listed and marked out of stock. */
export function sizeOutOfStock(outOfStock: string[] | undefined, uk: string | null): boolean {
  if (!uk || !outOfStock?.length) return false;
  const wanted = uk.replace(/\D/g, '');
  if (!wanted) return false;
  return outOfStock.some((size) => size.replace(/\D/g, '') === wanted);
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
  return sizes.find(
    (size) => size.replace(/^uk\s*/i, '').replace(/\D/g, '') === wanted.replace(/\D/g, '')
  );
}
