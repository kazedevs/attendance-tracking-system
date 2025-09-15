"use client"

import { useState, useEffect } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { StudentForm } from "@/components/forms/student-form"
import { StudentCredentialsDialog } from "@/components/dialogs/student-credentials-dialog"
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
import { Plus, MoreHorizontal, Edit, Trash2, RotateCcw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import type { Student } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

interface StudentData {
  _id: string;
  studentId: string;
  course: string;
  semester: string;
  user: {
    name: string;
    email: string;
  };
}

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentData[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentData | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [credentialsDialog, setCredentialsDialog] = useState<{
    open: boolean;
    studentName: string;
    studentId: string;
    password: string;
  }>({ open: false, studentName: '', studentId: '', password: '' })
  const { toast } = useToast()

  useEffect(() => {
    loadStudents()
  }, [])

  const loadStudents = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.getStudents()
      if (response.success && response.students) {
        setStudents(response.students)
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to load students",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load students",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddStudent = async (studentData: { name: string; email: string; course: string; semester: string }) => {
    try {
      const response = await apiClient.createStudent(studentData)
      if (response.success && response.student && response.studentId && response.password) {
        setStudents([...students, response.student])
        setCredentialsDialog({
          open: true,
          studentName: response.student.user.name,
          studentId: response.studentId,
          password: response.password,
        })
        toast({
          title: "Success",
          description: "Student account created successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create student",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create student",
        variant: "destructive",
      })
    }
  }

  const handleResetPassword = async (studentId: string, studentName: string) => {
    try {
      const response = await apiClient.resetStudentPassword(studentId)
      if (response.success && response.password) {
        setCredentialsDialog({
          open: true,
          studentName,
          studentId,
          password: response.password,
        })
        toast({
          title: "Success",
          description: "Password reset successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to reset password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reset password",
        variant: "destructive",
      })
    }
  }

  const handleDeleteStudent = async (studentId: string) => {
    try {
      const response = await apiClient.deleteStudent(studentId)
      if (response.success) {
        setStudents(students.filter((s) => s.studentId !== studentId))
        toast({
          title: "Success",
          description: "Student deleted successfully",
        })
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete student",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete student",
        variant: "destructive",
      })
    }
  }

  const columns: ColumnDef<StudentData>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/student-avatar.png" />
          <AvatarFallback>
            {row.original.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ),
    },
    {
      accessorKey: "user.name",
      header: "Name",
      cell: ({ row }) => row.original.user.name,
    },
    {
      accessorKey: "studentId",
      header: "Student ID",
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => row.original.user.email,
    },
    {
      accessorKey: "course",
      header: "Course",
      cell: ({ row }) => <Badge variant="outline">{row.getValue("course")}</Badge>,
    },
    {
      accessorKey: "semester",
      header: "Semester",
      cell: ({ row }) => <Badge variant="secondary">{row.getValue("semester")}</Badge>,
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
                onClick={() => handleResetPassword(student.studentId, student.user.name)}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteStudent(student.studentId)} className="text-destructive">
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
          <Button onClick={() => setIsFormOpen(true)} className="gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>

        <DataTable 
          columns={columns} 
          data={students} 
          searchKey="user.name" 
          searchPlaceholder="Search students..." 
        />

        <StudentForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          onSubmit={handleAddStudent}
        />

        <StudentCredentialsDialog
          open={credentialsDialog.open}
          onOpenChange={(open) => setCredentialsDialog({ ...credentialsDialog, open })}
          studentName={credentialsDialog.studentName}
          studentId={credentialsDialog.studentId}
          password={credentialsDialog.password}
        />
      </div>
    </AppLayout>
  )
}
