import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as ProductCarouselWrapper } from '../components/product-carousel-wrapper/ProductCarouselWrapper';
import { CommonParams, CommonRendering } from './common/commonData';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { createLinkField, createTextField } from './helpers/createFields';
import { boolToSitecoreCheckbox } from './helpers/boolToSitecoreCheckbox';
import { createProductItems } from './helpers/createItems';
import { ComponentFields } from '@sitecore-content-sdk/nextjs';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';

type StoryProps = ComponentProps<typeof ProductCarouselWrapper> &
  BackgroundColorArgs & {
    hideAccentLine?: boolean;
  };

const meta = {
  title: 'Products/Product Carousel Wrapper',
  component: ProductCarouselWrapper,
  tags: ['autodocs'],
  argTypes: {
    ...backgroundColorArgTypes,
    hideAccentLine: {
      name: 'Hide Accent Line',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
  },
  args: {
    ...defaultBackgroundColorArgs,
    hideAccentLine: false,
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
  componentName: 'Product Carousel Wrapper',
  params: baseParams,
  placeholders: {
    [`product-carousel-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
  },
};

const baseFields = {
  Title: createTextField('Browse The Range'),
  Link: createLinkField('View All'),
};

export const Default: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };

    return <ProductCarouselWrapper params={params} fields={baseFields} rendering={baseRendering} />;
  },
};

export const WithPlaceholderData: Story = {
  render: (args) => {
    const params = {
      ...baseParams,
      HideAccentLine: boolToSitecoreCheckbox(args.hideAccentLine),
      styles: `${baseParams.styles} ${args.BackgroundColor}`,
    };
    const rendering = {
      ...baseRendering,
      placeholders: {
        [`product-carousel-${baseParams.DynamicPlaceholderId}`]: [
          {
            ...CommonRendering,
            componentName: 'AllProductsCarousel',
            params: CommonParams,
            fields: {
              items: createProductItems(5),
            } as unknown as ComponentFields,
          },
        ],
      },
    };

    return <ProductCarouselWrapper params={params} fields={baseFields} rendering={rendering} />;
  },
};
