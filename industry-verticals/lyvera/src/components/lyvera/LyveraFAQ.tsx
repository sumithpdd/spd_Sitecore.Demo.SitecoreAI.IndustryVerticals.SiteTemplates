'use client';

import type { JSX } from 'react';
import { useMemo } from 'react';
import {
  Placeholder,
  TextField,
  useSitecore,
  Text as ContentSdkText,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { LYVERA_FAQ_HEADING, LYVERA_FAQ_ITEMS } from '@/lib/lyvera-faq-content';
import { placeholderHasComponents, resolveChildPlaceholderKey } from '@/lib/placeholder-utils';
import { textFieldValue } from '@/lib/lyvera-field-utils';

export interface LyveraFAQFields {
  Heading?: TextField;
}

export type LyveraFAQProps = ComponentProps & {
  fields?: LyveraFAQFields;
};

function StaticFaqList(): JSX.Element {
  return (
    <>
      {LYVERA_FAQ_ITEMS.map((item) => (
        <details key={item.id} className="lyvera-faq__item" id={item.id}>
          <summary className="lyvera-faq__question">
            <span className="lyvera-faq__question-text">{item.question}</span>
            <span className="lyvera-faq__toggle" aria-hidden="true">
              <span className="lyvera-faq__toggle-icon lyvera-faq__toggle-icon--plus">+</span>
              <span className="lyvera-faq__toggle-icon lyvera-faq__toggle-icon--minus">−</span>
            </span>
          </summary>
          <div className="lyvera-faq__answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </>
  );
}

export const Default = (props: LyveraFAQProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { DynamicPlaceholderId } = props.params;
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;
  const fields = props.fields ?? {};
  const heading = textFieldValue(fields.Heading) || LYVERA_FAQ_HEADING;

  const itemsPh = useMemo(
    () =>
      resolveChildPlaceholderKey(
        props.rendering,
        `lyvera-faq-items-${DynamicPlaceholderId ?? '1'}`
      ),
    [props.rendering, DynamicPlaceholderId]
  );

  const hasCmsItems = placeholderHasComponents(props.rendering, itemsPh);

  return (
    <section className="component lyvera-faq" id={id ?? 'faqs'}>
      <div className="lyvera-faq__inner">
        <h2 className="lyvera-faq__heading">
          {(textFieldValue(fields.Heading) || isEditing) && (
            <ContentSdkText field={fields.Heading} tag="span" />
          )}
          {!textFieldValue(fields.Heading) && !isEditing && heading}
        </h2>

        <div className="lyvera-faq__list">
          {hasCmsItems || isEditing ? (
            <Placeholder name={itemsPh} rendering={props.rendering} />
          ) : (
            <StaticFaqList />
          )}
        </div>
      </div>
    </section>
  );
};
