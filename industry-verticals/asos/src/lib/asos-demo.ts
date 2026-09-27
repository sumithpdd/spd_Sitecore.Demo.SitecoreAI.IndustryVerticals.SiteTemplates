/**
 * Demo control parameters for the ASOS build.
 * See docs/ASOS.md and ASOS-REQUIRED-INVENTORY.md ("Demo control parameters").
 *
 * Pure URL helpers, mirroring `cidFromQuery` in asos-journey.ts — read a query
 * string (from `asPath` on the server, or `window.location.search` on the client)
 * and return a typed value. No React, no side effects.
 */

export const AUDIENCES = ['shop', 'inspire'] as const;
export type Audience = (typeof AUDIENCES)[number];

/**
 * The class name that leaks as visible text where link labels should be on the
 * live `/women` page (ASOS-CONTEXT §4.1). Rendered in place of CTA labels when
 * `?broken=1` (audit state B-01).
 */
export const VIEWMODEL_LEAK =
  'Asos.Content.Modules.Components.Website.Areas.Components.ViewModels.Shared.LinkViewModel';

/** A foreign-locale URL leaking into UK navigation (ASOS-CONTEXT §4.3), audit state B-05. */
export const LEAKED_LOCALE_HREF = '/mujer/ctas/moda-de-espana-online-2/';

export const FRAMES = ['phone', 'off'] as const;
export type Frame = (typeof FRAMES)[number];

function paramsFrom(source?: string): URLSearchParams {
  if (typeof source === 'string') {
    return new URLSearchParams(source.split('?')[1] || '');
  }
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams('');
}

/**
 * `?audience=shop|inspire` — conversion-led vs inspiration-led layout.
 * Defaults to `shop` (the conversion-led baseline) when absent or invalid.
 */
export function getAudience(source?: string): Audience {
  const v = paramsFrom(source).get('audience');
  return (AUDIENCES as readonly string[]).includes(v ?? '') ? (v as Audience) : 'shop';
}

/**
 * `?broken=1` — the audit toggle. When on, components render their
 * deliberately broken state (B-01..B-05 in the required inventory):
 * ViewModel-class-as-label, empty alt text, single-dimension tags,
 * hand-placed related content, leaked foreign-locale URLs.
 */
export function isBroken(source?: string): boolean {
  return paramsFrom(source).get('broken') === '1';
}

/**
 * `?frame=phone|off` — the app/phone frame wrapper.
 * The build is app-majority, so the frame is ON by default and only
 * suppressed with `?frame=off` (or automatically inside the Sitecore editor,
 * handled by the AppFrame component, not here).
 */
export function getFrame(source?: string): Frame {
  return paramsFrom(source).get('frame') === 'off' ? 'off' : 'phone';
}

export function frameEnabled(source?: string): boolean {
  return getFrame(source) === 'phone';
}
