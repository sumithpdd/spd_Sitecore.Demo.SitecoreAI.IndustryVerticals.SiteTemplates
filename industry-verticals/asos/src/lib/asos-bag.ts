import type { Product } from '@/lib/product-catalog';

const KEY = 'asos-bag';

export type BagLine = {
  id: string;
  title: string;
  size: string;
  qty: number;
  priceGbp: number;
};

function read(): BagLine[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || '[]') as BagLine[];
  } catch {
    return [];
  }
}

function write(lines: BagLine[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
}

export function addToBag(product: Product, size: string): void {
  const lines = read();
  const existing = lines.find((line) => line.id === product.id && line.size === size);
  if (existing) existing.qty += 1;
  else
    lines.push({
      id: product.id,
      title: product.title,
      size,
      qty: 1,
      priceGbp: product.priceGbp,
    });
  write(lines);
}

export function bagLines(): BagLine[] {
  return read();
}

export function bagCount(): number {
  return read().reduce((sum, line) => sum + line.qty, 0);
}
