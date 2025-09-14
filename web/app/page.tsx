"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, Mail, Lock, User } from "lucide-react"
import { UserRole } from "@/lib/types"

// Demo Credentials:
// Admin ID: admin001, Password: admin123
// Teacher ID: teacher001, Password: teacher123

export default function LoginPage() {
  const router = useRouter()
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("admin")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate credentials
    const isValidCredentials =
      (role === "admin" && userId === "admin001" && password === "admin123") ||
      (role === "teacher" && userId === "teacher001" && password === "teacher123")

    // Simulate login process
    setTimeout(() => {
      if (isValidCredentials) {
        if (role === "admin") {
          router.push("/admin")
        } else if (role === "teacher") {
          router.push("/teacher")
        }
      } else {
        setError("Wrong ID or Password, Try again!")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Attendly - Attendance Tracking System</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xs">Secure access to your dashboard</p>
        </div>

        {/* Role Tabs */}
        <div className="mb-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => {
                setRole("admin")
                setError("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${role === "admin"
                  ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md transform scale-[0.98]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <User className="w-4 h-4" />
              Administrator
            </button>
            <button
              onClick={() => {
                setRole("teacher")
                setError("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all duration-200 ${role === "teacher"
                  ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md transform scale-[0.98]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <GraduationCap className="w-4 h-4" />
              Teacher
            </button>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex items-center justify-center">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br from-green-600 to-emerald-600">
                {role === "admin" ? (
                  <User className="w-7 h-7 text-white" />
                ) : (
                  <GraduationCap className="w-7 h-7 text-white" />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {role === "admin" ? "Administrator Portal" : "Teacher Portal"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                Welcome back! Please sign in to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {role === "admin" ? "Admin ID" : "Teacher ID"}
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder={role === "admin" ? "Enter your Admin ID" : "Enter your Teacher ID"}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-12 h-11 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-11 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading || !userId || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Login in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-medium">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
