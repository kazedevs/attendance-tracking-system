import { AppLayout } from "@/components/layout/app-layout"
import { StatCard } from "@/components/ui/stat-card"
import { TeacherAttendanceChart } from "@/components/charts/teacher-attendance-chart"
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
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Johnson! Here's your teaching overview.</p>
        </div>

        {/* Stats Cards */}
        
         {/* i removed lg:grid-cols-4  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          {/* <StatCard title="My Courses" value="2" description="Active teaching assignments" icon={BookOpen} />
          <StatCard title="Total Students" value="83" description="Across all courses" icon={Users} /> */}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6 lg:col-span-2">
            {/* removed temporarily */}
            {/* <MyCourses /> */}
            
             <RecentSessions />
          </div>
          <div className="space-y-6 lg:col-span-2">
            <TeacherAttendanceChart />
           <QuickActionsTeacher />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
