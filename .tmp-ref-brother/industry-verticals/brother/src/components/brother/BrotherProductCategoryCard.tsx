'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  ImageField,
  LinkField,
  Link as JssLink,
  ComponentRendering,
  ComponentParams,
  Image as JssImage,
} from '@sitecore-content-sdk/nextjs';

export type Fields = {
  CardImage: ImageField;
  CardLabel: TextField;
  CardLink: LinkField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

export const Default = (props: ComponentProps): JSX.Element => {
  return (
    <div className="flex-[0_0_150px] md:flex-[0_0_180px]">
      <JssLink field={props.fields.CardLink} className="group block text-center">
        <div className="rounded-lg bg-white p-4 transition-shadow hover:shadow-lg">
          <div className="mx-auto mb-3 flex h-32 w-32 items-center justify-center md:h-40 md:w-40">
            <JssImage
              field={props.fields.CardImage}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <p className="text-sm font-bold text-gray-800 transition-colors group-hover:text-[#1965e1] md:text-base">
            <Text field={props.fields.CardLabel} />
          </p>
        </div>
      </JssLink>
    </div>
  );
};
