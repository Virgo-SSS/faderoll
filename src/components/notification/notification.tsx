'use client'

import Link from 'next/link'
import { Bell } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface NotificationProps {
  className?: string
}

// Mock notification count - will be replaced with database call later
const mockNotificationCount = 3

export default function Notification({ className }: NotificationProps) {
  const count = mockNotificationCount
  return (
    <Button variant="ghost" size="icon" className={cn('relative', className)} asChild>
      <Link href="/notifications">
        <Bell className="size-6" />
        {count > 0 && (
          <span className="bg-destructive absolute top-0 right-0 flex size-4 items-center justify-center rounded-full text-[10px] leading-none font-medium text-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  )
}
