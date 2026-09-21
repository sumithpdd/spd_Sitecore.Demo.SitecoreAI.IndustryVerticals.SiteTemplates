'use client';

import { JSX } from 'react';
import { Link as ContentSdkLink, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLinkField, asTextField, fieldString, linkHref } from '@/lib/sitecore-fields';

type Fields = {
  VideoUrl?: unknown;
  PodcastUrl?: unknown;
  Transcript?: unknown;
  MediaType?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

function youtubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? match[1] : null;
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const video = asLinkField(fields.VideoUrl);
  const podcast = asLinkField(fields.PodcastUrl);
  const videoHref = linkHref(fields.VideoUrl);
  const podcastHref = linkHref(fields.PodcastUrl);
  const yt = youtubeId(videoHref);
  const transcript = asTextField(fields.Transcript);
  const mediaType = fieldString(fields.MediaType) || 'Media';

  if (!videoHref && !podcastHref && !fieldString(transcript) && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-article" id={props.params?.RenderingIdentifier} aria-label={mediaType}>
      <div className="pm-wrap pb-12">
        {yt ? (
          <div className="pm-media">
            <iframe
              title="Perspective video"
              src={`https://www.youtube-nocookie.com/embed/${yt}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="pm-media__frame"
            />
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-4">
          {(videoHref || isEditing) && video ? (
            <ContentSdkLink field={video} className="pm-btn-light">
              Watch video
            </ContentSdkLink>
          ) : null}
          {(podcastHref || isEditing) && podcast ? (
            <ContentSdkLink field={podcast} className="pm-btn-light">
              Listen to podcast
            </ContentSdkLink>
          ) : null}
        </div>
        {(fieldString(transcript) || isEditing) && (
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold">Transcript</summary>
            <div className="mt-2">
              <RichText field={transcript} />
            </div>
          </details>
        )}
      </div>
    </section>
  );
};

export default Default;
