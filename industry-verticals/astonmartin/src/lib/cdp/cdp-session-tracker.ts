export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

const SESSION_ID_KEY = 'astonmartin-cdp-session-id';
const SESSION_EVENTS_KEY = 'astonmartin-cdp-session-events';
const VISIT_COUNT_KEY = 'astonmartin-cdp-visit-count';
const VISIT_FLAG_KEY = 'astonmartin-cdp-visit-recorded';

const CATEGORIES = [
  'Models',
  'Owners',
  'Experiences',
  'Our World',
  'Configurator',
  'Dealers',
  'Enquiry',
  'Q by Aston Martin',
] as const;

const MODELS = [
  'DB12',
  'Vantage',
  'Vanquish',
  'Valhalla',
  'Valiant',
  'DBX',
  'V12 Vantage',
  'DBS',
] as const;

const INTENTS = ['Configure', 'Ownership', 'Experience', 'Brand', 'Enquire'] as const;

const MODEL_PATH_MATCHERS: Array<{ match: RegExp; model: (typeof MODELS)[number] }> = [
  { match: /v12[- ]?vantage|vantage-roadster/, model: 'V12 Vantage' },
  { match: /vantage/, model: 'Vantage' },
  { match: /vanquish/, model: 'Vanquish' },
  { match: /valhalla/, model: 'Valhalla' },
  { match: /valiant/, model: 'Valiant' },
  { match: /dbx/, model: 'DBX' },
  { match: /dbs/, model: 'DBS' },
  { match: /db12/, model: 'DB12' },
];

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
    brand: 'Aston Martin',
    industry: 'Automobile',
  };

  if (normalized.includes('/models') || normalized.includes('past-models')) {
    context.category = 'Models';
  }
  if (normalized.includes('/owners')) {
    context.category = 'Owners';
    context.intent = 'Ownership';
  }
  if (normalized.includes('/experiences')) {
    context.category = 'Experiences';
    context.intent = 'Experience';
  }
  if (normalized.includes('/our-world')) {
    context.category = 'Our World';
    context.intent = 'Brand';
  }
  if (normalized.includes('/configurator') || normalized.includes('/configure')) {
    context.category = 'Configurator';
    context.intent = 'Configure';
  }
  if (normalized.includes('/dealers')) {
    context.category = 'Dealers';
    context.intent = 'Enquire';
  }
  if (normalized.includes('/enquiry') || normalized.includes('/enquire')) {
    context.category = 'Enquiry';
    context.intent = 'Enquire';
  }
  if (normalized.includes('q-by-aston-martin') || normalized.includes('/q-by')) {
    context.category = 'Q by Aston Martin';
    context.intent = 'Ownership';
  }

  for (const { match, model } of MODEL_PATH_MATCHERS) {
    if (match.test(normalized)) {
      context.model = model;
      context.collection = model;
      if (!context.category) context.category = 'Models';
      break;
    }
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

export function recordIdentityEvent(email: string, asOwner = false): void {
  appendCdpEvent({
    type: 'IDENTITY',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      email,
      channel: 'WEB',
      brand: 'Aston Martin',
      industry: 'Automobile',
      ...(asOwner ? { category: 'Owners', intent: 'Ownership', persona: 'Owner' } : {}),
    },
  });

  if (asOwner) {
    appendCdpEvent({
      type: 'VIEW',
      createdAt: new Date().toISOString(),
      arbitraryData: {
        page: '/owners',
        pageName: 'Owners',
        brand: 'Aston Martin',
        industry: 'Automobile',
        category: 'Owners',
        intent: 'Ownership',
        persona: 'Owner',
      },
    });
  }
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
    if (event.type !== 'VIEW' && event.type !== 'IDENTITY') continue;
    const category = String(event.arbitraryData?.category ?? '');
    const model = String(event.arbitraryData?.model ?? event.arbitraryData?.collection ?? '');
    const intent = String(event.arbitraryData?.intent ?? '');
    const brand = String(event.arbitraryData?.brand ?? '');
    const industry = String(event.arbitraryData?.industry ?? '');

    if (category) scores[category] = (scores[category] || 0) + 1;
    if (model) scores[model] = (scores[model] || 0) + 1;
    if (intent) scores[intent] = (scores[intent] || 0) + 1;
    if (brand) scores[brand] = (scores[brand] || 0) + 1;
    if (industry) scores[industry] = (scores[industry] || 0) + 1;
  }

  const max = Math.max(1, ...Object.values(scores));
  const categories: Record<string, string> = {};
  const models: Record<string, string> = {};
  const intents: Record<string, string> = {};
  const brands: Record<string, string> = {};
  const industries: Record<string, string> = {};

  for (const [key, val] of Object.entries(scores)) {
    const normalized = (val / max).toFixed(3);
    if ((CATEGORIES as readonly string[]).includes(key)) {
      categories[key] = normalized;
    } else if ((MODELS as readonly string[]).includes(key)) {
      models[key] = normalized;
    } else if ((INTENTS as readonly string[]).includes(key)) {
      intents[key] = normalized;
    } else if (key === 'Aston Martin') {
      brands[key] = normalized;
    } else if (key === 'Automobile') {
      industries[key] = normalized;
    }
  }

  const ext: Record<string, Record<string, string>> = {};
  if (Object.keys(industries).length) ext.industries = industries;
  if (Object.keys(brands).length) ext.brands = brands;
  if (Object.keys(categories).length) ext.categories = categories;
  if (Object.keys(models).length) ext.models = models;
  if (Object.keys(intents).length) ext.intents = intents;
  return ext;
}
