'use client';

import { FormEvent, JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const [known, setKnown] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setKnown(true);
  };

  return (
    <section className="asos-wrap max-w-md py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">Sign in</h1>
      {known ? (
        <p className="mt-6 text-sm">
          Welcome back, Maya — petite denim and the Belle Paris cami are waiting in My Edit.
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
          <button className="asos-btn-dark" type="submit">
            Sign in
          </button>
        </form>
      )}
    </section>
  );
};

export default Default;
