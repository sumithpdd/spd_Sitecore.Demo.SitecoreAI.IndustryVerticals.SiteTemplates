import type { JSX } from 'react';
import {
  Placeholder,
  TextField,
  useSitecore,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/sitecoresilver-field-utils';
import { CAPABILITIES_SECTION_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverCapabilitiesSectionFields {
  Eyebrow?: TextField;
  Title?: TextField;
  Subtitle?: TextField;
}

export type SitecoreSilverCapabilitiesSectionProps = ComponentProps & {
  fields?: SitecoreSilverCapabilitiesSectionFields;
};

export const Default = (props: SitecoreSilverCapabilitiesSectionProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const phKey = `sitecoresilver-capability-cards-${props.params?.DynamicPlaceholderId ?? '1'}`;
  const fields = props.fields ?? {};

  return (
    <section className="component ss-capabilities" id={id}>
      <div className="ss-capabilities-inner">
        <header className="ss-capabilities-header">
          <p className="ss-capabilities-eyebrow">
            <ContentSdkText field={fields.Eyebrow} tag="span" />
            {!textValue(fields.Eyebrow) && !isEditing && CAPABILITIES_SECTION_DEFAULTS.eyebrow}
          </p>
          <h1 className="ss-capabilities-title">
            <ContentSdkText field={fields.Title} tag="span" />
            {!textValue(fields.Title) && !isEditing && CAPABILITIES_SECTION_DEFAULTS.title}
          </h1>
          <p className="ss-capabilities-subtitle">
            <ContentSdkText field={fields.Subtitle} tag="span" />
            {!textValue(fields.Subtitle) && !isEditing && CAPABILITIES_SECTION_DEFAULTS.subtitle}
          </p>
        </header>
        <div className="ss-capabilities-grid">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};
