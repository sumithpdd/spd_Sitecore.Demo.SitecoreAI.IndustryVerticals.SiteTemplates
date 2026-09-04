import dynamic from 'next/dynamic';
import { JSX } from 'react';
import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import Bootstrap from 'src/Bootstrap';
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import 'assets/globals.css';
import 'assets/components/cdp-profile-panel.css';
import 'assets/components/ai-chatbot.css';

const CdpProfileShell = dynamic(() => import('components/cdp-profile-panel/CdpProfileShell'), {
  ssr: false,
});

const AiChatbot = dynamic(() => import('components/ai-chatbot/AiChatbot'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <Bootstrap {...pageProps} />
      {/*
        // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
        // Note Next.js does not (currently) provide anything for translation, only i18n routing.
        // If your app is not multilingual, next-localization and references to it can be removed.
      */}
      <I18nProvider
        lngDict={dictionary}
        locale={pageProps.page?.locale || scConfig.defaultLanguage}
      >
        <Component {...rest} />
        <AiChatbot />
        <CdpProfileShell />
      </I18nProvider>
    </>
  );
}

export default App;
