import { JSX } from 'react';
import { Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getPersonBySlug } from '@/lib/people-catalog';
import Link from 'next/link';

type Props = ComponentProps & { fields?: { Title?: TextField } };

const fieldText = (field?: TextField): string =>
  (typeof field?.value === 'string' ? field.value : '') || '';

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as { Title?: TextField };
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(page?.layout?.sitecore?.route?.name || '').toLowerCase();
  const name = fieldText(fields.Title) || getPersonBySlug(slug)?.name || 'Profile';
  const id = props.params?.RenderingIdentifier;

  if (!name && !isEditing) {
    return <></>;
  }

  return (
    <nav className="pm-breadcrumb" aria-label="Breadcrumb" id={id}>
      <div className="pm-wrap">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/people">People</Link>
          </li>
          <li aria-current="page">
            <Text field={fields.Title} />
            {!fields.Title?.value && name}
          </li>
        </ol>
      </div>
    </nav>
  );
};

export default Default;
