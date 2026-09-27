'use client';

import { JSX, ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/header/Header';
import Subscribe from '@/components/subscribe/Subscribe';
import Footer from '@/components/footer/Footer';
import AppFrame from '@/components/app-frame/AppFrame';
import { journeyProps } from '@/lib/component-props';

type Props = { title: string; children: ReactNode; framed?: boolean };

export const JourneyLayout = ({ title, children, framed = true }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <AppFrame disabled={!framed}>
        <div id="header" className="relative z-50 w-full">
          <Header {...journeyProps} />
        </div>
        <main>
          <div id="content" className="w-full">
            {children}
          </div>
        </main>
        <div id="footer" className="relative z-10 w-full">
          <Subscribe {...journeyProps} />
          <Footer {...journeyProps} />
        </div>
      </AppFrame>
    </>
  );
};
