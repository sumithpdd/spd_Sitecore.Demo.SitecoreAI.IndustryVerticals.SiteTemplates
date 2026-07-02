import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as HeroBanner, TopContent } from '../components/hero-banner/HeroBanner';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createTextField } from './helpers/createFields';
import clsx from 'clsx';
import { CommonStyles, HeroBannerStyles, LayoutStyles } from '@/types/styleFlags';

type StoryProps = ComponentProps<typeof HeroBanner> & {
  hideAccentLine?: boolean;
  withPlaceholder?: boolean;
  reverseLayout?: boolean;
  withoutGradientOverlay?: boolean;
  screenLayer?: boolean;
};

const meta = {
  title: 'Page Content/Hero Banner',
  component: HeroBanner,
  tags: ['autodocs'],
  argTypes: {
    hideAccentLine: {
      name: 'Hide Accent Line',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    withoutGradientOverlay: {
      name: 'Without Gradient Overlay',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    screenLayer: {
      name: 'Screen Layer',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    reverseLayout: {
      name: 'Reverse Layout',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    withPlaceholder: {
      name: 'With Placeholder',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    hideAccentLine: false,
    withoutGradientOverlay: false,
    reverseLayout: false,
    withPlaceholder: false,
    screenLayer: false,
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Hero Banner',
  params: baseParams,
  placeholders: {
    [`hero-banner-search-bar-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

const createHeroBannerFields = () => ({
  Image: {
    value: {
      src: '/images/hero/banner-1.jpg',
      alt: "Welcome to the UK's Number One Taps and Showers Brand",
      width: 1920,
      height: 720,
    },
  },
  Title: createTextField("Welcome to the UK's Number One Taps and Showers Brand"),
  Description: {
    value:
      '<div class="ck-content"><p>Straightforward solutions for every bathroom and kitchen that you can trust time and time again.</p></div>',
  },
  CtaLink: {
    value: {
      linktype: 'internal',
      href: '/products/bathroom-taps',
      text: 'Find a Product',
      title: 'Find a Product',
      target: '',
      class: '',
      anchor: '',
      querystring: '',
      id: '',
    },
  },
});

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.hideAccentLine && CommonStyles.HideAccentLine,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.screenLayer && HeroBannerStyles.ScreenLayer,
        args.reverseLayout && LayoutStyles.Reversed,
        args.withPlaceholder && HeroBannerStyles.WithPlaceholder
      ),
    };

    return (
      <HeroBanner params={params} rendering={baseRendering} fields={createHeroBannerFields()} />
    );
  },
};

export const WithTopContent: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      styles: clsx(
        baseParams.styles,
        args.hideAccentLine && CommonStyles.HideAccentLine,
        args.withoutGradientOverlay && HeroBannerStyles.HideGradientOverlay,
        args.screenLayer && HeroBannerStyles.ScreenLayer,
        args.reverseLayout && LayoutStyles.Reversed,
        args.withPlaceholder && HeroBannerStyles.WithPlaceholder
      ),
    };

    return (
      <TopContent params={params} rendering={baseRendering} fields={createHeroBannerFields()} />
    );
  },
};
