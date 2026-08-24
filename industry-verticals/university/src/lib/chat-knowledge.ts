import { filterSearchHits, type SearchHit } from 'lib/search-index';

export type ChatSource = { title: string; href: string };

export type ChatAnswer = {
  text: string;
  sources: ChatSource[];
};

export const SUGGESTED_PROMPTS = [
  'How does Clearing Fast Track work?',
  'What courses are still in Clearing?',
  'Tell me about Computer Science and AI',
  'Is there accommodation for Clearing students?',
  'What is We Are Essex?',
];

type KnowledgeEntry = {
  match: RegExp;
  text: string;
  sourceHrefs: string[];
};

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    match: /fast track|before results|apply now.*clearing|don't wait/i,
    text: 'Clearing Fast Track lets you complete most of your Essex application before A-level results. Apply with or without grades. On results morning (13 August) Essex can send an offer as soon as UCAS updates. Call 01206 873666 (8am–8pm in peak week) or apply online.',
    sourceHrefs: ['/clearing', '/clearing/how-to-apply'],
  },
  {
    match: /clearing.*(course|available|place)|courses?.*(clearing|available)|still in clearing/i,
    text: 'Yes — places are still available through Clearing 2026, including Computer Science and Artificial Intelligence. Call 01206 873666 or start a Fast Track application online. Even if your grades are lower than expected, Essex may still be able to help.',
    sourceHrefs: ['/clearing', '/courses/computer-science-and-ai'],
  },
  {
    match: /computer science|cs\s*&?\s*ai|artificial intelligence/i,
    text: 'Computer Science and Artificial Intelligence is a BSc at Colchester. It is available through Clearing Fast Track, with modules in programming, machine learning, and intelligent systems.',
    sourceHrefs: ['/courses/computer-science-and-ai', '/clearing'],
  },
  {
    match: /how (do i |to )?apply|make (an |my )?application|ucas|enquire/i,
    text: 'Register Fast Track on Get Clearing ready. Advisors already see your course interest in Dynamics on results morning. You can also call 01206 873666. Open Day is Saturday 15 August, 10am–2pm.',
    sourceHrefs: ['/clearing/how-to-apply', '/clearing'],
  },
  {
    match: /accommodation|halls|ensuite|room/i,
    text: 'Essex guarantees on-campus accommodation throughout your studies. Clearing applicants can explore halls from the accommodation page. Colchester has a walkable train station and on-campus parking.',
    sourceHrefs: ['/accommodation'],
  },
  {
    match: /business|management|essex business/i,
    text: 'Business and Management is taught at Essex Business School on the Colchester campus. Undergraduate options include Business Management, Marketing, Accounting, and Finance — with placement and study-abroad routes.',
    sourceHrefs: ['/courses/business-and-management'],
  },
  {
    match: /we are essex|manifesto|alumni|where change/i,
    text: 'We Are Essex is the university manifesto: where change happens, university your way, rebels with a cause. Essex is 12th in the Guardian University Guide 2026. Read the manifesto, then use Fast Track when you are ready to apply.',
    sourceHrefs: ['/about/manifesto', '/?utm_campaign=we-are-essex'],
  },
  {
    match: /student life|campus|colchester|loughton|union|study and life/i,
    text: 'Campus life centres on Colchester’s lake campus and squares, plus Loughton. Essex SU, sport, and a global community from 140+ nationalities. Open Days and visiting information are on Study and life.',
    sourceHrefs: ['/study-and-life'],
  },
  {
    match: /parent|supporter/i,
    text: 'Parents and supporters can join Clearing conversations with the applicant’s permission. Essex keeps Fast Track context so results-day calls are not cold. See the Clearing hub for supporter guidance.',
    sourceHrefs: ['/clearing'],
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
      text: 'Ask about Clearing Fast Track, courses, Colchester campus, or We Are Essex — I search University of Essex content.',
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
      text: `I found these results in Essex search:\n\n${lines}`,
      sources: sourcesFromHits(searchHits),
    };
  }

  return {
    text: 'I could not find a matching page. Try Fast Track, Computer Science, Business and Management, accommodation, or We Are Essex.',
    sources: [
      { title: 'Search', href: `/search?q=${encodeURIComponent(trimmed)}` },
      { title: 'Clearing Fast Track', href: '/clearing' },
    ],
  };
}
