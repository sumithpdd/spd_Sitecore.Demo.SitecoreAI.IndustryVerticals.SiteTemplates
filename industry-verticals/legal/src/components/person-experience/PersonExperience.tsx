'use client';

import { JSX, useMemo, useState } from 'react';
import {
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asItems, fieldString } from '@/lib/sitecore-fields';
import { getPersonBySlug } from '@/lib/people-catalog';
import Link from 'next/link';

type ExperienceRow = {
  id: string;
  title: string;
  year: string;
  region: string;
  sector: string;
  service: string;
  value: string;
  fields?: Record<string, unknown>;
};

type CredentialRow = {
  id: string;
  year: string;
  detail: string;
  fields?: Record<string, unknown>;
};

type PersonFields = {
  Title?: TextField;
  Specialisms?: RichTextField;
  Credentials?: RichTextField;
  ExperienceItems?: unknown;
  CredentialItems?: unknown;
};

type Props = ComponentProps & { fields?: PersonFields };

const PAGE_SIZE = 5;

const unique = (values: string[]): string[] =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as PersonFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getPersonBySlug(slug);
  const firstName = (fieldString(fields.Title) || catalog?.name || 'Experience').split(' ')[0];
  const id = props.params?.RenderingIdentifier;

  const experience: ExperienceRow[] = useMemo(() => {
    const items = asItems(fields.ExperienceItems);
    if (items.length > 0) {
      return items.map((item, index) => ({
        id: item.id || String(index),
        title: fieldString(item.fields?.Title),
        year: fieldString(item.fields?.Year),
        region: fieldString(item.fields?.Region),
        sector: fieldString(item.fields?.Sector),
        service: fieldString(item.fields?.Service),
        value: fieldString(item.fields?.Value),
        fields: item.fields,
      }));
    }
    return (catalog?.experience || []).map((item, index) => ({
      id: `${item.year}-${index}`,
      title: item.title,
      year: item.year,
      region: item.region || '',
      sector: item.sector || '',
      service: item.service || '',
      value: item.value || '',
    }));
  }, [catalog?.experience, fields.ExperienceItems]);

  const credentials: CredentialRow[] = useMemo(() => {
    const items = asItems(fields.CredentialItems);
    if (items.length > 0) {
      return items.map((item, index) => ({
        id: item.id || String(index),
        year: fieldString(item.fields?.Year),
        detail: fieldString(item.fields?.Detail),
        fields: item.fields,
      }));
    }
    return (catalog?.credentials || []).map((item, index) => ({
      id: `${item.year}-${index}`,
      year: item.year,
      detail: item.detail,
    }));
  }, [catalog?.credentials, fields.CredentialItems]);

  const sectors = unique(experience.map((item) => item.sector));
  const services = unique(experience.map((item) => item.service));
  const regions = unique(experience.map((item) => item.region));

  const [sector, setSector] = useState('');
  const [service, setService] = useState('');
  const [region, setRegion] = useState('');
  const [applied, setApplied] = useState({ sector: '', service: '', region: '' });
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = experience.filter((item) => {
    if (applied.sector && item.sector !== applied.sector) return false;
    if (applied.service && item.service !== applied.service) return false;
    if (applied.region && item.region !== applied.region) return false;
    return true;
  });
  const shown = filtered.slice(0, visible);

  if (
    experience.length === 0 &&
    credentials.length === 0 &&
    !fields.Specialisms?.value &&
    !isEditing
  ) {
    return <></>;
  }

  return (
    <section className="pm-experience" id={id}>
      <div className="pm-wrap pm-experience__grid">
        <div>
          <h2>{firstName}&apos;s experience</h2>
          {experience.length > 0 && (
            <form
              className="pm-experience__filters"
              onSubmit={(event) => {
                event.preventDefault();
                setApplied({ sector, service, region });
                setVisible(PAGE_SIZE);
              }}
            >
              <label>
                <span>Sectors</span>
                <select value={sector} onChange={(event) => setSector(event.target.value)}>
                  <option value="">All sectors</option>
                  {sectors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Services</span>
                <select value={service} onChange={(event) => setService(event.target.value)}>
                  <option value="">All services</option>
                  {services.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Region</span>
                <select value={region} onChange={(event) => setRegion(event.target.value)}>
                  <option value="">All regions</option>
                  {regions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <button className="pm-btn" type="submit">
                Apply
              </button>
            </form>
          )}

          {shown.length > 0 ? (
            <ol className="pm-timeline">
              {shown.map((item) => (
                <li key={item.id}>
                  <h3>
                    {item.fields?.Title ? (
                      <Text field={item.fields.Title as TextField} />
                    ) : (
                      item.title
                    )}
                  </h3>
                  <ul className="pm-timeline__meta">
                    {item.year ? <li>{item.year}</li> : null}
                    {item.value ? <li>{item.value}</li> : null}
                    {item.region ? <li>{item.region}</li> : null}
                    {item.sector ? <li className="pm-pill">{item.sector}</li> : null}
                  </ul>
                </li>
              ))}
            </ol>
          ) : (
            experience.length > 0 && <p className="pm-experience__empty">No matching experience.</p>
          )}

          {filtered.length > visible && (
            <button
              className="pm-btn-outline"
              type="button"
              onClick={() => setVisible((n) => n + PAGE_SIZE)}
            >
              Load More
            </button>
          )}
        </div>

        <aside>
          {(credentials.length > 0 || fields.Credentials?.value || isEditing) && (
            <div className="pm-credentials">
              <h2>Credentials</h2>
              {fields.Credentials?.value && credentials.length === 0 ? (
                <RichText field={fields.Credentials} />
              ) : (
                <ul>
                  {credentials.map((item) => (
                    <li key={item.id}>
                      <span className="pm-credentials__year">
                        {item.fields?.Year ? (
                          <Text field={item.fields.Year as TextField} />
                        ) : (
                          item.year
                        )}
                      </span>
                      <span>
                        {item.fields?.Detail ? (
                          <Text field={item.fields.Detail as TextField} />
                        ) : (
                          item.detail
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </aside>
      </div>

      {(fields.Specialisms?.value ||
        (catalog?.specialisms && catalog.specialisms.length > 0) ||
        isEditing) && (
        <div className="pm-specialisms">
          <div className="pm-wrap">
            <h2>Specialisms</h2>
            {fields.Specialisms?.value || isEditing ? (
              <RichText field={fields.Specialisms} />
            ) : (
              <ul>
                {catalog?.specialisms.map((item) => (
                  <li key={item}>
                    <Link href="/expertise">{item}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Default;
