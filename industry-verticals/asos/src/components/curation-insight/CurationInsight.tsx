'use client';

import { JSX, useEffect, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { curationStats } from '@/lib/asos-save';
import { STORY } from '@/lib/asos-journey';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const [stats, setStats] = useState(curationStats());

  useEffect(() => {
    const refresh = () => setStats(curationStats());
    refresh();
    window.addEventListener('asos-save', refresh);
    return () => window.removeEventListener('asos-save', refresh);
  }, []);

  return (
    <section className="asos-wrap asos-insight py-8" id={props.params?.RenderingIdentifier}>
      <p className="text-xs font-bold tracking-wide uppercase">Editor</p>
      <h1 className="text-3xl font-bold">Curation insight</h1>
      <p className="mt-2 max-w-2xl text-sm">
        What customers are saving — by size, market and combination. Close the loop: publish as an
        edit.
      </p>
      <dl className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="bg-[#f6f6f6] p-4">
          <dt className="text-xs uppercase">Saves</dt>
          <dd className="text-3xl font-black">{stats.saves}</dd>
        </div>
        <div className="bg-[#f6f6f6] p-4">
          <dt className="text-xs uppercase">Save-to-buy</dt>
          <dd className="text-3xl font-black">{Math.round(stats.saveToBuy * 100)}%</dd>
        </div>
        <div className="bg-[#f6f6f6] p-4">
          <dt className="text-xs uppercase">Lead combination</dt>
          <dd className="text-sm font-bold">{stats.combinations[0] || 'Heart a style to seed'}</dd>
        </div>
      </dl>
      <h2 className="mt-10 text-xl font-bold">Size demand</h2>
      <table>
        <thead>
          <tr>
            <th>Size</th>
            <th>Saves</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats.bySize).map(([size, count]) => (
            <tr key={size}>
              <td>{size}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-10 text-xl font-bold">Fit segment</h2>
      <table>
        <thead>
          <tr>
            <th>Fit</th>
            <th>Saves</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(stats.byFit).map(([fit, count]) => (
            <tr key={fit}>
              <td>{fit}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className="asos-btn-dark mt-8 inline-flex" href={STORY.denimDropHref}>
        Publish as an edit
      </a>
    </section>
  );
};

export default Default;
