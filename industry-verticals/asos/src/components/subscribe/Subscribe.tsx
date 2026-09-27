'use client';

import { FormEvent, JSX, useContext, useState } from 'react';
import {
  Image,
  ImageField,
  RichText,
  RichTextField,
  SitecoreProviderReactContext,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import { User } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { DAM } from '@/lib/dam-registry';

type Fields = {
  Image?: ImageField;
  Heading?: TextField;
  Placeholder?: TextField;
  ButtonLabel?: TextField;
  PreferenceLabel?: TextField;
  Terms?: RichTextField;
  SuccessMessage?: TextField;
};

type Props = ComponentProps & { fields?: Fields };

const LOGO = DAM['asos-logo-white.png']?.src || '/asos/logo-white.png';

const DEFAULTS = {
  heading: 'Subscribe for up to 15% off your first order*',
  placeholder: 'Enter your email',
  button: 'Subscribe',
  preference: 'Shopping preference',
  terms:
    "*T&Cs apply. By entering your email, you consent to receive marketing emails from ASOS & see our Privacy Policy and Terms & Conditions. You can opt out at any time by clicking 'Unsubscribe' at the bottom of our emails.",
  success: 'You are on the list. Watch your inbox for the offer.',
};

function textOf(field: TextField | undefined, fallback: string): string {
  return typeof field?.value === 'string' && field.value.trim() ? field.value : fallback;
}

export const Default = (props: Props): JSX.Element => {
  const sitecore = useContext(SitecoreProviderReactContext);
  const isEditing = Boolean(sitecore?.page?.mode?.isEditing);
  const fields = props.fields;
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const styles = `${props.params?.styles || ''}`.trim();
  const heading = textOf(fields?.Heading, DEFAULTS.heading);
  const placeholder = textOf(fields?.Placeholder, DEFAULTS.placeholder);
  const button = textOf(fields?.ButtonLabel, DEFAULTS.button);
  const preference = textOf(fields?.PreferenceLabel, DEFAULTS.preference);
  const success = textOf(fields?.SuccessMessage, DEFAULTS.success);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className={`asos-subscribe ${styles}`.trim()} id={props.params?.RenderingIdentifier}>
      <div className="asos-subscribe__inner">
        <div className="asos-subscribe__logo">
          {fields?.Image ? (
            <Image field={fields.Image} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- Content Hub public link
            <img src={LOGO} alt="ASOS" />
          )}
        </div>
        <form className="asos-subscribe__form" onSubmit={submit}>
          <h2>{fields?.Heading ? <Text field={fields.Heading} /> : heading}</h2>
          {done && !isEditing ? (
            <p className="asos-subscribe__success">
              {fields?.SuccessMessage ? <Text field={fields.SuccessMessage} /> : success}
            </p>
          ) : (
            <div className="asos-subscribe__row">
              <label className="sr-only" htmlFor="asos-subscribe-email">
                {placeholder}
              </label>
              <input
                id="asos-subscribe-email"
                type="email"
                required
                value={email}
                placeholder={placeholder}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button type="button" className="asos-subscribe__pref" aria-label={preference}>
                <User className="size-4" />
                {isEditing && fields?.PreferenceLabel ? (
                  <Text field={fields.PreferenceLabel} />
                ) : null}
              </button>
              <button type="submit">
                {fields?.ButtonLabel ? <Text field={fields.ButtonLabel} /> : button}
              </button>
            </div>
          )}
          {isEditing && fields?.Placeholder ? (
            <p className="asos-subscribe__edit">
              Placeholder: <Text field={fields.Placeholder} />
            </p>
          ) : null}
          <div className="asos-subscribe__terms">
            {fields?.Terms ? <RichText field={fields.Terms} /> : <p>{DEFAULTS.terms}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Default;
