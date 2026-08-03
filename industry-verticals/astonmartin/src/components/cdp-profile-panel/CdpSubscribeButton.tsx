'use client';

import { useState, type JSX } from 'react';
import clsx from 'clsx';
import { displayNameFromEmail, EMAIL_REGEX, identifyVisitorByEmail } from '@/lib/cdp/cdp-identity';

export type CdpSubscribeButtonProps = {
  onSubscribed?: (email: string, displayName: string) => void;
  subscribeLabel?: string;
  subscribedLabel?: string;
  variant?: 'default' | 'forma';
  className?: string;
  defaultEmail?: string;
};

export function CdpSubscribeButton({
  onSubscribed,
  subscribeLabel = 'Subscribe',
  subscribedLabel = 'Subscribed!',
  variant = 'default',
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

  const inputClass =
    variant === 'forma'
      ? 'mb-2 w-full rounded-lg border border-[#e8e8e8] bg-white px-4 py-2.5 text-sm text-[#1e1e1e] placeholder:text-[#9f9f9f] focus:border-[#c1a25f] focus:ring-2 focus:ring-[#c1a25f]/25 focus:outline-none'
      : 'mb-2 w-full rounded-[30px] bg-white px-4 py-2 text-[14px] text-[#1e1e1e] placeholder:text-gray-500 focus:ring-2 focus:ring-white focus:outline-none';

  const buttonClass =
    variant === 'forma'
      ? 'w-full rounded-lg bg-[#1e1e1e] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#333] disabled:opacity-60'
      : 'w-full rounded-[30px] bg-white px-4 py-2 text-[14px] font-bold text-[#006FB7] transition-colors hover:bg-gray-100 disabled:opacity-60';

  const successClass =
    variant === 'forma'
      ? 'w-full rounded-lg bg-[#faf3ea] px-4 py-2.5 text-sm font-semibold text-[#a8894a]'
      : 'w-full rounded-[30px] bg-green-100 px-4 py-2 text-[14px] font-bold text-green-700';

  if (subscribed) {
    return (
      <button type="button" disabled className={clsx(successClass, className)}>
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
        className={inputClass}
      />
      {error ? (
        <p
          className={clsx(
            'mb-2 text-[12px]',
            variant === 'forma' ? 'text-red-600' : 'text-yellow-200'
          )}
        >
          {error}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => void handleSubscribe()}
        disabled={busy}
        className={buttonClass}
      >
        {busy ? '…' : subscribeLabel}
      </button>
    </div>
  );
}
