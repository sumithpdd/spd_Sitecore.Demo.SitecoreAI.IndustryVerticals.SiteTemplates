import type { JSX } from 'react';
import { Text, TextField } from '@sitecore-content-sdk/nextjs';
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
  const id = props.params?.RenderingIdentifier;

  return (
    <footer className="component ss-footer sitecoresilver-texture" id={id}>
      <p className="ss-footer-title">
        <Text field={props.fields?.Title} tag="span" />
        {!textValue(props.fields?.Title) && FOOTER_DEFAULTS.title}
      </p>
      <p className="ss-footer-meta">
        <Text field={props.fields?.Meta} tag="span" />
        {!textValue(props.fields?.Meta) && FOOTER_DEFAULTS.meta}
      </p>
      <p className="ss-footer-legal">
        <Text field={props.fields?.LegalLine} tag="span" />
        {!textValue(props.fields?.LegalLine) && (
          <>
            © 2026 Sitecore · 25 Years of Innovation ·{' '}
            <Link href="/privacy">Privacy</Link> · <Link href="/admin">Admin</Link>
          </>
        )}
      </p>
    </footer>
  );
};
