"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, BookOpen } from "lucide-react"
import { mockCourses, mockTeachers } from "@/lib/mock-data"
import type { Course } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function CoursesPage() {
  const [courses] = useState<Course[]>(mockCourses)

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "name",
      header: "Course Name",
    },
    {
      accessorKey: "code",
      header: "Course Code",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("code")}</Badge>,
    },
    {
      accessorKey: "description",
      header: "Description",
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
    {
      accessorKey: "students",
      header: "Students",
      cell: ({ row }) => {
        const students = row.getValue("students") as string[]
        return (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{students.length}</span>
          </div>
        )
      },
    },
  ]

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground">Manage academic courses and programs</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollment</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courses.reduce((total, course) => total + course.students.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Students enrolled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Class Size</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(courses.reduce((total, course) => total + course.students.length, 0) / courses.length)}
              </div>
              <p className="text-xs text-muted-foreground">Students per course</p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={courses} searchKey="name" searchPlaceholder="Search courses..." />
      </div>
    </AppLayout>
  )
}
