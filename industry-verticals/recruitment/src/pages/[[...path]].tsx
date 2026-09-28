import { useEffect, JSX } from 'react';
import Head from 'next/head';
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
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { extractPath, handleEditorFastRefresh } from '@sitecore-content-sdk/nextjs/utils';
import { isDesignLibraryPreviewData } from '@sitecore-content-sdk/nextjs/editing';
import client from 'lib/sitecore-client';
import components from '.sitecore/component-map';
import scConfig from 'sitecore.config';
import AspireHeader from '@/components/aspire-header/AspireHeader';
import AspireFooter from '@/components/aspire-footer/AspireFooter';
import HomeBanner from '@/components/home-banner/HomeBanner';
import AspirePromo from '@/components/aspire-promo/AspirePromo';
import JobSearch from '@/components/job-search/JobSearch';
import JobPage from '@/components/job-page/JobPage';
import ConsultantPage from '@/components/consultant-page/ConsultantPage';
import ArticlePage from '@/components/article-page/ArticlePage';
import BlogList from '@/components/blog-list/BlogList';
import ConsultantList from '@/components/consultant-list/ConsultantList';
import BranchPage from '@/components/branch-page/BranchPage';
import CandidatesPage from '@/components/candidates-page/CandidatesPage';
import EmployersPage from '@/components/employers-page/EmployersPage';
import InsightsPage from '@/components/insights-page/InsightsPage';

type PageProps = SitecorePageProps & { journey?: string };

const journeyProps = {
  rendering: { componentName: 'Journey' } as ComponentRendering,
  params: {},
};

const routeOf = (path: string): string | undefined => {
  if (path === '/' || path === '') return 'home';
  if (path === '/candidates') return 'candidates';
  if (path === '/jobs') return 'jobs';
  if (path.startsWith('/job/')) return 'job';
  if (path === '/consultants') return 'consultants';
  if (path.startsWith('/consultants/')) return 'consultant';
  if (path === '/employers') return 'employers';
  if (path === '/insights') return 'insights';
  if (path === '/blog') return 'blog';
  if (path.split('/').length >= 5 && path.startsWith('/blog/')) return 'article';
  if (path.startsWith('/branches/')) return 'branch';
  return undefined;
};

const Journey = ({ kind }: { kind: string }): JSX.Element => {
  const body = (() => {
    if (kind === 'home') {
      return (
        <>
          <HomeBanner {...journeyProps} />
          <AspirePromo {...journeyProps} />
        </>
      );
    }
    if (kind === 'candidates') return <CandidatesPage {...journeyProps} />;
    if (kind === 'jobs') return <JobSearch {...journeyProps} />;
    if (kind === 'job') return <JobPage {...journeyProps} />;
    if (kind === 'consultants') return <ConsultantList {...journeyProps} />;
    if (kind === 'consultant') return <ConsultantPage {...journeyProps} />;
    if (kind === 'employers') return <EmployersPage {...journeyProps} />;
    if (kind === 'insights') return <InsightsPage {...journeyProps} />;
    if (kind === 'blog') return <BlogList {...journeyProps} />;
    if (kind === 'article') return <ArticlePage {...journeyProps} />;
    return <BranchPage {...journeyProps} />;
  })();

  return (
    <>
      <Head>
        <title>Aspire | Achieving more together</title>
      </Head>
      <AspireHeader {...journeyProps} />
      <main>{body}</main>
      <AspireFooter {...journeyProps} />
    </>
  );
};

const SitecorePage = ({ page, notFound, componentProps, journey }: PageProps): JSX.Element => {
  useEffect(() => {
    handleEditorFastRefresh();
  }, []);

  if (journey) return <Journey kind={journey} />;

  if (notFound || !page) {
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
  const journey = routeOf(path);
  const recruitmentPage = page?.siteName === 'recruitment' ? page : null;
  if (recruitmentPage) {
    props = {
      page: recruitmentPage,
      dictionary: await client.getDictionary({
        site: recruitmentPage.siteName,
        locale: recruitmentPage.locale,
      }),
      componentProps: await client.getComponentData(recruitmentPage.layout, context, components),
    };
  } else if (journey) {
    props = { journey };
  }
  return {
    props,
    revalidate: 5,
    notFound: !recruitmentPage && !journey,
  };
};

export default SitecorePage;
