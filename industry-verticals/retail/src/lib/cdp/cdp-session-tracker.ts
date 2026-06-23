export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

const SESSION_ID_KEY = 'forma-lux-cdp-session-id';
const SESSION_EVENTS_KEY = 'forma-lux-cdp-session-events';
const VISIT_COUNT_KEY = 'forma-lux-cdp-visit-count';
const VISIT_FLAG_KEY = 'forma-lux-cdp-visit-recorded';

function readEvents(): CdpTrackedEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(SESSION_EVENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CdpTrackedEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEvents(events: CdpTrackedEvent[]): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(SESSION_EVENTS_KEY, JSON.stringify(events.slice(-50)));
}

export function getSessionRef(): string {
  if (typeof window === 'undefined') return 'session_unknown';
  let id = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = `web_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    window.sessionStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

export function recordVisitOnce(): number {
  if (typeof window === 'undefined') return 1;
  const already = window.sessionStorage.getItem(VISIT_FLAG_KEY);
  let count = Number.parseInt(window.localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) || 0;
  if (!already) {
    count += 1;
    window.localStorage.setItem(VISIT_COUNT_KEY, String(count));
    window.sessionStorage.setItem(VISIT_FLAG_KEY, '1');
  }
  return count;
}

export function getVisitCount(): number {
  if (typeof window === 'undefined') return 0;
  return Number.parseInt(window.localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) || 0;
}

export function appendCdpEvent(event: CdpTrackedEvent): void {
  writeEvents([...readEvents(), event]);
}

function derivePageContext(path: string): Record<string, string> {
  const normalized = path.toLowerCase();
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'Home';
  const context: Record<string, string> = {
    page: path,
    pageName: lastSegment,
    brand: 'Forma Lux',
  };

  if (normalized.includes('furniture')) context.category = 'Furniture';
  if (normalized.includes('decor')) context.category = 'Decor';
  if (normalized.includes('product')) context.category = 'Products';
  if (normalized.includes('article') || normalized.includes('journal')) {
    context.category = 'Articles';
  }
  if (normalized.includes('lumina')) context.collection = 'Lumina';
  if (normalized.includes('about')) context.intent = 'Brand';
  if (normalized.includes('contact')) context.intent = 'Contact';

  return context;
}

export function recordPageView(path: string, pageName?: string): void {
  const context = derivePageContext(path);
  if (pageName) context.pageName = pageName;

  appendCdpEvent({
    type: 'VIEW',
    createdAt: new Date().toISOString(),
    arbitraryData: context,
  });
}

export function recordIdentityEvent(email: string): void {
  appendCdpEvent({
    type: 'IDENTITY',
    createdAt: new Date().toISOString(),
    arbitraryData: { email, channel: 'WEB' },
  });
}

export function getSessionEvents(): CdpTrackedEvent[] {
  return readEvents();
}

export function clearSessionTracker(): void {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(SESSION_ID_KEY);
  window.sessionStorage.removeItem(SESSION_EVENTS_KEY);
  window.sessionStorage.removeItem(VISIT_FLAG_KEY);
}

export function clearVisitHistory(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(VISIT_COUNT_KEY);
}

export function deriveAffinityFromEvents(
  events: CdpTrackedEvent[]
): Record<string, Record<string, string>> {
  const scores: Record<string, number> = {};
  for (const event of events) {
    if (event.type !== 'VIEW') continue;
    const category = String(event.arbitraryData?.category ?? '');
    const collection = String(event.arbitraryData?.collection ?? '');
    const intent = String(event.arbitraryData?.intent ?? '');

    if (category) scores[category] = (scores[category] || 0) + 1;
    if (collection) scores[collection] = (scores[collection] || 0) + 1;
    if (intent) scores[intent] = (scores[intent] || 0) + 1;
  }

  const max = Math.max(1, ...Object.values(scores));
  const categories: Record<string, string> = {};
  const collections: Record<string, string> = {};
  const intents: Record<string, string> = {};

  for (const [key, val] of Object.entries(scores)) {
    const normalized = (val / max).toFixed(3);
    if (['Furniture', 'Decor', 'Products', 'Articles'].includes(key)) {
      categories[key] = normalized;
    } else if (key === 'Lumina') {
      collections[key] = normalized;
    } else {
      intents[key] = normalized;
    }
  }

  const ext: Record<string, Record<string, string>> = {};
  if (Object.keys(categories).length) ext.categories = categories;
  if (Object.keys(collections).length) ext.collections = collections;
  if (Object.keys(intents).length) ext.intents = intents;
  return ext;
}
