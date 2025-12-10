import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { within, expect, userEvent } from 'storybook/test'
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  Users,
  CreditCard,
  Shield,
  Scissors,
} from 'lucide-react'

import { SidebarProvider } from '@/providers/sidebar-provider'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuGroup,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

const meta = {
  title: 'UI/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="flex h-screen">
          <Story />
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

function CompanyLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
        <Scissors className="size-5" />
      </div>
    </div>
  )
}

export const Default: Story = {
  args: {
    children: (
      <>
        <SidebarHeader>
          <CompanyLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem icon={LayoutDashboard} href="#" isActive>
              Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem icon={Calendar} href="#">
              Calendar
            </SidebarMenuItem>
            <SidebarMenuItem icon={MessageSquare} href="#">
              Messages
            </SidebarMenuItem>
            <SidebarMenuItem icon={Users} href="#">
              Customers
            </SidebarMenuItem>
            <SidebarMenuItem icon={CreditCard} href="#">
              Payments
            </SidebarMenuItem>

            <SidebarMenuGroup icon={Settings} label="Settings" defaultOpen>
              <SidebarMenuSubItem href="#">Profile</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#" isActive>
                Security
              </SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Notifications</SidebarMenuSubItem>
            </SidebarMenuGroup>
          </SidebarMenu>
        </SidebarContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const menuButton = canvas.getByLabelText(/collapse sidebar/i)
    await expect(menuButton).toBeInTheDocument()

    const sidebar = canvasElement.querySelector('[data-slot="sidebar"]') as HTMLElement
    await expect(sidebar).toBeInTheDocument()

    const dashboardItem = within(sidebar).getByText('Dashboard')
    await expect(dashboardItem).toBeVisible()

    await expect(dashboardItem.closest('a')).toHaveClass('bg-sidebar-accent')

    const calendarItem = within(sidebar).getByText('Calendar')
    await expect(calendarItem.closest('a')).not.toHaveClass('bg-sidebar-accent')

    await userEvent.click(menuButton)

    await expect(sidebar).toHaveClass('w-16')
    await expect(dashboardItem).not.toBeVisible()

    await userEvent.click(menuButton)

    await expect(sidebar).toHaveClass('w-64')
    await expect(within(sidebar).getByText('Dashboard')).toBeVisible()
  },
}

export const MultipleGroups: Story = {
  args: {
    children: (
      <>
        <SidebarHeader>
          <CompanyLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem icon={LayoutDashboard} href="#" isActive>
              Dashboard
            </SidebarMenuItem>

            <SidebarMenuGroup icon={Users} label="Team" defaultOpen>
              <SidebarMenuSubItem href="#">All Members</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Add Member</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Roles</SidebarMenuSubItem>
            </SidebarMenuGroup>

            <SidebarMenuGroup icon={Settings} label="Settings">
              <SidebarMenuSubItem href="#">Profile</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Security</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Notifications</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">Billing</SidebarMenuSubItem>
            </SidebarMenuGroup>

            <SidebarMenuGroup icon={Shield} label="Admin">
              <SidebarMenuSubItem href="#">System Logs</SidebarMenuSubItem>
              <SidebarMenuSubItem href="#">API Keys</SidebarMenuSubItem>
            </SidebarMenuGroup>
          </SidebarMenu>
        </SidebarContent>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const settingsButton = canvas.getByText('Settings')
    await expect(settingsButton).toBeInTheDocument()

    const dashboardItem = canvas.getByText('Dashboard').closest('a')
    await expect(dashboardItem).toHaveClass('bg-sidebar-accent')

    const profileSubItem = canvas.queryByText('Profile')
    await expect(profileSubItem).not.toBeInTheDocument()

    await userEvent.click(settingsButton)

    const profileItem = await canvas.findByText('Profile')
    await expect(profileItem).toBeVisible()

    await expect(profileItem.closest('a')).not.toHaveClass('bg-sidebar-accent')

    await expect(canvas.getByText('Security')).toBeVisible()
    await expect(canvas.getByText('Notifications')).toBeVisible()
    await expect(canvas.getByText('Billing')).toBeVisible()

    await userEvent.click(settingsButton)

    await expect(canvas.queryByText('Profile')).not.toBeInTheDocument()
  },
}
