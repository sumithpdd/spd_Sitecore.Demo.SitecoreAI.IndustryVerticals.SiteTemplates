'use client';

import { JSX, useMemo } from 'react';
import { Link as ContentSdkLink, Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asItems, asLinkField, fieldString, linkHref } from '@/lib/sitecore-fields';
import { getPersonBySlug } from '@/lib/people-catalog';
import Link from 'next/link';

type InsightCard = {
  id: string;
  kicker: string;
  title: string;
  date: string;
  href: string;
  fields?: Record<string, unknown>;
};

type PersonFields = {
  Title?: TextField;
  InsightItems?: unknown;
};

type Props = ComponentProps & { fields?: PersonFields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as PersonFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getPersonBySlug(slug);
  const name = fieldString(fields.Title) || catalog?.name || '';
  const id = props.params?.RenderingIdentifier;

  const cards: InsightCard[] = useMemo(() => {
    const items = asItems(fields.InsightItems);
    if (items.length > 0) {
      return items.map((item, index) => ({
        id: item.id || String(index),
        kicker: fieldString(item.fields?.Kicker) || 'OUT-LAW',
        title: fieldString(item.fields?.Title),
        date: fieldString(item.fields?.PublishedDate) || fieldString(item.fields?.Date),
        href: item.url || linkHref(item.fields?.Link, '/out-law'),
        fields: item.fields,
      }));
    }
    return (catalog?.insights || []).map((item, index) => ({
      id: item.href || String(index),
      kicker: item.kicker || 'OUT-LAW',
      title: item.title,
      date: item.date || '',
      href: item.href,
    }));
  }, [catalog?.insights, fields.InsightItems]);

  if (cards.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-insights" id={id}>
      <div className="pm-wrap">
        <h2>
          Out-Law / <span>Insight by {name || 'this author'}</span>
        </h2>
        {cards.length > 0 ? (
          <ul className="pm-insights__grid">
            {cards.map((card) => {
              const href = card.fields?.Link ? linkHref(card.fields.Link, card.href) : card.href;
              const inner = (
                <>
                  <p className="pm-insights__kicker">
                    {card.fields?.Kicker ? (
                      <Text field={card.fields.Kicker as TextField} />
                    ) : (
                      card.kicker
                    )}
                  </p>
                  <h3>
                    {card.fields?.Title ? (
                      <Text field={card.fields.Title as TextField} />
                    ) : (
                      card.title
                    )}
                  </h3>
                  {card.date ? (
                    <time>
                      {card.fields?.PublishedDate ? (
                        <Text field={card.fields.PublishedDate as TextField} />
                      ) : card.fields?.Date ? (
                        <Text field={card.fields.Date as TextField} />
                      ) : (
                        card.date
                      )}
                    </time>
                  ) : null}
                </>
              );
              const link = asLinkField(card.fields?.Link);
              return (
                <li key={card.id}>
                  <article className="pm-insights__card">
                    {link && (link.value?.href || isEditing) ? (
                      <ContentSdkLink field={link} className="pm-insights__link">
                        {inner}
                      </ContentSdkLink>
                    ) : (
                      <Link className="pm-insights__link" href={href}>
                        {inner}
                      </Link>
                    )}
                  </article>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
