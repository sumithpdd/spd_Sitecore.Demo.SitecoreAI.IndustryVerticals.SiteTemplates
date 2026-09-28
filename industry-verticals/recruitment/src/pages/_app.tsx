import { JSX } from 'react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { I18nProvider } from 'next-localization';
import Bootstrap from 'src/Bootstrap';
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import 'assets/main.css';

const AiChatbot = dynamic(() => import('@/components/ai-chatbot/AiChatbot'), { ssr: false });

const CdpProfileShell = dynamic(() => import('@/components/cdp-profile-panel/CdpProfileShell'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <Bootstrap {...pageProps} />
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
