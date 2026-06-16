const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';
const TEG_HERO_VIDEO =
  'https://starter-verticals.sitecoresandbox.cloud/api/public/content/effd332550f342279531bf40d8c87377?v=2ceeb541';

/** FAQ items for The Experience Golf brand page. */
export const TEG_FAQ_ITEMS = [
  {
    dsKey: 'tegFaqItem1',
    dsName: 'TEG FAQ Golf Trips',
    question: 'What golf trips do you offer?',
    answer:
      "<p>The Experience Golf specialises in creating exceptional, tailor-made golf journeys to the world's most iconic destinations. Our heritage lies in St Andrews — home of the Old Course and the sport's most storied traditions — but our expertise extends beyond. From Ireland's rugged links and England's championship courses to the iconic fairways of the Scottish Highlands, we curate access to the very best golf experiences in this beautiful golf region.</p>",
  },
  {
    dsKey: 'tegFaqItem2',
    dsName: 'TEG FAQ Old Course Access',
    question: 'How do you have access to guaranteed tee times on the Old Course?',
    answer:
      '<p>Through our longstanding partnership with St Andrews Links Trust, we are an authorised provider able to secure guaranteed Old Course tee times as part of fully curated itineraries — combining rounds, accommodation, transport and expert local guidance.</p>',
  },
  {
    dsKey: 'tegFaqItem3',
    dsName: 'TEG FAQ What To Expect',
    question: 'What can you expect on our trips?',
    answer:
      '<p>Every journey is bespoke by design. Expect championship golf, four and five-star accommodation, seamless private transfers, attentive service from our experienced team, and thoughtfully curated dining and cultural experiences beyond the fairway.</p>',
  },
  {
    dsKey: 'tegFaqItem4',
    dsName: 'TEG FAQ Location',
    question: 'Where are you based?',
    answer:
      '<p>The Experience Golf is part of Lyvera Group, with teams across the UK supporting golf travel programmes throughout the UK and Ireland.</p>',
  },
  {
    dsKey: 'tegFaqItem5',
    dsName: 'TEG FAQ Lyvera Connection',
    question: 'How are Lyvera and The Experience Golf connected?',
    answer:
      '<p>The Experience Golf is one of seven specialist brands within Lyvera Group, united by a shared commitment to premium experiences, exceptional service and access to the world\'s greatest sporting and cultural occasions.</p>',
  },
];

export const TEG_SLIDES = [
  {
    dsKey: 'tegSlide1',
    dsName: 'TEG Slide Course Aerial',
    alt: 'Golf course aerial at sunset',
    src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
  },
  {
    dsKey: 'tegSlide2',
    dsName: 'TEG Slide Crowd Cheer',
    alt: 'Guests cheering at an event',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
  },
  {
    dsKey: 'tegSlide3',
    dsName: 'TEG Slide Golfers Fist Bump',
    alt: 'Golfers on course at St Andrews',
    src: `${MEDIA}/resized-approved-images-for-pages/extra-images/how-we-do-it-updated.png`,
  },
  {
    dsKey: 'tegSlide4',
    dsName: 'TEG Slide Coastal Sunset',
    alt: 'Coastal golf landscape',
    src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
  },
  {
    dsKey: 'tegSlide5',
    dsName: 'TEG Slide Stadium Golf',
    alt: 'Golfer at a championship venue',
    src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
  },
  {
    dsKey: 'tegSlide6',
    dsName: 'TEG Slide Ryder Cup',
    alt: 'Ryder Cup atmosphere',
    src: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
  },
];

/** Page layout sections for /brands/the-experience-golf (component-driven). */
export function buildTheExperienceGolfPageSections() {
  return [
    {
      uid: 'b70100d2-0001-4000-8000-000000000005',
      rendering: 'Banner',
      ds: 'tegHero',
      variant: 'LyveraBanner/BrandHeroWithVideo',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000001',
      rendering: 'PageSectionNav',
      ds: 'tegPageNav',
      variant: 'LyveraPageSectionNav/Default',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000002',
      rendering: 'PagePromo',
      ds: 'tegIntroPromo',
      variant: 'Promo/Default',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000003',
      rendering: 'Banner',
      ds: 'tegStAndrewsBanner',
      variant: 'LyveraBanner/SplitBand',
      styles: 'lyvera-banner-bg-teal',
      renderingIdentifier: 'first',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000004',
      rendering: 'MultiPromoImageSlider',
      ds: 'tegMultiPromo',
      variant: 'LyveraMultiPromoImageSlider/Default',
      renderingIdentifier: 'second',
      childPlaceholder: 'lyvera-multi-promo-slides-1',
      children: TEG_SLIDES.map((slide, index) => ({
        uid: `b70100e8-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'MultiPromoSlide',
        ds: slide.dsKey,
        variant: 'LyveraMultiPromoSlide/Default',
      })),
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000005',
      rendering: 'PagePromo',
      ds: 'tegGolfPromo',
      variant: 'Promo/Default',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000006',
      rendering: 'Banner',
      ds: 'tegExpertiseBanner',
      variant: 'LyveraBanner/BackgroundText',
      renderingIdentifier: 'third',
    },
    {
      uid: 'b70100e7-0001-4000-8000-000000000007',
      rendering: 'FAQ',
      ds: 'tegFaq',
      variant: 'LyveraFAQ/Default',
      renderingIdentifier: 'fourth',
      childPlaceholder: 'lyvera-faq-items-1',
      children: TEG_FAQ_ITEMS.map((item, index) => ({
        uid: `b70100e9-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'FAQItem',
        ds: item.dsKey,
        variant: 'LyveraFAQItem/Default',
      })),
    },
  ];
}

/** Supplemental datasource items for The Experience Golf brand page. */
export function buildTheExperienceGolfDsItems(ids) {
  const logoHtml =
    '<p><img src="/images/brands/the-experience-golf.png" alt="The Experience Golf" width="200" /></p>';

  return [
    [
      ids.ds.tegHero,
      'TEG Brand Hero',
      'LyveraBanner',
      {
        Title: 'The Experience Golf - part of Lyvera Group',
        BackgroundImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
          alt: 'Golf course at sunset',
        },
        BackgroundVideo: `<link linktype="external" url="${TEG_HERO_VIDEO}" text="TEG hero video" />`,
      },
    ],
    [
      ids.ds.tegPageNav,
      'TEG Page Section Nav',
      'LyveraPageSectionNav',
      {
        LinkOne: '<link text="St Andrews" linktype="internal" url="#first" />',
        LinkTwo: '<link text="All Golf Experiences" linktype="internal" url="#second" />',
        LinkThree: '<link text="Our Expertise" linktype="internal" url="#third" />',
        LinkFour: '<link text="FAQs" linktype="internal" url="#fourth" />',
        CtaLink:
          '<link text="Visit The Experience Golf" linktype="external" url="https://www.theexperiencegolf.com/uk/about-us/introducing-the-experience-golf/" />',
      },
    ],
    [
      ids.ds.tegIntroPromo,
      'TEG Intro Promo',
      'Promo',
      {
        PromoTitle: 'Exceptional golf journeys, crafted with care',
        PromoDescription: `${logoHtml}<p>The Experience Golf, part of Lyvera Group, designs exceptional golf journeys for those who want to experience the game at its very finest. Specialising in luxury golf travel across the UK and Ireland, we create seamless, personalised itineraries that combine world-class courses with outstanding service and unforgettable moments both on and off the fairway. Events such as the iconic <strong>Father and Son Tournament</strong> celebrates the magic of the game through passion, emotion and memory making at the iconic Home of Golf, <strong>St Andrews</strong>, and the appointment as <strong>Official Tour Operator for the 2027 Ryder Cup at Adare Manor</strong> offers guaranteed access to one of the most celebrated events in the sporting calendar.</p>`,
        PromoImageOne: {
          src: `${MEDIA}/resized-approved-images-for-pages/extra-images/how-we-do-it-updated.png`,
          alt: 'Golfers celebrating on course',
        },
        PromoMoreInfo:
          '<link text="Find out more" linktype="external" url="https://www.theexperiencegolf.com/" />',
      },
    ],
    [
      ids.ds.tegStAndrewsBanner,
      'TEG St Andrews Banner',
      'LyveraBanner',
      {
        Title: 'Guaranteed St Andrews tee times',
        Description:
          '<p>For golfers, playing the Old Course at St Andrews is a lifelong dream. The Experience Golf makes stepping onto the hallowed fairways possible through bespoke itineraries that secure Old Course tee times as part of a fully curated experience.</p><p>With guaranteed rounds, four and five-star accommodations, seamless transport and a dedicated team on hand throughout, every detail is handled with care. Our partnership with St Andrews Links Trust ensures privileged access and peace of mind — an authorised provider to The Home of Golf.</p>',
      },
    ],
    [
      ids.ds.tegMultiPromo,
      'TEG Experiences Slider',
      'LyveraMultiPromoImageSlider',
      {
        Title: 'Tailor-made experiences beyond the fairway',
        Description:
          '<p>Each journey is bespoke by design; whether travelling with friends, entertaining clients or celebrating a milestone, our team curates every detail, from championship golf and luxury accommodation to private transfers, local dining and cultural experiences. The result is a sophisticated, effortless travel experience, where every detail is thoughtfully considered.</p>',
      },
    ],
    [
      ids.ds.tegGolfPromo,
      'TEG Golf Beyond Promo',
      'Promo',
      {
        PromoTitle: 'Golf beyond the ordinary',
        PromoDescription:
          '<p>The Experience Golf goes far beyond unforgettable tee times: it creates moments that last a lifetime. From the iconic annual <strong>Father &amp; Son Tournament</strong>, where generations connect through a shared love of the game, <strong>Signature Tours</strong> to bucket-list locations such as the <strong>Home of Golf Tour</strong>, and expertly curated journeys across the legendary links of Scotland, Ireland and England. Every experience is designed with meaning, heritage and heart at its core.</p><p>What\'s more, as an <strong>Official Tour Operator for the 2027 Ryder Cup</strong>, The Experience Golf opens the door to the sport\'s most prestigious stages, combining unrivalled access with impeccable service and unforgettable rounds. It is golf as it should be experienced: deeply personal, steeped in tradition and delivered with a passion that turns extraordinary destinations into memories that will live long after the final putt.</p>',
        PromoImageOne: {
          src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
          alt: 'Golfers on the Old Course',
        },
        PromoMoreInfo:
          '<link text="Discover more" linktype="external" url="https://www.theexperiencegolf.com/" />',
      },
    ],
    [
      ids.ds.tegExpertiseBanner,
      'TEG Expertise Banner',
      'LyveraBanner',
      {
        Title: 'Trusted expertise, seamless delivery',
        Description:
          '<p>With unrivalled destination expertise, longstanding relationships across the golfing world and an unwavering commitment to service, The Experience Golf delivers golf travel defined by access, elegance and authenticity — created for those who expect nothing less than extraordinary. With The Experience Golf, it is always <em>guaranteed golf</em> and <em>guaranteed memories</em>.</p>',
        BackgroundImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
          alt: 'Aerial view of a golf course',
        },
      },
    ],
    [ids.ds.tegFaq, 'TEG FAQs', 'LyveraFAQ', { Heading: 'FAQs' }],
    ...TEG_FAQ_ITEMS.map((item) => [
      ids.ds[item.dsKey],
      item.dsName,
      'LyveraFAQItem',
      { Question: item.question, Answer: item.answer },
    ]),
    ...TEG_SLIDES.map((slide) => [
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
