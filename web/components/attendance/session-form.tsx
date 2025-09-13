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
import { mockSubjects, mockCourses, mockSemesters, mockSections } from "@/lib/mock-data" 
import type { AttendanceSession } from "@/lib/types"

interface SessionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (session: Partial<AttendanceSession>) => void
}

export function SessionForm({ open, onOpenChange, onSubmit }: SessionFormProps) {
  const [formData, setFormData] = useState({
    courseId: "",
    semesterId: "",
    sectionId: "",
    subjectId: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      teacherId: "1", // Mock teacher ID
      qrCode: `QR${Date.now()}`,
      isActive: true,
    })
    onOpenChange(false)
    setFormData({
      courseId: "",
      semesterId: "",
      sectionId: "",
      subjectId: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "",
      endTime: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Attendance Session</DialogTitle>
          <DialogDescription>Set up a new attendance session for your class.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course */}
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select
              value={formData.courseId}
              onValueChange={(value) => setFormData({ ...formData, courseId: value })}
            >
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

          {/* Semester */}
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select
              value={formData.semesterId}
              onValueChange={(value) => setFormData({ ...formData, semesterId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a semester" />
              </SelectTrigger>
              <SelectContent>
                {mockSemesters.map((semester) => (
                  <SelectItem key={semester.id} value={semester.id}>
                    {semester.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section */}
          <div className="space-y-2">
            <Label htmlFor="section">Section</Label>
            <Select
              value={formData.sectionId}
              onValueChange={(value) => setFormData({ ...formData, sectionId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {mockSections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Select
              value={formData.subjectId}
              onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {mockSubjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          {/* Start & End Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Session</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
