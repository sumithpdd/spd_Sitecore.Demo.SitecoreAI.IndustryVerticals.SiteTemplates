export type Announcement = {
  slug: string;
  href: string;
  title: string;
  date: string;
  readTime?: string;
  summary: string;
};

export const ANNOUNCEMENTS_INTRO =
  'Get the latest news from Capco, A Wipro Company — Perspectives, people, and industry comments across financial services and energy.';

export const ANNOUNCEMENTS_CATALOG: Announcement[] = [
  {
    slug: 'europes-t-plus-1-market-must-prove-readiness',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
    title: 'Europe’s T+1 market must prove readiness',
    date: '15 Sep 2026',
    summary: 'Elisabeth Plakinger on settlement compression as a market-structure test for Europe.',
  },
  {
    slug: 'ai-assistants-as-the-front-door-to-fs',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    title: 'AI assistants as the front door to financial services',
    date: '17 Aug 2026',
    readTime: '1 min read',
    summary: 'Charlotte Byrne on why the next client conversation starts in an assistant.',
  },
  {
    slug: 'agentic-ai-in-energy-trading',
    href: '/perspectives/agentic-ai-in-energy-trading',
    title: 'Agentic AI in energy trading',
    date: '13 Aug 2026',
    readTime: '1 min read',
    summary: 'How trading desks use agentic systems without losing control or auditability.',
  },
];

export function searchAnnouncements(query: string): Announcement[] {
  const term = query.trim().toLowerCase();
  if (!term) {
    return ANNOUNCEMENTS_CATALOG;
  }
  return ANNOUNCEMENTS_CATALOG.filter((item) =>
    [item.title, item.summary, item.date].join(' ').toLowerCase().includes(term)
  );
}
