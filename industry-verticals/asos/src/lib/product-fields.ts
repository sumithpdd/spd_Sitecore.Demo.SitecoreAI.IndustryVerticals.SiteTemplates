import { parseAffinityField, type Affinity } from '@/lib/affinities';

/** UK sizes the product editor can store on the Size field. */
export const UK_SIZE_OPTIONS = ['4', '6', '8', '10', '12', '14', '16'] as const;

export const AFFINITY_GROUPS: { label: string; name: string; values: string[] }[] = [
  {
    label: 'Content type',
    name: 'content_type',
    values: ['product', 'listing', 'article', 'bag', 'saved'],
  },
  {
    label: 'Product type',
    name: 'product_type',
    values: ['denim', 'knitwear', 'shoes', 'tops', 'dresses', 'accessories', 'loungewear'],
  },
  {
    label: 'Brand',
    name: 'brand',
    values: [
      'asos_design',
      'topshop',
      'weekday',
      'dr_denim',
      'bershka',
      'mango',
      'stradivarius',
      'collusion',
      'only',
      'levis',
      'adidas',
      'new_look',
      'river_island',
      'desigual',
      'omnes',
      'monki',
    ],
  },
];

export const COLOUR_SWATCHES: { label: string; hex: string }[] = [
  { label: 'Mid wash', hex: '#7f97b5' },
  { label: 'Black', hex: '#1a1a1a' },
  { label: 'Vintage', hex: '#6d7f92' },
  { label: 'Indigo', hex: '#1c2740' },
  { label: 'Silver', hex: '#c5c7cb' },
  { label: 'Khaki', hex: '#8a7a4b' },
  { label: 'Navy', hex: '#1b2838' },
  { label: 'Light wash', hex: '#b7c6d6' },
  { label: 'Dark wash', hex: '#3d4e63' },
  { label: 'Rinse', hex: '#5c7394' },
  { label: 'Mid blue', hex: '#6e8eae' },
  { label: 'White', hex: '#f7f7f7' },
  { label: 'Cream', hex: '#f3ead7' },
  { label: 'Oat', hex: '#d8c7a6' },
  { label: 'Beige', hex: '#cbb99a' },
  { label: 'Bone', hex: '#e6dcc8' },
  { label: 'Chocolate', hex: '#6b4423' },
  { label: 'Mocha', hex: '#8b6b4a' },
  { label: 'Espresso', hex: '#3c2a22' },
  { label: 'Mink', hex: '#8d735b' },
  { label: 'Grey', hex: '#8a8a8a' },
  { label: 'Green', hex: '#3e5c46' },
  { label: 'Red', hex: '#8b2e2e' },
  { label: 'Cherry', hex: '#9b2d3a' },
  { label: 'Pink', hex: '#d7a0a8' },
  { label: 'Blue', hex: '#3d5a80' },
  { label: 'Bleach', hex: '#d5dde6' },
  { label: 'Stonewash', hex: '#8ea0b5' },
  { label: 'Natural', hex: '#c4b7a2' },
  { label: 'Pale blue', hex: '#c5d4e4' },
  { label: 'Washed black', hex: '#2a2a2a' },
  { label: 'Blue black', hex: '#1a2433' },
  { label: 'Light indigo', hex: '#4d6280' },
  { label: 'Raw indigo', hex: '#243044' },
];

export const SIZE_NOT_WRITTEN = 'Size was not written.';

export function parseSizeField(value: string): string[] {
  const allowed = new Set<string>(UK_SIZE_OPTIONS);
  const found = new Set<string>();
  for (const line of value.split(/\r?\n/)) {
    const token = line.trim().replace(/\D/g, '');
    if (allowed.has(token)) found.add(token);
  }
  return UK_SIZE_OPTIONS.filter((size) => found.has(size));
}

export function formatSizeField(sizes: string[]): string {
  return parseSizeField(sizes.join('\n')).join('\n');
}

export function affinityKey(row: Affinity): string {
  return `${row.name}|${row.value}`;
}

export function isListedAffinity(row: Affinity): boolean {
  return AFFINITY_GROUPS.some(
    (group) => group.name === row.name && group.values.includes(row.value)
  );
}

export function listedAffinity(name: string, value: string): Affinity {
  return { name, value };
}

/** Stored lines that are not one of the grouped choices stay selected. */
export function extraAffinities(value: string): Affinity[] {
  return parseAffinityField(value).filter((row) => !isListedAffinity(row));
}
