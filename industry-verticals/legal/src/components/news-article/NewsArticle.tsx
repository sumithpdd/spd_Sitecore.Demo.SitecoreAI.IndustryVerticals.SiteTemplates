import { JSX } from 'react';
import {
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ANNOUNCEMENTS_CATALOG } from '@/lib/announcements-catalog';
import Link from 'next/link';

type RouteFields = {
  Title?: TextField;
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: RouteFields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as RouteFields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const isAnnouncement = ANNOUNCEMENTS_CATALOG.some((item) => item.slug === slug);
  const parentHref = isAnnouncement ? '/about-us/announcements' : '/out-law';
  const parentLabel = isAnnouncement ? 'Announcements' : 'Out-Law';

  if (!fields.Title && !fields.Content && !isEditing) {
    return <></>;
  }

  return (
    <article className="pm-article" id={id}>
      <div className="pm-wrap py-16">
        <p className="pm-profile__eyebrow">
          <Link href={parentHref}>{parentLabel}</Link>
        </p>
        <h1 className="pm-article__title">
          <Text field={fields.Title} />
        </h1>
        <div className="pm-article__body">
          <RichText field={fields.Content} />
        </div>
      </div>
    </article>
  );
};

export default Default;
