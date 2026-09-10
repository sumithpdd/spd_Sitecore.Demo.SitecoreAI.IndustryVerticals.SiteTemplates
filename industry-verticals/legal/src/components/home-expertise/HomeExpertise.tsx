'use client';

import { JSX, useState } from 'react';
import {
  Text,
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { EXPERTISE_LOCATIONS, EXPERTISE_SECTORS, EXPERTISE_SERVICES } from '@/lib/home-catalog';
import {
  asImageField,
  asItems,
  asLinkField,
  asTextField,
  fieldString,
  itemLabel,
  linkHref,
} from '@/lib/sitecore-fields';
import Link from 'next/link';
import { Lightbulb } from 'lucide-react';

type Tab = 'sectors' | 'services' | 'locations';

type Fields = {
  Eyebrow?: unknown;
  SectorsLabel?: unknown;
  ServicesLabel?: unknown;
  LocationsLabel?: unknown;
  SectorsImage?: unknown;
  ServicesImage?: unknown;
  LocationsImage?: unknown;
  Sectors?: unknown;
  Services?: unknown;
  Locations?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

const fallbackLinks: Record<Tab, { label: string; href: string }[]> = {
  sectors: EXPERTISE_SECTORS.map((row) => ({ label: row.label, href: row.href })),
  services: EXPERTISE_SERVICES.map((group) => ({ label: group.title, href: '/expertise' })),
  locations: EXPERTISE_LOCATIONS.map((row) => ({ label: row.region, href: '/offices' })),
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const [tab, setTab] = useState<Tab>('sectors');

  const lists: Record<Tab, ReturnType<typeof asItems>> = {
    sectors: asItems(fields.Sectors),
    services: asItems(fields.Services),
    locations: asItems(fields.Locations),
  };
  const images = {
    sectors: asImageField(fields.SectorsImage),
    services: asImageField(fields.ServicesImage),
    locations: asImageField(fields.LocationsImage),
  };

  const tabs: { key: Tab; field: unknown; fallback: string }[] = [
    { key: 'sectors', field: fields.SectorsLabel, fallback: 'Sectors' },
    { key: 'services', field: fields.ServicesLabel, fallback: 'Services' },
    { key: 'locations', field: fields.LocationsLabel, fallback: 'Locations' },
  ];

  const items = lists[tab];
  const image = images[tab];
  const fallback = fallbackLinks[tab];

  return (
    <section className="pm-expertise" id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-section-kicker">
          <Lightbulb className="pm-section-kicker__icon" aria-hidden="true" />
          <Text field={asTextField(fields.Eyebrow)} />
          {!fieldString(fields.Eyebrow) && 'Expertise'}
        </p>

        <div className="pm-expertise__tabs" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              className={tab === item.key ? 'is-active' : undefined}
              onClick={() => setTab(item.key)}
            >
              <Text field={asTextField(item.field)} />
              {!fieldString(item.field) && item.fallback}
            </button>
          ))}
        </div>

        <div className="pm-expertise__panel">
          <ul className="pm-expertise__pills">
            {items.length > 0
              ? items.map((item, index) => {
                  const title = asTextField(item.fields?.Title);
                  const link = asLinkField(item.fields?.Link);
                  const href = linkHref(item.fields?.Link, '/expertise');
                  const label = itemLabel(item);
                  const pillText =
                    fieldString(item.fields?.Title) && title ? <Text field={title} /> : label;
                  return (
                    <li key={item.id || `${tab}-${index}`}>
                      {link ? (
                        <ContentSdkLink field={link} className="pm-expertise__pill">
                          {pillText}
                        </ContentSdkLink>
                      ) : (
                        <Link className="pm-expertise__pill" href={href}>
                          {pillText}
                        </Link>
                      )}
                    </li>
                  );
                })
              : fallback.map((row) => (
                  <li key={row.label}>
                    <Link className="pm-expertise__pill" href={row.href}>
                      {row.label}
                    </Link>
                  </li>
                ))}
          </ul>
          {(image?.value?.src || isEditing) && (
            <div className="pm-expertise__media">
              <ContentSdkImage field={image} className="pm-expertise__image" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Default;
