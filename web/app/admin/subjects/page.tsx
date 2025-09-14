"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BookOpen, GraduationCap } from "lucide-react"
import { mockSubjects, mockCourses, mockTeachers } from "@/lib/mock-data"
import type { Subject } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function SubjectsPage() {
  const [subjects] = useState<Subject[]>(mockSubjects)

  const columns: ColumnDef<Subject>[] = [
    {
      accessorKey: "name",
      header: "Subject Name",
    },
    {
      accessorKey: "code",
      header: "Subject Code",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("code")}</Badge>,
    },
    {
      accessorKey: "courseId",
      header: "Course",
      cell: ({ row }) => {
        const courseId = row.getValue("courseId") as string
        const course = mockCourses.find((c) => c.id === courseId)
        return course ? <Badge variant="secondary">{course.name}</Badge> : "Not assigned"
      },
    },
    {
      accessorKey: "teacherId",
      header: "Instructor",
      cell: ({ row }) => {
        const teacherId = row.getValue("teacherId") as string
        const teacher = mockTeachers.find((t) => t.id === teacherId)
        return teacher ? teacher.name : "Not assigned"
      },
    },
  ]

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subjects</h1>
            <p className="text-muted-foreground">Manage individual subjects and their assignments</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Subject
          </Button>
        </div>

        {/* Subject Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subjects.length}</div>
              <p className="text-xs text-muted-foreground">Active subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Instructors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(subjects.map((s) => s.teacherId)).size}</div>
              <p className="text-xs text-muted-foreground">Teachers assigned</p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={subjects} searchKey="name" searchPlaceholder="Search subjects..." />
      </div>
    </AppLayout>
  )
}
