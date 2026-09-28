'use client';

import { JSX } from 'react';
import { Field, ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITS, STORY } from '@/lib/asos-journey';
import { isBroken, VIEWMODEL_LEAK } from '@/lib/asos-demo';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = {
  Kicker?: TextField;
  Title?: TextField;
  Body?: TextField;
  ButtonLabel?: TextField;
  Href?: Field<string>;
  Image?: ImageField;
};

type Props = ComponentProps & { fields?: Fields };

function textOf(field?: TextField | Field<string>): string {
  const value = field?.value;
  return typeof value === 'string' ? value : '';
}

function imageOf(field?: ImageField): string {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
}

/** Full-bleed promo. Same rendering on Home and Women. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const broken = isBroken(router.asPath);
  const kicker = textOf(props.fields?.Kicker) || 'New edit';
  const title = textOf(props.fields?.Title) || 'Wide-leg jeans under £50';
  const body =
    textOf(props.fields?.Body) ||
    'The denim edit. Filter by body fit, then the mid-wash jean with the size she actually wears.';
  const button = textOf(props.fields?.ButtonLabel) || 'Shop the denim edit';
  const href = textOf(props.fields?.Href) || STORY.denimDropHref;
  const image = imageOf(props.fields?.Image) || EDITS[0].image;

  return (
    <section className="asos-wrap mb-10" id={props.params?.RenderingIdentifier}>
      <div className="asos-hero">
        {/* eslint-disable-next-line @next/next/no-img-element -- DAM or public still */}
        <img src={image} alt="" />
        <div className="asos-hero__copy">
          <p className="text-xs tracking-wide uppercase">
            {props.fields?.Kicker ? <Text field={props.fields.Kicker} /> : kicker}
          </p>
          <h2 className="text-4xl font-black">
            {props.fields?.Title ? <Text field={props.fields.Title} /> : title}
          </h2>
          <p className="mt-2 max-w-md text-sm">
            {props.fields?.Body ? <Text field={props.fields.Body} /> : body}
          </p>
          <Link className="asos-btn-dark mt-4 w-fit" href={withMarket(href, market.code)}>
            {broken ? VIEWMODEL_LEAK : button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Default;
