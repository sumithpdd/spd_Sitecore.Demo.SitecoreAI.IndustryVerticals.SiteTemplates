import { JSX } from 'react';
import {
  Field,
  LinkField,
  Text as ContentSdkText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { ComponentProps } from 'lib/component-props';
import { asText, hasLink, hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
  RelatedTitle?: Field<string>;
  RelatedOne?: LinkField;
  RelatedTwo?: LinkField;
  RelatedThree?: LinkField;
  RelatedFour?: LinkField;
  RelatedFive?: LinkField;
  NextStepsTitle?: Field<string>;
  NextStepOne?: LinkField;
  NextStepTwo?: LinkField;
  NextStepThree?: LinkField;
  NextStepFour?: LinkField;
}

type Props = ComponentProps & { fields: Fields };

const RELATED_FALLBACKS = [
  { text: 'Finance', href: '/search?q=finance' },
  { text: 'Accounting', href: '/search?q=accounting' },
  { text: 'Consumer Behaviour and Marketing', href: '/search?q=marketing' },
  { text: 'Real Estate and Planning', href: '/search?q=real%20estate' },
  { text: 'Economics', href: '/search?q=economics' },
];

const NEXT_FALLBACKS = [
  { text: 'Visit an Open Day', href: '/study-and-life' },
  { text: 'View courses', href: '/courses' },
  { text: 'How to apply', href: '/clearing/how-to-apply' },
  { text: 'Find us', href: '/accommodation' },
];

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  const related = [
    linkOrFallback(
      fields?.RelatedOne,
      RELATED_FALLBACKS[0].text,
      RELATED_FALLBACKS[0].href,
      isEditing
    ),
    linkOrFallback(
      fields?.RelatedTwo,
      RELATED_FALLBACKS[1].text,
      RELATED_FALLBACKS[1].href,
      isEditing
    ),
    linkOrFallback(
      fields?.RelatedThree,
      RELATED_FALLBACKS[2].text,
      RELATED_FALLBACKS[2].href,
      isEditing
    ),
    linkOrFallback(
      fields?.RelatedFour,
      RELATED_FALLBACKS[3].text,
      RELATED_FALLBACKS[3].href,
      isEditing
    ),
    linkOrFallback(
      fields?.RelatedFive,
      RELATED_FALLBACKS[4].text,
      RELATED_FALLBACKS[4].href,
      isEditing
    ),
  ];

  const nextSteps = [
    {
      field: linkOrFallback(
        fields?.NextStepOne,
        NEXT_FALLBACKS[0].text,
        NEXT_FALLBACKS[0].href,
        isEditing
      ),
      cms: fields?.NextStepOne,
    },
    {
      field: linkOrFallback(
        fields?.NextStepTwo,
        NEXT_FALLBACKS[1].text,
        NEXT_FALLBACKS[1].href,
        isEditing
      ),
      cms: fields?.NextStepTwo,
    },
    {
      field: linkOrFallback(
        fields?.NextStepThree,
        NEXT_FALLBACKS[2].text,
        NEXT_FALLBACKS[2].href,
        isEditing
      ),
      cms: fields?.NextStepThree,
    },
    {
      field: linkOrFallback(
        fields?.NextStepFour,
        NEXT_FALLBACKS[3].text,
        NEXT_FALLBACKS[3].href,
        isEditing
      ),
      cms: fields?.NextStepFour,
    },
  ];

  return (
    <section
      className={clsx(
        'component course-next-steps bg-white text-[var(--reading-ink)]',
        params?.styles
      )}
      id={id}
    >
      <div className="border-t border-[#ddd9db]">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            {isEditing || hasText(fields?.RelatedTitle) ? (
              <ContentSdkText field={asText(fields?.RelatedTitle)} />
            ) : (
              'Related Subjects'
            )}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {related.map((link, index) => (
              <li key={link.value?.href || index}>
                <ContentSdkLink
                  field={link}
                  className="font-semibold text-[var(--reading-red)] hover:underline"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[var(--reading-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <h2 className="text-3xl font-bold md:text-4xl">
            {isEditing || hasText(fields?.NextStepsTitle) ? (
              <ContentSdkText field={asText(fields?.NextStepsTitle)} />
            ) : (
              'Ready for more?'
            )}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nextSteps.map((step, index) =>
              isEditing || hasLink(step.cms) || step.field.value?.href ? (
                <ContentSdkLink
                  key={step.field.value?.href || index}
                  field={step.field}
                  className="reading-btn reading-btn-primary w-full"
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
