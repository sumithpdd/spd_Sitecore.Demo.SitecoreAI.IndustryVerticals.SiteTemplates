'use client';

import type { JSX } from 'react';
import {
  RichTextField,
  TextField,
  useSitecore,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { richTextFieldValue, textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraFAQItemFields {
  Question?: TextField;
  Answer?: RichTextField;
}

export type LyveraFAQItemProps = ComponentProps & {
  fields?: LyveraFAQItemFields;
};

export const Default = (props: LyveraFAQItemProps): JSX.Element | null => {
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const question = textFieldValue(fields.Question);
  const answer = richTextFieldValue(fields.Answer);

  if (!question && !isEditing) {
    return null;
  }

  return (
    <details className="lyvera-faq__item" id={props.params?.RenderingIdentifier}>
      <summary className="lyvera-faq__question">
        <span className="lyvera-faq__question-text">
          <ContentSdkText field={fields.Question} tag="span" />
        </span>
        <span className="lyvera-faq__toggle" aria-hidden="true">
          <span className="lyvera-faq__toggle-icon lyvera-faq__toggle-icon--plus">+</span>
          <span className="lyvera-faq__toggle-icon lyvera-faq__toggle-icon--minus">−</span>
        </span>
      </summary>
      {(answer || isEditing) && (
        <div className="lyvera-faq__answer">
          <ContentSdkRichText field={fields.Answer} />
        </div>
      )}
    </details>
  );
};
