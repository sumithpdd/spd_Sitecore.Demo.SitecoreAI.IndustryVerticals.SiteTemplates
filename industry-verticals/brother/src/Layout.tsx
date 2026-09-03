/**
 * This Layout is needed for Starter Kit.
 */
import { JSX } from 'react';
import Head from 'next/head';
import { Placeholder, Field, DesignLibrary, Page } from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';
import Header from 'src/components/header/Header';
import Footer from 'src/components/footer/Footer';

interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
}

function routeHasPlaceholder(route: Page['layout']['sitecore']['route'], names: string[]): boolean {
  if (!route?.placeholders) return false;
  return names.some((name) => {
    const items = route.placeholders?.[name];
    return Array.isArray(items) && items.length > 0;
  });
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';
  const headerNames = ['headless-header', 'sxa-header', 'header'];
  const footerNames = ['headless-footer', 'sxa-footer', 'footer'];
  const showFallbackHeader = !routeHasPlaceholder(route, headerNames);
  const showFallbackFooter = !routeHasPlaceholder(route, footerNames);

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Brother UK'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
              {showFallbackHeader ? <Header /> : null}
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
              {showFallbackFooter ? <Footer /> : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
