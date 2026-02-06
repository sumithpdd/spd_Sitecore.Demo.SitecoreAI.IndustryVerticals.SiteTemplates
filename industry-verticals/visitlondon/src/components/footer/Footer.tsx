'use client';

import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Link,
  LinkField,
  Placeholder,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

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
  const { page } = useSitecore();
  const id = props.params.RenderingIdentifier;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isEditing = isMounted && page.mode.isEditing;

  // placeholders keys
  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: props.fields.TitleOne,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'second_nav',
      title: props.fields.TitleTwo,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: props.fields.TitleThree,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fourth_nav',
      title: props.fields.TitleFour,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} />,
    },
  ];

  // Hardcoded affiliate logos
  const affiliates = [
    {
      src: 'https://c1.tacdn.com/img/cdsi/langs/en_UK/tripadvisor_logo_132x24-11109-0.gif',
      alt: 'TripAdvisor',
      width: 132,
      height: 24,
    },
    {
      src: 'https://cdn.londonandpartners.com/webui/visit/images/accessable-logo-2024.png',
      alt: 'AccessAble',
      width: 141,
      height: 28,
    },
    {
      src: 'https://cdn.londonandpartners.com/webui/visit/images/footer-ltd.png',
      alt: 'London Theatre Direct',
      width: 45,
      height: 45,
    },
    {
      src: 'https://cdn.londonandpartners.com/webui/visit/images/footer-london-pass.svg',
      alt: 'London Pass',
      width: 152,
      height: 17,
    },
    {
      src: 'https://cdn.londonandpartners.com/webui/visit/images/footer-goldentours.png',
      alt: 'Golden Tours',
      width: 79,
      height: 35,
    },
  ];

  return (
    <footer className={`component footer vl-footer ${props.params.styles}`} id={id}>
      {/* Footer Topline */}
      <div className="footer-topline">
        <div className="footer-content">
          <div className="footer-mobile-graphic"></div>
          <div className="footer-topline-items">
            {/* Logo */}
            <div className="footer-logo">
              <span className="svg visitlondon-logo icon-visitlondon-logo-red">visitlondon.com</span>
              <span className="c tagline">Official Visitor Guide</span>
            </div>
            {/* Social Links */}
            <div className="footer-social">
              <ul>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://tiktok.com/@visitlondon"
                    className="icon tiktok"
                    title="TikTok (Link will open in a new window)"
                    target="_blank"
                  >
                    TikTok
                  </a>
                </li>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://www.youtube.com/visitlondonvideo"
                    className="icon youtube"
                    title="YouTube (Link will open in a new window)"
                    target="_blank"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://instagram.com/visitlondon"
                    className="icon instagram"
                    title="Instagram (Link will open in a new window)"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://uk.linkedin.com/company/visit-london"
                    className="icon linkedin"
                    title="LinkedIn (Link will open in a new window)"
                    target="_blank"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://twitter.com/visitlondon"
                    className="icon twitter"
                    title="Twitter (Link will open in a new window)"
                    target="_blank"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    data-ga-link="Social Network"
                    rel="external me noopener"
                    href="https://www.facebook.com/visitlondon"
                    className="icon facebook"
                    title="Facebook (Link will open in a new window)"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Menus */}
      <div className="footer-menus">
        <div className="footer-content">
          {sections.map((section, index) => (
            <FooterMenu
              key={section.key}
              title={section.title}
              content={section.content}
              isEditing={isEditing}
            />
          ))}
        </div>
      </div>

      {/* Footer Affiliates */}
      <div className="footer-affiliates">
        <div className="footer-content">
          <h2>Affiliates and content partners</h2>
          <ul>
            {affiliates.map((affiliate, index) => (
              <li key={index}>
                <img
                  loading="lazy"
                  src={affiliate.src}
                  alt={affiliate.alt}
                  width={affiliate.width}
                  height={affiliate.height}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer About */}
      <div className="footer-about">
        <div className="footer-content">
          <div className="about-logos">
            <a
              href="https://www.londonandpartners.com"
              className="footer-logo icon-landp-white"
              target="_blank"
              title="Link will open in a new window"
              rel="noopener"
              aria-label="London & Partners"
            >
            </a>
            <a
              href="https://www.london.gov.uk/"
              className="footer-logo icon-mayor-london-white"
              target="_blank"
              title="Link will open in a new window"
              rel="noopener"
              aria-label="Supported by Mayor of London"
            >
            </a>
          </div>
          <div className="about-info">
            <div className="footer-aboutlinks">
              <ul>
                <li>
                  <a href="/contact-us">Contact us</a>
                </li>
                <li>
                  <a href="/about-us">About us</a>
                </li>
                <li>
                  <a href="/advertise-with-us">Advertise with us</a>
                </li>
                <li>
                  <a
                    href="https://www.londonandpartners.com/about-us/sustainability"
                    target="_blank"
                    title="Link will open in a new window"
                    rel="noopener"
                  >
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="/about-us/accessibility">Accessibility</a>
                </li>
                <li>
                  <Link field={props.fields.TermsText} editable={isEditing}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link field={props.fields.PolicyText} editable={isEditing}>
                    Privacy & Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-legal">
              London & Partners is registered in England under no. 7493460. Registered Office: London & Partners, 169
              Union Street, London SE1 0LL. London & Partners is the growth agency for London. We are a social
              enterprise, combining purpose with commercial rigour. We are funded by grants, partners and our portfolio
              of venture businesses.
              <span className="note nomob"> </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterMenuProps {
  title: TextField;
  content: React.ReactNode;
  isEditing: boolean;
}

const FooterMenu: React.FC<FooterMenuProps> = ({ title, content, isEditing }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="footer-menu">
      <details name="footer-menu-accordion" open={isOpen || isEditing}>
        <summary
          onClick={(e) => {
            if (!isEditing) {
              e.preventDefault();
              setIsOpen(!isOpen);
            }
          }}
        >
          <span className="menu-name">
            <Text field={title} />
          </span>
          <span className="menu-icon">
            <ChevronDown className={`size-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </summary>
      </details>
      <div className="menu-items" style={{ minHeight: isOpen || isEditing ? 'auto' : '0px' }}>
        <ul>{content}</ul>
      </div>
    </div>
  );
};
