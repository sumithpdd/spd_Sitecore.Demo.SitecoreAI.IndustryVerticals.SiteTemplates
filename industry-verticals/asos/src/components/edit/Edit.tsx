'use client';

import { JSX } from 'react';
import { Field, ImageField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EDITS } from '@/lib/asos-journey';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = {
  Heading?: TextField;
  Tile1Kicker?: TextField;
  Tile1Title?: TextField;
  Tile1Body?: TextField;
  Tile1Href?: Field<string>;
  Tile1Image?: ImageField;
  Tile2Kicker?: TextField;
  Tile2Title?: TextField;
  Tile2Body?: TextField;
  Tile2Href?: Field<string>;
  Tile2Image?: ImageField;
  Tile3Kicker?: TextField;
  Tile3Title?: TextField;
  Tile3Body?: TextField;
  Tile3Href?: Field<string>;
  Tile3Image?: ImageField;
};
type Props = ComponentProps & { fields?: Fields };

type Tile = {
  key: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  image: string;
};

function textOf(field?: TextField | Field<string>): string {
  const value = field?.value;
  return typeof value === 'string' ? value : '';
}

function imageOf(field?: ImageField): string {
  const value = field?.value;
  if (!value || typeof value === 'string') return '';
  return (value as { src?: string }).src || '';
}

function tilesFromFields(fields?: Fields): Tile[] | null {
  const tiles = ([1, 2, 3] as const).map((index) => ({
    key: `tile-${index}`,
    kicker: textOf(fields?.[`Tile${index}Kicker`]),
    title: textOf(fields?.[`Tile${index}Title`]),
    body: textOf(fields?.[`Tile${index}Body`]),
    href: textOf(fields?.[`Tile${index}Href`]),
    image: imageOf(fields?.[`Tile${index}Image`]),
  }));
  return tiles.some((tile) => tile.title) ? tiles : null;
}

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const authored = tilesFromFields(props.fields);
  const tiles =
    authored ||
    EDITS.slice(0, 3).map((edit) => ({
      key: edit.slug,
      kicker: edit.kicker,
      title: edit.title,
      body: edit.body,
      href: edit.href,
      image: edit.image,
    }));

  return (
    <section className="asos-wrap py-10" id={props.params?.RenderingIdentifier}>
      {props.fields?.Heading?.value ? (
        <h2 className="mb-6 text-2xl font-black">
          <Text field={props.fields.Heading} />
        </h2>
      ) : null}
      <div className="grid gap-4 md:grid-cols-3">
        {tiles.map((edit) => (
          <Link key={edit.key} href={withMarket(edit.href, market.code)} className="asos-tile">
            {/* eslint-disable-next-line @next/next/no-img-element -- DAM or editorial still */}
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
