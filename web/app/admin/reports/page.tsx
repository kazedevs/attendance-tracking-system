"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ReportFilters } from "@/components/reports/report-filters"
import { AttendanceSummaryChart } from "@/components/reports/attendance-summary-chart"
import { ClassPerformanceChart } from "@/components/reports/class-performance-chart"
import { StudentAttendanceTable } from "@/components/reports/student-attendance-table"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, AlertTriangle, Calendar } from "lucide-react"

export default function AdminReportsPage() {
  const [filters, setFilters] = useState({})

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    // In a real app, this would trigger data refetch
    console.log("Filters changed:", newFilters)
  }

  const handleExport = (format: "csv" | "xlsx") => {
    // In a real app, this would trigger file download
    console.log(`Exporting as ${format}`)
    // Simulate download
    const filename = `attendance-report-${new Date().toISOString().split("T")[0]}.${format}`
    alert(`Downloading ${filename}`)
  }

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Reports</h1>
          <p className="text-muted-foreground">Comprehensive attendance analytics and reporting</p>
        </div>

        {/* Report Filters */}
        <ReportFilters onFilterChange={handleFilterChange} onExport={handleExport} userRole="admin" />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Overall Attendance"
            value="87.5%"
            description="This semester"
            icon={TrendingUp}
            trend={{ value: 2.3, isPositive: true }}
          />
          <StatCard title="Total Students" value="1,234" description="Enrolled students" icon={Users} />
          <StatCard title="Sessions Conducted" value="156" description="This month" icon={Calendar} />
          <StatCard
            title="Students at Risk"
            value="23"
            description="Below 75% attendance"
            icon={AlertTriangle}
            className="border-orange-200"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceSummaryChart />
          <ClassPerformanceChart />
        </div>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Details</CardTitle>
            <CardDescription>Detailed attendance records for all students</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAttendanceTable />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
