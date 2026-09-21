import { BANKING, CAPITAL_MARKETS, ENERGY, GUIDE_PATH } from '@/lib/capco-story';
import { OUTLAW_NEWS } from '@/lib/home-catalog';

export type SectorJump = { label: string; href: string };

export type SectorHighlight = { title: string; text: string };

export type SectorThinkingCard = {
  kicker: string;
  title: string;
  date: string;
  href: string;
};

export type SectorWorkItem = {
  title: string;
  year: string;
  region: string;
  sector: string;
  service: string;
  value?: string;
};

export type SectorContact = {
  name: string;
  role: string;
  phone: string;
};

export type SectorPageData = {
  slug: string;
  breadcrumbParent: { label: string; href: string };
  title: string;
  intro: string;
  followLabel: string;
  helpLabel: string;
  jumpLabel: string;
  jumps: SectorJump[];
  highlights: SectorHighlight[];
  body: string;
  subsections: { id: string; title: string; text: string }[];
  thinkingHeading: string;
  thinking: SectorThinkingCard[];
  experienceHeading: string;
  experienceIntro: string;
  work: SectorWorkItem[];
  peopleHeading: string;
  peopleIntro: string;
  peopleSlugs: string[];
  contact: SectorContact | null;
  heroSrc: string;
  heroAlt: string;
};

export const SECTOR_HERO_SRC =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/bc3ab4586dd340b6b6fe7703e1fca5c8';

const PERSPECTIVE_THINKING: SectorThinkingCard[] = [
  {
    kicker: 'PERSPECTIVE',
    title: 'Europe’s T+1 market must prove readiness',
    date: '15 Sep 2026',
    href: GUIDE_PATH,
  },
  {
    kicker: OUTLAW_NEWS[1]?.kicker || 'PERSPECTIVE',
    title: OUTLAW_NEWS[1]?.title || 'Perspectives',
    date: OUTLAW_NEWS[1]?.meta || '',
    href: OUTLAW_NEWS[1]?.href || '/perspectives',
  },
  {
    kicker: OUTLAW_NEWS[2]?.kicker || 'PERSPECTIVE',
    title: OUTLAW_NEWS[2]?.title || 'Perspectives',
    date: OUTLAW_NEWS[2]?.meta || '',
    href: OUTLAW_NEWS[2]?.href || '/perspectives',
  },
];

export const SECTOR_PAGES: Record<string, SectorPageData> = {
  'banking-and-payments': {
    slug: 'banking-and-payments',
    breadcrumbParent: { label: 'Industries', href: '/industries' },
    title: BANKING.title,
    intro: BANKING.intro,
    followLabel: 'Follow Banking and Payments',
    helpLabel: 'How can we help?',
    jumpLabel: 'Jump straight to:',
    jumps: BANKING.tags.map((tag) => ({
      label: tag,
      href: `/people?q=${encodeURIComponent(tag)}`,
    })),
    highlights: [
      {
        title: 'AI assistants',
        text: 'the front door to financial services — Charlotte Byrne’s Perspective',
      },
      {
        title: 'Core and payments',
        text: 'from digital banks to the payments delivery cycle',
      },
      {
        title: 'Tagged once',
        text: 'the same items on Charlotte, this industry, and Perspectives',
      },
    ],
    body: BANKING.intro,
    subsections: [
      {
        id: 'retail-and-commercial',
        title: 'Retail and commercial banking',
        text: 'Standalone digital banks, core modernisation, and the client journeys that now start in an assistant.',
      },
      {
        id: 'payments',
        title: 'Payments',
        text: 'Advisory across the payments delivery cycle — including fraud controls that sit next to Canada’s real-time rails.',
      },
    ],
    thinkingHeading: 'Perspectives / Banking and Payments',
    thinking: PERSPECTIVE_THINKING,
    experienceHeading: 'Credentials',
    experienceIntro: 'Tagged once. Same items on Charlotte, this industry, and Perspectives.',
    work: BANKING.credentials.map((item) => ({
      year: item.year,
      title: item.title,
      region: 'United Kingdom',
      sector: 'Banking and Payments',
      service: 'Digital',
    })),
    peopleHeading: 'Our expertise, at your disposal',
    peopleIntro:
      'Consultants are the product. Meet the people who work across banking, payments and AI.',
    peopleSlugs: ['charlotte-byrne', 'marina-costa', 'anne-marie-rowland'],
    contact: null,
    heroSrc: SECTOR_HERO_SRC,
    heroAlt: 'Banking and Payments',
  },
  'capital-markets': {
    slug: 'capital-markets',
    breadcrumbParent: { label: 'Industries', href: '/industries' },
    title: CAPITAL_MARKETS.title,
    intro: CAPITAL_MARKETS.intro,
    followLabel: 'Follow Capital Markets',
    helpLabel: 'How can we help?',
    jumpLabel: 'Jump straight to:',
    jumps: CAPITAL_MARKETS.tags.map((tag) => ({
      label: tag,
      href: `/people?q=${encodeURIComponent(tag)}`,
    })),
    highlights: [
      {
        title: 'T+1 Europe',
        text: 'Elisabeth Plakinger’s conversion Perspective — the page Priya finds in ChatGPT',
      },
      {
        title: 'Industry, capability, region',
        text: 'One taxonomy published once — not a separate copy for each surface',
      },
      {
        title: 'Credentials that convert',
        text: 'Vince can take T+1 Europe into an FS panel',
      },
    ],
    body: CAPITAL_MARKETS.intro,
    subsections: [],
    thinkingHeading: 'Perspectives / Capital Markets',
    thinking: PERSPECTIVE_THINKING,
    experienceHeading: 'Credentials',
    experienceIntro:
      'Tagged once. Same items on Elisabeth, this industry, and the T+1 Perspective.',
    work: CAPITAL_MARKETS.credentials.map((item) => ({
      year: item.year,
      title: item.title,
      region: 'Europe',
      sector: 'Capital Markets',
      service: 'Post-trade',
    })),
    peopleHeading: 'Our expertise, at your disposal',
    peopleIntro: 'Consultants are the product. Meet the people who work T+1 and post-trade.',
    peopleSlugs: ['elisabeth-plakinger', 'charlotte-byrne'],
    contact: null,
    heroSrc: SECTOR_HERO_SRC,
    heroAlt: 'Capital Markets',
  },
  energy: {
    slug: 'energy',
    breadcrumbParent: { label: 'Industries', href: '/industries' },
    title: ENERGY.title,
    intro: ENERGY.intro,
    followLabel: 'Follow Energy',
    helpLabel: 'How can we help?',
    jumpLabel: 'Jump straight to:',
    jumps: ENERGY.tags.map((tag) => ({
      label: tag,
      href: `/people?q=${encodeURIComponent(tag)}`,
    })),
    highlights: [
      {
        title: 'Agentic AI',
        text: 'energy trading without losing control or auditability',
      },
      {
        title: 'Dual heritage',
        text: 'financial services and energy — Scrunch is configured to both',
      },
      {
        title: 'A/B from the editor',
        text: 'Emma optimises this intro without a monthly release',
      },
    ],
    body: ENERGY.intro,
    subsections: [],
    thinkingHeading: 'Perspectives / Energy',
    thinking: [
      {
        kicker: 'PERSPECTIVE',
        title: 'Agentic AI in energy trading',
        date: '13 Aug 2026',
        href: '/perspectives/agentic-ai-in-energy-trading',
      },
      ...PERSPECTIVE_THINKING.slice(0, 2),
    ],
    experienceHeading: 'Credentials',
    experienceIntro: 'Tagged once across Energy, Perspectives, and the people who did the work.',
    work: ENERGY.credentials.map((item) => ({
      year: item.year,
      title: item.title,
      region: 'Europe',
      sector: 'Energy',
      service: 'Trading',
    })),
    peopleHeading: 'Our expertise, at your disposal',
    peopleIntro: 'Consultants are the product. Meet the people who work energy and FS together.',
    peopleSlugs: ['elisabeth-plakinger', 'anne-marie-rowland'],
    contact: null,
    heroSrc: SECTOR_HERO_SRC,
    heroAlt: 'Energy',
  },
};

const SLUG_ALIASES: Record<string, string> = {
  banking: 'banking-and-payments',
  'banking-and-payments': 'banking-and-payments',
  'capital-markets': 'capital-markets',
  energy: 'energy',
};

export function getSectorBySlug(slug: string): SectorPageData {
  const key = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();
  return SECTOR_PAGES[key] || SECTOR_PAGES['capital-markets'];
}
