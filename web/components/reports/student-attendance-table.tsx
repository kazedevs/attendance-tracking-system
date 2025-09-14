"use client"

import { useState, useMemo } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockStudents, mockCourses, mockSubjects } from "@/lib/mock-data"
import type { Student } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

// Mock detailed attendance data
const detailedAttendance = {
  "1": { present: 18, absent: 2, total: 20, percentage: 90 },
  "2": { present: 16, absent: 4, total: 20, percentage: 80 },
  "3": { present: 19, absent: 1, total: 20, percentage: 95 },
}

interface StudentAttendanceTableProps {
  filters?: any
}

export function StudentAttendanceTable({ filters = {} }: StudentAttendanceTableProps) {
  const [students] = useState<Student[]>(mockStudents)

  // Filter students based on the generated filters
  const filteredStudents = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) {
      return students
    }

    return students.filter((student) => {
      // Filter by course
      if (filters.course && filters.course !== "all") {
        const course = mockCourses.find(c => c.id === filters.course)
        if (course && student.course !== course.name) {
          return false
        }
      }

      // Filter by subject (check if student's course has this subject)
      if (filters.subject && filters.subject !== "all") {
        const subject = mockSubjects.find(s => s.id === filters.subject)
        if (subject) {
          const studentCourse = mockCourses.find(c => c.name === student.course)
          if (!studentCourse || subject.courseId !== studentCourse.id) {
            return false
          }
        }
      }

      return true
    })
  }, [students, filters])

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
      header: "Student Name",
    },
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("course")}</Badge>,
    },
    {
      id: "present",
      header: "Present",
      cell: ({ row }) => {
        const attendance = detailedAttendance[row.original.id as keyof typeof detailedAttendance]
        return attendance ? attendance.present : 0
      },
    },
    {
      id: "absent",
      header: "Absent",
      cell: ({ row }) => {
        const attendance = detailedAttendance[row.original.id as keyof typeof detailedAttendance]
        return attendance ? attendance.absent : 0
      },
    },
    {
      id: "percentage",
      header: "Attendance Rate",
      cell: ({ row }) => {
        const attendance = detailedAttendance[row.original.id as keyof typeof detailedAttendance]
        if (!attendance) return "No data"

        return (
          <div className="flex items-center gap-2">
            <div className="w-16">
              <Progress value={attendance.percentage} className="h-2" />
            </div>
            <span className="text-sm font-medium">{attendance.percentage}%</span>
          </div>
        )
      },
    },
  ]

  // Check if no filters are applied
  const hasFilters = filters && Object.keys(filters).length > 0

  if (!hasFilters) {
    return (
      <div className="flex items-center justify-center h-32 text-muted-foreground">
        <p>No results.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium">Applied Filters:</span>
        {filters.course && filters.course !== "all" && (
          <Badge variant="secondary">
            Course: {mockCourses.find(c => c.id === filters.course)?.name || filters.course}
          </Badge>
        )}
        {filters.subject && filters.subject !== "all" && (
          <Badge variant="secondary">
            Subject: {mockSubjects.find(s => s.id === filters.subject)?.name || filters.subject}
          </Badge>
        )}
        {filters.dateFrom && (
          <Badge variant="secondary">
            From: {new Date(filters.dateFrom).toLocaleDateString()}
          </Badge>
        )}
        {filters.dateTo && (
          <Badge variant="secondary">
            To: {new Date(filters.dateTo).toLocaleDateString()}
          </Badge>
        )}
      </div>
      <DataTable columns={columns} data={filteredStudents} searchKey="name" searchPlaceholder="Search students..." />
    </div>
  )
}
