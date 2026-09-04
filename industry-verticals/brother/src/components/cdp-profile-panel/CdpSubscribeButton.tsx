'use client';

import { useState, type JSX } from 'react';
import { displayNameFromEmail, EMAIL_REGEX, identifyVisitorByEmail } from 'lib/cdp/cdp-identity';

export type CdpSubscribeButtonProps = {
  onSubscribed?: (email: string, displayName: string) => void;
  subscribeLabel?: string;
  subscribedLabel?: string;
  className?: string;
  defaultEmail?: string;
};

export function CdpSubscribeButton({
  onSubscribed,
  subscribeLabel = 'Identify customer',
  subscribedLabel = 'Identified',
  className,
  defaultEmail = '',
}: CdpSubscribeButtonProps): JSX.Element {
  const [email, setEmail] = useState(defaultEmail);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubscribe = async () => {
    const value = email.trim();
    if (!EMAIL_REGEX.test(value)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setBusy(true);

    try {
      await identifyVisitorByEmail(value);
      setSubscribed(true);
      onSubscribed?.(value, displayNameFromEmail(value));
    } catch (e) {
      if (e instanceof Error && e.message.includes('valid email')) {
        setError(e.message);
      } else {
        console.debug('Identity event failed:', e);
      }
    } finally {
      setBusy(false);
    }
  };

  if (subscribed) {
    return (
      <button
        type="button"
        disabled
        className={`brother-cdp-identify brother-cdp-identify--done ${className || ''}`.trim()}
      >
        {subscribedLabel}
      </button>
    );
  }

  return (
    <div className={className}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void handleSubscribe();
        }}
        placeholder="Enter customer email"
        autoComplete="email"
        className="brother-cdp-identify__input"
      />
      {error ? <p className="brother-cdp-identify__error">{error}</p> : null}
      <button
        type="button"
        onClick={() => void handleSubscribe()}
        disabled={busy}
        className="brother-cdp-identify__btn"
      >
        {busy ? '…' : subscribeLabel}
      </button>
    </div>
  );
}
