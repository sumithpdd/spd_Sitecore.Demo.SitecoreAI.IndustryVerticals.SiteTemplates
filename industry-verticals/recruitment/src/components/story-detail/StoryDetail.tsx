'use client';

import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { STORIES, storyByHref } from '@/lib/openhand-catalog';
import { useRouter } from 'next/router';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const story = storyByHref(router.asPath.split('?')[0]) || STORIES[0];
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: { value?: string };
  };

  return (
    <article className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap max-w-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={story.image}
          alt=""
          className="mb-8 max-h-[28rem] w-full rounded-2xl object-cover object-top"
        />
        <p className="oh-kicker">{story.name}</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          {routeFields.Title?.value ? <Text field={routeFields.Title} /> : story.title}
        </h1>
        {story.body.map((para) => (
          <p key={para} className="mt-4 text-lg leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </article>
  );
};

export default Default;
