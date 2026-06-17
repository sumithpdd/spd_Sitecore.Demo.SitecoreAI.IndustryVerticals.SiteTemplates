import type { Page } from '@sitecore-content-sdk/nextjs';

export const LYVERA_GROUP_TENANT_PATH = '/sitecore/content/lyveragroup';

/** Sitecore site names under the lyveragroup tenant (shared rendering host: lyvera). */
export const LYVERA_CORPORATE_SITE = 'lyvera';
export const KEITH_PROWSE_SITE = 'keithprowse';
export const GULLIVERS_TRAVEL_SITE = 'gulliverstravel';
export const EVENTS_INTERNATIONAL_SITE = 'events-international';

export type LyveraGroupSiteKey =
  | typeof LYVERA_CORPORATE_SITE
  | typeof KEITH_PROWSE_SITE
  | typeof GULLIVERS_TRAVEL_SITE
  | typeof EVENTS_INTERNATIONAL_SITE
  | 'gullivers-sports-travel'
  | 'theexperiencegolf'
  | 'thevenuescollection'
  | 'limevenueportfolio'
  | 'iluka-collective';

const SITE_CONTENT_PREFIX: Record<LyveraGroupSiteKey, string> = {
  lyvera: `${LYVERA_GROUP_TENANT_PATH}/lyvera`,
  'events-international': `${LYVERA_GROUP_TENANT_PATH}/events-international`,
  'gullivers-sports-travel': `${LYVERA_GROUP_TENANT_PATH}/lyvera`,
  gulliverstravel: `${LYVERA_GROUP_TENANT_PATH}/gulliverstravel`,
  keithprowse: `${LYVERA_GROUP_TENANT_PATH}/keithprowse`,
  theexperiencegolf: `${LYVERA_GROUP_TENANT_PATH}/theexperiencegolf`,
  thevenuescollection: `${LYVERA_GROUP_TENANT_PATH}/thevenuescollection`,
  limevenueportfolio: `${LYVERA_GROUP_TENANT_PATH}/limevenueportfolio`,
  'iluka-collective': `${LYVERA_GROUP_TENANT_PATH}/iluka-collective`,
};

function readItemPath(source: unknown): string | undefined {
  if (!source || typeof source !== 'object' || !('itemPath' in source)) return undefined;
  const { itemPath } = source as { itemPath?: unknown };
  return typeof itemPath === 'string' ? itemPath : undefined;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

/** Resolve which lyveragroup site the current page belongs to. */
export function resolveLyveraGroupSite(page: Page | null | undefined): LyveraGroupSiteKey | null {
  if (!page) return null;

  const siteName = page.siteName?.toLowerCase();
  if (siteName) {
    const match = (Object.keys(SITE_CONTENT_PREFIX) as LyveraGroupSiteKey[]).find(
      (key) => key.toLowerCase() === siteName
    );
    if (match) return match;
  }

  const sitecore = page.layout?.sitecore;
  const itemPath = readItemPath(sitecore?.route) ?? readItemPath(sitecore?.context);
  if (!itemPath?.trim()) return null;

  const normalized = normalizePath(itemPath);
  for (const [key, prefix] of Object.entries(SITE_CONTENT_PREFIX) as [
    LyveraGroupSiteKey,
    string,
  ][]) {
    if (normalized === prefix || normalized.startsWith(`${prefix}/`)) return key;
  }

  return null;
}

export function isLyveraGroupSite(page: Page | null | undefined, siteName: string): boolean {
  return resolveLyveraGroupSite(page) === siteName;
}

export const isLyveraCorporateSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, LYVERA_CORPORATE_SITE);

export const isKeithProwseSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, KEITH_PROWSE_SITE);

export const isGulliversTravelSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, GULLIVERS_TRAVEL_SITE);

export const isEventsInternationalSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, EVENTS_INTERNATIONAL_SITE);

/** CSS modifier for shared components — e.g. `lg-site--keithprowse`. */
export function lyveraGroupSiteClass(page: Page | null | undefined): string {
  const site = resolveLyveraGroupSite(page);
  return site ? `lg-site--${site.replace(/\./g, '-')}` : 'lg-site--unknown';
}

/** Public URL path (e.g. `/brands/keith-prowse` on corporate, `/events/foo` on brand sites). */
export function getPublicItemPath(page: Page | null | undefined): string {
  const sitecore = page?.layout?.sitecore;
  const itemPath = readItemPath(sitecore?.route) ?? readItemPath(sitecore?.context);
  if (!itemPath?.trim()) return '/';

  const normalized = normalizePath(itemPath);

  for (const prefix of Object.values(SITE_CONTENT_PREFIX)) {
    const homePath = `${prefix}/Home`;
    if (normalized === homePath) {
      return prefix.endsWith('/lyvera') ? '/' : '';
    }
    if (normalized.startsWith(`${homePath}/`)) {
      return normalized.slice(homePath.length);
    }
  }

  return normalized;
}
