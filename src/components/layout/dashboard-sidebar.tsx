'use client'

import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, Users, Shield, Search, LucideIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuGroup,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { useSidebar } from '@/hooks/use-sidebar'
import Image from 'next/image'

type SidebarItem = {
  label: string
  icon: LucideIcon
  href: string
  items?: {
    label: string
    href: string
  }[]
}

const MENU_ITEMS: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    label: 'Calendar',
    icon: Calendar,
    href: '/calendar',
  },
  {
    label: 'Team',
    icon: Users,
    href: '/team',
    items: [
      {
        label: 'All Members',
        href: '/team/members',
      },
      {
        label: 'Roles',
        href: '/team/roles',
      },
    ],
  },
  {
    label: 'Admin',
    icon: Shield,
    href: '/admin',
    items: [
      {
        label: 'System Logs',
        href: '/admin/logs',
      },
      {
        label: 'API Keys',
        href: '/admin/keys',
      },
    ],
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <Sidebar>
      <SidebarHeader>
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="FadeRoll Logo" width={42} height={42} />
            <span className="text-lg font-bold">FadeRoll</span>
          </div>
        )}
      </SidebarHeader>

      {!isCollapsed && (
        <div className="p-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="bg-sidebar-accent/50 w-full pl-8 shadow-none"
            />
          </div>
        </div>
      )}

      <SidebarContent>
        <SidebarMenu>
          {MENU_ITEMS.map((item, index) => {
            if (item.items) {
              // Check if any sub-item is active to open the group by default (optional, can be improved)
              const isGroupActive = item.items.some((sub) => isActive(sub.href))

              return (
                <SidebarMenuGroup
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  defaultOpen={isGroupActive}
                >
                  {item.items.map((subItem, subIndex) => (
                    <SidebarMenuSubItem
                      key={subIndex}
                      href={subItem.href}
                      isActive={isActive(subItem.href)}
                    >
                      {subItem.label}
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuGroup>
              )
            }

            return (
              <SidebarMenuItem
                key={index}
                icon={item.icon}
                isActive={isActive(item.href)}
                href={item.href}
              >
                {item.label}
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
