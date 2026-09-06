/**
 * This Layout is needed for Starter Kit.
 */
import { JSX } from 'react';
import Head from 'next/head';
import {
  Placeholder,
  Field,
  DesignLibrary,
  Page,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
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

/**
 * Placeholder keys that actually carry components. Empty keys are skipped so we never
 * render both an empty chrome placeholder (which Pages shows as a tall drop zone) and
 * the fallback Header/Footer below it.
 */
function filledPlaceholders(route: Page['layout']['sitecore']['route'], names: string[]): string[] {
  if (!route?.placeholders) return [];
  return names.filter((name) => {
    const items = route.placeholders?.[name];
    return Array.isArray(items) && items.length > 0;
  });
}

function fallbackChromeProps(componentName: string) {
  const rendering: ComponentRendering = {
    uid: `brother-fallback-${componentName}`,
    componentName,
    dataSource: '',
    fields: {},
    params: {},
  };
  return { rendering, params: {}, fields: {} };
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const fields = route?.fields as RouteFields;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';
  const headerPlaceholders = filledPlaceholders(route, ['headless-header', 'sxa-header', 'header']);
  const footerPlaceholders = filledPlaceholders(route, ['headless-footer', 'sxa-footer', 'footer']);
  const showFallbackHeader = headerPlaceholders.length === 0;
  const showFallbackFooter = footerPlaceholders.length === 0;

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
                headerPlaceholders.map((name) => (
                  <Placeholder key={name} name={name} rendering={route} />
                ))}
              {showFallbackHeader ? <Header {...fallbackChromeProps('Header')} /> : null}
            </div>
            <main>
              <div id="content">
                {route && <Placeholder name="headless-main" rendering={route} />}
              </div>
            </main>
            <div id="footer" className="relative z-10">
              {route &&
                footerPlaceholders.map((name) => (
                  <Placeholder key={name} name={name} rendering={route} />
                ))}
              {showFallbackFooter ? <Footer {...fallbackChromeProps('Footer')} /> : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
