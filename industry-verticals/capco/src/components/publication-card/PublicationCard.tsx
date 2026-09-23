'use client';

import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asTextField, fieldString, linkHref } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Fields = {
  Heading?: unknown;
  IssueTitle?: unknown;
  IssueNumber?: unknown;
  Format?: unknown;
  PdfUrl?: unknown;
  HtmlHref?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const htmlHref = fieldString(fields.HtmlHref) || '/capco-institute/journal-62';
  const pdfHref = linkHref(fields.PdfUrl);
  const format = fieldString(fields.Format) || 'HTML';

  return (
    <section className={`pm-publication w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <p className="pm-section-kicker">
          {asTextField(fields.Heading) ? (
            <Text field={asTextField(fields.Heading)} />
          ) : (
            'Capco Institute'
          )}
        </p>
        <article className="pm-publication__card">
          <p className="pm-outlaw__kicker">
            {asTextField(fields.IssueNumber) ? (
              <Text field={asTextField(fields.IssueNumber)} />
            ) : (
              '#62'
            )}{' '}
            · {format}
          </p>
          <h2>
            {asTextField(fields.IssueTitle) ? (
              <Text field={asTextField(fields.IssueTitle)} />
            ) : (
              'A new world order'
            )}
          </h2>
          <p>HTML article page — the fix if the live journal is PDF-only.</p>
          <p className="pm-publication__actions">
            <Link href={htmlHref}>Read as HTML</Link>
            {pdfHref ? (
              <a href={pdfHref} target="_blank" rel="noreferrer">
                PDF
              </a>
            ) : isEditing ? (
              <span>Optional PdfUrl</span>
            ) : null}
          </p>
        </article>
      </div>
    </section>
  );
};

export default Default;
