'use client';

import { FormEvent, JSX, useState } from 'react';
import clsx from 'clsx';
import { CheckCircle2 } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

type Step = 1 | 2 | 3;

/**
 * Multi-step Clearing enquire/apply form stub (Dynamics-inspired).
 */
export default function ClearingApply(_props: Props): JSX.Element {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('Computer Science and Artificial Intelligence');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="component clearing-apply bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[36vh] overflow-hidden bg-[var(--reading-charcoal)]">
        <img
          src={demoImages.clearingTyping}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 mx-auto flex min-h-[36vh] max-w-7xl flex-col justify-end px-4 py-10 md:px-8">
          <h1 className="text-3xl font-bold text-white md:text-5xl">
            <span className="reading-eyebrow">Get Clearing ready</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/90">
            Complete this short enquiry to start Clearing Fast Track at the University of Essex.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8 md:py-16">
        {submitted ? (
          <div className="border border-[var(--reading-teal)] bg-[#f0faf9] p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-[var(--reading-teal)]" aria-hidden />
            <h2 className="mt-4 text-2xl font-bold">Thank you — we have received your enquiry</h2>
            <p className="mt-3 text-[var(--reading-charcoal)]">
              A member of the Clearing team will be in touch about <strong>{course}</strong>. You
              can also call{' '}
              <a href="tel:+441206873666" className="font-bold text-[var(--reading-red)]">
                01206 873666
              </a>
              .
            </p>
            <a href="/clearing" className="reading-btn reading-btn-primary mt-8">
              Back to Clearing
            </a>
          </div>
        ) : (
          <>
            <ol className="mb-8 flex gap-2 text-sm font-bold">
              {([1, 2, 3] as Step[]).map((n) => (
                <li
                  key={n}
                  className={clsx(
                    'flex-1 border-b-4 pb-2 text-center',
                    step >= n
                      ? 'border-[var(--reading-red)] text-[var(--reading-ink)]'
                      : 'border-[#ddd9db] text-[#999]'
                  )}
                >
                  Step {n}
                </li>
              ))}
            </ol>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">Your details</h2>
                  <div>
                    <label className="reading-label" htmlFor="clearing-name">
                      Full name
                    </label>
                    <input
                      id="clearing-name"
                      className="reading-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="reading-label" htmlFor="clearing-email">
                      Email address
                    </label>
                    <input
                      id="clearing-email"
                      type="email"
                      className="reading-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <button
                    type="button"
                    className="reading-btn reading-btn-primary"
                    onClick={() => setStep(2)}
                    disabled={!name.trim() || !email.trim()}
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">Course interest</h2>
                  <div>
                    <label className="reading-label" htmlFor="clearing-course">
                      Course
                    </label>
                    <select
                      id="clearing-course"
                      className="reading-input"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                    >
                      <option>Computer Science and Artificial Intelligence</option>
                      <option>Business and Management</option>
                      <option>Psychology</option>
                      <option>Other / not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="reading-label" htmlFor="clearing-phone">
                      Phone (optional)
                    </label>
                    <input
                      id="clearing-phone"
                      type="tel"
                      className="reading-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="reading-btn reading-btn-secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="reading-btn reading-btn-primary"
                      onClick={() => setStep(3)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-bold">Review and submit</h2>
                  <div>
                    <label className="reading-label" htmlFor="clearing-notes">
                      Anything else we should know?
                    </label>
                    <textarea
                      id="clearing-notes"
                      className="reading-input min-h-[7rem]"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <dl className="space-y-2 bg-[var(--reading-surface)] p-5 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">Name</dt>
                      <dd>{name}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">Email</dt>
                      <dd>{email}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="font-bold">Course</dt>
                      <dd>{course}</dd>
                    </div>
                    {phone ? (
                      <div className="flex justify-between gap-4">
                        <dt className="font-bold">Phone</dt>
                        <dd>{phone}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="reading-btn reading-btn-secondary"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button type="submit" className="reading-btn reading-btn-primary">
                      Submit enquiry
                    </button>
                  </div>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </section>
  );
}
