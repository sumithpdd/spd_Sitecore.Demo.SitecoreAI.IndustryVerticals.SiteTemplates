import type { BodyFit } from '@/lib/asos-journey';

const KEY = 'asos-fit-profile';

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
  return sizes.find((size) => size.replace(/^uk\s*/i, '') === wanted);
}
