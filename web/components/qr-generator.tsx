"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"


interface QRGeneratorProps {
  sessionId: string
  subjectName: string
  subjectCode: string
  isActive: boolean
  onToggleSession: () => void
}

export function QRGenerator({ sessionId, subjectName, subjectCode, isActive, onToggleSession }: QRGeneratorProps) {
  const [qrCode, setQrCode] = useState("")

  // Generate QR code URL (in a real app, this would be a proper QR code library)
  const generateQRCode = () => {
    const attendanceUrl = `${window.location.origin}/attendance/mark/${sessionId}`
    // Using a QR code service for demo purposes
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(attendanceUrl)}`
    setQrCode(qrUrl)
  }

  useEffect(() => {
    if (isActive) {
      generateQRCode()
    }
  }, [sessionId, isActive])


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>QR Code Generator</CardTitle>
            <CardDescription>
              {subjectName} ({subjectCode})
            </CardDescription>
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Active" : "Inactive"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isActive && qrCode ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-white rounded-lg border">
              <img src={qrCode || "/placeholder.svg"} alt="Attendance QR Code" className="w-48 h-48" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Students can scan this QR code to mark attendance</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No active session. Start a session to generate QR code.</p>
          </div>
        )}

      </CardContent>
    </Card>
  )
}
