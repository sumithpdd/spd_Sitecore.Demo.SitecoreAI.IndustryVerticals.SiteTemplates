'use client';

import { JSX, useMemo, useState, FormEvent } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ComponentProps } from '@/lib/component-props';

type ReasonId = 'testdrive' | 'general';
type ModelId = 'vantage' | 'db12' | 'vanquish' | 'dbx-s';

type BodyStyle = {
  id: string;
  label: string;
  image: string;
};

const REASONS: Array<{ id: ReasonId; label: string; image: string }> = [
  { id: 'testdrive', label: 'Test Drive', image: '/images/enquiry-reason-testdrive.jpg' },
  { id: 'general', label: 'General', image: '/images/enquiry-reason-general.svg' },
];

const MODELS: Array<{ id: ModelId; label: string; image: string }> = [
  { id: 'vantage', label: 'Vantage', image: '/images/enquiry-model-vantage.jpg' },
  { id: 'db12', label: 'DB12', image: '/images/enquiry-model-db12.jpg' },
  { id: 'vanquish', label: 'Vanquish', image: '/images/enquiry-model-vanquish.jpg' },
  { id: 'dbx-s', label: 'DBX S', image: '/images/enquiry-model-dbx.jpg' },
];

const BODY_BY_MODEL: Record<ModelId, BodyStyle[]> = {
  vantage: [
    { id: 'vantage-s', label: 'Vantage S', image: '/images/vantage-s-hero.jpg' },
    { id: 'vantage-coupe', label: 'Vantage', image: '/images/vantage-coupe-hero.jpg' },
    {
      id: 'vantage-roadster',
      label: 'Vantage Roadster',
      image: '/images/vantage-roadster-hero.jpg',
    },
  ],
  db12: [
    { id: 'db12-s-coupe', label: 'DB12 S Coupe', image: '/images/enquiry-body-db12-s-coupe.jpg' },
    {
      id: 'db12-s-volante',
      label: 'DB12 S Volante',
      image: '/images/enquiry-body-db12-s-volante.jpg',
    },
    {
      id: 'db12-volante-60th',
      label: 'DB12 Volante: 60th Anniversary Edition',
      image: '/images/enquiry-body-db12-volante-60th.jpg',
    },
  ],
  vanquish: [
    { id: 'vanquish', label: 'Vanquish', image: '/images/vanquish-hero.jpg' },
    {
      id: 'vanquish-volante',
      label: 'Vanquish Volante',
      image: '/images/vanquish-volante-hero.jpg',
    },
  ],
  'dbx-s': [
    { id: 'dbx-s', label: 'DBX S', image: '/images/dbx-s-hero.jpg' },
    { id: 'dbx707', label: 'DBX707', image: '/images/dbx707-hero.jpg' },
  ],
};

const DEALERS = [
  'Aston Martin Mayfair',
  'Aston Martin Park Lane',
  'Aston Martin Brooklands',
  'Aston Martin Manchester',
  'Aston Martin Edinburgh',
];

type Props = ComponentProps & { fields?: Record<string, unknown> };

function SelectionCard({
  label,
  image,
  selected,
  onSelect,
  imageContain,
}: {
  label: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
  imageContain?: boolean;
}): JSX.Element {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={clsx(
        'flex min-h-[5.5rem] w-full items-center justify-between gap-3 overflow-hidden bg-[#f2f2f2] px-4 py-3 text-left transition-colors',
        selected ? 'ring-2 ring-[var(--am-teal)] ring-inset' : 'hover:bg-[#ebebeb]'
      )}
    >
      <span className="max-w-[55%] text-sm font-medium text-[#0a0a0a] md:text-[0.95rem]">
        {label}
      </span>
      <span className="relative h-16 w-28 shrink-0 md:h-20 md:w-36">
        <Image
          src={image}
          alt=""
          fill
          className={clsx(
            imageContain ? 'object-contain object-right' : 'object-cover object-center'
          )}
          sizes="144px"
        />
      </span>
    </button>
  );
}

export const Default = (_props: Props): JSX.Element => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState<ReasonId>('testdrive');
  const [model, setModel] = useState<ModelId>('db12');
  const [bodyId, setBodyId] = useState('db12-volante-60th');
  const [title, setTitle] = useState('Mr.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dealer, setDealer] = useState('');
  const [comments, setComments] = useState('');
  const [prefs, setPrefs] = useState({ email: false, phone: false, post: false, sms: false });

  const bodies = BODY_BY_MODEL[model];
  const selectedBody = useMemo(
    () => bodies.find((b) => b.id === bodyId) ?? bodies[0],
    [bodies, bodyId]
  );

  const onModelChange = (next: ModelId) => {
    setModel(next);
    setBodyId(BODY_BY_MODEL[next][0]?.id ?? '');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  if (step === 3) {
    return (
      <section className="component enquiry-form bg-white px-6 pt-28 pb-16 text-[#0a0a0a] md:px-10 md:pt-32 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Thank You,
            <br />
            {title} {firstName || 'Guest'} {lastName}.
          </h1>
          <p className="mt-6 text-lg text-[#6b6b6b]">
            Your preferred Aston Martin Dealership will contact you soon.
          </p>
          <dl className="mt-12 space-y-6 border-t border-[#e5e5e5] pt-8 text-sm">
            <div>
              <dt className="font-semibold">Selected model</dt>
              <dd className="mt-1 text-[#6b6b6b]">{selectedBody?.label}</dd>
            </div>
            <div>
              <dt className="font-semibold">Contact details</dt>
              <dd className="mt-1 text-[#6b6b6b]">
                {email || '—'} · {phone || '—'}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Selected dealership</dt>
              <dd className="mt-1 text-[#6b6b6b]">{dealer || '—'}</dd>
            </div>
          </dl>
          <a href="/" className="am-btn am-btn-teal mt-10 inline-flex">
            Back to home
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="component enquiry-form bg-white pt-24 text-[#0a0a0a] md:pt-28">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Enquire</h1>
        <p className="mt-2 text-base text-[#8a8a8a]">We&apos;re here to help. Let us know how.</p>

        <div className="mt-10 flex flex-wrap items-center gap-6 border-b border-[#e8e8e8] pb-6">
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white',
                step > 1 ? 'bg-[var(--am-teal)]' : 'bg-[#0a0a0a]'
              )}
            >
              {step > 1 ? '✓' : '1'}
            </span>
            <span
              className={clsx(
                'text-sm font-semibold',
                step > 1 ? 'text-[var(--am-teal)]' : 'text-[#0a0a0a]'
              )}
            >
              {step > 1 ? selectedBody?.label : 'Reason and model'}
            </span>
          </div>
          <div className="hidden h-px flex-1 bg-[#e8e8e8] sm:block" />
          <div className="flex items-center gap-3">
            <span
              className={clsx(
                'inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                step === 2 ? 'bg-[#0a0a0a] text-white' : 'bg-[#d0d0d0] text-white'
              )}
            >
              2
            </span>
            <span
              className={clsx(
                'text-sm font-semibold',
                step === 2 ? 'text-[#0a0a0a]' : 'text-[#9a9a9a]'
              )}
            >
              Contact Details
            </span>
          </div>
        </div>

        {step === 1 ? (
          <div className="mt-10 max-w-5xl space-y-10">
            <div>
              <h2 className="mb-4 text-sm font-semibold">Select A Reason</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {REASONS.map((item) => (
                  <SelectionCard
                    key={item.id}
                    label={item.label}
                    image={item.image}
                    selected={reason === item.id}
                    onSelect={() => setReason(item.id)}
                    imageContain={item.id === 'general'}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold">Select a model</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {MODELS.map((item) => (
                  <SelectionCard
                    key={item.id}
                    label={item.label}
                    image={item.image}
                    selected={model === item.id}
                    onSelect={() => onModelChange(item.id)}
                  />
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-sm font-semibold">Select a body style</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {bodies.map((item) => (
                  <SelectionCard
                    key={item.id}
                    label={item.label}
                    image={item.image}
                    selected={bodyId === item.id}
                    onSelect={() => setBodyId(item.id)}
                  />
                ))}
              </div>
            </div>

            <button type="button" className="am-btn am-btn-teal" onClick={() => setStep(2)}>
              Continue →
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-14">
            <form onSubmit={onSubmit} className="space-y-5">
              <p className="text-sm text-[#6b6b6b]">Your preferred dealer will be in touch soon.</p>

              <fieldset>
                <legend className="mb-2 text-sm font-medium">Title</legend>
                <div className="flex flex-wrap gap-4 text-sm">
                  {['Mr.', 'Mrs.', 'Ms.', 'Mx.'].map((t) => (
                    <label key={t} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="title"
                        checked={title === t}
                        onChange={() => setTitle(t)}
                        className="accent-[var(--am-teal)]"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">First name</span>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block font-medium">Last name</span>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1 block font-medium">Email</span>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium">Phone</span>
                <span className="mb-1 block text-xs text-[#8a8a8a]">
                  Please include your country code
                </span>
                <div className="flex">
                  <span className="inline-flex items-center border border-r-0 border-[#d8d8d8] bg-[#f7f7f7] px-3 text-sm">
                    🇬🇧 +44
                  </span>
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                  />
                </div>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium">Dealers</span>
                <select
                  required
                  value={dealer}
                  onChange={(e) => setDealer(e.target.value)}
                  className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                >
                  <option value="">Please select a dealer</option>
                  {DEALERS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium">Additional comments (Optional)</span>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full border border-[#d8d8d8] bg-white px-3 py-2.5 outline-none focus:border-[var(--am-teal)]"
                />
              </label>

              <p className="text-xs leading-relaxed text-[#6b6b6b]">
                We will never sell your data, will keep your details secure and will never share
                your data with third parties for marketing purposes. For further details please
                refer to our{' '}
                <a href="https://www.astonmartin.com/en-gb/legal/privacy" className="underline">
                  Privacy Policy
                </a>
                .
              </p>

              <div className="border-t border-[#e8e8e8] pt-6">
                <h3 className="text-base font-semibold">Stay Connected</h3>
                <p className="mt-2 text-sm text-[#6b6b6b]">
                  We would like to stay in touch with you to:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#6b6b6b]">
                  <li>Share Aston Martin news.</li>
                  <li>Inform you about new products and services.</li>
                  <li>
                    Offer you first sight of any promotions including cars, merchandise and
                    accessories.
                  </li>
                  <li>Invite you to join Aston Martin at events.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-5 text-sm">
                  {(
                    [
                      ['email', 'Email'],
                      ['phone', 'Phone'],
                      ['post', 'Post'],
                      ['sms', 'SMS'],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={prefs[key]}
                        onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                        className="accent-[var(--am-teal)]"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="am-btn am-btn-teal w-full">
                Submit
              </button>
            </form>

            <div className="relative min-h-[22rem] bg-[#f3f3f3] lg:min-h-full">
              <Image
                src="/images/enquiry-selected-car.jpg"
                alt={selectedBody?.label || 'Selected model'}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
