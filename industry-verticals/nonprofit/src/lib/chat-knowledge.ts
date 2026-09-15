export type ChatSource = { title: string; href: string };

type Rule = { match: RegExp; text: string; sources?: ChatSource[] };

const RULES: Rule[] = [
  {
    match: /energy|bill|heating|meter|warm/i,
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
    match: /northgate|jordan|leeds/i,
    text: 'Northgate Community Hub in Leeds (LS7) is the named local partner in this demo — the Dawn Allen equivalent. Jordan Hale is hub manager. Energy, rent and food in one room.',
    sources: [{ title: 'Northgate Community Hub', href: '/partners/northgate-community-hub' }],
  },
  {
    match: /donate|gift|match/i,
    text: 'Winter gifts are matched until 21 December. Choose £15, £30, £75 or £150 on /donate. Emergency appeal is a site takeover via ?appeal=emergency.',
    sources: [
      { title: 'Donate', href: '/donate' },
      { title: 'Winter appeal', href: '/appeals/winter' },
    ],
  },
  {
    match: /scrunch|axp|aeo|citat/i,
    text: 'Scrunch is configured for UK crisis topics, not a US default set. The AEO page is Help with energy bills — no photography. AXP at ?axp=1 serves crawlers the same facts as structured text.',
    sources: [
      { title: 'Scrunch', href: '/scrunch' },
      { title: 'Energy bills (AEO)', href: '/get-help/help-with-energy-bills' },
    ],
  },
  {
    match: /storyboard|three.?act|demo/i,
    text: 'Three acts: (1) ChatGPT cites energy advice + Scrunch ~25%. (2) Northgate, Maria, Mini CMS, winter/emergency appeals ~50%. (3) Fundraise A/B, search toggle, AXP, email ~25%.',
    sources: [{ title: 'Storyboard', href: '/storyboard' }],
  },
];

export const answerChat = (query: string): { text: string; sources: ChatSource[] } => {
  const rule = RULES.find((item) => item.match.test(query));
  if (rule) {
    return { text: rule.text, sources: rule.sources || [] };
  }
  return {
    text: 'Ask about energy bills, rent, food parcels, Northgate, donating, Scrunch, or the storyboard. I stay on this Openhand demo.',
    sources: [
      { title: 'Get help', href: '/get-help' },
      { title: 'Storyboard', href: '/storyboard' },
    ],
  };
};

export const CHAT_PROMPTS = [
  'Help with energy bills',
  'Who is Northgate?',
  'How does the winter match work?',
  'What is Scrunch for this charity?',
];
