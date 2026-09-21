/** Homepage hero fallback — Sitecore fields win when present. */
export const HOME_HERO = {
  eyebrow: 'Capco, A Wipro Company',
  title: 'The Expert Advantage',
  lede: 'For nearly three decades, Capco has helped clients navigate complexity, lead change, and unlock value across Financial Services and Energy. Expert-led. AI-infused. Impact-focused.',
};

export const EXPERTISE_SECTORS = [
  { label: 'Banking and Payments', href: '/industries/banking-and-payments' },
  { label: 'Capital Markets', href: '/industries/capital-markets' },
  { label: 'Insurance', href: '/industries/insurance' },
  { label: 'Wealth and Asset Management', href: '/industries/wealth-and-asset-management' },
  { label: 'Energy', href: '/industries/energy' },
];

export const EXPERTISE_SERVICES = [
  {
    title: 'Digital and AI',
    items: ['AI assistants', 'Agentic AI', 'Data platforms'],
  },
  {
    title: 'Payments and banking',
    items: ['Core modernisation', 'Digital banks', 'Payments delivery'],
  },
  {
    title: 'Capital markets',
    items: ['T+1 settlement', 'Post-trade', 'Market infrastructure'],
  },
  {
    title: 'Energy',
    items: ['Trading and risk', 'Transition', 'Utilities'],
  },
];

export const EXPERTISE_LOCATIONS = [
  {
    region: 'United Kingdom',
    offices: 'London',
  },
  {
    region: 'Europe',
    offices: 'Frankfurt, Geneva, Vienna, Warsaw',
  },
  {
    region: 'Americas',
    offices: 'New York, Toronto, São Paulo, Houston',
  },
  {
    region: 'Asia Pacific',
    offices: 'Singapore, Hong Kong, Bangalore',
  },
];

/** Sidebar latest items on Perspective article pages. */
export const LATEST_NEWS = [
  {
    time: '15 Sep 2026',
    title: 'Europe’s T+1 market must prove readiness',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
  },
  {
    time: '19 Aug 2026',
    title: 'Canada payment fraud: the next control test',
    href: '/perspectives/canada-payment-fraud',
  },
  {
    time: '17 Aug 2026',
    title: 'AI assistants as the front door to financial services',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
  },
  {
    time: '13 Aug 2026',
    title: 'Agentic AI in energy trading',
    href: '/perspectives/agentic-ai-in-energy-trading',
  },
];

export const ARTICLE_SIGNUP = {
  title: 'The Expert Advantage, in your inbox',
  body: 'Perspectives on financial services and energy — T+1, payments, AI, and the energy transition.',
  href: '/perspectives',
  cta: 'Explore Perspectives',
};

/** Homepage Perspectives cards (kept as OUTLAW_NEWS for the cloned component). */
export const OUTLAW_NEWS = [
  {
    kicker: 'PERSPECTIVE',
    title: 'Europe’s T+1 market must prove readiness',
    meta: '15 Sep 2026 · Elisabeth Plakinger',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Canada payment fraud: the next control test',
    meta: '19 Aug 2026',
    href: '/perspectives/canada-payment-fraud',
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'AI assistants as the front door to financial services',
    meta: '17 Aug 2026 · Charlotte Byrne',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
  },
  {
    kicker: 'PERSPECTIVE',
    title: 'Agentic AI in energy trading',
    meta: '13 Aug 2026',
    href: '/perspectives/agentic-ai-in-energy-trading',
  },
];

export const REACH_AWARDS = [
  {
    kicker: 'EXPERT-LED',
    title: 'Financial services and energy, one firm',
    source: 'The Expert Advantage',
  },
  {
    kicker: 'AI-INFUSED',
    title: 'Process, data and AI in how we deliver',
    source: 'Capco',
  },
  {
    kicker: 'IMPACT-FOCUSED',
    title: 'Measurable outcomes when the stakes are highest',
    source: 'Capco, A Wipro Company',
  },
];

export const PRESS_RELEASES: { date: string; title: string; href: string; meta?: string }[] = [
  {
    date: '15 Sep 2026',
    title: 'Capco Perspective: Europe’s T+1 market must prove readiness',
    meta: '5 min read',
    href: '/perspectives/europes-t-plus-1-market-must-prove-readiness',
  },
  {
    date: '17 Aug 2026',
    title: 'AI assistants as the front door to financial services',
    meta: '5 min read',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
  },
  {
    date: '13 Aug 2026',
    title: 'Agentic AI in energy trading',
    meta: '3 min read',
    href: '/perspectives/agentic-ai-in-energy-trading',
  },
];
