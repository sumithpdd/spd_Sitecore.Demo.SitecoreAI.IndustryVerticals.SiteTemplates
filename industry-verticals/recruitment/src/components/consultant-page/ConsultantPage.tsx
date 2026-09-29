'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import {
  CONSULTANTS,
  consultantFromPath,
  consultantHref,
  jobsForConsultant,
  textValue,
} from '@/lib/aspire-catalog';
import { JobGrid } from '@/lib/aspire-ui';
import { imageSrc } from '@/lib/aspire-dam';
import { EditableImage, EditableText, useMergedFields } from '@/lib/aspire-fields';

type Fields = {
  Title?: { value?: string };
  Role?: { value?: string };
  Phone?: { value?: string };
  Email?: { value?: string };
  Location?: { value?: string };
  Bio?: { value?: string };
  Image?: { value?: { src?: string; alt?: string } };
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const person = consultantFromPath(useRouter().asPath) || CONSULTANTS[0];
  const fields = useMergedFields(props.fields);
  const name = textValue(fields?.Title, person.name);
  const phone = textValue(fields?.Phone, person.phone);
  const email = textValue(fields?.Email, person.email);
  const photo = imageSrc(fields?.Image, person.image);

  return (
    <article className="aspire-page aspire-detail" id={props.params?.RenderingIdentifier}>
      <div className="aspire-person">
        <EditableImage field={fields?.Image} fallbackSrc={photo} className="aspire-portrait" />
        <div>
          <EditableText
            field={fields?.Location}
            fallback={person.location}
            tag="p"
            className="aspire-kicker"
          />
          <EditableText field={fields?.Title} fallback={person.name} tag="h1" />
          <EditableText
            field={fields?.Role}
            fallback={person.role}
            tag="p"
            className="aspire-lead"
          />
        </div>
      </div>
      <p>
        <a href={`tel:${phone.replace(/\s/g, '')}`}>
          <EditableText field={fields?.Phone} fallback={person.phone} />
        </a>
        {' · '}
        <a href={`mailto:${email}`}>
          <EditableText field={fields?.Email} fallback={person.email} />
        </a>
      </p>
      <EditableText field={fields?.Bio} fallback={person.bio} tag="p" />
      <h2>Roles with {name.split(' ')[0]}</h2>
      <JobGrid jobs={jobsForConsultant(person.slug)} />
    </article>
  );
};

export const List = (props: Props): JSX.Element => (
  <section className="aspire-page" id={props.params?.RenderingIdentifier}>
    <h1>Consultants</h1>
    <ul className="aspire-people">
      {CONSULTANTS.map((person) => (
        <li key={person.slug}>
          <Link href={consultantHref(person)}>
            {imageSrc(undefined, person.image) ? (
              <img className="aspire-portrait" src={imageSrc(undefined, person.image)} alt="" />
            ) : null}
            <strong>{person.name}</strong>
            <span>{person.role}</span>
            <span>{person.location}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Default;
