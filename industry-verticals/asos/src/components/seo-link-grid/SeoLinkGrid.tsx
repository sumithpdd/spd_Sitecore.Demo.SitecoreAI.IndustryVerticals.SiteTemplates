'use client';

import { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = {
  Heading?: TextField;
  Links?: TextField;
};

const FALLBACK_LINKS = [
  'New in|/women/new-in',
  'Denim|/women/denim',
  'Wide-leg jeans|/edits/the-denim-drop',
  'Petite denim|/petite-denim',
  'Topshop|/women/topshop',
  'Selling fast|/women/selling-fast',
  'New season edit|/women/new-season-edit',
  'Chocolate|/edits/chocolate',
  'Polka dot|/edits/polka-dot',
  'Festival|/edits/festival-2-0',
  'Style Feed|/style-feed',
  'Search denim|/search?q=denim',
].join('\n');

function parseLinks(value: string): { label: string; href: string }[] {
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href] = line.split('|');
      return { label: (label || '').trim(), href: (href || '/').trim() };
    })
    .filter((link) => link.label);
}

export const Default = (props: ComponentProps & { fields?: Fields }): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const raw =
    typeof props.fields?.Links?.value === 'string' && props.fields.Links.value.trim()
      ? props.fields.Links.value
      : FALLBACK_LINKS;
  const links = parseLinks(raw);

  return (
    <section className="asos-wrap asos-seo" id={props.params?.RenderingIdentifier}>
      <h2>
        {props.fields?.Heading?.value ? <Text field={props.fields.Heading} /> : 'Shop by edit'}
      </h2>
      <ul>
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link href={withMarket(link.href, market.code)}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Default;
