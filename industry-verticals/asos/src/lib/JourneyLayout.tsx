'use client';

import { JSX, ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { journeyProps } from '@/lib/component-props';

type Props = { title: string; children: ReactNode };

export const JourneyLayout = ({ title, children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div id="header" className="relative z-50 w-full">
        <Header {...journeyProps} />
      </div>
      <main>
        <div id="content" className="w-full">
          {children}
        </div>
      </main>
      <div id="footer" className="relative z-10 w-full">
        <Footer {...journeyProps} />
      </div>
    </>
  );
};
