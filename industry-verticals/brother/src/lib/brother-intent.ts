export type BrotherIntent = 'label-printer' | 'default';

type SearchParamsLike =
  URLSearchParams | Record<string, string | string[] | undefined> | null | undefined;

function readParam(params: SearchParamsLike, key: string): string {
  if (!params) return '';
  if (typeof (params as URLSearchParams).get === 'function') {
    return ((params as URLSearchParams).get(key) || '').trim();
  }
  const value = (params as Record<string, string | string[] | undefined>)[key];
  if (Array.isArray(value)) return (value[0] || '').trim();
  return (value || '').trim();
}

/**
 * Demo personalization: label-printer UTM / campaign promotes VC-500W on home.
 */
export function resolveBrotherIntent(searchParams?: SearchParamsLike): BrotherIntent {
  let params = searchParams;
  if (!params && typeof window !== 'undefined') {
    params = new URLSearchParams(window.location.search);
  }

  const campaign = readParam(params, 'utm_campaign').toLowerCase();
  const content = readParam(params, 'utm_content').toLowerCase();
  const combined = `${campaign} ${content}`;

  if (
    combined.includes('label-printer') ||
    combined.includes('labelprinter') ||
    combined.includes('vc-500w') ||
    combined.includes('vc500w') ||
    combined.includes('labelling')
  ) {
    return 'label-printer';
  }

  return 'default';
}
