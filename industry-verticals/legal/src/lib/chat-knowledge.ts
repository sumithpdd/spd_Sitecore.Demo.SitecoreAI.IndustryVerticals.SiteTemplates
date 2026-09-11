import { GUIDE_PATH } from '@/lib/legal-story';

export type ChatSource = { title: string; href: string };

export type ChatAnswer = {
  text: string;
  sources: ChatSource[];
};

export type LegalChatIntent = 'default' | 'priya-guide' | 'dawn' | 'restructuring' | 'story';

export const SUGGESTED_PROMPTS = [
  'Priya: customer in administration',
  'Who is Dawn Allen?',
  'When must UK suppliers keep supplying?',
  'How do lawyer profiles get published?',
  'What did we hear from the RFP?',
];

export function resolveLegalChatIntent(path: string): LegalChatIntent {
  const p = path.toLowerCase();
  if (p.includes('when-uk-suppliers') || p.includes('/out-law/guides')) return 'priya-guide';
  if (p.includes('dawn-allen') || p.includes('sally-williamson')) return 'dawn';
  if (p.includes('restructuring')) return 'restructuring';
  if (p.includes('/story') || p.includes('what-we-heard')) return 'story';
  return 'default';
}

export function suggestedPromptsForIntent(intent: LegalChatIntent): string[] {
  switch (intent) {
    case 'priya-guide':
      return [
        'Priya: customer in administration',
        'When must UK suppliers keep supplying?',
        'Who wrote this Out-Law guide?',
        'Why did related work used to show share plans?',
      ];
    case 'dawn':
      return [
        'Who is Dawn Allen?',
        'Show the Barclays 2006 secondment',
        'How does Emma publish a profile?',
        'Priya: customer in administration',
      ];
    case 'restructuring':
      return [
        'Tag a credential once, appear everywhere',
        'Who is Dawn Allen?',
        'What is Scrunch for this firm?',
        'Priya: customer in administration',
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
  [GUIDE_PATH]: 'When UK suppliers must continue to supply insolvent companies',
  '/people/dawn-allen': 'Dawn Allen',
  '/people/sally-williamson': 'Sally Williamson',
  '/expertise/restructuring': 'Restructuring',
  '/what-we-heard': 'What we heard',
  '/story': 'Storyboard',
  '/people': 'People',
  '/out-law': 'Out-Law',
  '/out-law/guides': 'Out-Law guides',
  '/': 'Home',
};

type KnowledgeEntry = {
  match: RegExp;
  text: string;
  sourceHrefs: string[];
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    match: /priya|customer.*(administ|insolvent)|chatgpt.*guide|eleven at night|head of legal/i,
    text: 'Priya Raman (Head of Legal, technology supplier) is the conversion reader. Friday: her largest customer entered administration. Path: ChatGPT → this March 2024 Out-Law guide → Dawn Allen’s profile and a credential that matches the problem. GC of BP is not on the site — the named lawyer is the conversion asset.',
    sourceHrefs: [GUIDE_PATH, '/people/dawn-allen', '/what-we-heard'],
  },
  {
    match:
      /ciga|essential supplier|233b?|s233|keep supplying|continue to supply|insolvent compan|ipso facto|when must uk suppliers/i,
    text: 'Out-Law guide (6 Mar 2024): UK suppliers can be required to keep supplying insolvent companies under Insolvency Act ss233, 233A and 233B (CIGA 2020 widened the regime beyond utilities and IT). Authors: Sally Williamson then Dawn Allen. Open the guide, then Dawn’s profile.',
    sourceHrefs: [GUIDE_PATH, '/people/sally-williamson', '/people/dawn-allen'],
  },
  {
    match: /who wrote|authors?|sally williamson|select authors/i,
    text: 'This guide’s Select Authors are Sally Williamson (Managing Senior Practice Development Lawyer) then Dawn Allen (Partner, Leeds). Same people as live Pinsent Masons. Open either profile from Contact an adviser.',
    sourceHrefs: [GUIDE_PATH, '/people/sally-williamson', '/people/dawn-allen'],
  },
  {
    match: /dawn allen|barclays|2006 secondment|leeds.*partner/i,
    text: 'Dawn Allen is a Leeds Partner in non-contentious restructuring and insolvency. The experience tab should date-order credentials — including the 2006 Barclays Bank plc legal secondment Vince needs in the room. Related people are affinity colleagues, not “the letter B”.',
    sourceHrefs: ['/people/dawn-allen', '/expertise/restructuring', GUIDE_PATH],
  },
  {
    match: /share.?plan|related work|nine tags|letter b|experience tab/i,
    text: 'Live site defect, framed as platform not people: empty experience tab, wrong insight list, related work firing employee share-plan guides despite nine restructuring tags. Demo related work is CIGA, pre-pack suppliers, Dawn’s Barclays credential, and the restructuring practice — taxonomy consumed correctly.',
    sourceHrefs: [GUIDE_PATH, '/people/dawn-allen', '/expertise/restructuring'],
  },
  {
    match: /thomas|citation|seo|digital marketing manager|topic trend/i,
    text: 'Thomas (Digital Marketing Manager, eight years in) owns publishing and SEO. He is sceptical of content-generation theatre and measures citation by topic. Confirm lawyer names with him before they go on screen. KPI: is restructuring moving vs DLA Piper, CMS, Eversheds, Addleshaw — not another keyword chase.',
    sourceHrefs: ['/what-we-heard', '/story', '/out-law'],
  },
  {
    match: /emma|07:?00|review queue|singapore|shanghai|sydney|digital executive/i,
    text: 'Emma runs day to day. Dawn’s draft arrives in her queue, not her inbox. She schedules 07:00 so Singapore, Shanghai and Sydney stop waiting on a UK working day. Human integration layer — approve, don’t re-key.',
    sourceHrefs: ['/what-we-heard', '/people/dawn-allen', '/people'],
  },
  {
    match: /vince|business development|panel tender|overclaim|crm|matter db/i,
    text: 'Vince (Director of BD) wants every relationship, matter and secondment — including Dawn’s 2006 Barclays secondment already on the public profile. Sitecore is behavioural + published content via MCP to their data layer. Do not overclaim CRM or finance.',
    sourceHrefs: ['/people/dawn-allen', '/what-we-heard', '/story'],
  },
  {
    match: /david mueller|solr|aks|istio|search overhead|solution architect/i,
    text: 'David Mueller keeps XP up: SolrCloud, AKS, Istio, ~113 modules, three live Solr queries per page. He wants search overhead gone without losing troubleshooting. Honest model: entitlements at the edge, not a pretend drop-in for every log they have today.',
    sourceHrefs: ['/story', '/what-we-heard'],
  },
  {
    match:
      /rfp|what we heard|microsoft forms|sharepoint|60,?000 credential|copy.?paste|lawyer profiles get published/i,
    text: 'RFP pains: profiles via Forms → SharePoint → paste into Sitecore; ~60,000 credentials on lists; experience tab empty to crawlers; 120k-page long tail; three Solr queries a page. SitecoreAI: template-aware draft from a CV, tag once, AXP for crawlers, AI Search over the same taxonomy.',
    sourceHrefs: ['/what-we-heard', '/story', '/people/dawn-allen'],
  },
  {
    match: /scrunch|axp|aeo|competitor|dla piper|eversheds|addleshaw/i,
    text: 'Scrunch is configured for this firm — not US out-of-box. Practices include restructuring. UK, Australia, Germany; US filtered. Competitors: DLA Piper, CMS, Eversheds, Addleshaw. AXP at the CDN serves crawlers the same credentials as structured text. Same facts, fewer tokens.',
    sourceHrefs: ['/expertise/restructuring', '/people/dawn-allen', '/story'],
  },
  {
    match: /tag once|credential once|closed matter|confidentiality/i,
    text: 'A closed matter becomes a credential: agent drafts the summary, proposes tags against their model, confidentiality gate. It appears on Dawn, restructuring, financial services, and every colleague on the matter — SharePoint list and copy-paste gone, compliance checkpoint kept.',
    sourceHrefs: ['/expertise/restructuring', '/people/dawn-allen'],
  },
  {
    match: /storyboard|three.?act|walk the (story|talk)|presentation flow/i,
    text: 'Three acts: (1) Thomas + Scrunch ~25%. (2) Dawn, Emma, Priya, Vince — content operations ~50%. (3) Measure, A/B, David’s platform questions ~25%. Conversion asset is the named lawyer, not a checkout. Open What we heard, then the 19-beat storyboard.',
    sourceHrefs: ['/story', '/what-we-heard', GUIDE_PATH],
  },
  {
    match: /people are the product|named lawyer|conversion asset/i,
    text: 'Not a checkout story. The conversion asset is the named lawyer. Empty experience tab → Thomas briefs once → Dawn contributes in Word → Emma approves → credential on four surfaces → Priya finds the guide then the person → Vince has context.',
    sourceHrefs: ['/people/dawn-allen', GUIDE_PATH, '/'],
  },
  {
    match: /restructuring practice|expertise\/restructuring/i,
    text: 'Restructuring practice page: non-contentious restructuring and insolvency for financial institutions, boards, and suppliers who must keep trading when a customer fails. Same nine-dimension taxonomy — service, sector, region, lawyer — published once.',
    sourceHrefs: ['/expertise/restructuring', '/people/dawn-allen', GUIDE_PATH],
  },
  {
    match: /cdp|affinity|identify|guest|engagement panel/i,
    text: 'Use the CDP panel (bottom-right) while you walk the story. Page views build affinities (People, Restructuring, Out-Law, Dawn Allen). Identify in the panel, then open the guide and Dawn’s profile so the journey fills.',
    sourceHrefs: [GUIDE_PATH, '/people/dawn-allen', '/'],
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
      text: 'Ask about Priya’s administration Friday, the CIGA essential-supplier guide, Dawn Allen, or what we heard in the RFP.',
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
    text: 'I could not match that to the Pinsent demo talk-track. Try Priya’s insolvent-customer path, the CIGA guide, Dawn Allen, Thomas, Emma, or What we heard.',
    sources: [
      { title: 'Essential supplier guide', href: GUIDE_PATH },
      { title: 'Dawn Allen', href: '/people/dawn-allen' },
      { title: 'What we heard', href: '/what-we-heard' },
      { title: 'Storyboard', href: '/story' },
    ],
  };
}
