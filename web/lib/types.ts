export type UserRole = "admin" | "teacher"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

export interface Student {
  id: string
  name: string
  email: string
  studentId: string
  course: string
  year: number
  avatar?: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  teacherId: string
  department: string
  subjects: string[]
  avatar?: string
}

export interface Course {
  id: string
  name: string
  code: string
  description: string
  teacherId: string
  students: string[]
}

export interface Subject {
  id: string
  name: string
  code: string
  courseId: string
  teacherId: string
}

export interface AttendanceSession {
  id: string
  subjectId: string
  teacherId: string
  date: string
  startTime: string
  endTime: string
  qrCode: string
  isActive: boolean
}

export interface AttendanceRecord {
  id: string
  sessionId: string
  studentId: string
  timestamp: string
  status: "present" | "absent" | "late"
  method: "qr" | "manual"
}
