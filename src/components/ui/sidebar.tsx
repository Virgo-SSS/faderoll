'use client'

import * as React from 'react'
import { ChevronRight, Menu } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/hooks/use-sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import Link from 'next/link'

interface SidebarProps extends React.ComponentProps<'aside'> {
  children: React.ReactNode
}

function Sidebar({ className, children, ...props }: SidebarProps) {
  const { isCollapsed } = useSidebar()

  return (
    <aside
      data-slot="sidebar"
      data-collapsed={isCollapsed}
      className={cn(
        'bg-sidebar text-sidebar-foreground border-sidebar-border flex h-full flex-col border-r transition-[width] duration-200 ease-out',
        isCollapsed ? 'w-16' : 'w-64',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

interface SidebarHeaderProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  const { isCollapsed, toggleCollapsed } = useSidebar()

  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        'border-sidebar-border flex h-14 items-center border-b px-3',
        isCollapsed ? 'justify-center' : 'justify-between',
        className
      )}
      {...props}
    >
      {!isCollapsed && children}
      <button
        type="button"
        onClick={toggleCollapsed}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className={cn(
          'inline-flex size-8 items-center justify-center rounded-md transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'focus-visible:ring-sidebar-ring focus-visible:ring-2 focus-visible:outline-none',
          isCollapsed && 'ml-0'
        )}
      >
        <Menu className="size-5" />
      </button>
    </div>
  )
}

interface SidebarContentProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex-1 overflow-y-auto py-2', className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface SidebarMenuProps extends React.ComponentProps<'nav'> {
  children: React.ReactNode
}

function SidebarMenu({ className, children, ...props }: SidebarMenuProps) {
  return (
    <nav data-slot="sidebar-menu" className={cn('flex flex-col gap-1 px-2', className)} {...props}>
      {children}
    </nav>
  )
}

interface SidebarMenuItemProps extends React.ComponentProps<'a'> {
  icon: LucideIcon
  isActive?: boolean
  children: React.ReactNode
}

function SidebarMenuItem({
  icon: Icon,
  isActive = false,
  className,
  children,
  href,
  ...props
}: SidebarMenuItemProps) {
  const { isCollapsed } = useSidebar()

  return (
    <Link
      href={href || '#'}
      data-slot="sidebar-menu-item"
      data-active={isActive}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-sidebar-ring focus-visible:ring-2 focus-visible:outline-none',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        isCollapsed && 'justify-center px-0',
        className
      )}
      {...props}
    >
      <Icon className="size-5 shrink-0" />
      {!isCollapsed && <span className="truncate">{children}</span>}
    </Link>
  )
}

interface SidebarMenuGroupProps {
  icon: LucideIcon
  label: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function SidebarMenuGroup({
  icon: Icon,
  label,
  defaultOpen = false,
  children,
}: SidebarMenuGroupProps) {
  const { isCollapsed } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  if (isCollapsed) {
    return (
      <div
        data-slot="sidebar-menu-group"
        className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
        title={label}
      >
        <Icon className="size-5 shrink-0" />
      </div>
    )
  }

  return (
    <Collapsible data-slot="sidebar-menu-group" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger
        className={cn(
          'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'focus-visible:ring-sidebar-ring focus-visible:ring-2 focus-visible:outline-none'
        )}
      >
        <Icon className="size-5 shrink-0" />
        <span className="flex-1 truncate text-left">{label}</span>
        <ChevronRight
          className={cn('size-4 shrink-0 transition-transform duration-200', isOpen && 'rotate-90')}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="flex flex-col gap-1 py-1">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}

interface SidebarMenuSubItemProps extends React.ComponentProps<'a'> {
  isActive?: boolean
  children: React.ReactNode
}

function SidebarMenuSubItem({
  isActive = false,
  className,
  children,
  ...props
}: SidebarMenuSubItemProps) {
  return (
    <a
      data-slot="sidebar-menu-sub-item"
      data-active={isActive}
      className={cn(
        'flex items-center gap-3 rounded-md py-2 pr-3 pl-11 text-sm transition-colors',
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:ring-sidebar-ring focus-visible:ring-2 focus-visible:outline-none',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
        className
      )}
      {...props}
    >
      <span className="truncate">{children}</span>
    </a>
  )
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuGroup,
  SidebarMenuSubItem,
}
