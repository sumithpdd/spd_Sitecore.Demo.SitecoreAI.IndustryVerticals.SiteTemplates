import { useEffect, JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import sites from '.sitecore/sites.json';
import NotFound from 'src/NotFound';
import Layout from 'src/Layout';
import {
  SitecoreProvider,
  ComponentPropsContext,
  SitecorePageProps,
  StaticPath,
  SiteInfo,
} from '@sitecore-content-sdk/nextjs';
import { extractPath, handleEditorFastRefresh } from '@sitecore-content-sdk/nextjs/utils';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import scConfig from 'sitecore.config';
import { JourneyLayout } from '@/lib/JourneyLayout';
import { journeyProps } from '@/lib/component-props';
import { Default as GlobalBanner } from '@/components/global-banner/GlobalBanner';
import HomeBanner from '@/components/home-banner/HomeBanner';
import EditHero from '@/components/edit-hero/EditHero';
import Edit from '@/components/edit/Edit';
import NewIn from '@/components/new-in/NewIn';
import AsSeenOnYou from '@/components/as-seen-on-you/AsSeenOnYou';
import StyleFeed from '@/components/style-feed/StyleFeed';
import Article from '@/components/article/Article';
import CategoryListing from '@/components/category-listing/CategoryListing';
import ProductPage from '@/components/product-page/ProductPage';
import SharedBoard from '@/components/shared-board/SharedBoard';
import GenderLanding from '@/components/gender-landing/GenderLanding';
import Accessibility from '@/components/accessibility/Accessibility';
import BuyTheLook from '@/components/buy-the-look/BuyTheLook';
import YouMightAlsoLike from '@/components/you-might-also-like/YouMightAlsoLike';
import PeopleAlsoBought from '@/components/people-also-bought/PeopleAlsoBought';
import RecentlyViewed from '@/components/recently-viewed/RecentlyViewed';
import YourStyle from '@/components/your-style/YourStyle';
import SeoLinkGrid from '@/components/seo-link-grid/SeoLinkGrid';
import SeoCopy from '@/components/seo-copy/SeoCopy';
import { articleFromPath } from '@/lib/style-articles';

type PageProps = SitecorePageProps & {
  journeyHome?: boolean;
  journeyListing?: boolean;
  journeyPdp?: boolean;
  journeyBoard?: boolean;
  journeyMen?: boolean;
  journeyArticle?: boolean;
  journeyAccessibility?: boolean;
  journeyPath?: string;
};

const isHomePath = (path: string): boolean =>
  path === '/' || path === '' || path === '/en' || path === '/fr-FR' || path === '/es-ES';

const isListingPath = (path: string): boolean =>
  /\/cat\/?$/.test(path) ||
  /^\/women\/(new-in|denim|new-season-edit|selling-fast|new-season-colours|september-shift|sale-under-10|topshop)$/.test(
    path
  ) ||
  /^\/edits\/[^/]+$/.test(path) ||
  path === '/petite-denim' ||
  path === '/products';
const isPdpPath = (path: string): boolean =>
  /\/prd\/\d+/.test(path) || /^\/products\/[^/]+$/.test(path);
const isBoardPath = (path: string): boolean => /\/shared-board\/[0-9a-f-]{36}$/i.test(path);
const isMenPath = (path: string): boolean => path === '/men';
const isAccessibilityPath = (path: string): boolean => path === '/accessibility';
const isArticlePath = (path: string): boolean =>
  /^\/style-feed\/(how-law-roach-styled-autumn|what-to-wear-to-uni|wide-leg-jeans-under-50|chocolate-denim)$/.test(
    path
  );

const SitecorePage = ({
  page,
  notFound,
  componentProps,
  journeyHome,
  journeyListing,
  journeyPdp,
  journeyBoard,
  journeyMen,
  journeyArticle,
  journeyAccessibility,
  journeyPath,
}: PageProps): JSX.Element => {
  useEffect(() => {
    // Since Sitecore Editor does not support Fast Refresh, need to refresh editor chromes after Fast Refresh finished
    handleEditorFastRefresh();
  }, []);

  if (journeyHome) {
    return (
      <JourneyLayout title="ASOS | This is ASOS">
        <GlobalBanner {...journeyProps} />
        <HomeBanner {...journeyProps} />
        <EditHero {...journeyProps} />
        <Edit {...journeyProps} />
        <NewIn {...journeyProps} />
        <AsSeenOnYou {...journeyProps} />
        <StyleFeed {...journeyProps} />
      </JourneyLayout>
    );
  }

  if (journeyListing) {
    return (
      <JourneyLayout title="ASOS">
        <CategoryListing {...journeyProps} listingPath={journeyPath} />
      </JourneyLayout>
    );
  }

  if (journeyPdp) {
    return (
      <JourneyLayout title="ASOS" framed={false}>
        <ProductPage {...journeyProps} listingPath={journeyPath} />
      </JourneyLayout>
    );
  }

  if (journeyAccessibility) {
    return (
      <JourneyLayout title="Accessibility | ASOS">
        <Accessibility {...journeyProps} />
      </JourneyLayout>
    );
  }

  if (journeyArticle) {
    const article = articleFromPath(journeyPath || '');
    return (
      <JourneyLayout title="ASOS | Style Feed">
        <Article {...journeyProps} listingPath={journeyPath} />
        <BuyTheLook
          {...journeyProps}
          fields={{
            Heading: { value: 'BUY THE LOOK' },
            Intro: { value: 'Shop the pieces in this story.' },
            Intent: { value: 'outfit' },
            ProductIds: { value: article?.productIds || '' },
          }}
        />
        <YouMightAlsoLike {...journeyProps} />
        <PeopleAlsoBought {...journeyProps} />
        <RecentlyViewed {...journeyProps} />
        <YourStyle {...journeyProps} />
        <StyleFeed {...journeyProps} />
        <SeoLinkGrid {...journeyProps} />
        <SeoCopy {...journeyProps} />
      </JourneyLayout>
    );
  }

  if (journeyMen) {
    return (
      <JourneyLayout title="ASOS | Men">
        <EditHero {...journeyProps} />
        <GenderLanding {...journeyProps} />
      </JourneyLayout>
    );
  }

  if (journeyBoard) {
    return (
      <JourneyLayout title="ASOS">
        <SharedBoard {...journeyProps} listingPath={journeyPath} />
      </JourneyLayout>
    );
  }

  if (notFound || !page) {
    // Shouldn't hit this (as long as 'notFound' is being returned below), but just to be safe
    return <NotFound />;
  }

  return (
    <ComponentPropsContext value={componentProps || {}}>
      <SitecoreProvider componentMap={components} api={scConfig.api} page={page}>
        <Layout page={page} />
      </SitecoreProvider>
    </ComponentPropsContext>
  );
};

// This function gets called at build and export time to determine
// pages for SSG ("paths", as tokenized array).
export const getStaticPaths: GetStaticPaths = async (context) => {
  // Fallback, along with revalidate in getStaticProps (below),
  // enables Incremental Static Regeneration. This allows us to
  // leave certain (or all) paths empty if desired and static pages
  // will be generated on request (development mode in this example).
  // Alternatively, the entire sitemap could be pre-rendered
  // ahead of time (non-development mode in this example).
  // See https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration

  let paths: StaticPath[] = [];
  let fallback: boolean | 'blocking' = 'blocking';

  if (process.env.NODE_ENV !== 'development' && scConfig.generateStaticPaths) {
    try {
      paths = await client.getPagePaths(
        sites.map((site: SiteInfo) => site.name),
        context?.locales || []
      );
    } catch (error) {
      console.log('Error occurred while fetching static paths');
      console.log(error);
    }

    fallback = process.env.EXPORT_MODE ? false : fallback;
  }

  return {
    paths,
    fallback,
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation (or fallback) is enabled and a new request comes in.
export const getStaticProps: GetStaticProps = async (context) => {
  let props = {};
  const path = (extractPath(context) || '/').replace(/^_site_[^/]+/, '') || '/';
  let page;

  try {
    if (context.preview && isDesignLibraryPreviewData(context.previewData)) {
      page = await client.getDesignLibraryData(context.previewData);
    } else {
      page = context.preview
        ? await client.getPreview(context.previewData)
        : await client.getPage(extractPath(context), { locale: context.locale });
    }
  } catch (error) {
    console.log('Error occurred while fetching layout');
    console.log(error);
    page = null;
  }
  if (page) {
    props = {
      page,
      dictionary: await client.getDictionary({
        site: page.siteName,
        locale: page.locale,
      }),
      componentProps: await client.getComponentData(page.layout, context, components),
    };
  } else if (isHomePath(path)) {
    props = { journeyHome: true };
  } else if (isListingPath(path)) {
    props = { journeyListing: true, journeyPath: path };
  } else if (isPdpPath(path)) {
    props = { journeyPdp: true, journeyPath: path };
  } else if (isBoardPath(path)) {
    props = { journeyBoard: true, journeyPath: path };
  } else if (isMenPath(path)) {
    props = { journeyMen: true };
  } else if (isArticlePath(path)) {
    props = { journeyArticle: true, journeyPath: path };
  } else if (isAccessibilityPath(path)) {
    props = { journeyAccessibility: true };
  }
  return {
    props,
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5, // In seconds
    notFound:
      !page &&
      !isHomePath(path) &&
      !isListingPath(path) &&
      !isPdpPath(path) &&
      !isBoardPath(path) &&
      !isMenPath(path) &&
      !isArticlePath(path) &&
      !isAccessibilityPath(path),
  };
};

export default SitecorePage;
