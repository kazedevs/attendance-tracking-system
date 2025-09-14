"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockCourses, mockTeachers } from "@/lib/mock-data"
import type { Subject } from "@/lib/types"

interface SubjectFormProps {
  subject?: Subject
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (subject: Partial<Subject>) => void
}

export function SubjectForm({ subject, open, onOpenChange, onSubmit }: SubjectFormProps) {
  const [formData, setFormData] = useState({
    name: subject?.name || "",
    code: subject?.code || "",
    courseId: subject?.courseId || "",
    teacherId: subject?.teacherId || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onOpenChange(false)
    setFormData({ name: "", code: "", courseId: "", teacherId: "" })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{subject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
          <DialogDescription>
            {subject ? "Update subject information." : "Enter the details for the new subject."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Subject Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter subject name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Subject Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Enter subject code"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher">Instructor</Label>
            <Select value={formData.teacherId} onValueChange={(value) => setFormData({ ...formData, teacherId: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select an instructor" />
              </SelectTrigger>
              <SelectContent>
                {mockTeachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">{subject ? "Update" : "Add"} Subject</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
