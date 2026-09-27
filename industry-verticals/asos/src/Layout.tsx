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
import Subscribe from 'src/components/subscribe/Subscribe';
import StyleFeed from 'src/components/style-feed/StyleFeed';
import { Default as GlobalBanner } from 'src/components/global-banner/GlobalBanner';
import AppFrame from 'src/components/app-frame/AppFrame';
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

function omitNamed(items: unknown, componentName: string): ComponentRendering[] {
  if (!Array.isArray(items)) return [];
  return items.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const rendering = item as ComponentRendering & { placeholders?: Record<string, unknown> };
    if (rendering.componentName === componentName) return [];
    if (!rendering.placeholders) return [rendering];
    const placeholders: Record<string, ComponentRendering[]> = {};
    Object.entries(rendering.placeholders).forEach(([key, value]) => {
      placeholders[key] = omitNamed(value, componentName);
    });
    return [{ ...rendering, placeholders }];
  });
}

const HOME_ITEM = '41ee7ce2a19d4854883c4b1cc8fb50fb';

function isHomeItem(route: Page['layout']['sitecore']['route']): boolean {
  const id = String(route?.itemId || '')
    .replace(/[{}-]/g, '')
    .toLowerCase();
  return id === HOME_ITEM;
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
  const routeHasSubscribe = route?.placeholders
    ? Object.values(route.placeholders).some((items) => treeHasComponent(items, 'Subscribe'))
    : false;
  const showHomeBanner =
    isHomeItem(route) && !treeHasComponent(route?.placeholders?.['headless-main'], 'GlobalBanner');
  const showStyleFeed =
    isHomeItem(route) && !treeHasComponent(route?.placeholders?.['headless-main'], 'StyleFeed');
  const isProductPage = route?.placeholders
    ? Object.values(route.placeholders).some((items) => treeHasComponent(items, 'ProductPage'))
    : false;
  const headerRendering =
    route && route.placeholders
      ? {
          ...route,
          placeholders: {
            ...route.placeholders,
            'headless-header': omitNamed(route.placeholders['headless-header'], 'GlobalBanner'),
            'sxa-header': omitNamed(route.placeholders['sxa-header'], 'GlobalBanner'),
            header: omitNamed(route.placeholders.header, 'GlobalBanner'),
          },
        }
      : route;

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
          <AppFrame disabled={mode.isEditing || isProductPage}>
            <div id="header" className="relative z-50">
              {route &&
                headerPlaceholders.map((name) => (
                  <Placeholder key={name} name={name} rendering={headerRendering || route} />
                ))}
              {showFallbackHeader ? <Header {...fallbackChromeProps('Header')} /> : null}
            </div>
            <main>
              <div id="content">
                {showHomeBanner ? <GlobalBanner {...fallbackChromeProps('GlobalBanner')} /> : null}
                {route && <Placeholder name="headless-main" rendering={route} />}
                {showStyleFeed ? <StyleFeed {...fallbackChromeProps('StyleFeed')} /> : null}
              </div>
            </main>
            <div id="footer" className="relative z-10">
              {!showFallbackFooter && !routeHasSubscribe ? (
                <Subscribe {...fallbackChromeProps('Subscribe')} />
              ) : null}
              {route &&
                footerPlaceholders.map((name) => (
                  <Placeholder key={name} name={name} rendering={route} />
                ))}
              {showFallbackFooter ? (
                <>
                  <Subscribe {...fallbackChromeProps('Subscribe')} />
                  <Footer {...fallbackChromeProps('Footer')} />
                </>
              ) : null}
            </div>
          </AppFrame>
        )}
      </div>
    </>
  );
};

export default Layout;
