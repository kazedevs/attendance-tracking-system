"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { CourseForm } from "@/components/forms/course-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, BookOpen } from "lucide-react"
import { mockCourses } from "@/lib/mock-data"
import type { Course } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddCourse = (courseData: Partial<Course>) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      teacherId: "",
      students: [],
      ...courseData,
    } as Course
    setCourses([...courses, newCourse])
  }

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
  ]

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Courses</h1>
            <p className="text-muted-foreground">Manage academic courses and programs</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Course
          </Button>
        </div>

        {/* Course Statistics */}
        <div className="grid grid-cols-1 gap-6">
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
        </div>

        <DataTable columns={columns} data={courses} searchKey="name" searchPlaceholder="Search courses..." />

        <CourseForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleAddCourse}
        />
      </div>
    </AppLayout>
  )
}
