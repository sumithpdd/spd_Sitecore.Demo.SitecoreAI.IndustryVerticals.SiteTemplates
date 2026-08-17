export type CdpTrackedEvent = {
  type: string;
  createdAt: string;
  arbitraryData?: Record<string, unknown>;
};

export const JOURNEY_STAGES = ['Discover', 'Explore', 'Clearing', 'Apply', 'Stay'] as const;
export type JourneyStage = (typeof JOURNEY_STAGES)[number];

const SESSION_ID_KEY = 'university-cdp-session-id';
const SESSION_EVENTS_KEY = 'university-cdp-session-events';
const VISIT_COUNT_KEY = 'university-cdp-visit-count';
const VISIT_FLAG_KEY = 'university-cdp-visit-recorded';

const CATEGORIES = [
  'Home',
  'Clearing',
  'Courses',
  'Study and life',
  'Accommodation',
  'Search',
] as const;

const SUBJECTS = ['Computer Science and AI', 'Business and Management'] as const;

const INTENTS = ['Discover', 'Explore', 'Apply', 'Enquire', 'Alumni'] as const;

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
    brand: 'University',
    industry: 'Higher Education',
    stage: 'Discover',
    category: 'Home',
    intent: 'Discover',
  };

  if (normalized === '/' || normalized === '') {
    context.category = 'Home';
    context.stage = 'Discover';
    context.intent = 'Discover';
  }
  if (normalized.includes('/search')) {
    context.category = 'Search';
    context.stage = 'Discover';
    context.intent = 'Explore';
  }
  if (normalized.includes('/courses')) {
    context.category = 'Courses';
    context.stage = 'Explore';
    context.intent = 'Explore';
  }
  if (normalized.includes('computer-science') || normalized.includes('cs-ai')) {
    context.subject = 'Computer Science and AI';
    context.category = 'Courses';
    context.stage = 'Explore';
    context.intent = 'Explore';
  }
  if (normalized.includes('business-and-management')) {
    context.subject = 'Business and Management';
    context.category = 'Courses';
    context.stage = 'Explore';
    context.intent = 'Explore';
  }
  if (normalized.includes('/clearing')) {
    context.category = 'Clearing';
    context.stage = 'Clearing';
    context.intent = 'Enquire';
  }
  if (normalized.includes('how-to-apply')) {
    context.category = 'Clearing';
    context.stage = 'Apply';
    context.intent = 'Apply';
  }
  if (normalized.includes('/study-and-life')) {
    context.category = 'Study and life';
    context.stage = 'Explore';
    context.intent = 'Explore';
  }
  if (normalized.includes('/accommodation')) {
    context.category = 'Accommodation';
    context.stage = 'Stay';
    context.intent = 'Enquire';
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

export function recordSearchEvent(query: string, source: 'header' | 'chatbot' | 'page'): void {
  appendCdpEvent({
    type: 'SEARCH',
    createdAt: new Date().toISOString(),
    arbitraryData: {
      query,
      source,
      page: typeof window !== 'undefined' ? window.location.pathname : '/',
      brand: 'University',
      industry: 'Higher Education',
      category: 'Search',
      stage: 'Discover',
      intent: 'Explore',
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
      brand: 'University',
      industry: 'Higher Education',
      persona: 'ProspectiveStudent',
      intent: 'Enquire',
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
    const subject = String(event.arbitraryData?.subject ?? '');
    const intent = String(event.arbitraryData?.intent ?? '');
    const brand = String(event.arbitraryData?.brand ?? '');
    const industry = String(event.arbitraryData?.industry ?? '');

    if (category) scores[category] = (scores[category] || 0) + 1;
    if (subject) scores[subject] = (scores[subject] || 0) + 1;
    if (intent) scores[intent] = (scores[intent] || 0) + 1;
    if (brand) scores[brand] = (scores[brand] || 0) + 1;
    if (industry) scores[industry] = (scores[industry] || 0) + 1;
  }

  const max = Math.max(1, ...Object.values(scores));
  const categories: Record<string, string> = {};
  const subjects: Record<string, string> = {};
  const intents: Record<string, string> = {};
  const brands: Record<string, string> = {};
  const industries: Record<string, string> = {};

  for (const [key, val] of Object.entries(scores)) {
    const normalized = (val / max).toFixed(3);
    if ((CATEGORIES as readonly string[]).includes(key)) {
      categories[key] = normalized;
    } else if ((SUBJECTS as readonly string[]).includes(key)) {
      subjects[key] = normalized;
    } else if ((INTENTS as readonly string[]).includes(key)) {
      intents[key] = normalized;
    } else if (key === 'University') {
      brands[key] = normalized;
    } else if (key === 'Higher Education') {
      industries[key] = normalized;
    }
  }

  const ext: Record<string, Record<string, string>> = {};
  if (Object.keys(industries).length) ext.industries = industries;
  if (Object.keys(brands).length) ext.brands = brands;
  if (Object.keys(categories).length) ext.categories = categories;
  if (Object.keys(subjects).length) ext.subjects = subjects;
  if (Object.keys(intents).length) ext.intents = intents;
  return ext;
}
