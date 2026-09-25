'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { TRENDING_CHIPS } from '@/lib/asos-journey';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

export const Default = (props: ComponentProps): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  return (
    <div className="asos-wrap flex flex-wrap gap-2 py-3" id={props.params?.RenderingIdentifier}>
      {TRENDING_CHIPS.map((chip) => (
        <Link key={chip.label} className="asos-chip" href={withMarket(chip.href, market.code)}>
          {chip.label}
        </Link>
      ))}
    </div>
  );
};

export default Default;
