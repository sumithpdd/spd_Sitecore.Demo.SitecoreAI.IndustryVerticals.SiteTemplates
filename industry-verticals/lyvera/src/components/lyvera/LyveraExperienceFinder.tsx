'use client';

import type { JSX } from 'react';
import {
  LinkField,
  RichTextField,
  TextField,
  Link as ContentSdkLink,
  RichText as ContentSdkRichText,
  Text as ContentSdkText,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { KP_EXPERIENCE_FINDER } from '@/lib/keith-prowse-defaults';
import { sharedComponentModifier } from '@/lib/lyveragroup-themes';
import {
  hasLinkValue,
  linkHref,
  linkLabel,
  normalizeLinkField,
  richTextFieldValue,
  textFieldValue,
} from '@/lib/lyvera-field-utils';

export interface LyveraExperienceFinderFields {
  Title?: TextField;
  Description?: RichTextField;
  Label?: TextField;
  OptionOne?: LinkField;
  OptionTwo?: LinkField;
  OptionThree?: LinkField;
}

export type LyveraExperienceFinderProps = ComponentProps & {
  fields?: LyveraExperienceFinderFields;
};

export const Default = (props: LyveraExperienceFinderProps): JSX.Element => {
  const id = props.params?.RenderingIdentifier;
  const { styles } = props.params ?? {};
  const fields = props.fields ?? {};
  const { page } = useSitecore();
  const isEditing = page.mode.isEditing;

  const title = textFieldValue(fields.Title);
  const description = richTextFieldValue(fields.Description);
  const label = textFieldValue(fields.Label);

  const options = [
    { field: fields.OptionOne, fallback: KP_EXPERIENCE_FINDER.options[0] },
    { field: fields.OptionTwo, fallback: KP_EXPERIENCE_FINDER.options[1] },
    { field: fields.OptionThree, fallback: KP_EXPERIENCE_FINDER.options[2] },
  ];

  return (
    <section
      className={[sharedComponentModifier(page, 'component lyvera-experience-finder'), styles]
        .filter(Boolean)
        .join(' ')}
      id={id}
    >
      <div className="lyvera-experience-finder__card">
        {isEditing ? (
          <ContentSdkText
            field={fields.Title}
            tag="h2"
            className="lyvera-experience-finder__title"
          />
        ) : (
          <h2 className="lyvera-experience-finder__title">{title || KP_EXPERIENCE_FINDER.title}</h2>
        )}

        {isEditing ? (
          <ContentSdkRichText
            field={fields.Description}
            className="lyvera-experience-finder__desc"
          />
        ) : description ? (
          <div
            className="lyvera-experience-finder__desc"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="lyvera-experience-finder__desc">{KP_EXPERIENCE_FINDER.description}</p>
        )}

        {isEditing ? (
          <ContentSdkText
            field={fields.Label}
            tag="p"
            className="lyvera-experience-finder__label"
          />
        ) : (
          <p className="lyvera-experience-finder__label">{label || KP_EXPERIENCE_FINDER.label}</p>
        )}

        <ul className="lyvera-experience-finder__options">
          {options.map(({ field, fallback }) => {
            const href = linkHref(field, fallback.href);
            const text = linkLabel(field, fallback.text);
            const useCmsLink = hasLinkValue(field);
            const linkField = normalizeLinkField(field, fallback)!;

            return (
              <li key={fallback.text}>
                {isEditing ? (
                  <ContentSdkLink field={linkField} className="lyvera-experience-finder__option" />
                ) : (
                  <a
                    href={useCmsLink ? href : fallback.href}
                    className="lyvera-experience-finder__option"
                  >
                    <span>{useCmsLink ? text : fallback.text}</span>
                    <span aria-hidden>→</span>
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
