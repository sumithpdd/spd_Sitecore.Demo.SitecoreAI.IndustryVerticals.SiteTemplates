import { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asLink } from '@/lib/field-helpers';
import clsx from 'clsx';

interface Fields {
  Title?: Field<string>;
  CardOneTitle?: Field<string>;
  CardOneLink?: LinkField;
  CardTwoTitle?: Field<string>;
  CardTwoLink?: LinkField;
  CardThreeTitle?: Field<string>;
  CardThreeLink?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;

  return (
    <section className={clsx('component explore-cta-strip bg-neutral-100 py-16 md:py-20', params?.styles)} id={params?.RenderingIdentifier}>
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight">
          <ContentSdkText field={fields?.Title} />
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: fields?.CardOneTitle, link: fields?.CardOneLink },
            { title: fields?.CardTwoTitle, link: fields?.CardTwoLink },
            { title: fields?.CardThreeTitle, link: fields?.CardThreeLink },
          ].map((card, i) => (
            <div key={i} className="bg-black p-8 text-white">
              <h3 className="text-xl font-semibold">
                <ContentSdkText field={card.title} />
              </h3>
              <div className="mt-6">
                {(card.link?.value?.href || isEditing) && (
                  <ContentSdkLink field={asLink(card.link)} className="text-sm font-semibold tracking-wide hover:underline" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
