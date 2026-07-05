import type { Page } from '@sitecore-content-sdk/nextjs';

export const HERITAGE_SITE_NAME = 'heritage';

export function isHeritageSite(page: Page | null | undefined): boolean {
  return page?.siteName?.toLowerCase() === HERITAGE_SITE_NAME;
}
