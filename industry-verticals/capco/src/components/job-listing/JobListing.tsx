'use client';

import { JSX } from 'react';
import { RichTextField, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { CAREERS_COPY, JOBS_CATALOG } from '@/lib/jobs-catalog';
import Link from 'next/link';

type Fields = {
  Title?: TextField;
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const id = props.params?.RenderingIdentifier;

  return (
    <section className="pm-jobs" id={id}>
      <div className="pm-wrap">
        <p className="pm-section-kicker">{CAREERS_COPY.kicker}</p>
        <h2>{CAREERS_COPY.title}</h2>
        <p className="pm-jobs__intro">{CAREERS_COPY.intro}</p>
        {isEditing ? (
          <p className="pm-jobs__hint">Job list is catalog-backed for the demo.</p>
        ) : null}
        <ul className="pm-jobs__list">
          {JOBS_CATALOG.map((job) => (
            <li key={job.slug} id={job.slug}>
              <article className="pm-jobs__card">
                <p className="pm-jobs__meta">
                  {job.type} · {job.team} · {job.location}
                </p>
                <h3>
                  <Link href={job.href}>{job.title}</Link>
                </h3>
                <p>{job.summary}</p>
                <Link className="pm-jobs__cta" href={job.href}>
                  View related expert
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
