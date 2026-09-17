'use client';

import { JSX } from 'react';
import { Field, ImageField, Image, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { BRAND, IMG } from '@/lib/openhand-catalog';
import { parseDemoParams, withDemoParams } from '@/lib/demo-params';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Fields = {
  Title?: Field<string>;
  Description?: Field<string>;
  Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const demo = parseDemoParams(router.asPath);
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const give = demo.audience === 'give';
  const src = (fields.Image?.value as { src?: string } | undefined)?.src;
  const banner = src || (give ? IMG.appealWinter : IMG.heroGive);
  const title = give
    ? 'Keep the heating on this winter'
    : 'Crisis support here. Emergency appeals worldwide.';
  const lede = give
    ? 'Match your gift this month. Partners in Leeds, Birmingham and Cardiff are already taking energy and rent cases today.'
    : 'Get help with bills, rent and food near you — or give so the next person through the door is not turned away.';

  return (
    <section
      className="oh-hero"
      style={{
        backgroundImage: `linear-gradient(to top, rgb(22 50 79 / 0.88), rgb(22 50 79 / 0.28)), url("${banner}")`,
      }}
    >
      {(src || isEditing) && <Image field={fields.Image} className="oh-hero__img" />}
      {!src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="oh-hero__img" src={banner} alt="" />
      )}
      <div className="oh-wrap oh-hero__copy">
        <p className="oh-kicker">{give ? 'Give' : 'Get help'}</p>
        <h1>{fields.Title?.value && !give ? <Text field={fields.Title} /> : title}</h1>
        <p>{fields.Description?.value && !give ? <Text field={fields.Description} /> : lede}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            className="oh-btn oh-btn--amber"
            href={withDemoParams(give ? '/donate' : '/get-help', demo)}
          >
            {give ? 'Donate now' : 'Find help'}
          </Link>
          <Link
            className="oh-btn oh-btn--ghost"
            href={withDemoParams(give ? '/appeals/winter' : '/donate', demo)}
          >
            {give ? 'Winter appeal' : 'Give instead'}
          </Link>
        </div>
        <p className="mt-4 text-sm opacity-80">{BRAND.tagline}</p>
      </div>
    </section>
  );
};

export default Default;
