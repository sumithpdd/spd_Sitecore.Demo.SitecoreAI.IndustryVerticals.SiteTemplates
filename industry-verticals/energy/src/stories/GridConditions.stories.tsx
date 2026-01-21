import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import { Default as GridConditions } from '../components/grid-conditions/GridConditions';
import { CommonParams, CommonRendering } from './common/commonData';

type StoryProps = ComponentProps<typeof GridConditions>;

const meta = {
  title: 'Page Content/GridConditions',
  component: GridConditions,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'GridConditions',
  params: baseParams,
};

export const Default: Story = {
  render: () => {
    return <GridConditions params={baseParams} rendering={baseRendering} />;
  },
};
