"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import type { UserRole } from "@/lib/types"

interface AppLayoutProps {
  children: React.ReactNode
  userRole: UserRole
  userName: string
  userEmail: string
  userAvatar?: string
}

export function AppLayout({ children, userRole, userName, userEmail, userAvatar }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} userName={userName} userEmail={userEmail} userAvatar={userAvatar} />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
