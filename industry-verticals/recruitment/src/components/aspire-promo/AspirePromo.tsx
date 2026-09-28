import { JSX } from 'react';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';

type Props = ComponentProps & {
  fields?: {
    Heading?: { value?: string };
    Body?: { value?: string };
    LinkLabel?: { value?: string };
    LinkHref?: { value?: string };
    Image?: { value?: { src?: string; alt?: string } };
  };
};

export const Default = (props: Props): JSX.Element => {
  const photo = imageSrc(props.fields?.Image, 'promo-partnership.jpg');
  return (
    <section className="aspire-promo" id={props.params?.RenderingIdentifier}>
      <div>
        <p className="aspire-kicker">Partnerships</p>
        <h2>{textValue(props.fields?.Heading, 'We are Partnerships.')}</h2>
        <p>
          {textValue(
            props.fields?.Body,
            'From a first sales hire to a global team, the brief is shaped around the business. Contingency, retained search, contract, and managed services.'
          )}
        </p>
        <Link href={textValue(props.fields?.LinkHref, '/employers')}>
          {textValue(props.fields?.LinkLabel, 'Learn how we can help')}
        </Link>
      </div>
      {photo ? <img className="aspire-photo" src={photo} alt="" /> : null}
    </section>
  );
};

export default Default;
