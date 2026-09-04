import { JSX } from 'react';
import { Field, RichTextField, Text, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { fieldText } from 'lib/cms-fields';

type Fields = {
  heading?: Field<string>;
  Heading?: Field<string>;
  content?: RichTextField;
  Content?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

/** Heading + rich text content block. */
export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const f = props.fields || {};
  const headingField = f.Heading || f.heading;
  const contentField = f.Content || f.content;
  const heading = fieldText(headingField);

  if (!heading && !contentField?.value && !isEditing) return <></>;

  return (
    <section className="brother-content-block">
      <div className="brother-container">
        {headingField?.value || isEditing ? (
          <Text field={headingField} tag="h2" />
        ) : heading ? (
          <h2>{heading}</h2>
        ) : null}
        {contentField?.value || isEditing ? (
          <RichText field={contentField} className="brother-page-content__body" />
        ) : null}
      </div>
    </section>
  );
};

export default Default;
