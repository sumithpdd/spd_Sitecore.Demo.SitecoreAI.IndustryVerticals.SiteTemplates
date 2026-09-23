'use client';

import { FormEvent, JSX, useState } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asTextField, fieldString } from '@/lib/sitecore-fields';
import { INDUSTRY_OPTIONS, REGION_OPTIONS, useDemoAuth } from '@/lib/demo-auth';

type Fields = {
  Heading?: unknown;
  Intro?: unknown;
  SubmitLabel?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

const TOPICS = ['AI', 'Payments', 'Energy', 'Regulation', 'T+1', 'Data'];

export const Default = (props: Props): JSX.Element => {
  const { preferences, setPreferences } = useDemoAuth();
  const fields = props.fields || {};
  const [topics, setTopics] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const industries = data.getAll('industry').map(String);
    const region = String(data.get('region') || 'all');
    setPreferences({ industries, region });
    setTopics(data.getAll('topic').map(String));
    setSaved(true);
  };

  return (
    <section className={`pm-prefs w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <h2>
          {asTextField(fields.Heading) ? (
            <Text field={asTextField(fields.Heading)} />
          ) : (
            'Preference centre'
          )}
        </h2>
        <p className="pm-industry__section-intro">
          {asTextField(fields.Intro) ? (
            <Text field={asTextField(fields.Intro)} />
          ) : (
            'Industry, topic and region. Greenfield — nothing to mirror on capco.com.'
          )}
        </p>
        <form className="pm-prefs__form" onSubmit={onSubmit}>
          <fieldset>
            <legend>Industry</legend>
            {INDUSTRY_OPTIONS.map((item) => (
              <label key={item.slug}>
                <input
                  type="checkbox"
                  name="industry"
                  value={item.slug}
                  defaultChecked={preferences.industries.includes(item.slug)}
                />
                {item.label}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Topic</legend>
            {TOPICS.map((topic) => (
              <label key={topic}>
                <input
                  type="checkbox"
                  name="topic"
                  value={topic}
                  defaultChecked={topics.includes(topic)}
                />
                {topic}
              </label>
            ))}
          </fieldset>
          <label>
            Region
            <select name="region" defaultValue={preferences.region}>
              {REGION_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="pm-btn-light">
            {fieldString(fields.SubmitLabel) || 'Save preferences'}
          </button>
        </form>
        {saved ? (
          <p className="pm-enquiry__success">Preferences saved for this demo session.</p>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
