export type DemoCartLine = {
  sku: string;
  title: string;
  priceGbp: number;
  qty: number;
  href: string;
};

const STORAGE_KEY = 'brother-demo-cart';
const EVENT_NAME = 'brother-demo-cart';

function canUseStorage(): boolean {
  return typeof window !== 'undefined';
}

function readCart(): DemoCartLine[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DemoCartLine[];
    return Array.isArray(parsed) ? parsed.filter((line) => line?.sku) : [];
  } catch {
    return [];
  }
}

function writeCart(lines: DemoCartLine[]): DemoCartLine[] {
  if (canUseStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    window.dispatchEvent(new Event(EVENT_NAME));
  }
  return lines;
}

export function getCart(): DemoCartLine[] {
  return readCart();
}

export function cartItemCount(lines = readCart()): number {
  return lines.reduce((sum, line) => sum + (line.qty || 0), 0);
}

export function cartTotalGbp(lines = readCart()): number {
  return lines.reduce((sum, line) => sum + line.priceGbp * line.qty, 0);
}

export function addToCart(item: Omit<DemoCartLine, 'qty'>, qty = 1): DemoCartLine[] {
  const lines = readCart();
  const existing = lines.find((line) => line.sku === item.sku);
  if (existing) {
    existing.qty += qty;
    existing.title = item.title || existing.title;
    existing.priceGbp = item.priceGbp || existing.priceGbp;
    existing.href = item.href || existing.href;
  } else {
    lines.push({ ...item, qty });
  }
  return writeCart(lines);
}

export function subscribeCart(listener: () => void): () => void {
  if (!canUseStorage()) return () => undefined;
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener(EVENT_NAME, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, listener);
    window.removeEventListener('storage', onStorage);
  };
}
