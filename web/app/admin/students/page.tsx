"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { StudentForm } from "@/components/forms/student-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { mockStudents } from "@/lib/mock-data"
import type { Student } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | undefined>()

  const handleAddStudent = (studentData: Partial<Student>) => {
    const newStudent: Student = {
      id: Date.now().toString(),
      ...studentData,
    } as Student
    setStudents([...students, newStudent])
  }

  const handleEditStudent = (studentData: Partial<Student>) => {
    if (editingStudent) {
      setStudents(students.map((s) => (s.id === editingStudent.id ? { ...s, ...studentData } : s)))
      setEditingStudent(undefined)
    }
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((s) => s.id !== studentId))
  }

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
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("course")}</Badge>,
    },
    {
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => <Badge variant="secondary">{row.getValue("year")} Year</Badge>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditingStudent(student)
                  setIsFormOpen(true)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteStudent(student.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <AppLayout userRole="admin" userName="Admin User" userEmail="admin@school.edu" userAvatar="/admin-avatar.png">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Students</h1>
            <p className="text-muted-foreground">Manage student records and information</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>

        <DataTable columns={columns} data={students} searchKey="name" searchPlaceholder="Search students..." />

        <StudentForm
          student={editingStudent}
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open)
            if (!open) setEditingStudent(undefined)
          }}
          onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        />
      </div>
    </AppLayout>
  )
}
