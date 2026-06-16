export type LyveraFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const LYVERA_FAQ_HEADING = 'FAQs';

/** Default FAQ copy for the Lyvera corporate homepage (matches lyveragroup.com). */
export const LYVERA_FAQ_ITEMS: LyveraFaqItem[] = [
  {
    id: 'faq-1',
    question: 'Why are we changing the brand now?',
    answer:
      'The creation of Lyvera unites all Levy sports and entertainment businesses under one strong, cohesive brand. This strengthens our market presence, supports greater investment in marketing and innovation, and removes previous trademark barriers that limited expansion in certain regions. It also enables us to bring our full range of services to new markets, giving clients seamless access to the breadth of Lyvera’s expertise.',
  },
  {
    id: 'faq-2',
    question: 'Will this change affect my experience as a customer?',
    answer:
      'Your day-to-day experience will remain familiar. The same specialist teams, contacts and service standards continue — now supported by a clearer, unified Lyvera brand and broader group capabilities.',
  },
  {
    id: 'faq-3',
    question: 'Will all existing businesses be rebranded as Lyvera?',
    answer:
      'Our specialist brands retain their own identities where they matter most to customers. Lyvera is the group brand that brings those businesses together under one portfolio.',
  },
  {
    id: 'faq-4',
    question: 'What does the Lyvera brand mean for our existing client contracts?',
    answer:
      'Existing contracts and commitments are honoured. The rebrand does not change the legal entities you work with or the terms of your agreements.',
  },
  {
    id: 'faq-5',
    question: 'Where will Lyvera be based?',
    answer:
      'Lyvera operates across the UK and internationally, with teams supporting clients in venue sourcing, hospitality, sports travel and live experiences.',
  },
];
