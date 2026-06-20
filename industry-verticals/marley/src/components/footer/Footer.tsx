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

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields?.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: <Text field={props.fields?.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields?.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={props.fields?.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields?.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="bg-background-muted">
        <div className="container grid gap-12 py-28.5 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-7">
            <div className="sm:max-w-34">
              <Image field={props.fields?.Logo} />
            </div>
            <RichText field={props.fields?.Description} />
          </div>
          <div className="grid gap-13 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5 xl:gap-12">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <h5 className="font-body text-accent mb-8 text-lg">{title}</h5>
                <div className="space-y-4">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="container flex items-center justify-between py-8.5 max-sm:flex-col max-sm:items-start max-sm:gap-10">
          <p className="max-sm:order-2">
            <Text field={props.fields?.CopyrightText} />
          </p>
          <p className="flex items-center justify-between gap-20 max-lg:gap-10 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-5">
            <Link field={props.fields?.TermsText} className="hover:underline" />
            <Link field={props.fields?.PolicyText} className="hover:underline" />
          </p>
        </div>
      </div>
    </section>
  );
};

const LEGAL_LINKS = [
  {
    href: 'https://www.marley.co.uk/terms-and-conditions-of-sale',
    text: 'Terms & Conditions of Sale',
  },
  {
    href: 'https://www.marley.co.uk/terms-and-conditions-of-website',
    text: 'Terms & Conditions of Website',
  },
  { href: 'https://www.marley.co.uk/cookie-policy', text: 'Cookie Policy' },
  { href: 'https://www.marley.co.uk/privacy-policy', text: 'Privacy Policy' },
  { href: 'https://www.marley.co.uk/sitemap', text: 'Sitemap' },
];

/** Marley.co.uk footer — three link columns + legal bar. */
export const Marley = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;
  const dpid = props?.params?.DynamicPlaceholderId ?? '1';

  const columns = [
    { title: props.fields?.TitleOne, ph: `footer-list-first-${dpid}` },
    { title: props.fields?.TitleTwo, ph: `footer-list-second-${dpid}` },
    { title: props.fields?.TitleThree, ph: `footer-list-third-${dpid}` },
  ];

  return (
    <footer className={`component footer marley-footer ${props.params.styles}`} id={id}>
      <div className="bg-[#4d4d4c] text-white">
        <div className="container py-12 lg:py-16">
          <p className="mb-8 text-lg font-semibold">More Info</p>
          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map(({ title, ph }) => (
              <div key={ph}>
                <h5 className="mb-4 text-sm font-semibold tracking-wide uppercase">
                  <Text field={title} />
                </h5>
                <div className="space-y-2 text-sm">
                  <Placeholder name={ph} rendering={props.rendering} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-[#3a3a39] text-white/90">
        <div className="container flex flex-col gap-4 py-6 text-sm lg:flex-row lg:items-center lg:justify-between">
          <p>
            <Text field={props.fields?.CopyrightText} />
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map(({ href, text }) => (
              <a key={href} href={href} className="hover:text-white hover:underline">
                {text}
              </a>
            ))}
            <span className="text-white/70">VAT No: GB333694193</span>
          </nav>
        </div>
      </div>
    </footer>
  );
};
