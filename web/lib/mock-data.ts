import type { User, Student, Teacher, Course, Subject, AttendanceSession, AttendanceRecord } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@school.edu",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    role: "teacher",
    avatar: "/teacher-avatar.png",
  },
]

export const mockStudents: Student[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@student.edu",
    studentId: "STU001",
    course: "Computer Science Engineering",
    semester: "2nd",
    avatar: "/student-avatar.png",
  },
  {
    id: "2",
    name: "Emily Davis",
    email: "emily.davis@student.edu",
    studentId: "STU002",
    course: "Computer Science Engineering",
    semester: "2nd",
    avatar: "/student-avatar.png",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@student.edu",
    studentId: "STU003",
    course: "Bachelor of Computer Application",
    semester: "1st",
    avatar: "/student-avatar.png",
  },
]

export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    teacherId: "TCH001",
    department: "FoCT",
    avatar: "/teacher-avatar.png",
  },
  {
    id: "2",
    name: "Prof. Mark Wilson",
    email: "mark.wilson@school.edu",
    teacherId: "TCH002",
    department: "CLPPD",
    avatar: "/teacher-avatar.png",
  },
]

export const mockCourses: Course[] = [
  {
    id: "1",
    name: "Computer Science Engineering",
    code: "CSE",
    description: "Bachelor of Technology program",
    teacherId: "1",
    students: ["1", "2"],
  },
  {
    id: "2",
    name: "Bachelor of Computer Application",
    code: "BCA",
    description: "Bachelor of Computer Application program",
    teacherId: "2",
    students: ["3"],
  },
]

export const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Data Structures",
    code: "CS201",
    courseId: "1",
    teacherId: "1",
  },
  {
    id: "2",
    name: "Algorithms",
    code: "CS301",
    courseId: "1",
    teacherId: "1",
  },
]

export const mockSemesters = [
  { id: "s1", name: "1st Semester" },
  { id: "s2", name: "2nd Semester" },
  { id: "s3", name: "3rd Semester" },
]

export const mockSections = [
  { id: "sec1", name: "Section A" },
  { id: "sec2", name: "Section B" },
]

export const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: "1",
    subjectId: "1",
    teacherId: "1",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:30",
    qrCode: "QR123456",
    isActive: true,
  },
]

export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: "1",
    sessionId: "1",
    studentId: "1",
    timestamp: "2024-01-15T09:05:00Z",
    status: "present",
    method: "qr",
  },
  {
    id: "2",
    sessionId: "1",
    studentId: "2",
    timestamp: "2024-01-15T09:15:00Z",
    status: "late",
    method: "qr",
  },
]
