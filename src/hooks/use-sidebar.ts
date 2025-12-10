'use client'

import * as React from 'react'
import { SidebarContext, type SidebarContextValue } from '@/providers/sidebar-provider'

export function useSidebar(): SidebarContextValue {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
