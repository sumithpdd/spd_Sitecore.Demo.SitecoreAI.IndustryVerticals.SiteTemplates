'use client';

import { FormEvent, JSX, useState } from 'react';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asTextField, fieldString } from '@/lib/sitecore-fields';
import { INDUSTRY_OPTIONS } from '@/lib/demo-auth';
import { useRouter } from 'next/router';

type Fields = {
  Heading?: unknown;
  Intro?: unknown;
  HubSpotFormId?: unknown;
  SubmitLabel?: unknown;
  SuccessMessage?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className={`pm-enquiry w-full ${props.params?.styles || ''}`.trim()}>
      <div className="pm-wrap py-16">
        <h2>
          {asTextField(fields.Heading) ? (
            <Text field={asTextField(fields.Heading)} />
          ) : (
            'Contact us'
          )}
        </h2>
        <p className="pm-industry__section-intro">
          {asTextField(fields.Intro) ? (
            <Text field={asTextField(fields.Intro)} />
          ) : (
            'Enquiry posts to HubSpot with journey context in this demo.'
          )}
        </p>
        {sent ? (
          <p className="pm-enquiry__success">
            {fieldString(fields.SuccessMessage) ||
              'Thank you. We have recorded this enquiry for the demo.'}
          </p>
        ) : (
          <form className="pm-enquiry__form" onSubmit={onSubmit}>
            <label>
              Name
              <input name="name" required />
            </label>
            <label>
              Email
              <input name="email" type="email" required />
            </label>
            <label>
              Industry
              <select name="industry" defaultValue="energy">
                {INDUSTRY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message
              <textarea name="message" rows={4} required />
            </label>
            <input type="hidden" name="journey" value={router.asPath} />
            <input
              type="hidden"
              name="hubspotFormId"
              value={fieldString(fields.HubSpotFormId) || 'capco-contact-enquiry'}
            />
            <button type="submit" className="pm-btn-light">
              {fieldString(fields.SubmitLabel) || 'Send enquiry'}
            </button>
          </form>
        )}
        {isEditing ? (
          <p className="pm-insights__hint">
            HubSpot form: <Text field={asTextField(fields.HubSpotFormId)} />
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
