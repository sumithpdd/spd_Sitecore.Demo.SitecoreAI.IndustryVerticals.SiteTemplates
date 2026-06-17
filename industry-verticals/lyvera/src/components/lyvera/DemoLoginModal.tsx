'use client';

import type { JSX, FormEvent } from 'react';
import { ChevronLeft, MoreVertical, User } from 'lucide-react';
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
      className="kp-login-modal fixed inset-0 z-[300] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-login-title"
    >
      <div className="kp-login-modal__card w-full max-w-md rounded-sm bg-white p-8 shadow-xl md:p-10">
        <p className="mb-8 text-2xl font-bold tracking-tight text-[#1a3d2e]">{siteLabel}</p>

        {loginStep === 'account' ? (
          <>
            <h2 id="demo-login-title" className="m-0 text-xl font-bold text-[#1a1a1a]">
              Choose an account
            </h2>
            <p className="mt-2 mb-6 text-sm text-[#6b6b6b]">
              Sign in to access your {siteLabel} account
            </p>
            <div className="border-t border-dashed border-[#c8c8c8]" />
            <button
              type="button"
              className="mt-4 flex w-full items-center gap-3 border-0 bg-[#f5f5f5] p-3 text-left"
              onClick={selectAccount}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-[#e0e0e0] text-[#555]">
                <User className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-[#1a1a1a]">{DEMO_EMAIL}</span>
              <MoreVertical className="h-5 w-5 shrink-0 text-[#888]" aria-hidden />
            </button>
            <div className="mt-4 border-t border-dashed border-[#c8c8c8]" />
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">Another account (email)</p>
              <CdpSubscribeButton
                variant="kp"
                subscribeLabel="Sign in"
                subscribedLabel="Signed in!"
                onSubscribed={(email) => void loginWithEmail(email)}
              />
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="mb-4 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm text-[#1a1a1a]"
              onClick={backToAccount}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {DEMO_EMAIL}
            </button>
            <h2 id="demo-login-title" className="m-0 text-xl font-bold text-[#1a1a1a]">
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
                className="w-full border-0 border-b border-[#1a1a1a] bg-transparent py-2 text-base outline-none"
                autoComplete="one-time-code"
              />
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-sm bg-[#1a3d2e] px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Next
                </button>
              </div>
            </form>
          </>
        )}

        <button
          type="button"
          className="sr-only"
          onClick={closeLogin}
          aria-label="Close login dialog"
        />
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
