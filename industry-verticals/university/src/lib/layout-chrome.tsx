import { JSX } from 'react';
import { ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { Default as Header } from 'src/components/header/Header';
import { Default as Navigation } from 'src/components/navigation/Navigation';
import { Default as Footer } from 'src/components/footer/Footer';

type PlaceholderMap = Record<string, ComponentRendering[] | undefined>;

type RouteLike = {
  placeholders?: PlaceholderMap;
};

const emptyRendering = (componentName: string): ComponentRendering => ({
  uid: `university-fallback-${componentName}`,
  componentName,
  dataSource: '',
  fields: {},
  params: {},
});

const emptyProps = (componentName: string) => ({
  rendering: emptyRendering(componentName),
  params: {},
  fields: {},
});

function placeholderHasComponents(items: ComponentRendering[] | undefined): boolean {
  if (!Array.isArray(items) || items.length === 0) {
    return false;
  }

  return items.some((item) => {
    if (item.componentName === 'PartialDesignDynamicPlaceholder') {
      const nested = (item.placeholders || {}) as PlaceholderMap;
      return Object.values(nested).some((child) => placeholderHasComponents(child));
    }
    return Boolean(item.componentName);
  });
}

export function routeHasChrome(route: RouteLike | null | undefined, names: string[]): boolean {
  if (!route?.placeholders) {
    return false;
  }
  return names.some((name) => placeholderHasComponents(route.placeholders?.[name]));
}

export function FallbackHeader(): JSX.Element {
  return (
    <>
      <Header {...emptyProps('Header')} />
      <Navigation {...emptyProps('Navigation')} />
    </>
  );
}

export function FallbackFooter(): JSX.Element {
  return <Footer {...emptyProps('Footer')} />;
}
