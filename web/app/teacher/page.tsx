import { AppLayout } from "@/components/layout/app-layout"
import { StatCard } from "@/components/ui/stat-card"
import { MyCourses } from "@/components/teacher/my-courses"
import { RecentSessions } from "@/components/teacher/recent-sessions"
import { QuickActionsTeacher } from "@/components/teacher/quick-actions-teacher"
import { BookOpen, Users, Calendar, TrendingUp } from "lucide-react"

export default function TeacherDashboard() {
  return (
    <AppLayout
      userRole="teacher"
      userName="Dr. Sarah Johnson"
      userEmail="sarah.johnson@school.edu"
      userAvatar="/teacher-avatar.png"
    >
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Welcome back, Dr. Johnson! Here's your teaching overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"> 
          <StatCard title="Sessions This Week" value="8" description="Completed attendance sessions" icon={Calendar} />
          <StatCard
            title="Average Attendance"
            value="89.5%"
            description="Across all courses"
            icon={TrendingUp}
            trend={{ value: 3.2, isPositive: true }}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6 xl:col-span-2">
            <RecentSessions />
          </div>
          <div className="space-y-6 xl:col-span-2">
           <QuickActionsTeacher />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
