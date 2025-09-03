import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LanguageSwitcher from '../components/language-switcher/LanguageSwitcher';

type StoryProps = React.ComponentProps<typeof LanguageSwitcher>;

const meta = {
  title: 'Utilities/LanguageSwitcher',
  component: LanguageSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<StoryProps>;

export const Default: Story = {
  render: () => <LanguageSwitcher />,
};
