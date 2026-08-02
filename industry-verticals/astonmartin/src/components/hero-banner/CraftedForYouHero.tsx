'use client';

import { JSX } from 'react';
import { useSearchParams } from 'next/navigation';
import { isCraftedForYouIntent } from '@/lib/demo-intent';
import { DEMO_IMAGES, demoImage } from '@/lib/demo-images';
import { ResolvedImage } from '@/lib/ResolvedImage';

type GateProps = {
  children: React.ReactNode;
};

/** When Crafted For You / ChatGPT UTM intent is present, replace children with DB12 hero. */
export function CraftedForYouHeroGate({ children }: GateProps): JSX.Element {
  const searchParams = useSearchParams();
  if (!isCraftedForYouIntent(searchParams)) {
    return <>{children}</>;
  }

  const image = demoImage(DEMO_IMAGES.craftedForYou, 'DB12 — Crafted For You');

  return (
    <section
      className="component hero-banner relative min-h-[70vh] w-full overflow-hidden md:min-h-screen"
      data-demo-intent="crafted-for-you"
    >
      <div className="absolute inset-0 z-0 bg-black">
        <ResolvedImage field={image} className="h-full w-full object-cover object-top" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-start justify-end px-6 py-10 text-left md:min-h-screen md:px-10 md:py-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/85 uppercase">
          Crafted For You
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
          DB12
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
          The world&apos;s most beautiful Grand Tourer — personalised for luxury GT interest from
          ChatGPT.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/models/db12" className="am-btn am-btn-solid">
            Explore DB12
          </a>
          <a href="/configurator" className="am-btn am-btn-ghost">
            Configurator
          </a>
        </div>
      </div>
    </section>
  );
}
