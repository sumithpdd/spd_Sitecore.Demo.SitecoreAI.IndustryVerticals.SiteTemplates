'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITORIAL } from '@/lib/asos-journey';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = {
  Title?: TextField;
  WomenLabel?: TextField;
  MenLabel?: TextField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const women = props.fields?.WomenLabel?.value || 'Women';
  const men = props.fields?.MenLabel?.value || 'Men';

  return (
    <section id={props.params?.RenderingIdentifier}>
      {props.fields?.Title?.value ? (
        <h1 className="sr-only">
          <Text field={props.fields.Title} />
        </h1>
      ) : (
        <h1 className="sr-only">ASOS | This is ASOS</h1>
      )}
      <div className="asos-split">
        <Link href={withMarket('/women', market.code)} className="asos-split__tile">
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={EDITORIAL.women} alt="" />
          <span>{women}</span>
        </Link>
        <Link href={withMarket('/women', market.code)} className="asos-split__tile">
          {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
          <img src={EDITORIAL.men} alt="" />
          <span>{men}</span>
        </Link>
      </div>
    </section>
  );
};

export default Default;
