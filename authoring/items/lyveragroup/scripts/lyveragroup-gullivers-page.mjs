const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

/** FAQ items for the Gullivers Sports Travel brand page. */
export const GULLIVERS_FAQ_ITEMS = [
  {
    dsKey: 'gsFaqItem1',
    dsName: 'GS FAQ Differentiator',
    question: 'What makes Gullivers Sports Travel different from other sports travel providers?',
    answer:
      "<p>At Gullivers Sports Travel we are the UK's leading and longest established sports tour operator, with over 50 years in the game. We are destination experts and have a dedicated sales team who will guide you through your bespoke requirements to ensure that you have the trip of a lifetime. For many major sporting events we are the officially appointed travel operator, guaranteeing you official tickets and an elevated experience. As members of ABTA, IATA and ATOL you can travel with complete confidence and peace of mind.</p>",
  },
  {
    dsKey: 'gsFaqItem2',
    dsName: 'GS FAQ How To Book',
    question: 'How do I book with Gullivers Sports Travel?',
    answer:
      '<p>Visit <a href="https://www.gulliverssportstravel.co.uk/">gulliverssportstravel.co.uk</a> to browse upcoming events, compare packages and check availability. Our team can also support bespoke requirements — contact us for tailored options.</p>',
  },
  {
    dsKey: 'gsFaqItem3',
    dsName: 'GS FAQ Sports Coverage',
    question: 'Is it just rugby, cricket and F1 packages that you offer?',
    answer:
      '<p>No — while rugby, cricket and Formula 1 are among our most popular programmes, we offer official travel packages to a wide range of major sporting events across the globe, from football and tennis to athletics and more.</p>',
  },
  {
    dsKey: 'gsFaqItem4',
    dsName: 'GS FAQ Refunds',
    question: 'The event has been postponed/cancelled – am I entitled to a refund?',
    answer:
      '<p>If an event is postponed or cancelled, our team will contact you with the options available under your booking terms. As ABTA, IATA and ATOL members, we follow industry guidance to protect your travel arrangements.</p>',
  },
];

export const GULLIVERS_SLIDES = [
  {
    dsKey: 'gsSlide1',
    dsName: 'GS Slide Formula 1',
    alt: 'Formula 1 race action',
    src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
  },
  {
    dsKey: 'gsSlide2',
    dsName: 'GS Slide Cricket',
    alt: 'Cricket fans at a match',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
  },
  {
    dsKey: 'gsSlide3',
    dsName: 'GS Slide Rugby Crowd',
    alt: 'Rugby supporters in the stands',
    src: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
  },
  {
    dsKey: 'gsSlide4',
    dsName: 'GS Slide Horse Racing',
    alt: 'Horse racing event',
    src: `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`,
  },
  {
    dsKey: 'gsSlide5',
    dsName: 'GS Slide Stadium',
    alt: 'Stadium atmosphere at night',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
  },
  {
    dsKey: 'gsSlide6',
    dsName: 'GS Slide Outdoor Event',
    alt: 'Guests at an outdoor sporting event',
    src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
  },
];

/** Page layout sections for /brands/gullivers-sports-travel (component-driven). */
export function buildGulliversPageSections() {
  return [
    {
      uid: 'b70100d2-0001-4000-8000-000000000002',
      rendering: 'Banner',
      ds: 'gsHero',
      variant: 'LyveraBanner/BrandHero',
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000001',
      rendering: 'PageSectionNav',
      ds: 'gsPageNav',
      variant: 'LyveraPageSectionNav/Default',
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000002',
      rendering: 'PagePromo',
      ds: 'gsPromo',
      variant: 'Promo/Default',
      styles: 'promo-reversed|promo-bg-teal',
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000003',
      rendering: 'MultiPromoImageSlider',
      ds: 'gsMultiPromo',
      variant: 'LyveraMultiPromoImageSlider/Default',
      renderingIdentifier: 'first',
      childPlaceholder: 'lyvera-multi-promo-slides-1',
      children: GULLIVERS_SLIDES.map((slide, index) => ({
        uid: `b70100e5-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'MultiPromoSlide',
        ds: slide.dsKey,
        variant: 'LyveraMultiPromoSlide/Default',
      })),
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000004',
      rendering: 'Banner',
      ds: 'gsSplitBanner',
      variant: 'LyveraBanner/SplitBand',
      styles: 'lyvera-banner-bg-teal',
      renderingIdentifier: 'second',
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000005',
      rendering: 'Banner',
      ds: 'gsCtaBanner',
      variant: 'LyveraBanner/WithCta',
    },
    {
      uid: 'b70100e4-0001-4000-8000-000000000006',
      rendering: 'FAQ',
      ds: 'gsFaq',
      variant: 'LyveraFAQ/Default',
      renderingIdentifier: 'third',
      childPlaceholder: 'lyvera-faq-items-1',
      children: GULLIVERS_FAQ_ITEMS.map((item, index) => ({
        uid: `b70100e6-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'FAQItem',
        ds: item.dsKey,
        variant: 'LyveraFAQItem/Default',
      })),
    },
  ];
}

/** Supplemental datasource items for the Gullivers Sports Travel brand page. */
export function buildGulliversDsItems(ids) {
  const logoHtml =
    '<p><img src="/images/brands/gullivers-sports-travel.png" alt="Gullivers Sports Travel" width="180" /></p>';

  return [
    [
      ids.ds.gsHero,
      'GS Brand Hero',
      'LyveraBanner',
      {
        Title: 'Gullivers Sports Travel – part of Lyvera Group',
        BackgroundImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
          alt: 'Formula 1 race action',
        },
      },
    ],
    [
      ids.ds.gsPageNav,
      'GS Page Section Nav',
      'LyveraPageSectionNav',
      {
        LinkOne: '<link text="Events" linktype="internal" url="#first" />',
        LinkTwo: '<link text="Why Gullivers" linktype="internal" url="#second" />',
        LinkThree: '<link text="FAQs" linktype="internal" url="#third" />',
        CtaLink:
          '<link text="Visit Gullivers Sports Travel" linktype="external" url="https://gulliverstravel.co.uk/content/introducing-gullivers-sports-travel/" />',
      },
    ],
    [
      ids.ds.gsPromo,
      'GS Intro Promo',
      'Promo',
      {
        PromoTitle: 'Over 50 years of sports travel expertise',
        PromoDescription: `${logoHtml}<p>For over half a century, Gullivers Sports Travel, part of Lyvera Group, has been igniting the passion of sports fans with extraordinary travel experiences to the world's greatest events. As pioneers of sports travel and destination experts, they've spent more than 50 years delivering unrivalled itineraries and have a legacy of taking fans to major events across the globe, offering once in a lifetime experiences.</p>`,
        PromoImageOne: {
          src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
          alt: 'Sports fans celebrating together',
        },
        PromoMoreInfo:
          '<link text="Find out more" linktype="external" url="https://www.gulliverssportstravel.co.uk/" />',
      },
    ],
    [
      ids.ds.gsMultiPromo,
      'GS Official Events Slider',
      'LyveraMultiPromoImageSlider',
      {
        Title: "Official travel to the world's greatest events",
        Description:
          "<p>From the electric atmosphere of the Six Nations to the roar of Formula 1 circuits, from the historic intensity of The Ashes to the global spectacle of the Men's Rugby World Cup, Gullivers Sports Travel has become synonymous with world-class sporting experiences. Their international reputation is strengthened by official partnerships with some of the most iconic sporting events, giving travellers privileged access and peace of mind.</p>",
      },
    ],
    [
      ids.ds.gsSplitBanner,
      'GS Guided Banner',
      'LyveraBanner',
      {
        Title: 'Expertly guided, authentically delivered',
        Description:
          '<p>Partnerships with tourism boards open the door to handpicked excursions and authentic cultural adventures, all led by seasoned tour managers who bring each destination to life. With guaranteed tickets, insider knowledge, glowing Trustpilot reviews and a loyal community of repeat travellers, Gullivers Sports Travel delivers the thrill, the emotion, and the unforgettable stories that only live sport can offer.</p>',
      },
    ],
    [
      ids.ds.gsCtaBanner,
      'GS Travel With Confidence Banner',
      'LyveraBanner',
      {
        Title: 'Travel with confidence',
        Description:
          "<p>Every meticulously designed package blend bucketlist moments with seamless travel, appealing not only to diehard fans but also to those who crave experiences beyond the stadium. And with ABTA, IATA and ATOL protection, you can travel with complete confidence.</p><p>With Gullivers Sports Travel, you don't just witness history - you experience it - live!</p>",
        BackgroundImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
          alt: 'Rugby stadium with fireworks',
        },
        CtaLink:
          '<link text="Find out more" linktype="external" url="https://www.gulliverssportstravel.co.uk/" />',
      },
    ],
    [ids.ds.gsFaq, 'GS FAQs', 'LyveraFAQ', { Heading: 'FAQs' }],
    ...GULLIVERS_FAQ_ITEMS.map((item) => [
      ids.ds[item.dsKey],
      item.dsName,
      'LyveraFAQItem',
      { Question: item.question, Answer: item.answer },
    ]),
    ...GULLIVERS_SLIDES.map((slide) => [
      ids.ds[slide.dsKey],
      slide.dsName,
      'LyveraMultiPromoSlide',
      {
        Image: { src: slide.src, alt: slide.alt },
        AltText: slide.alt,
      },
    ]),
  ];
}
