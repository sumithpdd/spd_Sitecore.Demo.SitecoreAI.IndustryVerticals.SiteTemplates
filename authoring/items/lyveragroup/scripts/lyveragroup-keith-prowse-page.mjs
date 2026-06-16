const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

/** FAQ items for the Keith Prowse brand page. */
export const KEITH_PROWSE_FAQ_ITEMS = [
  {
    dsKey: 'kpFaqItem1',
    dsName: 'KP FAQ Whats Included',
    question: "What's included in a Keith Prowse experience?",
    answer: `<p>Every Keith Prowse experience is designed to deliver premium hospitality from arrival to departure. While packages vary by event, guests can typically expect:</p>
<p><strong>Food</strong> – exceptional dining tailored to the occasion, from fine dining to relaxed hospitality menus.</p>
<p><strong>Drink</strong> – a curated selection of wines, beers and soft drinks throughout your visit.</p>
<p><strong>Entertainment</strong> – live music, guest speakers or themed activations where applicable.</p>
<p><strong>Exclusive spaces</strong> – access to private suites, lounges or premium viewing areas.</p>
<p><strong>Dedicated to you</strong> – attentive service from our experienced hospitality teams.</p>
<p><strong>Tickets</strong> – official event admission included as part of your package.</p>`,
  },
  {
    dsKey: 'kpFaqItem2',
    dsName: 'KP FAQ How To Book',
    question: 'How do I book experiences with Keith Prowse?',
    answer:
      '<p>Visit <a href="https://www.keithprowse.co.uk/">keithprowse.co.uk</a> to browse upcoming events, compare packages and check availability. Our team can also support corporate bookings and bespoke hospitality requirements — contact us for tailored options.</p>',
  },
  {
    dsKey: 'kpFaqItem3',
    dsName: 'KP FAQ Cost',
    question: 'How much does a Keith Prowse experience cost?',
    answer:
      '<p>Package prices vary depending on the event, venue and level of hospitality. Browse individual event pages on our website for current pricing, or speak to our team for corporate and group enquiries.</p>',
  },
];

export const KEITH_PROWSE_SLIDES = [
  {
    dsKey: 'kpSlide1',
    dsName: 'KP Slide Stadium Cheers',
    alt: 'Guests cheering at a live event',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
  },
  {
    dsKey: 'kpSlide2',
    dsName: 'KP Slide Night Stadium',
    alt: 'Stadium at night',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
  },
  {
    dsKey: 'kpSlide3',
    dsName: 'KP Slide Hospitality Dining',
    alt: 'Premium hospitality dining',
    src: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
  },
  {
    dsKey: 'kpSlide4',
    dsName: 'KP Slide Terrace View',
    alt: 'Terrace hospitality view',
    src: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
  },
  {
    dsKey: 'kpSlide5',
    dsName: 'KP Slide Outdoor Crowd',
    alt: 'Guests at an outdoor event',
    src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
  },
  {
    dsKey: 'kpSlide6',
    dsName: 'KP Slide Rugby Fireworks',
    alt: 'Rugby stadium with fireworks',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
  },
];

/** Page layout sections for /brands/keith-prowse (component-driven). */
export function buildKeithProwsePageSections() {
  return [
    {
      uid: 'b70100d2-0001-4000-8000-000000000001',
      rendering: 'Banner',
      ds: 'kpHero',
      variant: 'LyveraBanner/BrandHero',
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000001',
      rendering: 'PagePromo',
      ds: 'kpIntroPromo',
      variant: 'Promo/Default',
      styles: 'accent-coral',
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000002',
      rendering: 'PagePromo',
      ds: 'kpReversedPromo',
      variant: 'Promo/Default',
      styles: 'promo-reversed|promo-bg-teal',
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000003',
      rendering: 'MultiPromoImageSlider',
      ds: 'kpMultiPromo',
      variant: 'LyveraMultiPromoImageSlider/Default',
      childPlaceholder: 'lyvera-multi-promo-slides-1',
      children: KEITH_PROWSE_SLIDES.map((slide, index) => ({
        uid: `b70100d5-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'MultiPromoSlide',
        ds: slide.dsKey,
        variant: 'LyveraMultiPromoSlide/Default',
      })),
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000004',
      rendering: 'Banner',
      ds: 'kpSplitBanner',
      variant: 'LyveraBanner/SplitBand',
      styles: 'lyvera-banner-bg-teal',
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000005',
      rendering: 'FAQ',
      ds: 'kpFaq',
      variant: 'LyveraFAQ/Default',
      childPlaceholder: 'lyvera-faq-items-1',
      children: KEITH_PROWSE_FAQ_ITEMS.map((item, index) => ({
        uid: `b70100d6-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'FAQItem',
        ds: item.dsKey,
        variant: 'LyveraFAQItem/Default',
      })),
    },
  ];
}

/** Supplemental datasource items for the Keith Prowse brand page. */
export function buildKeithProwseDsItems(ids) {
  const logoHtml =
    '<p><img src="/images/brands/keith-prowse.png" alt="Keith Prowse" width="160" /></p>';

  return [
    [
      ids.ds.kpHero,
      'KP Brand Hero',
      'LyveraBanner',
      {
        Title: 'Keith Prowse - part of Lyvera Group',
        BackgroundImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
          alt: 'Guests at a Keith Prowse event',
        },
      },
    ],
    [
      ids.ds.kpIntroPromo,
      'KP Intro Promo',
      'Promo',
      {
        PromoTitle: 'Over 200 years of hospitality experience',
        PromoDescription: `${logoHtml}<p>Keith Prowse, part of Lyvera Group, is one of the UK's most established hospitality experience specialists, with a heritage spanning more than 200 years. The brand is recognised for delivering premium, official hospitality at many of the country's most iconic sporting and cultural events.</p>`,
        PromoImageOne: {
          src: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
          alt: 'Premium hospitality dining',
        },
        PromoMoreInfo:
          '<link text="Find out more" linktype="external" url="https://www.keithprowse.co.uk/" />',
      },
    ],
    [
      ids.ds.kpReversedPromo,
      'KP Trusted Leader Promo',
      'Promo',
      {
        PromoTitle: 'A trusted leader in premium live experiences',
        PromoDescription:
          '<p>It is longevity, credibility and commitment to quality that has established Keith Prowse as a trusted name in premium live experiences for both individuals and organisations, continuing to set the benchmark for hospitality in the UK.</p>',
        PromoImageOne: {
          src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
          alt: 'Guests celebrating at a live event',
        },
      },
    ],
    [
      ids.ds.kpMultiPromo,
      'KP Official Access Slider',
      'LyveraMultiPromoImageSlider',
      {
        Title: 'Official access to iconic events',
        Description:
          'Built on longstanding partnerships with leading venues and event owners, Keith Prowse creates refined, seamless experiences in exceptional settings. From celebrated racing festivals and international rugby to landmark sporting occasions, each experience combines outstanding dining, prime viewing and attentive service.',
        CtaLink:
          '<link text="Explore events" linktype="external" url="https://www.keithprowse.co.uk/" />',
      },
    ],
    [
      ids.ds.kpSplitBanner,
      'KP Entertain Banner',
      'LyveraBanner',
      {
        Title: 'Entertain, reward, and celebrate in style',
        Description:
          '<p>Whether hosting clients, rewarding teams or celebrating with friends and family, our guests experience events in comfort and confidence, immersed in the atmosphere and anticipation that only live occasions can create, with every detail carefully considered from arrival through to departure.</p>',
      },
    ],
    [ids.ds.kpFaq, 'KP FAQs', 'LyveraFAQ', { Heading: 'FAQs' }],
    ...KEITH_PROWSE_FAQ_ITEMS.map((item) => [
      ids.ds[item.dsKey],
      item.dsName,
      'LyveraFAQItem',
      { Question: item.question, Answer: item.answer },
    ]),
    ...KEITH_PROWSE_SLIDES.map((slide) => [
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
