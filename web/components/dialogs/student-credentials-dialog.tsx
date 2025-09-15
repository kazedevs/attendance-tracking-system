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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StudentCredentialsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studentName: string
  studentId: string
  password: string
}

export function StudentCredentialsDialog({
  open,
  onOpenChange,
  studentName,
  studentId,
  password,
}: StudentCredentialsDialogProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const { toast } = useToast()

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(fieldName)
      toast({
        title: "Copied to clipboard",
        description: `${fieldName} has been copied to your clipboard.`,
      })
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedField(null)
      }, 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Unable to copy to clipboard. Please copy manually.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset states when dialog closes
    setShowPassword(false)
    setCopiedField(null)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Student Account Created Successfully
          </DialogTitle>
          <DialogDescription>
            Login credentials have been generated for <strong>{studentName}</strong>. 
            Please save these credentials securely as they will not be shown again.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="student-id">Student ID</Label>
            <div className="flex gap-2">
              <Input
                id="student-id"
                value={studentId}
                readOnly
                className="font-mono bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(studentId, "Student ID")}
                className="shrink-0"
              >
                {copiedField === "Student ID" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  className="font-mono bg-muted pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => copyToClipboard(password, "Password")}
                className="shrink-0"
              >
                {copiedField === "Password" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Security Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>These credentials will not be displayed again</li>
                  <li>Share them securely with the student</li>
                  <li>The student should change their password after first login</li>
                  <li>Keep a secure record of the Student ID for future reference</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleClose} className="w-full">
            I have saved the credentials securely
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
