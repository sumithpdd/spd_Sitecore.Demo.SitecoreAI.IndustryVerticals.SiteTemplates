'use client';

import { JSX, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { ADVICE } from '@/lib/openhand-catalog';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const article = ADVICE[0];
  const [draft, setDraft] = useState(article.body[1]);
  const [status, setStatus] = useState('Approved');

  return (
    <section className="oh-section" id={props.params?.RenderingIdentifier}>
      <div className="oh-wrap max-w-3xl">
        <p className="oh-kicker">Mini CMS</p>
        <h1 className="text-4xl" style={{ fontFamily: 'Source Serif 4, Georgia, serif' }}>
          Edit “{article.title}”
        </h1>
        <p className="oh-muted">
          Presenter surface — draft the Household Support Fund sentence, then approve. Not a live
          authoring API.
        </p>
        <label className="mt-6 block text-sm font-semibold">Body paragraph</label>
        <textarea
          className="mt-2 min-h-40 w-full rounded-xl border border-[var(--oh-line)] p-3"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="oh-btn oh-btn--ghost" onClick={() => setStatus('Draft')}>
            Save draft
          </button>
          <button
            type="button"
            className="oh-btn oh-btn--navy"
            onClick={() => setStatus('Approved')}
          >
            Approve
          </button>
          <span className="self-center text-sm">Workflow: {status}</span>
        </div>
      </div>
    </section>
  );
};

export default Default;
