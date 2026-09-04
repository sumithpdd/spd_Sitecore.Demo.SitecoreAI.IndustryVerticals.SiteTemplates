import { JSX } from 'react';
import { RichTextField, RichText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

type Fields = {
  Text?: RichTextField;
};

type Props = ComponentProps & { fields?: Fields };

/** Generic rich-text datasource block. */
export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const field = props.fields?.Text;

  if (!field?.value && !isEditing) return <></>;

  return (
    <section className="brother-rich-text">
      <div className="brother-container">
        {field ? (
          <RichText field={field} className="brother-page-content__body" />
        ) : (
          <p>[Rich text]</p>
        )}
      </div>
    </section>
  );
};

export default Default;
