'use client';

import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  ImageField,
  Image as JssImage,
  RichText,
  Text,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  BackgroundImage: ImageField;
  Title: TextField;
  Description: RichTextField;
  ContentBackgroundColor: TextField; // hex color for content box background
  ContentTextColor: TextField; // hex color for text (light/dark)
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: ComponentProps): JSX.Element => {
  const id = props.rendering.uid;

  const bgColor = props.fields.ContentBackgroundColor?.value || '#008c95';
  const textColor = props.fields.ContentTextColor?.value || '#ffffff';

  return (
    <div key={id} className="relative min-w-0 flex-[0_0_100%]">
      <div className="relative hidden h-[500px] md:block lg:h-[550px]">
        {/* Background Image */}
        <JssImage
          field={props.fields.BackgroundImage.value}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay Content Box */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 lg:px-16">
            <div className="max-w-md lg:max-w-lg">
              <div className="p-8 lg:p-10" style={{ backgroundColor: bgColor as string }}>
                {/* Title */}
                <h2
                  className="mb-4 text-2xl leading-tight font-light lg:text-3xl xl:text-4xl"
                  style={{ color: textColor as string }}
                >
                  <Text field={props.fields.Title} />
                </h2>
                {/* Description */}
                <RichText
                  field={props.fields.Description}
                  className="mb-6 text-sm leading-relaxed lg:text-base"
                  style={{ color: textColor as string }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {/* Background Image */}
        <div className="relative h-[300px] sm:h-[350px]">
          <JssImage
            field={props.fields.BackgroundImage.value}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content Below Image */}
        <div className="p-6 text-center sm:p-8" style={{ backgroundColor: bgColor as string }}>
          {/* Title */}
          <h2
            className="mb-4 text-2xl leading-tight font-light italic sm:text-3xl"
            style={{ color: textColor as string }}
          >
            <Text field={props.fields.Title} />
          </h2>
          {/* Description */}
          <RichText
            field={props.fields.Description}
            className="mb-6 text-sm leading-relaxed sm:text-base"
            style={{ color: textColor as string }}
          />
        </div>
      </div>
    </div>
  );
};
