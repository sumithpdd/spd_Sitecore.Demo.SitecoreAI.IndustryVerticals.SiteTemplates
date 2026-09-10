import { JSX } from 'react';
import {
  Field,
  ImageField,
  Text,
  NextImage as ContentSdkImage,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug } from '@/lib/people-catalog';
import { Linkedin, Mail, MapPin, Phone, Share2 } from 'lucide-react';

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

  return (
    <article className="pm-profile" id={id}>
      <div className="pm-wrap grid items-start gap-10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
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
    </article>
  );
};

export default Default;
