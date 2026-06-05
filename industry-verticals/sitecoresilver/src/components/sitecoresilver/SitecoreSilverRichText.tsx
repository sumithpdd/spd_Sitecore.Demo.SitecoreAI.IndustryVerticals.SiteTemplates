import type { JSX } from 'react';
import {
  RichText as ContentSdkRichText,
  RichTextField,
  Text,
  TextField,
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
  const id = props.params?.RenderingIdentifier;
  const body = richTextValue(props.fields?.Text);

  return (
    <section className="component ss-rich-glass" id={id}>
      <div className="ss-rich-glass-panel sitecoresilver-texture">
        <p className="ss-rich-glass-eyebrow">
          <Text field={props.fields?.Eyebrow} tag="span" />
          {!textValue(props.fields?.Eyebrow) && RICH_GLASS_DEFAULTS.eyebrow}
        </p>
        {body ? (
          <div className="ss-rich-glass-body" dangerouslySetInnerHTML={{ __html: body }} />
        ) : (
          <p className="ss-rich-glass-body">{RICH_GLASS_DEFAULTS.body}</p>
        )}
      </div>
    </section>
  );
};
