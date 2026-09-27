'use client';

import { JSX } from 'react';
import { RichText, RichTextField, Text, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

type Fields = {
  Heading?: TextField;
  Body?: RichTextField;
};

const FALLBACK_BODY =
  '<p>ASOS Design denim is cut to be kept: a wide leg, a mid wash, and one size rather than three. The edit stays under £50, with petite and tall in the same row.</p><p>Berlin in October is the jean, a chocolate knit, and a Chelsea boot. Filter by body fit, then save the three pieces into My Edit.</p>';

export const Default = (props: ComponentProps & { fields?: Fields }): JSX.Element => {
  const body = props.fields?.Body?.value ? props.fields.Body : { value: FALLBACK_BODY };
  return (
    <section className="asos-wrap asos-seocopy" id={props.params?.RenderingIdentifier}>
      <h2>
        {props.fields?.Heading?.value ? <Text field={props.fields.Heading} /> : 'This is ASOS'}
      </h2>
      <RichText field={body} />
    </section>
  );
};

export default Default;
