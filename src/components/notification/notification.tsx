'use client'

import * as React from 'react'
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
        <Bell className="size-5" />
        {count > 0 && (
          <span className="bg-destructive text-destructive-foreground absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full text-[10px] leading-none font-medium">
            {count > 99 ? '99+' : count}
          </span>
        )}
        <span className="sr-only">Notifications</span>
      </Link>
    </Button>
  )
}
