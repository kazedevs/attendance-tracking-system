"use client"

import { useState, useEffect } from "react"
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
import { useIsMobile, useBreakpoint } from "@/hooks/use-mobile"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const breakpoint = useBreakpoint()

  const navItems = userRole === "admin" ? adminNavItems : teacherNavItems

  // Auto-collapse sidebar on mobile and tablet
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true)
      setIsMobileMenuOpen(false)
    } else if (breakpoint === 'tablet') {
      setIsCollapsed(true)
    } else {
      setIsCollapsed(false)
    }
  }, [isMobile, breakpoint])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    // Clear any stored authentication data if needed
    // localStorage.removeItem('authToken') // uncomment if using localStorage
    // sessionStorage.clear() // uncomment if using sessionStorage
    
    // Redirect to login page
    router.push("/")
  }

  // Mobile overlay backdrop
  const MobileOverlay = () => (
    isMobile && isMobileMenuOpen ? (
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
        onClick={() => setIsMobileMenuOpen(false)}
      />
    ) : null
  )

  return (
    <>
      <MobileOverlay />
      <div
        className={cn(
          "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          // Desktop and tablet behavior
          !isMobile && (isCollapsed ? "w-16" : "w-64"),
          // Mobile behavior - full width overlay or hidden
          isMobile && (
            isMobileMenuOpen 
              ? "fixed left-0 top-0 z-50 w-64 shadow-lg" 
              : "fixed left-0 top-0 z-50 w-16"
          )
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
          onClick={() => {
            if (isMobile) {
              setIsMobileMenuOpen(!isMobileMenuOpen)
            } else {
              setIsCollapsed(!isCollapsed)
            }
          }}
          className="text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer"
        >
          {(isMobile && !isMobileMenuOpen) || (!isMobile && isCollapsed) ? (
            <Menu className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1 p-4",
        isMobile && !isMobileMenuOpen && "hidden"
      )}>
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            const showLabel = isMobile ? isMobileMenuOpen : !isCollapsed

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full text-sidebar-foreground cursor-pointer transition-all",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground",
                    !isActive && "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    showLabel ? "justify-start gap-3 h-11" : "justify-center px-2 h-10",
                    // Touch-friendly sizing for mobile
                    isMobile && "min-h-[44px]"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {showLabel && <span className="font-medium">{item.label}</span>}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className={cn(
        "p-4 border-t border-sidebar-border",
        isMobile && !isMobileMenuOpen && "hidden"
      )}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full text-sidebar-foreground hover:bg-sidebar-accent cursor-pointer transition-all",
                (isMobile ? isMobileMenuOpen : !isCollapsed) ? "justify-start gap-3 h-12" : "justify-center px-2 h-10",
                // Touch-friendly sizing for mobile
                isMobile && "min-h-[44px]"
              )}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={userAvatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {(isMobile ? isMobileMenuOpen : !isCollapsed) && (
                <div className="flex flex-col items-start text-sm min-w-0 flex-1">
                  <span className="font-medium truncate w-full">{userName}</span>
                  <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    </>
  )
}
