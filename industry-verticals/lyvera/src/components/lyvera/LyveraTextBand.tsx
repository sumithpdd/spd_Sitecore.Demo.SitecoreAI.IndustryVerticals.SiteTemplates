import type { JSX } from 'react';
import {
  RichTextField,
  TextField,
  useSitecore,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_INTRO_DEFAULT } from '@/lib/lyvera-defaults';

export interface LyveraTextBandFields {
  Eyebrow?: TextField;
  Body?: RichTextField;
}

export type LyveraTextBandProps = ComponentProps & {
  fields?: LyveraTextBandFields;
};

const textValue = (field?: TextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

const richTextValue = (field?: RichTextField): string => {
  const v = field?.value;
  return typeof v === 'string' ? v.trim() : '';
};

export const Default = (props: LyveraTextBandProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <section className="component lyvera-text-band" id={id}>
      <div className="lyvera-text-band-inner">
        {(textValue(fields.Eyebrow) || isEditing) && (
          <p className="lyvera-text-band-eyebrow">
            <ContentSdkText field={fields.Eyebrow} tag="span" />
          </p>
        )}
        <div className="lyvera-text-band-body">
          <ContentSdkRichText field={fields.Body} />
          {!richTextValue(fields.Body) && !isEditing && <p>{LYVERA_INTRO_DEFAULT}</p>}
        </div>
      </div>
    </section>
  );
};
