'use client';

import { useState, type JSX } from 'react';
import clsx from 'clsx';
import { displayNameFromEmail, EMAIL_REGEX, identifyVisitorByEmail } from '@/lib/cdp/cdp-identity';

export type CdpSubscribeButtonProps = {
  onSubscribed?: (email: string, displayName: string) => void;
  subscribeLabel?: string;
  subscribedLabel?: string;
  className?: string;
  defaultEmail?: string;
};

export function CdpSubscribeButton({
  onSubscribed,
  subscribeLabel = 'Identify student',
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
        className={clsx(
          'w-full rounded-lg bg-[#e8f4f3] px-4 py-2.5 text-sm font-semibold text-[var(--reading-teal)]',
          className
        )}
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
        placeholder="Enter your email"
        autoComplete="email"
        className="mb-2 w-full rounded-lg border border-[#ddd9db] bg-white px-4 py-2.5 text-sm text-[var(--reading-ink)] placeholder:text-[#9f9f9f] focus:border-[var(--reading-teal)] focus:ring-2 focus:ring-[var(--reading-teal)]/25 focus:outline-none"
      />
      {error ? <p className="mb-2 text-xs text-[var(--reading-red)]">{error}</p> : null}
      <button
        type="button"
        onClick={() => void handleSubscribe()}
        disabled={busy}
        className="w-full rounded-lg bg-[var(--reading-red)] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--reading-maroon)] disabled:opacity-60"
      >
        {busy ? '…' : subscribeLabel}
      </button>
    </div>
  );
}
