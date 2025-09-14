"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { Teacher } from "@/lib/types"

interface TeacherFormProps {
  teacher?: Teacher
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (teacher: Partial<Teacher>) => void
}

export function TeacherForm({ teacher, open, onOpenChange, onSubmit }: TeacherFormProps) {
  const [formData, setFormData] = useState({
    name: teacher?.name || "",
    email: teacher?.email || "",
    teacherId: teacher?.teacherId || "",
    department: teacher?.department || "",
    subjects: teacher?.subjects || [],
  })
  const [newSubject, setNewSubject] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
    setFormData({ name: "", email: "", teacherId: "", department: "", subjects: [] })
  }

  const addSubject = () => {
    if (newSubject.trim() && !formData.subjects.includes(newSubject.trim())) {
      setFormData({ ...formData, subjects: [...formData.subjects, newSubject.trim()] })
      setNewSubject("")
    }
  }

  const removeSubject = (subject: string) => {
    setFormData({ ...formData, subjects: formData.subjects.filter((s) => s !== subject) })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{teacher ? "Edit Teacher" : "Add New Teacher"}</DialogTitle>
          <DialogDescription>
            {teacher ? "Update teacher information." : "Enter the details for the new teacher."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter teacher name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacherId">Teacher ID</Label>
            <Input
              id="teacherId"
              value={formData.teacherId}
              onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
              placeholder="Enter teacher ID"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Enter department"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects</Label>
            <div className="flex gap-2">
              <Input
                id="subjects"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Add subject"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSubject(subject)} />
                </Badge>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{teacher ? "Update" : "Add"} Teacher</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
