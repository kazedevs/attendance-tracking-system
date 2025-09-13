import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Teacher Dashboard - Smart Attendance System",
  description: "Teacher dashboard for managing courses and attendance",
}

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
