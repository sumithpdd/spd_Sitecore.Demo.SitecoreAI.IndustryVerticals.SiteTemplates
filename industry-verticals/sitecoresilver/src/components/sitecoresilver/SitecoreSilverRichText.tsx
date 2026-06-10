import type { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  RichTextField,
  TextField,
  useSitecore,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { richTextValue, textValue } from '@/lib/sitecoresilver-field-utils';
import { RICH_GLASS_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverRichTextFields {
  Eyebrow?: TextField;
  Text?: RichTextField;
}

export type SitecoreSilverRichTextProps = ComponentProps & {
  fields?: SitecoreSilverRichTextFields;
};

export const Default = ({ params, fields }: SitecoreSilverRichTextProps): JSX.Element => {
  const id = params?.RenderingIdentifier;

  return (
    <div className={`component rich-text ${params?.styles ?? ''}`} id={id}>
      <div className="component-content">
        <ContentSdkRichText field={fields?.Text} />
      </div>
    </div>
  );
};

/** Glass panel variant — Copenhagen Silver quote block */
export const GlassPanel = (props: SitecoreSilverRichTextProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <section className="component ss-rich-glass" id={id}>
      <div className="ss-rich-glass-panel sitecoresilver-texture">
        <p className="ss-rich-glass-eyebrow">
          <ContentSdkText field={fields.Eyebrow} tag="span" />
          {!textValue(fields.Eyebrow) && !isEditing && RICH_GLASS_DEFAULTS.eyebrow}
        </p>
        <div className="ss-rich-glass-body">
          <ContentSdkRichText field={fields.Text} />
          {!richTextValue(fields.Text) && !isEditing && <p>{RICH_GLASS_DEFAULTS.body}</p>}
        </div>
      </div>
    </section>
  );
};
