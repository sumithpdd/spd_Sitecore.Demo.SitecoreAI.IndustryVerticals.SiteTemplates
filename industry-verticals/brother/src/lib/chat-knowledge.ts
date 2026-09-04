import { filterSearchHits, type SearchHit } from 'lib/search-index';
import type { BrotherIntent } from 'lib/brother-intent';

export type ChatSource = { title: string; href: string };

export type ChatAnswer = {
  text: string;
  sources: ChatSource[];
};

/** Default chips — full storyboard arcs (Jack → Izzy → Rick). */
export const SUGGESTED_PROMPTS = [
  'Jack: home laser from Google SERP',
  'Izzy: At your side campaign',
  'Izzy: full-colour label printer',
  'Jack: welcome back / return visit',
  'Rick: OrderCloud supplies checkout',
];

/** Intent-aware chips when the visitor is already on a story beat. */
export function suggestedPromptsForIntent(intent: BrotherIntent): string[] {
  switch (intent) {
    case 'home-printer':
      return [
        'Jack: home laser from Google SERP',
        'Which mono laser should Jack shortlist?',
        'Jack: welcome back / return visit',
        'Rick: OrderCloud supplies checkout',
      ];
    case 'label-printer':
      return [
        'Izzy: full-colour label printer',
        'What is the VC-500W?',
        'Desk organisation with labels',
        'Izzy: At your side campaign',
      ];
    case 'at-your-side':
      return [
        'Izzy: At your side campaign',
        'How does the multi-channel pack work?',
        'Jack: home laser from Google SERP',
        'Izzy: full-colour label printer',
      ];
    case 'return-visit':
      return [
        'Jack: welcome back / return visit',
        'Continue Jack’s printer shortlist',
        'Rick: OrderCloud supplies checkout',
        'Ink and toner reminder',
      ];
    case 'supplies':
      return [
        'Rick: OrderCloud supplies checkout',
        'How does attach rate work for Rick?',
        'Reorder TN-243BK toner',
        'DK-22205 label rolls',
      ];
    default:
      return SUGGESTED_PROMPTS;
  }
}

type KnowledgeEntry = {
  match: RegExp;
  text: string;
  sourceHrefs: string[];
};

/**
 * Storyboard knowledge — talk-track for Jack (customer), Izzy (marketing), Rick (merch/CRO).
 * Source links use the same UTM / persona beats as docs/BROTHER.md.
 */
const KNOWLEDGE: KnowledgeEntry[] = [
  // —— Jack · SERP → personalised printers ——
  {
    match:
      /jack|serp|google.*printer|home.?laser|home.?printer|hl-?l2460|mono laser|cold.?search|personalised printers?/i,
    text: 'Jack’s beat: cold Google SERP → personalised printers. Open the printers listing with the home-printer UTM, shortlist colour and mono lasers (HL-L2460DN), then continue to supplies reorder. Identify Jack in the CDP panel to show affinity building.',
    sourceHrefs: [
      '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
      '/devices/printers/hl/hl-l2460dn',
      '/search?q=home+laser+printer',
      '/supplies?utm_campaign=supplies-reorder&persona=jack',
    ],
  },
  {
    match: /return.?visit|welcome back|continue where|product.?interest|consumers/i,
    text: 'Jack return visit: behaviour signals (printer interest + return) resurface the shortlist and an ink reminder. Open home with return-visit UTM, then jump to printers or supplies reorder.',
    sourceHrefs: [
      '/?utm_campaign=return-visit&persona=jack',
      '/printers?utm_campaign=return-visit&persona=jack',
      '/supplies?utm_campaign=supplies-reorder&persona=jack',
    ],
  },

  // —— Izzy · At your side + labelling ——
  {
    match: /at your side|atyourside|multi-?channel|campaign pack|sitecoreai signal|izzy.*campaign/i,
    text: 'Izzy’s beat: SitecoreAI Signal → Content Hub–approved assets → one multi-channel pack (web, email, paid social) without an engineering ticket for routine layout tweaks. Open the At your side landing, then continue into printers or labelling with UTMs.',
    sourceHrefs: [
      '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy',
      '/printers?utm_campaign=at-your-side&persona=jack',
      '/labelling-and-receipts?utm_campaign=at-your-side-social',
    ],
  },
  {
    match: /label.?printer|full.?colour label|vc-?500w|zink|zero ink|izzy.*label/i,
    text: 'Izzy labelling story: the VC-500W full-colour label printer (ZINK Zero Ink — no cartridges). Use the label-printer UTM on home or open the VC-500W PDP and vertical applications for desk organisation / craft / signage.',
    sourceHrefs: [
      '/?utm_campaign=label-printer&persona=izzy',
      '/devices/label-printer/vc/vc500w',
      '/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
      '/labelling-and-receipts',
    ],
  },
  {
    match: /label(ling)?|p-?touch|ql-?800|ql-?820|pt-?p750|td-?4550|receipt printer/i,
    text: 'Labelling catalogue: VC colour, QL desktop, P-touch handheld and TD receipt printers. Browse Labelling and receipts, open a PDP, then attach DK / TZe supplies for Rick’s commerce story.',
    sourceHrefs: ['/labelling-and-receipts', '/supplies', '/devices/label-printer/ql/ql-800'],
  },
  {
    match: /desk|home office|organis|organiz|blog|article|five great|5 great/i,
    text: 'Content Hub–style article: five desk organisation ideas with colour labels — cables, drawers, shelves — powered by the VC-500W. Read the blog, then shop VC-500W or open vertical applications.',
    sourceHrefs: [
      '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
      '/devices/label-printer/vc/vc500w',
      '/labelling-and-receipts/vc-500w/vc-500w-vertical-applications',
    ],
  },

  // —— Rick · OrderCloud / CRO ——
  {
    match:
      /rick|ordercloud|attach.?rate|supplies.?checkout|toner|ink.?reminder|tn-?243|dk-?22205|reorder|checkout/i,
    text: 'Rick’s beat: merchandising + CRO. Genuine supplies stay matched to device PCM metadata — open Supplies with ordercloud UTM, then the OrderCloud checkout demo for attach rate. TN-243BK toner and DK-22205 rolls are in the catalogue.',
    sourceHrefs: [
      '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
      '/checkout/supplies?utm_campaign=ordercloud-checkout&persona=rick',
      '/supplies/toner/tn-243bk',
      '/supplies/labels/dk-22205',
    ],
  },
  {
    match: /business|mps|managed print|workgroup|cro/i,
    text: 'Rick / business: managed print, labelling workflows and workgroup devices on Business solutions — then into printers or OrderCloud supplies for commerce proof.',
    sourceHrefs: [
      '/business-solutions?persona=rick',
      '/printers',
      '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
    ],
  },

  // —— Supporting catalogue ——
  {
    match: /scanner|ads-?1800|ads-?4900|document scan/i,
    text: 'Scanners round out the catalogue for workgroup demos — ADS-1800W and ADS-4900W. Browse Scanners or All devices after the printers / labelling story.',
    sourceHrefs: ['/scanners', '/devices/scanners/ads/ads-1800w', '/devices'],
  },
  {
    match: /cdp|affinity|identify|guest id|persona panel/i,
    text: 'Use the CDP panel (bottom-right) while you walk the story: page views build affinities (Printers, Labelling, Supplies, Campaign). Identify Jack with jack.customer@brother.demo, then browse printers → PDP → supplies to fill the journey stages.',
    sourceHrefs: [
      '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
      '/devices/printers/hl/hl-l2460dn',
      '/supplies?utm_campaign=supplies-reorder&persona=jack',
    ],
  },
  {
    match: /support|driver|manual|help/i,
    text: 'Support holds drivers and manuals. For the demo talk-track, stay on catalogue, campaign, and OrderCloud beats — or search the demo index.',
    sourceHrefs: ['/support', '/search'],
  },
];

function sourcesFromHits(hits: SearchHit[]): ChatSource[] {
  return hits.slice(0, 4).map((hit) => ({ title: hit.title, href: hit.href }));
}

function sourcesFromHrefs(hrefs: string[]): ChatSource[] {
  const hits = filterSearchHits('', 'everything');
  return hrefs.map((href) => {
    const pathOnly = href.split('?')[0];
    const hit = hits.find((item) => item.href.split('?')[0] === pathOnly);
    return { title: hit?.title || pathOnly, href };
  });
}

/**
 * Answers a chatbot question from Brother storyboard Q&A, then the demo search index.
 */
export function answerChat(query: string): ChatAnswer {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      text: 'Ask about Jack’s SERP printers journey, Izzy’s At your side / VC-500W pack, or Rick’s OrderCloud supplies — I search Brother UK demo content.',
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
      text: `I found these results in Brother search:\n\n${lines}\n\nTip: ask about Jack, Izzy, or Rick to jump to the talk-track beats.`,
      sources: sourcesFromHits(searchHits),
    };
  }

  return {
    text: 'I could not find a matching page. Try Jack’s home laser SERP, Izzy’s At your side / VC-500W, or Rick’s OrderCloud supplies.',
    sources: [
      { title: 'Search', href: `/search?q=${encodeURIComponent(trimmed)}` },
      {
        title: 'Jack · printers',
        href: '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
      },
      {
        title: 'Izzy · campaign',
        href: '/campaigns/at-your-side?utm_campaign=at-your-side&persona=izzy',
      },
      {
        title: 'Rick · supplies',
        href: '/supplies?utm_campaign=ordercloud-supplies&persona=rick',
      },
    ],
  };
}
