"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { TeacherForm } from "@/components/forms/teacher-form"
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
import { mockTeachers } from "@/lib/mock-data"
import type { Teacher } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>()

  const handleAddTeacher = (teacherData: Partial<Teacher>) => {
    const newTeacher: Teacher = {
      id: Date.now().toString(),
      ...teacherData,
    } as Teacher
    setTeachers([...teachers, newTeacher])
  }

  const handleEditTeacher = (teacherData: Partial<Teacher>) => {
    if (editingTeacher) {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? { ...t, ...teacherData } : t)))
      setEditingTeacher(undefined)
    }
  }

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers(teachers.filter((t) => t.id !== teacherId))
  }

  const columns: ColumnDef<Teacher>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src={row.original.avatar || "/teacher-avatar.png"} />
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
      accessorKey: "teacherId",
      header: "Teacher ID",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "department",
      header: "Department",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("department")}</Badge>,
    },
    {
      accessorKey: "subjects",
      header: "Subjects",
      cell: ({ row }) => {
        const subjects = row.getValue("subjects") as string[]
        return (
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 2).map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
            {subjects.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{subjects.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const teacher = row.original

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
                  setEditingTeacher(teacher)
                  setIsFormOpen(true)
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher.id)} className="text-destructive">
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
            <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
            <p className="text-muted-foreground">Manage teaching staff and their information</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Teacher
          </Button>
        </div>

        <DataTable columns={columns} data={teachers} searchKey="name" searchPlaceholder="Search teachers..." />

        <TeacherForm
          teacher={editingTeacher}
          open={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open)
            if (!open) setEditingTeacher(undefined)
          }}
          onSubmit={editingTeacher ? handleEditTeacher : handleAddTeacher}
        />
      </div>
    </AppLayout>
  )
}
