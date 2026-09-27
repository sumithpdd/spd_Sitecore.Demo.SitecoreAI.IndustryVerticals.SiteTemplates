'use client';

import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { parseMarketPath, withMarket } from '@/lib/asos-market';

type Fields = { Title?: TextField; Body?: RichTextField };
type Props = ComponentProps & { fields?: Fields };

const FALLBACK =
  '<p>Product photographs include a text alternative that names the garment. When the audit toggle is on, that alternative is deliberately empty so the defect can be shown.</p><p>Pages use the same heading order, visible focus, and buttons that say what they do. Size choices are buttons, not only a colour.</p><p>If something on this demo blocks you, use the account page to set body fit and size. The product page then repeats the size you kept.</p>';

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const body = props.fields?.Body?.value ? props.fields.Body : { value: FALLBACK };
  return (
    <article className="asos-wrap asos-article" id={props.params?.RenderingIdentifier}>
      <p className="asos-article__crumbs">
        <Link href={withMarket('/', market.code)}>Home</Link>
        {' / '}
        Accessibility
      </p>
      <h1>{props.fields?.Title?.value ? <Text field={props.fields.Title} /> : 'Accessibility'}</h1>
      <div className="asos-article__body">
        <RichText field={body} />
      </div>
    </article>
  );
};

export default Default;
