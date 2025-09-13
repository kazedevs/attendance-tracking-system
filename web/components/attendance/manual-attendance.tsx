"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockStudents } from "@/lib/mock-data"
import type { Student, AttendanceRecord } from "@/lib/types"

interface ManualAttendanceProps {
  sessionId: string
  onSaveAttendance: (records: Partial<AttendanceRecord>[]) => void
}

export function ManualAttendance({ sessionId, onSaveAttendance }: ManualAttendanceProps) {
  const [students] = useState<Student[]>(mockStudents.filter((s) => s.course === "Computer Science"))
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | "late">>({})

  const handleAttendanceChange = (studentId: string, status: "present" | "absent" | "late") => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }))
  }

  const handleSave = () => {
    const records = Object.entries(attendance).map(([studentId, status]) => ({
      id: `${sessionId}-${studentId}`,
      sessionId,
      studentId,
      timestamp: new Date().toISOString(),
      status,
      method: "manual" as const,
    }))
    onSaveAttendance(records)
  }

  const getStatusColor = (status: "present" | "absent" | "late") => {
    switch (status) {
      case "present":
        return "bg-green-500"
      case "late":
        return "bg-yellow-500"
      case "absent":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Attendance</CardTitle>
        <CardDescription>Mark attendance manually for students who couldn't scan the QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={student.avatar || "/student-avatar.png"} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.studentId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {(["present", "late", "absent"] as const).map((status) => (
                  <Button
                    key={status}
                    size="sm"
                    variant={attendance[student.id] === status ? "default" : "outline"}
                    onClick={() => handleAttendanceChange(student.id, status)}
                    className={
                      attendance[student.id] === status
                        ? `${getStatusColor(status)} text-white hover:${getStatusColor(status)}/90`
                        : ""
                    }
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {Object.keys(attendance).length} of {students.length} students marked
          </div>
          <Button onClick={handleSave} disabled={Object.keys(attendance).length === 0}>
            Save Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
