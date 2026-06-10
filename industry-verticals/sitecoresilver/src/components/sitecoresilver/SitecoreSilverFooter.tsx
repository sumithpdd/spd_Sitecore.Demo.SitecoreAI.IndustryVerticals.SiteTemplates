import type { JSX } from 'react';
import { TextField, useSitecore, Text as ContentSdkText } from '@sitecore-content-sdk/nextjs';
import Link from 'next/link';
import { ComponentProps } from '@/lib/component-props';
import { textValue } from '@/lib/sitecoresilver-field-utils';
import { FOOTER_DEFAULTS } from '@/lib/sitecoresilver-copenhagen-defaults';

export interface SitecoreSilverFooterFields {
  Title?: TextField;
  Meta?: TextField;
  LegalLine?: TextField;
}

export type SitecoreSilverFooterProps = ComponentProps & {
  fields?: SitecoreSilverFooterFields;
};

export const Default = (props: SitecoreSilverFooterProps): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const id = props.params?.RenderingIdentifier;
  const fields = props.fields ?? {};

  return (
    <footer className="component ss-footer sitecoresilver-texture" id={id}>
      <p className="ss-footer-title">
        <ContentSdkText field={fields.Title} tag="span" />
        {!textValue(fields.Title) && !isEditing && FOOTER_DEFAULTS.title}
      </p>
      <p className="ss-footer-meta">
        <ContentSdkText field={fields.Meta} tag="span" />
        {!textValue(fields.Meta) && !isEditing && FOOTER_DEFAULTS.meta}
      </p>
      <p className="ss-footer-legal">
        <ContentSdkText field={fields.LegalLine} tag="span" />
        {!textValue(fields.LegalLine) && !isEditing && (
          <>
            © 2026 Sitecore · 25 Years of Innovation · <Link href="/privacy">Privacy</Link> ·{' '}
            <Link href="/admin">Admin</Link>
          </>
        )}
      </p>
    </footer>
  );
};
