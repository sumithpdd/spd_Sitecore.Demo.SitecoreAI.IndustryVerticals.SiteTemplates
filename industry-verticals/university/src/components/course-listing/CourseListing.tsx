import { JSX } from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text as ContentSdkText,
  RichText as ContentSdkRichText,
  Link as ContentSdkLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import clsx from 'clsx';
import { Play } from 'lucide-react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';
import { CmsImage } from 'lib/CmsImage';
import { asText, hasText, linkOrFallback } from 'lib/field-helpers';

interface Fields {
  Title?: Field<string>;
  SeeOtherSubjectsLabel?: Field<string>;
  SeeOtherSubjectsLink?: LinkField;
  VideoTitle?: Field<string>;
  Image?: ImageField;
  Intro?: Field<string>;
  WorldClassTitle?: Field<string>;
  WorldClassBody?: Field<string>;
  AwardWinningTitle?: Field<string>;
  AwardWinningBody?: Field<string>;
  CoursesHeading?: Field<string>;
  ContextualOffersTitle?: Field<string>;
  ContextualOffersBody?: Field<string>;
}

type Props = ComponentProps & { fields: Fields };

type CourseRow = { title: string; mode: string; duration: string };

/** Undergraduate programmes listed on the Essex Business School subject hub. */
const FALLBACK_COURSES: CourseRow[] = [
  {
    title: 'BA Accounting (Beijing Institute of Technology)',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BA Modern Languages and Business', mode: 'Full Time', duration: '4 Years' },
  {
    title: 'BA Philosophy, Business and Ethics with Placement Experience',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BA Philosophy, Business and Ethics', mode: 'Full Time', duration: '3 Years' },
  {
    title: 'BSc Accounting and Business – The Flying Start Degree Programme',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Data Analytics and Digital Business) with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title:
      'BSc Business and Management (Data Analytics and Digital Business) with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Data Analytics and Digital Business)',
    mode: 'Full Time',
    duration: '3 Years',
  },
  {
    title: 'BSc Business and Management (Entrepreneurship and Innovation) with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Entrepreneurship and Innovation) with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Entrepreneurship and Innovation)',
    mode: 'Full Time',
    duration: '3 Years',
  },
  {
    title:
      'BSc Business and Management (Human Resources and Organisational Behaviour) with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title:
      'BSc Business and Management (Human Resources and Organisational Behaviour) with Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Human Resources and Organisational Behaviour)',
    mode: 'Full Time',
    duration: '3 Years',
  },
  {
    title: 'BSc Business and Management (Marketing) with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management (Marketing) with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BSc Business and Management (Marketing)', mode: 'Full Time', duration: '3 Years' },
  { title: 'BSc Business and Management with Foundation', mode: 'Full Time', duration: '4 Years' },
  {
    title: 'BSc Business and Management with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc Business and Management with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BSc Business and Management', mode: 'Full Time', duration: '3 Years' },
  {
    title: 'BSc Consumer Behaviour and Marketing with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BSc Consumer Behaviour and Marketing', mode: 'Full Time', duration: '3 Years' },
  {
    title: 'BA International Business Management (SQA Advanced Diploma students in China)',
    mode: 'Full Time',
    duration: '1 Year',
  },
  {
    title: 'BSc International Business and Management with a Modern Language with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title:
      'BSc International Business and Management with a Modern Language with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc International Business and Management with a Modern Language',
    mode: 'Full Time',
    duration: '3 Years',
  },
  {
    title: 'BSc International Business and Management with Placement Year',
    mode: 'Full Time',
    duration: '4 Years',
  },
  {
    title: 'BSc International Business and Management with Study Year Abroad',
    mode: 'Full Time',
    duration: '4 Years',
  },
  { title: 'BSc International Business and Management', mode: 'Full Time', duration: '3 Years' },
  { title: 'LLB Law with International Business', mode: 'Full Time', duration: '3 Years' },
  {
    title: 'BSc Business and Management (MUST 2+2 programme)',
    mode: 'Full Time',
    duration: '4 Years',
  },
];

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const { isEditing } = page.mode;
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;

  const subjectsLink = linkOrFallback(
    fields?.SeeOtherSubjectsLink,
    'See the other subjects we offer',
    '/courses',
    isEditing
  );
  return (
    <section
      className={clsx(
        'component course-listing bg-white text-[var(--reading-ink)]',
        params?.styles
      )}
      id={id}
    >
      <div className="border-b border-[#ddd9db] bg-[var(--reading-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-8">
          <ContentSdkLink
            field={subjectsLink}
            className="text-sm font-semibold text-[var(--reading-red)] hover:underline"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
        <p className="text-sm font-bold tracking-wide text-[var(--reading-charcoal)] uppercase">
          Undergraduates
        </p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          {isEditing || hasText(fields?.Title) ? (
            <ContentSdkText field={asText(fields?.Title)} />
          ) : (
            'Business and Management'
          )}
        </h1>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              {isEditing || hasText(fields?.VideoTitle) ? (
                <ContentSdkText field={asText(fields?.VideoTitle)} />
              ) : (
                'Why study Business and Management at Essex?'
              )}
            </h2>
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--reading-charcoal)]">
              {isEditing || hasText(fields?.Intro) ? (
                <ContentSdkRichText field={fields?.Intro} />
              ) : (
                <p>
                  Study at Essex Business School and you will be part of a global, high-calibre
                  learning community that will equip you for success in the business world.
                </p>
              )}
            </div>
          </div>

          <div className="promo-media group relative aspect-video w-full overflow-hidden bg-[var(--reading-charcoal)]">
            <CmsImage
              field={fields?.Image}
              fallbackSrc={demoImages.tileCourses}
              alt={fields?.Title?.value || 'Business and Management'}
              className="promo-media__image"
              imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={1280}
              height={720}
            />
            <span className="absolute inset-0 bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--reading-red)] text-white shadow-lg">
                <Play className="ml-1 h-7 w-7 fill-current" aria-hidden />
              </span>
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-[#ddd9db] pt-10 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-bold">
              {isEditing || hasText(fields?.WorldClassTitle) ? (
                <ContentSdkText field={asText(fields?.WorldClassTitle)} />
              ) : (
                'World-class institution'
              )}
            </h3>
            <div className="mt-3 text-base leading-relaxed text-[var(--reading-charcoal)]">
              {isEditing || hasText(fields?.WorldClassBody) ? (
                <ContentSdkRichText field={fields?.WorldClassBody} />
              ) : (
                <p>
                  Essex Business School is research-led and internationally connected. Academics and
                  industry experts help you gain skills for accounting, consultancy, HR, marketing,
                  operations and general management.
                </p>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {isEditing || hasText(fields?.AwardWinningTitle) ? (
                <ContentSdkText field={asText(fields?.AwardWinningTitle)} />
              ) : (
                'Award-winning location'
              )}
            </h3>
            <div className="mt-3 text-base leading-relaxed text-[var(--reading-charcoal)]">
              {isEditing || hasText(fields?.AwardWinningBody) ? (
                <ContentSdkRichText field={fields?.AwardWinningBody} />
              ) : (
                <p>
                  Based at Colchester’s lake campus — with a walkable train station and guaranteed
                  halls — plus strong employer relationships and a global student community.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ddd9db] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-14">
          <h2 className="text-3xl font-bold md:text-4xl">
            {isEditing || hasText(fields?.CoursesHeading) ? (
              <ContentSdkText field={asText(fields?.CoursesHeading)} />
            ) : (
              'Courses'
            )}
          </h2>
          <ul className="mt-6 divide-y divide-[#ddd9db] border-y border-[#ddd9db]">
            {FALLBACK_COURSES.map((course) => (
              <li
                key={course.title}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-baseline md:justify-between md:gap-8"
              >
                <a
                  href="/courses/computer-science-and-ai"
                  className="font-semibold text-[var(--reading-ink)] hover:text-[var(--reading-red)] hover:underline"
                >
                  {course.title}
                </a>
                <p className="shrink-0 text-sm text-[var(--reading-charcoal)]">
                  {course.mode}: {course.duration}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 border border-[#ddd9db] bg-[var(--reading-surface)] p-6">
            <h3 className="text-xl font-bold">
              {isEditing || hasText(fields?.ContextualOffersTitle) ? (
                <ContentSdkText field={asText(fields?.ContextualOffersTitle)} />
              ) : (
                'Contextual offers'
              )}
            </h3>
            <div className="mt-2 text-base text-[var(--reading-charcoal)]">
              {isEditing || hasText(fields?.ContextualOffersBody) ? (
                <ContentSdkRichText field={fields?.ContextualOffersBody} />
              ) : (
                <p>We make contextual offers for all our courses.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
