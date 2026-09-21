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
};

export const EVENTS_COPY = {
  listingTitle: 'Events and Training',
  listingIntro:
    'Stay up to date with the developments that impact your business through our conferences, briefings and webinars.',
  register: 'Register',
  tabs: ['Overview', 'Speakers', 'Agenda'] as const,
};

export const EVENTS_CATALOG: CatalogEvent[] = [
  {
    slug: 'restructuring-and-insolvency-conference-2026',
    kicker: 'CONFERENCE',
    title: 'Restructuring and Insolvency Conference 2026',
    summary:
      'Elisabeth Plakinger on Europe’s T+1 settlement readiness. Charlotte Byrne covers AI assistants as the front door to financial services.',
    dateLabel: '29 September 2026',
    timeLabel: '08:30 - 17:30 BST',
    location: 'The Brewery, London',
    href: '/events-training/restructuring-and-insolvency-conference-2026',
    speakerSlugs: ['elisabeth-plakinger', 'charlotte-byrne', 'anne-marie-rowland'],
  },
  {
    slug: 'ciga-essential-suppliers-briefing',
    kicker: 'BRIEFING',
    title: 'Essential suppliers after CIGA — Leeds briefing',
    summary:
      'A London breakfast on T+1 Europe, hosted by Elisabeth Plakinger with Charlotte Byrne.',
    dateLabel: '14 October 2026',
    timeLabel: '08:00 - 09:45 BST',
    location: 'Leeds, 1 Park Row',
    href: '/events-training/ciga-essential-suppliers-briefing',
    speakerSlugs: ['elisabeth-plakinger', 'charlotte-byrne'],
  },
  {
    slug: 'lender-roundtable-supply-lines',
    kicker: 'ROUNDTABLE',
    title: 'Lender roundtable: keeping supply lines open',
    summary:
      'A closed table for the FS / energy panel conversation — Elisabeth Plakinger and Charlotte Byrne.',
    dateLabel: '18 November 2026',
    timeLabel: '16:00 - 18:00 GMT',
    location: 'London, 30 Crown Place',
    href: '/events-training/lender-roundtable-supply-lines',
    speakerSlugs: ['elisabeth-plakinger', 'charlotte-byrne'],
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
