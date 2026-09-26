import { getProduct, type Product } from '@/lib/product-catalog';

const KEY = 'asos-recent';

export function readRecentIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const ids = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function rememberProduct(id: string): void {
  const ids = [id, ...readRecentIds().filter((item) => item !== id)].slice(0, 12);
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event('asos-recent'));
}

export function clearRecent(): void {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('asos-recent'));
}

export function recentProducts(exceptId?: string): Product[] {
  return readRecentIds()
    .filter((id) => id !== exceptId)
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item));
}
