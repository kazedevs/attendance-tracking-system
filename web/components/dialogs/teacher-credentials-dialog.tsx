"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeacherCredentialsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  teacherName: string
  teacherId: string
  password: string
}

export function TeacherCredentialsDialog({
  open,
  onOpenChange,
  teacherName,
  teacherId,
  password,
}: TeacherCredentialsDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { toast } = useToast()

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the credentials manually",
        variant: "destructive",
      })
    }
  }

  const copyAllCredentials = async () => {
    const credentials = `Teacher Login Credentials
Name: ${teacherName}
Teacher ID: ${teacherId}
Password: ${password}

Please keep these credentials secure and share them only with the teacher.`
    
    try {
      await navigator.clipboard.writeText(credentials)
      toast({
        title: "All credentials copied!",
        description: "Complete login information copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the credentials manually",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <DialogTitle>Teacher Account Created Successfully</DialogTitle>
          </div>
          <DialogDescription>
            Login credentials have been generated for <strong>{teacherName}</strong>. 
            Please share these credentials securely with the teacher.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> These credentials will only be shown once. 
            Please copy and save them securely before closing this dialog.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teacher Name
                </label>
                <p className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                  {teacherName}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teacher ID (Login Username)
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-mono text-sm">
                    {teacherId}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(teacherId, "Teacher ID")}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-mono text-sm">
                    {showPassword ? password : "••••••••"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(password, "Password")}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={copyAllCredentials}
              variant="outline"
              className="w-full"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All Credentials
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            I've Saved the Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
