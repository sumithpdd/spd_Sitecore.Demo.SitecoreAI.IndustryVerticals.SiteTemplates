import { productAffinities } from '@/lib/affinities';
import { STORY } from '@/lib/asos-journey';
import { appendCdpEvent } from '@/lib/cdp/cdp-session-tracker';
import { getProduct, productImage, type Product } from '@/lib/product-catalog';

const KEY = 'asos-bag';

export type BagLine = {
  id: string;
  title: string;
  size: string;
  qty: number;
  priceGbp: number;
  colour: string;
  image: string;
  brand: string;
  category: string;
};

function readRaw(): BagLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BagLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function hydrate(line: BagLine): BagLine {
  const product = getProduct(line.id);
  if (!product) return line;
  return {
    ...line,
    title: line.title || product.title,
    priceGbp: line.priceGbp || product.priceGbp,
    colour: line.colour || product.color,
    image: line.image || productImage(product),
    brand: line.brand || product.brand,
    category: line.category || product.category,
  };
}

function write(lines: BagLine[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event('asos-bag'));
}

function lineFrom(product: Product, size: string, qty: number): BagLine {
  return {
    id: product.id,
    title: product.title,
    size,
    qty,
    priceGbp: product.priceGbp,
    colour: product.color,
    image: productImage(product),
    brand: product.brand,
    category: product.category,
  };
}

function recordBagAffinity(product: Product, size: string): void {
  appendCdpEvent({
    type: 'ADD_TO_BAG',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      page: typeof window !== 'undefined' ? window.location.pathname : product.href,
      productId: product.id,
      brand: product.brand,
      category: product.category,
      colour: product.color,
      fit: product.bodyFit[0] || '',
      size,
      affinities: productAffinities(product),
    },
  });
}

/** First visit holds the story jean so My Bag has a line to show. */
export function primeDemoBag(): void {
  if (typeof window === 'undefined') return;
  if (window.localStorage.getItem(KEY) !== null) return;
  const product = getProduct(STORY.heroProductId);
  if (!product) {
    write([]);
    return;
  }
  write([lineFrom(product, STORY.keepSize, 1)]);
  recordBagAffinity(product, STORY.keepSize);
}

export function addToBag(product: Product, size: string): void {
  const lines = readRaw();
  const existing = lines.find((line) => line.id === product.id && line.size === size);
  if (existing) existing.qty += 1;
  else lines.push(lineFrom(product, size, 1));
  write(lines);
  recordBagAffinity(product, size);
}

export function removeFromBag(id: string, size: string): void {
  write(readRaw().filter((line) => !(line.id === id && line.size === size)));
}

export function bagLines(): BagLine[] {
  return readRaw().map(hydrate);
}

export function bagCount(): number {
  return readRaw().reduce((sum, line) => sum + (line.qty || 0), 0);
}

export function bagTotal(lines: BagLine[]): number {
  return lines.reduce((sum, line) => sum + line.priceGbp * line.qty, 0);
}
