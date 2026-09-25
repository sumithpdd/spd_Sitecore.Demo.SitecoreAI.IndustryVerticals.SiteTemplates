import { STORY } from '@/lib/asos-journey';
import { filterSearchHits, type SearchHit } from '@/lib/asos-search';

export type ChatSource = { title: string; href: string };

const ANSWERS: { test: RegExp; text: string; href: string }[] = [
  {
    test: /new in|new10|27108/i,
    text: `Women's New In is the promo landing. Code NEW10 is on the yellow bar. Open ${STORY.newInHref}.`,
    href: STORY.newInHref,
  },
  {
    test: /petite|denim|88016/i,
    text: 'Petite denim is the body-fit edit. Facets stay on the listing, then the story moves to Topshop Belle Paris.',
    href: STORY.petiteHref,
  },
  {
    test: /belle|topshop|200415553|cami/i,
    text: 'Belle Paris is the complete PDP: Buy the look and People also bought sit under the size picker.',
    href: STORY.heroHref,
  },
  {
    test: /weekday|pyjama|211674477|flannel/i,
    text: 'The Weekday flannel pyjama bottoms use the same complete PDP as Belle Paris.',
    href: STORY.weekdayHref,
  },
  {
    test: /my edit|saved|curation|insight/i,
    text: 'Saves land in My Edit. Curation insight is the editor view of what Maya kept.',
    href: STORY.myEditHref,
  },
];

export function answerChat(query: string): { text: string; sources: ChatSource[] } {
  const hit = ANSWERS.find((item) => item.test.test(query));
  const sources: SearchHit[] = filterSearchHits(query).slice(0, 3);
  if (hit) {
    return {
      text: hit.text,
      sources: [
        { title: 'Open', href: hit.href },
        ...sources.map((item) => ({ title: item.title, href: item.href })),
      ],
    };
  }
  if (sources.length) {
    return {
      text: `I matched “${query.trim()}” in the ASOS catalogue. The story still runs New In → petite denim → Belle Paris.`,
      sources: sources.map((item) => ({ title: item.title, href: item.href })),
    };
  }
  return {
    text: 'Ask about New In, petite denim, Belle Paris, the Weekday pyjamas, or My Edit.',
    sources: [{ title: 'Women', href: STORY.womenHref }],
  };
}

export function suggestedPrompts(): string[] {
  return ['New in', 'Petite denim', 'Belle Paris', 'Weekday pyjamas', 'My Edit'];
}
