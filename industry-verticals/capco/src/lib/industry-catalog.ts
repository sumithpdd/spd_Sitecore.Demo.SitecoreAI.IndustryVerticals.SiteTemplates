import { GUIDE_PATH } from '@/lib/capco-story';

export type InsightCard = {
  href: string;
  title: string;
  kicker: string;
  date: string;
  authors: string;
  imageSrc: string;
  imageAlt: string;
  sector: string;
};

export type IndustryJump = { label: string; href: string };

export type IndustryCard = {
  title: string;
  body: string;
  href: string;
};

export type IndustryPageFallback = {
  slug: string;
  title: string;
  intro: string;
  imageSrc: string;
  imageAlt: string;
  expertiseHeading: string;
  expertiseIntro: string;
  jumps: IndustryJump[];
  expertise: IndustryCard[];
  storiesHeading: string;
  stories: IndustryCard[];
  insightsHeading: string;
  sector: string;
};

export const DAM = {
  hero: 'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/f3f4a44ba0744a52ae06d47f0cffeab8',
  expertise:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/4541a86e65624b0c8546dbd043b7e19d',
  thinking:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/83fc7b7565ae438db2bfe2540ae8a853',
  banking:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/1e59dfb8e83b4d028d745fcdf6be2b0c',
  payments:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/49574edb2e5446dca895a9da98ae5068',
  onboarding:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/b0b72452279f4123861ec0f4fcb24458',
  tplus1:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/3698cfe8fc4a4d00bb94a1c95d1e45ba',
  energy:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/d3577aa5ffbd485ca977f959d61634f3',
  fraud:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9be79caf2c1c4ff7b10c09153473ad31',
  glass:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2bc0ec476201435f9c3c0e891b454c76',
};

export const INSIGHT_CARDS: InsightCard[] = [
  {
    href: '/perspectives/reimagining-business-banking-onboarding',
    title: 'Reimagining business banking onboarding',
    kicker: 'Banking and Payments',
    date: '04 Mar 2026',
    authors: 'Charlotte Byrne',
    imageSrc: DAM.onboarding,
    imageAlt: 'Business banking onboarding',
    sector: 'banking-and-payments',
  },
  {
    href: '/perspectives/canada-payment-fraud',
    title: 'Canada payment fraud: the next control test',
    kicker: 'Payments and cards',
    date: '19 Aug 2026',
    authors: 'Charlotte Byrne',
    imageSrc: DAM.fraud,
    imageAlt: 'Payments fraud controls',
    sector: 'banking-and-payments',
  },
  {
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    title: 'AI assistants as the front door to financial services',
    kicker: 'Digital banking',
    date: '17 Aug 2026',
    authors: 'Charlotte Byrne',
    imageSrc: DAM.banking,
    imageAlt: 'AI assistants in banking',
    sector: 'banking-and-payments',
  },
  {
    href: GUIDE_PATH,
    title: 'Europe’s T+1 market must prove readiness',
    kicker: 'Capital Markets',
    date: '15 Sep 2026',
    authors: 'Elisabeth Plakinger',
    imageSrc: DAM.tplus1,
    imageAlt: 'T+1 settlement',
    sector: 'capital-markets',
  },
  {
    href: '/perspectives/agentic-ai-in-energy-trading',
    title: 'Agentic AI in energy trading',
    kicker: 'Energy',
    date: '13 Aug 2026',
    authors: 'Elisabeth Plakinger',
    imageSrc: DAM.energy,
    imageAlt: 'Energy trading',
    sector: 'energy',
  },
];

export const SUBSCRIBE_COPY = {
  connectHeading: 'Connect with Capco',
  connectIntro:
    'To see how Capco can support your business, connect with us or subscribe for updates.',
  subscribeTitle: 'Subscribe',
  contactTitle: 'Contact us',
  contactIntro: 'Talk to a named expert — not a generic inbox.',
  contactHref: '/people',
  contactCta: 'Meet our people',
  privacy:
    'Capco is committed to protecting and respecting your privacy, and we will only use your personal data to provide the information you requested from us.',
  consent:
    'By clicking “Subscribe”, I consent to Capco processing my contact details to be held in its global contact database for the purpose of receiving, by email, the information ticked below and for analysing and developing our products and services, in accordance with Capco’s Privacy Policy.',
  newsletter: 'I subscribe to receive the monthly Capco Intelligence Newsletter.',
  insights: 'I subscribe to receive latest insights, products, services and invitations to events.',
  unsubscribe:
    'If you wish to unsubscribe you can do so by clicking on the ‘unsubscribe’ link at the end of any marketing communication you have received from us sent to your email address.',
  submit: 'Subscribe',
  success: 'Thank you. We have recorded your subscription preferences for this demo.',
  countries: [
    'United Kingdom',
    'United States',
    'Canada',
    'Brazil',
    'Germany',
    'Switzerland',
    'Singapore',
  ],
  salutations: ['Mr', 'Ms', 'Mx', 'Dr'],
};

const bankingExpertise: IndustryCard[] = [
  {
    title: 'Retail Banking',
    href: '/industries/banking-and-payments/retail-banking',
    body: 'Consumers expect speed and personalisation. We help you turn AI assistants into an auditable front door — then a named expert when the model cannot close.',
  },
  {
    title: 'Commercial Banking',
    href: '/industries/banking-and-payments/commercial-banking',
    body: 'Onboarding is still the bottleneck. Charlotte Byrne writes the Perspective that turns a fragmented SME journey into a conversion path.',
  },
  {
    title: 'Community Banking',
    href: '/industries/banking-and-payments/community-banking',
    body: 'Local banks need digital depth without losing the relationship. Same taxonomy as Perspectives — industry, capability, region.',
  },
  {
    title: 'Digital banks and FinTech',
    href: '/industries/banking-and-payments/digital-banks',
    body: 'From standalone digital banks to core modernisation. The credential Vince can take into an FS panel still names a consultant.',
  },
  {
    title: 'Payments',
    href: '/industries/banking-and-payments/payments',
    body: 'Fraud, real-time rails, and the payments delivery cycle — tagged once with Charlotte and the Canada control-test Perspective.',
  },
];

const bankingStories: IndustryCard[] = [
  {
    title: 'How Capco launched a digital business bank',
    href: '/industries/banking-and-payments/digital-business-bank',
    body: 'End-to-end consulting and delivery for a new digital bank — operating model to go-live. Consultants are the product.',
  },
  {
    title: 'AI assistants as the front door',
    href: '/people/charlotte-byrne',
    body: 'Charlotte Byrne on the client conversation that starts in an assistant, not a branch. The conversion asset is still a named expert.',
  },
];

export const INDUSTRY_PAGES: Record<string, IndustryPageFallback> = {
  'banking-and-payments': {
    slug: 'banking-and-payments',
    title: 'Banking & Payments',
    intro:
      'New technologies, shifting client expectations, and evolving regulation are reshaping banking and payments. Capco helps banks and payment providers manage cost, grow revenue, and keep the next conversation with a named expert.',
    imageSrc: DAM.banking,
    imageAlt: 'Banking and Payments',
    expertiseHeading: 'Our expertise in Banking & Payments',
    expertiseIntro:
      'Banks face critical choices — from regulatory pressure to digital transformation. We partner on operating models that stay auditable when the front door is an assistant.',
    jumps: bankingExpertise.map((item) => ({ label: item.title, href: item.href })),
    expertise: bankingExpertise,
    storiesHeading: 'Banking & Payments success stories',
    stories: bankingStories,
    insightsHeading: 'Latest Capco insights on Banking & Payments',
    sector: 'banking-and-payments',
  },
  'retail-banking': {
    slug: 'retail-banking',
    title: 'Retail Banking',
    intro:
      'The next retail conversation starts in an assistant. Charlotte Byrne’s Perspective is the AEO surface; the named consultant is the conversion.',
    imageSrc: DAM.expertise,
    imageAlt: 'Retail Banking',
    expertiseHeading: 'How we help',
    expertiseIntro:
      'Omnichannel journeys, risk, and loyalty — tagged once against Banking and Payments so Priya, Vince and Emma see the same item.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: bankingExpertise.filter((item) => item.title !== 'Retail Banking'),
    storiesHeading: 'Related credentials',
    stories: bankingStories,
    insightsHeading: 'Latest Capco insights on Retail Banking',
    sector: 'banking-and-payments',
  },
  'commercial-banking': {
    slug: 'commercial-banking',
    title: 'Commercial Banking',
    intro:
      'Business onboarding is still paper-heavy. Reimagining that journey is how a bank keeps the SME — and how Charlotte’s Perspective earns the citation.',
    imageSrc: DAM.expertise,
    imageAlt: 'Commercial Banking',
    expertiseHeading: 'How we help',
    expertiseIntro:
      'Digital transformation for client service, risk tools, and operating efficiency.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: [],
    storiesHeading: 'Related credentials',
    stories: bankingStories,
    insightsHeading: 'Latest Capco insights on Commercial Banking',
    sector: 'banking-and-payments',
  },
  'community-banking': {
    slug: 'community-banking',
    title: 'Community Banking',
    intro:
      'Community banks compete on trust. We help them modernise without losing the relationship — same FS taxonomy as the rest of the site.',
    imageSrc: DAM.hero,
    imageAlt: 'Community Banking',
    expertiseHeading: 'How we help',
    expertiseIntro: 'Sustainable banking and technology that keeps the local relationship intact.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: [],
    storiesHeading: 'Related credentials',
    stories: bankingStories,
    insightsHeading: 'Latest Capco insights on Community Banking',
    sector: 'banking-and-payments',
  },
  'digital-banks': {
    slug: 'digital-banks',
    title: 'Digital banks and FinTech',
    intro:
      'Standalone digital banks and non-bank competitors reset the bar. Capco delivers the operating model — then publishes the credential on a named consultant.',
    imageSrc: DAM.thinking,
    imageAlt: 'Digital banks',
    expertiseHeading: 'How we help',
    expertiseIntro:
      'From target operating model to launch readiness, without inventing a second content store.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: [],
    storiesHeading: 'Related credentials',
    stories: bankingStories,
    insightsHeading: 'Latest Capco insights on Digital banks',
    sector: 'banking-and-payments',
  },
  payments: {
    slug: 'payments',
    title: 'Payments',
    intro:
      'Real-time rails raise the control test. Canada payment fraud is the Perspective; Charlotte Byrne is the expert Vince can take into a panel.',
    imageSrc: DAM.thinking,
    imageAlt: 'Payments',
    expertiseHeading: 'How we help',
    expertiseIntro: 'Infrastructure, digital payment solutions, and fraud controls tagged once.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: [],
    storiesHeading: 'Related credentials',
    stories: [
      {
        title: 'Instant payments, proven controls',
        href: '/industries/banking-and-payments/instant-payments',
        body: 'Solution design and compliance for a payments provider that had to prove readiness, not announce it.',
      },
      ...bankingStories,
    ],
    insightsHeading: 'Latest Capco insights on Payments',
    sector: 'banking-and-payments',
  },
  'digital-business-bank': {
    slug: 'digital-business-bank',
    title: 'How Capco launched a digital business bank',
    intro:
      'A new digital bank for businesses — operating model, integration, and go-live. The public credential still points at a named Capco expert.',
    imageSrc: DAM.expertise,
    imageAlt: 'Digital business bank',
    expertiseHeading: 'What we delivered',
    expertiseIntro:
      'Target operating model, platform delivery, and launch readiness — story-aligned, no invented colleagues.',
    jumps: [{ label: 'Banking & Payments', href: '/industries/banking-and-payments' }],
    expertise: [],
    storiesHeading: 'Related people',
    stories: [
      {
        title: 'Charlotte Byrne',
        href: '/people/charlotte-byrne',
        body: 'Banking and Payments — AI assistants as the front door.',
      },
    ],
    insightsHeading: 'Latest Capco insights',
    sector: 'banking-and-payments',
  },
  'instant-payments': {
    slug: 'instant-payments',
    title: 'Instant payments, proven controls',
    intro:
      'Designing an instant payment service is a control problem as much as a product problem. The same taxonomy as Perspectives and people.',
    imageSrc: DAM.thinking,
    imageAlt: 'Instant payments',
    expertiseHeading: 'What we delivered',
    expertiseIntro: 'Solution design, vendor selection, and compliance that a board can evidence.',
    jumps: [{ label: 'Payments', href: '/industries/banking-and-payments/payments' }],
    expertise: [],
    storiesHeading: 'Related people',
    stories: [
      {
        title: 'Charlotte Byrne',
        href: '/people/charlotte-byrne',
        body: 'Payments delivery and the Canada fraud control test.',
      },
    ],
    insightsHeading: 'Latest Capco insights on Payments',
    sector: 'banking-and-payments',
  },
  'capital-markets': {
    slug: 'capital-markets',
    title: 'Capital Markets',
    intro:
      'Transform technology and data, enhance market connectivity, and accelerate revenue — including T+1 readiness. Elisabeth Plakinger’s Perspective is the page Priya finds in ChatGPT.',
    imageSrc: DAM.tplus1,
    imageAlt: 'Capital Markets',
    expertiseHeading: 'Our expertise in Capital Markets',
    expertiseIntro:
      'Settlement compression is a market-structure test. We help firms prove matching, funding and exceptions before go-live.',
    jumps: [{ label: 'T+1 settlement', href: '/industries/capital-markets/t-plus-1' }],
    expertise: [
      {
        title: 'T+1 settlement',
        href: '/industries/capital-markets/t-plus-1',
        body: 'Europe must prove operational readiness. Named expert: Elisabeth Plakinger.',
      },
    ],
    storiesHeading: 'Capital Markets credentials',
    stories: [
      {
        title: 'Post-trade operating model for a European investment bank',
        href: '/people/elisabeth-plakinger',
        body: 'The public credential Vince can take into an FS panel.',
      },
    ],
    insightsHeading: 'Latest Capco insights on Capital Markets',
    sector: 'capital-markets',
  },
  't-plus-1': {
    slug: 't-plus-1',
    title: 'T+1 settlement',
    intro:
      'T+1 is not a weekend IT change. Elisabeth Plakinger sets out the evidence boards need — and the Perspective Priya cites.',
    imageSrc: DAM.thinking,
    imageAlt: 'T+1 settlement',
    expertiseHeading: 'How we help',
    expertiseIntro: 'Operating model, data quality, and fails management across cash equities.',
    jumps: [{ label: 'Capital Markets', href: '/industries/capital-markets' }],
    expertise: [],
    storiesHeading: 'Related people',
    stories: [
      {
        title: 'Elisabeth Plakinger',
        href: '/people/elisabeth-plakinger',
        body: 'Principal Consultant, Capital Markets — T+1 Europe.',
      },
    ],
    insightsHeading: 'Latest Capco insights on T+1',
    sector: 'capital-markets',
  },
  energy: {
    slug: 'energy',
    title: 'Energy',
    intro:
      'Digitisation, decentralisation and decarbonisation — plus agentic AI in energy trading. Capco’s dual heritage in energy and financial services is The Expert Advantage.',
    imageSrc: DAM.energy,
    imageAlt: 'Energy',
    expertiseHeading: 'Our expertise in Energy',
    expertiseIntro:
      'Trading and risk, transition, and utilities — tagged once with the people who did the work.',
    jumps: [{ label: 'Energy trading', href: '/industries/energy/energy-trading' }],
    expertise: [
      {
        title: 'Energy trading',
        href: '/industries/energy/energy-trading',
        body: 'Agentic systems without losing control or auditability. Named expert: Elisabeth Plakinger.',
      },
    ],
    storiesHeading: 'Energy credentials',
    stories: [
      {
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
        body: 'How trading desks use agents that a control function can still explain.',
      },
    ],
    insightsHeading: 'Latest Capco insights on Energy',
    sector: 'energy',
  },
  'energy-trading': {
    slug: 'energy-trading',
    title: 'Energy trading',
    intro:
      'Agentic AI on the desk is useful only if the audit trail survives. Elisabeth’s Perspective is the AEO surface for that question.',
    imageSrc: DAM.expertise,
    imageAlt: 'Energy trading',
    expertiseHeading: 'How we help',
    expertiseIntro: 'Trading, risk, and control — the same tags as the consultant profile.',
    jumps: [{ label: 'Energy', href: '/industries/energy' }],
    expertise: [],
    storiesHeading: 'Related people',
    stories: [
      {
        title: 'Elisabeth Plakinger',
        href: '/people/elisabeth-plakinger',
        body: 'Capital markets discipline applied to energy trading controls.',
      },
    ],
    insightsHeading: 'Latest Capco insights on Energy',
    sector: 'energy',
  },
  insurance: {
    slug: 'insurance',
    title: 'Insurance',
    intro:
      'M&A, divestitures and new partnerships — transform capabilities, profitability and compliance. Same FS taxonomy, no second content store.',
    imageSrc: DAM.hero,
    imageAlt: 'Insurance',
    expertiseHeading: 'Our expertise in Insurance',
    expertiseIntro: 'Capabilities, profitability and compliance — published once.',
    jumps: [{ label: 'All industries', href: '/industries' }],
    expertise: [],
    storiesHeading: 'Related insights',
    stories: [],
    insightsHeading: 'Latest Capco insights on Insurance',
    sector: 'insurance',
  },
  'wealth-and-asset-management': {
    slug: 'wealth-and-asset-management',
    title: 'Wealth and Asset Management',
    intro:
      'Stronger client relationships, operational efficiency, control and scale — The Expert Advantage.',
    imageSrc: DAM.hero,
    imageAlt: 'Wealth and Asset Management',
    expertiseHeading: 'Our expertise in Wealth and Asset Management',
    expertiseIntro: 'Client experience and control, tagged once across people and Perspectives.',
    jumps: [{ label: 'All industries', href: '/industries' }],
    expertise: [],
    storiesHeading: 'Related insights',
    stories: [],
    insightsHeading: 'Latest Capco insights on Wealth and Asset Management',
    sector: 'wealth-and-asset-management',
  },
};

const SLUG_ALIASES: Record<string, string> = {
  banking: 'banking-and-payments',
  'banking-and-payments': 'banking-and-payments',
};

export function getIndustryBySlug(slug: string): IndustryPageFallback {
  const key = SLUG_ALIASES[slug.toLowerCase()] || slug.toLowerCase();
  return INDUSTRY_PAGES[key] || INDUSTRY_PAGES['banking-and-payments'];
}

export function insightsForSector(sector?: string): InsightCard[] {
  if (!sector) {
    return INSIGHT_CARDS;
  }
  const slug = sector.toLowerCase().replace(/\s+/g, '-');
  const matched = INSIGHT_CARDS.filter((item) => item.sector === slug);
  return matched.length > 0 ? matched : INSIGHT_CARDS;
}
