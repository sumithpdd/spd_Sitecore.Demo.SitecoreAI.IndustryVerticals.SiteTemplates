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
  const m = (href: string) => withMarket(href, market.code);

  return (
    <footer className={`asos-footer ${styles}`.trim()}>
      <div className="asos-wrap grid gap-10 md:grid-cols-4">
        <div>
          <p className="asos-footer__title">Help & Information</p>
          <Link href={m(STORY.accountHref)}>Track order</Link>
          <Link href={m(STORY.bagHref)}>Delivery & returns</Link>
          <Link href={m(STORY.accountHref)}>My account</Link>
        </div>
        <div>
          <p className="asos-footer__title">About ASOS</p>
          <Link href={m('/')}>About us</Link>
          <Link href={m(STORY.styleFeedHref)}>ASOS magazine</Link>
          <Link href={m(STORY.insightHref)}>Curation insight</Link>
        </div>
        <div>
          <p className="asos-footer__title">More From ASOS</p>
          <Link href={m(STORY.newInHref)}>Women&apos;s New In</Link>
          <Link href={m(STORY.topshopHref)}>Topshop</Link>
          <Link href={m(STORY.myEditHref)}>My Edit</Link>
        </div>
        <div>
          <p className="asos-footer__title">Shopping from</p>
          <p className="text-white">{market.label}</p>
          {props.fields?.CopyrightText || isEditing ? (
            <Text field={props.fields?.CopyrightText} />
          ) : (
            <p className="mt-4">{market.legal}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Default;
