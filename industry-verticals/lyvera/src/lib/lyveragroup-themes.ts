import type { Page } from '@sitecore-content-sdk/nextjs';
import {
  isKeithProwseSite,
  isLyveraCorporateSite,
  resolveLyveraGroupSite,
  type LyveraGroupSiteKey,
} from '@/lib/lyveragroup-site';

export type LyveraGroupTheme = {
  key: LyveraGroupSiteKey | 'default';
  /** BEM-style modifier for shared components */
  modifier: string;
  accent: string;
  accentDark: string;
  headerBg: string;
  headerText: string;
  bodyFont: string;
  headingFont: string;
};

const CORPORATE_THEME: LyveraGroupTheme = {
  key: 'lyvera',
  modifier: 'lg-theme--lyvera',
  accent: '#e07a5f',
  accentDark: '#003741',
  headerBg: '#ffffff',
  headerText: '#003741',
  bodyFont: 'Manrope, ui-sans-serif, system-ui, sans-serif',
  headingFont: 'Manrope, ui-sans-serif, system-ui, sans-serif',
};

const KEITH_PROWSE_THEME: LyveraGroupTheme = {
  key: 'keithprowse',
  modifier: 'lg-theme--keithprowse',
  accent: '#7dcec4',
  accentDark: '#232323',
  headerBg: '#232323',
  headerText: '#ffffff',
  bodyFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  headingFont: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const THEMES: Partial<Record<LyveraGroupSiteKey, LyveraGroupTheme>> = {
  lyvera: CORPORATE_THEME,
  keithprowse: KEITH_PROWSE_THEME,
};

export function resolveLyveraGroupTheme(page: Page | null | undefined): LyveraGroupTheme {
  const site = resolveLyveraGroupSite(page);
  if (site && THEMES[site]) return THEMES[site]!;
  return { ...CORPORATE_THEME, key: 'default', modifier: 'lg-theme--default' };
}

export function sharedComponentModifier(page: Page | null | undefined, baseClass: string): string {
  const theme = resolveLyveraGroupTheme(page);
  return [baseClass, theme.modifier].filter(Boolean).join(' ');
}

export { isKeithProwseSite, isLyveraCorporateSite };
