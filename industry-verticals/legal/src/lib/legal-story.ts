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

export const STORY_INTRO =
  'Today’s pain mapped to SitecoreAI capability — stay close to the RFP. Your people are the product. Confirm names with Thomas before putting colleagues on screen.';

export const STORY_PAINS: StoryPain[] = [
  {
    pain: 'Lawyer profiles via Microsoft Forms → SharePoint → copy/paste into Sitecore',
    capability: 'Template-aware AI drafting from a CV + workflow (approve, don’t re-key)',
  },
  {
    pain: '~60,000 credentials on SharePoint lists; manual publish to every surface',
    capability: 'Agent drafts, tags against their taxonomy, confidentiality gate, publish once',
  },
  {
    pain: 'Experience tab empty to crawlers; related content mis-fires despite nine tags',
    capability: 'AXP structured delivery + Sitecore AI Search over the same taxonomy',
  },
  {
    pain: '120,000-page long tail; out-of-box AEO tools guess US topics',
    capability: 'Scrunch configured to practices, regions, competitor set first',
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
      'Eight years in; sceptical of content-generation theatre. Measures citation by topic. Owns publishing model and SEO. Check names with him before putting colleagues on screen.',
  },
  {
    name: 'Vince',
    role: 'Director of Business Development',
    brief:
      'Panel tenders across offices. Wants every relationship, matter and secondment — including Dawn’s 2006 Barclays secondment already on the public profile. Sitecore is behavioural + published content, via MCP to their data layer — do not overclaim CRM/finance.',
  },
  {
    name: 'Priya Raman',
    role: 'Head of Legal, technology supplier',
    brief:
      'Largest customer entered administration. She shortlists; GC of BP is not on the site. Path: ChatGPT → Out-Law guide → Dawn Allen → credential that matches the problem.',
  },
  {
    name: 'David Mueller',
    role: 'Solution Architect',
    brief:
      'SolrCloud, AKS, Istio, ~113 foundation/feature modules, custom tagging. Wants search overhead gone without losing troubleshooting. Emma (digital exec) is the human integration layer today.',
  },
  {
    name: 'Emma',
    role: 'Digital executive',
    brief:
      'Runs day to day. Reviews Dawn’s draft in a queue, not an inbox. Schedules 07:00 so Singapore, Shanghai and Sydney stop waiting on a UK working day. Human integration layer on XP today.',
  },
];

export const STORY_LIFECYCLE: StoryLifecycle[] = [
  { stage: 'Signal', capability: 'Scrunch topic trend — restructuring citation gap' },
  { stage: 'Audit', capability: 'Live agent view of their pages' },
  { stage: 'Campaign', capability: 'One brief + brand kit' },
  { stage: 'Contribute', capability: 'CV upload → template-aware draft' },
  { stage: 'Govern', capability: 'Emma reviews, schedules 07:00' },
  { stage: 'Credential', capability: 'Tag once, appear everywhere' },
  { stage: 'Discover', capability: 'Priya’s prompt → cited Out-Law' },
  { stage: 'Convert', capability: 'Profile that shows the work' },
];

export const STORY_BEATS: StoryBeat[] = [
  {
    id: '01',
    act: 1,
    title: 'Personas',
    subtitle: 'Meet the cast — people are the product',
    talk: 'Thomas owns visibility. Emma runs day to day. Dawn’s profile has to sell her. David keeps XP up. Vince turns interest into instructions. Priya is the person reading at eleven at night.',
    point: 'Not a checkout story. The conversion asset is the named lawyer.',
    href: '/what-we-heard',
    hrefLabel: 'What we heard',
  },
  {
    id: '02',
    act: 1,
    title: 'Agenda',
    subtitle: 'Three acts — content operations in the middle',
    talk: 'Act 1 Thomas (~25%). Act 2 Dawn, Emma, Priya, Vince (~50%). Act 3 measure, platform, commercials (~25%). Weighted to content operations because that is where the workshop said the cost sits.',
    point: 'We stop for questions. We do not save them for a graveyard slide.',
    href: '/story',
    hrefLabel: 'Storyboard',
  },
  {
    id: '03',
    act: 1,
    title: 'Live audit',
    subtitle: 'We crawled your site the way an agent does',
    talk: 'Frame every finding as a platform defect — never as criticism of Dawn, Emma or the team. Empty experience tab, wrong insight list, share-plan recommendations, related = letter B.',
    point:
      'Not a content problem or a tagging problem. Query and rendering — and we can fix those.',
    href: '/people/dawn-allen',
    hrefLabel: 'Dawn Allen profile',
  },
  {
    id: '04',
    act: 1,
    title: 'Scrunch Monitor',
    subtitle: 'Configured, not out of the box',
    talk: 'Four practices including restructuring. UK, Australia, Germany — US filtered. Competitors: DLA Piper, CMS, Eversheds, Addleshaw.',
    point: 'We did the configuration for your business before showing you a score.',
    href: '/expertise/restructuring',
    hrefLabel: 'Restructuring',
  },
  {
    id: '05',
    act: 1,
    title: 'Topics over time',
    subtitle: 'Not prompts in a list',
    talk: 'Restructuring and insolvency, FS regulation, energy transition — twelve weeks vs the competitor set. Topic trend is the board KPI.',
    point: 'Topic trend is the business KPI.',
    href: '/out-law',
    hrefLabel: 'Out-Law',
  },
  {
    id: '06',
    act: 1,
    title: 'Scrunch AXP',
    subtitle: 'Crawlability fix — same facts, fewer tokens',
    talk: 'AXP at the CDN serves crawlers the same credentials as clean structured text. Same content, different delivery format. Not different content.',
    point: 'The conversion asset becomes readable without changing the facts.',
    href: '/people/dawn-allen',
    hrefLabel: 'Dawn Allen',
  },
  {
    id: '07',
    act: 1,
    title: 'One brief becomes the campaign',
    subtitle: 'Planning · DAM · brand kit',
    talk: 'Campaign page, LinkedIn, the guide Priya will read, webinar invite — brand kit loaded from real Pinsent Masons tone of voice.',
    point: 'Tone of voice is how a full-service firm differentiates.',
    href: '/',
    hrefLabel: 'Home',
  },
  {
    id: '08',
    act: 2,
    title: 'Brand assistant',
    subtitle: 'Dawn updates her profile by uploading the CV she already has',
    talk: 'No Microsoft Form. The value is knowing the template, not the writing.',
    point: 'Their idea, shown working.',
    href: '/people/dawn-allen',
    hrefLabel: 'Dawn Allen',
  },
  {
    id: '09',
    act: 2,
    title: 'Emma reviews once',
    subtitle: 'Then schedules 07:00',
    talk: 'Arrives in Emma’s queue, not her inbox. Item-level schedule — Singapore, Shanghai, Sydney stop waiting on a UK working day.',
    point: 'Scheduled publishing on one item, without dragging the node.',
    href: '/people',
    hrefLabel: 'People',
  },
  {
    id: '10',
    act: 2,
    title: 'A closed matter becomes a credential',
    subtitle: 'Tagged once, everywhere',
    talk: 'Agent drafts the summary, proposes tags against their model, confidentiality gate. It appears on Dawn, restructuring, financial services, every colleague on the matter.',
    point: 'SharePoint list and copy-paste gone. Compliance checkpoint kept.',
    href: '/expertise/restructuring',
    hrefLabel: 'Restructuring',
  },
  {
    id: '11',
    act: 2,
    title: 'Warsaw publishes six guides, not a site',
    subtitle: 'Translation · fallback',
    talk: 'Six Out-Law pieces, human-reviewed, fallback on the rest. A new language stops being a project.',
    point: 'Brand and ToV mean human-in-the-loop stays.',
    href: '/out-law/guides',
    hrefLabel: 'Out-Law guides',
  },
  {
    id: '12',
    act: 2,
    title: 'Priya asks the question',
    subtitle: 'Pinsent Masons is in the answer',
    talk: 'Customer in administration Friday. The firm published this guide in March 2024. Campaign + AXP make it cited.',
    point: 'Luck is not a discovery strategy.',
    href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    hrefLabel: 'Essential supplier guide',
  },
  {
    id: '13',
    act: 2,
    title: 'The page that used to recommend share plans',
    subtitle: 'AI Search · personalisation',
    talk: 'Same guide, same nine tags. Now: CIGA analysis, pre-pack administration, two restructuring credentials — not employee share-option guides.',
    point: 'Taxonomy isn’t the problem. What consumes it is.',
    href: '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies',
    hrefLabel: 'Guide related work',
  },
  {
    id: '14',
    act: 2,
    title: 'Dawn’s profile, working',
    subtitle: 'Experience tab returns the work',
    talk: 'Credentials date-ordered — including Barclays 2006. Insight feed is her restructuring writing. Related people are affinity colleagues, not the letter B.',
    point: 'Credentials are the conversion asset. They have to render.',
    href: '/people/dawn-allen',
    hrefLabel: 'Dawn Allen',
  },
  {
    id: '15',
    act: 2,
    title: 'Vince sees her firm',
    subtitle: 'And the Barclays secondment',
    talk: 'Sitecore is behavioural + published content. Full picture still needs finance, Interaction, matter DB. Don’t overclaim.',
    point: 'The website stops being a silo of public content nobody joins up.',
    href: '/people/dawn-allen',
    hrefLabel: 'Career history on profile',
  },
  {
    id: '16',
    act: 3,
    title: 'Thomas measures',
    subtitle: 'Topics, citations, channels',
    talk: 'Twelve weeks: is restructuring moving? Cited more often, sourced from our site? This is AI-answer share, not another keyword chase.',
    point: 'Visibility, journey and content performance in one place.',
    href: '/out-law',
    hrefLabel: 'Out-Law',
  },
  {
    id: '17',
    act: 3,
    title: 'The first A/B test the firm has ever run',
    subtitle: 'Conversion optimisation',
    talk: 'Emma optimises the restructuring intro from the editor. Routine change stops needing a monthly release.',
    point: 'Dev capacity goes to what is genuinely new.',
    href: '/expertise/restructuring',
    hrefLabel: 'Restructuring page',
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
    talk: 'Empty experience tab → Thomas briefs once → Dawn contributes in Word → Emma approves → credential on four surfaces → Priya finds the guide then the person → Vince has context → David has the site without the cluster.',
    point: 'Your people are the product. This is the operating model around them.',
    href: '/',
    hrefLabel: 'Home',
  },
];

export const STORY_ACTS: { act: 1 | 2 | 3; title: string; weight: string }[] = [
  { act: 1, title: 'The signal — Thomas + Scrunch', weight: '~25%' },
  { act: 2, title: 'The firm runs on it — Dawn, Emma, Priya, Vince', weight: '~50%' },
  { act: 3, title: 'Measure, optimise, platform questions', weight: '~25%' },
];

export const GUIDE_PATH =
  '/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies';

export const RESTRUCTURING = {
  eyebrow: 'Expertise',
  title: 'Restructuring',
  intro:
    'Non-contentious restructuring and insolvency for financial institutions, boards, and suppliers who have to keep trading when a customer fails. One taxonomy — service, sector, region, lawyer — published once.',
  tags: ['Restructuring', 'Insolvency', 'Financial Services', 'UK'],
  credentials: [
    {
      year: '2024',
      title: 'Essential supplier obligations during customer administration',
      href: '/people/dawn-allen',
      lawyer: 'Dawn Allen',
    },
    {
      year: '2006',
      title: 'Barclays Bank plc, Legal Secondee',
      href: '/people/dawn-allen',
      lawyer: 'Dawn Allen',
    },
  ],
};

export const RELATED_WORK = [
  {
    title: 'CIGA and the essential supplier regime',
    summary:
      'How the Corporate Insolvency and Governance Act expanded supply obligations beyond utilities and IT.',
    href: GUIDE_PATH,
    tag: 'Restructuring',
  },
  {
    title: 'Pre-pack administration for suppliers',
    summary: 'What continuing supply looks like when the customer is in a pre-pack.',
    href: GUIDE_PATH,
    tag: 'Insolvency',
  },
  {
    title: 'Dawn Allen — Barclays secondment, 2006',
    summary: 'Public credential on the partner profile Vince can take into a Barclays meeting.',
    href: '/people/dawn-allen',
    tag: 'Financial Services',
  },
  {
    title: 'Restructuring practice',
    summary: 'Service + sector + region — the same nine-dimension taxonomy, used.',
    href: '/expertise/restructuring',
    tag: 'Service',
  },
];
