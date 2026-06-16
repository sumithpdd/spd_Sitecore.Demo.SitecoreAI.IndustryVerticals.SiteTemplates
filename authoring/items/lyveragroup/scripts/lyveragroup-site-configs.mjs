import { getBrand, serialRootFolder } from './lyveragroup-brands.mjs';
import { CM_IDS } from './lyveragroup-cm-ids.mjs';

/** Site-specific GUID blocks (unique per site; shared renderings/templates at project level). */
export function buildSiteIds(siteCode) {
  const code = siteCode.padStart(2, '0');
  const base = `b701${code}`;
  return {
    site: `${base}21-0001-4000-8000-000000000001`,
    home: `${base}22-0001-4000-8000-000000000001`,
    dataRoot: `${base}23-0001-4000-8000-000000000001`,
    presentation: `${base}24-0001-4000-8000-000000000001`,
    partialDesigns: `${base}25-0001-4000-8000-000000000001`,
    pageDesigns: `${base}26-0001-4000-8000-000000000001`,
    available: `${base}27-0001-4000-8000-000000000001`,
    headlessVariants: `${base}28-0001-4000-8000-000000000001`,
    placeholderSettings: `${base}29-0001-4000-8000-000000000001`,
    siteGroupingFolder: `${base}2a-0001-4000-8000-000000000001`,
    siteGrouping: `${base}2b-0001-4000-8000-000000000001`,
    settings: `${base}2c-0001-4000-8000-000000000001`,
    partialHeader: `${base}50-0001-4000-8000-000000000001`,
    partialHeaderRenderingUid: `${base}c1-0001-4000-8000-000000000001`,
    partialFooterRenderingUid: `${base}c1-0001-4000-8000-000000000002`,
    partialFooter: `${base}50-0001-4000-8000-000000000002`,
    pageDesignDefault: `${base}51-0001-4000-8000-000000000001`,
    partialDesignSlotFolder: `${base}52-0001-4000-8000-000000000001`,
    partialSlotHeader: `${base}53-0001-4000-8000-000000000001`,
    partialSlotFooter: `${base}53-0001-4000-8000-000000000002`,
    placeholderHeader: `${base}52-0001-4000-8000-000000000002`,
    placeholderMain: `${base}52-0001-4000-8000-000000000003`,
    placeholderFooter: `${base}52-0001-4000-8000-000000000004`,
    availableRenderings: `${base}a0-0001-4000-8000-000000000001`,
    stylesRoot: `${base}90-0001-4000-8000-000000000001`,
    stylesPromo: `${base}90-0001-4000-8000-000000000002`,
    stylesBanner: `${base}90-0001-4000-8000-000000000003`,
    styleTeal: `${base}91-0001-4000-8000-000000000001`,
    styleCoral: `${base}91-0001-4000-8000-000000000002`,
    styleMint: `${base}91-0001-4000-8000-000000000003`,
    styleBannerTricolor: `${base}91-0001-4000-8000-000000000004`,
    ds: {
      header: `${base}40-0001-4000-8000-000000000001`,
      footer: `${base}40-0001-4000-8000-000000000002`,
      heroBanner: `${base}40-0001-4000-8000-000000000004`,
      promoIntro: `${base}40-0001-4000-8000-000000000005`,
      promoWhat: `${base}40-0001-4000-8000-000000000012`,
      promoHow: `${base}40-0001-4000-8000-000000000007`,
      bannerWhy: `${base}40-0001-4000-8000-000000000008`,
      eventGallery: `${base}40-0001-4000-8000-00000000000b`,
      ourBrands: `${base}40-0001-4000-8000-000000000010`,
      multiPromo: `${base}40-0001-4000-8000-000000000011`,
      promoCeo: `${base}40-0001-4000-8000-000000000009`,
      introBand: `${base}40-0001-4000-8000-000000000003`,
    },
  };
}

/** CM folder IDs for corporate lyvera (site already exists in SitecoreSilverProd). */
export function buildLyveraCmSiteIds() {
  const cm = CM_IDS.sites.lyvera;
  return {
    site: cm.site,
    home: cm.home,
    dataRoot: cm.dataRoot,
    presentation: cm.presentation,
    partialDesigns: cm.partialDesigns,
    pageDesigns: cm.pageDesigns,
    available: cm.availableRenderings,
    headlessVariants: cm.headlessVariants,
    placeholderSettings: cm.placeholderSettings,
    siteGroupingFolder: cm.siteGroupingFolder,
    siteGrouping: cm.siteGrouping,
    settings: cm.settings,
    stylesRoot: cm.stylesRoot,
    pageTemplate: cm.pageTemplate,
    partialHeader: 'b7010050-0001-4000-8000-000000000001',
    partialHeaderRenderingUid: 'b70100c1-0001-4000-8000-000000000001',
    partialFooterRenderingUid: 'b70100c1-0001-4000-8000-000000000002',
    partialFooter: 'b7010050-0001-4000-8000-000000000002',
    pageDesignDefault: 'b7010051-0001-4000-8000-000000000001',
    partialDesignSlotFolder: cm.placeholderPartialDesign,
    partialSlotHeader: 'b7010052-0001-4000-8000-000000000001',
    partialSlotFooter: 'b7010053-0001-4000-8000-000000000001',
    placeholderHeader: 'b7010052-0001-4000-8000-000000000002',
    placeholderMain: 'b7010052-0001-4000-8000-000000000003',
    placeholderFooter: 'b7010052-0001-4000-8000-000000000004',
    availableRenderings: 'b70100a0-0001-4000-8000-000000000001',
    stylesPromo: 'b7010090-0001-4000-8000-000000000002',
    stylesBanner: 'b7010090-0001-4000-8000-000000000003',
    styleTeal: 'b7010091-0001-4000-8000-000000000001',
    styleCoral: 'b7010091-0001-4000-8000-000000000002',
    styleMint: 'b7010091-0001-4000-8000-000000000003',
    styleBannerTricolor: 'b7010091-0001-4000-8000-000000000004',
    ds: {
      header: 'b7010040-0001-4000-8000-000000000001',
      footer: 'b7010040-0001-4000-8000-000000000002',
      heroBanner: 'b7010040-0001-4000-8000-000000000004',
      promoIntro: 'b7010040-0001-4000-8000-000000000005',
      promoWhat: 'b7010040-0001-4000-8000-000000000012',
      promoHow: 'b7010040-0001-4000-8000-000000000007',
      bannerWhy: 'b7010040-0001-4000-8000-000000000008',
      eventGallery: 'b7010040-0001-4000-8000-00000000000b',
      ourBrands: 'b7010040-0001-4000-8000-000000000010',
      multiPromo: 'b7010040-0001-4000-8000-000000000011',
      promoCeo: 'b7010040-0001-4000-8000-000000000009',
      introBand: 'b7010040-0001-4000-8000-000000000003',
    },
  };
}

function variantIds(siteCode) {
  const code = siteCode.padStart(2, '0');
  const v = (suffix) => `b701${code}70-0001-4000-8000-${String(suffix).padStart(12, '0')}`;
  const f = (suffix) => `b701${code}71-0001-4000-8000-${String(suffix).padStart(12, '0')}`;
  return {
    folders: {
      LyveraHeader: f(1),
      LyveraFooter: f(2),
      LyveraTextBand: f(3),
      LyveraBanner: f(4),
      LyveraPromo: f(5),
      LyveraOurBrands: f(6),
      LyveraBrandLogo: f(7),
      LyveraMultiPromoImageSlider: f(8),
      LyveraMultiPromoSlide: f(9),
    },
    items: {
      'LyveraHeader/Default': v(1),
      'LyveraFooter/Default': v(2),
      'LyveraTextBand/Default': v(3),
      'LyveraBanner/Default': v(10),
      'LyveraBanner/BackgroundText': v(11),
      'LyveraPromo/Default': v(12),
      'LyveraPromo/ImageLeftColor': v(13),
      'LyveraPromo/ImageRightColor': v(14),
      'LyveraPromo/Stacked': v(15),
      'LyveraPromo/StackedColor': v(16),
      'LyveraOurBrands/Default': v(17),
      'LyveraOurBrands/Grid': v(18),
      'LyveraBrandLogo/Default': v(19),
      'LyveraMultiPromoImageSlider/Default': v(20),
      'LyveraMultiPromoImageSlider/Stacked': v(21),
      'LyveraMultiPromoSlide/Default': v(22),
    },
  };
}

const introText =
  'The creation of Lyvera unites all Levy sports and entertainment businesses under one strong, cohesive brand. This strengthens our market presence, supports greater investment in marketing and innovation, and removes previous trademark barriers that limited expansion in certain regions. It also enables us to bring our full range of services to new markets, giving clients seamless access to the breadth of Lyvera’s expertise.';

export function createLyveraCorporateConfig() {
  const brand = getBrand('lyvera');
  const ids = buildLyveraCmSiteIds();
  const variants = variantIds('00');
  return {
    slug: brand.slug,
    serialRoot: serialRootFolder(brand.slug),
    uidPrefix: 'LYV',
    skipInfrastructure: true,
    ids,
    variants,
    siteMeta: {
      name: brand.slug,
      description: 'Lyvera — Premium Sports, Entertainment & Event Experiences',
      homeTitle: 'Lyvera | Premium Sports, Entertainment & Event Experiences',
      contactEmail: 'enquiries@lyveragroup.com',
    },
    dsItems: [
      [ids.ds.header, 'Default Header', 'LyveraHeader', { ContactEmail: 'enquiries@lyveragroup.com' }],
      [
        ids.ds.footer,
        'Default Footer',
        'LyveraFooter',
        {
          Tagline:
            'Lyvera brings together specialist brands in venue sourcing, premium hospitality and global sports travel, delivering exceptional experiences across the UK and beyond.',
          ContactEmail: 'enquiries@lyveragroup.com',
        },
      ],
      [ids.ds.introBand, 'Brand Story', 'LyveraTextBand', { Eyebrow: 'Who we are', Body: introText }],
      [
        ids.ds.heroBanner,
        'Home Hero',
        'LyveraBanner',
        { Title: 'Step into our world', CtaLink: '<link text="Our brands" linktype="internal" url="/" />' },
      ],
      [ids.ds.promoIntro, 'Who We Are Promo', 'LyveraPromo', { Title: 'Who we are', Description: introText }],
      [
        ids.ds.promoWhat,
        'What We Do Promo',
        'LyveraPromo',
        {
          Title: 'What we do',
          Description:
            'We work across four different but connected areas, delivering tailored experiences and events for our clients.',
        },
      ],
      [
        ids.ds.promoHow,
        'How We Do It Promo',
        'LyveraPromo',
        {
          Title: 'How we do it',
          Description:
            'Our power is our people. We trust and believe in each other, so our partners and customers can put their faith in us.',
        },
      ],
      [
        ids.ds.bannerWhy,
        'Why We Do It Banner',
        'LyveraBanner',
        {
          Title: 'Why we do it',
          Description:
            'Our world is the experience, and our success is measured in goosebumps. Nothing beats being there, live and in person.',
        },
      ],
      [
        ids.ds.promoCeo,
        'CEO Quote Promo',
        'LyveraPromo',
        {
          Title: "Lyvera's Chief Executive Officer, Charlie Buck",
          Description:
            'As expectations shift toward more elevated, premium experiences across sport, entertainment, and business events, Lyvera brings world-class expertise in sports travel, venue management, brand and partnerships to meet demand on a global scale.',
        },
      ],
      [ids.ds.ourBrands, 'Our Brands Bar', 'LyveraOurBrands', { SectionTitle: 'Our brands' }],
      [
        ids.ds.multiPromo,
        'Portfolio Slider',
        'LyveraMultiPromoImageSlider',
        {
          Title: 'A portfolio of specialist brands delivering exceptional experiences',
          Description:
            'Our group brings together leading brands in venue sourcing, premium hospitality, sports travel and luxury experiences.',
          CtaLink: '<link text="Explore our brands" linktype="internal" url="/" />',
        },
      ],
    ],
    homeSections: [
      { uid: 'b70100c0-0001-4000-8000-000000000001', rendering: 'Banner', ds: 'heroBanner', variant: 'LyveraBanner/Default' },
      { uid: 'b70100c0-0001-4000-8000-000000000002', rendering: 'Promo', ds: 'promoIntro', variant: 'LyveraPromo/ImageRightColor' },
      { uid: 'b70100c0-0001-4000-8000-000000000003', rendering: 'OurBrands', ds: 'ourBrands', variant: 'LyveraOurBrands/Default' },
      { uid: 'b70100c0-0001-4000-8000-000000000004', rendering: 'MultiPromoImageSlider', ds: 'multiPromo', variant: 'LyveraMultiPromoImageSlider/Default' },
      { uid: 'b70100c0-0001-4000-8000-000000000005', rendering: 'Promo', ds: 'promoWhat', variant: 'LyveraPromo/ImageLeftColor' },
      { uid: 'b70100c0-0001-4000-8000-000000000006', rendering: 'Promo', ds: 'promoHow', variant: 'LyveraPromo/Default' },
      { uid: 'b70100c0-0001-4000-8000-000000000007', rendering: 'Banner', ds: 'bannerWhy', variant: 'LyveraBanner/BackgroundText', styles: 'lyvera-banner-tricolor' },
      { uid: 'b70100c0-0001-4000-8000-000000000008', rendering: 'Promo', ds: 'promoCeo', variant: 'LyveraPromo/StackedColor' },
    ],
  };
}

export function createEventsInternationalConfig() {
  const brand = getBrand('events-international');
  const ids = buildSiteIds('02');
  const variants = variantIds('02');
  const eiIntro =
    'Events International delivers official hospitality and premium event experiences for major sporting and entertainment occasions. From corporate entertaining to VIP packages, we help agencies and businesses create unforgettable moments for their clients and guests.';

  return {
    slug: brand.slug,
    serialRoot: serialRootFolder(brand.slug),
    uidPrefix: 'EI',
    ids,
    variants,
    siteMeta: {
      name: brand.slug,
      description: 'Events International — Official hospitality for major sporting and entertainment events',
      homeTitle: 'Events International | Premium Event Hospitality',
      contactEmail: 'enquiries@eventsinternational.co.uk',
    },
    dsItems: [
      [
        ids.ds.header,
        'Default Header',
        'LyveraHeader',
        { ContactEmail: 'enquiries@eventsinternational.co.uk' },
      ],
      [
        ids.ds.footer,
        'Default Footer',
        'LyveraFooter',
        {
          Tagline:
            'Official hospitality and premium experiences for major sporting and entertainment events across the UK and beyond.',
          ContactEmail: 'enquiries@eventsinternational.co.uk',
        },
      ],
      [
        ids.ds.heroBanner,
        'Home Hero',
        'LyveraBanner',
        {
          Title: 'Premium hospitality for unforgettable events',
          CtaLink: '<link text="Explore hospitality" linktype="internal" url="/" />',
        },
      ],
      [
        ids.ds.promoIntro,
        'Hospitality Overview',
        'LyveraPromo',
        { Title: 'Official event hospitality', Description: eiIntro },
      ],
      [
        ids.ds.multiPromo,
        'Event Gallery',
        'LyveraMultiPromoImageSlider',
        {
          Title: 'Experiences that impress every guest',
          Description:
            'From Centre Court to the Grand National, our hospitality packages put your clients at the heart of the action.',
          CtaLink: '<link text="View packages" linktype="internal" url="/" />',
        },
      ],
      [
        ids.ds.promoHow,
        'How To Book',
        'LyveraPromo',
        {
          Title: 'How to book',
          Description:
            'Compare packages, check availability, download our brochure, and secure hospitality for your next corporate event.',
        },
      ],
      [
        ids.ds.bannerWhy,
        'Why Choose Us',
        'LyveraBanner',
        {
          Title: 'Why Events International',
          Description:
            'We combine official status, premium service, and decades of expertise to deliver hospitality that strengthens client relationships.',
        },
      ],
    ],
    homeSections: [
      { uid: 'EI-HOME-001', rendering: 'Banner', ds: 'heroBanner', variant: 'LyveraBanner/Default' },
      { uid: 'EI-HOME-002', rendering: 'Promo', ds: 'promoIntro', variant: 'LyveraPromo/ImageRightColor' },
      { uid: 'EI-HOME-003', rendering: 'MultiPromoImageSlider', ds: 'multiPromo', variant: 'LyveraMultiPromoImageSlider/Default' },
      { uid: 'EI-HOME-004', rendering: 'Promo', ds: 'promoHow', variant: 'LyveraPromo/Default' },
      {
        uid: 'EI-HOME-005',
        rendering: 'Banner',
        ds: 'bannerWhy',
        variant: 'LyveraBanner/BackgroundText',
        styles: 'lyvera-banner-tricolor',
      },
    ],
  };
}

export function allSiteConfigs() {
  return [createLyveraCorporateConfig()];
}
