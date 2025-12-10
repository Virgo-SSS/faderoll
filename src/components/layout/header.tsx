'use client'

import { cn } from '@/lib/utils'
import Notification from '@/components/notification/notification'
import UserMenu from '@/components/user-menu/user-menu'

interface HeaderProps {
  className?: string
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn('bg-background flex h-14 items-center gap-4 border-b px-6', className)}>
      <div className="ml-auto flex items-center gap-4">
        <Notification />
        <UserMenu />
      </div>
    </header>
  )
}
