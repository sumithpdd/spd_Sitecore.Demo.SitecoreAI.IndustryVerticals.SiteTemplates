'use client';

import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  LinkField,
  ImageField,
  ComponentParams,
  ComponentRendering,
  Image as JssImage,
  Link as JssLink,
  Text,
  RichText,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  Heading: TextField;
  Content: RichTextField;
  DescriptionImage: ImageField;
  DescriptionLink: LinkField;
  DescriptionLinkText: TextField;
  ImagePosition?: TextField; // 'left' or 'right'
};

type FeatureSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: FeatureSectionProps): JSX.Element => {
  const imagePosition = props.fields.ImagePosition?.value || 'left';

  const imageContent = (
    <div className="w-full lg:w-1/2">
      <JssImage field={props.fields.DescriptionImage} className="h-auto w-full object-cover" />
    </div>
  );

  const textContent = (
    <div className="flex w-full flex-col justify-center px-6 py-8 lg:w-1/2 lg:px-12 lg:py-0">
      {/* Heading */}
      <h2 className="mb-4 text-center text-2xl font-normal text-[#4a4a4a] md:text-3xl lg:text-left lg:text-4xl">
        <Text field={props.fields.Heading} />
      </h2>

      {/* Primary Description */}
      {props.fields.Content?.value && (
        <RichText
          className="mb-4 text-center text-base text-gray-600 lg:text-left"
          field={props.fields.Content}
        />
      )}

      {/* CTA Button */}
      <div className="text-center lg:text-left">
        <JssLink
          field={props.fields.DescriptionLink}
          className="inline-block bg-[#1965e1] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#1454c0]"
        >
          <Text field={props.fields.DescriptionLinkText} />
        </JssLink>
      </div>
    </div>
  );

  return (
    <section className="bg-background-accent py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row">
          {imagePosition === 'left' ? (
            <>
              {imageContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {imageContent}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Default;
