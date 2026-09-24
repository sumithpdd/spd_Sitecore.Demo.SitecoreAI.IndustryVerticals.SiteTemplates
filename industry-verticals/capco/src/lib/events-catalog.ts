import { getPersonBySlug } from '@/lib/people-catalog';

export type CatalogEvent = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  dateLabel: string;
  timeLabel: string;
  location: string;
  href: string;
  speakerSlugs: string[];
  articleHref?: string;
  sectors?: string[];
};

export const EVENTS_COPY = {
  listingTitle: 'Events',
  listingIntro:
    'Briefings that sit next to the Perspectives — T+1, energy trading, and payments controls. Speakers are the same named consultants.',
  register: 'Register',
  tabs: ['Overview', 'Speakers', 'Agenda'] as const,
};

export const EVENTS_CATALOG: CatalogEvent[] = [
  {
    slug: 'agentic-ai-energy-trading-briefing',
    kicker: 'BRIEFING',
    title: 'Agentic AI on the energy trading desk',
    summary:
      'Elisabeth Plakinger walks the crude-oil decision workflow from the Perspective — explainability, timing, and why the desk still owns the trade.',
    dateLabel: '8 October 2026',
    timeLabel: '08:30 - 10:00 BST',
    location: 'London · Energy practice',
    href: '/events/agentic-ai-energy-trading-briefing',
    speakerSlugs: ['elisabeth-plakinger'],
    articleHref: '/perspectives/agentic-ai-in-energy-trading',
    sectors: ['energy'],
  },
  {
    slug: 't-plus-1-europe-readiness',
    kicker: 'BREAKFAST',
    title: 'Europe T+1: prove readiness before go-live',
    summary:
      'The conversion article in the room. Elisabeth on matching, funding and exception queues — then the named consultant Priya already found.',
    dateLabel: '22 October 2026',
    timeLabel: '08:00 - 09:30 BST',
    location: 'London · 40 Strand',
    href: '/events/t-plus-1-europe-readiness',
    speakerSlugs: ['elisabeth-plakinger', 'charlotte-byrne'],
    articleHref: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
    sectors: ['capital-markets'],
  },
  {
    slug: 'payments-fraud-controls',
    kicker: 'ROUNDTABLE',
    title: 'Canada payments fraud: the next control test',
    summary:
      'Charlotte Byrne on the Act 2 payments article — real-time controls, named expert, same taxonomy as Banking & Payments.',
    dateLabel: '12 November 2026',
    timeLabel: '16:00 - 17:30 GMT',
    location: 'Toronto · virtual join',
    href: '/events/payments-fraud-controls',
    speakerSlugs: ['charlotte-byrne'],
    articleHref: '/perspectives/canada-payment-fraud',
    sectors: ['banking-and-payments'],
  },
];

export function getEventBySlug(slug: string): CatalogEvent | undefined {
  return EVENTS_CATALOG.find((item) => item.slug === slug);
}

export function eventSpeakers(slugs: string[]) {
  return slugs
    .map((slug) => getPersonBySlug(slug))
    .filter((person): person is NonNullable<ReturnType<typeof getPersonBySlug>> => Boolean(person));
}

export function eventsForArticle(articleHref: string, sectors: string[] = []): CatalogEvent[] {
  const href = articleHref.split('?')[0];
  const sectorSlugs = sectors.map((value) =>
    value
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  );
  const exact = EVENTS_CATALOG.filter((item) => item.articleHref === href);
  if (exact.length > 0) {
    return exact;
  }
  return EVENTS_CATALOG.filter((item) =>
    (item.sectors || []).some((sector) => sectorSlugs.includes(sector))
  ).slice(0, 1);
}
