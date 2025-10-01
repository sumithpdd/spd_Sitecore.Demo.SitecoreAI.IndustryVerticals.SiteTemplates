import { localeOptions } from '@/constants/localeOptions';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

/**
 * Get current locale
 */
export function getLocale(): string {
  const { page } = useSitecore();
  return page.locale || 'en-US';
}

/**
 * Get currency for a given locale (defaults to current locale)
 */
export function getCurrency(locale?: string): string {
  const targetLocale = locale || getLocale() || 'en-US';
  const localeItem = localeOptions.find((l) => l.code === targetLocale);
  return localeItem?.currency || 'USD';
}

/**
 * Get currency symbol for a given locale (defaults to current locale)
 */
export function getCurrencySymbol(locale?: string): string {
  const targetLocale = locale || getLocale() || 'en-US';
  const localeItem = localeOptions.find((l) => l.code === targetLocale);
  return localeItem?.currencySymbol || '$';
}
