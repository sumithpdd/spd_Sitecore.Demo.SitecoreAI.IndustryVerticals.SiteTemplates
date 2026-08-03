import dynamic from 'next/dynamic';
import { JSX } from 'react';
import type { AppProps } from 'next/app';
import { I18nProvider } from 'next-localization';
import Bootstrap from 'src/Bootstrap';
import { SitecorePageProps } from '@sitecore-content-sdk/nextjs';
import { DemoAuthShell } from '@/components/demo/DemoAuthShell';
import scConfig from 'sitecore.config';
import 'src/assets/globals.css';

const CdpProfileShell = dynamic(() => import('@/components/cdp-profile-panel/CdpProfileShell'), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const { dictionary, ...rest } = pageProps;

  return (
    <>
      <Bootstrap {...pageProps} />
      <DemoAuthShell>
        <I18nProvider
          lngDict={dictionary}
          locale={pageProps.page?.locale || scConfig.defaultLanguage}
        >
          <Component {...rest} />
          <CdpProfileShell />
        </I18nProvider>
      </DemoAuthShell>
    </>
  );
}

export default App;
