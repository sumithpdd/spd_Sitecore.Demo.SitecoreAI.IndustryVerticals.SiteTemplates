import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Default as Navigation } from '../components/navigation/Navigation';
import { ComponentProps } from 'react';
import { CommonParams, CommonRendering } from './common/commonData';
import { createTextField } from './helpers/createFields';

type StoryProps = ComponentProps<typeof Navigation>;

const meta = {
  title: 'Navigation/Navigation',
  component: Navigation,
  tags: ['autodocs'],
} satisfies Meta<StoryProps>;
export default meta;

type Story = StoryObj<StoryProps>;

const baseParams = {
  ...CommonParams,
};

const baseRendering = {
  ...CommonRendering,
  componentName: 'Navigation',
  params: baseParams,
};

const createNavItem = (text: string) => {
  return {
    Id: `${text}-${Date.now()}`,
    Href: '#',
    Querystring: '',
    DisplayName: text,
    Title: createTextField(text),
    NavigationTitle: createTextField(text),
  };
};

const baseFields = {
  0: {
    ...createNavItem('Forma Lux'),
    Styles: ['level0', 'submenu', 'item0', 'odd', 'first', 'last'],
    Children: [
      {
        ...createNavItem('About us'),
        Styles: ['level1', 'item0', 'odd', 'first', 'active'],
      },
      {
        ...createNavItem('Contact us'),
        Styles: ['level1', 'item1', 'even'],
      },
      {
        ...createNavItem('Test page'),
        Styles: ['level1', 'submenu', 'item2', 'odd', 'last'],
        Children: [
          {
            ...createNavItem('Test subpage'),
            Styles: ['level2', 'item0', 'odd', 'first'],
          },
          {
            ...createNavItem('Test subpage'),
            Styles: ['level2', 'item1', 'even', 'last'],
          },
        ],
      },
    ],
  },
};

export const Default: Story = {
  render: () => {
    return <Navigation params={baseParams} rendering={baseRendering} fields={baseFields} />;
  },
};

export const Horizontal: Story = {
  render: () => {
    return (
      <Navigation
        params={{ ...baseParams, styles: `${baseParams.styles} navigation-main-horizontal` }}
        rendering={baseRendering}
        fields={baseFields}
      />
    );
  },
};
