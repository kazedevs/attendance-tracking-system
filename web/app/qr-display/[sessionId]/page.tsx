"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode } from "lucide-react";

export default function QRDisplayPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [qrCode, setQrCode] = useState("");
  const [randomToken, setRandomToken] = useState("");
  const [countdown, setCountdown] = useState(16);
  const [sessionInfo, setSessionInfo] = useState({
    subject: "Data Structures",
    code: "CS201",
    teacher: "Dr. Sarah Johnson",
    teacherId: "TEA12345",
    department: "Computer Science",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time: "9:00 AM - 10:30 AM",
  });

  // Generate a random token
  const generateRandomToken = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  // Generate QR code URL with session data
  const generateQRCode = () => {
    const token = generateRandomToken();
    setRandomToken(token);

    const qrData = {
      sessionId,
      teacherId: sessionInfo.teacherId,
      subject: sessionInfo.subject,
      subjectCode: sessionInfo.code,
      department: sessionInfo.department,
      timestamp: new Date().toISOString(),
      token: token,
    };

    // Create the API endpoint for marking attendance
    const apiUrl = `${window.location.origin}/api/attendance/mark/${sessionId}`;

    // Include both the API URL and the data in the QR code
    const qrContent = {
      apiUrl,
      data: qrData,
    };

    const qrContentString = JSON.stringify(qrContent);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      qrContentString
    )}`;
    setQrCode(qrUrl);
  };

  // Set up interval for QR code regeneration
  useEffect(() => {
    // Generate initial QR code
    generateQRCode();
    setCountdown(16);

    // Set up interval to regenerate QR code every 16 seconds
    const interval = setInterval(() => {
      generateQRCode();
      setCountdown(16);
    }, 16000);

    // Set up countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 16;
        return prev - 1;
      });
    }, 1000);

    // Clean up intervals on component unmount
    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [sessionId]);

  return (
    <div className="h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 overflow-hidden">
      <Card className="w-full max-w-4xl m-4">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <QrCode className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Attendance QR Code</CardTitle>
          </div>
          <CardDescription className="text-sm">
            Scan this code to mark your attendance
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 p-6">
          {/* QR Code Section */}
          <div className="flex-1 flex flex-col items-center space-y-4 p-6 bg-muted/30 rounded-lg">
            <div className="p-4 bg-white rounded-lg border shadow-sm">
              {qrCode ? (
                <img
                  src={qrCode}
                  alt="Attendance QR Code"
                  className="w-56 h-56"
                />
              ) : (
                <div className="w-56 h-56 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-500">Loading QR Code...</span>
                </div>
              )}
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs text-muted-foreground">
                Token: <span className="font-mono">{randomToken}</span>
              </p>
              <p className="text-lg font-bold text-red-600">
                Regenerates in: <span className="text-2xl">{countdown}s</span>
              </p>
              <Badge variant="default" className="bg-green-500 mt-2">
                Active Session
              </Badge>
            </div>
          </div>

          {/* Session Details Section */}
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b">
              Session Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Subject
                  </p>
                  <p className="font-medium">{sessionInfo.subject}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Code
                  </p>
                  <Badge variant="outline" className="text-sm">
                    {sessionInfo.code}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Teacher
                </p>
                <p>
                  {sessionInfo.teacher}{" "}
                  <span className="text-muted-foreground text-sm">
                    ({sessionInfo.teacherId})
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Department
                </p>
                <p>{sessionInfo.department}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Date
                  </p>
                  <p>{sessionInfo.date}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Time
                  </p>
                  <p>{sessionInfo.time}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
