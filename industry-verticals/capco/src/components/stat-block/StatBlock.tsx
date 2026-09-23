'use client';

import { JSX } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asTextField, fieldString } from '@/lib/sitecore-fields';

type Fields = {
  Heading?: unknown;
  Intro?: unknown;
  StatOneValue?: unknown;
  StatOneLabel?: unknown;
  StatTwoValue?: unknown;
  StatTwoLabel?: unknown;
  StatThreeValue?: unknown;
  StatThreeLabel?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

const FALLBACK = [
  { value: '25+', label: 'Years in FS and Energy' },
  { value: '2,000+', label: 'Energy consultants' },
  { value: '1', label: 'Named expert per credential' },
];

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const stats = [
    { value: fields.StatOneValue, label: fields.StatOneLabel, fallback: FALLBACK[0] },
    { value: fields.StatTwoValue, label: fields.StatTwoLabel, fallback: FALLBACK[1] },
    { value: fields.StatThreeValue, label: fields.StatThreeLabel, fallback: FALLBACK[2] },
  ];

  return (
    <section className={`pm-stats w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <h2>
          {asTextField(fields.Heading) ? <Text field={asTextField(fields.Heading)} /> : 'Impact'}
        </h2>
        {(fieldString(fields.Intro) || isEditing) && (
          <p className="pm-stats__intro">
            <Text field={asTextField(fields.Intro)} />
            {!fieldString(fields.Intro) && 'Editor-configurable metrics.'}
          </p>
        )}
        <ul className="pm-stats__grid">
          {stats.map((stat, index) => (
            <li key={index}>
              <p className="pm-stats__value">
                {asTextField(stat.value) ? (
                  <Text field={asTextField(stat.value)} />
                ) : (
                  stat.fallback.value
                )}
              </p>
              <p className="pm-stats__label">
                {asTextField(stat.label) ? (
                  <Text field={asTextField(stat.label)} />
                ) : (
                  stat.fallback.label
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Default;
