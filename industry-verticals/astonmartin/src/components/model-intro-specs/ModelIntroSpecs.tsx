import { JSX } from 'react';
import {
  Field,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import clsx from 'clsx';

interface Fields {
  Title?: Field<string>;
  Description?: Field<string>;
  TabOneLabel?: Field<string>;
  TabTwoLabel?: Field<string>;
  TabThreeLabel?: Field<string>;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  return (
    <section className={clsx('component model-intro-specs bg-black py-16 text-white md:py-24', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          <ContentSdkText field={fields?.Title} />
        </h2>
        <div className="mt-6 text-base text-white/75 md:text-lg">
          <ContentSdkRichText field={fields?.Description} />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[fields?.TabOneLabel, fields?.TabTwoLabel, fields?.TabThreeLabel].map((tab, i) => (
            <div key={i} className="border-t border-white/20 pt-4 text-xs font-semibold tracking-[0.16em] uppercase">
              {(tab?.value || isEditing) && <ContentSdkText field={tab} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
