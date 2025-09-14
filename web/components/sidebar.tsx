"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileText,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import type { UserRole } from "@/lib/types"

interface SidebarProps {
  userRole: UserRole
  userName: string
  userEmail: string
  userAvatar?: string
}

const adminNavItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/students", icon: Users, label: "Students" },
  { href: "/admin/teachers", icon: GraduationCap, label: "Teachers" },
  { href: "/admin/courses", icon: BookOpen, label: "Courses" },
  { href: "/admin/subjects", icon: FileText, label: "Subjects" },
  { href: "/admin/reports", icon: BarChart3, label: "Reports" },
]

const teacherNavItems = [
  { href: "/teacher", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/teacher/attendance", icon: QrCode, label: "Attendance" },
  { href: "/teacher/sessions", icon: FileText, label: "Sessions" },
  { href: "/teacher/reports", icon: BarChart3, label: "Reports" },
]

export function Sidebar({ userRole, userName, userEmail, userAvatar }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navItems = userRole === "admin" ? adminNavItems : teacherNavItems

  const handleLogout = () => {
    // Clear any stored authentication data if needed
    // localStorage.removeItem('authToken') // uncomment if using localStorage
    // sessionStorage.clear() // uncomment if using sessionStorage
    
    // Redirect to login page
    router.push("/")
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Attendly</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full text-sidebar-foreground cursor-pointer",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                    !isActive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isCollapsed ? "justify-center px-2" : "justify-start gap-3",
                  )}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer",
                isCollapsed ? "justify-center px-2" : "justify-start gap-3",
              )}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={userAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
