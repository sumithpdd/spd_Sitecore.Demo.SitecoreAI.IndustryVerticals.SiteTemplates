'use client';

import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asItems, asTextField, fieldString } from '@/lib/sitecore-fields';
import { listedArticlesFromItems } from '@/lib/cms-listing';
import { CASE_STUDIES } from '@/lib/story-catalog';
import { matchesPreferredRegion, useDemoAuth } from '@/lib/demo-auth';
import Link from 'next/link';

type Props = ComponentProps & {
  fields?: { Heading?: unknown; Intro?: unknown; Items?: unknown; items?: unknown };
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const { preferences } = useDemoAuth();
  const cms = listedArticlesFromItems(
    asItems(fields.Items || fields.items),
    '/about-us/expertise-in-action'
  );
  const cards = (
    cms.length > 0
      ? cms.map((item) => ({
          href: item.url,
          title: item.title,
          body: item.summary,
          kicker: item.kicker || item.regions[0] || 'Case study',
          industry: item.sectors[0] || 'Case study',
          regions: item.regions,
          metric: item.readTime,
        }))
      : CASE_STUDIES
  ).filter((card) => matchesPreferredRegion(card.regions, preferences.region));

  return (
    <section className={`pm-cases w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <h2>
          {asTextField(fields.Heading) ? (
            <Text field={asTextField(fields.Heading)} />
          ) : (
            'Expertise in Action'
          )}
        </h2>
        {(fieldString(fields.Intro) || isEditing) && (
          <p className="pm-industry__section-intro">
            <Text field={asTextField(fields.Intro)} />
          </p>
        )}
        <ul className="pm-industry__cards">
          {cards.map((card) => (
            <li key={card.href}>
              <article>
                <p className="pm-outlaw__kicker">{card.kicker}</p>
                <h3>{card.title}</h3>
                {'metric' in card && card.metric ? (
                  <p className="pm-stats__value">{card.metric}</p>
                ) : null}
                <p>{card.body}</p>
                <Link href={card.href}>Read more</Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
