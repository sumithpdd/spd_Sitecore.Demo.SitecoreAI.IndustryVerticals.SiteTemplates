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
  readTime?: string;
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
  whyNowHeading?: string;
  whyNow?: IndustryCard[];
  differentiatorsHeading?: string;
  differentiators?: IndustryCard[];
  teamHeading?: string;
  team?: IndustryCard[];
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
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e7515ec51d6645c59c85ca63b5170b5f',
  energyLanding:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/23eca46d88504c8a9cb95dbce299fa0d',
  energyGraphic:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/32fc2a3c33264acba4874c5381509c3e',
  aiSdlc:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/7670b9cd569a4f0f90f6ff870a685a76',
  aiBridge:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/259e8cb6fb35476894c2d3a96e6b4234',
  beyondExperiment:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/15fdb2b2e88f47fca6548ff05d770dc2',
  beyondVibe:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/c0da90ef92d54110a0607c0910215eac',
  cdoApac:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/0f0ddbf431b741f591160875717ad7a6',
  costTakeout:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/74413a5b75f6425db8aa88abe6df008c',
  iso42001:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/304cecdea9bf47cd8c1e5883ceed7600',
  responsibleAi:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/e9c1ad2e128a4acdb8f6af2772258971',
  fraud:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/9be79caf2c1c4ff7b10c09153473ad31',
  glass:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/2bc0ec476201435f9c3c0e891b454c76',
  sovereignty:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/acfc8cf33553466cab6cbec77977c8bd',
  weather:
    'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/259e8cb6fb35476894c2d3a96e6b4234',
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
    readTime: '5 min read',
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
    readTime: '5 min read',
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
    readTime: '5 min read',
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
    readTime: '5 min read',
  },
  {
    href: '/perspectives/agentic-ai-in-energy-trading',
    title: 'Agentic AI in energy trading',
    kicker: 'Energy',
    date: '13 Aug 2026',
    authors: 'Elisabeth Plakinger',
    imageSrc: DAM.energyLanding,
    imageAlt: 'Agentic AI in energy trading',
    sector: 'energy',
    readTime: '5 min read',
  },
  {
    href: '/perspectives/energy-sovereignty-cyber-resilience',
    title: "The role of cyber resilience in preserving Europe's energy sovereignty",
    kicker: 'Energy',
    date: '17 Jul 2026',
    authors: 'Elisabeth Plakinger',
    imageSrc: DAM.sovereignty,
    imageAlt: 'Energy cyber resilience',
    sector: 'energy',
    readTime: '5 min read',
  },
  {
    href: '/perspectives/from-predictable-to-weather-driven',
    title: 'From predictable to weather-driven',
    kicker: 'Energy',
    date: '27 Mar 2026',
    authors: 'Elisabeth Plakinger',
    imageSrc: DAM.weather,
    imageAlt: 'From predictable to weather-driven',
    sector: 'energy',
    readTime: '5 min read',
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
    jumps: [
      { label: 'UK Energy', href: '/industries/energy/uk-energy' },
      { label: 'Energy trading', href: '/industries/energy/energy-trading' },
    ],
    expertise: [
      {
        title: 'UK Energy',
        href: '/industries/energy/uk-energy',
        body: 'Utilities, energy transition, trading and critical infrastructure — named expert Elisabeth Plakinger.',
      },
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
  'uk-energy': {
    slug: 'uk-energy',
    title: 'UK Energy',
    intro:
      'Helping energy companies thrive and generate significant value in today’s ever-shifting landscape. Our UK Energy practice builds on Capco’s heritage across utilities, energy transition, energy trading and financial services markets.',
    imageSrc: DAM.energy,
    imageAlt: 'UK Energy',
    expertiseHeading: 'Our UK practice draws on Capco’s deep domain knowledge',
    expertiseIntro:
      'Cyber resilience, data and AI, commercial and trading systems, operational technologies, and programme governance — tagged once with the named expert.',
    jumps: [
      { label: 'Energy', href: '/industries/energy' },
      { label: 'Energy trading', href: '/industries/energy/energy-trading' },
    ],
    expertise: [
      {
        title: 'Cyber resilience',
        href: '/perspectives/energy-sovereignty-cyber-resilience',
        body: 'Cyber strategy, security resilience, capability assessments and embedding security across transformation programmes. Alignment to CAF, NIST, CIS and SOC2.',
      },
      {
        title: 'Data and AI',
        href: '/perspectives/agentic-ai-in-energy-trading',
        body: 'Pipelines powered by intelligence, safer operations, automated compliance reporting, and operating excellence through AI.',
      },
      {
        title: 'Commercial and trading systems',
        href: '/industries/energy/energy-trading',
        body: 'Modernise legacy trading systems. Molecules and electrons to market. Compliance confidence.',
      },
      {
        title: 'Operational technologies',
        href: '/perspectives/from-predictable-to-weather-driven',
        body: 'Digitally driven, operationally ready. Secure, scalable operations. Visibility from field to control room to market.',
      },
      {
        title: 'Programme and project governance',
        href: '/people/elisabeth-plakinger',
        body: 'Govern with confidence, deliver with precision. Strategy to execution. Connected projects, controlled outcomes.',
      },
    ],
    storiesHeading: 'Related content and events',
    stories: [
      {
        title: 'Agentic AI in energy trading',
        href: '/perspectives/agentic-ai-in-energy-trading',
        body: 'Energy traders are overwhelmed by fragmented market signals. Discover how agentic AI connects market, logistics, inventory and news data.',
      },
      {
        title: "The role of cyber resilience in preserving Europe's energy sovereignty",
        href: '/perspectives/energy-sovereignty-cyber-resilience',
        body: 'Europe’s energy sovereignty now depends on cyber resilience. Named expert: Elisabeth Plakinger.',
      },
      {
        title: 'From predictable to weather-driven',
        href: '/perspectives/from-predictable-to-weather-driven',
        body: 'Europe’s power grid is shifting from predictable generation to weather-driven renewables.',
      },
    ],
    insightsHeading: 'Related content and events',
    sector: 'energy',
    whyNowHeading: 'Why now?',
    whyNow: [
      {
        title: 'Evolving UK gas dependencies',
        href: '/industries/energy/uk-energy',
        body: 'The UK has increased reliance on LNG imports and European interconnectors, reshaping supply dynamics and market volatility.',
      },
      {
        title: 'Gas supports renewable stability',
        href: '/industries/energy/uk-energy',
        body: 'Gas remains critical to balancing renewable generation, with renewed focus on storage capacity when wind and solar output is variable.',
      },
      {
        title: 'Critical infrastructure resilience expectations',
        href: '/industries/energy/uk-energy',
        body: 'Energy networks are now recognised as Critical National Infrastructure, with rising expectations on resilience and continuity.',
      },
      {
        title: 'Escalating cybersecurity threat landscape',
        href: '/perspectives/energy-sovereignty-cyber-resilience',
        body: 'Energy infrastructure is a prime target for cyber threats, driving urgency around IT/OT security and operational resilience.',
      },
      {
        title: 'Growing regulatory compliance demands',
        href: '/industries/energy/uk-energy',
        body: 'Regulatory pressure is increasing, with expanded focus on REMIT, market monitoring, and operational resilience frameworks.',
      },
      {
        title: 'Legacy systems increase risk',
        href: '/industries/energy/energy-trading',
        body: 'Legacy systems across trading and operations are limiting agility and increasing risk in a real-time energy market.',
      },
      {
        title: 'Real-time digital capability investments',
        href: '/perspectives/agentic-ai-in-energy-trading',
        body: 'Firms are investing in data and digital capabilities to enable real-time visibility across operations, trading, and risk.',
      },
    ],
    differentiatorsHeading: 'What sets Capco apart in the UK',
    differentiators: [
      {
        title: 'Organisational transformation',
        href: '/industries/energy',
        body: 'Proven methodologies across people, process and technology — turning a system implementation into an operating-model shift.',
      },
      {
        title: 'Deep industry and domain experience',
        href: '/industries/energy',
        body: 'Programme assurance, digital, engineering, data, security, transmission, distribution, ETRM and CTRM implementation.',
      },
      {
        title: 'A reputation for execution and delivery',
        href: '/people/elisabeth-plakinger',
        body: 'Hands-on, on time, and tailored to the client’s end goal. Client success always comes first.',
      },
      {
        title: 'Exceptional partnership experience',
        href: '/people',
        body: 'We operate as an extension of the client’s delivery capability — pragmatic and focused on outcomes.',
      },
      {
        title: 'Digital and data-driven approach',
        href: '/perspectives/agentic-ai-in-energy-trading',
        body: 'Energy and commodities are data-intensive. We exploit complex data sets for commercial benefit.',
      },
    ],
    teamHeading: 'Our team',
    team: [
      {
        title: 'Elisabeth Plakinger',
        href: '/people/elisabeth-plakinger',
        body: 'Principal Consultant — UK Energy and energy trading. elisabeth.plakinger@capco.com',
      },
    ],
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
    jumps: [
      { label: 'Energy', href: '/industries/energy' },
      { label: 'UK Energy', href: '/industries/energy/uk-energy' },
    ],
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
