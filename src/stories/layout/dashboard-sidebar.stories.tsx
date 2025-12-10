import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SidebarProvider } from '@/providers/sidebar-provider'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'

const meta = {
  title: 'Layout/DashboardSidebar',
  component: DashboardSidebar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div className="bg-background text-foreground flex h-screen">
          <Story />
          <main className="bg-muted/10 flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-4xl space-y-6">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-card text-card-foreground h-32 rounded-xl border p-6 shadow"
                  />
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="bg-card text-card-foreground col-span-4 h-[400px] rounded-xl border p-6 shadow" />
                <div className="bg-card text-card-foreground col-span-3 h-[400px] rounded-xl border p-6 shadow" />
              </div>
            </div>
          </main>
        </div>
      </SidebarProvider>
    ),
  ],
} satisfies Meta<typeof DashboardSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CalendarActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/calendar',
      },
    },
  },
}

export const SettingsProfileActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/admin/logs',
      },
    },
  },
}
