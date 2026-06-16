/**
 * Backward-compatible re-exports. Prefer `@/lib/lyveragroup-site` for new code.
 */
export {
  LYVERA_GROUP_TENANT_PATH,
  LYVERA_CORPORATE_SITE,
  KEITH_PROWSE_SITE,
  EVENTS_INTERNATIONAL_SITE,
  type LyveraGroupSiteKey,
  resolveLyveraGroupSite,
  isLyveraGroupSite,
  isLyveraCorporateSite,
  isKeithProwseSite,
  isEventsInternationalSite,
  lyveraGroupSiteClass,
  getPublicItemPath,
} from '@/lib/lyveragroup-site';

/** @deprecated Use LyveraGroupSiteKey */
export type LyveraGroupSiteName = import('@/lib/lyveragroup-site').LyveraGroupSiteKey;

/** @deprecated Use isEventsInternationalSite */
export { isEventsInternationalSite as isBrandSite } from '@/lib/lyveragroup-site';
