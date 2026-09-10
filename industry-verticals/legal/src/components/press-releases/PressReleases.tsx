import { JSX } from 'react';
import { Text, Link as ContentSdkLink, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { PRESS_RELEASES } from '@/lib/home-catalog';
import {
  asItems,
  asLinkField,
  asTextField,
  fieldString,
  linkHref,
  linkText,
} from '@/lib/sitecore-fields';
import Link from 'next/link';
import { FileText } from 'lucide-react';

type Fields = {
  Eyebrow?: unknown;
  Heading?: unknown;
  MoreLink?: unknown;
  Items?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const items = asItems(fields.Items);
  const more = asLinkField(fields.MoreLink);

  return (
    <section className="pm-press" id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-section-kicker">
          <FileText className="pm-section-kicker__icon" aria-hidden="true" />
          <Text field={asTextField(fields.Eyebrow)} />
          {!fieldString(fields.Eyebrow) && 'Press releases'}
        </p>
        <h2 className="pm-press__lede">
          <Text field={asTextField(fields.Heading)} />
          {!fieldString(fields.Heading) && 'Latest press releases'}
        </h2>
        <ul className="pm-press__cards">
          {items.length > 0
            ? items.map((item, index) => {
                const href = linkHref(item.fields?.Link, '/about-us/announcements');
                const link = asLinkField(item.fields?.Link);
                const card = (
                  <>
                    <time>
                      <Text field={asTextField(item.fields?.Date)} />
                    </time>
                    <span className="pm-press__title">
                      <Text field={asTextField(item.fields?.Title)} />
                    </span>
                    {fieldString(item.fields?.ReadTime).trim() ? (
                      <span className="pm-press__meta">
                        <Text field={asTextField(item.fields?.ReadTime)} />
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <li key={item.id || index}>
                    {link && (link.value?.href || isEditing) ? (
                      <ContentSdkLink field={link} className="pm-press__card">
                        {card}
                      </ContentSdkLink>
                    ) : (
                      <Link className="pm-press__card" href={href}>
                        {card}
                      </Link>
                    )}
                  </li>
                );
              })
            : PRESS_RELEASES.map((item) => (
                <li key={item.title}>
                  <Link className="pm-press__card" href={item.href}>
                    <time>{item.date}</time>
                    <span className="pm-press__title">{item.title}</span>
                    {item.meta && <span className="pm-press__meta">{item.meta}</span>}
                  </Link>
                </li>
              ))}
        </ul>
        {more && (more.value?.href || isEditing) ? (
          <ContentSdkLink field={more} className="pm-btn-outline" />
        ) : (
          <Link className="pm-btn-outline" href="/about-us/announcements">
            {linkText(fields.MoreLink, 'Explore all')}
          </Link>
        )}
      </div>
    </section>
  );
};

export default Default;
