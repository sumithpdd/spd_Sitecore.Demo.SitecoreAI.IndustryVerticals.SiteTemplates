'use client';

import { JSX } from 'react';
import { Field, Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseMarketPath, withMarket } from '@/lib/asos-market';
import { STORY } from '@/lib/asos-journey';

type Fields = {
  CopyrightText?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const isEditing = Boolean(props.fields?.CopyrightText);
  const styles = `${props.params?.styles || ''}`.trim();

  return (
    <footer className={`asos-footer ${styles}`.trim()}>
      <div className="asos-wrap grid gap-8 md:grid-cols-3">
        <div>
          <p className="mb-2 font-bold text-white">Help & information</p>
          <Link href={withMarket(STORY.accountHref, market.code)}>My account</Link>
          <br />
          <Link href={withMarket(STORY.bagHref, market.code)}>Delivery & returns</Link>
        </div>
        <div>
          <p className="mb-2 font-bold text-white">More from ASOS</p>
          <Link href={withMarket(STORY.styleFeedHref, market.code)}>Style Feed</Link>
          <br />
          <Link href={withMarket(STORY.topshopHref, market.code)}>Topshop</Link>
        </div>
        <div>
          <p className="mb-2 font-bold text-white">{market.label}</p>
          {props.fields?.CopyrightText || isEditing ? (
            <Text field={props.fields?.CopyrightText} />
          ) : (
            <p>{market.legal}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Default;
