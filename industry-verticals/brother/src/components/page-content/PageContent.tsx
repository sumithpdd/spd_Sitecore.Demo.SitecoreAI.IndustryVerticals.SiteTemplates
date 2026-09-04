'use client';

import { JSX } from 'react';
import { RichTextField, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { findPageByPath } from 'lib/page-catalog';

type Fields = {
  Content?: RichTextField;
  Text?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

/** Page body rich text — route Content, datasource, or page-catalog HTML. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeContent = page?.layout?.sitecore?.route?.fields?.Content as RichTextField | undefined;
  const field = props.fields?.Content || props.fields?.Text || routeContent;
  const catalog = findPageByPath(router.asPath || '');

  return (
    <section className="brother-page-content">
      <div className="brother-container">
        {field?.value || isEditing ? (
          <RichText field={field} className="brother-page-content__body" />
        ) : catalog?.bodyHtml ? (
          <div
            className="brother-page-content__body"
            dangerouslySetInnerHTML={{ __html: catalog.bodyHtml }}
          />
        ) : isEditing ? (
          <p>[Page content]</p>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
