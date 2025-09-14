"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export default function MarkAttendancePage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading")
  const [sessionInfo, setSessionInfo] = useState({
    subject: "Data Structures",
    code: "CS201",
    teacher: "Dr. Sarah Johnson",
    date: "January 23, 2024",
    time: "9:00 AM - 10:30 AM",
  })

  useEffect(() => {
    // Simulate API call to mark attendance
    const markAttendance = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate random success/failure for demo
        const success = Math.random() > 0.2
        setStatus(success ? "success" : "error")
      } catch (error) {
        setStatus("error")
      }
    }

    markAttendance()
  }, [sessionId])

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Clock className="h-12 w-12 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle className="h-12 w-12 text-green-500" />
      case "error":
        return <AlertCircle className="h-12 w-12 text-red-500" />
      case "expired":
        return <AlertCircle className="h-12 w-12 text-orange-500" />
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "loading":
        return "Marking your attendance..."
      case "success":
        return "Attendance marked successfully!"
      case "error":
        return "Failed to mark attendance"
      case "expired":
        return "This session has expired"
    }
  }

  const getStatusDescription = () => {
    switch (status) {
      case "loading":
        return "Please wait while we process your attendance."
      case "success":
        return "Your attendance has been recorded for this session."
      case "error":
        return "There was an error marking your attendance. Please try again or contact your teacher."
      case "expired":
        return "This attendance session is no longer active."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">{getStatusIcon()}</div>
          <CardTitle className="text-2xl">{getStatusMessage()}</CardTitle>
          <CardDescription>{getStatusDescription()}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Session Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subject:</span>
                <span>{sessionInfo.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Code:</span>
                <Badge variant="outline">{sessionInfo.code}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Teacher:</span>
                <span>{sessionInfo.teacher}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span>{sessionInfo.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span>{sessionInfo.time}</span>
              </div>
            </div>
          </div>

          {status === "error" && (
            <Button
              className="w-full"
              onClick={() => {
                setStatus("loading")
                setTimeout(() => setStatus("success"), 2000)
              }}
            >
              Try Again
            </Button>
          )}

          {status === "success" && (
            <Button className="w-full" onClick={() => window.close()}>
              Close
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
