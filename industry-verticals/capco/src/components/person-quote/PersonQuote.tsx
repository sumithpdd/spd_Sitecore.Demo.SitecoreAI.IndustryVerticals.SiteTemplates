import { JSX } from 'react';
import { RichText, RichTextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug } from '@/lib/people-catalog';

type Props = ComponentProps & { fields?: { Biography?: RichTextField } };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Biography?: RichTextField;
  };
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const catalog = getPersonBySlug(slug);
  const id = props.params?.RenderingIdentifier;
  const hasQuote = Boolean(fields.Biography?.value || catalog?.bio);

  if (!hasQuote && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-quote" id={id}>
      <div className="pm-wrap">
        {fields.Biography?.value || isEditing ? (
          <RichText field={fields.Biography} tag="blockquote" />
        ) : (
          <blockquote>{catalog?.bio}</blockquote>
        )}
      </div>
    </section>
  );
};

export default Default;
