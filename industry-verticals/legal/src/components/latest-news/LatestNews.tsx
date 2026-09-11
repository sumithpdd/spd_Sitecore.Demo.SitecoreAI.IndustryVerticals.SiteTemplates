import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LATEST_NEWS } from '@/lib/home-catalog';
import { asItems, asTextField, fieldString, linkHref } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Fields = {
  Heading?: unknown;
  Items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const items = asItems(fields.Items);
  const heading = fieldString(fields.Heading) || 'Latest News';

  const rows =
    items.length > 0
      ? items.map((item, index) => ({
          id: item.id || String(index),
          time: fieldString(item.fields?.Date),
          title: fieldString(item.fields?.Title),
          href: linkHref(item.fields?.Link, '/out-law/news'),
          titleField: item.fields?.Title,
          timeField: item.fields?.Date,
        }))
      : LATEST_NEWS.map((item) => ({
          id: item.href,
          time: item.time,
          title: item.title,
          href: item.href,
          titleField: undefined,
          timeField: undefined,
        }));

  if (rows.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-latest-news" id={id}>
      <h2>
        <Text field={asTextField(fields.Heading)} />
        {!fieldString(fields.Heading) && heading}
      </h2>
      <ol>
        {rows.map((row) => (
          <li key={row.id}>
            {(row.time || row.timeField || isEditing) && (
              <p className="pm-latest-news__time">
                {row.timeField ? <Text field={asTextField(row.timeField)} /> : row.time}
              </p>
            )}
            <Link href={row.href} className="pm-latest-news__title">
              {row.titleField ? <Text field={asTextField(row.titleField)} /> : row.title}
            </Link>
          </li>
        ))}
      </ol>
      {isEditing && items.length === 0 ? <p>[LATEST NEWS]</p> : null}
    </section>
  );
};

export default Default;
