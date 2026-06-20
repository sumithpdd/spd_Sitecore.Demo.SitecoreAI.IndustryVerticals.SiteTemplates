export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

const SESSION_ID_KEY = 'marley-cdp-session-id';
const SESSION_EVENTS_KEY = 'marley-cdp-session-events';
const VISIT_COUNT_KEY = 'marley-cdp-visit-count';
const VISIT_FLAG_KEY = 'marley-cdp-visit-recorded';

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
  };

  if (normalized.includes('tennis') || normalized.includes('wimbledon')) {
    context.sport = 'Tennis';
    context.brand = 'Keith Prowse';
  }
  if (normalized.includes('cricket')) context.sport = 'Cricket';
  if (normalized.includes('rugby')) context.sport = 'Rugby';
  if (normalized.includes('racing') || normalized.includes('ascot')) context.sport = 'Racing';
  if (normalized.includes('football')) context.sport = 'Football';
  if (normalized.includes('keithprowse') || normalized.includes('keith-prowse')) {
    context.brand = 'Keith Prowse';
  }
  if (normalized.includes('gulliver')) context.brand = 'Gullivers Travel';
  if (normalized.includes('lyvera')) context.brand = 'Lyvera';
  if (normalized.includes('marley')) context.brand = 'Marley';

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
    const page = String(event.arbitraryData?.page ?? '').toLowerCase();
    const sport = String(event.arbitraryData?.sport ?? '');
    const brand = String(event.arbitraryData?.brand ?? '');

    if (sport) scores[sport] = (scores[sport] || 0) + 1;
    if (brand) scores[brand] = (scores[brand] || 0) + 1;

    if (page.includes('tennis') || page.includes('wimbledon'))
      scores.Tennis = (scores.Tennis || 0) + 1;
    if (page.includes('cricket')) scores.Cricket = (scores.Cricket || 0) + 1;
    if (page.includes('rugby')) scores.Rugby = (scores.Rugby || 0) + 1;
    if (page.includes('racing') || page.includes('ascot')) scores.Racing = (scores.Racing || 0) + 1;
    if (page.includes('football')) scores.Football = (scores.Football || 0) + 1;
    if (page.includes('keithprowse') || page.includes('keith-prowse')) {
      scores['Keith Prowse'] = (scores['Keith Prowse'] || 0) + 1;
    }
  }

  const max = Math.max(1, ...Object.values(scores));
  const sports: Record<string, string> = {};
  const brands: Record<string, string> = {};
  for (const [key, val] of Object.entries(scores)) {
    if (['Tennis', 'Cricket', 'Rugby', 'Racing', 'Football'].includes(key)) {
      sports[key] = (val / max).toFixed(3);
    } else {
      brands[key] = (val / max).toFixed(3);
    }
  }

  const ext: Record<string, Record<string, string>> = {};
  if (Object.keys(sports).length) ext.sports = sports;
  if (Object.keys(brands).length) ext.brands = brands;
  return ext;
}
