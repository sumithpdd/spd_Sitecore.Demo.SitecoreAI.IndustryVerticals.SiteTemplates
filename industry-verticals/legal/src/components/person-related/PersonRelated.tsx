import { JSX } from 'react';
import {
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asItems, fieldString } from '@/lib/sitecore-fields';
import { getPersonBySlug, relatedPeople } from '@/lib/people-catalog';
import Link from 'next/link';

type Props = ComponentProps & { fields?: { Title?: TextField; RelatedPeople?: unknown } };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: TextField;
    RelatedPeople?: unknown;
  };
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const name = fieldString(fields.Title) || getPersonBySlug(slug)?.name || 'this profile';
  const id = props.params?.RenderingIdentifier;
  const relatedItems = asItems(fields.RelatedPeople);
  const fallback = relatedPeople(slug);

  if (relatedItems.length === 0 && fallback.length === 0 && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-also-viewed" id={id}>
      <div className="pm-wrap">
        <div className="pm-also-viewed__head">
          <h2>People who viewed {name} also viewed</h2>
          <Link href="/people">Show me all</Link>
        </div>
        {relatedItems.length > 0 ? (
          <ul className="pm-also-viewed__list">
            {relatedItems.map((item, index) => {
              const personName = fieldString(item.fields?.Title);
              const href = item.url || `/people/${personName.toLowerCase().replace(/\s+/g, '-')}`;
              const phone = fieldString(item.fields?.Phone);
              const email = fieldString(item.fields?.Email);
              const bio = item.fields?.Biography as RichTextField | undefined;
              return (
                <li key={item.id || index}>
                  <article className="pm-also-viewed__card">
                    <h3>
                      <Link href={href}>{personName}</Link>
                    </h3>
                    {fieldString(item.fields?.JobTitle) ? (
                      <p className="pm-also-viewed__job">
                        <Text field={item.fields?.JobTitle as TextField} />
                      </p>
                    ) : null}
                    <p className="pm-also-viewed__contact">
                      {phone ? <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a> : null}
                      {email ? <a href={`mailto:${email}`}>Email</a> : null}
                    </p>
                    {bio?.value ? (
                      <div className="pm-also-viewed__bio">
                        <RichText field={bio} />
                      </div>
                    ) : null}
                    <Link className="pm-also-viewed__cta" href={href}>
                      View Profile
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="pm-also-viewed__list">
            {fallback.map((person) => (
              <li key={person.slug}>
                <article className="pm-also-viewed__card">
                  <h3>
                    <Link href={`/people/${person.slug}`}>{person.name}</Link>
                  </h3>
                  <p className="pm-also-viewed__job">{person.jobTitle}</p>
                  <p className="pm-also-viewed__contact">
                    <a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a>
                    <a href={`mailto:${person.email}`}>Email</a>
                  </p>
                  <p className="pm-also-viewed__bio">{person.bio}</p>
                  <Link className="pm-also-viewed__cta" href={`/people/${person.slug}`}>
                    View Profile
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Default;
