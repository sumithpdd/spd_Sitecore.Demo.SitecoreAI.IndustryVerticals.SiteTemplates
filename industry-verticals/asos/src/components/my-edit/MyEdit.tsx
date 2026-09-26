'use client';

import { JSX, useEffect, useMemo, useState } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { useRouter } from 'next/router';
import { savedProducts } from '@/lib/asos-save';
import { parseMarketPath } from '@/lib/asos-market';
import { STORY } from '@/lib/asos-journey';
import { AsosProductCard } from '@/components/non-sitecore/AsosProductCard';

type Props = ComponentProps;

export const Default = (props: Props): JSX.Element => {
  const router = useRouter();
  const { market } = parseMarketPath(router.asPath);
  const [rows, setRows] = useState(savedProducts());

  useEffect(() => {
    const refresh = () => setRows(savedProducts());
    refresh();
    window.addEventListener('asos-save', refresh);
    return () => window.removeEventListener('asos-save', refresh);
  }, []);

  const groups = useMemo(() => {
    const map = new Map<string, typeof rows>();
    rows.forEach((row) => {
      const key = row.saved.group;
      map.set(key, [...(map.get(key) || []), row]);
    });
    return [...map.entries()];
  }, [rows]);

  return (
    <section className="asos-wrap py-8" id={props.params?.RenderingIdentifier}>
      <h1 className="text-3xl font-bold">My Edit</h1>
      <p className="mt-2 max-w-2xl text-sm">
        Grouped saves with fit-for-her notes from keep history. Arrangement is optional.
      </p>
      {groups.length === 0 ? (
        <p className="mt-8 text-sm">
          Heart the wide-leg jean, the chocolate knit, and the Chelsea boot into {STORY.editName}.
        </p>
      ) : (
        groups.map(([name, items]) => (
          <div key={name} className="mt-10">
            <h2 className="text-xl font-bold">{name}</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
              {items.map(({ product, saved }) => (
                <div key={product.id}>
                  <AsosProductCard product={product} market={market.code} />
                  <p className="mt-1 text-xs text-[#666]">
                    {saved.size} — {saved.fitNote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default Default;
