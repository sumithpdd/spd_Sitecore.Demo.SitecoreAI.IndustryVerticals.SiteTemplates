'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { CONSULTANTS, consultantHref, jobFromPath, textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';
import { EditableImage, EditableText, useMergedFields } from '@/lib/aspire-fields';

type Fields = {
  Title?: { value?: string };
  Location?: { value?: string };
  Salary?: { value?: string };
  JobType?: { value?: string };
  Summary?: { value?: string };
  Body?: { value?: string };
  Reference?: { value?: string };
  Image?: { value?: { src?: string; alt?: string } };
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const job = jobFromPath(router.asPath);
  const fields = useMergedFields(props.fields);
  const consultant =
    CONSULTANTS.find((person) => person.slug === job?.consultant) || CONSULTANTS[0];
  const title = textValue(fields?.Title, job?.title || 'Role');
  const photo = imageSrc(fields?.Image, job?.image || 'job-edtech.jpg');

  return (
    <article className="aspire-page aspire-detail" id={props.params?.RenderingIdentifier}>
      <EditableText
        field={fields?.Location}
        fallback={job?.location || ''}
        tag="p"
        className="aspire-kicker"
      />
      <EditableText field={fields?.Title} fallback={job?.title || 'Role'} tag="h1" />
      <EditableImage field={fields?.Image} fallbackSrc={photo} className="aspire-photo" />
      <EditableText
        field={fields?.Salary}
        fallback={job?.salary || ''}
        tag="p"
        className="aspire-salary"
      />
      <dl className="aspire-facts">
        <div>
          <dt>Job type</dt>
          <dd>
            <EditableText field={fields?.JobType} fallback={job?.type || ''} />
          </dd>
        </div>
        <div>
          <dt>Reference</dt>
          <dd>
            <EditableText field={fields?.Reference} fallback={job?.reference || ''} />
          </dd>
        </div>
        <div>
          <dt>Posted</dt>
          <dd>{job?.posted}</dd>
        </div>
      </dl>
      <aside className="aspire-consultant-card">
        <p>{consultant.name}</p>
        <p>{consultant.role}</p>
        <a href={`mailto:${consultant.email}`}>{consultant.email}</a>
        <a href={`tel:${consultant.phone.replace(/\s/g, '')}`}>{consultant.phone}</a>
        <Link href={consultantHref(consultant)}>View profile</Link>
      </aside>
      <EditableText field={fields?.Summary} fallback={job?.summary || ''} tag="p" />
      <EditableText field={fields?.Body} fallback={job?.body || ''} tag="p" />
      <p>
        <a
          className="aspire-apply"
          href={`mailto:${consultant.email}?subject=${encodeURIComponent(title)}`}
        >
          Apply now
        </a>
      </p>
    </article>
  );
};

export default Default;
