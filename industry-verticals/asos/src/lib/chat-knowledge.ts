import { STORY } from '@/lib/asos-journey';
import { filterSearchHits, type SearchHit } from '@/lib/asos-search';

export type ChatSource = { title: string; href: string };

const ANSWERS: { test: RegExp; text: string; href: string }[] = [
  {
    test: /wide|£50|under 50|berlin|jean/i,
    text: `Wide-leg jeans under £50 are on the denim edit. The mid-wash jean is UK 8 — one size, not three — and the chocolate knit and Chelsea boot save into ${STORY.editName}.`,
    href: STORY.denimDropHref,
  },
  {
    test: /new in|new10|27108/i,
    text: `Women's New In is the promo landing. The denim edit is ${STORY.denimDropHref}.`,
    href: STORY.newInHref,
  },
  {
    test: /petite|denim|fit|return/i,
    text: 'Filter the denim edit by body fit. The product page shows model height, size worn, and fabric so she keeps it.',
    href: STORY.heroHref,
  },
  {
    test: /my edit|saved|curation|insight|heart/i,
    text: `Heart the jean, the knit, and the boot into ${STORY.editName}. Curation insight is what she kept.`,
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
      text: `I matched “${query.trim()}” in the catalogue. The denim edit is wide-leg jeans under £50.`,
      sources: sources.map((item) => ({ title: item.title, href: item.href })),
    };
  }
  return {
    text: `Ask for wide-leg jeans under £50. The denim edit, ${STORY.editName}, and the mid-wash jean are in the catalogue.`,
    sources: [{ title: 'Women', href: STORY.womenHref }],
  };
}

export function suggestedPrompts(): string[] {
  return ['Wide-leg jeans under £50', 'Body fit', 'Berlin, October', 'One size', 'My Edit'];
}
