'use client';

import { JSX } from 'react';
import { RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE, adviceByHref } from '@/lib/openhand-catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const path = router.asPath.split('?')[0];
  const article = adviceByHref(path) || ADVICE[0];
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: { value?: string };
    Content?: { value?: string };
  };
  const title = routeFields.Title?.value || article.title;

  return (
    <article className="oh-wrap oh-advice" id={props.params?.RenderingIdentifier}>
      <p className="oh-crumb">
        <Link href="/">Home</Link> / <Link href="/get-help">Get help</Link> / {title}
      </p>
      <p className="oh-kicker">Advice · updated {article.updated}</p>
      <h1>{routeFields.Title?.value ? <Text field={routeFields.Title} /> : article.title}</h1>
      <p className="oh-muted">{article.summary}</p>
      {routeFields.Content?.value ? (
        <RichText field={routeFields.Content} />
      ) : (
        article.body.map((para) => <p key={para}>{para}</p>)
      )}
      <h2 className="mt-10 text-xl font-semibold">Related</h2>
      <ul>
        {article.related.map((href) => {
          const related = adviceByHref(href);
          return (
            <li key={href}>
              <Link href={href}>{related?.title || href}</Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default Default;
