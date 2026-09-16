'use client';

import { JSX } from 'react';
import { Field, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug } from '@/lib/openhand-catalog';
import { Mail, MapPin, Phone } from 'lucide-react';

type PersonFields = {
  Title?: Field<string>;
  JobTitle?: Field<string>;
  Phone?: Field<string>;
  Email?: Field<string>;
  Office?: Field<string>;
  Biography?: Field<string>;
};

type Props = ComponentProps & { fields?: PersonFields };

const fieldText = (field?: Field<string>): string =>
  (typeof field?.value === 'string' ? field.value : '') || '';

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as PersonFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getPersonBySlug(slug);

  const name = fieldText(fields.Title) || catalog?.name || 'People';
  const job = fieldText(fields.JobTitle) || catalog?.jobTitle || '';
  const phone = fieldText(fields.Phone) || catalog?.phone || '';
  const email = fieldText(fields.Email) || catalog?.email || '';
  const office = fieldText(fields.Office) || catalog?.office || '';
  const bio = fieldText(fields.Biography) || catalog?.bio || '';
  const id = props.params?.RenderingIdentifier;
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!name && !isEditing) {
    return <></>;
  }

  return (
    <article className="oh-profile" id={id}>
      <div className="oh-wrap oh-profile__grid">
        <div className="oh-profile__photo-fallback" aria-hidden="true">
          {initials}
        </div>
        <div>
          <h1>
            <Text field={fields.Title} />
            {!fields.Title?.value && name}
          </h1>
          <p className="oh-profile__job">
            <Text field={fields.JobTitle} />
            {!fields.JobTitle?.value && job}
          </p>
          <div className="oh-profile__contacts">
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 inline size-4" /> {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 inline size-4" /> {email}
              </a>
            )}
            {office && (
              <p>
                <MapPin className="mr-2 inline size-4" /> {office}
              </p>
            )}
          </div>
          {(bio || isEditing) && (
            <div className="mt-6">
              {fields.Biography?.value || isEditing ? (
                <RichText field={fields.Biography} />
              ) : (
                <p>{bio.replace(/<\/?p>/g, '')}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default Default;
