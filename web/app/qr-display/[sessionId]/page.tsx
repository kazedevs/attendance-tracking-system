"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode } from "lucide-react"

export default function QRDisplayPage() {
  const params = useParams()
  const sessionId = params.sessionId as string
  const [qrCode, setQrCode] = useState("")
  const [sessionInfo, setSessionInfo] = useState({
    subject: "Data Structures",
    code: "CS201",
    teacher: "Dr. Sarah Johnson",
    date: "January 23, 2024",
    time: "9:00 AM - 10:30 AM",
  })

  // Generate QR code URL
  const generateQRCode = () => {
    const attendanceUrl = `${window.location.origin}/attendance/mark/${sessionId}`
    // Using a QR code service for demo purposes
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(attendanceUrl)}`
    setQrCode(qrUrl)
  }

  useEffect(() => {
    generateQRCode()
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <QrCode className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">Attendance QR Code</CardTitle>
          <CardDescription>Students can scan this code to mark their attendance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Details */}
          <div className="space-y-2">
            <h3 className="font-semibold text-center">Session Details</h3>
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

          {/* QR Code Display */}
          <div className="flex flex-col items-center space-y-4">
            <div className="p-6 bg-white rounded-lg border shadow-sm">
              {qrCode ? (
                <img src={qrCode} alt="Attendance QR Code" className="w-64 h-64" />
              ) : (
                <div className="w-64 h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Loading QR Code...</span>
                </div>
              )}
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Show this QR code to students for attendance marking
              </p>
              <Badge variant="default" className="bg-green-500">
                Active Session
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
