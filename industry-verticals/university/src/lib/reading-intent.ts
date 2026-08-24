export type ReadingIntent = 'we-are-essex' | 'clearing-csai' | 'clearing' | 'default';

type SearchParamsLike =
  URLSearchParams | Record<string, string | string[] | undefined> | null | undefined;

/**
 * Reads a single query value from URLSearchParams or a plain params object.
 */
function readParam(params: SearchParamsLike, key: string): string {
  if (!params) {
    return '';
  }

  if (typeof (params as URLSearchParams).get === 'function') {
    return ((params as URLSearchParams).get(key) || '').trim();
  }

  const value = (params as Record<string, string | string[] | undefined>)[key];
  if (Array.isArray(value)) {
    return (value[0] || '').trim();
  }
  return (value || '').trim();
}

/**
 * Resolves demo personalization intent from utm_campaign / utm_source.
 * Falls back to window.location.search when no params are passed (client).
 */
export function resolveReadingIntent(searchParams?: SearchParamsLike): ReadingIntent {
  let params = searchParams;

  if (!params && typeof window !== 'undefined') {
    params = new URLSearchParams(window.location.search);
  }

  const campaign = readParam(params, 'utm_campaign').toLowerCase();
  const source = readParam(params, 'utm_source').toLowerCase();
  const combined = `${campaign} ${source}`;

  if (
    combined.includes('we-are-essex') ||
    combined.includes('weareessex') ||
    combined.includes('manifesto')
  ) {
    return 'we-are-essex';
  }

  if (
    combined.includes('csai') ||
    combined.includes('cs-ai') ||
    combined.includes('computer-science') ||
    combined.includes('computerscience')
  ) {
    return 'clearing-csai';
  }

  if (
    combined.includes('clearing') ||
    combined.includes('fast-track') ||
    combined.includes('fasttrack')
  ) {
    return 'clearing';
  }

  return 'default';
}

export { resolveReadingIntent as getReadingIntent };
