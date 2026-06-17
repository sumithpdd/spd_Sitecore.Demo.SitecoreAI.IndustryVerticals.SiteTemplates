const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

/** Homepage content aligned with https://www.keithprowse.co.uk/ */
const FEATURED_EVENTS = [
  {
    dsKey: 'kpFeWim',
    dsName: 'KP Featured Wimbledon',
    title: 'The Championships, Wimbledon',
    description:
      'Experience official hospitality at <strong>The All England Lawn Tennis Club</strong> — debenture tickets, premium dining and unforgettable corporate entertainment at the world\'s most prestigious tennis tournament.',
    image:
      'https://images.unsplash.com/photo-1622279452926-62d9f4d4e4be?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Wimbledon',
    href: '/the-all-england-lawn-tennis-club',
  },
  {
    dsKey: 'kpFe1',
    dsName: 'KP Featured England v New Zealand',
    title: 'England v New Zealand',
    description:
      'Entertain your most important client or enjoy a memorable day out with friends and family for the 2026 <strong>Nations Championship</strong> clash between England and New Zealand at Allianz Stadium.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7abbc0f4d2b8?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Rugby',
    href: '/sport/rugby',
  },
  {
    dsKey: 'kpFe2',
    dsName: 'KP Featured Laver Cup',
    title: 'Laver Cup London 2026',
    description:
      "Witness Team Europe vs Team World - the likes of <strong>Alcaraz & Zverev</strong> vs <strong>Shelton, Fritz & de Minaur</strong> - as a V-VIP, at London's O2 Arena! It's Roger Federer's brainchild in-action - and tennis, unrivalled!",
    image:
      'https://images.unsplash.com/photo-1554068865-24cecd546e89?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Laver Cup',
    href: '/sport/tennis/laver-cup',
  },
  {
    dsKey: 'kpFe3',
    dsName: 'KP Featured T20 Finals',
    title: 'T20 Finals Day',
    description:
      'Experience an incredible day at the cricket in style as the T20 Finals Day returns to <strong>Edgbaston Stadium</strong>.',
    image:
      'https://images.unsplash.com/photo-1531418841129-75b6a69d3e7b?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Cricket',
    href: '/sport/cricket',
  },
  {
    dsKey: 'kpFe4',
    dsName: 'KP Featured Royal Ascot',
    title: 'Royal Ascot',
    description:
      'The prestigious <strong>Royal Ascot</strong> is one of the most celebrated events in the flat racing calendar. Experience a selection of hospitality packages, all set within the vibrant atmosphere of <strong>Ascot Racecourse</strong>.',
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Royal Ascot',
    href: '/tournament/royal-ascot',
  },
  {
    dsKey: 'kpFe5',
    dsName: 'KP Featured Gullivers',
    title: 'Passion, Adventure, and Unforgettable Sporting Moments!',
    description:
      'From the roar of a sold-out rugby stadium, to the timeless drama of world cricket, and the speed and spectacle of Formula 1 circuits around the world - <strong>Gullivers Sports Travel</strong> delivers your ultimate sports adventure with tickets, travel, and accommodation taken care of.',
    image:
      'https://images.unsplash.com/photo-1459865274687-595ded6537d0?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Sport Tours',
    href: 'https://www.gulliverssportstravel.co.uk/',
  },
  {
    dsKey: 'kpFe6',
    dsName: 'KP Featured The Experience Golf',
    title: 'Guaranteed Golf, Guaranteed Memories',
    description:
      "<strong>The Experience Golf</strong> curates premium, tailor-made golf journeys to the world's most sought-after destinations. <strong>Guaranteed tee times, luxury accommodation, cultural tours</strong> and more across the UK and Ireland - the golf trip of a lifetime is waiting for you...",
    image:
      'https://images.unsplash.com/photo-1587174485733-86c5855f6a9f?auto=format&fit=crop&w=800&q=80',
    cta: 'Explore Luxury Golf Tours',
    href: 'https://www.theexperiencegolf.com/',
  },
];

const SPORT_GRID = [
  ['Rugby Union', '/sport/rugby-union', 'sport', `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`],
  ['Tennis', '/the-all-england-lawn-tennis-club', 'sport', `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`],
  ['Cricket', '/sport/cricket', 'sport', `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`],
  ['American Football', '/sport/american-football', 'sport', `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`],
  ['Basketball', '/sport/basketball', 'sport', `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`],
  ['Boxing', '/sport/boxing', 'sport', `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`],
  ['Football', '/sport/football', 'sport', `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`],
  ['Golf', '/sport/golf', 'sport', `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`],
  ['Horse Racing', '/sport/horse-racing', 'sport', `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`],
  ['Motor Racing', '/sport/motor-racing', 'sport', `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`],
  ['Polo', '/sport/polo', 'sport', `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`],
  ['Rowing', '/sport/rowing', 'sport', `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`],
  ['Snooker', '/sport/snooker', 'sport', `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`],
];

const CULTURE_GRID = [
  ['Concerts', '/music-arts-culture/concerts', 'culture', `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`],
  ['Horticulture', '/music-arts-culture/horticulture', 'culture', `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`],
  ['Theatre', '/music-arts-culture/theatre', 'culture', `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`],
];

const OFFICIAL_APPOINTMENTS = [
  { dsKey: 'kpPartner1', dsName: 'KP Official Appointment 1', title: 'Official Appointments', href: '#' },
  { dsKey: 'kpPartner2', dsName: 'KP The Kia Oval', title: 'The Kia Oval', href: '/venue/the-kia-oval' },
  { dsKey: 'kpPartner3', dsName: 'KP Excel London', title: 'Excel London', href: '/venue/excel-london' },
  { dsKey: 'kpPartner4', dsName: 'KP HSBC', title: 'HSBC', href: '#' },
  { dsKey: 'kpPartner5', dsName: 'KP Lexus', title: 'Lexus', href: '#' },
];

/** Homepage layout — matches keithprowse.co.uk section order */
export function buildKeithProwseHomeSections() {
  const gridItems = [...SPORT_GRID, ...CULTURE_GRID];

  return [
    {
      uid: 'b70104c0-0001-4000-8000-000000000001',
      rendering: 'Banner',
      ds: 'heroBanner',
      variant: 'LyveraBanner/Default',
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000003',
      rendering: 'ExperienceFinder',
      ds: 'kpFinder',
      variant: 'LyveraExperienceFinder/Default',
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000004',
      rendering: 'PromoCardGrid',
      ds: 'kpFeatured',
      variant: 'LyveraPromoCardGrid/Default',
      childPlaceholder: 'lyvera-promo-cards-1',
      children: FEATURED_EVENTS.map((event, index) => ({
        uid: `b70104c2-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'PagePromo',
        ds: event.dsKey,
        variant: 'Promo/Default',
        styles: 'promo-kp-card',
      })),
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000005',
      rendering: 'TabCategoryGrid',
      ds: 'kpTabGrid',
      variant: 'LyveraTabCategoryGrid/Default',
      childPlaceholder: 'lyvera-category-grid-items-1',
      children: gridItems.map((item, index) => ({
        uid: `b70104c3-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'CategoryGridItem',
        ds: `kpCg${index + 1}`,
        variant: 'LyveraCategoryGridItem/Default',
      })),
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000006',
      rendering: 'Banner',
      ds: 'kpAbout',
      variant: 'LyveraBanner/BackgroundText',
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000007',
      rendering: 'OurBrands',
      ds: 'kpPartners',
      variant: 'LyveraOurBrands/Grid',
      childPlaceholder: 'lyvera-brand-logos-1',
      children: OFFICIAL_APPOINTMENTS.map((partner, index) => ({
        uid: `b70104c4-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'BrandLogo',
        ds: partner.dsKey,
        variant: 'LyveraBrandLogo/Default',
      })),
    },
    {
      uid: 'b70104c0-0001-4000-8000-000000000008',
      rendering: 'BlogListing',
      variant: 'LyveraBlogListing/Default',
    },
  ];
}

/** Datasource items for Keith Prowse site home */
export function buildKeithProwseHomeDsItems(ids) {
  const gridItems = [...SPORT_GRID, ...CULTURE_GRID];

  return [
    [
      ids.ds.header,
      'Default Header',
      'LyveraHeader',
      {
        PhoneNumber: '02088437699',
        ContactEmail: 'enquiries@keithprowse.co.uk',
      },
    ],
    [
      ids.ds.footer,
      'Default Footer',
      'LyveraFooter',
      {
        Tagline: 'Keith Prowse — The Home of Hospitality',
        ContactEmail: 'enquiries@keithprowse.co.uk',
      },
    ],
    [
      ids.ds.heroBanner,
      'Home Hero',
      'LyveraBanner',
      {
        Title: 'Welcome to Keith Prowse',
        Description: '<p>The Home of Hospitality</p>',
        BackgroundImage: {
          src: 'https://images.unsplash.com/photo-1554068865-24cecd546e89?auto=format&fit=crop&w=1920&q=80',
          alt: 'Keith Prowse hospitality experience',
        },
      },
    ],
    [
      ids.ds.kpFinder,
      'Home Experience Finder',
      'LyveraExperienceFinder',
      {
        Title: 'Quickly find your perfect experience',
        Description:
          "<p>Select an option below to access more filters, and email the results via 'share all'.</p>",
        Label: 'What matters most?',
        OptionOne: '<link text="Sport" linktype="internal" url="/sport" />',
        OptionTwo: '<link text="Music Arts and Culture" linktype="internal" url="/music-arts-culture" />',
        OptionThree: '<link text="Number of Guests" linktype="internal" url="/guests" />',
      },
    ],
    [
      ids.ds.kpFeatured,
      'Home Featured Events',
      'LyveraPromoCardGrid',
      { SectionTitle: 'FEATURED EVENTS' },
    ],
    [
      ids.ds.kpTabGrid,
      'Home Category Tabs',
      'LyveraTabCategoryGrid',
      {
        TabOneLabel: 'Sport',
        TabTwoLabel: 'Music Arts and Culture',
      },
    ],
    [
      ids.ds.kpAbout,
      'Home About Band',
      'LyveraBanner',
      {
        Title: "Keith Prowse, the UK's leading Sports & Events hospitality provider",
        Description:
          "<p>We're the official sports & events premium experiences provider for many iconic venues and stadiums across the country, including Allianz Stadium and Wimbledon. For over 220 years, the name Keith Prowse has been synonymous with the top sporting, social and cultural events in the UK.</p><p>Innovation and customer service are at the heart of what we do for both corporate client hospitality and individual VIP experiences. We're passionate about delivering the ultimate high-end experiences and packages, guaranteeing to turn any sporting spectacle or cultural event into a cherished memory that will last for a lifetime.</p>",
        CtaLink: '<link text="About Us" linktype="internal" url="/about-us" />',
      },
    ],
    [
      ids.ds.kpPartners,
      'Home Official Appointments',
      'LyveraOurBrands',
      { SectionTitle: 'Official Appointments' },
    ],
    ...FEATURED_EVENTS.map((event) => [
      ids.ds[event.dsKey],
      event.dsName,
      'Promo',
      {
        PromoTitle: event.title,
        PromoDescription: `<p>${event.description}</p>`,
        PromoImageOne: { src: event.image, alt: event.title },
        PromoMoreInfo: `<link text="${event.cta}" linktype="internal" url="${event.href}" />`,
      },
    ]),
    ...gridItems.map(([label, href, tab, src], index) => [
      ids.ds[`kpCg${index + 1}`],
      `KP Grid ${label}`,
      'LyveraCategoryGridItem',
      {
        Title: label,
        Image: { src, alt: label },
        Link: `<link text="${label}" linktype="internal" url="${href}" />`,
        CategoryTab: tab,
      },
    ]),
    ...OFFICIAL_APPOINTMENTS.map((partner) => [
      ids.ds[partner.dsKey],
      partner.dsName,
      'LyveraBrandLogo',
      {
        Title: partner.title,
        BrandLink: `<link text="${partner.title}" linktype="external" url="${partner.href}" />`,
      },
    ]),
  ];
}

/** Extend buildKeithProwseCmSiteIds().ds with Keith Prowse home datasource GUIDs */
export function extendKeithProwseSiteIds(ids) {
  const p = (hex) => `b7010440-0001-4000-8000-0000000000${hex}`;
  const gridCount = SPORT_GRID.length + CULTURE_GRID.length;
  const ds = {
    ...ids.ds,
    kpFinder: p('14'),
    kpFeatured: p('15'),
    kpTabGrid: p('16'),
    kpAbout: p('17'),
    kpPartners: p('18'),
    kpFe1: p('19'),
    kpFeWim: p('35'),
    kpFe2: p('1a'),
    kpFe3: p('1b'),
    kpFe4: p('1c'),
    kpFe5: p('1d'),
    kpFe6: p('1e'),
    kpPartner1: p('30'),
    kpPartner2: p('31'),
    kpPartner3: p('32'),
    kpPartner4: p('33'),
    kpPartner5: p('34'),
  };
  for (let i = 0; i < gridCount; i += 1) {
    ds[`kpCg${i + 1}`] = p((0x1f + i).toString(16));
  }
  return { ...ids, ds };
}
