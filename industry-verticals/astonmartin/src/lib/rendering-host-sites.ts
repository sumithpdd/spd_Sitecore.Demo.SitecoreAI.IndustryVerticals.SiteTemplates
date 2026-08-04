import type { SiteInfo } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';

/** Sites served by the astonmartin rendering host (see docs/ASTONMARTIN.md). */
export const ASTONMARTIN_RENDERING_HOST_SITES = ['astonmartin'] as const;

/**
 * Site names to include in SSG path discovery for this rendering host.
 * sites.json from XM Cloud lists every tenant site; this host only builds astonmartin.
 */
export function getStaticBuildSiteNames(allSites: SiteInfo[]): string[] {
  const configured = process.env.SITECORE_STATIC_BUILD_SITES?.split(',')
    .map((name) => name.trim())
    .filter(Boolean);

  const siteNames = configured?.length ? configured : [...ASTONMARTIN_RENDERING_HOST_SITES];
  const known = new Set(allSites.map((site) => site.name));

  return siteNames.filter((name) => known.has(name));
}

export function hasRenderableLayout(
  page: { layout?: { sitecore?: { route?: unknown } } } | null | undefined
): boolean {
  return Boolean(page?.layout?.sitecore?.route);
}

export function getDefaultStaticBuildSite(): string {
  return scConfig.defaultSite || ASTONMARTIN_RENDERING_HOST_SITES[0];
}
