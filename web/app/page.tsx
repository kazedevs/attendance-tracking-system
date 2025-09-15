"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { GraduationCap, Mail, Lock, User, AlertCircle } from "lucide-react"
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
  const [showErrorDialog, setShowErrorDialog] = useState(false)

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
        setShowErrorDialog(true)
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md mx-auto">
        {/* Brand Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg p-2">
              <Image
                src="/graduation.png"
                alt="Attendly Logo"
                width={28}
                height={28}
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter brightness-0 invert"
              />
            </div>
          </div>
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-2 px-2 whitespace-nowrap">
            Attendly - Attendance Tracking System
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base px-2">
            Secure access to your dashboard
          </p>
        </div>

        {/* Role Tabs */}
        <div className="mb-6">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 shadow-inner">
            <button
              onClick={() => {
                setRole("admin")
                setError("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] ${role === "admin"
                ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md transform scale-[0.98]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <User className="w-4 h-4 flex-shrink-0" />
              <span className="hidden xs:inline">Administrator</span>
              <span className="xs:hidden">Admin</span>
            </button>
            <button
              onClick={() => {
                setRole("teacher")
                setError("")
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px] ${role === "teacher"
                ? "bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md transform scale-[0.98]"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }`}
            >
              <GraduationCap className="w-4 h-4 flex-shrink-0" />
              Teacher
            </button>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6 px-4 sm:px-6">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 bg-gradient-to-br from-green-600 to-emerald-600 p-2">
                {role === "admin" ? (
                  <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                ) : (
                  <Image
                    src="/graduation.png"
                    alt="Teacher Portal Logo"
                    width={28}
                    height={28}
                    className="w-6 h-6 sm:w-7 sm:h-7 object-contain filter brightness-0 invert"
                  />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {role === "admin" ? "Administrator Portal" : "Teacher Portal"}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm sm:text-base px-2">
                Welcome back! Please sign in to continue
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-4 sm:px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {role === "admin" ? "Admin ID" : "Teacher ID"}
                </Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 flex-shrink-0" />
                  <Input
                    id="userId"
                    type="text"
                    placeholder={role === "admin" ? "Enter your Admin ID" : "Enter your Teacher ID"}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-12 h-12 sm:h-11 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 flex-shrink-0" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 sm:h-11 border-gray-200 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500 dark:focus:ring-green-400 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base sm:text-sm"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 sm:h-11 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-sm min-h-[44px]"
                disabled={isLoading || !userId || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

          </CardContent>
        </Card>
      </div>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <AlertDialogTitle className="text-red-600 dark:text-red-400">
                Login Failed
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              {error}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setShowErrorDialog(false)
                setError("")
              }}
              className="w-full sm:w-auto"
            >
              Try Again
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
