/**
 * This Layout is needed for Starter Kit.
 */
import React, { JSX } from 'react';
import Head from 'next/head';
import {
  Placeholder,
  Field,
  Page,
  ImageField,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import Scripts from 'src/Scripts';
import SitecoreStyles from 'src/components/content-sdk/SitecoreStyles';
import Header from 'src/components/header/Header';
import Footer from 'src/components/footer/Footer';
import { Default as GlobalBanner } from 'src/components/global-banner/GlobalBanner';
import { DesignLibraryLayout } from './DesignLibraryLayout';

interface LayoutProps {
  page: Page;
}

interface RouteFields {
  [key: string]: unknown;
  Title?: Field;
  metadataTitle?: Field;
  metadataKeywords?: Field;
  metadataDescription?: Field;
  pageSummary?: Field;
  ogImage?: ImageField;
}

function chromeIsFilled(items: unknown): boolean {
  if (!Array.isArray(items) || items.length === 0) return false;
  return items.some((item) => {
    const rendering = item as {
      componentName?: string;
      placeholders?: Record<string, unknown>;
    };
    if (!rendering?.componentName) return false;
    if (rendering.componentName !== 'PartialDesignDynamicPlaceholder') return true;
    const nested = rendering.placeholders || {};
    return Object.values(nested).some((child) => Array.isArray(child) && child.length > 0);
  });
}

function treeHasComponent(items: unknown, componentName: string): boolean {
  if (!Array.isArray(items)) return false;
  return items.some((item) => {
    if (!item || typeof item !== 'object') return false;
    const rendering = item as { componentName?: string; placeholders?: Record<string, unknown> };
    if (rendering.componentName === componentName) return true;
    const nested = rendering.placeholders;
    if (!nested) return false;
    return Object.values(nested).some((child) => treeHasComponent(child, componentName));
  });
}

function layoutHasBanner(route: Page['layout']['sitecore']['route']): boolean {
  if (!route?.placeholders) return false;
  return Object.values(route.placeholders).some((items) => treeHasComponent(items, 'GlobalBanner'));
}

function filledPlaceholders(route: Page['layout']['sitecore']['route'], names: string[]): string[] {
  if (!route?.placeholders) return [];
  return names.filter((name) => chromeIsFilled(route.placeholders?.[name]));
}

function fallbackChromeProps(componentName: string) {
  const rendering: ComponentRendering = {
    uid: `asos-fallback-${componentName}`,
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
  const showFallbackBanner = !layoutHasBanner(route);

  const metaDescription =
    fields?.metadataDescription?.value?.toString() || fields?.pageSummary?.value?.toString() || '';
  const metaKeywords = fields?.metadataKeywords?.value?.toString() || '';
  const ogTitle = fields?.metadataTitle?.value?.toString() || 'Page';
  const ogImage = fields?.ogImage?.value?.src;
  const ogDescription =
    fields?.metadataDescription?.value?.toString() || fields?.pageSummary?.value?.toString() || '';

  return (
    <>
      <Scripts />
      <SitecoreStyles layoutData={layout} />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href="/favicon.ico" />
        {metaDescription && <meta name="description" content={metaDescription} />}
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        <link rel="icon" href="/favicon.ico" />
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && <meta property="og:description " content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
      </Head>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          <DesignLibraryLayout />
        ) : (
          <>
            <div id="header" className="relative z-50">
              {showFallbackBanner ? (
                <GlobalBanner {...fallbackChromeProps('GlobalBanner')} />
              ) : null}
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
