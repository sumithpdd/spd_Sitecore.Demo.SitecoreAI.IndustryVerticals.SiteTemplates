export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

export const JOURNEY_STAGES = ['Discover', 'Browse', 'Product', 'Campaign', 'Supplies'] as const;
export type JourneyStage = (typeof JOURNEY_STAGES)[number];

const SESSION_ID_KEY = 'brother-cdp-session-id';
const SESSION_EVENTS_KEY = 'brother-cdp-session-events';
const VISIT_COUNT_KEY = 'brother-cdp-visit-count';
const VISIT_FLAG_KEY = 'brother-cdp-visit-recorded';

const CATEGORIES = [
  'Home',
  'Printers',
  'Labelling',
  'Scanners',
  'Supplies',
  'Campaign',
  'Business',
  'Search',
  'Blog',
  'Devices',
] as const;

const COLLECTIONS = ['VC', 'PT', 'QL', 'TD', 'HL', 'MFC', 'DCP', 'ADS'] as const;

const INTENTS = ['Labelling', 'HomePrinter', 'Campaign', 'Supplies', 'Business', 'Return'] as const;

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
  const normalized = path.toLowerCase().split('?')[0];
  const segments = normalized.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || 'Home';
  const context: Record<string, string> = {
    page: path,
    pageName: lastSegment,
    brand: 'Brother',
    industry: 'Printing and Labelling',
    stage: 'Discover',
    category: 'Home',
    intent: 'Discover',
  };

  if (normalized === '/' || normalized === '') {
    context.category = 'Home';
    context.stage = 'Discover';
  }
  if (normalized.includes('/search')) {
    context.category = 'Search';
    context.stage = 'Browse';
    context.intent = 'Browse';
  }
  if (normalized.includes('/printers') || normalized.includes('/devices/printers')) {
    context.category = 'Printers';
    context.stage = 'Browse';
    context.intent = 'HomePrinter';
  }
  if (
    normalized.includes('/labelling') ||
    normalized.includes('/label-printer') ||
    normalized.includes('/devices/label')
  ) {
    context.category = 'Labelling';
    context.stage = 'Browse';
    context.intent = 'Labelling';
  }
  if (normalized.includes('/scanners') || normalized.includes('/devices/scanners')) {
    context.category = 'Scanners';
    context.stage = 'Browse';
    context.intent = 'Browse';
  }
  if (normalized.includes('/devices')) {
    context.category = context.category === 'Home' ? 'Devices' : context.category;
    context.stage = 'Browse';
  }
  if (normalized.includes('/campaigns') || normalized.includes('at-your-side')) {
    context.category = 'Campaign';
    context.stage = 'Campaign';
    context.intent = 'Campaign';
  }
  if (normalized.includes('/supplies') || normalized.includes('/checkout')) {
    context.category = 'Supplies';
    context.stage = 'Supplies';
    context.intent = 'Supplies';
  }
  if (normalized.includes('/business')) {
    context.category = 'Business';
    context.stage = 'Browse';
    context.intent = 'Business';
  }
  if (normalized.includes('/blog') || normalized.includes('your-home-office')) {
    context.category = 'Blog';
    context.stage = 'Browse';
  }

  // Product line collections from PDP paths
  for (const line of COLLECTIONS) {
    if (
      normalized.includes(`/${line.toLowerCase()}`) ||
      normalized.includes(`/${line.toLowerCase()}-`)
    ) {
      context.collection = line;
      context.stage = 'Product';
      break;
    }
  }
  if (
    /\/devices\/.+\/.+\/.+/.test(normalized) ||
    normalized.includes('vc500w') ||
    normalized.includes('ql-') ||
    normalized.includes('hl-') ||
    normalized.includes('mfc-') ||
    normalized.includes('dcp-') ||
    normalized.includes('ads-') ||
    normalized.includes('pt-') ||
    normalized.includes('td-')
  ) {
    context.stage = 'Product';
  }

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

export function recordSearchEvent(query: string, source: 'header' | 'page'): void {
  appendCdpEvent({
    type: 'SEARCH',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      query,
      source,
      page: typeof window !== 'undefined' ? window.location.pathname : '/',
      brand: 'Brother',
      industry: 'Printing and Labelling',
      category: 'Search',
      stage: 'Browse',
      intent: 'Browse',
    },
  });
}

export function recordIdentityEvent(email: string): void {
  appendCdpEvent({
    type: 'IDENTITY',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      email,
      channel: 'WEB',
      brand: 'Brother',
      industry: 'Printing and Labelling',
      persona: 'Customer',
      intent: 'Identify',
    },
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

export function deriveJourneyStages(events: CdpTrackedEvent[]): JourneyStage[] {
  const seen = new Set<JourneyStage>();
  for (const event of events) {
    const stage = String(event.arbitraryData?.stage ?? '');
    if ((JOURNEY_STAGES as readonly string[]).includes(stage)) {
      seen.add(stage as JourneyStage);
    }
  }
  return JOURNEY_STAGES.filter((stage) => seen.has(stage));
}

export function deriveAffinityFromEvents(
  events: CdpTrackedEvent[]
): Record<string, Record<string, string>> {
  const scores: Record<string, number> = {};
  for (const event of events) {
    if (event.type !== 'VIEW' && event.type !== 'IDENTITY' && event.type !== 'SEARCH') continue;
    const category = String(event.arbitraryData?.category ?? '');
    const collection = String(event.arbitraryData?.collection ?? '');
    const intent = String(event.arbitraryData?.intent ?? '');
    const brand = String(event.arbitraryData?.brand ?? '');

    if (category) scores[category] = (scores[category] || 0) + 1;
    if (collection) scores[collection] = (scores[collection] || 0) + 1;
    if (intent) scores[intent] = (scores[intent] || 0) + 1;
    if (brand) scores[brand] = (scores[brand] || 0) + 1;
  }

  const max = Math.max(1, ...Object.values(scores));
  const categories: Record<string, string> = {};
  const collections: Record<string, string> = {};
  const intents: Record<string, string> = {};
  const brands: Record<string, string> = {};

  for (const [key, val] of Object.entries(scores)) {
    const normalized = (val / max).toFixed(3);
    if ((CATEGORIES as readonly string[]).includes(key)) {
      categories[key] = normalized;
    } else if ((COLLECTIONS as readonly string[]).includes(key)) {
      collections[key] = normalized;
    } else if ((INTENTS as readonly string[]).includes(key)) {
      intents[key] = normalized;
    } else if (key === 'Brother') {
      brands[key] = normalized;
    }
  }

  const ext: Record<string, Record<string, string>> = {};
  if (Object.keys(categories).length) ext.categories = categories;
  if (Object.keys(collections).length) ext.collections = collections;
  if (Object.keys(intents).length) ext.intents = intents;
  if (Object.keys(brands).length) ext.brands = brands;
  return ext;
}
