"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, TrendingDown } from "lucide-react"
import { mockStudents } from "@/lib/mock-data"
import type { Student } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

// Mock attendance data for students
const studentAttendance = {
  "1": { present: 18, total: 20, percentage: 90 },
  "2": { present: 16, total: 20, percentage: 80 },
  "3": { present: 19, total: 20, percentage: 95 },
}

export default function TeacherStudentsPage() {
  const [students] = useState<Student[]>(mockStudents.filter((s) => s.course === "Computer Science"))

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.avatar || "/student-avatar.png"} />
          <AvatarFallback>
            {row.original.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => <Badge variant="secondary">{row.getValue("year")} Year</Badge>,
    },
    {
      id: "attendance",
      header: "Attendance",
      cell: ({ row }) => {
        const attendance = studentAttendance[row.original.id as keyof typeof studentAttendance]
        if (!attendance) return "No data"

        return (
          <div className="flex items-center gap-2">
            <div className="w-16">
              <Progress value={attendance.percentage} className="h-2" />
            </div>
            <span className="text-sm font-medium">{attendance.percentage}%</span>
            <span className="text-xs text-muted-foreground">
              ({attendance.present}/{attendance.total})
            </span>
          </div>
        )
      },
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
          <h1 className="text-3xl font-bold text-foreground">My Students</h1>
          <p className="text-muted-foreground">Students enrolled in your courses</p>
        </div>

        {/* Student Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Students above 90%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Students below 85%</p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={students} searchKey="name" searchPlaceholder="Search students..." />
      </div>
    </AppLayout>
  )
}
