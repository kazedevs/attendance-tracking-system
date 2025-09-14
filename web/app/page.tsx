"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BarChart3 } from "lucide-react"

export default function HomePage() {
  const router = useRouter()

  // Auto-redirect to admin dashboard for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/admin")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Smart Attendance System</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline attendance management with QR code technology and comprehensive analytics
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Separate dashboards for administrators and teachers with tailored features
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <CardTitle>QR Code Attendance</CardTitle>
              <CardDescription>Generate QR codes for quick and accurate attendance marking</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Analytics & Reports</CardTitle>
              <CardDescription>Comprehensive reporting with charts and export capabilities</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Access */}
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Choose your role to access the system:</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push("/admin")} size="lg" className="gap-2">
              <Users className="w-4 h-4" />
              Admin Dashboard
            </Button>
            <Button onClick={() => router.push("/teacher")} variant="outline" size="lg" className="gap-2">
              <GraduationCap className="w-4 h-4" />
              Teacher Dashboard
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Redirecting to Admin Dashboard in 3 seconds...</p>
        </div>
      </div>
    </div>
  )
}
