export type ChatSource = { title: string; href: string };

type Rule = { match: RegExp; text: string; sources?: ChatSource[] };

const RULES: Rule[] = [
  {
    match: /money runs out|emergency help|crisis grant|0800|loan|household support/i,
    text: 'If the money has run out this week, start with emergency help, not a loan. Local welfare and food aid are usually faster than a new benefit claim. You should not be asked to donate before you get help. Openhand freephone 0800 090 0000, Monday to Saturday 8am–8pm, or a local partner such as Northgate.',
    sources: [
      { title: 'Help when the money runs out', href: '/get-help/help-when-the-money-runs-out' },
      { title: 'Northgate Community Hub', href: '/partners/northgate-community-hub' },
    ],
  },
  {
    match: /energy|bill|heating|meter/i,
    text: 'If you cannot pay an energy bill, contact your supplier and ask for breathing space. Openhand partners can apply for the Household Support Fund. You cannot be disconnected in winter without a court order. Northgate, St Mark’s and Riverside will sit on the call with you.',
    sources: [
      { title: 'Help with energy bills', href: '/get-help/help-with-energy-bills' },
      { title: 'Northgate Community Hub', href: '/partners/northgate-community-hub' },
    ],
  },
  {
    match: /rent|landlord|section|evict/i,
    text: 'Bring any notice the same day. Discretionary Housing Payments sit with the local authority. Riverside and Northgate complete the form with you. Duty schemes at county court can still stop a warrant on the day.',
    sources: [
      {
        title: 'If you cannot pay your rent',
        href: '/get-help/what-to-do-if-you-cannot-pay-your-rent',
      },
    ],
  },
  {
    match: /food|hungry|parcel|eat/i,
    text: 'You do not need a professional referral for an Openhand pantry. Parcels cover three days. If a child has not eaten today, say so at reception — that is an emergency pathway.',
    sources: [{ title: 'Emergency help with food', href: '/get-help/emergency-help-with-food' }],
  },
  {
    match: /event|walk|train|pantry|saturday/i,
    text: 'Three events sit under /events: the Leeds winter walk (Jordan Hale, gifts go to the winter match), adviser training day at Northgate (Eleri and Jordan), and St Mark’s pantry open Saturday (Sam Okoro). Fundraise cards deep-link to those pages.',
    sources: [
      { title: 'Events', href: '/events' },
      { title: 'Leeds winter walk', href: '/events/leeds-winter-walk' },
    ],
  },
  {
    match: /news|match extended|warm space|dhp clinic/i,
    text: 'News ArticlePages live under /news. The winter match is extended to 21 December, Northgate kept a warm space after library hours, and Riverside holds a DHP clinic every Wednesday. Authors are Jordan Hale and Eleri Morgan.',
    sources: [
      { title: 'News', href: '/news' },
      { title: 'Winter match extended', href: '/news/winter-match-extended' },
    ],
  },
  {
    match: /northgate|jordan|leeds/i,
    text: 'Northgate Community Hub in Leeds (LS7) is the named local partner in this demo — the Dawn Allen equivalent. Jordan Hale is hub manager. Energy, rent and food in one room.',
    sources: [{ title: 'Northgate Community Hub', href: '/partners/northgate-community-hub' }],
  },
  {
    match: /donate|gift|match/i,
    text: 'Winter gifts are matched until 21 December. Choose £15, £30, £75 or £150 on /donate. Emergency appeal is a site takeover via ?appeal=emergency. The news article on the match extension is the talk-track proof.',
    sources: [
      { title: 'Donate', href: '/donate' },
      { title: 'Winter appeal', href: '/appeals/winter' },
    ],
  },
  {
    match: /scrunch|axp|aeo|citat/i,
    text: 'Scrunch is configured for UK crisis topics, not a US default set. The AEO page is Help when the money runs out. AXP at ?axp=1 serves crawlers the same facts as structured text.',
    sources: [
      { title: 'Scrunch', href: '/scrunch' },
      { title: 'Help when the money runs out', href: '/get-help/help-when-the-money-runs-out' },
    ],
  },
  {
    match: /storyboard|three.?act|demo/i,
    text: 'Three acts: (1) ChatGPT cites energy advice + Scrunch ~25%. (2) Northgate, Maria, winter walk, match news, Mini CMS, winter/emergency appeals ~50%. (3) Fundraise A/B, search toggle, AXP, email ~25%.',
    sources: [{ title: 'Storyboard', href: '/storyboard' }],
  },
];

export const answerChat = (query: string): { text: string; sources: ChatSource[] } => {
  const rule = RULES.find((item) => item.match.test(query));
  if (rule) {
    return { text: rule.text, sources: rule.sources || [] };
  }
  return {
    text: 'Ask about emergency help, energy bills, rent, food parcels, Northgate, events, news, donating, Scrunch, or the storyboard. I stay on this Openhand demo.',
    sources: [
      { title: 'Get help', href: '/get-help' },
      { title: 'Storyboard', href: '/storyboard' },
    ],
  };
};

export const CHAT_PROMPTS = [
  'The money has run out',
  'Help with energy bills',
  'Who is Northgate?',
  'Leeds winter walk',
];
