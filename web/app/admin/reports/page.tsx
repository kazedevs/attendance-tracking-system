"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ReportFilters } from "@/components/reports/report-filters"
import { AttendanceSummaryChart } from "@/components/reports/attendance-summary-chart"
import { StudentAttendanceTable } from "@/components/reports/student-attendance-table"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, AlertTriangle, Calendar } from "lucide-react"
import { mockStudents, mockCourses, mockSubjects } from "@/lib/mock-data"

export default function AdminReportsPage() {
  const [filters, setFilters] = useState({})
  const [generatedFilters, setGeneratedFilters] = useState<any>({})

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    // In a real app, this would trigger data refetch
    console.log("Filters changed:", newFilters)
  }

  const handleGenerate = (filterData: any) => {
    setGeneratedFilters(filterData)
    console.log("Generating report with filters:", filterData)
  }

  // Calculate metrics based on generated filters
  const calculateMetrics = useMemo(() => {
    const hasFilters = generatedFilters && Object.keys(generatedFilters).length > 0
    
    if (!hasFilters) {
      return {
        overallAttendance: "0%",
        totalStudents: "0",
        sessionsConducted: "0",
        studentsAtRisk: "0"
      }
    }

    // Filter students based on course selection
    let filteredStudents = mockStudents
    
    if ((generatedFilters as any).course && (generatedFilters as any).course !== "all") {
      const selectedCourse = mockCourses.find(c => c.id === (generatedFilters as any).course)
      if (selectedCourse) {
        filteredStudents = mockStudents.filter(student => student.course === selectedCourse.name)
      }
    }

    // Calculate filtered metrics
    const totalStudents = filteredStudents.length
    const attendanceRates = [90, 80, 95, 85, 92, 78, 88, 91] // Mock attendance rates
    const avgAttendance = attendanceRates.reduce((sum, rate) => sum + rate, 0) / attendanceRates.length
    const studentsAtRisk = filteredStudents.filter(() => Math.random() > 0.8).length // Mock calculation
    
    return {
      overallAttendance: `${avgAttendance.toFixed(1)}%`,
      totalStudents: totalStudents.toString(),
      sessionsConducted: Math.floor(totalStudents * 0.12).toString(), // Mock calculation
      studentsAtRisk: studentsAtRisk.toString()
    }
  }, [generatedFilters])

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
        <ReportFilters onFilterChange={handleFilterChange} onExport={handleExport} onGenerate={handleGenerate} userRole="admin" />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Overall Attendance"
            value={calculateMetrics.overallAttendance}
            description="This semester"
            icon={TrendingUp}
          />
          <StatCard 
            title="Total Students" 
            value={calculateMetrics.totalStudents} 
            description="Enrolled students" 
            icon={Users} 
          />
          <StatCard 
            title="Sessions Conducted" 
            value={calculateMetrics.sessionsConducted} 
            description="This month" 
            icon={Calendar} 
          />
          <StatCard
            title="Students at Risk"
            value={calculateMetrics.studentsAtRisk}
            description="Below 75% attendance"
            icon={AlertTriangle}
            className="border-orange-200"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6">
          <AttendanceSummaryChart />
        </div>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Details</CardTitle>
            <CardDescription>Detailed attendance records for all students</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAttendanceTable filters={generatedFilters} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
