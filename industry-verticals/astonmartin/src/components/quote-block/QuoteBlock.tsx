import { JSX } from 'react';
import { Field, Text as ContentSdkText, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import clsx from 'clsx';

interface Fields {
  Quote?: Field<string>;
  Attribution?: Field<string>;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  if (!fields?.Quote?.value && !isEditing) {
    return <></>;
  }

  return (
    <section className={clsx('component quote-block bg-black py-20 text-white md:py-28', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-5xl px-6 text-center md:px-10">
        <blockquote className="text-2xl font-medium leading-relaxed tracking-tight md:text-4xl">
          <ContentSdkText field={fields?.Quote} />
        </blockquote>
        {(fields?.Attribution?.value || isEditing) && (
          <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-white/60 uppercase">
            <ContentSdkText field={fields?.Attribution} />
          </p>
        )}
      </div>
    </section>
  );
};
