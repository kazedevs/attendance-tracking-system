"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { DataTable } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Download, Calendar, Clock } from "lucide-react"
import { mockAttendanceSessions, mockSubjects } from "@/lib/mock-data"
import type { AttendanceSession } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"

export default function SessionsPage() {
  const [sessions] = useState<AttendanceSession[]>([
    ...mockAttendanceSessions,
    {
      id: "2",
      subjectId: "2",
      teacherId: "1",
      date: "2024-01-22",
      startTime: "14:00",
      endTime: "15:30",
      qrCode: "QR789012",
      isActive: false,
    },
    {
      id: "3",
      subjectId: "1",
      teacherId: "1",
      date: "2024-01-21",
      startTime: "09:00",
      endTime: "10:30",
      qrCode: "QR345678",
      isActive: false,
    },
  ])

  const getSubjectInfo = (subjectId: string) => {
    const subject = mockSubjects.find((s) => s.id === subjectId)
    return subject ? { name: subject.name, code: subject.code } : { name: "Unknown", code: "N/A" }
  }

  const columns: ColumnDef<AttendanceSession>[] = [
    {
      accessorKey: "subjectId",
      header: "Subject",
      cell: ({ row }) => {
        const subject = getSubjectInfo(row.getValue("subjectId"))
        return (
          <div>
            <p className="font-medium">{subject.name}</p>
            <p className="text-sm text-muted-foreground">{subject.code}</p>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"))
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: "startTime",
      header: "Time",
      cell: ({ row }) => {
        return `${row.getValue("startTime")} - ${row.original.endTime}`
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive")
        return <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Completed"}</Badge>
      },
    },
    {
      id: "attendance",
      header: "Attendance",
      cell: () => {
        // Mock attendance data
        const present = Math.floor(Math.random() * 20) + 25
        const total = Math.floor(Math.random() * 10) + 40
        const percentage = Math.round((present / total) * 100)
        return (
          <div className="text-sm">
            <p className="font-medium">
              {present}/{total}
            </p>
            <p className="text-muted-foreground">{percentage}%</p>
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const session = row.original

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
              <DropdownMenuItem>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <h1 className="text-3xl font-bold text-foreground">Attendance Sessions</h1>
          <p className="text-muted-foreground">View and manage your attendance sessions</p>
        </div>

        {/* Session Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions.length}</div>
              <p className="text-xs text-muted-foreground">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions.filter((s) => s.isActive).length}</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89.2%</div>
              <p className="text-xs text-muted-foreground">Across all sessions</p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={sessions} searchKey="subjectId" searchPlaceholder="Search sessions..." />
      </div>
    </AppLayout>
  )
}
