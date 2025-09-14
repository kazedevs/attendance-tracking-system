"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ReportFilters } from "@/components/reports/report-filters"
import { AttendanceSummaryChart } from "@/components/reports/attendance-summary-chart"
import { StudentAttendanceTable } from "@/components/reports/student-attendance-table"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, AlertTriangle, BookOpen } from "lucide-react"
import { mockStudents, mockSubjects } from "@/lib/mock-data"

export default function TeacherReportsPage() {
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
        averageAttendance: "0%",
        totalStudents: "0",
        sessionsConducted: "0",
        studentsAtRisk: "0"
      }
    }

    // Filter students based on course and subject selection (teacher-specific)
    let filteredStudents = mockStudents
    
    if ((generatedFilters as any).course && (generatedFilters as any).course !== "all") {
      // In a real app, this would filter by teacher's courses
      filteredStudents = mockStudents.slice(0, Math.floor(mockStudents.length * 0.4)) // Mock teacher's course students
    }
    
    if ((generatedFilters as any).subject && (generatedFilters as any).subject !== "all") {
      // In a real app, this would filter by teacher's subjects
      filteredStudents = filteredStudents.slice(0, Math.floor(filteredStudents.length * 0.75)) // Mock teacher's subject students
    }

    // Calculate filtered metrics
    const totalStudents = filteredStudents.length
    const attendanceRates = [92, 88, 95, 89, 91, 85, 90, 93] // Mock attendance rates for teacher
    const avgAttendance = attendanceRates.reduce((sum, rate) => sum + rate, 0) / attendanceRates.length
    const studentsAtRisk = filteredStudents.filter(() => Math.random() > 0.85).length // Mock calculation
    
    return {
      averageAttendance: `${avgAttendance.toFixed(1)}%`,
      totalStudents: totalStudents.toString(),
      sessionsConducted: Math.floor(totalStudents * 0.15).toString(), // Mock calculation
      studentsAtRisk: studentsAtRisk.toString()
    }
  }, [generatedFilters])

  const handleExport = (format: "csv" | "xlsx") => {
    // In a real app, this would trigger file download
    console.log(`Exporting as ${format}`)
    // Simulate download
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
        <ReportFilters onFilterChange={handleFilterChange} onExport={handleExport} onGenerate={handleGenerate} userRole="teacher" />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Average Attendance"
            value={calculateMetrics.averageAttendance}
            description="Across all subjects"
            icon={TrendingUp}
          />
          <StatCard 
            title="Total Students" 
            value={calculateMetrics.totalStudents} 
            description="In your classes" 
            icon={Users} 
          />
          <StatCard 
            title="Sessions This Month" 
            value={calculateMetrics.sessionsConducted} 
            description="Classes conducted" 
            icon={BookOpen} 
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

        {/* Student Details */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Details</CardTitle>
            <CardDescription>Detailed attendance records for your students</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentAttendanceTable filters={generatedFilters} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
