'use client';

import { JSX, useMemo } from 'react';
import { useRouter } from 'next/router';
import { ComponentProps } from '@/lib/component-props';
import { JOBS, textValue } from '@/lib/aspire-catalog';
import { JobGrid } from '@/lib/aspire-ui';

type Props = ComponentProps & { fields?: { Heading?: { value?: string } } };

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const params = new URLSearchParams(router.asPath.split('?')[1] || '');
  const query = (params.get('query') || '').toLowerCase();
  const location = (params.get('selected_locations') || '').toLowerCase();
  const jobs = useMemo(
    () =>
      JOBS.filter((job) => {
        const haystack = `${job.title} ${job.sector} ${job.summary}`.toLowerCase();
        if (query && !haystack.includes(query)) return false;
        if (location && !job.location.toLowerCase().includes(location)) return false;
        return true;
      }),
    [query, location]
  );

  return (
    <section className="aspire-page" id={props.params?.RenderingIdentifier}>
      <h1>{textValue(props.fields?.Heading, 'Find your dream job')}</h1>
      <p className="aspire-lead">
        {jobs.length} live {jobs.length === 1 ? 'role' : 'roles'}
        {query ? ` for “${query}”` : ''}
        {location ? ` in ${location}` : ''}.
      </p>
      <JobGrid jobs={jobs} />
    </section>
  );
};

export default Default;
