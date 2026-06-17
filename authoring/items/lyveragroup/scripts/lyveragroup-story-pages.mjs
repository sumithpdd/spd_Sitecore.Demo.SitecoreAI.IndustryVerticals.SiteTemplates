/** Story-driven page layouts for the Lyvera SitecoreAI demo (17 Jun 2026). */

import { LYVERA_HOME_BRAND_LOGOS } from './lyveragroup-home-placeholders.mjs';
import { LYVERA_BLOG_ARTICLE_ITEMS } from './lyveragroup-brand-pages.mjs';

const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

const BLOG_IMAGES = {
  'moments-over-material-things':
    `${MEDIA}/resized-approved-images-for-pages/extra-images/home-page/what-we-do-635x635.png`,
  'unforgettable-live-experience':
    `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
};

/** /brands — portfolio listing (Step 01 / 07 / 15). */
export function buildBrandsIndexPageSections(ids) {
  return [
    {
      uid: 'b70100d4-0001-4000-8000-000000000001',
      rendering: 'Banner',
      ds: 'brandsPageBanner',
      variant: 'LyveraBanner/BrandHero',
    },
    {
      uid: 'b70100d4-0001-4000-8000-000000000002',
      rendering: 'OurBrands',
      ds: 'brandsPageOurBrands',
      variant: 'LyveraOurBrands/Default',
      childPlaceholder: 'lyvera-brand-logos-2',
      children: LYVERA_HOME_BRAND_LOGOS.map((brand, index) => ({
        uid: `b70100d5-0001-4000-8000-${String(index + 1).padStart(12, '0')}`,
        rendering: 'BrandLogo',
        ds: brand.dsKey,
        variant: 'LyveraBrandLogo/Default',
      })),
    },
  ];
}

/** Supplemental datasources for /brands page. */
export function buildBrandsIndexDsItems(ids) {
  return [
    [
      ids.ds.brandsPageBanner,
      'Brands Page Banner',
      'LyveraBanner',
      {
        Title: 'Our brands',
        Description:
          '<p>Seven specialist brands united under Lyvera — premium hospitality, sports travel, venue sourcing and luxury experiences across the UK and beyond.</p>',
        BackgroundImage: {
          src: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1920&q=80',
          alt: 'Our brands',
        },
      },
    ],
    [
      ids.ds.brandsPageOurBrands,
      'Brands Page Our Brands',
      'LyveraOurBrands',
      { SectionTitle: 'Explore our portfolio' },
    ],
  ];
}

function relatedArticlesForArticle(articleIndex) {
  return LYVERA_BLOG_ARTICLE_ITEMS.filter((_, i) => i !== articleIndex);
}

/** Blog article page sections including Related articles band. */
export function buildBlogArticlePageSections(article, articleIndex, ids) {
  const related = relatedArticlesForArticle(articleIndex);
  const sectionDsKey = articleIndex === 0 ? 'relatedArticlesMoments' : 'relatedArticlesExperience';
  const childPrefix = articleIndex === 0 ? 'b70100e4' : 'b70100e5';

  return [
    {
      uid: `b70100e3-0001-4000-8000-${String(articleIndex + 1).padStart(12, '0')}`,
      rendering: 'ArticleDetails',
      ds: article.dsKey,
      variant: 'LyveraArticleDetails/Default',
    },
    {
      uid: `${childPrefix}-0001-4000-8000-000000000001`,
      rendering: 'RelatedArticles',
      ds: sectionDsKey,
      variant: 'LyveraRelatedArticles/Default',
      childPlaceholder: `lyvera-related-articles-${articleIndex + 1}`,
      children: related.map((rel, relIndex) => ({
        uid: `${childPrefix}-0001-4000-8000-${String(relIndex + 2).padStart(12, '0')}`,
        rendering: 'RelatedArticle',
        ds: relIndex === 0 ? (articleIndex === 0 ? 'relatedArticleMomentsOther' : 'relatedArticleExperienceOther') : `relatedArticleExtra${articleIndex}${relIndex}`,
        variant: 'LyveraRelatedArticle/Default',
      })),
    },
  ];
}

/** Supplemental datasources for related article promos on blog pages. */
export function buildBlogRelatedArticleDsItems(ids) {
  const items = [
    [ids.ds.relatedArticlesMoments, 'Related Articles Moments', 'LyveraRelatedArticles', { SectionTitle: 'Related articles' }],
    [ids.ds.relatedArticlesExperience, 'Related Articles Experience', 'LyveraRelatedArticles', { SectionTitle: 'Related articles' }],
  ];

  LYVERA_BLOG_ARTICLE_ITEMS.forEach((article, index) => {
    const others = relatedArticlesForArticle(index);
    others.forEach((other, otherIndex) => {
      const dsKey =
        index === 0 && otherIndex === 0
          ? 'relatedArticleMomentsOther'
          : index === 1 && otherIndex === 0
            ? 'relatedArticleExperienceOther'
            : null;
      if (!dsKey) return;

      items.push([
        ids.ds[dsKey],
        `Related Article ${other.name}`,
        'LyveraRelatedArticle',
        {
          Title: other.fields.Title,
          Category: other.fields.Category,
          Image: { src: BLOG_IMAGES[other.name] ?? BLOG_IMAGES['moments-over-material-things'], alt: other.fields.Title },
          Link: `<link text="Read more" linktype="internal" url="/news-and-blog/${other.name}" />`,
        },
      ]);
    });
  });

  return items;
}

/** Extend corporate lyvera ds map with story page datasource GUIDs. */
export function extendLyveraStorySiteIds(ids) {
  const p = (hex) => `b7010040-0001-4000-8000-0000000000${hex}`;
  return {
    ...ids,
    ds: {
      ...ids.ds,
      brandsPageBanner: p('5b'),
      brandsPageOurBrands: p('5c'),
      relatedArticlesMoments: p('5d'),
      relatedArticleMomentsOther: p('5e'),
      relatedArticlesExperience: p('5f'),
      relatedArticleExperienceOther: p('60'),
    },
  };
}
