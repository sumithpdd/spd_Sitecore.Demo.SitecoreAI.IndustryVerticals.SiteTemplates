import { getBrand, serialRootFolder } from './lyveragroup-brands.mjs';
import { CM_IDS } from './lyveragroup-cm-ids.mjs';
import { LYVERA_BLOG_ARTICLE_ITEMS, LYVERA_BRAND_PAGE_ITEMS } from './lyveragroup-brand-pages.mjs';
import { LYVERA_FAQ_ITEMS } from './lyveragroup-faq-content.mjs';
import {
  LYVERA_HOME_BRAND_LOGOS,
  LYVERA_HOME_MULTI_PROMO_SLIDES,
} from './lyveragroup-home-placeholders.mjs';
import {
  buildKeithProwseDsItems,
  buildKeithProwsePageSections,
} from './lyveragroup-keith-prowse-page.mjs';
import {
  buildKeithProwseHomeDsItems,
  buildKeithProwseHomeSections,
  extendKeithProwseSiteIds,
} from './lyveragroup-keith-prowse-home-page.mjs';
import {
  buildGulliversTravelHomeDsItems,
  buildGulliversTravelHomeSections,
  extendGulliversTravelSiteIds,
} from './lyveragroup-gulliverstravel-home-page.mjs';
import {
  buildGulliversDsItems,
  buildGulliversPageSections,
} from './lyveragroup-gullivers-page.mjs';
import {
  buildTheExperienceGolfDsItems,
  buildTheExperienceGolfPageSections,
} from './lyveragroup-the-experience-golf-page.mjs';

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
    stylePromoReversed: `${base}91-0001-4000-8000-000000000001`,
    stylePromoOverlay: `${base}91-0001-4000-8000-000000000002`,
    stylePromoBgTeal: `${base}91-0001-4000-8000-000000000003`,
    stylePromoBgCoral: `${base}91-0001-4000-8000-000000000004`,
    stylePromoAccentCoral: `${base}91-0001-4000-8000-000000000005`,
    stylePromoHero: `${base}91-0001-4000-8000-000000000006`,
    styleBannerTricolor: `${base}91-0001-4000-8000-000000000007`,
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
    pageDesignDefault: 'b76aeb5a-a1f2-45be-8056-e9ee3995b349',
    partialDesignSlotFolder: cm.placeholderPartialDesign,
    partialSlotHeader: 'b7010052-0001-4000-8000-000000000001',
    partialSlotFooter: 'b7010053-0001-4000-8000-000000000001',
    placeholderHeader: 'b7010052-0001-4000-8000-000000000002',
    placeholderMain: 'b7010052-0001-4000-8000-000000000003',
    placeholderFooter: 'b7010052-0001-4000-8000-000000000004',
    availableRenderings: 'b70100a0-0001-4000-8000-000000000001',
    stylesBanner: 'b7010090-0001-4000-8000-000000000003',
    stylesPromo: '6dd18275-c509-4eed-958d-2172271715fc',
    stylePromoReversed: 'b7010092-0001-4000-8000-000000000001',
    stylePromoOverlay: 'b7010092-0001-4000-8000-000000000002',
    stylePromoBgTeal: 'b7010092-0001-4000-8000-000000000003',
    stylePromoBgCoral: 'b7010092-0001-4000-8000-000000000004',
    stylePromoAccentCoral: 'b7010092-0001-4000-8000-000000000005',
    stylePromoHero: '04859afa-248b-438b-8bf5-96465d2fc222',
    styleBannerTricolor: 'b7010091-0001-4000-8000-000000000004',
    styleBannerBgTeal: 'b7010091-0001-4000-8000-000000000005',
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
      articleMoments: 'b7010040-0001-4000-8000-00000000000c',
      articleExperience: 'b7010040-0001-4000-8000-00000000000d',
      faq: 'b7010040-0001-4000-8000-000000000014',
      faqItem1: 'b7010040-0001-4000-8000-000000000015',
      faqItem2: 'b7010040-0001-4000-8000-000000000016',
      faqItem3: 'b7010040-0001-4000-8000-000000000017',
      faqItem4: 'b7010040-0001-4000-8000-000000000018',
      faqItem5: 'b7010040-0001-4000-8000-000000000019',
      brandLogo1: 'b7010040-0001-4000-8000-00000000001a',
      brandLogo2: 'b7010040-0001-4000-8000-00000000001b',
      brandLogo3: 'b7010040-0001-4000-8000-00000000001c',
      brandLogo4: 'b7010040-0001-4000-8000-00000000001d',
      brandLogo5: 'b7010040-0001-4000-8000-00000000001e',
      brandLogo6: 'b7010040-0001-4000-8000-00000000001f',
      brandLogo7: 'b7010040-0001-4000-8000-000000000020',
      multiPromoSlide1: 'b7010040-0001-4000-8000-000000000021',
      multiPromoSlide2: 'b7010040-0001-4000-8000-000000000022',
      multiPromoSlide3: 'b7010040-0001-4000-8000-000000000023',
      multiPromoSlide4: 'b7010040-0001-4000-8000-000000000024',
      multiPromoSlide5: 'b7010040-0001-4000-8000-000000000025',
      multiPromoSlide6: 'b7010040-0001-4000-8000-000000000026',
      multiPromoSlide7: 'b7010040-0001-4000-8000-000000000027',
      kpHero: 'b7010040-0001-4000-8000-000000000028',
      kpIntroPromo: 'b7010040-0001-4000-8000-000000000029',
      kpReversedPromo: 'b7010040-0001-4000-8000-00000000002a',
      kpMultiPromo: 'b7010040-0001-4000-8000-00000000002b',
      kpSplitBanner: 'b7010040-0001-4000-8000-00000000002c',
      kpFaq: 'b7010040-0001-4000-8000-00000000002d',
      kpFaqItem1: 'b7010040-0001-4000-8000-00000000002e',
      kpFaqItem2: 'b7010040-0001-4000-8000-00000000002f',
      kpFaqItem3: 'b7010040-0001-4000-8000-000000000030',
      kpSlide1: 'b7010040-0001-4000-8000-000000000031',
      kpSlide2: 'b7010040-0001-4000-8000-000000000032',
      kpSlide3: 'b7010040-0001-4000-8000-000000000033',
      kpSlide4: 'b7010040-0001-4000-8000-000000000034',
      kpSlide5: 'b7010040-0001-4000-8000-000000000035',
      kpSlide6: 'b7010040-0001-4000-8000-000000000036',
      gsHero: 'b7010040-0001-4000-8000-000000000037',
      gsPageNav: 'b7010040-0001-4000-8000-000000000038',
      gsPromo: 'b7010040-0001-4000-8000-000000000039',
      gsMultiPromo: 'b7010040-0001-4000-8000-00000000003a',
      gsSplitBanner: 'b7010040-0001-4000-8000-00000000003b',
      gsCtaBanner: 'b7010040-0001-4000-8000-00000000003c',
      gsFaq: 'b7010040-0001-4000-8000-00000000003d',
      gsFaqItem1: 'b7010040-0001-4000-8000-00000000003e',
      gsFaqItem2: 'b7010040-0001-4000-8000-00000000003f',
      gsFaqItem3: 'b7010040-0001-4000-8000-000000000040',
      gsFaqItem4: 'b7010040-0001-4000-8000-000000000041',
      gsSlide1: 'b7010040-0001-4000-8000-000000000042',
      gsSlide2: 'b7010040-0001-4000-8000-000000000043',
      gsSlide3: 'b7010040-0001-4000-8000-000000000044',
      gsSlide4: 'b7010040-0001-4000-8000-000000000045',
      gsSlide5: 'b7010040-0001-4000-8000-000000000046',
      gsSlide6: 'b7010040-0001-4000-8000-000000000047',
      tegHero: 'b7010040-0001-4000-8000-000000000048',
      tegPageNav: 'b7010040-0001-4000-8000-000000000049',
      tegIntroPromo: 'b7010040-0001-4000-8000-00000000004a',
      tegStAndrewsBanner: 'b7010040-0001-4000-8000-00000000004b',
      tegMultiPromo: 'b7010040-0001-4000-8000-00000000004c',
      tegGolfPromo: 'b7010040-0001-4000-8000-00000000004d',
      tegExpertiseBanner: 'b7010040-0001-4000-8000-00000000004e',
      tegFaq: 'b7010040-0001-4000-8000-00000000004f',
      tegFaqItem1: 'b7010040-0001-4000-8000-000000000050',
      tegFaqItem2: 'b7010040-0001-4000-8000-000000000051',
      tegFaqItem3: 'b7010040-0001-4000-8000-000000000052',
      tegFaqItem4: 'b7010040-0001-4000-8000-000000000053',
      tegFaqItem5: 'b7010040-0001-4000-8000-000000000054',
      tegSlide1: 'b7010040-0001-4000-8000-000000000055',
      tegSlide2: 'b7010040-0001-4000-8000-000000000056',
      tegSlide3: 'b7010040-0001-4000-8000-000000000057',
      tegSlide4: 'b7010040-0001-4000-8000-000000000058',
      tegSlide5: 'b7010040-0001-4000-8000-000000000059',
      tegSlide6: 'b7010040-0001-4000-8000-00000000005a',
    },
  };
}

/** CM site IDs for Keith Prowse (existing branch site — do not regenerate site root). */
export function buildKeithProwseCmSiteIds() {
  const cm = CM_IDS.sites.keithprowse;
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
    partialHeader: 'b7010450-0001-4000-8000-000000000001',
    partialHeaderRenderingUid: 'b70104c1-0001-4000-8000-000000000001',
    partialFooterRenderingUid: 'b70104c1-0001-4000-8000-000000000002',
    partialFooter: 'b7010450-0001-4000-8000-000000000002',
    pageDesignDefault: 'b7010451-0001-4000-8000-000000000001',
    partialDesignSlotFolder: cm.placeholderPartialDesign,
    partialSlotHeader: 'b7010453-0001-4000-8000-000000000001',
    partialSlotFooter: 'b7010453-0001-4000-8000-000000000002',
    placeholderHeader: 'b7010452-0001-4000-8000-000000000002',
    placeholderMain: 'b7010452-0001-4000-8000-000000000003',
    placeholderFooter: 'b7010452-0001-4000-8000-000000000004',
    availableRenderings: 'b70104a0-0001-4000-8000-000000000001',
    stylesBanner: 'b7010490-0001-4000-8000-000000000003',
    stylesPromo: '39f3b50c-234f-420c-a4b4-2bb91f16b294',
    styleBannerTricolor: 'b7010491-0001-4000-8000-000000000007',
    ds: {
      header: 'b7010440-0001-4000-8000-000000000001',
      footer: 'b7010440-0001-4000-8000-000000000002',
      heroBanner: 'b7010440-0001-4000-8000-000000000004',
    },
  };
}

/** CM site IDs for Gullivers Travel (existing branch site — do not regenerate site root). */
export function buildGulliversTravelCmSiteIds() {
  const cm = CM_IDS.sites.gulliverstravel;
  return {
    site: cm.site,
    home: cm.home,
    dataRoot: cm.dataRoot,
    presentation: 'b7010482-0001-4000-8000-000000000010',
    partialDesigns: 'b7010482-0001-4000-8000-000000000011',
    pageDesigns: 'b7010482-0001-4000-8000-000000000012',
    available: 'b7010482-0001-4000-8000-000000000013',
    headlessVariants: 'b7010482-0001-4000-8000-000000000014',
    placeholderSettings: 'b7010482-0001-4000-8000-000000000015',
    siteGroupingFolder: 'b7010482-0001-4000-8000-000000000016',
    siteGrouping: 'b7010482-0001-4000-8000-000000000017',
    settings: 'b7010482-0001-4000-8000-000000000018',
    stylesRoot: 'b7010482-0001-4000-8000-000000000019',
    pageTemplate: cm.pageTemplate,
    partialHeader: 'b7010483-0001-4000-8000-000000000001',
    partialHeaderRenderingUid: 'b70104d1-0001-4000-8000-000000000001',
    partialFooterRenderingUid: 'b70104d1-0001-4000-8000-000000000002',
    partialFooter: 'b7010483-0001-4000-8000-000000000002',
    pageDesignDefault: 'b7010484-0001-4000-8000-000000000001',
    partialDesignSlotFolder: 'b7010482-0001-4000-8000-00000000001a',
    partialSlotHeader: 'b7010485-0001-4000-8000-000000000001',
    partialSlotFooter: 'b7010485-0001-4000-8000-000000000002',
    placeholderHeader: 'b7010486-0001-4000-8000-000000000002',
    placeholderMain: 'b7010486-0001-4000-8000-000000000003',
    placeholderFooter: 'b7010486-0001-4000-8000-000000000004',
    availableRenderings: 'b7010487-0001-4000-8000-000000000001',
    stylesBanner: 'b7010492-0001-4000-8000-000000000003',
    stylesPromo: '39f3b50c-234f-420c-a4b4-2bb91f16b294',
    styleBannerTricolor: 'b7010493-0001-4000-8000-000000000007',
    ds: {
      header: 'b7010460-0001-4000-8000-000000000001',
      footer: 'b7010460-0001-4000-8000-000000000002',
    },
  };
}

/** CM Headless Variant IDs for corporate lyvera (from SXA branch + generator). */
function lyveraCmVariants() {
  return {
    folders: {
      LyveraHeader: 'b7010071-0001-4000-8000-000000000001',
      LyveraFooter: 'b7010071-0001-4000-8000-000000000002',
      LyveraTextBand: 'b7010071-0001-4000-8000-000000000003',
      LyveraBanner: 'b7010071-0001-4000-8000-000000000004',
      Promo: '29fecd53-113e-4878-a809-8e883727ce90',
      LyveraOurBrands: 'b7010071-0001-4000-8000-000000000006',
      LyveraBrandLogo: 'b7010071-0001-4000-8000-000000000007',
      LyveraMultiPromoImageSlider: 'b7010071-0001-4000-8000-000000000008',
      LyveraMultiPromoSlide: 'b7010071-0001-4000-8000-000000000009',
      LyveraBrandPageBody: 'b7010071-0001-4000-8000-00000000000a',
      LyveraBlogListing: 'b7010071-0001-4000-8000-00000000000b',
      LyveraArticleDetails: 'b7010071-0001-4000-8000-00000000000c',
      LyveraFAQ: 'b7010071-0001-4000-8000-00000000000d',
      LyveraFAQItem: 'b7010071-0001-4000-8000-00000000000e',
      LyveraPageSectionNav: 'b7010071-0001-4000-8000-00000000000f',
    },
    items: {
      'LyveraHeader/Default': 'b7010070-0001-4000-8000-000000000001',
      'LyveraFooter/Default': 'b7010070-0001-4000-8000-000000000002',
      'LyveraTextBand/Default': 'b7010070-0001-4000-8000-000000000003',
      'LyveraBanner/Default': 'b7010070-0001-4000-8000-000000000010',
      'LyveraBanner/BackgroundText': 'b7010070-0001-4000-8000-000000000011',
      'LyveraBanner/BrandHero': 'b7010070-0001-4000-8000-000000000012',
      'LyveraBanner/SplitBand': 'b7010070-0001-4000-8000-000000000029',
      'LyveraBanner/WithCta': 'b7010070-0001-4000-8000-00000000002b',
      'LyveraBanner/BrandHeroWithVideo': 'b7010070-0001-4000-8000-00000000002c',
      'Promo/Default': 'be469b38-dee4-4483-923f-d97a0ebfeaad',
      'Promo/WithColumns': 'b7010070-0001-4000-8000-000000000023',
      'LyveraOurBrands/Default': 'b7010070-0001-4000-8000-000000000017',
      'LyveraOurBrands/Grid': 'b7010070-0001-4000-8000-000000000018',
      'LyveraBrandLogo/Default': 'b7010070-0001-4000-8000-000000000019',
      'LyveraMultiPromoImageSlider/Default': 'b7010070-0001-4000-8000-000000000020',
      'LyveraMultiPromoImageSlider/Stacked': 'b7010070-0001-4000-8000-000000000021',
      'LyveraMultiPromoSlide/Default': 'b7010070-0001-4000-8000-000000000022',
      'LyveraBrandPageBody/Default': 'b7010070-0001-4000-8000-000000000024',
      'LyveraBlogListing/Default': 'b7010070-0001-4000-8000-000000000025',
      'LyveraArticleDetails/Default': 'b7010070-0001-4000-8000-000000000026',
      'LyveraFAQ/Default': 'b7010070-0001-4000-8000-000000000027',
      'LyveraFAQItem/Default': 'b7010070-0001-4000-8000-000000000028',
      'LyveraPageSectionNav/Default': 'b7010070-0001-4000-8000-00000000002a',
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
      Promo: f(5),
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
      'Promo/Default': v(12),
      'Promo/WithColumns': v(13),
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
  const variants = lyveraCmVariants();
  return {
    slug: brand.slug,
    serialRoot: serialRootFolder(brand.slug),
    uidPrefix: 'LYV',
    skipInfrastructure: true,
    skipPromoPresentation: true,
    skipPageDesign: true,
    preserveDataSources: true,
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
      [
        ids.ds.promoIntro,
        'Who We Are Promo',
        'Promo',
        { PromoTitle: 'Who we are', PromoDescription: `<p>${introText}</p>` },
      ],
      [
        ids.ds.promoWhat,
        'What We Do Promo',
        'Promo',
        {
          PromoTitle: 'What we do',
          PromoDescription:
            '<p>We work across four different but connected areas, delivering tailored experiences and events for our clients.</p>',
        },
      ],
      [
        ids.ds.promoHow,
        'How We Do It Promo',
        'Promo',
        {
          PromoTitle: 'How we do it',
          PromoDescription:
            '<p>Our power is our people. We trust and believe in each other, so our partners and customers can put their faith in us.</p>',
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
        'Promo',
        {
          PromoTitle: "Lyvera's Chief Executive Officer, Charlie Buck",
          PromoDescription:
            '<p>As expectations shift toward more elevated, premium experiences across sport, entertainment, and business events, Lyvera brings world-class expertise in sports travel, venue management, brand and partnerships to meet demand on a global scale.</p>',
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
      {
        uid: 'b70100c0-0001-4000-8000-000000000002',
        rendering: 'PagePromo',
        ds: 'promoIntro',
        variant: 'Promo/Default',
        styles: 'promo-bg-teal',
      },
      {
        uid: 'b70100c0-0001-4000-8000-000000000003',
        rendering: 'OurBrands',
        ds: 'ourBrands',
        variant: 'LyveraOurBrands/Default',
        childPlaceholder: 'lyvera-brand-logos-1',
        children: LYVERA_HOME_BRAND_LOGOS.map((brand, index) => ({
          uid: `b70100b0-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
          rendering: 'BrandLogo',
          ds: brand.dsKey,
          variant: 'LyveraBrandLogo/Default',
        })),
      },
      {
        uid: 'b70100c0-0001-4000-8000-000000000004',
        rendering: 'MultiPromoImageSlider',
        ds: 'multiPromo',
        variant: 'LyveraMultiPromoImageSlider/Default',
        childPlaceholder: 'lyvera-multi-promo-slides-1',
        children: LYVERA_HOME_MULTI_PROMO_SLIDES.map((slide, index) => ({
          uid: `b70100b1-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
          rendering: 'MultiPromoSlide',
          ds: slide.dsKey,
          variant: 'LyveraMultiPromoSlide/Default',
        })),
      },
      {
        uid: 'b70100c0-0001-4000-8000-000000000005',
        rendering: 'PagePromo',
        ds: 'promoWhat',
        variant: 'Promo/Default',
        styles: 'promo-reversed|promo-bg-coral|accent-coral',
      },
      {
        uid: 'b70100c0-0001-4000-8000-000000000006',
        rendering: 'PagePromo',
        ds: 'promoHow',
        variant: 'Promo/Default',
      },
      { uid: 'b70100c0-0001-4000-8000-000000000007', rendering: 'Banner', ds: 'bannerWhy', variant: 'LyveraBanner/BackgroundText', styles: 'lyvera-banner-tricolor' },
      {
        uid: 'b70100c0-0001-4000-8000-000000000009',
        rendering: 'FAQ',
        ds: 'faq',
        variant: 'LyveraFAQ/Default',
        childPlaceholder: 'lyvera-faq-items-1',
        children: LYVERA_FAQ_ITEMS.map((item, index) => ({
          uid: `b70100f0-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
          rendering: 'FAQItem',
          ds: item.dsKey,
          variant: 'LyveraFAQItem/Default',
        })),
      },
      {
        uid: 'b70100c0-0001-4000-8000-000000000008',
        rendering: 'PagePromo',
        ds: 'promoCeo',
        variant: 'Promo/Default',
        styles: 'promo-hero|promo-bg-teal',
      },
    ],
    contentPages: [
      {
        id: 'b70100d0-0001-4000-8000-000000000010',
        parentId: ids.home,
        parentPath: 'Home',
        name: 'brands',
        isFolder: true,
      },
      ...LYVERA_BRAND_PAGE_ITEMS.map((brand, index) => ({
        id: `b70100d1-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        parentId: 'b70100d0-0001-4000-8000-000000000010',
        parentPath: 'Home/brands',
        name: brand.name,
        title: brand.title,
        sections:
          brand.name === 'keith-prowse'
            ? buildKeithProwsePageSections()
            : brand.name === 'gullivers-sports-travel'
              ? buildGulliversPageSections()
              : brand.name === 'the-experience-golf'
                ? buildTheExperienceGolfPageSections()
                : [
                {
                  uid: `b70100d2-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
                  rendering: 'Banner',
                  ds: 'heroBanner',
                  variant: 'LyveraBanner/BrandHero',
                },
                {
                  uid: `b70100d3-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
                  rendering: 'BrandPageBody',
                  variant: 'LyveraBrandPageBody/Default',
                },
              ],
      })),
      {
        id: 'b70100e0-0001-4000-8000-000000000001',
        parentId: ids.home,
        parentPath: 'Home',
        name: 'news-and-blog',
        title: 'Blog',
        sections: [
          {
            uid: 'b70100e0-0001-4000-8000-000000000002',
            rendering: 'Banner',
            ds: 'heroBanner',
            variant: 'LyveraBanner/BrandHero',
          },
          {
            uid: 'b70100e0-0001-4000-8000-000000000003',
            rendering: 'BlogListing',
            variant: 'LyveraBlogListing/Default',
          },
        ],
      },
      ...LYVERA_BLOG_ARTICLE_ITEMS.map((article, index) => ({
        id: `b70100e2-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        parentId: 'b70100e0-0001-4000-8000-000000000001',
        parentPath: 'Home/news-and-blog',
        name: article.name,
        title: article.title,
        sections: [
          {
            uid: `b70100e3-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
            rendering: 'ArticleDetails',
            ds: article.dsKey,
            variant: 'LyveraArticleDetails/Default',
          },
        ],
      })),
    ],
    supplementalDsItems: [
      ...LYVERA_BLOG_ARTICLE_ITEMS.map((article) => [
        ids.ds[article.dsKey],
        article.dsName,
        'LyveraArticleDetails',
        article.fields,
      ]),
      [ids.ds.faq, 'Home FAQs', 'LyveraFAQ', { Heading: 'FAQs' }],
      ...LYVERA_FAQ_ITEMS.map((item) => [
        ids.ds[item.dsKey],
        item.dsName,
        'LyveraFAQItem',
        { Question: item.question, Answer: item.answer },
      ]),
      ...LYVERA_HOME_BRAND_LOGOS.map((brand) => [
        ids.ds[brand.dsKey],
        brand.dsName,
        'LyveraBrandLogo',
        {
          Title: brand.title,
          BrandLink: `<link text="${brand.title}" linktype="internal" url="${brand.href}" />`,
          LogoImage: { src: brand.logoSrc, alt: brand.title },
        },
      ]),
      ...LYVERA_HOME_MULTI_PROMO_SLIDES.map((slide) => [
        ids.ds[slide.dsKey],
        slide.dsName,
        'LyveraMultiPromoSlide',
        {
          Image: { src: slide.src, alt: slide.alt },
          AltText: slide.alt,
        },
      ]),
      [
        ids.ds.promoCeo,
        'CEO Quote Promo',
        'Promo',
        {
          PromoTitle: "Lyvera's Chief Executive Officer, Charlie Buck",
          PromoDescription:
            '<p>As expectations shift toward more elevated, premium experiences across sport, entertainment, and business events, Lyvera brings world-class expertise in sports travel, venue management, brand and partnerships to meet demand on a global scale.</p>',
          PromoImageOne: {
            src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
            alt: 'Lyvera Chief Executive Officer, Charlie Buck',
          },
        },
      ],
      ...buildKeithProwseDsItems(ids),
      ...buildGulliversDsItems(ids),
      ...buildTheExperienceGolfDsItems(ids),
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
        'Promo',
        { PromoTitle: 'Official event hospitality', PromoDescription: `<p>${eiIntro}</p>` },
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
        'Promo',
        {
          PromoTitle: 'How to book',
          PromoDescription:
            '<p>Compare packages, check availability, download our brochure, and secure hospitality for your next corporate event.</p>',
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
      {
        uid: 'EI-HOME-002',
        rendering: 'PagePromo',
        ds: 'promoIntro',
        variant: 'Promo/Default',
        styles: 'promo-bg-teal',
      },
      { uid: 'EI-HOME-003', rendering: 'MultiPromoImageSlider', ds: 'multiPromo', variant: 'LyveraMultiPromoImageSlider/Default' },
      {
        uid: 'EI-HOME-004',
        rendering: 'PagePromo',
        ds: 'promoHow',
        variant: 'Promo/Default',
        styles: 'promo-hero',
      },
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

export function createKeithProwseSiteConfig() {
  const brand = getBrand('keithprowse');
  const ids = extendKeithProwseSiteIds(buildKeithProwseCmSiteIds());
  const variants = keithProwseVariants();

  return {
    slug: brand.slug,
    serialRoot: serialRootFolder(brand.slug),
    uidPrefix: 'KP',
    skipInfrastructure: true,
    skipPromoPresentation: true,
    ids,
    variants,
    siteMeta: {
      name: brand.slug,
      description:
        "Keith Prowse — the UK's leading sports and events hospitality provider",
      homeTitle: 'Keith Prowse | Premium Sports & Events Hospitality',
      contactEmail: 'enquiries@keithprowse.co.uk',
    },
    dsItems: buildKeithProwseHomeDsItems(ids),
    homeSections: buildKeithProwseHomeSections(),
  };
}

function keithProwseVariants() {
  const f = (n) => `b7010471-0001-4000-8000-${String(n).padStart(12, '0')}`;
  const v = (n) => `b7010470-0001-4000-8000-${String(n).padStart(12, '0')}`;
  return {
    folders: {
      LyveraHeader: f(1),
      LyveraFooter: f(2),
      LyveraTextBand: f(3),
      LyveraBanner: f(4),
      Promo: f(5),
      LyveraOurBrands: f(6),
      LyveraBrandLogo: f(7),
      LyveraMultiPromoImageSlider: f(8),
      LyveraMultiPromoSlide: f(9),
      LyveraBrandPageBody: f(10),
      LyveraBlogListing: f(11),
      LyveraArticleDetails: f(12),
      LyveraFAQ: f(13),
      LyveraFAQItem: f(14),
      LyveraPageSectionNav: f(15),
      LyveraTrustBar: f(16),
      LyveraExperienceFinder: f(17),
      LyveraCategoryGridItem: f(18),
      LyveraTabCategoryGrid: f(19),
      LyveraPromoCardGrid: f(20),
    },
    items: {
      'LyveraHeader/Default': v(1),
      'LyveraHeader/KeithProwse': v(2),
      'LyveraFooter/Default': v(3),
      'LyveraBanner/Default': v(10),
      'LyveraBanner/BackgroundText': v(11),
      'Promo/Default': 'be469b38-dee4-4483-923f-d97a0ebfeaad',
      'LyveraOurBrands/Grid': v(18),
      'LyveraBrandLogo/Default': v(19),
      'LyveraBlogListing/Default': v(25),
      'LyveraTrustBar/Default': v(30),
      'LyveraExperienceFinder/Default': v(31),
      'LyveraCategoryGridItem/Default': v(32),
      'LyveraTabCategoryGrid/Default': v(33),
      'LyveraPromoCardGrid/Default': v(34),
    },
  };
}

export function createGulliversTravelSiteConfig() {
  const ids = extendGulliversTravelSiteIds(buildGulliversTravelCmSiteIds());
  const variants = gulliversTravelVariants();

  return {
    slug: 'gulliverstravel',
    serialRoot: serialRootFolder('gulliverstravel'),
    uidPrefix: 'GS',
    skipInfrastructure: true,
    skipPromoPresentation: true,
    ids,
    variants,
    siteMeta: {
      name: 'gulliverstravel',
      description: 'Gullivers Sports Travel — rugby, cricket, motorsport and sports travel packages',
      homeTitle: 'Gullivers Sports Travel | Rugby, Cricket, Motorsport & Golf',
      contactEmail: 'enquiries@gulliverstravel.co.uk',
    },
    dsItems: buildGulliversTravelHomeDsItems(ids),
    homeSections: buildGulliversTravelHomeSections(),
  };
}

function gulliversTravelVariants() {
  const f = (n) => `b7010481-0001-4000-8000-${String(n).padStart(12, '0')}`;
  const v = (n) => `b7010480-0001-4000-8000-${String(n).padStart(12, '0')}`;
  return {
    folders: {
      LyveraHeader: f(1),
      LyveraFooter: f(2),
      LyveraTrustBar: f(3),
      LyveraOurBrands: f(4),
      LyveraBrandLogo: f(5),
    },
    items: {
      'LyveraHeader/Default': v(1),
      'LyveraHeader/GulliversTravel': v(2),
      'LyveraFooter/Default': v(3),
      'LyveraFooter/GulliversTravel': v(4),
      'Promo/Default': 'be469b38-dee4-4483-923f-d97a0ebfeaad',
      'LyveraTrustBar/Default': v(10),
      'LyveraOurBrands/Grid': v(11),
      'LyveraBrandLogo/Default': v(12),
    },
  };
}

export function allSiteConfigs() {
  return [
    createLyveraCorporateConfig(),
    createKeithProwseSiteConfig(),
    createGulliversTravelSiteConfig(),
  ];
}
