'use client';

import { JSX } from 'react';
import { Field, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { findPageByPath } from 'lib/page-catalog';
import { fieldText } from 'lib/cms-fields';

type Fields = {
  Eyebrow?: Field<string>;
  Title?: Field<string>;
  Lead?: Field<string>;
};

type Props = ComponentProps & { fields?: Fields };

/** Category / solution title band — CMS fields with page-catalog fallback. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const f: Fields = { ...routeFields, ...(props.fields || {}) };
  const catalog = findPageByPath(router.asPath || '');

  const eyebrow = fieldText(f.Eyebrow, catalog?.eyebrow || '');
  const title = fieldText(
    f.Title,
    catalog?.title || fieldText(routeFields.Title as Field<string>, 'Brother')
  );
  const lead = fieldText(f.Lead, catalog?.lead || '');

  return (
    <header className="brother-page-header">
      <div className="brother-container">
        {eyebrow || isEditing ? (
          <p className="brother-eyebrow">
            {f.Eyebrow?.value || isEditing ? <Text field={f.Eyebrow} /> : eyebrow}
          </p>
        ) : null}
        {f.Title?.value || isEditing ? <Text field={f.Title} tag="h1" /> : <h1>{title}</h1>}
        {lead || isEditing ? (
          f.Lead?.value || isEditing ? (
            <Text field={f.Lead} tag="p" className="brother-page-header__lead" />
          ) : (
            <p className="brother-page-header__lead">{lead}</p>
          )
        ) : null}
      </div>
    </header>
  );
};

export default Default;
