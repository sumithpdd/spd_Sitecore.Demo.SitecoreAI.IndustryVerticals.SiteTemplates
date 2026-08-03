'use client';

import type { JSX, FormEvent } from 'react';
import { ChevronLeft, MoreVertical, User, X } from 'lucide-react';
import { DEMO_EMAIL, useDemoAuth } from '@/lib/demo-auth';
import { CdpSubscribeButton } from '@/components/cdp-profile-panel/CdpSubscribeButton';

export function DemoLoginModal(): JSX.Element | null {
  const {
    siteLabel,
    loginOpen,
    loginStep,
    closeLogin,
    selectAccount,
    backToAccount,
    completeLogin,
    loginWithEmail,
  } = useDemoAuth();

  if (!loginOpen) {
    return null;
  }

  const onCodeSubmit = (e: FormEvent) => {
    e.preventDefault();
    completeLogin();
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-login-title"
    >
      <div className="am-login-modal__card relative w-full max-w-md rounded-sm bg-white p-8 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={closeLogin}
          className="absolute top-4 right-4 rounded-full p-1 text-[#6b6b6b] transition-colors hover:text-[#0a0a0a]"
          aria-label="Close login dialog"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-[var(--am-teal)] uppercase">
          {siteLabel}
        </p>
        <p className="mb-8 text-2xl font-light tracking-tight text-[#0a0a0a]">Owners Club</p>

        {loginStep === 'account' ? (
          <>
            <h2 id="demo-login-title" className="m-0 text-lg font-semibold text-[#0a0a0a]">
              Owner sign in
            </h2>
            <p className="mt-2 mb-6 text-sm text-[#6b6b6b]">
              Sign in to access your Owners Club account and personalised ownership content.
            </p>
            <div className="border-t border-dashed border-[#e5e5e5]" />
            <button
              type="button"
              className="mt-4 flex w-full items-center gap-3 rounded-sm border border-[#e5e5e5] bg-[#f5f5f5] p-3 text-left transition-colors hover:border-[var(--am-teal)]"
              onClick={selectAccount}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--am-teal)]/15 text-[var(--am-teal)]">
                <User className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-[#0a0a0a]">{DEMO_EMAIL}</span>
              <MoreVertical className="h-5 w-5 shrink-0 text-[#6b6b6b]" aria-hidden />
            </button>
            <div className="mt-4 border-t border-dashed border-[#e5e5e5]" />
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-[#0a0a0a]">Another owner (email)</p>
              <CdpSubscribeButton
                variant="forma"
                defaultEmail={DEMO_EMAIL}
                subscribeLabel="Sign in as owner"
                subscribedLabel="Signed in!"
                onSubscribed={(email) => void loginWithEmail(email)}
              />
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="mb-4 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm text-[#6b6b6b] hover:text-[#0a0a0a]"
              onClick={backToAccount}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {DEMO_EMAIL}
            </button>
            <h2 id="demo-login-title" className="m-0 text-lg font-semibold text-[#0a0a0a]">
              Enter code
            </h2>
            <p className="mt-2 mb-6 text-sm text-[#6b6b6b]">We just sent a code to {DEMO_EMAIL}</p>
            <form onSubmit={onCodeSubmit}>
              <label htmlFor="demo-login-code" className="sr-only">
                Enter code
              </label>
              <input
                id="demo-login-code"
                type="text"
                placeholder="Enter code"
                className="w-full border-0 border-b border-[#e5e5e5] bg-transparent py-2 text-base text-[#0a0a0a] outline-none focus:border-[var(--am-teal)]"
                autoComplete="one-time-code"
              />
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="am-btn am-btn-teal rounded-sm px-6 py-2.5 text-sm font-semibold"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <button
        type="button"
        className="absolute inset-0 -z-10 cursor-default border-0 bg-transparent"
        aria-label="Close"
        onClick={closeLogin}
      />
    </div>
  );
}
