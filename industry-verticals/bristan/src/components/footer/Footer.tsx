import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  PolicyText: LinkField;
  TermsText: LinkField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;
  const styles = props.params.styles?.replace(/container-dark-background/g, '').trim() || '';

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section
      className={`component footer bristan-footer relative overflow-hidden ${styles}`}
      id={id}
    >
      <div className="bristan-footer__main">
        <div className="container grid gap-12 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-7">
            <div className="sm:max-w-34">
              <Image field={props.fields.Logo} />
            </div>
            <div className="bristan-footer__description">
              <RichText field={props.fields.Description} />
            </div>
          </div>
          <div className="grid gap-13 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5 xl:gap-12">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="bristan-footer__column-title">{title}</div>
                <div className="space-y-4">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bristan-footer__bottom">
        <div className="container flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-10">
          <p className="max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </p>
          <p className="flex items-center justify-between gap-20 max-lg:gap-10 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-5">
            <Link field={props.fields.TermsText} className="hover:underline" />
            <Link field={props.fields.PolicyText} className="hover:underline" />
          </p>
        </div>
      </div>
    </section>
  );
};
