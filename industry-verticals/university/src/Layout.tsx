/**
 * This Layout is needed for Starter Kit.
 */
import { JSX } from 'react';
import Head from 'next/head';
import { Placeholder, Field, DesignLibrary, Page } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';
import { FallbackFooter, FallbackHeader, routeHasChrome } from 'src/lib/layout-chrome';

interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';
  const headerNames = ['headless-header', 'sxa-header', 'header'];
  const footerNames = ['headless-footer', 'sxa-footer', 'footer'];
  const showFallbackHeader = !routeHasChrome(route, headerNames);
  const showFallbackFooter = !routeHasChrome(route, footerNames);

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          <DesignLibrary />
        ) : (
          <>
            <div id="header" className="relative z-50">
              {route &&
                headerNames
                  .filter((name) => route.placeholders && name in route.placeholders)
                  .map((name) => <Placeholder key={name} name={name} rendering={route} />)}
              {showFallbackHeader ? <FallbackHeader /> : null}
            </div>
            <main>
              <div id="content">
                {route && <Placeholder name="headless-main" rendering={route} />}
              </div>
            </main>
            <div id="footer" className="relative z-10">
              {route &&
                footerNames
                  .filter((name) => route.placeholders && name in route.placeholders)
                  .map((name) => <Placeholder key={name} name={name} rendering={route} />)}
              {showFallbackFooter ? <FallbackFooter /> : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
