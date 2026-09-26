'use client';

import { FormEvent, JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { BODY_FITS, STORY, type BodyFit } from '@/lib/asos-journey';
import { saveProfile } from '@/lib/asos-profile';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const [known, setKnown] = useState(false);
  const [bodyFit, setBodyFit] = useState<BodyFit>('standard');
  const [size, setSize] = useState('8');

  const submit = (event: FormEvent) => {
    event.preventDefault();
    saveProfile({ name: STORY.persona, signedIn: true, bodyFit, size });
    setKnown(true);
  };

  return (
    <section className="asos-wrap max-w-md py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">Sign in</h1>
      {known ? (
        <p className="mt-6 text-sm">
          Welcome back, {STORY.persona}. Your fit is {bodyFit === 'plus' ? 'curve' : bodyFit}, size
          UK {size}. Listings and product pages will use it.
        </p>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <label className="block text-sm">
            Email
            <input
              className="mt-1 w-full border border-[#ddd] px-3 py-2"
              defaultValue="maya@asos.demo"
            />
          </label>
          <label className="block text-sm">
            Password
            <input
              className="mt-1 w-full border border-[#ddd] px-3 py-2"
              type="password"
              defaultValue="demo"
            />
          </label>
          <label className="block text-sm">
            Body fit
            <select
              className="mt-1 w-full border border-[#ddd] px-3 py-2"
              value={bodyFit}
              onChange={(event) => setBodyFit(event.target.value as BodyFit)}
            >
              {BODY_FITS.map((item) => (
                <option key={item} value={item}>
                  {item === 'plus' ? 'curve' : item}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            Size
            <select
              className="mt-1 w-full border border-[#ddd] px-3 py-2"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            >
              {['4', '6', '8', '10', '12', '14', '16'].map((item) => (
                <option key={item} value={item}>
                  UK {item}
                </option>
              ))}
            </select>
          </label>
          <button className="asos-btn-dark" type="submit">
            Sign in
          </button>
        </form>
      )}
    </section>
  );
};

export default Default;
