const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

export const WIMBLEDON_FACILITY_OPTIONS = [
  {
    dsKey: 'kpWimFac1',
    dsName: 'KP Wimbledon Debenture',
    title: 'Debenture Ticket Only',
    priceLabel: 'Price From £525pp Ex VAT',
    status: 'available',
    tags: 'Ticket only|Guaranteed seat|Hospitality not included',
    description:
      'This is a digital, ticket-only option for The Championships, Wimbledon 2026. Seats are allocated in pairs for your court of choice on the date you select.',
    image:
      'https://images.unsplash.com/photo-1622279452926-62d9f4d4e4be?auto=format&fit=crop&w=1200&q=80',
    cta: 'Select ticket',
    href: '#debenture',
  },
  {
    dsKey: 'kpWimFac2',
    dsName: 'KP Wimbledon HerStory',
    title: 'HerStory at Tennis',
    priceLabel: 'Sold Out',
    status: 'sold-out',
    tags: 'Hospitality included|Premium dining',
    description:
      'An inspiring hospitality experience celebrating women in tennis with premium dining and Centre Court views.',
    image:
      'https://images.unsplash.com/photo-1595435934249-9df7fe6becf0?auto=format&fit=crop&w=1200&q=80',
    cta: 'View',
    href: '#herstory',
  },
  {
    dsKey: 'kpWimFac3',
    dsName: 'KP Wimbledon Treehouse',
    title: 'Treehouse',
    priceLabel: 'From £1,250pp ex VAT',
    status: 'available',
    tags: 'Hospitality included|Garden terrace',
    description:
      'Elevated garden hospitality with relaxed dining, premium drinks and unforgettable views across the grounds.',
    image:
      'https://images.unsplash.com/photo-1554068865-24cecd546e89?auto=format&fit=crop&w=1200&q=80',
    cta: 'View',
    href: '#treehouse',
  },
  {
    dsKey: 'kpWimFac4',
    dsName: 'KP Wimbledon The Lawn',
    title: 'The Lawn',
    priceLabel: 'From £995pp ex VAT',
    status: 'available',
    tags: 'Hospitality included|Signature experience',
    description:
      'Keith Prowse signature garden hospitality with seafood bar, cocktails and the iconic Wimbledon slide.',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    cta: 'View',
    href: '#the-lawn',
  },
];

export const WIMBLEDON_VIDEO_SLIDES = [
  {
    dsKey: 'kpWimVid1',
    dsName: 'KP Wimbledon Video Slide 1',
    tabLabel: 'Slide into The Championships, Wimbledon 2026',
    alt: 'Guests on the Wimbledon slide experience',
    src: 'https://images.unsplash.com/photo-1595435934249-9df7fe6becf0?auto=format&fit=crop&w=1400&q=80',
  },
  {
    dsKey: 'kpWimVid2',
    dsName: 'KP Wimbledon Video Slide 2',
    tabLabel: 'Courtesy of Keith Prowse',
    alt: 'Keith Prowse hospitality at Wimbledon',
    src: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1400&q=80',
  },
  {
    dsKey: 'kpWimVid3',
    dsName: 'KP Wimbledon Video Slide 3',
    tabLabel: "Wimbledon's Official Hospitality Partner",
    alt: 'The Lawn hospitality garden at Wimbledon',
    src: 'https://images.unsplash.com/photo-1622279452926-62d9f4d4e4be?auto=format&fit=crop&w=1400&q=80',
  },
];

/** Page layout for /the-all-england-lawn-tennis-club */
export function buildWimbledonPageSections() {
  return [
    {
      uid: 'b70104e1-0001-4000-8000-000000000001',
      rendering: 'Banner',
      ds: 'kpWimHero',
      variant: 'LyveraBanner/EventHero',
    },
    {
      uid: 'b70104e1-0001-4000-8000-000000000002',
      rendering: 'PagePromo',
      ds: 'kpWimDetail',
      variant: 'Promo/Default',
      styles: 'promo-reversed|promo-kp-wimbledon-detail',
    },
    {
      uid: 'b70104e1-0001-4000-8000-000000000003',
      rendering: 'FacilityChooser',
      ds: 'kpWimFacilities',
      variant: 'LyveraFacilityChooser/Default',
      childPlaceholder: 'lyvera-facility-options-1',
      children: WIMBLEDON_FACILITY_OPTIONS.map((option, index) => ({
        uid: `b70104e2-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'FacilityOption',
        ds: option.dsKey,
        variant: 'LyveraFacilityOption/Default',
      })),
    },
    {
      uid: 'b70104e1-0001-4000-8000-000000000004',
      rendering: 'TextBand',
      ds: 'kpWimExperience',
      variant: 'LyveraTextBand/Default',
      styles: 'lyvera-text-band--event-intro',
    },
    {
      uid: 'b70104e1-0001-4000-8000-000000000005',
      rendering: 'MultiPromoImageSlider',
      ds: 'kpWimVideos',
      variant: 'LyveraMultiPromoImageSlider/Tabbed',
      childPlaceholder: 'lyvera-multi-promo-slides-1',
      children: WIMBLEDON_VIDEO_SLIDES.map((slide, index) => ({
        uid: `b70104e3-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'MultiPromoSlide',
        ds: slide.dsKey,
        variant: 'LyveraMultiPromoSlide/Default',
      })),
    },
  ];
}

export function buildWimbledonDsItems(ids) {
  return [
    [
      ids.ds.kpWimHero,
      'Wimbledon Event Hero',
      'LyveraBanner',
      {
        Eyebrow: 'The All England Lawn Tennis Club',
        Title: 'Wimbledon Hospitality',
        Description: '<p>Always Official</p>',
        EventDate: 'Mon 29 Jun 2026 - Sun 12 Jul 2026',
        EventVenue: 'The All England Lawn Tennis Club',
        BackgroundImage: {
          src: 'https://images.unsplash.com/photo-1554068865-24cecd546e89?auto=format&fit=crop&w=1920&q=80',
          alt: 'Wimbledon Centre Court',
        },
      },
    ],
    [
      ids.ds.kpWimDetail,
      'Wimbledon Hospitality Detail',
      'Promo',
      {
        PromoTitle: 'Official Hospitality Tickets for The Championships, Wimbledon 2026',
        PromoDescription: `<p>The Championships, Wimbledon is the world's oldest tennis tournament - and one of the most prestigious, most sought-after events within the global sporting calendar.</p>
<p>A VIP experience from Keith Prowse - Wimbledon's Official Hospitality Partner - offers one of the only paths to <strong>guaranteed courtside seats on either Centre Court or No.1 Court, on the date of your choosing</strong>; a key reason why the below packages have, in recent years, sold out in record time.</p>
<p><strong>UPDATE; Do act quickly - Wimbledon 2026 hospitality is already now 90% sold out!</strong></p>`,
        PromoImageOne: {
          src: 'https://images.unsplash.com/photo-1595435934249-9df7fe6becf0?auto=format&fit=crop&w=1200&q=80',
          alt: 'Aerial view of Wimbledon',
        },
        PromoMoreInfo:
          '<link text="Register interest for 2027" linktype="internal" url="#register-2027" />',
      },
    ],
    [
      ids.ds.kpWimFacilities,
      'Wimbledon Facility Chooser',
      'LyveraFacilityChooser',
      {
        SectionTitle: 'Start By Choosing Your Facility',
        MapImage: {
          src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
          alt: 'Wimbledon grounds map',
        },
      },
    ],
    [
      ids.ds.kpWimExperience,
      'Wimbledon Experience Band',
      'LyveraTextBand',
      {
        Eyebrow: 'Your Wimbledon experience in-motion',
        Body: '<p>The Championships, Wimbledon is one of the most iconic tournaments in the world. Having worked with Wimbledon since 1982, we\'ve produced some incredible videos to showcase exactly what your premium experience could look like!</p>',
      },
    ],
    [
      ids.ds.kpWimVideos,
      'Wimbledon Experience Videos',
      'LyveraMultiPromoImageSlider',
      { Title: 'Your Wimbledon experience in-motion' },
    ],
    ...WIMBLEDON_FACILITY_OPTIONS.map((option) => [
      ids.ds[option.dsKey],
      option.dsName,
      'LyveraFacilityOption',
      {
        Title: option.title,
        PriceLabel: option.priceLabel,
        Status: option.status,
        Tags: option.tags,
        Description: `<p>${option.description}</p>`,
        DetailImage: { src: option.image, alt: option.title },
        CtaLink: `<link text="${option.cta}" linktype="internal" url="${option.href}" />`,
      },
    ]),
    ...WIMBLEDON_VIDEO_SLIDES.map((slide) => [
      ids.ds[slide.dsKey],
      slide.dsName,
      'LyveraMultiPromoSlide',
      {
        TabLabel: slide.tabLabel,
        Image: { src: slide.src, alt: slide.alt },
        AltText: slide.alt,
      },
    ]),
  ];
}

export function extendWimbledonPageIds(ids) {
  const p = (hex) => `b7010440-0001-4000-8000-0000000000${hex}`;
  const ds = {
    ...ids.ds,
    kpWimHero: p('50'),
    kpWimDetail: p('51'),
    kpWimFacilities: p('52'),
    kpWimExperience: p('53'),
    kpWimVideos: p('54'),
    kpWimFac1: p('55'),
    kpWimFac2: p('56'),
    kpWimFac3: p('57'),
    kpWimFac4: p('58'),
    kpWimVid1: p('59'),
    kpWimVid2: p('5a'),
    kpWimVid3: p('5b'),
  };
  return { ...ids, ds };
}
