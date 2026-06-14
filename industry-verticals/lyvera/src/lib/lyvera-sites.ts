import type { Page } from '@sitecore-content-sdk/nextjs';

export const LYVERA_GROUP_TENANT_PATH = '/sitecore/content/lyveragroup';

export const LYVERA_CORPORATE_SITE = 'lyvera';
export const EVENTS_INTERNATIONAL_SITE = 'events-international';

export type LyveraGroupSiteName =
  | typeof LYVERA_CORPORATE_SITE
  | typeof EVENTS_INTERNATIONAL_SITE
  | 'gullivers-sports-travel'
  | 'keithprowse'
  | 'theexperiencegolf'
  | 'thevenuescollection'
  | 'limevenueportfolio'
  | 'iluka-collective';

const SITE_CONTENT_PREFIX: Record<string, string> = {
  lyvera: `${LYVERA_GROUP_TENANT_PATH}/lyvera`,
  'events-international': `${LYVERA_GROUP_TENANT_PATH}/events-international`,
  'gullivers-sports-travel': `${LYVERA_GROUP_TENANT_PATH}/gullivers-sports-travel`,
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

export function isLyveraGroupSite(page: Page | null | undefined, siteName: string): boolean {
  if (!page) return false;
  if (page.siteName?.toLowerCase() === siteName.toLowerCase()) return true;

  const prefix = SITE_CONTENT_PREFIX[siteName];
  if (!prefix) return false;

  const sitecore = page.layout?.sitecore;
  const itemPath = readItemPath(sitecore?.route) ?? readItemPath(sitecore?.context);
  if (!itemPath?.trim()) return false;

  const normalized = itemPath.replace(/\\/g, '/');
  return normalized === prefix || normalized.startsWith(`${prefix}/`);
}

export const isLyveraCorporateSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, LYVERA_CORPORATE_SITE);

export const isEventsInternationalSite = (page: Page | null | undefined): boolean =>
  isLyveraGroupSite(page, EVENTS_INTERNATIONAL_SITE);

export const isBrandSite = (page: Page | null | undefined): boolean =>
  isEventsInternationalSite(page);
