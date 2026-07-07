'use client';

import { useState, type FormEvent, type JSX } from 'react';
import { DEMO_EMAIL } from '@/lib/demo-auth';
import { EMAIL_REGEX, identifyVisitorByEmail } from '@/lib/cdp/cdp-identity';

type RequestBrochureFormProps = {
  inputId: string;
  emailLabel: string;
  placeholder: string;
  buttonLabel: string;
  submitUrl: string;
};

function brochureRedirectUrl(submitUrl: string, email: string): string {
  const url = new URL(submitUrl, window.location.origin);
  url.searchParams.set('email', email);
  return `${url.pathname}${url.search}`;
}

export function RequestBrochureForm({
  inputId,
  emailLabel,
  placeholder,
  buttonLabel,
  submitUrl,
}: RequestBrochureFormProps): JSX.Element {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_REGEX.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setBusy(true);

    try {
      await identifyVisitorByEmail(value);
    } catch (err) {
      if (err instanceof Error && err.message.includes('valid email')) {
        setError(err.message);
        setBusy(false);
        return;
      }
      console.debug('Identity event failed:', err);
    }

    window.location.href = brochureRedirectUrl(submitUrl, value);
  };

  return (
    <form className="promo-request-brochure__form" onSubmit={(e) => void handleSubmit(e)}>
      <label htmlFor={inputId} className="sr-only">
        {emailLabel}
      </label>
      <input
        id={inputId}
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="promo-request-brochure__input"
      />
      {error ? <p className="promo-request-brochure__error">{error}</p> : null}
      <button type="submit" className="promo-request-brochure__button" disabled={busy}>
        {busy ? '…' : buttonLabel}
      </button>
    </form>
  );
}
