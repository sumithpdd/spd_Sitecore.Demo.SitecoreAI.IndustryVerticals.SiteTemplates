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
import dynamic from 'next/dynamic';

const CdpProfilePanel = dynamic(() => import('../cdp-profile-panel/CdpProfilePanel'), {
  ssr: false,
});

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  TitleSix?: TextField;
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

// Default Footer variant (original)
export const Default = (props: FooterProps) => {
  // rendering item id
  const id = props.params.RenderingIdentifier;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

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
  ];

  return (
    <section className={`component footer relative ${props.params.styles} overflow-hidden`} id={id}>
      <div className="bg-background-muted">
        <div className="container grid gap-12 py-28.5 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-7">
            <div className="sm:max-w-34">
              <Image field={props.fields.Logo} />
            </div>
            <RichText field={props.fields.Description} />
          </div>
          <div className="grid gap-13 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5 xl:gap-12">
            {sections.map(({ key, title, content }) => (
              <div key={key}>
                <div className="text-accent mb-8 text-lg font-bold">{title}</div>
                <div className="space-y-4">{content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-background">
        <div className="container flex items-center justify-between py-8.5 max-sm:flex-col max-sm:items-start max-sm:gap-10">
          <div className="max-sm:order-2">
            <Text field={props.fields.CopyrightText} />
          </div>
          <div className="flex items-center justify-between gap-20 max-lg:gap-10 max-sm:order-1 max-sm:flex-col max-sm:items-start max-sm:gap-5">
            <Link field={props.fields.TermsText} className="hover:underline" />
            <Link field={props.fields.PolicyText} className="hover:underline" />
          </div>
        </div>
      </div>

      {/* CDP Profile Panel - Demo Tool */}
      <CdpProfilePanel
        clientKey={process.env.NEXT_PUBLIC_SITECORE_CDP_CLIENT_KEY}
        apiTarget={process.env.NEXT_PUBLIC_SITECORE_CDP_API_TARGET}
        apiAuth={process.env.NEXT_PUBLIC_SITECORE_CDP_API_AUTH}
      />
    </section>
  );
};

// Minimal Footer variant - simple footer with logo and links
export const Minimal = (props: FooterProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <footer
      className={`component footer footer-minimal bg-background-muted py-8 ${props.params.styles}`}
      id={id}
    >
      <div className="container">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo */}
          <div className="max-w-24">
            <Image field={props.fields.Logo} />
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link field={props.fields.TermsText} className="hover:text-accent transition-colors" />
            <Link field={props.fields.PolicyText} className="hover:text-accent transition-colors" />
          </div>

          {/* Copyright */}
          <div className="text-foreground-muted text-sm">
            <Text field={props.fields.CopyrightText} />
          </div>
        </div>
      </div>
    </footer>
  );
};
