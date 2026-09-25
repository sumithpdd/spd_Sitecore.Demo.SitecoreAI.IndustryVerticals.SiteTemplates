'use client';

import { JSX, ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

type Props = { title: string; children: ReactNode };

export const JourneyLayout = ({ title, children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header params={{}} />
      <main>{children}</main>
      <Footer params={{}} />
    </>
  );
};
