import { getProduct, type Product } from '@/lib/product-catalog';
import { STORY } from '@/lib/asos-journey';

const KEY = 'asos-my-edit';

export type SavedItem = {
  id: string;
  size: string;
  fitNote: string;
  group: string;
  savedAt: string;
};

export type EditBoard = {
  items: SavedItem[];
};

function empty(): EditBoard {
  return { items: [] };
}

export function readBoard(): EditBoard {
  if (typeof window === 'undefined') return empty();
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as EditBoard) : empty();
  } catch {
    return empty();
  }
}

export function writeBoard(board: EditBoard): void {
  window.localStorage.setItem(KEY, JSON.stringify(board));
  window.dispatchEvent(new Event('asos-save'));
}

export function isSaved(id: string): boolean {
  return readBoard().items.some((item) => item.id === id);
}

export function toggleSave(product: Product, size = 'UK 8'): boolean {
  const board = readBoard();
  const exists = board.items.find((item) => item.id === product.id);
  if (exists) {
    board.items = board.items.filter((item) => item.id !== product.id);
    writeBoard(board);
    return false;
  }
  board.items.push({
    id: product.id,
    size,
    fitNote: product.fitFeedback,
    group: STORY.berlinIds.includes(product.id) ? STORY.editName : product.brand,
    savedAt: new Date().toISOString(),
  });
  writeBoard(board);
  return true;
}

export function savedProducts(): { product: Product; saved: SavedItem }[] {
  return readBoard()
    .items.map((saved) => {
      const product = getProduct(saved.id);
      return product ? { product, saved } : null;
    })
    .filter((row): row is { product: Product; saved: SavedItem } => Boolean(row));
}

export function curationStats() {
  const rows = savedProducts();
  const bySize: Record<string, number> = {};
  const byFit: Record<string, number> = {};
  rows.forEach(({ product, saved }) => {
    bySize[saved.size] = (bySize[saved.size] || 0) + 1;
    product.bodyFit.forEach((fit) => {
      byFit[fit] = (byFit[fit] || 0) + 1;
    });
  });
  return {
    saves: rows.length,
    bySize,
    byFit,
    combinations: rows.slice(0, 6).map(({ product }) => product.title),
    saveToBuy: rows.length ? Math.min(0.42 + rows.length * 0.03, 0.71) : 0,
  };
}
