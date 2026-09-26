'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITS } from '@/lib/asos-journey';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = { Heading?: TextField };
type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);

  return (
    <section className="asos-wrap py-10" id={props.params?.RenderingIdentifier}>
      {props.fields?.Heading?.value ? (
        <h2 className="mb-6 text-2xl font-black">
          <Text field={props.fields.Heading} />
        </h2>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        {EDITS.slice(0, 3).map((edit) => (
          <Link key={edit.slug} href={withMarket(edit.href, market.code)} className="asos-tile">
            {/* eslint-disable-next-line @next/next/no-img-element -- local editorial still */}
            <img src={edit.image} alt="" />
            <div>
              <p className="text-xs uppercase">{edit.kicker}</p>
              <h2 className="text-2xl font-black">{edit.title}</h2>
              <p className="mt-1 text-sm">{edit.body}</p>
              <span className="asos-btn-dark mt-4 w-fit">Shop now</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Default;
