import { JSX } from 'react';
import { Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { RELATED_WORK } from '@/lib/legal-story';
import { asItems, asTextField, fieldString, itemLabel, linkHref } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Props = ComponentProps & {
  fields?: {
    Heading?: unknown;
    Eyebrow?: unknown;
    Items?: unknown;
  };
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const items = asItems(props.fields?.Items);
  const heading = asTextField(props.fields?.Heading);

  if (items.length === 0 && !isEditing && RELATED_WORK.length === 0) {
    return <></>;
  }

  return (
    <section className={`pm-related w-full ${styles}`.trim()} id={id}>
      <div className="pm-wrap py-12">
        <p className="pm-section-kicker">
          <Text field={asTextField(props.fields?.Eyebrow)} />
          {!fieldString(props.fields?.Eyebrow) && 'Related work'}
        </p>
        <h2>{heading ? <Text field={heading} /> : 'Related — service, sector, region'}</h2>
        {items.length > 0 ? (
          <ul className="pm-related__list">
            {items.map((item, index) => {
              const href = linkHref(item.fields?.Link, '/out-law');
              const title = itemLabel(item);
              return (
                <li key={item.id || index}>
                  <Link href={href}>
                    {fieldString(item.fields?.Tag) ? (
                      <span className="pm-related__tag">
                        <Text field={item.fields?.Tag as TextField} />
                      </span>
                    ) : null}
                    <h3>{title}</h3>
                    {fieldString(item.fields?.Summary) ? (
                      <p>
                        <Text field={item.fields?.Summary as TextField} />
                      </p>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="pm-related__list">
            {RELATED_WORK.map((item) => (
              <li key={item.title}>
                <Link href={item.href}>
                  <span className="pm-related__tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isEditing && items.length === 0 ? (
          <p className="pm-people__empty">Select related work items in the datasource Treelist.</p>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
