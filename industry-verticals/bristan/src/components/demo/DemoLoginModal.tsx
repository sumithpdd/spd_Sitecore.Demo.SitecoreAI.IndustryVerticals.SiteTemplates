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
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#1e1e1e]/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-login-title"
    >
      <div className="forma-login-modal__card relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={closeLogin}
          className="text-foreground-muted hover:text-foreground absolute top-4 right-4 rounded-full p-1 transition-colors"
          aria-label="Close login dialog"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <p className="text-accent mb-2 text-sm font-semibold tracking-[0.2em] uppercase">
          {siteLabel}
        </p>
        <p className="text-foreground mb-8 font-serif text-2xl font-light tracking-tight">
          Welcome back
        </p>

        {loginStep === 'account' ? (
          <>
            <h2 id="demo-login-title" className="text-foreground m-0 text-lg font-semibold">
              Choose an account
            </h2>
            <p className="text-foreground-muted mt-2 mb-6 text-sm">
              Sign in to access your {siteLabel} account and saved preferences.
            </p>
            <div className="border-border border-t border-dashed" />
            <button
              type="button"
              className="border-border hover:border-accent mt-4 flex w-full items-center gap-3 rounded-lg border bg-[#faf3ea] p-3 text-left transition-colors"
              onClick={selectAccount}
            >
              <span className="bg-accent/15 text-accent inline-flex h-10 w-10 items-center justify-center rounded-full">
                <User className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-foreground min-w-0 flex-1 truncate text-sm">{DEMO_EMAIL}</span>
              <MoreVertical className="text-foreground-muted h-5 w-5 shrink-0" aria-hidden />
            </button>
            <div className="border-border mt-4 border-t border-dashed" />
            <div className="mt-6">
              <p className="text-foreground mb-3 text-sm font-semibold">Another account (email)</p>
              <CdpSubscribeButton
                variant="forma"
                defaultEmail={DEMO_EMAIL}
                subscribeLabel="Sign in with email"
                subscribedLabel="Signed in!"
                onSubscribed={(email) => void loginWithEmail(email)}
              />
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className="text-foreground-muted hover:text-foreground mb-4 inline-flex items-center gap-1 border-0 bg-transparent p-0 text-sm"
              onClick={backToAccount}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
              {DEMO_EMAIL}
            </button>
            <h2 id="demo-login-title" className="text-foreground m-0 text-lg font-semibold">
              Enter code
            </h2>
            <p className="text-foreground-muted mt-2 mb-6 text-sm">
              We just sent a code to {DEMO_EMAIL}
            </p>
            <form onSubmit={onCodeSubmit}>
              <label htmlFor="demo-login-code" className="sr-only">
                Enter code
              </label>
              <input
                id="demo-login-code"
                type="text"
                placeholder="Enter code"
                className="border-border text-foreground focus:border-accent w-full border-0 border-b bg-transparent py-2 text-base outline-none"
                autoComplete="one-time-code"
              />
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-success hover:bg-success/90 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-colors"
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
