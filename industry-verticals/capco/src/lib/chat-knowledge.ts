import { GUIDE_PATH } from '@/lib/capco-story';

export type ChatSource = { title: string; href: string };

export type ChatAnswer = {
  text: string;
  sources: ChatSource[];
};

export type LegalChatIntent = 'default' | 'priya-guide' | 'elisabeth' | 'industry' | 'story';

export const SUGGESTED_PROMPTS = [
  'Priya: ChatGPT to T+1',
  'Who is Elisabeth Plakinger?',
  'What is The Expert Advantage?',
  'How do consultant profiles get published?',
  'What did we hear from the RFP?',
];

export function resolveLegalChatIntent(path: string): LegalChatIntent {
  const p = path.toLowerCase();
  if (p.includes('t-plus-1') || p.includes('/perspectives')) return 'priya-guide';
  if (p.includes('elisabeth-plakinger') || p.includes('charlotte-byrne')) return 'elisabeth';
  if (p.includes('/industries/') || p.includes('capital-markets') || p.includes('/energy'))
    return 'industry';
  if (p.includes('/story') || p.includes('what-we-heard')) return 'story';
  return 'default';
}

export function suggestedPromptsForIntent(intent: LegalChatIntent): string[] {
  switch (intent) {
    case 'priya-guide':
      return [
        'Priya: ChatGPT to T+1',
        'Who wrote this Perspective?',
        'Who is Elisabeth Plakinger?',
        'Why did related work used to misfire?',
      ];
    case 'elisabeth':
      return [
        'Who is Elisabeth Plakinger?',
        'Show the T+1 Europe work',
        'How does Emma publish a profile?',
        'Priya: ChatGPT to T+1',
      ];
    case 'industry':
      return [
        'Tag a credential once, appear everywhere',
        'Who is Elisabeth Plakinger?',
        'What is Scrunch for this firm?',
        'Priya: ChatGPT to T+1',
      ];
    case 'story':
      return [
        'What did we hear from the RFP?',
        'Who is Priya Raman?',
        'Who is Thomas?',
        'Walk the three-act storyboard',
      ];
    default:
      return SUGGESTED_PROMPTS;
  }
}

const TITLES: Record<string, string> = {
  [GUIDE_PATH]: 'Europe’s T+1 market must prove readiness',
  '/perspectives/ai-assistants-as-the-front-door-to-fs':
    'AI assistants as the front door to financial services',
  '/perspectives/agentic-ai-in-energy-trading': 'Agentic AI in energy trading',
  '/perspectives/canada-payment-fraud': 'Canada payment fraud: the next control test',
  '/people/elisabeth-plakinger': 'Elisabeth Plakinger',
  '/people/charlotte-byrne': 'Charlotte Byrne',
  '/people/anne-marie-rowland': 'Anne-Marie Rowland',
  '/people/marina-costa': 'Marina Costa',
  '/industries/capital-markets': 'Capital Markets',
  '/industries/banking-and-payments': 'Banking and Payments',
  '/industries/energy': 'Energy',
  '/what-we-heard': 'What we heard',
  '/story': 'Storyboard',
  '/people': 'Meet our people',
  '/perspectives': 'Perspectives',
  '/careers': 'Join Us',
  '/about-us': 'Our Story',
  '/': 'Home',
};

type KnowledgeEntry = {
  match: RegExp;
  text: string;
  sourceHrefs: string[];
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    match: /priya|chatgpt|cdo|eleven at night|t\+?1|t-plus-1|settlement/i,
    text: 'Priya Raman (CDO at a bank) is the conversion reader. Path: ChatGPT → Europe’s T+1 Perspective → Elisabeth Plakinger. Consultants are the product — the named person is the conversion asset, not a generic industry landing page.',
    sourceHrefs: [GUIDE_PATH, '/people/elisabeth-plakinger', '/what-we-heard'],
  },
  {
    match: /who wrote|authors?|elisabeth plakinger|charlotte byrne/i,
    text: 'The T+1 Perspective is by Elisabeth Plakinger, Principal Consultant, Capital Markets, London. Charlotte Byrne (Banking & Payments) wrote AI assistants as the front door to FS. Anne-Marie Rowland is CEO. Marina Costa is the Join Us / Meet our people story in Brazil.',
    sourceHrefs: [GUIDE_PATH, '/people/elisabeth-plakinger', '/people/charlotte-byrne'],
  },
  {
    match: /elisabeth|t\+?1 europe|capital markets|post-trade/i,
    text: 'Elisabeth Plakinger is a London Principal Consultant in Capital Markets, focused on T+1 settlement and Europe markets. The experience tab should date-order credentials. Related people are affinity colleagues, not “the letter B”.',
    sourceHrefs: ['/people/elisabeth-plakinger', '/industries/capital-markets', GUIDE_PATH],
  },
  {
    match: /share.?plan|related work|nine tags|letter b|experience tab/i,
    text: 'Live site defect, framed as platform not people: empty experience tab, wrong insight list, related work misfiring despite nine tags. Demo related work is T+1, AI assistants, energy trading, Elisabeth’s profile, and Capital Markets — taxonomy consumed correctly.',
    sourceHrefs: [GUIDE_PATH, '/people/elisabeth-plakinger', '/industries/capital-markets'],
  },
  {
    match: /thomas|citation|aeo|seo|digital marketing manager|topic trend|content theatre/i,
    text: 'Thomas (Digital Marketing Manager) owns publishing, SEO and AEO. He is sceptical of content-generation theatre and measures citation by topic. Confirm names with him before they go on screen. KPI: is T+1 moving vs Accenture, McKinsey, BCG, Deloitte — not another keyword chase.',
    sourceHrefs: ['/what-we-heard', '/story', '/perspectives'],
  },
  {
    match: /emma|07:?00|review queue|apac|mini cms|content operations/i,
    text: 'Emma runs content operations. Elisabeth’s draft arrives in her Mini CMS queue, not her inbox. She schedules 07:00 so APAC stops waiting on a UK working day. Human integration layer — approve, don’t re-key.',
    sourceHrefs: ['/what-we-heard', '/people/elisabeth-plakinger', '/people'],
  },
  {
    match: /vince|business development|panel|overclaim|crm/i,
    text: 'Vince (BD for FS / energy panels) wants every relationship and credential — including Elisabeth’s T+1 Europe work already on the public profile. Sitecore is behavioural + published content. Do not overclaim CRM or finance.',
    sourceHrefs: ['/people/elisabeth-plakinger', '/what-we-heard', '/story'],
  },
  {
    match: /david mueller|solr|aks|istio|search overhead|solution architect/i,
    text: 'David Mueller keeps XP up: SolrCloud, AKS, Istio, three live Solr queries per page. He wants search overhead gone without losing troubleshooting. Honest model: entitlements at the edge, not a pretend drop-in for every log they have today.',
    sourceHrefs: ['/story', '/what-we-heard'],
  },
  {
    match:
      /rfp|what we heard|microsoft forms|sharepoint|copy.?paste|consultant profiles get published/i,
    text: 'RFP pains: profiles via Forms → SharePoint → paste into Sitecore; credentials on lists; experience tab empty to crawlers; AEO tools guess US topics; three Solr queries a page. SitecoreAI: Mini CMS draft from a CV, tag once, AXP for crawlers, AI Search over FS + Energy.',
    sourceHrefs: ['/what-we-heard', '/story', '/people/elisabeth-plakinger'],
  },
  {
    match: /scrunch|axp|competitor|accenture|mckinsey|bcg|deloitte/i,
    text: 'Scrunch is configured for this firm — Financial Services and Energy, not US out-of-box consulting. Competitors: Accenture, McKinsey, BCG, Deloitte. AXP at the CDN serves crawlers the same credentials as structured text. Same facts, fewer tokens.',
    sourceHrefs: ['/industries/capital-markets', '/industries/energy', '/story'],
  },
  {
    match: /tag once|credential once|closed (matter|engagement)|confidentiality/i,
    text: 'A closed engagement becomes a credential: agent drafts the summary, proposes tags against FS + Energy, confidentiality gate. It appears on Elisabeth, Capital Markets, Perspectives, and every colleague on the engagement — SharePoint list and copy-paste gone, compliance checkpoint kept.',
    sourceHrefs: ['/industries/capital-markets', '/people/elisabeth-plakinger'],
  },
  {
    match: /storyboard|three.?act|walk the (story|talk)|presentation flow/i,
    text: 'Three acts: (1) Thomas + Scrunch ~25%. (2) Elisabeth, Emma, Priya, Vince — content operations ~50%. (3) Measure, A/B, David’s platform questions ~25%. Conversion asset is the named consultant, not a checkout. Open What we heard, then the 19-beat storyboard.',
    sourceHrefs: ['/story', '/what-we-heard', GUIDE_PATH],
  },
  {
    match: /people are the product|named (lawyer|consultant)|conversion asset|expert advantage/i,
    text: 'Not a checkout story. The conversion asset is the named consultant. Empty experience tab → Thomas briefs once → Elisabeth contributes in Word → Emma approves → credential on four surfaces → Priya finds the Perspective then the person → Vince has context. That is The Expert Advantage.',
    sourceHrefs: ['/people/elisabeth-plakinger', GUIDE_PATH, '/'],
  },
  {
    match: /capital markets|banking|energy industry|expertise\/|industries\//i,
    text: 'Industries: Banking and Payments, Capital Markets, Insurance, Wealth and Asset Management, Energy. Capital Markets carries the T+1 conversion story. Energy is the A/B-test beat. Banking is Charlotte’s AI-assistants work.',
    sourceHrefs: [
      '/industries/capital-markets',
      '/industries/banking-and-payments',
      '/industries/energy',
    ],
  },
  {
    match: /cdp|affinity|identify|guest|engagement panel/i,
    text: 'Use the CDP panel (bottom-right) while you walk the story. Page views build affinities (People, Capital Markets, Perspectives, Elisabeth Plakinger). Identify in the panel, then open the T+1 Perspective and Elisabeth’s profile so the journey fills.',
    sourceHrefs: [GUIDE_PATH, '/people/elisabeth-plakinger', '/'],
  },
];

function sourcesFromHrefs(hrefs: string[]): ChatSource[] {
  return hrefs.map((href) => ({
    title: TITLES[href] || href.replace(/^\//, '').replace(/\//g, ' / ') || 'Home',
    href,
  }));
}

export function answerChat(query: string): ChatAnswer {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      text: 'Ask about Priya’s ChatGPT → T+1 path, Elisabeth Plakinger, Perspectives, or what we heard in the RFP.',
      sources: [],
    };
  }

  const knowledge = KNOWLEDGE.find((entry) => entry.match.test(trimmed));
  if (knowledge) {
    return {
      text: knowledge.text,
      sources: sourcesFromHrefs(knowledge.sourceHrefs).slice(0, 4),
    };
  }

  return {
    text: 'I could not match that to the Capco demo talk-track. Try Priya’s T+1 path, Elisabeth Plakinger, Thomas, Emma, or What we heard.',
    sources: [
      { title: 'T+1 Perspective', href: GUIDE_PATH },
      { title: 'Elisabeth Plakinger', href: '/people/elisabeth-plakinger' },
      { title: 'What we heard', href: '/what-we-heard' },
      { title: 'Storyboard', href: '/story' },
    ],
  };
}
