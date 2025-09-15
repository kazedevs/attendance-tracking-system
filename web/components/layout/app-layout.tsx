"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import type { UserRole } from "@/lib/types"

interface AppLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  userName: string
  userEmail: string
  userAvatar?: string
}

export function AppLayout({ children, userRole, userName, userEmail, userAvatar }: AppLayoutProps) {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
      <main className={cn(
        "flex-1 overflow-auto",
        // Add padding on mobile to account for collapsed sidebar
        isMobile ? "ml-16" : "ml-0"
      )}>
        <div className="min-h-full">
          {children}
        </div>
      </main>
    </div>
  )
}
