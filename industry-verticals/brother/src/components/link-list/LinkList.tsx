'use client';

import { JSX } from 'react';
import { Field, LinkField, Text, Link, useSitecore } from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import { ComponentProps } from 'lib/component-props';
import { findPageByPath } from 'lib/page-catalog';
import { fieldText, linkHref, linkText, listItems } from 'lib/cms-fields';

type Fields = {
  Title?: Field<string>;
  Links?: unknown;
  LinkOne?: LinkField;
  LinkTwo?: LinkField;
  LinkThree?: LinkField;
  LinkFour?: LinkField;
};

type Props = ComponentProps & { fields?: Fields };

type LinkItem = { label: string; href: string; field?: LinkField };

/** Link list for hubs / MPS — CMS links or page-catalog fallbacks. */
export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const catalog = findPageByPath(router.asPath || '');

  const fromList = listItems(f.Links).map((item) => {
    const link = item.fields?.Link as LinkField | undefined;
    return {
      label: fieldText(
        item.fields?.Title as Field<string>,
        item.displayName || item.name || 'Link'
      ),
      href: linkHref(link, item.url || '#'),
      field: link,
    };
  });

  const fromSlots: LinkItem[] = [f.LinkOne, f.LinkTwo, f.LinkThree, f.LinkFour]
    .filter(Boolean)
    .map((link) => ({
      label: linkText(link as LinkField, 'Link'),
      href: linkHref(link as LinkField, '#'),
      field: link as LinkField,
    }));

  const links: LinkItem[] =
    fromList.length > 0
      ? fromList
      : fromSlots.length > 0
        ? fromSlots
        : (catalog?.links || []).map((l) => ({ label: l.label, href: l.href }));

  const title = fieldText(f.Title, 'Explore');

  if (!links.length && !isEditing) return <></>;

  return (
    <section className="brother-link-list">
      <div className="brother-container">
        {f.Title?.value || isEditing ? <Text field={f.Title} tag="h2" /> : <h2>{title}</h2>}
        <ul>
          {links.map((item, i) => (
            <li key={`${item.href}-${i}`}>
              {item.field && (item.field.value?.href || isEditing) ? (
                <Link field={item.field} />
              ) : (
                <a href={item.href}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
