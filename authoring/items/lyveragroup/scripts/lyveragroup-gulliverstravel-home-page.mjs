/** Homepage content aligned with https://gulliverstravel.co.uk/ */

const LOGO = '/images/brands/gullivers-sports-travel.png';

const SPORT_PROMOS = [
  {
    dsKey: 'gsRugby',
    dsName: 'GS Home Rugby',
    title: 'Rugby',
    description:
      'Follow your team across the world with unforgettable rugby travel experiences. From the Six Nations and Rugby Sevens to British & Irish Lions Tours, the Rugby World Cup and the Nations Championship, our rugby packages put you at the heart of the action. With hand-picked hotels, seamless travel, dedicated tour managers and exclusive fan moments, every tour combines world-class rugby with incredible destinations and memories that last a lifetime.',
    image:
      'https://images.unsplash.com/photo-1574629810360-7abbc0f4d2b8?auto=format&fit=crop&w=1200&q=80',
    cta: 'Head to Gullivers Rugby',
    href: '/rugby',
  },
  {
    dsKey: 'gsCricket',
    dsName: 'GS Home Cricket',
    title: 'Cricket',
    description:
      "Whether you're travelling to follow England overseas or looking to experience world-class cricket in incredible destinations, our cricket tours bring you closer to the action. From the Ashes in Australia to England's tours of South Africa, India, the Caribbean and beyond, each trip blends top-tier cricket with unforgettable travel experiences.",
    image:
      'https://images.unsplash.com/photo-1531418841129-75b6a69d3e7b?auto=format&fit=crop&w=1200&q=80',
    cta: 'Head to Gullivers Cricket',
    href: '/cricket',
  },
  {
    dsKey: 'gsF1',
    dsName: 'GS Home Formula 1',
    title: 'Formula 1',
    description:
      "Covering the biggest European Grands Prix and several spectacular races worldwide, our Formula 1 packages immerse you in the thrill of the world's fastest sport. Experience iconic circuits such as Spa and Monza, soak up the glamour of Monaco, and enjoy premium accommodation and hospitality throughout.",
    image:
      'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80',
    cta: 'Head to Gullivers F1',
    href: '/motorsport/formula-1',
  },
];

const PARTNERS = [
  { dsKey: 'gsPartner1', dsName: 'GS Partner West Indies', title: 'West Indies Cricket', href: '#' },
  { dsKey: 'gsPartner2', dsName: 'GS Partner Silverstone', title: 'Silverstone', href: '#' },
  { dsKey: 'gsPartner3', dsName: 'GS Partner England Rugby', title: 'England Rugby', href: '#' },
  { dsKey: 'gsPartner4', dsName: 'GS Partner RWC', title: 'Rugby World Cup', href: '#' },
  { dsKey: 'gsPartner5', dsName: 'GS Partner ABTA', title: 'ABTA', href: '#' },
  { dsKey: 'gsPartner6', dsName: 'GS Partner ATOL', title: 'ATOL Protected', href: '#' },
];

/** Homepage layout — matches gulliverstravel.co.uk section order */
export function buildGulliversTravelHomeSections() {
  return [
    {
      uid: 'b70104d0-0001-4000-8000-000000000001',
      rendering: 'PagePromo',
      ds: 'gsIntro',
      variant: 'Promo/Default',
      styles: 'promo-reversed promo-gs-intro',
    },
    ...SPORT_PROMOS.map((promo, index) => ({
      uid: `b70104d0-0001-4000-8000-00000000000${index + 2}`,
      rendering: 'PagePromo',
      ds: promo.dsKey,
      variant: 'Promo/Default',
      styles: 'promo-gs-sport-card',
    })),
    {
      uid: 'b70104d0-0001-4000-8000-000000000005',
      rendering: 'TrustBar',
      ds: 'gsWhy',
      variant: 'LyveraTrustBar/Default',
    },
    {
      uid: 'b70104d0-0001-4000-8000-000000000006',
      rendering: 'OurBrands',
      ds: 'gsPartners',
      variant: 'LyveraOurBrands/Grid',
      childPlaceholder: 'lyvera-brand-logos-1',
      children: PARTNERS.map((partner, index) => ({
        uid: `b70104d1-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'BrandLogo',
        ds: partner.dsKey,
        variant: 'LyveraBrandLogo/Default',
      })),
    },
  ];
}

export function buildGulliversTravelHomeDsItems(ids) {
  return [
    [
      ids.ds.header,
      'Default Header',
      'LyveraHeader',
      {
        PhoneNumber: '01684 293175',
        ContactEmail: 'enquiries@gulliverstravel.co.uk',
      },
    ],
    [
      ids.ds.footer,
      'Default Footer',
      'LyveraFooter',
      {
        Tagline: 'Part of Lyvera Group',
        ContactEmail: 'enquiries@gulliverstravel.co.uk',
      },
    ],
    [
      ids.ds.gsIntro,
      'Home Intro',
      'Promo',
      {
        PromoTitle: 'Gullivers Sports Travel',
        PromoDescription: `<p><img src="${LOGO}" alt="Gullivers Sports Travel" width="220" /></p><p><strong>Gullivers Sports Travel</strong> have been at the forefront of bespoke travel experiences for over 50 years, delivering unrivalled itineraries and unforgettable experiences for the sporting enthusiast. With a legacy of taking fans to major sporting events across the globe, we are destination experts who offer truly memorable, once in a lifetime experiences.</p><p>As part of the wider Lyvera Group, Gullivers Sports Travel sits within a portfolio of specialist brands that provide exclusive access to some of the world's most iconic sporting events. Travellers can expect guaranteed match tickets, hotel accommodation, travel, tour managers, exclusive events and much more!</p>`,
      },
    ],
    [
      ids.ds.gsWhy,
      'Home Why Gullivers',
      'LyveraTrustBar',
      {
        ItemOneText: 'Over 50 years in the game',
        ItemTwoText: 'Guaranteed tickets',
        ItemThreeText: 'A personal and friendly touch',
        ItemFourText: 'Financial security',
      },
    ],
    [
      ids.ds.gsPartners,
      'Home Our Partners',
      'LyveraOurBrands',
      { SectionTitle: 'Our Partners' },
    ],
    ...SPORT_PROMOS.map((promo) => [
      ids.ds[promo.dsKey],
      promo.dsName,
      'Promo',
      {
        PromoTitle: promo.title,
        PromoDescription: `<p>${promo.description}</p>`,
        PromoImageOne: { src: promo.image, alt: promo.title },
        PromoMoreInfo: `<link text="${promo.cta}" linktype="internal" url="${promo.href}" />`,
      },
    ]),
    ...PARTNERS.map((partner) => [
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

export function extendGulliversTravelSiteIds(ids) {
  const p = (hex) => `b7010460-0001-4000-8000-0000000000${hex}`;
  const ds = {
    ...ids.ds,
    gsIntro: p('14'),
    gsWhy: p('15'),
    gsPartners: p('16'),
    gsRugby: p('17'),
    gsCricket: p('18'),
    gsF1: p('19'),
    gsPartner1: p('1a'),
    gsPartner2: p('1b'),
    gsPartner3: p('1c'),
    gsPartner4: p('1d'),
    gsPartner5: p('1e'),
    gsPartner6: p('1f'),
  };
  return { ...ids, ds };
}
