"use client"

import React, { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { TeacherForm } from "@/components/forms/teacher-form"
import { TeacherCredentialsDialog } from "@/components/dialogs/teacher-credentials-dialog"
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
import { Plus, MoreHorizontal, Edit, Trash2, Key, RotateCcw } from "lucide-react"
import type { Teacher } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"
import { migrateLocalStorageTeachers } from "@/lib/migration"

export default function TeachersPage() {
  // Load teachers from API on component mount
  const loadTeachers = async () => {
    try {
      const result = await apiClient.getTeachers();
      
      if (result.success && result.teachers) {
        // Convert MongoDB teachers to frontend Teacher type
        const convertedTeachers: Teacher[] = result.teachers.map((t) => ({
          id: t._id,
          name: t.user.name,
          email: t.user.email,
          teacherId: t.teacherId,
          department: t.department
        }));
        setTeachers(convertedTeachers);
      }
    } catch (error) {
      console.error('Load teachers error:', error);
      toast({
        title: "Error",
        description: "Failed to load teachers.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Load teachers on mount and migrate localStorage data
  React.useEffect(() => {
    const initializeTeachers = async () => {
      // First, migrate any existing localStorage teachers
      await migrateLocalStorageTeachers();
      // Then load teachers from MongoDB
      await loadTeachers();
    };
    
    initializeTeachers();
  }, []);
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<Teacher | undefined>()
  const [credentialsDialog, setCredentialsDialog] = useState<{
    open: boolean
    teacherName: string
    teacherId: string
    password: string
  }>({ open: false, teacherName: "", teacherId: "", password: "" })
  const { toast } = useToast()

  const handleAddTeacher = async (teacherData: Omit<Partial<Teacher>, 'id' | 'teacherId'>) => {
    try {
      const result = await apiClient.createTeacher(teacherData as { name: string; email: string; department: string });
      
      if (result.success && result.teacher) {
        // Convert MongoDB teacher to frontend Teacher type
        const newTeacher: Teacher = {
          id: result.teacher._id,
          name: result.teacher.user.name,
          email: result.teacher.user.email,
          teacherId: result.teacher.teacherId,
          department: result.teacher.department
        };
        
        setTeachers([...teachers, newTeacher]);
        
        // Show credentials dialog
        setCredentialsDialog({
          open: true,
          teacherName: result.teacher.user.name,
          teacherId: result.teacherId || result.teacher.teacherId,
          password: result.password || ''
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create teacher.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Add teacher error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
  }

  const handleEditTeacher = (teacherData: Partial<Teacher>) => {
    if (editingTeacher) {
      setTeachers(teachers.map((t) => (t.id === editingTeacher.id ? { ...t, ...teacherData } : t)))
      setEditingTeacher(undefined)
    }
  }

  const handleDeleteTeacher = async (teacher: Teacher) => {
    try {
      const result = await apiClient.deleteTeacher(teacher.teacherId);
      
      if (result.success) {
        setTeachers(teachers.filter((t) => t.id !== teacher.id));
        toast({
          title: "Teacher deleted",
          description: `${teacher.name} has been removed from the system.`
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete teacher.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Delete teacher error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
  }

  const handleResetPassword = async (teacher: Teacher) => {
    try {
      const result = await apiClient.resetTeacherPassword(teacher.teacherId);
      
      if (result.success && result.password) {
        setCredentialsDialog({
          open: true,
          teacherName: teacher.name,
          teacherId: teacher.teacherId,
          password: result.password
        });
        toast({
          title: "Password reset",
          description: `New password generated for ${teacher.name}.`
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to reset password.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive"
      });
    }
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
                Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleResetPassword(teacher)}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDeleteTeacher(teacher)} className="text-destructive">
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
          <Button onClick={() => setIsFormOpen(true)} className="gap-2 cursor-pointer">
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

        <TeacherCredentialsDialog
          open={credentialsDialog.open}
          onOpenChange={(open) => setCredentialsDialog(prev => ({ ...prev, open }))}
          teacherName={credentialsDialog.teacherName}
          teacherId={credentialsDialog.teacherId}
          password={credentialsDialog.password}
        />
      </div>
    </AppLayout>
  )
}
