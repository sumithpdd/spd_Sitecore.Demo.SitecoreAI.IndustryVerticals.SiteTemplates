import { useI18n } from 'next-localization';
import {
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  ComponentRendering,
  ComponentParams,
  RichTextField,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  Title: TextField;
  Description: RichTextField;
}

type GridDemandProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: GridDemandProps) => {
  const { styles, id } = props.params;

  return (
    <div className={`p-4 md:p-6 ${styles}`} id={id}>
      <div className="container flex flex-col rounded-xl border p-10 shadow-sm">
        {/* Title */}
        <h2 className="text-foreground mb-6 text-3xl font-bold">
          <ContentSdkText field={props.fields.Title} />
        </h2>

        {/* Description */}
        <ContentSdkRichText field={props.fields.Description} />
      </div>
    </div>
  );
};

export const Area = (props: GridDemandProps) => {
  const { styles, id } = props.params;

  return (
    <div className={`p-4 md:p-6 ${styles}`} id={id}>
      <div className="container flex flex-col rounded-xl border p-10 shadow-sm">
        {/* Title */}
        <h2 className="text-foreground mb-6 text-3xl font-bold">
          <ContentSdkText field={props.fields.Title} />
        </h2>

        {/* Description */}
        <ContentSdkRichText field={props.fields.Description} />
      </div>
    </div>
  );
};
