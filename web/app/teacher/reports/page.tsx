"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ReportFilters } from "@/components/reports/report-filters"
import { ClassPerformanceChart } from "@/components/reports/class-performance-chart"
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

  // Mock data for teacher's subjects
  const mySubjects = [
    {
      id: "1",
      name: "Data Structures",
      code: "CS201",
      students: 45,
      attendanceRate: 87,
      sessionsHeld: 20,
      trend: 2.3,
    },
    {
      id: "2",
      name: "Algorithms",
      code: "CS301",
      students: 38,
      attendanceRate: 92,
      sessionsHeld: 18,
      trend: -1.2,
    },
  ]

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Average Attendance"
            value="89.5%"
            description="Across all subjects"
            icon={TrendingUp}
            trend={{ value: 1.8, isPositive: true }}
          />
          <StatCard title="Total Students" value="83" description="In your classes" icon={Users} />
          <StatCard title="Sessions This Month" value="38" description="Classes conducted" icon={BookOpen} />
          <StatCard
            title="Students at Risk"
            value="5"
            description="Below 75% attendance"
            icon={AlertTriangle}
            className="border-orange-200"
          />
        </div>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Attendance rates for each of your subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mySubjects.map((subject) => (
                <div key={subject.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">{subject.code}</p>
                    </div>
                    <Badge variant="outline">{subject.students} students</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Attendance Rate</span>
                      <span className="font-medium">{subject.attendanceRate}%</span>
                    </div>
                    <Progress value={subject.attendanceRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{subject.sessionsHeld} sessions held</span>
                      <span className={subject.trend > 0 ? "text-green-600" : "text-red-600"}>
                        {subject.trend > 0 ? "+" : ""}
                        {subject.trend}% from last month
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <ClassPerformanceChart />

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
