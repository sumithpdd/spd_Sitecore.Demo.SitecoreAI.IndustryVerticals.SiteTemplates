import type { JSX } from 'react';
import { Placeholder, Text, TextField } from '@sitecore-content-sdk/nextjs';
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
  const id = props.params?.RenderingIdentifier;
  const phKey = `sitecoresilver-capability-cards-${props.params?.DynamicPlaceholderId ?? '1'}`;

  return (
    <section className="component ss-capabilities" id={id}>
      <div className="ss-capabilities-inner">
        <header className="ss-capabilities-header">
          <p className="ss-capabilities-eyebrow">
            <Text field={props.fields?.Eyebrow} tag="span" />
            {!textValue(props.fields?.Eyebrow) && CAPABILITIES_SECTION_DEFAULTS.eyebrow}
          </p>
          <h1 className="ss-capabilities-title">
            <Text field={props.fields?.Title} tag="span" />
            {!textValue(props.fields?.Title) && CAPABILITIES_SECTION_DEFAULTS.title}
          </h1>
          <p className="ss-capabilities-subtitle">
            <Text field={props.fields?.Subtitle} tag="span" />
            {!textValue(props.fields?.Subtitle) && CAPABILITIES_SECTION_DEFAULTS.subtitle}
          </p>
        </header>
        <div className="ss-capabilities-grid">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </section>
  );
};
