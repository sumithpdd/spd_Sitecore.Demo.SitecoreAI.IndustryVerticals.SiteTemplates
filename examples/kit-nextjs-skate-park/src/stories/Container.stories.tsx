import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Container } from '../components/container/Container';
import { ComponentProps } from 'react';
import { renderStorybookPlaceholder } from './helpers/renderStorybookPlaceholder';
import { CommonParams, CommonRendering } from './common/commonData';

type StoryProps = ComponentProps<typeof Container>;

const meta = {
  title: 'Components/Container',
  component: Container,
  tags: ['autodocs'],
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
  componentName: 'Container',
  params: baseParams,
};

export const Default: Story = {
  render: () => {
    return (
      <Container
        params={baseParams}
        rendering={{
          ...baseRendering,
          placeholders: {
            [`container-${baseParams.DynamicPlaceholderId}`]: [renderStorybookPlaceholder()],
          },
        }}
      />
    );
  },
};
