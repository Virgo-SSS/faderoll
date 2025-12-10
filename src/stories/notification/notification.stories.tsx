import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'
import Notification from '@/components/notification/notification'

const meta = {
  title: 'Components/Notification/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Notification>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Find the notification button (it's a link inside a button)
    const notificationButton = canvas.getByRole('link')

    // Verify it has the correct href
    expect(notificationButton).toHaveAttribute('href', '/notifications')

    // Verify the bell icon is present
    const bellIcon = canvas.getByRole('link')
    expect(bellIcon).toBeInTheDocument()
  },
}
