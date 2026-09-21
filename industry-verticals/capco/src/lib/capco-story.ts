export type StoryPain = {
  pain: string;
  capability: string;
};

export type StoryPersona = {
  name: string;
  role: string;
  brief: string;
};

export type StoryLifecycle = {
  stage: string;
  capability: string;
};

export type StoryBeat = {
  id: string;
  act: 1 | 2 | 3;
  title: string;
  subtitle: string;
  talk: string;
  point: string;
  href: string;
  hrefLabel: string;
};

export type IndustryStory = {
  eyebrow: string;
  title: string;
  intro: string;
  tags: string[];
  credentials: {
    year: string;
    title: string;
    href: string;
    consultant: string;
  }[];
};

/** Named conversion Perspective — Priya’s ChatGPT path lands here. */
export const GUIDE_PATH = '/perspectives/europes-t-plus-1-market-must-prove-readiness';

export const STORY_INTRO =
  'Today’s pain mapped to SitecoreAI capability — stay close to the RFP. Consultants are the product. Perspectives are the AEO surface. Confirm names with Thomas before putting colleagues on screen.';

export const STORY_PAINS: StoryPain[] = [
  {
    pain: 'Consultant profiles via Microsoft Forms → SharePoint → copy/paste into Sitecore',
    capability: 'Template-aware AI drafting from a CV + Mini CMS workflow (approve, don’t re-key)',
  },
  {
    pain: 'Thought-leadership and credentials on SharePoint lists; manual publish to every surface',
    capability:
      'Agent drafts, tags against FS + Energy taxonomy, confidentiality gate, publish once',
  },
  {
    pain: 'Experience tab empty to crawlers; related content mis-fires despite nine tags',
    capability: 'AXP structured delivery + Sitecore AI Search over the same taxonomy',
  },
  {
    pain: 'Long-tail Perspectives; out-of-box AEO tools guess generic US consulting topics',
    capability:
      'Scrunch configured to Financial Services + Energy first — Accenture, McKinsey, BCG, Deloitte',
  },
  {
    pain: 'Three live Solr queries per page; 8–9GB indexes; AKS / Istio overhead',
    capability: 'AI Search at the edge — same dynamic pages, entitlements modelled honestly',
  },
];

export const STORY_PERSONAS: StoryPersona[] = [
  {
    name: 'Thomas',
    role: 'Digital Marketing Manager',
    brief:
      'Sceptical of content-generation theatre. Measures citation and AEO by topic, not pageviews. Owns publishing model and SEO. Check names with him before putting colleagues on screen.',
  },
  {
    name: 'Emma',
    role: 'Content operations',
    brief:
      'Reviews drafts in a queue, not an inbox. Schedules 07:00 so APAC stops waiting on a UK working day. Human integration layer — approve, don’t re-key. Mini CMS is her day-to-day.',
  },
  {
    name: 'Priya Raman',
    role: 'CDO at a bank',
    brief:
      'Discovers Capco via ChatGPT. Path: ChatGPT → Europe’s T+1 Perspective → Elisabeth Plakinger. She shortlists the named consultant, not a generic industry landing page.',
  },
  {
    name: 'Vince',
    role: 'BD for FS / energy panels',
    brief:
      'Panel tenders across financial services and energy. Wants every relationship, credential and Perspective — including Elisabeth’s T+1 Europe work already on the public profile. Sitecore is behavioural + published content. Do not overclaim CRM/finance.',
  },
  {
    name: 'David Mueller',
    role: 'Solution architect',
    brief:
      'SolrCloud, AKS, Istio, custom tagging. Wants search overhead gone without losing troubleshooting. Emma is the human integration layer today.',
  },
];

export const STORY_LIFECYCLE: StoryLifecycle[] = [
  { stage: 'Signal', capability: 'Scrunch topic trend — T+1 / energy citation gap' },
  { stage: 'Audit', capability: 'Live agent view of their pages' },
  { stage: 'Campaign', capability: 'One brief + brand kit' },
  { stage: 'Contribute', capability: 'CV upload → template-aware draft' },
  { stage: 'Govern', capability: 'Emma reviews, schedules 07:00 for APAC' },
  { stage: 'Credential', capability: 'Tag once, appear everywhere' },
  { stage: 'Discover', capability: 'Priya’s prompt → cited T+1 Perspective' },
  { stage: 'Convert', capability: 'Profile that shows the work' },
];

export const STORY_BEATS: StoryBeat[] = [
  {
    id: '01',
    act: 1,
    title: 'Personas',
    subtitle: 'Meet the cast — consultants are the product',
    talk: 'Thomas owns visibility. Emma runs day to day. Elisabeth’s profile has to sell her. David keeps XP up. Vince turns interest into panels. Priya is the CDO reading at eleven at night.',
    point: 'Not a checkout story. The conversion asset is the named consultant.',
    href: '/what-we-heard',
    hrefLabel: 'What we heard',
  },
  {
    id: '02',
    act: 1,
    title: 'Agenda',
    subtitle: 'Three acts — content operations in the middle',
    talk: 'Act 1 Thomas (~25%). Act 2 Elisabeth, Emma, Priya, Vince (~50%). Act 3 measure, platform, commercials (~25%). Weighted to content operations because that is where the workshop said the cost sits.',
    point: 'We stop for questions. We do not save them for a graveyard slide.',
    href: '/story',
    hrefLabel: 'Storyboard',
  },
  {
    id: '03',
    act: 1,
    title: 'Live audit',
    subtitle: 'We crawled your site the way an agent does',
    talk: 'Frame every finding as a platform defect — never as criticism of Elisabeth, Emma or the team. Empty experience tab, wrong insight list, related = letter B.',
    point:
      'Not a content problem or a tagging problem. Query and rendering — and we can fix those.',
    href: '/people/elisabeth-plakinger',
    hrefLabel: 'Elisabeth Plakinger profile',
  },
  {
    id: '04',
    act: 1,
    title: 'Scrunch Monitor',
    subtitle: 'Configured, not out of the box',
    talk: 'Financial Services and Energy — not a generic consulting score. Competitors: Accenture, McKinsey, BCG, Deloitte.',
    point: 'We did the configuration for your business before showing you a score.',
    href: '/industries/capital-markets',
    hrefLabel: 'Capital Markets',
  },
  {
    id: '05',
    act: 1,
    title: 'Topics over time',
    subtitle: 'Not prompts in a list',
    talk: 'T+1 settlement, payments fraud, AI assistants, agentic energy trading — twelve weeks vs the competitor set. Topic trend is the board KPI.',
    point: 'Topic trend is the business KPI. Perspectives are the AEO content.',
    href: '/perspectives',
    hrefLabel: 'Perspectives',
  },
  {
    id: '06',
    act: 1,
    title: 'Scrunch AXP',
    subtitle: 'Crawlability fix — same facts, fewer tokens',
    talk: 'AXP at the CDN serves crawlers the same credentials as clean structured text. Same content, different delivery format. Not different content.',
    point: 'The conversion asset becomes readable without changing the facts.',
    href: '/people/elisabeth-plakinger',
    hrefLabel: 'Elisabeth Plakinger',
  },
  {
    id: '07',
    act: 1,
    title: 'One brief becomes the campaign',
    subtitle: 'Planning · DAM · brand kit',
    talk: 'Campaign page, LinkedIn, the T+1 Perspective Priya will read, webinar invite — brand kit loaded from real Capco tone of voice. The Expert Advantage.',
    point: 'Tone of voice is how expert-led consulting differentiates.',
    href: '/',
    hrefLabel: 'Home',
  },
  {
    id: '08',
    act: 2,
    title: 'Brand assistant',
    subtitle: 'Elisabeth updates her profile by uploading the CV she already has',
    talk: 'No Microsoft Form. Mini CMS knows the Person template. The value is knowing the template, not the writing.',
    point: 'Their idea, shown working.',
    href: '/people/elisabeth-plakinger',
    hrefLabel: 'Elisabeth Plakinger',
  },
  {
    id: '09',
    act: 2,
    title: 'Emma reviews once',
    subtitle: 'Then schedules 07:00 for APAC',
    talk: 'Arrives in Emma’s queue, not her inbox. Item-level schedule — Singapore, Hong Kong and Sydney stop waiting on a UK working day.',
    point: 'Scheduled publishing on one item, without dragging the node.',
    href: '/people',
    hrefLabel: 'Meet our people',
  },
  {
    id: '10',
    act: 2,
    title: 'A closed engagement becomes a credential',
    subtitle: 'Tagged once, everywhere',
    talk: 'Agent drafts the summary, proposes tags against FS + Energy, confidentiality gate. It appears on Elisabeth, Capital Markets, Perspectives, every colleague on the engagement.',
    point: 'SharePoint list and copy-paste gone. Compliance checkpoint kept.',
    href: '/industries/capital-markets',
    hrefLabel: 'Capital Markets',
  },
  {
    id: '11',
    act: 2,
    title: 'APAC publishes six Perspectives, not a site',
    subtitle: 'Translation · fallback · Join Us',
    talk: 'Six Perspectives, human-reviewed, fallback on the rest. A new language — and a new hire like Marina in Brazil — stops being a project.',
    point: 'Brand and ToV mean human-in-the-loop stays.',
    href: '/careers',
    hrefLabel: 'Join Us',
  },
  {
    id: '12',
    act: 2,
    title: 'Priya asks the question',
    subtitle: 'Capco is in the answer',
    talk: 'T+1 Europe is on the CDO’s desk. Capco published this Perspective. Campaign + AXP make it cited. ChatGPT → Perspective → Elisabeth.',
    point: 'Luck is not a discovery strategy.',
    href: GUIDE_PATH,
    hrefLabel: 'T+1 Perspective',
  },
  {
    id: '13',
    act: 2,
    title: 'The page that used to recommend the wrong work',
    subtitle: 'AI Search · personalisation',
    talk: 'Same Perspective, same nine tags. Now: T+1 readiness, capital markets credentials, energy trading adjacent work — not generic digital-transformation cards.',
    point: 'Taxonomy isn’t the problem. What consumes it is.',
    href: GUIDE_PATH,
    hrefLabel: 'Perspective related work',
  },
  {
    id: '14',
    act: 2,
    title: 'Elisabeth’s profile, working',
    subtitle: 'Experience tab returns the work',
    talk: 'Credentials date-ordered — T+1 settlement, Europe markets. Insight feed is her Perspectives. Related people are affinity colleagues, not the letter B.',
    point: 'Credentials are the conversion asset. They have to render.',
    href: '/people/elisabeth-plakinger',
    hrefLabel: 'Elisabeth Plakinger',
  },
  {
    id: '15',
    act: 2,
    title: 'Vince sees her firm',
    subtitle: 'FS and energy panels',
    talk: 'Sitecore is behavioural + published content. Full picture still needs CRM and the panel pipeline. Don’t overclaim.',
    point: 'The website stops being a silo of public content nobody joins up.',
    href: '/people/elisabeth-plakinger',
    hrefLabel: 'Career history on profile',
  },
  {
    id: '16',
    act: 3,
    title: 'Thomas measures',
    subtitle: 'Topics, citations, channels',
    talk: 'Twelve weeks: is T+1 moving? Cited more often, sourced from our site? This is AI-answer share vs Accenture, McKinsey, BCG, Deloitte — not another keyword chase.',
    point: 'Visibility, journey and content performance in one place.',
    href: '/perspectives',
    hrefLabel: 'Perspectives',
  },
  {
    id: '17',
    act: 3,
    title: 'The first A/B test the firm has ever run',
    subtitle: 'Conversion optimisation',
    talk: 'Emma optimises the Energy intro from the editor. Routine change stops needing a monthly release.',
    point: 'Dev capacity goes to what is genuinely new.',
    href: '/industries/energy',
    hrefLabel: 'Energy page',
  },
  {
    id: '18',
    act: 3,
    title: 'David’s list',
    subtitle: 'Migration, extensibility, audit, support',
    talk: 'They run three to four times more search queries than visits. Model entitlements honestly. You lose direct logs — you should get better answers than today’s jobs list.',
    point: 'Migration, marketplace support, publish audit, search entitlements in parallel.',
    href: '/story',
    hrefLabel: 'Storyboard',
  },
  {
    id: '19',
    act: 3,
    title: 'Executive close',
    subtitle: 'One platform, one connected firm',
    talk: 'Empty experience tab → Thomas briefs once → Elisabeth contributes in Word → Emma approves → credential on four surfaces → Priya finds the Perspective then the person → Vince has context → David has the site without the cluster.',
    point: 'Your people are the product. This is the operating model around them.',
    href: '/',
    hrefLabel: 'Home',
  },
];

export const STORY_ACTS: { act: 1 | 2 | 3; title: string; weight: string }[] = [
  { act: 1, title: 'The signal — Thomas + Scrunch', weight: '~25%' },
  { act: 2, title: 'The firm runs on it — Elisabeth, Emma, Priya, Vince', weight: '~50%' },
  { act: 3, title: 'Measure, optimise, platform questions', weight: '~25%' },
];

export const CAPITAL_MARKETS: IndustryStory = {
  eyebrow: 'Industries',
  title: 'Capital Markets',
  intro:
    'Deepening operational complexity, cost reduction, and a mounting regulatory burden — including Europe’s T+1 settlement shift. One taxonomy — industry, capability, region, consultant — published once.',
  tags: ['Capital Markets', 'T+1', 'Financial Services', 'Europe'],
  credentials: [
    {
      year: '2026',
      title: 'Europe’s T+1 market must prove readiness',
      href: '/people/elisabeth-plakinger',
      consultant: 'Elisabeth Plakinger',
    },
    {
      year: '2026',
      title: 'Post-trade operating model for a European investment bank',
      href: '/people/elisabeth-plakinger',
      consultant: 'Elisabeth Plakinger',
    },
  ],
};

export const BANKING: IndustryStory = {
  eyebrow: 'Industries',
  title: 'Banking and Payments',
  intro:
    'From building standalone digital banks to modernising core operations and advising across the payments delivery cycle. AI assistants are becoming the front door to financial services.',
  tags: ['Banking', 'Payments', 'AI assistants', 'Financial Services'],
  credentials: [
    {
      year: '2026',
      title: 'AI assistants as the front door to financial services',
      href: '/people/charlotte-byrne',
      consultant: 'Charlotte Byrne',
    },
  ],
};

export const ENERGY: IndustryStory = {
  eyebrow: 'Industries',
  title: 'Energy',
  intro:
    'Digitisation, decentralisation and decarbonisation — plus agentic AI in energy trading. Capco’s dual heritage in energy and financial services is the Expert Advantage.',
  tags: ['Energy', 'Trading', 'Agentic AI', 'Transition'],
  credentials: [
    {
      year: '2026',
      title: 'Agentic AI in energy trading',
      href: '/industries/energy',
      consultant: 'Elisabeth Plakinger',
    },
  ],
};

export const RELATED_WORK = [
  {
    title: 'Europe’s T+1 market must prove readiness',
    summary:
      'Settlement compression is a market-structure test, not a weekend IT change. Elisabeth Plakinger’s Perspective is the conversion article Priya finds in ChatGPT.',
    href: GUIDE_PATH,
    tag: 'Capital Markets',
  },
  {
    title: 'AI assistants as the front door to financial services',
    summary:
      'Charlotte Byrne on why the next client conversation starts in an assistant, not a branch or a portal.',
    href: '/perspectives/ai-assistants-as-the-front-door-to-fs',
    tag: 'Banking and Payments',
  },
  {
    title: 'Agentic AI in energy trading',
    summary: 'How trading desks use agentic systems without losing control or auditability.',
    href: '/perspectives/agentic-ai-in-energy-trading',
    tag: 'Energy',
  },
  {
    title: 'Elisabeth Plakinger — T+1 Europe',
    summary: 'Public credential on the consultant profile Vince can take into an FS panel.',
    href: '/people/elisabeth-plakinger',
    tag: 'Financial Services',
  },
  {
    title: 'Capital Markets',
    summary: 'Industry + capability + region — the same taxonomy, used.',
    href: '/industries/capital-markets',
    tag: 'Industry',
  },
];
