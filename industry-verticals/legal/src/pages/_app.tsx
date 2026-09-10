import { JSX, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import Bootstrap from 'src/Bootstrap';
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import 'assets/main.css';
import { Environment, PageController, WidgetsProvider } from '@sitecore-search/react';

const SEARCH_CONFIG = {
  env: process.env.NEXT_PUBLIC_SEARCH_ENV,
  customerKey: process.env.NEXT_PUBLIC_SEARCH_CUSTOMER_KEY,
  apiKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
};

const searchConfigured = Boolean(SEARCH_CONFIG.customerKey && SEARCH_CONFIG.apiKey);

function SearchShell({ locale, children }: { locale: string; children: ReactNode }): JSX.Element {
  if (!searchConfigured) {
    return <>{children}</>;
  }

  const lang = locale || scConfig.defaultLanguage;
  PageController.getContext().setLocaleLanguage(lang.split('-')[0]);
  if (lang === 'en') {
    PageController.getContext().setLocaleCountry('us');
  } else {
    PageController.getContext().setLocaleCountry(lang.split('-')[1].toLocaleLowerCase());
  }

  return (
    <WidgetsProvider
      env={SEARCH_CONFIG.env as Environment}
      customerKey={SEARCH_CONFIG.customerKey}
      apiKey={SEARCH_CONFIG.apiKey}
      publicSuffix={true}
    >
      {children}
    </WidgetsProvider>
  );
}

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;
  const locale = pageProps.page?.locale || scConfig.defaultLanguage;

  return (
    <>
      <Bootstrap {...pageProps} />
      <I18nProvider lngDict={dictionary} locale={locale}>
        <SearchShell locale={locale}>
          <Component {...rest} />
        </SearchShell>
      </I18nProvider>
    </>
  );
}

export default App;
