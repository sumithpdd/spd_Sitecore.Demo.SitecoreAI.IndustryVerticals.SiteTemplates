import { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug, insightsForPerson, relatedPeople } from '@/lib/people-catalog';
import { eventsForPerson } from '@/lib/events-catalog';
import { Linkedin, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import Link from 'next/link';

type PersonFields = {
  Title?: Field<string>;
  JobTitle?: Field<string>;
  Phone?: Field<string>;
  Email?: Field<string>;
  Office?: Field<string>;
  LinkedIn?: Field<string>;
  Photo?: ImageField;
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
  const linkedin = fieldText(fields.LinkedIn) || catalog?.linkedin || '';
  const hasPhoto = Boolean(fields.Photo?.value && (fields.Photo.value as { src?: string }).src);
  const id = props.params?.RenderingIdentifier;

  if (!name && !isEditing) {
    return <></>;
  }

  const shareHref = email
    ? `mailto:?subject=${encodeURIComponent(name)}&body=${encodeURIComponent(`/people/${slug}`)}`
    : '';
  const articles = insightsForPerson(slug);
  const events = eventsForPerson(slug);
  const related = relatedPeople(slug);

  return (
    <>
      <article className="pm-profile" id={id}>
        <div className="pm-wrap pm-profile__grid">
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
          <div>
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
              {office && (
                <span>
                  <MapPin className="size-4" /> {office}
                </span>
              )}
              {linkedin && (
                <a href={linkedin} rel="noreferrer">
                  <Linkedin className="size-4" /> linkedin/{name}
                </a>
              )}
            </div>
            {shareHref && (
              <a className="pm-profile__share" href={shareHref}>
                <Share2 className="size-4" /> Share via email
              </a>
            )}
          </div>
        </div>
      </article>
      {articles.length > 0 ? (
        <section className="pm-insights" aria-label={`Perspectives by ${name}`}>
          <div className="pm-wrap">
            <h2>
              Perspectives / <span>Insight by {name}</span>
            </h2>
            <p className="pm-insights__hint">Articles and insights this consultant has written.</p>
            <ul className="pm-insights__grid">
              {articles.map((item) => (
                <li key={item.href}>
                  <article className="pm-insights__card">
                    <Link className="pm-insights__link" href={item.href}>
                      <p className="pm-insights__kicker">{item.kicker || 'PERSPECTIVE'}</p>
                      <h3>{item.title}</h3>
                      {item.date ? <time>{item.date}</time> : null}
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      {events.length > 0 ? (
        <section className="pm-article__related" aria-label={`Events with ${name}`}>
          <div className="pm-wrap">
            <h2>Related events</h2>
            <ul className="pm-article__related-cards">
              {events.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span className="pm-outlaw__kicker">{item.kicker}</span>
                    <span className="pm-article__related-title">{item.title}</span>
                    <time>
                      {item.dateLabel} · {item.location}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      {related.length > 0 ? (
        <section className="pm-also-viewed" aria-label="Related people">
          <div className="pm-wrap">
            <div className="pm-also-viewed__head">
              <h2>People who viewed {name} also viewed</h2>
              <Link href="/people">Show me all</Link>
            </div>
            <ul className="pm-also-viewed__list">
              {related.map((person) => (
                <li key={person.slug}>
                  <article className="pm-also-viewed__card">
                    <h3>
                      <Link href={`/people/${person.slug}`}>{person.name}</Link>
                    </h3>
                    <p className="pm-also-viewed__job">{person.jobTitle}</p>
                    <Link className="pm-also-viewed__cta" href={`/people/${person.slug}`}>
                      View Profile
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Default;
