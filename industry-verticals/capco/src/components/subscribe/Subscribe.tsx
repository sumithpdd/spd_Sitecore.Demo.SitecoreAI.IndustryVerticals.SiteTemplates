'use client';

import { FormEvent, JSX, useState } from 'react';
import { Link as ContentSdkLink, RichText, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { EXPERTISE_SECTORS } from '@/lib/home-catalog';
import { SUBSCRIBE_COPY } from '@/lib/industry-catalog';
import { asLinkField, asTextField, fieldString } from '@/lib/sitecore-fields';
import Link from 'next/link';

type Fields = {
  ConnectHeading?: unknown;
  ConnectIntro?: unknown;
  SubscribeTitle?: unknown;
  ContactTitle?: unknown;
  ContactIntro?: unknown;
  ContactLink?: unknown;
  PrivacyNotice?: unknown;
  NewsletterLabel?: unknown;
  InsightsLabel?: unknown;
  SubmitLabel?: unknown;
  SuccessMessage?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const contact = asLinkField(fields.ContactLink);
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section className={`pm-subscribe w-full ${styles}`.trim()} id={id}>
      <div className="pm-wrap">
        <div className="pm-subscribe__intro">
          <h2>
            <Text field={asTextField(fields.ConnectHeading)} />
            {!fieldString(fields.ConnectHeading) && SUBSCRIBE_COPY.connectHeading}
          </h2>
          <p>
            <Text field={asTextField(fields.ConnectIntro)} />
            {!fieldString(fields.ConnectIntro) && SUBSCRIBE_COPY.connectIntro}
          </p>
        </div>
      </div>
      <div className="pm-subscribe__split">
        <div className="pm-subscribe__form-pane">
          <div className="pm-wrap pm-subscribe__pane-inner">
            <h3>
              <Text field={asTextField(fields.SubscribeTitle)} />
              {!fieldString(fields.SubscribeTitle) && SUBSCRIBE_COPY.subscribeTitle}
            </h3>
            {sent && !isEditing ? (
              <p className="pm-subscribe__success">
                {fieldString(fields.SuccessMessage) || SUBSCRIBE_COPY.success}
              </p>
            ) : (
              <form className="pm-subscribe__form" onSubmit={onSubmit}>
                <div className="pm-subscribe__row">
                  <label>
                    Salutation*
                    <select name="salutation" required defaultValue="">
                      <option value="" disabled>
                        Please select
                      </option>
                      {SUBSCRIBE_COPY.salutations.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    First name*
                    <input name="firstName" type="text" required autoComplete="given-name" />
                  </label>
                </div>
                <label>
                  Email*
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  Country*
                  <select name="country" required defaultValue="">
                    <option value="" disabled>
                      Please select
                    </option>
                    {SUBSCRIBE_COPY.countries.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <fieldset>
                  <legend>Expertise of interest*</legend>
                  <p>Select one or more areas of expertise you are interested in.</p>
                  <div className="pm-subscribe__checks">
                    {EXPERTISE_SECTORS.map((item) => (
                      <label key={item.slug} className="pm-subscribe__check">
                        <input type="checkbox" name="expertise" value={item.label} />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="pm-subscribe__legal">
                  {fields.PrivacyNotice ? (
                    <RichText field={fields.PrivacyNotice as never} />
                  ) : (
                    <>
                      <p>{SUBSCRIBE_COPY.privacy}</p>
                      <p>{SUBSCRIBE_COPY.consent}</p>
                    </>
                  )}
                </div>
                <label className="pm-subscribe__check">
                  <input type="checkbox" name="newsletter" />
                  {fieldString(fields.NewsletterLabel) || SUBSCRIBE_COPY.newsletter}
                </label>
                <label className="pm-subscribe__check">
                  <input type="checkbox" name="insights" />
                  {fieldString(fields.InsightsLabel) || SUBSCRIBE_COPY.insights}
                </label>
                <p className="pm-subscribe__unsub">{SUBSCRIBE_COPY.unsubscribe}</p>
                <button type="submit" className="pm-subscribe__submit">
                  {fieldString(fields.SubmitLabel) || SUBSCRIBE_COPY.submit}
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="pm-subscribe__contact-pane">
          <div className="pm-wrap pm-subscribe__pane-inner">
            <h3>
              <Text field={asTextField(fields.ContactTitle)} />
              {!fieldString(fields.ContactTitle) && SUBSCRIBE_COPY.contactTitle}
            </h3>
            <p>
              <Text field={asTextField(fields.ContactIntro)} />
              {!fieldString(fields.ContactIntro) && SUBSCRIBE_COPY.contactIntro}
            </p>
            {contact && (contact.value?.href || isEditing) ? (
              <ContentSdkLink field={contact} className="pm-subscribe__contact-link" />
            ) : (
              <Link className="pm-subscribe__contact-link" href={SUBSCRIBE_COPY.contactHref}>
                {SUBSCRIBE_COPY.contactCta}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;
