'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { EDITS } from '@/lib/asos-journey';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

export const Default = (props: ComponentProps): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h2 className="mb-4 text-xl font-bold">New edits</h2>
      <div className="grid gap-4 md:grid-cols-4">
        {EDITS.map((edit) => (
          <Link key={edit.slug} href={withMarket(edit.href, market.code)} className="bg-[#f6f6f6] p-4">
            <p className="text-xs uppercase">{edit.kicker}</p>
            <h3 className="text-lg font-bold">{edit.title}</h3>
            <p className="mt-2 text-sm">{edit.body}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Default;
