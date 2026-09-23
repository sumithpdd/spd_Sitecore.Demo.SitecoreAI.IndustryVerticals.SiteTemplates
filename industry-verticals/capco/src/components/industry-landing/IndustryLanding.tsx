'use client';

import { JSX } from 'react';
import {
  Image as ContentSdkImage,
  RichText,
  Text,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { getIndustryBySlug, IndustryCard } from '@/lib/industry-catalog';
import { CASE_STUDIES } from '@/lib/story-catalog';
import { OUTLAW_NEWS } from '@/lib/home-catalog';
import { matchesPreferredRegion, useDemoAuth } from '@/lib/demo-auth';
import {
  asImageField,
  asItems,
  asTextField,
  fieldString,
  itemLabel,
  linkHref,
} from '@/lib/sitecore-fields';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Fields = {
  Title?: unknown;
  Intro?: unknown;
  Image?: unknown;
  ExpertiseHeading?: unknown;
  ExpertiseIntro?: unknown;
  Jumps?: unknown;
  ExpertiseItems?: unknown;
  StoriesHeading?: unknown;
  Stories?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

function cardsFromItems(field: unknown, fallbackHref: string): IndustryCard[] {
  return asItems(field)
    .map((item) => {
      const title = itemLabel(item);
      if (!title) {
        return null;
      }
      return {
        title,
        body:
          fieldString(item.fields?.Summary) ||
          fieldString(item.fields?.Content)
            ?.replace(/<[^>]+>/g, ' ')
            .trim() ||
          '',
        href: item.url || linkHref(item.fields?.Link, fallbackHref),
      };
    })
    .filter((item): item is IndustryCard => Boolean(item));
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const { preferences } = useDemoAuth();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const routeFields = (page?.layout?.sitecore?.route?.fields || {}) as {
    Title?: unknown;
    Content?: unknown;
  };
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const slug = (router.asPath || '').split('?')[0].split('/').filter(Boolean).pop() || '';
  const catalog = getIndustryBySlug(slug);
  const title = asTextField(fields.Title) || asTextField(routeFields.Title);
  const intro = asTextField(fields.Intro) || asTextField(routeFields.Content);
  const image = asImageField(fields.Image);
  const jumps = cardsFromItems(fields.Jumps, catalog.jumps[0]?.href || '/industries');
  const expertise = cardsFromItems(fields.ExpertiseItems, '/industries');
  const stories = cardsFromItems(fields.Stories, '/industries');
  const jumpList: IndustryCard[] =
    jumps.length > 0
      ? jumps
      : catalog.jumps.map((item) => ({ title: item.label, href: item.href, body: '' }));
  const expertiseList = expertise.length > 0 ? expertise : catalog.expertise;
  const storiesList = (stories.length > 0 ? stories : catalog.stories).filter((item) => {
    const regions =
      CASE_STUDIES.find((study) => study.href === item.href)?.regions ||
      OUTLAW_NEWS.find((article) => article.href === item.href)?.regions;
    return matchesPreferredRegion(regions, preferences.region);
  });
  const imageSrc = (image?.value as { src?: string } | undefined)?.src || catalog.imageSrc;

  return (
    <section className={`pm-industry w-full ${styles}`.trim()} id={id}>
      <div className="pm-industry__hero">
        {imageSrc ? (
          <div className="pm-industry__hero-media" aria-hidden={!image}>
            {image?.value?.src || isEditing ? (
              <ContentSdkImage field={image} className="pm-industry__hero-image" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- DAM public URL fallback
              <img src={imageSrc} alt="" className="pm-industry__hero-image" />
            )}
          </div>
        ) : null}
        <div className="pm-wrap pm-industry__hero-copy">
          <p className="pm-section-kicker">Expertise</p>
          <h1>{title ? <Text field={title} /> : catalog.title}</h1>
          <div className="pm-industry__lede">
            {intro ? <RichText field={intro} /> : <p>{catalog.intro}</p>}
          </div>
          {jumpList.length > 0 ? (
            <nav className="pm-industry__jumps" aria-label="In this industry">
              {jumpList.map((item) => (
                <Link key={item.href + item.title} href={item.href}>
                  {item.title || item.href}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>

      {catalog.whyNow && catalog.whyNow.length > 0 ? (
        <div className="pm-industry__whynow">
          <div className="pm-wrap">
            <h2>{catalog.whyNowHeading || 'Why now?'}</h2>
            <ul className="pm-industry__cards">
              {catalog.whyNow.map((item) => (
                <li key={item.title}>
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {expertiseList.length > 0 || isEditing ? (
        <div className="pm-industry__expertise">
          <div className="pm-wrap">
            <h2>
              <Text field={asTextField(fields.ExpertiseHeading)} />
              {!fieldString(fields.ExpertiseHeading) && catalog.expertiseHeading}
            </h2>
            <p className="pm-industry__section-intro">
              <Text field={asTextField(fields.ExpertiseIntro)} />
              {!fieldString(fields.ExpertiseIntro) && catalog.expertiseIntro}
            </p>
            <ul className="pm-industry__cards">
              {expertiseList.map((item) => (
                <li key={item.href + item.title}>
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link href={item.href}>Read more</Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {catalog.differentiators && catalog.differentiators.length > 0 ? (
        <div className="pm-industry__stories">
          <div className="pm-wrap">
            <h2>{catalog.differentiatorsHeading || 'What sets Capco apart'}</h2>
            <ul className="pm-industry__story-cards">
              {catalog.differentiators.map((item) => (
                <li key={item.title}>
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {catalog.team && catalog.team.length > 0 ? (
        <div className="pm-industry__expertise">
          <div className="pm-wrap">
            <h2>{catalog.teamHeading || 'Our team'}</h2>
            <ul className="pm-industry__cards">
              {catalog.team.map((item) => (
                <li key={item.href + item.title}>
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link href={item.href}>View profile</Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {storiesList.length > 0 || isEditing ? (
        <div className="pm-industry__stories">
          <div className="pm-wrap">
            <h2>
              <Text field={asTextField(fields.StoriesHeading)} />
              {!fieldString(fields.StoriesHeading) && catalog.storiesHeading}
            </h2>
            <ul className="pm-industry__story-cards">
              {storiesList.map((item) => (
                <li key={item.href + item.title}>
                  <article>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <Link href={item.href}>Read more</Link>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Default;
