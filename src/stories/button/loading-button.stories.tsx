import LoadingButton from '@/components/button/loading-button'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Components/Button/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof LoadingButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click me',
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    isLoading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LoadingButton variant="default">Default</LoadingButton>
      <LoadingButton variant="destructive">Destructive</LoadingButton>
      <LoadingButton variant="outline">Outline</LoadingButton>
      <LoadingButton variant="secondary">Secondary</LoadingButton>
      <LoadingButton variant="ghost">Ghost</LoadingButton>
      <LoadingButton variant="link">Link</LoadingButton>
    </div>
  ),
}

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LoadingButton isLoading={false}>Not Loading</LoadingButton>
      <LoadingButton isLoading={true}>Loading</LoadingButton>
      <LoadingButton isLoading={true} variant="destructive">
        Deleting...
      </LoadingButton>
      <LoadingButton isLoading={true} variant="outline">
        Processing...
      </LoadingButton>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LoadingButton size="sm">Small</LoadingButton>
      <LoadingButton size="default">Default</LoadingButton>
      <LoadingButton size="lg">Large</LoadingButton>
    </div>
  ),
}

export const FormSubmit: Story = {
  args: {
    children: 'Send Reset Link',
    type: 'submit',
    isLoading: true,
    className: 'w-full',
  },
}
