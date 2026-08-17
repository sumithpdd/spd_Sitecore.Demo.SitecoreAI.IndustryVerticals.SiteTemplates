import { filterSearchHits, type SearchHit } from 'lib/search-index';

export type ChatSource = { title: string; href: string };

export type ChatAnswer = {
  text: string;
  sources: ChatSource[];
};

export const SUGGESTED_PROMPTS = [
  'What courses are still in Clearing?',
  'Tell me about Computer Science and AI',
  'How do I apply through Clearing?',
  'Is there accommodation for Clearing students?',
  'Why study Business and Management?',
];

type KnowledgeEntry = {
  match: RegExp;
  text: string;
  sourceHrefs: string[];
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    match: /clearing.*(course|available|place)|courses?.*(clearing|available)|still in clearing/i,
    text: 'Yes — places are still available through Clearing 2026, including Computer Science and Artificial Intelligence. Call the Clearing hotline on +44 (0) 118 402 0900, or start an application online.',
    sourceHrefs: ['/clearing', '/courses/computer-science-and-ai'],
  },
  {
    match: /computer science|cs\s*&?\s*ai|artificial intelligence|g400/i,
    text: 'Computer Science and Artificial Intelligence is a BSc (UCAS G400), 3 years full-time at Whiteknights. Typical offer AAB–ABB. It is available through Clearing 2026, with modules in programming, machine learning, and intelligent systems.',
    sourceHrefs: ['/courses/computer-science-and-ai', '/clearing'],
  },
  {
    match: /how (do i |to )?apply|make (an |my )?application|ucas|enquire/i,
    text: 'To apply through Clearing, register your interest on the Make your application page. Advisors can talk you through UCAS and course options. You can also call +44 (0) 118 402 0900.',
    sourceHrefs: ['/clearing/how-to-apply', '/clearing'],
  },
  {
    match: /accommodation|halls|ensuite|room/i,
    text: 'Halls are available across campus, including ensuite rooms. Clearing applicants can use the accommodation guarantee — check options and book from the accommodation page.',
    sourceHrefs: ['/accommodation'],
  },
  {
    match: /business|management|henley|accounting|finance/i,
    text: 'Business and Management is taught with Henley Business School (AMBA, EQUIS and AACSB triple-accredited). Undergraduate options include BSc Business and Management, Marketing, Entrepreneurship, and International Business — 3 or 4 years with placement or study abroad.',
    sourceHrefs: ['/courses/business-and-management'],
  },
  {
    match: /centenary|100 years|alumni/i,
    text: 'The University is marking Centenary 2026 — 100 years. Alumni and visitors can explore the Centenary story from the homepage with campaign utm_campaign=centenary-2026.',
    sourceHrefs: ['/?utm_campaign=centenary-2026'],
  },
  {
    match: /student life|campus|societ|union|study and life/i,
    text: 'Campus life centres on Whiteknights: Students’ Union, societies, sport, and a parkland campus. Open Days and visiting information are on Study and life.',
    sourceHrefs: ['/study-and-life'],
  },
];

function sourcesFromHits(hits: SearchHit[]): ChatSource[] {
  return hits.slice(0, 4).map((hit) => ({ title: hit.title, href: hit.href }));
}

function sourcesFromHrefs(hrefs: string[]): ChatSource[] {
  const hits = filterSearchHits('', 'everything');
  return hrefs.map((href) => {
    const hit = hits.find((item) => item.href.split('?')[0] === href.split('?')[0]);
    return { title: hit?.title || href, href };
  });
}

/**
 * Answers a chatbot question from predefined Q&A, then Sitecore Search dummy index.
 */
export function answerChat(query: string): ChatAnswer {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      text: 'Ask about Clearing, courses, accommodation, or how to apply — I search University content to answer.',
      sources: [],
    };
  }

  const knowledge = KNOWLEDGE.find((entry) => entry.match.test(trimmed));
  const searchHits = filterSearchHits(trimmed, 'everything');

  if (knowledge) {
    const extra = sourcesFromHits(searchHits).filter(
      (source) => !knowledge.sourceHrefs.some((href) => source.href.startsWith(href.split('?')[0]))
    );
    return {
      text: knowledge.text,
      sources: [...sourcesFromHrefs(knowledge.sourceHrefs), ...extra].slice(0, 4),
    };
  }

  if (searchHits.length > 0) {
    const lines = searchHits
      .slice(0, 3)
      .map((hit) => `• ${hit.title} — ${hit.blurb}`)
      .join('\n');
    return {
      text: `I found these results in University search:\n\n${lines}`,
      sources: sourcesFromHits(searchHits),
    };
  }

  return {
    text: 'I could not find a matching page. Try Clearing, Computer Science, Business and Management, accommodation, or how to apply.',
    sources: [
      { title: 'Search', href: `/search?q=${encodeURIComponent(trimmed)}` },
      { title: 'Clearing 2026', href: '/clearing' },
    ],
  };
}
