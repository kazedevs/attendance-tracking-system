"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ReportFilters } from "@/components/reports/report-filters"
import { StudentAttendanceTable } from "@/components/reports/student-attendance-table"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, AlertTriangle, BookOpen } from "lucide-react"

export default function TeacherReportsPage() {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    console.log("Filters changed:", newFilters)
  }

  const handleExport = (format: "csv" | "xlsx") => {
    console.log(`Exporting as ${format}`)
    const filename = `my-classes-report-${new Date().toISOString().split("T")[0]}.${format}`
    alert(`Downloading ${filename}`)
  }

  return (
    <AppLayout
      userRole="teacher"
      userName="Dr. Sarah Johnson"
      userEmail="sarah.johnson@school.edu"
      userAvatar="/teacher-avatar.png"
    >
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
          <p className="text-muted-foreground">Attendance analytics for your classes</p>
        </div>

        {/* Report Filters */}
        <ReportFilters onFilterChange={handleFilterChange} onExport={handleExport} userRole="teacher" />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <StatCard
            title="Average Attendance"
            value="89.5%"
            description="Across all subjects"
            icon={TrendingUp}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard title="Total Students" value="83" description="In your classes" icon={Users} />
          <StatCard title="Sessions This Month" value="38" description="Classes conducted" icon={BookOpen} />
        </div>


        {/* Student Details */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Details</CardTitle>
            <CardDescription>Detailed attendance records for your students</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAttendanceTable />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
