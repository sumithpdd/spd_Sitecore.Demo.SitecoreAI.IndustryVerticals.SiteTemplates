import { JSX } from 'react';
import {
  Field,
  ImageField,
  RichTextField,
  Text,
  RichText,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug, relatedPeople } from '@/lib/people-catalog';
import { Linkedin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

type PersonFields = {
  Title?: Field<string>;
  JobTitle?: Field<string>;
  Phone?: Field<string>;
  Email?: Field<string>;
  Office?: Field<string>;
  LinkedIn?: Field<string>;
  Biography?: RichTextField;
  Photo?: ImageField;
  Specialisms?: RichTextField;
  Credentials?: RichTextField;
};

type Props = ComponentProps & { fields?: PersonFields };

const fieldText = (field?: Field<string>): string =>
  (typeof field?.value === 'string' ? field.value : '') || '';

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as PersonFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const path = page?.layout?.sitecore?.route?.name || '';
  const slug = String(path).toLowerCase();
  const catalog = getPersonBySlug(slug);

  const name = fieldText(fields.Title) || catalog?.name || 'People';
  const job = fieldText(fields.JobTitle) || catalog?.jobTitle || '';
  const phone = fieldText(fields.Phone) || catalog?.phone || '';
  const email = fieldText(fields.Email) || catalog?.email || '';
  const office = fieldText(fields.Office) || catalog?.office || '';
  const linkedin = fieldText(fields.LinkedIn) || catalog?.linkedin || '';
  const hasPhoto = Boolean(fields.Photo?.value && (fields.Photo.value as { src?: string }).src);
  const id = props.params?.RenderingIdentifier;
  const related = relatedPeople(slug);
  const insights = catalog?.insights || [];
  const experience = [...(catalog?.credentials || [])].sort((a, b) => b.year.localeCompare(a.year));

  if (!name && !isEditing) {
    return <></>;
  }

  return (
    <article className="pm-profile" id={id}>
      <div className="pm-wrap grid gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="pm-profile__eyebrow">
            <Link href="/people">People</Link>
          </p>
          <h1>
            <Text field={fields.Title} />
            {!fields.Title?.value && name}
          </h1>
          <p className="pm-profile__job">
            <Text field={fields.JobTitle} />
            {!fields.JobTitle?.value && job}
          </p>
          <div className="pm-profile__contacts">
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="size-4" /> {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`}>
                <Mail className="size-4" /> {email}
              </a>
            )}
            {office && <span>{office}</span>}
            {linkedin && (
              <a href={linkedin} rel="noreferrer">
                <Linkedin className="size-4" /> LinkedIn
              </a>
            )}
          </div>
          {(fields.Biography?.value || catalog?.bio) && (
            <div className="pm-profile__bio">
              {fields.Biography?.value ? (
                <RichText field={fields.Biography} />
              ) : (
                <p>{catalog?.bio}</p>
              )}
            </div>
          )}

          {(fields.Specialisms?.value ||
            (catalog?.specialisms && catalog.specialisms.length > 0)) && (
            <section className="pm-profile__section">
              <h2>Specialisms</h2>
              {fields.Specialisms?.value ? (
                <RichText field={fields.Specialisms} />
              ) : (
                <ul>
                  {catalog?.specialisms.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {(fields.Credentials?.value || experience.length > 0) && (
            <section className="pm-profile__section" id="experience">
              <h2>Experience</h2>
              {fields.Credentials?.value ? (
                <RichText field={fields.Credentials} />
              ) : (
                <ul>
                  {experience.map((item) => (
                    <li key={`${item.year}-${item.detail}`}>
                      <strong>{item.year}</strong> {item.detail}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {insights.length > 0 && (
            <section className="pm-profile__section" id="insights">
              <h2>Insights</h2>
              <ul className="pm-profile__insights">
                {insights.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <div className="pm-profile__media">
          {hasPhoto || isEditing ? (
            <ContentSdkImage field={fields.Photo} className="pm-profile__photo" />
          ) : (
            <div className="pm-profile__photo-fallback" aria-hidden="true">
              {name
                .split(' ')
                .map((part) => part[0])
                .join('')}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="pm-profile__related">
          <div className="pm-wrap">
            <h2>Related people</h2>
            <p className="pm-profile__related-lede">
              Same service, sector or region — not the first four names that start with B.
            </p>
            <ul className="pm-people__list">
              {related.map((person) => (
                <li key={person.slug}>
                  <Link className="pm-people__card" href={`/people/${person.slug}`}>
                    <div>
                      <h3>{person.name}</h3>
                      <p className="pm-people__role">{person.jobTitle}</p>
                      <p className="pm-people__bio">{person.bio}</p>
                    </div>
                    <span className="pm-people__cta">View Profile</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
};

export default Default;
