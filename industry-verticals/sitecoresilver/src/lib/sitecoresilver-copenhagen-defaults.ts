export const SITECORE_LOGO_URL =
  'https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/d027789fafe14af0ac8bf843e9a77c0b?v=4baa5a18';

export const INTRO_DEFAULTS = {
  watermark: '25',
  subtitle: 'Trusted by Brands for 25 Years',
  title: 'Silver Celebration',
  meta: ['In-Person Event', 'Copenhagen', '11 June 2026'],
};

export const HERO_DEFAULTS = {
  pills: [
    { label: '25 Years' },
    { label: 'Tivoli · Copenhagen' },
    { label: 'AI Photo Booth' },
  ],
  title: 'Silver',
  subtitle: '25 Years of Innovation',
  meta: 'Copenhagen · Tivoli · June 11, 2026',
  description:
    'Step into the booth, choose a Copenhagen backdrop, and let Gemini transform your portrait into a keepsake from the anniversary celebration.',
  primaryCta: { text: 'Create Photo', href: '#booth' },
  secondaryCta: { text: 'View Gallery', href: '#gallery' },
};

export const PROMO_BAND_DEFAULTS = {
  eyebrow: 'The connected platform',
  title: 'Three engines. One intelligent journey.',
  body: 'From trusted content to grounded answers and governed data—see how <strong>SitecoreAI</strong> helps teams move in sync.',
};

export const PROMO_BADGES_DEFAULTS = [
  {
    badge: '1',
    title: 'SitecoreAI CMS',
    tagline: 'Right story. Right moment. Every time.',
    body: 'Shape trusted digital experiences at scale—so every visitor discovers the information they need, exactly when and where it matters.',
  },
  {
    badge: '2',
    title: 'SitecoreAI Agentic RAG',
    tagline: 'Ask boldly. Answer with proof.',
    body: 'Turn complex knowledge bases into grounded, context-aware AI experiences—so teams explore ideas faster without losing accuracy or control.',
  },
  {
    badge: '3',
    title: 'SitecoreAI Data Platform',
    tagline: 'Connect the dots. Govern the truth.',
    body: 'Unify data across systems with clarity and guardrails—boosting visibility, readiness, and the confidence behind every decision.',
  },
];

export const RICH_GLASS_DEFAULTS = {
  eyebrow: 'Create · Understand · Decide',
  body: 'When content, conversation, and data move as one, organizations don\'t just collect knowledge—they activate it. Insight becomes action. Action becomes impact you can measure.',
};

export const PROMO_CTA_DEFAULTS = {
  text: 'Celebrating where it began — Denmark, Tivoli, and twenty-five years of Sitecore.',
  ctaText: 'Event details',
  ctaHref: 'https://www.sitecore.com/resources/events-webinars/2026/05/sitecore-silver-celebration-copenhagen',
};

export const FOOTER_DEFAULTS = {
  title: 'Sitecore Silver Celebration',
  meta: 'Copenhagen · Tivoli · June 11, 2026',
  legal: '© 2026 Sitecore · 25 Years of Innovation · Privacy · Admin',
};

export const NAV_DEFAULTS = [
  { text: 'Create Photo', href: '#booth' },
  { text: 'Gallery', href: '#gallery' },
  { text: 'Platform', href: '#platform' },
  { text: 'Event details', href: PROMO_CTA_DEFAULTS.ctaHref },
];
