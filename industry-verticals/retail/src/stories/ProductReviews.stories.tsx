import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default, ReviewStarRating } from '../components/product-reviews/ProductReviews';
import {
  BackgroundColorArgs,
  backgroundColorArgTypes,
  defaultBackgroundColorArgs,
} from './common/commonControls';
import { generateMockReviews } from './helpers/createItems';

type StoryProps = ComponentProps<typeof Default> & BackgroundColorArgs;

const meta = {
  title: 'Products/Product Reviews',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    ...backgroundColorArgTypes,
  },
  args: {
    ...defaultBackgroundColorArgs,
  },
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Container',
  params: baseParams,
};

export const ProductReviewsDefault: Story = {
  render: (args) => (
    <Default
      rendering={baseRendering}
      params={{
        ...baseParams,
        styles: `${baseParams.styles} ${args.BackgroundColor}`,
      }}
      fields={generateMockReviews(5)}
    />
  ),
};

export const ProductReviewsStarRating: Story = {
  render: (args) => (
    <ReviewStarRating
      rendering={baseRendering}
      params={{
        ...baseParams,
        styles: `${baseParams.styles} ${args.BackgroundColor}`,
      }}
      fields={generateMockReviews(5)}
    />
  ),
};
