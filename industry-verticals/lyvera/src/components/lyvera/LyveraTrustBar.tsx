'use client';

import type { JSX } from 'react';
import { TextField, Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { Award, Martini, Star, Ticket } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { KP_TRUST_ITEMS } from '@/lib/keith-prowse-defaults';
import { GS_TRUST_ITEMS } from '@/lib/gulliverstravel-defaults';
import { isGulliversTravelSite, isKeithProwseSite } from '@/lib/lyveragroup-site';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import { textFieldValue, unwrapField } from '@/lib/lyvera-field-utils';

export interface LyveraTrustBarFields {
  ItemOneText?: TextField;
  ItemTwoText?: TextField;
  ItemThreeText?: TextField;
  ItemFourText?: TextField;
}

export type LyveraTrustBarProps = ComponentProps & {
  fields?: LyveraTrustBarFields;
};

const ICONS = {
  award: Award,
  ticket: Ticket,
  cocktail: Martini,
  star: Star,
} as const;

type IconName = keyof typeof ICONS;

function TrustIcon({ name }: { name: IconName }): JSX.Element {
  const Icon = ICONS[name] ?? Award;
  return <Icon aria-hidden size={28} strokeWidth={1.5} />;
}

export const Default = (props: LyveraTrustBarProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles } = props.params ?? {};
  const fields = props.fields ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  const cmsItems = [
    fields.ItemOneText,
    fields.ItemTwoText,
    fields.ItemThreeText,
    fields.ItemFourText,
  ].filter((field) => textFieldValue(field));

  const fallbackItems = isGulliversTravelSite(page)
    ? GS_TRUST_ITEMS
    : isKeithProwseSite(page)
      ? KP_TRUST_ITEMS
      : KP_TRUST_ITEMS;

  const useFallback = cmsItems.length === 0 && !isEditing;

  const rows: { key: string; icon: IconName; field?: TextField; text?: string }[] = useFallback
    ? fallbackItems.map((item, index) => ({
        key: `fb-${index}`,
        icon: item.icon as IconName,
        text: item.text,
      }))
    : (
        [
          { key: 'one', icon: 'award' as const, field: unwrapField(fields.ItemOneText) },
          { key: 'two', icon: 'ticket' as const, field: unwrapField(fields.ItemTwoText) },
          { key: 'three', icon: 'cocktail' as const, field: unwrapField(fields.ItemThreeText) },
          { key: 'four', icon: 'star' as const, field: unwrapField(fields.ItemFourText) },
        ] satisfies { key: string; icon: IconName; field?: TextField }[]
      ).flatMap((row) => {
        if (!textFieldValue(row.field) && !isEditing) return [];
        return [row];
      });

  return (
    <section
      className={[sharedComponentModifier(page, 'component lyvera-trust-bar'), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <ul className="lyvera-trust-bar__list">
        {rows.map((row) => (
          <li key={row.key} className="lyvera-trust-bar__item">
            <span className="lyvera-trust-bar__icon">
              <TrustIcon name={row.icon} />
            </span>
            {row.field && isEditing ? (
              <ContentSdkText field={row.field} tag="span" className="lyvera-trust-bar__text" />
            ) : (
              <span className="lyvera-trust-bar__text">
                {row.text ?? textFieldValue(row.field)}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
