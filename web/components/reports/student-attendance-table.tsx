"use client"

import { useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockStudents } from "@/lib/mock-data"
import type { Student } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

// Mock detailed attendance data
const detailedAttendance = {
  "1": { present: 18, absent: 1, late: 1, total: 20, percentage: 90 },
  "2": { present: 16, absent: 3, late: 1, total: 20, percentage: 80 },
  "3": { present: 19, absent: 0, late: 1, total: 20, percentage: 95 },
}

export function StudentAttendanceTable() {
  const [students] = useState<Student[]>(mockStudents)

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
      id: "late",
      header: "Late",
      cell: ({ row }) => {
        const attendance = detailedAttendance[row.original.id as keyof typeof detailedAttendance]
        return attendance ? attendance.late : 0
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

  return <DataTable columns={columns} data={students} searchKey="name" searchPlaceholder="Search students..." />
}
