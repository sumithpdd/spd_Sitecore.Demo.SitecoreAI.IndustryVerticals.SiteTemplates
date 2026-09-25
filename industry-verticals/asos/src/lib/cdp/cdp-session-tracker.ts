export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

const SESSION_ID_KEY = 'asos-cdp-session-id';
const SESSION_EVENTS_KEY = 'asos-cdp-session-events';
const VISIT_COUNT_KEY = 'asos-cdp-visit-count';
const VISIT_FLAG_KEY = 'asos-cdp-visit-recorded';
const GUEST_KEY = 'asos-cdp-guest';

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
  window.sessionStorage.setItem(SESSION_EVENTS_KEY, JSON.stringify(events.slice(-40)));
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

export function getGuestName(): string {
  if (typeof window === 'undefined') return 'Guest';
  return window.localStorage.getItem(GUEST_KEY) || 'Guest';
}

export function identifyGuest(name: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GUEST_KEY, name);
  appendCdpEvent({
    type: 'IDENTITY',
    createdAt: new Date().toISOString(),
    arbitraryData: { name },
  });
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

export function getSessionEvents(): CdpTrackedEvent[] {
  return readEvents();
}

export function recordPageView(path: string): void {
  appendCdpEvent({
    type: 'VIEW',
    createdAt: new Date().toISOString(),
    arbitraryData: { page: path, ...affinitiesForPath(path) },
  });
}

export function recordSearchEvent(query: string, source: string): void {
  appendCdpEvent({
    type: 'SEARCH',
    createdAt: new Date().toISOString(),
    arbitraryData: { query, source },
  });
}

export function affinitiesForPath(path: string): Record<string, string> {
  const normalized = path.toLowerCase();
  const affinity: Record<string, string> = {};
  if (normalized.includes('petite') || normalized.includes('denim')) affinity.fit = 'Petite denim';
  if (normalized.includes('topshop') || normalized.includes('200415553'))
    affinity.brand = 'Topshop';
  if (normalized.includes('weekday') || normalized.includes('211674477'))
    affinity.brand = 'Weekday';
  if (normalized.includes('new-in') || normalized.includes('27108')) affinity.edit = 'New in';
  if (normalized.includes('/prd/')) affinity.intent = 'PDP';
  if (normalized.includes('/cat')) affinity.intent = 'Listing';
  return affinity;
}
