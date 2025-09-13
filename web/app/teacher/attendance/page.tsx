"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { QRGenerator } from "@/components/qr-generator"
import { SessionForm } from "@/components/attendance/session-form"
import { ManualAttendance } from "@/components/attendance/manual-attendance"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Clock, Users, CheckCircle } from "lucide-react"
import { mockSubjects, mockAttendanceSessions } from "@/lib/mock-data"
import type { AttendanceSession, AttendanceRecord } from "@/lib/types"

export default function AttendancePage() {
  const [sessions, setSessions] = useState<AttendanceSession[]>(mockAttendanceSessions)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeSession, setActiveSession] = useState<AttendanceSession | null>(sessions.find((s) => s.isActive) || null)

  const handleCreateSession = (sessionData: Partial<AttendanceSession>) => {
    // End any existing active sessions
    setSessions((prev) => prev.map((s) => ({ ...s, isActive: false })))

    const newSession = sessionData as AttendanceSession
    setSessions((prev) => [...prev, newSession])
    setActiveSession(newSession)
  }

  const handleToggleSession = () => {
    if (activeSession) {
      setSessions((prev) => prev.map((s) => (s.id === activeSession.id ? { ...s, isActive: false } : s)))
      setActiveSession(null)
    }
  }

  const handleSaveAttendance = (records: Partial<AttendanceRecord>[]) => {
    // In a real app, this would save to the database
    console.log("Saving attendance records:", records)
    // Show success message or update UI
  }

  const getSubjectInfo = (subjectId: string) => {
    const subject = mockSubjects.find((s) => s.id === subjectId)
    return subject ? { name: subject.name, code: subject.code } : { name: "Unknown", code: "N/A" }
  }

  return (
    <AppLayout
      userRole="teacher"
      userName="Dr. Sarah Johnson"
      userEmail="sarah.johnson@school.edu"
      userAvatar="/teacher-avatar.png"
    >
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground">Create sessions and manage student attendance</p>
          </div>
          <Button onClick={() => setIsFormOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>

        {/* Active Session Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Session Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSession ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="default" className="bg-green-500">
                    Active
                  </Badge>
                  <div>
                    <p className="font-medium">{getSubjectInfo(activeSession.subjectId).name}</p>
                    <p className="text-sm text-muted-foreground">
                      {activeSession.date} • {activeSession.startTime} - {activeSession.endTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>0 students marked</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  No active session. Create a new session to start taking attendance.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {activeSession && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* QR Code Generator */}
            <QRGenerator
              sessionId={activeSession.id}
              subjectName={getSubjectInfo(activeSession.subjectId).name}
              subjectCode={getSubjectInfo(activeSession.subjectId).code}
              isActive={activeSession.isActive}
              onToggleSession={handleToggleSession}
            />

            {/* Manual Attendance */}
            <ManualAttendance sessionId={activeSession.id} onSaveAttendance={handleSaveAttendance} />
          </div>
        )}

        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your latest attendance sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sessions.slice(0, 5).map((session) => {
                const subject = getSubjectInfo(session.subjectId)
                return (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${session.isActive ? "bg-green-500" : "bg-gray-300"}`} />
                      <div>
                        <p className="font-medium">
                          {subject.name} ({subject.code})
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.date} • {session.startTime} - {session.endTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={session.isActive ? "default" : "secondary"}>
                        {session.isActive ? "Active" : "Completed"}
                      </Badge>
                      {!session.isActive && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <SessionForm open={isFormOpen} onOpenChange={setIsFormOpen} onSubmit={handleCreateSession} />
      </div>
    </AppLayout>
  )
}
