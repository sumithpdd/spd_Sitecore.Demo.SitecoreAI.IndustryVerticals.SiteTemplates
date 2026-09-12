import { JSX } from 'react';
import {
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { fieldString } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Fields = {
  Title?: TextField;
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as Fields;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const id = props.params?.RenderingIdentifier;
  const title = fieldString(fields.Title);

  if (!title && !fieldString(fields.Content) && !isEditing) {
    return <></>;
  }

  return (
    <section className="pm-page-heading" id={id}>
      <div className="pm-wrap">
        <div className="pm-breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>{title || 'Page'}</li>
          </ol>
        </div>
        <h1>{fields.Title ? <Text field={fields.Title} /> : title}</h1>
        {fields.Content?.value || isEditing ? (
          <div className="pm-page-heading__intro">
            <RichText field={fields.Content} />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
