import { AppLayout } from "@/components/layout/app-layout"
import { StatCard } from "@/components/ui/stat-card"
import { AttendanceOverviewChart } from "@/components/charts/attendance-overview-chart"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening in your school.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Students"
            value="1,234"
            description="Active students enrolled"
            icon={Users}
          />
          <StatCard
            title="Total Teachers"
            value="56"
            description="Active teaching staff"
            icon={GraduationCap}
          />
          <StatCard
            title="Active Courses"
            value="24"
            description="Currently running courses"
            icon={BookOpen}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          <AttendanceOverviewChart />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </AppLayout>
  )
}
