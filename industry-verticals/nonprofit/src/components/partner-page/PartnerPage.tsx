'use client';

import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { PARTNERS, partnerByHref } from '@/lib/openhand-catalog';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const partner = partnerByHref(router.asPath.split('?')[0]) || PARTNERS[0];
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: { value?: string };
  };

  return (
    <article className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap oh-grid oh-grid-2">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={partner.image} alt="" className="w-full rounded-2xl object-cover" />
        </div>
        <div>
          <p className="oh-crumb">
            <Link href="/">Home</Link> / <Link href="/get-help/near-you">Near you</Link> /{' '}
            {partner.name}
          </p>
          <p className="oh-kicker">Partner</p>
          <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
            {routeFields.Title?.value ? <Text field={routeFields.Title} /> : partner.name}
          </h1>
          <p className="mt-2 text-lg">
            {partner.lead}, {partner.role}
          </p>
          <p className="oh-muted mt-4">{partner.about}</p>
          <dl className="mt-6 grid gap-2 text-sm">
            <div>
              <dt className="font-semibold">Hours</dt>
              <dd>{partner.hours}</dd>
            </div>
            <div>
              <dt className="font-semibold">Phone</dt>
              <dd>{partner.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold">Services</dt>
              <dd>{partner.services.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
};

export default Default;
