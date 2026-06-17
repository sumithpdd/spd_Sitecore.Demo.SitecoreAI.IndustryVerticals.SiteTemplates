/** Gullivers Lions Tour Australia page — Act 2 demo (Step 04). */

export function buildLionsTourPageSections() {
  return [
    {
      uid: 'b70104e0-0001-4000-8000-000000000010',
      rendering: 'PagePromo',
      ds: 'gsLionsHero',
      variant: 'Promo/Default',
      styles: 'promo-reversed promo-gs-intro',
    },
    {
      uid: 'b70104e0-0001-4000-8000-000000000011',
      rendering: 'PagePromo',
      ds: 'gsLionsPackages',
      variant: 'Promo/Default',
      styles: 'promo-gs-sport-card',
    },
    {
      uid: 'b70104e0-0001-4000-8000-000000000012',
      rendering: 'TrustBar',
      ds: 'gsLionsTrust',
      variant: 'LyveraTrustBar/Default',
    },
  ];
}

export function buildLionsTourDsItems(ids) {
  const LOGO = '/images/brands/gullivers-sports-travel.png';
  return [
    [
      ids.ds.gsLionsHero,
      'Lions Tour Australia Hero',
      'Promo',
      {
        PromoTitle: 'British & Irish Lions Tour Australia 2025',
        PromoDescription: `<p><img src="${LOGO}" alt="Gullivers Sports Travel" width="220" /></p><p>Follow the Lions down under with Gullivers Sports Travel. Our bespoke packages combine <strong>guaranteed match tickets</strong>, flights, hand-picked hotels, dedicated tour managers and exclusive fan events — everything David Wilson needs for an unforgettable rugby travel experience.</p><p>From Sydney to Brisbane, experience the roar of the Lions with the UK's leading sports travel specialists.</p>`,
        PromoImageOne: {
          src: 'https://images.unsplash.com/photo-1574629810360-7abbc0f4d2b8?auto=format&fit=crop&w=1200&q=80',
          alt: 'British and Irish Lions rugby',
        },
        PromoMoreInfo: '<link text="Enquire now" linktype="internal" url="/lions-tour-australia" />',
      },
    ],
    [
      ids.ds.gsLionsPackages,
      'Lions Tour Packages',
      'Promo',
      {
        PromoTitle: 'Premium packages — flights, hotels & match tickets',
        PromoDescription:
          '<p>Explore our Lions Tour Australia itineraries including premium hospitality options, official travel packages and exclusive add-ons. CDP captures rugby travel intent when visitors browse flights, hotels and premium packages on Gullivers.</p><ul><li>Guaranteed match tickets</li><li>Return flights &amp; airport transfers</li><li>Hand-picked hotel accommodation</li><li>Dedicated tour manager</li><li>Exclusive fan events</li></ul>',
        PromoImageOne: {
          src: 'https://images.unsplash.com/photo-1459865274687-595ded6537d0?auto=format&fit=crop&w=1200&q=80',
          alt: 'Lions Tour travel packages',
        },
        PromoMoreInfo: '<link text="View all rugby tours" linktype="internal" url="/rugby" />',
      },
    ],
    [
      ids.ds.gsLionsTrust,
      'Lions Tour Trust Bar',
      'LyveraTrustBar',
      {
        ItemOneText: 'Over 50 years in the game',
        ItemTwoText: 'Guaranteed tickets',
        ItemThreeText: 'ABTA & ATOL protected',
        ItemFourText: 'Part of Lyvera Group',
      },
    ],
  ];
}

export function extendGulliversLionsTourSiteIds(ids) {
  const p = (hex) => `b7010460-0001-4000-8000-0000000000${hex}`;
  return {
    ...ids,
    ds: {
      ...ids.ds,
      gsLionsHero: p('20'),
      gsLionsPackages: p('21'),
      gsLionsTrust: p('22'),
    },
  };
}
