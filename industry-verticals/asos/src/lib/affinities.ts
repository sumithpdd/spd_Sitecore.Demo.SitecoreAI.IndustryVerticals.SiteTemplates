/** SitecoreAI page affinities: name + value, a-z, 0-9, underscore, max 10 per page. */

export type Affinity = {
  name: string;
  value: string;
};

export const AFFINITY_FIELD = 'Affinities';
export const MAX_AFFINITIES = 10;
const TOKEN = /^[a-z0-9_]{1,48}$/;

export function affinityToken(value: string): string {
  return value
    .toLowerCase()
    .replace(/&amp;/g, ' ')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 48);
}

export function productAffinities(product: {
  brand: string;
  category: string;
  color: string;
}): Affinity[] {
  const category = affinityToken(product.category);
  const rows: Affinity[] = [
    { name: 'content_type', value: 'product' },
    { name: 'brand', value: affinityToken(product.brand) },
    { name: 'product_type', value: category },
    { name: 'category', value: category },
    { name: 'colour', value: affinityToken(product.color) },
  ];
  return rows
    .filter((row) => TOKEN.test(row.name) && TOKEN.test(row.value))
    .slice(0, MAX_AFFINITIES);
}

export function pageAffinitiesForPath(path: string): Affinity[] {
  const normalized = path.toLowerCase().split('?')[0];
  const rows: Affinity[] = [];
  if (normalized.includes('/bag')) {
    rows.push({ name: 'content_type', value: 'bag' }, { name: 'intent', value: 'purchase' });
  } else if (normalized.includes('/saved-items')) {
    rows.push({ name: 'content_type', value: 'saved' }, { name: 'intent', value: 'save' });
  } else if (normalized.includes('/style-feed/')) {
    rows.push({ name: 'content_type', value: 'article' }, { name: 'topic', value: 'style_feed' });
  } else if (/\/products\/[^/]+/.test(normalized)) {
    rows.push({ name: 'content_type', value: 'product' });
  } else if (
    normalized.includes('/women') ||
    normalized.includes('/edits/') ||
    normalized.includes('/men')
  ) {
    rows.push({ name: 'content_type', value: 'listing' });
  }
  if (normalized.includes('denim') || normalized.includes('jean')) {
    rows.push({ name: 'category', value: 'denim' }, { name: 'product_type', value: 'denim' });
  }
  if (normalized.includes('topshop')) rows.push({ name: 'brand', value: 'topshop' });
  if (normalized.includes('petite')) rows.push({ name: 'fit', value: 'petite' });
  return rows.slice(0, MAX_AFFINITIES);
}

export function formatAffinityField(rows: Affinity[]): string {
  return rows.map((row) => `${row.name}|${row.value}`).join('\n');
}

export function parseAffinityField(value: string): Affinity[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, ...rest] = line.split('|');
      return { name: (name || '').trim(), value: rest.join('|').trim() };
    })
    .filter((row) => TOKEN.test(row.name) && TOKEN.test(row.value))
    .slice(0, MAX_AFFINITIES);
}

export function validateAffinities(input: unknown): { affinities: Affinity[] } | { error: string } {
  if (!Array.isArray(input) || input.length === 0) {
    return { error: 'affinities must be a non-empty list of { name, value }' };
  }
  if (input.length > MAX_AFFINITIES) {
    return { error: `a page can have at most ${MAX_AFFINITIES} affinities` };
  }
  const affinities: Affinity[] = [];
  const seen = new Set<string>();
  for (const row of input) {
    if (!row || typeof row !== 'object') return { error: 'each affinity needs a name and value' };
    const name = affinityToken(String((row as Affinity).name || ''));
    const value = affinityToken(String((row as Affinity).value || ''));
    if (!TOKEN.test(name) || !TOKEN.test(value)) {
      return { error: 'affinity names and values use a-z, 0-9, and underscores' };
    }
    const key = `${name}|${value}`;
    if (seen.has(key)) return { error: `duplicate affinity ${key}` };
    seen.add(key);
    affinities.push({ name, value });
  }
  return { affinities };
}
