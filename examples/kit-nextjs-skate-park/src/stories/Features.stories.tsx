import { CommonParams, CommonRendering } from './common/commonData';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComponentProps } from 'react';
import {
  Default as Default,
  Process,
  Contact,
  WhyChoosingUs,
  Features,
} from '@/components/features/Features';
import { createIGQLData } from './helpers/createIGQLData';
import {
  createIGQLField,
  createImageField,
  createLinkField,
  createTextField,
} from './helpers/createFields';

type StoryProps = ComponentProps<typeof Default> & {
  bgOption: string;
};

const meta = {
  title: 'Page Content/Features',
  component: Default,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    bgOption: {
      name: 'Background Color',
      control: {
        type: 'select',
        labels: {
          'container-white-background': 'White',
          'container-color-background': 'Accent',
          'container-gray-background': 'Gray',
        },
      },
      options: [
        'container-white-background',
        'container-color-background',
        'container-gray-background',
      ],
    },
  },
  args: {
    bgOption: 'container-white-background',
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

export const FeatureBrands: Story = {
  render: (args) => {
    return (
      <Default
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.bgOption ?? 'container-white-background'}`,
        }}
        fields={createIGQLData({
          count: 5,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Title')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureProcess: Story = {
  render: (args) => {
    return (
      <Process
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.bgOption ?? 'container-white-background'}`,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField()),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureContact: Story = {
  render: (args) => {
    return (
      <Contact
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.bgOption ?? 'container-white-background'}`,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Description')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureWhyChoosingUs: Story = {
  render: (args) => {
    return (
      <WhyChoosingUs
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.bgOption ?? 'container-white-background'}`,
        }}
        fields={createIGQLData({
          count: 3,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField()),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};

export const FeatureFeatures: Story = {
  render: (args) => {
    return (
      <Features
        rendering={baseRendering}
        params={{
          ...baseParams,
          styles: `${baseParams.styles} ${args.bgOption ?? 'container-white-background'}`,
        }}
        fields={createIGQLData({
          count: 4,
          topLevelFields: {
            title: createIGQLField(createTextField('Features Title')),
          },
          createItems: (count) =>
            Array.from({ length: count }, () => ({
              featureTitle: createIGQLField(createTextField('Title')),
              featureDescription: createIGQLField(createTextField('Description')),
              featureImage: createIGQLField(createImageField('placeholder')),
              featureLink: createIGQLField(createLinkField('More Info')),
            })),
        })}
      />
    );
  },
};
