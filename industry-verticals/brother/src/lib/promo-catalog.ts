/**
 * Brother homepage promo grid — default + persona variants for personalization demos.
 */
import type { BrotherImageKey } from './demo-images';
import type { BrotherIntent } from './brother-intent';

export type BrotherPromoCard = {
  heading: string;
  description: string;
  imageKey: BrotherImageKey;
  ctaLabel: string;
  ctaHref: string;
};

export type BrotherPromoGrid = {
  id: string;
  title?: string;
  cards: [BrotherPromoCard, BrotherPromoCard, BrotherPromoCard];
};

/** Matches brother.co.uk-style home promo strip (register / business / sustainability). */
export const PROMO_GRID_DEFAULT: BrotherPromoGrid = {
  id: 'home-default',
  cards: [
    {
      heading: 'Register your product',
      description: 'Join the club. Register your Brother product and reap the rewards.',
      imageKey: 'suppliesHero',
      ctaLabel: 'Register your product',
      ctaHref: '/support?utm_content=register-product',
    },
    {
      heading: 'Business Solutions',
      description:
        'Deliver greater efficiency, productivity and mobility, as well as increased cost control and security.',
      imageKey: 'vc500wLaptop',
      ctaLabel: 'Explore Business Solutions',
      ctaHref: '/business-solutions',
    },
    {
      heading: 'Sustainability at Brother',
      description:
        'Learn more about our approach to sustainability and how we minimise our environmental impact.',
      imageKey: 'sustainability',
      ctaLabel: 'Sustainability at Brother',
      ctaHref: '/business-solutions?utm_content=sustainability',
    },
  ],
};

/** Jack — home-printer SERP: printers, labelling tip, supplies attach. */
export const PROMO_GRID_JACK: BrotherPromoGrid = {
  id: 'home-jack',
  title: 'Picked for your home office',
  cards: [
    {
      heading: 'Home laser printers',
      description: 'Colour and mono lasers sized for hybrid desks — start with Jack’s shortlist.',
      imageKey: 'printerHero',
      ctaLabel: 'Browse printers',
      ctaHref: '/printers?utm_campaign=home-printer&utm_source=google&persona=jack',
    },
    {
      heading: 'Organise with colour labels',
      description: 'Colour-code drawers, cables and shelves with the VC-500W — no ink cartridges.',
      imageKey: 'vc500wColour',
      ctaLabel: 'See VC-500W',
      ctaHref: '/devices/label-printer/vc/vc500w?persona=jack',
    },
    {
      heading: 'Never run out of toner',
      description: 'Genuine TN-243BK matched to your laser — OrderCloud reorder in one click.',
      imageKey: 'suppliesHero',
      ctaLabel: 'Open supplies',
      ctaHref: '/supplies?utm_campaign=supplies-reorder&persona=jack',
    },
  ],
};

/** Izzy — At your side campaign pack. */
export const PROMO_GRID_IZZY: BrotherPromoGrid = {
  id: 'home-izzy',
  title: 'At your side — multi-channel pack',
  cards: [
    {
      heading: 'Campaign landing',
      description: 'One SitecoreAI brief → web, email and paid social with Content Hub approvals.',
      imageKey: 'campaignAtYourSide',
      ctaLabel: 'Open campaign',
      ctaHref: '/campaigns/at-your-side?utm_campaign=at-your-side&utm_source=facebook&persona=izzy',
    },
    {
      heading: 'Full-colour labels',
      description: 'Tell the ZINK Zero Ink story across every channel with the same DAM assets.',
      imageKey: 'vc500wColour',
      ctaLabel: 'Labelling story',
      ctaHref: '/labelling-and-receipts?persona=izzy',
    },
    {
      heading: 'Desk organisation blog',
      description:
        'Inspiration content that drives VC-500W consideration from home-office audiences.',
      imageKey: 'articleHero',
      ctaLabel: 'Read the article',
      ctaHref:
        '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    },
  ],
};

/** Abandoned cart / OrderCloud — event supplies attach. */
export const PROMO_GRID_RICK: BrotherPromoGrid = {
  id: 'home-rick',
  title: 'Finish the event order',
  cards: [
    {
      heading: 'Return to checkout',
      description: 'The VC-500W is waiting in the cart — complete the order when you are ready.',
      imageKey: 'homeHero',
      ctaLabel: 'Open checkout',
      ctaHref: '/checkout/supplies?utm_campaign=ordercloud-checkout',
    },
    {
      heading: 'CZ-1003 colour rolls',
      description: 'Enough full-colour media for attendee badges, lanyards and table signs.',
      imageKey: 'vc500wColour',
      ctaLabel: 'View CZ-1003',
      ctaHref: '/supplies/label-printers/labels/cz/cz1003',
    },
    {
      heading: 'Desk organisation ideas',
      description: 'The same colour labels that tidy a home office work on an event desk too.',
      imageKey: 'articleHero',
      ctaLabel: 'Read the article',
      ctaHref:
        '/brother-for-home/blog/your-home-office/2024/5-great-ideas-for-organising-your-desk-and-home-office',
    },
  ],
};

/** Post-purchase / login — MPS upsell. */
export const PROMO_GRID_MPS: BrotherPromoGrid = {
  id: 'home-mps',
  title: 'Print without the complexity',
  cards: [
    {
      heading: 'Managed Print Services',
      description:
        'Reduce the cost and complexity of business printing with a plan built around your fleet.',
      imageKey: 'mpsBanner',
      ctaLabel: 'Find out more',
      ctaHref: '/business-solutions/managed-print-service?utm_campaign=managed-print-service',
    },
    {
      heading: 'MPS Essential',
      description: 'The entry plan — predictable supplies, support and device care.',
      imageKey: 'vc500wLaptop',
      ctaLabel: 'Choose Essential',
      ctaHref: '/business-solutions/managed-print-service/mps-essential',
    },
    {
      heading: 'Sustainability at Brother',
      description: 'How we minimise environmental impact across devices, supplies and take-back.',
      imageKey: 'sustainability',
      ctaLabel: 'Our approach',
      ctaHref: '/business-solutions?utm_content=sustainability',
    },
  ],
};

export function promoGridForIntent(intent: BrotherIntent): BrotherPromoGrid {
  switch (intent) {
    case 'home-printer':
      return PROMO_GRID_JACK;
    case 'at-your-side':
    case 'label-printer':
      return PROMO_GRID_IZZY;
    case 'supplies':
    case 'return-visit':
      return PROMO_GRID_RICK;
    case 'mps':
      return PROMO_GRID_MPS;
    default:
      return PROMO_GRID_DEFAULT;
  }
}
