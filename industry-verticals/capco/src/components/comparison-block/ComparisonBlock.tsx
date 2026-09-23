'use client';

import { JSX, useState } from 'react';
import { RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asTextField, fieldString } from '@/lib/sitecore-fields';

type Fields = {
  Heading?: unknown;
  LeftTitle?: unknown;
  LeftBody?: unknown;
  RightTitle?: unknown;
  RightBody?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const [side, setSide] = useState<'left' | 'right'>('left');
  const leftTitle = fieldString(fields.LeftTitle) || 'Fragmented signals';
  const rightTitle = fieldString(fields.RightTitle) || 'Explainable agents';

  return (
    <section className={`pm-compare w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <h2>
          {asTextField(fields.Heading) ? (
            <Text field={asTextField(fields.Heading)} />
          ) : (
            'Before and after'
          )}
        </h2>
        <div className="pm-compare__toggle" role="tablist">
          <button type="button" aria-pressed={side === 'left'} onClick={() => setSide('left')}>
            {leftTitle}
          </button>
          <button type="button" aria-pressed={side === 'right'} onClick={() => setSide('right')}>
            {rightTitle}
          </button>
        </div>
        <div className="pm-compare__pane">
          {side === 'left' ? (
            asTextField(fields.LeftBody) ? (
              <RichText field={asTextField(fields.LeftBody)} />
            ) : (
              <p>Separate tools. Informal reasoning. Hard to audit.</p>
            )
          ) : asTextField(fields.RightBody) ? (
            <RichText field={asTextField(fields.RightBody)} />
          ) : (
            <p>One governed workflow. Named expert on the credential.</p>
          )}
          {isEditing ? (
            <p className="pm-insights__hint">Author both sides of the comparison.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Default;
